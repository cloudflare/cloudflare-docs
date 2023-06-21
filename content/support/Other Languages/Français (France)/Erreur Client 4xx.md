---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx
title: Erreur Client 4xx
---

# Erreur Client 4xx

**Présentation**

En général, les codes 4xx sont des réponses d’erreur spécifiant un problème du côté du client. Potentiellement un problème de réseau.  

-   Peut être utilisée comme réponse à toute méthode de requête

-   Le serveur d’origine doit inclure une explication et l’explication qui devra être affichée par l’agent utilisateur, à l’exception d’une requête `HEAD`

Cloudflare transmettra ces erreurs directement depuis votre serveur d’origine

-   [400 Bad Request   (Requête incorrecte)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_400)
-   [401 Unauthorized (Non autorisé)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_401)
-   [402 Payment Required (Paiement nécessaire)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_402)
-   [403 Forbidden (Interdit)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_403)
-   [404 Not Found (Introuvable)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_404)
-   [405 Method Not Allowed (Méthode non autorisée)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_405)
-   [406 Not Acceptable (Inacceptable)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_406)
-   [407 Authentication Required (Authentification nécessaire)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_407)
-   [408 Request Timeout (délai de la requête)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_408)
-   [409 Conflict (Conflit)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_409)
-   [410 Gone (Absent)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_410)
-   [411 Length Required (Longueur exigée)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_411)
-   [412 Precondition Failed (Échec de la précondition)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_412)
-   [413 Payload Too Large (Payload trop important)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_413)
-   [414 URI Too Long (URI trop long)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_414)
-   [415 Unsupported Media Type (Type de support non pris en charge)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_415)
-   [417 Expectation Failed (Échec de l’attente)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_417)
-   [429 Too Many Requests (Trop de requêtes)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_429)
-   [451 Unavailable For Legal (Indisponible pour des raisons juridiques)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_451)
-   [499 Client Close Request (Requête de clôture du client)](https://support.cloudflare.com/hc/fr-fr/articles/115003014512-Erreur-Client-4xx#code_499)

**400 Bad Request (Requête incorrecte)****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Le serveur ne peut pas ou ne veut pas traiter la requête, car un élément est perçu comme une erreur du client (par exemple, une mauvaise syntaxe de la requête, une structure invalide du message de requête ou un routage falsifié de la requête).

**401 Unauthorized (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)** (Non autorisé)

La requête n’a pas été envoyée avec les bons identifiants d’authentification

-   Le serveur doit envoyer la requête avec au moins un test sous la forme d’un champ d’en-tête `WWW-Authenticate` conformément à la [Section 4.1](https://tools.ietf.org/html/rfc7235#section-4.1)
-   Le client peut envoyer une deuxième requête avec les mêmes identifiants et ensuite, si le test est identique au précédent, le serveur fournira une entité pour aider le client à trouver les identifiants nécessaires.

**402 Payment Required** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Paiement nécessaire)

Pas encore mis en place par les normes RFC, mais réservé pour une utilisation ultérieure

**403 Forbidden** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Interdit)

Si vous rencontrez une erreur 403 sans l’image Cloudflare, elle provient toujours directement du serveur web d’origine et non de Cloudflare. Elle est généralement liée aux règles d’autorisation sur votre serveur.

Les causes principales de cette erreur sont :  
1\. Les règles d’autorisation que vous avez configurées, ou une erreur dans les règles .htaccess que vous avez configurées  
2\. Les règles mod\_security.  
3\. Les règles de refus d’adresses IP

Dans la mesure où Cloudflare ne peut pas accéder directement à votre serveur, veuillez contacter votre fournisseur d’hébergement pour résoudre les erreurs 403 et modifier les règles. Assurez-vous que les [adresses IP de Cloudflare](https://www.cloudflare.com/ips) ne sont pas bloquées. 

Cloudflare générera des réponses 403 si la requête a violé soit une règle WAF par défaut activée pour tous les domaines Cloudflare en nuage orange, soit une règle WAF activée pour cette zone en particulier. Pour en savoir plus, lire : [Que fait le Web Application Firewall ?](https://support.cloudflare.com/hc/en-us/articles/200172016) Cloudflare produira également une réponse « 403 Forbidden » pour les connexions SSL aux sous-domaines qui ne sont pas couverts par un certificat Cloudflare ou un certificat SSL chargé.

Si vous rencontrez une réponse 403 qui contient la marque Cloudflare dans le corps de la réponse, cela représente le code de réponse HTTP retourné avec un grand nombre de nos fonctionnalités de sécurité :

-   Test du Web Application Firewall et pages de blocage
-   Tests de niveau de protection de base
-   Majorité des codes d’erreur Cloudflare 1xxx
-   Vérification de l'intégrité du navigateur
-   Si vous essayez d'accéder à un deuxième niveau de sous-domaines (par exemple `*.*.exemple.com`) par Cloudflare en utilisant le certificat émis par Cloudflare, une erreur HTTP 403 apparaîtra dans le navigateur, car ces noms d'hôtes ne sont pas présents sur le certificat.

Si vous avez des questions, contactez le support Cloudflare en incluant une capture d’écran du message ou en copiant l’intégralité du texte de la page dans un ticket de support.

**404 Not Found** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Introuvable)

Le serveur d’origine n’a pas pu ou n’a pas voulu trouver la ressource demandée. Cela signifie en général que le serveur hôte n’a pas pu trouver la ressource. Pour produire une version plus permanente de cette erreur, il faudrait utiliser un code d’erreur 410.

Ces erreurs se produisent généralement lorsque quelqu'un a mal saisi une URL sur votre site, lorsqu'une autre page comporte un lien brisé, lorsqu'une page qui existait auparavant est déplacée ou supprimée, ou en cas d’existence d’une erreur quand un moteur de recherche indexe votre site. Dans le cas d'un site standard, ces erreurs représentent environ 3 % du nombre total de consultation de pages, mais elles sont souvent ignorées par les plateformes d'analyse traditionnelles comme Google Analytics.

En général, les propriétaires de sites web mettent en place une page personnalisée desservie lorsque cette erreur est générée. Par exemple, [Mise en place de pages 404 personnalisées dans Apache](https://www.digitalocean.com/community/tutorials/how-to-create-a-custom-404-page-in-apache).

Cloudflare ne génère pas d’erreurs 404 pour les sites web des clients. Nous proxysons uniquement la requête depuis le serveur d’origine. Lorsque vous voyez une erreur 404 sur votre site optimisé par Cloudflare, vous devez contacter votre fournisseur d’hébergement pour obtenir de l’aide.

**405 Method Not Allowed** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Méthode non autorisée)

Le serveur d’origine a connaissance de la ressource demandée, mais la méthode utilisée pour la requête n’est pas prise en charge.

-   Le serveur d’origine doit également fournir un en-tête `Allow` avec une liste de cibles prises en charge pour cette ressource.

On peut citer comme exemple, un POST sur une ressource inchangeable, qui n’accepte donc que GET.

**406 Not Acceptable** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Inacceptable)

La ressource n’est pas disponible au niveau du serveur d’origine qui se conforme aux en-têtes de négociation qui ont été définis précédemment (par ex. via les en-têtes `Accept-Charset` et `Accept-Language`)

Ce code peut être remplacé en appliquant simplement la méthode la moins privilégiée à l’agent utilisateur au lieu de générer cette erreur.

**407 Authentication Required  (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)** (Authentification exigée)

Le client n’a pas envoyé l’authentification exigée avec la requête.

**408 Request Timeout**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Délai expiré pour la requête)

Le serveur d’origine n’a pas reçu la requête complète dans un délai considéré comme raisonnable.

-   Implique que le serveur ne souhaite pas attendre et continuer la connexion.

-   Peu utilisée, car les serveurs choisissent en général d’utiliser l’option de connexion « fermeture ».

**409 Conflict** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Conflit)

La requête n’a pas abouti, en raison d’un conflit avec l’état actuel de la ressource. Survient en général sur une requête PUT, pour laquelle plusieurs clients tentent de modifier la même ressource.

-   Le serveur _doit_ générer une charge utile qui comprend suffisamment d’informations pour que le client reconnaisse la source du conflit.
-   Le client peut et doit réitérer la requête

Cloudflare générera et produira une réponse 409 pour une [erreur 1001 : Erreur de résolution DNS](https://support.cloudflare.com/hc/articles/360029779472#error1001).

**410 Gone** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Absent)

La ressource demandée est manquante de façon permanente sur le serveur d’origine.

-   Le serveur suggère la référence des liens que la ressource devra supprimer.
-   Le serveur n’est pas qualifié pour utiliser ce code de statut pour une réponse 404 et n’est pas obligé d’avoir cette réponse pendant une durée spécifique.

**411 Length Required** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Longueur exigée)

Le client n’a pas défini la `longueur du contenu` du corps de la requête dans les en-têtes et celle-ci est obligatoire pour obtenir la ressource.

-   Le client peut renvoyer la requête après avoir ajouté le champ d’en-tête.

**412 Precondition Failed  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)** (Échec de la précondition)

Le serveur refuse la requête, car la ressource ne respecte pas les conditions spécifiées par le client.

Comme exemple de contrôle de version, un client modifie une ressource existante et ainsi définit l’en-tête `If-Unmodified-Since` pour qu’il corresponde à la date à laquelle le client a téléchargé la ressource et commencé les modifications. Si la ressource a été modifiée (probablement par un autre client) après cette date et avant le chargement des modifications, cette réponse sera générée puisque la date de la dernière modification sera postérieure à la date définie dans `If-Unmodified-Since` par le client.

Cloudflare générera cette réponse. Pour en savoir plus, voir : [En-têtes ETag](https://support.cloudflare.com/hc/en-us/articles/218505467)

**413 Payload Too Large**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Payload trop important)

Refus du serveur de traiter la requête, car le payload envoyé par le client est supérieur à ce que le serveur entendait accepter. Le serveur a l’option de fermer la connexion.

-   Si ce refus ne se produit que de façon temporaire, alors il doit envoyer un en-tête `Retry-After` pour spécifier le moment où le client doit réessayer la requête.

**414 URI Too Long** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (URI trop long)

Refus du serveur, car l’URI est trop long pour être traité. Par exemple, si un client tente une requête GET avec un URI de longueur inhabituelle après un POST, cela pourrait être considéré comme un risque de sécurité et une erreur 414 est générée.

Cloudflare générera cette réponse pour un URI dont la longueur est supérieure à 32 Ko

**415 Unsupported Media Type** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Type de support non pris en charge)

Refus du serveur de traiter le format du payload actuel. Une façon d’identifier et de résoudre ce problème consiste à examiner les en-têtes `Content-Type` ou `Content-Encoding` envoyés dans la requête du client.

**417 Expectation Failed** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)** (Échec de l’attente)

Échec du serveur à respecter les exigences spécifiées dans l’en-tête `Expect` de la requête du client.

**429 Too Many Requests (**[**RFC6585**](https://tools.ietf.org/html/rfc6585)**)** (Trop de requêtes)

Le client a envoyé trop de requêtes pendant la période spécifiée par le serveur. Souvent appelée « rate limiting ». Le serveur peut répondre en donnant des informations permettant au demandeur de réessayer après une période spécifiée.

Cloudflare générera et enverra ce code de statut lorsqu’une requête est [limitée en termes de débit](https://www.cloudflare.com/rate-limiting/). Si les visiteurs de votre site reçoivent ces codes d’erreur, vous pourrez le voir dans le [Rate Limiting Analytics](https://support.cloudflare.com/hc/en-us/articles/115003414428-Rate-Limiting-Analytics).

**451 Unavailable For Legal Reason (**[**RFC7725**](https://tools.ietf.org/html/rfc7725)**)** (Indisponible pour des raisons juridiques)

Le serveur est incapable de produire la ressource en raison de procédures juridiques.

En général, les moteurs de recherche (par ex., Google) et les fournisseurs d’accès Internet (par ex., ATT) sont ceux qui sont affectés par ce code de réponse, et non le serveur d’origine.

-   La réponse doit inclure une explication dans le corps de la réponse donnant des informations détaillées sur la procédure juridique.

**499 Client Close Request** (Requête de clôture du client)

Code de réponse spécifique à Nginx pour indiquer quand la connexion a été fermée par le client alors que le serveur est toujours en train de traiter sa requête, ce qui rend le serveur incapable de renvoyer un code de statut.

-   Cela sera décrit dans [Enterprise Log Share e](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-REST-API) et analyses des codes de statut pour les clients Enterprise.
