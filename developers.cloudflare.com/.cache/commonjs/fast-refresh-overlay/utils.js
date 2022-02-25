"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.prettifyStack = prettifyStack;

var _anser = _interopRequireDefault(require("anser"));

function prettifyStack(errorInformation) {
  let txt;

  if (Array.isArray(errorInformation)) {
    txt = errorInformation.join(`\n`);
  } else {
    txt = errorInformation;
  }

  return _anser.default.ansiToJson(txt, {
    remove_empty: true,
    use_classes: true,
    json: true
  });
}