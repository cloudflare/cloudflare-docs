# kokonutui starter

Projet **Vite + React 19 + TypeScript + Tailwind v4 + shadcn**, prêt à recevoir
les composants [kokonutui](https://kokonutui.com). Le registre `@kokonutui` est
déjà branché dans `components.json`.

## Prérequis

- **Node ≥ 24** (obligatoire pour le CLI shadcn).
  Vérifie : `node -v`. Sinon installe-le (via [nvm](https://github.com/nvm-sh/nvm) : `nvm install 24 && nvm use 24`).

## Installation

```bash
cd kokonutui-starter
npm install
```

## Ajouter les composants kokonutui

Ces 3 commandes copient le code source des composants dans
`src/components/kokonutui/` :

```bash
npx shadcn@latest add @kokonutui/card-flip
npx shadcn@latest add @kokonutui/liquid-glass-card
npx shadcn@latest add @kokonutui/spotlight-cards
```

> ℹ️ Ces commandes n'ont **pas** pu être lancées dans l'environnement où le
> projet a été créé : le CLI shadcn exige Node ≥24 et le domaine
> `kokonutui.com` y était bloqué par la politique réseau. Sur ta machine, tout
> fonctionne normalement.

Ensuite, dans `src/App.tsx`, décommente les imports et le bloc `<div>` de démo.

## Lancer

```bash
npm run dev     # serveur de dev
npm run build   # build de production
```

## Comment ça marche (rappel)

`shadcn add` **ne fait pas une install partagée** : il **copie le code** du
composant dans ce projet. Pour un autre projet, tu réutilises ce starter (ou tu
réinitialises shadcn) et tu relances les commandes `add` là-bas.
