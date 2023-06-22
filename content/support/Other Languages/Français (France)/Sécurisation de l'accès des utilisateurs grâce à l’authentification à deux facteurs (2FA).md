---
pcx_content_type: troubleshooting
language_tag: french
title: Sécurisation de l'accès des utilisateurs grâce à l’authentification à deux facteurs (2FA)
source: https://support.cloudflare.com/hc/fr-fr/articles/200167906-S%C3%A9curisation-de-l-acc%C3%A8s-des-utilisateurs-gr%C3%A2ce-%C3%A0-l-authentification-%C3%A0-deux-facteurs-2FA-
title: Sécurisation de l'accès des utilisateurs grâce à l’authentification à deux facteurs (2FA)
---

# Sécurisation de l'accès des utilisateurs grâce à l’authentification à deux facteurs (2FA) – Centre d'assistance Cloudflare



## Présentation

L’authentification à deux facteurs (2FA) permet aux propriétaires de comptes d'ajouter une couche supplémentaire de sécurité à la connexion aux comptes Cloudflare. Cette étape d'authentification supplémentaire vous demande de fournir à la fois un renseignement que vous connaissez, comme un mot de passe Cloudflare, et une information temporaire, comme un code d'authentification reçu sur un appareil mobile. 

Afin que vous puissiez accéder à votre compte en toute sécurité, même sans avoir accès à votre appareil mobile, par exemple un nouveau téléphone, Cloudflare fournit également des codes de sécurité de secours téléchargeables. 

Les Super Administrateurs sont les seuls utilisateurs qui peuvent activer l’authentification à deux facteurs sur les comptes Cloudflare. En tant que propriétaire du compte, le rôle de super administrateur vous est automatiquement attribué. Une fois l’authentification à deux facteurs activée, tous les utilisateurs du compte Cloudflare doivent la configurer sur leur appareil mobile.

___

## Activer l’authentification à deux facteurs sur votre compte Cloudflare

Activer l’authentification à deux facteurs sur votre compte Cloudflare :

1\. Connectez-vous au tableau de bord Cloudflare.

2\. Dans la liste déroulante **My Profile**, cliquez sur **My Profile**.

3\. Cliquez sur l'onglet **Authentication**. 

4\. Défilez vers le bas jusqu'à la section **Two-Factor Authentication** et basculez sur _On_.

![2FA_enable.png](/images/support/2FA_enable.png)

___

## Configurer l’authentification à deux facteurs sur votre compte Cloudflare :

Tous les détenteurs d'un compte Cloudflare doivent activer l’authentification à deux facteurs. Si vous n'êtes pas super administrateur,

-   Vous serez contraint d'activer l’authentification à deux facteurs avant d'accepter l'invitation à rejoindre un compte Cloudflare en tant que membre.
-   Choisissez votre application d'authentification préférée et téléchargez-la sur votre appareil mobile. Il existe de nombreuses applications d'authentification, parmi lesquelles [Google Authenticator](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en&oco=0) et [Authy](https://authy.com/features/) . Vous verrez un code QR. 

Pour activer l’authentification à deux facteurs :

1\. Scannez le code QR avec votre appareil mobile et saisissez le code dans votre application d'authentification.

2\. Saisissez votre mot de passe Cloudflare, puis cliquez sur **Next** (Suivant)

-   Si vous ne parvenez pas à scanner le code QR, cliquez sur **Can't scan QR code (Impossible de scanner le code QR)**, puis suivez les étapes de la procédure de configuration manuelle de votre application d'authentification..

![2FA_scan_QR_code.png](/images/support/2FA_scan_QR_code.png)

3\. Saisissez votre mot de passe et cliquez à nouveau sur **Next** pour voir vos codes de vérification de secours.

4\. Après avoir téléchargé vos codes de secours, nous vous recommandons de les enregistrer en lieu sûr. Vous pouvez cliquer sur **Download** (Télécharger), **Print** (Imprimer), ou **Copy** (Copier) pour sauvegarder les codes. Cliquez ensuite sur **Next**.

![2FA_review_and_backup_codes_v2.png](/images/support/2FA_review_and_backup_codes_v2.png)

Vous pouvez renouveler vos codes de secours à l'écran suivant ou à tout moment dans l'onglet **Authentication**. 

5\. Cliquez sur **Next**  sur l'écran de configuration des codes de secours pour terminer. Vous verrez que **l’authentification à deux facteurs** est _activée_.

6\. Vous pouvez également demander de nouveaux codes de secours. Cliquez sur **regenerate them now** (renouveler les maintenant) pour enregistrer de nouveaux codes de secours pour l’authentification à deux facteurs.

![2FA_configuration_complete.png](/images/support/2FA_configuration_complete.png)

___

## Désactiver l’authentification à deux facteurs sur votre compte Cloudflare.

Les super administrateurs sont les seuls utilisateurs qui peuvent activer l’authentification à deux facteurs sur les comptes Cloudflare. Cela désactive l’authentification à deux facteurs pour tous les membres du compte. 

Pour désactiver l’authentification à deux facteurs sur votre compte Cloudflare :

1\. Connectez-vous au tableau de bord Cloudflare.

2\. Dans la liste déroulante **My Profile**, cliquez sur **My Profile**.

3\. Cliquez sur l'onglet **Authentication**.

4\. Faites défiler vers le bas jusqu'à la section **Two-Factor Authentication** (Authentification à deux facteurs) et cliquez pour la _désactiver_. Vous verrez un écran de confirmation.

5\. Saisissez votre mot de passe, un code d'application d'authentification ou un code de secours, puis cliquez sur **Disable** (Désactiver).

![2FA_disable.png](/images/support/2FA_disable.png)

___

## Restaurer un accès perdu à l’authentification à deux facteurs de Cloudflare

Les problèmes les plus courants que l'on rencontre avec l’authentification à deux facteurs sont l'impossibilité d'accéder à un appareil mobile ou à un code d'authentification. Dans la plupart des cas, vous pouvez résoudre le problème en utilisant un code de secours ou en consultant la documentation de votre application d'authentification préférée.

Lors de la configuration de l’authentification à deux facteurs, il vous a été demandé d'enregistrer vos codes de secours dans un emplacement sécurisé. Pour rétablir un accès perdu en utilisant un code de secours Cloudflare :

1\. Récupérez le code de secours à l'endroit où vous l'avez enregistré.

2\. Rendez-vous sur la page de connexion de Cloudflare.

3\. Saisissez le code de secours sur l'écran de connexion, puis cliquez sur **Log in**.

![2FA_backup_code_login_annontated.png](/images/support/2FA_backup_code_login_annontated.png)

4\. Si vous utilisez un code de secours, il devient invalide.

5.  Si vous tentez de saisir à nouveau un code de secours ou si vous saisissez le mauvais code, un message d'erreur s'affiche au bas de l'écran. Après plusieurs tentatives infructueuses, vous serez invité à vous connecter à nouveau.

Voici quelques guides sur les applications d'authentification les plus utilisées :

-   [Google Authenticator](https://support.google.com/accounts/answer/185834?hl=en&ref_topic=2954345)
-   [Authy](https://www.authy.com/phones/change/)

Si vous ne parvenez toujours pas à vous connecter à votre compte Cloudflare, [contactez le support](mailto:support@cloudflare.com) en lui fournissant les informations suivantes :

-   La liste des domaines (1 ou plus) présents de votre compte
-   La ou les adresses IP/enregistrement(s) CNAME pour le ou les serveurs web associés à chacun de ces domaines (1 ou plusieurs)
-   Le nom de votre hébergeur pour chacun de ces domaines (1 ou plus)
-   Les serveurs de noms d'origine chez votre domain registar pour chacun de ces domaines (1 ou plusieurs)
-   (Facultatif) Le numéro de téléphone que vous avez utilisé pour activer Authy sur votre compte Cloudflare.com 

___

## Ressources associées

-   [Documentation de Google Authentication](https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345&co=GENIE.Platform%3DiOS&oco=0)
-   [Documentation d’Authy](https://authy.com/help/)
-   [Comment configurer des comptes multi-utilisateurs sur Cloudflare](https://support.cloudflare.com/hc/en-us/articles/205065067-Setting-up-Multi-User-accounts-on-Cloudflare)
