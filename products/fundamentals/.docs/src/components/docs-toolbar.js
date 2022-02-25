import React from "react"

import getCloudflareDocsConfig from "../utils/get-cloudflare-docs-config"

import DocsTitle from "./docs-title"
import DocsSearch from "./docs-search"
import AccessibleSVG from "./accessible-svg"
import ThemeToggle from "./theme-toggle"

const DocsToolbar = () => {
  const { contentRepo }  = getCloudflareDocsConfig()

  return (
    <div className="DocsToolbar">
      <div className="DocsToolbar--search">
        <DocsSearch/>
      </div>

      <div className="DocsToolbar--tools">
        <button data-feedback className="DocsToolbar--feedback Button Button-is-docs-secondary">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17">
            <path d="M14 2.5H2l-.5.5v11.165l.863.345 2.852-3.01H14l.5-.5V3l-.5-.5Zm-.5 8H4.785L2.5 12.911V3.5h11v7Z" fill="currentColor"></path>
            <path d="M12.5 5.003h-9v1h9v-1ZM12.5 7.5h-9v1h9v-1Z" fill="currentColor"></path>
          </svg>
          Give Feedback
        </button>

        <div className="DocsToolbar--tools-spacer"/>

        <div className="DocsToolbar--tools-icon-item">
          <div className="Tooltip---root">
            <div className="DocsToolbar--tools-icon-item-content">
              <a className="Link Link-without-underline" href={`https://github.com/${ contentRepo }`}>
                <AccessibleSVG title="GitHub icon" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fillRule="evenodd"/>
                </AccessibleSVG>
              </a>
            </div>

            <span className="Tooltip" role="tooltip" position="bottom-end">
              Visit {DocsTitle()} on GitHub
            </span>
          </div>
        </div>

        <div className="DocsToolbar--tools-spacer"/>

        <div className="DocsToolbar--theme-toggle">
          <ThemeToggle/>
        </div>
      </div>
    </div>
  )
}

export default DocsToolbar
