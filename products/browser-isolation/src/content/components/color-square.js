import React from "react"

export default (props) => {
  return (
    <span style={{
      display: "inline-block",
      height: "2em",
      width: "2em",
      background: props.color
    }}/>
  )
}
