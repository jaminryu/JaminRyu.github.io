(() => {
  'use strict';
  const ui = JSON.parse(document.getElementById('locale-ui').textContent);
  const main = document.getElementById('main-content');
  const buttons = [...document.querySelectorAll('[data-lang]')];
  const switcher = document.querySelector('.language-switch');
  let currentLanguage = 'en';
  let printState = [];

  function setLanguage(requestedLanguage, updateUrl = false) {
    const language = Object.hasOwn(ui, requestedLanguage) ? requestedLanguage : 'en';
    const t = ui[language];
    if (language !== currentLanguage) {
      main.replaceChildren(document.getElementById(`resume-${language}`).content.cloneNode(true));
      currentLanguage = language;
    }
    document.documentElement.lang = t.htmlLang;
    document.title = t.title;
    document.querySelector('meta[name="description"]').content = t.description;
    document.getElementById('toolbar-name').textContent = t.name;
    document.getElementById('résumé-label').textContent = t.résumé;
    document.querySelector('.skip-link').textContent = t.skip;
    document.querySelector('.print-button').textContent = t.print;
    switcher.setAttribute('aria-label', t.languageLabel);
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language));
      const option = t.languageOptions[button.dataset.lang];
      button.textContent = option.label;
      button.setAttribute('aria-label', option.ariaLabel);
    });
    const initials = String(t.faviconInitials).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    document.querySelector('link[rel="icon"]').href = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#17202c"/><text x="16" y="22" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="white">${initials}</text></svg>`);
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (language === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', language);
      window.history.replaceState(null, '', url);
    }
  }

  buttons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang, true)));
  document.querySelector('.print-button').addEventListener('click', () => window.print());
  window.addEventListener('beforeprint', () => {
    printState = [...main.querySelectorAll('details')].map((details) => ({ details, open: details.open }));
    printState.forEach(({ details }) => { details.open = true; });
  });
  window.addEventListener('afterprint', () => {
    printState.forEach(({ details, open }) => { details.open = open; });
    printState = [];
  });
  window.addEventListener('popstate', () => setLanguage(new URLSearchParams(window.location.search).get('lang') || 'en'));
  setLanguage(document.documentElement.dataset.editorLanguage || new URLSearchParams(window.location.search).get('lang') || 'en');
})();
