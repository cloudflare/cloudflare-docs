---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/205043158-Conformit%C3%A9-PCI-et-Cloudflare-SSL-TLS
title: Conformité PCI et Cloudflare SSLTLS
---

# Conformité PCI et Cloudflare SSL/TLS

## Conformité PCI et Cloudflare SSL/TLS

_Apprenez à configurer Cloudflare pour répondre aux exigences de l’analyse PCI et découvrez les mesures d’atténuation mises en place par Cloudflare pour les versions antérieures de TLS/SSL._

___

## Vue d'ensemble

TLS 1.0 et TLS 1.1 ne suffisent pas à protéger les informations, en raison de vulnérabilités connues. Pour les clients Cloudflare, plus particulièrement, le principal impact de PCI est que TLS 1.0 et TLS 1.1 sont insuffisants pour sécuriser le trafic lié aux cartes de paiement.

Les normes PCI préconisent l’utilisation de TLS 1.2 ou une version plus récente.

Vous pouvez également consulter les [mesures d’atténuation mises en œuvre par Cloudflare contre les vulnérabilités](https://support.cloudflare.com/hc/en-us/articles/205043158#h_1TWWDdoBc31LFYj9kVNwlu) de TLS 1.0 et TLS 1.1.

___

## Définissez la version minimale de TLS sur TLS 1.2

Pour configurer votre domaine Cloudflare afin qu’il autorise uniquement les connexions utilisant TLS 1.2 ou des protocoles plus récents :

1\. Connectez-vous au tableau de bord Cloudflare.

2\. Cliquez sur le compte et l'application Cloudflare concernés.

4\. Ouvrez **SSL/TLS** > **Edge Certificates** (Certificats Edge).

5\. Pour **Minimum TLS Version** (Version minimale de TLS), sélectionnez **TLS 1.2** ou une version plus récente.

___

## Mesures d’atténuation de Cloudflare contre les vulnérabilités connues de TLS

Cloudflare applique différentes mesures de protection contre les vulnérabilités connues des versions de TLS antérieures à TLS 1.2. Par exemple, Cloudflare ne prend pas en charge les fonctionnalités suivantes :

1.  Compression d’en-tête dans TLS
2.  Compression d’en-tête dans SPDY 3.1
3.  RC4
4.  SSL 3.0
5.  Renégociation avec les clients
6.  Suites cryptographiques DHE
7.  Caractères de chiffrement pour l’exportation

Les mesures d’atténuation de Cloudflare offrent une protection contre plusieurs attaques :

-   CRIME
-   BREACH
-   POODLE
-   Faiblesses cryptographiques de RC4
-   Attaques par renégociation SSL
-   Attaques par déclassement de protocole
-   FREAK
-   LogJam
-   3DES est entièrement désactivé pour TLS 1.1 et TLS 1.2, et Cloudflare implémente des mesures d’atténuation pour TLS 1.0.

Cloudflare fournit des mesures d’atténuation supplémentaires pour les attaques suivantes :

-   Heartbleed
-   Lucky Thirteen
-   Vulnérabilité d’injection CCS

Cloudflare a appliqué des correctifs à tous les serveurs pour contrer ces vulnérabilités. En outre, des règles gérées du pare-feu WAF permettent d’atténuer plusieurs de ces vulnérabilités, notamment Heartbleed et ShellShock.

### ROBOT (Return Of Bleichenbacher’s Oracle Threat)

Les analyses de sécurité identifiant la présence de ROBOT sur Cloudflare sont un faux positif. Cloudflare vérifie le remplissage en temps réel et bascule vers une clé de session aléatoire si le remplissage est incorrect.

### Sweet32 (CVE-2016-2183)

Le protocole TLS (Transport Layer Security) est une vulnérabilité de l'algorithme de chiffrement Triple DES (3DES). Sweet32 n'est pour le moment qu'une attaque spéculative, aucun cas réel n'a été signalé à ce jour. Cloudflare a atténué manuellement la vulnérabilité du TLS 1.0 de la manière suivante :

-   Les auteurs d’attaques doivent collecter 32 Go de données depuis une session TLS unique
-   Cloudflare force les nouvelles clés de session TLS 1.0 sur le chiffrement 3DES affecté bien avant que 32 Go de données ne soient collectés
