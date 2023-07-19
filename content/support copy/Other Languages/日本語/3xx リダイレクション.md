---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3
title: 3xx リダイレクション
---

# 3xx リダイレクション

## 3xx リダイレクション

**概要**

3xxコードは、完全なリクエストリソースを取得するために、User-Agentが別のアクションに従わなければならないことを示唆するレスポンスのクラスです。

リダイレクトロケーションは、次のいずれで設定しなければなりません。

1.  レスポンスの`Location`ヘッダーフィールド、自動リダイレクトに便利
2.  訂正ロケーションへのハイパーリンク（任意）付きレスポンスペイロード

-   [300 Multiple (複数の候補があります)](https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3#code_300)
-   [301 Moved Permanently (恒久的に移転しました)](https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3#code_301)
-   [302 Found (別の場所で見つけました)](https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3#code_302)
-   [303 See Other (別の場所を探してください)](https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3#code_303)
-   [304 Not Modified (変更なしです)](https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3#code_304)
-   [305 Use Proxy (中継サーバーを通してください)](https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3#code_305)
-   [306 Switch Proxy (中継サーバーを切り替えます)](https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3#code_306)
-   [307 Temporary Redirect (一時的な転送です)](https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3#code_307)
-   [308 Permanent Redirect (恒久的な転送です)](https://support.cloudflare.com/hc/ja/articles/115003011091-3xx-%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3#code_308)

**300 Multiple Choices** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

クライアントが従う可能性があるリソースの複数選択。例えば、動画の異なるフォーマットや、異なる[拡張子](https://en.wikipedia.org/wiki/File_extensions)のlistfiles、[語義の曖昧性解消を提示するために用いることができます](https://en.wikipedia.org/wiki/Word_sense_disambiguation)。

**301 Moved Permanently** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

リクエストされたリソースの恒久的なURLのリダイレクト。ターゲットリソースに新しい恒久的URIが割り当てられていて、このリソースへの今後のリファレンスは全て、囲まれたURIのうち一つを使わなければなりません。

Cloudflareはこうしたレスポンスの生成ができるため、ページルールを使用してオリジンサーバー のリクエストを送信する必要がなくなります。Cloudflareがリダイレクトの生成をどのようにサポートするかについては、[Page RuleURL転送](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)をお読みください。

**302 Found (別称：Temporary Redirect)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

301リダイレクトと似ていますが、一時的な目的だけを使用の意図としています。User-Agentは、自動的に`Location`ヘッダーに従うかもしれませんが、現行のURIを、301として置き換えてはいけません。

Cloudflareは、こうしたレスポンスを生成することができるため、ページルールを使用してオリジンサーバー のリクエストを送信する必要がなくなります。Cloudflareがリダイレクトの生成をどのようにサポートするかについては、[Page RuleURL転送](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)をお読みください。

**303 See Other (HTTP/1.1以降)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

User-AgentはGETリクエストでこのリダイレクトに従ってはいけません。_注：リダイレクトのリソースが必ずしもリクエストされたものと同じではない点が、301とは異なります。_

-   `POST/DELETE` リクエストを使うことを意図とし、オリジンサーバーが受信したデータを正しく知らせて、適切なキャッシュ動作を許可します。
-   オリジナル303レスポンスは、キャッシングができませんが、2番目のリクエスト(`GET`)は別のURIにあるので、キャッシングできるかもしれません。

**304 Not Modified  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

リクエストされたリソースが利用可能で、キャッシュで有効であることを通知します。オリジンサーバーはリクエストが問い合わせたリソースの変更をしていません。クライアントは、オリジンサーバーに再度接続しなくても、特定のリソースのペイロードを受け取ることができます。このようにリクエストをリダイレクトし、保存されているリソースを使用します。304レスポンスを受信するキャッシュの要件は、[\[RFC7234\]のセクション4.3.4](https://tools.ietf.org/html/rfc7234#section-4.3.4) で定義されています。

このレスポンスの前に、クライアントが現在保存されているリソースがどれかを特定する、条件付きの GETリクエストまたはHEAD リクエストを送信し、現在保存されています。クライアントとサーバー間のデータ量を減らせるように、サーバーは、最新版としてクライアントがこのリソースを使用することを「OK」としています。

-   メッセージ本文なし

-   ミラー化された200レスポンスの前に送信されたヘッダーのいずれかを含む必要があります：`Cache-Control、Content-Location、Date(日付)  ETag, Expires（有効期限）`または`Vary`。

古くなったCloudflareに対してリクエストが出他ことを受けて、オリジンで再検証が必要となる場合、Cloudflareは304レスポンスを送信し、オリジンでバージョンと一致するキャッシュでバージョンを確認します。レスポンスには、`CF-Cache-Status: REVALIDATED` ヘッダーが含まれます。そして、Cloudflareが`If-Modified-Since` ヘッダーを使って、バージョンを確認します。詳しい詳細についてはこちらをご覧ください：[ETag ヘッダー](https://support.cloudflare.com/hc/en-us/articles/218505467)

**305 Use Proxy (非推奨)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

リクエストはオリジンの代わりに、Locationヘッダーで指定されるプロキシURIを通じて実行しなければなりません。このステータスコードはセキュリティのリスクのため、非推奨となっています。

**306 Switch Proxy (非推奨)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

以下のリクエストが出さなければならない通知が指定されたプロキシにダイレクトされなければなりません。

**307 Temporary Redirect** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

302リクエストに似ているリダイレクトは、リクエストメソッド（例：GET, POST）を除いて、自動的にリダイレクトに従う場合、オリジナルで使われたリクエストと異なっていなければなりません。

-   User-Agentが自動的に`Location`ヘッダーに従いますが、オリジナルURIに置き換えられるものではありません

**308 Permanent Redirect (**[**RFC 7538**](https://tools.ietf.org/html/rfc7538#section-3)**)**

301に似ている恒久的リダイレクトは、リクエストメソッド（例：GET, POST）を除いて、自動的にリダイレクトに従う場合、オリジナルで使われたリクエストと同じであってはいけません。

-   User-Agentは自動的に`Location` ヘッダーに従う必要があります。
-   User-AgentがオリジナルURIをLocation またはペイロードにある更新済みのものと置き換える必要があります。
