---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115000546328-R%C3%A9solution-des-probl%C3%A8mes-li%C3%A9s-%C3%A0-Cloudflare-Rate-Limiting
title: Résolution des problèmes liés à Cloudflare Rate Limiting
---

# Résolution des problèmes liés à Cloudflare Rate Limiting

## Résolution des problèmes liés à Cloudflare Rate Limiting

_Résolvez les problèmes courants qui empêchent la mise en correspondance correcte des requêtes de Rate Limiting et génèrent des erreurs via l’API Cloudflare._

### Dans cet article

-   [Aperçu](https://support.cloudflare.com/hc/fr-fr/articles/115000546328-R%C3%A9solution-des-probl%C3%A8mes-li%C3%A9s-%C3%A0-Cloudflare-Rate-Limiting#wArvTRBCWS0BZzHjPzrZh)
-   [Limitation](https://support.cloudflare.com/hc/fr-fr/articles/115000546328-R%C3%A9solution-des-probl%C3%A8mes-li%C3%A9s-%C3%A0-Cloudflare-Rate-Limiting#h_AtLzgCPtd1DaMNn1E7VrO)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/115000546328-R%C3%A9solution-des-probl%C3%A8mes-li%C3%A9s-%C3%A0-Cloudflare-Rate-Limiting#143TZoQHGc7inklJSJKCAE)

___

## Aperçu

Certains problèmes courants de configuration de **Rate Limiting** empêchent la mise en correspondance correcte des requêtes :

-   **Inclusion de schémas de protocole HTTP ou HTTPS dans les modèles de règles** (par exemple, _https://exemple.com/\*_). Pour restreindre les règles afin qu’elles correspondent uniquement au trafic HTTP ou HTTPS, utilisez le tableau de modèles dans la correspondance de la requête, par exemple, _"schemes": \[ "HTTPS" \]_
-   **Oublier un caractère de barre oblique en fin de ligne (/)**. Cloudflare **Rate Limiting** considère uniquement les requêtes de page d’accueil (par exemple, _exemple.com_ et _exemple.com/_) comme équivalentes, mais pas comme un autre chemin (par exemple, _exemple.com/chemin/_ et _exemple.com/chemin_)_._ Pour mettre en correspondance les chemins de requête avec et sans barre oblique, utilisez un caractère générique (par exemple, _exemple.com/chemin\*_).
-   **Inclure une chaîne de requête ou une ancre** (par exemple, _exemple.com/chemin?foo=bar_ ou _exemple.com/chemin#section1_). Une règle comme _exemple.com/chemin_ établit une correspondance avec les requêtes pour _exemple.com/chemin?foo=bar_.
-   **Remplacer une limite de débit par des règles** [**IP Access Rules**](https://support.cloudflare.com/hc/articles/217074967)**.**
-   **Inclure un numéro de port** (par exemple, _exemple.com:8443/api/_). Le produit Rate Limiting ne prend pas en compte les numéros de port dans les règles, ce qui affecte les règles. Si vous supprimez le numéro de port de l’URL, la règle de limitation de débit se déclenchera comme prévu.

Par ailleurs, quelques erreurs courantes empêchent la configuration de **Rate Limiting** via l’API de Cloudflare :

-   _Decoding is not yet implemented_ (Le décodage n’est pas encore mis en œuvre) – Indique que l’en-tête _Content-Type: application/json_ est manquant dans votre requête. Ajoutez l’en-tête à votre requête d’API pour résoudre le problème.
-   _Ratelimit.api.not\_entitled_ – Les clients Enterprise doivent contacter leur équipe de gestion de compte Cloudflare avant d’ajouter des règles.
-   D’autres erreurs sont documentées dans la [documentation de l’API](https://api.cloudflare.com/#rate-limits-for-a-zone-errors). Si vous n’êtes pas sûr d’une erreur particulière, [contactez l’assistance Cloudflare](https://support.cloudflare.com/hc/articles/200172476) et fournissez la requête API ayant échoué (masquez votre clé d’API, au préalable).

___

## Limitation

La limitation du débit permet de limiter les pics de trafic qui dépassent le débit défini par l'utilisateur. Le système n'est pas conçu pour permettre à un nombre précis de requêtes d'atteindre le serveur d'origine. Il se peut qu'un délai apparaisse entre la détection de la requête et la mise à jour du compteur interne. En raison de ce délai (qui peut aller jusqu'à plusieurs secondes), les requêtes excédentaires peuvent encore atteindre l'origine avant qu'une action ne soit déclenchée à la périphérie (par exemple le blocage ou la vérification).

___

## Ressources associées

-   [Configuration de Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128)
