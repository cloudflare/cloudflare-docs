import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import TimeAgo from "react-timeago";

const getPageTitle = ({ frontmatter, headings }) => {
  if (!frontmatter) return "Not found";

  return frontmatter.title || (headings.length && headings[0].value);
};

const tenDaysInMS = 10 * 24 * 60 * 60 * 1000;

const ContentTable = ({ path }) => {
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
  `);

  const regex = new RegExp(`^\/${path}\/.+`);

  const pages = query.allMdx.edges
    .map(({ node }) => node)
    .filter((page) => page.fields.slug.match(regex))
    .map((page) => ({
      title: getPageTitle(page),
      url: page.fields.slug,
      updated: page.frontmatter.updated,
      difficulty: page.frontmatter.difficulty,
      wordCount: page.wordCount.words,
      new: +new Date() - +new Date(page.frontmatter.updated) < tenDaysInMS,
    }))
    .sort((a, b) => +new Date(b.updated) - +new Date(a.updated));

  let i = 0;
  let longestWordCount = 0;

  for (i = 0; i < pages.length; i += 1) {
    if (pages[i].wordCount > longestWordCount) {
      longestWordCount = pages[i].wordCount;
    }
  }

  for (i = 0; i < pages.length; i += 1) {
    pages[i].length = (pages[i].wordCount / longestWordCount) * 100 + "%";
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
          <div className="DocsTutorials--column" data-column="difficulty">
            <span className="DocsTutorials--column-text">Difficulty</span>
          </div>
          <div className="DocsTutorials--column" data-column="length">
            <span className="DocsTutorials--column-text">Length</span>
          </div>
        </div>
      </div>

      <div className="DocsTutorials--body">
        {pages.map((page) => (
          <div
            key={page.url}
            className={
              "DocsTutorials--row" +
              (page.new ? " DocsTutorials--row-is-new" : "")
            }
          >
            <div className="DocsTutorials--column" data-column="name">
              <Link className="DocsTutorials--link" to={page.url}>
                {page.title}
              </Link>
            </div>
            <div className="DocsTutorials--column" data-column="updated">
              <TimeAgo
                date={page.updated}
                formatter={(value, unit) => (
                  <React.Fragment>
                    {value} {unit}
                    {value > 1 ? "s" : ""}
                    <span className="DocsTutorials--ago-text"> ago</span>
                  </React.Fragment>
                )}
                minPeriod={60}
              />
            </div>
            <div className="DocsTutorials--column" data-column="difficulty">
              {page.difficulty}
            </div>
            <div className="DocsTutorials--column" data-column="length">
              <div className="DocsTutorials--length-bar">
                <div
                  className="DocsTutorials--length-bar-inner"
                  style={{ width: page.length }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTable;
