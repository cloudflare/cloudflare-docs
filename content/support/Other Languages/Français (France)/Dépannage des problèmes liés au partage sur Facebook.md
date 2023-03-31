---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/217720788-D%C3%A9pannage-des-probl%C3%A8mes-li%C3%A9s-au-partage-sur-Facebook
title: Dépannage des problèmes liés au partage sur Facebook
---

# Dépannage des problèmes liés au partage sur Facebook

## Dépannage des problèmes liés au partage sur Facebook

Apprenez comment éviter de bloquer les adresses IP Facebook via l'application **Firewall** de Cloudflare.

___

## Présentation

Par défaut, Cloudflare ne bloque pas et ne teste pas les requêtes provenant de Facebook. Toutefois, un message d'un site web à Facebook générera un message d'erreur _Attention requise_ dans les circonstances suivantes :

-   le niveau de sécurité est réglé sur [I'm Under Attack](https://support.cloudflare.com/hc/search/click?data=BAh7CjoHaWRpBN5a7gs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiSC9oYy9lbi11cy9hcnRpY2xlcy8yMDAxNzAyMDYtSG93LWRvLUktZW5hYmxlLUktbS1VbmRlci1BdHRhY2stbW9kZS0GOwdGOg5zZWFyY2hfaWRJIik4YjE5YTBmNS0zNDViLTRkZmEtYmEzYy01NDk4NDlhNmZkNjEGOwdGOglyYW5raQ8%3D--12cd9c846382e475f31a1186344911da7ed54d9c) soit globalement, soit par l'intermédiaire d'une [Page Rule](https://support.cloudflare.com/hc/articles/200172336), ou
-   il existe un test ou un blocage du pare-feu définis par l’utilisateur qui inclut une adresse IP Facebook.

Résolution des problèmes liés au partage sur Facebook

-   Supprimer la [règle de pare-feu](https://support.cloudflare.com/hc/articles/360016473712) correspondant pour l’IP, l’ASN ou le pays ou la [règle d’accès IP](https://support.cloudflare.com/hc/articles/217074967)qui teste ou bloque les adresses IP Facebook, ou
-   mettre AS32934 et AS63293 en liste blanche dans vos [IP Access Rules](https://support.cloudflare.com/hc/articles/217074967) (Règles d’accès IP) pour contourner les tests de sécurité, les blocages et les tests Under Attack.

Si vous avez rencontré des problèmes avec le partage Facebook, vous devez récupérer les pages à l’aide de l’option **Fetch New Scrape Information** dans l’outil [débogueur d’objet](https://developers.facebook.com/tools/debug/og/object/) de Facebook.

Si vous continuez à rencontrer des problèmes, [contactez le support Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) en fournissant les informations suivantes :

-   les adresses URL de votre site internet impossibles à partager avec Facebook
-   le rapport de [l'outil de débogage de Facebook](https://developers.facebook.com/tools/debug/og/object/)
-   la confirmation que vous avez récupéré les URL
