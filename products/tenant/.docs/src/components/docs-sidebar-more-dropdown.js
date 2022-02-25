import React from "react"

import getCloudflareDocsConfig from "../utils/get-cloudflare-docs-config"

import DocsTitle from "./docs-title"
import AccessibleSVG from "./accessible-svg"
import Dropdown from "./dropdown"

const ExternalLinks = ({ children }) => {
  const { externalLinks } = getCloudflareDocsConfig()
  return children(externalLinks)
}

const DocsSidebarMoreDropdown = () => {
  const className = "DocsSidebar--section-more"
  const buttonClassName = className + "-button"
  const buttonIconClassName = buttonClassName + "-icon"
  const props = { className, buttonClassName }

  props.buttonChildren = (
    <div className={buttonIconClassName}>
      <AccessibleSVG title="Dropdown icon" viewBox="0 0 4 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2,2v0m0,6v0m0,6v0z"/>
      </AccessibleSVG>
      <span is-visually-hidden=""><DocsTitle/> menu</span>
    </div>
  )

  return (
    <Dropdown {...props}>
      {({ expanded }) => (
        <div className={className + "-dropdown Dropdown--dropdown"}>
          <ul className="Dropdown--list">
            <ExternalLinks>
              {links => links.map(link => (
                <li className="Dropdown--item" key={link.url}>
                  <a className="Dropdown--link" href={link.url} tabIndex={expanded ? 0 : -1}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ExternalLinks>
          </ul>
        </div>
      )}
    </Dropdown>
  )
}

export default DocsSidebarMoreDropdown
