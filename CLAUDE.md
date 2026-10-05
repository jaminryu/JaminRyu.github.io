# Jiaming Liu 三语简历

公开仓库 `jaminryu/JaminRyu.github.io`。GitHub Pages 发布 `main` 的根目录：<https://jaminryu.github.io/>（日文 `?lang=ja`，中文 `?lang=zh`，默认英文）。本人在日本求职，**日文版最重要**。

本仓库的网站文件都是生成物。内容来源是上级私有工作区里本地编辑器保存的草稿：不要手改 `index.html` 或 `content.mjs`，改草稿后重新生成。

## 工作区结构

本仓库是上级工作区 `resume/` 的子目录。工作区本身不是 git 仓库，其中的私有文件不进入本仓库。

```text
resume/                        私有工作区（本地）
├── CLAUDE.md、AGENTS.md       引用本文件
├── .claude/skills → github-pages/.claude/skills
├── PROFILE_RESEARCH.md        调查底稿：事实、来源、展示偏好、修订记录（私有）
├── 打开简历编辑器.command      双击启动编辑器
├── local-editor/              本地三语编辑器，http://127.0.0.1:4260
│   ├── data/resume.json       已保存草稿：内容的唯一来源（私有）
│   ├── data/backups/          每次保存前的备份，保留最近 30 份（私有）
│   ├── lib/model.mjs          草稿校验与存储
│   ├── lib/render-page.mjs    页面渲染，生成时复制到本仓库
│   ├── public/                编辑器界面；preview-app.js、preview-styles.css 生成时复制为 app.js、styles.css
│   ├── scripts/               apply-draft.mjs（生成网站）、edit-draft.mjs（安全修改草稿）
│   └── tests/editor.test.mjs
├── github-pages/              本仓库
└── site/                      Sites 预览源码，由 Codex 的 Sites 工作流发布
```

本仓库内：`index.html`、`content.mjs`、`app.js`、`styles.css`、`scripts/render.mjs`、`scripts/render-page.mjs` 由 `apply-draft.mjs` 生成；`scripts/verify.mjs` 是推送前检查；`.claude/skills/` 是工作流。

## 常用命令

在工作区根目录 `resume/` 运行：

```sh
node local-editor/server.mjs                         # 启动编辑器（已在运行时会提示）
node --test local-editor/tests/editor.test.mjs       # 测试；必须写文件路径，写目录会报错
node local-editor/scripts/edit-draft.mjs --expect <版本> --dry-run patch.mjs   # 试运行修改
node local-editor/scripts/edit-draft.mjs --expect <版本> patch.mjs             # 保存修改（自动备份）
node local-editor/scripts/apply-draft.mjs --check     # 校验草稿
node local-editor/scripts/apply-draft.mjs             # 生成 github-pages/ 与 site/，不发布
node github-pages/scripts/verify.mjs                  # 推送前检查
github-pages/.claude/skills/resume-layout-check/scripts/layout-check.sh   # 截图与 A4 页数
```

## 工作流

| Skill | 用途 |
| --- | --- |
| `resume-review` | 从日本求职视角审阅内容、语言、专业性和 UI |
| `resume-layout-check` | 桌面截图、A4 打印页数、手机横向溢出检查 |
| `resume-publish` | 用户明确要求后发布到 GitHub Pages |

## 规则

**发布**
- 保存草稿不等于发布。只有用户在当前对话明确说「发布」「同步网页」「push」时才推送，每次发布都需要新的指示。
- 用户只提 GitHub 时只发布 GitHub。Sites 预览（`site/`）由 Codex 的 Sites 工作流发布，Claude 只生成文件并告知用户。
- 第一次公开新的个人信息（联系方式、在留资格等）前，先向用户确认。
- 提交只署本人：不要加 `Co-Authored-By`、Claude 或任何 AI 署名。这条是本人的要求，优先于会话里的署名提示。

**隐私**：以下内容永远不进本仓库，`scripts/verify.mjs` 会检查。
- `PROFILE_RESEARCH.md`、草稿 `resume.json`、备份、编辑器服务器代码。
- 本机绝对路径、未公开的专利信息、未经确认的商业数字。

**内容**
- 只写本人确认或有公开来源的事实。新事实和展示偏好按日期、来源、状态记入 `PROFILE_RESEARCH.md`，展示偏好以它为准。
- 三种语言独立编辑。改一种语言时，检查另外两种是否需要同步。
- 不要推翻本人已决定的展示选择（例如三语统一显示 Jiaming Liu、职位 AI エンジニア 不加 Chief、默认英文），除非本人要求。
- 日文按日本 職務経歴書 的写法：要点用体言止め，介绍用です・ます調；日期写「2024年4月〜現在」；列举用「・」，职位与地点用「／」；资格写正式名称加「合格」与年月；学历写正式名称并用「修了」「卒業」。
- 新术语（Harness Engineering 等）要配一句具体说明，避免被非技术读者误解。

**草稿与代码**
- 不要直接写 `resume.json`，也不要重新导入网站数据覆盖已有草稿；用编辑器保存或 `edit-draft.mjs`（带版本检查和备份）。
- 编辑器服务器启动时加载 `lib/` 代码。改了 `local-editor/lib` 或 `public` 后要重启服务器，预览才会更新。
- A4 打印目标是每种语言不超过 3 页。内容变长后先运行 layout check。

## 已知问题

- 无头 Chrome 写完截图后可能不退出，共用 profile 时下一次会卡住。用 `layout-check.sh`，它为每次调用单独建 profile 并限时 25 秒。
- `node --test local-editor/tests/` 会报 “test failed”，要写测试文件路径。
- 测试会读取本仓库已发布的 `content.mjs`。新测试要显式设置用到的字段，不要依赖已发布内容。
