---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/236166048-WordPress-WooCommerce%E3%81%A7%E9%9D%99%E7%9A%84HTML%E3%81%AE%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0
title: WordPressWooCommerceで静的HTMLのキャッシング
---

# WordPress/WooCommerceで静的HTMLのキャッシング

## WordPress/WooCommerceで静的HTMLのキャッシング

_WordPress/WooCommerceでHTMLファイルをキャッシュする方法を説明します。_

___

## 概要

これにより、静的HTMLがエッジでキャッシュできるようになります。リクエストからリクエストへと再生成される必要はありません。

Entterprise Cloudflareのお客様は、_カスタムキャッシュキー_を使って、パフォーマンスをさらに伸ばすことができます。詳細については、お客様サクセスマネージャーまでお問い合わせください。

___

## 前提条件

開始する前に- オリジンWebサーバーから_Cache-Control_ヘッダーを尊重するように設定されていることを確認してください。設定されていない場合、Cloudflareが**Browser Cache TTL**オプション内で設定された値で_Cache-Control_ヘッダーをオーバーライドする可能性があります。_既存ヘッダーを尊重する_オプションを設定するには、

1\. Cloudflareアカウントにログインします。

2\. **キャッシング**アプリをクリックします。

3.**Browser Cache TTL**までスクロールダウンし、「_既存ヘッダーを尊重する_」を選択します。

___

## Cloudflare Page Ruleで静的HTMLをキャッシュする

1\. Cloudflareアカウントにログインします。

2\. 次に、サイト上で静的HTMLキャッシングをセットアップするために**「Page Ruleを作成」**をクリックします。

3\. お使いの「WordPressインストール」パスと一致するようにPage Ruleを設定します。 サイトがhttps://www.example.com の場合、ルールは、 [https://www.example.comとなります。](https://www.example.com./)

-   ここでは、https://junade.com で実行されているWordPressを例として使います。そのため、Page Ruleは、https://junade.com/\*と一致していなければなりません。

![Screen_Shot_2017-03-09_at_16.54.36.png](/images/support/Screen_Shot_2017-03-09_at_16.54.36.png)

4\. 追加のPage Ruleを設定して静的HTMLをキャッシュします：

-   _Cache Everything_(すべてをキャッシュする)がCloudflareに静的HTMLをキャッシュするよう指示を出します。　
-   _Bypass Cache on Cookie_が設定された基準を満たす場合、（[静的画像とその他のファイルはキャッシュされますが](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-)、）CloudflareはTHMLをキャッシュしません。Raw WordPressまたはWooCommerceを使用しているかどうかに応じて、以下の設定一つを使う必要があります。

<table><tbody><tr><td>WordPress (ネイティブ)</td><td>wp-.*|wordpress.*|comment_.*</td></tr><tr><td>WordPress と WooCommerce &nbsp; &nbsp;</td><td>wp-.*|wordpress.*|comment_.*|woocommerce_.*</td></tr></tbody></table>

-   最後に、_Edge Cache TTL_の設定で、オリジンWebサーバーからキャッシュされたファイルを戻す前に、Cloudflareがそれを保持できる最長時間を定義します。長いEdge Cache TTL時間を設定した後でも、[手動でキャッシュをクリア](https://support.cloudflare.com/hc/en-us/articles/200169246-How-do-I-purge-my-cache-)したり、自動的にキャッシュパージの管理をするWordPressプラグインを使ったりできます。

5\. **保存と展開**をクリックして終了します。

さらに、CloudflareのWordPressプラグインにある[_自動キャッシュ管理_機能を使うことで](https://support.cloudflare.com/hc/en-us/articles/115002708027-What-does-Automatic-Cache-Management-in-the-Cloudflare-Plugin-do-)、サイトに変更（例：テーマの変更/カスタムか、投稿、添付ファイルまたはページの削除または作成）を加えた後、サイトへのキャッシュを自動的にージュできるようになります。
