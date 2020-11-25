import React from "react"

const DEFAULT = "light"

const getTheme = () => {
  if (typeof document !== "undefined") return DEFAULT
  return document.documentElement.getAttribute("theme")
}

class Themed extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      theme: getTheme()
    }
  }

  componentDidMount() {
    this.observer = new MutationObserver(mutationList => {
      mutationList.forEach(mutation => {
        if (mutation.type !== "attributes") return

        this.setState({ theme: getTheme() })
      })
    })

    this.observer.observe(document.documentElement, {
      attributes: true
    })
  }

  componentWillUnmount() {
    this.observer.disconnect()
  }

  render() {
    return this.props.children(this.state.theme)
  }
}

export default Themed
