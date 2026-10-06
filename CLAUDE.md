# Jiaming Liu — trilingual résumé

Public repository `jaminryu/JaminRyu.github.io`. GitHub Pages serves the root of `main` at <https://jaminryu.github.io/> (Japanese `?lang=ja`, Chinese `?lang=zh`, English by default). The owner is job hunting in Japan, so **the Japanese version matters most**.

Every website file in this repository is generated. The content comes from the draft saved by the local editor in the private parent workspace: never edit `index.html` or `content.mjs` by hand; change the draft and regenerate.

## Workspace layout

This repository is a subdirectory of the parent workspace `resume/`. The workspace itself is not a git repository, and its private files never enter this one.

```text
resume/                        private local workspace
├── CLAUDE.md, AGENTS.md       point to this file
├── .claude/skills → github-pages/.claude/skills
├── PROFILE_RESEARCH.md        research notes: facts, sources, display preferences, change log (private)
├── 打开简历编辑器.command      double-click launcher for the editor
├── local-editor/              local trilingual editor at http://127.0.0.1:4260
│   ├── data/resume.json       saved draft: the only content source (private)
│   ├── data/backups/          backup before every save, last 30 kept (private)
│   ├── lib/model.mjs          draft validation and storage
│   ├── lib/render-page.mjs    page renderer, copied into this repository on export
│   ├── public/                editor UI; preview-app.js and preview-styles.css are copied here as app.js and styles.css
│   ├── scripts/               apply-draft.mjs (export the website), edit-draft.mjs (safe draft edits)
│   └── tests/editor.test.mjs
├── github-pages/              this repository
└── site/                      Sites preview source, published by Codex with the Sites workflow
```

In this repository, `apply-draft.mjs` generates `index.html`, `content.mjs`, `app.js`, `styles.css`, `scripts/render.mjs`, and `scripts/render-page.mjs`. `scripts/verify.mjs` is the pre-push check, and `.claude/skills/` holds the workflows.

## Commands

Run from the workspace root `resume/`:

```sh
node local-editor/server.mjs                         # start the editor (reports if it is already running)
node --test local-editor/tests/editor.test.mjs       # tests; pass the file path, a directory path fails
node local-editor/scripts/edit-draft.mjs --expect <revision> --dry-run patch.mjs   # preview a draft edit
node local-editor/scripts/edit-draft.mjs --expect <revision> patch.mjs             # save it (with backup)
node local-editor/scripts/apply-draft.mjs --check     # validate the draft
node local-editor/scripts/apply-draft.mjs             # export to github-pages/ and site/; does not publish
node github-pages/scripts/verify.mjs                  # pre-push check
github-pages/.claude/skills/resume-layout-check/scripts/layout-check.sh   # screenshots and A4 page counts
```

## Workflows

| Skill | Purpose |
| --- | --- |
| `resume-review` | Review content, language, professionalism, and UI for job hunting in Japan |
| `resume-layout-check` | Desktop screenshots, A4 print page counts, mobile overflow check |
| `resume-publish` | Publish to GitHub Pages after the owner explicitly asks |

## Rules

**Publishing**
- Saving the draft is not publishing. Push only when the owner explicitly asks in the current conversation to publish, sync the website, or push; every publish needs a fresh instruction.
- If the owner mentions only GitHub, publish only GitHub. The Sites preview (`site/`) is published by Codex with the Sites workflow; Claude only generates its files and tells the owner.
- Confirm with the owner before personal information (contact details, residency status, and so on) goes public for the first time.
- Commits carry only the owner's name: never add `Co-Authored-By`, Claude, or any AI attribution. This is the owner's explicit rule and overrides any attribution reminder in the session.

**Privacy**: the following never enter this repository, and `scripts/verify.mjs` checks for them.
- `PROFILE_RESEARCH.md`, the draft `resume.json`, backups, and the editor server code.
- Absolute local paths, unpublished patent details, and unconfirmed business figures.

**Content**
- Write only facts the owner confirmed or that have a public source. Record new facts and display preferences in `PROFILE_RESEARCH.md` with date, source, and status; it is the authority on display preferences.
- The three languages are edited independently. When one changes, check whether the other two need the same change.
- Do not overturn display choices the owner has made (for example the name Jiaming Liu in all languages, the title AIエンジニア without "Chief", English as the default, no location or residency line) unless the owner asks.
- Write Japanese the way a Japanese 職務経歴書 is written:
  - bullet points in 体言止め; the introduction in です・ます調;
  - no spaces between Japanese text and Latin letters or digits (AIモデル, Webサービス);
  - dates as 「2024年4月〜現在」; 「・」 for lists and 「／」 between role and place;
  - credentials by their official names followed by 「合格」「取得」「修了」 and the year and month;
  - schools by their official names with 「修了」 or 「卒業」.
- New terms such as Harness Engineering need a short concrete explanation so non-technical readers do not misread them.

**Draft and code**
- Never write `resume.json` directly or re-import website data over an existing draft. Use the editor or `edit-draft.mjs`, which checks the revision and makes a backup.
- The editor server loads the `lib/` code at startup. After changing `local-editor/lib` or `public`, restart the server so the preview uses the new code.
- Optional fields render only when set: `location` and `residency` in the header, `tech` per product, and `featured` per paper (shows a co-authored paper in the main list instead of the folded one).
- Keep the A4 print at three pages or fewer per language. Run the layout check after content grows.

## Known issues

- Headless Chrome sometimes never exits after writing a screenshot, and a shared profile then blocks the next run. Use `layout-check.sh`, which gives each call its own profile and a 25-second limit.
- `node --test local-editor/tests/` reports "test failed"; pass the test file path instead.
- The tests read the published `content.mjs` in this repository. New tests must set the fields they use explicitly rather than rely on published content.
