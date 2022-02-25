import React from "react"
import PropTypes from "prop-types"

import AccessibleSVG from "../accessible-svg"

const IconBase = props => {
  const { className, description, children, ...rest } = props

  return (
    <span className={className} aria-hidden="true">
      <AccessibleSVG {...rest}>
        {children}
      </AccessibleSVG>
      <span is-visually-hidden="" children={description}/>
    </span>
  )
}

IconBase.defaultProps = {
  viewBox: "0 0 16 16",
  className: "Icon"
}

IconBase.propTypes = {
  viewBox: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default IconBase
