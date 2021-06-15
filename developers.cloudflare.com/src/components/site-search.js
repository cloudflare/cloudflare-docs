import React, { useEffect } from "react"
import Helmet from "react-helmet"

import { useStaticQuery, graphql } from "gatsby"

import AccessibleSVG from "cloudflare-docs-engine/src/components/accessible-svg"

import "../css/components/site-search.css"

const SiteSearch = () => {
  const { site: { siteMetadata }} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            cloudflareDocs {
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

  const {
    search: {
      indexName,
      apiKey,
      algoliaOptions
    }
  } = siteMetadata.cloudflareDocs
  
  const enableSearch = indexName && apiKey && algoliaOptions

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
        inputSelector: "#SiteSearch--input",

        autocompleteOptions: {
          // https://github.com/algolia/autocomplete.js#global-options
          autoselect: true,
          openOnFocus: true,
          clearOnSelected: false,
          tabAutocomplete: false,

          appendTo: ".SiteSearch--input-wrapper",
          hint: false,

          autoselectOnBlur: matchMedia("(pointer: course)").matches
        },

        // https://docsearch.algolia.com/docs/behavior
        handleSelected: (input, event, suggestion, datasetNumber, context) => {
          const url = new URL(suggestion.url)

          // Don’t scroll to hash when it’s just the h1.
          if (suggestion.isLvl0) {
            url.hash = ""
          }
          window.location.href = url
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
      const wrapper = input.closest(".SiteSearch")

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
    const disableSearchProps = { "search-disabled": "" }
    return (
      <>
        <Helmet>
          <html {...disableSearchProps}/>
        </Helmet>
      </>
    )
  }
  
  return (
    <>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/docsearch.js/2.6.3/docsearch.min.js"/>
      </Helmet>

      <div className="SiteSearch">
        <div className="SiteSearch--input-wrapper">
          <input id="SiteSearch--input" className="SiteSearch--input" type="text" spellCheck="false" autoComplete="false" placeholder="Search docs..."/>
          <div className="SiteSearch--input-icon">
            <AccessibleSVG title="Search icon (depiction of a magnifying glass)" viewBox="0 0 16 16">
              <path d="M11.999 10.585l3.458 3.458a1 1 0 01-1.414 1.414L10.585 12a6.5 6.5 0 111.414-1.414zM6.75 11.5a4.75 4.75 0 100-9.5 4.75 4.75 0 000 9.5z"/>
            </AccessibleSVG>
          </div>
        </div>
      </div>
    </>
  )
}
  
export default SiteSearch
  