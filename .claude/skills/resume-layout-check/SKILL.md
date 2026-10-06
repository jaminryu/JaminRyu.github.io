---
name: resume-layout-check
description: Check the résumé layout - full-page desktop screenshots and A4 print page counts in all three languages, and horizontal overflow at 375px phone width. Use after changing content length, styles, or rendering code, and before publishing.
---

# Layout and print check

## 1. Screenshots and A4 page counts

Run from the workspace root. It checks the editor preview by default; you can also pass a local static server:

```sh
github-pages/.claude/skills/resume-layout-check/scripts/layout-check.sh
github-pages/.claude/skills/resume-layout-check/scripts/layout-check.sh http://127.0.0.1:4173/ <output-dir>
```

The script prints the A4 page count per language and saves `desktop-<lang>.png` and `print-<lang>.pdf` in the output directory.

- **Target**: three pages or fewer per language, and the last page must not hold only a heading or the footer.
- **If it is over**: tighten the text first. If that is not enough, adjust `@media print` in `local-editor/public/preview-styles.css` (spacing, font size, two-column credentials), restart the editor, and check again.
- **Reading screenshots**: full-page screenshots are tall, so crop them first:
  ```sh
  python3 -c "from PIL import Image; im=Image.open('desktop-ja.png'); [im.crop((120,a,980,a+1200)).save(f'ja-{i}.png') for i,a in enumerate(range(0,im.height,1150))]"
  pdftoppm -r 50 -png print-ja.pdf page    # one PNG per printed page
  ```
- **What to look at**:
  - natural Japanese line breaks;
  - right-aligned dates;
  - readable grey tech-stack lines;
  - folded papers and credentials expanded in print.

## 2. Phone width

Headless Chrome has a minimum window width, so its phone screenshots are clipped and unreliable. Emulate a 375px viewport in the browser pane and run:

```js
const out = {};
for (const l of ['ja', 'en', 'zh']) {
  document.querySelector(`[data-lang="${l}"]`).click();
  await new Promise(r => setTimeout(r, 200));
  document.querySelectorAll('main details').forEach(d => d.open = true);
  out[l] = { scrollWidth: document.documentElement.scrollWidth, viewport: innerWidth,
    overflow: [...document.querySelectorAll('main *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 5).map(e => e.className || e.tagName) };
}
out
```

`scrollWidth` should equal `viewport` and `overflow` should be empty in all three languages. Reset the viewport to desktop afterwards.

## 3. Other checks

- On the Japanese page, `getComputedStyle(document.body).fontFamily` should resolve to the Japanese font stack (Hiragino Sans, BIZ UDPGothic, Meiryo).
- `og:title` and `og:description` follow the English `title` and `description`.
