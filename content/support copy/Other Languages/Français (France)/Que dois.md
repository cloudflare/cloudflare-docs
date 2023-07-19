---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200172906-Que-dois-je-faire-si-je-m-attends-%C3%A0-une-hausse-ou-%C3%A0-un-pic-du-trafic-
title: Que dois
---

# Que dois-je faire si je m'attends à une hausse ou à un pic du trafic ? – Centre d'assistance Cloudflare

## Que dois-je faire si je m'attends à une hausse ou à un pic du trafic ?

**Assurez-vous que votre site peut gérer les pointes de trafic en procédant comme suit :**

**Ne vous limitez pas à la mise en cache par défaut si vous voulez que votre site soit le plus rapide possible**

Cloudflare par défaut  [met en cache le contenu statique](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-)  comme des images, CSS et JavaScript. Cependant, vous pouvez étendre notre mise en cache pour   travailler avec HTML   en créant des[Page Rules personnalisées](http://blog.cloudflare.com/introducing-pagerules-fine-grained-feature-co/).

![Screen_Shot_2017-03-09_at_16.54.36.png](/images/support/Screen_Shot_2017-03-09_at_16.54.36.png)

Sous la section Page Rules de votre compte, vous pouvez définir un schéma (l'ensemble ou une partie de votre site), puis activer l'option « Tout mettre en cache ». La création d'une Page Rule et l'activation de l'option Tout mettre   en cache signifient que Cloudflare mettra entièrement en cache HTML sur notre réseau de périphérie, au lieu de devoir faire des allers et retours depuis et vers votre serveur Web d'origine.

La création d'une Page Rule personnalisée comme celle-ci est idéale si vous avez une campagne en cours pour la période des fêtes. Avec l'option Tout mettre en cache, Cloudflare sera au service de votre site tout entier, le débarrassant complètement de sa charge, pour le rendre aussi rapide que possible.

Les utilisateurs de l'offre Business peuvent utiliser des techniques de mise en cache avancées pour mettre en cache le contenu statique sur des sites HTML dynamiques afin de réduire la charge en utilisant l'option de Page Rule « Contournement du cache sur Cookie ».

Avant qu'un visiteur n'ajoute quelque chose à son panier, se connecte ou publie un commentaire, sa visite est considérée comme une page consultée en anonyme. En mettant en cache ces types de visites de pages, vous éliminez considérablement de grandes quantités de charge de votre serveur, même si votre site est dynamique. Vous trouverez plus d'informations sur ce sujet dans le billet de blog d'introduction :  [Mettre en cache les pages consultées en anonyme](https://blog.cloudflare.com/caching-anonymous-page-views/).  

Il existe plusieurs tutoriels disponibles sur la façon dont vous pouvez faire ceci :

-   [Mettre en cache les pages consultées en anonyme avec WordPress ou WooCommerce](https://support.cloudflare.com/hc/en-us/articles/236166048)
-   [Mettre en cache les pages consultées en anonyme avec Magento 1 et Magento 2](https://support.cloudflare.com/hc/en-us/articles/236168808)
-   [Comment mettre en cache du contenu HTML statique ?](https://support.cloudflare.com/hc/en-us/articles/200172256-How-do-I-cache-static-HTML-)

Dans les Page Rules, vous pouvez   également modifier le TTL d'expiration du cache de périmètre, ce   qui vous permettra de savoir en combien de temps nous mettons en cache des ressources sur notre périphérie.

****Contactez votre fournisseur d'hébergement pour comprendre les limites de votre offre d'hébergement****

Même si Cloudflare décale une grande partie de la charge sur votre site grâce à la mise en cache et au filtrage des requêtes, une certaine quantité de trafic passera toujours par votre hôte. En ayant connaissance des limites de votre offre, vous pourrez nous aider à éviter un goulot d'étranglement de votre offre d'hébergement.

Une fois mis au courant des limites de votre offre, vous pouvez utiliser une fonctionnalité telle que le  [Rate Limiting](https://www.cloudflare.com/rate-limiting/)  pour limiter le nombre de fois qu'un utilisateur peut effectuer une requête vers votre site Web.

**Tirez profit des adresses IP Cloudflare**

Prenez des mesures pour empêcher les attaques sur votre site pendant la haute saison en configurant votre pare-feu pour qu'il accepte uniquement le trafic des adresses IP Cloudflare pendant les fêtes. Si vous acceptez les  [adresses IP Cloudflare](https://www.cloudflare.com/ips), vous pouvez empêcher les attaquants de se rendre à l'adresse IP d'origine et de s'en prendre à votre site hors ligne.

Les utilisateurs de  [l'extension mod\_cloudflare Apache](https://www.cloudflare.com/technical-resources/#mod_cloudflare) can atteindre cet objectif en ajoutant simplement  _DenyAllButCloudFlare_  à leur configuration Apache.

**Assurez-vous que les adresses IP Cloudflare sont mises en liste blanche**

Cloudflare fonctionne comme un proxy inverse sur votre site afin que toutes les connexions proviennent d'adresses IP Cloudflare, ce qui limite le risque que nos adresses IP puissent causer des problèmes aux visiteurs qui tenteraient d'accéder à votre site. Vous trouverez la liste de nos adresses IP ici :  [https://www.cloudflare.com/ips](https://www.cloudflare.com/ips)
