export default () => {
  if (typeof window === "undefined") return false
  return matchMedia("(prefers-reduced-motion: reduce)").matches
}
