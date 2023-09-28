---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360020739772-Utiliser-les-journaux-de-Cloudflare-ELS-pour-enqu%C3%AAter-sur-le-trafic-DDoS-Enterprise-uniquement-
title: Utiliser les journaux de Cloudflare (ELS) pour enquêter sur le trafic DDoS (Enterprise uniquement)
---

# Utiliser les journaux de Cloudflare (ELS) pour enquêter sur le trafic DDoS (Enterprise uniquement)

_Apprenez à localiser les sources de trafic malveillant en triant efficacement les journaux de Cloudflare (anciennement ELS)._ 

### Dans cet article

-   [Présentation](https://support.cloudflare.com/hc/fr-fr/articles/360020739772-Utiliser-les-journaux-de-Cloudflare-ELS-pour-enqu%C3%AAter-sur-le-trafic-DDoS-Enterprise-uniquement-#overview)
-   [Étape 1 : Rassemblez les informations dont vous avez besoin avant de consulter les journaux de Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/360020739772-Utiliser-les-journaux-de-Cloudflare-ELS-pour-enqu%C3%AAter-sur-le-trafic-DDoS-Enterprise-uniquement-#step1)
-   [Étape 2 : Téléchargez et sauvegardez les journaux](https://support.cloudflare.com/hc/fr-fr/articles/360020739772-Utiliser-les-journaux-de-Cloudflare-ELS-pour-enqu%C3%AAter-sur-le-trafic-DDoS-Enterprise-uniquement-#step2)
-   [Étape 3 : Classez les journaux](https://support.cloudflare.com/hc/fr-fr/articles/360020739772-Utiliser-les-journaux-de-Cloudflare-ELS-pour-enqu%C3%AAter-sur-le-trafic-DDoS-Enterprise-uniquement-#step3)
-   [Exemple de flux de travail](https://support.cloudflare.com/hc/fr-fr/articles/360020739772-Utiliser-les-journaux-de-Cloudflare-ELS-pour-enqu%C3%AAter-sur-le-trafic-DDoS-Enterprise-uniquement-#example-workflow)

___

## Présentation

Avec les journaux de Cloudflare (anciennement ELS), vous avez accès à des données utiles pour analyser le trafic qui pourrait montrer des modèles associés à une attaque DDoS. Vous pouvez effectuer ce type d'analyse en triant les données de vos journaux Cloudflare. Pour commencer, procédez comme suit et étudiez l'exemple de flux de travail fourni.

Avant de suivre ces instructions, vous avez besoin de :

-   [cat](http://www.linfo.org/cat.html)
-   [jq](https://stedolan.github.io/jq/)
-   [Logpull API des journaux de Cloudflare](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)

___

## Étape 1 : Rassemblez les informations dont vous avez besoin avant de consulter les journaux de Cloudflare

Rassemblez les informations suivantes :

1.  Adresse e-mail de l'administrateur de zone
2.  Identifiant de zone (dans**Overview** > **Zone ID**)
3.  Clé d'API client
4.  Heure de début (exemple de format : 1529171100)
5.  Heure de fin (exemple de format : 1529171100)

___

## Étape 2 : Téléchargez et sauvegardez les journaux

Remarque : Le point d’extrémité de Cloudflare a une limite de bande temporelle d’une heure et la taille des fichiers des journaux doit être inférieure à 1 Go par requête. Si la taille du fichier dépasse 1 Go, le téléchargement sera coupé à 1 Go, même si les événements enregistrés à partir du moment désiré ne sont pas inclus. Pour éviter de tronquer vos journaux, réduisez le temps de 1 heure à 45 minutes et ainsi de suite jusqu'à ce que la taille du fichier journal soit inférieure à 1 Go.

#### Option 1 :

**Téléchargez \*tous\* les champs des journaux Cloudflare, enregistrez-les au format els.txt :**

Modèle :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=(curl -s -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Exemple (avec valeurs) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/5b5f0xxxcbfbaxxxxxx0416d22f7b/logs/received?start=1529171100&amp;end=1529171100&amp;fields=(curl -s -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

#### Option 2 :

**Téléchargez les champs \*spécifiques\* des journaux de Cloudflare, sauvegardez-les dans els.txt :  
**

Cette commande inclura uniquement les champs suivants dans les journaux que vous avez demandés : _CacheCacheStatus, CacheResponseBytes, CacheResponseStatus, CacheTieredFill, ClientASN_.

Vous pouvez consulter la liste complète des champs Cloudflare Logs [ici](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API). 

Modèle :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:email&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

Exemple (avec valeurs) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:monkey@bannana.com&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/xx5x0xxxc45baxxxxxx0x6d23fxx/logs/received?start=1529171100&amp;end=1529171100&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

___

## Étape 3 : Triez les journaux

Triez les journaux par valeur de champ et copiez-les dans un fichier.Triez-les par réponse HTTP 200, puis copiez-les dans un fichier appelé els-200.txt :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

Triez-les par réponse HTTP 525, puis copiez-les dans un fichier appelé els-525.txt


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:525,&quot; &gt; els-525.txt</span></div></span></span></span></code></pre>{{</raw>}}

**D'où provient** la **valeur de champ « :525, »** **?**

Le modèle _:525,_ (deux points, code de statut, virgule) est propre au champ _EdgeResponseStatus_. La seule recherche du code de statut HTTP _525_ sans les deux points et la virgule de fin inclurait également les entrées de journaux qui avaient le modèle _525_ dans d'autres champs comme _EdgeStartTimeStamp_, par exemple, qui contient plusieurs nombres et peut aussi contenir la séquence de nombres _525_.

![](/images/support/12.png)

Remarque : les fichiers produits (els-200.txt et els-525.txt) ne sont pas très lisibles tels quels. Afin de les visualiser dans un format plus lisible, utilisez jq dans la commande suivante :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-525.txt | jq '.'</span></div></span></span></span></code></pre>{{</raw>}}

**Comptez les** **requêtes** **par** **champ** **et copiez-les dans un** **fichier**

Dans cet exemple, nous comptons les requêtes par version de protocole SSL, ce qui est défini par le champ _ClientSSLProtocol_ dans les journaux Cloudflare (notez le point précédant le nom de champ ci-dessous).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientSSLProtocol els-200.txt |sort -n |uniq -c |sort -n &gt; ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Exemple de sortie :**

![](/images/support/11.png)

Les champs _ClientRequestURI, ClientIP, ClientRequestUserAgent, ClientCountry_ et _ClientRequestHost_ sont généralement les plus utiles pour trouver les modèles d'attaque dans ces journaux.

-   Le tri par _ClientRequestUserAgent_ vous permet de définir les règles de blocage d'agent-utilisateur.
-   Le tri par _ClientCountry_ vous permet de définir des règles de pare-feu en fonction du pays.
-   Le tri par _ClientRequestURI_ vous permettra de définir des règles de limitation de débit pour les pages recevant le plus grand nombre de requêtes.

___

## Exemple de flux de travail

Souvent, vous aurez besoin de trier par plusieurs champs pour analyser et identifier la source d'une attaque. Examinons par exemple le flux de travail suivant :

**Action 1** : Triez vos journaux Cloudflare téléchargés par réponse _HTTP 200_, et copiez-les dans els-200.txt.

**Raison** : Vous n'avez pas besoin des réponses qui sont déjà bloquées par Cloudflare, c'est à dire des requêtes qui donnent lieu à une réponse HTTP _503_ ou _403_. Une requête qui renvoie une réponse _HTTP 200_ à notre périmètre n'est pas bloquée par Cloudflare et poursuivra probablement son chemin jusqu'au serveur d'origine si l’actif n'est pas mis en cache sur le périmètre de Cloudflare. De telles requêtes, lorsqu'elles sont malveillantes, sont spécialement conçues pour surcharger le serveur d'origine.

**Procédure à suivre** :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

**  
Action 2**: Triez vos journaux « uniquement HTTP 200 » par URI, puis copiez-les dans els-200-URI.txt.

**Raison** : Sur les 200 réponses, vous voulez voir les pages faisant l’objet du plus grand nombre de requêtes.

**Procédure à suivre** :

Trouvez les URI supérieurs :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientRequestURI els-200.txt |sort -n |uniq -c |sort -n &gt; els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}

Choisissez une URI dans cette liste et copiez les entrées du journal avec cette URI dans leur propre fichier. Pour ce faire, remplacez _/ClientRequestURI/path/to/something/_ dans la commande ci-dessous avec l'URI de votre choix :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200.txt| grep &quot;/ClientRequestURI/path/to/something/&quot; &gt; els-200-URI-1.txt</span></div></span></span></span></code></pre>{{</raw>}}

**  
Action 3** : Comptez les réponses spécifiques URI, « HTTP 200 uniquement » par adresse IP, puis copiez-les dans els-200-URI-1-Top-IP.txt

**Raison** : Vous devez voir les principales adresses IP qui sollicitent l'URI et qui génèrent une réponse 200.

**Comment faire :**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientIP els-200-URI-1.txt |sort -n |uniq -c |sort -n &gt; els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Copiez le contenu du fichier :**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

Vous pouvez réduire les réponses HTTP 200 à la fois par l'URI de la requête et par les IP qui sollicitent ces URI. Vous pouvez également classer les journaux dans l'autre sens, en réduisant les entrées du journal par les adresses IP supérieures, puis en déterminant quelle URI est la plus sollicitée par adresse IP.
