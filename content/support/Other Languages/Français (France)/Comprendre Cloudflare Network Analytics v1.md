---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1
title: Comprendre Cloudflare Network Analytics v1
---

# Comprendre Cloudflare Network Analytics v1

_Découvrez comment Magic Transit et Cloudflare Spectrum (BYOIP et non-BYOIP) utilisent les données Network Analytics au niveau du compte pour explorer les détails du trafic des couches 3 et 4 et des attaques DDoS._

### Dans cet article

-   [Aperçu](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#7rrlY887ZX7ZDVmx2V4bcm)
-   [Consultation des données Network Analytics](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#7x2T95w9RGgg782pVMujPb)
-   [Accès aux données Network Analytics](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#h_3WlP6WsWFl28h92oS2k8O2)
-   [Application de filtres aux données](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#h_4Agjkc3QlLuhrCW43NsN3p)
-   [Sélection d’une dimension à tracer](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#h_4UZtmYClrU0N7OYwZgHHoh)
-   [Affichage du journal d’activité](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#h_6GOQ2ficyicPxirroGewJP)
-   [Exportation des données du fichier journal et des rapports](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#h_3grb6OPVreABUQaQBekfHn)
-   [Limitations](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#h_6tCVFw0V6ufdvQnRIxu19t)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#7flIreW1Np8fuxZYTbduF2)
-   [FAQ](https://support.cloudflare.com/hc/fr-fr/articles/360038696631-Comprendre-Cloudflare-Network-Analytics-v1#h_2CqXhNxV03M5IUwklSR3n6)

___

## Aperçu

L’accès à Network Analytics nécessite les éléments suivants :

-   Une offre Cloudflare Enterprise
-   Cloudflare [Magic Transit](/magic-transit/) ou [Spectrum](/spectrum/).

L'écran **Network Analytics** de Cloudflare permet de suivre en temps quasi réel les tendances du trafic des couches réseau et transport et les attaques DDoS Network Analytics affiche des données au niveau des paquets et des bits, qui sont les mêmes que celles fournies par l'[API GraphQL Analytics](/analytics/graphql-api/).

![Volet Analytics présentant la synthèse des paquets par type](/images/support/na-main-dashboard.png)

Network Analytics accélère la signalisation et l’examen du trafic malveillant. Vous pouvez filtrer les données en fonction des paramètres suivants :

-   Mesure d’atténuation prise par Cloudflare
-   Adresse IP, port, ASN de la source
-   Adresse IP et port de la destination
-   Ville et pays du datacenter Cloudflare où le trafic a été observé
-   Taille, type, taux et durée de l’attaque
-   Indicateur TCP
-   Version IP
-   Protocole

Utilisez Network Analytics pour identifier rapidement les informations essentielles :

-   Principaux vecteurs d’attaque ciblant le réseau
-   Atténuation du trafic au fil du temps, ventilée par mesure
-   Source de l’attaque, par pays ou datacenter

___

## Consultation des données Network Analytics

Vous pouvez accéder à l'écran **Network Analytics** à partir de la page d'accueil de votre compte Cloudflare.

Pour accéder à l'écran **Network Analytics** veuillez procéder comme suit :

1.  Connectez-vous à votre compte Cloudflare.
2.  Si vous avez accès à plusieurs comptes, sélectionnez le compte qui a accès à Magic Transit ou Spectrum.
3.  Sur la page d'**accueil** du compte, cliquez sur **Network Analytics**.

___

## Accès aux données Network Analytics

### Titre, récapitulatif et volets latéraux

Le haut de page et les panneaux latéraux présentent un résumé de l'activité au cours de la période sélectionnée dans la liste déroulante **période**.

![Titre et volet latéral synthétisant l'activité des dernières 24 heures](/images/support/na-navigate.png)

Le titre indique le nombre total de paquets ou de bits et le nombre d’attaques détectées. Lorsqu’une attaque est en cours, le titre affiche le débit maximal de paquets (ou de bits), plutôt que le nombre total. Lorsqu’une attaque est en cours, le titre affiche le débit maximal de paquets (ou de bits), plutôt que le nombre total.

Pour afficher les données, cliquez sur le panneau latéral **Paquets** ou **Bits**.

### Définir l’intervalle d’affichage

Utilisez la liste déroulante **période** pour modifier la période pour laquelle l'analyse de réseau affiche les données. Lorsque vous sélectionnez une période, la totalité des informations sont actualisées en fonction de celle-ci.

Lorsque vous sélectionnez _30 dernières minutes_, l'écran **Network Analytics** affiche les données des 30 dernières minutes, en les rafraîchissant toutes les 20 secondes. Une notification _Live_ apparaît à côté de la liste déroulante des statistiques pour vous indiquer que les données sont mises à jour automatiquement :

![Rafraîchissement automatique activé dans Network Analytics](/images/support/hc-dash-Network_Analytics-auto_refresh.png)

Si vous sélectionnez l'option _Période déterminée_, vous pouvez déterminer une période allant jusqu'à 30 jours, située à n'importe quel moment de l'année précédente.

### Afficher par débit moyen ou volume total

Choisissez une statistique dans la liste déroulante pour basculer entre _Taux moyen_ et _Total_. 

### Afficher les événements d'annonce/retrait de préfixe IP

Activez **Afficher les annotations** pour afficher ou masquer les annotations relatives aux événements liés aux préfixes IP annoncés/retirés dans la base de données à l'écran **Network Analytics** . Cliquez sur chaque annotation pour obtenir plus de détails.

![Bouton permettant d'afficher les annotations dans le graphique Network Analytics](/images/support/hc-dash-Network_Analytics-show_annotations.png)

### Effectuer un zoom sur le récapitulatif des paquets

Cliquez et faites glisser la souris sur une zone du diagramme pour effectuer un zoom. Grâce à cette technique, vous pouvez effectuer un zoom sur un intervalle allant jusqu’à 3 minutes.

![Zoom sur la synthèse des paquets ](/images/support/unnamed.gif)

Pour faire un zoom arrière, cliquez sur l'icône **X** du sélecteur de **période**.

___

## Application de filtres aux données

Vous pouvez appliquer différents filtres et exclusions pour ajuster la portée des données affichées dans Network Analytics.

Les filtres affectent toutes les données affichées sur la page Network Analytics.

Les données de l'analyse réseau peuvent être filtrées de deux manières : en utilisant le bouton **Ajouter un filtre** ou en cliquant sur l'un des **filtres de statistiques**.

### Utilisation du bouton Ajouter un filtre

Cliquez sur le bouton **Ajouter un filtre** pour ouvrir le pop-up **Nouveau filtre**. Définissez un champ, un opérateur et une valeur pour compléter votre expression de filtrage. Cliquez sur **Appliquer** pour actualiser les données.

Lorsque vous appliquez des filtres, tenez compte les directives suivantes :

-   Les caractères génériques ne sont pas autorisés.
-   Il n’est pas nécessaire de saisir les valeurs entre guillemets.
-   Lorsque vous indiquez un numéro ASN, n'indiquez pas le préfixe _AS_. Par exemple, saisissez _1423_ au lieu de _AS1423_.

### Utilisation d’un filtre de statistiques

Pour effectuer un filtrage en fonction du type de données relatives à l'une des statistiques de Network Analytics, utilisez les boutons **Filtrer** et **Exclure** qui s'affichent lorsque vous placez votre pointeur sur la statistique. 

Dans cet exemple, en cliquant sur le bouton **Filtrer**, vous n'affichez que le trafic associé à l'action _Autoriser_.

### Créez une règle Magic Firewall à partir des filtres appliqués

Vous pouvez créer une règle [Magic Firewall](/magic-firewall) afin de bloquer tout le trafic correspondant aux filtres sélectionnés dans Network Analytics. Les filtres pris en charge actuellement sont les suivants :

-   Destination IP (IP de destination)
-   Protocole
-   Source data center (Datacenter source)
-   Source IP (IP source)
-   Indicateurs TCP

Les autres types de filtres Network Analytics ne seront pas ajoutés à la nouvelle définition de règle. Vous pouvez cependant configurer plus en détail la règle dans Magic Firewall.

Procédez comme suit :

1\. Appliquez un ou plusieurs filtres dans Network Analytics.

2\. Cliquez sur **Create Magic Firewall rule**. 

![Création d'un lien de règle de pare-feu dans Network Analytics](/images/support/hc-dash-Network_Analytics-create_firewall_rule.png)

L'éditeur de règles Magic Firewall s'affiche avec les filtres et les valeurs sélectionnés.

3\. Vérifiez la définition de la règle dans l'éditeur de règles de Magic Firewall.

4\. Cliquez sur **Add new**.

### Champs, opérateurs et valeurs de filtre pris en charge

Le tableau ci-dessous présente la sélection de champs, d’opérateurs et de valeurs que vous pouvez utiliser pour filtrer les données Network Analytics.

| Champ                                            | Opérateurs                                                                                                 | Valeur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Action                                           | Est égal à<br>N’est pas égal à                                                                             | Autoriser : Trafic autorisé par les systèmes de protection DDoS automatisés de Cloudflare. Cela peut également inclure le trafic atténué par les règles de pare-feu, les règles flowtrackd et les règles de la couche 7.<br>Bloquer : Le trafic est bloqué par les systèmes de protection DDoS automatisés de Cloudflare.<br>Suivi des connexions : Ne concerne que la couche 7, car Magic Transit est exclu et aucun suivi de connexion n'est effectué pour les préfixes Magic Transit.<br>Limitation de débit : elle peut être appliquée en fonction de l'adresse IP source, du sous-réseau ou à n'importe quelle connexion. Cette décision est programmée en fonction de critères heuristiques.<br>Surveiller : Attaques qui ont été identifiées mais que l'on a choisi d'observer simplement et de ne pas atténuer par une quelconque règle. |
| Attack ID (ID d’attaque)                         | Est égal à<br>N’est pas égal à                                                                             | Numéro d’attaque                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Attack Type (Type d’attaque)                     | Est égal à<br>N’est pas égal à                                                                             | UDP Flood<br>SYN Flood<br>ACK flood<br>RST Flood<br>LDAP Flood<br>Christmas Flood<br>FIN Flood<br>GRE Flood<br>ICMP Flood                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Destination IP (IP de destination)               | Est égal à<br>N’est pas égal à                                                                             | Adresse IP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Destination Port (Port de destination)           | Est égal à<br>N’est pas égal à<br>Supérieur à<br>Supérieur ou égal à<br>Inférieur à<br>Inférieur ou égal à | Numéro de port<br>Plage de ports                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Destination IP range (Plage d’IP de destination) | Est égal à<br>N’est pas égal à                                                                             | Plage d’adresses IP et masque                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| IP Version (Version IP)                          | Est égal à<br>N’est pas égal à                                                                             | 4 ou 6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Protocole                                        | Est égal à<br>N’est pas égal à                                                                             | TCP<br>UDP<br>ICMP<br>GRE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Source ASN (ASN source)                          | Est égal à<br>N’est pas égal à                                                                             | Numéro AS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Source Country (Pays source)                     | Est égal à<br>N’est pas égal à                                                                             | Nom du pays                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Source data center (Datacenter source)           | Est égal à<br>N’est pas égal à                                                                             | Localisation du datacenter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Source IP (IP source)                            | Est égal à<br>N’est pas égal à                                                                             | Adresse IP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Source port (Port source)                        | Est égal à<br>N’est pas égal à<br>Supérieur à<br>Supérieur ou égal à<br>Inférieur à<br>Inférieur ou égal à | Numéro de port<br>Plage de ports                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| TCP Flag (Identifiant TCP)                       | Est égal à<br>N’est pas égal à<br>Contient                                                                 | SYN, SYN-ACK, FIN, ACK, RST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

___

## Sélection d’une dimension à tracer

Vous pouvez représenter les données Network Analytics selon différentes dimensions. Par défaut, Network Analytics affiche les données ventilées par action.

Sélectionnez l'un des onglets **Résumé** pour visualiser les données sous une autre perspective.

![Visualisation de données sur plusieurs dimensions](/images/support/unnamed__1_.gif)

Vous pouvez choisir parmi ces options :

-   Action
-   Type d’attaque
-   Destination IP (IP de destination)
-   Port de destination
-   Version IP
-   Protocole
-   Source ASN (ASN source)
-   Pays d’origine
-   Source data center (Datacenter source)
-   Source IP (IP source)
-   Source port (Port source)
-   Indicateur TCP

### Partage de filtres de données Firewall Analytics

Lorsque vous ajoutez des filtres et spécifiez un intervalle dans Firewall Analytics, l’URL change pour refléter ces paramètres.

Pour partager votre vue des données, copiez l’URL et envoyez-la à d’autres utilisateurs afin qu’ils puissent travailler avec la même vue.

![Sélection de l'URL de la page Network Analytics](/images/support/hc-dashboard-network-analytics-6.png)

___

## Affichage du journal d’activité

Le **journal des activités** d'analyse réseau affiche jusqu'à 500 événements dans la période définie, à raison de 10 résultats par page et par intervalle de temps. (L' [API GraphQL Analytics](/analytics/graphql-api/) n'a pas cette limitation.) 

Pour afficher les détails des événements, cliquez sur le widget d’agrandissement associé aux événements.

### Configuration des colonnes

Pour configurer les colonnes à afficher dans le journal d'activités, cliquez sur le bouton **Modifier les colonnes**. 

Cette fonction est particulièrement utile si vous souhaitez identifier une attaque DDoS pendant laquelle vous pouvez spécifier les attributs souhaités, tels que les adresses IP, le débit maximal et l’ID de l’attaque, entre autres.

### Affichage des éléments essentiels

Les volets **Pays source,** **Source** et **Destination**affichent chacun les principaux éléments.

Pour sélectionner le nombre d’éléments à afficher, utilisez la liste déroulante associée à la vue.

Pour voir les principaux datacenters, sélectionnez _Data center_ dans la liste déroulante du volet **Pays source**. Le volet **Datacenter source** remplace le volet **Pays source**.

___

## Exportation des données du fichier journal et des rapports

### Exportation de données de fichiers journaux d’activité

Vous pouvez exporter jusqu’à 500 événements bruts à la fois depuis le journal d’activité. Cette option est utile lorsque vous avez besoin de combiner et d’analyser les données Cloudflare avec vos propres données stockées dans un système ou une base de données distincts, tel qu’un système SIEM (Security Information and Event Management System).

Pour exporter les données du journal, cliquez sur **Exporter**.

Choisissez le format CSV ou JSON pour effectuer le rendu des données exportées. Le nom du fichier téléchargé reflétera l’intervalle sélectionné, suivant ce modèle :

_network-analytics-attacks-\[start time\]-\[end time\].json_

### Exportation d’un rapport Network Analytics

Pour imprimer ou télécharger un rapport instantané depuis **Network Analytics**, veuillez procéder comme suit :

Cliquez sur **Imprimer un rapport**. L'interface d'impression de votre navigateur affiche les options d'impression ou d'enregistrement au format PDF.

___

## Limitations

Network Analytics comporte actuellement les limitations suivantes :

-   Network Analytics v1 fournit des informations sur les [attaques par déni de service Daemon (dosd)](https://blog.cloudflare.com/who-ddosd-austin/). Bien que l’application fournisse une vue opportune des données, elle ne dispose pas d’une vue complète de tous les événements. 
-   Les sources de données suivantes ne sont pas disponibles dans Network Analytics v1 :
    -   Firewall Rules _(disponible dans Network Analytics v2)_
    -   Règles de la couche d’application
    -   Gatekeeper et règles appliquées manuellement
    -   [Flowtrackd](https://blog.cloudflare.com/announcing-flowtrackd/) (protection TCP avancée) _(disponible dans Network Analytics v2)_
    -   trafic WARP et [trafic en nuage orange](https://support.cloudflare.com/hc/fr-fr/articles/205177068)
-   Les données issues des services Cloudflare qui traitent le trafic en proxy, tel que CDN, ne sont pas disponibles dans Network Analytics.

___

## Ressources associées

-   [Cloudflare Network Analytics v2](/analytics/network-analytics/)
-   [Migration de Network Analytics v1 vers Network Analytics v2](/analytics/graphql-api/migration-guides/network-analytics-v2)
-   [Cloudflare GraphQL API](/analytics/graphql-api/)
-   [Cloudflare Analytics : un bref aperçu](https://support.cloudflare.com/hc/articles/360037684111)
-   [Numéros de port et noms de service IANA](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=1)

___

## FAQ

### Combien de temps Cloudflare conserve-t-il les données sur le portail Network Analytics ?

Si vous utilisez Network Analytics v2 (NAv2), la plage de données archivées que vous pouvez consulter couvre une période de **90 jours**.

Network Analyticsv1 (NAv1) utilise des nœuds GraphQL pour regrouper les données par flux IP de 1 minute, 1 heure et 1 jour. Par exemple, le nœud ipFlows1mGroups stocke les données dans des agrégations d’une minute.

Pour savoir quelle plage de données archivées vous pouvez consulter, reportez-vous à ce tableau. Utilisez la colonne _**notOlderThan**_ comme indicateur de la durée de conservation.

| 
Nœud de données GraphQL

 | 

maxDuration\*

 | 

notOlderThan\*\*

 | 

Sélections de d’intervalles dans Network Analytics

 | 

Nombre de points de données

 |
| --- | --- | --- | --- | --- |
| 

ipFlows1mGroups

 | 

25 heures

 | 

30 jours

 | 

30 minutes

 | 

30

 |
| 

6 heures

 | 

71

 |
| 

12 heures

 | 

48

 |
| 

24 heures

 | 

96

 |
| 

ipFlows1dGroups

 | 

6 mois

 | 

1 an

 | 

1 semaine

 | 

168

 |
| 

1 mois

 | 

30

 |

_**\*maxDuration**_ _définit la période de temps pouvant être consultée en une seule fois (varie selon le nœud de données)._

_**\*\*notOlderThan**_ _limite la période de recherche dans le fichier. Elle indique la durée de conservation des données dans notre base de données._ 

Lorsque vous consultez les fichiers journaux d’attaques du tableau de bord Cloudflare, gardez à l’esprit les points suivants :

-   Les journaux d’attaque sont stockés avec les informations d’horodatage de début et de fin, les statistiques de paquets et de bits pour les débits de données minimum, maximum et moyen, ainsi que les totaux, le type d’attaque et les mesures prises.
-   Les adresses IP source sont considérées comme des informations personnelles identifiables. Par conséquent, Cloudflare les stocke pendant 30 jours seulement. Après 30 jours, les adresses IP sources sont supprimées et les fichiers journaux sont d’abord regroupés par groupes de 1 heure, puis de 1 jour. Les cumuls de 1 heure sont stockés pendant 6 mois. Les cumuls de 1 jour sont conservés pendant 1 an.

Pour plus d’informations sur l’interrogation et l’accès aux données des fichiers journaux, veuillez consulter le site [GraphQL Analytics API](/analytics/graphql-api/limits).

### Pourquoi Network Analytics indique-t-il que l'adresse IP de destination est indisponible ?

L'adresse IP de destination est indiquée comme étant indisponible (_Unavailable_) quand elle n'a pas été incluse dans la signature en temps réel générée par nos [systèmes de protection contre les attaques DDoS](https://blog.cloudflare.com/mitigating-a-754-million-pps-ddos-attack-automatically/). 

Pour afficher l'adresse IP de destination, filtrez par ID d'attaque (**Attack ID**) et faites défiler jusqu'à la section **Destination** dans les listes des principaux éléments. Quand vous filtrez en fonction d'un ID d'attaque spécifique, l'intégralité du tableau de bord Network Analytics devient un rapport d'attaque.
