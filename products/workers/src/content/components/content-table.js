import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import TimeAgo from "react-timeago";
import "./content-table.css"

const getPageTitle = ({ frontmatter, headings }) => {
  if (!frontmatter) return "Not found";

  return frontmatter.title || (headings.length && headings[0].value);
};

const tenDaysInMS = 10 * 24 * 60 * 60 * 1000;

const DocsTutorials = () => {
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
              content_type
              url
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
      url: page.frontmatter.url || page.fields.slug,
      updated: page.frontmatter.updated,
      content_type: page.frontmatter.content_type,
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
    <div className="DocsTutorials">
      <div className="DocsTutorials--header">
        <div className="DocsTutorials--row">
          <div className="DocsTutorials--column" data-column="name">
            <span className="DocsTutorials--column-text">Name</span>
          </div>
          <div className="DocsTutorials--column" data-column="updated">
            <span className="DocsTutorials--column-text">Updated</span>
          </div>
          <div className="DocsTutorials--column" data-column="type">
            <span className="DocsTutorials--column-text">Type</span>
          </div>
          <div className="DocsTutorials--column" data-column="length">
            <span className="DocsTutorials--column-text">Length</span>
          </div>
        </div>
      </div>

      <div className="DocsTutorials--body">
        {tutorials.map(tutorial => (
          <div key={tutorial.url} className={"DocsTutorials--row" + (tutorial.new ? " DocsTutorials--row-is-new" : "")}>
            <div className="DocsTutorials--column" data-column="name">
              <Link className="DocsTutorials--link" to={tutorial.url}>
                {tutorial.title}
              </Link>
            </div>
            <div className="DocsTutorials--column" data-column="updated">
              <TimeAgo date={tutorial.updated} formatter={(value, unit) => (
                <React.Fragment>
                  {value} {unit}{value > 1 ? "s" : ""}<span className="DocsTutorials--ago-text"> ago</span>
                </React.Fragment>
              )} minPeriod={60} />
            </div>
            <div className="DocsTutorials--column" data-column="type">{tutorial.content_type}</div>
            <div className="DocsTutorials--column" data-column="length">
              <div className="DocsTutorials--length-bar">
                <div className="DocsTutorials--length-bar-inner" style={{ width: tutorial.length }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocsTutorials;