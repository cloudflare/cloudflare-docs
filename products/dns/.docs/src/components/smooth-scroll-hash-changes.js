import React from "react"

import { globalHistory } from "@reach/router"

import isMobile from "../utils/is-mobile"
import userPrefersReducedMotion from "../utils/user-prefers-reduced-motion"
import getNormalizedPath from "../utils/get-normalized-path"

class SmoothScrollHashChanges extends React.Component {

  componentDidMount() {
    this.previousPathname = window.location.pathname

    // Apply smooth scrolling only during page transitions so
    // as not to disrupt the browser’s normal in-page search
    // https://css-tricks.com/downsides-of-smooth-scrolling/
    this.historyUnsubscribe = globalHistory.listen(({ location, action }) => {
      const pathname = getNormalizedPath(location.pathname)
      const previousPathname = getNormalizedPath(this.previousPathname)
      const pathnameChanged = pathname !== previousPathname
      this.previousPathname = location.pathname

      // Apply smooth scrolling only during hash changes
      if (pathnameChanged) return

      // Apply smooth scroll only on desktop devices
      if (isMobile()) return

      // Apply smooth scroll only for users who specify
      // `no-preference` for reduced motion
      // https://web.dev/prefers-reduced-motion/
      if (userPrefersReducedMotion()) return

      document.documentElement.setAttribute("is-smooth-scrolling", "")

      if (this.smoothScrollTimeout) {
        clearTimeout(this.smoothScrollTimeout)
      }

      // Unfortunately, there’s no way to know when the scrolling
      // animation has finished, even when using the native browser
      // APIs .scroll() or .scrollIntoView(). However, fortunately,
      // the browser seems to allow the animation to complete so
      // long as `scroll-behavior: smooth` is applied when the hash
      // change occurs and even if the styles are removed during
      // the animation. If a Promise or callback behavior is ever
      // added to the browser APIs, we can use that instead.
      // https://github.com/w3c/csswg-drafts/issues/3744
      this.smoothScrollTimeout = setTimeout(() => {
        document.documentElement.removeAttribute("is-smooth-scrolling")
      }, 100)
    })
  }

  componentWillUnmount() {
    this.historyUnsubscribe()
  }

  render() {
    return null
  }
}

export default SmoothScrollHashChanges
