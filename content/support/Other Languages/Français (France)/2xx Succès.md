---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115003014192-2xx-Succ%C3%A8s
title: 2xx Succès
---

# 2xx Succès

**Présentation**

Les codes 2xx désignent des réponses positives, ce qui signifie habituellement que l'action demandée par le client a été reçue, comprise et acceptée avec succès.

-   [200 OK](https://support.cloudflare.com/hc/fr-fr/articles/115003014192-2xx-Succ%C3%A8s#code_200)
-   [201 Created](https://support.cloudflare.com/hc/fr-fr/articles/115003014192-2xx-Succ%C3%A8s#code_201)
-   [202 Accepted](https://support.cloudflare.com/hc/fr-fr/articles/115003014192-2xx-Succ%C3%A8s#code_202)
-   [203 Non-Authoritative](https://support.cloudflare.com/hc/fr-fr/articles/115003014192-2xx-Succ%C3%A8s#code_203)
-   [204 No Content](https://support.cloudflare.com/hc/fr-fr/articles/115003014192-2xx-Succ%C3%A8s#code_204)
-   [205 Reset Content](https://support.cloudflare.com/hc/fr-fr/articles/115003014192-2xx-Succ%C3%A8s#code_205)
-   [206 Partial Content](https://support.cloudflare.com/hc/fr-fr/articles/115003014192-2xx-Succ%C3%A8s#code_206)

**200 OK** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

La réponse préférée de tous : la requête a abouti.

Le payload de la réponse dépendra de la méthode de requête utilisée. Le corps de réponse attendu pour la méthode de requête correspondante est le suivant :

-   GET -  les en-têtes et les données correspondant à la ressource demandée
-   HEAD - Uniquement les en-têtes correspondant à la ressource demandée sans les données réelles
-   POST - le statut de l'action ou les résultats obtenus de l’action

Une réponse 200 _devrait_ toujours avoir un payload mais ce n'est pas obligatoire, donc un serveur d'origine peut générer une réponse 200 avec une longueur zéro. Pour adhérer aux normes RFC, il faut générer un RFC 204 dans ce cas (exception CONNECT)

Mise en cache par défaut par les serveurs proxy et les navigateurs. Si cela n'est pas spécifié par les [contrôles de cache](https://support.cloudflare.com/hc/en-us/articles/202775670) de Cloudflare, les [ressources statiques](https://support.cloudflare.com/hc/en-us/articles/200172516) avec cette réponse mettront en cache les ressources par défaut pendant 2 heures à notre périmètre.  

**201 Created** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

La requête a abouti et une ou plusieurs nouvelles ressources sont en cours de création. L'emplacement de la nouvelle ressource doit être présent soit dans le champ d'en-tête Location, soit par l'URI de la requête. Généralement, le payload décrira et référencera les liens vers la ressource nouvellement générée.

-   Voir [la section 7.2 de RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.2) pour voir une discussion sur la signification et le but des champs d'en-tête du validateur, tels que ETag et Last-Modified, dans une réponse 201.

**202 Accepted** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

La requête a été acceptée. Elle est en cours de traitement par le serveur d'origine.  Selon les spécifications du serveur, le client peut ou non donner suite à la requête pendant que le traitement a effectivement lieu.

**203 Non-Authoritative Information** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Le remplacement facultatif du code de statut 200 pour expliquer la requête a réussi mais ne venait pas directement du serveur d'origine. La réponse d'origine du serveur d'origine a été modifiée par un serveur proxy ou intermédiaire. Par exemple, les codes 203 pourraient être utilisés pour informer le client que cette ressource a été mise en cache sur un proxy, de sorte qu'une requête future similaire peut ou non atteindre ce serveur cache avec cette ressource identique. Un autre exemple est la suppression d’un en-tête qui n'est applicable qu'au serveur d'origine local.

-   Est une réponse pouvant être mise en cache par défaut, cependant, Cloudflare ne la mettra pas en cache.
-   Cloudflare ne générera jamais de réponses mais pourra les mettre en proxy à partir d'autres proxies le cas échéant. Cloudflare respecte les réponses des serveurs d'origine avec ces exceptions : [Comment Cloudflare gère les en-têtes de requêtes HTTP ?](https://support.cloudflare.com/hc/en-us/articles/200170986)

**204 No Content ([RFC7231](https://tools.ietf.org/html/rfc7231))**

Les actions demandées ont été exécutées correctement sur le serveur d'origine. Le cas d'utilisation courant est celui des éditeurs de documents : l'action « enregistrer » est envoyée au serveur d'origine, mais aucun payload ne doit être renvoyé au client. Il se peut que certains veuillent quand même informer l'utilisateur que l'enregistrement a réussi.

-   Il ne doit jamais y avoir de payload lorsqu'une réponse 204 est renvoyée.
-   Est une réponse pouvant être mise en cache par défaut, cependant, Cloudflare ne la mettra pas en cache.

**205 Reset Content** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Le serveur d'origine suggère au client de réinitialiser l'affichage à son état d'origine avant la requête. Souvent utilisé dans les formulaires ou autres soumissions d'entrée où un payload est envoyé dans la requête, le serveur d'origine a bien fonctionné et informe maintenant le navigateur que des soumissions supplémentaires sont autorisées.

-   Une réponse 205 ne doit jamais renvoyer un payload. Longueur de contenu de 0 ou réponses fragmentées uniquement immédiatement suivies d'une réponse proche ou de zéro octet autorisée uniquement.

**206 Partial Content (**[**RFC 7233**](https://tools.ietf.org/html/rfc7233)**)**

La requête pour une partie d'une ressource a été acceptée et se trouve dans le payload. La requête doit avoir indiqué la portée du contenu par l'un ou l'autre des moyens suivants :

1.  Une seule requête partielle avec des en-têtes HTTP incluant la portée du contenu suivie de la taille. (Si elle est présente dans l'en-tête de réponse, elle doit être exactement égale aux octets du payload) p. ex. `Content Range : bytes 21010-47021/47022`
2.   Plusieurs blocs avec `Content-Type: multipart/byteranges`dans l'en-tête HTTP et incluant les champs Content-Range pour chaque partie individuellement mais _pas_ dans l’ **en-tête HTTP** de réponse. La limite est également exigée, tel que spécifié par la [Section 4.1 de RFC 7233](https://tools.ietf.org/html/rfc7233%23section-4.1) p. ex.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> HTTP/1.1 206 Contenu partiel     Date : Mer. 15 Nov 1995 06:25:24 GMT     Dernière modification : Mer. 15 Nov 1995 04:58:08 GMT     Longueur de contenu : 1741     Type de contenu : multipart/byteranges; boundary=THIS_STRING_SEPARATES     --THIS_STRING_SEPARATES     Content-Type: application/pdf     Content-Range: bytes 500-999/8000     ... la première plage...     --THIS_STRING_SEPARATES     Content-Type: application/pdf     Content-Range: bytes 7000-7999/8000     ... la deuxième plage     --THIS_STRING_SEPARATES--</span></div></span></span></span></code></pre>{{</raw>}}

 Les codes 206 sont utiles pour les clients qui traitent des fichiers volumineux nécessitant des téléchargements fractionnés ou interrompus avec plusieurs flux simultanés pour une latence améliorée.
