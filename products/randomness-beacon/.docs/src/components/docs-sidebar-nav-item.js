import React from "react"
import { Link } from "gatsby"

import Collapse from "@material-ui/core/Collapse"

import sidebarCollapseTransitionDuration from "../constants/sidebar-collapse-transition-duration"

import getPathPrefix from "../utils/get-path-prefix"
import getNormalizedPath from "../utils/get-normalized-path"
import userPrefersReducedMotion from "../utils/user-prefers-reduced-motion"

const collapseClassesBase = "DocsSidebar--nav-item-collapse-"

const DocsSidebarCollapse = ({ expanded, children }) => {
  const base = collapseClassesBase
  const collapseClasses = {
    container: `${base}container`,
    entered: `${base}entered`,
    hidden: `${base}hidden`,
    wrapper: `${base}wrapper`,
    wrapperInner: `${base}wrapperInner`
  }

  if (userPrefersReducedMotion()) {
    let className = collapseClasses.container + " "
    className += expanded ? collapseClasses.entered : collapseClasses.hidden

    return (
      <div className={className} children={children}/>
    )
  }

  return (
    <Collapse
      classes={collapseClasses}
      in={expanded}
      timeout={sidebarCollapseTransitionDuration}
      onEntering={(node, isAppearing) => {
        // Get the height Collapse wants to expand to
        let height = parseInt(node.style.height, 10)

        // Find all child Collapses which are simultaneously expanding
        node.querySelectorAll(`.${collapseClasses.container}`).forEach(node => {
          if (!node.hasAttribute("style")) return

          const childNodeHeight = parseInt(node.style.height, 10)

          // And augment the parent Collapse height by the height
          // of the simultaneously expanding child Collapses
          if (!isNaN(childNodeHeight)) {
            height += parseInt(node.style.height, 10)
          }
        })

        node.style.height = `${height}px`
      }}
      children={children}/>
  )
}

const pathPrefix = getPathPrefix()

class DocsSidebarNavItem extends React.Component {

  constructor(props) {
    super(props)

    this.expandCollapseEl = React.createRef()

    this.state = {
      expanded: this.isExpanded()
    }

    this.onExpandCollapseClick = this.onExpandCollapseClick.bind(this)
  }

  showChildren() {
    const { node } = this.props
    return Array.isArray(node.children) && !node.frontmatter.hideChildren
  }

  isActive() {
    const { node, location } = this.props

    const href = pathPrefix ? pathPrefix + node.href : node.href
    const isActive = getNormalizedPath(href) === getNormalizedPath(location.pathname)
    const isActiveDueToChild = !this.showChildren() && this.isActiveRoot()

    return isActive || isActiveDueToChild
  }

  isActiveRoot() {
    const { node, location } = this.props

    const href = node => pathPrefix ? pathPrefix + node.href : node.href
    const isActive = node => getNormalizedPath(href(node)) === getNormalizedPath(location.pathname)
    const hasActiveChild = node => !node.children ? false : node.children.some(
      node => isActive(node) || hasActiveChild(node)
    )

    return hasActiveChild(node)
  }

  isHidden() {
    if (typeof this.props.isParentExpanded === "undefined") return false
    return !this.props.isParentExpanded
  }

  isExpanded() {
    const active = this.isActive()
    const activeRoot = this.isActiveRoot()
    return !!(this.props.node.children && (active || activeRoot))
  }

  componentDidMount() {
    const el = this.expandCollapseEl.current
    const expanded = this.state.expanded

    if (!el || !expanded) return

    el.style.height = el.firstElementChild.clientHeight + 'px'
  }

  componentDidUpdate(prevProps) {
    if (getNormalizedPath(this.props.location.pathname) !== getNormalizedPath(prevProps.location.pathname)) {
      this.setState({ expanded: this.isExpanded() })
    }
  }

  onExpandCollapseClick() {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  render() {
    const { expanded } = this.state
    const { node, location } = this.props
    const depth = this.props.depth + 1

    const props = {}
    if (expanded) props['is-expanded'] = ''
    if (this.isActive()) props['is-active'] = ''
    if (this.isActiveRoot()) props['is-active-root'] = ''

    const linkProps = {}
    if (this.isHidden()) linkProps.tabIndex = -1
    if (this.isHidden()) linkProps["aria-hidden"] = true
    if (this.isActive()) linkProps['is-active'] = ''

    const buttonProps = {}
    if (this.isHidden()) buttonProps.tabIndex = -1
    if (this.isHidden()) buttonProps["aria-hidden"] = true

    return (
      <li
        className="DocsSidebar--nav-item"
        key={node.id}
        {...props}
      >
        {this.showChildren() && (
          <button onClick={this.onExpandCollapseClick} className="Button DocsSidebar--nav-expand-collapse-button" {...buttonProps}>
            <span className="DocsSidebar--nav-expand-collapse-button-content" aria-hidden="true"></span>
            <span is-visually-hidden="">{expanded ? "Collapse" : "Expand"}: {node.title}</span>
          </button>
        )}

        <Link className="DocsSidebar--nav-link" to={node.href} {...linkProps}>
          <span className="DocsSidebar--nav-link-highlight"></span>
          <span className="DocsSidebar--nav-link-text">{node.title}</span>
        </Link>

        {this.showChildren() && (
          <DocsSidebarCollapse expanded={expanded}>
            <div className={`${collapseClassesBase}content`}>
              <ul className="DocsSidebar--nav-subnav" depth={depth} style={{'--depth': depth}}>
                {node.children.map(node => (
                  <DocsSidebarNavItem
                    key={node.id}
                    node={node}
                    location={location}
                    depth={depth}
                    isParentExpanded={expanded}
                  />
                ))}
              </ul>
            </div>
          </DocsSidebarCollapse>
        )}
      </li>
    )
  }
}

export default DocsSidebarNavItem
