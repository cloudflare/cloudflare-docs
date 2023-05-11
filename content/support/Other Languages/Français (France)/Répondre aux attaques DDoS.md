---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200170196--R%C3%A9pondre-aux-attaques-DDoS
title: Répondre aux attaques DDoS
---

# Répondre aux attaques DDoS

## Répondre aux attaques DDoS

_Protégez votre site web contre les [attaques par déni de service distribué (DDoS)](https://www.cloudflare.com/ddos). Apprenez les contre-mesures de base pour arrêter une attaque en cours._

### Dans cet article

-   [Présentation](https://support.cloudflare.com/hc/fr-fr/articles/200170196--R%C3%A9pondre-aux-attaques-DDoS#h_49125146-d910-42ad-a0d8-3d08a4eae681)
-   [Étape 1 : Activez le mode **I’m Under Attack**](https://support.cloudflare.com/hc/fr-fr/articles/200170196--R%C3%A9pondre-aux-attaques-DDoS#h_dfff923a-5879-4750-a747-ed7b639b6e19)
-   [Étape 2 : Activez le **Pare-feu applicatif web** (WAF)](https://support.cloudflare.com/hc/fr-fr/articles/200170196--R%C3%A9pondre-aux-attaques-DDoS#h_b97416a5-5196-4f12-acb6-f81bbfcfa95f)
-   [Étape 3 : Testez ou bloquez le trafic via une application **pare-feu**](https://support.cloudflare.com/hc/fr-fr/articles/200170196--R%C3%A9pondre-aux-attaques-DDoS#h_a2c9a5ce-d652-46db-9e82-bc3f06835348) 
-   [Étape 4 : Contactez le support Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/200170196--R%C3%A9pondre-aux-attaques-DDoS#h_995ffed3-18a9-4f8c-833c-81236061b1e8)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/200170196--R%C3%A9pondre-aux-attaques-DDoS#h_034beb4b-231e-40d8-b938-5c1b446e26a6)

___

## Présentation

Le réseau de Cloudflare atténue automatiquement les [attaques DDoS](https://www.cloudflare.com/ddos) de grande ampleur. La mise en cache de votre contenu sur Cloudflare protège également votre site web contre les attaques DDoS de moindre envergure, mais les actifs non mis en cache peuvent nécessiter des opérations manuelles supplémentaires décrites dans ce guide.

___

## Étape 1 : Activez le mode **I’m Under Attack**

Pour activer le mode **[Under Attack](https://support.cloudflare.com/hc/articles/200170076)** :

1.  Connectez-vous à votre compte Cloudflare.
2.  Sélectionnez le domaine qui fait actuellement l'objet d'une attaque.
3.  Activez le mode **Under Attack** (_On_) dans la section **Quick Actions**(Actions rapides) de l’application**Overview** de Cloudflare.
4.  \[Facultatif\] Réglez **[Challenge Passage](https://support.cloudflare.com/hc/articles/200170136)** (Durée de la vérification) dans l’onglet **Settings**(Paramètres) de l’application **Firewall**.

___

## Étape 2 : Activez le **Web Application Firewall** (WAF)

Activez le Cloudflare [WAF](https://support.cloudflare.com/hc/en-us/articles/200172016-What-does-the-Web-Application-Firewall-WAF-do-) en suivant cette procédure :

1.  Connectez-vous à votre compte Cloudflare.
2.  Sélectionnez le domaine qui requiert une protection supplémentaire.
3.  Basculez **Web Application Firewall** sur _On_ dans l’onglet **Managed Rules** de l’application **Firewall**.

___

## Étape 3 : Testez ou bloquez le trafic à l’aide de l’application**Firewall**

L’application**Firewall** de Cloudflare facilite le blocage du trafic en ayant recours aux méthodes suivantes :

**[IP Access Rules](/waf/tools/ip-access-rules/)(Règles d’accès aux adresses IP)** \- Recommandé pour bloquer plusieurs adresses IP, les plages IP /16 ou /24 ou les Autonomous System Numbers (ASN). 
**[Firewall Rules](/firewall/cf-dashboard/create-edit-delete-rules/) (Règles de pare-feu)**\- Recommandé pour bloquer un pays, une plage IP valide ou des modèles d'attaque plus complexes.
**[Zone Lockdown](/waf/tools/zone-lockdown/) (Verrouillage de zone)**\- Recommandé pour n'autoriser que des adresses IP ou des plages d'adresses IP de confiance sur une partie de votre site.
**[User Agent Blocking](/waf/tools/user-agent-blocking/)(Blocage d’agents utilisateurs)** \- Recommandé pour bloquer les [en-têtes d'agents-utilisateurs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) suspects sur l'ensemble de votre domaine.

Pour décider des pays ou adresses IP à bloquer ou à tester, vérifiez vos fichiers journaux. Contactez votre fournisseur d’hébergement pour vous aider à identifier :

-   le trafic d'attaque parvenant à votre serveur web d'origine,
-   les ressources auxquelles l'attaque a accès, et
-   les caractéristiques communes de l'attaque (adresses IP, agents utilisateurs, pays ou ASN, etc.).

___

## Étape 4 : Contactez le support Cloudflare

Si vous ne parvenez pas à empêcher une attaque de saturer votre serveur web d'origine en suivant les étapes ci-dessus, [contactez le support Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730).

___

## Ressources associées

-   [Comprendre la protection Cloudflare contre les attaques DDoS](https://support.cloudflare.com/hc/articles/200172676)
-   [Nonnes pratiques : Mesures préventives contre les attaques DDoS](https://support.cloudflare.com/hc/articles/200170166)
-   [Que fait le mode « I’m Under Attack » ?](https://support.cloudflare.com/entries/22053133)
-   [Utiliser les journaux de Cloudflare pour enquêter sur le trafic DDoS (Enterprise uniquement)](https://support.cloudflare.com/hc/en-us/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [Comment signaler une attaque DDoS aux forces de l’ordre](https://www.icann.org/news/blog/how-to-report-a-ddos-attack)
