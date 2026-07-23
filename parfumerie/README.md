# SILLAGE — Maison de parfum

Site vitrine d'une maison de parfum fictive, pensé pour provoquer le
« Wow, c'est quoi ça ? ». Toutes les animations sont réalisées avec
[anime.js](https://animejs.com) (v3.2.1, embarqué localement — aucune
dépendance à installer).

## Aperçu

- **Preloader cinématographique** — un « sillage » se dessine, le nom se
  révèle lettre par lettre, un compteur monte jusqu'à 100 %, puis le rideau
  se lève.
- **Curseur sur mesure** — un point + un anneau qui suit avec inertie, et
  qui laisse derrière lui une véritable traînée de particules dorées : le
  _sillage_, thème central de la marque.
- **Flacons SVG animés** — dessinés en code (verre, liquide dégradé, reflets,
  bulles qui remontent), recolorés pour chaque parfum. Aucune image externe.
- **Révélations au scroll** — titres, mots du manifeste, cartes et pyramide
  olfactive apparaissent au fil de la lecture (IntersectionObserver + anime.js).
- **Ambiance réactive** — survoler un parfum teinte toute la page de sa
  couleur signature.
- **100 % responsive** et respectueux de `prefers-reduced-motion`.

## Les parfums

| N°  | Nom            | Famille        | Notes                     |
| --- | -------------- | -------------- | ------------------------- |
| 01  | Noir Absolu    | Boisé — Ambré  | Oud · Cuir · Encens       |
| 02  | Rose Éternelle | Floral — Poudré| Rose de Mai · Pivoine · Musc |
| 03  | Bois de Lune   | Boisé — Frais  | Vétiver · Cèdre · Ambre gris |

Pour ajouter un parfum, il suffit d'ajouter un objet dans le tableau
`PARFUMS` en haut de `js/main.js` — la carte et son flacon sont générés
automatiquement.

## Lancer le site

Ouvrez simplement `index.html` dans un navigateur, ou servez le dossier :

```bash
# avec Python
python3 -m http.server 8000
# puis http://localhost:8000/parfumerie/
```

> Les polices (Cormorant Garamond, Jost) sont chargées depuis Google Fonts.
> Hors-ligne, des polices serif/sans de secours prennent le relais sans
> casser la mise en page.

## Structure

```
parfumerie/
├── index.html        # structure de la page
├── css/style.css     # thème, mise en page, curseur, flacons
└── js/
    ├── anime.min.js  # anime.js v3.2.1 (embarqué)
    └── main.js       # données + toutes les animations
```
