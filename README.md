# Jiaming Liu — résumé website

[English](https://jaminryu.github.io/) · [日本語](https://jaminryu.github.io/?lang=ja) · [中文](https://jaminryu.github.io/?lang=zh)

A dependency-free trilingual résumé: English by default, with Japanese and Chinese versions, a mobile layout, and an A4 print layout of up to three pages.

## How this repository works

The files here are generated. The content is edited in a private local editor and exported with its `apply-draft` script, so edit the draft rather than `index.html` or `content.mjs`.

| File | Role |
| --- | --- |
| `content.mjs` | All three languages, exported from the saved draft |
| `index.html` | Generated page: English markup plus Japanese and Chinese templates |
| `app.js` | Language switching, `?lang=` links, and print expansion |
| `styles.css` | Screen, mobile, and print styles |
| `scripts/render.mjs`, `scripts/render-page.mjs` | Regenerate `index.html` from `content.mjs` |
| `scripts/verify.mjs` | Pre-push check: reproducible render, all languages, no private files |
| `CLAUDE.md`, `.claude/skills/` | Rules and workflows for coding agents |

```sh
node scripts/render.mjs                              # regenerate index.html
node scripts/verify.mjs                              # check before pushing
python3 -m http.server 4173 --bind 127.0.0.1         # preview locally
```

## Publishing

GitHub Pages serves the root of the `main` branch at `jaminryu.github.io`. `.nojekyll` publishes the files as they are. Pushing to `main` updates the site.
