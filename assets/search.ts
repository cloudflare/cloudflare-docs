(function () {
  let tag = document.currentScript;
  let $ = document.querySelector.bind(document);

  let dataset = tag && tag.dataset;
  // let { index, key, filters } = dataset || {};
  const index = "developers-cloudflare2"
  const key = "92ece5213bea0489b4a5a4c21c7e916c"
  const filters = []

  function loaded() {
    let element = $('#DocsSearch--input') || $('#SiteSearch--input');

    window.docsearch({
      indexName: 'developers-cloudflare2',
      appId: '8MU1G3QO9P',
      apiKey: '045e8dbec8c137a52f0f56e196d7abe0',
      container: '#algolia',
      transformItems: items => {
        return items.filter(item => {
          const url = new URL(item.url)
          return url.pathname.endsWith('/')
        })
      }
    });

    // instantiate mobile search button
    let button = $('#MobileSearch')
    if (button) {
      button.addEventListener('click', () => {
        document.querySelector(".DocSearch.DocSearch-Button").click()
      });
    }
  }

  // init
  (function check() {
    if (!index || !key) return;
    if (window.docsearch) loaded();
    else setTimeout(check, 25);
  })();
})();