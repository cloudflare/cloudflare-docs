---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX
title: Résolution des erreurs Cloudflare 1XXX
---

# Résolution des erreurs Cloudflare 1XXX

_Diagnostic et résolution des erreurs 1XXX pour les sites traités en proxy par Cloudflare_

### Dans cet article

-   [Aperçu](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#h_e6ba4204-ab4f-464b-afdc-e8177e418e34)
-   [Error 1000: DNS points to prohibited IP](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1000)
-   [Error 1001: DNS resolution error](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1001)
-   [Error 1002: DNS points to Prohibited IP](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1002a)
-   [Error 1002: Restricted](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1003)
-   [Error 1003 Access Denied: Direct IP Access Not Allowed](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1003)
-   [Error 1004: Host Not Configured to Serve Web Traffic](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1004)
-   [Erreurs 1006, 1007, 1008 ou 1106 Accès refusé : Votre adresse IP a été bloquée](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error100610071008)
-   [Erreurs 1009 Accès refusé : pays ou région exclu(e)](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#h_1FIuVf9XCVpeBz8Cn6B0Fj)
-   [Error 1010: The owner of this website has banned your access based on your browser's signature](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1010)
-   [Error 1011: Access Denied (Hotlinking Denied)](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1011)
-   [Error 1012: Access Denied](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1012)
-   [Error 1013: HTTP hostname and TLS SNI hostname mismatch](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1013)
-   [Error 1014: CNAME Cross-User Banned](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1014)
-   [Error 1015: You are being rate limited](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1015)
-   [Error 1016: Origin DNS error](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1016)
-   [Error 1018: Could not find host](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1018)
-   [Error 1019: Compute server error](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1019)
-   [Error 1020: Access denied](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1020)
-   [Error 1023: Could not find host](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1023)
-   [Error 1025: Please check back later](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1025)
-   [Error 1033: Argo Tunnel error](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#h_W81O7hTPalZtYqNYkIHgH)
-   [Error 1034: Edge IP Restricted](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#h_4eD6Gcxp4zQqS4ciCJaLt0)
-   [Erreur 1035 : Réécriture de requête invalide (chemin URI non valide)](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1035)
-   [Erreur 1036 : Réécriture de requête invalide (longueur maximale dépassée)](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1036)
-   [Erreur 1037 : Règle de réécriture non valide (l'expression n'a pas été évaluée)](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1037)
-   [Erreur 1040 : Réécriture de requête non valide (modification d'en-tête non autorisée)](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1040)
-   [Erreur 1041 : Réécriture de requête non valide (valeur d'en-tête non valide)](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1041)
-   [Error 1101: Rendering error](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1101)
-   [Error 1102: Rendering error](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1102)
-   [Erreur 1104 : une variante de cette adresse e-mail est déjà utilisée dans notre système. Une seule variante est autorisée.](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#error1104)
-   [Error 1200: Cache connection limit](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#h_302a97f3-eba3-4c0a-a589-76ba95f60dcf)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/360029779472-R%C3%A9solution-des-erreurs-Cloudflare-1XXX#h_80755d09-43f2-4656-b1f9-2989196b30a6)

___

## Aperçu

Les erreurs décrites dans ce document peuvent se produire lorsque vous consultez un site web traité en proxy par Cloudflare. Pour les erreurs de l’API ou du tableau de bord Cloudflare, consultez la [documentation de l'API Cloudflare](https://api.cloudflare.com/). Les erreurs HTTP 409, 530, 403, 429 sont les codes d'erreur HTTP renvoyés dans l'en-tête de statut HTTP pour une réponse. Les erreurs 1XXX apparaissent dans le corps HTML de la réponse.

Si les procédures de résolution de chaque description d'erreur ci-dessous ne permettent pas de remédier à l'erreur, [contactez le support Cloudflare](https://support.cloudflare.com/hc/articles/200172476).

___

## Error 1000: DNS points to prohibited IP

### Causes courantes

Cloudflare a arrêté la requête pour l'une des raisons suivantes :

-   Dans votre application DNS Cloudflare, un enregistrement A renvoie à une [adresse IP de Cloudflare](https://www.cloudflare.com/ips/), ou l'origine de Load Balancer renvoie à un enregistrement proxy.
-   Votre enregistrement Cloudflare DNS A ou CNAME renvoie vers un autre proxy inverse (tel qu'un serveur web nginx utilisant la fonction proxy\_pass), qui traite ensuite en proxy une deuxième fois la requête transmise à Cloudflare.
-   L'en-tête de la requête X-Forwarded-For dépasse 100 caractères.
-   La requête inclut deux en-têtes X-Forwarded-For.
-   Un problème ou une incompatibilité d'indication du nom du serveur (SNI) à l'origine.

### Résolution

-   Si un enregistrement A dans votre application Cloudflare DNS renvoie vers une [adresse IP de Cloudflare](https://www.cloudflare.com/ips/), mettez à jour l'adresse IP vers celle de votre serveur web d'origine.
-   Un proxy inverse au niveau de votre serveur d'origine renvoie la requête par l'intermédiaire du proxy Cloudflare. Au lieu d'utiliser un proxy inverse, contactez votre hébergeur ou votre administrateur de site pour configurer une redirection HTTP au niveau de votre serveur d'origine.

___

## Error 1001: DNS resolution error

### Causes courantes

-   Une requête web a été envoyée à une adresse IP Cloudflare pour un domaine Cloudflare inexistant.
-   Un domaine externe qui n'utilise pas Cloudflare comporte un enregistrement CNAME renvoyant vers un domaine actif sur Cloudflare.
-   La cible de l'enregistrement DNS CNAME n'est pas résolue.
-   Un enregistrement CNAME dans votre application Cloudflare DNS nécessite une résolution via un fournisseur DNS actuellement hors ligne.
-   L'option [Always Online](/cache/how-to/always-online/) (Toujours en ligne) est activée pour un domaine [Custom Hostnames (SSL for SaaS](/ssl/ssl-for-saas)).

### Résolution

Un domaine hors de Cloudflare ne peut pas comporter un enregistrement CNAME renvoyant vers un domaine Cloudflare, sauf si le domaine hors de Cloudflare a été ajouté à un compte Cloudflare.

Toute tentative d'accéder directement aux enregistrements DNS utilisés dans les [configurations CNAME de Cloudflare](/dns/zone-setups/partial-setup) entraîne également une erreur 1001 (exemple : _www.exemple.com.cdn.cloudflare.net_).

Désactivez [Always Online](/cache/how-to/always-online/#enable-always-online) (Toujours en ligne) si vous utilisez [Custom Hostnames (SSL for SaaS)](/ssl/ssl-for-saas).

___

## Error 1002: DNS points to Prohibited IP

### Causes courantes

-   Un enregistrement DNS dans votre application Cloudflare DNS renvoie vers l'une des [adresses IP de Cloudflare](https://www.cloudflare.com/ips/).
-   Une cible incorrecte est spécifiée pour un enregistrement CNAME dans votre application Cloudflare DNS.
-   Votre domaine n'est pas sur Cloudflare, mais comporte un enregistrement CNAME qui renvoie vers un domaine Cloudflare.

### Résolution

Mettez à jour votre _enregistrement A_ ou _CNAME_ Cloudflare afin qu'il renvoie vers l'adresse IP de votre point d'origine plutôt que vers une adresse IP Cloudflare :

1.  Contactez votre hébergeur pour confirmer votre adresse IP d'origine ou la cible de votre enregistrement CNAME.
2.  Connectez-vous à votre compte Cloudflare.
3.  Sélectionnez le domaine qui génère l'erreur 1002.
4.  Sélectionnez l'application **DNS**.
5.  Cliquez sur la mention **Valeur** de l'enregistrement _A_ à mettre à jour.
6.  Mettez à jour l'enregistrement _A_.

Pour vous assurer que votre serveur web d'origine ne traite pas en proxy ses propres requêtes via Cloudflare, configurez votre serveur web d'origine pour résoudre votre domaine Cloudflare vers :

-   L'adresse IP interne via NAT, ou
-   L'adresse IP publique du serveur web d'origine.

___

## Error 1002: Restricted

### Cause courante

Le domaine Cloudflare est résolu vers une adresse IP locale ou non autorisée ou une adresse IP non associée au domaine.

### Résolution

Si vous êtes propriétaire du site web :

1.  Confirmez les adresses IP de votre serveur web d'origine auprès de votre hébergeur,
2.  Connectez-vous à votre compte Cloudflare et
3.  Mettez à jour les enregistrements A dans l'application Cloudflare DNS vers l'adresse IP confirmée par votre hébergeur.

___

## Error 1003 Access Denied: Direct IP Access Not Allowed

### Cause courante

Un client ou un navigateur accède directement à une [<br />adresse IP de Cloudflare](https://www.cloudflare.com/ips).

### Résolution

Naviguez jusqu'au nom de domaine du site web dans votre URL au lieu de l'adresse IP de Cloudflare.

___

## Error 1004: Host Not Configured to Serve Web Traffic

### Causes courantes

-   L'équipe de Cloudflare a désactivé le traitement par proxy pour le domaine en raison d'abus ou de violations des conditions de service.
-   Les modifications apportées au DNS ne se sont pas encore propagées ou les _enregistrements DNS A_ du propriétaire du site renvoient vers des [adresses IP Cloudflare](https://www.cloudflare.com/ips).

### Résolution

Si le problème perdure au-delà de 5 minutes, [contactez le support Cloudflare](https://support.cloudflare.com/hc/articles/200172476).

___

## Erreurs 1006, 1007, 1008 ou 1106 Accès refusé : Votre adresse IP a été bloquée

### Causes courantes

Un client Cloudflare a bloqué le trafic provenant de votre client ou de votre navigateur.

### Résolution

Demandez au propriétaire du site web de vérifier ses paramètres de sécurité de Cloudflare ou d'autoriser l'adresse IP de votre client. Étant donné que le propriétaire du site web a bloqué votre requête, le support Cloudflare ne peut pas contourner les paramètres de sécurité d'un client.

___

## Erreurs 1009 Accès refusé : pays ou région exclu(e)

### Causes courantes

Le propriétaire du site web (p. ex. exemple.com) a interdit l'accès au site web au pays ou à la région où se situe votre adresse IP.

### Résolution

Vérifiez que votre adresse IP est autorisée dans la fonctionnalité de sécurité [IP Access Rules](https://support.cloudflare.com/hc/fr-fr/articles/217074967-Configuring-IP-Access-Rules).

___

## Error 1010: The owner of this website has banned your access based on your browser's signature

### Cause courante

Le propriétaire d'un site web a bloqué votre demande sur la base du navigateur web de votre client.

### Résolution

Avertissez le propriétaire du site web au sujet du blocage. Si vous ne parvenez pas à déterminer comment contacter le propriétaire du site web, consultez les coordonnées du domaine sur la [base de données Whois](https://whois.icann.org/en/lookup). Les propriétaires de site désactivent la **Vérification** **de l'intégrité du navigateur** par l'intermédiaire de l'onglet **Paramètres** de l'application **Pare-feu**.

___

## Error 1011: Access Denied (Hotlinking Denied)

### Cause courante

Une requête concerne une ressource utilisant [Cloudflare Hotlink Protection](https://support.cloudflare.com/hc/articles/200170026).

### Résolution

Avertissez le propriétaire du site web au sujet du blocage. Si vous ne parvenez pas à déterminer comment contacter le propriétaire du site web, consultez les coordonnées du domaine sur la [base de données Whois](https://whois.icann.org/en/lookup).La gestion de la **protection Hotlink** s'effectue à l'aide de l'application **Scrape Shield** de Cloudflare.

___

## Error 1012: Access Denied

### Cause courante

Un propriétaire de site web interdit l'accès en raison d'une activité malveillante détectée sur l'ordinateur ou le réseau du visiteur (ip\_address). La cause la plus probable est l'infection de l'ordinateur du visiteur par un virus ou un logiciel malveillant.

### Résolution

Mettez à jour votre antivirus et effectuez une analyse complète du système. Cloudflare ne peut pas substituer les paramètres de sécurité définis pour le domaine par le propriétaire du site. Pour demander l'accès au site web, contactez le propriétaire du site pour qu'il autorise votre adresse IP. Si vous ne parvenez pas à déterminer comment contacter le propriétaire du site web, consultez les coordonnées du domaine sur la [base de données Whois](https://whois.icann.org/en/lookup).

___

## Error 1013: HTTP hostname and TLS SNI hostname mismatch

### Cause courante

Le nom d'hôte envoyé par le client ou le navigateur via [Server Name Indication](/fundamentals/glossary#server-name-indication-sni) (SNI) ne correspond pas à l'en-tête de l’hôte de la requête.

### Résolution

L'erreur 1013 est généralement due aux causes suivantes :

-   Configuration d'un en-tête Host incorrect dans le SNI par le navigateur local, ou
-   Défaut de correspondance entre le SNI et l'en-tête Host de la requête dû à un réseau traitant le trafic SSL par proxy.

Recherchez un éventuel défaut de correspondance du SNI avec un outil en ligne tel que [SSL Shopper](https://www.sslshopper.com/ssl-checker.html).

Contactez le support Cloudflare et fournissez les informations suivantes :

1.  Un [fichier HAR](https://support.cloudflare.com/hc/articles/203118044) enregistré lors de la duplication de l’erreur

___

## Error 1014: CNAME Cross-User Banned

### Cause courante

Par défaut, Cloudflare interdit l'_enregistrement DNS CNAME_ entre les domaines de différents comptes Cloudflare. Les _enregistrements CNAME_ sont autorisés au sein d'un domaine (CNAME _www.exemple.com_ vers _api.exemple.com_) et entre les zones du même compte utilisateur (CNAME _www.exemple.com_ vers _www.exemple.net_) ou à l'aide de la solution [Cloudflare pour SaaS](https://www.cloudflare.com/saas/).

### Résolution

Pour permettre la résolution d'un enregistrement CNAME vers un domaine compris au sein d'un autre compte Cloudflare, le propriétaire du domaine du CNAME cible doit utiliser [Cloudflare pour SaaS](https://www.cloudflare.com/saas/), et plus spécifiquement notre solution [SSL pour SaaS](/ssl/ssl-for-saas/).

___

## Error 1015: You are being rate limited

### Cause courante

Le propriétaire du site a déployé une règle [Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) qui affecte le trafic de vos visiteurs.

### Résolution

-   Si vous êtes un visiteur du site, contactez le propriétaire du site pour demander l'exclusion de votre adresse IP de la règle Rate Limiting.
-   Si vous êtes le propriétaire du site, [vérifiez les seuils de Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) et ajustez la configuration de votre règle Rate Limiting.
-   Si votre règle Rate Limiting bloque les requêtes dans un intervalle court (par exemple, 1 seconde), essayez d'augmenter cet intervalle à 10 secondes.

___

## Error 1016: Origin DNS error

### Cause courante

Cloudflare ne peut pas résoudre l'adresse IP du serveur web d'origine.

Les causes courantes de l’erreur 1016 sont les suivantes :

-   Un _enregistrement DNS A_ manquant mentionne l'adresse IP du point d'origine.
-   Un _enregistrement CNAME_ compris au sein du DNS de Cloudflare renvoie vers un domaine externe impossible à résoudre.
-   Les noms d’hôte d’origine (CNAME) de vos pools Cloudflare [Load Balancing](/load-balancing/) par défaut, régional et de secours ne peuvent pas être résolus. Utilisez un pool de secours configuré avec une adresse IP de serveur d'origine qui vous servira de pool de secours au cas où tous les autres pools seraient indisponibles.
-   Lorsque vous créez une application Spectrum avec un CNAME en tant que point d'origine, vous devez d'abord créer un CNAME renvoyant vers l'origine du côté du DNS de Cloudflare. Veuillez consulter l'article [Enregistrements CNAME en tant qu'origine dans Spectrum](/spectrum/how-to/cname-origins) pour plus de détails.

### Résolution

Pour résoudre l'erreur 1016 :

1.  Vérifiez que vos paramètres DNS Cloudflare incluent un _enregistrement A_ renvoyant vers une adresse IP valide permettant la résolution à l'aide d'un [outil de recherche DNS](https://dnschecker.org/).
2.  Pour un enregistrement CNAME qui pointe vers un autre domaine, assurez-vous que le domaine cible peut être résolu via un [outil de recherche DNS](https://dnschecker.org/).

___

## Error 1018: Could not find host

### Causes courantes

-   Le domaine Cloudflare a été récemment activé, et la propagation des paramètres du domaine vers le réseau périphérique de Cloudflare comporte un délai.
-   Le domaine Cloudflare a été créé via un partenaire Cloudflare (par exemple, un fournisseur d’hébergement) et le serveur DNS du fournisseur a subi une panne.

### Résolution

Contactez le [support Cloudflare](https://support.cloudflare.com/hc/articles/200172476) en fournissant les informations suivantes :

1.  Votre nom de domaine
2.  Une capture d'écran de l'erreur 1018 incluant le **RayID** mentionné dans le message d'erreur
3.  L'heure (avec le fuseau horaire) à laquelle s'est produite l'erreur 1018

___

## Error 1019: Compute server error

### Cause courante

Un script Cloudflare Workers renvoie à lui-même de manière récursive.

### Résolution

Vérifiez que votre script Cloudflare Workers n'accède pas à une URL qui appelle le même script de Workers.

___

## Error 1020: Access denied

### Cause courante

Un client ou un navigateur est bloqué par les règles de pare-feu d'un client Cloudflare.

### Résolution

Si vous n'êtes pas le propriétaire du site web, joignez une capture d'écran du message d'erreur 1020 que vous avez reçu.

Si vous êtes le propriétaire du site :

1.  Procurez-vous une capture d'écran de l'erreur 1020 auprès de votre client
2.  Dans le journal des [**Événements du pare-feu**](/waf/analytics) situé dans l'onglet **Vue d'ensemble** de votre application **Pare-feu** Cloudflare, recherchez le **RayID** ou l'adresse IP du client figurant dans le message d'erreur 1020 du visiteur.

3. Déterminez la cause du blocage et mettez à jour la **règle de pare-feu** ou autorisez l'adresse IP du visiteur dans les [**IP Access Rules**](https://support.cloudflare.com/hc/articles/217074967) (Règles d'accès en fonction de l'adresse IP).

___

## Error 1023: Could not find host

### Causes courantes

-   Si vous venez de souscrire une offre Cloudflare, il peut s'écouler quelques minutes avant que les informations du site web ne soient communiquées à notre réseau global. Il y a un problème avec la configuration du site.
-   En général, cette situation apparaît lorsque des comptes ont été activés auprès d'une organisation partenaire (par exemple, un fournisseur d'hébergement) et que le serveur DNS du fournisseur subit une panne.

### Résolution

Contactez le [support Cloudflare](https://support.cloudflare.com/hc/articles/200172476) en fournissant les informations suivantes :

1.  Votre nom de domaine
2.  Une capture d'écran de l'erreur 1023 incluant le **RayID** mentionné dans le message d'erreur
3.  L'heure (avec le fuseau horaire) à laquelle s'est produite l'erreur 1023

___

## Error 1025: Please check back later

### Cause courante

Une requête n'est pas traitée parce que le domaine a atteint les [limites de l'offre pour Cloudflare Workers](/workers/platform/limits).

### Résolution :

Souscrivez l'offre Unlimited Workers depuis la page [Plans](https://dash.cloudflare.com/redirect?account=workers/plans) (Offres) du tableau de bord Workers.

___

## Error 1033: Argo Tunnel error

### Cause courante

Vous avez demandé une page d'un site web (`tunnel.example.com`) figurant sur le réseau Cloudflare. L'hôte (`tunnel.example.com`) est configuré sous forme de tunnel Argo et Cloudflare s'avère actuellement incapable de le résoudre.

### Résolution

-   **Si vous êtes un visiteur de ce site web** : veuillez réessayer dans quelques minutes.
-   **Si vous êtes le propriétaire de ce site web** : assurez-vous que _cloudflared_ est en cours d'exécution et qu'il peut atteindre le réseau. Vous devrez peut-être activer [Load Balancing](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb) pour votre tunnel.

___

## Error 1034: Edge IP Restricted

### Cause courante

Les clients ayant précédemment pointé leur domaines vers `1.1.1.1` feront désormais face à une **erreur 1034**. Elle est due à une nouvelle vérification de la validation en périphérie dans les systèmes Cloudflare qui empêche toute mauvaise configuration et/ou tout abus potentiel.

### Résolution

Vérifiez que les enregistrements DNS pointent vers des adresses IP que vous contrôlez, et dans le cas où une adresse IP réservée est nécessaire dans le cadre de configurations "sans origine", utilisez l'adresse IPv6 réservée `100::` ou l'adresse IPv4 réservée `192.0.2.0`.

___

## Erreur 1035 : Réécriture de requête invalide (chemin URI non valide)

### Cause courante

La valeur ou l'expression de votre chemin URI réécrit n'est pas valide.

Cette erreur se produit également lorsque la destination de la réécriture d'URL est un chemin placé après `/cdn-cgi/`.

### Résolution

Veillez à ce que le chemin URI réécrit ne soit pas vide et qu'il commence par `/` (barre oblique).

Par exemple, l'expression de réécriture de chemin URI suivante n'est pas valide :

`concat(lower(ip.geoip.country), http.request.uri.path)`

Pour corriger l'expression ci-dessus, ajoutez un préfixe `/` :

`concat("/", lower(ip.geoip.country), http.request.uri.path)`

___

## Erreur 1036 : Réécriture de requête invalide (longueur maximale dépassée)

### Cause courante

La valeur ou l'expression de votre chemin URI réécrit ou de votre chaîne de requête est trop longue.

### Résolution

Indiquez une valeur ou une expression plus courte dans la nouvelle valeur du chemin URI/ de la chaîne de requête.

___

## Erreur 1037 : Règle de réécriture non valide (l'expression n'a pas été évaluée)

### Cause courante

L'expression de la règle de réécriture n'a pas pu être évaluée. Cette erreur peut avoir différentes origines, mais elle peut signifier qu'un élément de l'expression contenait une valeur non définie au moment de son évaluation.

Par exemple, vous obtiendrez une erreur 1037 lorsque vous utiliserez l'expression dynamique de réécriture d'URL suivante et que l'en-tête `X-Source` n'est pas inclus dans la requête :

`http.request.headers["x-source"][0]`

### Résolution

Vérifiez que tous les éléments de votre expression de réécriture sont correctement définis. Par exemple, si vous renvoyez à une valeur d'en-tête, vérifiez que l'en-tête est défini.

___

## Erreur 1040 : Réécriture de requête non valide (modification d'en-tête non autorisée)

### Cause courante

Vous essayez de modifier un en-tête HTTP que les règles de modification des en-têtes des requêtes HTTP ne peuvent pas modifier.

### Résolution

Vérifiez que vous n'êtes pas en train d'essayer de modifier l'un des [en-têtes de requête HTTP réservés](/rules/transform#http-request-header-modification-rules).

___

## Erreur 1041 : Réécriture de requête non valide (valeur d'en-tête non valide)

### Causes courantes

La valeur d'en-tête ajoutée/modifiée est vide, trop longue ou contient des caractères interdits.

### Résolution

-   Définissez la valeur de l'en-tête au moyen d'une valeur ou d'une expression plus courte.
-   Supprimez les caractères interdits. Consultez la rubrique [Format des noms et valeurs des en-têtes de requête HTTP](/rules/transform/create-header-modification-rule#format-of-http-request-header-names-and-values) dans la documentation destinée aux développeurs pour savoir quels sont les caractères autorisés.

___

## Error 1101: Rendering error

### Cause courante

Un script Cloudflare Workers lance une exception de runtime JavaScript.

### Résolution :

[Fournissez des informations détaillées concernant le problème](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16) au support Cloudflare.

___

## Error 1102: Rendering error

### Cause courante

Un script Cloudflare Workers dépasse une [limite de temps d'utilisation du processeur](/workers/observability/log-from-workers/#identifying-and-handling-errors-and-exceptions). Le temps d'utilisation du processeur est le temps d'exécution du code (par exemple, boucles, analyse JSON, etc.). Le temps consacré aux requêtes réseau (obtention, réponse) n’est pas pris en compte dans la durée d'utilisation du processeur.

### Résolution

Contactez le développeur de votre code Workers pour optimiser le code afin de réduire l'utilisation du processeur dans les scripts Workerss actifs.

___

## Erreur 1104 : une variante de cette adresse e-mail est déjà utilisée dans notre système. Une seule variante est autorisée.

### Cause courante

Cette erreur peut survenir si une adresse e-mail similaire à celle que vous tentez d'ajouter a déjà été ajoutée. Par exemple, _mon+utilisateur@exemple.com_ et _mon.utilisateur@exemple.com_ sont traitées comme des adresses identiques dans notre système.

### Résolution

Connectez-vous avec les anciennes informations d'identification utilisateur et modifiez l'adresse e-mail en recourant à une adresse « jetable », qui libèrera la nouvelle adresse.

___

## Error 1200: Cache connection limit

### Cause courante

Le réseau périphérique de Cloudflare comporte trop de requêtes en attente de traitement par votre serveur web d'origine. Cette limite protège les systèmes de Cloudflare.

### Résolution

Configurez votre serveur web d'origine pour qu'il accepte plus rapidement les connexions entrantes. Ajustez vos paramètres de mise en cache pour améliorer les taux de lecture du cache, afin de réduire le nombre de requêtes parvenant à votre serveur Web d'origine. Contactez votre fournisseur d’hébergement ou votre administrateur web pour obtenir de l’aide.

___

## Ressources associées

-   [Contacter le support Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Personnalisation des pages d’erreur de Cloudflare](https://support.cloudflare.com/hc/articles/200172706)
