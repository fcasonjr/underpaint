/* Ready-made pictures for the start page. All artwork is original, drawn as flat-color SVG (800 x 600).
   Each entry: id, cat (landscapes | animals | airplanes | sports), title, k (colors), detail (region size 1-5), smooth (0-3). */
var PICTURE_CATS = [
  { id: "landscapes", label: "Landscapes" },
  { id: "animals", label: "Animals" },
  { id: "airplanes", label: "Airplanes" },
  { id: "sports", label: "Sports" }
];
var PICTURES = [

/* ------------------------------------------------------------------ LANDSCAPES */
{ id: "mountain-lake", cat: "landscapes", title: "Mountain Lake", k: 16, detail: 3, smooth: 1, svg: `
<defs><g id="pine"><rect x="-7" y="10" width="14" height="30" fill="#4a2f1c"/><polygon points="0,-95 -38,-35 38,-35" fill="#1d5a48"/><polygon points="0,-62 -48,8 48,8" fill="#1f6850"/><polygon points="0,-28 -58,40 58,40" fill="#227659"/></g></defs>
<rect width="800" height="130" fill="#43377f"/>
<rect y="130" width="800" height="80" fill="#8c4793"/>
<rect y="210" width="800" height="70" fill="#e56f78"/>
<rect y="280" width="800" height="90" fill="#f8b269"/>
<circle cx="560" cy="318" r="78" fill="#ffe9a6"/>
<polygon points="0,372 90,262 190,330 310,238 440,340 560,278 680,336 800,258 800,390 0,390" fill="#6a3f7c"/>
<polygon points="0,410 110,318 250,398 400,300 540,410 690,326 800,384 800,430 0,430" fill="#3f2b66"/>
<rect y="390" width="800" height="210" fill="#4f4590"/>
<rect y="450" width="800" height="150" fill="#3e3a82"/>
<ellipse cx="560" cy="418" rx="86" ry="9" fill="#ffd98a"/>
<ellipse cx="560" cy="446" rx="62" ry="7" fill="#ffd98a"/>
<ellipse cx="560" cy="472" rx="40" ry="6" fill="#ffd98a"/>
<polygon points="0,600 0,486 90,498 210,540 330,600" fill="#1d2a40"/>
<polygon points="800,600 800,470 720,490 640,540 560,600" fill="#1d2a40"/>
<use href="#pine" transform="translate(70,468) scale(1.15)"/>
<use href="#pine" transform="translate(150,500) scale(0.85)"/>
<use href="#pine" transform="translate(735,452) scale(1.2)"/>
<use href="#pine" transform="translate(665,492) scale(0.8)"/>
`},
{ id: "desert", cat: "landscapes", title: "Desert Mesas", k: 14, detail: 3, smooth: 1, svg: `
<defs>
<clipPath id="m1"><polygon points="0,372 0,250 70,240 90,198 210,198 232,250 340,262 372,372"/></clipPath>
<clipPath id="m2"><polygon points="430,372 452,284 506,272 528,230 690,230 712,282 800,300 800,372"/></clipPath>
<g id="cactus"><rect x="-17" y="0" width="34" height="190" rx="17" fill="#3d8f4b"/><rect x="-62" y="62" width="62" height="22" rx="11" fill="#3d8f4b"/><rect x="-62" y="24" width="22" height="60" rx="11" fill="#3d8f4b"/><rect x="0" y="92" width="58" height="22" rx="11" fill="#3d8f4b"/><rect x="36" y="52" width="22" height="62" rx="11" fill="#3d8f4b"/></g>
</defs>
<rect width="800" height="190" fill="#74c0ec"/>
<rect y="190" width="800" height="190" fill="#bfe6f5"/>
<circle cx="640" cy="112" r="56" fill="#ffd95a"/>
<ellipse cx="170" cy="96" rx="80" ry="22" fill="#fff"/><ellipse cx="226" cy="82" rx="52" ry="22" fill="#fff"/>
<ellipse cx="450" cy="150" rx="70" ry="18" fill="#fff"/>
<polygon points="0,372 0,250 70,240 90,198 210,198 232,250 340,262 372,372" fill="#c7623a"/>
<g clip-path="url(#m1)"><rect y="262" width="400" height="30" fill="#dd8050"/><rect y="320" width="400" height="26" fill="#a94d2d"/></g>
<polygon points="430,372 452,284 506,272 528,230 690,230 712,282 800,300 800,372" fill="#d4714a"/>
<g clip-path="url(#m2)"><rect x="400" y="268" width="420" height="30" fill="#e89363"/><rect x="400" y="326" width="420" height="26" fill="#b4573a"/></g>
<rect y="360" width="800" height="240" fill="#ecbc78"/>
<path d="M0,430 Q200,390 420,440 T800,420 V600 H0Z" fill="#e0a45f"/>
<path d="M0,520 Q260,470 520,525 T800,500 V600 H0Z" fill="#cf8d4b"/>
<use href="#cactus" transform="translate(600,350)"/>
<use href="#cactus" transform="translate(200,420) scale(0.62)"/>
<ellipse cx="400" cy="560" rx="60" ry="24" fill="#a46a35"/><ellipse cx="318" cy="574" rx="32" ry="14" fill="#8f5a2c"/>
`},
{ id: "countryside", cat: "landscapes", title: "Countryside", k: 16, detail: 3, smooth: 1, svg: `
<rect width="800" height="600" fill="#8bcb72"/>
<rect width="800" height="300" fill="#8fd2f4"/>
<circle cx="130" cy="110" r="52" fill="#ffe36a"/>
<ellipse cx="450" cy="100" rx="90" ry="26" fill="#fff"/><ellipse cx="510" cy="84" rx="54" ry="24" fill="#fff"/>
<ellipse cx="690" cy="170" rx="70" ry="20" fill="#fff"/>
<path d="M0,360 Q200,250 400,340 T800,320 V600 H0Z" fill="#8bcb72"/>
<path d="M0,440 Q250,340 520,440 T800,410 V600 H0Z" fill="#5fae55"/>
<path d="M0,540 Q300,480 560,540 T800,520 V600 H0Z" fill="#3f9150"/>
<path d="M330,600 Q380,510 470,452 L505,452 Q432,520 450,600Z" fill="#e8d4a2"/>
<rect x="90" y="388" width="150" height="100" fill="#c8423a"/>
<polygon points="76,392 165,332 254,392" fill="#7a2a25"/>
<rect x="138" y="420" width="54" height="68" fill="#f2e3c6"/>
<rect x="150" y="360" width="30" height="24" fill="#f2e3c6"/>
<rect x="252" y="352" width="42" height="136" fill="#d8d2c4"/>
<polygon points="248,354 273,320 298,354" fill="#8a8578"/>
<rect x="598" y="372" width="22" height="90" fill="#6b4426"/>
<circle cx="609" cy="346" r="52" fill="#2f7d3a"/><circle cx="572" cy="380" r="36" fill="#368a42"/><circle cx="648" cy="382" r="38" fill="#2a7034"/>
<circle cx="120" cy="545" r="9" fill="#ffd23a"/><circle cx="170" cy="568" r="9" fill="#ff5a5a"/><circle cx="640" cy="550" r="9" fill="#fff"/><circle cx="700" cy="572" r="9" fill="#ffd23a"/><circle cx="240" cy="560" r="9" fill="#fff"/>
`},
{ id: "lighthouse", cat: "landscapes", title: "Lighthouse", k: 16, detail: 3, smooth: 1, svg: `
<rect width="800" height="250" fill="#69b4e8"/>
<rect y="250" width="800" height="130" fill="#cde9f7"/>
<ellipse cx="560" cy="110" rx="86" ry="24" fill="#fff"/><ellipse cx="620" cy="92" rx="54" ry="22" fill="#fff"/>
<ellipse cx="330" cy="190" rx="60" ry="16" fill="#fff"/>
<rect y="380" width="800" height="220" fill="#2f6fb3"/>
<ellipse cx="560" cy="430" rx="110" ry="10" fill="#4a88c8"/><ellipse cx="660" cy="490" rx="90" ry="9" fill="#4a88c8"/><ellipse cx="470" cy="540" rx="100" ry="9" fill="#4a88c8"/>
<polygon points="182,222 800,160 800,248" fill="#fff3b0"/>
<polygon points="0,600 0,430 120,412 230,438 310,486 380,600" fill="#8a6b4a"/>
<polygon points="0,432 120,412 230,438 250,452 130,440 0,456" fill="#5aa34b"/>
<polygon points="118,420 142,236 178,236 202,420" fill="#f5f1e8"/>
<polygon points="128,372 135,336 185,336 192,372" fill="#d63a3a"/>
<polygon points="136,310 141,272 179,272 184,310" fill="#d63a3a"/>
<rect x="124" y="226" width="72" height="12" fill="#3a3a44"/>
<rect x="144" y="190" width="32" height="36" fill="#ffe27a"/>
<polygon points="136,190 160,160 184,190" fill="#d63a3a"/>
<rect x="148" y="388" width="24" height="32" fill="#6b4426"/>
<polygon points="520,520 620,520 600,550 540,550" fill="#8b4a2b"/>
<polygon points="570,430 570,516 520,516" fill="#fff"/><polygon points="578,448 578,516 620,516" fill="#f6d046"/>
<rect x="566" y="425" width="6" height="96" fill="#5a3a22"/>
`},

/* ------------------------------------------------------------------ ANIMALS */
{ id: "cat", cat: "animals", title: "Tabby Cat", k: 16, detail: 3, smooth: 1, svg: `
<rect width="800" height="520" fill="#cfe7f1"/>
<rect y="520" width="800" height="80" fill="#a0714a"/>
<rect x="70" y="70" width="170" height="170" fill="#7aa9c7"/>
<rect x="82" y="82" width="70" height="70" fill="#fff6d0"/><rect x="160" y="82" width="70" height="70" fill="#fff6d0"/>
<rect x="82" y="160" width="70" height="70" fill="#fff6d0"/><rect x="160" y="160" width="70" height="70" fill="#fff6d0"/>
<path d="M520,540 Q660,540 650,400 Q648,350 612,344 Q628,404 604,452 Q574,500 510,496Z" fill="#f0a04b"/>
<path d="M600,462 L640,440 L644,418 L606,432Z" fill="#d9782b"/><path d="M628,396 L648,380 L644,356 L620,372Z" fill="#d9782b"/>
<ellipse cx="400" cy="430" rx="152" ry="164" fill="#f0a04b"/>
<ellipse cx="400" cy="450" rx="64" ry="96" fill="#fff3e0"/>
<polygon points="300,380 340,420 296,430" fill="#d9782b"/><polygon points="500,380 460,420 504,430" fill="#d9782b"/>
<ellipse cx="338" cy="566" rx="40" ry="24" fill="#fff3e0"/><ellipse cx="462" cy="566" rx="40" ry="24" fill="#fff3e0"/>
<polygon points="304,176 330,84 392,150" fill="#f0a04b"/><polygon points="496,176 470,84 408,150" fill="#f0a04b"/>
<polygon points="322,160 336,112 372,150" fill="#f4b3a6"/><polygon points="478,160 464,112 428,150" fill="#f4b3a6"/>
<circle cx="400" cy="254" r="112" fill="#f0a04b"/>
<polygon points="400,160 382,202 418,202" fill="#d9782b"/><polygon points="352,172 346,208 372,200" fill="#d9782b"/><polygon points="448,172 454,208 428,200" fill="#d9782b"/>
<ellipse cx="400" cy="306" rx="54" ry="40" fill="#fff3e0"/>
<ellipse cx="358" cy="250" rx="23" ry="27" fill="#86c443"/><ellipse cx="442" cy="250" rx="23" ry="27" fill="#86c443"/>
<ellipse cx="358" cy="250" rx="8" ry="21" fill="#1b1b1b"/><ellipse cx="442" cy="250" rx="8" ry="21" fill="#1b1b1b"/>
<polygon points="400,284 384,274 416,274" fill="#e8798a"/><polygon points="400,294 384,274 416,274" fill="#e8798a"/>
`},
{ id: "reef", cat: "animals", title: "Coral Reef", k: 16, detail: 3, smooth: 1, svg: `
<defs><clipPath id="f1"><ellipse cx="330" cy="270" rx="88" ry="56"/></clipPath></defs>
<rect width="800" height="200" fill="#1c7bbd"/><rect y="200" width="800" height="210" fill="#2c9bd3"/><rect y="410" width="800" height="190" fill="#5cc5e0"/>
<polygon points="0,600 0,520 160,500 360,540 560,510 800,530 800,600" fill="#f1d89c"/>
<path d="M70,540 C40,470 100,430 70,370 C60,420 20,450 40,540Z" fill="#2f9e58"/>
<path d="M110,540 C90,480 140,450 118,396 C132,460 168,490 150,540Z" fill="#35b062"/>
<path d="M700,540 C670,470 730,430 700,370 C690,420 650,450 670,540Z" fill="#2f9e58"/>
<path d="M745,540 C725,480 775,450 752,396 C766,460 800,490 780,540Z" fill="#35b062"/>
<circle cx="560" cy="500" r="30" fill="#f26a8a"/><circle cx="600" cy="478" r="28" fill="#f26a8a"/><circle cx="640" cy="506" r="30" fill="#e85a7a"/><circle cx="596" cy="526" r="26" fill="#f48fa8"/>
<circle cx="250" cy="520" r="26" fill="#9b6adf"/><circle cx="290" cy="500" r="24" fill="#9b6adf"/><circle cx="318" cy="528" r="26" fill="#b585ec"/>
<polygon points="410,560 424,532 440,560 470,562 446,580 454,610 424,592 394,610 402,580 378,562" fill="#e8563a" transform="translate(-20,-30)"/>
<polygon points="412,282 470,200 470,340" fill="#ff8a2a" transform="translate(-206,0)"/>
<ellipse cx="330" cy="270" rx="88" ry="56" fill="#ff8a2a"/>
<g clip-path="url(#f1)"><rect x="296" y="200" width="22" height="140" fill="#fff"/><rect x="366" y="200" width="18" height="140" fill="#fff"/></g>
<polygon points="300,216 340,176 372,222" fill="#e86d12"/><polygon points="304,326 344,364 372,320" fill="#e86d12"/>
<circle cx="278" cy="256" r="12" fill="#fff"/><circle cx="276" cy="256" r="6" fill="#1b1b1b"/>
<polygon points="468,430 520,380 520,480" fill="#ffd23a"/>
<ellipse cx="580" cy="420" rx="76" ry="52" fill="#2c6fe0"/>
<polygon points="540,382 590,350 610,392" fill="#1f56b5"/>
<circle cx="536" cy="410" r="11" fill="#fff"/><circle cx="534" cy="410" r="5.5" fill="#1b1b1b"/>
<circle cx="190" cy="140" r="20" fill="#bfeaf7"/><circle cx="230" cy="86" r="14" fill="#bfeaf7"/><circle cx="560" cy="150" r="24" fill="#bfeaf7"/><circle cx="610" cy="96" r="14" fill="#bfeaf7"/>
`},
{ id: "owl", cat: "animals", title: "Night Owl", k: 16, detail: 3, smooth: 1, svg: `
<rect width="800" height="600" fill="#1f2a5c"/>
<circle cx="640" cy="130" r="82" fill="#fff0b8"/><circle cx="612" cy="110" r="14" fill="#f2dc96"/><circle cx="668" cy="152" r="10" fill="#f2dc96"/>
<circle cx="110" cy="90" r="9" fill="#ffe9a0"/><circle cx="220" cy="170" r="7" fill="#ffe9a0"/><circle cx="480" cy="70" r="8" fill="#ffe9a0"/><circle cx="90" cy="300" r="7" fill="#ffe9a0"/>
<polygon points="0,440 800,400 800,456 0,500" fill="#6b4426"/>
<ellipse cx="150" cy="458" rx="40" ry="16" fill="#3f9150" transform="rotate(-12 150 458)"/><ellipse cx="660" cy="418" rx="42" ry="16" fill="#3f9150" transform="rotate(10 660 418)"/>
<ellipse cx="400" cy="330" rx="132" ry="172" fill="#9a6a43"/>
<ellipse cx="288" cy="350" rx="46" ry="132" fill="#7a4f2e" transform="rotate(14 288 350)"/>
<ellipse cx="512" cy="350" rx="46" ry="132" fill="#7a4f2e" transform="rotate(-14 512 350)"/>
<ellipse cx="400" cy="384" rx="92" ry="122" fill="#ead2a2"/>
<ellipse cx="364" cy="340" rx="24" ry="16" fill="#c9a46a"/><ellipse cx="436" cy="340" rx="24" ry="16" fill="#c9a46a"/>
<ellipse cx="400" cy="396" rx="24" ry="16" fill="#c9a46a"/><ellipse cx="364" cy="452" rx="24" ry="16" fill="#c9a46a"/><ellipse cx="436" cy="452" rx="24" ry="16" fill="#c9a46a"/>
<polygon points="274,160 288,66 344,122" fill="#7a4f2e"/><polygon points="526,160 512,66 456,122" fill="#7a4f2e"/>
<ellipse cx="400" cy="214" rx="142" ry="104" fill="#9a6a43"/>
<circle cx="348" cy="220" r="66" fill="#f4e5c2"/><circle cx="452" cy="220" r="66" fill="#f4e5c2"/>
<circle cx="348" cy="220" r="42" fill="#f2a900"/><circle cx="452" cy="220" r="42" fill="#f2a900"/>
<circle cx="348" cy="220" r="21" fill="#1a1a1a"/><circle cx="452" cy="220" r="21" fill="#1a1a1a"/>
<circle cx="340" cy="212" r="7" fill="#fff"/><circle cx="444" cy="212" r="7" fill="#fff"/>
<polygon points="400,236 380,280 420,280" fill="#f09a1c"/>
<rect x="352" y="470" width="20" height="30" rx="10" fill="#f09a1c"/><rect x="384" y="470" width="20" height="30" rx="10" fill="#f09a1c"/><rect x="418" y="470" width="20" height="30" rx="10" fill="#f09a1c"/>
`},
{ id: "butterfly", cat: "animals", title: "Butterfly", k: 14, detail: 3, smooth: 1, svg: `
<defs><g id="wing">
<path d="M400,300 C440,150 620,90 700,170 C760,230 690,330 560,350Z" fill="#2b1b3a"/>
<path d="M412,302 C446,176 598,126 668,186 C714,226 664,314 560,336Z" fill="#f7931e"/>
<circle cx="636" cy="212" r="22" fill="#ffe08a"/><circle cx="574" cy="176" r="15" fill="#ffe08a"/>
<path d="M400,330 C470,330 640,360 650,440 C655,512 560,542 500,480 C450,440 420,400 400,360Z" fill="#2b1b3a"/>
<path d="M412,346 C470,346 612,372 620,438 C624,490 560,512 512,466 C466,430 434,396 412,366Z" fill="#ffd23a"/>
<circle cx="568" cy="446" r="18" fill="#f7931e"/>
</g></defs>
<rect width="800" height="470" fill="#cdeefc"/>
<rect y="470" width="800" height="130" fill="#7bc96f"/>
<ellipse cx="130" cy="110" rx="76" ry="22" fill="#fff"/><ellipse cx="186" cy="96" rx="46" ry="20" fill="#fff"/>
<ellipse cx="660" cy="80" rx="60" ry="18" fill="#fff"/>
<rect x="116" y="470" width="14" height="130" fill="#3d9a4a"/>
<ellipse cx="90" cy="530" rx="40" ry="14" fill="#3d9a4a" transform="rotate(-24 90 530)"/>
<circle cx="123" cy="430" r="34" fill="#f26a9a"/><circle cx="160" cy="410" r="34" fill="#f26a9a"/><circle cx="196" cy="438" r="34" fill="#f26a9a"/><circle cx="162" cy="468" r="34" fill="#f26a9a"/><circle cx="104" cy="466" r="34" fill="#f26a9a"/>
<circle cx="155" cy="438" r="26" fill="#ffd23a"/>
<rect x="652" y="500" width="12" height="100" fill="#3d9a4a"/>
<circle cx="640" cy="486" r="22" fill="#fff"/><circle cx="670" cy="474" r="22" fill="#fff"/><circle cx="690" cy="500" r="22" fill="#fff"/><circle cx="662" cy="516" r="22" fill="#fff"/><circle cx="636" cy="512" r="22" fill="#fff"/>
<circle cx="662" cy="496" r="16" fill="#ffb02e"/>
<use href="#wing"/>
<use href="#wing" transform="translate(800,0) scale(-1,1)"/>
<ellipse cx="400" cy="360" rx="15" ry="92" fill="#3a2438"/>
<circle cx="400" cy="262" r="21" fill="#3a2438"/>
`},

/* ------------------------------------------------------------------ AIRPLANES */
{ id: "jet", cat: "airplanes", title: "Jet", k: 14, detail: 3, smooth: 1, svg: `
<defs><clipPath id="fus"><path d="M120,300 C120,270 190,258 300,258 L560,258 C640,258 700,280 732,300 C700,322 640,340 560,342 L300,342 C190,342 120,330 120,300Z"/></clipPath></defs>
<rect width="800" height="200" fill="#58aeea"/><rect y="200" width="800" height="200" fill="#98d1f5"/><rect y="400" width="800" height="200" fill="#cdeafa"/>
<ellipse cx="170" cy="480" rx="130" ry="40" fill="#fff"/><ellipse cx="300" cy="500" rx="110" ry="34" fill="#fff"/>
<ellipse cx="620" cy="520" rx="150" ry="44" fill="#fff"/><ellipse cx="740" cy="476" rx="90" ry="34" fill="#fff"/>
<ellipse cx="560" cy="130" rx="76" ry="20" fill="#fff"/><ellipse cx="610" cy="116" rx="46" ry="18" fill="#fff"/>
<polygon points="400,262 350,198 424,198 500,262" fill="#aab6c2"/>
<polygon points="150,268 128,150 184,150 268,262" fill="#2f6fb5"/>
<polygon points="190,300 120,330 170,342 262,326" fill="#c5cfd8"/>
<path d="M120,300 C120,270 190,258 300,258 L560,258 C640,258 700,280 732,300 C700,322 640,340 560,342 L300,342 C190,342 120,330 120,300Z" fill="#f4f6f8"/>
<g clip-path="url(#fus)"><rect x="100" y="320" width="660" height="40" fill="#2f6fb5"/></g>
<polygon points="360,300 296,430 404,432 524,326" fill="#dce4ea"/>
<ellipse cx="440" cy="386" rx="58" ry="22" fill="#98a5b2"/><ellipse cx="500" cy="386" rx="20" ry="17" fill="#6b7785"/>
<polygon points="652,276 706,288 694,302 648,298" fill="#3d5a80"/>
<circle cx="260" cy="286" r="9" fill="#3d5a80"/><circle cx="300" cy="286" r="9" fill="#3d5a80"/><circle cx="340" cy="286" r="9" fill="#3d5a80"/><circle cx="380" cy="286" r="9" fill="#3d5a80"/><circle cx="420" cy="286" r="9" fill="#3d5a80"/><circle cx="460" cy="286" r="9" fill="#3d5a80"/><circle cx="500" cy="286" r="9" fill="#3d5a80"/><circle cx="540" cy="286" r="9" fill="#3d5a80"/><circle cx="580" cy="286" r="9" fill="#3d5a80"/>
`},
{ id: "biplane", cat: "airplanes", title: "Biplane", k: 16, detail: 3, smooth: 1, svg: `
<rect width="800" height="600" fill="#6cc06a"/>
<rect width="800" height="300" fill="#82cdf2"/><rect y="300" width="800" height="120" fill="#b9e4f7"/>
<circle cx="140" cy="110" r="54" fill="#ffe56a"/>
<ellipse cx="520" cy="96" rx="86" ry="24" fill="#fff"/><ellipse cx="580" cy="80" rx="52" ry="22" fill="#fff"/>
<ellipse cx="260" cy="190" rx="60" ry="16" fill="#fff"/>
<path d="M0,520 Q200,440 420,500 T800,470 V600 H0Z" fill="#6cc06a"/>
<path d="M0,570 Q250,520 520,566 T800,548 V600 H0Z" fill="#4ea65a"/>
<rect x="268" y="206" width="14" height="150" fill="#6b4426"/><rect x="520" y="206" width="14" height="150" fill="#6b4426"/>
<rect x="240" y="190" width="330" height="30" rx="15" fill="#f2c230"/>
<polygon points="170,288 146,222 204,232 246,282" fill="#f2c230"/>
<path d="M170,286 L556,262 C620,258 672,272 692,302 C672,332 620,346 556,342 L170,322Z" fill="#d63a2f"/>
<rect x="250" y="334" width="320" height="28" rx="14" fill="#f2c230"/>
<ellipse cx="520" cy="278" rx="40" ry="19" fill="#3d5a80"/><circle cx="520" cy="268" r="15" fill="#f3c9a0"/>
<ellipse cx="704" cy="302" rx="9" ry="74" fill="#3a3a3a"/><circle cx="694" cy="302" r="18" fill="#f2c230"/>
<rect x="470" y="352" width="12" height="48" fill="#5a3a22"/>
<circle cx="476" cy="408" r="30" fill="#2b2b2b"/><circle cx="476" cy="408" r="12" fill="#c9d0d6"/>
<circle cx="176" cy="330" r="12" fill="#2b2b2b"/>
`},
{ id: "seaplane", cat: "airplanes", title: "Seaplane", k: 16, detail: 3, smooth: 1, svg: `
<rect width="800" height="280" fill="#7ec9f0"/><rect y="280" width="800" height="100" fill="#bfe6f7"/>
<ellipse cx="610" cy="90" rx="80" ry="22" fill="#fff"/><ellipse cx="664" cy="76" rx="48" ry="20" fill="#fff"/>
<polygon points="0,400 110,290 220,380 350,260 480,390 600,310 720,380 800,330 800,420 0,420" fill="#6c8fb8"/>
<polygon points="0,420 80,350 190,420 300,350 410,420 540,356 650,420 800,372 800,440 0,440" fill="#4f7aa6"/>
<rect y="420" width="800" height="180" fill="#2d78b8"/>
<ellipse cx="200" cy="480" rx="120" ry="9" fill="#4b93d0"/><ellipse cx="620" cy="540" rx="130" ry="9" fill="#4b93d0"/><ellipse cx="420" cy="580" rx="100" ry="8" fill="#4b93d0"/>
<rect x="250" y="404" width="14" height="36" fill="#6b6f78"/><rect x="480" y="404" width="14" height="36" fill="#6b6f78"/>
<ellipse cx="370" cy="470" rx="178" ry="22" fill="#e8ebee"/>
<path d="M164,316 L520,296 C590,294 650,306 676,330 C650,352 590,364 520,362 L164,350Z" fill="#f4f1ea"/>
<polygon points="168,322 146,238 200,248 250,316" fill="#f08a24"/>
<rect x="230" y="318" width="350" height="22" fill="#f08a24"/>
<rect x="210" y="262" width="360" height="26" rx="13" fill="#f4f1ea"/>
<rect x="210" y="276" width="360" height="12" fill="#f08a24"/>
<rect x="318" y="288" width="12" height="28" fill="#c9cfd6"/><rect x="456" y="288" width="12" height="28" fill="#c9cfd6"/>
<polygon points="590,308 646,318 636,336 586,332" fill="#3d5a80"/>
<polygon points="400,350 420,350 432,406 396,406" fill="#9aa4ae"/>
<ellipse cx="690" cy="330" rx="9" ry="66" fill="#3a3a3a"/><circle cx="680" cy="330" r="16" fill="#f08a24"/>
`},
{ id: "helicopter", cat: "airplanes", title: "Helicopter", k: 14, detail: 3, smooth: 1, svg: `
<rect width="800" height="170" fill="#5a4aa0"/><rect y="170" width="800" height="110" fill="#e8688a"/><rect y="280" width="800" height="120" fill="#fbb468"/>
<circle cx="640" cy="360" r="84" fill="#ffe9a6"/>
<polygon points="0,420 0,330 70,330 70,290 130,290 130,350 200,350 200,310 270,310 270,380 340,380 340,300 410,300 410,360 480,360 480,320 560,320 560,390 640,390 640,340 720,340 720,300 800,300 800,420" fill="#38306a"/>
<rect y="420" width="800" height="180" fill="#2b2558"/>
<path d="M0,560 Q200,500 420,550 T800,520 V600 H0Z" fill="#3c3478"/>
<rect x="395" y="196" width="18" height="50" fill="#555"/>
<ellipse cx="404" cy="190" rx="290" ry="9" fill="#2a2a2a"/>
<polygon points="160,310 90,260 120,248 250,290" fill="#f2b21c"/>
<rect x="76" y="226" width="26" height="60" rx="8" fill="#e29a10"/>
<path d="M170,300 C170,230 260,220 400,224 C510,226 560,260 560,320 C560,384 470,404 380,404 C260,404 170,380 170,300Z" fill="#f2b21c"/>
<path d="M440,246 C520,248 556,284 552,330 L440,330Z" fill="#8fc9ea"/>
<rect x="280" y="296" width="130" height="40" rx="10" fill="#fff0c0"/>
<rect x="250" y="436" width="330" height="14" rx="7" fill="#666"/>
<rect x="300" y="404" width="12" height="38" fill="#666"/><rect x="500" y="404" width="12" height="38" fill="#666"/>
<circle cx="84" cy="256" r="26" fill="#e29a10"/>
`},

/* ------------------------------------------------------------------ SPORTS */
{ id: "soccer", cat: "sports", title: "Soccer Ball", k: 14, detail: 3, smooth: 1, svg: `
<rect width="800" height="600" fill="#d8dce4"/>
<defs><clipPath id="ball"><circle cx="400" cy="420" r="112"/></clipPath></defs>
<rect width="800" height="210" fill="#8fd0f2"/>
<polygon points="0,250 0,130 90,130 90,98 200,98 200,150 300,150 300,120 420,120 420,160 540,160 540,108 650,108 650,140 800,140 800,250" fill="#9aa4b4"/>
<rect y="250" width="800" height="60" fill="#d8dce4"/>
<rect y="300" width="800" height="300" fill="#4fa850"/>
<rect y="380" width="800" height="62" fill="#5cb85c"/><rect y="500" width="800" height="100" fill="#5cb85c"/>
<rect x="130" y="196" width="540" height="150" fill="#e9eef2"/>
<rect x="116" y="186" width="568" height="14" fill="#fff"/><rect x="116" y="186" width="14" height="168" fill="#fff"/><rect x="670" y="186" width="14" height="168" fill="#fff"/>
<ellipse cx="400" cy="548" rx="120" ry="16" fill="#3e8f40"/>
<circle cx="400" cy="420" r="112" fill="#fff"/>
<g clip-path="url(#ball)" fill="#222">
<polygon points="400,386 432,409 420,447 380,447 368,409"/>
<polygon points="400,296 436,320 424,362 376,362 364,320"/>
<polygon points="512,386 530,420 504,456 470,438 478,396"/>
<polygon points="468,520 500,520 520,500 492,462 462,484"/>
<polygon points="332,520 300,520 280,500 308,462 338,484"/>
<polygon points="288,386 270,420 296,456 330,438 322,396"/>
</g>
`},
{ id: "basketball", cat: "sports", title: "Basketball", k: 14, detail: 3, smooth: 1, svg: `
<rect width="800" height="600" fill="#cfc3ad"/>
<rect width="800" height="360" fill="#e9e1d1"/>
<rect y="150" width="800" height="60" fill="#d6ccb8"/>
<polygon points="0,600 0,380 800,380 800,600" fill="#d99a52"/>
<polygon points="0,470 800,470 800,486 0,486" fill="#c68443"/>
<polygon points="0,540 800,540 800,556 0,556" fill="#c68443"/>
<rect x="388" y="150" width="24" height="230" fill="#555a66"/>
<rect x="268" y="56" width="264" height="170" rx="10" fill="#fff"/>
<rect x="276" y="64" width="248" height="154" rx="6" fill="#d8dee6"/>
<rect x="332" y="124" width="136" height="86" fill="#fff"/>
<rect x="344" y="136" width="112" height="62" fill="#d8dee6"/>
<polygon points="336,238 464,238 444,320 356,320" fill="#eceff3"/>
<polygon points="354,252 446,252 436,300 364,300" fill="#cfd6de"/>
<ellipse cx="400" cy="238" rx="76" ry="14" fill="#f26a1b"/>
<ellipse cx="400" cy="238" rx="52" ry="7" fill="#e9e1d1"/>
<ellipse cx="620" cy="556" rx="84" ry="12" fill="#b9793a"/>
<circle cx="620" cy="470" r="78" fill="#f28c28"/>
<path d="M542,470 H698" stroke="#2b1b10" stroke-width="7" fill="none"/>
<path d="M620,392 V548" stroke="#2b1b10" stroke-width="7" fill="none"/>
<path d="M568,414 C598,444 598,496 568,526" stroke="#2b1b10" stroke-width="7" fill="none"/>
<path d="M672,414 C642,444 642,496 672,526" stroke="#2b1b10" stroke-width="7" fill="none"/>
`},
{ id: "baseball", cat: "sports", title: "Baseball", k: 16, detail: 3, smooth: 1, svg: `
<rect width="800" height="330" fill="#8fd0f2"/>
<ellipse cx="170" cy="96" rx="80" ry="22" fill="#fff"/><ellipse cx="226" cy="82" rx="50" ry="20" fill="#fff"/>
<ellipse cx="650" cy="150" rx="70" ry="18" fill="#fff"/>
<rect y="330" width="800" height="270" fill="#4fa850"/>
<polygon points="400,350 640,470 400,590 160,470" fill="#d9a769"/>
<polygon points="400,386 580,470 400,554 220,470" fill="#4fa850"/>
<rect x="378" y="578" width="44" height="14" fill="#fff"/><rect x="618" y="458" width="44" height="14" fill="#fff"/><rect x="138" y="458" width="44" height="14" fill="#fff"/><rect x="378" y="338" width="44" height="14" fill="#fff"/>
<polygon points="196,430 580,150 612,196 228,476" fill="#c98b4a"/>
<polygon points="196,430 228,476 176,514 146,470" fill="#3b2a20"/>
<ellipse cx="640" cy="152" rx="26" ry="42" fill="#d49a58" transform="rotate(36 640 152)"/>
<ellipse cx="480" cy="420" rx="96" ry="14" fill="#3e8f40"/>
<circle cx="480" cy="330" r="96" fill="#fff"/>
<path d="M430,252 C466,286 466,376 430,410" stroke="#d63a2f" stroke-width="8" fill="none"/>
<path d="M530,252 C494,286 494,376 530,410" stroke="#d63a2f" stroke-width="8" fill="none"/>
`},
{ id: "tennis", cat: "sports", title: "Tennis", k: 14, detail: 3, smooth: 1, svg: `
<rect width="800" height="600" fill="#3a9560"/>
<rect x="40" y="40" width="720" height="520" fill="#4aa86e"/>
<rect x="40" y="40" width="720" height="14" fill="#fff"/><rect x="40" y="546" width="720" height="14" fill="#fff"/>
<rect x="40" y="40" width="14" height="520" fill="#fff"/><rect x="746" y="40" width="14" height="520" fill="#fff"/>
<rect x="40" y="293" width="720" height="14" fill="#fff"/>
<ellipse cx="236" cy="480" rx="96" ry="14" fill="#3a9560"/>
<ellipse cx="400" cy="250" rx="130" ry="162" fill="#1d4fa8" transform="rotate(-24 400 250)"/>
<ellipse cx="400" cy="250" rx="106" ry="138" fill="#e4f1ff" transform="rotate(-24 400 250)"/>
<ellipse cx="400" cy="250" rx="34" ry="46" fill="#cfe4fa" transform="rotate(-24 400 250)"/>
<polygon points="455,403 477,393 530,512 508,522" fill="#1d4fa8"/>
<polygon points="500,500 524,490 540,526 516,536" fill="#222"/>
<ellipse cx="620" cy="222" rx="68" ry="12" fill="#3a9560"/>
<circle cx="620" cy="160" r="52" fill="#d7e83b"/>
<path d="M584,130 C610,150 610,176 584,196" stroke="#fff" stroke-width="7" fill="none"/>
<path d="M656,130 C630,150 630,176 656,196" stroke="#fff" stroke-width="7" fill="none"/>
`}
];

/* Draw a picture into a canvas (1200 x 900) and hand it back. */
function renderPicture(p, done) {
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="1200" height="900">' + p.svg + '</svg>';
  var img = new Image();
  img.onload = function () {
    var c = document.createElement("canvas"); c.width = 1200; c.height = 900;
    var g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, 1200, 900); g.drawImage(img, 0, 0, 1200, 900);
    done(c);
  };
  img.onerror = function () { done(null); };
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
function pictureThumbUrl(p) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' + p.svg + '</svg>');
}
