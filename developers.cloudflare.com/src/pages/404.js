import React from "react"

import AnchorLink from "cloudflare-docs-engine/src/components/mdx/anchor-link"
import SEO from "cloudflare-docs-engine/src/components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="Not found"/>
    <center>
      <h1>Not found</h1>
      <p>Unfortunately, the page you requested cannot be found.</p>
      <p><AnchorLink class="Button Button-is-docs-primary" href="/">Go home</AnchorLink></p>
    </center>
  </>
)

export default NotFoundPage
