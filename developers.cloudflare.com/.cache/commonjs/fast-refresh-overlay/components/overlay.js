"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = Overlay;

var _react = _interopRequireDefault(require("react"));

function Overlay({
  header,
  body,
  dismiss
}) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    "data-gatsby-overlay": "backdrop"
  }), /*#__PURE__*/_react.default.createElement("div", {
    "data-gatsby-overlay": "root",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/_react.default.createElement("div", {
    "data-gatsby-overlay": "header"
  }, header, /*#__PURE__*/_react.default.createElement("button", {
    "data-gatsby-overlay": "header__close-button",
    "aria-label": "Close error overlay",
    onClick: dismiss
  }, /*#__PURE__*/_react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M6 6L18 18",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), /*#__PURE__*/_react.default.createElement("div", {
    "data-gatsby-overlay": "body"
  }, body)));
}