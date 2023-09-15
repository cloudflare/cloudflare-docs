---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115002911927-Drupal%E3%81%A7HTML%E3%82%92%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0%E3%81%99%E3%82%8B
title: DrupalでHTMLをキャッシングする
---

# DrupalでHTMLをキャッシングする

## DrupalでHTMLをキャッシングする

## 概要

Drupalを_Cache Everything_ (すべてをキャッシュする)**Page Rule**を有効化された**Bypass Cache on Cookie**を使うことでCloudflareと使用するとき、無効になっているユーザーと画像、スクリプト、スタイルシートのようなものを含めて、静的コンテンツと[非アクティブなユーザーのHTMLをキャッシュ](https://blog.cloudflare.com/caching-anonymous-page-views/)できます。

___

## Browser Cache TTLを有効化

ブラウザキャッシュの衝突を避けるために、まずCloudflareのダッシュボードでBaypass Cache ON Cookiesを有効にしなければなりません。方法は、

1\. Cloudflareのアカウントにログインします。

2\. **キャッシング**アプリをクリックします。

3.**Browser Cache TTL**までスクロールダウンし、**既存ヘッダを尊重する**を選択します。

これで、Cloudflare**Page Rule**を使って_Bypass Cache on Cookie_設定ができるようになりました。

___

## Bypass Cache on Cookieを設定

_Bypass Cache on Cookie_ ページルールが、当社が設定した基準に満たない場合、CloudflareはTHMLをキャッシングすることなく、静的画像とその他のファイルをキャッシュします。**Page Rule**を使用して、_Bypass Cache on Cookie_を設定するには、

1\. Cloudflareのアカウントにログインします。

2\. **Page Rule**アプリをクリックします。

3\. **Page Ruleを作成**ボタンをクリックして、ドメインを入力します。以下に示す通り、ドメインは www.orangeclouded.comです。

4\. 次のようにページルールを設定します：

-   Drupalインストールパスで _\*_ワイルドカードと演算子を用いてドメイン全体を一致させ、
-   Cache LevelをCache Everything　(すべてをキャッシュする)に設定します。
-   テキストし、Drupal変数の_Bypass Cache on Cookie_ をテキストし、設定します。このルールが、ユーザーがDrupalにログインされる時にC_ache Everything_(すべてをキャッシュする)ルールをオーバーライドし、
-   最後に、_Edge Chache TTL_設定を行ない、Cloudflareキャッシュサーバーがキャッシュされたファイルを保存する期間を決定します。

Drupalサイトで追加のCookieを使用する場合、Regexステートメントにこれらが含まれていることを確認しなければなりません：_SESS.\*|phpsessid=.\*_

![page_rules_caching_static_HTML_with_drupal.png](/images/support/page_rules_caching_static_HTML_with_drupal.png)

そして、Cloudflareがキャッシュされたファイルを提供する時に、  C_F-Cache-Status: HIT_ヘッダがブラウザに返されます。

___

## 関連リソース

-   [Cloudflare CDNをキャッシング](https://support.cloudflare.com/hc/articles/200172516)
