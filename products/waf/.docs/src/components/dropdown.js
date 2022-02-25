import React from "react"

import createFocusGroup from "focus-group"

class Dropdown extends React.Component {

  constructor(props) {
    super(props)

    this.container = React.createRef()
    this.button = React.createRef()

    this.state = {
      expanded: false
    }

    this.onExpandButtonClick = this.onExpandButtonClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleEscapeKey = this.handleEscapeKey.bind(this)
  }

  onExpandButtonClick() {
    this.setState(state => {
      const expanded = !state.expanded

      if (expanded) {
        this.focusGroup.focusNodeAtIndex(0)
      }

      return { expanded }
    })
  }

  handleClickOutside(event) {
    if (!this.state.expanded) return
    if (!this.container.current) return
    if (this.container.current.contains(event.target)) return

    this.setState({
      expanded: false
    })
  }

  handleBlur(event) {
    if (this.willEscape) return
    if (!this.state.expanded) return
    if (!this.button.current || !this.container.current) return

    const activeElement = event.relatedTarget

    if (activeElement === this.button.current) {
      event.preventDefault()
      const focusIndex = this.focusGroup.getMembers().length - 1
      this.focusGroup.focusNodeAtIndex(focusIndex)
    }

    else if (!this.container.current.contains(event.relatedTarget)) {
      event.preventDefault()
      this.focusGroup.focusNodeAtIndex(0)
    }
  }

  handleEscapeKey(event) {
    if (event.key !== "Escape") return

    this.willEscape = true

    if (this.button.current) {
      this.button.current.focus()
    }

    this.setState({ expanded: false })
  }

  componentDidMount() {
    const el = this.container.current
    const members = el.querySelectorAll(this.props.focusGroupSelector)

    this.focusGroup = createFocusGroup({
      members: members,
      wrap: true,
      stringSearch: true
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.expanded && this.state.expanded) {
      this.focusGroup.activate()
      this.willEscape = false
      document.addEventListener("click", this.handleClickOutside)
      document.addEventListener("keyup", this.handleEscapeKey)
    }

    if (prevState.expanded && !this.state.expanded) {
      this.focusGroup.deactivate()
      document.removeEventListener("click", this.handleClickOutside)
      document.removeEventListener("keyup", this.handleEscapeKey)
    }
  }

  componentWillUnmount() {
    this.focusGroup.deactivate()
  }

  render() {
    const { expanded } = this.state

    let { className, buttonClassName } = this.props
    className += (className ? " " : "") + "Dropdown"
    buttonClassName += (className ? " " : "") + "Button"

    return (
      <div className={className} ref={this.container} data-expanded={expanded} onBlur={this.handleBlur}>
        <button
          ref={this.button}
          className={buttonClassName}
          onClick={this.onExpandButtonClick}
          aria-expanded={expanded}
          children={this.props.buttonChildren}
        />

        {this.props.children(this.state)}
      </div>
    )
  }
}

Dropdown.defaultProps = {
  focusGroupSelector: "a[href]"
}

export default Dropdown
