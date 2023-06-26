---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115000310832-FAQ-sur-la-CAA-Certification-Authority-Authorization-
title: FAQ sur la CAA (Certification Authority Authorization)
---

# FAQ sur la CAA (Certification Authority Authorization)

## FAQ sur la CAA (Certification Authority Authorization)

_Cet article répond à plusieurs questions courantes sur les enregistrements DNS CAA._

### Dans cet article

-   [_Qu’est-ce que CAA ?_](https://support.cloudflare.com/hc/fr-fr/articles/115000310832-FAQ-sur-la-CAA-Certification-Authority-Authorization-#h_83030816011543365917896)
-   _[Comment Cloudflare évalue-t-il les enregistrements CAA ?](https://support.cloudflare.com/hc/fr-fr/articles/115000310832-FAQ-sur-la-CAA-Certification-Authority-Authorization-#h_66255839481543365927385)_ 
-   [Pourquoi dois-je désactiver Universal SSL si mes enregistrements CAA excluent l’émission Universal SSL ?](https://support.cloudflare.com/hc/fr-fr/articles/115000310832-FAQ-sur-la-CAA-Certification-Authority-Authorization-#h_998474763141543365935375)
-   [_Quels enregistrements sont ajoutés pour garder Universal SSL activé ?_](https://support.cloudflare.com/hc/fr-fr/articles/115000310832-FAQ-sur-la-CAA-Certification-Authority-Authorization-#h_645975761191543365946939)
-   [_Que se passe-t-il quand Universal SSL est désactivé ?_](https://support.cloudflare.com/hc/fr-fr/articles/115000310832-FAQ-sur-la-CAA-Certification-Authority-Authorization-#h_217748692231543365960592)
-   [_Comment réactiver Universal SSL ?_](https://support.cloudflare.com/hc/fr-fr/articles/115000310832-FAQ-sur-la-CAA-Certification-Authority-Authorization-#h_322898447261543365970663)
-   _[Quels sont les dangers de définir des enregistrements CAA ?](https://support.cloudflare.com/hc/fr-fr/articles/115000310832-FAQ-sur-la-CAA-Certification-Authority-Authorization-#h_681347546281543365982388)_

___

## Qu’est-ce que CAA ?

Un enregistrement CAA (Certificate Authority Authorization) permet aux propriétaires de domaine de limiter l’émission à certaines autorités de certification CA (Certificate Authorities). _Les enregistrements CAA_ empêchent les autorités de certification d’émettre des certificats dans certaines circonstances.  Reportez-vous à la documentation [RFC 6844](https://tools.ietf.org/html/rfc6844) pour en savoir plus.

___

## Comment Cloudflare évalue-t-il les enregistrements CAA ?

_Les enregistrements CAA_ sont évalués par une CA et non par Cloudflare.

___

## Pourquoi dois-je désactiver Universal SSL si mes _enregistrements CAA_ excluent l’émission Universal SSL ?

Les certificats Universal SSL étant partagés entre les clients, vos _enregistrements CAA_ peuvent empêcher l’émission d’un Universal SSL pour un autre client. Par conséquent, Cloudflare doit désactiver Universal SSL pour votre domaine afin de garantir que vos _enregistrements CAA_ n’affectent pas un autre client.

Si vous n’avez pas besoin de ce certificat de la part de Cloudflare, **désactivez Universal SSL** dans l’application **SSL/TLS**.

___

## Quels enregistrements sont ajoutés pour garder Universal SSL activé ?

Les enregistrements DNS suivants sont automatiquement définis si vous continuez à utiliser les certificats Universal SSL gratuits de Cloudflare :


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemple.com. IN CAA 0 issue &quot;comodoca.com&quot;exemple.com. IN CAA 0 issue &quot;digicert.com&quot;exemple.com. IN CAA 0 issue &quot;letsencrypt.org&quot;exemple.com. IN CAA 0 issuewild &quot;comodoca.com&quot;exemple.com. IN CAA 0 issuewild &quot;digicert.com&quot;exemple.com. IN CAA 0 issuewild &quot;letsencrypt.org&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Utilisé seul, _issuewild_ n’autorise que l’émission de jokers.  Par conséquent, Cloudflare ne peut pas ajouter votre domaine racine au certificat, sauf si vous spécifiez l’option _Autoriser les jokers et les noms d’hôte spécifiques_ dans la liste déroulante **Balise** :  

![configuring_caa_records_comodoca_annotated.png](/images/support/configuring_caa_records_comodoca_annotated.png)

___

## Que se passe-t-il quand Universal SSL est désactivé ?

Votre nom de domaine est immédiatement supprimé du certificat Universal SSL et vos utilisateurs vont rencontrer des erreurs SSL, à moins que vous ne [chargiez un certificat SSL personnalisé](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-) (ce qui nécessite un Business ou Enterprise Plan).

___

## Comment réactiver Universal SSL ?

Ouvrez un ticket auprès du support Cloudflare.

___

## Quels sont les dangers de définir des enregistrements CAA ?

Si vous faites partie d’une grande entreprise ou si plusieurs parties sont chargées d’obtenir des certificats SSL, incluez les _enregistrements CAA_ qui permettent l’émission de tous les CA applicables à votre entreprise.  Si vous ne le faites pas, vous risquez de bloquer par inadvertance l’émission SSL pour d’autres parties de votre entreprise.
