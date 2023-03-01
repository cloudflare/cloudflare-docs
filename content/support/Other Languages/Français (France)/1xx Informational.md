---
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115003013892-1xx-Informational
title: 1xx Informational
---

# 1xx Informational

## 1xx Informational

**Présentation**

Les codes 1xx sont souvent des réponses provisoires qui donnent des informations sur le statut de la connexion. Ils ne servent pas pour les requêtes ou les réponses finales. Exigences issues du serveur :

-   Réponses toutes terminées par la première ligne vide après la ligne de statut

-   Non utilisés pour HTTP 1.0. Le serveur d'origine ne doit jamais envoyer de réponse 1xx au client HTTP 1.0

Cloudflare transmettra toutes ces réponses et ne générera jamais cette réponse.

-   [100 Continuer](https://support.cloudflare.com/hc/fr-fr/articles/115003013892-1xx-Informational#code_100)
-   [101 Changement de protocole](https://support.cloudflare.com/hc/fr-fr/articles/115003013892-1xx-Informational#code_101)
-   [102 Traitement](https://support.cloudflare.com/hc/fr-fr/articles/115003013892-1xx-Informational#code_102)

**100 Continuer ([RFC7231](https://tools.ietf.org/html/rfc7231))**

Confirmation de la requête initiale d'envoi d'un corps de réponse. Le serveur d'origine est prêt à accepter la requête (d'après les en-têtes de requête). Elle est renvoyée avant que le client n'envoie généralement le corps de la réponse. Cela empêche les clients d'envoyer des données inutiles ou inutilisables. Requis du serveur : Si le client envoie l'en-tête `Expect : En-tête 100-continue`, le serveur doit répondre immédiatement avec soit `100 Continue` et continuer à lire à partir du flux d'entrée, soit envoyer un autre code de réponse. Cloudflare utilise des connexions Keep-Alive, donc cette réponse ne devrait pas être nécessaire.

**101 Changement de protocole ([RFC7231](https://tools.ietf.org/html/rfc7231))**


**102 Traitement ([RFC2518](https://tools.ietf.org/html/rfc2518))**

Le serveur a reçu la réponse complète du client, mais s'attend à ce que le traitement prenne plus de temps (p. ex. > 20 secondes). Le serveur doit envoyer une réponse finale après que la requête a été complétée. Utilisé uniquement pour HTTP 1.1 et les versions supérieures.

Si Cloudflare ne reçoit pas de réponse dans les 100 secondes ou moins après un code 102, une [erreur 522 : Délai de connexion dépassé](https://support.cloudflare.com/hc/articles/115003011431#522error) sera généré. On peut utiliser les réponses 102 pour empêcher [l’erreur 524 : Erreur de délai d’attente](https://support.cloudflare.com/hc/articles/115003011431#524error).
