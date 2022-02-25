import React from "react"

import { className } from "./root"

export default props => (
  <span className={className("prop-meta")}>
    {props.children}
  </span>
)
