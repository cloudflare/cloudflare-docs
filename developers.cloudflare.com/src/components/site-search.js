// Based on cloudflare-docs-engine/src/components/docs-search.js
// Keep these components (mostly) in sync.
//
// Due to what seems like a Gatsby bug which occurs only with `gatsby build`
// and not `gatsby develop`, when any file imported from cloudflare-docs-engine
// contains `useStaticQuery` the build fails due to a relative import issue with
// the way GraphQL stores the cached static JSON.

import React, { useCallback, useEffect, useState } from "react"
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

  let [scriptAdded, setScriptAdded] = useState(false)
  let [scriptLoaded, setScriptLoaded] = useState(false)
  let [searchFocused, setSearchFocused] = useState(false)

  const onSearchFocus = useCallback(() => setSearchFocused(true), [])
  const onSearchBlur = useCallback(() => setSearchFocused(false), [])

  useEffect(() => {
    if (enableSearch && !scriptAdded) {
      const searchScript = document.createElement('script')
      searchScript.type = "text/javascript"
      searchScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/docsearch.js/2.6.3/docsearch.min.js'
      searchScript.onload = () => { setScriptLoaded(true) }
      document.body.appendChild(searchScript)
      setScriptAdded(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const init = () => {
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
          window.location.href = url.toString()
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
  
    if (enableSearch && scriptLoaded) {
      init()
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptLoaded])
  
  if (!enableSearch) {
    return (
      <>
        <Helmet>
          <html search-disabled=""/>
        </Helmet>
      </>
    )
  }
  
  return (
    <>
      <div className="SiteSearch" {...(searchFocused ? {"is-focused" : ""} : {})}>
        <div className="SiteSearch--input-wrapper">
          <input id="SiteSearch--input" className="SiteSearch--input"
          onFocus={onSearchFocus} onBlur={onSearchBlur}
          type="text" spellCheck="false" autoComplete="false" placeholder="Search docs..."/>
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
  
