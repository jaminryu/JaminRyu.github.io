---
name: resume-review
description: Review the résumé as a candidate job hunting in Japan would need it reviewed - content and focus, Japanese/English/Chinese language quality, professionalism, UI and print. Use when the owner asks to check, review, or evaluate the résumé, or before applying to Japanese companies. Gives advice only; change the draft only after the owner agrees.
---

# Review the résumé for job hunting in Japan

The Japanese version matters most. Review the latest saved draft (`local-editor/data/resume.json`) and check whether the live site <https://jaminryu.github.io/?lang=ja> matches it. Reply to the owner in their language (Chinese).

## 1. Prepare

- Read the draft in all three languages, plus the facts, open questions, and the owner's display preferences in `PROFILE_RESEARCH.md`.
- Run `resume-layout-check` for screenshots and A4 page counts.
- If hiring practice may have changed, research first, preferring Japanese sources from 2024 on (doda, マイナビ, Findy, 転職ドラフト, リクルートエージェント, Japan Dev). The checklist below reflects research done in October 2026.

## 2. Checklist

**Content and focus**
- Is the strongest result first, and stated in a verifiable form (a sourced figure, a third-party report, a paper)?
- Can vague words such as 「数十件」 or 「多数」 become numbers, categories, or examples?
- Does each role show the period, role, scope, technologies, and results? 転職ドラフト reports that about 90% of rejected profiles fail because there is not enough information to judge the candidate's skill objectively.
- Do the side projects show technical depth, and users or operations where possible? Where AI coding tools are used, state that the owner does the design and verification, so it does not read as handing everything to AI (丸投げ).
- Do new terms come with a concrete explanation? Searching 「ハーネス」 on マイナビ転職 returns almost only automotive wire-harness jobs (ワイヤーハーネス), so non-technical readers may misread "harness".
- Are contact details and real-world Japanese use stated? Whether to show residency status, years in Japan, or location follows the owner's preference in `PROFILE_RESEARCH.md`; do not suggest adding them back.

**Japanese**
- Bullet points in 体言止め and the introduction in です・ます調, without mixing.
- Translation-like phrasing, e.g. a degree written as 「土木・環境工学」 instead of the school's official name.
- Unnatural collocations, e.g. 「貢献を担当」, and duplicated words, e.g. 「報告では…と報告」.
- Credentials by official name with 「合格」「取得」「修了」 and the year and month.
- No Simplified Chinese characters or Chinese proper nouns on the Japanese page.
- No spaces between Japanese and Latin text; 「・」「／」「〜」 rather than Western 「·」「—」.

**English and Chinese**
- English: accurate meaning (post-processing applies to model outputs, not models), varied verbs, and figures with their basis.
- Chinese: no invented company translations and no needless English.

**Professionalism**
- Patents: wording must match the legal role. For an employee invention the company is usually the applicant (出願人); 「共同出願」 means several applicants. Do not describe unpublished applications.
- Papers: distinguish journals from conferences, peer review, and first authorship; give Japanese papers their Japanese titles on the Japanese page.
- Degrees and credentials follow the official names on the school's site and the diploma; list each item once.

**UI**
- A4 print at three pages or fewer per language (two to three pages is the norm).
- No horizontal overflow at phone width.
- Suitable fonts for Japanese and Chinese; do not rely on Yu Gothic on Windows.
- A contact link; send Japanese companies the `?lang=ja` link.

## 3. Output

1. Overall verdict in three or four lines.
2. Research findings with source links.
3. Problems, most important first.
4. Japanese line by line: current → suggested.
5. English and Chinese changes.
6. Professionalism issues.
7. UI issues.
8. Questions for the owner.

Record new facts found during the review (official names, sources) in `PROFILE_RESEARCH.md`. Do not edit the draft; after the owner agrees, change it with the editor or `edit-draft.mjs`.

## Sources

- doda, 職務経歴書の書き方: <https://doda.jp/guide/syokureki/>
- 転職ドラフト screening criteria: <https://job-draft.jp/articles/215>
- マイナビ, IT engineer 職務経歴書: <https://tenshoku.mynavi.jp/knowhow/it-engineer/resume/index/>
- Findy, 職務経歴書: <https://findy-code.io/blog/engineer-carrer_syokumukeireki/>
- @IT on the unsettled definition of harness engineering: <https://atmarkit.itmedia.co.jp/ait/articles/2606/01/news016.html>
- Inventors and applicants in Japanese patents: <https://www.kjpaa.jp/qa/46395.html>
- MLIT inspection-support technologies: <https://www.mlit.go.jp/report/press/content/001883306.pdf>
- Japan Dev, 職務経歴書 for foreign engineers: <https://japan-dev.com/blog/japanese-cv-shokumu-keirekisho>
