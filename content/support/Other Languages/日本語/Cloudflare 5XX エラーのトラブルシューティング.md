---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0
title: Cloudflare 5XX エラーのトラブルシューティング
---

# Cloudflare 5XX エラーのトラブルシューティング

_Clouodflareのプロキシされたサイトの5XXエラーを診断し、解決します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_42ad57a0-3926-4162-b55e-c3a31864ea09)
-   [エラー分析](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#500error)
-   [エラー500: internal server error (内部サーバーエラー)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#500error)
-   [エラー502 bad gateway (Gateweyが正しくありません) または エラー504 gateway timeout (Gatewayのタイムアウト)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#502504error)
-   [エラー503: service temporarily unavailable (サービスが一時的に利用できません)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#503error)
-   [エラー520: web server returns an unknown error (Webサーバーから不明なエラーを受信します)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#520error)
-   [エラー521: web server is down (Webサーバーがダウンしています)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#521error)
-   [エラー522: connection timed out (接続のタイムアウト)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#522error)
-   [エラー523: origin is unreacheable (オリジンに到達できません)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#523error)
-   [エラー524: a timeout occured (タイムアウトが発生しました)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#524error)
-   [エラー525: SSL handshake failed (SSL ハンドシェイクに失敗しました)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#525error)
-   [エラー526: invalid SSL certificate (SSL証明書が無効です)](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#526error)
-   [527エラー: Railgun Listener to origin error（Railgun Listenerからオリジンへのエラー）](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#527error)
-   [エラー 530](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#530error)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/115003011431-Cloudflare-5XX-%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0#h_3ef3e669-ebcb-41e6-b688-e9ade0944392)

___

## 概要

5xxエラーの多くをトラブルシューティングする際、正しい方法はまず、ホスティングプロバイダーまたはサイト管理者に連絡をして、トラブルシューティングを行い、データを収集します。

### 必要となるエラーの詳細をホスティングプロバイダーに提供します。

1.  特定の5xxエラーコードとメッセージ
2.  5xxエラーが発生した時間とタイムゾーン
3.  HTTP 5xxエラーが発生したURL（例：_https://www.example.com/images/icons/image1.png_)

ホスティングプロバイダー、またはサイト管理者に提供する追加詳細は、以下の通りに各エラー説明に記載されています。Cloudflare [カスタムエラーページ](https://support.cloudflare.com/hc/articles/200172706) は、本記事で説明しているデフォルトエラーの外観を変えます。

___

## エラー分析

ドメイン毎のエラー分析はご利用のアカウントのサポートポータル内で利用可能です。 エラー分析により、HTTPエラーコードによる全体的なエラーに関する詳細分析が行われ、問題を診断し解決するために必要なURL、レスポンス、オリジンサーバーIP アドレス、Cloudflareデータセンターを提供します。 エラー分析は1%のトラフィックサンプルに基づくものです。

エラー分析を表示する方法:

-   Cloudflareサポートポータルに移動します。 [サポートチケットの提出に関する説明](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) を参照して、サポートポータルにアクセスする方法を確認してください。
-   **エラー分析** セクションまでスクロールダウンします。
-   **エラー分析を表示** をクリックします。
-   調査対象のドメインを入力します。
-    **時系列ごとのエラー** のグラフが表示されます。
-   グラフ下の表の中にあるステータスコードをクリックして、トラフィックエラーの詳細を拡張します。

___

## エラー500: internal server error (内部サーバーエラー)

エラー500は通常、オリジンWebサーバーで問題が発生したことを示します。  _データベース_接続_の確立エラー_は、オリジンWebサーバーで生成される一般的なHTTP 500エラーメッセージです。  [ホスティングプロバイダーに連絡して](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)、解決策を見つけてください：

**解決方法**

[ホスティングプロバイダーに詳細を提供し](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)、問題のトラブルシューティングのアシストを受けてください。

ただし、500エラーのHTMLレスポンス本文に「cloudflare」、または「cloudflare-nginx」が含まれている場合、[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476)に次の情報を提供してください。

1.  ドメイン名
2.  500 エラーが発生した時間とタイムゾーン
3.  503エラーの発生が見つかったブラウザからの出力_www.example.com/cdn-cgi/trace_(_www.example.com_ を実際のドメインとホスト名に置き換えてください）

___

## エラー502 bad gateway (Gateweyが正しくありません) または エラー504 gateway timeout (Gatewayのタイムアウト)

CloudflareがオリジンWebサーバーとの接続を確立できない時にHTTP 502または504が発生します。

考えられる原因が二つあります。

-   （最も一般的な原因） [オリジンWebサーバーからの502/504](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b)
-   [Cloudflareからの502/504](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_845d633d-0842-4315-9dd2-53185cc4e1de)

### オリジンWebサーバーからの502/504

CloudflareがCloudflare名を含むHTTP 502または504エラーを返すのは、標準HTTP 502 bad gateway、または504 gateway timeout エラーでオリジンWebサーバーが応答した場合です。

![Cloudflare名を含む502エラーの例](/images/support/image1.png)

**解決方法**

ホスティングプロバイダーに連絡して、オリジンWebサーバーで考える原因をトラブルシュートしてください。

-   オリジンサーバー が502または504エラーを生成した訪問者のURL内のホスト名とドメインへのリクエストに応答したことを確認してください。
-   過剰なサーバー負荷、クラッシュ、ネットワーク障害を調べてください。
-   タイムアウトしたりブロックされたりしたアプリケーションまたはサービスを特定してください。

### Cloudflareからの502/504

Cloudflareから発生した502、または504 エラーは次のように表示されます。

![ブランド名が含まれない502エラーの例](/images/support/image5.png)

エラーに「cloudflare」の記載がない場合は、[オリジンからの502/504エラー](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b)について、ホスティングプロバイダーに連絡し、サポートを受けてください。

**解決方法**

お問い合わせの処理が遅れないようにするために、[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476)にこれらの必要な詳細を提供してください。

1.  問題が発生した時間とタイムゾーン。
2.  HTTP 502、または504レスポンスが発生したURL(例：_https://www.example.com/images/icons/image1.png_)
3.  _www.example.com/cdn-cgi/trace_ の閲覧の出力（_www.example.com_をHTTP 502、または504エラーが発生したドメインとホスト名に置き換えてください）

___

## エラー503: service temporarily unavailable (サービスが一時的に利用できません)

オリジンWebサーバーが過負荷の場合、HTTPエラー 503が発生します。エラーメッセージによって識別できる原因が二つあります。

-   HTMLレスポンス本文で、エラーに「cloudflare」、または「cloudflare-nginx」が含まれていません。

**解決方法**: ホスティングプロバイダーに連絡をして、レート制限を自分のオリジンWebサーバーにリクエストしているかどうか確認します。

-   HTMLレスポンス本文で、エラーに「cloudflare」、または「cloudflare-nginx」が含まれています。

**解決方法**: 接続性の問題が、Cloudflareデータセンターで発生しました。[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476)に次の情報を提供してください：

1.  ドメイン名
2.  503 エラーが発生した時間とタイムゾーン
3.  503エラーの発生が見つかったブラウザからの出力_www.example.com/cdn-cgi/trace_(_www.example.com_ を実際のドメインとホスト名に置き換えてください）

___

## エラー520: web server returns an unknown error (Webサーバーから不明なエラーを受信します)

エラー520は、オリジンサーバー がCloudflareに空欄、不明、予期していないレスポンスを返した時に、発生します。

**解決方法**

[ホスティングプロバイダーかサイト管理者に連絡して](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)、クラッシュに関するオリジンWebサーバーエラーログを確認して、次のような一般的な原因を確認するよう依頼してください。

-   オリジンWebサーバーアプリケーションのクラッシュ
-   [Cloudflare IP](https://www.cloudflare.com/ips)がオリジンで許可されていない
-   16 KBを超えるヘッダー(通常、Cookieが多すぎるため）
-   HTTPステータスコード またはレスポンス本文が存在しないオリジンWebサーバーからの空欄のレスポンス
-   レスポンスヘッダーがない、またはオリジンWebサーバーが[適切なHTTPエラーレスポンス](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)を返していない
    -   `アップストリームからのレスポンスヘッダーの読み込み中にアップストリームが時期尚早に接続を閉じました`は、当社のロゴで気づく可能性がある一般的なエラーです。これはオリジンサーバーに問題が発生していることを示し、これがCloudflareが520エラーを発する原因になっています。

520エラーがホスティングプロバイダーかサイト管理者に連絡後も続く場合、[Cloudflareサポート](https://support.cloudflare.com/hc/articles/200172476)に以下の情報を提供してください：

-   エラーが発生した時に要求されていたリソースの完全なURL
-   520エラーメッセージからのCloudflare **cf-ray** 
-   _www.example.com/cdn-cgi/trace_ の出力（_www.example.com_を520エラーが発生したホスト名とドメインに置き換えてください）
-   二つの [HAR ファイル](https://support.cloudflare.com/hc/articles/203118044):
    -   一つは、WebサイトでCloudflare有効になっているファイル、そして
    -   [Cloudflareが一時的に無効になっている](https://support.cloudflare.com/hc/articles/200169176)ファイルです。

___

## エラー521: web server is down (Webサーバーがダウンしています)

Cloudflareからの接続をオリジンWebサーバーが拒否した時に、エラー521が発生します。オリジンのセキュリティソリューションが、特定の[Cloudflare IPアドレス](https://www.cloudflare.com/ips)からの正当な接続を拒否することがあります。

521エラーの最も一般的な原因が二つあります：

-   オフラインになったオリジンWebサーバーのアプリケーション
-   ブロックされたCloudflareのリクエスト

**解決方法**

[サイト管理者、またはホスティングプロバイダーに連絡して](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)、こうした原因を取り除いてください。

-   オリジンWebサーバーが応答性があることを確認する
-   オリジンWebサーバーのエラーログを確認して、Webサーバーアプリケーションがクラッシュしているか、停止しているか確認する
-   [Cloudflare IPアドレス](https://www.cloudflare.com/ips)がブロックされていない、またはレート制限されていないことを確認する
-   オリジンWebサーバーのファイアウォールまたはその他のセキュリティソフトウェアですべての[Cloudflare IP範囲](https://www.cloudflare.com/ips)を許可する
-   **SSL/TLS モード** を **Full** または**Full (Strict**) に設定したかと、[Cloudflareオリジン証明書](/ssl/origin-configuration/origin-ca)をインストール済みであることを確認する
-   [Cloudflareコミュニティ](https://community.cloudflare.com/t/community-tip-fixing-error-521-web-server-is-down/42461) で追加のトラブルシューティングに関する情報を見つける

___

## エラー522: connection timed out (接続のタイムアウト)

CloudflareがオリジンWebサーバーとの接続中にタイムアウトした時にエラー522が発生します。CloudflareとオリジンWebサーバー間でエラーが発生するタイミングに応じて、二つの異なるタイムアウトが、HTTPエラー522を発生させます。

1.  接続が確立する前に、CloudflareがSYNを送信する15秒以内に、オリジンWebサーバがSYN+ACK をCloudflareに返しません。
2.  接続が確立した後でも、オリジンWebサーバーがCloudflareのリソースリクエストを90秒以内に認識(ACK)しません。

**解決方法**

[ホストプロバイダーに連絡をして](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)、下記のようなオリジンWebサーバーで発生する一般的な原因をチェックしてください：

-   （最も一般的な原因）[Cloudflare IPアドレス](https://www.cloudflare.com/ips/)が、.htaccess、iptables、またはファイアウォールでレート制限されている、またはブロックされています。ホスティングプロバイダーが、Cloudflare IPアドレスを許可していることを確認します。
-   過負荷またはオフラインのオリジンWebサーがーが着信リクエストをドロップします。
-   [KeepAlive](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html)がオリジンWebサーバーで無効になっています。
-   Cloudflare **DNS**アプリのオリジンIPアドレスが、現在ホスティングプロバイダーがオリジンWebサーバーにプロビジョニングしているIPアドレスと一致していません。
-   オリジンWebサーバーでパケットがドロップされています。

[Cloudflare Pages](/pages/)をご利用の場合、カスタムドメインが設定され、CNAMEレコードがカスタム ページドメインを指していることを確認してください。カスタム ページドメインの設定方法に関する説明は[こちら](/pages/getting-started#adding-a-custom-domain)。

上記が全て解決策につながらない場合は、[Cloudflareサポートに連絡する](https://support.cloudflare.com/hc/articles/200172476)前に、ホスティングプロバイダーかサイト管理者から次の情報を取得してください：

-   オリジンWebサーバーから、問題発生以前からオリジンWebサーバーに最も一般的に接続されている[Cloudflare IPアドレス](http://www.cloudflare.com/ips)までの[MTRまたはtraceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)オリジンWebサーバーログで記録されているCloudflare IP接続を特定します。
-   関連ログまたはホスティングプロバイダーとの会話など、ホスティングプロバイダーの調査から得た詳細。

___

## エラー523: origin is unreacheable (オリジンに到達できません)

エラー523は、CloudflareがオリジンWebサーバーに接続できない時に発生します。これは通常、CloudflareとオリジンWebサーバー間のネットワークデバイスがオリジンのIPアドレスへのルートがない時に発生します。

**解決方法** [ホスティングプロバイダーに連絡し](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)、オリジンWebサーバーで以下の一般的な原因を取り除いてください：

-   Cloudflare DNSアプリ内でAレコードまたはAAAAレコードにあるオリジンIPアドレスが正しいことを確認します。
-   オリジンとCloudflare間、またはオリジン自体のインターネットルーティングの問題をトラブルシューティングします。

上記が全て解決策につながらない場合は、ホスティングプロバイダーかサイト管理者から次の情報を取得してください：

-   オリジンWebサーバーから、問題発生以前からオリジンWebサーバーに最も一般的に接続されている[Cloudflare IPアドレス](http://www.cloudflare.com/ips)までの[MTRまたはtraceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)オリジンWebサーバーのログからCloudflare IPへの接続を特定します。
-   Cloudflareのホスティングパートナーを経由してRailgunを使用する時、[ホスティングプロバイダーに連絡して](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)、523エラーをトラブルシューティングしてください。
-   Railgunのインストールを管理する場合は、以下を提供してください:
    -   RailgunサーバーからオリジンWebサーバーへの[traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)。
    -   ご利用中のRailgunサーバーからの最新syslog ファイル。

___

## エラー524: a timeout occured (タイムアウトが発生しました)

エラー524は、CloudflareがオリジンWebサーバーへの接続に成功したことを示しますが、デフォルトの100秒接続がタイムアウトする前に、オリジンがHTTPレスポンスを提供しなかったということです。これが発生する原因として、オリジンサーバーの動作が多すぎるために単に時間がかかりすぎていることがあります。大量のデータクエリや、サーバーがリソースに悩まされていて、時間内にデータが返信できないためです。

**解決方法**

この問題を回避するために当社が提案するオプションはこちらです:

-   このエラーを回避するために、大規模なHTTPプロセスを引き出すステータスを実装する。
-   [ホストプロバイダーに連絡して](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)、以下のようなオリジンWebサーバーで考えられる原因を取り除いてください：
    -   オリジンWebサーバーで長時間実行される処理。
    -   過負荷のオリジンWebサーバー。

-   Enterpriseプランのお客様は、[プロキシ読み取りタイムアウトAPI エンドポイント](https://api.cloudflare.com/#zone-settings-change-proxy-read-timeout-setting)を使って、524秒のタイムアウトを6000秒まで伸ばすことができます。
-   完了に100秒以上かかる(大きいデータエクスポートなど) HTTPリクエストを定期的に実行する場合は、Cloudflare **DNS** アプリでプロキシされていない（グレー色のクラウド）サブドメインの背後にこうした処理を移動させます。
-   Cloudflare Railgunを使用するドメインでエラー524が発生した場合、_lan.timeout_がデフォルトの30秒より高く設定されていることを確認してから、Railgunサービスを再起動してください。

___

## エラー525: SSL handshake failed (SSL ハンドシェイクに失敗しました)

525エラーはCloudflareとオリジンWebサーバー間のSSLハンドシェイクが失敗したことを示します。エラー525は、二つの条件がそろった時に発生します:

1.  CloudflareとオリジナルWebサーバー間の[SSLハンドシェイク](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)に失敗する、そして
2.  Cloudflare **SSL/TLS** アプリの「**概要**」タブで、[_Full_ または _Full (Strict)_](/ssl/origin-configuration/ssl-modes) **SSL** が設定されている。

**解決方法**

[ホストプロバイダーに連絡して](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)、以下のようなオリジンWebサーバーで考えられる原因を取り除いてください：

-   有効なSSL証明書がインストールされていない
-   ポート443（または他のカスタムセキュアポート）が開いていない
-   [SNI](https://support.cloudflare.com/hc/articles/360026016272) サポートがない
-   Cloudflareで受け入れられている [暗号スイート](/ssl/ssl-tls/cipher-suites) がオリジンWebサーバーでサポートされている暗号スイートと一致しない

**追加のチェック**

-   オリジンサーバーに証明書がインストールされているかを確認します。[こちらの記事](https://support.cloudflare.com/hc/ja/articles/203118044-Gathering-information-for-troubleshooting-sites#h_0c7f48b3-fc29-4266-8c63-477fe61a11c4)に、いくつかのテストを実行する方法に関する詳細が記載されています。証明書をお持ちでない方は、無料の[CloudflareオリジンCA証明書](/ssl/origin-configuration/origin-ca)を作成およびインストールできます。オリジンCA証明書を使うと、CloudflareとオリジンWebサーバー間のトラフィックを暗号化できます。
-   サーバーで使用されている[暗号スイーツを調べて](/ssl/ssl-tls/cipher-suites)、Cloudflareがサポートするものと一致することを確認します。
-   525と表示するタイムスタンプからサーバーのエラーログをチェックし、SSLハンドシェイク中に接続が再設定される原因となるエラーがあるか確認します。

___

## エラー526: invalid SSL certificate (SSL証明書が無効です)

エラー 526は、次の二つの条件がそろった時に発生します：

1.  オリジンWebサーバーでCloudflareがSSL証明書を検証できない、そして
2.  Cloudflare **SSL/TLS** アプリの「**概要**」タブで、[_Full SSL (Strict)_](/ssl/origin-configuration/ssl-modes#full-strict) または **SSL** が設定されている。

**解決方法**

サーバー管理者またはホスティングプロバイダーにリクエストして、オリジンWebサーバーのSSL証明書を見直して、次を確認してください。

-   証明書の有効期限が切れていないか
-   証明書は失効していないか
-   証明書に、（自己署名ではなく）[認](https://support.cloudflare.com/hc/articles/360026016272)[証局](https://support.cloudflare.com/hc/articles/360026016272)からの署名があるか
-   要求された/対象となるドメイン名とホスト名が証明書の**Common Name**（コモンネーム）または **Subject Alternative Name**（サブジェクトの別名）に記載されているか
-   オリジンWebサーバーがポートSSL ポート443経由の接続を受け入れているか
-   [Cloudflareを一時的に停止して](https://support.cloudflare.com/hc/articles/200169176)、[https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com](https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com) を開いて（www.example.com をホスト名とドメインに置き換える）オリジンSSL証明書に問題がないことを確認する：

![SSL証明書にエラーがないことを示す画面](/images/support/hc-import-troubleshooting_5xx_errors_sslshopper_output.png)

オリジンサーバーが自己署名の証明書を使用している場合は、ドメインを_Full SSL (strict)_の代わりに_Full_ _SSL_を使うように設定します。[ご自分のオリジンに合わせて推奨されるSSL設定](/ssl/origin-configuration/ssl-modes)を参照してください。

___

## 527エラー: Railgun Listener to origin error（Railgun Listenerからオリジンへのエラー）

527エラーは、Cloudflareとオリジンの[Railgun サーバー (rg-listener)](https://support.cloudflare.com/hc/articles/200168406)間で接続が中断したことを示します。考えられる原因は：

-   ファイアウォールの干渉
-   RailgunサーバーとCloudflare間で発生したネットワークインシデントまたはパケットロス

527エラーの考えられる原因：

-   [接続タイムアウト](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c559b9e5-a342-47ed-bfae-66e10e42aade)
-   [LANタイムアウト超過](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_f8e4890c-9459-4c9a-a4ab-e9b44fa16dbf)
-   [接続拒否](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_2e3e4251-3642-4fce-bbcf-1a45bb2b2c11)
-   [TLS/SSLに関連するエラー](https://support.cloudflare.com/hc/ja/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c30fe02c-98f2-4cbf-af8c-bafa9b4f5b8f)

Cloudflareサポートに連絡する場合は、Railgun Listenerから以下の情報を提供してください：

-   _railgun.conf_ ファイルの完全なコンテンツ
-   _railgun-nat.conf_ ファイルの完全なコンテンツ
-   認められたエラーの詳述するRailgunログファイル

### 接続タイムアウト

以下のRailgunログエラーでは、Railgun ListenerとオリジンWebサーバー間の接続失敗を示しています：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/example.com:dial tcp 0.0.0.0:443: i/o timeout</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">no response from origin (timeout) 0.0.0.0:80/example.com</span></div></span></span></span></code></pre>{{</raw>}}

**解決方法**

ホスティングプロバイダーに連絡して、オリジンWebサーバーとRailgun Listener間の接続性問題をテストするためのサポートを受けてください。例えば、Railgun ListenerからオリジンWebサーバーの_SERVERIP_と_PORT_ (HTTPは80、HTTPSは443)の時に、netcatが接続性のテストをコマンドします：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nc -vz SERVERIP PORT</span></div></span></span></span></code></pre>{{</raw>}}

### LANタイムアウト超過

以下のRailgun Listenerログエラーが生成されるのは、オリジンWebサーバーがHTTPレスポンスをデフォルトタイムアウトの30秒以内にRailgun Listenerに送信しない時です：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  connection failed 0.0.0.0:443/example.com: dial tcp 0.0.0.0:443: i/o timeout</span></div></span></span></span></code></pre>{{</raw>}}

この時間は、railgun.conf fileのlan.timeoutパラメーターによって調整されています。

**解決方法**

_lan.timeout_ 制限を _railgun.conf_で増やすか、Webサーバーの設定を見直す。ホスティングプロバイダーに連絡して、オリジンWebサーバーが過負荷になっていないか確認してください。

### 接続拒否

Railgun Listenerが拒否されると、以下のエラーがRailgunログに表示されます：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Error getting page: dial tcp 0.0.0.0:80:connection refused</span></div></span></span></span></code></pre>{{</raw>}}

**解決方法**

オリジンWeb サーバーのファイアウォールで Railgun Listenr のIPを許可します。

### TLS/SSLに関連するエラー

TLS接続に失敗すると、次のエラーがRailgunログに表示されます。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/example.com:remote error: handshake failure connection failed 0.0.0.0:443/example.com:dial tcp 0.0.0.0:443:connection refused connection failed 127.0.0.1:443/www.example.com:x509: certificate is valid for example.com,not www.example.com</span></div></span></span></span></code></pre>{{</raw>}}

**解決方法**

TLS/SSLエラーが発生した場合、オリジンWebサーバーをチェックして、次を確認します：

-   ポート443が開いているか
-   オリジンWebサーバーでSSL証明書が提示されているか
-   オリジンWebサーバーのSSL証明書に記載されるSANまたはコモンネームがリクエストされたまたは標的となるホーム名に含まれているか
-   Cloudflare **SSL/TLS** アプリの「**概要**」タブで、**SSL** が [Full またはFull (Strict)](/ssl/origin-configuration/ssl-modes) に設定されているか

___

## エラー 530

HTTPエラー530が、1xxxエラー表示とともに返されました。トラブルシューティング情報を取得するには、[Cloudflareヘルプセンター内で特定の1xxxエラー](https://support.cloudflare.com/hc/sections/200820298)を検索してください。

___

## 関連リソース

-   [サイトの問題をトラブルシューティングするために情報を収集する](https://support.cloudflare.com/hc/ja/articles/203118044)
-   [Cloudflareサポートへのお問い合わせ](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Cloudflareエラーページのカスタマイズ](https://support.cloudflare.com/hc/articles/200172706)
-   [MTR/Traceroute診断と用途](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)
-   [Cloudflareのコミュニティのヒント](https://community.cloudflare.com/tag/communitytip)
