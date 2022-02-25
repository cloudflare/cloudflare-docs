import getPageTitle from "./get-page-title"
import getPathPrefix from "./get-path-prefix"
import getParentPath from "./get-parent-path"
import getPageByPath from "./get-page-by-path"
import getNormalizedPath from "./get-normalized-path"

const pathPrefix = getPathPrefix()

const getBreadcrumbs = (pages, location) => {
  let out = []

  const pathname =
    location.pathname.startsWith(pathPrefix) ?
      location.pathname.substr(pathPrefix.length) :
      location.pathname

  try {
    const page = getPageByPath(pages, pathname)
    let parent = getPageByPath(pages, getParentPath(page.fields.slug))

    while (parent) {
      out.unshift({
        title: getPageTitle(parent),
        url: parent.fields.slug
      })

      parent = getPageByPath(pages, getParentPath(parent.fields.slug))

      if (parent && getNormalizedPath(parent.fields.slug) === "") {
        parent = false
      }
    }
  } catch (error) {}

  return out
}

export default getBreadcrumbs
