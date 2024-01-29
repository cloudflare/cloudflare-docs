const searchClient = algoliasearch('8MU1G3QO9P', '4edb0a6cef3338ff4bcfbc6b3d2db56b');

const search = instantsearch({
  indexName: 'crawler_Dev Docs -> Instantsearch.js',
  searchClient,
  insights: true,
});

// Functions needed for dropdowns

function hasClassName(elem, className) {
  return elem.className.split(' ').indexOf(className) >= 0;
}

function addClassName(elem, className) {
  elem.className = [...elem.className.split(' '), className].join(' ');
}

function removeClassName(elem, className) {
  elem.className = elem.className
    .split(' ')
    .filter((name) => name !== className)
    .join(' ');
}

function capitalize(str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}



const { searchBox } = instantsearch.widgets;
const { hits } = instantsearch.widgets;
const { configure } = instantsearch.widgets;
const { pagination } = instantsearch.widgets;
const { highlight } = instantsearch;
const { snippet } = instantsearch;
const { panel } = instantsearch.widgets;
const {refinementList} = instantsearch.widgets;


const CLASS_OPENED = 'ais-Dropdown--opened';
const CLASS_BUTTON = 'ais-Dropdown-button';
const CLASS_CLOSE_BUTTON = 'ais-Dropdown-close';

const cx = (...args) => args.filter(Boolean).join(' ');

function createDropdown(
  baseWidget,
  {
    cssClasses: userCssClasses = {},
    buttonText,
    buttonClassName,
    closeOnChange,
  } = {}
) {
  // Merge class names with the default ones and the ones from user
  const cssClasses = {
    root: cx('ais-Dropdown', userCssClasses.root),
    button: cx(CLASS_BUTTON, userCssClasses.button),
    buttonRefined: cx(
      'ais-Dropdown-button--refined',
      userCssClasses.buttonRefined
    ),
    closeButton: cx(CLASS_CLOSE_BUTTON, userCssClasses.closeButton),
  };
  const makeWidget = panel({
    cssClasses,
    templates: {
      header: options => {
        const { widgetParams } = options;

        let text;
        if (typeof buttonText === 'string') {
          text = buttonText;
        } else if (typeof buttonText === 'function') {
          text = buttonText(options);
        } else {
          // See if the widget has `attribute`
          const attribute =
            widgetParams && widgetParams.attribute
              ? capitalize(widgetParams.attribute)
              : '';
          // Get the number of refinements if the widget has `items`
          const nbRefinements = (options.items || []).filter(
            item => item.isRefined
          ).length;
          // Format the button text
          text =
            nbRefinements > 0 ? `${attribute} (${nbRefinements})` : attribute;
        }

        const classNames = [cssClasses.button];
        if (typeof buttonClassName === 'string') {
          classNames.push(buttonClassName);
        } else if (typeof buttonClassName === 'function') {
          classNames.push(buttonClassName(options));
        } else if ((options.items || []).find(item => item.isRefined)) {
          classNames.push(cssClasses.buttonRefined);
        }

        return `
          <button type="button" class="${cx(...classNames)}">
            ${text}
          </button>
        `;
      },
      footer: `<button type="button" class="${cssClasses.closeButton}">Apply</button>`,
    },
  })(baseWidget);

  return widgetParams => {
    const widget = makeWidget(widgetParams);
    let state = {};
    let rootElem, headerElem, closeButtonElem;

    const open = () => {
      addClassName(rootElem, CLASS_OPENED);
      // This 'click' event is still being propagated,
      // so we add this event listener in the next tick.
      // Otherwise, it will immediately close the panel again.
      setTimeout(() => {
        state.windowClickListener = event => {
          // Close if the outside is clicked
          if (!event.composedPath().includes(rootElem)) {
            close();
          }
        };
        // Add an event listener when the panel is opened
        window.addEventListener('click', state.windowClickListener);
      }, 0);
    };
    const close = () => {
      removeClassName(rootElem, CLASS_OPENED);
      // Remove the event listener when the panel is closed
      window.removeEventListener('click', state.windowClickListener);
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

    // Add a click listener to the header (button)
    const buttonListener = event => {
      if (!event.target.matches('.' + CLASS_BUTTON)) {
        return;
      }
      toggle();
    };

    // Setup a clean-up function, which will be called in `dispose`.
    const cleanUp = () => {
      headerElem.removeEventListener('click', buttonListener);
      if (state.windowClickListener) {
        window.removeEventListener('click', state.windowClickListener);
      }
    };

    // Return a modified version of the widget
    return {
      ...widget,
      $$widgetType: 'cmty.facetDropdown',
      render: options => {
        if (!rootElem) {
          rootElem = document
            .querySelector(widgetParams.container)
            .querySelector('.ais-Panel');
        }

        if (!headerElem) {
          headerElem = rootElem.querySelector('.ais-Panel-header');

          headerElem.addEventListener('click', buttonListener);
        }

        if (!closeButtonElem) {
          closeButtonElem = rootElem.querySelector('.' + CLASS_CLOSE_BUTTON);

          closeButtonElem.addEventListener('click', close);
        }

        // Whenever uiState changes, it closes the panel.
        options.instantSearchInstance.use(() => ({
          subscribe() {},
          unsubscribe() {},
          onStateChange() {
            if (
              isOpened() &&
              (closeOnChange === true ||
                (typeof closeOnChange === 'function' &&
                  closeOnChange() === true))
            ) {
              close();
            }
          },
        }));

        return widget.render.call(widget, options);
      },
      dispose: options => {
        if (typeof cleanUp === 'function') {
          cleanUp();
        }

        return widget.dispose.call(widget, options);
      },
    };
  };
}

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