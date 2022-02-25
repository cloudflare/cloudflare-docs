export default `const GA_ID = "UA-107218623-2"
window.ga =
  window.ga ||
  function () {
    if (!GA_ID) {
      return
    }
    ;(ga.q = ga.q || []).push(arguments)
  }
ga.l = +new Date()
ga('create', GA_ID, 'auto')
ga('set', 'transport', 'beacon')
var timeout = setTimeout(
  (onload = function () {
    clearTimeout(timeout)
    ga('send', 'pageview')
  }),
  1000,
)`
