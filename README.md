# Underpaint

Turn a photo into flat, numbered color regions and a layered PSD (lines and numbers over an empty "Paint here" layer) for Procreate or Adobe Fresco. Everything runs in your browser; photos never leave your device.

Live site: https://underpaint.netlify.app/

## Using it

Click **Help** in the top right of the app for a built-in guide: quick start, what every control does, what is in the downloaded zip, painting tips for Procreate and Fresco, and troubleshooting. The help text lives in the `<dialog id="help">` block of `src/template.html`; edit it there and rebuild.

Notes: `palette.swatches` (a Procreate palette, limited to the first 30 colors) has not yet been tested in Procreate. The PSD layers are, top to bottom: Lines + numbers, Paint here, Paper, and a hidden Color key.

## Layout

- `index.html`: the built, self-contained app. This is what gets deployed.
- `src/template.html`: UI and app code.
- `src/core.js`: the image-processing engine (Lab k-means, smoothing, region cleanup, number placement).
- `src/vendor/ag-psd.bundle.js`: [ag-psd](https://github.com/Agamnentzar/ag-psd) 30.2.0 (MIT), used to write the PSD.
- `src/build.py`: combines the three into `index.html`.

## Editing

1. Change `src/template.html` or `src/core.js`.
2. Run `python3 src/build.py` (no dependencies beyond Python 3).
3. Open `index.html` in a browser to test.
4. Commit and push. Netlify deploys the new `index.html` automatically.

Remember to rebuild before pushing, or the live site won't change.

## Deploying on Netlify

Connect this repo as a project with no build command and the publish directory set to the repo root.
