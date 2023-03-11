---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8
title: WebSocketsでCloudflareを利用
---

# WebSocketsでCloudflareを利用

## WebSocketsでCloudflareを利用

_WebSocketsはCloudflareのお客様全員にご利用いただけます。そして、同時接続は、プランごとに割り当てられています。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8#12345679)
-   [自分のサイトにWebSocketsサポートを受けるために、どのプランが必要ですか？](https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8#12345680)
-   [Cloudflareでは、WebSocketsをどのように使えますか？](https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8#12345681)
-   [ボリューム制限が、特定の数値でないのはなぜですか？](https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8#12345682)
-   [SSL経由でWebSocketsが使えますか？](https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8#12345683)
-   [Cloudflare WorkersはWebSocketsのプロキシをサポートしているか？](https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8#12345684)
-   [Cloudflare Webアプリケーションファイアウォール(WAF)はWebSocketsで動作しますか？](https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8#12345685)
-   [Cloudflareが予想する同時WebSockets接続数を自分のサイトが超えたら、どうなりますか？](https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8#12345686)
-   [テクニカルノート](https://support.cloudflare.com/hc/ja/articles/200169466-WebSockets%E3%81%A7Cloudflare%E3%82%92%E5%88%A9%E7%94%A8#12345687)

___

## 概要

WebSocketsはオープン接続で、クライアントとオリジンサーバー間で維持されます。WebSockets接続内では、クライアントとオリジンはセッションの再確立をしなくてもデータのやりとりができます。これで、WebSockets接続内でのデータ交換が加速化します。WebSocketsは、ライブチャットやゲームなどリアルタイムアプリケーションでよく利用されます。

[WebSockets](https://www.cloudflare.com/websockets/)とプロトコルの最も一般的な使用方法について説明します。

___

<table><tbody><tr><td><strong>Cloudflareプラン</strong></td><td><strong><br>同時接続のボリューム</strong></td><td><strong>使用事例</strong></td></tr><tr><td>無料</td><td>低</td><td>趣味またはデモサイト</td></tr><tr><td>Pro</td><td>標準</td><td>プロジェクトまたは小規模ビジネス</td></tr><tr><td>Business</td><td>高</td><td>操作に重要</td></tr><tr><td>Enterprise</td><td>カスタム</td><td>ミッションクリティカル＆重要なボリューム</td></tr></tbody></table>

___

## Cloudflareでは、WebSocketsをどのように使えますか？

Cloudflareを通じて、WebSocketsのトラフィックに送信するように要求される追加設定がありません。Cloudflareは、即時にオリジンにWebSocketsのプロキシを開始します。

___

## ボリューム制限が、特定の数値でないのはなぜですか？

CloudflareはEnterpriseプランのお客様向けに大容量のミッションクリティカルなWebSocketsアプリケーションを複数、提供します。

2014年に[WebSocketsサポート](https://blog.cloudflare.com/cloudflare-now-supports-websockets/)を導入して以来、Cloudflareはネットワークマップをほぼ３倍に広げ、ロケーションも28から150以上へと成長しました（2018年半ばで）。全てのロケーションで、コンピュートリソースと複数のTier 1帯域幅プロバイダーを追加しました。

Cloudflareは全てのお客様にWebSocketsを提供する能力に自信を持っておりますが、WebSockets接続を含め、プランレベルでリソースも配慮した割り当てを行なっています。したがってガイドラインから始め、当社お客様の採用から説明していきます。

当社は、インターネットをより良くする最新テクノロジーに可能性を与えます。これを行う最善の方法は、お客様が利用し、成長し、繁栄することです。

___

## SSL経由でWebSocketsが使えますか？

はい、Cloudflare SSLは、ネットワークを通してWebSockets トラフィックを完全にサポートしています。

___

## Cloudflare WorkersはWebSocketsのプロキシをサポートしているか？

はい、Cloudflare WorkersはWebSocketsのプロキシをサポートします。ただし、以下については、現在サポートしていません。

-   エンドポイント(クライアントまたはサーバー）として、WebSocketセッションで機能する
-   個々のメッセージの処理または修正

___

## Cloudflare Webアプリケーションファイアウォール(WAF)はWebSocketsで動作しますか？

初期のHTTP101リクエストは、他のWebSockets接続のように、WAF、レート制限、他のファイアウォール 機能を対象としていました。しかし、接続がいったん確立されると、WAFはそれ以上の監視を実行しません。

___

## Cloudflareが予想する同時WebSockets接続数を自分のサイトが超えたら、どうなりますか？

すぐには、何も。ガイドラインを超えて利用中に時折スパイクがありますが、Cloudflareは不必要な制限を適用しません。

繰り返しのスパイクや高い継続的な利用で、入力ダイアログが表示されます。アプリケーションについては、もう少し説明します。不正使用や攻撃を疑わない限り、お客様へ連絡せずに、アプリケーションの制限エラーを強制することはありません。

現在ご利用中のプランレベルで、リソース使用率にばらつきがあると主張されるお客様には、ニーズに合うプランレベルへのアップグレードをお願いするかもしれません。

___

## テクニカルノート

Cloudflareが新しいコードをグローバルネットワークにリリースする際、サーバーが再起動され、それによってWebSockets 接続が終了することがあります。
