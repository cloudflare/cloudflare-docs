export default ({ frontmatter, headings }) => {
  if (!frontmatter) return "Not found"

  return frontmatter.title || (headings.length && headings[0].value)
}
