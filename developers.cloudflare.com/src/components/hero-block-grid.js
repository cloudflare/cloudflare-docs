import React from "react"

import "../css/components/hero-block-grid.css"

const HeroBlock = props => (
  <div className="HeroBlockGrid">
    {props.children}
  </div>
)

export default HeroBlock
