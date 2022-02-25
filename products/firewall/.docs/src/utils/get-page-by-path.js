import getNormalizedPath from "./get-normalized-path"

export default (pages, path) => (
  pages.find(page => (
    getNormalizedPath(page.fields.slug) ===
      getNormalizedPath(path)
  ))
)
