---
pcx_content_type: troubleshooting
language_tag: french
title: Ajout des enregistrements DNS spécifiques d’un fournisseur dans Cloudflare
---

# Ajout des enregistrements DNS spécifiques d’un fournisseur dans Cloudflare

-   [Délégation de sous-domaines en dehors de Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/360021357131-D%C3%A9l%C3%A9gation-de-sous-domaines-en-dehors-de-Cloudflare "Délégation de sous-domaines en dehors de Cloudflare")
-   [Ajout des enregistrements DNS spécifiques d’un fournisseur dans Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/360020991331-Ajout-des-enregistrements-DNS-sp%C3%A9cifiques-d-un-fournisseur-dans-Cloudflare "Ajout des enregistrements DNS spécifiques d’un fournisseur dans Cloudflare")

## Ajout des enregistrements DNS spécifiques d’un fournisseur dans Cloudflare

_Cet article explique comment ajouter des enregistrements DNS dans Cloudflare, afin de prendre en charge divers logiciels tiers, notamment Google Cloud, Amazon S3, Microsoft Azure, ClickFunnels, WPEngine et Zoho._

___

## Ajouter les enregistrements DNS des fournisseurs

Cet article suppose une connaissance préalable de la gestion des enregistrements DNS à l’aide du tableau de bord Cloudflare.  Pour en savoir plus, consultez l’article de Cloudflare sur la [gestion des enregistrements DNS](https://support.cloudflare.com/hc/en-us/articles/360019093151).

  
**Google**

Ajoutez les enregistrements MX suivants :

| **Nom** | **TTL** | **Type d’enregistrement** | **Priorité**  | **Cible** |
| --- | --- | --- | --- | --- |
| @ | Auto | MX | 1 | ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT1.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT2.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT3.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT4.ASPMX.L.GOOGLE.COM |

Une fois ajoutés, les enregistrements DNS ressemblent à ce qui suit dans l’application **DNS** de Cloudflare :

[Tester la configuration de messagerie de Google Apps](https://toolbox.googleapps.com/apps/checkmx/check).

Ajoutez un _enregistrement CNAME_ pour Google App Engine au DNS Cloudflare.

Par exemple, si le domaine est _www.exemple.com_, alors _l’enregistrement CNAME_ sera du type :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www  CNAME  ghs.googlehosted.com</span></div></span></span></span></code></pre>{{</raw>}}

Pour configurer une redirection pour un domaine Google Apps, reportez-vous au guide de [Google sur la redirection d’URL](https://support.google.com/a/answer/53340?hl=en).

**Amazon**

Les clients AWS doivent mettre à jour les serveurs de noms de leur domaine pour qu’ils pointent vers les serveurs de noms Cloudflare répertoriés dans l’application **Overview** du tableau de bord Cloudflare :

1.  Connectez-vous à AWS.
2.  Cliquez sur **Mon compte** en haut à droite sur la barre de navigation.
3.  Sélectionnez **Console de gestion AWS** dans le menu déroulant.
4.  Cliquez sur **Services** et sélectionnez **Route 53**.
5.  Mettez à jour les serveurs de noms à deux endroits :
    
    -   Cliquez sur **Zones hébergées** et sélectionnez le domaine à mettre à jour avec les serveurs de noms Cloudflare.
    -   Modifiez les serveurs de noms pour qu’ils pointent vers les serveurs de noms Cloudflare.
    
      
    -   Cliquez sur **Domaines enregistrés**.
    -   Sélectionnez le domaine à mettre à jour avec les serveurs de noms Cloudflare.
    -   Cliquez sur **Ajouter ou modifier des serveurs de noms.**.

Consultez la documentation d’Amazon pour savoir [c](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)[omment créer un compartiment Amazon S3](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html).

Notez l’URL complète de l’hôte assignée au compartiment.

Ajoutez un _enregistrement CNAME_ pour le compartiment AWS dans les DNS Cloudflare. Par exemple, si l’URL complète de l’hôte du compartiment est _fichiers.exemple.com_, ajoutez un _enregistrement CNAME_ qui ressemble à ce qui suit :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">fichiers  CNAME  fichiers.exemple.com.s3.amazonaws.com</span></div></span></span></span></code></pre>{{</raw>}}

Reportez-vous à la documentation d’Amazon [SES et les paramètres de vérification](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim.html).

Recherchez les enregistrements de vérification _TXT_ et _CNAME_ fournis par Amazon.

Ajoutez les enregistrements au DNS Cloudflare.  Par exemple, si le domaine Cloudflare _est exemple.com_, les enregistrements DNS sont similaires à ce qui suit :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemple.com  TXT  &quot;fmxqxT/icOYx4aA/bEUrDPMeax9/s3frblS+niixmqk=&quot;verificationstring._domainkey.exemple.com  CNAME  verificationstring.dkim.amazonses.com</span></div></span></span></span></code></pre>{{</raw>}}

Reportez-vous à la documentation [Aide ELB d’Amazon](http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html)  pour obtenir des conseils sur la configuration ELB sur Amazon.

1.  Ajoutez un _enregistrement CNAME_ à Cloudflare pour le nom d’hôte, par exemple : _elb_
2.  Dans l’application **DNS** Cloudflare, remplacez **Nom de domaine** par la cible ELB :  
    _  
    <AWS hostname>.<region>._elb.amazonaws.com est le format cible approprié pour _CNAME_  
    (par exemple : _my-cool-cachepp-1344276401.eu-west-1._elb.amazonaws.com).
3.  Contactez le support AWS pour déterminer le _nom d’hôte_ ou la _région_ AWS.

**Microsoft**

**Autres fournisseurs**

Consultez les exemples ci-dessous pour ajouter les enregistrements DNS Zoho appropriés à Cloudflare. Dans tous les exemples, remplacez _exemple.com_ par le nom de domaine réel :

-   Ajoutez les _enregistrements MX_ Zoho :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemple.com  MX mx.zohomail.com (définissez la Priorité sur 10)exemple.com  MX mx2.zohomail.com (définissez la Priorité sur 20)</span></div></span></span></span></code></pre>{{</raw>}}

-   Ajoutez un _enregistrement SPF_ (facultatif) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemple.com  TXT  v=spf1 mx include:zoho.com ~all</span></div></span></span></span></code></pre>{{</raw>}}

-   Pour accéder au courrier via une [URL Zoho personnalisée](https://adminconsole.wiki.zoho.com/domains/CustomURL.html), ajoutez un _enregistrement CNAME_ (facultatif) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">mail  CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

-   Pour ajouter un [enregistrement de validation de domaine Zoho](https://www.zoho.com/mail/help/adminconsole/domain-verification.html) (facultatif) :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">zb******** CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

En règle générale, les enregistrements DNS sont similaires à ce qui suit. Remplacez _exemple.com_ par le nom de domaine réel :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">email  CNAME  sendgrid.netexemple.com  SPF  v=spf1 a mx include:sendgrid.net ~allexemple.com  TXT  v=spf1 a mx include:sendgrid.net ~allmtpapi._domainkey.EXEMPLE.com  CNAME  dkim.sendgrid.net.smtpapi._domainkey.e.EXEMPLE.COM  CNAME  dkim.sendgrid.net</span></div></span></span></span></code></pre>{{</raw>}}

-   Consultez la [documentation de WPEngine](http://wpengine.com/support/how-to-configure-your-dns/) sur la configuration DNS.
-   Déterminez si vous devez ajouter un enregistrement _A_ ou _CNAME_ au DNS Cloudflare :  
    [Recherche de votre adresse IP chez WPengine](http://wpengine.com/support/find-ip/)

  

-   Consultez la documentation de Cloudflare sur la [gestion des enregistrements DNS](https://support.cloudflare.com/hc/en-us/articles/360019093151) pour en savoir plus sur l’ajout d’enregistrements.

Reportez-vous à la documentation de Ning sur les [domaines personnalisés et entrées DNS.](http://www.ning.com/help/?p%3D2870).

Si le domaine personnalisé Ning est _www.exemple.com_, ajoutez un enregistrement _CNAME_ et _A_ comme suit :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.exemple.com  CNAME  exemple.ning.com.exemple.ning.com  A  208.82.16.68</span></div></span></span></span></code></pre>{{</raw>}}

Une fois que Ning a vérifié le domaine, changez l’icône de nuage gris en nuage orange pour les enregistrements DNS Ning afin que le trafic puisse passer en proxy par Cloudflare.

Consultez la documentation SmugMug pour en savoir plus concernant les exigences d’enregistrement DNS. En règle générale, ajoutez des _enregistrements CNAME_ pour SmugMug similaires à ce qui suit :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">photo  CNAME  domains.smugmug.comphotos  CNAME  domains.smugmug.com</span></div></span></span></span></code></pre>{{</raw>}}

Une fois que SmugMug a vérifié le domaine, changez l’icône de nuage gris en nuage orange pour les enregistrements DNS Ning afin que le trafic puisse passer en proxy par Cloudflare.

Reportez-vous à l’article de [Mandrill sur les enregistrements DNS](http://help.mandrill.com/entries/22030056-How-do-I-add-DNS-records-for-my-sending-domains-) pour en savoir plus sur les exigences d’enregistrement DNS.

Mandrill nécessite l’ajout d’enregistrements _SPF_ et _DKIM_ . Vous devez obtenir les valeurs de l’enregistrement DNS auprès de Mandrill.

Ajoutez les enregistrements _SPF_ et _DKIM_ en tant qu’enregistrements _TXT_ dans l’application DNS Cloudflare.

Par exemple, si _exemple.com_ est le domaine Mandrill, ajoutez des enregistrements DNS similaires à ce qui suit :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemple.com  TXT  v=spf1 include:spf.mandrillapp.com ?allmandrill._domainkey.exemple.com  TXT  v=DKIM1\; (valeurs auprès de Mandrill)</span></div></span></span></span></code></pre>{{</raw>}}

Configurez Rackspace CloudFiles via _l’enregistrement CNAME_. Consultez la [documentation de Rackspace CloudFiles](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)[](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container).

Vérifiez la cible _CNAME_ auprès du support de Rackspace.

Un exemple _d’enregistrement CNAME_ apparaît comme suit :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">rack  CNAME  e0978.r18.cf2.rackcdn.com</span></div></span></span></span></code></pre>{{</raw>}}

Si _exemple.com_ est le domaine personnalisé, ajoutez les enregistrements DNS à Cloudflare similaires à ce qui suit :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemple.com  A  66.6.44.4www.exemple.com  CNAME  domains.tumblr.com</span></div></span></span></span></code></pre>{{</raw>}}

___

## Ressources associées

[Gestion des enregistrements DNS Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151)

[CNAME Flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)
