---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360020296512-DNS%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-FAQ-
title: DNSのトラブルシューティングに関するよくある質問（FAQ）
---

# DNSのトラブルシューティングに関するよくある質問（FAQ）

## DNSのトラブルシューティングに関するよくある質問（FAQ）

_この記事では、CloudflareのDNSに関する一般的な問題のトラブルシューティングを行うための指針を示します。_

### 本記事の内容

-   [なぜdc-#########サブドメインがあるのですか？](https://support.cloudflare.com/hc/ja/articles/360020296512-DNS%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-FAQ-#h_84167303211544035341530)
-   [なぜDNSクエリが正しくない結果を返すのですか？](https://support.cloudflare.com/hc/ja/articles/360020296512-DNS%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-FAQ-#h_62993872051544035354776)
-   [A、AAAA、またはCNAMEレコードが見つかりません](https://support.cloudflare.com/hc/ja/articles/360020296512-DNS%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-FAQ-#h_75993570981544035362746)
-   [なぜ「ネームサーバーが変更されましたか？」というメールを受け取ったのですか？](https://support.cloudflare.com/hc/ja/articles/360020296512-DNS%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-FAQ-#h_752983037101544035373001)
-   [DNS APIで特定のTLDを追加できないのはなぜですか？](https://support.cloudflare.com/hc/ja/articles/360020296512-DNS%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-FAQ-#h_84167303211544035341531)

___

## なぜdc-#########サブドメインがあるのですか？

SRVまたは _MXレコード_ が、Cloudflareにプロキシするように設定されたドメインへの解決を行うときに、発生した競合を克服するためにdc-#####サブドメインが追加されます。

そのため、CloudflareはオリジンIPアドレスへの解決を行うdc-##### DNSレコードを作成します。 dc-#####レコードは、Cloudflareのプロキシがほかのすべてのトラフィックに対して機能する一方で、お客様のMXレコードまたはSRVレコードのトラフィックがプロキシされない（お客様のオリジンIPへの直接解決を行う）ようにします。

たとえば、Cloudflareを使用する前に、メールのDNSレコードが次のようになっていたとします：

`example.com MX example.com``example.com A 192.0.2.1`

Cloudflareを使用して _Aレコード_をプロキシした後に、CloudflareはDNSレスポンスにCloudflareのIP（以下の例では203.0.113.1）を与えます：

`example.com MX example.com``example.com A 203.0.113.1`

Cloudflareにメールトラフィックをプロキシすることでメールサービスが中断するため、Cloudflareはこの状況を検出してdc-######レコードを作成します：

`example.com MX dc-1234abcd.example.com``dc-1234abcd.example.com A 192.0.2.1` `example.com A 203.0.113.1`

dc######レコードを削除するには、次のいずれかの方法を使用します：

-   ドメインに対するメールが届かない場合は、_MXレコード_を削除してください。
-   ドメインのメールを受信している場合は、_MXレコード_を更新して、Cloudflareによってプロキシされていないメールサブドメインの別の _Aレコード_への解決を行います：

`example.com MX mail.example.com``mail.example.com A 192.0.2.1``example.com A 203.0.113.1`

___

再帰的なDNSのキャッシュの更新が失敗した場合、サードパーティ製ツールが正しいDNS結果を返すことができないことがあります。 その場合は、次の方法でパブリックDNSのキャッシュを削除します：

-   [OpenDNSでDNSのキャッシュを削除する](http://www.opendns.com/support/cache/)
-   [GoogleでDNSのキャッシュを削除する](https://developers.google.com/speed/public-dns/cache)
-   [ローカルにDNSのキャッシュを削除する](https://documentation.cpanel.net/display/CKB/How%2BTo%2BClear%2BYour%2BDNS%2BCache)

___

## A、AAAA、またはCNAMEレコードが見つかりません

_Aレコード、AAAAレコード、またはCNAMEレコードが見つからなかった_ 場合は、Cloudflare  **DNS** アプリにDNS解決のための適切な レコードが不足していることを意味します。

[不足しているDNSレコード](/dns/manage-dns-records/how-to/create-dns-records) をドメインに追加します。

___

## なぜ「ネームサーバーが変更されましたか？」というメールを受け取ったのですか？

CloudflareがDNSをホストしているドメインについては、そのドメインがDNS解決にCloudflareのネームサーバーを使用しているかどうかが継続的に確認されています。Cloudflareのネームサーバーが使用されていない場合、Cloudflare **Overview** アプリでドメインのステータスが _Active_ から _Moved_  に更新され、お客様にメールが送信されます。 _Moved_ されてから7日以上経過したドメインは、ドメインが再び _Active_ にならない限り、削除されます。

問題を解決するには、ユーザーのドメインレジストラーにてDNSを更新してCloudflareのネームサーバーを利用する必要があります：

1.  Cloudflareの記事 [「ドメインのトラブルシューティング」](https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-)の手順2と3を行います。
2.  Cloudflare UIの**Overview** アプリ内で**「今すぐ再チェックする（Re-check Now）」**をクリックします。

___

## DNS APIで特定のTLDを追加できないのはなぜですか？

DNS APIは、以下のドメインには使用できません：.cf、.ga、.gq、.ml、または.tkTLDこのようなTLDの管理には、Cloudflareダッシュボードを使用してください。Enterpriseのお客様は、[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) にご連絡いただければ、この制限を解除することができます。
