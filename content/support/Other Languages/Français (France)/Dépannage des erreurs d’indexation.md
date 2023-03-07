---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200169806-D%C3%A9pannage-des-erreurs-d-indexation
title: Dépannage des erreurs d’indexation
---

# Dépannage des erreurs d’indexation

## Dépannage des erreurs d’indexation

_Découvrez comment Cloudflare interagit avec les robots d’indexation des moteurs de recherche (en particulier Google) et comment dépanner les erreurs d'indexation._

### Dans cet article

-   [Présentation](https://support.cloudflare.com/hc/fr-fr/articles/200169806-D%C3%A9pannage-des-erreurs-d-indexation#h_2a34f441-b447-44ea-a005-b3690e7a10bb)
-   [Réglez les fréquences d'indexation de Google et Bing](https://support.cloudflare.com/hc/fr-fr/articles/200169806-D%C3%A9pannage-des-erreurs-d-indexation#h_788dc59a-6fcd-4fb0-95fe-83c8e6a169ff)
-   [Empêchez les erreurs d'indexation](https://support.cloudflare.com/hc/fr-fr/articles/200169806-D%C3%A9pannage-des-erreurs-d-indexation#h_0038b632-a9b0-4ffd-a621-6770f6a17f00)
-   [Dépannez les erreurs d'indexation](https://support.cloudflare.com/hc/fr-fr/articles/200169806-D%C3%A9pannage-des-erreurs-d-indexation#h_3d7e8b91-2e5b-4c12-9ed4-8cc25be07790)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/200169806-D%C3%A9pannage-des-erreurs-d-indexation#h_dc04971f-7f25-41ec-9b1d-33096cad773f)

___

## Présentation

Cloudflare a mis en place des listes blanches des robots d'indexation et des bots des moteurs de recherche. Si vous constatez des problèmes d'indexation ou des tests Cloudflare présentés au robot d'indexation ou au bot d'un moteur de recherche, [contactez le support Cloudflare](https://support.cloudflare.com/hc/articles/200172476) en fournissant les informations recueillies lors du dépannage des erreurs d'indexation par le biais des méthodes exposées dans ce guide.

___

## Réglez les fréquences d'indexation de Google et Bing

Pour optimiser les performances CDN, Google et Bing attribuent des fréquences d'indexation spéciales aux sites web qui utilisent les services CDN dans l'ordre. Les fréquences d'indexation spéciales n'affectent pas négativement l'optimisation pour les moteurs de recherche (SEO) et les pages de résultats des moteurs de recherche (SERP). Pour modifier vos fréquences d'indexation pour Bing et Google, procédez comme indiqué dans les guides ci-dessous :

-   [Consultez la documentation de Google](https://support.google.com/webmasters/answer/48620?hl=en) pour savoir comment modifier la fréquence d'indexation de Google.
-   Consultez la documentation de Bing pour savoir comment modifier la fréquence d'indexation de Bing.

-   [Contrôle d’indexation de Bing](https://www.bing.com/webmaster/help/crawl-control-55a30302)
-   [Retard d’indexation et le robot d’indexation de Bing](https://blogs.bing.com/webmaster/2009/08/10/crawl-delay-and-the-bing-crawler-msnbot)

___

## Éviter les erreurs d'indexation

Lisez les recommandations suivantes pour éviter les erreurs liées aux robots d'indexation :

-   Surveillez la performance et la disponibilité de votre site web à l'aide d'un outil tiers :
    -   [StatusCake](http://www.statuscake.com/)
    -   [Pingdom](http://www.pingdom.com/)
    -   [Monitor.Us](http://www.monitor.us/)
    -   [Updown](http://beta.updown.io/)

-   Ne bloquez pas les adresses IP des robots d'indexation Google via **Firewall Rules** ou **IP Access Rules** dans l’application **Firewall** de Cloudflare.

-   Ne bloquez pas les États-Unis via **Firewall Rules** ou **IP Access Rules** dans l’application **Firewall** de Cloudflare.
-   Ne bloquez pas les agents Utilisateur de [Google](https://support.google.com/webmasters/answer/1061943) ou de [Bing](https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0) dans votre fichier .htaccess, votre configuration de serveur, votre fichier [robots.txt](http://support.google.com/webmasters/bin/answer.py?answer=35303) ou votre application web.

-   N’autorisez pas l’indexation des fichiers du répertoire /cdn-cgi/. Ce chemin est utilisé en interne par Cloudflare et Google rencontrera des problèmes lors de son indexation. Empêchez l’indexation de cdn-cgi via robots.txt :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Empêcher : /cdn-cgi/</span></div></span></span></span></code></pre>{{</raw>}}

-   Vérifiez que votre [fichier robots.txt autorise le robot d'indexation AdSense](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=1061943).
-   [Restaurez les adresses IP d’origine des visiteurs](https://support.cloudflare.com/hc/articles/200170916) dans vos journaux de serveur.

___

## Dépannez les erreurs d'indexation

Les étapes pour le dépannage des erreurs d’indexation les plus courantes sont répertoriées ci-dessous :

### Erreurs HTTP 4XX

[Les erreurs HTTP 4XX](https://support.cloudflare.com/hc/articles/115003014512)sont les erreurs d’indexation les plus courantes. Cloudflare délivre ces erreurs à Google à partir de votre serveur web. Ces erreurs peuvent être causées par diverses raisons telles qu’une page manquante sur votre serveur web ou par un lien incorrectement formé dans votre HTML. La solution dépendra du problème rencontré.

### Erreurs HTTP 5XX

[Les erreurs HTTP 5XX](https://support.cloudflare.com/hc/articles/115003011431) indiquent que Cloudflare ou votre serveur web a rencontré une erreur interne. Pour établir une corrélation entre les erreurs d'indexation et les pannes du site, surveillez l'état de santé de votre serveur web d'origine. En surveillant l’état de santé de votre site web à la fois par le biais de Cloudflare et directement au niveau des adresses IP de votre serveur web d'origine, il est possible de déterminer si les erreurs sont dues à Cloudflare ou à votre serveur web d'origine.

### Erreurs de DNS

Les étapes de dépannage varient selon que votre domaine est sur Cloudflare via une configuration Full ou CNAME. Pour vérifier la configuration utilisée par votre domaine, ouvrez un terminal et exécutez la commande suivante (en remplaçant _www.exemple.com_ par votre nom de domaine Cloudflare) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short SOA www.exemple.com</span></div></span></span></span></code></pre>{{</raw>}}
