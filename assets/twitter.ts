setTimeout(
  function (x) {
    x.setAttribute('data-theme', document.documentElement.getAttribute('theme'));
    var nxt = document.createElement('script');
    nxt.src = 'https://platform.twitter.com/widgets.js';
    nxt.charset = 'utf-8';
    nxt.async = true;
    document.body.appendChild(nxt);
  },
  50,
  document.currentScript.parentElement
);
