import React from "react"

import "../css/components/hero-block.css"

const HeroBlock = props => (
  <div className="HeroBlock" data-type={props.type}>
    <div className="HeroBlock--content">
      {props.children}
    </div>
  </div>
)

export default HeroBlock
