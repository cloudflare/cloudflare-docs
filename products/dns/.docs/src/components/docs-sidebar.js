import React from "react"

import DocsSidebarHeaderSection from "./docs-sidebar-header-section"
import DocsSidebarTitleSection from "./docs-sidebar-title-section"
import DocsSidebarNavSection from "./docs-sidebar-nav-section"

const DocsSidebar = () => (
  <div className="DocsSidebar">
    <div className="DocsSidebar--sections">
      <DocsSidebarHeaderSection/>
      <div className="DocsSidebar--section-separator"></div>
      <DocsSidebarTitleSection/>
      <DocsSidebarNavSection/>
    </div>

    <div className="DocsSidebar--shadow"></div>
  </div>
)

export default DocsSidebar
