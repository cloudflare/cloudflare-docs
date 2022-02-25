import React from "react"
import { className } from "./root"

export default props => (
  <p className={className("button-group")}>
    <span className={className("button-group-content")}>
      {props.children}
    </span>
  </p>
)
