---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360017421192-FAQ-sur-les-enregistrements-DNS-de-Cloudflare
title: FAQ sur les enregistrements DNS de Cloudflare
---

# FAQ sur les enregistrements DNS de Cloudflare

### Comment puis-je en savoir plus sur les DNS ?

Veuillez consulter la [documentaion DNS du Centre d’apprentissage de Cloudflare](https://www.cloudflare.com/learning/dns/what-is-dns/).

___

### Cloudflare est-il un fournisseur de service DNS (serveur de noms de domaine) gratuit ?

Cloudflare offre des [services DNS gratuits](https://www.cloudflare.com/dns) aux clients de toutes les offres. Notez que :

1\. Vous n’avez pas besoin de changer de fournisseur d’hébergement pour utiliser Cloudflare.

2\. Vous n’avez pas besoin de quitter votre registrar. Le seul changement effectué au niveau de votre registrar est de faire pointer les serveurs de noms autoritaires vers les serveurs de noms Cloudflare.

Depuis octobre 2018, vous pouvez transférer votre domaine vers [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/).

___

### Est-ce que Cloudflare facture ou limite les requêtes DNS ?

Les services DNS autoritaires de Cloudflare sont gratuits. Cloudflare ne limite pas les requêtes DNS pour un domaine présent sur le réseau Cloudflare.

___

### Quelle est la vitesse du service DNS gratuit de Cloudflare ?

Cloudflare est le [fournisseur de service DNS le plus rapide](http://www.dnsperf.com/) au monde, avec la meilleure vitesse globale de tous les fournisseurs de DNS.

___

### Existe-t-il une limite sur le nombre d’enregistrements DNS par domaine ?

Oui, le nombre d'enregistrement DNS par domaine est limité pour les plans Free, Pro et Business.

Si vous êtes un client Enterprise et que vous souhaitez ajouter plus d’enregistrements que la limite autorisée pour un domaine, vous pouvez contacter votre équipe de gestion de compte.

___

### Comment puis-je faire pointer mes serveurs de noms vers Cloudflare ?

Le changement s’effectue sur votre registrar, qui peut être (ou non) votre fournisseur d’hébergement. Si vous ne connaissez pas le registrar lié à votre domaine, vous pouvez l’identifier en faisant une [recherche WHOis](http://www.whois.net/).  Suivez les instructions de notre guide d’assistance pour [remplacer les serveurs de noms par Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205195708).

___

### Puis-je utiliser Cloudflare sans remplacer mes serveurs de noms par Cloudflare ?

Remplacer vos serveurs de noms par Cloudflare nous permet de mettre en proxy et d’approvisionner l’intégralité d’un site. Si vous ne pouvez pas utiliser nos serveurs de noms, deux options s’offrent à vous :

1\. Activez Cloudflare via l’un de nos [partenaires d’hébergement certifiés](https://www.cloudflare.com/hosting-partners).

2\. Demandez une [configuration en CNAME](https://support.cloudflare.com/hc/en-us/articles/360020348832).

___

### Combien de temps faut-il pour qu’un changement de DNS soit effectif ?

Le Time-To-Live (TTL) par défaut du DNS Cloudflare est de 300 secondes (5 minutes). Tous les changements ou suppléments réalisés sur votre fichier de zone Cloudflare seront effectifs en 5 minutes ou moins. Notez que le cache de votre DNS local peut prendre plus de temps pour se mettre à jour. La propagation complète peut donc prendre plus de 5 minutes.

___

### Cloudflare prend-il en charge les entrées DNS IPv6 ?

IPv6 doit être ajouté comme enregistrement AAAA et non comme enregistrement A dans vos [paramètres d’application DNS](https://support.cloudflare.com/hc/en-us/articles/200168836).

_Voir également :_

-   [Ajouter des enregistrements AAAA](https://support.cloudflare.com/hc/en-us/articles/203916938-Can-I-use-CloudFlare-with-an-IPv6-only-server-IP-)
-   Cloudflare offre une [passerelle IPv6 gratuite](http://blog.cloudflare.com/introducing-cloudflares-automatic-ipv6-gatewa) à tous les clients.

___

### Puis-je utiliser Cloudflare avec un domaine Blogger.com ?

Vous pouvez utiliser Cloudflare avec n’importe quel domaine personnalisé (votrenomdesite.com) dont vous contrôlez la gestion du DNS autoritaire.

___

### Cloudflare propose-t-il le masquage de domaine ?

Cloudflare ne propose pas de masquage de domaine ni de services de redirection DNS (votre fournisseur d’hébergement propose peut-être ces services). Nous proposons uniquement la redirection URL par les [Page Rules](http://blog.cloudflare.com/introducing-pagerules-url-forwarding).

___

### Puis-je configurer en CNAME un domaine qui n’est pas sur Cloudflare vers un domaine présent sur Cloudflare ?

L’utilisation d’un CNAME pour rediriger le trafic d’un domaine qui n’est pas sur Cloudflare vers un domaine Cloudflare génère une erreur de résolution. Dans la mesure où Cloudflare agit comme un proxy inverse pour le domaine présent sur Cloudflare, la redirection CNAME pour le domaine (pas sur Cloudflare) ne saura pas où envoyer le trafic.

Si vous souhaitez faire une redirection pour le site qui n’est pas sur Cloudflare, établissez une redirection traditionnelle 301 ou 302 sur votre serveur Web d’origine.

___

### Puis-je utiliser des domaines add-on avec Cloudflare ?

Les domaines add-on sont des domaines différents qui pointent vers le serveur d’un autre domaine « principal ».

Cependant, du point de vue de Cloudflare, les domaines sont des entités uniques, ce qui signifie qu’il vous faudra ajouter chaque domaine séparément.

Pour Cloudflare, chaque URL ci-dessous est un domaine unique :

-   exemple1.com
-   exemple2.com
-   exemple3.com

Chaque domaine doit être ajouté séparément sur votre compte Cloudflare et peut disposer d’un niveau d’offre différent, allant de l’offre gratuite à l’offre Enterprise. Il n’y a pas de limite de nombre de domaines sur un compte Cloudflare. Si, comme certains de nos clients, vous en possédez des centaines ou des milliers, vous serez intéressé de découvrir le fonctionnement de [l’API v4](https://api.cloudflare.com/) Cloudflare.

Tous les sous-domaines sont inclus ; les URL ci-dessous seraient donc considérées comme un seul domaine pour les offres Cloudflare :

-   exemple1.com
-   www.exemple1.com
-   blog.exemple1.com
-   boutique.exemple1.com

___

### Cloudflare prend-il en charge les entrées joker DNS ?

Cloudflare prend en charge l’enregistrement joker '\*' pour la gestion de DNS dans toutes les offres client. Les clients Enterprise bénéficient d’une prise en charge full proxy pour les enregistrements joker.

#### Offres Free, Pro et Business Plan

Cloudflare ne met pas en proxy les enregistrements joker ; les sous-domaines joker sont donc servis directement et ne profitent d’aucune application, performance ou sécurité Cloudflare. Les domaines joker n’ont donc pas de nuage (orange ou gris) dans l’application DNS Cloudflare. Si vous ajoutez un CNAME \`\*\` ou un enregistrement A, assurez-vous que l’enregistrement présente un nuage gris pour permettre sa création.

Pour profiter de la protection Cloudflare sur un sous-domaine joker (par exemple : www), vous devez définir explicitement cet enregistrement dans vos paramètres DNS Cloudflare. Tout d’abord, connectez-vous à votre compte Cloudflare puis cliquez sur l’application DNS. Dans cet exemple, il vous faudrait ajouter « www » en tant qu’enregistrement CNAME dans vos paramètres DNS Cloudflare et passer le nuage en orange de manière à activer le proxy de Cloudflare.

Les clients Cloudflare Enterprise peuvent mettre en proxy les enregistrements joker. Pour en savoir plus sur l’offre Enterprise, [contactez-nous](https://www.cloudflare.com/enterprise-service-request).

Les jokers ne sont valides que dans l’étiquette la plus à gauche du sous-domaine. Par exemple, il n’est pas possible d’ajouter sub.\*.exemple.com, mais il est possible d’ajouter \*sub.exemple.com.

___

### Pourquoi ne puis-je pas effectuer de requêtes ANY vers les serveurs DNS de Cloudflare ?

Les requêtes ANY sont spéciales et souvent mal interprétées. Elles sont généralement utilisées pour obtenir tous les types d’enregistrements disponibles sur un nom de DNS, mais elles renvoient tous les types du cache de résolveurs récursifs. Cela peut causer de la confusion lorsqu’elles sont utilisées pour le débogage.

Avec les nombreuses fonctionnalités de DNS avancées de Cloudflare comme le CNAME flattening, il est difficile et parfois même impossible de répondre correctement aux requêtes ANY. Par exemple, lorsque des enregistrements DNS vont et viennent de manière dynamique ou sont stockés à distance, il est presque impossible d’obtenir tous les résultats en même temps.

ANY est rarement utilisé en production, mais souvent dans les attaques par réflexion DNS, profitant de la longue réponse renvoyée par ANY.

Plutôt que d’utiliser des requêtes ANY pour répertorier les enregistrements, les clients Cloudflare peuvent avoir un meilleur aperçu de leurs enregistrements DNS en se connectant et en consultant les paramètres de leur application DNS.

La décision de bloquer les requêtes ANY a été mise en place pour tous les clients DNS autoritaire en septembre 2015 et n’affecte pas les clients Virtual DNS.

Consultez l’article [Rejet des requêtes DNS ANY](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/) sur le blog Cloudflare.

___

### Pourquoi dois-je retirer mon enregistrement DS en m’inscrivant à Cloudflare ?

Cloudflare prend en charge le protocole DNSSEC. Si un enregistrement DS est présent sur votre registrar quand vous utilisez Cloudflare, vous rencontrerez des erreurs de connectivité de type SERVFAIL si vous utilisez un résolveur de validation comme Google,


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    Voici à quoi pourrait ressembler une erreur :    ╰─➤ dig dnssec-failed.org @8.8.8.8     &lt;&lt;&gt;&gt; DiG 9.8.3-P1 &lt;&lt;&gt;&gt; dnssec-failed.org @8.8.8.8    ;; global options: +cmd    ;; Got answer:    ;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 5531    ;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0 ;; QUESTION SECTION:    ;dnssec-failed.org. IN A    </span></div></span></span></span></code></pre>{{</raw>}}

Avec la prise en charge de DNSSEC, Cloudflare fournit l’enregistrement DS qui doit être chargé lorsque vous activez DNSSEC pour votre domaine.

___

### Que se passe-t-il lorsque je retire l’enregistrement DS ?

Lorsque vous retirez votre enregistrement DS, cela lance un processus d’invalidation qui annule les enregistrements DNS de votre domaine. Cela entraîne une chaîne d’événements qui permettra la modification de vos serveurs de noms autoritaires. Si vous êtes déjà client, cela n’affectera pas votre capacité à utiliser Cloudflare. Les nouveaux clients devront réaliser cette étape avant que Cloudflare ne puisse être utilisé correctement.

___

### Cloudflare prend-il en charge EDNS0 (mécanismes d’extension pour DNS) ?

Oui, Cloudflare prend en charge EDNS0. EDNS0 est activé pour tous les clients Cloudflare. C’est un bloc de construction pour les implémentations DNS modernes qui permet de détecter si le résolveur DNS (le fournisseur de service DNS récursif) prend en charge les plus grandes tailles de messages et DNSSEC.

EDNS0 est le premier ensemble de mécanismes approuvé pour les [extensions DNS](http://en.wikipedia.org/wiki/Extension_mechanisms_for_DNS), publié à l’origine sous le nom de [RFC 2671](http://tools.ietf.org/html/rfc2671).

___

### Quels types d’enregistrements ne sont pas mis en proxy par Cloudflare ?

LOC  
MX  
NS  
SPF  
TXT  
SRV  
CAA

___

### Que représente la valeur TTL Automatique ?

Dans l’application **DNS** de Cloudflare, les modifications des enregistrements DNS réalisées avec un **TTL automatique** se propageront en 5 minutes environ (300 secondes).

___

### Que dois-je faire si je change l’adresse IP de mon serveur ou mon fournisseur d’hébergement ?

Si vous changez de fournisseur d’hébergement ou d’adresse IP de serveur, mettez à jour les adresses IP dans votre application **DNS** Cloudflare. Votre nouveau fournisseur d’hébergement vous fournira les nouvelles adresses IP à utiliser pour votre DNS.  Pour modifier le contenu d’un enregistrement **DNS** dans l’application DNS, cliquez sur l’adresse IP et saisissez la nouvelle adresse IP.

___

### Cloudflare fonctionne-t-il avec les DNS dynamiques ?

Reportez-vous à l’article de Cloudflare sur la [gestion par programme des adresses IP dynamiques dans DNS Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360020524512).

___

### Où puis-je trouver mes serveurs de noms Cloudflare ?

Dans l’application **DNS** de votre compte Cloudflare, consultez les **Serveurs de noms Cloudflare**.

L’adresse IP associée à un serveur de noms Cloudflare spécifique peut être récupérée à l’aide d’une commande dig ou d’un outil de recherche DNS tiers hébergé en ligne comme [whatsmydns.net](https://www.whatsmydns.net/) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig kate.ns.cloudflare.comkate.ns.cloudflare.com.    68675    IN    A    173.245.58.124.</span></div></span></span></span></code></pre>{{</raw>}}

___

### L’icône à côté de mon enregistrement DNS doit-elle être orange ou grise ?

Par défaut, seuls les enregistrements A et CNAME qui gèrent le trafic Web (HTTP et HTTPS) peuvent être mis en proxy vers Cloudflare. Tous les autres enregistrements DNS doivent afficher un nuage gris. Pour plus d’informations, consultez notre guide d’assistance sur [les sous-domaines appropriés pour la mise en proxy vers Cloudflare](https://support.cloudflare.com/hc/en-us/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-).

___

### Peut-on ajouter directement des sous-domaines à Cloudflare ?

Par défaut, les sous-domaines ne peuvent pas être ajoutés en tant que domaines dans un compte Cloudflare. Le domaine racine doit être ajouté à un compte Cloudflare ; il gère ensuite les sous-domaines. Cependant, les clients Enterprise peuvent contacter le support Cloudflare et demander l’ajout direct de sous-domaines sur leur compte Cloudflare.

___

### Puis-je configurer un enregistrement DNS uniquement pour le domaine racine ?

Si votre domaine est [configuré en CNAME](https://support.cloudflare.com/hc/en-us/articles/203685674-What-are-the-partner-Cloudflare-setup-options-Full-DNS-vs-CNAME-) ou hébergé par un partenaire d’hébergement Cloudflare, Cloudflare ne peut pas mettre en proxy le trafic pour le domaine racine.  Ceci est dû aux exigences des spécifications DNS (RFC).  Pour ces types de configurations, seuls les sous-domaines peuvent être mis en proxy vers Cloudflare, pas les domaines racine.

___

### Pourquoi est-ce que je vois des avertissements d’enregistrement SOA ?

Cloudflare crée automatiquement l’enregistrement SOA lorsque vous déplacez votre domaine vers les serveurs de noms Cloudflare.  Certains champs SOA Cloudflare diffèrent des autres serveurs DNS courants :

-   Numéro de série SOA
    
    Un format de date est commun pour la plupart des serveurs DNS. Cependant, Cloudflare utilise une méthodologie différente pour générer les numéros de série. 
    

-   Valeur d’expiration SOA
    
    La valeur d’expiration SOA décrit la durée pendant laquelle un serveur de noms secondaire doit fournir des réponses faisant autorité après la perte de contact avec le serveur maître. Les serveurs de noms Cloudflare peuvent utiliser une valeur plus courte que celle spécifiée dans la recommandation RFC.
