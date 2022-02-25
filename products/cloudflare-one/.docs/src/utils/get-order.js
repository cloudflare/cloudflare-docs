export default ({ frontmatter }) => {
  if (frontmatter && (frontmatter.order || frontmatter.order === 0)) {
    return frontmatter.order
  }

  // Use a large number instead of `Infinity` to be able to
  // use subtraction-based sort comparison method
  return 10e6
}
