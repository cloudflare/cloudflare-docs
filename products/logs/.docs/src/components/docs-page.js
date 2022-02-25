import React from "react"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
// These are overridden by our SkipNavLink styles
// but included here to quiet console warnings
import "@reach/skip-nav/styles.css"

import Helmet from "react-helmet"
import SEO from "./seo"

import HandleMobilePageNavigations from "./handle-mobile-page-navigations"
import BrowserResizeTracking from "./browser-resize-tracking"
import SmoothScrollHashChanges from "./smooth-scroll-hash-changes"
import Breadcrumbs from "./breadcrumbs"

import DocsMobileHeader from "./docs-mobile-header"
import DocsMobileTitleHeader from "./docs-mobile-title-header"
import DocsSidebar from "./docs-sidebar"
import DocsToolbar from "./docs-toolbar"
import DocsTableOfContents from "./docs-table-of-contents"
import { className as docsMarkdownClassName } from "./mdx/root"
import DocsFooter from "./docs-footer"

import getCloudflareDocsConfig from "../utils/get-cloudflare-docs-config"
import getPageTitle from "../utils/get-page-title"
import getPcxContentType from "../utils/get-pxc-content-type"
import getPageType from "../utils/get-page-type"
import getTableOfContents from "../utils/get-table-of-contents"
import hasBreadcrumbs from "../utils/has-breadcrumbs"

const DocsPage = ({ pageContext: page, children, location }) => {
  const title = getPageTitle(page, true)
  const pageType = getPageType(page)
  const pcxContentType = getPcxContentType(page)
  const tableOfContents = getTableOfContents(page)

  const { search } = getCloudflareDocsConfig()
  const enableSearch =
    search.apiKey && search.indexName && search.algoliaOptions
  const disableSearchProps = enableSearch ? {} : { "search-disabled": "" }

  return (
    <>
      <SEO title={title} pcxContentType={pcxContentType} />

      <Helmet>
        <html is-docs-page="" {...disableSearchProps} />
        <script
          data-source="docs"
          async
          defer
          src="https://feedback.developers.cloudflare.com/sdk.js"
        ></script>
        <link
          rel="preload"
          href="https://feedback.developers.cloudflare.com/sdk.css"
          as="style"
          onload="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          {
            '<link rel="stylesheet" href="https://feedback.developers.cloudflare.com/sdk.css"/>'
          }
        </noscript>
      </Helmet>

      <HandleMobilePageNavigations />
      <BrowserResizeTracking />
      <SmoothScrollHashChanges />

      <SkipNavLink contentId="docs-content" className="SkipNavLink" />

      <div className="DocsPage">
        <DocsMobileHeader />
        <DocsMobileTitleHeader />
        <div className="DocsMobileNavBackdrop" />
        <DocsSidebar />
        <DocsToolbar />

        <main className="DocsBody">
          {pageType === "document" && tableOfContents && (
            <div className="DocsBody--sidebar" with-styled-webkit-scrollbars="">
              <div className="DocsBody--sidebar-content-scroll-fade"></div>
              <div className="DocsBody--sidebar-content">
                <nav>
                  <DocsTableOfContents items={tableOfContents} />
                </nav>
              </div>
            </div>
          )}

          <SkipNavContent id="docs-content" />

          <div className="DocsContent" page-type={pageType}>
            {hasBreadcrumbs(page) && (
              <Breadcrumbs
                className="DocsContent--breadcrumbs"
                location={location}
              />
            )}

            <article className={docsMarkdownClassName()}>{children}</article>
          </div>
        </main>

        <DocsFooter page={page} />
      </div>
    </>
  )
}

export default DocsPage
