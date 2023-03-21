---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115003014432-HTTP%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89
title: HTTPステータスコード
---

# HTTPステータスコード

## HTTPステータスコード

## 概要

以下のステータスコードは、CloudflareがHTTPレスポンスコードのインターネット標準トラックプロトコルをどのように解釈するかを説明しています。標準化の状態と、このプロトコルのステータスの最新版「Internet Official Protocol Standards」(STD 1)を参照してください。

デフォルトでキャッシュ可能なHTTPステータスコードがメソッド定義または明確なキャッシュコントロールで示されていなければ、Cloudflareでもキャッシュ可能であると考えられます。Cloudflareは、リクエストをキャッシュする方法のように、HTTPレスポンスをキャッシュします。Cloudflareはキャッシュするかどうかを決定する前に、Page Rule、edge TTL、オリジンヘッダーを考慮します。

___

Cloudflare HTTPステータスコードを説明する際の範囲は次の通りです：

### サーバー

リクエストを受信したり、レスポンスを送信する関係者全て。オリジンサーバー または中間サーバーのどちらか。

### オリジン/ホストサーバー

最終的な送信先サーバー。これは、実際にWebサイトのコンテンツをホストしているサーバーです。

### プロキシサーバー

オリジンサーバー とクライアント間に位置するサーバー。例として、Cloudflareはプロキシサーバーです。

### クライアント

リクエストを出す団体。通常、ブラウザのサイトにアクセスするエンドユーザーとは、サイトからリソースを要求するAPIクライアントや、ほかのユーザーであることがあります。

### バックエンド

接続は、クライアントとではなく、プロキシサーバーまたはオリジンサーバー間で行われます。

### User-Agent

リクエストの送信で使われるマシン。リクエストを行うブラウザまたは他のプログラムかもしれません（例：RESTful APIリクエスト)

### ペイロード

ヘッダーを含むレスポンスデータまたはリクエストデータ。レスポンス/リクエストボディ(本文)とも呼ばれます。

___

## HTTPステータスコード

-   [1xx Informational (情報)](https://support.cloudflare.com/hc/en-us/articles/115003013892/)
-   [2xx Success (リクエスト成功)](https://support.cloudflare.com/hc/en-us/articles/115003014192)
-   [3xx Redirect (リダイレクト)](https://support.cloudflare.com/hc/en-us/articles/115003011091/)
-   [4xx Client Error (クライアントエラー)](https://support.cloudflare.com/hc/en-us/articles/115003014512/)
-   [5xx Server Error (サーバーエラー)](https://support.cloudflare.com/hc/en-us/articles/115003011431/)

___

## 関連リソース

-   [Cloudflareが何をキャッシュするか、どうやってわかりますか？](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-CloudFlare-What-to-Cache-)
-   [エッジ TTLとはどういう意味ですか？](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings)
