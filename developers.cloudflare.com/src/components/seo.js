// Keep in sync with @cloudflare/cloudflare-docs-engine
// Due to what seems like a Gatsby bug which occurs only with `gatsby build`
// and not `gatsby develop`, when any file imported from cloudflare-docs-engine
// contains `useStaticQuery` the build fails due to a relative import issue with
// the way GraphQL stores the cached static JSON.

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ lang, title, description, meta }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            image
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const pageTitle = title
  const siteTitle = site.siteMetadata.title

  const isHomeTitle = [
    "Home",
    "Docs",
    "Overview",
    "Welcome",
    siteTitle
  ].includes(pageTitle)

  title = isHomeTitle ? siteTitle : `${pageTitle} · ${siteTitle}`

  return (
    <Helmet>
      <html lang={lang}/>

      <title>{title}</title>

      <meta name="description" content={metaDescription}/>

      <meta property="og:image" content={site.siteMetadata.image} />
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={metaDescription}/>
      <meta property="og:type" content="website"/>

      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={metaDescription}/>
      <meta name="twitter:creator" content={site.siteMetadata.author}/>
      <meta name="twitter:card" content="summary_large_image"/>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: "en",
  description: "",
  meta: []
}

SEO.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object)
}

export default SEO
