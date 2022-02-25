import React from "react"
import PropTypes from "prop-types"

import getUniqueReadableID from "../utils/get-unique-readable-id"

const AccessibleSVG = props => {
  const titleID = getUniqueReadableID("title")
  const { title, children, ...svgProps } = props

  return (
    <svg {...svgProps} aria-labelledby={titleID} xmlns="http://www.w3.org/2000/svg">
      <title id={titleID}>{title}</title>
      {children}
    </svg>
  )
}

AccessibleSVG.defaultProps = {
  fill: "currentColor",
  role: "img"
}

AccessibleSVG.propTypes = {
  title: PropTypes.string.isRequired
}

export default AccessibleSVG
