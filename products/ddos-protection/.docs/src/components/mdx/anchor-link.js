import React from "react"
import { Link } from "gatsby"
import { navigate } from "@reach/router"
import getPathPrefix from "../../utils/get-path-prefix"

import { className } from "./root"
import IconExternalLink from "../icons/external-link"
const linkClassName = className("link")
const contentClassName = `${ linkClassName }-content`
const externalIconClassName = `${linkClassName}-external-icon`

export default ({ href, className, children, ...props }) => {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  if (!href || !children) return (<a {...props}/>)

  // Similar to Gatsby’s own mdx-link.js https://git.io/JUmtg
  const isHash = href.indexOf("#") === 0
  const isExternal = !!href.match(/^https?:/)
  const isFile = /\.[^/]*$/.test(href)
  const useRegularLink = isHash || isExternal || isFile

  const linkHasChildren = typeof children === "object"
  const linkHasImageChild = linkHasChildren && React.Children.toArray(children).filter(item => {
    if (typeof item === "object" && item.props && (item.props.parentName === "img" || item.props.originalType === "img" || item.props.className === "gatsby-resp-image-wrapper"))
      return true

    return false
  }).length

  if (isHash) {
    props.onClick = event => {
      if (!event.target) return
      // Gatsby’s own scroll-to-anchor by hash doesn’t
      // work reliably. Soe take control of it ourselves
      // similar to what we do in:
      // `src/components/docs-table-of-contents.js`
      const link = event.target.closest("a")
      event.preventDefault()
      navigate(link.href)
    }
  }

  if (!useRegularLink) {
    // Unfortunately, MDX seems to be automatically prefixing[1]
    // the href with the `pathPrefix`[2] before we get access to
    // it here. Gatsby’s `<Link/>` component below also prefixes
    // it, so we strip the prefix here first so that it doesn’t
    // end up getting double-prefixed.
    // [1] https://git.io/JJNPs
    // [2] https://www.gatsbyjs.com/docs/path-prefix/
    const pathPrefix = getPathPrefix()

    if (href.startsWith(`${pathPrefix}/`)) {
      href = href.substr(pathPrefix.length)
    }
  }

  return useRegularLink ? (
    (isExternal && !linkHasImageChild) ? (
      <a href={href} className={className || linkClassName} {...props}>
        <span className={contentClassName}>{children}</span>
        <IconExternalLink className={externalIconClassName}/>
      </a>
    ) : (
      <a href={href} className={className || linkClassName} {...props}>
        <span className={contentClassName}>{children}</span>
      </a>
    )
  ) : (
    <Link to={href} className={className || linkClassName} {...props}>
      <span className={contentClassName}>{children}</span>
    </Link>
  )
}
