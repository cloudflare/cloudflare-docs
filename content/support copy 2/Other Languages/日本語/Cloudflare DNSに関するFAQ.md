---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ
title: Cloudflare DNSに関するFAQ
---

# Cloudflare DNSに関するFAQ

_Cloudflare DNSアプリに関連する一般的な問題を解決するヒントを提供します。_

### 本記事の内容

-   [DNSの詳細については何を参照すべきですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_GceQe7yLNteKL7WN8Fo2V)
-   [Cloudflareは無料のDNS（ドメインネームサーバー）プロバイダーですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_5AzfKIrChBLWiegj2LqTBx)
-   [CloudflareはDNSクエリについて課金しますか、または制限しますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_2hngeJgVJQtBClJB3cVQgq)
-   [どこでCloudflareのネームサーバーを指すようネームサーバーを変更するのですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_6gPUYJL7OXyKn7OEaAwipE)
-   [Cloudflareでは、1つのドメインが保有するDNSレコードの数を制限していますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#RW4QZK9AQYTX3499R4SG)
-   [Cloudflareはどのレコードタイプをプロキシしないですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_6mb72z48vZY69qLaqRO7we)
-   [Cloudflare上にないドメインをCloudflare上にあるドメインにCNAMEを追加できますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_5o8rP75kFhX9g6jaDNSoTQ)
-   [CloudflareはワイルドカードDNSエントリーをサポートしていますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_2C7rPZioPs5FIMJgvWiPST)
-   [DNSの変更が反映されるのにどれくらい時間がかかりますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_14OysgtO7JgA3N8KAtdZCn)
-   [Cloudflareはドメインマスキングを提供しますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_1POmiVdco4wE6nwRTmsJsf)
-   [なぜCloudflare DNSサーバーに対してクエリを実行できないのですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_7DVKxAlJIDkVgdAiBdpFqs)
-   [CloudflareにサインアップするときになぜDSレコードを削除する必要があるのですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_3yslZOSrNhsasnFQz7E8T1)
-   [DSレコードを削除するとどうなりますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_6yAiPswlhUgChycYuyLwvw)
-   [CloudflareはEDNS0（DNS用拡張メカニズム）をサポートしていますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_1sl0Bnvuv1fPoO6NkqWlI4)
-   [サーバーIPアドレスまたはホスティングプロバイダーを変更したら何をすべきですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_48mRDrZWcDoNy86Vh430dJ)
-   [Cloudflareのネームサーバーはどこで見つけることができますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_4DQSdKPOf5WeRRGX4UoSrG)
-   [ドメインのDNSレスポンスにCloudflare AまたはAAAAレコード/IPアドレスが表示されるのはなぜですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_2hZzaAXD1FZ85LaoygALPE)
-   [DNSレコードの横のマークはオレンジ色とグレー色のどちらであるべきですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_4KiZSEaZkCCJXEDGuD9Htf)
-   [Cloudflareにサブドメインを直接追加できますか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_2TF12dhvaLH91R6POBV0el)
-   [TerraformでDNSレコードを作成する際に403認証エラーが発生する](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_7db6AC21wyy5Xuq8vk17lY)
-   [ドメインを追加した後、何百ものランダムなDNSレコードが表示されるのはなぜですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_1lFKZFkAFRGtDPNZetRq52)
-   [パークドメイン/リダイレクト専用/オリジンレスの設定には、どのIPを使用すればよいですか？](https://support.cloudflare.com/hc/ja/articles/360017421192-Cloudflare-DNS%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_5mPkNqCpR3dklDjTvbASCI)

___

 [CloudflareラーニングセンターのDNSガイド](https://www.cloudflare.com/learning/dns/what-is-dns/)をご覧ください。

___

## Cloudflareは無料のDNS（ドメインネームサーバー）プロバイダーですか？

Cloudflareは、すべてのプランのお客様に [無料のDNSサービス](https://www.cloudflare.com/dns)を提供します。以下の点に注意してください：

1.  Cloudflareを使用するのにホスティングプロバイダーを変更する必要はありません。
2.  レジストラーを変える必要はありません。レジストラーについて唯一変えるべきことは、権威ネームサーバーがCloudflareのネームサーバーを指すようにすることです。

2018年10月より、ドメインを [Cloudflareレジストラー](https://www.cloudflare.com/products/registrar/)に転送することができます。

___

## CloudflareはDNSクエリについて課金しますか、または制限しますか？

CloudflareはDNSクエリの制限や上限を設けていませんが、料金はプランレベルにより異なります。

Free、Pro、Businessプランをご利用のお客様は、DNSクエリに課金されることはありません。

Enterpriseプランのお客様には、Cloudflareはカスタムの見積もりを生成する場合の価格の目安として、毎月のDNSクエリ数を使用します。超過分は請求されません。

___

## どこでCloudflareのネームサーバーを指すようネームサーバーを変更するのですか？

ホスティングプロバイダーである場合とそうでない場合がありますが、お客様のレジストラーで変更を加えます。ドメインのレジストラーがどこかわからない場合、 [WHOIS検索](http://www.whois.net/)を実行して見つけることができます。  [ネームサーバーをCloudflareに変更する方法](/dns/zone-setups/full-setup/setup)を参照してください。

___

## Cloudflareでは、1つのドメインが保有するDNSレコードの数を制限していますか？

はい。現在、Free、Pro、Businessのお客様は、作成できるDNSレコードの数が制限されています。

Enterpriseのお客様は、より多くのDNSレコードが必要な場合、お客様のアカウントチームにご連絡ください。

___

## Cloudflareはどのレコードタイプをプロキシしないですか？

Cloudflareは以下のレコードタイプのプロキシを行いません。

-   LOC
-   MX
-   NS
-   SPF
-   TXT
-   SRV
-   CAA

___

## Cloudflare上にないドメインをCloudflare上にあるドメインにCNAMEを追加できますか？

いいえ。Cloudflareにないサイトのリダイレクトを行う場合は、オリジンウェブサーバーで従来の301または302リダイレクトを設定してください。

CNAMEレコードを使用してCloudflare以外のサイトをリダイレクトすると、DNS解決エラーが発生する。CloudflareはCloudflare上にあるドメインのリバースプロキシなので、（Cloudflare上にない）ドメインのCNAMEリダイレクトは、どこにトラフィックを送ればいいのかわかりません。

___

## CloudflareはワイルドカードDNSエントリーをサポートしていますか？

Cloudflareは、すべてのプランのお客様のDNS管理用のワイルドカード「\*」レコードをサポートしています。以前はEnterpriseプランにのみ提供されていました。

___

## DNSの変更が反映されるのにどれくらい時間がかかりますか？

デフォルトでは、Cloudflareゾーンのファイルへの変更や追加は5分以内に反映されます。ローカルDNSキャッシュの場合は更新により長い時間がかかることがあります。そのため、伝播に5分以上の時間がかかる場合があります。

この設定は、 [DNSレコード](/dns/manage-dns-records/how-to/create-dns-records)のTTL（Time-to-Live）値によって制御されます。プロキシされたレコードは300秒以内に更新されますが（Auto）、プロキシされないレコードのTTLはカスタマイズ可能です。

___

## Cloudflareはドメインマスキングを提供しますか？

CloudflareはドメインマスキングやDNSリダイレクトサービスを提供していません（ホスティングプロバイダーが提供している場合があります）。ただし、 [Bulk Redirects](/rules/url-forwarding/bulk-redirects/) を使って、URL転送を行うことは可能です。

___

## なぜCloudflare DNSサーバーに対してクエリを実行できないのですか？

ANYクエリは特殊で誤解されることが多いです。通常、DNS名で利用可能なすべてのレコードタイプを取得するのに使用されますが、単に再帰的リゾルバーのキャッシュ内のすべてのタイプを返します。デバッグに使用される場合は混乱を招きます。

CNAME FlatteningのようなCloudflareの多くの高度なDNS機能のように複雑であり、ANYクエリに対して正しい応答を返すことは不可能な場合があります。たとえば、DNSレコードが動的に受配信されるか、遠隔操作で保存される場合、同時にすべての結果を取得するのは困難か、不可能です。

ANYは本番環境ではほとんど使用されませんが、ANYが返す長い応答を活用してDNSリフレクション攻撃に対処するときに使用されることが多いです。

レコードを列挙するのにANYクエリを使用する代わりに、Cloudflareのお客様は、ログインしてDNSアプリの設定を確認することで、DNS レコードの概要を把握できます。

ANYクエリをブロックする決定は、2015年9月に、すべての権威DNSのお客様に対して適用されました。バーチャルDNSのお客様は影響を受けません。

Cloudflareのブログ [「DNS ANYメタクエリタイプを廃止する」](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/)を参照してください。

___

## CloudflareにサインアップするときになぜDSレコードを削除する必要があるのですか？

CloudflareはDNSSECをサポートしています。Cloudflareの使用中にDSレコードがレジストラーに存在する場合、Googleのような検証リゾルバーとnoErrrorfromのような非検証リゾルバーの使用時にSERVFAILのような接続エラーが発生します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">エラーの例を次に示します：</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">╰─➤ dig dnssec-failed.org @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;&lt;&gt;&gt; DiG 9.8.3-P1 &lt;&lt;&gt;&gt; dnssec-failed.org @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; global options: +cmd</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; Got answer:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 5531</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0 ;; QUESTION SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;dnssec-failed.org.IN A</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

DNSSECサポートを使用すると、Cloudflareは、ドメインに対して[DNSSECを有効](https://support.cloudflare.com/hc/articles/360006660072)にするときに親ドメインにアップロードする必要があるDSレコードを提供します。

___

## DSレコードを削除するとどうなりますか？

DSレコードを削除すると、無効化プロセスが始まり、ドメインのDNSレコードの署名解除が行われます。これにより、権限ネームサーバーを変更できるようになります。 既存のお客様の場合、これがCloudflareの使用に影響することはありません。 新規のお客様は、Cloudflareを正常に使用できるようにするために、この手順を行う必要があります。

___

## CloudflareはEDNS0（DNS用拡張メカニズム）をサポートしていますか？

はい。CloudflareのDNSは、EDNS0をサポートしています。 EDNS0は、すべてのCloudflareのお客様に対して有効になっています。DNSリゾルバー（再帰的DNSプロバイダー）がより大きなメッセージサイズとDNSSECをサポートしている場合、EDNS0はシグナリングのサポートを追加する現代のDNS実装に欠かせない要素です。

EDNS0は、 [DNSの拡張仕様のメカニズム](http://en.wikipedia.org/wiki/Extension_mechanisms_for_DNS)として最初に承認されたものであり、当初は [RFC 2671](https://datatracker.ietf.org/doc/html/rfc2671)として発行されたものです。

___

## サーバーIPアドレスまたはホスティングプロバイダーを変更したら何をすべきですか？

ホスティングプロバイダーまたはサーバーIPアドレスを切り替えた後に、Cloudflare  **DNS**アプリ内でIPアドレスを更新します。新しいホスティングプロバイダーが、DNSが使用すべき新しいIPアドレスを提供します。  **DNS** アプリ内でDNSレコードのコンテンツを変更するには、IPアドレスをクリックして、新しいIPアドレスを入力します。

___

## Cloudflareのネームサーバーはどこで見つけることができますか？

Cloudflareアカウントの **DNS**アプリで、 **Cloudflareネームサーバー**を確認します。

特定のCloudflareネームサーバーに関連付けられているIPアドレスは、digコマンドまたは [whatsmydns.net](https://www.whatsmydns.net/)のようなオンラインでホストされているサードパーティ製のDNSルックアップツールを介して取得できます：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig kate.ns.cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">kate.ns.cloudflare.com.68675    IN    A    173.245.58.124.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## ドメインのDNSレスポンスにCloudflare AまたはAAAAレコード/IPアドレスが表示されるのはなぜですか？

CloudflareにプロキシされたDNSレコードの場合、CloudflareのIPアドレスは、オリジナルのサーバーIPアドレスではなくDNSクエリにて返されます。これにより、CloudflareはWebサイトのすべてのリクエストを最適化、キャッシュ、保護することができます。

___

## DNSレコードの横のマークはオレンジ色とグレー色のどちらであるべきですか？

デフォルトでは、Webトラフィック（HTTPおよびHTTPS）を処理するAレコードとCNAMEレコードのみを Cloudflareにプロキシできます。そのほかのすべてのDNSレコードはグレー色の雲マークに切り替えてください。詳細については[サポートガイド](/dns/manage-dns-records/reference/proxied-dns-records)を参照してください。

___

## Cloudflareにサブドメインを直接追加できますか？

Enterpriseのお客様のみ、 [サブドメインサポート](https://support.cloudflare.com/hc/articles/360026440252) を介してCloudflareに直接サブドメインを追加することができます。

___

## TerraformでDNSレコードを作成する際に403認証エラーが発生する

**問題の内容**

`エラー: DNSレコードの作成に失敗しました。HTTPステータス 403: 認証エラー (10000)` TerraformをCloudflare APIで使用する際に返されます。

**根本的な原因**

エラーは、顧客コードの構文、具体的には、zone\_id = data.cloudflare\_zones.example\_com.id で発見されたため、誤解を招くようです。

**ソリューション**

引数 `zone_id = data.cloudflare_zones.example_com.zones[0].id` を確認してください。より詳細な使用例は、 [この](https://github.com/cloudflare/terraform-provider-cloudflare/issues/913) Githubスレッドに記載されています。

___

## ドメインを追加した後、何百ものランダムなDNSレコードが表示されるのはなぜですか？

これは、以前の権威DNSでワイルドカード（\*）レコードが設定されていた場合に発生する可能性があります。これらのレコードは、APIを使用して一括して削除することができます： /api/operations/dns-records-for-a-zone-delete-dns-recordまたは、Cloudflareダッシュボードからドメインを削除し、権威DNSからワイルドカードレコードを削除してから、ドメインを再追加することもできます。

___

## パークドメイン/リダイレクト専用/オリジンレスの設定には、どのIPを使用すればよいですか？

オリジンレスセットアップにプレースホルダーアドレスが必要な場合、Cloudflare DNSでIPv6リザーブドアドレス **100::** またはIPv4リザーブドアドレス **192.0.2.0** を使用し、Proxied-modeでエントリーを作成しCloudflare Page Rules または Cloudflare Workersを活用してください。
