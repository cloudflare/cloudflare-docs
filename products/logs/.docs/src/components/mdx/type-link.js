import React from "react"
import AnchorLink from "./anchor-link"

export default props => (
  <AnchorLink href={props.href} data-is-type-link="true">
    <code className="InlineCode InlineCode-is-type">
      {props.children}
    </code>
  </AnchorLink>
)
