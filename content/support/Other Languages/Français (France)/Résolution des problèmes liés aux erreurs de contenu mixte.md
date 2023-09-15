---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200170476-R%C3%A9solution-des-probl%C3%A8mes-li%C3%A9s-aux-erreurs-de-contenu-mixte
title: Résolution des problèmes liés aux erreurs de contenu mixte
---

# Résolution des problèmes liés aux erreurs de contenu mixte

## Résolution des problèmes liés aux erreurs de contenu mixte

_Corrigez les erreurs de contenu mixte pour vous assurer que le navigateur Web du visiteur ne bloque pas les ressources HTTP servies via HTTPS._

___

## Présentation

Les domaines ajoutés à Cloudflare reçoivent des certificats SSL et peuvent servir le trafic via HTTPS. Cependant, après avoir commencé à utiliser Cloudflare, certains clients rencontrent des problèmes de contenu ou de rendu de page manquants lorsqu’ils servent pour la première fois le trafic via HTTPS.

En général, le problème provient d’une requête de ressources HTTP provenant d’une page Web servie via HTTPS.  Par exemple, vous tapez `https://exemple.com` dans un navigateur et la page contient une référence d’image via HTTP dans le code HTML à `<img src="http://exemple.com/ressource.jpg">`.

Normalement, si votre site Web charge toutes les ressources de manière sécurisée via HTTPS, les visiteurs observent une icône représentant un cadenas (généralement un cadenas vert) dans la barre d’adresse de leur navigateur :

![](/images/support/green-lock-icon.png)

Cela indique que votre site dispose d’un certificat SSL opérationnel et que toutes les ressources chargées par le site sont chargées via HTTPS. Le cadenas vert assure aux visiteurs que leur connexion est sécurisée. L’un des [symptômes de contenu mixte](https://support.cloudflare.com/hc/fr-fr/articles/200170476-R%C3%A9solution-des-probl%C3%A8mes-li%C3%A9s-aux-erreurs-de-contenu-mixte#h_a6c5a05b-baba-4f88-a75c-d61f206366ed) est que différentes icônes apparaissent à la place du cadenas vert.

___

## Symptômes d’occurrence de contenu mixte

La plupart des navigateurs modernes bloquent les requêtes HTTP sur des pages HTTPS sécurisées. Le contenu bloqué peut inclure des images, JavaScript, CSS ou tout autre contenu ayant une incidence sur l’apparence ou le comportement de la page.

Vous trouverez ci-dessous des indications selon lesquelles votre navigateur Web observe un contenu mixte pour le site Web demandé :

Pour les avertissements de contenu mixte, le navigateur Web charge les ressources, mais les utilisateurs ne voient pas l’icône de cadenas vert dans l’URL. Les messages d’avertissement apparaissent dans les outils de débogage du navigateur :

![mixed-content-warning.png](/images/support/mixed-content-warning.png)

Pour les erreurs de contenu mixtes, le navigateur refuse de charger les ressources via une connexion non sécurisée :

![mixed-content-error.png](/images/support/mixed-content-error.png)

Vous trouverez des informations sur l’utilisation des outils de débogage pour identifier ces problèmes dans la documentation de [Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content) et [Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content). Vous pouvez également afficher votre source de page et rechercher des références spécifiques à _http://_ pour les chemins d’accès à d’autres ressources.

___

Il existe deux méthodes pour résoudre les erreurs de contenu mixte.

1\. Chargez toutes les ressources via votre source HTML sans spécifier les protocoles HTTP ou HTTPS. Par exemple :

     _//domaine.com/path/to.file_

     au lieu de

     _http://domaine.com/path/to.file_

2\. En fonction de votre système de gestion de contenu, recherchez des plug-ins qui réécrivent automatiquement les ressources HTTP en HTTPS. Dans l’application **SSL/TLS**, Cloudflare fournit un tel service via des [Remplacements HTTPS automatiques](https://support.cloudflare.com/hc/articles/227227647).

___

## Ressources associées

-   [Débogage de contenu mixte avec Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content)
-   [Débogage de contenu mixte avec Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
