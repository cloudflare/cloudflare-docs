import React from "react"
import AnchorLink from "./anchor-link"

export default ({ type, href, children, ...props }) => {
  let className = "Button"

  if (type === "primary") {
    className += " Button-is-docs-primary"
  } else if (type === "secondary") {
    className += " Button-is-docs-secondary"
  }

  if (props.className) {
    className += ` ${props.className}`
  }

  if (href) {
    return (
      <AnchorLink href={href} className={className} {...props}>
        {children}
      </AnchorLink>
    )
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
