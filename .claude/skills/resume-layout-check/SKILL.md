---
name: resume-layout-check
description: 检查简历页面的版式：三种语言的桌面整页截图、A4 打印页数，以及 375px 手机宽度下是否横向溢出。改了内容长度、样式或渲染代码之后，以及发布之前使用。
---

# 版式与打印检查

## 1. 截图与 A4 页数

在工作区根目录运行。默认检查编辑器预览，也可以传入本地静态服务的地址：

```sh
github-pages/.claude/skills/resume-layout-check/scripts/layout-check.sh
github-pages/.claude/skills/resume-layout-check/scripts/layout-check.sh http://127.0.0.1:4173/ <输出目录>
```

脚本输出每种语言的 A4 页数，并在输出目录保存 `desktop-<lang>.png` 和 `print-<lang>.pdf`。

- **目标**：每种语言不超过 3 页，最后一页不能只剩一个标题或页脚。
- **超出时**：先精简文字。仍然超出，再调整 `local-editor/public/preview-styles.css` 的 `@media print`，例如间距、字号或资格栏改两列。改完重启编辑器再检查。
- **查看截图**：整页截图很长，先裁成几段再看：
  ```sh
  python3 -c "from PIL import Image; im=Image.open('desktop-ja.png'); [im.crop((120,a,980,a+1200)).save(f'ja-{i}.png') for i,a in enumerate(range(0,im.height,1150))]"
  pdftoppm -r 50 -png print-ja.pdf page    # 打印版逐页转 PNG
  ```
- **查看要点**：
  - 日文换行是否自然。
  - 日期是否右对齐。
  - 技术栈灰字是否可读。
  - 折叠的论文和资格在打印时是否展开。

## 2. 手机宽度

无头 Chrome 的窗口宽度有下限，手机截图会被截断，不准确。用浏览器面板模拟 375px 宽度，再执行：

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

三种语言的 `scrollWidth` 都应等于 `viewport`，`overflow` 为空。检查完把视口恢复为桌面尺寸。

## 3. 其他

- `getComputedStyle(document.body).fontFamily` 在日文页面应以日文字体栈为准，例如 Hiragino Sans、BIZ UDPGothic、Meiryo。
- 内容变化后，`og:title` 和 `og:description` 跟随英文的 `title` 和 `description`。
