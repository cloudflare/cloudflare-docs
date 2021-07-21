import React from "react"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
// These are overridden by our SkipNavLink styles
// but included here to quiet console warnings
import "@reach/skip-nav/styles.css"

import Helmet from "react-helmet"
import SEO from "./seo"

import HandleMobilePageNavigations from "cloudflare-docs-engine/src/components/handle-mobile-page-navigations"
import BrowserResizeTracking from "cloudflare-docs-engine/src/components/browser-resize-tracking"
import SmoothScrollHashChanges from "cloudflare-docs-engine/src/components/smooth-scroll-hash-changes"

import SiteHeader from "./site-header"
import { className as docsMarkdownClassName } from "cloudflare-docs-engine/src/components/mdx/root"

import getPageTitle from "cloudflare-docs-engine/src/utils/get-page-title"
import getPageType from "cloudflare-docs-engine/src/utils/get-page-type"

import "../css/components/site-page.css"

const SitePage = ({ pageContext: page, children, location }) => {
  const title = getPageTitle(page)
  const pageType = getPageType(page)

  const htmlProps = {}
  htmlProps["is-site-page"] = ""
  htmlProps["is-docs-page"] = ""

  return (
    <>
      <SEO title={title}/>

      <Helmet>
        <html {...htmlProps}/>
      </Helmet>

      <HandleMobilePageNavigations/>
      <BrowserResizeTracking/>
      <SmoothScrollHashChanges/>

      <SkipNavLink contentId="docs-content" className="SkipNavLink"/>

      <div className="DocsPage">
        <SiteHeader/>

        <main className="DocsBody">
          <SkipNavContent id="docs-content"/>

          <div className="DocsContent" page-type={pageType}>
            <article className={docsMarkdownClassName()}>
              {children}
            </article>
          </div>
        </main>
      </div>
    </>
  )
}

export default SitePage
