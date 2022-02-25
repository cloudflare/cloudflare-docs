"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

class ErrorBoundary extends _react.default.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error) {
    this.props.onError(error);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }

}

var _default = ErrorBoundary;
exports.default = _default;