import React from "react"

import { className } from "./root"

export default props => (
  <div className={className("example")}>
    {props.children}
  </div>
)
