import { createDropdown } from './instantsearchdropdowns';

const searchClient = algoliasearch('8MU1G3QO9P', '4edb0a6cef3338ff4bcfbc6b3d2db56b');

const search = instantsearch({
  indexName: 'crawler_Dev Docs -> Instantsearch.js',
  searchClient,
  insights: true,
});

const { searchBox } = instantsearch.widgets;
const { hits } = instantsearch.widgets;
const { configure } = instantsearch.widgets;
const { pagination } = instantsearch.widgets;
const {refinementList} = instantsearch.widgets;


const MOBILE_WIDTH = 375;

const productDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
});

const productGroupDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
  buttonText: 'Product group',
});

const contentTypeDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
  buttonText: 'Content type',
});

search.addWidgets([
  searchBox({
    container: "#searchbox"
  }),

  hits({
    container: "#hits",
    templates: {
      item(hit, { html, components }) {
        return html`
        <div class="searchResult">
        <a href=${hit.url}>
        <h3>
            ${components.Highlight({ attribute: 'title', hit })}
          </h3>
          </a>
          <p>${components.Snippet({ attribute: 'content', hit })}</p>
          <div class="additionalSearchContent">
          <p><strong>Product</strong>: ${components.Highlight({ attribute: 'product', hit })}</p>
          <p><strong>Product group</strong>: ${components.Highlight({ attribute: 'product_group', hit })}</p>
          <p><strong>Content type</strong>: ${components.Highlight({ attribute: 'content_type', hit })}</p>
          </div>
          <a href=${hit.url}>${hit.url}</a>
          </div>
        `;
      },
    },
  }),
  configure({
    hitsPerPage: 8,
    attributesToSnippet: ['content:30'],
  }),
  productDropdown({
    container: '#product',
    attribute: 'product',
    searchable: true,
  }),
  productGroupDropdown({
    container: '#product_group',
    attribute: 'product_group',
    searchable: true,
  }),
  contentTypeDropdown({
    container: '#content_type',
    attribute: 'content_type',
    searchable: true,
  }),
  pagination({
    container: '#pagination',
  }),
]);

search.start();