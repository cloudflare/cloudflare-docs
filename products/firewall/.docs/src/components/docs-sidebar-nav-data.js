import { useStaticQuery, graphql } from "gatsby"

import generateNavTree from "../utils/generate-nav-tree"

let navTree
const getCachedNavTree = pages => {
  if (navTree) return navTree
  navTree = generateNavTree(pages)
  return navTree
}

const DocsSidebarNavData = props => {
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              type
              order
              hidden
              hideChildren
              breadcrumbs
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
    .filter(page => !page.frontmatter.hidden)

  const data = getCachedNavTree(pages)

  return props.children({ data })
}

export default DocsSidebarNavData
