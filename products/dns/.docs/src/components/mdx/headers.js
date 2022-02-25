import React from "react"

import { className } from "./root"

const header = (TagName) => (props => {
  const href = `#${ props.id }`

  return (
    <TagName id={props.id}>
      <span className={className("header-anchor-positioner")}>
        <a className={`${className("header-anchor")} Link Link-without-underline`} href={href} aria-hidden="true">&#8203;</a>
      </span>
      <span>{props.children}</span>
    </TagName>
  )
})

export default {
  h2: header('h2'),
  h3: header('h3'),
  h4: header('h4'),
  h5: header('h5'),
  h6: header('h6'),
}
