import React from "react"
import { Location } from "@reach/router"

import createFocusGroup from "focus-group"

import DocsSidebarNavData from "./docs-sidebar-nav-data"
import DocsSidebarNavItem from "./docs-sidebar-nav-item"

class DocsSidebarNav extends React.Component {

  constructor(props) {
    super(props)

    this.ref = React.createRef()
  }

  componentDidMount() {
    const el = this.ref.current

    const getMembers = () => (el.querySelectorAll([
      `a[href]:not([tabindex="-1"])`,
      `button:not([tabindex="-1"])`
    ].join(", ")))

    this.focusGroup = createFocusGroup({
      members: getMembers(),
      stringSearch: true
    })

    this.observer = new MutationObserver(mutationList => {
      mutationList.forEach(mutation => {
        if (mutation.type !== "attributes") return

        this.focusGroup.setMembers(getMembers())
      })
    })

    this.observer.observe(el, {
      attributeFilter: ["tabindex"],
      subtree: true
    })

    this.focusGroup.activate()
  }

  componentWillUnmount() {
    this.focusGroup.deactivate()
    this.observer.disconnect()
  }

  render() {
    return (
      <DocsSidebarNavData>
        {({ data }) => (
          <Location>
            {({ location }) => (
              <ul className="DocsSidebar--nav" ref={this.ref}>
                {data.map(node => (
                  <DocsSidebarNavItem
                    key={node.id}
                    node={node}
                    location={location}
                    depth={0}
                  />
                ))}
              </ul>
            )}
          </Location>
        )}
      </DocsSidebarNavData>
    )
  }
}

export default DocsSidebarNav
