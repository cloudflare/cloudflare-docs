---
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115000272247-Facturation-pour-le-Rate-Limiting-de-Cloudflare
title: Facturation pour le Rate Limiting de Cloudflare
---

# Facturation pour le Rate Limiting de Cloudflare

## Facturation pour le Rate Limiting de Cloudflare

_En savoir plus sur le calcul de la facturation de Cloudflare Rate Limiting._

___

## Tarification de Cloudflare Rate Limiting

Les clients Enterprise font l’objet d’une facturation d’un montant fixe spécifié dans leur contrat. Toutes les autres offres sont [facturées en fonction de leur utilisation](https://support.cloudflare.com/hc/en-us/articles/115004555148), qui apparaît dans la facture de leur abonnement mensuel comme suit :

Les 10 000 premières requêtes facturables sur tous vos sites web sont gratuites. Vous serez ensuite facturé 0,05 $ par 10 000 requêtes. Par exemple, si vous avez un total de 35 000 requêtes correctes/autorisées correspondantes à une règle Rate Limiting :

-   De 1 à 10 000 gratuites.
-   10 001 à 20 000 coût 0,05 $
-   20 001 à 30 000 coût 0,05 $
-   30 001 à 35 000 coût 0,05 $ (la facturation ne se fait pas au prorata si vous n’utilisez qu’une partie des 10 000 requêtes que vous avez payées)

Le Rate Limiting vous sera facturé 0,15 $ au total à votre prochaine [date de facturation](https://support.cloudflare.com/hc/en-us/articles/200170286-How-does-CloudFlare-s-billing-for-apps-and-paid-plans-work-#section2). Le montant apparaîtra sur votre facture et indiquera le nombre total de requêtes facturées.

Veuillez noter que les 10 000 premières requêtes concernent tous les sites de votre compte, et qu’il ne s’agit pas de 10 000 requêtes gratuites par site. Si l’un de vos sites compte 20 000 requêtes et un autre 30 000, votre facture sera de 0,20 $ pour les 50 000 requêtes au total, et non de 0,15 $.

___

## Consommation facturable du Rate Limiting

Le Rate Limiting est facturé en fonction du nombre de requêtes correctes (non bloquées) qui suivent vos règles définies sur tous vos sites web. Chaque requête n’est comptabilisée qu’une seule fois. Vous ne serez donc pas facturé deux fois si une requête correspond à plusieurs règles.

Par exemple, pour une règle qui correspond à exemple.com/ratelimit/\* et bloque les clients qui envoient plus de 30 requêtes par minute :

-   Le client A envoie 20 000 requêtes vers exemple.com/ratelimit/foo à un taux de 10 requêtes par minute. Toutes les requêtes sont autorisées.
-   Le client B envoie 90 000 requêtes vers exemple.com/ratelimit/bar à un taux de 10 requêtes par minute, mais avec des rafales de plus de 30 requêtes par minute. 60 000 de ces requêtes sont bloquées lors des rafales et 30 000 sont autorisées lorsque leur taux de requêtes est inférieur.
-   Le client C envoie 20 000 requêtes vers exemple.com/elsewhere à un taux de 40 requêtes par minute. Bien que cela dépasse le seuil, cela ne correspond pas au chemin de règle et les 20 000 requêtes sont donc autorisées.

Dans cet exemple, 50 000 (30 000 + 20 000) requêtes sont facturables. Les clients A et B ont tous les deux envoyé des requêtes qui correspondent à la règle, mais certaines des requêtes du client B ont été bloquées et n’ont pas été facturées. Au total, le coût s’élève (50 000 - 10 000) \* 0,05 $ = 0,20 $.

| 
**Client**

 | 

**URL de la requête**

 | 

**Requêtes**

 | 

**Résultat**

 | 

**Coût mensuel**

 |
| --- | --- | --- | --- | --- |
| A | exemple.com/ratelimit/foo | 20 000 à 10 requêtes/min | Le modèle d’URL correspond, mais le seuil n’est pas dépassé. Toutes les requêtes sont transmises. | 

(2-1) \* 0,05 USD = 0,05 USD

_Seules 10 000 requêtes sont facturées, car les 10 000 premières requêtes n’entraînent aucun coût._

 |
| B |  exemple.com/ratelimit/bar | 

90 000 :

60 000 à 30 requêtes/min + 30 000 à un débit inférieur à 30 requêtes/min

 | Le type d’URL correspond. La règle a bloqué 60 000 requêtes et en a autorisé 30 000. | 3 \* 0,05 USD = 0,15 USD |
| C |  exemple.com/elsewhere | 20 000 à 40 requêtes/min | Le type d’URL ne correspond pas. La règle ne s’applique pas. Toutes les requêtes sont transmises. | 0,00 $ |
|  **Total à facturer :** | 0,20 $ |
