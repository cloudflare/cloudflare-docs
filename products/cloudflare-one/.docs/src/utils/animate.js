import anime from "animejs/lib/anime.es.js"

export default options => {
  const obj = {
    objProperty: options.from
  }

  anime({
    targets: obj,
    objProperty: options.to,
    easing: options.easing,
    duration: options.duration,
    update: () => options.update(obj.objProperty)
  })
}
