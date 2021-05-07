import React from "react"

const DEFAULT = "light"

class Themed extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      theme: typeof document === "undefined" ? DEFAULT : document.documentElement.getAttribute("theme")
    }
  }

  componentDidMount() {
    this.observer = new MutationObserver(mutationList => {
      mutationList.forEach(mutation => {
        if (mutation.type !== "attributes") return

        this.setState({
          theme: document.documentElement.getAttribute("theme") || DEFAULT
        })
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
