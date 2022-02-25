export default () => {
  if (typeof window === "undefined") return false
  return matchMedia("(max-width: 768px)").matches
}
