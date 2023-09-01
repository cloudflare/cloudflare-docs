---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200170786-Restaurer-l-adresse-IP-d-origine-du-visiteur
title: Restaurer l’adresse IP d’origine du visiteur
---

# Restaurer l’adresse IP d’origine du visiteur

## Restaurer l’adresse IP d’origine du visiteur

_Apprenez comment configurer mod\_cloudflare pour enregistrer l'adresse IP d'origine de vos visiteurs en fonction de votre type de serveur web d'origine (incluant Apache, nginx, Microsoft IIS et autres)._

___

## Vue d'ensemble

Lorsque [le trafic de votre site web est routé via le réseau Cloudflare](https://support.cloudflare.com/hc/articles/205177068), nous agissons comme un proxy inverse. Cela permet à Cloudflare de réduire le temps de chargement de page en optimisant le routage des paquets et en mettant en cache les ressources statiques (images, JavaScript, CSS, etc.). Par conséquent, en répondant aux requêtes et en les enregistrant, votre serveur d’origine verra [les adresses IP de Cloudflare](https://www.cloudflare.com/ips/).

Par exemple, si vous installez des applications qui dépendent de l'adresse IP entrante du visiteur initial, une adresse IP Cloudflare est enregistrée par défaut.L'adresse IP originale du visiteur apparaît dans un en-tête HTTP ajouté appelé [_CF-Connecting-IP_](https://support.cloudflare.com/hc/articles/200170986).En suivant nos instructions pour le serveur web [](https://support.cloudflare.com/hc/articles/200170786#JUxJSMn3Ht5c5yq), vous pouvez enregistrer l'adresse IP du visiteur original sur votre serveur d'origine.Si cet en-tête HTTP n'est pas disponible lorsque les requêtes atteignent votre serveur d'origine, vérifiez votre configuration des règles de transformation [](/rules/transform/)et [Managed Transforms](/rules/transform/managed-transforms/).

Le diagramme ci-dessous illustre les différentes façons dont les adresses IP sont gérées avec et sans Cloudflare.

![The diagram illustrates the different ways that IP addresses are handled with and without Cloudflare.](/images/support/Restoring_IPs__1_.png)

___

## mod\_remoteip

### Vue d'ensemble

Cloudflare ne met plus à jour et ne prend plus en charge _mod\_cloudflare._ Toutefois, si vous utilisez un serveur web Apache avec un système d'exploitation tel que **Ubuntu Server 18.04** et **Debian 9 Stretch**, vous pouvez utiliser _mod\_remoteip_ pour enregistrer l'adresse IP originale de votre visiteur.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Ce module ayant été créé par un tiers, nous ne pouvons pas fournir d'assistance technique pour les problèmes liés au plugin.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Pour installer  _mod\_remoteip_  sur votre serveur web Apache :

1\. Activez _mod\_remoteip_ en exécutant la commande suivante :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enmod remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

2\. Mettez à jour la configuration du site pour inclure _RemoteIPHeader CF-Connecting-IP_, par ex.`/etc/apache2/sites-available/000-default.conf`


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerAdmin webmaster@localhost</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DocumentRoot /var/www/html</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerName remoteip.andy.support</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ErrorLog ${APACHE_LOG_DIR}/error.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CustomLog ${APACHE_LOG_DIR}/access.log combined</span></div></span></span></span></code></pre>{{</raw>}}

3\. Mise à jour combinée _LogFormat_ entrée dans `apache.conf`, remplacement de _%h_ par _%a dans_ `/etc/apache2/apache2.conf.` Par exemple, si votre LogFormat _actuel_ se présentait comme suit


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot; %{User-Agent}i&quot;&quot; combiné</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

vous mettrez à jour _LogFormat_ comme suit :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%a %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot; %{User-Agent}i&quot;&quot; combiné</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4\. Définissez les adresses proxy de confiance en créant `/etc/apache2/conf-available/remoteip.conf` en entrant le code suivant et les [adresses IP Cloudflare](https://www.cloudflare.com/ips/) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.1 (exemple d'adresse IP)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.2 (exemple d'adresse IP)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(à répéter pour toutes les IP de Cloudflare listées à [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5\. Activer la configuration d'Apache :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enconf remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Activation de conf remoteip.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Pour activer la nouvelle configuration, vous devez exécuter :</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">service apache2 reload</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

6\. Testez la configuration Apache :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo apache2ctl configtest</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Syntaxe OK</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

7\. Redémarrez Apache :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo systemctl restart apache2</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## mod\_cloudflare

Il existe deux méthodes pour installer mod\_cloudflare : en téléchargeant l'extension Apache depuis GitHub ou en ajoutant du code à votre serveur web d'origine.

### Télécharger des paquets ou des scripts depuis GitHub

Si vous utilisez un serveur web Apache, vous pouvez télécharger mod\_cloudflare à partir de [GitHub](https://github.com/cloudflare/mod_cloudflare).

### Ajouter du code à votre serveur web d'origine

Si vous ne parvenez pas à installer mod\_cloudflare, ou si aucun plugin Cloudflare n'est disponible pour votre plate-forme de gestion de contenu pour restaurer l'adresse IP d’origine des visiteurs, ajoutez ce code à votre serveur web d’origine dans ou avant la balise <body> sur toute page nécessitant les adresses IP d’origine des visiteurs :

`<?php if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP']; ?>`

Ce code ne rendra l'adresse IP disponible que pour les scripts qui en ont besoin. Cela ne stocke pas l'adresse IP dans les journaux de votre serveur effectif.

### Apache

Pour supprimer _mod\_cloudflare_, vous devez commenter la ligne de configuration Apache qui charge _mod\_cloudflare_.

Cela varie en fonction de votre distribution Linux, mais pour la plupart des utilisateurs, si vous regardez `dans /etc/apache2`, vous devriez pouvoir chercher pour trouver la ligne :

`LoadModule cloudflare_module`

Commentez ou supprimez cette ligne, puis redémarrez Apache, et _mod\_cloudflare_ devrait avoir disparu .

Si vous utilisez Ubuntu ou Debian, vous devriez voir un fichier.

`file/etc/apache2/mods-enabled/cloudflare.load`

Supprimez ce fichier pour supprimer _mod\_cloudflare_, puis redémarrez Apache.

### Nginx

Mod\_cloudflare s'installe en modifiant [le fichier de configuration nginx](http://nginx.org/en/docs/http/ngx_http_realip_module.html)`nginx.conf`avec le module `ngx_http_realip_module`.

Pour supprimer _mod\_cloudflare_ , commentez ou supprimez cette ligne, puis redémarrez nginx, et _mod\_cloudflare_ devrait avoir disparu_._

___

## Instructions pour le serveur Web

Vous trouverez ci-dessous des instructions sur la manière de configurer votre serveur web pour qu'il enregistre les adresses IP des visiteurs originaux en fonction du type de votre serveur web :

1.  Assurez-vous que les éléments suivants sont installés :
    -   Red Hat/Fedora`sudo yum install httpd-devel libtool git`
    -   Debian/Ubuntu`sudo apt-get install apache2-dev libtool git`
2.  Clonez les éléments suivants pour obtenir le build le plus récent de _mod\_cloudflare_ :
    -   Red Hat/Fedora/Debian/Ubuntu :`git clone https://github.com/cloudflare/mod_cloudflare.git; cd mod_cloudflare`
3.  Utilisez l’outil d’extension Apache pour convertir le fichier .c en module :
    -   Red Hat/Fedora/Debain/Ubuntu :`apxs -a -i -c mod_cloudflare.c`
4.  Redémarrez et vérifiez que le module est actif :
    -   Red Hat/Fedora`service httpd restart; httpd -M|grep cloudflare`
    -   Debian/Ubuntu :`sudo apachectl restart; apache2ctl -M|grep cloudflare`
5.  Si votre navigateur web se trouve derrière un équilibreur de charge, ajoutez la ligne suivante à votre configuration Apache (remplacez 123.123.123.123 par l’adresse IP de votre équilibreur de charge :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">IfModule cloudflare_module</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPHeader X-Forwarded-For</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPTrustedProxy **[insérer l'adresse IP de votre équilibreur de charge]**</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DenyAllButCloudFlare</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/IfModule</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Utilisez le module [`ngx_http_realip_module` module NGINX](http://nginx.org/en/docs/http/ngx_http_realip_module.html) et les paramètres de configuration suivants :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">set_real_ip_from 192.0.2.1 (exemple d'adresse IP)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(à répéter pour toutes les adresses IP Cloudflare listées sur [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"># utilisez l'un des deux en-têtes suivants</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">real_ip_header CF-Connecting-IP ;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#real_ip_header X-Forwarded-For ;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Cette liste de préfixes doit être mise à jour régulièrement et nous publions la liste complète dans [Adresses IP Cloudflare](https://www.cloudflare.com/ips).

Voir aussi : [Cloudflare et NGINX](https://danielmiessler.com/blog/getting-real-ip-addresses-using-cloudflare-nginx-and-varnish/).

1.  Exécutez le script suivant pour installer mod\_cloudflare comme partie intégrante d'EasyApache : `bash <(curl -s https://raw.githubusercontent.com/cloudflare/mod_cloudflare/master/EasyApache/installer.sh)`
2.  Après l'installation, vous devrez recompiler votre Apache avec le nouveau plugin mod\_cloudflare.

Si vous utilisez Railgun (ou un autre logiciel de proxy inverse, tel que Varnish), les requêtes des utilisateurs viendront de votre serveur Railgun au lieu de Cloudflare. Étant donné que les requêtes ne proviennent pas directement de Cloudflare, mod\_cloudflare ne restaure pas les adresses IP des visiteurs par défaut.

1.  Pour résoudre ce problème, ouvrez votre configuration Apache.Elle se trouve généralement dans `/etc/apache2/apache2.conf`, `/etc/httpd/httpd.conf`, `/usr/local/apache/conf/httpd.conf` ou un autre emplacement selon la configuration.Si vous n'êtes pas sûr(e), demandez à votre fournisseur d'hébergement.
2.  À la toute fin, ajoutez :`CloudflareRemoteIPTrustedProxy railgun_address`Ainsi, si votre serveur Railgun est situé à 127.0.0.0.1, il apparaîtra comme suit :`CloudflareRemoteIPTrustedProxy 127.0.0.1`
3.  Si vous avez plus d'un serveur à ajouter à la liste des serveurs proxy autorisés, vous pouvez les ajouter à la fin :CloudflareRemoteIPTrustedProxy 127.0.0.1 127.0.0.2

Pour que Lighttpd réécrive automatiquement l'adresse IP du serveur pour les journaux d'accès et pour votre application, vous pouvez opter pour l'une des deux solutions ci-dessous.

1.  Ouvrez votre fichier **lighttpd.conf** et ajoutez _mod\_extforward_ à la liste _server.modules_.Il doit venir **après** _mod\_accesslog_ pour montrer l'adresse IP réelle dans les journaux d'accès
2.  Ajoutez le bloc de code suivant n'importe où dans le fichier **lighttpd.conf** après la liste des modules du serveur et redémarrez ensuite Lighttpd


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$HTTP[&quot;remoteip&quot;] == &quot;192.2.0.1 (exemple d'adresse IP)&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.forwarder = ( &quot;all&quot; =&gt; &quot; trust&quot; )</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.headers = (&quot;CF-Connecting-IP&quot;)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(à répéter pour toutes les IP de Cloudflare listées sur [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Accédez à votre console d'administration web LiteSpeed.
2.  Activez l'option Utiliser l'adresse IP du client dans l'en-tête de la configuration.
3.  Une fois l’option activée, vos journaux d'accès afficheront les bonnes adresses IP, et même la variable `$_SERVER['REMOTE_ADDR']` de PHP contiendra l'adresse IP réelle du client, au lieu d'une adresse IP Cloudflare, ce qui règlera en soi a plupart des problèmes rencontrés en permettant d'utiliser Cloudflare pour un site web écrit en PHP (comme WordPress ou vBulletin install).

##### Pour IIS 7 - 8 :

Suivez les instructions [ici](https://techcommunity.microsoft.com/t5/iis-support-blog/how-to-use-x-forwarded-for-header-to-log-actual-client-ip/ba-p/873115).

##### Pour IIS 8.5 - 10 :

A partir d'IIS 8.5, la journalisation personnalisée est une option intégrée. Voir [Journalisation améliorée IIS](http://www.iis.net/learn/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85)

1.  Dans IIS Manager, double-cliquez sur **Logging** dans le menu des _Actions_ du site sur lequel vous travaillez.
2.  Après cette opération, sélectionnez le format **W3C**, puis cliquez sur **Select Fields** à côté de la liste déroulante de format dans la sous-section _Log File_.
3.  Cliquez sur **Add Field** et ajoutez l'en-tête _CF-Connecting-IP_ .
4.  Cliquez sur **Ok**. Vous devriez voir votre nouvelle entrée reflétée sous **Champs personnalisés**. Cliquez sur **Appliquer** lorsque vous êtes de retour dans la fenêtre _Logging_.

1.  Si cette opération réussit, le fichier journal doit comporter un tiret bas :Vous devriez également voir les modifications dans les champs :
2.  Relancez le site, puis W3SVC, puis l'instance entière si le changement n’apparaît pas immédiatement.Lors de l'utilisation de la journalisation améliorée dans IIS 8.5+, elle **ne rétablit pas** l'IP du visiteur original au niveau de l'application.

Pour que Tomcat7 rétablisse automatiquement l'adresse IP originale du visiteur dans vos journaux d'accès et votre application, vous devrez ajouter `%{CF-Connecting-IP}i` dans votre schéma de journal.

Par exemple, vous pourriez ajouter la portion de code ci-dessous à votre fichier `server.xml`.

`<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log." suffixe=".txt" pattern="%{CF-Connecting-IP}i - %h %u %t - &quot;%r&quot ; - %s - %b - %{CF-RAY}i"/>`

Ce qui aurait pour conséquences que vos journaux ressembleraient à ceci :

`Visitor IP - Cloudflare IP - [04/Dec/2014:23:18:15 -0500] - "GET / HTTP/1.1" - 200 - 1895 - 193d704b85200296-SJC`

Consultez ce tutoriel tiers sur la restauration de l'adresse IP d'origine des visiteurs avec [Magento et Cloudflare](https://tall-paul.co.uk/2012/03/02/magento-show-remote-ip-when-using-cloudflare/).

De la même manière, Cloudflare n'a pas écrit cette [extension Magento](https://marketplace.magento.com/), mais certains de nos clients l'ont trouvée utile.

Ce plugin ayant été créé par un tiers, nous ne pouvons fournir d'assistance technique pour les problèmes qu’il présenterait.

Pour permettre une association correcte des adresses IP lors de l'exécution d'une installation Invision Power Board 3 dans Cloudflare, suivez ces instructions :

Connectez-vous à l'ACP de votre installation IPB.

1.  Cliquez sur **System**.
2.  Dans Overview, cliquez sur **Security**.
3.  Dans Security Center, cliquez sur **Security Settings**.Vérifiez que _Trust adresses IP fournies par les proxies ?_ est vert.

##### Description IPB4 de _Trust IP addresses provided by proxies?_

Si votre environnement réseau implique que les requêtes soient traitées via un proxy (comme dans le cas d'un réseau intranet en milieu professionnel ou dans une université, ou sur une grappe de serveurs équilibrés en charge), vous devrez peut-être activer ce paramètre pour que l'adresse IP correcte soit utilisée. Toutefois, lorsque ce paramètre est activé, un utilisateur malveillant peut tromper le système en fournissant une fausse adresse IP. Dans la plupart des environnements, il est préférable de laisser ce paramètre désactivé.

Vous trouverez des informations sur la restauration de l'adresse IP d'origine des visiteurs avec Simple Machines (SMF) sur les [forums Simple Machines](https://custom.simplemachines.org/mods/index.php?mod=2502).

Si vous utilisez un serveur Apache, nous vous recommandons d'installer [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) pour restaurer l'IP des visiteurs dans vos journaux.

Si vous n'avez pas accès à votre serveur pour installer un mod, vous pouvez alors [modifier le noyau](https://www.phpbb.com/community/viewtopic.php?p=13936406#p13936406).

Les versions plus récentes de MyBBB intègrent l'option Scrutinize User's IP address.

`Admin CP > Configuration > Server and Optimization Options > Scrutinize User's IP address? > Yes`

Vous pouvez également installer le [plugin de gestion Cloudflare](https://mods.mybb.com/view/antoligy-mybb-cloudflare-management-plugin) disponible pour MyBB 1.6.

##### MyBB 1.6.0, 1.6.1, 1.6.2, ou 1.6.3

1.  Accédez à `./inc/functions.php`.
2.  Allez à la ligne 2790.
3.  Remplacez :`if(isset($_SERVER['REMOTE_ADDR']))`par :`if(isset($_SERVER['HTTP_CF_CONNECTING_IP']))`
4.  Remplacez ensuite :`$ip = $_SERVER['REMOTE_ADDR'];`par :`$ip = $_SERVER['HTTP_CF_CONNECTING_IP'];`

Un membre de l'équipe Vanilla a écrit un [plugin Cloudflare pour Vanilla](https://open.vanillaforums.com/addon/cloudflaresupport-plugin) permettant de restaurer l'adresse IP d’origine des visiteurs dans les fichiers journaux des sites auto-hébergés.

Ce plugin ayant été créé par un tiers, nous ne pouvons fournir d'assistance technique pour les problèmes qu’il présenterait.MediaWiki

1.  Ouvrez `includes/GlobalFunctions.php`. À la ligne 370 approximativement, changez ce qui suit :`$forward = "\t(proxied via {$_SERVER['REMOTE_ADDR']}{$forward})";`par`$forward = "\t(proxied via {$_SERVER['HTTP_CF_CONNECTING_IP']}{$forward})";`
2.  Ouvrez `includes/ProxyTools.php`. À la ligne 79 approximativement, recherchez :`if ( isset( $_SERVER['REMOTE_ADDR'] ) ){`et remplacez-le par :`if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ){`La deuxième étape ne s'applique qu'aux versions MediaWiki 1.18.0 et antérieures. Les nouvelles versions de MediaWiki ont complètement réécrit ProxyTools.php et le code suivant n'est plus présent.
3.  À la ligne 80 approximativement, recherchez :`$ipchain = array( IP::canonicalize($_SERVER['REMOTE_ADDR']) );`Sauvegardez et téléchargez sur votre serveur web d'origine.

##### Pour les versions voisines de 1.27.1 :

1.  Allez à la ligne 1232 dans `GlobalFunctions.php`, remplacez `REMOTE_ADDR` par `HTTP_CF_CONNECTING_IP`.
2.  Ensuite, allez dans `WebRequest.php`, aux lignes 1151 à 1159, remplacez `REMOTE_ADDR` par `HTTP_CF_CONNECTING_IP`.

Un utilisateur de Xenforo a créé un [plugin pour Cloudflar](https://xenforo.com/community/resources/solidmean-cloudflare-detect.1595/)e.

Ce plugin ayant été créé par un tiers, nous ne pouvons fournir d'assistance technique pour les problèmes qu’il présenterait.

1.  Ouvrez `library/config.php`.
2.  À la fin, ajoutez :`if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];}`
3.  Téléchargez et remplacez.

Un tiers a créé un [module pour Cloudflare et PunBBB](http://punbb.informer.com/forums/post/147539/#p147539) qui restaurera l'adresse IP d’origine des visiteurs.

Ce plugin ayant été créé par un tiers, nous ne pouvons fournir d'assistance technique pour les problèmes qu’il présenterait.Cherokee server

1.  Lancez `cherokee-admin` sur votre serveur.
2.  Allez dans **l'interface d'administration Cherokee** de votre navigateur web.
3.  Sélectionnez **Virtual Server** pour le domaine qui est desservi par Cloudflare.
4.  Dans l'onglet _Logging_ du **serveur virtuel** sélectionné, activez l'option Accept Forwarded IPs.
5.  Allez dans _Accept from Hosts_ box, puis dans [Cloudflare's IP addresses](https://www.cloudflare.com/ips/).

Vous pouvez corriger l'adresse IP en remplaçant le champ `PHP IP Server Param` de la configuration de serveur Livezilla par `HTTP_CF_CONNECTING_IP`.

Pour restaurer l'adresse IP des visiteurs dans DataLife Engine :

1.  Ouvrez :/engine/inc/include/functions.inc.phpRecherchez :`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Remplacez par :`$db_ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
2.  Recherchez :`$ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Remplacez par :`$_SERVER['REMOTE_ADDR'] ); $_SERVER['REMOTE_ADDR'] );`
3.  Ouvrez :/engine/modules/addcomments.phpRecherchez :`$_SERVER['REMOTE_ADDR'],`Remplacez par :`$_SERVER['HTTP_CF_CONNECTING_IP'],`
4.  Recherchez :`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`Remplacez par :`$_SERVER['HTTP_CF_CONNECTING_IP'], $_SERVER['HTTP_CF_CONNECTING_IP'] );`

Un développeur tiers a créé une [extension Cloudflare pour TYPO3](https://extensions.typo3.org/extension/cloudflare/) qui restaurera l'adresse IP d’origine des visiteurs dans vos journaux. L'extension vous permettra également de supprimer votre cache Cloudflare.

Ce plugin ayant été créé par un tiers, nous ne pouvons fournir d'assistance technique pour les problèmes qu’il présenterait.

Si vous utilisez le panneau de contrôle d'hébergement VestaCP, Nginx et Apache s'exécutent tous deux sur votre serveur. Les requêtes sont mises en proxy sur Nginx avant d'aller sur Apache.

De ce fait, vous devez suivre les instructions pour configurer Nginx afin qu'il renvoie l'adresse IP réelle des visiteurs.[Mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) pour Apache n'est pas nécessaire à moins que vous ne désactiviez le serveur Nginx pour certaines requêtes. Si vous ajoutez [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) à Apache, cela n'entrera pas en conflit avec la configuration du serveur Nginx.

Un développeur tiers a créé un module pour restaurer l'adresse IP des visiteurs appelé [node\_cloudflare](https://github.com/keverw/node_CloudFlare).

___

## Restaurer l'IP originale du visiteur avec HAProxy

Afin d'extraire l'IP du client original dans l'en-tête X\_FORWARDD\_FOR, vous devez utiliser la configuration suivante dans HAProxy :

1.  Créez un fichier texte CF`_ips.lst` contenant toutes les plages d'IP de https://www.cloudflare.com/en-gb/ips/.
2.  désactivez l'option `forwardfor` dans HAProxy.

Configuration de HAProxy :

`acl from_cf src -f /path/to/CF_ips.lst`

`acl cf_ip_hdr req.hdr(CF-Connecting-IP) -m found`

`http-request set-header X-Forwarded-For %[req.hdr(CF-Connecting-IP)] si from_cf cf_ip_hdr`

___

## Ressources associées

-   [Les champs d'en-tête de la requête HTTP](/fundamentals/get-started/http-request-headers)
-   [Règles de transformation](/rules/transform/)
