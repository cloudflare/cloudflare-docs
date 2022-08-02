(function () {
  let tag = document.currentScript;
  let $ = document.querySelector.bind(document);

  let coveo: any;
  let dataset = tag && tag.dataset;
  let { org, token } = dataset || {};

  

  function loadSearchResults() {
    // The following line shows you how you could configure an endpoint against which to perform your search.
    coveo.SearchEndpoint.configureCloudV2Endpoint(org, token);

    // Initialize the framework by targeting the root in the interface.
    // It does not have to be the document body.
    const root = document.getElementById('searchresults')
    coveo.init(root);

    coveo.SearchEndpoint.configureCloudV2Endpoint(org, token);
}

  

  // init
  (function check() {
    if (!org || !token) return;
    if (coveo = window.Coveo) {
      // coveo loaded, initialize
      location.pathname.startsWith('/tutorials')
        loadSearchResults();
    } else {
      setTimeout(check, 25);
    }
  })();
})();
