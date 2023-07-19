---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360021111972-R%C3%A9solution-des-probl%C3%A8mes-DNSSEC
title: Résolution des problèmes DNSSEC
---

# Résolution des problèmes DNSSEC

_DNSSEC sécurise le DNS.  Cet article explique comment détecter les problèmes DNSSEC ayant une incidence sur la résolution DNS._

### Dans cet article

-   [Tester DNSSEC avec Dig](https://support.cloudflare.com/hc/fr-fr/articles/360021111972-R%C3%A9solution-des-probl%C3%A8mes-DNSSEC#TroubleshootingDNSSEC-DNSSECinPracticewithDig)
-   [Affichage de la chaîne de confiance DNSSEC avec Dig](https://support.cloudflare.com/hc/fr-fr/articles/360021111972-R%C3%A9solution-des-probl%C3%A8mes-DNSSEC#TroubleshootingDNSSEC-ViewingtheDNSSECChainofTrustwithDig)
-   [Dépannage de la validation DNSSEC avec Dig](https://support.cloudflare.com/hc/fr-fr/articles/360021111972-R%C3%A9solution-des-probl%C3%A8mes-DNSSEC#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationwithDig)
-   [Dépannage de la validation DNSSEC avec DNSViz](https://support.cloudflare.com/hc/fr-fr/articles/360021111972-R%C3%A9solution-des-probl%C3%A8mes-DNSSEC#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz)
-   [Prochaines étapes](https://support.cloudflare.com/hc/fr-fr/articles/360021111972-R%C3%A9solution-des-probl%C3%A8mes-DNSSEC#TroubleshootingDNSSEC-What'sNext?)
-   [Ressources associées](https://support.cloudflare.com/hc/fr-fr/articles/360021111972-R%C3%A9solution-des-probl%C3%A8mes-DNSSEC#h_388049682151546042422637)

___

## Tester DNSSEC avec Dig

_Dig_ est un outil de ligne de commande permettant de requêter un serveur de noms pour les enregistrements DNS. Par exemple, _Dig_ peut demander à un résolveur DNS l’adresse IP de _www.cloudflare.com_ (l’option _+short_ affiche uniquement le résultat) _:_


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +short198.41.215.162198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

Utilisez _Dig_ pour vérifier les enregistrements DNSSEC.  Dans l’exemple ci-dessous, l


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +dnssec +short198.41.214.162198.41.215.162A 13 3 300 20180927180434 20180925160434 35273 cloudflare.com. DYYZ/bhHSAIlpvu/HEUsxlzkC9NsswbCQ7dcfcuiNBrbhYV7k3AI8t46 QMnOlfhwT6jqsfN7ePV6Fwpym3B0pg==</span></div></span></span></span></code></pre>{{</raw>}}

requêtez la clé publique du domaine racine, et non celle du sous-domaine : 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DNSKEY cloudflare.com +short257 3 13 mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+ KkxLbxILfDLUT0rAK9iUzy1L53eKGQ==256 3 13 koPbw9wmYZ7ggcjnQ6ayHyhHaDNMYELKTqT+qRGrZpWSccr/lBcrm10Z 1PuQHB3Azhii+sb0PYFkH1ruxLhe5g==</span></div></span></span></span></code></pre>{{</raw>}}

La réponse DNS comprend deux enregistrements :

-   L’enregistrement _DNSKEY_ **256** est la clé publique appelée clé à court terme, utilisée pour vérifier les signatures d’enregistrement DNS pour _A, MX, CNAME, SRV_, etc.
-   L’enregistrement

Lorsque vous n’utilisez pas l’option _+short_ avec _dig_, une réponse DNS est authentifiée DNSSEC si l’indicateur **Annonce** apparaît dans l’en-tête de la réponse :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com[...];; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 65326;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1 [...] ;; RUBRIQUE DES QUESTIONS : ;www.cloudflare.com.        IN  A [...] ;; RUBRIQUE DES RÉPONSES : www.cloudflare.com. 15  IN  A   198.41.215.162 www.cloudflare.com. 15  IN  A   198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

___

## Affichage de la chaîne de confiance DNSSEC avec Dig

La vérification complète des signatures de domaine (par exemple : _cloudflare.com_) implique la vérification de la clé de signature de clé au niveau du domaine supérieur (par exemple : _.com_).  Une vérification similaire est

Lorsque DNSSEC est activé, un _enregistrement DS_ est requis sur le DNS du registrar. _L’enregistrement DS_ contient un hachage de la clé de signature de clé publique, ainsi que des métadonnées sur la clé.

Utilisez la commande _Dig_ pour trouver un _enregistrement DS:_ :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig +short DS cloudflare.com2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

 _Dig_ confirme si une réponse est


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DS cloudflare.com +trace[...]cloudflare.com.     86400   IN  DS  2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9[...]com.            172800  IN  NS  e.gtld-servers.net.[...];; Received 1213 bytes from 2001:502:1ca1::30#53(e.gtld-servers.net) in 37 ms</span></div></span></span></span></code></pre>{{</raw>}}

Une alternative plus facile à l’exécution manuelle de toutes les étapes ci-dessus consiste à utiliser [l’outil en ligne DNSViz](http://dnsviz.net/). Voir plus de détails sur le [dépannage de la validation DNSSEC à l’aide de DNSViz](https://support.cloudflare.com/hc/fr-fr/articles/360021111972-R%C3%A9solution-des-probl%C3%A8mes-DNSSEC#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz) ou un exemple de [résultats DNSSEC de cloudflare.com via DNSViz](http://dnsviz.net/d/cloudflare.com/dnssec/).

___

## Dépannage de la validation DNSSEC avec Dig

Des problèmes surviennent si les fournisseurs de service DNS faisant autorité sont modifiés sans mettre à jour ni supprimer les anciens enregistrements DNSSEC auprès du registrar :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 10663</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1 +dnssec +cd +short104.20.49.61104.20.48.61</span></div></span></span></span></code></pre>{{</raw>}}

Dans l’exemple ci-dessus, DNSSEC est mal configuré si une réponse DNS correcte est reçue lors de l’utilisation de l’option _+cd_ mais que les requêtes utilisant DNSSEC renvoient une réponse _SERVFAIL__._ Ce problème se produit souvent lorsque des serveurs de noms faisant autorité sont modifiés mais que les _enregistrements DS_ ne sont pas mis à jour.  Le problème peut également se produire si un pirate tente d’établir une réponse à une requête. 

___

## Dépannage de la validation DNSSEC avec DNSViz

1.  Rendez-vous sur [http://dnsviz.net/](http://dnsviz.net/)
2.  Saisissez un nom de domaine dans le champ de texte qui apparaît.
3.  Si DNSViz n’a jamais analysé le site auparavant, cliquez sur le bouton **Analyse** qui apparaît.
4.  Si le site a déjà été analysé par DNSViz, 

![Screen_Shot_2018-09-18_at_10.31.54_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.31.54_AM.png)

![Screen_Shot_2018-10-16_at_2.png](/images/support/Screen_Shot_2018-10-16_at_2.png)

![Screen_Shot_2018-09-18_at_10.25.49_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.25.49_AM.png)

___

## Prochaines étapes 

Si un problème est détecté lors de la mise en œuvre de DNSSEC, contactez le registrar du domaine et vérifiez que l’enregistrement _DS corresponde_ à ce que le fournisseur de service DNS faisant autorité a spécifié. Si Cloudflare est le fournisseur de service DNS faisant autorité, suivez les instructions pour [configurer DNSSEC avec Cloudflare.](https://support.cloudflare.com/hc/articles/360006660072).

___

## Ressources associées

-   [Comment fonctionne DNSSEC](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) 
-   [Sécurité DNS](https://www.cloudflare.com/learning/dns/dns-security/)
-   [Configuration DNSSEC avec Cloudflare](https://support.cloudflare.com/hc/articles/360006660072)
