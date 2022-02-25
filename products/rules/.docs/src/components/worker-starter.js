import React from "react"

import { CopyToClipboard } from "react-copy-to-clipboard"

import AnchorLink from "./mdx/anchor-link"
import CodeBlock from "./code-block"

const WorkerStarter = props => {
  const { title, description, repo } = props
  const repoLink = `https://github.com/${repo}`
  const command = `wrangler generate my-app ${repoLink}`

  return (
    <div className="WorkerStarter">
      <div className="WorkerStarter--title">
        <AnchorLink className="Link" href={repoLink}>{title}</AnchorLink>
      </div>
      <div className="WorkerStarter--description">{description}</div>
      <div className="WorkerStarter--command">
        <div className="WorkerStarter--command-copy-button-wrapper">
          <CopyToClipboard text={command}>
            <button className="Button">Copy</button>
          </CopyToClipboard>
        </div>
        <div className="WorkerStarter--command-codeblock-wrapper">
          <CodeBlock lang="txt">{command}</CodeBlock>
        </div>
      </div>
    </div>
  )
}

export default WorkerStarter
