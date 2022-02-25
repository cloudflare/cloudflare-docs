export default ({ frontmatter, headings }, useHeading=false) => {
  if (!frontmatter) return "Not found"

  if (useHeading) {
    return (headings.length && headings[0].value) || frontmatter.title
  }

  return frontmatter.title || (headings.length && headings[0].value)
}
