import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import getBreadcrumbs from "../utils/get-breadcrumbs"

const Item = ({ item }) => (
  <li className="Breadcrumbs--item" key={item.url}>
    <Link className="Link Link-without-underline Link-is-juicy" to={item.url}>
      {item.title}
    </Link>

    {Array.isArray(item.items) && (
      <ul>
        {item.items.map(item => (
          <Item key={item.url} item={item}/>
        ))}
      </ul>
    )}
  </li>
)

const Breadcrumbs = props => {
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            id
            parent {
              id
            }
            fields {
              slug
            }
            frontmatter {
              title
            }
            headings(depth: h1) {
              value
              depth
            }
          }
        }
      }
    }
  `)

  const pages = query.allMdx.edges
    .map(({ node }) => node)

  const { className, location } = props
  const breadcrumbs = getBreadcrumbs(pages, location)

  return breadcrumbs.length ? (
    <div className={className}>
      <ul className="Breadcrumbs">
        {breadcrumbs.map(item => (
          <Item key={item.url} item={item}/>
        ))}
      </ul>
    </div>
  ) : null
}

Breadcrumbs.defaultProps = {
  className: "Breadcrumbs---wrapper"
}

export default Breadcrumbs
