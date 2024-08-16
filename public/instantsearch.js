var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// ns-hugo:/Users/mike/Code/cloudflare-docs/assets/instantsearchdropdowns.js
function hasClassName(elem, className) {
  return elem.className.split(" ").indexOf(className) >= 0;
}
function addClassName(elem, className) {
  elem.className = [...elem.className.split(" "), className].join(" ");
}
function removeClassName(elem, className) {
  elem.className = elem.className.split(" ").filter((name) => name !== className).join(" ");
}
function capitalize(str) {
  if (typeof str !== "string")
    return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
var { panel } = instantsearch.widgets;
var CLASS_OPENED = "ais-Dropdown--opened";
var CLASS_BUTTON = "ais-Dropdown-button";
var CLASS_CLOSE_BUTTON = "ais-Dropdown-close";
var cx = (...args) => args.filter(Boolean).join(" ");
function createDropdown(baseWidget, {
  cssClasses: userCssClasses = {},
  buttonText,
  buttonClassName,
  closeOnChange
} = {}) {
  const cssClasses = {
    root: cx("ais-Dropdown", userCssClasses.root),
    button: cx(CLASS_BUTTON, userCssClasses.button),
    buttonRefined: cx(
      "ais-Dropdown-button--refined",
      userCssClasses.buttonRefined
    ),
    closeButton: cx(CLASS_CLOSE_BUTTON, userCssClasses.closeButton)
  };
  const makeWidget = panel({
    cssClasses,
    templates: {
      header: (options) => {
        const { widgetParams } = options;
        let text;
        if (typeof buttonText === "string") {
          text = buttonText;
        } else {
          text = widgetParams && widgetParams.attribute ? capitalize(widgetParams.attribute) : "";
        }
        const nbRefinements = (options.items || []).filter(
          (item) => item.isRefined
        ).length;
        text = nbRefinements > 0 ? `${text} (${nbRefinements})` : text;
        const classNames = [cssClasses.button];
        if (typeof buttonClassName === "string") {
          classNames.push(buttonClassName);
        } else if (typeof buttonClassName === "function") {
          classNames.push(buttonClassName(options));
        } else if ((options.items || []).find((item) => item.isRefined)) {
          classNames.push(cssClasses.buttonRefined);
        }
        return `
          <button type="button" class="${cx(...classNames)}">
            ${text}
            <img class="caretDownFilter" src="/icons/caret-down.svg" alt="expand" loading="lazy">
          </button>
        `;
      },
      footer: `<button type="button" class="${cssClasses.closeButton}">Apply</button>`
    }
  })(baseWidget);
  return (widgetParams) => {
    const widget = makeWidget(widgetParams);
    let state = {};
    let rootElem, headerElem, closeButtonElem;
    const open = () => {
      addClassName(rootElem, CLASS_OPENED);
      setTimeout(() => {
        state.windowClickListener = (event) => {
          if (!event.composedPath().includes(rootElem)) {
            close();
          }
        };
        window.addEventListener("click", state.windowClickListener);
      }, 0);
    };
    const close = () => {
      removeClassName(rootElem, CLASS_OPENED);
      window.removeEventListener("click", state.windowClickListener);
      delete state.windowClickListener;
    };
    const isOpened = () => hasClassName(rootElem, CLASS_OPENED);
    const toggle = () => {
      if (isOpened()) {
        close();
      } else {
        open();
      }
    };
    const buttonListener = (event) => {
      if (!event.target.matches("." + CLASS_BUTTON) && !event.target.matches(".caretDownFilter")) {
        return;
      }
      toggle();
    };
    const cleanUp = () => {
      headerElem.removeEventListener("click", buttonListener);
      if (state.windowClickListener) {
        window.removeEventListener("click", state.windowClickListener);
      }
    };
    return __spreadProps(__spreadValues({}, widget), {
      $$widgetType: "cmty.facetDropdown",
      render: (options) => {
        if (!rootElem) {
          rootElem = document.querySelector(widgetParams.container).querySelector(".ais-Panel");
        }
        if (!headerElem) {
          headerElem = rootElem.querySelector(".ais-Panel-header");
          headerElem.addEventListener("click", buttonListener);
        }
        if (!closeButtonElem) {
          closeButtonElem = rootElem.querySelector("." + CLASS_CLOSE_BUTTON);
          closeButtonElem.addEventListener("click", close);
        }
        options.instantSearchInstance.use(() => ({
          subscribe() {
          },
          unsubscribe() {
          },
          onStateChange() {
            if (isOpened() && (closeOnChange === true || typeof closeOnChange === "function" && closeOnChange() === true)) {
              close();
            }
          }
        }));
        return widget.render.call(widget, options);
      },
      dispose: (options) => {
        if (typeof cleanUp === "function") {
          cleanUp();
        }
        return widget.dispose.call(widget, options);
      }
    });
  };
}

// <stdin>
var searchClient = algoliasearch(
  "8MU1G3QO9P",
  "4edb0a6cef3338ff4bcfbc6b3d2db56b"
);
var indexName = "crawler_Dev Docs -> Instantsearch.js";
var { searchBox } = instantsearch.widgets;
var { hits } = instantsearch.widgets;
var { configure } = instantsearch.widgets;
var { pagination } = instantsearch.widgets;
var { refinementList } = instantsearch.widgets;
var { currentRefinements } = instantsearch.widgets;
var search = instantsearch({
  indexName,
  searchClient,
  insights: true,
  routing: {
    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState[indexName];
        return {
          q: indexUiState.query,
          source: indexUiState.refinementList && indexUiState.refinementList.source,
          product: indexUiState.refinementList && indexUiState.refinementList.product,
          product_group: indexUiState.refinementList && indexUiState.refinementList.product_group,
          content_type: indexUiState.refinementList && indexUiState.refinementList.content_type
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
              content_type: routeState.content_type
            }
          }
        };
      }
    }
  }
});
var MOBILE_WIDTH = 375;
var productDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH
});
var sourceDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH
});
var productGroupDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
  buttonText: "Product group"
});
var contentTypeDropdown = createDropdown(refinementList, {
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
  buttonText: "Content type"
});
search.addWidgets([
  searchBox({
    container: "#searchbox"
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
      }
    }
  }),
  configure({
    hitsPerPage: 10,
    attributesToSnippet: ["content:30"]
  }),
  sourceDropdown({
    container: "#source",
    attribute: "source",
    searchable: false
  }),
  productDropdown({
    container: "#product",
    attribute: "product",
    searchable: true
  }),
  productGroupDropdown({
    container: "#product_group",
    attribute: "product_group",
    searchable: true
  }),
  contentTypeDropdown({
    container: "#content_type",
    attribute: "content_type",
    searchable: true
  }),
  pagination({
    container: "#pagination"
  }),
  currentRefinements({
    container: "#current_refinements",
    transformItems(items) {
      return items.map((item) => {
        item.label = item.label.replace("_", " ");
        return item;
      });
    }
  })
]);
search.start();
