(function () {
  let tooEarly = false;
  let btn: HTMLInputElement;
  let media: MediaQueryList | void;

  if (document.readyState !== 'loading') init();
  else addEventListener('DOMContentLoaded', init);

  btn = document.querySelector('#ThemeToggle')!;
  tooEarly = !btn;

  function setter(isDark: boolean) {
    try {
      let theme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('theme', theme);
      localStorage.theme = JSON.stringify({ theme });

      if (btn) {
        btn.checked = isDark;
        tooEarly = false;
      } else if (tooEarly) {
        setTimeout(setter, 1, isDark);
      }
    } catch (err) {
      // security error
    }
  }

  function init() {
    btn = btn || document.querySelector('#ThemeToggle')!;
    btn.addEventListener('change', () => setter(!!btn.checked));

    // Shift+D for toggle
    addEventListener('keydown', ev => {
      if (ev.target !== document.body) return;
      if (ev.which === 68 && ev.shiftKey) {
        ev.preventDefault();
        setter(!btn.checked);
      }
    });
  }

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
    setter(row ? /dark/.test(row.theme) : !!(media && media.matches));
  } catch (err) {
    // security error
  }
})();
