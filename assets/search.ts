(function () {
  let $ = document.querySelector.bind(document);

  const { algoliaConfig } = window as any;
  if (!algoliaConfig) {
    throw new Error('Algolia config not found, needs addition in product toml config')
  }

  let {
    apikey: apiKey,
    product,
    index: indexName,
  } = algoliaConfig

  const facetFilters = product ? [`product:${product}`] : []

  function loaded() {
    window.docsearch({
      indexName,
      appId: '8MU1G3QO9P',
      apiKey,
      container: '#algolia',
      maxResultsPerGroup: 20,
      insights: true,
      searchParameters: {
        optionalFilters: facetFilters
      },
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
    if (!indexName || !apiKey) return
    if (window.docsearch) loaded();
    else setTimeout(check, 25);
  })();
})();