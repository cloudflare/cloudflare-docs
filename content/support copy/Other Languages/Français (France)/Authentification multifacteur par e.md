---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/115003614752-Authentification-multifacteur-par-e-mail
title: Authentification multifacteur par e
---

# Authentification multifacteur par e-mail – Centre d'assistance Cloudflare

## Authentification multifacteur par e-mail

_Renforcez la sécurité de votre compte et empêchez les accès non autorisés grâce à l’authentification multifacteur par e-mail de Cloudflare._

___

## Aperçu

Cloudflare utilise une méthode d’authentification multifacteur (MFA) pour améliorer la sécurité des comptes. L’authentification multifacteur empêche la prise de contrôle d’un compte client lorsque les auteurs d’une attaque accèdent sans autorisation à un compte avec un mot de passe compromis ou facile à deviner.

Cloudflare teste toutes les tentatives de connexion si l’utilisateur fournit des informations d’identification correctes depuis une adresse IP non reconnue.

![Ancienne URL : https://support.cloudflare.com/hc/article_attachments/360035322751/account_access_email.png
ID de l'article : 115003614752 | Authentification multifacteur par e-mail
](/images/support/hc-import-account_access_email.png)

Cloudflare teste la connexion en envoyant, à l’adresse e-mail associée à ce compte dans notre base de données, un code unique qui expire après 30 minutes. Lorsque le code correct est saisi dans le tableau de bord, cette adresse IP est enregistrée, et, pendant 90 jours, toute tentative de connexion ultérieure depuis cette adresse IP ne fera plus l’objet d’un test.

![Ancienne URL : https://support.cloudflare.com/hc/article_attachments/360035323072/login_authentication.png
ID de l'article : 115003614752 | Authentification multifacteur par e-mail
](/images/support/hc-import-login_authentication.png)

Si vous cochez la case « Remember this computer » (Se souvenir de cet ordinateur), cet appareil/navigateur ne recevra pas de tests d’authentification multifacteur pendant 14 jours. Au bout de 14 jours, Cloudflare vérifiera à nouveau l’adresse IP pour les connexions à partir de cet appareil/ ce navigateur.

___

## Résolution des incidents liés à l’authentification multifacteur

Les e-mails de Cloudflare sont parfois traités comme courrier indésirable par le service de messagerie du destinataire. Si vous attendez un jeton d'authentification, vérifiez que votre dossier de courrier indésirable ne contient pas d'e-mails de Cloudflare et configurez un filtre pour autoriser les e-mails de Cloudflare envoyés depuis _no-reply@cloudflare.com__**.**_

Il arrive aussi que les e-mails soient refusés par le service de messagerie du destinataire. Cloudflare tentera à nouveau d’envoyer un e-mail, mais après plusieurs tentatives, votre adresse e-mail sera signalée et aucun autre e-mail ne sera envoyé.

Après avoir vérifié que votre service de messagerie ne bloque pas Cloudflare, si vous ne recevez toujours pas d’e-mails, contactez le [support Cloudflare](https://support.cloudflare.com/requests/new).

___

## Ressources associées

-   [Sécurisation de l’accès des utilisateurs grâce à l’authentification à deux facteurs](https://support.cloudflare.com/hc/fr-fr/articles/200167906)
