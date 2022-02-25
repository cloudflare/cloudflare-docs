"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _stackTrace = _interopRequireDefault(require("stack-trace"));

var _overlay = _interopRequireDefault(require("./overlay"));

var _utils = require("../utils");

var _codeFrame = _interopRequireDefault(require("./code-frame"));

function formatFilename(filename) {
  const htmlMatch = /^https?:\/\/(.*)\/(.*)/.exec(filename);

  if (htmlMatch && htmlMatch[1] && htmlMatch[2]) {
    return htmlMatch[2];
  }

  const sourceMatch = /^webpack-internal:\/\/\/(.*)$/.exec(filename);

  if (sourceMatch && sourceMatch[1]) {
    return sourceMatch[1];
  }

  return filename;
}

const useFetch = url => {
  const [response, setResponse] = _react.default.useState({
    decoded: null,
    sourcePosition: {
      line: null,
      number: null
    },
    sourceContent: null
  });

  _react.default.useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const json = await res.json();
      const decoded = (0, _utils.prettifyStack)(json.codeFrame);
      const {
        sourcePosition,
        sourceContent
      } = json;
      setResponse({
        decoded,
        sourceContent,
        sourcePosition
      });
    }

    fetchData();
  }, []);

  return response;
};

function getCodeFrameInformation(stackTrace) {
  const callSite = stackTrace.find(CallSite => CallSite.getFileName());

  if (!callSite) {
    return null;
  }

  const moduleId = formatFilename(callSite.getFileName());
  const lineNumber = callSite.getLineNumber();
  const columnNumber = callSite.getColumnNumber();
  const functionName = callSite.getFunctionName();
  return {
    moduleId,
    lineNumber,
    columnNumber,
    functionName
  };
}

const RuntimeError = ({
  error,
  open,
  dismiss
}) => {
  const stacktrace = _stackTrace.default.parse(error.error);

  const {
    moduleId,
    lineNumber,
    columnNumber,
    functionName
  } = getCodeFrameInformation(stacktrace);
  const res = useFetch(`/__original-stack-frame?moduleId=` + window.encodeURIComponent(moduleId) + `&lineNumber=` + window.encodeURIComponent(lineNumber) + `&columnNumber=` + window.encodeURIComponent(columnNumber));

  const header = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    "data-gatsby-overlay": "header__cause-file"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Unhandled Runtime Error"), /*#__PURE__*/_react.default.createElement("span", null, moduleId)), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => open(moduleId, res.sourcePosition.line),
    "data-gatsby-overlay": "header__open-in-editor"
  }, "Open in editor"));

  const body = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", {
    "data-gatsby-overlay": "body__error-message-header"
  }, "Error in function ", /*#__PURE__*/_react.default.createElement("span", {
    "data-font-weight": "bold"
  }, functionName)), /*#__PURE__*/_react.default.createElement("p", {
    "data-gatsby-overlay": "body__error-message"
  }, error.error.message), /*#__PURE__*/_react.default.createElement(_codeFrame.default, {
    decoded: res.decoded
  }));

  return /*#__PURE__*/_react.default.createElement(_overlay.default, {
    header: header,
    body: body,
    dismiss: dismiss
  });
};

var _default = RuntimeError;
exports.default = _default;