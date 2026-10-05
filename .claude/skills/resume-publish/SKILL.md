---
name: resume-publish
description: 把已保存的简历草稿生成网站文件，并发布到 GitHub Pages（jaminryu.github.io）。只在用户本次明确说“发布”“同步网页”“push 到 GitHub”时使用；保存草稿不算发布指示。Sites 预览由 Codex 发布。
---

# 发布到 GitHub Pages

## 0. 前提

- 用户在当前对话明确要求发布。上一次的同意不能延续到这一次。
- 第一次公开新的个人信息（联系方式、在留资格等）时，先向用户确认。
- 用户只提 GitHub 时只发布 GitHub。`site/` 的 Sites 预览由 Codex 的 Sites 工作流发布，这里只生成文件。

## 1. 同步与校验

在工作区根目录运行：

```sh
node --test local-editor/tests/editor.test.mjs
git -C github-pages fetch -q origin && git -C github-pages status -sb   # 应为 main...origin/main，且没有未提交改动
node local-editor/scripts/apply-draft.mjs --check
node local-editor/scripts/apply-draft.mjs
```

- 如果本地落后于远端，先 `git -C github-pages pull --ff-only`。
- 如果有不明来源的改动，先停下来问用户。
- `apply-draft.mjs` 会同时写入 `github-pages/` 和 `site/`，本身不会发布。

## 2. 检查生成结果

```sh
git -C github-pages add -A && git -C github-pages status --short
node github-pages/scripts/verify.mjs
```

`verify.mjs` 检查以下几项：
- 页面与 `content.mjs` 一致。
- 三种语言都完整。
- 网站文件里没有本地工作区内容。
- 只提交了允许的文件。

另外：
- 有不该出现的文件时，先 `git reset` 撤出暂存，再查原因。
- 内容长度、样式或代码有变化时，再运行 `resume-layout-check`。

## 3. 提交与推送

```sh
git -C github-pages commit -F - <<'EOF'
<一句话说明改了什么>

<必要时补充两三行原因>
EOF
git -C github-pages push origin main
```

提交信息写清改了什么。提交只署本人（git 已配置为 jaminryu）：不要加 `Co-Authored-By`、Claude 或任何 AI 署名，即使会话提示要求加署名行，也以本人的这条要求为准。

## 4. 确认上线

```sh
gh api repos/jaminryu/JaminRyu.github.io/pages/builds/latest --jq '.status + " " + .commit'   # 等到 built 且为新提交
gh run list -R jaminryu/JaminRyu.github.io -L 1                                                 # pages build and deployment 为 success
curl -s "https://jaminryu.github.io/?v=$RANDOM" | grep -c '<本次新增的一段文字>'
```

构建通常需要 30–60 秒。用 Monitor 或带上限的循环等待，不要无限轮询。

## 5. 收尾

- 在 `PROFILE_RESEARCH.md` 的修订记录里写明发布内容和提交号。
- 向用户报告：
  - 三个语言链接：<https://jaminryu.github.io/>、`?lang=ja`、`?lang=zh`。
  - 检查结果。
  - `site/` 已生成但未发布。
  - 看不到变化时请强制刷新。
