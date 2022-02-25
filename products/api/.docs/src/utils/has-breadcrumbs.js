export default ({ frontmatter }) => {
  if (frontmatter && frontmatter.breadcrumbs === false)
    return false

  return true
}
