---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/203464660-Shopify%E3%81%A7Cloudflare%E3%82%92%E4%BD%BF%E3%81%86
title: ShopifyでCloudflareを使う
---

# ShopifyでCloudflareを使う

## ShopifyでCloudflareを使う

_Shopify出店者として、個人のCloudflareアカウントを最も効率的にセットアップする方法とShopifyにおけるCloudflareのセキュリティパフォーマンスのメリットを合わせてご紹介します。_

___

## 概要

CloudflareはShopifyと提携し、Shopify加盟店のWebサイトのパフォーマンスとセキュリティを向上させています。Shopify加盟店は、ご自分のCloudflareのアカウントで、Enterpriseプランを介してWebトラフィックをプロキシすることも可能です。Shopifyで使えるCloudflareサービスに加えて、ご自分のアカウントでCloudflareを有効にすることを、オレンジからオレンジ（O2O）と呼んでいます。O2Oは、加盟店とShopify両方のセキュリティ設定に適用されます。

![Cloudflareで、Shopify加盟店のO2Oがどのように機能するかを示す図](/support/static/hc-ext-shopify_o2o.png)

___

## ShopifyのWebサイトでO2Oを有効にする

O2OはCloudflareのEnterpriseプランでのみ有効にできます。

O2Oをご自分のアカウントで有効にするには、ショップのドメインがshops.myshopify.comを指すAレコード、またはCNAME DNS レコードのどちらかが必要となります。オレンジ色の雲のレコードです。

プロキシを有効にしたDNS レコードを追加した後、アカウントチームに連絡して、ご自分のショップドメインでO2Oを有効にしてください。

___

## ベストプラクティス

O2Oで使用する場合、Cloudflareの特定の機能がShopifyストアへのトラフィックの流れを妨げたり、訪問者に誤ったデータを表示したりする可能性があるため、注意が必要です。次の対策をおすすめします：

-   以下のCloudflareの機能を使用しない。
    -   [HTMLキャッシング](/cache/)
    -   [カスタムのファイアウォールルール](/firewall/)
    -   [レート制限](https://support.cloudflare.com/hc/articles/115001635128)
    -   [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552)
    -   [負荷分散](/load-balancing/)
    -   [IPv6](https://support.cloudflare.com/hc/articles/229666767)
-   以下のCloudflareの機能には注意が必要です。
    -   [Page rules](https://support.cloudflare.com/hc/articles/218411427): Shopifyに使用されているサブドメインにマッチするページルールが正しく設定されていないと、Webサイトへのeコマース訪問者の流れを妨げたり、歪めたりする可能性があります。
    -   [Workers](/workers/)：Page Rulesと同様にWorkersもWebサイトへのトラフィックのフローを中断し、結果的に減益につながる可能性があります。Workersの書き込みは慎重に行ってください。WorkersのルーティングからShopifyで使われるサブドメインを除外することをお勧めします。
    -   [DNS CAAレコード](/ssl/edge-certificates/caa-records/)：ShopifyはLet's Encryptを使って、出店者ドメインにSSL/TLS証明書を発行します。DNS CAAレコードを追加する場合、Let's Encryptを認証局（CA）に選択しなければなりません。そうしないと、HTTPS接続に失敗します。

___

## その他のヘルプについて

Cloudflareアカウントを設定しているShopify加盟店の方は、アカウントチームかCloudflareサポートに連絡して、この問題を解決してください。解決できない技術的な問題がある場合は、CloudflareがShopifyに問い合わせます。

-   [Cloudflareサポートへのお問い合わせ](https://support.cloudflare.com/hc/ja/articles/200172476-Contacting-Cloudflare-Support)
