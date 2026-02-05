let ticking = false;

document.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;

      document.querySelectorAll('[data-parallax]').forEach(el => {
        const speed = el.dataset.parallax;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });

      ticking = false;
    });

    ticking = true;
  }
});