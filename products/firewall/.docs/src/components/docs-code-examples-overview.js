import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import getPageTitle from "../utils/get-page-title"
import CodeBlock from "./code-block"

const getCodeBlockFromMDXAST = ast => {
  for (let i = 0; i < ast.children.length; i += 1) {
    if (ast.children[i].type === "code") {
      return ast.children[i]
    }
  }
}

const DocsExamplesData = props => {
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              order
              title
              summary
              demo
              tags
            }
            headings(depth: h1) {
              value
            }
            parent {
              ... on File {
                modifiedTime(formatString: "YYYY-MM-DD")
              }
            }
            mdxAST
          }
        }
      }
    }
  `)

  const examples = query.allMdx.edges
    .map(({ node }) => node)
    .filter(page => page.fields.slug.match(/^\/examples\/.+/))
    .map(page => ({
      order: page.frontmatter.order,
      title: getPageTitle(page),
      url: page.fields.slug,
      summary: page.frontmatter.summary,
      code: getCodeBlockFromMDXAST(page.mdxAST),
      tags: page.frontmatter.tags,
      demo: page.frontmatter.demo,
      updated: page.parent.modifiedTime,
    }))
    .sort((a, b) => +new Date(b.updated) - +new Date(a.updated))
    .sort((a, b) => a.order - b.order)

  const tagsSet = new Set()
  examples.forEach(ex => {
    ex.tags.forEach(tag => tagsSet.add(tag))
  })

  const tags = Array.from(tagsSet)
  tags.unshift("All examples")

  return props.children({ examples, tags })
}

class DocsCodeExamplesOverview extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTag: "All examples"
    }
  }

  render() {
    const activeTag = this.state.activeTag

    return (
      <DocsExamplesData>
        {({ examples, tags }) => (
          <>
            <div className="TagsFilter">
              {tags.map(tag => (
                <button
                  key={tag}
                  className={
                    `Button TagsFilter--button${
                      tag !== activeTag ? "" :
                        " Button-is-docs-primary TagsFilter--button-active"
                    }`
                  }
                  onClick={() => {
                    this.setState({
                      activeTag: tag
                    })
                  }}
                  children={tag}/>
              ))}
            </div>

            <div className="DocsCodeExamplesOverview">
              {examples
                .filter(ex =>
                  activeTag === "All examples" ?
                    true :
                    ex.tags.indexOf(activeTag) >= 0
                )
                .map((example, i) => (
                  <div key={example.url} className="DocsCodeExamplesOverview--example">
                    <div className="DocsCodeExamplesOverview--example-title">
                      <Link className="Link" to={example.url}>
                        {example.title}
                      </Link>
                    </div>

                    <div className="DocsCodeExamplesOverview--example-description">
                      <p>{example.summary}</p>
                    </div>

                    <Link to={example.url} className="DocsCodeExamplesOverview--example-codeblock-link">
                      <CodeBlock lang={example.code.lang} children={example.code.value}/>
                    </Link>
                  </div>
              ))}
            </div>
          </>
        )}
      </DocsExamplesData>
    )
  }
}

export default DocsCodeExamplesOverview
