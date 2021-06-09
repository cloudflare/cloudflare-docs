import React from "react"

export default props => {
  const wrapperStyle = {
    width: "33%",
    marginBottom: "1em"
  }

  const aspectRatioStyle = {
    "--aspect-ratio": "calc(1989 / 589)"
  }

  return (
    <React.Fragment>
      <span is-visually-hidden="">1.1.1.1</span>
      <div style={wrapperStyle}>
        <div className="AspectRatio" style={aspectRatioStyle}>
          <img className="AspectRatio--content" src={props.gif} alt="1.1.1.1"/>
        </div>
      </div>
    </React.Fragment>
  )
}
