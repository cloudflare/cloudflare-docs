---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200172906-Web%E3%83%88%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%81%A7%E3%81%AE%E3%82%B5%E3%83%BC%E3%82%B8%E3%81%BE%E3%81%9F%E3%81%AF%E3%82%B9%E3%83%91%E3%82%A4%E3%82%AF%E3%82%92%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%99%E3%82%8B
title: Webトラフィックでのサージまたはスパイクをトラブルシューティングする
---

# Webトラフィックでのサージまたはスパイクをトラブルシューティングする

## Webトラフィックでのサージまたはスパイクをトラブルシューティングする

## 概要

トラフィックでのスパイクに対処するためにドメインを保護し、備えておく方法はたくさんあります。次のストラテジーをおすすめします。詳細は次の通りです。

-   CloudflarePage Ruleを使ってキャッシングをカスタマイズする
-   ホスティングプロバイダーに連絡して、自分のホスティングプランの制限を理解する
-   Cloudflare IPアドレスの利点を活用する
-   Cloudflare IPがホワイトリストする設定になっていることを確認する

___

## CloudflarePage Ruleを使ってキャッシングをカスタマイズする

Cloudflareは、デフォルトで画像やCSS、JavaScriptのような[静的コンテンツをキャッシュ](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-)します。しかし、カスタム[Page Rule](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-)を作成することで、HTMLと連携できるようにCloudflareキャッシングを拡張することもできます。

### Cache everything (すべてをキャッシュする)

1\. Cloudflareアカウントにログインします。

2\. **Page Rule**アプリを選択します。

3\. **Page Ruleを作成**をクリックします。

4\. Webサイト全体かサイトの一部分を入力し、_Cache Level_(キャッシュレベル)を_Cahche Everything_(すべてをキャッシュする)に設定します。オリジンWebサーバーへとラウンドトリップする代わりに、Cloudflareは現在、Edgeネットワークで完全にHTMLをキャッシュしています。

5. _Edge Cache Expire TTL_を変更することもでき、ClouddflareはあなたのEdgeでリソースをキャッシュする時間を決定できるようになります。TTLオプションの範囲は、二(2)時間から一ヶ月です。

![page_rule_spike_or_surge_in_traffic.png](/images/support/page_rule_spike_or_surge_in_traffic.png)

Cache Everything (すべてをキャッシュする)オプションが有効になると、Cloudflareはあなたのサイト全体にサービスを提供できるようになり、サーバーの負荷を完全に取り除いてサーバーを最大限までスピーディーにします。

Business プランをご利用のCloudflareのお客様は、高度なキャッシングテクニックを使って、静的コンテンツを動的HTMLサイトにキャッシュし、 _Bypass Cache on Cookie_ Page Rule オプションを使うことで、負荷を軽減できます。

### 匿名のページビューをキャッシュする

訪問者がショッピングカートに何か入れる前に、ログインするかコメントを追加します。これらは匿名のページビューとみなされます。こうしたタイプのページ訪問者をキャッシングすることで、あなたのサイトが動的であっても、サーバーからの膨大な負荷を取り除くことができます。詳しい情報は、概要ブログの「[匿名のページビューをキャッシング](https://blog.cloudflare.com/caching-anonymous-page-views/)」をお読みください。

これを実行する方法について、複数のチュートリアルがあります:

-   [WordPressまたはWooCommerceで匿名のページビューをキャッシング](https://support.cloudflare.com/hc/en-us/articles/236166048)
-   [Magento 1とMagento 2で匿名ページビューをキャッシング](https://support.cloudflare.com/hc/en-us/articles/236168808)
-   [静的HTMLのキャッシング](https://support.cloudflare.com/hc/articles/202775670)

___

## ホスティングプロバイダーに連絡して、自分のホスティングプランの制限を理解する

Cloudflareは、キャッシングとリクエストのフィルタリングを通してあなたのWebサイトの負荷を最大限にオフセット していますが、それでもホストを通ってしまうトラフィックがあります。ご利用中のプランの制限を把握することが、ホストのボトルネック、つまり制約を防ぐことにつながります。

一度ご利用のプランの制限を把握すると、あなたのWebサイトにリクエストを送れる回数を制限する[レート制限](https://support.cloudflare.com/hc/articles/115001635128)のような機能をうまく使えるようになります。

___

## Cloudflare IPアドレスの利点を活用する

連休中などに、Cloudflare IPアドレスからのトラフィックだけを受け付けるファイアウォールを設定すると、ピークシーズン中にあなたのサイトが攻撃を受けないように対策を講じます。[Cloudflare IP](https://www.cloudflare.com/ips)だけを受け付ける場合、攻撃者がオリジナル IPアドレスに到達するので、サイトをオフラインにしてしまう事態を回避することができます。

他のオプションとしては、[mod\_Cloudflare Apache extension](https://www.cloudflare.com/technical-resources/#mod_cloudflare)の利用とApache設定に_DenyAllButCloudFlare_を追加する方法があります。

___

## Cloudflare IPがホワイトリストする設定になっていることを確認する

Cloudflareは、サイトへのリバースプロキシとして動作します。そのため、接続は全てCloudflare IPから取得します。当社のIPを制限すると、サイトにアクセスしようとする訪問者に問題が発生することがあります。Cloudflare IPのリストは、こちらでご覧いただけます：[https://www.cloudflare.com/ips  
](https://www.cloudflare.com/ips)

___

## 関連リソース

-   [Page Ruleを理解した上で設定する](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-)
-   [静的HTMLのキャッシング](https://support.cloudflare.com/hc/articles/202775670)
-   [Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128)
