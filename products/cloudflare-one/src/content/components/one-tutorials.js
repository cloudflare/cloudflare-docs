import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import TimeAgo from "react-timeago"

import getPageTitle from "./get-page-title"
import css from "../css/one-tutorials.css"


const tenDaysInMS = 10 * 24 * 60 * 60 * 1000

const OneTutorials = () => {
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              updated
              difficulty
              category
            }
            headings(depth: h1) {
              value
            }
            wordCount {
              words
            }
          }
        }
      }
    }
  `)

  const tutorials = query.allMdx.edges
    .map(({ node }) => node)
    .filter(page => page.fields.slug.match(/^\/tutorials\/.+/))
    .map(page => ({
      title: getPageTitle(page),
      url: page.fields.slug,
      updated: page.frontmatter.updated,
      difficulty: page.frontmatter.difficulty,
      category: page.frontmatter.category,
      wordCount: page.wordCount.words,
      new: (+new Date() - +new Date(page.frontmatter.updated)) < tenDaysInMS
    }))
    .sort((a, b) => +new Date(b.updated) - +new Date(a.updated))

  let i = 0
  let longestWordCount = 0

  for (i = 0; i < tutorials.length; i += 1) {
    if (tutorials[i].wordCount > longestWordCount) {
      longestWordCount = tutorials[i].wordCount
    }
  }

  for (i = 0; i < tutorials.length; i += 1) {
    tutorials[i].length = ((tutorials[i].wordCount / longestWordCount) * 100) + "%"
  }

  return (
    <div className="OneTutorials">
      <div className="OneTutorials--header">
        <div className="OneTutorials--row">
          <div className="OneTutorials--column" data-column="name">
            <span className="OneTutorials--column-text">Name</span>
          </div>
          <div className="OneTutorials--column" data-column="updated">
            <span className="OneTutorials--column-text">Updated</span>
          </div>
          <div className="OneTutorials--column" data-column="difficulty">
            <span className="OneTutorials--column-text">Difficulty</span>
          </div>
          <div className="OneTutorials--column" data-column="length">
            <span className="OneTutorials--column-text">Length</span>
          </div>
           <div className="OneTutorials--column" data-column="category">
            <span className="OneTutorials--column-text">Category</span>
          </div> 
        </div>
      </div>

      <div className="OneTutorials--body">
        {tutorials.map(tutorial => (
          <div key={tutorial.url} className={"OneTutorials--row" + (tutorial.new ? " OneTutorials--row-is-new" : "")}>
            <div className="OneTutorials--column" data-column="name">
              <Link className="OneTutorials--link" to={tutorial.url}>
                {tutorial.title}
              </Link>
            </div>
            <div className="OneTutorials--column" data-column="updated">
              <TimeAgo date={tutorial.updated} formatter={(value, unit) => (
                <React.Fragment>
                  {value} {unit}{value > 1 ? "s" : ""}<span className="OneTutorials--ago-text"> ago</span>
                </React.Fragment>
              )} minPeriod={60}/>
            </div>
            <div className="OneTutorials--column" data-column="difficulty">{tutorial.difficulty}</div>
            <div className="OneTutorials--column" data-column="length">
              <div className="OneTutorials--length-bar">
                <div className="OneTutorials--length-bar-inner" style={{width: tutorial.length}}></div>
              </div>
            </div>
            <div className="OneTutorials--column" data-column="category">{tutorial.category}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OneTutorials
