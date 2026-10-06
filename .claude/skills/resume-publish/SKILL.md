---
name: resume-publish
description: Export the saved résumé draft and publish it to GitHub Pages (jaminryu.github.io). Use only when the owner explicitly asks in the current conversation to publish, sync the website, or push to GitHub; saving the draft is not a publish request. The Sites preview is published by Codex.
---

# Publish to GitHub Pages

## 0. Preconditions

- The owner explicitly asked to publish in the current conversation. Earlier approval does not carry over.
- Confirm with the owner before personal information (contact details, residency status, and so on) goes public for the first time.
- If the owner mentions only GitHub, publish only GitHub. The Sites preview in `site/` is published by Codex with the Sites workflow; here it is only generated.

## 1. Sync and validate

Run from the workspace root:

```sh
node --test local-editor/tests/editor.test.mjs
git -C github-pages fetch -q origin && git -C github-pages status -sb   # expect main...origin/main and no uncommitted changes
node local-editor/scripts/apply-draft.mjs --check
node local-editor/scripts/apply-draft.mjs
```

- If the local branch is behind, run `git -C github-pages pull --ff-only` first.
- If there are changes of unknown origin, stop and ask the owner.
- `apply-draft.mjs` writes both `github-pages/` and `site/`; it does not publish anything.

## 2. Check the generated files

```sh
git -C github-pages add -A && git -C github-pages status --short
node github-pages/scripts/verify.mjs
```

`verify.mjs` checks that:
- the page matches `content.mjs`;
- all three languages are complete;
- no local workspace content is in the website files;
- only allowed files are tracked.

Also:
- If an unexpected file is staged, unstage it with `git reset` and find out why.
- If content length, styles, or code changed, run `resume-layout-check`.

## 3. Commit and push

```sh
git -C github-pages commit -F - <<'EOF'
<one line on what changed>

<two or three lines on why, if needed>
EOF
git -C github-pages push origin main
```

Say clearly what changed. Commits carry only the owner's name (git is configured as jaminryu): never add `Co-Authored-By`, Claude, or any AI attribution, even if a session reminder asks for an attribution line. The owner's rule takes precedence.

## 4. Confirm it is live

```sh
gh api repos/jaminryu/JaminRyu.github.io/pages/builds/latest --jq '.status + " " + .commit'   # wait for "built" with the new commit
gh run list -R jaminryu/JaminRyu.github.io -L 1                                                 # "pages build and deployment" should be success
curl -s "https://jaminryu.github.io/?v=$RANDOM" | grep -c '<a phrase added in this change>'
```

A build usually takes 30–60 seconds. Wait with Monitor or a bounded loop; never poll without a limit.

## 5. Wrap up

- Add the published changes and the commit hash to the change log in `PROFILE_RESEARCH.md`.
- Report to the owner:
  - the three language links: <https://jaminryu.github.io/>, `?lang=ja`, `?lang=zh`;
  - the check results;
  - that `site/` was generated but not published;
  - to hard-refresh if the change does not show.
