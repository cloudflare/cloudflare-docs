---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200172016-Comprendre-les-r%C3%A8gles-g%C3%A9r%C3%A9s-du-pare-feu-applicatif-web-WAF-
title: Comprendre les règles gérés du pare
---

# Comprendre les règles gérés du pare-feu applicatif web (WAF) – Centre d'assistance Cloudflare

_Les règles gérées du pare-feu applicatif web (WAF) surveillent les requêtes web adressées à votre domaine et filtrent le trafic indésirable en fonction des ensembles de règles que vous définissez._

___

## Aperçu

Les règles gérées, fonction du pare-feu applicatif web (WAF) de Cloudflare, identifient et suppriment toute activité suspecte associée aux requêtes HTTP GET et POST.

Voici des exemples de [contenus malveillants](https://www.cloudflare.com/learning/security/what-is-web-application-security/) identifiés par les règles gérées :

-   Mots-clés courants utilisés dans les spams (_XX_, _Rolex_, _Viagra_, etc.),
-   Attaques Cross-Site Scripting (XSS) et
-   Injections SQL (SQLi).

Les règles gérées sont disponibles pour les offres Pro, Business et Enterprise pour tous les [sous-domaines traités en proxy par Cloudflare](https://support.cloudflare.com/hc/articles/200169626). Vous pouvez contrôler les paramètres des règles gérées sous **Security** (Sécurité) > **WAF** > **Managed rules** (Règles gérées). Les règles gérées contiennent trois packages : 

-   **Cloudflare Managed Ruleset** 
-   **Package : OWASP ModSecurity Core Rule Set**
-   **Customer Requested Rules** 

Vous pouvez consulter les menaces bloquées dans le **journal d'activité** de [Firewall Analytics](/waf/analytics/), accessible via **Security** (Sécurité) > **Overview** (Vue d'ensemble).

### Considérations importantes

-   Les règles gérées ajoutent une latence limitée. 
-   La mise à jour dans le monde entier des modifications apportées au règles gérées du pare-feu WAF demande environ 30 secondes.
-   Cloudflare utilise des règles propriétaires pour filtrer le trafic.
-   Les serveurs WebSocket établis n'activent pas les règles gérées pour les requêtes suivantes.
-   Les règles gérées analysent les réponses JSON pour identifier les vulnérabilités ciblées des API. L'analyse des charges utiles JSON est limitée à 128 Ko.
-   Les règles gérées atténuent les techniques de remplissage. Voici nos recommandations :
    1.  Activez la règle _100048_. Cette règle protège désormais des attaques de type remplissage mais n'est pas déployée par défaut, car elle est à l'origine de faux positifs dans les environnements des clients. Il est toutefois important que les clients ajustent la configuration de leurs règles gérées. Cloudflare travaille à l'élaboration d'une meilleure solution sur le long terme.
    2.  Créez une règle de pare-feu à l'aide d'[Expression Editor](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor) en fonction de la nécessité de vérifier les en-têtes et/ou les corps pour bloquer des charges utiles plus importantes (> 128 Ko). Veillez à tester votre règle de pare-feu en mode _Log_ (Journal) en premier lieu, car des faux positifs pourraient être générés.
        -   _http.request.body.truncated_
        -   _http.request.headers.truncated_
-   Cloudflare ne désactive pas certaines règles gérées spécifiques (_WP0025B_, _100043A_ et _100030_, par exemple) même si l'option **Managed rules** (Règles gérées) est sur _Off_ (Désactivé) dans le tableau de bord Cloudflare.

___

## Remarque relative aux faux positifs et aux faux négatifs

Par défaut, les règles gérées du pare-feu WAF sont entièrement gérées depuis le tableau de bord Cloudflare et sont compatibles avec la plupart des sites web et applications web. Cependant, des faux positifs et faux négatifs peuvent se produire, en raison de l'immensité d'Internet :

-   **Faux positifs** : les requêtes légitimes sont détectées et filtrées comme étant malveillantes.
-   **Faux négatifs** : les requêtes malveillantes ne sont pas filtrées.

### Résoudre les problèmes de faux positifs des règles gérées du pare-feu WAF

La définition des contenus suspects est subjective pour chaque site web.  Par exemple, la publication de code PHP sur votre site web est suspecte, sauf si votre site web enseigne le codage et invite les visiteurs à soumettre du code PHP.  Par conséquent, un site web comme celui-ci doit désactiver les règles gérées associées qui interfèrent avec le fonctionnement normal.

Pour tester les faux positifs, configurez les règles gérées du pare-feu WAF en mode **Simulate** (Simuler). Elles enregistreront alors la réponse à d’éventuelles attaques, sans vérification ni blocage. Utilisez également le [**journal d'activité**](/waf/analytics/paid-plans#activity-log) de Firewall Analytics pour déterminer les règles gérées ayant généré les faux positifs.

En cas de faux positif dû à l'[ancien pare-feu WAF](https://support.cloudflare.com/hc/fr-fr/articles/200172016-Understanding-the-Cloudflare-Web-Application-Firewall-WAF-), plusieurs approches s'offrent à vous pour résoudre le problème :

-   **Ajouter les adresses IP du client à la liste d’autorisation d’**[**IP Access Rules**](https://support.cloudflare.com/hc/articles/217074967) **:** Si le navigateur ou le client consulte le site depuis les mêmes adresses IP, il est recommandé de l’autoriser.
-   **Désactiver la ou les** [**règles gérées**](https://support.cloudflare.com/hc/articles/200172016) : Cette opération empêche le blocage ou le test des faux positifs, mais réduit la sécurisation générale du site. Une requête bloquée par l'ID de règle _981176_ fait référence aux règles de l'OWASP. Réduisez la sensibilité OWASP pour résoudre le problème.
-   **Contourner les règles du pare-feu WAF en établissant une règle de pare-feu :** Créez une règle de pare-feu avec l'action **bypass** (contourner) pour désactiver des règles gérées du pare-feu WAF pour une combinaison spécifique de paramètres. Par exemple, [contournez les règles gérées](/firewall/cf-firewall-rules/actions/) pour une URL spécifique et une adresse IP ou un agent utilisateur spécifique.
-   **(Déconseillé) Désactivez les règles gérées du pare-feu WAF pour le trafic vers une URL :** Réduit la sécurité sur le point de terminaison spécifique de l'URL.  Configuration via [Page Rules](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-).

En cas de faux positif dû au [nouveau pare-feu WAF](https://blog.cloudflare.com/new-cloudflare-waf/), plusieurs approches s'offrent à vous pour résoudre le problème :

1.  **Ajouter une exception WAF :** Vous pouvez définir des exceptions WAF dans le [tableau de bord Cloudflare](/waf/managed-rulesets/waf-exceptions/define-dashboard) ou à l'aide de l'[API Rulesets](/waf/managed-rulesets/waf-exceptions/define-api) (Ensembles de règles).
2.  **Désactiver la ou les** [**règles gérées**](https://support.cloudflare.com/hc/articles/200172016) : Cette opération empêche le blocage ou le test des faux positifs, mais réduit la sécurisation générale du site. Une requête bloquée par l'ID de règle _949110_ fait référence aux [nouvelles règles de l'OWASP](https://blog.cloudflare.com/new-cloudflare-waf/). Réduisez la sensibilité OWASP pour résoudre le problème.

**Remarque :** si [vous contactez le support de Cloudflare](https://support.cloudflare.com/hc/articles/200172476) pour vérifier si une règle gérée du pare-feu WAF se déclenche comme prévu, [fournissez un fichier HAR](https://support.cloudflare.com/hc/articles/203118044#h_8c9c815c-0933-49c0-ac00-b700700efce7) capturé lors de l'envoi de la requête concernée.

Voici d’autres directives :

-   Si une règle spécifique provoque des faux positifs, définissez le paramètre **Mode** de la règle sur _Disable_ (Désactiver), plutôt que de définir l’ensemble de la règle **Group** (Groupe) sur _Off_.
-   Pour les faux positifs avec le contenu administrateur de votre site web, créez une règle [**Page Rule**](https://support.cloudflare.com/hc/articles/218411427) pour l’option **Disable Security** (Désactiver la sécurité) pour la section _admin_ des ressources de votre site, c’est-à-dire _votresite.com/admin_.

### Résoudre les problèmes de faux négatifs des règles gérées du pare-feu WAF

Pour identifier les faux négatifs, consultez les journaux HTTP de votre serveur web d’origine. Pour réduire les faux négatifs, utilisez la liste de contrôle suivante :

-   Les règles gérées du pare-feu WAF sont-elles _activées_ sous **Security** (Sécurité) > **WAF** > **Managed rules** (Règles gérées) ?
-   Les règles gérées du pare-feu WAF sont-elles _désactivées_ via [**Page Rules**](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings) ?
-   Toutes les règles gérées ne sont pas activées par défaut, c’est pourquoi nous vous invitons à passer en revue les actions par défaut de chaque règle gérée.
    -   Par exemple, Cloudflare autorise par défaut les requêtes avec des agents utilisateurs vides. Pour bloquer les requêtes avec un agent utilisateur vide, configurez le **Mode** de la règle sur **Block** (Bloquer).
    -   Autre exemple : si vous cherchez à bloquer des attaques par injection SQL non atténuées, assurez-vous que les règles SQLi appropriées sont activées et attribuez la valeur **Block** (Bloquer) sous le groupe **Cloudflare Specials**.
-   Les enregistrements DNS qui servent le trafic HTTP sont-ils traités en proxy par Cloudflare ?
-   Une [**règle de pare-feu** contourne-t-elle](/firewall/cf-firewall-rules/actions/#supported-actions) des règles gérées ? 
-   Un pays, un NSA, une plage d'adresses IP ou une adresse IP autorisés dans les [**règles d'accès IP**](https://support.cloudflare.com/hc/articles/217074967) ou les [**règles de pare-feu**](/firewall/cf-firewall-rules/) correspondent-ils au trafic de l'attaque ?
-   Le trafic malveillant est-il dirigé vers les adresses IP de votre serveur d’origine pour contourner la protection Cloudflare ? Bloquez tout le trafic à l’exception du trafic provenant des [adresses IP de Cloudflare](https://www.cloudflare.com/ips/) sur votre serveur web d’origine.

___

## Cloudflare Managed Ruleset

La suite de règles **Cloudflare Managed Ruleset** contient des règles de sécurité écrites et sélectionnées par Cloudflare. Cliquez sur le nom d’un ensemble de règles sous **Group** (Groupe) pour afficher les descriptions des règles.

**Cloudflare Specials** est un **groupe** qui offre un niveau fondamental de sécurité du pare-feu contre les [attaques courantes](https://www.cloudflare.com/learning/security/what-is-web-application-security/).

 

Lors de l’affichage d’un ensemble de règles, Cloudflare présente les actions par défaut pour chaque règle répertoriée sous **Default mode** (Mode par défaut). Le **Mode** disponibles pour les règles individuelles dans un ensemble de règles **Cloudflare** **Managed Ruleset** particulier sont :

-   _Default (Par défaut) – prend l’action par défaut indiquée sous_ _**Default mode**_ _(Mode par défaut) lors de l’affichage d’une règle spécifique._
-   _Disable_ (Désactiver) – désactive la règle spécifique dans le groupe.
-   _Block_ (Bloquer) – la requête est ignorée.
-   _Legacy CAPTCHA_ (CAPTCHA hérité) - le visiteur doit résoudre un défi CAPTCHA.
-   _Simulate_ (Simuler) – la demande est autorisée par l’intermédiaire du [**fichier journal d’activité**](/waf/analytics/paid-plans#activity-log).

Le [journal des modifications du pare-feu WAF](/waf/change-log/scheduled-changes/) de Cloudflare permet aux clients de suivre les modifications apportées à l'ensemble de règles **Cloudflare Managed Ruleset**.

___

## Package : OWASP ModSecurity Core Rule Set

### Comprendre le package OWASP de Cloudflare

**Package: OWASP ModSecurity Core Rule Set** attribue un score à chaque requête en fonction du nombre de règles OWASP déclenchées. Certaines règles OWASP possèdent un score de sensibilité plus élevé que d’autres. Après l’évaluation d’une requête par OWASP, Cloudflare compare le score final à la valeur **Sensitivity** (Sensibilité) configurée pour le domaine. Si le score est supérieur à la valeur **Sensitivity**(Sensibilité), la requête est exécutée en fonction de l’**Action** configurée dans **Package: OWASP ModSecurity Core Rule Set** :

-   _Block_ (Bloquer) – la requête est ignorée.
-   _Challenge_ (Défi) – le visiteur doit résoudre un défi CAPTCHA.
-   _Simulate_ (Simuler) – la demande est autorisée par l’intermédiaire du [**fichier journal d’activité**](/waf/analytics/paid-plans#activity-log).

Le score de sensibilité requis pour déclencher le pare-feu WAF pour une valeur **Sensitivity** (Sensibilité) spécifique est le suivant :

-   _Low_ (Bas) – 60 et plus
-   _Medium_ (Moyen) – 40 et plus
-   _High_ (Élevé) – 25 et plus

Pour les requêtes Ajax, les scores suivants sont appliqués à la place :

-   _Low_ (Bas) – 120 et plus
-   _Medium_ (Moyen) – 80 et plus
-   _High_ (Élevé) – 65 et plus

Consultez le [fichier journal d’activité](/waf/analytics/paid-plans#activity-log) pour connaître le score final ainsi que les individuelles règles déclenchées.

### Contrôler le package OWASP de Cloudflare

**Package: OWASP ModSecurity Core Rule Set** contient plusieurs règles issues du [projet OWASP](https://www.owasp.org/index.php/Category:OWASP_ModSecurity_Core_Rule_Set_Project). Cloudflare ne rédige pas et ne sélectionne pas les règles OWASP. Cliquez sur le nom d’un ensemble de règles sous **Group** (Groupe) pour afficher les descriptions des règles. Contrairement à l’ensemble de règles **Cloudflare Managed Ruleset**, les règles OWASP spécifiques sont définies sur _On_ ou _Off_.

Pour gérer les seuils OWASP, définissez le paramètre **Sensibilité** sur _Faible_, _Moyen_ ou _Élevé_ sous **Package : ensemble de règles principal ModSecurity de l'OWASP**. Le réglage du paramètre **Sensibilité** sur _Désactivée_ désactivera l'intégralité du package OWASP, notamment l'ensemble de ses règles. La définition appropriée du paramètre **Sensibilité** dépend de votre secteur et de votre activité. Par exemple, le réglage _Faible_ convient particulièrement aux contextes suivants :

-   Certains secteurs d’activité plus susceptibles de déclencher le pare-feu WAF et
-   Les chargements de fichiers volumineux.

Dans un premier temps, Cloudflare recommande de définir la valeur **Sensitivity** (Sensibilité) sur _Low_ (Bas) et d'examiner les faux positifs avant d'augmenter davantage la valeur **Sensitivity** (Sensibilité).

___

## Ressources associées

-   [Firewall Analytics](/waf/analytics/)
-   [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/)
-   [Fichier journal des modifications de Cloudflare WAF](/waf/change-log/scheduled-changes/)
