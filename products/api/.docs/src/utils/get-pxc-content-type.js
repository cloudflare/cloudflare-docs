export default ({ frontmatter }) => {
  if (!frontmatter) return "error"

  return frontmatter.pcx_content_type || ""
}
