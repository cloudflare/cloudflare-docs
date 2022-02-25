import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import AnchorLink from "./anchor-link"

import getParentPath from "../../utils/get-parent-path"
import getPageTitle from "../../utils/get-page-title"
import getOrder from "../../utils/get-order"

const DirectoryListing = props => {
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              order
              hidden
            }
            headings(depth: h1) {
              value
            }
          }
        }
      }
    }
  `)

  const pages = query.allMdx.edges
    .map(({ node }) => node)
    .filter(page => !page.frontmatter.hidden)
    .filter(page => getParentPath(page.fields.slug) === props.path)
    .map(page => ({
      title: getPageTitle(page),
      url: page.fields.slug,
      order: getOrder(page),
    }))
    .sort((a, b) => {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
    .sort((a, b) => a.order - b.order)

  return (
    <ul>
      {pages.map(page => (
        <li key={page.url}>
          <AnchorLink href={page.url}>
            {page.title}
          </AnchorLink>
        </li>
      ))}
    </ul>
  )
}

export default DirectoryListing
