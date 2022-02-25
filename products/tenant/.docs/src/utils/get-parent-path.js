import getNormalizedPath from "./get-normalized-path"

export default path => {
  return getNormalizedPath(path).replace(/\/[^/]*$/, '')
}
