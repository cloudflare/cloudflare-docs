---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115003013892-1xx-Informational-%E6%83%85%E5%A0%B1-
title: 1xx Informational (情報)
---

# 1xx Informational (情報)

## 1xx Informational (情報)

**概要**

1xx コードは接続ステータス情報を共有するための中間レスポンスです。最終リクエストまたはレスポンスアクションを想定したものではありません。サーバーからの要件：

-   ステータス行の後にある最初の空行で全て終了するレスポンス

-   HTTP 1.0を使用していないオリジンサーバーは、絶対にHTTP1.0クライアントに対して1xxレスポンスを送信しないこと

Cloudflareは、こうしたレスポンス全てを転送し、このレスポンスを生成することはありません。

-   [100 Continue (続行します)](https://support.cloudflare.com/hc/ja/articles/115003013892-1xx-Informational-%E6%83%85%E5%A0%B1-#code_100)
-   [101 Switching Protocols (プロトコルを切り替えます)](https://support.cloudflare.com/hc/ja/articles/115003013892-1xx-Informational-%E6%83%85%E5%A0%B1-#code_101)
-   [102 Processing (処理中)](https://support.cloudflare.com/hc/ja/articles/115003013892-1xx-Informational-%E6%83%85%E5%A0%B1-#code_102)

**100 Continue（継続） ([RFC7231](https://tools.ietf.org/html/rfc7231))**

レスポンス本文を送信する最初のリクエスト確認をすること。オリジンサーバー が（リクエストヘッダーに基づいて）リクエストを受け取るようになっていること。クライアントが通常レスポンス本文を送る前に、送り返されること。クライアントが不要なデータや使用できないデータの送信をしないようになること。サーバーからの要求：クライアントが`Expect: 100-continue`ヘッダーを送信した場合、サーバーはすぐに`100 Continue`とインプットストリームからの読み取り継続、または他のレスポンスコードの送信のどちらかですぐに応答しなければなりません。CloudflareではKeep-Alive接続を使用するため、このレスポンスは必要ではありません。

**101 Switching Protocols ([RFC7231](https://tools.ietf.org/html/rfc7231))**

オリジンサーバー がクライアントのリクエストを受け入れて、プロトコルを切り替えます。クライアントリクエストは、ヘッダーフィールドの`アップグレード`を含むか、この接続で使われるアプリケーションプロトコルで変更があります。アップグレードヘッダーフィールドを使用している場合、サーバーは現行使用されているプロトコルよりもクライアントの優先順位リストで高い位置にあるプロトコルにアップグレードすることに同意しています。オリジンサーバーは、接続を切り替えられた新しいプロトコルを示す`アップグレード`ヘッダーフィールドにも応答しなければなりません。この切り替えはクライアントとサーバーの両方に有利であると想定されます。最も一般的な使用事例は、WebSocketsと使用するものです。CloudflareのWebSocketsに関する情報は、[CloudflareはWebSocketsをサポートする](https://blog.cloudflare.com/cloudflare-now-supports-websockets/)を参照してください。

**102 Processing ([RFC2518](https://tools.ietf.org/html/rfc2518))**

サーバーはクライアントから完全なレスポンスを受信しましたが、もう少し処理に時間がかかると予想されます（例：20秒未満）。サーバーはリクエストが完了したら最終レスポンスを送信しなければなりません。HTTP 1.1以降のみ使用できます。

Cloudflareは、100秒以内にレスポンスを受信しない場合、102秒以降は[エラー 522: 接続タイムアウト](https://support.cloudflare.com/hc/articles/115003011431#522error)が生成されます。 [エラー524:タイムアウトエラー](https://support.cloudflare.com/hc/articles/115003011431#524error)を避けるために、102レスポンスが使用されるかもしれません。
