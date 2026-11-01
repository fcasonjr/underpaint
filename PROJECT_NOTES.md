# Underpaint: project notes

Last updated: 2026-11-01 (pictures start page and saved progress added; earlier: paint-in-browser mode) (legend, numbered color key, split swatches, outlines/numbers split for bucket fill)

## What it is

Underpaint turns a photo into flat, numbered color regions and a layered PSD for Procreate or Adobe Fresco. The PSD has an empty "Paint here" layer under a lines-and-numbers layer, so it works as a paint-by-number page, an impressionistic underpainting, or a base to add detail on top of. Everything runs in the browser; photos are never uploaded.

- Live site: https://underpaint.netlify.app/
- GitHub repo: `https://github.com/<your-username>/underpaint` (fill in)
- License: MIT (added through GitHub's license template)
- Also exists as a Claude-hosted artifact (a separate copy, no Help button, not updated with the repo). The Netlify site is the main version.

## How it is deployed

GitHub repo, connected to Netlify. Netlify publishes the repo root with no build command, so pushing a commit to `main` redeploys the site in about a minute. Rollback: Netlify's Deploys page lets you republish any earlier deploy; GitHub keeps file history.

## Repo layout

```
underpaint/
├── index.html            built, self-contained app (what Netlify serves)
├── README.md
├── LICENSE
├── .gitignore
└── src/
    ├── template.html     UI, styles, app logic, Help dialog
    ├── core.js           image-processing engine
    ├── pictures.js       16 ready-made SVG pictures + renderPicture()
    ├── build.py          combines the three into index.html
    └── vendor/
        ├── ag-psd.bundle.js    ag-psd 30.2.0 (MIT), writes the PSD
        └── ag-psd.LICENSE
```

`index.html` is generated. Never edit it by hand: edit `src/`, run `python3 src/build.py`, then commit `index.html` together with the source change. If you forget to rebuild, the live site will not change.

## How it works (short version)

1. Load the photo, optionally upscale up to 2x, smooth edges with a bilateral filter.
2. Optionally flatten a plain backdrop (flood fill from the border within a color tolerance).
3. Reduce to N colors with k-means in Lab color space. "Detail focus" weights the sampling toward textured areas.
4. Clean up labels with a mode filter, then merge any region too small to hold a readable number into a neighbor.
5. Draw outlines, and place each number at the center of its region's widest part.
6. Build outputs in the browser: layered PSD, PNGs, hex list and a Procreate `.swatches` file, all zipped with a hand-written zip writer.

Processing runs in a Web Worker so the page stays responsive.

## Controls

Preset (Balanced, Easy to paint, Portrait, Detailed scene, Custom), Grayscale (values only; converts the photo to gray before processing, independent of presets), Colors (4 to 64), Region size (1 to 5), Smoothing (0 to 3), Detail focus (0 to 3), Output size (1000 / 1600 / 2400), Line weight, Flatten backdrop with tolerance. The Help button in the app explains each one.

## Paint in the browser (added 2026-11-01)

A **Paint it here** button opens a full-screen painting view so someone can color the picture without Procreate or any files (made for a child to use on an iPad). Palette beside the image, tap a numbered color then tap a spot to fill it. Features: Match numbers (only the right color fills a spot, wrong tap wiggles the correct square), Show where (blue tint on spots for the selected color), Undo, Peek (hold to see finished colors), Lines toggle, pinch/scroll zoom and drag pan, Save picture (PNG), finished card. Regions are 4-connected areas of one palette number, found in the browser (same rule as the engine). Tested in headless Chromium on desktop, iPad-size and phone-size viewports with 58 and 991 regions (fill about 35 ms); not tested on a real iPad yet. 

## Pictures start page and saved progress (added 2026-11-01)

**Pictures to paint** (header button, or open `/#pictures`) shows 22 original illustrations: 16 flat-color SVGs in four categories (landscapes, animals, airplanes, sports), defined in `src/pictures.js` (`PICTURES`, 800 x 600 viewBox; each has `k`, `detail`, `smooth`). Choosing one renders it to a 1200 x 900 canvas, runs the normal engine with the picture's settings (about 3.5 s in headless Chromium) and opens Paint mode. A fifth category, **Painterly (harder)**, has six impressionist-style scenes (poppies, lily pond, harbor, autumn lane, snowy village, haystacks) generated at runtime from thousands of seeded brush dabs (`pbDabs` plus `scene*` functions in `pictures.js`; settings k 32, detail 2, smooth 2; 250 to 520 regions, about 8 s to prepare in headless Chromium; k 40 / detail 4 gave 1,000 to 1,700 regions, too many). The flat pictures come out with 11 to 39 regions, so they are easy; make a picture harder by raising `k` or adding detail.

Progress autosaves (700 ms after each fill, on Back, and when the tab is hidden) to IndexedDB database `underpaint`: store `paintings` (id `pic:<picId>` or `photo:<timestamp>`, painted-region array, counts, thumbnail, settings, signature) and store `photos` (original photo Blob, written once). Resume re-runs the engine with the saved settings and reapplies the painted array; the engine is deterministic. A signature (size, region count, palette) guards against a mismatch, in which case the painting starts fresh with a toast. Photos you paint appear under My photos. The built-in sample is not saved. Start over and Remove use a two-tap confirm. If IndexedDB is unavailable the gallery says progress will not be kept. Tested in headless Chromium: reload resume, start over, all 16 pictures, photo resume; not tested on a real iPad or Safari (Safari private mode and storage eviction are the likely trouble spots). `build.py` inlines `pictures.js` at the `/*__PICTURES__*/` marker.

Apple Pencil handling (2026-11-01, after the user reported the Pencil did nothing while mouse and finger worked): pen taps paint on up or on cancel, a resting palm (touch) is ignored while the pen is down (2 s guard), and a click fallback paints if no pointer events reach the view. Verified only with synthetic pen events in headless Chromium, not on a real Pencil.

Paint mode has a **Start over** button (two taps) and a **Paint it again** button on the finished card; both erase all colors and save the cleared state (added 2026-11-01).

## What is in the downloaded zip

`underpaint.psd` (layers top to bottom: Numbers, Outlines (set as Reference), Paint here, Paper, hidden Color key + numbers, hidden Color key), `numbered_sheet.png`, `lines_and_numbers_transparent.png`, `outlines_only_transparent.png`, `lines_over_photo.png`, `color_key.png`, `color_key_numbered.png`, `legend.png` (numbered chips in swatch order, for Procreate's Reference window), `palette.txt`, and one `palette_<from>-<to>.swatches` per 30 colors.

## Known gaps and things not yet tested

- **Not tested in the real apps:** opening the PSD in Procreate and Fresco, and importing `palette.swatches` into Procreate. The swatches format was written from memory. If it fails, the `palette.txt` hex list is the fallback.
- Swatch files are split into palettes of 30 colors (Procreate's limit). Procreate showed the swatches without numbers, which is why `legend.png` and the numbered Color key layer were added (2026-10-14). Whether the Reference-window workflow feels good in practice is untested.
- The Procreate and Fresco painting tips in the Help panel are from general knowledge of the apps, not from testing.
- Very large photos on phones may run out of memory; the Help panel suggests a smaller output size.
- The page loads fonts from Google Fonts, so offline it falls back to system fonts.

- Bucket-fill workflow (Color Drop in Procreate with the Outlines layer as Reference; Fill tool in Fresco) is described in the Help panel but untested in the apps. Fresco's exact option names are unverified.

## Possible next steps

- Test Paint mode on a real iPad (touch, pinch zoom, Apple Pencil). Ideas: more pictures (or a harder tier), sharing a puzzle by link or file, a completion celebration.

- Test the PSD, swatches and legend workflow in Procreate and Fresco, then fix the Help text based on what actually happens. Swatches did import in Procreate.
- If Procreate supports swatch names, put each number in its swatch name (not verified).
- Add a short "License" line to the README ("MIT, see LICENSE") if not already there.
- Ideas raised along the way: more presets, a way to merge or split individual regions, a per-region color override.

## How to resume work later

**With Claude:** open a new chat, attach this file and, if the code is needed, either the repo's `src/` folder or the zip of the repo, and say what you want changed. Ask Claude to rebuild and tell you exactly which files to upload and where.

**Uploading changes on GitHub:** unzip what Claude sends you, open the repo's Code tab, choose Add file, then Upload files, drag everything from the unzipped folder in (the `src` folder keeps its path), then Commit changes. Netlify redeploys automatically.

**Yourself:** edit `src/template.html` or `src/core.js`, run `python3 src/build.py`, open `index.html` in a browser to test, then commit and push.

## Design choices worth remembering

- A single self-contained `index.html`, so hosting is just static files and nothing needs a server.
- ag-psd is inlined (about 0.9 MB) so the page has no runtime dependency on a CDN for saving files.
- Smaller regions are merged rather than left unnumbered, so every visible region has a number.
- "Lines only" preview tab was removed as redundant; the "Over photo" tab with a Photo fade slider replaced it.
- Accent color is ultramarine `#2742d6`, with light and dark themes. Fonts: Bricolage Grotesque, Instrument Sans, DM Mono.
