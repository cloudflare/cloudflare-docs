import React from "react"

import "../css/components/stripe.css"

const Stripe = props => (
  <div className="Stripe" data-type={props.type}>
    <div className="Stripe--content">
      {props.children}
    </div>
  </div>
)

export default Stripe
