import React from "react"
import { globalHistory } from "@reach/router"

import { sidebarClose } from "../utils/mobile-sidebar-manipulation"

class HandleMobilePageNavigations extends React.Component {

  componentDidMount() {
    this.historyUnsubscribe = globalHistory.listen(() => sidebarClose())
  }

  componentWillUnmount() {
    this.historyUnsubscribe()
  }

  render() {
    return null
  }
}

export default HandleMobilePageNavigations
