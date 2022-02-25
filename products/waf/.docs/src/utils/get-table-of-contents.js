export default ({ tableOfContents: toc }) => {
  if (!toc || !toc.items || !toc.items.length)
    return []

  return toc.items[0].items
}
