(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('#theme-toggle');
  let saved;
  try { saved = localStorage.getItem('theme'); } catch {}
  function setTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeButton.textContent = dark ? '☾' : '☀';
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton.setAttribute('aria-pressed', String(dark));
  }
  setTheme(saved === 'dark' ? 'dark' : 'light');
  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch {}
  });
  const email = document.querySelector('.email');
  email.addEventListener('click', () => {
    const address = email.title.replace(' at ', '@').replaceAll(' dot ', '.');
    email.href = 'mailto:' + address;
  });
  const filters = document.querySelector('.filters');
  const buttons = [...filters.querySelectorAll('button')];
  function filter(mode) {
    document.querySelectorAll('.paper').forEach(paper => {
      paper.hidden = mode === 'selected' && paper.dataset.selected !== 'true';
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.id === mode)));
  }
  buttons.forEach(button => button.addEventListener('click', () => filter(button.id)));
  filters.hidden = false;
  filter('selected');
})();
