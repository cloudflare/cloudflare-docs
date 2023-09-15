---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/203118044-Recueillir-les-informations-n%C3%A9cessaires-pour-d%C3%A9panner-les-probl%C3%A8mes-relatifs-aux-sites
title: Recueillir les informations nécessaires pour dépanner les problèmes relatifs aux sites
---

# Recueillir les informations nécessaires pour dépanner les problèmes relatifs aux sites

_Apprendre à recueillir des données pour diagnostiquer les problèmes et faciliter le dépannage avec le support Cloudflare.  Pour la plupart des dépannages, Cloudflare recommande fortement de commencer par générer un fichier HAR._

_Cet article a déjà été publié sous le titre **Comment générer un fichier HAR ?**_

### Dans cet article

-   [Présentation](https://support.cloudflare.com/hc/fr-fr/articles/203118044-Recueillir-les-informations-n%C3%A9cessaires-pour-d%C3%A9panner-les-probl%C3%A8mes-relatifs-aux-sites#h_b4be207a-9957-429a-a460-fc6f40a5e88a)
-   [Générer un fichier HAR](https://support.cloudflare.com/hc/fr-fr/articles/203118044-Recueillir-les-informations-n%C3%A9cessaires-pour-d%C3%A9panner-les-probl%C3%A8mes-relatifs-aux-sites#h_8c9c815c-0933-49c0-ac00-b700700efce7)
-   [Identifier le centre de données Cloudflare qui traite votre requête](https://support.cloudflare.com/hc/fr-fr/articles/203118044-Recueillir-les-informations-n%C3%A9cessaires-pour-d%C3%A9panner-les-probl%C3%A8mes-relatifs-aux-sites#h_22b01241-01a5-4bed-a897-6e97cff5c288)
-   [Dépanner les requêtes avec cURL](https://support.cloudflare.com/hc/fr-fr/articles/203118044-Recueillir-les-informations-n%C3%A9cessaires-pour-d%C3%A9panner-les-probl%C3%A8mes-relatifs-aux-sites#h_0c7f48b3-fc29-4266-8c63-477fe61a11c4)
-   [Mettre Cloudflare temporairement en pause](https://support.cloudflare.com/hc/fr-fr/articles/203118044-Recueillir-les-informations-n%C3%A9cessaires-pour-d%C3%A9panner-les-probl%C3%A8mes-relatifs-aux-sites#h_8654c523-e31e-4f40-a3c7-0674336a2753)
-   [Effectuer une traceroute](https://support.cloudflare.com/hc/fr-fr/articles/203118044-Recueillir-les-informations-n%C3%A9cessaires-pour-d%C3%A9panner-les-probl%C3%A8mes-relatifs-aux-sites#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)
-   [Ajoutez l’en-tête CF-RAY à vos journaux](https://support.cloudflare.com/hc/fr-fr/articles/203118044-Recueillir-les-informations-n%C3%A9cessaires-pour-d%C3%A9panner-les-probl%C3%A8mes-relatifs-aux-sites#h_f7a7396f-ec41-4c52-abf5-a110cadaca7c)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/203118044-Recueillir-les-informations-n%C3%A9cessaires-pour-d%C3%A9panner-les-probl%C3%A8mes-relatifs-aux-sites#h_72a357d2-7fdb-47d8-a5c7-eadd8d60723e)

___

## Présentation

Pour diagnostiquer un problème, il est important de recueillir autant d'informations que possible et de [fournir des détails sur ce problème au support Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16). Cet article vous explique comment recueillir les informations de dépannage demandées habituellement par le support Cloudflare.

___

## Générer un fichier HAR

Une archive HTTP (HAR) enregistre toutes les requêtes du navigateur web, y compris les en-têtes de requête et de réponse, le contenu principal et le temps de chargement de page.

Pour le moment, seuls Chrome et Firefox peuvent accéder par défaut à la fonction HAR. D'autres navigateurs nécessitent une extension de navigateur ou ne permettent pas de générer un fichier HAR. Lors de l'installation d'une extension de navigateur, suivez les instructions du fournisseur de l'extension.

1\. Dans une page du navigateur, effectuez un clic droit n'importe où et sélectionnez **Inspecter l'élément**.

2\. Les outils de développement apparaissent en bas ou à gauche du navigateur. Cliquez sur l’onglet **Network**.![gathering_har_file_network.png](/images/support/gathering_har_file_network.png)

3\. Cochez **Preserve log**.

4\. Cliquez sur record.

 ![gathering_har_file_record.png](/images/support/gathering_har_file_record.png)

5\. Accédez à l'URL qui provoque les problèmes. Une fois le problème rencontré, cliquez avec le bouton droit de la souris sur l’un des éléments dans l’onglet **Network** et sélectionnez **Save all as HAR with Content**.

 ![save_har_with_content.png](/images/support/save_har_with_content.png)

 6. Joignez le fichier HAR à votre ticket de support.

1\. Accédez au menu de l’application, sélectionnez **Tools** > **Web Developer** > **Network** ou appuyez sur _Ctrl+Shift+I_ (Windows/Linux) ou _Cmd+Option+I_ (OS X).

2\. Accédez à l'URL qui provoque les problèmes.

3\. Après avoir dupliqué le problème, effectuez un clic droit et choisissez **Save All As HAR**.

1\. Accédez aux **outils de développement** (utilisez la touche _F12_) et sélectionnez l’onglet **Network**.

2\. Accédez à l'URL qui provoque les problèmes.

3\. Après avoir dupliqué le problème, cliquez sur **Export as HAR** puis sur **Enregistrer sous...**.

1\. Dans Safari, vérifiez qu'un menu **Develop** apparaît en haut de la fenêtre du navigateur. Si ce n’est pas le cas, accédez à **Safari** > **Préférences** > **Avancées** et sélectionnez **« Afficher le menu Développement dans la barre de menus »**.

2\. Accédez à **Développement** > **Afficher l’inspecteur web**.

3\. Accédez à l'URL qui provoque les problèmes.

4\. En maintenant la touche Ctrl enfoncée, cliquez sur une ressource dans l’inspecteur web et cliquez sur **Export HAR**.

___

## Identifier le centre de données Cloudflare qui traite votre requête

Vous trouverez [une carte de nos datacenters](https://www.cloudflare.com/network-map) sur la [page de statut Cloudflare](https://www.cloudflarestatus.com/), triés par continent. Le code à trois lettres dans le nom du datacenter est le [code IATA](http://en.wikipedia.org/wiki/IATA_airport_code) de l’aéroport international majeur le plus proche. Déterminez quel centre de données Cloudflare traite les requêtes de votre navigateur en visitant :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  http://www.exemple.com/cdn-cgi/trace </span></div></span></span></span></code></pre>{{</raw>}}

Remplacez _www.exemple.com_ par votre nom de domaine et d'hôte.  Notez le champ **colo** de la sortie

___

## Dépannez les requêtes avec cURL

cURL est un outil de commande en ligne pour envoyer des requêtes HTTP/HTTPS, il est utile pour dépanner :

-   La performance HTTP/HTTPS
-   Les réponses d’erreur HTTP
-   Les en-têtes HTTP
-   Les API
-   La comparaison des réponses serveur/proxy
-   Les certificats SSL

Exécutez la commande suivante pour envoyer une requête HTTP GET standard à votre site web (remplacez _www.exemple.com_ par votre nom de domaine et nom d'hôte) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null http://www.exemple.com/</span></div></span></span></span></code></pre>{{</raw>}}

Cet exemple de commande cURL renvoie une sortie détaillant la réponse HTTP et les en-têtes de requête mais supprime la sortie du corps de la page. La sortie de cURL confirme la réponse HTTP et indique si Cloudflare proxyse actuellement du trafic pour le site. La présence de l'en-tête **CF-RAY** dans la réponse confirme que la requête a été proxysée par Cloudflare


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CF-RAY : 5097b5640cad8c56-LAX</span></div></span></span></span></code></pre>{{</raw>}}

Développez les sections ci-dessous pour obtenir des conseils sur le dépannage des erreurs HTTP, les performances, la mise en cache et les certificats SSL/TLS :

Lors du dépannage des erreurs HTTP dans les réponses de Cloudflare, vérifiez si votre origine a provoqué les erreurs en envoyant des requêtes directement à votre serveur web d'origine. Pour dépanner les erreurs HTTP, exécutez un cURL directement sur l’adresse IP de votre serveur web d'origine (en contournant le proxy Cloudflare) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null --header &quot;Host: exemple.com&quot; http://203.0.113.34/</span></div></span></span></span></code></pre>{{</raw>}}

Par exemple, si vous constatez une [erreur HTTP 520](https://support.cloudflare.com/hc/articles/115003011431#520error) dans le trafic proxysé à travers Cloudflare, exécutez un cURL vers le serveur web d'origine pour déterminer si des réponses vides sont envoyées :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null --resolve www.exemple.com:80:203.0.113.34 http://www.exemple.com/* www.exemple.com:80:203.0.113.34 vers cache DNS ajouté* Le nom d'hôte www.exemple.com a été trouvé dans le cache DNS* Essai avec 203.0.113.34...* Connecté à www.exemple.com (127.0.0.1) port 80 (#0)&gt; GET / HTTP/1.1&gt; Hôte : www.exemple.com&gt; User-Agent: curl/7.43.0&gt; Accepter : */*&gt;* Réponse vide du serveur</span></div></span></span></span></code></pre>{{</raw>}}

cURL mesure la latence ou la dégradation de la performance pour les requêtes HTTP/HTTPS via les options [_\-w_ ou _\--write-out_ de cURL](https://curl.haxx.se/docs/manpage.html#-w). L'exemple cURL ci-dessous mesure plusieurs vecteurs de performance dans la transaction de requête tels que la durée du handshake TLS, la recherche DNS, les redirections, les transferts, etc. :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://example.com/ -w &quot;\nContent Type: %{content_type} \\nHTTP Code: %{http_code} \\nHTTP Connect:%{http_connect} \\nNumber Connects: %{num_connects} \\nNumber Redirects: %{num_redirects} \\nRedirect URL: %{redirect_url} \\nSize Download: %{size_download} \\nSize Upload: %{size_upload} \\nSSL Verify: %{ssl_verify_result} \\nTime Handshake: %{time_appconnect} \\nTime Connect: %{time_connect} \\nName Lookup Time: %{time_namelookup} \\nTime Pretransfer: %{time_pretransfer} \\nTime Redirect: %{time_redirect} \\nTime Start Transfer: %{time_starttransfer} \\nTime Total: %{time_total} \\nEffective URL: %{url_effective}\n&quot; 2&gt;&amp;1</span></div></span></span></span></code></pre>{{</raw>}}

Vous trouverez une [explication sur cette sortie de synchronisation](https://blog.cloudflare.com/a-question-of-timing/) sur le blog de Cloudflare.

cURL permet de visualiser les en-têtes de réponse HTTP qui influencent la mise en cache. Examinez en particulier plusieurs en-têtes HTTP lors du dépannage de la mise en cache Cloudflare :

-   CF-Cache-Status
-   Cache-control/Pragma
-   Expires
-   Last-Modified
-   S-Maxage

#### Examen des certificats avec cURL

La commande cURL suivante montre le certificat SSL desservi par Cloudflare lors d'une requête HTTPS (remplacez _www.exemple.com_ par votre nom de domaine et votre nom d’hôte) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null https://www.exemple.com/ 2&gt;&amp;1 | egrep -v &quot;^{.*$|^}.*$|^\* http.*$&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Vérifiez le certificat d'origine (en supposant qu'il soit installé), remplacez _203.0.113.34_ par l'adresse IP réelle de votre serveur web d'origine et remplacez _www.exemple.com_ par votre nom de domaine et votre nom d’hôte :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -svo /dev/null --header &quot;Host: www.exemple.com&quot; http://203.0.113.34/ 2&gt;&amp;1 | egrep -v &quot;^{.*$|^}.*$|^\* http.*$&quot;</span></div></span></span></span></code></pre>{{</raw>}}

#### Test des versions TLS

En cas de dépannage de la prise en charge du navigateur ou de vérification des versions TLS prises en charge, cURL vous permet de tester une version TLS spécifique en ajoutant une des options suivantes à votre cURL :

-   \--tlsv1.0
-   \--tlsv1.1
-   \--tlsv1.2
-   \--tlsv1.3

___

## Mettre Cloudflare temporairement en pause

Mettez Cloudflare en pause pour envoyer du trafic directement à votre serveur web d'origine au lieu du proxy inverse de Cloudflare. Aucun service Cloudflare tel que SSL ou WAF n'est activé pour les domaines en pause.  Au lieu de mettre en pause Cloudflare dans son intégralité, vous pouvez passer en [nuage gris](https://support.cloudflare.com/hc/articles/200169626) les enregistrements recevant du trafic dans votre application **DNS** Cloudflare.

Pour mettre Cloudflare temporairement en pause :

1.  Accédez à l’onglet **Présentation** du tableau de bord de Cloudflare.
2.  Cliquez sur **Pause Cloudflare on Site** en bas à droite de la page dans **Advanced Actions**.

___

## Exécuter une commande traceroute

Traceroute est un outil de diagnostic des réseaux qui permet de mesurer la latence de transmission des paquets à travers un réseau. La majorité des systèmes d’exploitation prennent en charge la commande _traceroute_. Si vous avez des problèmes de connectivité avec votre site web proxy Cloudflare et que vous [demandez de l'aide au support Cloudflare](https://support.cloudflare.com/hc/articles/200172476), veillez à inclure la sortie d’une commande traceroute.

Consultez les instructions pour exécuter une traceroute sur différents systèmes d’exploitation. Remplacez _www.exemple.com_ par votre nom de domaine et nom d'hôte dans les exemples ci-dessous :

1.  Ouvrez le menu **Démarrer**.
2.  Cliquez sur **Exécuter**.
3.  Pour ouvrir l’interface de ligne de commande, tapez **cmd** puis cliquez sur **OK**.
4.  Dans l’invite de commande, tapez :  
    Pour IPv4 -  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; tracert www.exemple.com</span></div></span></span></span></code></pre>{{</raw>}}
    
    Pour IPv6 -  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; tracert -6 www.exemple.com</span></div></span></span></span></code></pre>{{</raw>}}
    
5.  Appuyez sur **Entrée**.
6.  Vous pouvez copier les résultats pour les enregistrer dans un fichier ou les coller dans un autre programme.

1.  Ouvrez une fenêtre de terminal.
2.  Dans l’invite de commande, tapez :  
    Pour IPv4 -  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; traceroute www.exemple.com</span></div></span></span></span></code></pre>{{</raw>}}
    
    Pour IPv6 -  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&gt; traceroute -6 www.example.com</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  Vous pouvez copier les résultats pour les enregistrer dans un fichier ou les coller dans un autre programme.

1.  Ouvrez l’application **Utilitaire de réseau**.
2.  Cliquez sur l’onglet **Traceroute**
3.  Saisissez le _domaine_ ou _l'adresse IP_ dans le champ de saisie approprié et appuyez sur **Trace**.
4.  Vous pouvez copier les résultats pour les enregistrer dans un fichier ou les coller dans un autre programme.

Vous pouvez également suivre les mêmes instructions de traceroute sur Linux ci-dessus lorsque vous utilisez le programme de terminal Mac OS.

___

## Ajoutez l’en-tête CF-RAY à vos journaux

L'en-tête **CF-RAY** permet de suivre une requête de site web sur le réseau Cloudflare. Transmettez le **CF-RAY**  d'une requête web au support Cloudflare dans le cadre du dépannage d'un problème. Vous pouvez également ajouter **CF-RAY** à vos journaux en éditant la configuration de votre serveur web d'origine avec le snippet ci-dessous qui correspond à votre marque de serveur web :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t \&quot;%r\&quot; %&gt;s %b \&quot;%{Referer}i\&quot; \&quot;%{User-agent}i\&quot; %{CF-Ray}i&quot; cf_custom</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">log_format cf_custom '$remote_addr - $remote_user [$time_local]  ''&quot;$request&quot; $status $body_bytes_sent ''&quot;$http_referer&quot; &quot;$http_user_agent&quot; ''$http_cf_ray';</span></div></span></span></span></code></pre>{{</raw>}}

___

## Ressources associées

-   [Contacter le support Cloudflare](https://support.cloudflare.com/hc/articles/200172476)
-   [Dépannage des erreurs HTTP 5XX Cloudflare](https://support.cloudflare.com/hc/articles/115003011431)
-   [Diagnostic des problèmes de réseau avec MTR et traceroute](https://www.digitalocean.com/community/tutorials/how-to-use-traceroute-and-mtr-to-diagnose-network-issues)
-   [Outil en ligne de commande cURL](https://curl.haxx.se/)
