"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

const CodeFrame = ({
  decoded
}) => /*#__PURE__*/_react.default.createElement("pre", {
  "data-gatsby-overlay": "pre"
}, /*#__PURE__*/_react.default.createElement("code", {
  "data-gatsby-overlay": "pre__code"
}, decoded ? decoded.map((entry, index) => /*#__PURE__*/_react.default.createElement("span", {
  key: `frame-${index}`,
  "data-gatsby-overlay": "pre__code__span",
  style: {
    color: entry.fg ? `var(--color-${entry.fg})` : undefined,
    ...(entry.decoration === `bold` ? {
      fontWeight: 800
    } : entry.decoration === `italic` ? {
      fontStyle: `italic`
    } : undefined)
  }
}, entry.content)) : null));

var _default = CodeFrame;
exports.default = _default;