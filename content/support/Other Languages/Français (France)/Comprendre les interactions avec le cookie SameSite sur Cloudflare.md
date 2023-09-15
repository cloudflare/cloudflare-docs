---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360038470312-Comprendre-les-interactions-avec-le-cookie-SameSite-sur-Cloudflare
title: Comprendre les interactions avec le cookie SameSite sur Cloudflare
---

# Comprendre les interactions avec le cookie SameSite sur Cloudflare

## Comprendre les interactions avec le cookie SameSite sur Cloudflare

_Découvrez le cookie SameSite et la manière dont il vous protège contre la Cross-site Request Forgery (CSRF)._

___

## Présentation

Le [cookie SameSite de Google Chrome](https://www.chromium.org/updates/same-site) modifie la manière dont Google Chrome gère le contrôle SameSite.  Google utilise SameSite pour lutter contre les cookies de marketing qui traquent les utilisateurs et contre la CSRF qui permet aux pirates de subtiliser ou de manipuler vos cookies.  

Le cookie SameSite comporte 3 modes différents :

-   **Strict** : Les cookies « first party » sont créés par le premier acteur (le domaine visité). Par exemple, un cookie first party est créé par Cloudflare lorsque vous visitez Cloudflare.com.
-   **Lax** : Les cookies sont uniquement envoyés à l'apex du domaine (par exemple _\*.foo.com_).  Par exemple, si quelqu'un (_blog.naughty.com_) a créé un lien hypertexte vers une image (_img.foo.com/bar.png_), le client n'envoie pas de cookie à _img.foo.com_ puisqu'il ne s'agit ni d'un contexte first party ni apex.
-   **Aucun** : Les cookies sont envoyés avec toutes les requêtes.

Les paramètres SameSite pour les [cookies Cloudflare](https://support.cloudflare.com/hc/articles/200170156) incluent :

| Le cookie Cloudflare | Les paramètres SameSIte | HTTPS Only |
| --- | --- | --- |
| \_\_cfduid | SameSite=Lax | Non |
| \_\_cf\_bm | SameSite=None; Secure | Oui |
| cf\_clearance | SameSite=None; Secure | Oui |
| \_\_cfruid | SameSite=None; Secure | Oui |
| \_\_cflb | SameSite=Lax | Non |

___

## Problèmes connus avec les cookies SameSite et cf\_clearance

Lorsqu'un défi [CAPTCHA Cloudflare](https://support.cloudflare.com/hc/articles/200170136) ou JavaScript est résolu, par exemple dans le cadre d'une [**règle de pare-feu**](https://support.cloudflare.com/hc/articles/360016473712) ou [**d'accès selon l'adresse IP**](https://support.cloudflare.com/hc/articles/217074967), un cookie **cf\_clearance** est placé dans le navigateur du client. Le cookie _cf\_clearance_ a une durée de vie par défaut de 30 minutes mais est configuré via [**Challenge Passage**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e) dans l'onglet **Paramètres** de l'application Cloudflare **Firewall** .

Cloudflare définit **SameSite** sur _None_ pour le cookie **cf\_clearance** de sorte que les requêtes de visiteurs provenant de noms d'hôtes différents ne débouchent pas sur des défis ou des erreurs ultérieurement. Lorsque **SameSite** est défini sur _None_, le flag _Secure_ doit être également activé.

Utiliser le flag _Secure_ nécessite l'envoi du cookie via une connexion HTTPS.  Le paramétrage du cookie **cf\_clearance** par défaut est **SameSite**\=_Lax_ si vous utilisez le protocole HTTP sur une partie quelconque de votre site web et cela peut entraîner des problèmes sur le site.

Si vous utilisez le protocole HTTP sur une partie quelconque de votre site, le cookie **cf\_clearance** est réglé sur **SameSite**\=_Lax_ par défaut, ce qui peut entraîner des problèmes sur le site. Pour résoudre ce problème, faites passer le trafic de votre site web en HTTPS.  Cloudflare vous propose deux outils pour vous aider : 

-   [**Automatic HTTPS Rewrites**](https://support.cloudflare.com/hc/articles/227227647), et 
-   [**Always Use HTTPS**](https://support.cloudflare.com/hc/articles/204144518#h_a61bfdef-08dd-40f8-8888-7edd8e40d156).

___

## Ressources associées

-   [En savoir plus sur le cookie SameSite](https://web.dev/samesite-cookies-explained/) 
-   [Comprendre les cookies de Cloudflare](https://support.cloudflare.com/hc/articles/200170156)
-   [FAQ Cloudflare SSL](https://support.cloudflare.com/hc/articles/204144518#h_999722138611548960019807)
-   [Comprendre les remplacements HTTPS automatiques](https://support.cloudflare.com/hc/articles/227227647)
