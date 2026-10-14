/* Paint-by-number core. Pure functions, no DOM: runs in a Web Worker and in Node.
   pbnProcess(rgba, w, h, P, progress) -> { num, palette, placements, edge, regions, colors }
   P: { k, minFont, smooth, flatten, tol, lineWidth, maxDim } */

function pbnProcess(rgba, w, h, P, progress) {
  progress = progress || function () {};
  var N = w * h;
  var maxDim = Math.max(w, h);
  var scale = maxDim / 1000;

  // ---------- Lab ----------
  progress("Reading colors", 0.03);
  var lin = new Float32Array(256);
  for (var i = 0; i < 256; i++) {
    var c = i / 255;
    lin[i] = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }
  function f(t) { return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116; }
  var L = new Float32Array(N), A = new Float32Array(N), B = new Float32Array(N);
  for (i = 0; i < N; i++) {
    var r = lin[rgba[4 * i]], g = lin[rgba[4 * i + 1]], b = lin[rgba[4 * i + 2]];
    var fx = f((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047);
    var fy = f(0.2126729 * r + 0.7151522 * g + 0.0721750 * b);
    var fz = f((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / 1.08883);
    L[i] = 116 * fy - 16; A[i] = 500 * (fx - fy); B[i] = 200 * (fy - fz);
  }

  // ---------- edge-preserving smoothing (bilateral) ----------
  progress("Smoothing texture", 0.08);
  var passes = [0, 1, 3, 4][Math.max(0, Math.min(3, P.smooth))];
  if (passes > 0) {
    var ch = bilateral([L, A, B], w, h, passes, 11);
    L = ch[0]; A = ch[1]; B = ch[2];
  }

  // ---------- backdrop ----------
  var KB = -1;
  var bgMask = null;
  var K = Math.max(3, Math.min(64, P.k | 0));
  if (P.flatten) {
    progress("Finding the backdrop", 0.2);
    var bg = findBackground(L, A, B, w, h, P.tol);
    if (bg && bg.frac > 0.04 && bg.frac < 0.97) { bgMask = bg.mask; KB = K - 1; }
  }
  var Ksub = KB >= 0 ? K - 1 : K;

  // ---------- k-means in Lab ----------
  progress("Choosing " + K + " colors", 0.28);
  var focus = Math.max(0, Math.min(3, P.focus | 0));
  var wt = focus ? detailWeights(L, A, B, w, h, [0, 3, 8, 16][focus]) : null;
  var labels = kmeansLab(L, A, B, bgMask, N, Ksub, 1.3, wt);
  if (KB >= 0) for (i = 0; i < N; i++) if (bgMask[i]) labels[i] = KB;

  // ---------- smooth region borders ----------
  progress("Smoothing region edges", 0.45);
  var mp = [0, 1, 1, 2][Math.max(0, Math.min(3, P.smooth))];
  var mr = [0, 1, 2, 2][Math.max(0, Math.min(3, P.smooth))];
  mr = mr ? Math.max(1, Math.round(mr * scale)) : 0;
  for (var p = 0; p < mp; p++) labels = modeFilter(labels, w, h, K, mr);

  // ---------- merge regions that are too small for a number ----------
  progress("Merging tiny regions", 0.6);
  var minFont = Math.max(6, P.minFont);
  var minRad = minFont / 1.15;
  var minArea = Math.PI * minRad * minRad * 0.9;
  cleanRegions(labels, w, h, K, minArea, minRad, 14);
  if (mp) {
    labels = modeFilter(labels, w, h, K, Math.max(1, mr > 1 ? mr - 1 : 1));
    cleanRegions(labels, w, h, K, minArea, minRad, 14);
  }

  // ---------- palette: mean original color per label, sorted dark to light ----------
  progress("Building the palette", 0.78);
  var sumR = new Float64Array(K), sumG = new Float64Array(K), sumB = new Float64Array(K), cnt = new Float64Array(K);
  for (i = 0; i < N; i++) {
    var l = labels[i];
    sumR[l] += rgba[4 * i]; sumG[l] += rgba[4 * i + 1]; sumB[l] += rgba[4 * i + 2]; cnt[l]++;
  }
  var used = [];
  for (l = 0; l < K; l++) if (cnt[l] > 0) {
    used.push({ l: l, rgb: [Math.round(sumR[l] / cnt[l]), Math.round(sumG[l] / cnt[l]), Math.round(sumB[l] / cnt[l])] });
  }
  used.sort(function (a, b) {
    return (0.299 * a.rgb[0] + 0.587 * a.rgb[1] + 0.114 * a.rgb[2]) - (0.299 * b.rgb[0] + 0.587 * b.rgb[1] + 0.114 * b.rgb[2]);
  });
  var lut = new Uint8Array(K + 1), palette = [];
  used.forEach(function (u, idx) { lut[u.l] = idx + 1; palette.push(u.rgb); });
  var num = new Uint8Array(N);
  for (i = 0; i < N; i++) num[i] = lut[labels[i]];

  // ---------- outlines ----------
  progress("Tracing outlines", 0.84);
  var edge = outlines(num, w, h, Math.max(1, Math.round(P.lineWidth)));

  // ---------- numbers ----------
  progress("Placing numbers", 0.92);
  var cc = labelComponents(num, w, h);
  var dist = boundaryDist(cc.comp, w, h);
  var nc = cc.n;
  var bestD = new Float32Array(nc), bestI = new Int32Array(nc);
  for (i = 0; i < N; i++) { var cid = cc.comp[i]; if (dist[i] > bestD[cid]) { bestD[cid] = dist[i]; bestI[cid] = i; } }
  var nmax = Math.max(18, 26 * scale);
  var placements = [];
  function digits(n) { return n < 10 ? 1 : 2; }
  function fit(n, rad) {
    var size = Math.min(nmax, rad * 1.15);
    var wd = digits(n) * 0.62 * size;
    if (wd > rad * 1.9) size = rad * 1.9 / (digits(n) * 0.62);
    return size;
  }
  var big = [];
  var bigArea = N * 0.025;
  for (var cI = 0; cI < nc; cI++) {
    var idx = bestI[cI], rad = bestD[cI];
    var x = idx % w, y = (idx - x) / w;
    var n = num[idx];
    var size = fit(n, rad);
    placements.push({ x: x, y: y, size: size, n: n });
    if (cc.areas[cI] > bigArea) big.push({ c: cI, x: x, y: y, n: n });
  }
  // big regions get repeat numbers so you never hunt for the color
  if (big.length) {
    var isBig = new Uint8Array(nc);
    big.forEach(function (b) { isBig[b.c] = 1; });
    var cell = Math.max(60, Math.round(maxDim / 6));
    var gx = Math.ceil(w / cell);
    var cand = new Map();
    for (i = 0; i < N; i++) {
      var c2 = cc.comp[i];
      if (!isBig[c2]) continue;
      var d = dist[i];
      if (d < minRad * 3) continue;
      var xx = i % w, yy = (i - xx) / w;
      var key = c2 * 4096 + Math.floor(yy / cell) * gx + Math.floor(xx / cell);
      var cur = cand.get(key);
      if (!cur || d > cur.d) cand.set(key, { c: c2, x: xx, y: yy, d: d });
    }
    var list = Array.from(cand.values()).sort(function (a, b) { return b.d - a.d; });
    var mainOf = {};
    big.forEach(function (b) { mainOf[b.c] = [{ x: b.x, y: b.y }]; });
    var minGap = cell * 0.75;
    list.forEach(function (cd) {
      var near = mainOf[cd.c];
      for (var q = 0; q < near.length; q++) {
        var dx = near[q].x - cd.x, dy = near[q].y - cd.y;
        if (dx * dx + dy * dy < minGap * minGap) return;
      }
      near.push({ x: cd.x, y: cd.y });
      var nn = num[cd.y * w + cd.x];
      placements.push({ x: cd.x, y: cd.y, size: fit(nn, cd.d), n: nn });
    });
  }

  progress("Done", 1);
  return { num: num, palette: palette, placements: placements, edge: edge, regions: nc, colors: palette.length, w: w, h: h };
}

// ======================================================================
function bilateral(src, w, h, passes, sr) {
  var N = w * h;
  var offs = [];
  for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++) {
    offs.push([dx, dy, Math.exp(-(dx * dx + dy * dy) / (2 * 1.6 * 1.6))]);
  }
  var maxd2 = (3 * sr) * (3 * sr), LUTN = 512, lut = new Float32Array(LUTN + 1);
  for (var i = 0; i <= LUTN; i++) lut[i] = Math.exp(-(i / LUTN * maxd2) / (2 * sr * sr));
  var cur = src;
  for (var p = 0; p < passes; p++) {
    var sL = cur[0], sA = cur[1], sB = cur[2];
    var dL = new Float32Array(N), dA = new Float32Array(N), dB = new Float32Array(N);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var ix = y * w + x, l0 = sL[ix], a0 = sA[ix], b0 = sB[ix];
        var ws = 0, tl = 0, ta = 0, tb = 0;
        for (var k = 0; k < 25; k++) {
          var o = offs[k], xx = x + o[0], yy = y + o[1];
          if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
          var j = yy * w + xx;
          var el = sL[j] - l0, ea = sA[j] - a0, eb = sB[j] - b0;
          var d2 = el * el + ea * ea + eb * eb;
          if (d2 > maxd2) continue;
          var wt = o[2] * lut[(d2 / maxd2 * LUTN) | 0];
          ws += wt; tl += wt * sL[j]; ta += wt * sA[j]; tb += wt * sB[j];
        }
        dL[ix] = tl / ws; dA[ix] = ta / ws; dB[ix] = tb / ws;
      }
    }
    cur = [dL, dA, dB];
  }
  return cur;
}

function findBackground(L, A, B, w, h, tol) {
  var N = w * h, ring = Math.max(2, Math.round(Math.max(w, h) / 250));
  var vl = [], va = [], vb = [];
  function take(ix) { vl.push(L[ix]); va.push(A[ix]); vb.push(B[ix]); }
  for (var x = 0; x < w; x += 2) for (var t = 0; t < ring; t++) { take(t * w + x); take((h - 1 - t) * w + x); }
  for (var y = 0; y < h; y += 2) for (t = 0; t < ring; t++) { take(y * w + t); take(y * w + (w - 1 - t)); }
  function med(a) { a.sort(function (p, q) { return p - q; }); return a[a.length >> 1]; }
  var bl = med(vl), ba = med(va), bb = med(vb);
  var tol2 = tol * tol;
  function ok(ix) {
    var d1 = L[ix] - bl, d2 = A[ix] - ba, d3 = B[ix] - bb;
    return d1 * d1 + d2 * d2 + d3 * d3 <= tol2;
  }
  var mask = new Uint8Array(N), q = new Int32Array(N), qs = 0, qe = 0, count = 0;
  function seed(ix) { if (!mask[ix] && ok(ix)) { mask[ix] = 1; q[qe++] = ix; count++; } }
  for (x = 0; x < w; x++) { seed(x); seed((h - 1) * w + x); }
  for (y = 0; y < h; y++) { seed(y * w); seed(y * w + w - 1); }
  while (qs < qe) {
    var ix = q[qs++], px = ix % w;
    if (px > 0) seed(ix - 1);
    if (px < w - 1) seed(ix + 1);
    if (ix >= w) seed(ix - w);
    if (ix < N - w) seed(ix + w);
  }
  return { mask: mask, frac: count / N, color: [bl, ba, bb] };
}

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// weight per pixel: 1 in flat areas, up to 1+gain on strong edges and texture
function detailWeights(L, A, B, w, h, gain) {
  var N = w * h, g = new Float32Array(N);
  for (var y = 1; y < h - 1; y++) for (var x = 1; x < w - 1; x++) {
    var i = y * w + x;
    g[i] = Math.abs(L[i + 1] - L[i - 1]) + Math.abs(L[i + w] - L[i - w]) +
      0.5 * (Math.abs(A[i + 1] - A[i - 1]) + Math.abs(A[i + w] - A[i - w]) + Math.abs(B[i + 1] - B[i - 1]) + Math.abs(B[i + w] - B[i - w]));
  }
  var samp = [];
  for (i = 0; i < N; i += 7) samp.push(g[i]);
  samp.sort(function (p, q) { return p - q; });
  var g95 = Math.max(1e-3, samp[Math.floor(samp.length * 0.95)]);
  var wt = new Float32Array(N);
  for (i = 0; i < N; i++) wt[i] = 1 + gain * Math.min(1, g[i] / g95);
  return wt;
}

function kmeansLab(L, A, B, skip, N, K, wab, wt) {
  var rnd = mulberry32(12345);
  var poolArr = new Int32Array(N), M = 0;
  for (var i = 0; i < N; i++) if (!skip || !skip[i]) poolArr[M++] = i;
  var S = Math.min(30000, M);
  var cum = null;
  if (wt && M > S) {
    cum = new Float64Array(M);
    var acc0 = 0;
    for (var m = 0; m < M; m++) { acc0 += wt[poolArr[m]]; cum[m] = acc0; }
  }
  var sx = new Float32Array(S * 3);
  for (var s = 0; s < S; s++) {
    var ix;
    if (M <= S) ix = poolArr[s];
    else if (cum) {
      var u = rnd() * cum[M - 1], lo = 0, hi = M - 1;
      while (lo < hi) { var mid = (lo + hi) >> 1; if (cum[mid] < u) lo = mid + 1; else hi = mid; }
      ix = poolArr[lo];
    } else ix = poolArr[Math.floor(rnd() * M)];
    sx[3 * s] = L[ix]; sx[3 * s + 1] = A[ix] * wab; sx[3 * s + 2] = B[ix] * wab;
  }
  var cen = new Float32Array(K * 3), d2 = new Float64Array(S).fill(Infinity);
  var first = Math.floor(rnd() * S);
  cen[0] = sx[3 * first]; cen[1] = sx[3 * first + 1]; cen[2] = sx[3 * first + 2];
  for (var k = 1; k < K; k++) {
    var tot = 0;
    for (s = 0; s < S; s++) {
      var e0 = sx[3 * s] - cen[3 * (k - 1)], e1 = sx[3 * s + 1] - cen[3 * (k - 1) + 1], e2 = sx[3 * s + 2] - cen[3 * (k - 1) + 2];
      var dd = e0 * e0 + e1 * e1 + e2 * e2;
      if (dd < d2[s]) d2[s] = dd;
      tot += d2[s];
    }
    var pick = rnd() * tot, acc = 0, ch = S - 1;
    for (s = 0; s < S; s++) { acc += d2[s]; if (acc >= pick) { ch = s; break; } }
    cen[3 * k] = sx[3 * ch]; cen[3 * k + 1] = sx[3 * ch + 1]; cen[3 * k + 2] = sx[3 * ch + 2];
  }
  var asg = new Uint8Array(S);
  for (var it = 0; it < 14; it++) {
    var sum = new Float64Array(K * 3), cn = new Float64Array(K);
    for (s = 0; s < S; s++) {
      var best = 0, bd = Infinity;
      for (k = 0; k < K; k++) {
        var a0 = sx[3 * s] - cen[3 * k], a1 = sx[3 * s + 1] - cen[3 * k + 1], a2 = sx[3 * s + 2] - cen[3 * k + 2];
        var dq = a0 * a0 + a1 * a1 + a2 * a2;
        if (dq < bd) { bd = dq; best = k; }
      }
      asg[s] = best; cn[best]++; sum[3 * best] += sx[3 * s]; sum[3 * best + 1] += sx[3 * s + 1]; sum[3 * best + 2] += sx[3 * s + 2];
    }
    for (k = 0; k < K; k++) {
      if (cn[k] > 0) { cen[3 * k] = sum[3 * k] / cn[k]; cen[3 * k + 1] = sum[3 * k + 1] / cn[k]; cen[3 * k + 2] = sum[3 * k + 2] / cn[k]; }
      else { var rs = Math.floor(rnd() * S); cen[3 * k] = sx[3 * rs]; cen[3 * k + 1] = sx[3 * rs + 1]; cen[3 * k + 2] = sx[3 * rs + 2]; }
    }
  }
  var out = new Uint8Array(N);
  for (i = 0; i < N; i++) {
    if (skip && skip[i]) continue;
    var l0 = L[i], p0 = A[i] * wab, p1 = B[i] * wab, bk = 0, bdist = Infinity;
    for (k = 0; k < K; k++) {
      var q0 = l0 - cen[3 * k], q1 = p0 - cen[3 * k + 1], q2 = p1 - cen[3 * k + 2];
      var dz = q0 * q0 + q1 * q1 + q2 * q2;
      if (dz < bdist) { bdist = dz; bk = k; }
    }
    out[i] = bk;
  }
  return out;
}

function modeFilter(lab, w, h, K, r) {
  if (!r) return lab;
  var out = new Uint8Array(w * h), cnt = new Int32Array(K + 1);
  for (var y = 0; y < h; y++) {
    var y0 = Math.max(0, y - r), y1 = Math.min(h - 1, y + r);
    for (var x = 0; x < w; x++) {
      var x0 = Math.max(0, x - r), x1 = Math.min(w - 1, x + r);
      for (var yy = y0; yy <= y1; yy++) for (var xx = x0; xx <= x1; xx++) cnt[lab[yy * w + xx]]++;
      var c0 = lab[y * w + x], best = c0, bc = cnt[c0];
      for (yy = y0; yy <= y1; yy++) for (xx = x0; xx <= x1; xx++) {
        var l = lab[yy * w + xx];
        if (cnt[l] > bc) { bc = cnt[l]; best = l; }
      }
      for (yy = y0; yy <= y1; yy++) for (xx = x0; xx <= x1; xx++) cnt[lab[yy * w + xx]] = 0;
      out[y * w + x] = best;
    }
  }
  return out;
}

function labelComponents(lab, w, h) {
  var N = w * h, comp = new Int32Array(N).fill(-1), stack = new Int32Array(N), areas = [];
  for (var i = 0; i < N; i++) {
    if (comp[i] >= 0) continue;
    var id = areas.length, l = lab[i], sp = 0, area = 0;
    comp[i] = id; stack[sp++] = i;
    while (sp) {
      var p = stack[--sp]; area++;
      var x = p % w;
      if (x > 0 && comp[p - 1] < 0 && lab[p - 1] === l) { comp[p - 1] = id; stack[sp++] = p - 1; }
      if (x < w - 1 && comp[p + 1] < 0 && lab[p + 1] === l) { comp[p + 1] = id; stack[sp++] = p + 1; }
      if (p >= w && comp[p - w] < 0 && lab[p - w] === l) { comp[p - w] = id; stack[sp++] = p - w; }
      if (p < N - w && comp[p + w] < 0 && lab[p + w] === l) { comp[p + w] = id; stack[sp++] = p + w; }
    }
    areas.push(area);
  }
  return { comp: comp, areas: areas, n: areas.length };
}

// distance (px) from each pixel to the nearest region boundary or image edge
function boundaryDist(comp, w, h) {
  var N = w * h, d = new Float32Array(N), INF = 1e9;
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var i = y * w + x, c = comp[i], b = false;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) b = true;
      else if (comp[i - 1] !== c || comp[i + 1] !== c || comp[i - w] !== c || comp[i + w] !== c) b = true;
      d[i] = b ? 0 : INF;
    }
  }
  var R2 = 1.4142;
  for (y = 1; y < h; y++) for (x = 1; x < w - 1; x++) {
    i = y * w + x;
    var v = d[i];
    var a = d[i - 1] + 1; if (a < v) v = a;
    a = d[i - w] + 1; if (a < v) v = a;
    a = d[i - w - 1] + R2; if (a < v) v = a;
    a = d[i - w + 1] + R2; if (a < v) v = a;
    d[i] = v;
  }
  for (y = h - 2; y >= 0; y--) for (x = w - 2; x >= 1; x--) {
    i = y * w + x;
    v = d[i];
    a = d[i + 1] + 1; if (a < v) v = a;
    a = d[i + w] + 1; if (a < v) v = a;
    a = d[i + w + 1] + R2; if (a < v) v = a;
    a = d[i + w - 1] + R2; if (a < v) v = a;
    d[i] = v;
  }
  return d;
}

function cleanRegions(lab, w, h, K, minArea, minRad, maxIter) {
  var N = w * h;
  for (var it = 0; it < maxIter; it++) {
    var cc = labelComponents(lab, w, h), comp = cc.comp, n = cc.n;
    var dist = boundaryDist(comp, w, h);
    var maxd = new Float32Array(n);
    for (var i = 0; i < N; i++) { var c = comp[i]; if (dist[i] > maxd[c]) maxd[c] = dist[i]; }
    var badIdx = new Int32Array(n).fill(-1), nb = 0, badList = [];
    for (c = 0; c < n; c++) if (cc.areas[c] < minArea || maxd[c] < minRad) { badIdx[c] = nb++; badList.push(c); }
    if (!nb) break;
    // shared border length with each neighbouring region, per bad region
    var nbr = new Array(nb);
    for (var q = 0; q < nb; q++) nbr[q] = new Map();
    function add(bad, other) {
      var m = nbr[badIdx[bad]];
      m.set(other, (m.get(other) || 0) + 1);
    }
    for (i = 0; i < N; i++) {
      var x = i % w, ci = comp[i], cj;
      if (x < w - 1) {
        cj = comp[i + 1];
        if (cj !== ci) { if (badIdx[ci] >= 0) add(ci, cj); if (badIdx[cj] >= 0) add(cj, ci); }
      }
      if (i < N - w) {
        cj = comp[i + w];
        if (cj !== ci) { if (badIdx[ci] >= 0) add(ci, cj); if (badIdx[cj] >= 0) add(cj, ci); }
      }
    }
    var compLabel = new Uint8Array(n);
    for (i = 0; i < N; i++) compLabel[comp[i]] = lab[i];
    var target = new Int32Array(nb).fill(-1);
    for (var bq = 0; bq < nb; bq++) {
      var bestC = -1, bv = 0;
      nbr[bq].forEach(function (v, key) { if (v > bv) { bv = v; bestC = key; } });
      target[bq] = bestC;
    }
    var newLabel = new Int16Array(nb).fill(-1);
    for (bq = 0; bq < nb; bq++) {
      var me = badList[bq], t = target[bq];
      if (t < 0) continue;
      var tb = badIdx[t];
      // two bad regions that picked each other: only the smaller one gives way
      if (tb >= 0 && target[tb] === me && cc.areas[me] >= cc.areas[t]) continue;
      newLabel[bq] = compLabel[t];
    }
    var changed = 0;
    for (i = 0; i < N; i++) {
      var bx = badIdx[comp[i]];
      if (bx >= 0 && newLabel[bx] >= 0) { lab[i] = newLabel[bx]; changed++; }
    }
    if (!changed) break;
  }
}

function outlines(num, w, h, lw) {
  var N = w * h, e = new Uint8Array(N);
  for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
    var i = y * w + x, v = num[i];
    if ((x < w - 1 && num[i + 1] !== v) || (y < h - 1 && num[i + w] !== v)) e[i] = 255;
  }
  var r = Math.floor(lw / 2);
  var cur = e;
  if (r > 0) {
    var t = new Uint8Array(N), o = new Uint8Array(N);
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      var m = 0;
      for (var dx = -r; dx <= r; dx++) { var xx = x + dx; if (xx >= 0 && xx < w && e[y * w + xx] > m) m = e[y * w + xx]; }
      t[y * w + x] = m;
    }
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      m = 0;
      for (var dy = -r; dy <= r; dy++) { var yy = y + dy; if (yy >= 0 && yy < h && t[yy * w + x] > m) m = t[yy * w + x]; }
      o[y * w + x] = m;
    }
    cur = o;
  }
  // soften with a 3x3 binomial blur and boost so lines stay solid
  var tmp = new Float32Array(N), out = new Uint8ClampedArray(N);
  for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
    var l = x > 0 ? cur[y * w + x - 1] : cur[y * w + x], rr = x < w - 1 ? cur[y * w + x + 1] : cur[y * w + x];
    tmp[y * w + x] = (l + 2 * cur[y * w + x] + rr) / 4;
  }
  for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
    var u = y > 0 ? tmp[(y - 1) * w + x] : tmp[y * w + x], dn = y < h - 1 ? tmp[(y + 1) * w + x] : tmp[y * w + x];
    out[y * w + x] = Math.min(255, ((u + 2 * tmp[y * w + x] + dn) / 4) * 1.5);
  }
  return out;
}
