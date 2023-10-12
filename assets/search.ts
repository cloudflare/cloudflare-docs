(function () {
  let $ = document.querySelector.bind(document);

  const { algoliaConfig } = window as any;
  if (!algoliaConfig) {
    throw new Error('Algolia config not found, needs addition in product toml config')
  }

  function loaded() {
    window.docsearch({
      indexName: 'API Docs - TEST',
      appId: 'BC1TY5QF4Y',
      apiKey: '00514d57de5577c5a173ad19713069cd',
      container: '#algolia',
      maxResultsPerGroup: 20,
      insights: true
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
    if (window.docsearch) loaded();
    else setTimeout(check, 25);
  })();
})();