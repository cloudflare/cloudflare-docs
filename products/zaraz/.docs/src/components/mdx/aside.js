import React from "react"

import { className } from "./root"

const Aside = props => (
  <aside className={className("aside")} role="note" data-type={props.type}>
    {props.header && (
      <div className={className("aside-header")}>
        {props.header}
      </div>
    )}
    {props.children}
  </aside>
)

Aside.defaultProps = {
  type: "note"
}

export default Aside
