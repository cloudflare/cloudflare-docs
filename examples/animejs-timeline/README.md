# Starters anime.js (v4)

Exemples réutilisables pour tes futurs projets. anime.js **4.5.0**.

## Fichiers

- `index.html` — `createTimeline()` + `stagger()`
- `svg-starter.html` — utilitaires SVG : `svg.createDrawable()`, `svg.morphTo()`, `svg.createMotionPath()`

Ouvre-les directement dans un navigateur, aucune étape de build.

## Réutiliser dans un nouveau projet

**Sans bundler (HTML simple)** — juste un import CDN, rien à installer :

```js
import { animate, svg } from "https://cdn.jsdelivr.net/npm/animejs@4/+esm";
```

**Avec bundler (Vite, Astro, Next…)** :

```bash
npm install animejs   # ou: pnpm add animejs
```

```js
import { animate, createTimeline, stagger, svg } from "animejs";
```

## Les 3 utilitaires SVG

Tout est dans le namespace `svg` — aucun paquet séparé.

```js
import { animate, svg } from "animejs";

// Dessine le tracé d'un <path>
const [d] = svg.createDrawable(".line");
animate(d, { draw: ["0 0", "1 1"], duration: 2000, loop: true });

// Transforme une forme en une autre (points d'un <polygon>/<path>)
animate(".shape", { points: svg.morphTo(".target"), duration: 1500, alternate: true, loop: true });

// Déplace un élément le long d'un <path>
const { translateX, translateY, rotate } = svg.createMotionPath(".track");
animate(".dot", { translateX, translateY, rotate, duration: 2000, loop: true });
```
