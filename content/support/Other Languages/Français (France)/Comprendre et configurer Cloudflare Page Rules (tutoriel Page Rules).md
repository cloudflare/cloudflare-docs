---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-
title: Comprendre et configurer Cloudflare Page Rules (tutoriel Page Rules)
---

# Comprendre et configurer Cloudflare Page Rules (tutoriel Page Rules)

_Les règles Page Rules déclenchent certaines actions lorsqu’une requête correspond à l’un des modèles d’URL que vous définissez. Découvrez comment créer et modifier des règles Page Rules et comprenez les différents paramètres disponibles._

### Dans cet article

-   [Aperçu](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-#h_5a7SkOsNo5d5LE7e9IRiz)
-   [Avant de commencer](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-#h_7rzfw5kI8cqu4VKur6Mnur)
-   [Créer une règle Page Rules](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-#h_38Gq7mduJiXIjpVLxp3q19)
-   [Modifier une règle Page Rules](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-#h_2WLkFHGqwlRgnZg3i0fl9I)
-   [Comprendre les correspondances et le référencement avec des caractères génériques](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-#h_6N5SySNYCjYUUnCKnC1Ea6)
-   [Résumé des paramètres Page Rules](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-#h_18YTlvNlZET4Poljeih3TJ)
-   [Problèmes connus](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-#h_5lzcszkjqrZ2bZpZOtMQoP)
-   [Informations complémentaires](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-#h_2VORFoOUImLy7rpTgEWYLM)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Comprendre-et-configurer-Cloudflare-Page-Rules-tutoriel-Page-Rules-#h_7hlLS0cORjDJ2NCQqZTp8X)

___

## Aperçu

Vous pouvez définir une règle Page Rules pour déclencher une ou plusieurs actions chaque fois qu’un certain modèle d’URL est détecté. Les règles Page Rules sont disponibles dans l’application **Rules**, sur l’onglet **Page Rules**.

Le nombre de règles Page Rules autorisées par défaut dépend de l’offre souscrite pour le domaine, comme indiqué ci-dessous.

| **Offre** | **Règles Page Rules** |
| --- | --- |
| 
Free

 | 

3

 |
| 

Pro

 | 

20

 |
| 

Business

 | 

50

 |
| 

Enterprise

 | 

125

 |

Vous pouvez [acheter des règles supplémentaires](https://www.cloudflare.com/features-page-rules/) (jusqu’à 100) pour les domaines possédant des offres Free, Pro et Business.

___

## Avant de commencer

Deux principes fondamentaux des règles Page Rules sont particulièrement importants :

-   Seule la règle Page Rule dont la priorité est la plus élevée est appliquée à une requête.
-   Les règles Page Rules sont classées par ordre de priorité décroissante dans le tableau de bord Cloudflare, la règle ayant la priorité la plus élevée se trouvant en haut.

Une règle Page Rule correspond à un modèle d’URL selon le format suivant (composé de quatre segments) : <scheme>://<hostname><:port>/<path>?<query\_string>

Voici un exemple d'URL comportant ces quatre composants :


```
https://www.exemple.com:443/image.png?parameter1=value1
```

Les segments _scheme_ et _port_ sont facultatifs. S’il n’est pas spécifié, _scheme_ correspond aux protocoles  _http://_ et _https://_. Si _port_ n’est pas spécifié, la règle s’applique à tous les ports.

Enfin, vous pouvez désactiver une règle Page Rules à tout moment. Lorsqu’une règle est désactivée, les actions ne se déclenchent pas, mais la règle apparaît toujours dans l’application **Rules**  sur l’onglet **Page Rules** ; elle est modifiable et prise en compte dans le nombre de règles autorisées pour votre domaine. L’option _Save as Draft_ (Enregistrer comme brouillon) crée une règle Page Rules désactivée par défaut.

___

## Créer une règle Page Rules

Voici les étapes à suivre pour créer une règle Page Rules :

1.  Connectez-vous au tableau de bord Cloudflare.
2.  Sélectionnez le domaine pour lequel vous souhaitez ajouter la règle Page Rules.
3.  Cliquez sur l’application **Rules**.
4.  Sur l’onglet **Page Rules** **,** cliquez sur  **Create Page Rule** (Créer une règle Page Rule). La boîte de dialogue _Create Page Rule for <votre domaine>_ (Créer une règle Page Rules pour) s’affiche.
5.  Sous **If the URL matches** (Si l’URL correspond à), saisissez l’URL ou le modèle d’URL devant correspondre à la règle. [_En savoir plus sur la correspondance avec les caractères génériques_](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_6N5SySNYCjYUUnCKnC1Ea6)
6.  Ensuite, sous **Then the settings are:** (Les paramètres sont alors les suivants :), cliquez sur **\+ Add a setting** (+ Ajouter un paramètre), puis sélectionnez le paramètre souhaité dans la liste déroulante. Vous pouvez spécifier plusieurs paramètres par règle. Pour en savoir plus sur les paramètres, reportez-vous au [récapitulatif ci-dessous](https://support.cloudflare.com/hc/fr-fr/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ).
7.  Indiquez l’ordre souhaité dans la liste déroulant **Order** (Ordre) : _First, Last_ (Premier, Dernier) ou _Custom_ (Personnalisé).
8.  Pour enregistrer, cliquez sur l’une des options suivantes :
    -   **Save as Draft** (Enregistrer comme brouillon) pour enregistrer la règle et la laisser désactivée.
    -   **Save and Deploy** (Enregistrer et activer) pour enregistrer la règle et l’activer immédiatement.

___

## Modifier une règle Page Rules

Pour modifier une règle existante :

1.  Connectez-vous au tableau de bord Cloudflare.
2.  Sélectionnez le domaine pour lequel vous souhaitez modifier une règle Page Rules.
3.  Cliquez sur l’application **Rules**.
4.  Sur l’onglet **Page Rules**, trouvez la règle que vous souhaitez modifier.
5.  Effectuez les modifications nécessaires comme suit :
    -   Pour activer ou désactiver une règle, cliquez sur le commutateur **On/Off**.
    -   Pour modifier le modèle d’URL, les paramètres et l’ordre, cliquez sur le bouton **Modifier** (icône clé anglaise). Dans la boîte de dialogue, indiquez les informations que vous souhaitez modifier.
    -   Pour supprimer une règle, cliquez sur le bouton **Supprimer** (icône x), puis confirmez en cliquant sur **OK** dans la boîte de dialogue **Confirmer**.

___

## Comprendre les correspondances et le référencement avec des caractères génériques

Vous pouvez utiliser l’astérisque (\*) dans n’importe quel segment d’URL pour établir une correspondance avec certaines structures. Par exemple :


```
exemple.com/t*st
```

Correspond à :


```
exemple.com/test
exemple.com/toast
exemple.com/trust
```

_exemple.com/foo/\*_ ne correspond pas à exemple.com/foo.  Toutefois, _exemple.com/foo\*_ correspond à la chaîne saisie.

### Conseils utiles

-   Pour détecter à la fois des URL _http_ et _https_, écrivez simplement _exemple.com_. Vous n'avez pas besoin d'écrire _\*.exemple.com_.
-   Pour établir une correspondance avec chaque page d’un domaine, saisissez _exemple.com/\*_. Simplement saisir _exemple.com_ ne suffit pas.
-   Pour rendre en compte chaque page d'un domaine, écrivez \*_exemple.com/\*_. Il ne suffit pas d'écrire simplement_exemple.com_.
-   Un caractère générique (\*) dans l'URL d'une règle page Rule donnera un résultat même si aucun caractère n'est présent, et peut inclure n'importe quelle partie de l'URL, y compris la chaîne de requêtes.

### Référencement des correspondances avec des caractères génériques

Vous pouvez référencer les correspondances avec des caractères génériques ultérieurement, avec la syntaxe _$X_._X_ indique l’index d’un motif glob. Ainsi, $1 représente le premier caractère générique, $2 le deuxième caractère générique et ainsi de suite.

Cela est particulièrement utile avec le paramètre _Forwarding URL_ (URL de redirection). Par exemple :

Vous pouvez rediriger :


```
http://*.exemple.com/*
```

Vers :


```
http://exemple.com/images/$1/$2.jpg
```

Cette règle correspondrait à :


```
http://cloud.exemple.com/flare.jpg
```

qui serait ensuite redirigé vers :


```
http://exemple.com/images/cloud/flare.jpg
```

Pour utiliser un caractère littéral _$_ dans l’URL de redirection, annulez sa valeur spéciale en ajoutant une barre oblique inversée (\\) devant : _\\$_.

___

## Résumé des paramètres Page Rules

Les paramètres contrôlent le comportement de Cloudflare lorsqu’une requête correspond au modèle d’URL défini dans une règle Page Rules. Vous pouvez utiliser des paramètres pour activer et désactiver plusieurs fonctions Cloudflare dans différentes applications du tableau de bord. Notez que :

-   Certains paramètres nécessitent que votre domaine comporte une offre Pro, Business ou Enterprise.
-   Vous pouvez définir plusieurs paramètres à appliquer en cas de déclenchement de la règle.

Vous trouverez ci-dessous la liste complète des paramètres disponibles, présentés dans l’ordre dans lequel ils apparaissent dans l’interface **Cloudflare Page Rules**.

| 
**Paramètres**

 | 

**Description**

 | 

**Offres**

 |
| --- | --- | --- |
| 

Always Use HTTPS

 | 

Activez ou désactivez la fonction **[Toujours utiliser HTTPS](/ssl/edge-certificates/additional-options/always-use-https)** de l'onglet **Certificats Edge** dans l'application **Cloudflare SSL/TLS**. Si cette option est activée, toute URL _http://_ est convertie en _https://_ via une redirection 301.

Si cette option n’apparaît pas, cela signifie qu’aucun certificat **Edge Certificate** n’est actif.

 | 

-   Toutes

 |
| 

Auto Minify

 | 

(Auto-réduction) Indiquez quelles extensions de fichiers doivent être automatiquement réduites. [En savoir plus](https://support.cloudflare.com/hc/articles/200168196).

 | 

-   Toutes

 |
| 

Automatic HTTPS Rewrites

 | 

(Réécriture HTTPS automatique) Activez ou désactivez la fonction **Cloudflare Automatic HTTPS Rewrites** (Réécriture HTTPS automatique de Cloudflare) sur l’onglet **Edge Certificates** (Certificats Edge) dans l’application **Cloudflare SSL/TLS**.[En savoir plus](/ssl/edge-certificates/additional-options/automatic-https-rewrites).

 | 

-   Toutes

 |
| 

Browser Cache TTL

 | 

(Durée de vie du cache du navigateur) Contrôlez la durée de validité des ressources mises en cache par les navigateurs clients.L’interface utilisateur et l’API Cloudflare interdisent tous les deux de définir **Browser Cache TTL** sur une valeur de _0_ pour les domaines non couverts par une offre Enterprise.[En savoir plus](/cache/how-to/edge-browser-cache-ttl/).

 | 

-   Toutes

 |
| 

Browser Integrity Check

 | 

(Vérification de l’intégrité du navigateur) Vérifiez la présence, dans les navigateurs de visiteurs, d’en-têtes fréquemment associés aux spammeurs et à certains bots. [En savoir plus](https://support.cloudflare.com/hc/articles/200170086).

 | 

-   Toutes

 |
| 

Bypass Cache on Cookie

 | 

(Ignorer le cache en présence d’un cookie) Ignorez le cache et récupérez les ressources du serveur d’origine si une expression régulière correspond à un nom de cookie présent dans la requête.

Si vous ajoutez à la fois ce paramètre et le paramètre _Cache On Cookie_ à la même Page Rule, l'option _Cache On Cookie_ prend le pas sur l'option _Bypass Cache on Cookie_.

_Consultez la rubrique Compléments d’information ci-dessous pour en savoir plus sur la prise en charge limitée des expressions régulières._

 | 

-   Business
-   Enterprise

 |
| 

Cache By Device Type

 | 

(Mise en cache par type d’appareil) Séparer le contenu mis en cache en fonction du type d’appareil du visiteur. [En savoir plus.](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only)

 | 

-   Enterprise

 |
| 

Cache Deception Armor

 | 

(Protection contre les attaques Cache Deception) Protégez-vous contre les attaques Web Cache Deception tout en permettant la mise en cache de ressources statiques. Ce paramètre confirme que l’extension de l’URL correspond à la balise  _Content-Type_ renvoyée. [En savoir plus.](/cache/cache-security/cache-deception-armor/)

 | 

-   Toutes

 |
| 

Cache Key

 | 

(Clé de cache) Elle est également appelée _Custom Cache Key_.

Contrôlez précisément les variables à prendre en compte lorsque vous décidez des ressources à mettre en cache. Cela permet aux clients de déterminer quelles ressources doivent être mises en cache en fonction de données autres que l’URL. [En savoir plus](/cache/how-to/cache-keys/).

 | 

-   Enterprise

 |
| 

Cache Level

 | 

(Niveau de cache) Appliquez une mise en cache personnalisée en fonction de l’option sélectionnée :

**Bypass** (Ignorer) - Cloudflare n’effectue pas de mise en cache.

**No Query String** (Pas de chaîne de requête) - Diffuse les ressources de la mémoire cache en l’absence de chaîne de requête.

**Ignore Query String** (Ignorer la chaîne) - Diffuse la même ressource à tous les utilisateurs, indépendamment de la chaîne de requête.

**Standard** - Met en cache tout contenu statique comportant une chaîne de requête.

**Cache Everything** (Tout mettre en cache) - Considère tous les contenus comme statiques et met en cache tous les types de fichiers au-delà du [contenu mis en cache par défaut par Cloudflare](/cache/concepts/default-cache-behavior#default-cached-file-extensions).  Respecte les en-têtes de cache du serveur web d’origine, sauf si **Edge Cache TTL** est également défini dans la règle Page Rule. Associée à une valeur **Edge Cache TTL** > _0_, **Cache Everything** supprime les cookies de la réponse du serveur web d’origine.   


 | 

-   Toutes

 |
| 

Cache on Cookie

 | 

(Mise en cache en présence d’un cookie) Appliquez l’option _Cache Everything_ (Tout mettre en cache) du paramètre _Cache Level_ (Niveau de cache) sur la base d’une correspondance entre une expression régulière et un nom de cookie.

Si vous ajoutez à la fois ce paramètre et _Bypass Cache on Cookie_ (Ignorer le cache en présence d’un cookie) à la même règle Page Rules, _Cache On Cookie_ (Mise en cache en présence d’un cookie) est prioritaire sur _Bypass Cache on Cookie_.

 | 

-   Business
-   Enterprise

 |
| 

TTL du cache par code de statut

 | 

Les clients Enterprise peuvent définir le délai TTL (Time To Live) du cache en fonction du statut de réponse du serveur Web d'origine. Le TTL du cache est le délai avant qu'une ressource du réseau Cloudflare soit marquée comme obsolète ou soit rejetée du cache. Des codes de statut sont renvoyés par le serveur d'origine d'une ressource.   Un TTL du cache défini en fonction du statut de réponse prévaut sur le comportement par défaut du cache (mise en cache standard) pour les fichiers statiques, et sur les instructions du cache envoyées par le serveur Web d'origine. Pour mettre en cache des ressources non statiques, définissez le niveau de cache sur Tout mettre en cache à l'aide d'une Page Rule. Si vous définissez le contrôle de cache Cache-Control sur no-store ou sur un TTL court (à l'aide de max-age/s-maxage), les requêtes vers les serveurs Web d'origine sont plus nombreuses et les performances réduites.[En savoir plus](https://support.cloudflare.com/hc/fr-fr/articles/360043842472-Configuring-cache-TTL-by-status-code).

 | 

-   Enterprise

 |
| 

Disable Apps

 | 

(Désactiver les applications) Désactive toutes les **applications Cloudflare** actives.

 | 

-   Toutes

 |
| 

Disable Performance

 | 

Désactive :

-   [Auto Minify](https://support.cloudflare.com/hc/articles/200168196)
-   [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056)
-   [Mirage](https://support.cloudflare.com/hc/articles/200403554)
-   [Polish](https://support.cloudflare.com/hc/articles/360000607372)

 | 

-   Toutes

 |
| 

Disable Railgun

 | 

Désactive la fonction **Railgun** de l’application Cloudflare **Speed**.

 | 

-   Business
-   Enterprise

 |
| 

Disable Security

 | 

Désactive :

-   [Email Obfuscation](https://support.cloudflare.com/hc/articles/200170016)
-   [Limitation de débit (version précédente)](https://support.cloudflare.com/hc/articles/115001635128)
-   [Scrape Shield](https://support.cloudflare.com/hc/articles/200171036)
-   [Server Side Excludes](https://support.cloudflare.com/hc/articles/200170036)
-   [URL (Zone) Lockdown](/waf/tools/zone-lockdown/)
-   [Règles gérées du pare-feu WAF (version précédente)](https://support.cloudflare.com/hc/articles/200172016)

 | 

-   Toutes

 |
| 

Edge Cache TTL

 | 

Indiquez la durée de mise en cache d’une ressource sur le réseau périphérique de Cloudflare. _Edge Cache TTL_ n'est pas visible dans les en-têtes de réponse.  L'_Edge Cache TTL_ minimal dépend du type d'offre souscrite :

Free - 2 heures  
Pro - 1 heure  
Business - 1 seconde  
Enterprise - 1 seconde

 | 

-   Toutes

 |
| 

Email Obfuscation

 | 

Activez ou désactivez la fonction **Cloudflare Email Obfuscation** dans l’application **Cloudflare Scrape Shield**.[En savoir plus.](https://support.cloudflare.com/hc/articles/200170016)

 | 

-   Toutes

 |
| 

Forwarding URL

 | 

(URL de redirection) Redirige une URL vers une autre avec une redirection _HTTP 301/302_._Reportez-vous à la section  [Comprendre les correspondances et le référencement avec des caractères génériques](https://support.cloudflare.com/hc/articles/218411427#h_6N5SySNYCjYUUnCKnC1Ea6), ci-dessus._

 | 

-   Toutes

 |
| 

Host Header Override

 | 

(Ignorer l’en-tête de l’hôte) Applique un en-tête d’hôte spécifique. [En savoir plus](https://support.cloudflare.com/hc/articles/206652947).

 | 

-   Enterprise

 |
| 

IP Geolocation Header

 | 

(En-tête de géolocalisation d’adresse IP) Cloudflare ajoute un en-tête HTTP _CF-IPCountry_ contenant le code pays correspondant au visiteur.

 | 

-   Toutes

 |
| 

Mirage

 | 

Activez ou désactivez **Cloudflare Mirage** dans l’application Cloudflare **Speed** .[En savoir plus](https://support.cloudflare.com/hc/articles/200403554).

 | 

-   Pro
-   Business
-   Enterprise

 |
| 

Opportunistic Encryption

 | 

(Chiffrement opportuniste) Activez ou désactivez la fonction **Cloudflare Opportunistic Encryption** sur l’onglet **Edge Certificates** de l’application Cloudflare **SSL/TLS**.[En savoir plus](/ssl/edge-certificates/additional-options/opportunistic-encryption).

 | 

-   Toutes

 |
| Origin Cache Control | Le [contrôle du cache des serveurs d'origine](/cache/concepts/cache-control/) est activé par défaut pour les domaines Free, Pro et Business. | 

-   Toutes

 |
| 

Origin Error Page Pass-thru

 | 

(Autorisation des pages d’erreur du serveur d’origine) Activez ou désactivez les pages d’erreur Cloudflare générées en cas de problèmes provenant du serveur d’origine. S’il est activé, ce paramètre active les pages d’erreur transmises par le serveur d’origine.

 | 

-   Enterprise

 |
| 

Polish

 | 

Applique les options de la fonction **Polish** de l’application Cloudflare **Speed** .[En savoir plus](/images/polish).

 | 

-   Pro
-   Business
-   Enterprise

 |
| 

Query String Sort

 | 

(Tri des chaînes de requêtes) Active ou désactive la réorganisation des chaînes de requêtes. Lorsque les chaînes de requêtes ont la même structure, la mise en cache est améliorée. [En savoir plus.](https://support.cloudflare.com/hc/articles/206776797)

 | 

-   Enterprise

 |
| 

Resolve Override

 | 

(Ignorer la résolution) Remplace l’adresse d’origine par la valeur indiquée dans ce paramètre. [En savoir plus](https://support.cloudflare.com/hc/articles/206190798).

 | 

-   Enterprise

 |
| 

Respect Strong ETags

 | 

(Respecter les ETags forts) Active ou désactive les contrôles d’équivalence octet par octet entre le cache Cloudflare et le serveur d’origine. [En savoir plus](https://support.cloudflare.com/hc/articles/218505467).

 | 

-   Enterprise

 |
| 

Response Buffering

 | 

(Mise en tampon des réponses) Détermine si Cloudflare doit attendre que le serveur d’origine ait envoyé un fichier entier avant de le transmettre au visiteur du site. Par défaut, Cloudflare envoie les paquets au client dès leur arrivée depuis le serveur d’origine.

 | 

-   Enterprise

 |
| 

Rocket Loader

 | 

Activez ou désactivez **Cloudflare Rocket Loader** dans l’application Cloudflare **Speed**. [En savoir plus.](https://support.cloudflare.com/hc/articles/200168056)

 | 

-   Toutes

 |
| 

Security Level

 | 

Options de contrôle pour la fonctionnalité **Security Level** (Niveau de sécurité) de l'application **Security**. [En savoir plus](https://support.cloudflare.com/hc/articles/200170056).

 | 

-   Toutes

 |
| 

Server Side Excludes

 | 

Active ou désactive la fonctionnalité **Server Side Excludes** (Exclusions côté serveur) de l’application Cloudflare **Scrape Shield**. [En savoir plus](https://support.cloudflare.com/hc/articles/200170036).

 | 

-   Toutes

 |
| 

SSL

 | 

Options de contrôle pour la fonctionnalité **SSL** de l'onglet **Certificats Edge** dans l'application Cloudflare **SSL/TLS**.[En savoir plus](/ssl/origin-configuration/ssl-modes).

 | 

-   Toutes

 |
| 

True Client IP Header

 | 

(En-tête True-Client-IP) Active ou désactive la fonction **True-Client-IP Header** de l’application Cloudflare **Network** .[En savoir plus](https://support.cloudflare.com/hc/articles/206776727).

 | 

-   Enterprise

 |
| 

Pare-feu applicatif web (version précédente)

 | 

Activez ou désactivez les **règles gérées du pare-feu WAF** comme défini dans **Security** (Sécurité) > **WAF** > **Managed rules** (Règles gérées). [En savoir plus](https://support.cloudflare.com/hc/articles/200172016).

Vous ne pouvez pas activer ou désactiver des règles gérées du pare-feu WAF via Page Rules.

 | 

-   Pro
-   Business
-   Enterprise

 |

___

## Problèmes connus

**Problème de configuration de Page Rule entraînant une erreur de serveur interne «** **_Error 500 (Internal server error)_** **»**

**Cause profonde** : ce problème peut être dû à un problème de configuration sur une Page Rule. Lors de la création d'une Page Rule qui utilise deux caractères génériques, comme une règle de _redirection d'URL_, il est possible de créer une règle qui mentionne le second caractère générique avec l'espace réservé $2. Voir l'exemple ci-dessous :

![Exemple de configuration Page Rule avec deux caractères génériques. L'URL de redirection contient un espace réservé $2, qui sera remplacé par le contenu correspondant au second ](/images/support/page-rule-create.png)

Lors de la mise à jour de la même règle, vous pouvez supprimer un des caractères génériques dans le champ **If the URL matches** (Si l'URL correspond à) et enregistrer votre mise à jour. Voir l'exemple ci-dessous :

![Configuration Page Rule incorrecte avec un caractère générique unique, mais qui utilise malgré tout l'espace réservé $2 dans l'URL de redirection. Cette configuration provoque ](/images/support/page-rule-update.png)

Si vous procédez ainsi, l'espace réservé $2 renvoie à un caractère générique qui n'existe plus et, en conséquence, une erreur de type « _Error 500 (Internal server error)_ » survient quand une URL déclenche la Page Rule.

**Résolution** : mettez à jour la Page Rule et supprimez la référence _$2_ au second caractère générique. S'il n'y a qu'un caractère générique, alors _$1_ peut être utilisé.

___

## Informations complémentaires

### Paramètre Bypass Cache on Cookie

Ce paramètre est disponible pour les clients Business et Enterprise.

Le paramètre **Bypass Cache on Cookie** (Ignorer le cache en présence d’un cookie) prend en charge les expressions régulières de base (regex) comme suit :

-   Un opérateur | pour faire correspondre plusieurs cookies avec une logique booléenne _OR_. Par exemple, bypass=.\*_|PHPSESSID=.\*_ ignore le cache si un cookie appelé bypass ou PHPSESSID est défini, quelle que soit la valeur du cookie.
-   Un caractère générique (par exemple, .\*) permet à la valeur « t.\*st » de correspondre à la fois à un cookie nommé « test » et un cookie nommé « teeest ».

Voici certaines limitations :

-   Limite de 150 caractères par regex de cookie
-   12 caractères génériques par regex de cookie
-   1 caractère générique entre chaque caractère | dans les regex de cookie

Pour apprendre comment configurer **Bypass Cache on Cookie** sur différentes plates-formes, consultez ces articles suivants :

-   [Mise en cache des consultations de pages anonymes avec WordPress ou WooCommerce](https://support.cloudflare.com/hc/articles/236166048)
-   [Mise en cache des consultations de pages anonymes avec Magento 1 et Magento 2](https://support.cloudflare.com/hc/articles/236168808)
-   [Comment mettre en cache des contenus statiques HTML ?](https://support.cloudflare.com/hc/articles/202775670)

**Remarque :** si vous ajoutez à la fois ce paramètre et le paramètre _Cache On Cookie_ (Mettre en cache en présence d’un cookie) réservé aux domaines Enterprise à la même règle Page Rules, l’option _Cache On Cookie_ est prioritaire sur _Bypass Cache on Cookie_ (Ignorer le cache en présence d’un cookie).

### Chaque fois que le nom d'une zone apparaît, il doit finir par une barre oblique

Lors de l'enregistrement d'une Page Rule, Cloudflare vérifie qu'il y a une barre oblique chaque fois que le nom de la zone actuelle apparaît dans le champ **If the URL matches**. Par exemple, si le nom de la zone actuelle est `exemple.com`, alors :

-   `exemple.com` sera enregistré en tant que `exemple.com/`
-   `exemple.com/path/exemple.com` sera enregistré en tant que `exemple.com/path/exemple.com/`

Remarque : `exemple.com/some-path/cloudflare.com` sera enregistré _sans_ barre oblique, puisque le nom de la zone n'est pas `cloudflare.com`.

### Ports réseau pris en charge par Page Rules

Si vous spécifiez un port dans le champ **If the URL matches** (Si l'URL correspond) d'une Page Rule, celui-ci doit être l'un des suivants :

-   Un des ports HTTP/HTTPS [compatible avec le proxy de Cloudflare](/fundamentals/get-started/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy).
-   Un port personnalisé d'une application [Cloudflare Spectrum](/spectrum/) HTTPS.

### Utilisation de Page Rules avec Workers

Si l'URL de la requête actuelle correspond à la fois à une Page Rule et à une [route Workers personnalisée](/workers/platform/routes), certains paramètres Page Rules ne seront pas appliqués. Pour plus d'informations sur l'utilisation de Page Rules avec Workers, consultez [Workers : Page Rules](/workers/configuration/workers-with-page-rules/) dans la documentation destinée aux développeurs.

___

## Ressources associées

-   [Règles Page Rules recommandées à prendre en considération](https://support.cloudflare.com/hc/articles/224509547)
-   [Quels sous-domaines sont adaptés à la configuration avec des nuages orange/gris ?](https://support.cloudflare.com/hc/fr-fr/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-)
-   [Comment utiliser l’option Cache Everything avec Cloudflare ?](https://support.cloudflare.com/hc/articles/202775670)
-   [Comment mettre en cache des contenus statiques HTML ?](https://support.cloudflare.com/hc/articles/200172256)
-   [Message d’erreur hors ligne lors de la mise à jour ou de l’accès à la section d’administration de mon système de gestion de contenus](https://support.cloudflare.com/hc/articles/200169526)
