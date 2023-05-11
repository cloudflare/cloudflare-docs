---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/217912538-Mon-DNS-ne-fonctionne-pas
title: Mon DNS ne fonctionne pas
---

# Mon DNS ne fonctionne pas

## Mon DNS ne fonctionne pas

_Cet article présente certaines causes du dysfonctionnement du DNS pour un domaine et fournit les étapes à suivre pour résoudre les problèmes._

___

## Symptômes

Les navigateurs comme Safari ou Chrome présentent souvent des erreurs DNS :

-   _Impossible de joindre ce site_
-   _Cette page Web n’est pas disponible_
-   _err\_name\_not\_resolved_
-   _Serveur introuvable_
-   [_Erreur 1001 : erreur de résolution DNS_](https://support.cloudflare.com/hc/articles/360029779472#error1001)

___

## Causes principales et résolutions

Vous trouverez ci-dessous les principales causes des erreurs de résolutions DNS ainsi que des propositions de solutions.

### Domaine ou sous-domaine mal écrit

Assurez-vous que le domaine ou le sous-domaine soit écrit correctement dans l’URL de requête.

### Enregistrements DNS manquants

Assurez-vous d’avoir les enregistrements **DNS** nécessaires dans l’application DNS de votre tableau de bord Cloudflare. Cela inclut les enregistrements suivants :

-   Le domaine racine (par exemple, _exemple.com)_
-   Tous les sous-domaines existants (par exemple, _www.exemple.com, blog.exemple.com_ , etc.)

Plus d’informations sur la configuration des [enregistrements DNS](/dns/manage-dns-records/how-to/create-dns-records) A et CNAME.

### DNSSEC n’était pas désactivé avant que le domaine soit ajouté à Cloudflare

Les échecs de résolution DNS surviennent si [le DNSSEC n’était pas désactivé](https://support.cloudflare.com/hc/articles/205359838#h_94453043811540417238269) au niveau de votre fournisseur de domaine avant d’ajouter le domaine à Cloudflare.

### Les serveurs de noms ne pointent plus vers Cloudflare

Si vous gérez les enregistrements **DNS** via l’application DNS du tableau de bord de Cloudflare et que vos domaines arrêtent de pointer vers les serveurs de noms de Cloudflare, la résolution DNS s’interrompra. Cela peut survenir si le registrar de votre domaine fait pointer les serveurs de noms de votre domaine vers leurs serveurs de noms par défaut.Vérifiez que votre domaine utilise les serveurs de noms de Cloudflare pour [confirmer que vous avez bien identifié le problème](https://support.cloudflare.com/hc/articles/4426809598605).

### Adresse IP non résolue

Dans certains cas, le résolveur DNS du client demandant l’URL peut ne pas parvenir à résoudre un enregistrement DNS vers une adresse IP valide. Rechargez la page après un court instant pour voir si le problème disparaît.Ce problème n’est pas lié à Cloudflare, mais l’utilisation du [résolveur DNS de Cloudflare](/1.1.1.1/setup/) peut aider.Contactez votre fournisseur d’hébergement pour une assistante supplémentaire avec votre résolveur DNS actuel.
