import React from "react"

const DocsNavLogoLockup = ({ logo, text, small, scaleTextClassName, textLength }) => {
  const wrappedText = (scaleTextClassName && textLength) ? (
    <span className={scaleTextClassName} style={{"--length": textLength}}>
      {text}
    </span>
  ) : (
    <>{text}</>
  )

  return (
    <div className={
      "DocsNavLogoLockup" +
      (small ? " DocsNavLogoLockup-with-small-gap" : "")
     }>
      <div className="DocsNavLogoLockup--logo">
        {logo}
      </div>
      <span className="DocsNavLogoLockup--text">
        {wrappedText}
      </span>
    </div>
  )
}

DocsNavLogoLockup.defaultProps = {
  small: false
}

export default DocsNavLogoLockup
