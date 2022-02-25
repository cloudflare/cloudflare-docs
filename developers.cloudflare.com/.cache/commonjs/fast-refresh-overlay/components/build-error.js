"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _overlay = _interopRequireDefault(require("./overlay"));

var _anser = _interopRequireDefault(require("anser"));

var _codeFrame = _interopRequireDefault(require("./code-frame"));

var _utils = require("../utils");

const BuildError = ({
  error,
  open,
  dismiss
}) => {
  var _detailedError$filter;

  const [file, cause, _emptyLine, ...rest] = error.split(`\n`);
  const [_fullPath, _detailedError] = rest;

  const detailedError = _anser.default.ansiToJson(_detailedError, {
    remove_empty: true,
    json: true
  });

  const lineNumberRegex = /^[0-9]*:[0-9]*$/g;
  const lineNumberFiltered = (_detailedError$filter = detailedError.filter(d => d.content !== ` ` && d.content.match(lineNumberRegex))[0]) === null || _detailedError$filter === void 0 ? void 0 : _detailedError$filter.content;
  const lineNumber = lineNumberFiltered.substr(0, lineNumberFiltered.indexOf(`:`));
  const decoded = (0, _utils.prettifyStack)(rest);

  const header = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    "data-gatsby-overlay": "header__cause-file"
  }, /*#__PURE__*/_react.default.createElement("p", null, cause), /*#__PURE__*/_react.default.createElement("span", null, file)), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => open(file, lineNumber),
    "data-gatsby-overlay": "header__open-in-editor"
  }, "Open in editor"));

  const body = /*#__PURE__*/_react.default.createElement(_codeFrame.default, {
    decoded: decoded
  });

  return /*#__PURE__*/_react.default.createElement(_overlay.default, {
    header: header,
    body: body,
    dismiss: dismiss
  });
};

var _default = BuildError;
exports.default = _default;