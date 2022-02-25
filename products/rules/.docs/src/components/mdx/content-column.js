import React from "react"

import { className } from "./root"

export default props => (
  <div className={className("content-column")}>
    {props.children}
  </div>
)
