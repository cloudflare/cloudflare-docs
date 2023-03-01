---
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115005254367-Facturation-pour-l-%C3%A9quilibrage-de-charge-Load-Balancing-
title: Facturation pour l’équilibrage de charge (Load Balancing)
---

# Facturation pour l’équilibrage de charge (Load Balancing)

## Facturation pour l’équilibrage de charge (Load Balancing)

_En savoir plus sur le calcul de la facturation de l’équilibrage de charge._

### Dans cet article

-   [Tarifs de l'équilibrage de charge Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/115005254367-Facturation-pour-l-%C3%A9quilibrage-de-charge-Load-Balancing-#12345679)
-   [Facturation de l’équilibrage de charge](https://support.cloudflare.com/hc/fr-fr/articles/115005254367-Facturation-pour-l-%C3%A9quilibrage-de-charge-Load-Balancing-#12345680)
-   [Utilisation facturable de l'équilibrage de charge](https://support.cloudflare.com/hc/fr-fr/articles/115005254367-Facturation-pour-l-%C3%A9quilibrage-de-charge-Load-Balancing-#12345681)
-   [Facturation pour les clients Enterprise](https://support.cloudflare.com/hc/fr-fr/articles/115005254367-Facturation-pour-l-%C3%A9quilibrage-de-charge-Load-Balancing-#12345682)

___

## Tarifs de l'équilibrage de charge Cloudflare

Les abonnements à l’équilibrage de charge s’élèvent de 5 à 50 USD par mois, en fonction des options d’abonnement choisies.

Vous pouvez configurer l’équilibrage de charge pour l’adapter à vos besoins spécifiques en fonction du nombre de serveurs d’origine, de la fréquence du contrôle d’intégrité, du nombre de régions contrôlées et du géo-routage.

L’abonnement à 5 $ vous permet de configurer 2 serveurs d’origine, des contrôles d’intégrité de 60 secondes et des contrôles à partir d’une (1) région : il est idéal pour un équilibrage de charge ou un failover simple.

___

Lorsqu'il est activé, l'équilibrage de charge de Cloudflare est facturé au niveau du compte. Outre l’abonnement mensuel, nous compterons le nombre de demandes de DNS (« requêtes ») pour chaque équilibreur de charge configuré, chaque mois. Les 500 000 premières demandes, partagées sur tous les équilibreurs de charge de votre compte, sont gratuites : toute utilisation supplémentaire au-delà de cette limite sera facturée 0,50 USD par série de 500 000 demandes, arrondie aux 500 000 demandes les plus proches.

Par exemple :

-   81 451 demandes DNS = abonnement + 0 USD d’utilisation.
-   511 881 demandes DNS = abonnement + 0,50 USD d’utilisation
-   2 994 155 demandes DNS = abonnement + 2,50 USD d’utilisation

Veuillez noter que les 500 000 premières requêtes sont fonction de tous les équilibreurs de charge actifs dans votre compte, et ne sont pas comptabilisées par site (domaine), car les équilibreurs de charge peuvent être partagés par plusieurs sites en configurant un enregistrement CNAME.

___

## Utilisation facturable de l'équilibrage de charge

L’utilisation est comptée comme des [demandes de DNS](https://en.wikipedia.org/wiki/Domain_Name_System) faisant autorité par rapport aux serveurs de noms de Cloudflare pour chacun des noms d’hôte équilibrés en charge que vous avez configurés.

Il est possible de réduire le nombre de demandes de DNS faisant autorité en configurant votre équilibreur de charge comme étant « proxysé » (nuage orange) pour vos services HTTP(S), ce qui fixera le protocole TTL DNS externe à 5 minutes, conservant ainsi la performance du failover avec des TTL DNS très courts. [Découvrez les avantages d’un équilibreur proxysé (nuage orange) par rapport à un équilibreur non proxysé (nuage gris).](https://support.cloudflare.com/hc/en-us/articles/115005138088-Load-Balancing-TTLs-and-Orange-vs-Grey-Cloud)

### Facturation pour les clients Enterprise

Les clients Enterprise sont facturés en fonction des discussions qu’ils ont eues avec l’équipe de ventes Enterprise de Cloudflare. Les clients Enterprise ont également accès à des fonctionnalités supplémentaires, notamment :

-   Des contrôles d’intégrité depuis [chaque datacenter Cloudflare](https://www.cloudflare.com/network/) (permettant une meilleure granularité du failover)
-   Un pilotage par datacenter (se substitue aux serveurs d’origine qu’un site spécifique devrait utiliser, et de l’ordre dans lequel ils devraient être utilisés)
-   Intervalles de 5 secondes entre les contrôles d’intégrité
-   Assistance pour plus de 20 serveurs d’origine
-   Support Cloudflare Enterprise (y compris par e-mails par téléphone et la désignation d’un ingénieur Solutions dédié 24h/24 et 7j/7)
