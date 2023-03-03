---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/5995821690637-Migration-depuis-les-r%C3%A8gles-g%C3%A9r%C3%A9es-du-pare-feu-WAF-vers-les-ensembles-de-r%C3%A8gles-g%C3%A9r%C3%A9es-du-pare-feu-WAF
title: Migration depuis les règles gérées du pare-feu WAF vers les ensembles de règles gérées du pare
---

# Migration depuis les règles gérées du pare-feu WAF vers les ensembles de règles gérées du pare-feu WAF – Centre d'assistance Cloudflare

_Cloudflare permettra aux clients de migrer leurs zones depuis les règles gérées du pare-feu WAF vers les nouveaux ensembles de règles gérées du pare-feu WAF._

___

## Aperçu

Le 4 mai 2022, Cloudflare a entamé la phase 1 de la migration WAF depuis les [règles gérées du pare-feu WAF](https://support.cloudflare.com/hc/articles/200172016) vers les nouveaux [ensembles de règles gérées du pare-feu WAF](https://developers.cloudflare.com/waf/managed-rulesets/). Vous pourrez démarrer le processus de migration pour vos zones éligibles dans le tableau de bord Cloudflare. Les ensembles de règles gérées du pare-feu WAF offrent les avantages suivants :

-   Performances supérieures de la détection
-   Flexibilité accrue de la configuration (définition de filtres WAF personnalisés, configuration de remplacements globaux d'ensembles de règles)
-   Meilleure expérience utilisateur
-   Accès à la [vérification des identifiants compromis](https://developers.cloudflare.com/waf/managed-rulesets/exposed-credentials-check/)

Actuellement, le processus de migration est toujours lancé par vous dans le tableau de bord Cloudflare. **La migration est irréversible** : une fois la migration effectuée vers les nouveaux ensembles de règles gérées du pare-feu WAF, vous ne pouvez pas revenir à l'utilisation de règles gérées du pare-feu WAF. Une fois une zone migrée vers les nouveaux ensembles de règles gérées du pare-feu WAF, l'onglet **Managed rules** (Règles gérées) dans le tableau de bord Cloudflare (disponible sous **Security** (Sécurité) > **WAF** > **Managed rules** (Règles gérées)) affichera une nouvelle interface, et les API des règles gérées du pare-feu WAF ne fonctionneront plus.

___

## Impact de la migration

La configuration actuelle des règles gérées sera migrée vers une configuration des ensembles de règles gérées du pare-feu WAF. Ainsi, la même protection s'applique à votre zone lorsque vous passez au nouveau WAF.

Cloudflare recommande de vérifier le [**journal d'activité**](https://developers.cloudflare.com/waf/analytics/paid-plans/#activity-log) dans Firewall Analytics dans les jours qui suivent la migration, pour vérifier qu'aucune requête légitime n'est bloquée par les ensembles de règles gérées du pare-feu WAF. Si vous identifiez des requêtes bloquées qui ne devraient pas l'être, vous pouvez définir l'action de règle du pare-feu WAF correspondante sur _Log_ (Journal). Pour plus d'informations sur la modification de l'action d'une règle d'ensemble de règles gérées, consultez [Configurer une seule règle d'un ensemble de règles gérées](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-single-rule-in-a-managed-ruleset) dans la documentation relative au pare-feu WAF.

### Modifications du tableau de bord Cloudflare

Une fois la migration terminée, le tableau de bord Cloudflare affiche l'interface des ensembles de règles gérées du pare-feu WAF sous **Security** (Sécurité) > **WAF** > **Managed rules** (Règles gérées), où vous pouvez déployer des ensembles de règles gérées et ajuster leur configuration.

![Après la migration vers les ensembles de règles gérées du pare-feu WAF, le tableau de bord Cloudflare affiche une nouvelle interface dans laquelle vous pouvez déployer des ensembles de règles gérées pour votre zone.](/support/static/waf-migration-dashboard-differences.png)

Contrairement aux règles gérées du pare-feu WAF, aucun bouton d'activation/désactivation global du pare-feu WAF n'est fourni dans la nouvelle interface. Au lieu de cela, vous déployez chaque ensemble de règles gérées du pare-feu WAF dans votre zone.

Pour obtenir plus d'informations sur la configuration des ensembles de règles gérées du pare-feu WAF dans le tableau de bord, consultez [Déployer des ensembles de règles gérées pour une zone dans le tableau de bord](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/) dans la documentation destinée aux développeurs.

### Modifications des API

Après la migration, les API permettant d'interagir avec les ensembles de règles gérées du pare-feu WAF **ne fonctionneront plus**. Ces API sont les suivantes :

-   [WAF Rule Packages (Packages de règles WAF)](https://api.cloudflare.com/#waf-rule-packages-properties)
-   [WAF Rule Groups (Groupes de règles WAF)](https://api.cloudflare.com/#waf-rule-groups-properties)
-   [Règles WAF](https://api.cloudflare.com/#waf-rules-properties)

Pour interagir avec les ensembles de règles gérées du pare-feu WAF, vous devez utiliser l'[API Rulesets (Ensembles de règles)](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/). Pour plus d'informations sur le déploiement d'ensembles de règles gérées du pare-feu WAF via une API, consultez [Déployer des ensembles de règles via API](https://developers.cloudflare.com/waf/managed-rulesets/deploy-api/) dans la documentation destinée aux développeurs.

___

## Zones éligibles (phase 1)

La migration se produit par phases. Depuis le 4 mai 2022, la migration est disponible à un sous-ensemble de zones éligibles, et elle deviendra ensuite progressivement disponible pour toutes les zones éligibles.

Pendant la phase 1, vous pouvez migrer des zones qui répondent aux exigences suivantes :

-   La zone a :
    -   le WAF désactivé, ou
    -   le WAF activé et seul l'ensemble de règles gérées Cloudflare est activé (l'ensemble de règles principal OWASP ModSecurity doit être désactivé).
-   La zone n'a pas de [règles de pare-feu](https://developers.cloudflare.com/firewall/cf-dashboard/) ni de [Page Rules](https://support.cloudflare.com/hc/articles/218411427) contournant, activant ou désactivant des règles gérées WAF :
    -   Règles de pare-feu configurées avec _Bypass_ (Contourner) > _WAF Managed Rules_ (Règles gérées WAF).
    -   Page Rules configurées avec _Disable Security_ (Désactiver la sécurité).
    -   Page Rules configurées avec _Web Application Firewall: Off_ (Pare-feu applicatif web : désactivé) ou _Web Application Firewall: On_ (Pare-feu applicatif web : activé).
-   La zone n'a pas de [contournements du WAF contrôlés par URI](https://api.cloudflare.com/#waf-overrides-properties) (uniquement disponibles via API).

Les zones qui ne répondent pas à ces critères ne pourront pas migrer au courant de la phase 1.

Lors de la phase 2, qui survient plus tard, toutes les zones sont éligibles à la migration. Avant le début de la phase 2, cette page est mise à jour avec des informations supplémentaires.

___

## Démarrage de la migration

1\. Connectez-vous au [tableau de bord Cloudflare](https://dash.cloudflare.com/), puis sélectionnez votre compte et votre zone.

2\. Accédez à **Security** (Sécurité) > **WAF** \> **Managed rules** (Règles gérées).

![La bannière de migration affichée sous WAF > Managed rules (Règles gérées), disponible pour les zones éligibles, vous permet d'effectuer la mise à jour depuis les règles gérées vers les ensembles de règles gérées du pare-feu WAF.](/support/static/waf-migration-banner.png)

3\. Dans la bannière de mise à jour, cliquez sur **Update now** (Mettre à jour maintenant). Cette bannière s'affiche uniquement dans les zones éligibles.

4\. Dans la boîte de dialogue contextuelle, confirmez que vous souhaitez démarrer la migration depuis les règles gérées du pare-feu WAF vers les ensembles de règles gérées du pare-feu WAF en cliquant sur **Update** (Mettre à jour). La migration est **irréversible**.

Une fois que vous avez confirmé l'opération, la migration démarre.

Le processus de migration peut prendre quelques minutes. Quand la migration est finie, le tableau de bord affiche la nouvelle interface des ensembles de règles gérées du pare-feu WAF sous **Security** (Sécurité) > **WAF** > **Managed rules** (Règles gérées). Pour vérifier que la migration est finie, actualisez le tableau de bord.
