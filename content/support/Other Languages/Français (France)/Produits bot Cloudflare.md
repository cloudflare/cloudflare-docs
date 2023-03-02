---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ
title: Produits bot Cloudflare
---

# Produits bot Cloudflare - FAQ – Centre d'assistance Cloudflare

### Dans cet article

-   [Aperçu](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#12345679)
-   [Comment les bots sont-ils détectés par Cloudflare ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#h_vGKNSEuBtE5ymreIHOucE)
-   [Comment savoir ce que comprend mon offre ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#h_3dC1nAamuWNwImCpIkdlC8)
-   [Comment configurer ma solution de gestion des bots ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#h_2PHwjg1FfXSS3K1aZE00yH)
-   [Blocage inattendu de bots Yandex par la règle gérée de WAF 100203](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#Yandex-bot-unexpectedly-blocked-WAF-100203)
-   [Comment fonctionne l'apprentissage automatique ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#h_4iPjq7Qq4Ozsq0XwibA2ea)
-   [Pourquoi est-ce que je vois une action Managed Challenge (Vérification gérée) pour les règles de pare-feu ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#managed-challenge)
-   [Quelle est la différence entre le score de menace et le score de gestion des bots ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#h_131SlrJFhqmrJjs0joDaXE)
-   [Qu'est-ce que cf.bot\_management.verified\_bot ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#h_zzzgV0HSwPUhOEs5UY9sD)
-   [J'utilise un bot inoffensif et je souhaite qu'il soit ajouté à la liste d'autorisations. (cf.bot\_management.verified\_bot). Que dois-je faire ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#h_5itGQRBabQ51RwT5cNJX8u)
-   [Quelles informations dois-je fournir pour résoudre mes problèmes de bot ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#h_2Ffw8AKdwQySoI8rnO02pc)
-   [Que faire si j'obtiens des faux positifs dus au mode Lutte contre les bots (BFM) ou au mode Super lutte contre les bots (SBFM) ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#5KX8t3C6SObnoWs5F6YOlU)
-   [Le mode Super lutte contre les bots (SBFM) bloque toujours les requêtes, même lorsque la fonctionnalité est désactivée. Pourquoi ?](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#h_6Q8mNs9Ur9mvXhjcH1KBcn)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/360035387431-Produits-bot-Cloudflare-FAQ#3zR4ro73zaHshu5OldQIuB)

___

## Aperçu

Les solutions anti-bots malveillants de Cloudflare identifient et atténuent le trafic automatisé afin de protéger votre domaine.

Pour en savoir plus sur ces solutions et sur leur configuration, consultez le [guide des développeurs](https://developers.cloudflare.com/bots/).

___

## Comment les bots sont-ils détectés par Cloudflare ?

Cloudflare utilise plusieurs méthodes de détection des bots, mais celles-ci diffèrent d'une offre à l'autre. Pour en savoir plus, lisez [Solutions de gestion des bots Cloudflare](https://developers.cloudflare.com/bots/about/plans).

___

## Comment savoir ce que comprend mon offre ?

Pour savoir ce que comprend votre offre, consultez notre [manuel destiné aux développeurs](https://developers.cloudflare.com/bots/about/plans).

___

## Comment configurer ma solution de gestion des bots ?

Pour savoir comment configurer votre solution de gestion des bots, consultez notre [manuel destiné aux développeurs](https://developers.cloudflare.com/bots/get-started).

___

## Blocage inattendu de bots Yandex par la règle gérée de WAF 100203

Lors de la propagation des modifications induite par la mise à jour fréquente des bots Yandex, il se peut que les faux positifs soient plus nombreux. Des bots nouveaux ou récemment mis à jour peuvent être bloqués par la règle gérée de WAF de Cloudflare 100203 lorsque les modifications les plus récentes de Yandex et la liste IP de ses bots n'ont pas encore été synchronisées.

**Solutions :**

-   Désactivez temporairement la règle gérée de WAF 100203,
-   ou créez une règle de pare-feu avec l'action _Bypass_ pour contourner les règles gérées du WAF lorsqu'une requête émane de l'**IP Yandex IP** et que l'agent utilisateur contient **Yandex**.Consultez notre [documentation destinée aux développeurs](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions).

**Solution :**

Une fois la nouvelle IP Yandex propagée sur notre système, les requêtes ne sont plus bloquées. Cette propagation peut prendre jusqu'à 48 heures. Si vous constatez qu'un bot Yandex est encore bloqué après 48 heures sans modification apportée au bot, veuillez contacter le [Support Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/200172476-Contacting-Cloudflare-Support).

___

## Comment fonctionne l'apprentissage automatique ?

L'apprentissage automatique supervisé se base sur certaines variables (X), par exemple le sexe et l'âge, et détermine une autre variable (Y), par exemple le revenu.

Dans les modes Bot Management et Super Bot Fight Mode, les variables X correspondent aux caractéristiques des requêtes, tandis que la variable Y représente la probabilité de résoudre un Captcha en fonction des valeurs de X.

Cloudflare exploite les données issues de millions de requêtes et ré-entraîne le système régulièrement. Vous pouvez obtenir ces données à partir de vos propres journaux de requêtes, comme Cloudflare Logpull et Logpush, ainsi que de l'API Firewall.

___

## Pourquoi est-ce que je vois une action Managed Challenge (Vérification gérée) pour les règles de pare-feu ?

Lorsque vous choisissez de contrôler différentes catégories de bots en mode Bot Fight ou Super Bot Fight, vous verrez les événements du pare-feu accompagnés d'une mention **Action Taken** ou **Managed Challenge**.

Vous verrez peut-être aussi la mention Managed Challenge dans le cadre d'une [règle de pare-feu](https://support.cloudflare.com/hc/articles/200170136#managed-challenge).

___

## Quelle est la différence entre le score de menace et le score de gestion des bots ?

La différence est de taille :

-   Le score de menace (_cf.threat\_score_) permet à Cloudflare de déterminer la réputation des adresses IP. Il va de 0 (bonne réputation) à 100 (mauvaise réputation).
-   Le score de gestion des bots (_cf.bot\_management.score)_ permet à Cloudflare de déterminer si une requête provient d'un humain ou d'un script dans le cadre de la gestion des bots**.** Celui-ci varie de 1 (bot) à 99 (humain). Les scores faibles indiquent que la requête provient d'un script, d'un service API ou d'un agent automatisé. Les scores élevés indiquent que la requête provient d'un humain utilisant un navigateur web de bureau ou mobile standard.

Ces champs sont disponibles dans [Cloudflare Firewall Rules](https://developers.cloudflare.com/firewall/cf-firewall-rules).

___

## Qu'est-ce que cf.bot\_management.verified\_bot ?

La valeur _cf.bot\_management.verified\_bot_ d'une requêteest un booléen qui permet de savoir si cette requête provient d'un bot autorisé par Cloudflare ou non.

Cloudflare a dressé une liste de bots automatisés utiles, tels que Google Search Engine, Pingdom, etc.

Cette liste d'autorisations est très longue et repose sur la vérification DNS inverse, ce qui signifie que les adresses IP que nous autorisons correspondent réellement au service qui vous sollicite. Par ailleurs, Cloudflare utilise plusieurs méthodes de validation, notamment les blocs ASN et les listes publiques. Si aucune de ces méthodes ne permet de valider un client, nous utilisons les données internes de Cloudflare et l'apprentissage automatique pour séparer les adresses IP légitimes des bots utiles.

Pour autoriser le trafic des bots utiles, servez-vous du champ [Verified Bot](https://developers.cloudflare.com/ruleset-engine/rules-language/fields#dynamic-fields) (Bot vérifié) dans votre règle de pare-feu.

___

## J'utilise un bot inoffensif et je souhaite qu'il soit ajouté à la liste d'autorisations. (cf.bot\_management.verified\_bot). Que dois-je faire ?

Cloudflare maintient une liste d'exemples de bots confirmés dans [Cloudflare Radar](https://radar.cloudflare.com/verified-bots).

En tant qu'opérateur de bot, pour être référencé par Cloudflare comme bot confirmé, votre bot doit se conformer à notre [politique publique en matière de bot confirmé](https://developers.cloudflare.com/bots/reference/verified-bots-policy/).Si votre bot répond à ces critères, envoyez cette [demande en ligne](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link).

___

## Quelles informations dois-je fournir pour résoudre mes problèmes de bot ?

Si votre solution de gestion des bots pose des problèmes et que vous devez présenter une demande d'assistance, veuillez fournir les informations suivantes :

-   Identifiants Ray
-   Adresses IP
-   Identifiants Firewall Rule, règles d'expression, pourcentage de résolution des CAPTCHA
-   Agents utilisateurs courants parmi les faux positifs
-   ASN courants parmi les faux positifs
-   Captures d'écran montrant une activité inhabituelle du pare-feu, par exemple une forte augmentation du trafic intercepté sur le graphique
-   URI ou itinéraires problématiques
-   Brève description de la configuration de votre domaine.
    -   Une zone est-t-elle protégée par SSL for SaaS alors que les autres ne le sont pas ?
    -   La plupart du trafic API est-il envoyé vers une URI spécifique ?
    -   Quel volume de trafic mobile comptez-vous générer ?

___

## Que faire si j'obtiens des faux positifs dus au mode Lutte contre les bots (BFM) ou au mode Super lutte contre les bots (SBFM) ?

**Comment désactiver la fonctionnalité BFM****/SBFM ?**

Si vous rencontrez des problèmes avec les fonctionnalités BFM/SBFM (tels que des faux positifs), vous pouvez les désactiver sous **Security** (Sécurité) > **Bots**.

-   Pour les offres **Free**, **désactivez** l'option **Bot Fight**
-   Pour les offres **Pro**, cliquez sur le lien **Configurer le mode Super Bot Fight** et définissez **Complètement automatisé** et **Bots vérifiés** sur **Autoriser**, et **Protection des ressources statiques** et **Détections JavaScript** sur **Désactivé**
-   Pour les offres **Business** et **Entreprise** (sans service complémentaire de gestion des bots), cliquez sur le lien **Configurer le mode Super Bot Fight** et définissez **Complètement automatisé**, **Probablement automatisé** et **Bots vérifiés** sur **Autoriser**, et **Protection des ressources statiques** et **Détections JavaScript** sur **Désactivé**

___

## Le mode Super lutte contre les bots (SBFM) bloque toujours les requêtes, même lorsque la fonctionnalité est désactivée. Pourquoi ?

L'équipe dédiée aux bots travaille à résoudre ce problème rapidement. En attendant, une solution de contournement existe. Vous devrez exécuter la commande d'API suivante pour vérifier et supprimer l'ensemble de règles SBFM :

1\. Répertoriez les ensembles de règles existants au niveau de la zone.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X GET &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

2\. Depuis la sortie de l'étape 1, localisez l'ID d'ensemble de règles associé à la configuration SBFM de la zone. Vous devriez voir `"kind": "zone"` et `"phase": "http_request_sbfm"` pour cet ensemble de règles.

3\. Utilisez l'ID d'ensemble de règles trouvé pour supprimer l'ensemble de règles SBFM.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X DELETE &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets/rulesets_id&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Notez bien que vous devez remplacer <key> par votre propre clé d'API, que vous pouvez obtenir depuis les [jetons d'API](https://dash.cloudflare.com/profile/api-tokens).

___

## Ressources associées

-   [Gestion des bots Cloudflare](https://developers.cloudflare.com/bots/) (documentation pour les développeurs)
-   [Règles de pare-feu Cloudflare](https://developers.cloudflare.com/firewall/cf-firewall-rules/) (documentation pour les développeurs)
-   [Gestion des bots Cloudflare : l'apprentissage automatique et autres solutions](https://blog.cloudflare.com/cloudflare-bot-management-machine-learning-and-more/) (blog Cloudflare)
-   [Bloquer les bots : leçons pratiques d'apprentissage automatique](https://blog.cloudflare.com/stop-the-bots-practical-lessons-in-machine-learning/) (blog Cloudflare)
