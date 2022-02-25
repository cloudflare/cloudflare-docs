import React from "react"

import MDXCodeBlock from "./mdx/code-block"

const CodeBlock = props => {
  return (
    <MDXCodeBlock>
      <code className={`language-${ props.lang }`}>
        {props.children}
      </code>
    </MDXCodeBlock>
  )
}

export default CodeBlock
