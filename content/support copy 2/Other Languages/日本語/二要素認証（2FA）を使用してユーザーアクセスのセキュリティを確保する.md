---
pcx_content_type: troubleshooting
language_tag: japanese
title: 二要素認証（2FA）を使用してユーザーアクセスのセキュリティを確保する
source: https://support.cloudflare.com/hc/ja/articles/200167906-%E4%BA%8C%E8%A6%81%E7%B4%A0%E8%AA%8D%E8%A8%BC-2FA-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%AE%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3%E3%82%92%E7%A2%BA%E4%BF%9D%E3%81%99%E3%82%8B
title: 二要素認証（2FA）を使用してユーザーアクセスのセキュリティを確保する
---

# 二要素認証（2FA）を使用してユーザーアクセスのセキュリティを確保する – Cloudflareヘルプセンター



## 概要

二要素認証（2FA）により、アカウント所有者はCloudflareアカウントのログインセキュリティを強化できます。 この追加の認証手順は、Cloudflareパスワードなどの既知の情報と、モバイルデバイスからの認証コードなど、ユーザーが有する情報の両方をユーザーに提供することを求めます。

モバイルデバイス（別の端末）にアクセスしなくてもアカウントに安全にアクセスできるようにするため、Cloudflareはダウンロード用のバックアップコードも提供しています。 

Cloudflareアカウント上で2FAを有効にできるユーザーはスーパーアドミニストレーターのみです。アカウント所有者には、スーパーアドミニストレーターの役割が自動的に割り当てられます。2FAを有効にすると、すべてのCloudflareアカウントメンバーがモバイルデバイスで2FAを設定する必要があります。

___

## Cloudflareアカウントの二要素認証を有効にする

Configureログインの二要素認証を有効にするには、次の手順に従います：

1.  Cloudflareダッシュボードにログインします。
2.  **「マイプロフィール（My Profile）**ドロップダウンで、**「マイプロフィール（My Profile）」**をクリックします。
3.  **「認証（Authentication）」**タブをクリックします。 
4.  **「二要素認証（Two-Factor Authentication）」**セクションまでスクロールダウンし、クリックして_「オン（On）」_に切り替えます。

![旧URL：https://support.cloudflare.com/hc/article_attachments/360038176711/2FA_enable.png Article IDs: 200167906 | Securing user access with two-factor authentication (2FA)](/images/support/hc-import-2fa_enable.png)

___

## Configureログインの二要素認証を設定する

すべてのCloudflareアカウント所有者は2FAを有効にする必要があります。 スーパーアドミニストレーターでない場合、

-   メンバーとしてCloudflareアカウントにサインアップをする前に2FAを有効にするよう求められます。
-   希望する認証アプリを選んでモバイルデバイスにダウンロードします。[Google Authenticator](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en&oco=0)など利用可能な認証アプリがいくつかあります。 QRコードが表示されます。 

2FAを有効にするには、次の手順に従います：

1\. モバイルデバイスでQRコードをスキャンし、認証アプリに表示されるコードを入力します。

2\. Cloudflareのパスワードを入力してから、**「次へ（Next）」**をクリックします。

-   QRコードをスキャンできない場合は、**「QRコードをスキャンできない。別の手順を実行する（Can't scan QR code, Follow alternative steps）」**をクリックして、認証アプリを手動で設定します。

![モバイルデバイスでQRコードをスキャンして2FAを有効にする方法を示す画面のスクリーンショット](/images/support/2FA_scan_QR_code.png)

3\. パスワードを入力し、**「次へ（Next）」**を再度クリックして、バックアップコードを確認します。

4\. バックアップコードを確認したら、安全な場所に保管しておいてください。**「ダウンロード（Download）」**、**「印刷（Print）」**、または**「コピー（Copy）」**をクリックして、コードを保存してから、**「次へ（Next）」**をクリックします。

![旧URL： https://support.cloudflare.com/hc/article_attachments/360038176771/2FA_review_and_backup_codes_v2.png Article IDs: 200167906 | Securing user access with two-factor authentication (2FA)](/images/support/hc-import-2fa_review_and_backup_codes_v2.png)

バックアップ コードは、次の画面で再生成するか、**「認証（Authentication）」**タブでいつでも再再生することができます。

5\. 「バックアップコード設定（Backup code set up）」画面で**「次へ（Next）」**をクリックして終了します。**二要素認証**が_「オン（On）」_になっていることがわかります。

6\. また、新しいバックアップコード一式をリクエストすることもできます。 **「今すぐ再生成する（Regenerate them now）」**をクリックして、新しい二要素認証のバックアップコード一式を保存します。

![旧URL： https://support.cloudflare.com/hc/article_attachments/360038176791/2FA_configuration_complete.png Article IDs: 200167906 | Securing user access with two-factor authentication (2FA)](/images/support/hc-import-2fa_configuration_complete.png)

___

## Cloudflareアカウントの二要素認証を無効にする

Cloudflareアカウント上で2FAを無効にできるユーザーはスーパーアドミニストレーターのみです。無効にすると、すべてのアカウントメンバーについて2FAが無効になります。 

Cloudflareアカウントの2FAを無効にするには、次の手順に従います：

1.  Cloudflareダッシュボードにログインします。
2.  **「マイプロフィール（My Profile）**ドロップダウンで、**「マイプロフィール（My Profile）」**をクリックします。
3.  **「認証（Authentication）」**タブをクリックします。
4.  **「二要素認証（Two-Factor Authentication）」**セクションまでスクロールダウンし、クリックして_「オン（On）」_に切り替えます。確認画面が表示されます。
5.  パスワード、認証アプリコード、またはバックアップコードを入力してから、**「無効にする（Disable）」**をクリックします。

![旧URL：https://support.cloudflare.com/hc/article_attachments/360038195192/2FA_disable.png Article IDs: 200167906 | Securing user access with two-factor authentication (2FA)](/images/support/hc-import-2fa_disable.png)

___

## Cloudflareの二要素認証へのアクセスを回復する

2FAに関する最も一般的な問題は、モバイルデバイスまたは認証コードにアクセスできなくなることです。ほとんどの場合、バックアップコードを使用するか、または希望する認証アプリのドキュメントを参照することで問題を解決できます。

2FAを設定するときは、バックアップコードを安全な場所に保管しておいてください。Cloudflareのバックアップコードを使用して、失われたアクセスを復元するには、次の手順に従います：

1\. 保管した場所からバックアップコードを取得します。

2\. Cloudflareのログインページに移動します。

3\. ログイン画面にバックアップコードを入力してから、**「ログイン（Log in）」**をクリックします。

![旧URL： https://support.cloudflare.com/hc/article_attachments/360038176971/2FA_backup_code_login_annontated.png Article IDs: 200167906 | Securing user access with two-factor authentication (2FA)](/images/support/hc-import-2fa_backup_code_login_annontated.png)

4\. 一度使用したバックアップコードは無効になります。

5.  バックアップコードを再度入力しようとしたり、間違ったコードを入力したりすると、画面下にエラーメッセージが表示されます。複数回入力に失敗すると、再度ログインするよう求められます。

参考になる一般的な認証アプリのドキュメントを以下に示します：

-   [Google Authenticator](https://support.google.com/accounts/answer/185834?hl=en&ref_topic=2954345)

それでもCloudflareアカウントにログインできない場合は、[Cloudflareサポートに連絡してください](mailto:support@cloudflare.com)。オリジンサーバーのコンテンツのコードを変更して、アカウントの所有権を確認するよう求められます。

___

## 関連リソース

-   [Google Authenticatorのドキュメント](https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345&co=GENIE.Platform%3DiOS&oco=0)
-   [Cloudflareでマルチユーザーアカウントを設定する](https://support.cloudflare.com/hc/en-us/articles/205065067-Setting-up-Multi-User-accounts-on-Cloudflare)
