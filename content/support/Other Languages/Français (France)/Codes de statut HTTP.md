---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115003014432-Codes-de-statut-HTTP
title: Codes de statut HTTP
---

# Codes de statut HTTP

## Codes de statut HTTP

Ces documents constituent l'interprétation de Cloudflare du protocole de suivi des normes Internet pour les codes de réponse HTTP. Veuillez vous référer à l'édition en cours des « normes officielles de protocoles de l’Internet » (STD 1) pour connaître l'état normalisation et le statut de ce protocole. Nous avons également inclus tous les codes d'erreur personnalisés de Cloudflare (52x) et d'autres codes de statut fréquents communément rencontrés.

Dans ces articles, nous faisons assez souvent référence aux termes suivants. Pour vous fournir du contenu, voici la définition que nous donnons aux termes suivants :

**Serveur -** Toute partie recevant une requête et envoyant une réponse. Soit le serveur d'origine, soit les serveurs intermédiaires.

**Serveur d'origine/hôte** \- Le serveur de destination finale. Ce serveur héberge le contenu du site web.

**Serveur proxy** \- Le ou les serveurs se trouvant entre le serveur d'origine et le client. Par exemple, Cloudflare est un serveur proxy.

**Client** \- La partie qui effectue la requête. Il s'agit généralement d'un utilisateur final accédant au site à partir d'un navigateur, mais il peut également s'agir d'un client API ou de quiconque sollicitant des ressources de ce site.

**Back-end** - Les connexions qui ne sont pas établies vers ou depuis le client, mais entre le ou les serveur(s) proxy et/ou le serveur d'origine

**Agent utilisateur** - La machine utilisée pour envoyer la requête. Il peut s'agir d'un navigateur ou d'un autre programme effectuant des requêtes (par exemple, des requêtes d'API RESTful)

**Payload** - la réponse ou la requête de données excluant les en-têtes. Également appelé corps de la requête ou de la réponse

**Remarque concernant la mise en cache** : _Tout code de statut HTTP pouvant être mis en cache par défaut sera également considéré comme pouvant être mis en cache par Cloudflare (c.-à-d., sauf indication contraire dans la définition de la méthode ou dans les contrôles de cache explicites). Cloudflare met en cache les réponses HTTP de la même manière que toute requête est mise en cache. Cloudflare prend en compte les Page Rules, Edge TTL et les en-têtes d'origine au moment de décider s'il faut mettre en cache ou non. Pour plus d’informations [Que dois-je dire à Cloudflare de mette en cache ?](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-CloudFlare-What-to-Cache-)et [Que signifie edge TTL ?](https://support.cloudflare.com/hc/en-us/articles/200168376)_

**Codes de statut HTTP :**

**[1xx Informational](https://support.cloudflare.com/hc/en-us/articles/115003013892/)**

**[2xx Success](https://support.cloudflare.com/hc/en-us/articles/115003014192)**

**[3xx Redirect](https://support.cloudflare.com/hc/en-us/articles/115003011091/)**

**[4xx Client Error](https://support.cloudflare.com/hc/en-us/articles/115003014512/)**

**[5xx Server Error](https://support.cloudflare.com/hc/en-us/articles/115003011431/)**
