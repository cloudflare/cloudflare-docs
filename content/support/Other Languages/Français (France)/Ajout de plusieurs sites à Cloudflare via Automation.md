---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360000841472-Ajout-de-plusieurs-sites-%C3%A0-Cloudflare-via-Automation
title: Ajout de plusieurs sites à Cloudflare via Automation
---

# Ajout de plusieurs sites à Cloudflare via Automation

_Apprenez comment ajouter plusieurs sites (10 et plus) à la fois à Cloudflare avec l’API Cloudflare ou l’interface de ligne de commande de Cloudflare, flarectl._

### Dans cet article

-   [Aperçu](https://support.cloudflare.com/hc/fr-fr/articles/360000841472-Ajout-de-plusieurs-sites-%C3%A0-Cloudflare-via-Automation#01EiMuIl9b6BVA2vUdCy2X)
-   [Conditions préalables](https://support.cloudflare.com/hc/fr-fr/articles/360000841472-Ajout-de-plusieurs-sites-%C3%A0-Cloudflare-via-Automation#2C6OkWg2Flbl6ZBJss7FjH)
-   [Ajout de domaines via l’API](https://support.cloudflare.com/hc/fr-fr/articles/360000841472-Ajout-de-plusieurs-sites-%C3%A0-Cloudflare-via-Automation#3Mk8dKAR73TTdEKH2WLfzb)
-   [Ajout de domaines via flarectl (interface de ligne de commande de Cloudflare)](https://support.cloudflare.com/hc/fr-fr/articles/360000841472-Ajout-de-plusieurs-sites-%C3%A0-Cloudflare-via-Automation#194axRKd2V27vV5bs4e8iD)
-   [Problèmes fréquents](https://support.cloudflare.com/hc/fr-fr/articles/360000841472-Ajout-de-plusieurs-sites-%C3%A0-Cloudflare-via-Automation#6yR1Cexb7t3HYDcHGVwMjn)

___

## Aperçu

Si vous devez à ajouter plusieurs sites (10 et plus) à la fois dans Cloudflare, vous pouvez le faire via l’API Cloudflare. Ajouter plusieurs sites peut être utile dans les cas de figure suivants :

-   Vous avez plusieurs domaines mappés vers un domaine canonique unique, par exemple, des domaines dans différents pays (.com.au, .co.uk, etc.) que vous souhaitez protéger avec Cloudflare
-   Vous êtes une agence ou un professionnel de conseil en informatique et vous gérez plusieurs domaines pour le compte de vos clients (remarque : informez-vous sur le [programme de partenariat](https://www.cloudflare.com/partners/) de Cloudflare !)
-   Vous transférez un ensemble de sites existant vers Cloudflare

L’utilisation de l’API permet d’ajouter plusieurs sites rapidement et efficacement, en particulier si vous savez déjà comment [changer vos serveurs de noms](/dns/zone-setups/full-setup/setup) ou [ajouter un enregistrement DNS](/dns/manage-dns-records/how-to/create-dns-records).

___

## Conditions préalables

Pour ajouter plusieurs sites à Cloudflare via Automation, vous devez disposer :

-   D’un compte Cloudflare ([inscription](https://www.cloudflare.com/a/signup)/[connexion](https://www.cloudflare.com/a/login))
-   D’une connaissance de base de la ligne de commande
-   D’une installation de cURL (par défaut sur macOS et Linux)
-   De [votre clé Cloudflare API](https://support.cloudflare.com/hc/fr-fr/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-)
-   D’une liste des domaines que vous souhaitez ajouter, chacun sur une ligne séparée (nouvelle ligne), par exemple, « domaines.txt »

___

## Ajout de domaines via l’API

Cloudflare dispose d’une API dotée de fonctionnalités complètes ([documentation](https://api.cloudflare.com/)) qui vous permet d’automatiser la création de nouveaux domaines, mais également de configurer des enregistrements DNS, des règles Page Rules et les nombreux paramètres de sécurité de la solution. Nous utiliserons cette API pour automatiser l’ajout de plusieurs domaines à la fois.

Ouvrez votre application de terminal (par exemple, Terminal ou Terminal.app), puis configurez votre clé d’API et votre adresse e-mail :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

Ensuite, nous écrirons une simple boucle FOR pour traiter chaque nom de domaine 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do \  curl -X POST -H &quot;X-Auth-Key: $CF_API_KEY&quot; -H &quot;X-Auth-Email: $CF_API_EMAIL&quot; \  -H &quot;Content-Type: application/json&quot; \  &quot;https://api.cloudflare.com/client/v4/zones&quot; \  --data '{&quot;account&quot;: {&quot;id&quot;: &quot;id_of_that_account&quot;}, &quot;name&quot;:&quot;'$domain'&quot;,&quot;jump_start&quot;:true}'; done</span></div></span></span></span></code></pre>{{</raw>}}

Avec la commande « jump\_start », Cloudflare tentera automatiquement de rechercher des enregistrements DNS courants, par exemple « www », « mail », « blog » et bien d'autres, afin que vous n'ayez pas à les configurer manuellement (vérifiez néanmoins que nous les avons tous trouvés).  _id\_of\_that\_account_ se trouve dans l'application Cloudflare **Overview** sous la rubrique **Account ID**.

L’API renverra une réponse contenant [les serveurs de noms que vous devrez modifier](https://support.cloudflare.com/hc/fr-fr/articles/206455647-How-do-I-change-my-domain-nameservers-) au niveau de votre serveur d’inscription (sur lequel vous avez enregistré le domaine).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{ &quot;result&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;example.com&quot;, &quot;status&quot;: &quot;pending&quot;, &quot;paused&quot;: false, &quot;type&quot;: &quot;full&quot;, &quot;development_mode&quot;: 0, &quot;name_servers&quot;: [ &quot;chad.ns.cloudflare.com&quot;, &quot;lucy.ns.cloudflare.com&quot; ], &quot;original_name_servers&quot;: [ &quot;ns-cloud-e1.googledomains.com&quot;, &quot;ns-cloud-e2.googledomains.com&quot;, &quot;ns-cloud-e3.googledomains.com&quot;, &quot;ns-cloud-e4.googledomains.com&quot; ], &quot;original_registrar&quot;: null, &quot;original_dnshost&quot;: null, &quot;modified_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;created_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;meta&quot;: { &quot;step&quot;: 4, &quot;wildcard_proxiable&quot;: false, &quot;custom_certificate_quota&quot;: 0, &quot;page_rule_quota&quot;: 3, &quot;phishing_detected&quot;: false, &quot;multiple_railguns_allowed&quot;: false }, &quot;owner&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;type&quot;: &quot;user&quot;, &quot;email&quot;: &quot;you@example.com&quot; }, &quot;account&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;you@example.com&quot; }, &quot;permissions&quot;: [ &quot;#access:edit&quot;, &quot;#access:read&quot;, &quot;#analytics:read&quot;, &quot;#app:edit&quot;, &quot;#billing:edit&quot;, &quot;#billing:read&quot;, &quot;#cache_purge:edit&quot;, &quot;#dns_records:edit&quot;, &quot;#dns_records:read&quot;, &quot;#lb:edit&quot;, &quot;#lb:read&quot;, &quot;#logs:read&quot;, &quot;#member:edit&quot;, &quot;#member:read&quot;, &quot;#organization:edit&quot;, &quot;#organization:read&quot;, &quot;#ssl:edit&quot;, &quot;#ssl:read&quot;, &quot;#subscription:edit&quot;, &quot;#subscription:read&quot;, &quot;#waf:edit&quot;, &quot;#waf:read&quot;, &quot;#worker:edit&quot;, &quot;#worker:read&quot;, &quot;#zone:edit&quot;, &quot;#zone:read&quot;, &quot;#zone_settings:edit&quot;, &quot;#zone_settings:read&quot; ], &quot;plan&quot;: { &quot;id&quot;: &quot;0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee&quot;, &quot;name&quot;: &quot;Free Website&quot;, &quot;price&quot;: 0, &quot;currency&quot;: &quot;USD&quot;, &quot;frequency&quot;: &quot;&quot;, &quot;is_subscribed&quot;: true, &quot;can_subscribe&quot;: false, &quot;legacy_id&quot;: &quot;free&quot;, &quot;legacy_discount&quot;: false, &quot;externally_managed&quot;: false } }, &quot;success&quot;: true, &quot;errors&quot;: [], &quot;messages&quot;: []}</span></div></span></span></span></code></pre>{{</raw>}}

Notez la clé « name\_servers » dans la réponse. Ce seront les mêmes paires uniques pour tous les sites que vous ajoutez avec votre compte - exemple


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;name_servers&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;chad.ns.cloudflare.com&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;lucy.ns.cloudflare.com&quot; ]</span></div></span></span></span></code></pre>{{</raw>}}

Copiez vos valeurs (pas celles ci-dessus !) et [mettez à jour les serveurs de noms](https://support.cloudflare.com/hc/fr-fr/articles/206455647-How-do-I-change-my-domain-nameservers-) au niveau de votre serveur d’inscription.

___

## Ajout de domaines via flarectl (interface de ligne de commande de Cloudflare)

Vous pouvez également ajouter des domaines avec flarectl, l’interface en ligne de commande officielle de Cloudflare. Vous pouvez [télécharger un package préconstruit](https://github.com/cloudflare/cloudflare-go/releases) pour votre système d’exploitation (Windows, macOS/Darwin, Linux) et créer des domaines avec celui-ci.

Vous devez tout d’abord configurer les identifiants de votre API :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

…puis exécuter la commande suivante dans flarectl :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone create --zone=$domain --jumpstart=false; done</span></div></span></span></span></code></pre>{{</raw>}}

Vous pouvez ensuite obtenir les serveurs de noms pour chaque domaine via « flarectl zone list » :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone info --zone=$domain; done</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Demandez de l’aide ou des conseils à la [communauté Cloudflare](https://community.cloudflare.com/).

___

## Problèmes fréquents

Si des erreurs apparaissent pendant ce processus, le domaine peut ne pas être enregistré (ou avoir été enregistré à l’instant), ne pas être un sous-domaine ou ne pas être valide. Les articles suivants présentent les cas les plus courants : 

-   [Pourquoi ne puis-je pas ajouter mon domaine à Cloudflare ?](https://support.cloudflare.com/hc/fr-fr/articles/205359838-I-cannot-add-my-domain-to-Cloudflare-)
-   [Site banni](https://support.cloudflare.com/hc/articles/205359838#h_874829316161540417303369)
