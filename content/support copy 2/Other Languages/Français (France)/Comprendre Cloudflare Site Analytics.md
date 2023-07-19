---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360037684251-Comprendre-Cloudflare-Site-Analytics
title: Comprendre Cloudflare Site Analytics
---

# Comprendre Cloudflare Site Analytics

_L’application Cloudflare (Site) Analytics vous aide à obtenir des informations sur chaque site spécifique de votre compte Cloudflare. Ces indicateurs comprennent les données des requêtes et des réponses associées au trafic web, à la sécurité, aux performances, au DNS et à Workers._

___

## Aperçu

L’application (Site) **Analytics** du tableau de bord Cloudflare est un composant majeur de la gamme globale de produits Cloudflare Analytics. Plus précisément, cette application vous donne accès à un grand choix d’indicateurs, collectés au niveau du site web ou du domaine.

___

## Consultez les données analytiques de votre site web

Pour afficher les indicateurs de votre site Web :

1.  Connectez-vous au tableau de bord Cloudflare.
2.  Cliquez sur le **compte** Cloudflare correspondant à votre site, puis sélectionnez le **domaine**.
3.  Ensuite, cliquez sur l’icône de l’application **Analytics**.

Une fois chargée, l’application Analytics affiche un ensemble d’onglets correspondant aux catégories **Traffic** (Trafic), **Security** (Sécurité), **Performance**, **DNS**, **Workers** et **Logs** (Fichiers journaux) (domaines Enterprise uniquement). Pour comprendre les différents indicateurs disponibles, reportez-vous à la section _Examinez les indicateurs de votre site web_ ci-dessous.

![UI de l'application Analytics dans le tableau de bord Cloudflare affichant les données de trafic web](/images/support/hc-dash-analytics-dashboard_overview.png)

Avec les offres Pro, Business et Enterprise, les toutes dernières données Web Analytics sont affichées sur l’onglet Traffic (Trafic).

![Capture d’écran de l’interface utilisateur dans le tableau de bord Cloudflare Analytics pour les clients Pro, Business et Enterprise.](/images/support/hc-dash-analytics-web_traffic.png)

___

## Examinez les indicateurs de votre site web

Cette section décrit les indicateurs disponibles sur chaque onglet de l’application Analytics. Avant de continuer, veuillez noter que chaque onglet peut contenir :

-   Un ou plusieurs volets permettant de catégoriser davantage les indicateurs sous-jacents, et
-   Une liste déroulante (en haut à droite du volet) permettant de filtrer les indicateurs pour une période spécifique. La période que vous pouvez sélectionner peut varier en fonction de l’offre Cloudflare à laquelle est associé votre domaine.

Vous trouverez ci-dessous un résumé de chaque onglet de l’application Analytics.

### Trafic

#### Offre Free

Ces indicateurs incluent les requêtes d’utilisateurs légitimes ainsi que les robots d’indexation et les menaces. L’onglet Traffic (Trafic) comporte les panneaux suivants :

-   **Trafic Web** (Trafic web) : affiche les mesures pour les catégories _Requests_ (Requêtes), _Bandwidth_ (Bande passante), _Unique visitors_ (Visiteurs uniques) et [_Status Codes_](https://support.cloudflare.com/hc/articles/206973867-Status-code-metrics-in-Cloudflare-Site-Analytics) (Codes d’état). Notez que si vous utilisez Cloudflare Workers, les données analytiques de sous-requêtes sont disponibles sur l’onglet **Workers**.
-   **Web Traffic Requests by Country (Requêtes de trafic Web par pays)** : carte interactive détaillant le nombre de requêtes par pays. Ce volet inclut un tableau de données **Top Traffic Countries / Regions** (Principales pays/régions du trafic) qui affiche les pays ayant le plus grand nombre de requêtes (jusqu’à cinq, si les données existent).
-   **Share Your Stats** (Partagez vos statistiques) : permet de partager les statistiques réelles du site sur les réseaux sociaux (Twitter) pour les catégories suivantes : _Bytes served_ (Octets économisés), _SSL requests served_ (Requêtes SSL servies) et _Attacks blocked_ (Attaques bloquées).

#### Offre Pro, Business OU Enterprise

Les données analytiques sont basées sur les fichiers journaux du réseau périphérique de Cloudflare, et ne nécessitent pas d’avoir recours à des scripts ou des traceurs tiers. L’onglet Traffic (Trafic) comporte les indicateurs suivants :

-   **Visites** (Visites) : une visite est définie comme une vue de page provenant d’un autre site web ou d’un lien direct. Cloudflare vérifie les visites pour lesquelles le référent HTTP ne correspond pas au nom d’hôte. Une visite peut comporter plusieurs consultations de pages.
-   **Pages views** (Vues de pages) : une vue de page est définie comme une réponse HTTP réussie avec un type de contenu HTML.
-   **Requests** (Requêtes) : une requête HTTP. Une vue de page typique nécessite de nombreuses requêtes.
-   **Data Transfer** (Transfert de données) : quantité totale de données HTTP transférées dans les requêtes.

Pour afficher des indicateurs plus détaillés, **ajoutez un filtre**. Vous pouvez également filtrer chaque indicateur en fonction des données suivantes : **Referer** (Référent), **Host** (Hôte), **Country** (Pays), **Path** (Chemin), **Status code** (Code d’état), **Origin status code** (Code d’état de l’origine), **Browser** (Navigateur), **Operating system** (Système d’exploitation) ou **Device type** (Type d’appareil). 

Pour modifier la période, utilisez le menu déroulant sur le côté droit, au-dessus du graphique. Vous pouvez également faire glisser pour effectuer un zoom sur le graphique.

### Sécurité

Pour cet onglet, le nombre et le type de diagrammes peuvent varier en fonction des données existantes et de l’offre souscrite par le client. La plupart des indicateurs sur cet onglet proviennent de l’application Cloudflare Firewall. Les volets disponibles incluent :

-   **Menaces** (Threats) – Affiche un résumé des données et un graphique en zones indiquant les menaces contre le site.
-   **Threats by Country** (Menaces par pays) – Carte interactive mettant en évidence les pays d’origine des menaces. La carte interactive présente également des tableaux de données contenant des statistiques dans les catégories **Top Threat Countries / Regions** (Principaux pays/régions d’origine des menaces) et **Top Crawlers / Bots** (Principaux robots d’indexation/robots).
-   **Rate Limiting** (service complémentaire) – Présente un graphique linéaire mettant en évidence les requêtes correspondantes et bloquées, en fonction des limites de débit. Pour en savoir plus, consultez la section [Rate Limiting Analytics](https://support.cloudflare.com/hc/fr-fr/articles/115003414428-Rate-Limiting-Analytics).
-   **Overview** (Vue d’ensemble) – Affiche un ensemble de diagrammes à secteurs pour les catégories suivantes : **Total Threast Stopped** (Nombre total de menaces bloquées), **Traffic Served Over SSL** (Trafic servi par SSL) et **Types of Threats Mitigated** (Types de menaces atténuées). Le cas échéant, le lien extensible **Details** (Détails) affiche un tableau contenant des données numériques.

### Performances

Les indicateurs agrégés sous cet onglet couvrent plusieurs services Cloudflare. Les volets disponibles incluent :

-   **Origin Performance (Argo)** (Performances du serveur d’origine, service complémentaire) – Affiche les indicateurs relatifs au temps de réponse entre le réseau périphérique de Cloudflare et les serveurs d’origine pour les 48 dernières heures. Pour plus de détails, consultez la section [Argo Analytics](https://support.cloudflare.com/hc/articles/115001255631-Argo-Analytics).
-   **Overview** (Vue d’ensemble) – Affiche un ensemble de diagrammes à secteurs pour les catégories suivantes : **Client HTTP Version Used** (Version HTTP utilisée par le client), **Bandwidth Saved** (Bande passante économisée) et **Content Type Breakdown** (Répartition par type de contenu). Le cas échéant, le lien extensible **Details** (Détails) affiche un tableau contenant des données numériques.

### DNS

L’onglet DNS présente plusieurs statistiques pour les requêtes DNS. Veuillez noter que les indicateurs restent disponibles tant que Cloudflare est le serveur DNS faisant autorité du site, même si le site n’est pas traité en proxy par Cloudflare. Les mesures DNS ne sont donc pas proposées pour les sites avec une [configuration CNAME](https://support.cloudflare.com/hc/articles/360020348832-Understanding-a-CNAME-Setup).

Les volets d’indicateurs disponibles sur l’onglet DNS incluent :

-   **DNS Queries** (Requêtes DNS) – Affiche plusieurs graphiques en aires et tableaux de données pour les indicateurs d’enregistrements DNS, notamment les requêtes catégorisées par _Response Code_ (Code de réponse), _Record Type_ (Type d’enregistrement), ainsi que les enregistrements renvoyant une réponse _NXDOMAIN_ (enregistrement DNS inexistant). Vous pouvez filtrer en fonction d’un ou plusieurs enregistrements DNS en saisissant des noms d’enregistrements (par exemple, www.exemple.com) dans le menu déroulant situé près du haut de la fenêtre.
-   **DNS Queries by Data Center** (Requêtes DNS par centre de données) – Permet d’afficher la répartition des requêtes DNS en fonction des datacenters de Cloudflare. Les indicateurs sont affichés sous forme de cartes interactives et de tableaux de données, et incluent des statistiques pour les catégories _Traffic_ (Trafic), _NXDOMAIN_ et _NOERROR_.

### Workers

Ce volet présente des indicateurs relatifs à Cloudflare Workers. Pour en savoir plus, lisez la section [Cloudflare Analytics avec Workers](https://support.cloudflare.com/hc/articles/360007553512-Cloudflare-analytics-with-Workers).

### Fichiers journaux

L’onglet Logs (Fichiers journaux) n’est pas une fonctionnalité proposant des indicateurs. Au lieu de cela, les clients ayant souscrit l’offre Enterprise peuvent activer le service [Cloudflare Logs Logpush](/logs/about/). Vous pouvez utiliser Logpush pour télécharger et analyser les données avec l’outil de données analytiques de votre choix.

___

## Ressources associées

-   [Cloudflare Analytics : un bref aperçu](/analytics)
-   [L’API GraphQL Cloudflare Analytics](/analytics/)
