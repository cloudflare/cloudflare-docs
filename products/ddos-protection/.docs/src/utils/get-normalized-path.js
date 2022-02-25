export default path => {
  if (path === "/") return path

  return path.replace(/\/$/, "")
}
