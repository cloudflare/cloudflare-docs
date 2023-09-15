---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200168076-Comprendre-la-prise-en-charge-HTTP-2-et-HTTP-3-de-Cloudflare
title: Comprendre la prise en charge HTTP2 et HTTP3 de Cloudflare
---

# Comprendre la prise en charge HTTP/2 et HTTP/3 de Cloudflare

## Comprendre la prise en charge HTTP/2 et HTTP/3 de Cloudflare

_Découvrez comment Cloudflare prend en charge HTTP/2 et HTTP/3 pour accélérer votre site web sans nécessiter de modification de votre base de code existante._

___

## Aperçu

HTTP/2 et HTTP/3 accélèrent le chargement des pages et sont gratuits pour toutes les [offres Cloudflare](http://www.cloudflare.com/plans). HTTP/2 est activé par défaut et nécessite un [certificat SSL sur le réseau périphérique de Cloudflare](https://support.cloudflare.com/hc/articles/203295200#h_036e2e20-96d8-4199-bb1f-0fbb41b5cdd0). Configurez HTTP/2 et HTTP/3 via l’application Cloudflare **Network**. HTTP/2 ne peut pas être désactivé sur les domaines pour lesquels l’offre Free a été souscrite.

Un navigateur et un serveur web négocient automatiquement le protocole le plus élevé disponible. HTTP/3 est donc prioritaire sur HTTP/2.

Pour déterminer le protocole utilisé pour votre connexion, saisissez _exemple.com_/cdn-cgi/trace dans un navigateur web ou un client et remplacez _exemple.com_ par votre nom de domaine. Plusieurs lignes de données sont renvoyées. Si _http=h2_ apparaît dans les résultats, la connexion s’est déroulée via HTTP/2. Les autres valeurs possibles sont _http=http2+quic/99_ pour HTTP/3 et _http=http/1.x_pour HTTP/1.x.

___

HTTP/2 améliore les temps de chargement des pages via les approches suivantes :

-   Multiplexage de connexion – Récupère plusieurs ressources dans une seule requête réseau. Les réponses sont envoyées lorsque des ressources sont disponibles, afin d’éviter de ralentir le rendu des pages.
-   Compression des en-têtes HTTP – Compresse les en-têtes et simplifie les requêtes HTTP pour éviter de renvoyer les en-têtes.
-   HTTP/2 Server Push – Pour améliorer la vitesse de chargement des pages, Cloudflare fournit des ressources supplémentaires qu’un client peut mettre en cache sans attendre des requêtes supplémentaires.

Remarque :

-   Tous les navigateurs ne prennent pas en charge HTTP/2 et utilisent plutôt HTTP 1.x.
-   Le multiplexage de connexion est appliqué en fonction des domaines.

___

## HTTP/3

HTTP/3 permet d’établir des connexions rapides, fiables et sécurisées. HTTP/3 chiffre le transport Internet par défaut avec un protocole de Google appelé QUIC. Activez HTTP/3 via l’application Cloudflare **Network**.

Pour plus d’informations, consultez notre [documentation pour développeurs consacrée à HTTP/3](/http3/).

___

## Server Push

La fonctionnalité Server Push permet aux serveurs web d’origine d’envoyer des ressources au client ou au navigateur web sans attendre d’analyser le code HTML pour trouver des références à des ressources supplémentaires telles que des images, des feuilles de style, du code JavaScript, etc. Server Push évite le cycle habituel des requêtes et réponses HTTP pour chaque script ou feuille de style d’une page. Server Push est disponible pour toutes les offres Cloudflare.

Server Push extrait les références d’URI contenues dans le paramètre rel=preload de l’en-tête **Link** du serveur d’origine. Ces URI supplémentaires sont ensuite fournies au client. Voici des exemples d’en-têtes de **Link** :

`Link: </images/image.png>; rel=preload;`

`Link: </css/main.css>; rel=preload;`

Server Push est limité à 50 ressources par page et 100 par connexion.

___

## Ressources associées

-   [HTTP/3 : le passé, le présent et le futur](https://blog.cloudflare.com/http3-the-past-present-and-future/)
-   [L’essor de QUIC](https://blog.cloudflare.com/the-quicening/)
-   [Savourez une tranche de QUIC et de Rust !](https://blog.cloudflare.com/enjoy-a-slice-of-quic-and-rust/)

Informations sur la prise en charge des navigateurs :

-   [HTTP/2](http://caniuse.com/#feat=http2) 
-   [HTTP/3](https://caniuse.com/#feat=http3)
