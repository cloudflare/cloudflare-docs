"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.LoadingIndicatorEventHandler = void 0;

var _react = _interopRequireDefault(require("react"));

var _emitter = _interopRequireDefault(require("../emitter"));

var _indicator = require("./indicator");

// no hooks because we support react versions without hooks support
class LoadingIndicatorEventHandler extends _react.default.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      visible: false
    };

    this.show = () => {
      this.setState({
        visible: true
      });
    };

    this.hide = () => {
      this.setState({
        visible: false
      });
    };
  }

  componentDidMount() {
    _emitter.default.on(`onDelayedLoadPageResources`, this.show);

    _emitter.default.on(`onRouteUpdate`, this.hide);
  }

  componentWillUnmount() {
    _emitter.default.off(`onDelayedLoadPageResources`, this.show);

    _emitter.default.off(`onRouteUpdate`, this.hide);
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_indicator.Indicator, {
      visible: this.state.visible
    });
  }

}

exports.LoadingIndicatorEventHandler = LoadingIndicatorEventHandler;