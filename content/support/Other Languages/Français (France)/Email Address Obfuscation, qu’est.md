---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/200170016-Email-Address-Obfuscation-qu-est-ce-que-c-est-
title: Email Address Obfuscation, qu’est
---

# Email Address Obfuscation, qu’est-ce que c’est ? – Centre d'assistance Cloudflare

## Email Address Obfuscation, qu’est-ce que c’est ?

_Cloudflare Email Address Obfuscation contribue à la prévention du spam en dissimulant les adresses e-mail présentes sur vos pages aux logiciels de collecte d’adresses e-mail et autres bots, tout en veillant à ce qu’elles restent visibles par les visiteurs de votre site._

___

## Aperçu

Les logiciels de collecte d’adresses e-mail et d’autres bots parcourent Internet à la recherche d’adresses e-mail à ajouter à leurs listes de spam. Cette tendance augmente considérablement le volume d’e-mails indésirables.

Pour se protéger, les administrateurs web ont trouvé des solutions astucieuses, telles que la décomposition des adresses e-mail (par exemple, aide \[arobace\] cloudflare \[point\] com) ou l’utilisation d’images contenant les adresses e-mail. Cependant, ils perdent alors la possibilité d’envoyer automatiquement un e-mail en cliquant sur une adresse e-mail. Lorsque vous activez Email Address Obfuscation de Cloudflare, les adresses e-mail sur votre page web sont dissimulées aux bots, mais restent visibles pour les visiteurs humains. Les visiteurs de votre site web ne verront aucun changement.

Pour qu’Email Address Obfuscation fonctionne dans Cloudflare, une page doit avoir un type MIME (Content-Type) « text/html » ou « application/xhtml+xml ».

___

Cloudflare active automatiquement la fonction de masquage des adresses e-mail au moment de votre inscription.

Pour vérifier Email Address Obfuscation dans le tableau de bord Cloudflare :

1.  Connectez-vous au tableau de bord Cloudflare.
2.  Assurez-vous que le site web que vous souhaitez vérifier est sélectionné.
3.  Cliquez sur l’application **Scrape Shield**.
4.  Sous **Email Address Obfuscation**, vérifiez que la fonctionnalité est configurée sur _On_.

Vous pouvez également récupérer le code source de la page depuis un client HTTP tel que cURL, une bibliothèque HTTP ou l’option « Afficher la source » de votre navigateur. Vérifiez ensuite le code source HTML pour confirmer que l’adresse e-mail n’est plus présente.

___

## Résolution des problèmes liés à Email Address Obfuscation

Pour prévenir les comportements de site Internet inhabituels, les adresses e-mail ne sont pas masquées lorsqu’elles apparaissent dans :

-   Un attribut de balise HTML, à l’exception de l’attribut _href_ de la balise _a_.
-   Autres balises HTML :
    -   Balises _script_ : <script></script>
    -   Balises _noscript_ : <noscript></noscript>
    -   Balises _textarea_ : <textarea></textarea>
    -   Balises _xmp_ : <xmp></xmp>
    -   Balises _head_ : <head></head>
-   Toute page n’ayant pas un type MIME « text/html » ou « application/xhtml+xml »

**Veuillez noter** que l'obscurcissement de l'adresse e-mail **ne sera pas effective** si vous utilisez l'en-tête `Cache-Control: no-transform`.

___

## Empêcher la dissimulation des adresses e-mail par Cloudflare

Pour empêcher Cloudflare de dissimuler les adresses e-mail, vous pouvez :

-   Ajouter le commentaire suivant dans le code HTML de la page :  `<!--email_off-->``_insérez les adresses e-mail ici_``<!--/email_off-->`

-   Renvoyer les adresses e-mail au format JSON pour les appels AJAX, afin de vous assurer que votre serveur web renvoie le type de contenu « application/json ».

-   Désactivez la fonctionnalité de masquage de l'adresse e-mail, « Email Obfuscation », à l'aide d'une Page Rule à appliquer à un point de terminaison spécifique pour votre zone, en suivant notre tutoriel sur Page Rules ici : [Comprendre et configurer Page Rules (tutoriel Page Rules)](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ)
