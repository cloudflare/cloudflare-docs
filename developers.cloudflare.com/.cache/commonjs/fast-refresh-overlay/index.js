"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _client = _interopRequireDefault(require("webpack-hot-middleware/client"));

var _errorBoundary = _interopRequireDefault(require("./components/error-boundary"));

var _portal = _interopRequireDefault(require("./components/portal"));

var _style = _interopRequireDefault(require("./components/style"));

var _buildError = _interopRequireDefault(require("./components/build-error"));

var _runtimeError = _interopRequireDefault(require("./components/runtime-error"));

class FastRefreshOverlay extends _react.default.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      errors: [],
      buildError: null,
      currentIndex: 0
    };
    this._isMounted = false;

    this.dismiss = () => {
      // eslint-disable-next-line no-invalid-this
      this.setState({
        errors: [],
        currenIndex: 0,
        buildError: null
      });
    };

    this.addBuildError = error => {
      // eslint-disable-next-line no-invalid-this
      this.setState({
        buildError: error
      });
    };

    this.open = (file, lineNumber = 1) => {
      window.fetch(`/__open-stack-frame-in-editor?fileName=` + window.encodeURIComponent(file) + `&lineNumber=` + window.encodeURIComponent(lineNumber));
    };
  }

  componentDidMount() {
    this._isMounted = true;

    _client.default.useCustomOverlay({
      showProblems: (type, data) => {
        if (this._isMounted) {
          this.addBuildError(data[0]);
        }
      },
      // We rely on Fast Refresh notifying us on updates as HMR notification is "not at the right time"
      clear: () => {
        this.setState({
          buildError: null
        });
      }
    }); // TODO: Maybe only do this? Investigate if third-party stuff should be visible
    // window.addEventListener(`error`, error => {
    //   setProblems(s =>
    //     s.concat({
    //       type: `RUNTIME_ERROR`,
    //       error,
    //     })
    //   )
    // })
    // TODO: Add e2e test case, e.g. useEffect in a component to fetch invalid URL
    // window.addEventListener(`unhandledrejection`, error => {
    //   setProblems(s =>
    //     s.concat({
    //       type: `RUNTIME_ERROR`,
    //       error: error.reason,
    //     })
    //   )
    // })

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    var _this$props$children;

    const {
      errors,
      currentIndex,
      buildError
    } = this.state;
    const error = errors[currentIndex];
    const hasBuildError = buildError !== null;
    const hasRuntimeError = Boolean(errors.length);
    const hasErrors = hasBuildError || hasRuntimeError;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_errorBoundary.default, {
      clearErrors: () => {
        this.setState({
          errors: [],
          buildError: null
        });
      },
      onError: error => {
        this.setState(prevState => {
          const insertedError = {
            type: `RUNTIME_ERROR`,
            error
          };
          return {
            errors: [...prevState.errors, insertedError]
          };
        });
      }
    }, (_this$props$children = this.props.children) !== null && _this$props$children !== void 0 ? _this$props$children : null), hasErrors ? /*#__PURE__*/_react.default.createElement(_portal.default, null, /*#__PURE__*/_react.default.createElement(_style.default, null), hasBuildError ? /*#__PURE__*/_react.default.createElement(_buildError.default, {
      error: buildError,
      open: this.open,
      dismiss: this.dismiss
    }) : hasRuntimeError ? /*#__PURE__*/_react.default.createElement(_runtimeError.default, {
      error: error,
      open: this.open,
      dismiss: this.dismiss
    }) : undefined) : undefined);
  }

}

exports.default = FastRefreshOverlay;