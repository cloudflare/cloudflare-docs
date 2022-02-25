import React from "react"
import IconBase from "./base"
import PropTypes from "prop-types"

const IconNavMenu = ({ className, description }) => (
  <IconBase
    className={className}
    description={description}
    title="Navigation menu icon"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path data-index="1" d="M5, 7h10" transform-origin="10  7"/>
    <path data-index="2" d="M5,10h10" transform-origin="10 10"/>
    <path data-index="3" d="M5,13h10" transform-origin="10 13"/>
  </IconBase>
)

IconNavMenu.defaultProps = {
  description: "Open external link"
}

IconNavMenu.propTypes = {
  description: PropTypes.string.isRequired
}

export default IconNavMenu
