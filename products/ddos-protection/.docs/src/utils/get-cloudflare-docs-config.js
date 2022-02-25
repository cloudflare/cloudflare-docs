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
              productIconKey
              productLogoPathD
              logoSVGContent
              contentRepo
              contentRepoFolder
              externalLinks {
                title
                url
              }
              search {
                indexName
                apiKey
                algoliaOptions {
                  facetFilters
                }
              }
            }
          }
        }
      }
    `
  )

  return siteMetadata.cloudflareDocs
}
