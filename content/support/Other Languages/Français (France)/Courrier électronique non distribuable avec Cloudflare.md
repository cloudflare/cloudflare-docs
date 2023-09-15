---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200168876-Courrier-%C3%A9lectronique-non-distribuable-avec-Cloudflare
title: Courrier électronique non distribuable avec Cloudflare
---

# Courrier électronique non distribuable avec Cloudflare

## Courrier électronique non distribuable avec Cloudflare

_La configuration par défaut de Cloudflare permet uniquement le traitement par proxy du trafic HTTP et interrompra tout trafic de messagerie._

___

## Conseils de dépannage

Si vous suivez les [meilleures pratiques pour les enregistrements MX de Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/200168876-Courrier-%C3%A9lectronique-non-distribuable-avec-Cloudflare#h.sf43uhyy1ztk) et que vous rencontrez toujours des problèmes lors de l’envoi ou de la réception de courrier, suivez les étapes de dépannage suivantes :

### Manque-t-il des enregistrements DNS ?

Contactez votre administrateur de messagerie électronique pour confirmer l’exactitude des enregistrements DNS de votre domaine. Consultez notre guide sur la [gestion des enregistrements DNS dans Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151) si vous avez besoin d’aide pour ajouter ou modifier des enregistrements DNS.

###   
Ne traitez pas par proxy les enregistrements de DNS de messagerie vers Cloudflare.

Si vous avez un _enregistrement MX_ de « mail.domain.com », alors _l’enregistrement A_ pour « mail.domain.com » doit comporter une icône de « nuage gris » à côté de _l’enregistrement A_ comme indiqué dans notre guide de [gestion des enregistrements DNS dans Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151).

### Contactez votre fournisseur de messagerie électronique pour obtenir de l’aide.

Si votre courrier électronique cesse de fonctionner peu après la modification des enregistrements DNS, contactez votre administrateur ou fournisseur de messagerie pour obtenir une aide supplémentaire au dépannage, et afin que les données relatives au problème puissent être fournies au support de Cloudflare.

___

## Bonnes pratiques concernant les enregistrements MX sur Cloudflare

Suivez ces instructions pour assurer la transmission de votre trafic de messagerie :

-   Un « nuage gris » pour vos enregistrements DNS associés au courrier électronique indique que le trafic n’est pas traité par proxy dans Cloudflare.
-   Utilisez des adresses IP séparées pour le trafic de messagerie et le trafic HTTP/HTTPS. Cloudflare recommande l’utilisation d’IP non contigus sur différentes plages d’IP.
-   Le trafic de messagerie n’étant par défaut pas traité par proxy dans Cloudflare, vous exposerez l’adresse IP du serveur Web original. Les informations sur votre adresse IP d’origine permettent aux pirates de contourner les fonctionnalités de sécurité de Cloudflare et d’attaquer directement votre serveur Web.
-   Ne configurez pas _d’enregistrements MX_ pour un domaine racine qui est traité par proxy dans Cloudflare.
-   De nombreuses entreprises d’hébergement spécifient le nom du domaine racine dans le contenu de _l’enregistrement MX_. Lorsque vous utilisez le DNS de Cloudflare, spécifiez un sous-domaine tel que « mail.exemple.com » dans le contenu de _l’enregistrement MX_ et créez un _enregistrement A_ séparé dans Cloudflare pour que « mail.exemple.com » pointe vers l’adresse IP de votre serveur mail.
