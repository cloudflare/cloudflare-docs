---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/204144518-FAQ-sur-le-SSL
title: FAQ sur le SSL
---

# FAQ sur le SSL

### Je possède plusieurs certificats Cloudflare, lequel est utilisé ?

Les certificats Cloudflare sont hiérarchisés par [type de certificat](https://support.cloudflare.com/hc/articles/203295200) et également par nom d’hôte le plus spécifique.  En général, la hiérarchisation des certificats SSL est la suivante, de la priorité la plus élevée à la plus basse :

-   [SSL personnalisé](https://support.cloudflare.com/hc/articles/200170466)
-   [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108)
-   [Universal SSL](https://support.cloudflare.com/hc/articles/204151138)

Les exceptions à la priorisation générale se produisent en fonction de la spécificité du nom d’hôte.  Les certificats qui mentionnent un nom d’hôte spécifique sont préférés aux certificats joker.  Par exemple, un certificat Universal SSL qui mentionne explicitement _www.exemple.com_ a la priorité sur un certificat qui correspond au nom d’hôte _www_ via un caractère joker tel que _\*.exemple.com._

___

### Le SSL de Cloudflare aidera-t-il au référencement SEO ?

Oui, Google a annoncé qu’il utilisait [HTTPS comme signal pour l’optimisation du référencement](http://googleonlinesecurity.blogspot.co.uk/2014/08/https-as-ranking-signal_6.html).

Pour découvrir des ajustements en matière de [référencement, consultez notre article sur l’amélioration du référencement SEO avec Cloudflare](https://support.cloudflare.com/hc/en-us/articles/231109348-How-do-I-Improve-SEO-Rankings-On-My-Website-Using-Cloudflare-).

___

### Le SSL de Cloudflare prend-il en charge les IDN (Internationalized Domain Names) ?

Cloudflare prend en charge les domaines double octet / IDN / punycode.  Les domaines contenant des caractères non latins reçoivent des certificats SSL comme tout autre domaine ajouté à Cloudflare.

___

### Combien de temps faut-il pour que le SSL de Cloudflare soit activé ?

Si Cloudflare est votre [fournisseur de service DNS faisant autorité](https://www.cloudflare.com/learning/dns/dns-server-types/#authoritative-nameserver), les certificats Universal SSL sont généralement émis dans les 15 minutes suivant l’activation du domaine chez Cloudflare et ne nécessitent aucune action supplémentaire de la part du client après cette activation.  Si vous utilisez les [services Cloudflare via les enregistrements CNAME](https://support.cloudflare.com/hc/articles/360020615111) définis chez votre fournisseur de service DNS faisant autorité, la fourniture de votre certificat Universal SSL nécessite l’ajout manuel [d’enregistrements de vérification DNS](https://support.cloudflare.com/hc/articles/360020615111#h_989980109291544055191509) chez votre fournisseur de service DNS faisant autorité.  Les certificats Dedicated SSL sont également émis dans les 15 minutes en général.

Si l’autorité de certification exige un examen manuel des exigences de marque, de phishing ou de TLD, la délivrance d’un certificat Universal SSL pourra alors prendre plus de 24 heures.

___

### Que signifie une vérification de marque SSL non valide ?

Certains domaines ne sont pas admissibles au certificat Universal SSL s’ils contiennent des mots en conflit avec des domaines de marque déposée.

Pour résoudre ce problème, vous pouvez soit  :

-   [charger votre propre certificat](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-) si le domaine est fait partie d’une offre Business ou [Enterprise](https://www.cloudflare.com/enterprise-service-request) Plan ; ou
-   acheter un [certificat Dedicated SSL](https://support.cloudflare.com/hc/en-us/articles/228009108-Dedicated-SSL-Certificates).

___

### Comment rediriger tous les visiteurs via HTTPS/SSL ?

Pour rediriger le trafic de tous les sous-domaines et hôtes de votre domaine, activez l’option **Toujours utiliser HTTPS** dans l’application **SSL/TLS** de Cloudflare.  Par ailleurs, si vous ne souhaitez pas que l’ensemble de votre site soit redirigé via HTTPS, effectuez une redirection d’URL à l’aide de l’application **[Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427)** de Cloudflare.

Si votre site est protégé via Cloudflare, il n’est pas recommandé d’effectuer des redirections sur votre serveur Web d’origine :

-   Les redirections Page Rule sont traitées sur l’extrémité de Cloudflare, ce qui entraîne une réponse plus rapide et un nombre réduit de demandes adressées à votre serveur.
-   Les redirections du serveur Web d’origine peuvent provoquer des [erreurs de boucle de redirection](https://support.cloudflare.com/hc/articles/115000219871).

Lors de la configuration Page Rules, l’action _Toujours utiliser HTTPS_ est l’option la plus simple pour rediriger des requêtes HTTP vers HTTPS.  Vous pouvez également utiliser l’action _Transfert d’URL_ avec une redirection _301_ si, en plus de forcer HTTPS, vous voulez effectuer une redirection vers un autre sous-domaine. Par exemple, une correspondance Page Rule pour


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://exemple.com/*</span></div></span></span></span></code></pre>{{</raw>}}

avec une _URL de transfert_ de


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.exemple.com/$1</span></div></span></span></span></code></pre>{{</raw>}}

va envoyer les requêtes destinées au domaine racine _exemple.com_ vers le sous-domaine _www.exemple.com_ tout en préservant le répertoire de l’URL.

Forcer HTTPS ne résout pas les problèmes de [contenu mixte](https://support.cloudflare.com/hc/en-us/articles/200170476-How-do-I-fix-the-SSL-Mixed-Content-Error-Message-) dans la mesure où les navigateurs vérifient le protocole des ressources incluses, avant d’effectuer une requête. Vous ne devrez utiliser que des liens relatifs ou des liens HTTPS sur les pages que vous forcez HTTPS. Cloudflare peut automatiquement résoudre certains liens de contenu mixte à l’aide de notre fonctionnalité [Remplacements HTTPS automatiques](https://support.cloudflare.com/hc/en-us/articles/227227647-How-do-I-use-Automatic-HTTPS-Rewrites-).

___

### Le SSL fonctionne-t-il pour les partenaires d’hébergement ?

Un certificat Universal SSL gratuit est disponible pour tous les nouveaux domaines Cloudflare ajoutés via un partenaire d’hébergement via les intégrations DNS CNAME et Full.

Mettez en proxy un sous-domaine via Cloudflare pour fournir le certificat Universal SSL gratuit.

___

### Les certificats SSL de Cloudflare sont-ils partagés ?

Les certificats Universal SSL sont partagés sur plusieurs domaines et pour plusieurs clients. Si le partage de certificat vous préoccupe, Cloudflare recommande un [certificat Dedicated SSL ou personnalisé](https://support.cloudflare.com/hc/articles/203295200).

___

### Un certificat SSL est installé sur mon site Web. Pourquoi puis-je voir un certificat Cloudflare ?

Cloudflare doit déchiffrer le trafic pour pouvoir mettre en cache et filtrer le trafic malveillant. Cloudflare chiffre le trafic à nouveau ou envoie du trafic en texte brut au serveur Web d’origine en fonction de [l’option SSL](https://support.cloudflare.com/hc/articles/200170416) sélectionnée dans l’application **SSL/TLS**.

___

### Je veux que Cloudflare utilise un certificat SSL que j’ai acheté ailleurs

Les domaines des offres Business et Enterprise Plans sont autorisés à charger un [certificat SSL personnalisé](https://support.cloudflare.com/hc/articles/200170466).

___

### Comment forcer mon site à utiliser uniquement HTTPS/SSL ?

Pour forcer l’ensemble du trafic via HTTPS, activez la fonctionnalité « Toujours utiliser HTTPS » dans l’application **SSL/TLS** ou [via l’application **Page Rules** de Cloudflare](https://support.cloudflare.com/hc/articles/200170536).

___

### Le projet Galileo inclut-il la prise en charge SSL ?

Les clients du projet Galileo peuvent utiliser le certificat [Universal SSL gratuit](https://www.cloudflare.com/ssl) de Cloudflare pour sécuriser le trafic du site.

___

### L’activation de Cloudflare affecte-t-elle les exigences TLS 1.2 de PayPal ?

Non, Cloudflare ne mettant pas en proxy les connexions effectuées directement sur paypal.com, l’activation de Cloudflare pour votre domaine n’affecte pas la manière dont les connexions TLS sont établies.

Pour déterminer si votre serveur ou navigateur prend en charge ces normes, consultez le site [https://tlstest.paypal.com](https://tlstest.paypal.com/) à partir d’un client ou d’un navigateur utilisant PayPal. Une réponse **PayPal\_Connection\_OK** indique que le client prend en charge les normes TLS compatibles avec PayPal.

___

### Comment puis-je servir un certificat SSL depuis les datacenters de Cloudflare en Chine ?

Les certificats [Universal SSL](https://support.cloudflare.com/hc/articles/204151138) et [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108) de Cloudflare ne sont pas déployés en Chine.  Si votre domaine fait partie de l’offre Enterprise Plan et a été autorisé à accéder aux datacenters en Chine, les datacenters Cloudflare en Chine servent uniquement un certificat SSL pour votre domaine dans les conditions suivantes :

1.  Vous avez chargé un [certificat SSL personnalisé](https://support.cloudflare.com/hc/articles/200170466).
2.  **Autoriser les clés privées en Chine (Certificats personnalisés)** est _Actif_ dans l’application **SSL/TLS** de Cloudflare.

___

### Cloudflare prend-il en charge l’authentification TLS du client ?

L’authentification TLS du client confirme que le certificat présenté par un client est signé par le certificat de l’autorité de certification racine de la société.  En validant ce certificat sur chaque requête, l’accès peut être limité aux connexions client autorisées.  Pour activer l’authentification TLS du client via Cloudflare, reportez-vous à notre documentation sur [l’authentification TLS mutuelle.](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).

___

### Comment activer Universal SSL avec GitHub ?

Reportez-vous à l’article de blog Cloudflare sur [l’utilisation du certificat Universal SSL de Cloudflare avec GitHub Pages](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/).
