import os
SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SRC)
import re
t = open(os.path.join(SRC,'template.html')).read()
core = open(os.path.join(SRC,'core.js')).read()
psd = open(os.path.join(SRC,'vendor','ag-psd.bundle.js')).read()
assert '</script' not in psd and '</script' not in core

# 1. downloads: plain browser downloads instead of the Claude-only capability
a = t.index('  // ---------- downloads capability')
b = t.index('  // ---------- start with the sample')
fallback = '''  // ---------- downloads: normal browser downloads ----------
  state.downloads = {
    save: function (req) {
      var blob = req.data instanceof Blob ? req.data : new Blob([req.data]);
      var url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = req.filename; a.style.display = "none";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
      return Promise.resolve({ status: "saved" });
    }
  };

'''
t = t[:a] + fallback + t[b:]

# 2. inline ag-psd so the page has no script dependency
cdn = '<script src="https://cdn.jsdelivr.net/npm/ag-psd@30.2.0/dist/bundle.js"></script>'
assert cdn in t
t = t.replace(cdn, '<script>\n' + psd + '\n</script>')
t = t.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')
t = t.replace('/*__CORE__*/', core)

# 3. a real document around it
split = t.index('<div class="wrap">')
head, body = t[:split], t[split:]
favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%232742d6'/%3E%3Cpath d='M6 22l7-9 5 6 3-4 5 7z' fill='%23fff'/%3E%3C/svg%3E"
doc = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
       '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
       '<meta name="description" content="Underpaint turns a photo into flat, numbered color regions and a layered PSD for Procreate or Fresco. Runs in your browser.">\n'
       '<link rel="icon" href="' + favicon + '">\n'
       '<style>:root{color-scheme:light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n'
       + head + '\n</head>\n<body>\n' + body.rstrip() + '\n</body>\n</html>\n')
open(os.path.join(ROOT,'index.html'), 'w').write(doc)
print(len(doc))
