(function () {
  let tag = document.currentScript;
  let $ = document.querySelector.bind(document);

  let dataset = tag && tag.dataset;
  let { index, key, filters } = dataset || {};

  function loaded() {
    let element = $('#DocsSearch--input') || $('#SiteSearch--input');

    let algolia = window.docsearch({
      indexName: index,
      apiKey: key,
      algoliaOptions: {
        facetFilters: filters || '',
      },

      inputSelector: '#' + element.id,

      autocompleteOptions: {
        // https://github.com/algolia/autocomplete.js#global-options
        autoselect: true,
        openOnFocus: true,
        clearOnSelected: false,
        tabAutocomplete: false,

        appendTo: '.' + element.parentNode.className,
        hint: false,

        autoselectOnBlur: matchMedia('(pointer: course)').matches,
      },

      // https://docsearch.algolia.com/docs/behavior
      handleSelected(input, event, suggestion, datasetNumber, context) {
        let ctx = new URL(suggestion.url);

        algolia.input.autocomplete.setVal('');
        algolia.input[0].blur();

        // no scroll if is H1 tag
        if (suggestion.isLvl0) ctx.hash = '';

        // redirect to new path
        return location.assign(ctx.pathname + ctx.search + ctx.hash);
      },

      transformData(hits) {
        // Remove empty results
        for (let len = hits.length; len-- > 0; ) {
          let info = hits[len].hierarchy;
          if (!info.lvl0 && !info.lvl1) {
            hits.splice(len, 1);
          }
        }
      },
    });

    let input = algolia.input[0];
    let wrapper = algolia.autocomplete.autocomplete.getWrapper();

    algolia.autocomplete.on('autocomplete:shown', () => {
      wrapper.setAttribute('data-expanded', true);
    });

    algolia.autocomplete.on('autocomplete:closed', () => {
      wrapper.setAttribute('data-expanded', false);
    });

    addEventListener('keydown', ev => {
      if (ev.target === input) return;

      let key = ev.which;

      // is '/' or SHIFT+'s'
      if (key === 191 || (ev.shiftKey && key === 83)) {
        ev.preventDefault();
        window.scrollTo(0, 0);
        input.focus();
      }
    });
  }

  // init
  (function check() {
    if (!index || !key) return;
    if (window.docsearch) loaded();
    else setTimeout(check, 25);
  })();
})();
