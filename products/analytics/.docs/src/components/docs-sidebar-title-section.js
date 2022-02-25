import React from "react"
import { Link } from "gatsby"

import DocsTitle from "./docs-title"
import DocsProductLogo from "./docs-product-logo"
import DocsNavLogoLockup from "./docs-nav-logo-lockup"

import DocsSidebarMoreDropdown from "./docs-sidebar-more-dropdown"

const DocsSidebarTitleSection = () => (
  <div className="DocsSidebar--section DocsSidebar--docs-title-section">
    <Link className="DocsSidebar--docs-title-logo-link DocsSidebar--link" to="/">
      <DocsNavLogoLockup
        logo={<DocsProductLogo/>}
        scaleTextClassName="DocsSidebar--docs-title-text-scaler"
        textLength={DocsTitle().length}
        text={<DocsTitle/>}
      />
    </Link>

    <DocsSidebarMoreDropdown/>
  </div>
)

export default DocsSidebarTitleSection
