import React from "react"
import PropTypes from "prop-types"

import { className as generateClassName } from "./root"

const Demo = ({ src, title, height, aspectRatio }) => {
  const className = generateClassName("demo") + (aspectRatio ? " AspectRatio" : "")
  const iframeClassName = aspectRatio ? "AspectRatio--content" : ""

  const style = aspectRatio ? {
    "--aspect-ratio": `calc(${ aspectRatio })`
  } : {
    height: `${ height }px`
  }

  return (
    <div className={className} style={style}>
      <iframe
        className={iframeClassName}
        src={src}
        title={`Demo of: ${title}`}
        frameBorder="0"
      />
    </div>
  )
}

Demo.defaultProps = {
  height: 400
}

Demo.propTypes = {
  title: PropTypes.string.isRequired
}

export default Demo
