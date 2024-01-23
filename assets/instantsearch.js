const searchClient = algoliasearch('8MU1G3QO9P', '4edb0a6cef3338ff4bcfbc6b3d2db56b');

const search = instantsearch({
  indexName: 'crawler_Dev Docs -> Instantsearch.js',
  searchClient,
  insights: true,
});

const { searchBox } = instantsearch.widgets;
const { hits } = instantsearch.widgets;
const { configure } = instantsearch.widgets;
const { panel } = instantsearch.widgets;
const { pagination } = instantsearch.widgets;
const { refinementList } = instantsearch.widgets;
const { highlight } = instantsearch;
const { snippet } = instantsearch;

search.addWidgets([
  searchBox({
    container: "#searchbox"
  }),

  hits({
    container: "#hits",
    templates: {
      item(hit, { html, components }) {
        return html`
        <a href=${hit.url}>
        <h3>
            ${components.Highlight({ attribute: 'title', hit })}
          </h3>
          <p>${components.Highlight({ attribute: 'product_group', hit })}</p>
          <p>${components.Highlight({ attribute: 'product', hit })}</p>
          <p>${components.Highlight({ attribute: 'content_type', hit })}</p>
          <p>${components.Snippet({ attribute: 'content', hit })}</p>
          </a>  
        `;
      },
    },
  }),
  configure({
    hitsPerPage: 8,
    attributesToSnippet: ['content:40'],
  }),
  panel({
    templates: { header: 'Product' },
  })(refinementList)({
    container: '#brand-list',
    attribute: 'product',
  }),
  pagination({
    container: '#pagination',
  }),
]);

search.start();