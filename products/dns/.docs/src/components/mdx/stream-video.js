import React from "react"

const defaultAspectRatio = 16 / 9

export default props => {
  const style = {
    "--aspect-ratio": `calc(${ props.aspectRatio || defaultAspectRatio })`
  }

  return (
    <figure data-type="stream-video">
      <div className="AspectRatio" style={style}>
        <iframe
          className="AspectRatio--content"
          src={`https://iframe.videodelivery.net/${props.id}${props.params || ""}`}
          title={props.title || `Stream video with ID ${props.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen/>
      </div>
    </figure>
  )
}
