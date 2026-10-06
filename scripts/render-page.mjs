export function renderPage({ locales }) {
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const link = (url, label, cls = '') => !url ? `<span${cls ? ` class="${cls}"` : ''}>${escape(label)}</span>` : `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer"${cls ? ` class="${cls}"` : ''}>${escape(label)}</a>`;
const section = (id, t, content) => `<section class="resume-section" id="${id}" aria-labelledby="heading-${id}"><h2 id="heading-${id}">${escape(t.sections[id])}</h2>${content}</section>`;

function renderExperience(t) {
  return t.experience.map((entry) => `<article class="entry"><div class="entry-header"><h3>${entry.url ? link(entry.url, entry.organization, 'organization-link') : escape(entry.organization)}</h3><span class="entry-date">${escape(entry.date)}</span></div><p class="entry-subtitle">${escape(entry.role)}</p><ul>${entry.bullets.map((bullet) => `<li>${escape(bullet)}</li>`).join('')}</ul>${entry.case ? `<div class="case-note"><p>${escape(entry.case)}</p><div class="inline-links">${link(entry.reportUrl, entry.report)}${link(entry.paperUrl, entry.paper)}</div></div>` : ''}</article>`).join('');
}

function renderPublication(p, t, lang) {
  const authors = p.authors.map((name) => name === t.name ? `<strong>${escape(name)}</strong>` : escape(name)).join(', ');
  return `<article class="publication"><div class="publication-heading"><h3>${link(p.url || (p.doi ? `https://doi.org/${p.doi}` : ''), p.title, 'publication-title')}</h3><span class="entry-date">${escape(p.year)}</span></div><p class="publication-authors">${authors}</p><p class="publication-venue">${escape(p.venue)}${p.onlineYear ? ` · ${escape(t.online)} ${escape(p.onlineYear)}` : ''}</p>${p.topic ? `<p class="publication-topic">${escape(typeof p.topic === 'string' ? p.topic : p.topic[lang])}</p>` : ''}${p.first && t.firstAuthor ? `<span class="author-label">${escape(t.firstAuthor)}</span>` : ''}</article>`;
}

function renderCredentials(items) {
  return items.map(([name, provider, year]) => `<li class="credential"><span><span class="credential-name">${escape(name)}</span><span class="credential-provider">${escape(provider)}</span></span><span class="entry-date">${escape(year)}</span></li>`).join('');
}

function renderResume(lang) {
  const t = locales[lang];
  const publications = t.publications;
  const profileLinks = t.profileLinks;
  const sections = [
    section('experience', t, renderExperience(t)),
    section('projects', t, `<p class="section-intro">${escape(t.projectIntro)}</p>${t.projects.map((p) => `<article class="project"><div class="entry-header"><h3>${link(p.url, p.name, 'project-link')}</h3>${link(p.url, p.domain, 'project-domain')}</div><p class="project-description">${escape(p.description)}</p>${p.tech ? `<p class="project-tech">${escape(p.tech)}</p>` : ''}</article>`).join('')}`),
    section('publications', t, `<p class="section-intro">${escape(t.publicationIntro)}</p>${publications.filter((p) => p.first || p.featured).map((p) => renderPublication(p, t, lang)).join('')}<details class="additional-publications"><summary><span class="when-closed">${escape(t.morePublications)}</span><span class="when-open">${escape(t.lessPublications)}</span></summary><div class="additional-content">${publications.filter((p) => !p.first && !p.featured).map((p) => renderPublication(p, t, lang)).join('')}</div></details><div class="scholar-link">${link(t.scholarUrl, t.scholar)}</div>`),
    section('education', t, t.education.map((e) => `<article class="entry education-entry"><div class="entry-header"><h3>${escape(e.school)}</h3><span class="entry-date">${escape(e.date)}</span></div><p class="degree">${escape(e.degree)}</p><p class="education-description">${escape(e.description)}</p></article>`).join('')),
    section('skills', t, `<dl class="skill-list">${t.skills.map(([label, description]) => `<div><dt>${escape(label)}</dt><dd>${escape(description)}</dd></div>`).join('')}</dl>`),
    section('credentials', t, `<ul class="credential-list">${renderCredentials(t.credentials)}</ul><details class="additional-credentials"><summary>${escape(t.moreCredentials)}</summary><ul class="credential-list additional-content">${renderCredentials(t.extraCredentials)}</ul></details><h3 class="language-heading">${escape(t.languageHeading)}</h3><dl class="language-list">${t.languages.map(([name, level]) => `<div><dt>${escape(name)}</dt><dd>${escape(level)}</dd></div>`).join('')}</dl>`),
  ];
  return `<header class="profile"><h1>${escape(t.name)}</h1><p class="role">${escape(t.role)}</p><div class="identity" aria-label="${escape(t.profileLabel)}">${t.location ? `<span class="location">${escape(t.location)}</span>` : ''}${t.residency ? `<span class="residency">${escape(t.residency)}</span>` : ''}<div class="profile-links">${profileLinks.map((p) => link(p.url, p.label)).join('')}</div></div><p class="intro">${escape(t.intro)}</p></header><div class="resume-content">${sections.join('')}</div><footer class="footer"><span>${escape(t.footer)}</span><span>${escape(t.lastUpdated)}</span></footer>`;
}

const ui = Object.fromEntries(Object.entries(locales).map(([key, t]) => [key, { name: t.name, htmlLang: t.htmlLang, title: t.title, description: t.description, résumé: t.résumé, skip: t.skip, print: t.print, languageLabel: t.languageLabel, languageOptions: t.languageOptions, faviconInitials: t.faviconInitials }]));
const t = locales.en;
const favicon = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#17202c"/><text x="16" y="22" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="white">' + escape(t.faviconInitials) + '</text></svg>');
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escape(t.description)}"><meta name="theme-color" content="#17202c"><meta property="og:type" content="profile"><meta property="og:title" content="${escape(t.title)}"><meta property="og:description" content="${escape(t.description)}"><meta name="twitter:card" content="summary"><title>${escape(t.title)}</title><link rel="icon" type="image/svg+xml" href="${escape(favicon)}"><link rel="stylesheet" href="styles.css"><script src="app.js" defer></script></head><body>
<a class="skip-link" href="#main-content">${escape(t.skip)}</a><div class="toolbar"><span class="toolbar-brand"><span id="toolbar-name">${escape(t.name)}</span> / <span id="résumé-label">${escape(t.résumé)}</span></span><div class="toolbar-right"><div class="language-switch" role="group" aria-label="${escape(t.languageLabel)}"><button type="button" lang="en" aria-label="${escape(t.languageOptions.en.ariaLabel)}" aria-pressed="true" data-lang="en">${escape(t.languageOptions.en.label)}</button><button type="button" lang="ja" aria-label="${escape(t.languageOptions.ja.ariaLabel)}" aria-pressed="false" data-lang="ja">${escape(t.languageOptions.ja.label)}</button><button type="button" lang="zh-CN" aria-label="${escape(t.languageOptions.zh.ariaLabel)}" aria-pressed="false" data-lang="zh">${escape(t.languageOptions.zh.label)}</button></div><button class="print-button" type="button">${escape(t.print)}</button></div></div>
<main class="paper" id="main-content">${renderResume('en')}</main>
${Object.keys(locales).map((lang) => `<template id="resume-${lang}">${renderResume(lang)}</template>`).join('\n')}
<script type="application/json" id="locale-ui">${JSON.stringify(ui).replaceAll('<', '\\u003c')}</script>
</body></html>\n`;

return html;
}
