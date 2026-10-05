// Checks this repository before it is pushed: the page matches content.mjs, all three
// languages render, served files carry nothing from the private workspace, and only
// expected files are tracked.
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { locales } from '../content.mjs';
import { renderPage } from './render-page.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const problems = [];
const read = file => readFile(root + file, 'utf8');

const html = await read('index.html');
if (html !== renderPage({ locales })) problems.push('index.html 与 content.mjs 不一致，请运行 node scripts/render.mjs。');
for (const lang of ['en', 'ja', 'zh']) {
  const template = html.match(new RegExp(`<template id="resume-${lang}">([\\s\\S]*?)</template>`))?.[1] || '';
  if (!/<h1>/.test(template) || (template.match(/class="resume-section"/g) || []).length !== 6) problems.push(`缺少完整的 ${lang} 版本。`);
}

const served = ['index.html', 'content.mjs', 'app.js', 'styles.css'];
const privateMarkers = [/\/Users\//, /PROFILE_RESEARCH/, /resume\.json/, /backups\//, /127\.0\.0\.1/, /localhost/];
for (const file of served) {
  const text = await read(file);
  for (const marker of privateMarkers) if (marker.test(text)) problems.push(`${file} 含有本地工作区内容：${marker}`);
}

const allowed = [/^\.gitignore$/, /^\.nojekyll$/, /^README\.md$/, /^CLAUDE\.md$/, /^(index\.html|app\.js|styles\.css|content\.mjs)$/,
  /^scripts\/(render|render-page|verify)\.mjs$/, /^\.claude\/skills\/[a-z0-9-]+\/[^/]+(\/[^/]+)*$/];
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean);
for (const file of tracked) {
  if (!allowed.some(pattern => pattern.test(file))) problems.push(`不应提交的文件：${file}`);
  else if (/\.(md|mjs|js|sh|css|html)$/.test(file) && /\/Users\//.test(await read(file))) problems.push(`${file} 含有本机绝对路径。`);
}
for (const skill of tracked.filter(file => /^\.claude\/skills\/[^/]+\/SKILL\.md$/.test(file))) {
  const dir = skill.split('/')[2];
  const front = (await read(skill)).match(/^---\n([\s\S]*?)\n---\n/)?.[1] || '';
  if (!new RegExp(`^name: ${dir}$`, 'm').test(front) || !/^description: \S/m.test(front)) problems.push(`${skill} 的 name / description 不完整。`);
}

if (problems.length) {
  console.error(problems.map(p => '✖ ' + p).join('\n'));
  process.exit(1);
}
console.log(`✔ 网站文件检查通过：三种语言、生成结果一致、${tracked.length} 个已跟踪文件均符合规则。`);
