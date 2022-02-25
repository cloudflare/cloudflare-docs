"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.notCalledFunction = notCalledFunction;

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _domready = _interopRequireDefault(require("@mikaelkristiansson/domready"));

var _socket = _interopRequireDefault(require("socket.io-client"));

var _socketIo = _interopRequireDefault(require("./socketIo"));

var _emitter = _interopRequireDefault(require("./emitter"));

var _apiRunnerBrowser = require("./api-runner-browser");

var _loader = require("./loader");

var _indicator = require("./loading-indicator/indicator");

var _devLoader = _interopRequireDefault(require("./dev-loader"));

var _syncRequires = _interopRequireDefault(require("$virtual/sync-requires"));

var _matchPaths = _interopRequireDefault(require("$virtual/match-paths.json"));

var _loadingIndicator = require("./loading-indicator");

// Generated during bootstrap
if (process.env.GATSBY_HOT_LOADER === `fast-refresh` && module.hot) {
  module.hot.accept(`$virtual/sync-requires`, () => {// Manually reload
  });
}

window.___emitter = _emitter.default;
const loader = new _devLoader.default(_syncRequires.default, _matchPaths.default);
(0, _loader.setLoader)(loader);
loader.setApiRunner(_apiRunnerBrowser.apiRunner);
window.___loader = _loader.publicLoader; // Do dummy dynamic import so the jsonp __webpack_require__.e is added to the commons.js
// bundle. This ensures hot reloading doesn't break when someone first adds
// a dynamic import.
//
// Without this, the runtime breaks with a
// "TypeError: __webpack_require__.e is not a function"
// error.

function notCalledFunction() {
  return Promise.resolve().then(() => (0, _interopRequireWildcard2.default)(require(`./dummy`)));
} // Let the site/plugins run code very early.


(0, _apiRunnerBrowser.apiRunnerAsync)(`onClientEntry`).then(() => {
  // Hook up the client to socket.io on server
  const socket = (0, _socketIo.default)();

  if (socket) {
    socket.on(`reload`, () => {
      window.location.reload();
    });
  }

  fetch(`/___services`).then(res => res.json()).then(services => {
    if (services.developstatusserver) {
      let isRestarting = false;
      const parentSocket = (0, _socket.default)(`${window.location.protocol}//${window.location.hostname}:${services.developstatusserver.port}`);
      parentSocket.on(`structured-log`, msg => {
        if (!isRestarting && msg.type === `LOG_ACTION` && msg.action.type === `DEVELOP` && msg.action.payload === `RESTART_REQUIRED` && window.confirm(`The develop process needs to be restarted for the changes to ${msg.action.dirtyFile} to be applied.\nDo you want to restart the develop process now?`)) {
          isRestarting = true;
          parentSocket.emit(`develop:restart`, () => {
            window.location.reload();
          });
        }

        if (isRestarting && msg.type === `LOG_ACTION` && msg.action.type === `SET_STATUS` && msg.action.payload === `SUCCESS`) {
          isRestarting = false;
          window.location.reload();
        }
      }); // Prevents certain browsers spamming XHR 'ERR_CONNECTION_REFUSED'
      // errors within the console, such as when exiting the develop process.

      parentSocket.on(`disconnect`, () => {
        console.warn(`[socket.io] Disconnected. Unable to perform health-check.`);
        parentSocket.close();
      });
    }
  });
  /**
   * Service Workers are persistent by nature. They stick around,
   * serving a cached version of the site if they aren't removed.
   * This is especially frustrating when you need to test the
   * production build on your local machine.
   *
   * Let's warn if we find service workers in development.
   */

  if (`serviceWorker` in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      if (registrations.length > 0) console.warn(`Warning: found one or more service workers present.`, `If your site isn't behaving as expected, you might want to remove these.`, registrations);
    });
  }

  const rootElement = document.getElementById(`___gatsby`);
  const focusEl = document.getElementById(`gatsby-focus-wrapper`);
  const renderer = (0, _apiRunnerBrowser.apiRunner)(`replaceHydrateFunction`, undefined, // Client only pages have any empty body so we just do a normal
  // render to avoid React complaining about hydration mis-matches.
  focusEl && focusEl.children.length > 0 ? _reactDom.default.hydrate : _reactDom.default.render)[0];
  let dismissLoadingIndicator;

  if (process.env.GATSBY_EXPERIMENTAL_QUERY_ON_DEMAND && process.env.GATSBY_QUERY_ON_DEMAND_LOADING_INDICATOR === `true`) {
    let indicatorMountElement;
    const showIndicatorTimeout = setTimeout(() => {
      indicatorMountElement = document.createElement(`first-render-loading-indicator`);
      document.body.append(indicatorMountElement);

      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_indicator.Indicator, null), indicatorMountElement);
    }, 1000);

    dismissLoadingIndicator = () => {
      clearTimeout(showIndicatorTimeout);

      if (indicatorMountElement) {
        _reactDom.default.unmountComponentAtNode(indicatorMountElement);

        indicatorMountElement.remove();
      }
    };
  }

  Promise.all([loader.loadPage(`/dev-404-page/`), loader.loadPage(`/404.html`), loader.loadPage(window.location.pathname)]).then(() => {
    const preferDefault = m => m && m.default || m;

    const Root = preferDefault(require(`./root`));
    (0, _domready.default)(() => {
      if (dismissLoadingIndicator) {
        dismissLoadingIndicator();
      }

      renderer( /*#__PURE__*/_react.default.createElement(Root, null), rootElement, () => {
        (0, _apiRunnerBrowser.apiRunner)(`onInitialClientRender`); // Render query on demand overlay

        if (process.env.GATSBY_QUERY_ON_DEMAND_LOADING_INDICATOR && process.env.GATSBY_QUERY_ON_DEMAND_LOADING_INDICATOR === `true`) {
          const indicatorMountElement = document.createElement(`div`);
          indicatorMountElement.setAttribute(`id`, `query-on-demand-indicator-element`);
          document.body.append(indicatorMountElement);

          _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_loadingIndicator.LoadingIndicatorEventHandler, null), indicatorMountElement);
        }
      });
    });
  });
});