// Keep in sync with @cloudflare/cloudflare-docs-engine
// Due to what seems like a Gatsby bug which occurs only with `gatsby build`
// and not `gatsby develop`, when any file imported from cloudflare-docs-engine
// contains `useStaticQuery` the build fails due to a relative import issue with
// the way GraphQL stores the cached static JSON.

import { useStaticQuery, graphql } from "gatsby"

// This helps us get all of the cloudflareDocs metadata
// at once. It’s not exactly ideal, but since we cannot
// do string interpolation inside useStaticQuery, this
// is about the best we can do.

// See these relevant issues:
// https://github.com/gatsbyjs/gatsby/issues/10482
// https://github.com/gatsbyjs/gatsby/issues/9843

export default () => {
  const { site: { siteMetadata }} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            cloudflareDocs {
              pathPrefix
              product
              productLogoPathD
              contentRepo
              contentRepoFolder
              externalLinks {
                title
                url
              }
              search {
                indexName
                apiKey
              }
            }
          }
        }
      }
    `
  )

  return siteMetadata.cloudflareDocs
}
