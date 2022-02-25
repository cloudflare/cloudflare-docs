"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.Indicator = Indicator;

var _react = _interopRequireDefault(require("react"));

var _portal = _interopRequireDefault(require("./portal"));

var _style = _interopRequireDefault(require("./style"));

var _loadingIndicator = require("$virtual/loading-indicator");

var _debugLog = require("../debug-log");

if (typeof window === `undefined`) {
  throw new Error(`Loading indicator should never be imported in code that doesn't target only browsers`);
}

if (module.hot) {
  module.hot.accept(`$virtual/loading-indicator`, () => {// isLoadingIndicatorEnabled is imported with ES import so no need
    // for dedicated handling as HMR just replace it in that case
  });
} // HMR can rerun this, so check if it was set before
// we also set it on window and not just in module scope because of HMR resetting
// module scope


if (typeof window.___gatsbyDidShowLoadingIndicatorBefore === `undefined`) {
  window.___gatsbyDidShowLoadingIndicatorBefore = false;
}

function Indicator({
  visible = true
}) {
  if (!(0, _loadingIndicator.isLoadingIndicatorEnabled)()) {
    return null;
  }

  if (!window.___gatsbyDidShowLoadingIndicatorBefore) {
    // not ideal to this in render function, but that's just console info
    (0, _debugLog.debugLog)(`A loading indicator is displayed in-browser whenever content is being requested upon navigation (Query On Demand).\n\nYou can disable the loading indicator for your current session by visiting ${window.location.origin}/___loading-indicator/disable`);
    window.___gatsbyDidShowLoadingIndicatorBefore = true;
  }

  return /*#__PURE__*/_react.default.createElement(_portal.default, null, /*#__PURE__*/_react.default.createElement(_style.default, null), /*#__PURE__*/_react.default.createElement("div", {
    "data-gatsby-loading-indicator": "root" // preact doesn't render data attributes with a literal bool false value to dom
    ,
    "data-gatsby-loading-indicator-visible": visible.toString(),
    "aria-live": "assertive"
  }, /*#__PURE__*/_react.default.createElement("div", {
    "data-gatsby-loading-indicator": "spinner",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    "data-gatsby-loading-indicator": "text"
  }, visible ? `Preparing requested page` : ``)));
}