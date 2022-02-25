import React from "react"

import { className } from "./root"

export default props => (
  <div className={className("definitions")}>
    {props.children}
  </div>
)
