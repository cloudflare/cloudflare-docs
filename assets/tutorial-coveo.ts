(function () {
  let tag = document.currentScript;
  let $ = document.querySelector.bind(document);

  let coveo: any;
  let dataset = tag && tag.dataset;
  let { org, token } = dataset || {};

  

  function loadSearchResults() {
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
      setTimeout(check, 20);
    }
  })();
})();
