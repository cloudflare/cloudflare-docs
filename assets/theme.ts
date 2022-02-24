if (document.readyState !== 'loading') init();
else addEventListener('DOMContentLoaded', init);

let btn: HTMLInputElement;
function setter(isDark: boolean) {
  try {
    if (btn) btn.checked = isDark;
    let theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('theme', theme);
    localStorage.theme = JSON.stringify({ theme });
  } catch (err) {
    // security error
  }
}

function init() {
  let media;
  btn = document.querySelector('#ThemeToggle')!;
  btn.addEventListener('change', () => setter(!!btn.checked));

  // Shift+D for toggle
  addEventListener('keydown', ev => {
    if (ev.target !== document.body) return;
    if (ev.which === 68 && ev.shiftKey) {
      ev.preventDefault();
      setter(!btn.checked);
    }
  });

  try {
    media = window.matchMedia('(prefers-color-scheme:dark)');
    media.onchange = ev => setter(ev.matches);
  } catch (err) {
    // no support
  }

  try {
    let value = localStorage.theme;
    let row = value && JSON.parse(value);

    // defaults to "light" theme
    setter(
      row
      ? /dark/.test(row.theme)
      : !!(media && media.matches)
    );
  } catch (err) {
    // security error
  }
}
