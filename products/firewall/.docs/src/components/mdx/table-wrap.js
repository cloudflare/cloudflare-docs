import React from "react"

import { className } from "./root"

export default props => (
  <div className={className("table-wrap")}>
    <div className={className("table-wrap-inner")}>
      {props.children}
    </div>
  </div>
)
