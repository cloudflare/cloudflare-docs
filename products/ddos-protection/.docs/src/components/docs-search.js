import React, { useEffect } from "react"
import { navigate } from "@reach/router"
import getPathPrefix from "../utils/get-path-prefix"
import getCloudflareDocsConfig from "../utils/get-cloudflare-docs-config"

import Helmet from "react-helmet"

import DocsTitle from "./docs-title"
import AccessibleSVG from "./accessible-svg"

const DocsSearch = () => {
  const pathPrefix = getPathPrefix()

  const {
    pathPrefix: productionPathPrefix,
    search: {
      indexName,
      apiKey,
      algoliaOptions
    }
  } = getCloudflareDocsConfig()

  const enableSearch = indexName && apiKey && algoliaOptions

  // Adjust search result URL pathname to work with local development
  // See https://github.com/cloudflare/cloudflare-docs-engine/issues/196
  const fixSearchResultPathname = (pathname) => {
    // When the pathPrefix we get from getPathPrefix() matches the
    // productionPathPrefix we get from getCloudflareDocsConfig()
    // then we should not strip the prefix from the pathname. This
    // is a more reliable check than location.hostname !== "locahost"
    // because both `yarn serve` and `yarn develop` serve to
    // localhost but only the latter needs the pathPrefix removed.
    if (productionPathPrefix === pathPrefix) return pathname

    // The crawled search results should end up including the
    // productionPathPrefix (if one exists) so we need to remove
    // that for local development (where getPathPrefix() === "").
    if (pathname.startsWith(`${productionPathPrefix}/`))
      return pathname.substr(productionPathPrefix.length)

    // If for some reason the results are missing the pathPrefix,
    // then this is likely due to a crawling issue. But we return
    // the pathname as it is in this case which should cause a
    // 404 when we try to navigate(pathname) below.
    return pathname
  }

  useEffect(() => {
    let frames = 0
    const init = () => {
      frames += 1

      // Sadly this is needed because of the way Helmet works in local development
      if (!window.docsearch && frames < 60) {
        return requestAnimationFrame(() => init())
      }

      const search = window.docsearch({
        indexName,
        apiKey,
        algoliaOptions,

        // TODO: pass DOM in with Reacth.createRef?
        inputSelector: "#DocsSearch--input",

        autocompleteOptions: {
          // https://github.com/algolia/autocomplete.js#global-options
          autoselect: true,
          openOnFocus: true,
          clearOnSelected: false,
          tabAutocomplete: false,

          appendTo: ".DocsSearch--input-wrapper",
          hint: false,

          autoselectOnBlur: matchMedia("(pointer: course)").matches
        },

        // https://docsearch.algolia.com/docs/behavior
        handleSelected: (input, event, suggestion, datasetNumber, context) => {
          // Adjust search result URL pathname to work with local development
          // See https://github.com/cloudflare/cloudflare-docs-engine/issues/196
          const url = new URL(suggestion.url)
          const pathname = fixSearchResultPathname(url.pathname)

          search.input.autocomplete.setVal("")
          search.input[0].blur()

          // Don’t scroll to hash when it’s just the h1.
          if (suggestion.isLvl0) {
            navigate(pathname)

          } else {
            navigate(pathname + url.hash)

            // Then focus the anchor in the header anchor
            // corresponding to the hash if it exists (it
            // should if Algolia’s crawl is up-to-date).
            const headerAnchor = document.querySelector(`${url.hash} a`)
            if (headerAnchor) headerAnchor.focus()
          }
        },

        transformData: function(hits) {
          // Remove empty results
          for (let i = hits.length - 1; i >= 0; i -= 1) {
            if (!hits[i].hierarchy.lvl0 && !hits[i].hierarchy.lvl1) {
              hits.splice(i, 1)
            }
          }
        }
      })

      const autocompleteWrapper = search.autocomplete.autocomplete.getWrapper()

      search.autocomplete.on("autocomplete:shown", event => {
        autocompleteWrapper.setAttribute("data-expanded", true)
      })

      search.autocomplete.on("autocomplete:closed", event => {
        autocompleteWrapper.setAttribute("data-expanded", false)
      })

      const input = search.input[0]
      const wrapper = input.closest(".DocsSearch")

      input.addEventListener("focus", () => {
        wrapper.setAttribute("is-focused", "")
      })

      input.addEventListener("blur", () => {
        wrapper.removeAttribute("is-focused")
      })

      document.addEventListener("keydown", event => {
        if (event.target === input) return

        const slashShortcut = event.key === "/"
        const commandShortcut = event.key === "S" && event.shiftKey

        if (slashShortcut || commandShortcut) {
          event.preventDefault()
          window.scrollTo(0, 0)
          input.focus()
        }
      })
    }

    if (enableSearch) {
      init()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!enableSearch) {
    return <React.Fragment/>
  }

  return (
    <>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/docsearch.js/2.6.3/docsearch.min.js"/>
      </Helmet>

      <div className="DocsSearch">
        <div className="DocsSearch--input-wrapper">
          <input id="DocsSearch--input" className="DocsSearch--input" type="text" spellCheck="false" autoComplete="false" placeholder={"Search " + DocsTitle() + " docs..."}/>
          <div className="DocsSearch--input-icon">
            <AccessibleSVG title="Search icon (depiction of a magnifying glass)" viewBox="0 0 16 16">
              <path d="M11.999 10.585l3.458 3.458a1 1 0 01-1.414 1.414L10.585 12a6.5 6.5 0 111.414-1.414zM6.75 11.5a4.75 4.75 0 100-9.5 4.75 4.75 0 000 9.5z"/>
            </AccessibleSVG>
          </div>
          <div className="DocsSearch--input-bottom-border"></div>
        </div>
      </div>
    </>
  )
}

export default DocsSearch
