---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/214820528-Validation-d-un-certificat-Let-s-Encrypt-sur-un-site-d%C3%A9j%C3%A0-actif-sur-Cloudflare
title: Validation d’un certificat Let’s Encrypt sur un site déjà actif sur Cloudflare
---

# Validation d’un certificat Let’s Encrypt sur un site déjà actif sur Cloudflare

## Validation d’un certificat Let’s Encrypt sur un site déjà actif sur Cloudflare

_Découvrez comment valider un certificat SSL Let’s Encrypt pour un site Cloudflare actif._

___

## Présentation

Ce guide offre des détails supplémentaires sur l’utilisation de la méthode Webroot comme vérification dans le client officiel Let’s Encrypt. La description se trouve dans la documentation : [https://letsencrypt.readthedocs.org/en/latest/using.html#webroot](https://letsencrypt.readthedocs.org/en/latest/using.html#webroot)

Notez que la méthode par défaut pour l’authentification ACME par le client Let’s Encrypt est la méthode DVSNI. Cela ne fonctionnera pas pour un domaine sur lequel Cloudflare est activé, car la terminaison SSL (TLS) est prise en charge sur notre périphérie et le serveur ACME ne verra jamais le certificat que présente le client à l’origine. L’utilisation de méthodes de validation ACME alternatives comme DNS ou HTTP fonctionnera si Cloudflare est activé.

___

## Validation HTTP

Si vous configurez Let’s Encrypt pour la première fois pour un site déjà actif sur Cloudflare, il vous suffit, pour vérifier et obtenir votre certificat et clé privée, d’utiliser la méthode de vérification webroot. 

1.  Téléchargez le client Let’s Encrypt et passez au répertoire de téléchargement :


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">git clone https://github.com/letsencrypt/letsencrypt</span></div></span></span></span></code></pre>{{</raw>}}


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cd letsencrypt/</span></div></span></span></span></code></pre>{{</raw>}}
    
2.  Exécutez le script d’installation automatique :  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">./letsencrypt-auto</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  L’utilisation du client `letsencrypt` avec la commande `certonly` et le drapeau `--webroot` vous permet de vérifier et d’obtenir la paire certificat/clé grâce à la vérification HTTP. Voici un exemple de commande :  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/root/.local/share/letsencrypt/bin/letsencrypt certonly --webroot --webroot-path /usr/share/nginx/html/ --renew-by-default --email email@host.tld --text --agree-tos -d exemple.tld -d www.exemple.tld</span></div></span></span></span></code></pre>{{</raw>}}
    
      
    où  
    
    **\--webroot-path**
    
    est le répertoire sur votre serveur où se situe votre site (nginx utilisé dans l’exemple),
    
    **\--renew-by-default**
    
    sélectionne le renouvellement par défaut lorsque les domaines sont un superset d’un certificat atteint précédemment,
    
    **\--email**
    
    est l’adresse e-mail utilisée lors de l’inscription et comme contact de récupération,
    
    **\--text**
    
    affiche le résultat texte,
    
    **\--agree-tos**
    
    accepte l’accord de souscription Let’s Encrypt,
    
    **\-d**
    
    spécifie les noms d’hôtes à ajouter au SAN.
    
4.  La réussite de cette méthode de vérification affichera un texte semblable à celui-ci :  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Félicitations ! Votre certificat et votre chaîne ont été sauvegardés sur /etc/letsencrypt/live/example.tld/fullchain.pem.    Votre certificat expirera le 03/03/2016. Pour obtenir une nouvelle version du certificat    à l’avenir, il suffit d’exécuter à nouveau Let’s Encrypt.</span></div></span></span></span></code></pre>{{</raw>}}
    
5.  Notez que le certificat et la clé seront sauvegardés sur `/etc/letsencrypt/live/example.tld/` . Une fois les deux obtenus, vous devrez mettre à jour manuellement votre hôte virtuel pour utiliser cette paire clé/certificat.

Vérifiez les règles Page Rules pour le domaine dans le tableau de bord Cloudflare, en vous assurant qu’aucune ne pourrait générer une requête vers l’URL de validation qui serait redirigée ou uniquement accessible via HTTPS.

___

## Renouvellement

Lorsqu’il est temps de renouveler, la [commande](https://letsencrypt.readthedocs.org/en/latest/using.html#renewal) `letsencrypt renew` devrait autoriser le renouvellement du certificat sans aucun changement de configuration Cloudflare, à condition que :

-   le fichier .conf utilisé par le client letsencrypt pour le renouvellement spécifie `authenticator = webroot` ;
-   l’URL de validation soit accessible en HTTP ;
-   il n’y ait pas de redirection appliquée pour cette URL.

Sinon, vous pouvez répéter les étapes ci-dessus pour émettre un nouveau certificat.
