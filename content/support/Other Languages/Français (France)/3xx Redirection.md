---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection
title: 3xx Redirection
---

# 3xx Redirection

**Présentation**

Les codes 3xx sont une catégorie de réponses qui suggèrent que l'agent utilisateur doit suivre une autre ligne de conduite pour obtenir la ressource complète demandée.

Redirect Location doit être défini selon l'une ou l'autre des méthodes suivantes :

1.  Le champ d’en-tête `Location` dans la réponse, utile pour la redirection automatique
2.  Le payload de la réponse avec un lien hypertexte (facultatif) vers le lieu de correction

-   [300 Multiple](https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection#code_300)
-   [301 Moved Permanently](https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection#code_301)
-   [302 Found](https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection#code_302)
-   [303 See Other](https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection#code_303)
-   [304 Not Modified](https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection#code_304)
-   [305 Use Proxy](https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection#code_305)
-   [306 Switch Proxy](https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection#code_306)
-   [307 Temporary Redirect](https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection#code_307)
-   [308 Permanent Redirect](https://support.cloudflare.com/hc/fr-fr/articles/115003011091-3xx-Redirection#code_308)

**300 Multiple Choices** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Options multiples pour la ressource que le client peut suivre. Par exemple, il pourrait être utilisé pour présenter différentes possibilités de format pour les vidéos, pour dresser une liste de fichiers avec différentes [extensions](https://en.wikipedia.org/wiki/File_extensions), ou pour [lever l’ambigüité du sens des mots](https://en.wikipedia.org/wiki/Word_sense_disambiguation).

**301 Moved Permanently** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Redirection URL permanente pour la ressource demandée.Une nouvelle URI permanente a été attribuée à la ressource cible et toute référence future à cette ressource devrait utiliser l'une des URI jointes.

Cloudflare peut générer ces réponses, en évitant ainsi d'envoyer une requête à la réponse du serveur d'origine grâce à l'utilisation des Page Rules. En savoir plus sur la manière dont Cloudflare peut vous aider à générer des redirections dans [Page Rules URL Forwarding](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**302 Found (aussi appelée redirection temporaire)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Similaire à une redirection 301, mais ne sert que pour des durées limitées. L'agent utilisateur peut automatiquement suivre l'en-tête `Location`, mais ne doit pas remplacer l'URI actuel par un 301.

Cloudflare peut générer ces réponses, en évitant ainsi d'envoyer une requête à la réponse du serveur d'origine grâce à l'utilisation de Page Rules. En savoir plus sur la manière dont Cloudflare peut vous aider à générer des redirections dans [Page Rules URL Forwarding](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**303 See Other (depuis HTTP/1.1)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

L'agent utilisateur doit suivre cette redirection avec une requête GET. _Remarque : se distingue du code 301 par le fait que la ressource redirigée n'est pas nécessairement équivalente à ce qui a été demandé._

-   Destiné à être utilisé en réponse à une requête `POST/DELETE` pour signaler que le serveur d'origine a reçu correctement les données et pour permettre un comportement correct du cache.
-   La réponse 303 d’origine ne peut pas être mise en cache, mais la réponse à la 2<sup>ème</sup> requête (`GET`) peut l'être puisqu'elle se trouve sous un URI différent.

**304 Not Modified  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

Signaler au client que la ressource demandée est disponible et valide dans le cache. Le serveur d'origine n'a pas modifié la ressource faisant l'objet de la requête. Le client peut recevoir le payload pour la ressource spécifiée sans se connecter à nouveau au serveur d'origine, ce qui redirige la requête d'utilisation de la ressource stockée.  Les exigences d'un cache qui reçoit une réponse 304 sont définis dans la  [section 4.3.4 de \[RFC7234\]](https://tools.ietf.org/html/rfc7234#section-4.3.4).

Avant cette réponse, le client a envoyé une requête conditionnelle GET ou HEAD spécifiant quelle ressource il a actuellement stocké. Le serveur donne au client le feu vert pour utiliser cette ressource en tant que version la plus récente afin de réduire la quantité de données transmises entre le client et le serveur.

-   Ne doit pas avoir de corps de message

-   Doit contenir l'un des en-têtes qui auraient été définis avant la réponse 200 en miroir : `Cache-Control, Content-Location, Date,  ETag, Expires`, ou `Vary`.

Lorsqu'une requête périmée est adressée à Cloudflare et qu'elle doit donc être revalidée à l'origine, Cloudflare envoie une réponse 304 pour confirmer que la version dans notre cache correspondait à celle de l'origine. La réponse contiendra l’en-tête `CF-Cache-Status : En tête` REVALIDATED. et Cloudflare confirme la version en utilisant l'en-tête `If-Modified-Since` . Pour en savoir plus, voir : [En-têtes ETag](https://support.cloudflare.com/hc/en-us/articles/218505467)

**305 Use Proxy (deprecated)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

La requête doit être satisfaite par l’intermédiaire de l'URI proxy spécifié dans l'en-tête Location plutôt que par le serveur d'origine. Ce code de statut a été déconseillé en raison de risques de sécurité.

**306 Switch Proxy (déconseillé)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Notification indiquant que les requêtes suivantes doivent être adressées au proxy spécifié.

**307 Temporary Redirect** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Une redirection similaire à une réponse 302 sauf que la méthode de requête (ex. GET, POST) ne doit pas être différente de ce qui a été utilisé dans la requête d’origine si elle suit automatiquement la redirection.

-   L'agent utilisateur peut automatiquement suivre l'en-tête `Location`, mais ne devra pas remplacer l'URI d’origine.

**308 Permanent Redirect (**[**RFC 7538**](https://tools.ietf.org/html/rfc7538#section-3)**)**

Une redirection permanente similaire à une réponse 301 sauf que la méthode de requête (p. ex. GET, POST) ne doit pas être différente de ce qui a été utilisé dans la requête d’origine si elle suit automatiquement la redirection.

-   L'agent utilisateur doit automatiquement suivre l'en-tête `Location`
-   L'agent utilisateur doit remplacer l'URI original par l'URI mis à jour dans Location ou le payload.
