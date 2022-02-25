"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

// this is `fast-refresh-overlay/portal` ported to class component
// because we don't have guarantee that query on demand users will use
// react version that supports hooks
// TO-DO: consolidate both portals into single shared component (need testing)
class ShadowPortal extends React.Component {
  constructor(...args) {
    super(...args);
    this.mountNode = /*#__PURE__*/React.createRef(null);
    this.portalNode = /*#__PURE__*/React.createRef(null);
    this.shadowNode = /*#__PURE__*/React.createRef(null);
    this.state = {
      createdElement: false
    };
  }

  componentDidMount() {
    const ownerDocument = this.mountNode.current.ownerDocument;
    this.portalNode.current = ownerDocument.createElement(`gatsby-portal`);
    this.shadowNode.current = this.portalNode.current.attachShadow({
      mode: `open`
    });
    ownerDocument.body.appendChild(this.portalNode.current);
    this.setState({
      createdElement: true
    });
  }

  componentWillUnmount() {
    if (this.portalNode.current && this.portalNode.current.ownerDocument) {
      this.portalNode.current.ownerDocument.body.removeChild(this.portalNode.current);
    }
  }

  render() {
    return this.shadowNode.current ? /*#__PURE__*/(0, _reactDom.createPortal)(this.props.children, this.shadowNode.current) : /*#__PURE__*/React.createElement("span", {
      ref: this.mountNode
    });
  }

}

var _default = ShadowPortal;
exports.default = _default;