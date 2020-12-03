import React from "react"

import "../css/stripe.css"

const Stripe = props => (
  <div className="Stripe" data-type={props.type}>
    <div className="Stripe--content">
      {props.children}
    </div>
  </div>
)

export default Stripe