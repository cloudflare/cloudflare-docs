import { createDropdown } from "./instantsearchdropdowns";

const searchClient = algoliasearch(
  "8MU1G3QO9P",
  "4edb0a6cef3338ff4bcfbc6b3d2db56b"
);
const indexName = "crawler_Dev Docs -> Instantsearch.js";
const { searchBox } = instantsearch.widgets;
const { hits } = instantsearch.widgets;
const { configure } = instantsearch.widgets;
const { pagination } = instantsearch.widgets;
const { refinementList } = instantsearch.widgets;
const { currentRefinements } = instantsearch.widgets;

const search = instantsearch({
  indexName: indexName,
  searchClient,
  insights: true,
  routing: {
    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState[indexName];
        return {
          q: indexUiState.query,
          source:
            indexUiState.refinementList &&
            indexUiState.refinementList.source,
          product:
            indexUiState.refinementList && indexUiState.refinementList.product,
          product_group:
            indexUiState.refinementList &&
            indexUiState.refinementList.product_group,
          content_type:
            indexUiState.refinementList &&
            indexUiState.refinementList.content_type,
        };
      },
      routeToState(routeState) {
        return {
          [indexName]: {
            query: routeState.q,
            refinementList: {
              source: routeState.source,
              product: routeState.product,
              product_group: routeState.product_group,
              content_type: routeState.content_type,
            },
          },
        };
      },
    },
  },
});

const MOBILE_WIDTH = 375;

const productDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
});

const sourceDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
});

const productGroupDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
  buttonText: "Product group",
});

const contentTypeDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
  buttonText: "Content type",
});

search.addWidgets([
  searchBox({
    container: "#searchbox",
  }),
  hits({
    container: "#hits",
    templates: {
      item(hit, { html, components }) {
        if (hit.path.startsWith("/api/operations/")) {
          return html`
            <div class="searchResult">
              <a href=${hit.url}>
                <h3>${components.Highlight({ attribute: "title", hit })}</h3>
              </a>
              <p>${components.Snippet({ attribute: "content", hit })}</p>
              <div class="additionalSearchContent">
                <p>
                  <strong>Operation</strong>: ${components.Highlight({ attribute: "operation", hit })}
                </p>
                <p>
                  <strong>Endpoint group</strong>: ${components.Highlight({ attribute: "parent_tag", hit })}
                </p>
                <p>
                  <strong>Content type</strong>: ${components.Highlight({ attribute: "content_type", hit })}
                </p>
              </div>
              <a href=${hit.url}>${hit.url}</a>
            </div>
          `;
        } else {
          return html`
            <div class="searchResult">
              <a href=${hit.url}>
                <h3>${components.Highlight({ attribute: "title", hit })}</h3>
              </a>
              <p>${components.Snippet({ attribute: "content", hit })}</p>
              <div class="additionalSearchContent">
                <p>
                  <strong>Product</strong>: ${components.Highlight({ attribute: "product", hit })}
                </p>
                <p>
                  <strong>Product group</strong>: ${components.Highlight({ attribute: "product_group", hit })}
                </p>
                <p>
                  <strong>Content type</strong>: ${components.Highlight({ attribute: "content_type", hit })}
                </p>
              </div>
              <a href=${hit.url}>${hit.url}</a>
            </div>
          `;
        }
      },
    },
  }),
  configure({
    hitsPerPage: 10,
    attributesToSnippet: ["content:30"],
  }),
  sourceDropdown({
    container: "#source",
    attribute: "source",
    searchable: false,
  }),
  productDropdown({
    container: "#product",
    attribute: "product",
    searchable: true,
  }),
  productGroupDropdown({
    container: "#product_group",
    attribute: "product_group",
    searchable: true,
  }),
  contentTypeDropdown({
    container: "#content_type",
    attribute: "content_type",
    searchable: true,
  }),
  pagination({
    container: "#pagination",
  }),
  currentRefinements({
    container: "#current_refinements",
    transformItems(items) {
      return items.map((item) => {
        item.label = item.label.replace("_", " ");
        return item;
      });
    },
  }),
]);

search.start();
