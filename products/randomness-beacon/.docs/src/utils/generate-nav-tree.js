import getPageTitle from "./get-page-title"
import getParentPath from "./get-parent-path"
import getOrder from "./get-order"

const formatNode = node => {
  node.href = node.path
  node.title = getPageTitle(node)
  return node
}

const generateNavTree = pages => {
  const pagesByPath = {}

  pages.forEach((page, i) => {
    const path = page.fields.slug
    pages[i].path = path
    pagesByPath[path] = page
    pages[i].title = getPageTitle(page)

    const depth = path.split('/').length - 2
    pages[i].depth = depth
  })

  pages.forEach((page, i) => {
    const parentPath = getParentPath(page.path)
    if (!parentPath) return
    const parentNode = pagesByPath[parentPath]
    if (!parentNode) return
    pages[i].parentId = pagesByPath[parentPath].id
  })

  pages.sort((a, b) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })

  pages.sort((a, b) => getOrder(a) - getOrder(b))

  const map = {}
  const tree = []

  for (let i = 0; i < pages.length; i += 1) {
    map[pages[i].id] = i
  }

  for (let i = 0; i < pages.length; i += 1) {
    const node = pages[i]
    if (node.depth > 0) {
      if (node.parentId) {
        if (!pages[map[node.parentId]].children) pages[map[node.parentId]].children = []
        pages[map[node.parentId]].children.push(formatNode(node))
      }
    } else {
      tree.push(formatNode(node))
    }
  }

  return tree
}

export default generateNavTree
