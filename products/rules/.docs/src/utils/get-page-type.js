export default ({ frontmatter }) => {
  if (!frontmatter) return "error"

  return frontmatter.type || "document"
}
