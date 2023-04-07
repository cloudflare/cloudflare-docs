---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/221327488-Pourquoi-mon-domaine-a-t-il-%C3%A9t%C3%A9-supprim%C3%A9-de-Cloudflare-
title: Pourquoi mon domaine a-t
---

# Pourquoi mon domaine a-t-il été supprimé de Cloudflare ? – Centre d'assistance Cloudflare

## Pourquoi mon domaine a-t-il été supprimé de Cloudflare ?

_Cet article explique les étapes à suivre pour rechercher et récupérer un domaine supprimé d’un compte Cloudflare._

### Dans cet article

-   [Vue d'ensemble](https://support.cloudflare.com/hc/fr-fr/articles/221327488-Pourquoi-mon-domaine-a-t-il-%C3%A9t%C3%A9-supprim%C3%A9-de-Cloudflare-#h_71645430211540423470679)
-   [Étape 1 : consulter les journaux d’audit de votre compte Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/221327488-Pourquoi-mon-domaine-a-t-il-%C3%A9t%C3%A9-supprim%C3%A9-de-Cloudflare-#h_75178970471540423485029)
-   [Étape 2 : vérifiez si l’enregistrement de domaine répertorie les serveurs de noms Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/221327488-Pourquoi-mon-domaine-a-t-il-%C3%A9t%C3%A9-supprim%C3%A9-de-Cloudflare-#h_84363930121540423493275)
-   [Étape 3 : vérifiez si la résolution de domaine utilise les serveurs de noms Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/221327488-Pourquoi-mon-domaine-a-t-il-%C3%A9t%C3%A9-supprim%C3%A9-de-Cloudflare-#h_670950877161540423505236)
-   [Récupérer un domaine supprimé](https://support.cloudflare.com/hc/fr-fr/articles/221327488-Pourquoi-mon-domaine-a-t-il-%C3%A9t%C3%A9-supprim%C3%A9-de-Cloudflare-#h_88537939911540919764865)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/221327488-Pourquoi-mon-domaine-a-t-il-%C3%A9t%C3%A9-supprim%C3%A9-de-Cloudflare-#h_186867048201540423513703)

___

## Vue d'ensemble

La suppression d'un domaine se produit généralement pour les raisons suivantes :

-   Un utilisateur ayant accès au domaine l’a supprimé.
-   Les serveurs de noms ne pointent plus vers Cloudflare. Cloudflare surveille en permanence l'enregistrement des domaines.
-   Le domaine n'a pas été authentifié (en attente depuis 60 jours).

___

## Étape 1 : consulter les journaux d’audit de votre compte Cloudflare

Les **journaux d’audit** de Cloudflare contiennent des informations sur la suppression de domaine. Recherchez, [en utilisant les journaux d’audit](https://support.cloudflare.com/hc/en-us/articles/115002833612-How-do-I-use-Audit-Logs-), des informations supplémentaires sur la fonctionnalité **Journaux d’audit**.

1.  Connectez-vous au tableau de bord Cloudflare.
2.  Cliquez sur le compte Cloudflare approprié où le domaine supprimé existait.
3.  Cliquez sur **Journal d’audit** dans la deuxième barre de navigation à partir du haut.
4.  Pour le **domaine**, saisissez le nom de domaine qui a été supprimé.
5.  Cliquez sur un _Supprimer_ **Action** et assurez-vous que **Ressource** dit _Compte_.
6.  Vérifiez la **date**, **l’adresse IP de l’utilisateur** et **l’utilisateur** qui a supprimé le domaine.
7.  Si le champ **Adresse IP de l'utilisateur** indique _127.0.0.1_ ou est vide, la suppression a été effectuée automatiquement par les systèmes de Cloudflare : passez à l'étape 2 

___

## Étape 2 : vérifiez si l’enregistrement de domaine répertorie les serveurs de noms Cloudflare

Utilisez l’application « whois » basée sur la ligne de commande fournie avec votre système d’exploitation ou un site Web tel que whois.icann.orgou [www.whois.net](https://www.whois.net/).

-   Si vous ne trouvez pas les détails du serveur de noms pour votre domaine, contactez votre registrar ou votre fournisseur de domaine pour obtenir les informations d’enregistrement du domaine.
-   Assurez-vous que les serveurs de noms Cloudflare soient les deux seuls serveurs de noms répertoriés dans les détails d’enregistrement du domaine.
-   Assurez-vous que les serveurs de noms soient épelés correctement dans l’enregistrement de domaine.

2\. Vérifiez que les serveurs de noms correspondent exactement aux serveurs de noms fournis dans la section **Serveurs de noms Cloudflare** de l’application **DNS** de Cloudflare.

3\. Si vous constatez des informations incorrectes, connectez-vous au portail de votre fournisseur de domaine pour effectuer des mises à jour ou contactez votre fournisseur de domaine pour obtenir de l’aide.

___

## Étape 3 : vérifiez si la résolution de domaine utilise les serveurs de noms Cloudflare

1\. Utilisez des outils de ligne de commande ou tiers pour vérifier si les serveurs de noms Cloudflare sont configurés :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS quelquechose.autredomaine.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +trace NS quelquechose.autredomaine.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS quelquechose.autredomaine.com @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

L’option +trace fournit des informations détaillées en cas d’échec de la réponse DNS. Ces informations peuvent être utiles aux fournisseurs de service DNS pour résoudre le problème.

L’option @8.8.8.8 renvoie des résultats depuis le résolveur DNS public de Google. Les résultats confirmeront si les résolveurs publics reçoivent une réponse DNS.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns quelque chose.autredomaine.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns quelquechose.autredomaine.com 8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Certains services en ligne, tels que [whatsmydns.net](https://www.whatsmydns.net/), permettent de vérifier la résolution DNS dans le monde entier.

-   Assurez-vous que les deux serveurs de noms Cloudflare soient les seuls serveurs de noms renvoyés dans les résultats de la requête.
-   Assurez-vous qu’il n’y ait aucun serveur de noms mal orthographié.
-   Vérifiez que les serveurs de noms correspondent exactement aux serveurs de noms fournis dans la section **Serveurs de noms Cloudflare** de l’application **DNS** de Cloudflare.

2\. Si vous constatez des informations incorrectes, connectez-vous au portail de votre fournisseur de domaine pour effectuer des mises à jour ou contactez votre fournisseur de domaine pour obtenir de l’aide.

3\. Si les données d’enregistrement du serveur de noms et du domaine sont correctes, contactez votre fournisseur de domaine pour vérifier s’il y a eu des problèmes de propagation DNS récents.

___

## Récupérer un domaine supprimé

Récupérez un domaine supprimé via le lien **\+ Ajouter un site** situé à droite de la barre de navigation supérieure dans le tableau de bord Cloudflare.Le domaine doit être ajouté comme un nouveau domaine.

___

## Ressources associées

-   [Serveurs de noms secondaires](https://support.cloudflare.com/hc/en-us/articles/360001356152-How-do-I-setup-and-manage-Secondary-DNS-) (fonctionnalité Enterprise)
-   [Configuration CNAME](/dns/zone-setups/partial-setup) (fonctionnalité Business et Enterprise)
-   [Comment remplacer les serveurs de noms par les serveurs de noms Cloudflare](/dns/zone-setups/full-setup/setup)
