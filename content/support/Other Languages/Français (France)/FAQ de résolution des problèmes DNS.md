---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360020296512-FAQ-de-r%C3%A9solution-des-probl%C3%A8mes-DNS
title: FAQ de résolution des problèmes DNS
---

# FAQ de résolution des problèmes DNS

## FAQ de résolution des problèmes DNS

_Cet article fournit des instructions pour résoudre les problèmes courants concernant le DNS de Cloudflare._

### Dans cet article

-   [Pourquoi ai-je un sous-domaine dc-######### ?](https://support.cloudflare.com/hc/fr-fr/articles/360020296512-FAQ-de-r%C3%A9solution-des-probl%C3%A8mes-DNS#h_84167303211544035341530)
-   [Pourquoi les requêtes DNS renvoient-elles des résultats incorrects ?](https://support.cloudflare.com/hc/fr-fr/articles/360020296512-FAQ-de-r%C3%A9solution-des-probl%C3%A8mes-DNS#h_62993872051544035354776)
-   [Pourquoi aucun enregistrement A, AAAA ou CNAME n’a été trouvé ?](https://support.cloudflare.com/hc/fr-fr/articles/360020296512-FAQ-de-r%C3%A9solution-des-probl%C3%A8mes-DNS#h_75993570981544035362746)
-   [Pourquoi ai-je reçu un e-mail : vos serveurs de nom ont changé ?](https://support.cloudflare.com/hc/fr-fr/articles/360020296512-FAQ-de-r%C3%A9solution-des-probl%C3%A8mes-DNS#h_752983037101544035373001)
-   [Pourquoi ne puis-je pas ajouter certains TLD via l'API DNS ?](https://support.cloudflare.com/hc/fr-fr/articles/360020296512-FAQ-de-r%C3%A9solution-des-probl%C3%A8mes-DNS#h_84167303211544035341531)

___

## Pourquoi ai-je un sous-domaine dc-######### ?

Le sous-domaine dc-##### est ajouté pour résoudre un conflit créé lorsque votre _enregistrement_ SRV ou MX est résolu en un domaine configuré pour servir de proxy à Cloudflare.

Par conséquent, Cloudflare créera un enregistrement DNS dc-##### qui sera résolu en adresse IP d’origine. L’enregistrement dc-##### garantit que le trafic de votre enregistrement MX ou SRV n’est pas traité par proxy (il se résout directement sur votre adresse IP d’origine), tandis que le proxy Cloudflare fonctionne pour tout le reste du trafic.

Par exemple, avant d’utiliser Cloudflare, supposons que vos enregistrements DNS pour le courrier soient les suivants :

`exemple.com MX exemple.com` `exemple.com A 192.0.2.1`

Après avoir utilisé Cloudflare et mis en proxy l’_enregistrement A_, CloudFlare fournira les réponses DNS avec une adresse IP Cloudflare (203.0.113.1 dans l’exemple ci-dessous) :

`exemple.com MX exemple.com` `exemple.com A 203.0.113.1`

Étant donné que la mise en proxy du trafic de messagerie vers Cloudflare romprait vos services de messagerie, Cloudflare détecte cette situation et crée un enregistrement dc-##### :

`exemple.com MX dc-1234abcd.exemple.com` `dc-1234abcd.exemple.com A 192.0.2.1` `exemple.com A 203.0.113.1`

La suppression de l’enregistrement dc-###### n’est possible que par l’une des méthodes suivantes :

-   Si aucun courrier n'est reçu pour le domaine, supprimez l'enregistrement MX de _._
-   Si le courrier est bien reçu pour le domaine, mettez à jour l’_enregistrement MX_ pour résoudre en un _enregistrement A_ distinct pour un sous-domaine de courrier qui n’est pas en proxy par Cloudflare :

`exemple.com MX mail.exemple.com` `mail.exemple.com A 192.0.2.1` `exemple.com A 203.0.113.1`

___

## Pourquoi les requêtes DNS renvoient-elles des résultats incorrects ?

Les outils tiers peuvent parfois ne pas pouvoir renvoyer les résultats DNS corrects si l’actualisation d’un cache DNS récursif échoue. Dans ce cas, purgez votre cache DNS public via ces méthodes :

-   [Purger de votre cache DNS sur OpenDNS](http://www.opendns.com/support/cache/)
-   [Purger de votre cache DNS sur Google](https://developers.google.com/speed/public-dns/cache)
-   [Purger de votre cache DNS localement](https://documentation.cpanel.net/display/CKB/How%2BTo%2BClear%2BYour%2BDNS%2BCache)

___

## Pourquoi aucun enregistrement A, AAAA ou CNAME n’a été trouvé ?

_Aucun enregistrement A, AAAA ou CNAME trouvé_ signifie que l’application **DNS** de Cloudflare n’a pas les enregistrements appropriés pour la résolution DNS.

[Ajoutez les enregistrements DNS manquants](/dns/manage-dns-records/how-to/create-dns-records) à votre domaine.

___

## Pourquoi ai-je reçu un e-mail : vos serveurs de nom ont changé ?

Pour les domaines où Cloudflare héberge le DNS, Cloudflare vérifie en permanence si le domaine utilise les serveurs de noms de Cloudflare pour la résolution DNS. Si les serveurs de noms de Cloudflare ne sont pas utilisés, l'état du domaine est mis à jour de _Actif_ à _Déplacé_ dans l'application Cloudflare **Aperçu** et un e-mail est envoyé au client.  Tout domaine _déplacé_ pendant plus de 7 jours est supprimé, sauf si le domaine redevient _Actif_.

Les étapes permettant de résoudre le problème nécessitent la mise à jour du DNS auprès de votre registrar de domaine pour utiliser les serveurs de noms Cloudflare :

1.  Suivez les étapes 2 et 3 de notre article sur la [résolution de problèmes de domaine](https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-).
2.  Cliquez sur **Revérifier maintenant** dans l’application **Overview** de Cloudflare.

___

## Pourquoi ne puis-je pas ajouter certains TLD via l'API DNS ?

L'API DNS ne peut pas être utilisée pour les domaines avec .cf, .ga, .gq, .ml, ou .tk TLDs. Utilisez le tableau de bord Cloudflare pour gérer ces TLD.Les clients Enterprise peuvent [contacter le service d'assistance Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) pour supprimer cette limitation.
