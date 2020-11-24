// Keep in sync with @cloudflare/cloudflare-docs-engine
// Due to what seems like a Gatsby bug which occurs only with `gatsby build`
// and not `gatsby develop`, when any file imported from cloudflare-docs-engine
// contains `useStaticQuery` the build fails due to a relative import issue with
// the way GraphQL stores the cached static JSON.

import React from "react"
import { graphql, Link } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import a from "cloudflare-docs-engine/src/components/mdx/anchor-link"
import headers from "cloudflare-docs-engine/src/components/mdx/headers"
import inlineCode from "cloudflare-docs-engine/src/components/mdx/inline-code"
import pre from "cloudflare-docs-engine/src/components/mdx/code-block"
import Button from "cloudflare-docs-engine/src/components/mdx/button"
import ButtonGroup from "cloudflare-docs-engine/src/components/mdx/button-group"
import Aside from "cloudflare-docs-engine/src/components/mdx/aside"
import ContentColumn from "cloudflare-docs-engine/src/components/mdx/content-column"
import Example from "cloudflare-docs-engine/src/components/mdx/example"
import Demo from "cloudflare-docs-engine/src/components/mdx/demo"
import TableWrap from "cloudflare-docs-engine/src/components/mdx/table-wrap"
import Definitions from "cloudflare-docs-engine/src/components/mdx/definitions"
import Code from "cloudflare-docs-engine/src/components/mdx/code"
import ParamType from "cloudflare-docs-engine/src/components/mdx/param-type"
import Type from "cloudflare-docs-engine/src/components/mdx/type"
import TypeLink from "cloudflare-docs-engine/src/components/mdx/type-link"
import PropMeta from "cloudflare-docs-engine/src/components/mdx/prop-meta"
import DirectoryListing from "cloudflare-docs-engine/src/components/mdx/directory-listing"
import YouTube from "cloudflare-docs-engine/src/components/mdx/youtube"
import StreamVideo from "cloudflare-docs-engine/src/components/mdx/stream-video"

// https://mdxjs.com/table-of-components
// https://www.gatsbyjs.org/docs/mdx/customizing-components/
const components = {
  // Replace native DOM elements
  a,
  ...headers,
  inlineCode,
  pre,

  // Add custom components
  Link,
  Button,
  ButtonGroup,
  Aside,
  ContentColumn,
  Example,
  Demo,
  TableWrap,
  Definitions,
  Code,
  ParamType,
  Type,
  TypeLink,
  PropMeta,
  DirectoryListing,
  YouTube,
  StreamVideo,
}

const MDXCustomRenderer = ({ data: { mdx } }) => {
  return (
    <MDXProvider components={components}>
      <MDXRenderer frontmatter={mdx.frontmatter}>
        {mdx.body}
      </MDXRenderer>
    </MDXProvider>
  )
}

export default MDXCustomRenderer

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        demo
        difficulty
        summary
        tags
        title
        type
        updated(formatString: "YYYY-MM-DD")
      }
    }
  }
`
