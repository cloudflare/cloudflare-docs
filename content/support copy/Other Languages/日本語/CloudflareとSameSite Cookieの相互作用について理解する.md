---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360038470312-Cloudflare%E3%81%A8SameSite-Cookie%E3%81%AE%E7%9B%B8%E4%BA%92%E4%BD%9C%E7%94%A8%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B
title: CloudflareとSameSite Cookieの相互作用について理解する
---

# CloudflareとSameSite Cookieの相互作用について理解する

## CloudflareとSameSite Cookieの相互作用について理解する

_SameSite Cookieとそれがクロスサイトリクエストフォージェリ（CSRF）を防止する方法について説明します。_

___

## 概要

[Google ChromeのSameSite Cookie](https://www.chromium.org/updates/same-site)は、Google ChromeによるSameSiteコントロールの処理方法を変えます。Googleは、攻撃者がCookieを盗んだり操作したりできるようにする、ユーザーを追跡するマーケティングCookieとクロスサイトリクエストフォージェリ（CSRF）をSameSiteが防止するよう強制します。

SameSite Cookieには3つの異なるモードがあります：

-   **Strict**：Cookieはファーストパーティ（訪問先ドメイン）によって作成されます。たとえば、Cloudflare.comを訪問しているときにCloudflareによってファーストパーティCookieが設定されます。
-   **Lax**：CookieはApexドメイン（_\*.foo.com_など）に対してのみ送信されます。  たとえば、誰か（_blog.naughty.com_）が 画像（_img.foo.com/bar.png_）にホットリンクした場合、クライアントは_img.foo.com_にCookieを送信しません。これは、ファーストパーティでもApexコンテンツでもないからです。
-   **None**：Cookieはすべてのリクエストと一緒に送信されます。

[Cloudflare Cookie](https://support.cloudflare.com/hc/articles/200170156)のSameSite設定値には以下のものが含まれます：

| Cloudflare Cookie | SameSite Setting | HTTPS Only |
| --- | --- | --- |
| \_\_cfduid | SameSite=Lax | いいえ |
| \_\_cf\_bm | SameSite=None; Secure | Yes |
| cf\_clearance | SameSite=None; Secure | Yes |
| \_\_cfruid | SameSite=None; Secure | Yes |
| \_\_cflb | SameSite=Lax | いいえ |

___

## SameSite Cookieとcf\_clearance Cookieに関する既知の問題

[**ファイアウォールルール**](https://support.cloudflare.com/hc/articles/360016473712)や[**IPアクセスルール**](https://support.cloudflare.com/hc/articles/217074967)などに対して[Cloudflare CAPTCHA](https://support.cloudflare.com/hc/articles/200170136)またはJavaScriptのチャレンジが解決されると、クライアントブラウザーに**cf\_clearance** Cookieが設定されます。_cf\_clearance_ Cookieのデフォルトの寿命は30分ですが、Cloudflare **Firewall**アプリの **「設定（Settings）」**タブにある[**Challenge Passage**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e)を介して設定されます。

さまざまなホスト名からの訪問者のリクエストが後続のチャレンジやエラーに遭遇しないように、**cf\_clearance** Cookie依頼はCloudflareは**SameSite**\=_None_を使用しています。**SameSite**\=_None_を使用する場合、_Secure_フラグと一緒に設定しなければなりません。

_Secure_フラグを使用するには、HTTPS接続を介してCookieを送信する必要があります。Webサイトの一部でHTTPを使用している場合、**cf\_clearance** Cookieはデフォルトで**SameSite**\=_Lax_に設定されるため、Webサイトの問題が発生する可能性があります。

Webサイトの一部でHTTPを使用している場合、**cf\_clearance** Cookieはデフォルトで**SameSite**\=_Lax_に設定されるため、Webサイトが正しく機能しない可能性があります。問題を解決するには、WebサイトのトラフィックをHTTPSに移動します。  Cloudflareは、以下の2つの機能を提供して支援します：

-   [**Automatic HTTPS Rewrites**](https://support.cloudflare.com/hc/articles/227227647)および
-   [**Always Use HTTPS**](https://support.cloudflare.com/hc/articles/204144518#h_a61bfdef-08dd-40f8-8888-7edd8e40d156)。

___

## 関連リソース

-   [SameSite Cookieの詳細を見る](https://web.dev/samesite-cookies-explained/) 
-   [Cloudflare Cookieについて理解する](https://support.cloudflare.com/hc/articles/200170156)
-   [Cloudflare SSLに関するFAQ](https://support.cloudflare.com/hc/articles/204144518#h_999722138611548960019807)
-   [Automatic HTTPS Rewriteについて理解する](https://support.cloudflare.com/hc/articles/227227647)
