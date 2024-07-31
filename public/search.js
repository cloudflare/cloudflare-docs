// <stdin>
(function() {
  let $ = document.querySelector.bind(document);
  const { algoliaConfig } = window;
  if (!algoliaConfig) {
    throw new Error("Algolia config not found, needs addition in product toml config");
  }
  let {
    apikey: apiKey,
    product,
    index: indexName
  } = algoliaConfig;
  const facetFilters = product ? [`product:${product}`] : [];
  function loaded() {
    window.docsearch({
      indexName,
      appId: "8MU1G3QO9P",
      apiKey,
      container: "#algolia",
      maxResultsPerGroup: 10,
      insights: true,
      translations: {
        modal: {
          noResultsScreen: {
            reportMissingResultsText: "",
            reportMissingResultsLinkText: "View all results"
          }
        }
      },
      getMissingResultsUrl({ query }) {
        return `/search/?q=${query}`;
      },
      searchParameters: {
        optionalFilters: facetFilters
      },
      // TODO: improve types
      transformItems: (items) => {
        return items.filter((item) => {
          const url = new URL(item.url);
          return url.pathname.endsWith("/");
        });
      },
      // TODO: improve types
      resultsFooterComponent({ state }) {
        return {
          // The HTML `tag`
          type: "a",
          ref: void 0,
          constructor: void 0,
          key: state.query,
          // Its props
          props: {
            target: "_blank",
            href: `/search/?q=${state.query}`,
            // Raw text rendered in the HTML element
            children: `View all results`,
            onClick: () => {
              zaraz.track("view all results", { query: state.query });
            }
          },
          __v: null
        };
      }
    });
    let button = $("#MobileSearch");
    if (button) {
      button.addEventListener("click", () => {
        const docsSearchButton = document.querySelector(".DocSearch.DocSearch-Button");
        docsSearchButton == null ? void 0 : docsSearchButton.click();
      });
    }
  }
  (function check() {
    if (!indexName || !apiKey) return;
    if (window.docsearch) loaded();
    else setTimeout(check, 25);
  })();
})();
