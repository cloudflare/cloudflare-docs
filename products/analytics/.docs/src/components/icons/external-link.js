import React from "react"
import IconBase from "./base"
import PropTypes from "prop-types"

const IconExternalLink = ({ className, description }) => (
  <IconBase
    className={className}
    description={description}
    title="External link icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6.75,1.75h-5v12.5h12.5v-5m0,-4v-3.5h-3.5M8,8l5.5-5.5"/>
  </IconBase>
)

IconExternalLink.defaultProps = {
  description: "Open external link"
}

IconExternalLink.propTypes = {
  description: PropTypes.string.isRequired
}

export default IconExternalLink
