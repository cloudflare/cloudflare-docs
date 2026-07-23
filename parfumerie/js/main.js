/* =========================================================
   SILLAGE — animations (anime.js v3)
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const hasHover = window.matchMedia("(hover: hover)").matches;

  /* ------------------------------------------------------------------ *
   * 1. DATA
   * ------------------------------------------------------------------ */
  const PARFUMS = [
    {
      idx: "N°01",
      name: "Noir Absolu",
      family: "Boisé — Ambré",
      notes: ["Oud", "Cuir", "Encens"],
      price: "185",
      accent: "#c9a15a",
      liquidTop: "#c9963e",
      liquidBottom: "#3a2712",
      capA: "#e7cf9a",
      capB: "#7c5d2a",
    },
    {
      idx: "N°02",
      name: "Rose Éternelle",
      family: "Floral — Poudré",
      notes: ["Rose de Mai", "Pivoine", "Musc"],
      price: "165",
      accent: "#d98aa0",
      liquidTop: "#e59ab0",
      liquidBottom: "#4a1f2c",
      capA: "#f4cdd8",
      capB: "#8f4c5e",
    },
    {
      idx: "N°03",
      name: "Bois de Lune",
      family: "Boisé — Frais",
      notes: ["Vétiver", "Cèdre", "Ambre gris"],
      price: "175",
      accent: "#6fb39a",
      liquidTop: "#7ec9ae",
      liquidBottom: "#10352e",
      capA: "#c2e6d9",
      capB: "#356e5c",
    },
  ];

  /* ------------------------------------------------------------------ *
   * 2. FLACON SVG (parametric, unique gradient ids per instance)
   * ------------------------------------------------------------------ */
  function flacon(p, id) {
    const g = (s) => `${s}-${id}`;
    return `
    <svg class="flacon" viewBox="0 0 220 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flacon ${p.name}">
      <defs>
        <linearGradient id="${g("liquid")}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${p.liquidTop}"/>
          <stop offset="1" stop-color="${p.liquidBottom}"/>
        </linearGradient>
        <linearGradient id="${g("cap")}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${p.capA}"/>
          <stop offset="1" stop-color="${p.capB}"/>
        </linearGradient>
        <linearGradient id="${g("glass")}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="rgba(255,255,255,0.16)"/>
          <stop offset="0.5" stop-color="rgba(255,255,255,0.03)"/>
          <stop offset="1" stop-color="rgba(255,255,255,0.10)"/>
        </linearGradient>
        <linearGradient id="${g("shine")}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(255,255,255,0.55)"/>
          <stop offset="1" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
        <clipPath id="${g("clip")}">
          <rect x="46" y="76" width="128" height="268" rx="26"/>
        </clipPath>
      </defs>

      <!-- cap -->
      <rect x="84" y="6" width="52" height="52" rx="9" fill="url(#${g("cap")})"/>
      <rect x="84" y="6" width="52" height="12" rx="6" fill="rgba(255,255,255,0.22)"/>
      <!-- collar -->
      <rect x="92" y="54" width="36" height="18" rx="3" fill="url(#${g("cap")})" opacity="0.9"/>
      <rect x="88" y="70" width="44" height="10" rx="4" fill="rgba(255,255,255,0.06)"/>

      <!-- glass body -->
      <rect x="46" y="76" width="128" height="268" rx="26" fill="url(#${g("glass")})"
            stroke="${p.accent}" stroke-opacity="0.35" stroke-width="1"/>

      <!-- liquid -->
      <g clip-path="url(#${g("clip")})">
        <g class="flacon__liquid">
          <path d="M46,168 Q86,150 110,166 T174,166 L174,344 L46,344 Z" fill="url(#${g("liquid")})"/>
        </g>
        <circle class="bubble" cx="86" cy="330" r="3" fill="rgba(255,255,255,0.35)"/>
        <circle class="bubble" cx="128" cy="336" r="2.2" fill="rgba(255,255,255,0.3)"/>
        <circle class="bubble" cx="108" cy="340" r="2.6" fill="rgba(255,255,255,0.25)"/>
      </g>

      <!-- reflections -->
      <rect x="60" y="96" width="14" height="220" rx="7" fill="url(#${g("shine")})" opacity="0.6"/>
      <rect x="150" y="120" width="6" height="150" rx="3" fill="url(#${g("shine")})" opacity="0.3"/>

      <!-- label -->
      <circle cx="110" cy="250" r="30" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
      <text x="110" y="248" text-anchor="middle" fill="rgba(255,255,255,0.8)"
            font-family="Cormorant Garamond, serif" font-size="20" font-style="italic">S</text>
      <text x="110" y="264" text-anchor="middle" fill="rgba(255,255,255,0.45)"
            font-family="Jost, sans-serif" font-size="5" letter-spacing="2">${p.idx}</text>
    </svg>`;
  }

  /* ------------------------------------------------------------------ *
   * 3. RENDER cards + hero flacon + marquee
   * ------------------------------------------------------------------ */
  const grid = document.getElementById("grid");
  grid.innerHTML = PARFUMS.map(
    (p, i) => `
    <article class="card" data-accent="${p.accent}" style="--accent:${p.accent}">
      <div class="card__idx">${p.idx}</div>
      <div class="card__stage">${flacon(p, "c" + i)}</div>
      <div class="card__family">${p.family}</div>
      <h3 class="card__name">${p.name}</h3>
      <div class="card__notes">
        ${p.notes.map((n) => `<span class="card__note">${n}</span>`).join("")}
      </div>
      <div class="card__foot">
        <div class="card__price">${p.price}€ <small>100 ml</small></div>
        <a class="card__buy" href="#" data-cursor="link">Ajouter <span>→</span></a>
      </div>
    </article>`
  ).join("");

  // Hero flacon = first parfum, larger
  document.querySelector(".hero__flacon").innerHTML = flacon(PARFUMS[0], "hero");

  // Marquee
  const words = [
    "Fait à Paris",
    "Extrait de parfum",
    "Petites séries",
    "Douze semaines de macération",
    "Verre soufflé main",
  ];
  const track = document.getElementById("marquee-track");
  const chunk = words
    .map((w) => `<span class="marquee__item">${w}</span>`)
    .join("");
  track.innerHTML = chunk + chunk + chunk; // enough to loop seamlessly

  /* ------------------------------------------------------------------ *
   * 4. CUSTOM CURSOR + SILLAGE TRAIL
   * ------------------------------------------------------------------ */
  if (hasHover && !reduceMotion) {
    const cursor = document.querySelector(".cursor");
    const dot = cursor.querySelector(".cursor__dot");
    const ring = cursor.querySelector(".cursor__ring");
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let lastTrail = 0;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

      // sillage particle
      const now = performance.now();
      if (now - lastTrail > 45) {
        lastTrail = now;
        spawnTrail(mx, my);
      }
    });

    (function loop() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll("[data-cursor='link'], a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });

    function spawnTrail(x, y) {
      const d = document.createElement("div");
      d.className = "trail-dot";
      d.style.left = x + "px";
      d.style.top = y + "px";
      const accent = document.body.dataset.amb || "#c9a15a";
      d.style.background = `radial-gradient(circle, ${accent}, transparent 70%)`;
      document.body.appendChild(d);
      anime({
        targets: d,
        opacity: [0.7, 0],
        scale: [1, 2.4],
        translateX: (Math.random() - 0.5) * 26,
        translateY: (Math.random() - 0.5) * 26 - 10,
        duration: 1100,
        easing: "easeOutExpo",
        complete: () => d.remove(),
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * 5. PRELOADER
   * ------------------------------------------------------------------ */
  const preloader = document.getElementById("preloader");
  const countEl = document.getElementById("count");

  function startHero() {
    anime
      .timeline({ easing: "easeOutExpo" })
      .add({
        targets: ".hero__label",
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 900,
      })
      .add(
        {
          targets: ".hero__title .l",
          translateY: ["110%", "0%"],
          duration: 1400,
          delay: anime.stagger(70),
        },
        "-=700"
      )
      .add(
        {
          targets: [".hero__sub", ".hero__scroll"],
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1000,
          delay: anime.stagger(140),
        },
        "-=900"
      )
      .add(
        {
          targets: ".hero__flacon",
          opacity: [0, 1],
          translateX: [80, 0],
          duration: 1600,
        },
        "-=1300"
      );

    // continuous float of hero flacon
    if (!reduceMotion) {
      anime({
        targets: ".hero__flacon",
        translateY: ["-52%", "-48%"],
        rotate: ["-1.5deg", "1.5deg"],
        duration: 6000,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });
    }
  }

  let booted = false;
  function runPreloader() {
    if (booted) return;
    booted = true;
    if (reduceMotion) {
      preloader.style.display = "none";
      startHero();
      revealSetup();
      return;
    }

    const tl = anime.timeline({ easing: "easeOutExpo" });

    tl.add({
      targets: ".trail-path",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1600,
      easing: "easeInOutSine",
    })
      .add(
        {
          targets: ".preloader__word span",
          translateY: ["120%", "0%"],
          opacity: [0, 1],
          duration: 1100,
          delay: anime.stagger(60),
        },
        "-=1200"
      )
      .add(
        {
          targets: ".preloader__meta",
          opacity: [0, 1],
          duration: 700,
        },
        "-=700"
      );

    // counter
    const counter = { v: 0 };
    anime({
      targets: counter,
      v: 100,
      duration: 2200,
      easing: "easeInOutQuart",
      round: 1,
      update: () => {
        countEl.textContent = counter.v;
      },
      complete: () => {
        anime
          .timeline({ easing: "easeInOutExpo" })
          .add({
            targets: ".preloader__inner",
            opacity: [1, 0],
            translateY: [0, -30],
            duration: 700,
          })
          .add(
            {
              targets: ".preloader",
              translateY: ["0%", "-100%"],
              duration: 1100,
              complete: () => {
                preloader.style.display = "none";
                preloader.classList.add("is-done");
              },
            },
            "-=200"
          );
        startHero();
        revealSetup();
      },
    });
  }

  /* ------------------------------------------------------------------ *
   * 6. MANIFESTO — split into words
   * ------------------------------------------------------------------ */
  const manifesto = document.querySelector("[data-split]");
  if (manifesto) {
    manifesto.innerHTML = manifesto.textContent
      .trim()
      .split(" ")
      .map((w) => `<span class="w">${w}</span>`)
      .join(" ");
  }

  /* ------------------------------------------------------------------ *
   * 7. MARQUEE loop
   * ------------------------------------------------------------------ */
  if (!reduceMotion) {
    const third = track.scrollWidth / 3;
    anime({
      targets: track,
      translateX: [0, -third],
      duration: 18000,
      easing: "linear",
      loop: true,
    });
  }

  /* ------------------------------------------------------------------ *
   * 8. BUBBLES rising inside flacons
   * ------------------------------------------------------------------ */
  if (!reduceMotion) {
    document.querySelectorAll(".bubble").forEach((b, i) => {
      const baseY = parseFloat(b.getAttribute("cy"));
      anime({
        targets: b,
        translateY: [0, -(90 + Math.random() * 40)],
        opacity: [0, 0.6, 0],
        duration: 3600 + Math.random() * 2400,
        delay: i * 600,
        loop: true,
        easing: "easeInOutSine",
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 9. SCROLL REVEALS (IntersectionObserver + anime)
   * ------------------------------------------------------------------ */
  function revealSetup() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);

          if (el.classList.contains("reveal-up")) {
            anime({
              targets: el,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 1100,
              easing: "easeOutExpo",
            });
          }

          if (el.classList.contains("manifesto")) {
            anime({
              targets: el.querySelectorAll(".w"),
              opacity: [0.12, 1],
              duration: 900,
              delay: anime.stagger(45),
              easing: "easeOutQuad",
            });
          }

          if (el.classList.contains("collection")) {
            anime({
              targets: el.querySelectorAll(".card"),
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 1100,
              delay: anime.stagger(160),
              easing: "easeOutExpo",
            });
          }

          if (el.classList.contains("pyramid")) {
            anime({
              targets: el.querySelectorAll(".pyramid__bar i"),
              width: ["0%", "100%"],
              duration: 1400,
              delay: anime.stagger(220),
              easing: "easeInOutExpo",
            });
            anime({
              targets: el.querySelectorAll(".pyramid__row"),
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 900,
              delay: anime.stagger(220),
              easing: "easeOutExpo",
            });
          }
        });
      },
      { threshold: 0.18 }
    );

    document
      .querySelectorAll(
        ".reveal-up, .manifesto, .collection, .pyramid"
      )
      .forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------ *
   * 10. CARD HOVER — shift the ambient light to the parfum's colour
   * ------------------------------------------------------------------ */
  const root = document.documentElement;
  const defaultAmb = "rgba(201, 161, 90, 0.14)";
  function hexToRgba(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }
  document.querySelectorAll(".card").forEach((card) => {
    const accent = card.dataset.accent;
    card.addEventListener("mouseenter", () => {
      document.body.dataset.amb = accent;
      anime({
        targets: root,
        duration: 700,
        easing: "easeOutQuad",
        update: () => {},
      });
      root.style.setProperty("--amb-color", hexToRgba(accent, 0.18));
      root.style.setProperty("--amb-y", "50%");
    });
    card.addEventListener("mouseleave", () => {
      document.body.dataset.amb = "#c9a15a";
      root.style.setProperty("--amb-color", defaultAmb);
      root.style.setProperty("--amb-y", "12%");
    });
  });

  /* ------------------------------------------------------------------ *
   * 11. NAV background on scroll + hero parallax
   * ------------------------------------------------------------------ */
  const heroFlacon = document.querySelector(".hero__flacon");
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (heroFlacon && y < window.innerHeight && !reduceMotion) {
        heroFlacon.style.marginTop = y * 0.15 + "px";
      }
    },
    { passive: true }
  );

  /* ------------------------------------------------------------------ *
   * BOOT
   * ------------------------------------------------------------------ */
  window.addEventListener("load", runPreloader);
  // Fallback if load already fired
  if (document.readyState === "complete") runPreloader();
})();
