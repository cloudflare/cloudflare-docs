import React from "react"

const attr = "is-resizing"

class SmoothBrowserResizing extends React.Component {

  constructor(props) {
    super(props)

    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize)
  }

  handleWindowResize() {
    clearTimeout(this.resizeTimeout)

    document.documentElement.setAttribute(attr, "")

    this.resizeTimeout = setTimeout(() => {
      document.documentElement.removeAttribute(attr)
    }, this.props.debounce)
  }

  render() {
    return null
  }
}

SmoothBrowserResizing.defaultProps = {
  debounce: 400
}

export default SmoothBrowserResizing
