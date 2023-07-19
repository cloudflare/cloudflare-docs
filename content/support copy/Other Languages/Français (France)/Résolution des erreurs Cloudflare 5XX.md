---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX
title: Résolution des erreurs Cloudflare 5XX
---

# Résolution des erreurs Cloudflare 5XX

_Diagnostiquer et résoudre les erreurs 5XX pour les sites mis en proxy par Cloudflare._

### Dans cet article

-   [Aperçu](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#h_42ad57a0-3926-4162-b55e-c3a31864ea09)
-   [Analyse des erreurs](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#500error)
-   [Error 500 : internal server error](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#500error)
-   [Erreur 502 bad gateway ou erreur 504 gateway timeout](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#502504error)
-   [Error 503 : service temporarily unavailable](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#503error)
-   [Error 520 : le serveur web renvoie une erreur inconnue](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#520error)
-   [Erreur 521 : le serveur web est en panne](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#521error)
-   [Error 522 : connection timed out](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#522error)
-   [Error 523: origin is unreachable](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#523error)
-   [Error 524: a timeout occurred](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#524error)
-   [Erreur 525 : Échec de la négociation SSL](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#525error)
-   [Erreur 526 : certificat SSL invalide](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#526error)
-   [Erreur 527 : Erreur de Railgun Listener vers l'origine](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#527error)
-   [Error 530](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#530error)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-R%C3%A9solution-des-erreurs-Cloudflare-5XX#h_3ef3e669-ebcb-41e6-b688-e9ade0944392)

___

## Aperçu

Pour dépanner la plupart des erreurs 5XX, il faut d'abord contacter votre fournisseur d’hébergement ou l'administrateur du site pour dépanner et recueillir des données.

### Informations sur les erreurs à fournir à votre fournisseur d’hébergement

1.  Code et message d'erreur 5XX spécifique
2.  L'heure (avec le fuseau horaire) à laquelle l'erreur 5XX s'est produite
3.  L'URL qui a généré l'erreur HTTP 5XX (par exemple : _https://www.exemple.com/images/icons/image1.png_)

Les informations supplémentaires à fournir à votre fournisseur d'hébergement ou à l'administrateur du site sont indiquées dans chaque description d'erreur ci-dessous. Les [pages d'erreur personnalisées](https://support.cloudflare.com/hc/articles/200172706) de Cloudflare permettent de changer l'apparence des pages d'erreur par défaut dont il est question dans cet article.

___

## Analyse des erreurs

L'analyse des erreurs par domaine est disponible sur le portail de support de votre compte.  L'analyse des erreurs fournit des informations sur les erreurs générales par code d'erreur HTTP et fournit les URL, réponses, adresses IP de serveur d'origine et datacenters Cloudflare requis pour diagnostiquer et résoudre le problème.  L'analyse des erreurs repose sur un échantillon du trafic de 1 %.

Pour afficher l'analyse des erreurs :

-   Accédez au portail de support de Cloudflare.  Consultez les [instructions relatives au dépôt d'un ticket de support](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) pour obtenir plus d'informations sur la manière d'accéder au portail de support.
-   Faites défiler vers le bas jusqu'à la section **Error Analytics** (Analyse des erreurs).
-   Cliquez sur **Visit Error Analytics** (Consulter l'analyse des erreurs).
-   Saisissez le domaine à examiner.
-   Un graphique des erreurs au fil du temps (**Errors over time**) est affiché.
-   Cliquez sur le code de statut dans le tableau sous le graphique pour développer les détails des erreurs de trafic.

___

## Error 500 : internal server error

Une erreur 500 indique généralement un problème avec votre serveur web d'origine.  _Error establishing database_ _connection_ (Erreur lors de l'établissement de la connexion à la base de données) est un message d'erreur HTTP 500 courant généré par votre serveur web d'origine.  [Contactez votre hébergeur](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) pour le résoudre.

**Résolution**

[Donnez des informations détaillées à votre fournisseur d’hébergement](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) pour qu'il vous aide à résoudre le problème.

Cependant, si l'erreur 500 contient « cloudflare » ou « cloudflare-nginx » dans le corps de réponse HTML, fournissez les informations suivantes au [support Cloudflare](https://support.cloudflare.com/hc/articles/200172476) :

1.  Votre nom de domaine
2.  L'heure (avec le fuseau horaire) à laquelle l'erreur 500 s'est produite
3.  Le rapport de _www.exemple.com/cdn-cgi/trace_ depuis le navigateur où l'erreur 500 a été observée (remplacez _www.exemple.com_ par votre nom de domaine et votre nom d'hôte réels)

___

## Erreur 502 bad gateway ou erreur 504 gateway timeout

Une erreur HTTP 502 ou 504 se produit lorsque Cloudflare est incapable d'établir le contact avec votre serveur web d'origine.

Il existe deux causes possibles :

-   (Cause la plus courante) [502/504 depuis votre serveur web d'origine](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b)
-   [502/504 depuis Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_845d633d-0842-4315-9dd2-53185cc4e1de)

### 502/504 depuis votre serveur web d'origine :

Cloudflare renvoie une erreur HTTP 502 ou 504 mentionnant Cloudflare lorsque votre serveur web d'origine répond avec une erreur HTTP 502 bad gateway ou 504 gateway timeout standard :

![Exemple d'erreur 502 de marque Cloudflare.](/images/support/image1.png)

**Résolution**

Contactez votre fournisseur d’hébergement pour trouver la cause de ces problèmes sur votre serveur web d'origine :

-   Vérifiez que le serveur d'origine répond aux requêtes pour le nom d'hôte et le domaine dans l'URL du visiteur qui a généré l'erreur 502 ou 504.
-   Vérifiez la présence de charges de serveur excessives, de blocages (crashs) ou de pannes réseau.
-   Identifiez les applications ou les services qui ont expiré ou qui ont été bloqués.

### 502/504 depuis Cloudflare

Une erreur 502 ou 504 provenant de Cloudflare se présente comme suit :

![Exemple d'erreur 502 sans marque.](/images/support/image5.png)

Si l'erreur ne mentionne pas « cloudflare », contactez votre fournisseur d'hébergement pour obtenir de l'aide sur les [erreurs 502/504 depuis votre serveur d'origine](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b).

**Résolution**

Pour éviter de retarder le traitement de votre requête, veuillez fournir ces informations au [support Cloudflare](https://support.cloudflare.com/hc/articles/200172476) :

1.  L'heure (avec le fuseau horaire) à laquelle le problème est survenu.
2.  L'URL qui a généré la réponse HTTP 502 ou 504 (par exemple : _https://www.exemple.com/images/icons/image1.png_)
3.  La sortie résultant de la navigation vers _www.exemple.com/cdn-cgi/trace_ (remplacez _www.exemple.com_ par le nom de domaine et le nom d'hôte qui a causé l'erreur HTTP 502 ou 504)

___

## Error 503 : service temporarily unavailable

L'erreur HTTP 503 se produit lorsque votre serveur web d'origine est surchargé. Le message d'erreur peut indiquer deux causes possibles :

-   L’erreur ne contient pas « cloudflare » ou « cloudflare-nginx » dans le corps de la réponse HTML.

**Résolution** : contactez votre fournisseur d’hébergement pour vérifier s'il limite le débit des requêtes adressées à votre serveur web d'origine.

-   L’erreur contient « cloudflare » ou « cloudflare-nginx » dans le corps de la réponse HTML.

**Résolution** : un problème de connexion s'est produit dans un datacenter Cloudflare. Fournissez les informations suivantes au [support Cloudflare](https://support.cloudflare.com/hc/articles/200172476) :

1.  Votre nom de domaine
2.  L'heure (avec le fuseau horaire) à laquelle l'erreur 503 s'est produite
3.  Le rapport de _www.exemple.com/cdn-cgi/trace_ depuis le navigateur où l'erreur 503 a été observée (remplacez _www.exemple.com_ par votre nom de domaine et votre nom d'hôte réels)

___

## Error 520 : le serveur web renvoie une erreur inconnue

L'erreur 520 se produit lorsque le serveur d'origine renvoie une réponse vide, inconnue ou inattendue à Cloudflare.

**Résolution**

[Contactez votre fournisseur d’hébergement ou l'administrateur de votre site](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) et demandez-lui d'examiner les journaux d'erreurs de votre serveur web d'origine pour détecter les blocages (crashs) et pour voir s'ils sont attribuables aux causes courantes suivantes :

-   Crashs de l'application du serveur web d'origine
-   [Adresses IP de Cloudflare](https://www.cloudflare.com/ips) qui ne sont pas autorisées au niveau de votre serveur d'origine
-   En-têtes dépassant 16 Ko (généralement dus à un trop grand nombre de cookies)
-   Une réponse vide du serveur web d'origine qui n'a pas de code de statut HTTP ou de corps de réponse
-   En-têtes de réponse manquants ou serveur web d'origine ne renvoyant pas de [réponses d'erreur HTTP correctes](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)
    -   `upstream prematurely closed connection while reading response header from upstream` (le serveur en amont a mis fin de façon prématurée à la connexion lors de la lecture de l'en-tête de réponse depuis l'amont) est une erreur courante observable dans nos journaux. Elle indique des problèmes au niveau du serveur web d'origine qui ont fait que Cloudflare a généré des erreurs 520.

Si les erreurs 520 persistent après avoir contacté votre fournisseur d’hébergement ou l'administrateur du site, fournissez les informations suivantes au [support Cloudflare](https://support.cloudflare.com/hc/articles/200172476) :

-   URL(s) complète(s) de la ressource demandée lorsque l'erreur s'est produite
-   Cloudflare **cf-ray** depuis le message d'erreur 520
-   La sortie de _http://www.exemple.com/cdn-cgi/trace_ (remplacez _www.exemple.com_ par votre nom de domaine et votre nom d'hôte où l'erreur 520 s'est produite)
-   Deux [fichiers HAR](https://support.cloudflare.com/hc/articles/203118044) :
    -   un avec Cloudflare activé sur votre site web, et
    -   l'autre en ayant [temporairement désactivé Cloudflare](https://support.cloudflare.com/hc/articles/200169176).

___

## Erreur 521 : le serveur web est en panne

Une erreur 521 se produit quand le serveur web d’origine refuse les connexions de Cloudflare. Les dispositifs de sécurité de votre serveur d'origine peuvent bloquer des connexions légitimes provenant de certaines [adresses IP Cloudflare](https://www.cloudflare.com/ips).

Les deux causes les plus courantes des erreurs 521 sont les suivantes :

-   Application du serveur web d'origine hors ligne
-   Blocage des requêtes Cloudflare

**Résolution**

[Contactez l'administrateur de votre site ou votre fournisseur d’hébergement](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) pour éliminer ces causes courantes :

-   Vérifiez la réactivité de votre serveur web d'origine
-   Consultez les journaux d'erreurs du serveur web d'origine pour identifier les blocages (crashs) ou les pannes d'applications du serveur web.
-   Vérifiez que les [adresses IP Cloudflare](https://www.cloudflare.com/ips) ne sont pas bloquées ou limitées en débit.
-   Autorisez toutes les [plages d'adresses IP Cloudflare](https://www.cloudflare.com/ips) dans le pare-feu de votre serveur web d'origine ou tout autre logiciel de sécurité.
-   Vérifiez que — vous avez votre **mode SSL/TLS** défini sur **Full** or **Full (Strict**) — vous avez installé un [certificat d'origine Cloudflare](/ssl/origin-configuration/origin-ca)
-   Accédez à des informations de dépannage supplémentaires dans la [communauté Cloudflare](https://community.cloudflare.com/t/community-tip-fixing-error-521-web-server-is-down/42461).

___

## Error 522 : connection timed out

Une erreur 522 se produit lorsque Cloudflare dépasse le délai de connexion avec le serveur web d'origine. Deux dépassements de délai consécutifs provoquent l'erreur HTTP 522 en fonction du moment où ils se produisent entre Cloudflare et le serveur web d'origine :

1.  Avant qu'une connexion ne soit établie, le serveur web d'origine ne renvoie pas un SYN+ACK à Cloudflare dans les 15 secondes suivant l'envoi d'un SYN par Cloudflare.
2.  Une fois la connexion établie, le serveur web d'origine n'accuse pas réception (ACK) de la requête de ressource de Cloudflare dans les 90 secondes qui suivent.

**Résolution**

[Contactez votre fournisseur d’hébergement](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) pour vérifier les causes courantes suivantes sur votre serveur web d'origine :

-   (Cause la plus fréquente) Les [adresses IP de Cloudflare](https://www.cloudflare.com/ips/) sont limitées en débit ou bloquées dans .htaccess, les iptables ou dans les pare-feu. Vérifiez que votre fournisseur d’hébergement a bien autorisé les adresses IP Cloudflare.
-   Un serveur web d'origine surchargé ou hors ligne interrompt les requêtes entrantes.
-   Les [Keepalives](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html) sont désactivés sur le serveur web d'origine.
-   L'adresse IP d'origine de votre application **DNS** Cloudflare ne correspond pas à l'adresse IP actuellement allouée à votre serveur web d'origine par votre fournisseur d’hébergement.
-   Des paquets ont été abandonnés au niveau de votre serveur web d'origine.

Si vous utilisez [Cloudflare Pages](/pages/), vérifiez que vous avez un domaine personnalisé et que votre enregistrement CNAME pointe vers votre domaine Pages personnalisé. Des instructions sur la configuration d'un domaine Pages personnalisé sont disponibles [ici](/pages/getting-started#adding-a-custom-domain).

Si rien de ce qui précède ne permet de résoudre le problème, demandez les informations suivantes à votre fournisseur d’hébergement ou à l'administrateur du site avant de [contacter le support Cloudflare](https://support.cloudflare.com/hc/articles/200172476) :

-   Un [MTR ou traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) depuis votre serveur web d'origine vers une [adresse IP Cloudflare](http://www.cloudflare.com/ips) qui se connectait régulièrement à votre serveur web d'origine avant que le problème ne se produise. Identifiez une adresse IP de connexion Cloudflare enregistrée dans les journaux du serveur web d'origine.
-   Les détails des investigations au niveau du fournisseur d’hébergement, comme les journaux concernés ou les conversations avec celui-ci.

___

## Error 523: origin is unreachable

Les erreurs 523 se produisent lorsque Cloudflare ne parvient pas à contacter votre serveur web d'origine, ce qui arrive généralement lorsqu'un périphérique réseau entre Cloudflare et le serveur web d'origine ne peut pas accéder à l'adresse IP de l'origine.

**Résolution** [Contactez votre fournisseur d’hébergement](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) pour exclure les causes communes suivantes au niveau de votre serveur web d'origine :

-   Confirmez que l'adresse IP d'origine correcte est répertoriée pour les enregistrements A ou AAAA dans votre application DNS Cloudflare.
-   Dépannez les problèmes de routage Internet entre votre serveur d'origine et Cloudflare, ou avec le serveur d'origine lui-même.

Si rien de ce qui précède ne permet de résoudre le problème, demandez les informations suivantes à votre fournisseur d’hébergement ou à l'administrateur du site :

-   Un [MTR ou traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) depuis votre serveur web d'origine vers une [adresse IP Cloudflare](http://www.cloudflare.com/ips) qui se connectait communément à votre serveur web d'origine avant que le problème ne survienne. Identifiez une adresse IP de connexion Cloudflare à partir des journaux du serveur web d'origine.
-   Si vous utilisez Railgun via un partenaire d'hébergement Cloudflare, [contactez votre fournisseur d’hébergement](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) pour dépanner les erreurs 523.
-   Si c'est vous qui gérez votre installation Railgun, fournissez ce qui suit :
    -   Un [traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) vers votre serveur web d'origine depuis votre serveur Railgun.
    -   Le fichier syslog le plus récent de votre serveur Railgun.

___

## Error 524: a timeout occurred

Une erreur 524 indique que Cloudflare s’est connecté au serveur web d'origine, mais que le serveur d'origine n'a pas fourni de réponse HTTP avant que le timeout par défaut de 100s ait expiré. Cela peut se produire si le serveur d'origine est simplement trop lent parce qu'il doit effectuer trop de tâches, par exemple parce qu'il a reçu une requête de données volumineuse ou parce qu'il a du mal à récupérer des ressources et qu'il ne parvient pas à renvoyer les données à temps.

**Résolution**

Nous suggérons les options suivantes pour contourner cette erreur :

-   Vérifiez les processus HTTP les plus volumineux pour éviter de rencontrer cette erreur.
-   [Contactez votre fournisseur d’hébergement](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) pour exclure les causes courantes suivantes au niveau de votre serveur web d'origine :
    -   Un processus de longue durée se déroule sur le serveur web d'origine.
    -   Serveur web d’origine surchargé.

-   Les clients Enterprise peuvent augmenter le délai de l'erreur 524 jusqu'à 6000 secondes à l'aide du [point de terminaison d'API proxy\_read\_timeout](https://api.cloudflare.com/#zone-settings-change-proxy-read-timeout-setting).
-   Si vous lancez régulièrement des requêtes HTTP qui dépassent 100 secondes pour être complétées (comme des exportations de données volumineuses), déplacez ces processus derrière un sous-domaine non proxysé (en nuage gris) dans l'application **DNS** de Cloudflare.
-   Si l'erreur 524 se produit pour un domaine utilisant Cloudflare Railgun, vérifiez que le délai _lan.timeout_ est réglé plus haut que la valeur par défaut de 30 secondes et redémarrez le service railgun.

___

## Erreur 525 : Échec de la négociation SSL

Une erreur 525 indique que la négociation SSL entre Cloudflare et le serveur web d’origine a échoué. Les erreurs 525 se produisent lorsque ces deux conditions sont vraies :

1.  La [négociation SSL](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) entre Cloudflare et le serveur web d’origine a échoué, et
2.  [_Full_ ou _Full (Strict)_](/ssl/origin-configuration/ssl-modes) **SSL** est défini dans l'onglet **Overview** (Aperçu) de votre application Cloudflare **SSL/TLS**.

**Résolution**

[Contactez votre fournisseur d’hébergement](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe) pour exclure les causes courantes suivantes au niveau de votre serveur web d'origine :

-   Aucun certificat SSL valide n'est installé
-   Le port 443 (ou un autre port sécurisé personnalisé) n'est pas ouvert
-   Pas de prise en charge [SNI](https://support.cloudflare.com/hc/articles/360026016272)
-   Les [suites de chiffrement](/ssl/ssl-tls/cipher-suites) acceptées par Cloudflare ne correspondent pas aux suites de chiffrement prises en charge par le serveur web d'origine.

**Vérifications supplémentaires**

-   Vérifiez si vous avez un certificat installé sur votre serveur d'origine. Vous pouvez consulter [cet article](https://support.cloudflare.com/hc/fr-fr/articles/203118044-Gathering-information-for-troubleshooting-sites#h_0c7f48b3-fc29-4266-8c63-477fe61a11c4) pour en savoir plus sur la procédure pour exécuter certains tests. Si vous n'avez aucun certificat, vous pouvez créer et installer notre [certificat CA d'origine Cloudflare](/ssl/origin-configuration/origin-ca) gratuit. L'utilisation de certificats Cloudflare Origin CA vous permet de chiffrer le trafic entre Cloudflare et votre serveur web d’origine.
-   [Vérifiez les suites de chiffrement](/ssl/ssl-tls/cipher-suites) qu'utilise votre serveur pour vous assurer qu'elles correspondent à ce que prend en charge Cloudflare.
-   Vérifiez les journaux d'erreurs de votre serveur à partir des moments où ont été relevées des erreurs 525 pour vérifier la présence de problèmes qui pourraient entraîner une réinitialisation de la connexion lors de la négociation SSL.

___

## Erreur 526 : certificat SSL invalide

Les erreurs 526 se produisent lorsque ces deux conditions sont vraies :

1.  Cloudflare ne parvient pas à valider le certificat SSL sur votre serveur web d'origine, et
2.  [_Full SSL (Strict)_](/ssl/origin-configuration/ssl-modes#full-strict) **SSL** est défini dans l'onglet **Overview** (Aperçu) de votre application Cloudflare **SSL/TLS**.

**Résolution**

Demandez à votre administrateur de serveur ou à votre hébergeur de vérifier les certificats SSL du serveur web d'origine et de vérifier que :

-   Le certificat n'a pas expiré
-   Le certificat n'est pas révoqué
-   Le certificat est signé par une [Autorité de certification](https://support.cloudflare.com/hc/articles/360026016272) (et non auto-signé).
-   Le nom de domaine demandé ou cible et le nom d'hôte sont dans la configuration **Common Name** ou **Subject Alternative Name** (SAN) du certificat.
-   Votre serveur web d'origine accepte les connexions via le port SSL 443
-   [Mettez temporairement en pause Cloudflare](https://support.cloudflare.com/hc/articles/200169176) et consultez [https://www.sslshopper.com/ssl-checker.html#hostname=www.exemple.com](https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com) (remplacez www.exemple.com par votre nom d'hôte et votre domaine) pour vérifier qu'aucun problème n’existe avec le certificat SSL d'origine :

![Écran affichant un certificat SSL sans erreur.](/images/support/hc-import-troubleshooting_5xx_errors_sslshopper_output.png)

Si le serveur d'origine utilise un certificat auto-signé, configurez le domaine pour utiliser _Full_ _SSL_ au lieu de _Full SSL (Strict)_. Consultez les [paramètres SSL recommandés pour votre serveur d'origine](/ssl/origin-configuration/ssl-modes).

___

## Erreur 527 : Erreur de Railgun Listener vers l'origine

Une erreur 527 indique une connexion interrompue entre Cloudflare et le [serveur Railgun de votre origine (rg-listener)](https://support.cloudflare.com/hc/articles/200168406). Les causes les plus courantes sont les suivantes :

-   Interférence avec le pare-feu
-   Incidents réseau ou perte de paquets entre le serveur Railgun et Cloudflare

Les causes les plus fréquentes des erreurs 527 sont les suivantes :

-   [Délais de connexion](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c559b9e5-a342-47ed-bfae-66e10e42aade)
-   [Délai de connexion LAN dépassé](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_f8e4890c-9459-4c9a-a4ab-e9b44fa16dbf)
-   [Refus de connexion](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_2e3e4251-3642-4fce-bbcf-1a45bb2b2c11)
-   [Erreurs relatives à TLS/SSL](https://support.cloudflare.com/hc/fr-fr/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c30fe02c-98f2-4cbf-af8c-bafa9b4f5b8f)

Si vous contactez le support Cloudflare, fournissez les informations suivantes de Railgun Listener :

-   Le contenu complet du fichier _railgun.conf_ 
-   Le contenu complet du fichier _railgun-nat.conf_ 
-   Les fichiers journaux Railgun qui décrivent en détail les erreurs observées

### Délais de connexion

Les erreurs de journal Railgun suivantes indiquent une panne de connexion entre le Railgun Listener et votre serveur web d'origine :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/exemple.com: dial tcp 0.0.0.0:443: i/o timeout</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">no response from origin (timeout) 0.0.0.0:80/exemple.com</span></div></span></span></span></code></pre>{{</raw>}}

**Résolution**

Contactez votre hébergeur pour qu'il vérifie les problèmes de connexion entre votre serveur web d'origine et votre Railgun Listener. Par exemple, la commande netcat teste la connectivité lorsqu'elle est exécutée depuis le Railgun Listener vers le _SERVERIP_ et le _PORT_ (80 pour HTTP ou 443 pour HTTPS) du serveur web d'origine :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nc -vz SERVERIP PORT</span></div></span></span></span></code></pre>{{</raw>}}

### Délai de connexion LAN dépassé

Le journal d'erreur Railgun Listener suivant est généré si le serveur web d'origine n'envoie pas de réponse HTTP au Railgun Listener dans le délai de 30 secondes alloué par défaut :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  connection failed 0.0.0.0:443/example.com: dial tcp 0.0.0.0:443: i/o timeout</span></div></span></span></span></code></pre>{{</raw>}}

La durée est définie par le paramètre lan.timeout du fichier railgun.conf.

**Résolution**

Augmentez le délai _lan.timeout_ dans _railgun.conf_, ou vérifiez la configuration du serveur web. Contactez votre hébergeur pour vérifier si le serveur web d'origine est surchargé.

### Refus de connexion

Les erreurs suivantes apparaissent dans les journaux Railgun lorsque les requêtes de Railgun Listener sont refusées :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Error getting page: dial tcp 0.0.0.0:80:connection refused</span></div></span></span></span></code></pre>{{</raw>}}

**Résolution**

Autorisez l'adresse IP de votre Railgun Listener au niveau du pare-feu de votre serveur web d'origine.

### Erreurs relatives à TLS/SSL

Les erreurs suivantes apparaissent dans les journaux Railgun si les connexions TLS échouent :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/exemple.com: remote error: handshake failure</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/exemple.com: dial tcp 0.0.0.0:443:connection refused</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 127.0.0.1:443/www.exemple.com: x509: certificate is valid for</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemple.com, not www.exemple.com</span></div></span></span></span></code></pre>{{</raw>}}

**Résolution**

Si des erreurs TLS/SSL se produisent, vérifiez les points suivants sur le serveur web d'origine et veillez à ce que :

-   Le port 443 soit ouvert
-   Un certificat SSL soit présenté par le serveur web d'origine
-   le SAN ou le Nom Commun du certificat SSL du serveur web d'origine contient le nom d'hôte demandé ou cible
-   **SSL** est défini sur [Full ou Full (Strict)](/ssl/origin-configuration/ssl-modes) dans l'onglet **Overview** (Aperçu) de l'application Cloudflare **SSL/TLS**.

___

## Error 530

L'erreur HTTP 530 est renvoyée accompagnée d'une erreur 1016. Recherchez l'[erreur 1XXX spécifique dans le centre d'aide de Cloudflare](https://support.cloudflare.com/hc/sections/200820298) pour des informations sur le dépannage.

___

## Ressources associées

-   [Recueillir les informations nécessaires pour dépanner les problèmes relatifs aux sites](https://support.cloudflare.com/hc/fr-fr/articles/203118044)
-   [Contacter le support Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Personnalisation des pages d’erreur de Cloudflare](https://support.cloudflare.com/hc/articles/200172706)
-   [Diagnostic et utilisation de MTR/traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)
-   [Conseils de la communauté Cloudflare](https://community.cloudflare.com/tag/communitytip)
