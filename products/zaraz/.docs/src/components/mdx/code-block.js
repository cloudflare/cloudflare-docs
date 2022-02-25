import React from "react"

import * as frontMatterParser from "gray-matter"

import Highlight, { defaultProps } from "prism-react-renderer"

import {
  languageMappings,
  prismLanguages,
  transformToken,
} from "./custom-syntax-highlighting"

// Additional language support (See https://git.io/JJuZX)
import Prism from "prism-react-renderer/prism"
;(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-toml")
require("prismjs/components/prism-rust")
Prism.languages.sh = prismLanguages.sh

const codeBlockClassName = (theme) => {
  const themeClassName =
    theme === "dark" ? "" : " CodeBlock-is-light-in-light-theme"
  return `CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally${themeClassName}`
}

const addNewlineToEmptyLine = (line) => {
  if (line && line.length === 1 && line[0].empty) {
    // Improves copy/paste behavior
    line[0].content = "\n"
  }

  return line
}

const CodeBlock = (props) => {
  const { className, children } = props.children.props

  if (props.className) {
    return <pre {...props} />
  }

  let language = className ? className.split("-")[1] : "js"
  const mappedLanguage = languageMappings[language]
  if (mappedLanguage) language = mappedLanguage

  let code = children.trim()

  const tokenProps = ({ children, className, key }) => {
    const tokens = className.replace("token ", "").split(" ")

    className = ""

    tokens.forEach((token, i) => {
      token = transformToken({ token, children, language })
      if (token.indexOf("language-") !== 0) token = `token-${token}`
      className += ` CodeBlock--${token}`
    })

    className = className.trim()

    return {
      key,
      children,
      className,
    }
  }

  let codeFrontmatter = {}

  // For now, we don’t support code frontmatter
  // in Markdown or YAML blocks because they
  // themselves can contain frontmatter.

  // TODO: find workaround for this limitation
  if (language !== "markdown" && language !== "yaml") {
    const parsed = frontMatterParser(code)

    if (Object.keys(parsed.data).length) {
      code = parsed.content
      codeFrontmatter = parsed.data
    }
  }

  const theme = codeFrontmatter.theme || "light"

  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            codeBlockClassName(theme) + " CodeBlock--language-" + language
          }
          language={language}
        >
          {codeFrontmatter.header && (
            <span className="CodeBlock--header">{codeFrontmatter.header}</span>
          )}
          {codeFrontmatter.filename && !codeFrontmatter.header && (
            <span className="CodeBlock--filename">
              {codeFrontmatter.filename}
            </span>
          )}
          <code>
            <span className="CodeBlock--rows">
              <span className="CodeBlock--rows-content">
                {tokens.map((line, i) => (
                  <span
                    key={i}
                    className={
                      "CodeBlock--row" +
                      (codeFrontmatter.highlight &&
                      codeFrontmatter.highlight.length &&
                      codeFrontmatter.highlight.includes(i + 1)
                        ? " CodeBlock--row-is-highlighted"
                        : "")
                    }
                  >
                    <span className="CodeBlock--row-indicator"></span>
                    <div className="CodeBlock--row-content">
                      {addNewlineToEmptyLine(line).map((token, key) => (
                        <span
                          key={key}
                          {...tokenProps(getTokenProps({ token, key }))}
                        />
                      ))}
                    </div>
                  </span>
                ))}
              </span>
            </span>
          </code>
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
