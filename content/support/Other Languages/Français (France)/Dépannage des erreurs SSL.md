---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200170566-D%C3%A9pannage-des-erreurs-SSL
title: Dépannage des erreurs SSL
---

# Dépannage des erreurs SSL

_Corrigez les erreurs SSL courantes observées lors de la navigation vers un domaine traité par proxy via Cloudflare._

___

## Présentation

Jusqu’à ce que Cloudflare fournisse un certificat SSL pour votre domaine, les erreurs suivantes apparaissent dans différents navigateurs pour le trafic HTTPS :

**Firefox**

     _ssl\_error\_bad\_cert\_domain_     _Cette connexion n’est pas fiable_

**Chrome :**

     _Votre connexion n’est pas privée_

**Safari**

     _Safari ne peut pas vérifier l’identité du site Web_

**Edge / Internet Explorer**

     _Il y a un problème avec le certificat de sécurité de ce site Web_

Même avec un certificat SSL Cloudflare configuré pour votre domaine, les anciens navigateurs affichent des erreurs concernant les certificats SSL non approuvés car ils ne prennent [pas en charge le protocole SNI (Server Name Indication)](https://en.wikipedia.org/wiki/Server_Name_Indication#Support) utilisé par les certificats Universal SSL de Cloudflare.

Si des erreurs SSL se produisent lors de l’utilisation d’un navigateur plus récent, examinez les causes d’erreurs SSL courantes :

-   [Erreurs de boucle de redirection ou erreurs HTTP 525 ou 526](https://support.cloudflare.com/hc/fr-fr/articles/200170566-D%C3%A9pannage-des-erreurs-SSL#h_7ec9ed4a-80ae-4fca-8be7-89a13c195d19)
-   [Seuls certains de vos sous-domaines renvoient des erreurs SSL](https://support.cloudflare.com/hc/fr-fr/articles/200170566-D%C3%A9pannage-des-erreurs-SSL#h_55e4d315-c60d-4798-9c4c-c75d9baed1b7)
-   [Votre certificat Universal SSL de Cloudflare n’est pas actif](https://support.cloudflare.com/hc/fr-fr/articles/200170566-D%C3%A9pannage-des-erreurs-SSL#h_122b94f3-ff14-4544-b5fa-8875e08ff5f0)
-   [Erreur de réponse OCSP](https://support.cloudflare.com/hc/fr-fr/articles/200170566-D%C3%A9pannage-des-erreurs-SSL#h_51354cf8-de93-4894-85e6-f0f7453d766d)
-   [SSL expiré ou erreurs d’incompatibilité SSL](https://support.cloudflare.com/hc/fr-fr/articles/200170566-D%C3%A9pannage-des-erreurs-SSL#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f)

___

### Erreurs de boucle de redirection ou erreurs HTTP 525 ou 526

**Symptôme**

Les visiteurs rencontrent les [erreurs de boucle de redirection](https://support.cloudflare.com/hc/articles/115000219871) lors de la navigation sur votre domaine, ou observent les erreurs HTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error) ou [526](https://support.cloudflare.com/hc/articles/115003011431#526error). Ces erreurs se produisent lorsque l’option SSL actuelle dans l’application **SSL/TLS** de Cloudflare n’est pas compatible avec la configuration de votre serveur Web d’origine.

**Résolution**

Pour les boucles de redirection, reportez-vous à notre guide sur le [dépannage des erreurs de boucle de redirection](https://support.cloudflare.com/hc/articles/115000219871).

Pour résoudre les erreurs HTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error) ou [526](https://support.cloudflare.com/hc/articles/115003011431#526error), reportez-vous à nos configurations SSL recommandées ci-dessous. Par exemple, si votre serveur Web d’origine :

-   dispose d’un certificat valide émanant d’une autorité de certification ou un [certificat Origin CA](https://support.cloudflare.com/hc/articles/115000479507) de Cloudflare, utilisez l’option **SSL** _[Full](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)_ ou _[Full (strict)](https://support.cloudflare.com/hc/articles/200170416#h_8afd8a8d-382d-4694-a2b2-44cbc9f637ef)_ ;

-   dispose de certificats SSL auto-signés, utilisez l’option **SSL** [_Full_](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057) ;

-   ne dispose d’aucun certificat SSL, utilisez l’option **SSL** [_Flexible_](https://support.cloudflare.com/hc/articles/200170416#h_4e0d1a7c-eb71-4204-9e22-9d3ef9ef7fef).

___

### Seuls certains de vos sous-domaines renvoient des erreurs SSL

**Symptôme**Les certificats [Universal SSL](https://support.cloudflare.com/hc/articles/204151138) et [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108) standard de Cloudflare ne couvrent que le domaine de niveau racine (_exemple.com_) et un niveau de sous-domaines (_\*.exemple.com_). Si les visiteurs de votre domaine constatent des erreurs lors de l’accès à un deuxième niveau de sous-domaines dans leur navigateur (tel que _dev.www.exemple.com_) mais pas au premier niveau de sous-domaines (tel que _www.exemple.com_), corrigez le problème en appliquant l’une des méthodes ci-dessous.

**Résolution**

-   Assurez-vous que le domaine figure au moins sur une offre Business Plan et chargez un [certificat SSL personnalisé](https://support.cloudflare.com/hc/articles/200170466) couvrant _dev.www.exemple.com_.
-   Achetez un [certificat Dedicated SSL avec des noms d’hôte personnalisés](https://support.cloudflare.com/hc/articles/228009108) couvrant _dev.www.exemple.com_.
-   Si vous disposez d’un certificat valide pour les sous-domaines de second niveau sur votre serveur Web d’origine, cliquez sur l’icône de nuage orange à côté du nom d’hôte _dev.www_ dans l’application **DNS** de Cloudflare pour _exemple.com_.

___

### Votre certificat Universal SSL de Cloudflare n’est pas actif

**Symptôme**

Un [certificat Universal SSL](https://support.cloudflare.com/hc/articles/204151138) est fourni pour chaque domaine Cloudflare actif. Si vous constatez des erreurs SSL et que vous n’avez pas de certificat de **Type** _Universal_ dans la section **Edge Certificates** de l’application **SSL/TLS** de Cloudflare pour votre domaine, alors le certificat Universal SSL n’a pas encore été configuré.

Nos fournisseurs SSL vérifient chaque demande de certificat SSL avant que Cloudflare puisse émettre un certificat pour un nom de domaine. Ce processus peut durer de 15 minutes à 24 heures. Nos fournisseurs de certificats SSL signalent parfois un nom de domaine pour une révision supplémentaire.

**Résolution**

-   activez Universal SSL dans l’application **SSL/TLS** de Cloudflare, ou
-   achetez un certificat [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108), ou
-   chargez un [certificat SSL personnalisé](https://support.cloudflare.com/hc/articles/200170466) sur Cloudflare.

Si votre certificat SSL Cloudflare n’est pas délivré dans les 24 heures suivant l’activation du domaine Cloudflare :

-   [mettez provisoirement Cloudflare en pause](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753) si votre serveur Web d’origine dispose d’un certificat SSL valide, et
-   [ouvrez un ticket auprès du support](https://support.cloudflare.com/hc/en-us/requests/new) pour fournir les informations suivantes :  
    -   Le nom de domaine affecté.
    -   Une capture d’écran des erreurs que vous observez.

En suspendant provisoirement Cloudflare, le trafic HTTPS sera correctement servi à partir de votre serveur Web d’origine pendant que l’équipe du support étudie le problème.

___

### Erreur de réponse OCSP

**Symptôme** Les visiteurs de votre site constatent une erreur de réponse OCSP.

**Résolution  
**  
Cette erreur est due à la version du navigateur ou à un problème nécessitant l’assistance de l’un des fournisseurs SSL de Cloudflare. Afin de diagnostiquer le problème correctement, [ouvrez un ticket auprès du support](https://support.cloudflare.com/hc/en-us/requests/new) avec les informations suivantes fournies par le visiteur qui rencontre l’erreur de navigateur :

1.  Le résultat de _[https://aboutmybrowser.com/](https://aboutmybrowser.com/)_
2.  Le résultat de la requête _https://exemple.com/cdn-cgi/trace_ à partir du navigateur du visiteur. Remplacez _exemple.com_ par le nom de domaine de votre site Web.

___

### SSL expiré ou erreurs d’incompatibilité SSL

**Symptôme  
**  
Les visiteurs constatent des messages d’erreur dans leur navigateur concernant l’expiration ou l’incompatibilité SSL.

**Résolution**

-   Le nom de domaine affecté.
-   Une capture d’écran des erreurs que vous observez.

___

## Ressources associées

-   [Erreurs de boucle de redirection](https://support.cloudflare.com/hc/articles/115000219871)
-   [Erreurs de contenu mixte](https://support.cloudflare.com/hc/articles/200170476)
