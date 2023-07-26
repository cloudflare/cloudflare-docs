---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting
title: Configuration de Cloudflare Rate Limiting
---

# Configuration de Cloudflare Rate Limiting

_Configurez Cloudflare Rate Limiting pour protéger l'application de votre site web contre les attaques par déni de service, les tentatives de connexion par force brute et d'autres types d'attaques._

### Dans cet article

-   [Aperçu](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#4TBnjI1OqjroF6MLXB3Wmr)
-   [Données analytiques](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#7Cy9dajZBWM5pm9aIP5mMD)
-   [Allocations Rate Limiting par offre](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#4gd3s4xzV2xOE4CUbRIEAo)
-   [Composants d'une règle Rate Limiting](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#4uDonp8FX9ARo4nzdBvXiY)
-   [Identifier les seuils de limite de taux](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#o8KwUgkUml3Y7bAapvXjP)
-   [Tâche 1 : configurer une règle Rate Limiting de base](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#3UWQC5PrVScHgEGRMobRMm)
-   [Tâche 2 : configurer les critères avancés (offres Business et Enterprise uniquement).](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#5iIwkkHwcJbNRynWjrDIGb)
-   [Tâche 3 : configurer la réponse avancée (offres Business et Enterprise uniquement).](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#7uCtK6GPAfWDNlSHch7KBs)
-   [Tâche 4 : configurer l'option Bypass (offres Enterprise uniquement)](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#3rCyCwZTjnPl3brIt7Ytrg)
-   [Ordre d'exécution des règles](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#rule-execution-order)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/115001635128-Configuration-de-Cloudflare-Rate-Limiting#516XYZwx0Mdhh7hLMg60iT)

___

## Aperçu

Cloudflare **Rate Limiting** identifie et atténue automatiquement les taux de requêtes excessifs pour des URL spécifiques ou pour l'ensemble d'un domaine. Le taux de requêtes est calculé localement pour les datacenters Cloudflare individuels. Les utilisations les plus courantes de **Rate Limiting** sont la protection contre les attaques [DDoS](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/) , la protection contre les [attaques par force brute](https://www.cloudflare.com/learning/bots/brute-force-attack/) et la limitation de l'accès aux fonctions de recherche des forums, aux appels d'API ou aux ressources impliquant des opérations sollicitant fortement les bases de bases de données sur votre site web d'origine.

Lorsqu'une adresse IPv4 individuelle ou une plage d'adresses IPv6/64 dépasse le seuil fixé par la règle, les autres requêtes adressées au serveur web d'origine sont bloquées avec une réponse HTTP 429, comprenant un en-tête **Retry-After** indiquant quand le client peut recommencer à envoyer des requêtes.

___

## Données analytiques

Consultez les données analytiques Rate Limiting sous **Analytics** > **Security** (Sécurité). Les données analytiques Rate Limiting utilisent des lignes pleines pour représenter le trafic correspondant aux requêtes simulées et des lignes en pointillés pour représenter les requêtes réellement bloquées. Les journaux générés par une règle Rate Limiting sont uniquement visibles par les clients Enterprise, via [Cloudflare Logs](/logs/).

Cloudflare renvoie une erreur HTTP 429 pour les requêtes bloquées.  Des informations détaillées sur les requêtes bloquées par site sont fournies aux clients Enterprise sous **Status Codes** (Codes d'état) dans le tableau de bord analytique, disponible sous **Analytics** > **Traffic** (Trafic).

___

## Allocations Rate Limiting par offre

Le nombre de règles Rate Limiting autorisées dépend de l'offre souscrite pour le domaine :

| Offre | Nombre de règles | Actions | Durée de l'action | Intervalle des requêtes |
| --- | --- | --- | --- | --- |
| Free | 1 | Block | 1 minute ou 1 heure | 10 secondes ou 1 minute |
| Pro | 10 | Block (Bloquer), Legacy CAPTCHA (CAPTCHA hérité), JS Challenge (Vérification JS), Managed Challenge (Vérification gérée) ou Log (Journal) | 1 minute ou 1 heure | 10 secondes ou 1 minute |
| Business | 15 | Block (Bloquer), Legacy CAPTCHA (CAPTCHA hérité), JS Challenge (Vérification JS), Managed Challenge (Vérification gérée) ou Log (Journal) | 1 minute, 1 heure ou 24 heures | 10 secondes, 1 minute ou 10 minutes |
| Enterprise | 100 | Block (Bloquer), Legacy CAPTCHA (CAPTCHA hérité), JS Challenge (Vérification JS), Managed Challenge (Vérification gérée) ou Log (Journal) | Toute durée entre 10 secondes et 86 400 secondes (24 heures) | Toute durée entre 10 secondes et 3 600 secondes (1 heure) |

Cloudflare Rate Limiting prend en charge plusieurs niveaux de contrôle de la configuration, en fonction de l'offre Cloudflare souscrite pour le domaine. Le tableau ci-dessous indique les tâches que vous pouvez effectuer en fonction de votre offre :

| 
la hausse

 | 

Tâche

 | 

Disponible pour

 |
| --- | --- | --- |
| 

1

 | 

Configurer une règle Rate Limiting de base

 | 

Toutes les offres

 |
| 

2

 | 

Configurer des critères avancés

 | 

Offres Business et Enterprise

 |
| 

3

 | 

Configurer une réponse avancée

 | 

Offres Business et Enterprise

 |
| 

4

 | 

Configurer l'option Bypass

 | 

Offre Entreprise

 |

___

## Composants d'une règle Rate Limiting

Une règle Rate Limiting consiste en trois composants distincts, décrits ci-dessous. Cliquez sur un composant ci-dessous pour afficher les informations détaillées :

La correspondance des requêtes entrantes est établie en fonction des critères suivants :

#### **Chemin de la requête**

Par exemple :

-   http://exemple.com/exemple
-   http://exemple.com/exemple/\*

Le chemin de la requête n'est pas sensible à la casse. Les modèles ne peuvent pas correspondre aux contenus situés après les chaînes de requête (_?_) ou des ancres (_#_). Un astérisque (_\*_) correspond à toute séquence de caractères, notamment une séquence vide. Par exemple :

-   \*.exemple.com/\* correspond à tout chemin sur tout sous-domaine du site exemple.com
-   \*exemple.com/exemple.html correspond au fichier exemple.html sur le site exemple.com ou sur tout sous-domaine du site exemple.com
-   \* correspond à toute page sur votre site

Une requête _exemple.com/chemin_ n’est pas identique à _exemple.com/chemin/_. La seule exception à cette règle est la page d'accueil : _exemple.com_ correspond à _exemple.com/_.

#### **Le schéma de la requête**

_HTTP_ ou _HTTPS_. Si aucun chemin n’est spécifié, les deux sont pris en compte et la règle indique _\_ALL\__.

#### **La méthode de la requête**

_POST_ ou _GET_. Si aucune méthode n’est spécifiée, toutes les méthodes sont prises en compte et la règle indique _\_ALL\__.

#### **(facultatif) Le code de réponse du serveur d'origine**

Par exemple, associez uniquement une règle **Rate Limiting** lorsqu'un code HTTP 401 ou 403 est renvoyé par le serveur web d'origine. Une règle déclenchée correspondant aux critères du code de réponse bloque les demandes ultérieures provenant de ce client, quel que soit le code de réponse du serveur d'origine.

Une règle peut être déclenchée si elle correspond au nombre et à l'intervalle de toutes les requêtes provenant du même client :

#### **Nombre de requêtes**

Spécifiez deux requêtes au minimum. Pour bloquer une seule requête, rendez le chemin d'accès indisponible, par exemple, en configurant votre serveur web d'origine afin qu'il renvoie un message d'erreur 403.

#### **Intervalle des requêtes**

Une règle se déclenche lorsque les requêtes d'un client dépassent le seuil correspondant à la durée spécifiée.

 

Les atténuations de règles consistent en :

#### **Une action d’atténuation**

Les actions de limitation de taux sont basées sur l'offre du domaine, comme indiqué ci-dessus, dans **Allocations de Rate Limiting par offre** :

-   **Block** (Bloquer) **–** Cloudflare émet une erreur HTTP 429 en cas de dépassement du seuil.
-   **Legacy CAPTCHA** (CAPTCHA hérité) **\-** Le visiteur doit répondre à une vérification par captcha.  S'il réussit, Cloudflare autorise la requête.
-   **JS Challenge** (Défi JS) **–** Le visiteur doit résoudre un défi JavaScript de Cloudflare. S'il réussit, Cloudflare autorise la requête.
-   **Journalisation** Les requêtes sont enregistrées dans les [journaux Cloudflare](https://support.cloudflare.com/hc/articles/216672448). Ceci permet de tester les règles avant de les appliquer à la production.

#### **Durée de l'interdiction**

Si le délai d'expiration défini est inférieur au seuil, l'API augmente automatiquement le délai d'expiration à une valeur égale au seuil.

Les visiteurs identifiés par **Rate Limiting** voient s'afficher une page HTML par défaut si aucune [page d'erreur personnalisée](https://support.cloudflare.com/hc/articles/200172706) n'est spécifiée. En outre, les clients Business et Enterprise peuvent spécifier une réponse dans la règle elle-même, voir _Tâche 3 : configurer une réponse avancée_ ci-dessous.

___

## Identifier les seuils de limite de taux

Pour identifier un seuil général pour Cloudflare **Rate Limiting**, divisez 24 heures de requêtes non mises en cache par le nombre de visiteurs uniques pendant ces mêmes 24 heures. Ensuite, divisez le résultat par la durée moyenne estimée en minutes d'une visite. Enfin, multipliez ce résultat par 4 (ou plus) pour établir un seuil approximatif par minute pour l'ensemble de votre site web. Une valeur supérieure à 4 est convenable, puisque le volume de la plupart des attaques est considérablement supérieur à celui des taux de trafic habituels.

Pour identifier les limites de taux d'URL pour des URL spécifiques, utilisez 24 heures de requêtes non mises en cache et de visiteurs uniques pour l'URL concernée. Ajustez les seuils en fonction des rapports des utilisateurs et de votre propre surveillance.

___

## Tâche 1 : configurer une règle Rate Limiting de base

Cliquez pour afficher des informations détaillées sur la création des deux types courants de règles Cloudflare **Rate Limiting**.

**Rate Limiting** comporte un outil **Protect your login** (Protéger votre connexion) activable en un clic, qui crée une règle permettant de bloquer le client pendant 15 minutes lors de l'envoi de plus de 5 requêtes POST dans un délai de 5 minutes. Cette fonction suffit à bloquer la plupart des tentatives d'attaques par force brute.

1.  Connectez-vous à votre compte Cloudflare.
2.  Sélectionnez le domaine que vous souhaitez protéger.
3.  Accédez à **Security > WAF > Rate limiting rules** (Sécurité > WAF > Règles de limitation du débit).
4.  Sous **Rate Limiting** (Limitation du débit), cliquez sur **Protect your login** (Protéger votre connexion).
5.  Indiquez le **nom de la règle**, puis **saisissez votre URL de connexion** dans la boîte de dialogue **Protect your login** (Protéger votre connexion) qui s'affiche.
6.  Cliquez sur **Save** (Enregistrer).
7.  Le **nom de la règle** apparaît dans votre liste de règles **Rate Limiting**.

1\. Connectez-vous au tableau de bord Cloudflare.

2\. Sélectionnez le domaine concerné.

3\. Accédez à **Security** (Sécurité) > **WAF** > **Rate limiting rules** (Règles de limitation du débit).

4\. Cliquez sur **Create a custome rule** (Créer une règle personnalisée).  Une boîte de dialogue s'affiche, vous permettant de saisir les détails de votre nouvelle règle.

![Boîte de dialogue contextuelle de création d'une règle Rate Limiting avec un exemple de configuration de règle. La règle bloquera les requêtes provenant d'adresses IP qui dépassent les 150 requêtes par minute pendant une heure.](/images/support/previous-rate-limiting-create-rule.png)

5\. Saisissez un **nom de règle** descriptif.

6\. Pour **If Traffic Matching the URL** (Si le trafic correspond à l'URL), sélectionnez un modèle HTTP dans la liste déroulante, ainsi qu'une URL.

7\. Dans le champ **from the same IP address exceeds** (provenant de la même adresse dépasse), saisissez un entier supérieur à 1 pour représenter le nombre de requêtes dans une période d'échantillonnage.

8\. Pour **requests per** (requêtes par), sélectionnez la période d'échantillonnage (la période pendant laquelle les requêtes sont comptées). Pour les domaines pour lesquels une offre Enterprise a été souscrite, vous pouvez saisir toute durée comprise entre 10 secondes et 86 400 secondes (24 heures).

9\. Dans le menu déroulant **Then** (Alors), choisissez l'une des actions disponibles en fonction de votre offre. Consultez la section _Rule Mitigation_ (Atténuation des règles) de la section _Components of a Rate Limiting Rule_ (Composants d'une règle Rate Limiting) ci-dessus pour plus de détails.

10\. Si vous avez sélectionné _Block_ (Bloquer) ou _Simulate_ (Simuler), pour l'option **matching traffic from that visitor for** (trafic correspondant provenant de ce visiteur pour), sélectionnez la durée d'application de l'option lorsqu'un seuil a été atteint. Pour les domaines pour lesquels une offre Enterprise a été souscrite, vous pouvez saisir toute durée comprise entre 10 secondes et 86 400 secondes (24 heures).

11\. Pour activer votre nouvelle règle, cliquez sur **Save and deploy** (Enregistrer et déployer).

La nouvelle règle apparaît dans la liste de règles Rate Limiting.

En général, lorsque vous définissez un seuil moins élevé :

1.  Laissez les règles existantes en place et ajoutez une nouvelle règle avec le seuil inférieur.
2.  Une fois la nouvelle règle mise en place, attendez que la durée d'action de l'ancienne règle soit passée avant de supprimer cette règle.

Lorsque vous définissez un seuil plus élevé (en raison du blocage d'un client légitime), augmentez le seuil dans la règle existante.

___

## Tâche 2 : configurer les critères avancés (offres Business et Enterprise uniquement).

L'option **Advanced Criteria** (Critères avancés) permet de configurer les méthodes HTTP, les réponses d'en-tête et les codes de réponse du serveur d'origine à associer pour votre règle Rate Limiting.

Pour configurer vos critères avancés pour une règle nouvelle ou existante, suivez ces étapes :

1\. Développez **Advanced Criteria** (Critères avancés).

![Champs disponibles lors de la configuration des critères avancés pour une règle Rate Limiting.](/images/support/previous-rate-limiting-advanced-criteria.png)

2\. Sélectionnez une valeur dans la liste déroulante **Method(s)** (Méthodes). _ANY_ est une valeur par défaut qui correspond à toutes les méthodes HTTP.

3\. Filtrez par **HTTP Response Header(s)** (En-têtes de réponse HTTP). Cliquez sur **Add header response field** (Ajouter un champ de réponse d'en-tête) pour inclure les en-têtes renvoyés par votre serveur web d'origine.

L'en-tête **CF-Cache-Status** apparaît par défaut afin que Cloudflare diffuse des ressources mises en cache, plutôt que d'appliquer une limitation de taux à ces ressources. Pour appliquer également une limitation de taux aux ressources mises en cache, retirez cet en-tête en cliquant sur le bouton **X** ou activez **Also apply rate limit to cached assets** (Appliquer aussi la limitation de taux aux ressources mises en cache).

Si plusieurs en-têtes figurent sous **HTTP Response Header(s)** (En-tête(s) de réponse HTTP), une logique booléenne _AND_ est appliquée. Pour exclure un en-tête, utilisez l'option _Not Equals_ (Non égal à). Les en-têtes ne sont pas sensibles à la casse.

4\. Sous **Origin Response code(s)** (Code(s) de réponse du serveur d'origine), saisissez la valeur numérique de chaque code de réponse HTTP à associer.  En cas de codes HTTP multiples, séparez-les par une virgule, par exemple : `401, 403`.

5\. (Facultatif) Configurez d'autres fonctionnalités de Rate Limiting autorisées pour votre offre.

6\. Cliquez sur **Save and Deploy** (Enregistrer et déployer).

___

## Tâche 3 : configurer la réponse avancée (offres Business et Enterprise uniquement).

L'option **Advanced Response** (Réponse avancée) configure le format des informations renvoyées par Cloudflare lorsque le seuil d'une règle est dépassé. Utilisez **Advanced Response** lorsque vous souhaitez renvoyer du texte brut statique ou du contenu JSON.

Pour configurer une réponse en texte brut ou JSON :

1\. Développez **Advanced Response** (Réponse avancée).

![Champs disponibles lors de la configuration de la réponse avancée pour une règle Rate Limiting.](/images/support/previous-rate-limiting-advanced-response.png)

2\. Sélectionnez un format **Response type** (Type de réponse) autre que celui par défaut : _Custom JSON_ (JSON personnalisé) ou _Custom TEXT_ (TEXTE personnalisé).

3\. Saisissez la réponse en texte brut ou JSON que vous souhaitez renvoyer. La taille maximale des réponses est de 32 Ko.

4\. (Facultatif) Configurez d'autres fonctionnalités de Rate Limiting autorisées pour votre offre.

5\. Cliquez sur **Save and Deploy** (Enregistrer et déployer).

### Utilisation d'une page HTML ou d'une redirection personnalisée

Si vous souhaitez afficher une page HTML personnalisée, configurez une page personnalisée pour les erreurs HTTP 429 (« Too many requests ») dans le tableau de bord. Cloudflare affiche cette page lorsque vous sélectionnez « Default Cloudflare Rate Limiting Page » dans **Response type** (valeur par défaut du champ).

Vous pouvez utiliser la méthode suivante pour rediriger un client soumis à une limitation de débit vers une URL spécifique :

1\. Créez une page HTML sur votre serveur qui redirigera vers l'URL finale de la page que vous souhaitez afficher. Incluez une balise [meta refresh](https://www.w3.org/TR/WCAG20-TECHS/H76.html) dans la page, comme dans l'exemple suivant :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;!doctype html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta charset=&quot;utf-8&quot;&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;title&gt;Custom RL page&lt;/title&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url='https://yourzonename/block'&quot; /&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;body&gt; &lt;/body&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/html&gt;</span></div></span></span></span></code></pre>{{</raw>}}

Relevez l'URL publique de la page que vous avez créée.

2\. Dans le tableau de bord Cloudflare, rendez-vous dans **Account Home** > **Configurations** > **Custom Pages**.

3\. Dans **429 errors**, cliquez sur **Custom Pages**.

4.Saisissez l'URL de la page que vous avez créée sur votre serveur (la page contenant la balise meta refresh) et cliquez sur **Publish**.

Procédez de la même manière si vous souhaitez renvoyer du texte brut ou du contenu JSON mais que la réponse est supérieure à 32 Ko. Dans ce cas, l'URL de redirection sera l'URL de la ressource en texte brut ou en JSON que vous souhaitez afficher.

**Remarques :**

-   Votre règle  Rate Limiting ne doit pas correspondre à l'URL de redirection que vous avez incluse dans la page HTML personnalisée pour les erreurs 429.
-   Pour être protégée contre les attaques par déni de service, la page de la redirection ne doit contenir que des ressources mises en cache par Cloudflare.

___

## Tâche 4 : configurer l'option Bypass (offres Enterprise uniquement)

**Bypass** (Ignorer) crée une liste verte ou une exception afin qu'aucune action ne s'applique à un ensemble spécifique d'URL, même si la limite de taux correspondante est atteinte. Suivez ces étapes pour configurer une commande **Bypass** (Ignorer) :

1\. Développez **Bypass** (Ignorer).

2\. Dans la zone de texte **Bypass rule for these URLs** (Ignorer la règle pour ces URL), saisissez les URL que vous souhaitez exempter de la règle de limitation de taux. Saisissez chaque URL sur sa propre ligne. Toute spécification de HTTP ou HTTPS dans l'URL est automatiquement supprimée lorsque la règle est enregistrée et, au lieu de cela, s'applique à la fois à HTTP et HTTPS.

![Configuration de deux URL à ignorer dans le cadre d'une règle Rate Limiting (une par ligne).](/images/support/previous-rate-limiting-bypass.png)

3\. (Facultatif) Configurez d'autres fonctionnalités de Rate Limiting autorisées pour votre offre.

4\. Cliquez sur **Save and Deploy** (Enregistrer et déployer).

___

## Ordre d'exécution des règles

**Cas d'utilisation 1** : Si une requête correspond aux deux règles ci-dessous,

-   règle 1 : correspondre à _test.exemple.com_
-   règle 2 : correspondre à _\*.exemple.com\*_

ou

-   règle 1 : correspondre à _\*.exemple.com\*_
-   règle 2 : correspondre à _test.exemple.com_

la règle 2 sera toujours déclenchée en premier car elle a été créée en dernier.

**Cas d'utilisation 2 :** En supprimant l'astérisque (\*) à la fin du nom de domaine, c'est la dernière règle créée qui sera utilisée..

-   règle 1 : correspondre à _test.exemple.com_
-   règle 2 : correspondre à _\*.example.com_

la règle 2 ci-dessus est déclenchée en premier si une requête correspond aux deux règles.

-   règle 1 : correspondre à _\*.exemple.com_
-   règle 2 : correspondre à _test.exemple.com_

la règle 2 ci-dessus est déclenchée en premier si une requête correspond aux deux règles.

___

## Ressources associées

-   [Comment est rapportée Rate Limiting dans ELS (Enterprise Log Share) ?](/logs/reference/log-fields)
-   [Résolution des problèmes liés à Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115000546328)
-   [Configuration de Rate Limiting via l'API Cloudflare](https://api.cloudflare.com/#rate-limits-for-a-zone-properties)
