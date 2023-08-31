(function () {
  let tooEarly = false;
  let btn: HTMLInputElement;
  let media: MediaQueryList | undefined;

  if (document.readyState !== "loading") init();
  else addEventListener("DOMContentLoaded", init);

  btn = document.querySelector("#ThemeToggle")!;
  tooEarly = !btn;

  function setter(isDark: boolean, fromCookie: boolean = false) {
    try {
      let theme = isDark ? "dark" : "light";
      document.documentElement.setAttribute("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.theme = JSON.stringify({ theme });

      if (btn) {
        btn.checked = isDark;
        tooEarly = false;
      } else if (tooEarly) {
        setTimeout(setter, 1, isDark, fromCookie);
      }
    } catch (err) {
      // security error
    }
    // set tooltip text
    if (isDark) {
      document.getElementById("ThemeToggle--tooltip").innerHTML =
        "Set theme to light (⇧+D)";
    } else {
      document.getElementById("ThemeToggle--tooltip").innerHTML =
        "Set theme to dark (⇧+D)";
    }
  }

  function init() {
    btn = btn || document.querySelector("#ThemeToggle")!;
    btn.addEventListener("change", () => setter(!!btn.checked));

    // Shift+D for toggle
    addEventListener("keydown", (ev) => {
      if (ev.target !== document.body) return;
      if (ev.which === 68 && ev.shiftKey) {
        ev.preventDefault();
        setter(!btn.checked);
      }
    });
  }

  try {
    media = window.matchMedia("(prefers-color-scheme:dark)");
    media.onchange = (ev) => setter(ev.matches);
  } catch (err) {
    // no support
  }

  try {
    // Check for the presence of a specific cookie
    const cookieName = "dark_theme_cookie";
    const cookieValue = document.cookie.includes(cookieName);
    
    // Determine whether to apply dark theme from the cookie
    setter(cookieValue || (media ? media.matches : false));
  } catch (err) {
    // security error
  }
})();
