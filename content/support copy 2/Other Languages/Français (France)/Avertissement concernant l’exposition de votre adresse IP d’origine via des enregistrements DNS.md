---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115003687931-Avertissement-concernant-l-exposition-de-votre-adresse-IP-d-origine-via-des-enregistrements-DNS
title: Avertissement concernant l’exposition de votre adresse IP d’origine via des enregistrements DNS
---

# Avertissement concernant l’exposition de votre adresse IP d’origine via des enregistrements DNS

## Avertissement concernant l’exposition de votre adresse IP d’origine via des enregistrements DNS

_Lorsque vous avez des enregistrements DNS en nuage gris, Cloudflare peut vous avertir qu'ils sont susceptibles de révéler l’adresse IP de votre serveur d’origine. Cela se produit généralement avec les enregistrements DNS A, AAAA, CNAME et MX._

___

## Vue d'ensemble

Lorsque vos enregistrements DNS sont en nuage orange, Cloudflare accélère et protège votre site.

Une requête _dig_ sur votre domaine racine en nuage orange, renvoie une adresse IP Cloudflare. De cette manière, l’adresse IP de votre serveur d’origine reste cachée au public. N’oubliez pas que les avantages du nuage orange ne s’appliquent qu’au trafic HTTP.

Dans certaines circonstances, le panneau **Enregistrements DNS** de l’application **DNS** du tableau de bord de Cloudflare, affiche un avertissement lorsque vous avez des enregistrements DNS en nuage gris qui peuvent révéler l’adresse IP de votre serveur d’origine. Cet avertissement n’affecte en aucune façon le trafic destiné à votre site.

Lorsque l’adresse IP de votre serveur est exposée, votre serveur est plus vulnérable aux attaques directes. Les pirates peuvent toujours déterminer ladresse IP de votre serveur d'origine (mais c'est plus difficile) lorsqu'ils envoient du trafic vers Cloudflare.

Vous trouverez ci-dessous deux cas dans lesquels vous pourriez voir un avertissement d’exposition IP de la part de Cloudflare.

___

## Situation 1 : des enregistrements DNS qui devraient être en nuage orange

Si vous voyez l’avertissement suivant :

_`Cet enregistrement expose l’adresse IP de votre serveur d’origine. Pour masquer votre adresse IP d’origine et augmenter la sécurité de votre serveur, cliquez sur le nuage gris pour le changer en orange.`_

Cloudflare recommande de mettre en nuage orange l’enregistrement, afin que toute requête dig relative à cet enregistrement retourne une adresse IP Cloudflare et que l’adresse IP de votre serveur d’origine reste masquée au public.

Pour tirer parti des avantages de Cloudflare en termes de performances et de sécurité, nous vous recommandons de mettre en nuage orange les enregistrements DNS qui gèrent le trafic HTTP, notamment A, AAAA et CNAME.

___

## Situation 2 : les enregistrements DNS devant être en nuage gris

Lorsque vous avez un enregistrement _A_, _AAAA_, _CNAME_ ou _MX_ en nuage gris pointant vers le même serveur d'origine hébergeant votre site, Cloudflare affiche l'un des avertissements suivants :

_`Un enregistrement A, AAA, CNAME ou MX est dirigé vers votre serveur d’origine exposant votre IP d’origine.`_

_`Cet enregistrement expose l’adresse IP de votre serveur d’origine, ce qui l’expose potentiellement à un déni de service.`_

Une requête _dig_ sur ces enregistrements révèle l’adresse IP de votre serveur d’origine. Ces informations permettent aux pirates potentiels de cibler plus facilement votre serveur d’origine.

Cependant, il peut arriver que certains de vos enregistrements DNS doivent rester en nuage gris. Par exemple :

-   Lorsque vous devez héberger plusieurs services (par exemple, un site Web et une messagerie électronique) sur le même serveur physique.

Pour atténuer ce risque, nous vous recommandons :

-   d’analyser les conséquences de l’hébergement de plusieurs services sur le même serveur d’origine lorsque des enregistrements DNS en nuage gris sont inévitables
-   de mettre en nuage orange tous les enregistrements qui partagent la même adresse IP d’origine que votre domaine racine et que vous pouvez mettre en proxy en toute sécurité via Cloudflare
