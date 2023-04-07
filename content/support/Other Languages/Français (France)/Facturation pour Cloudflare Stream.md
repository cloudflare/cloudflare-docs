---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360016450871-Facturation-pour-Cloudflare-Stream
title: Facturation pour Cloudflare Stream
---

# Facturation pour Cloudflare Stream

## Facturation pour Cloudflare Stream

_En savoir plus sur la tarification de Cloudflare Stream et la façon dont la facturation est calculée._

___

## Tarification de Cloudflare Stream

[Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091) est une plate-forme de vidéo à la demande permettant de créer des applications vidéo. La tarification est fonction de l'utilisation et du stockage, comme indiqué ci-dessous.

Minutes de vidéo fournies aux utilisateurs :

-   1,00 $ pour 1 000 minutes par mois

Minutes de vidéo stockées sur Cloudflare Stream :

-   5,00 $ pour 1 000 minutes
-   Facturation à l'avance

___

Cloudflare Stream est facturé mensuellement. Étant donné que Stream est un service facturé en fonction de la consommation, vous serez facturé en fonction des minutes de visionnage et de stockage pour le mois précédent. Par exemple, votre facture de septembre indiquera les frais d'utilisation de Stream pour le mois d'août.

Les frais sont arrondis aux 1 000 minutes supérieures. Vous trouverez ci-dessous quelques estimations de prix en fonction des minutes fournies et stockées :

| **Minutes** | **Arrondies à** | **Frais encourus** |
| --- | --- | --- |
| 
1999 min fournies aux utilisateurs

 | 

2000 minutes

 | 

2,00 $

 |
| 

3001 min stockées sur Stream

 | 

4000 minutes

 | 

20 $

 |
| Montant total pour la période | 

22,00 $

 |

Pour utiliser Stream, vous devez avoir enregistré un mode de paiement valide dans votre compte Cloudflare. Cloudflare Stream cessera de diffuser des vidéos si nous détectons un défaut de paiement. Si vous ne renouvelez pas votre paiement, les vidéos que vous avez téléchargées seront supprimées au bout de 30 jours.

___

## Minutes facturables de Cloudflare Stream

Les minutes facturables représentent le temps passé à transmettre les vidéos de Cloudflare à vos visiteurs.

Si un visiteur du site charge une vidéo et ne la regarde pas, Cloudflare facturera quand même la livraison de la vidéo. Cependant, si le navigateur du visiteur met la vidéo en cache localement, Cloudflare ne facture pas le temps passé à la regarder. En d'autres termes, si le visiteur regarde la vidéo plusieurs fois, nous ne facturerons pas les visionnages suivants.

Si vous utilisez l'attribut _preload_ (décrit dans la [API documentation](/stream/video-playback/player-api/) de Stream) dans le code incorporé, nous vous facturerons le temps passé à pré-charger la vidéo. Notez que le comportement de pré-chargement varie selon le navigateur. Certains navigateurs pré-chargent quelques secondes de vidéo alors que d'autres pré-chargent la vidéo entière. Bien que le pré-chargement soit utile pour optimiser la disponibilité de la vidéo, demandez-vous s'il convient à votre utilisation.

Vous pouvez consulter vos minutes facturables Cloudflare Stream dans le tableau de bord Cloudflare pour estimer le coût des minutes que vous avez consommées.

Pour voir vos minutes de streaming regardées, 

1.  Connectez-vous à votre compte Cloudflare.
2.  Dans la liste déroulante **My profile**, sélectionnez **Billing**. Vous verrez une liste des domaines associés à votre compte Cloudflare.
3.  Choisissez le domaine pour lequel Stream est activé.
4.  Dans la barre de navigation gauche, cliquez sur **Consommation facturable**. Vous verrez un graphique représentant votre trafic quotidien actuel.
5.  Choisissez **Previous month** (Mois précédent) dans le menu déroulant au-dessus du graphique et cliquez sur **Month to date** (Mois jusqu'à aujourd'hui) pour afficher votre consommation du mois précédent. ![stream_billing_subcriptions_previous_month.png](/support/static/stream_billing_subcriptions_previous_month.png)

___

-   [Plate-forme vidéo Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091)
-   [Documentation pour les développeurs de Cloudflare Stream](/stream/getting-started/)
