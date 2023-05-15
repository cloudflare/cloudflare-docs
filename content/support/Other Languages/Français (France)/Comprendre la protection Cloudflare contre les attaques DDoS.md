---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200172676-Comprendre-la-protection-Cloudflare-contre-les-attaques-DDoS
title: Comprendre la protection Cloudflare contre les attaques DDoS
---

# Comprendre la protection Cloudflare contre les attaques DDoS

_Découvrez comment Cloudflare vous protège contre les attaques DDoS et comment savoir si votre site web est attaqué._

### Dans cet article

-   [Aperçu](https://support.cloudflare.com/hc/fr-fr/articles/200172676-Comprendre-la-protection-Cloudflare-contre-les-attaques-DDoS#h_948b870f-2a72-481a-8186-cccc7f4f7c9b)
-   [Ensemble de règles Cloudflare HTTP DDoS Attack Protection Managed Ruleset](https://support.cloudflare.com/hc/fr-fr/articles/200172676-Comprendre-la-protection-Cloudflare-contre-les-attaques-DDoS#http-ddos-managed-rules)
-   [Ensemble de règles Cloudflare Network-layer DDoS Attack Protection Managed](https://support.cloudflare.com/hc/fr-fr/articles/200172676-Comprendre-la-protection-Cloudflare-contre-les-attaques-DDoS#network-ddos-managed-rules)
-   [Déterminez si vous êtes victime d’une attaque DDoS](https://support.cloudflare.com/hc/fr-fr/articles/200172676-Comprendre-la-protection-Cloudflare-contre-les-attaques-DDoS#h_bc8656d7-0088-4da1-b8da-2a369caa72d3)
-   [Est-ce que Cloudflare m’attaque ?](https://support.cloudflare.com/hc/fr-fr/articles/200172676-Comprendre-la-protection-Cloudflare-contre-les-attaques-DDoS#h_60eb7a1e-a0b0-45c9-9c19-d67b93eea470)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/200172676-Comprendre-la-protection-Cloudflare-contre-les-attaques-DDoS#h_5d49e839-e040-49a9-acce-11bd03dfdcc2)

___

## Aperçu

Une [attaque par déni de service distribué](https://www.cloudflare.com/ddos) (DDoS, Distributed Denial of Service) est une attaque qui cherche à rendre un service en ligne indisponible pour ses utilisateurs finaux. Pour toutes les offres, Cloudflare propose une atténuation illimitée des attaques DDoS des couches 3, 4 et 7. Cloudflare ne facture pas le service en fonction de l’ampleur de l’attaque et n’applique aucun plafond au regard de l’ampleur, du type ou de la durée de cette dernière.

Le réseau de Cloudflare est conçu pour détecter et atténuer automatiquement les [attaques DDoS](https://www.cloudflare.com/ddos) importantes. La mise en cache de votre contenu sur Cloudflare protège également votre site web contre les attaques DDoS de moindre envergure, mais les actifs non mis en cache peuvent nécessiter des [opérations manuelles supplémentaires](/ddos-protection/best-practices/respond-to-ddos-attacks/).

Par ailleurs, Cloudflare aide à atténuer les attaques DDoS de moindre ampleur :

-   Pour les zones de toutes les offres, quand le taux d'erreur HTTP est supérieur au niveau de sensibilité par défaut _Élevé_ dont le seuil est de 1 000 erreurs par seconde. Vous pouvez baisser le niveau de sensibilité en [configurant les règles gérées de protection contre les attaques DDoS HTTP](/ddos-protection/managed-rulesets/http).

-   Pour les zones des offres Pro, Business et Entreprise, Cloudflare effectue un examen supplémentaire pour améliorer la précision de la détection : le taux d'erreurs par seconde doit aussi être au moins cinq fois supérieur aux niveaux de trafic normaux du serveur d'origine.

Cloudflare détermine le taux d'erreurs en fonction de toutes les erreurs HTTP dans les plages 52X (erreur de serveur interne) et 53X, sauf pour l'[erreur 530](https://support.cloudflare.com/hc/articles/115003011431#530error).

Les atténuations d’attaques HTTP flood sont affichées sur le tableau de bord Firewall Analytics sous forme d’événements DDoS HTTP.Ces événements sont disponibles dans [Cloudflare Logs](/logs/).

Actuellement, pour les atténuations DDoS basées sur le taux d’erreurs HTTP, les clients ne peuvent pas exclure des codes d'erreur HTTP spécifiques.

Apprenez-en davantage sur les [attaques DDoS célèbres](https://www.cloudflare.com/learning/ddos/famous-ddos-attacks/) et les [attaques DDoS](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) dans le Centre d’apprentissage de Cloudflare. Vous pouvez également parcourir des études de cas d’attaques DDoS en consultant les ressources correspondantes à la fin de cet article.

___

## Ensemble de règles Cloudflare HTTP DDoS Attack Protection Managed Ruleset

Cloudflare HTTP DDoS Attack Protection Managed Ruleset est un ensemble de règles préconfigurées à faire correspondre à des modèles d'attaque connus, des outils d'attaque connus, des modèles suspects, des violations de protocole, des requêtes à l'origine de grandes quantités d'erreurs d'origine, un trafic excessif au niveau de l'origine/du cache, ainsi que des vecteurs d'attaque supplémentaires au niveau de la couche d'application à la périphérie. Cet ensemble de règles est mis à la disposition des clients de Cloudflare quel que soit leur forfait, et il est activé par défaut.

Si vous vous attendez à d'importants pics de trafic légitime, envisagez de personnaliser vos paramètres de protection contre les attaques DDoS afin d'éviter les faux positifs, ces cas où le trafic légitime est identifié à tort comme du trafic d'attaque et donc bloqué ou contesté.

Pour en savoir plus sur Cloudflare HTTP DDoS Attack Protection Managed Ruleset et les paramètres de configuration disponibles, consultez le [portail des développeurs Cloudflare](/ddos-protection/managed-rulesets/http).

Pour obtenir plus d'informations sur les mesures appliquées par les systèmes de protection contre les attaques DDoS HTTP, consultez [Paramètres de protection contre les attaques DDoS HTTP : action](/ddos-protection/managed-rulesets/http/override-parameters#action).

___

## Ensemble de règles Cloudflare Network-layer DDoS Attack Protection Managed

Cloudflare Network-layer DDoS Attack Protection Managed Ruleset est un ensemble de règles préconfigurées à faire correspondre à des vecteurs d'attaque DDoS connus aux couches 3 et 4 du modèle OSI. Cet ensemble de règles est mis à la disposition des clients de Cloudflare quel que soit leur forfait, et il est activé par défaut.

Pour en savoir plus sur Cloudflare Network-layer DDoS Attack Protection Managed Ruleset et les paramètres de configuration disponibles, consultez le [portail des développeurs Cloudflare](/ddos-protection/managed-rulesets/network).

Pour obtenir plus d'informations sur les mesures appliquées par les systèmes de protection contre les attaques DDoS des couches 3/4, consultez [Paramètres de protection contre les attaques DDoS au niveau de la couche réseau : action](/ddos-protection/managed-rulesets/network/override-parameters#action).

___

## Déterminez si vous êtes victime d’une attaque DDoS

Voici quelques indices courants indiquant que vous êtes victime d’une attaque DDoS :

-   Votre site est hors ligne ou ses réponses aux requêtes sont lentes.
-   Vous constatez des hausses dans le graphique représentant les **requêtes envoyées via Cloudflare** ou la **bande passante** dans votre application Cloudflare **Analytics** .
-   Les fichiers journaux de votre serveur web d’origine contiennent des requêtes étranges qui ne reflètent pas le comportement normal des visiteurs.

___

## Est-ce que Cloudflare m’attaque ?

Dans deux scénarios courants, Cloudflare peut sembler attaquer votre site :

-   À moins de [restaurer les adresses IP d’origine des visiteurs](https://support.cloudflare.com/hc/fr-fr/sections/200805497-Restoring-Visitor-IPs), les adresses IP de Cloudflare apparaissent dans les fichiers journaux de votre serveur pour toutes les requêtes traitées en proxy.
-   Le pirate usurpe les adresses IP de Cloudflare. Cloudflare [envoie uniquement du trafic à votre serveur web d’origine sur quelques ports spécifiques](https://support.cloudflare.com/hc/articles/200169156), sauf si vous utilisez [Cloudflare Spectrum](/spectrum/get-started/).

Dans le meilleur des cas, étant donné que Cloudflare est un proxy inverse, votre fournisseur d’hébergement observe le trafic de l’attaque qui se connecte aux [adresses IP de Cloudflare](https://www.cloudflare.com/ips/). En revanche, si vous voyez des connexions provenant d’adresses IP qui n’appartiennent pas à Cloudflare, il s’agit d’une attaque directe contre votre serveur web d’origine. Cloudflare ne peut pas arrêter les attaques visant directement votre adresse IP d’origine car le trafic contourne son réseau.

___

## Ressources associées

-   [Répondre aux attaques DDoS](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [Meilleures pratiques : Mesures de prévention contre les attaques DDoS](https://support.cloudflare.com/hc/articles/200170166)
-   [Utilisation des fichiers journaux de Cloudflare pour enquêter sur le trafic d’une attaque DDoS (Enterprise uniquement)](https://support.cloudflare.com/hc/fr-fr/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [Qu’est-ce qu’une attaque DDoS ?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
-   [Fonctionnement des attaques par amplification DNS](http://blog.cloudflare.com/deep-inside-a-dns-amplification-ddos-attack)

### Études de cas :

-   [How to Launch a 65Gbps DDoS, and How to Stop One](http://blog.cloudflare.com/65gbps-ddos-no-problem)
-   [Ceasefires Don’t End Cyberwars](http://blog.cloudflare.com/ceasefires-dont-end-cyberwars)
-   [Reflections on reflection (attacks)](https://blog.cloudflare.com/reflections-on-reflections/)
-   [Stupidly Simple DDoS Protocol (SSDP) generates 100 Gbps DDoS](https://blog.cloudflare.com/ssdp-100gbps/)
-   [Memcrashed - Major amplification attacks from UDP port 11211](https://blog.cloudflare.com/memcrashed-major-amplification-attacks-from-port-11211/)
-   [The real cause of large DDoS - IP Spoofing](https://blog.cloudflare.com/the-root-cause-of-large-ddos-ip-spoofing/)
