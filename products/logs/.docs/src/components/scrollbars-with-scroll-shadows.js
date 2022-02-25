import React, { Component } from "react"

import { Scrollbars } from "react-custom-scrollbars"

class ScrollbarsWithScrollShadows extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scrollTop: 0
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    const { scrollbars } = this.refs

    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function(mutation) {
        scrollbars.update()
      })
    })

    this.observer.observe(scrollbars.container, {
      subtree: true,
      childList: true,
      attributes: true
    })
  }

  componentWillUnmount() {
    this.observer.disconnect()
  }

  handleUpdate(values) {
    const { shadow } = this.refs
    const { scrollTop } = values
    const shadowOpacity = 1 / 20 * Math.min(scrollTop, 20)
    shadow.style.opacity = shadowOpacity
  }

  render() {
    const { children, shadowClassName, ...props } = this.props

    return (
      <Scrollbars
        ref="scrollbars"
        onUpdate={this.handleUpdate}
        renderTrackVertical={props => (
          <div {...props} className="Scrollbars--track Scrollbars--track-vertical"/>
        )}
        renderThumbVertical={props => (
          <div {...props} className="Scrollbars--thumb Scrollbars--thumb-vertical"/>
        )}
        {...props}
      >
        <div className={shadowClassName} ref="shadow"/>
        {children}
      </Scrollbars>
    )
  }
}

export default ScrollbarsWithScrollShadows
