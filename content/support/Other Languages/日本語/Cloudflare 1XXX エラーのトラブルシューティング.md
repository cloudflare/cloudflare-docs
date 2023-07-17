---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0
title: Cloudflare 1XXX エラーのトラブルシューティング
---

# Cloudflare 1XXX エラーのトラブルシューティング

_Clouodflareのプロキシされたサイトの1XXXエラーを診断し、解決します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_e6ba4204-ab4f-464b-afdc-e8177e418e34)
-   [Error 1000：DNSが禁止されたIPを示しています](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1000)
-   [Error 1001：DNS解決エラー](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1001)
-   [Error 1002：DNSが禁止されたIPを示しています](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1002a)
-   [Error 1002：制限付き](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1003)
-   [Error 1003 アクセス拒否：直接IPアクセスが拒否されました](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1003)
-   [Error 1004：ホストがWebトラフィックを提供するように設定されていません](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1004)
-   [Error 1006、1007、1008、1106アクセス拒否：ご利用のIPアドレスは禁止されています](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error100610071008)
-   [Error 1009アクセス拒否：国・地域が禁止されています](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_1FIuVf9XCVpeBz8Cn6B0Fj)
-   [Error 1010：このWebサイトの所有者はあなたのブラウザ署名に基づいてアクセスを禁止しています](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1010)
-   [Error 1011：アクセス拒否（Hotlinkingが拒否されました）](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1011)
-   [Error 1012：アクセス拒否](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1012)
-   [Error 1013：HTTP ホスト名とTLS SNI ホスト名が一致しません](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1013)
-   [Error 1014：CNAME 複数ユーザー禁止](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1014)
-   [Error 1015：レート制限がかかっています](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1015)
-   [Error 1016：オリジンDNSエラー](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1016)
-   [Error 1018：ホストが見つかりませんでした](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1018)
-   [Error 1019：コンピューターサーバーエラー](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1019)
-   [Error 1020：アクセス拒否](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1020)
-   [Error 1018：ホストが見つかりませんでした](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1023)
-   [Error 1025：後ほど再確認してください](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1025)
-   [Error 1033：Argo Tunnelのエラー](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_W81O7hTPalZtYqNYkIHgH)
-   [Error 1034: エッジIP制限付き](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_4eD6Gcxp4zQqS4ciCJaLt0)
-   [エラー1035：無効なリクエスト書き換え（無効なURIパス）](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1035)
-   [エラー1036：無効なリクエスト書き換え（最大長を超過）](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1036)
-   [エラー1037：無効な書き換えルール（式の評価に失敗）](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1037)
-   [エラー1040：無効なリクエスト書き換え（ヘッダーの変更はできません）](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1040)
-   [エラー1041：無効なリクエスト書き換え（無効なヘッダー値）](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1041)
-   [Error 1101：レンダリングエラー](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1101)
-   [Error 1102：レンダリングエラー](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1102)
-   [エラー 1104: このメールアドレスの類似アドレスがすでにシステムにあります。類似アドレスは１つしか認められません。](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#error1104)
-   [Error 1200：キャッシュ接続制限](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_302a97f3-eba3-4c0a-a589-76ba95f60dcf)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/360029779472-Cloudflare-1XXX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_80755d09-43f2-4656-b1f9-2989196b30a6)

___

## 概要

このドキュメントで説明されているエラーは、CloudflareがプロキシしたWebサイトにアクセスする際に発生することがあります。Cloudflare APIまたはダッシュボードのエラーに関しては、 [Cloudflare API ドキュメント](https://api.cloudflare.com/)を確認してください。HTTP 409、530、403、429エラーは、レスポンスのHTTPステータスヘッダーで返されるHTTPエラーコードです。1XXXエラーは、レスポンスのHTML本文コンテンツに表示されます。

以下の各エラー説明の解決方法でエラーが解決しない場合は、[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476)までご連絡ください。

___

## Error 1000：DNSが禁止されたIPを示しています

### 考えられる原因

Cloudflaereがリクエストを停止した理由は下記のいずれかです。

-   Cloudflare DNSアプリ内のAレコードが[Cloudflare IP アドレス](https://www.cloudflare.com/ips/)を示しているか、ロードバランサーオリジンがプロキシされたレコードを示しています。
-   Cloudflare DNS AレコードまたはCNAMEレコードがCloudflareに２回目のリクエストをプロキシする別のリバース プロキシ（proxy\_pass機能を使用するNignx Webサーバーなど）を参照している。
-   リクエストX-Forwarded-Forヘッダーの長さが、100文字を超えている。
-   リクエストに2つのX-Forwarded-Forヘッダーが含まれている。
-   Server Name Indication（SNI）に問題があるか、オリジンが一致しません。

### 解決方法

-   Cloudflare DNSアプリ内のAレコードが[Cloudflare IP アドレス](https://www.cloudflare.com/ips/)を示している場合、IPアドレスをオリジンWebサーバーIPアドレスにアップデートします。
-   Cloudflareプロキシを通して、リクエストを送り返すリバースプロキシがオリジンにあります。リバースプロキシを使用する代わりに、ホスティングプロバイダーまたは、サイト管理者に連絡して、HTTPリダイレクトをオリジンで設定します。

___

## Error 1001：DNS解決エラー

### 考えられる原因

-   Webリクエストが、存在しないCloudflareドメインのCloudflare IPアドレスに送信された。
-   Cloudflareを使っていない外部ドメインに、Cloudflare上でアクティブなドメインへのCNAMEレコードがある。
-   DNS CNAMEレコードの対象が解決していない。
-   Cloudflare DNSアプリでCNAMEレコードが、現在オフラインになっているDNSプロバイダーを経由する解決策を必要としている。
-   [Always Online](/cache/how-to/always-online/)が、[カスタムホスト名（SSL for SaaS）](/ssl/ssl-for-saas)ドメイン向けに有効になっている。

### 解決方法

非CloudflareドメインがCloudflareアカウントに追加されていないと、非CloudflareドメインにCNAMEができません。

[Cloudflare CNAME のセットアップ](/dns/zone-setups/partial-setup)に使われるDNSレコードへの直接アクセスを試行すると、エラー1001が発生します（例_：www.example.com.cdn.cloudflare.net_）。

[カスタムホスト名（SSL for SaaS）](/ssl/ssl-for-saas)を使う場合は、[Always Online](/cache/how-to/always-online/#enable-always-online)を無効にします。

___

## Error 1002：DNSが禁止されたIPを示しています

### 考えられる原因

-   Cloudflare DNSアプリで、DNSレコードが[Cloudflareの IP アドレス](https://www.cloudflare.com/ips/)を示している。
-   Cloudflare DNSアプリのCNAME レコードに対して、誤ったターゲットが指定されている。
-   ドメインがCloudflareにはないのに、Cloudflareドメインを参照するCNAMEがある。

### 解決方法

Cloudflare IPアドレスの代わりに、オリジンIPアドレスを示しているCloudflare _A_ または _CNAME レコード_をアップデートしてください。

1.  ホスティングプロバイダーに連絡して、オリジンIPアドレスまたはCNAME レコードのターゲットを確認してください。
2.  Cloudflareアカウントにログインします。
3.  エラー1002を生成するドメインを選択します。
4.  **DNS**アプリを選択します。
5.  _A_ レコードの**Value**をクリックして、アップデートしてください。
6.  _A_ レコードをアップデートしてください。

オリジンWebサーバーがCloudflareを通じてリクエストをプロキシしていないことを確認するには、オリジンWebサーバーを設定して、Cloudflareのドメインを次に変換します。

-   内部NAT’d IP アドレス、または
-   オリジンWebサーバーのパブリックIPアドレス。

___

## Error 1002：制限付き

### 考えられる原因

CloudflareのドメインがローカルIPアドレスまたは無許可のIPアドレス、ドメインに関連づけられていないIPアドレスに変換される。

### 解決方法

Webサイト所有者の場合：

1.  ホスティングプロバイダーにオリジンWebサーバーIPアドレスを確認して、
2.  Cloudflareアカウントにログインします。そして、
3.  Cloudflare DNS アプリのAレコードをホスティングプロバイダーが確認したIPアドレスに更新してください。

___

## Error 1003 アクセス拒否：直接IPアクセスが拒否されました

### 考えられる原因

クライアントまたはブラウザは直接[Cloudflare IPアドレス](https://www.cloudflare.com/ips)にアクセスします。

### 解決方法

Cloudflare IPアドレスの代わりにURLにあるWebサイトドメイン名を閲覧してください。

___

## Error 1004：ホストがWebトラフィックを提供するように設定されていません

### 考えられる原因

-   Cloudflareのスタッフが、サービス利用規約の悪用または違反のため、ドメインのプロキシを無効にした。
-   DNS変更がまだ伝達されていない、またはサイト所有者のDNS _A レコード_が[Cloudflare IPアドレス](https://www.cloudflare.com/ips)を示します。

### 解決方法

問題が5分以上続く場合は、[Cloudflareサポートまでご連絡ください](https://support.cloudflare.com/hc/articles/200172476)。

___

## Error 1006、1007、1008、1106アクセス拒否：ご利用のIPアドレスは禁止されています

### 考えられる原因

Cloudflareのお客様がクライアントまたはブラウザからのトラフィックをブロックした。

### 解決方法

Webサイト所有者にCloudflareのセキュリティ設定を調査する、またはクライアントIPアドレスを許可するように依頼してください。Webサイト所有者がリクエストをブロックしたため、Cloudflareサポートはお客様のセキュリティ設定にオーバーライドすることができません。

___

## Error 1009アクセス拒否：国・地域が禁止されています

### 考えられる原因

Webサイトの所有者（example.comなど）が、お客様のIP アドレスがある国・地域からのWebサイトアクセスを禁止しています。

### 解決方法

お客様のIP アドレスが、[IP Access ルール](https://support.cloudflare.com/hc/ja/articles/217074967-Configuring-IP-Access-Rules)セキュリティ機能で、許可されていることを確認してください。

___

## Error 1010：このWebサイトの所有者はあなたのブラウザ署名に基づいてアクセスを禁止しています

### 考えられる原因

Webサイト所有者がクライアントのWebブラウザに基づいて、リクエストをブロックした。

### 解決方法

Webサイト所有者にブロックを通知します。Webサイト所有者に連絡する方法の判断ができない場合は、[Whois データベース](https://whois.icann.org/en/lookup)を経由してドメインに関する問合せ先の情報を検索してください。サイト所有者が、**ファイアウォール**アプリの「**設定**」タブから**Browser** **Integrity Check**を無効にしています。

___

## Error 1011：アクセス拒否（Hotlinkingが拒否されました）

### 考えられる原因

リクエストが、[Cloudflare hotlinkの保護](https://support.cloudflare.com/hc/articles/200170026)を使用するリソースに実行されます。

### 解決方法

Webサイト所有者にブロックを通知します。Webサイト所有者に連絡する方法の判断ができない場合は、[Whois データベース](https://whois.icann.org/en/lookup)を経由してドメインに関する問合せ情報を検索してください。Cloudflareの**Scrape Shield**アプリを介して、**Hotlink の保護**を管理しています。

___

## Error 1012：アクセス拒否

### 考えられる原因

Webサイト所有者が、訪問者のコンピューターまたはネットワーク (ip\_address) から検出された悪意のあるアクティビティに基づき、アクセスを禁止しました。最も可能性の高い原因は、訪問者のコンピューターのウイルスかマルウェアの感染です。

### 解決方法

ウイルス対策ソフトウェアを更新し、システム全体をスキャンしてください。Cloudflareは、サイト所有者がドメインに設定したセキュリティ設定にオーバーライドすることができません。Webサイトアクセスをリクエストするには、サイトの所有者に連絡し、IPアドレスを許可してもらってください。Webサイト所有者に連絡する方法を確認できない場合は、[Whois データベース](https://whois.icann.org/en/lookup)を経由してドメインに関する問合せ先の情報を検索してください。

___

## Error 1013：HTTP ホスト名とTLS SNI ホスト名が一致しません

### 考えられる原因

[Server Name Indication](/fundamentals/glossary#server-name-indication-sni)（SNI）を介して、クライアントまたはブラウザが送信したホスト名が、リクエストホストヘッダーと一致しない。

### 解決方法

エラー1013で、考えられる原因は：

-   ローカルブラウザ設定でSNIホストヘッダーが正しくない、または
-   SSLトラフィックをプロキシするネットワークがSNIとリクエストのホストヘッダーの間での不一致を引き起こした。

SNI不一致のテストは、[SSL Shopper](https://www.sslshopper.com/ssl-checker.html)のようなオンラインツールを使います。

Cloudflareサポートに次の情報を提供してください。

1.  エラーの複製中にキャプチャされた[HAR ファイル](https://support.cloudflare.com/hc/articles/203118044)。

___

## Error 1014：CNAME 複数ユーザー禁止

### 考えられる原因

デフォルトで、Cloudflareでは異なるCloudflareアカウント間にあるDNS _CNAME レコード_を禁止しています。_CNAME レコード_は、ドメイン（_www.example.com_ CNAME から_api.example.com_）内と、そして、同じユーザーアカウント （_www.example.com_ CNAME から _www.example.net_）のゾーン間のもの、もしくは当社の[Cloudflare for SaaS](https://www.cloudflare.com/saas/)ソリューションを使用しているものが許可されます。

### 解決方法

別のCloudflareアカウントでCNAMEレコードソリューションをドメインに許可するには、CNAMEターゲットのドメイン所有者が[Cloudflare for SaaS](https://www.cloudflare.com/saas/)を、具体的には当社の[SSL for SaaS](/ssl/ssl-for-saas/)ソリューションを使用する必要があります。

___

## Error 1015：レート制限がかかっています

### 考えられる原因

サイト所有者が訪問者のトラフィックに影響する[レート制限](https://support.cloudflare.com/hc/articles/115001635128)を実装しました。

### 解決方法

-   サイト訪問者の方は、サイト所有者に連絡し、レート制限からご自分のIPを除外するようリクエストしてください。
-   サイト所有者の方は、[Cloudflare レート制限Thresholds](https://support.cloudflare.com/hc/articles/115001635128)を確認し、レート制限設定を調整してください。
-   レート制限が1秒間など短時間にリクエストをブロックしている場合、時間を10秒に伸ばしてみてください。

___

## Error 1016：オリジンDNSエラー

### 考えられる原因

Cloudflareが、オリジンWebサーバーのIPアドレスを解決することができません。

エラー1016で考えられる原因：

-   オリジンIPアドレスが示すDNS _Aレコード_がありません。
-   Cloudflare DNSの_CNAME レコード_が解決できない外部ドメインを示しています。
-   Cloudflare [ロードバランサー](/load-balancing/) でオリジナルホスト名（CNAME）のデフォルト、リージョン、フォールバックプールが解決できません。他のプールが利用できない場合に備えて、オリジンIPと設定されたフォールバックプールをバックアップとして使用します。
-   CNAMEオリジンを使ってSpectrumアプリを作成する場合は、はじめに、Cloudflare DNSでオリジンを示すCNAMEを作成する必要があります。詳細については、[Spectrum CNAMEオリジン](/spectrum/how-to/cname-origins)をご覧ください。

### 解決方法

エラー1016を解決するには：

1.  Cloudflare DNS設定の確認には、[DNS検索ツール](https://dnschecker.org/)を経由して解決する有効なIPアドレスを示す_Aレコード_が含まれていることを確認してください。
2.  別のドメインを示すCNAME レコードについては、対象となるドメインが[DNS検索ツール](https://dnschecker.org/)を経由して解決しているか確認してください。

___

## Error 1018：ホストが見つかりませんでした

### 考えられる原因

-   Cloudflareのドメインが最近有効化されたばかりで、Cloudflare エッジネットワークにドメインの設定が伝達されるのが遅れている。
-   Cloudflareパートナー（例：ホスティングプリロバイダー）を介して、Cloudflareドメインが作成され、プロバイダーのDNSが失敗した。

### 解決方法

下記の詳細とともに、[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476)にご連絡ください。

1.  ドメイン名
2.  エラーメッセージで言及されている**RayID**を含めた1018エラーのスクリーンショット
3.  1018エラーが発生した時間とタイムゾーン

___

## Error 1019：コンピューターサーバーエラー

### 考えられる原因

Cloudflare Worker スクリプトが再帰的に自身を参照する。

### 解決方法

Cloudflare Workerは同じWorkerスクリプトを呼び出すURLにアクセスしません。

___

## Error 1020：アクセス拒否

### 考えられる原因

クライアントまたはブラウザがClouddflareのお客様のファイアウォールルールによってブロックされています。

### 解決方法

Webサイト所有者でない方は、受信した1020エラーメッセージのスクリーンショットをWebサイト所有者に提供してください。

Webサイト所有者の方の場合：

1.  お客様から送信された1020エラーのスクリーンショットを取得します
2.  **RayID**のためのCloudflareの**ファイアウォール**アプリにある「**概要**」タブ内の[**ファイアウォールイベントログ**](/waf/analytics)を検索するか、または訪問者の1020メッセージからのクライアントIPアドレスを検索します。

3\. ブロックの原因にアクセスし、**ファイアウォールルール**を更新するか、[**IP Access ルール**](https://support.cloudflare.com/hc/articles/217074967)にある訪問者のIPアドレスを許可リストに設定します。

___

## Error 1018：ホストが見つかりませんでした

### 考えられる原因

-   所有者がCloudflareにサインアップしたばかりの場合、Webサイトの情報が当社のグローバルネットワークに配信されるまで、数分かかるかもしれません。サイトの設定に何か問題があります。
-   通常、問題が発生するのは、アカウントがパートナー企業（ホスティングプロバイダーなど）でサインアップされた場合や、プロバイダーのDNSに失敗した場合です。

### 解決方法

下記の詳細とともに、[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476)にご連絡ください。

1.  ドメイン名
2.  エラーメッセージで言及されている**RayID**を含めた1018エラーのスクリーンショット
3.  1023エラーが発生した時間とタイムゾーン

___

## Error 1025：後ほど再確認してください

### 考えられる原因

ドメインが、[Cloudflare Workers用のプラン制限](/workers/platform/limits)に達したため、リクエストが処理されませんでした。

### 解決方法：

Workersのダッシュボード上にある[プランページ](https://dash.cloudflare.com/redirect?account=workers/plans)から無制限のWorkersプランを購入します。

___

## Error 1033：Argo Tunnelのエラー

### 考えられる原因

CloudflareネットワークにあるWebサイト（`tunnel.example.com`）のページをリクエストしています。ホスト（`tunnel.examle.com`）がArgo Tunnelとして設定してあり、Cloudflareでは現在解決できません。

### 解決方法

-   **このWebサイトの訪問者の方は**：数分後にもう一度お試しください。
-   **Webサイトの所有者の方は**：_Cloudflare_が実行中であり、ネットワークにアクセスできることを確認してください。トンネルの[負荷分散](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb)を有効化することもできます。

___

## Error 1034: エッジIP制限付き

### 考えられる原因

以前ドメインを`1.1.1.1`に接続しているお客様には、**1034 エラー**が出ます。これはCloudflareのシステムで誤設定や潜在的な不正利用を防止するために、新しいエッジ検証チェックを行っているからです。

### 解決方法

DNSレコードがお客様が管理するIP アドレスを指していることを確認し、「オリジンレス」設定にプレースホルダーIP アドレスが必要な場合は、IPv6リザーブドアドレス `100::` またはIPv4リザーブドアドレス `192.0.2.0`を使います。

___

## エラー1035：無効なリクエスト書き換え（無効なURIパス）

### 考えられる原因

書き換えたURIパスの値または式が無効です。

このエラーは、URLの書き換え先が`/cdn-cgi/`下のパスである場合にも発生します。

### 解決方法

書き換えたURIパスが空でなく、`/`（斜線）文字で始まることを確認してください。

たとえば、次のURIパスの書き換え数式は無効です。

`concat(小文字(ip.geoip.country),http.request.uri.path)`

この式を直すには、`/`プレフィックスを追加します。

`concat("/", 小文字(ip.geoip.country),http.request.uri.path)`

___

## エラー1036：無効なリクエスト書き換え（最大長を超過）

### 考えられる原因

書き換えたURIパスまたはクエリー文字列の値または数式が長すぎます。

### 解決方法

新しいURIパス/クエリー文字列の値には、短い値または数式を使ってください。

___

## エラー1037：無効な書き換えルール（式の評価に失敗）

### 考えられる原因

書き換えたルールの数式が評価できませんでした。このエラーにはいくつかの原因がありますが、数式が評価された時、1つの式要素に未定義の値が1つ含まれていた可能性があります。

たとえば、1037エラーが発生するのは、URL書き換えに次の動的数式を使い、`X-Source`ヘッダーがリクエストに含まれていない時です。

`http.request.headers["x-source"][0]`

### 解決方法

書き換え数式の全要素が定義されていることを確認してください。たとえば、ヘッダー値を参照する場合にヘッダーが設定されていることを確認します。

___

## エラー1040：無効なリクエスト書き換え（ヘッダーの変更はできません）

### 考えられる原因

HTTPリクエストヘッダー変更ルールが変更できないHTTPヘッダーを修正しようとしています。

### 解決方法

[留保されているHTTPリクエストヘッダー](/rules/transform#http-request-header-modification-rules)の一つを変更しようとしないでください。

___

## エラー1041：無効なリクエスト書き換え（無効なヘッダー値）

### 考えられる原因

追加/変更されたヘッダー値が長すぎであるか、使用できない文字が含まれています。

### 解決方法

-   ヘッダー値の定義には、短い値または数式を使ってください。
-   使用が許可されていない文字を削除してください。開発者ドキュメントに記載されている[HTTPリクエストヘッダー名と値](/rules/transform/create-header-modification-rule#format-of-http-request-header-names-and-values)を参照して、使用可能な文字に関する詳細情報をご覧ください。

___

## Error 1101：レンダリングエラー

### 考えられる原因

Cloudflare Workerが、JavaScriptランタイム例外をスローします。

### 解決方法：

Cloudflareサポートに[適切な問題の詳細をご提供ください](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)。

___

## Error 1102：レンダリングエラー

### 考えられる原因

Cloudflare Worker が[CPU時間制限](/workers/observability/log-from-workers/#identifying-and-handling-errors-and-exceptions)を超過しています。CPU時間は、コード（たとえば、ループ、JSOの解析など）実行に費やす時間のことです。ネットワークリクエスト（フェッチング、レスポンディング）にかかった時間はCPU時間にカウントされません。

### 解決方法

Workersコードの開発者に連絡して、アクティブなWorkersスクリプトでのCPU使用を減らすためにコードを最適化してください。

___

## エラー 1104: このメールアドレスの類似アドレスがすでにシステムにあります。類似アドレスは１つしか認められません。

### 考えられる原因

追加しようとしている類似アドレスがすでに追加されている場合に、このエラーが発生します。たとえば、_my+user@example.com_と_my.user@example.com_は当社システムで同じように扱われます。

### 解決方法

既存のユーザーとしてログインして、メールを「使い捨て」アドレスに変更すると、新規メールが空きます。

___

## Error 1200：キャッシュ接続制限

### 考えられる原因

オリジンWebサーバーによる処理を待ち、Cloudflareエッジのキューに入るリクエストの数が多すぎます。これを制限することで、Cloudflareのシステムを保護します。

### 解決方法

オリジンWebサーバーを調整し、受信接続をさらにはやく受信できるようにします。キャッシング設定を調整し、キャッシュヒット率を改善します。そうすることで、オリジンWebサーバーに到達するリクエストを少なくします。ホスティングプロバイダーまたはWebサイト管理者に連絡してサポートを受けてください。

___

## 関連リソース

-   [Cloudflareサポートへのお問い合わせ](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Cloudflareエラーページのカスタマイズ](https://support.cloudflare.com/hc/articles/200172706)
