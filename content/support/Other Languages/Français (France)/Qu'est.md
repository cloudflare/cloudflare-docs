---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200168236-Qu-est-ce-que-Cloudflare-IP-G%C3%A9olocalisation-faire-
title: Qu'est
---

# Qu'est-ce que Cloudflare IP Géolocalisation faire? – Centre d'assistance Cloudflare

## Qu'est-ce que Cloudflare IP Géolocalisation faire?

Vous pouvez activer Géolocalisation IP have Cloudflare géolocaliser les visiteurs de votre site Web et de vous transmettre le code du pays dans la norme ISO 3166-1 Alpha 2 format. 

Vous trouverez l'option Géolocalisation IP dans la section « Réseau » du tableau de bord.

L'option pour la géolocalisation IP se trouve près du bas de la page:

![](/images/support/IPGeolocation2.png)

Une fois activé, nous ajouterons alors un en-tête appelé « CF-IPCountry » à toutes les demandes que nous faisons à votre site Web. Voici quelques exemples de la façon d'accéder à / magasin cette valeur:

> $country\_code = $\_SERVER\["HTTP\_CF\_IPCOUNTRY"\]; // pour accéder en PHP
> 
> $country\_code = $ENV{"HTTP\_CF\_IPCOUNTRY"}; # Pour accéder à Perl 

Cloudflare comprend ces informations pour les adresses IPv4 et IPv6. À l'heure actuelle, les informations IPv4 est plus robuste, mais nous nous attendons les données IPv6 pour améliorer rapidement.

 Note: XX means il n'y a pas de données de pays. T1 est un code de pays non standard utilisé pour le réseau Tor.
