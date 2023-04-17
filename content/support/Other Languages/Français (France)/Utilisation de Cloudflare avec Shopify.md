---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/203464660-Utilisation-de-Cloudflare-avec-Shopify
title: Utilisation de Cloudflare avec Shopify
---

# Utilisation de Cloudflare avec Shopify

## Utilisation de Cloudflare avec Shopify

_Découvrez comment configurer de manière optimale votre compte personnel Cloudflare en tant que commerçant Shopify, ainsi que les avantages qu'apporte Cloudflare à Shopify en termes de sécurité et de performance._

___

## Aperçu

Cloudflare s'associe à Shopify pour apporter à tous les sites web de commerce Shopify les avantages qu'offre Cloudflare en termes de performance et de sécurité. Les commerçants Shopify peuvent également utiliser leur compte personnel Cloudflare pour faire traiter le trafic web en proxy par Cloudflare avec un plan Enterprise. L'activation de Cloudflare avec votre compte personnel, en plus des avantages de Shopify, est appelée Orange-to-Orange (O2O). O2O applique à la fois vos paramètres de sécurité et ceux de Shopify.

![Schéma du fonctionnement d'O2O pour les commerçants Shopify sur Cloudflare.](/support/static/hc-ext-shopify_o2o.png)

___

## Activation d'O2O pour votre site Web Shopify

L'activation d'O2O est uniquement disponible avec l'offre Cloudflare Enterprise.

Pour activer O2O sur votre compte, vous devez disposer d'un enregistrement DNS A ou CNAME qui redirige le domaine de votre boutique vers le domaine shops.myshopify.com. Configurez un nuage orange pour l'enregistrement.

Après avoir ajouté l'enregistrement DNS avec activation du proxy, contactez l'équipe responsable de votre compte pour activer O2O sur le domaine de votre boutique.

___

## Bonnes pratiques

Lorsqu'elles sont utilisées avec O2O, certaines fonctions de Cloudflare peuvent interrompre le flux de trafic vers votre boutique Shopify ou afficher des données incorrectes à vos visiteurs. Vous devez donc suivre ces consignes :

-   N'utilisez pas les fonctionnalités suivantes de Cloudflare :
    -   [Mise en cache HTML](/cache/)
    -   [Règles de pare-feu personnalisées](/firewall/)
    -   [Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128)
    -   [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552)
    -   [Load Balancing](/load-balancing/)
    -   [IPv6](https://support.cloudflare.com/hc/articles/229666767)
-   Soyez prudent avec les fonctions suivantes de Cloudflare :
    -   [Règles Page Rules](https://support.cloudflare.com/hc/articles/218411427) : Les règles de page incorrectement configurées qui correspondent au sous-domaine utilisé pour Shopify peuvent bloquer ou fausser le flux des visiteurs de commerce électronique sur votre site Web.
    -   [Workers](/workers/) : À l'instar des règles Page Rules, Workers peut interrompre le flux de trafic vers votre site web et, ainsi, grever vos revenus. Intégrez Workers avec prudence. Il est recommandé d'exclure le sous-domaine utilisé avec Shopify de l'itinéraire Workers.
    -   [Enregistrement DNS CAA](/ssl/edge-certificates/caa-records/) : Shopify utilise Let's Encrypt pour émettre des certificats SSL/TLS pour les domaines de commerce. Si vous ajoutez des enregistrements DNS CAA, vous devez sélectionner Let's Encrypt comme autorité de certification (CA), faute de quoi les connexions HTTPS risquent d'échouer.

___

## Pour plus d'aide

Si vous êtes un commerçant Shopify et vous configurez votre compte personnel Cloudflare, contactez votre équipe de gestion de compte ou l'assistance Cloudflare, qui vous aidera à résoudre d'éventuels problèmes. Cloudflare s'adressera à Shopify en cas de problèmes techniques que Cloudflare ne peut pas résoudre.

-   [Contacter le support Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/200172476-Contacting-Cloudflare-Support)
