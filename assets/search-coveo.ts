(function () {

  let tag = document.currentScript;
  let $ = document.querySelector.bind(document);
  const currentLocation = window.location.href;
  const paramRegex = new RegExp("/search/#(.+)");
  const result = currentLocation.match(paramRegex);
  let productGroup = "";
  
  if (result) {
    const params = new URLSearchParams(result[1]);
    productGroup = params.get("product_group") || "";
  }

  let coveo: any;
  let dataset = tag && tag.dataset;
  let { org, token } = dataset || {};

  function setReferrerValue() {
    const referrer = (document.referrer.match("(?:developers\.cloudflare\.com|docs\.cloudflare\.com|cloudflare\-docs\-7ou\.pages\.dev)(\/.+?\/)"));
    if (referrer !== null) {
      return referrer[1];
    }
  }

  function getProductGroupValue() {
    return productGroup;
  }
  
  function loadCustomSearchBox() {
    let element = $('#DocsSearch--input') || $('#SiteSearch--input');
    const CustomSearchbox = (function(_super) {
      __extends(CustomSearchbox, coveo.Component);
      function CustomSearchbox(element, options, bindings) {
        _super.call(this, element, CustomSearchbox.ID, bindings);
        this.type = 'CustomSearchBox';
        coveo.Component.bindComponentToElement(element, this);
        this.element = element;
        this.options = coveo.ComponentOptions.initComponentOptions(element, CustomSearchbox, options);
        this.bindings = bindings;
        this.element.addEventListener('keyup', (e) => this.handleKeyUp(e));
      }
      CustomSearchbox.prototype.handleKeyUp = function(e) {
        if (this.options.searchAsYouType) {
          this.executeNewQuery();
        } else if (e.key == 'Enter') {
          this.executeNewQuery();
        }
      }
      CustomSearchbox.prototype.executeNewQuery = function() {
        this.bindings.queryStateModel.set('q', this.element.value);
        //this.bindings.usageAnalytics.logSearchEvent({
        //  name: 'submitSearchbox',
        //  type: 'CustomSearchbox'
        //});
        this.bindings.queryController.executeQuery();
      }
      CustomSearchbox.options = {
        searchAsYouType: coveo.ComponentOptions.buildBooleanOption({ defaultValue: false })
      }
      CustomSearchbox.ID = "CustomSearchBox";
      coveo.Initialization.registerAutoCreateComponent(CustomSearchbox);
    })(coveo.Component);

    coveo.SearchEndpoint.configureCloudV2Endpoint(org, token);
    coveo.initSearchbox($('.CoveoSearchInterface'), "/search")

    addEventListener('keydown', ev => {
      if (ev.target === element) return;

      let key = ev.which;

      // is '/' or SHIFT+'s'
      if (key === 191 || (ev.shiftKey && key === 83)) {
        ev.preventDefault();
        window.scrollTo(0, 0);
        element.focus();
      }
    });
  }

  function loadSearchResults() {
    // The following line shows you how you could configure an endpoint against which to perform your search.
    coveo.SearchEndpoint.configureCloudV2Endpoint(org, token);


    // Initialize the framework by targeting the root in the interface.
    // It does not have to be the document body.
    const root = document.getElementById('searchresults')

    coveo.init(root);

    coveo.$$(root).on("afterInitialization", (e, args) => {
      let pipelineContext = coveo.$$(root).find(".CoveoPipelineContext");
      pipelineContext = coveo.get(pipelineContext);
      pipelineContext.setContextValue("referrer", setReferrerValue());
      pipelineContext.setContextValue("product_group", getProductGroupValue());
    })

    coveo.$$(root).on('changeAnalyticsCustomData', (e, args) => {
      if (args.type === 'ClickEvent' || args.type === 'CustomEvent'){
        args.metaObject.context_referrer = setReferrerValue();
        args.metaObject.context_product_group = getProductGroupValue();
      }});

    // Hacky fix to manually control search/loading icons
    function showLoadingToggle(bool) {
      const search = document.querySelector("span.coveo-search-button")
      const loading = document.querySelector("span.coveo-search-button-loading")
      search.style.display = bool ? "none" : "";
      loading.style.display = bool ? "" : "none";
    }
      coveo.$$(root).on('newQuery', () => showLoadingToggle(true))
      coveo.$$(root).on('newResultsDisplayed', () => showLoadingToggle(false))

  }

  // init
  (function check() {
    if (!org || !token) return;
    if (coveo = window.Coveo) {
      // coveo loaded, initialize

      location.pathname.startsWith('/search')
        ? loadSearchResults()
        : loadCustomSearchBox();
    } else {
      setTimeout(check, 25);
    }
  })();
})();
