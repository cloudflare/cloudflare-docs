import React from "react"
import { Location } from "@reach/router"

import sidebarCollapseTransitionDuration
from "../constants/sidebar-collapse-transition-duration"

import animate from "../utils/animate"
import isMobile from "../utils/is-mobile"
import userPrefersReducedMotion from "../utils/user-prefers-reduced-motion"
import ScrollbarsWithScrollShadow from "./scrollbars-with-scroll-shadows"

import DocsSidebarNav from "./docs-sidebar-nav"

class DocsSidebarNavSectionContent extends React.Component {

  componentDidMount() {
    this.scrollToActiveNavItemIfHidden()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname === prevProps.location.pathname) return
    if (this.scrollToActiveTimeout) clearTimeout(this.scrollToActiveTimeout)

    if (userPrefersReducedMotion() || isMobile()) {
      // Wait one frame to allow the sidebar nav items
      // to expand/collapse as needed before determining
      // the scroll position
      requestAnimationFrame(() => {
        this.scrollToActiveNavItemIfHidden()
      })
      return
    }

    // Wait the sidebar nav transition duration plus one
    // frame before determining the scroll position
    this.scrollToActiveTimeout = setTimeout(() => {
      // TODO:
      // Investigate whether it’s possible to do this
      // with a transitionend event instead of setTimeout
      // without reaching into the child components
      requestAnimationFrame(() => {
        this.scrollToActiveNavItemIfHidden(true)
      })
    }, sidebarCollapseTransitionDuration)
  }

  scrollToActiveNavItemIfHidden(shouldAnimate) {
    if (!this.refs || !this.refs.scrollbars || !this.refs.scrollbars.refs) return

    const { scrollbars } = this.refs.scrollbars.refs
    const { container } = scrollbars

    const activeLink = container.querySelector("a[href][is-active]")
    if (!activeLink) return

    const activeRect = activeLink.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const activeNavItemAboveFold = activeRect.top < containerRect.top
    const activeNavItemBelowFold = activeRect.bottom > containerRect.bottom

    if (activeNavItemAboveFold || activeNavItemBelowFold) {
      const scrollTop = scrollbars.getScrollTop()

      const delta = (
        activeRect.top - containerRect.top
        - ((containerRect.height - activeRect.height) / 2)
      )

      const scrollHeight = scrollbars.getScrollHeight()
      const bottomScrollTop = scrollHeight - containerRect.height

      let newScrollTop = scrollTop + delta
      newScrollTop = Math.min(newScrollTop, bottomScrollTop)
      newScrollTop = Math.max(newScrollTop, 0)

      if (shouldAnimate) {
        animate({
          from: scrollTop,
          to: newScrollTop,
          easing: "cubicBezier(.4, 0, .2, 1)",
          duration: 500,
          update: value => scrollbars.scrollTop(value)
        })

      } else {
        scrollbars.scrollTop(newScrollTop)
      }
    }
  }

  render() {
    return (
      <ScrollbarsWithScrollShadow
        ref="scrollbars"
        className="DocsSidebar--section DocsSidebar--nav-section"
        shadowClassName="DocsSidebar--nav-section-shadow"
        thumbMinSize={60}
        universal
      >
        <DocsSidebarNav/>
      </ScrollbarsWithScrollShadow>
    )
  }
}

const DocsSidebarNavSection = () => (
  <Location>
    {({ location }) => (
      <DocsSidebarNavSectionContent location={location}/>
    )}
  </Location>
)

export default DocsSidebarNavSection
