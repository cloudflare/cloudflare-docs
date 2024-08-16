"use strict";
(() => {
  // <stdin>
  (function() {
    let tag = document.currentScript;
    let $ = document.querySelector.bind(document);
    let coveo;
    let dataset = tag && tag.dataset;
    let { org, token } = dataset || {};
    function loadSearchResults() {
      coveo.SearchEndpoint.configureCloudV2Endpoint(org, token);
      const root = document.querySelector("#searchresults");
      coveo.init(root);
      coveo.SearchEndpoint.configureCloudV2Endpoint(org, token);
    }
    (function check() {
      if (!org || !token)
        return;
      if (coveo = window.Coveo) {
        location.pathname.startsWith("/tutorials");
        loadSearchResults();
      } else {
        setTimeout(check, 20);
      }
    })();
  })();
})();
