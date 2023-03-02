---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115003014192-2xx-Success-%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E6%88%90%E5%8A%9F-
title: 2xx Success (リクエスト成功)
---

# 2xx Success (リクエスト成功)

## 2xx Success (リクエスト成功)

**概要**

2xxコードは正常なレスポンスを示します。これは、クライアントからの要求されたアクションを正しく受信、理解、受理したことを意味します。

-   [200 OK (成功です)](https://support.cloudflare.com/hc/ja/articles/115003014192-2xx-Success-%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E6%88%90%E5%8A%9F-#code_200)
-   [201 Created (作成完了です)](https://support.cloudflare.com/hc/ja/articles/115003014192-2xx-Success-%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E6%88%90%E5%8A%9F-#code_201)
-   [202 Accepted (受理されました)](https://support.cloudflare.com/hc/ja/articles/115003014192-2xx-Success-%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E6%88%90%E5%8A%9F-#code_202)
-   [203 Non-Authoritative (非公式です)](https://support.cloudflare.com/hc/ja/articles/115003014192-2xx-Success-%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E6%88%90%E5%8A%9F-#code_203)
-   [204 No Content (コンテンツがありません)](https://support.cloudflare.com/hc/ja/articles/115003014192-2xx-Success-%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E6%88%90%E5%8A%9F-#code_204)
-   [205 Reset Content (コンテンツをリセットしてください)](https://support.cloudflare.com/hc/ja/articles/115003014192-2xx-Success-%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E6%88%90%E5%8A%9F-#code_205)
-   [206 Partial Content (部分的に受理しました)](https://support.cloudflare.com/hc/ja/articles/115003014192-2xx-Success-%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E6%88%90%E5%8A%9F-#code_206)

**200 OK** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

誰もが好きなレスポンス：リクエストが成功しました。

レスポンスペイロードは使用されるリクエストメソッドによって異なります。対応するリクエストメソッドに対するレスポンス本文は以下の通りです。

-   GET - リクエストされたリソースに対応するヘッダーとデータ
-   HEAD - 実際のデータ抜きでリクエストされたリソースに対応するヘッダーのみ
-   POST - アクションから取得したステータスまたは結果

200レスポンス は、常にペイロードが_なくてはなりません_が、義務ではありません。このようにオリジンサーバーの長さがゼロである200を生成するかもしれません。EFC規格に準拠するために、204はこうした場合（(例外はCONNECT)で生成されなければなりません。

デフォルトで、プロキシサーバーとブラウザがキャッシュできるようになっています。Cloudflareの[キャッシュ制御で特定されていない場合](https://support.cloudflare.com/hc/en-us/articles/202775670)、このレスポンスと[静的リソース](https://support.cloudflare.com/hc/en-us/articles/200172516)をエッジにおいてキャッシュのデフォルトを２時間で行います。

**201 Created (作成完了）****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

リクエストが正常に完了し、複数のリソースが新しく作成されました。新しいリソースのロケーションは、LocationヘッダーフィールドまたはリクエストのURIのどちらかで提示されることが想定されます。通常、ペイロードは新しく生成されたリソースのリンクに記述し、参照します。

-   201レスポンスのETagやLast-Modifiedといった検証ヘッダーフィールドの意味と目的について話し合うために[RFC 7231セクション7.2](https://tools.ietf.org/html/rfc7231#section-7.2)を参照してください。

**202 Accepted (受理済み)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

リクエストが受理され、現在オリジンサーバーで処理中です。サーバーの仕様によっては、実際にリクエストが実行中でもクライアントがリクエストを実行するかしないか、まだ決定していません。

**203 Non-Authoritative information (非公式情報）****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

リクエストを説明する200ステータスコードの任意の置き換えは成功でしたが、オリジンサーバー から直接発生したものではありませんでした。オリジナルのオリジンサーバーからのレスポンスはプロキシまたは中間サーバーで変更されています。例えば、203を使って、クライアントにリソースがプロキシでキャッシュされたということを通知することができ、今後同様のリクエストが同一のリソースでそのキャッシュサーバーをヒットする可能性も、ヒットしない可能性もあります。他にも、ローカルオリジンサーバーにだけ適用可能なヘッダーが削除される場合の例があります。

-   デフォルトで、キャッシュ可能なレスポンスですが、Cloudflareはキャッシュしません。
-   Cloudflareが生成することはありませんが、存在する場合は他のプロキシからプロキシを行うことはあります。Cloudflareはオリジンレスポンスを尊重しますが、例外もあります：[CloudflareがHTTPリクエストヘッダー](https://support.cloudflare.com/hc/en-us/articles/200170986)をどのように処理するか

**204 No Content (コンテンツなし) ([RFC7231](https://tools.ietf.org/html/rfc7231))**

要求されたアクションが、オリジンサーバーで正しく実行されました。一般的な使用事例は、ドキュメントエディターで「保存する」アクションがオリジンサーバーに送信されますが、ペイロードはクライアントに送り返されるために必要となります。保存が完了したことをユーザーに警告したい場合もまだあります。

-   204レスポンスを返す時に、ペイロードが存在してはいけません。
-   デフォルトで、キャッシュ可能なレスポンスですが、Cloudflareはキャッシュしません。

**205 Reset Content** **(コンテンツをリセット)(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

オリジンサーバーは、リクエストの前にクライアントがオリジナルのステートへの表示を再設定することを提案します。フォームや他の入力送信でよく用いられたのがペイロードで、リクエストで送信されます。オリジンサーバーが正常に動作し、今、追加の送信が許可されることをブラウザに通知しています。

-   205レスポンスは、ペイロードを返してはいけません。直後にクローズまたはゼロバイトのレスポンスが続くContent-Lengthが0、またはチャンクドレスポンスのみが許可されます。

**206 Partial Content (**[**RFC 7233**](https://tools.ietf.org/html/rfc7233)**)**

リソースの一部に対するリクエストが完了し、今ペイロードにあります。リクエストは次のいずれかの範囲を示す必要があります。

1.  サイズとともにContent Rangeを含む、HTTPヘッダーの単一の一部リクエストです。（レスポンスヘッダーにある場合は、ペイロードのoctetsと全く等しいはずです）例： `Content Range: bytes 21010-47021/47022`
2.  複数のチャンクと`コンテンツタイプ：HTTPヘッダーのmultipart/byteranges` とContent Rangeフィールドを含む個々のpartですが、レスポンス**HTTPヘッダー**には_ありません_。[RFC 7233 Section 4.1](https://tools.ietf.org/html/rfc7233%23section-4.1)区で指定されている通り、区切り文字も必要となります。 例


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> HTTP/1.1 206 Partial Content Date: Wed, 15 Nov 1995 06:25:24 GMT Last-Modified: Wed, 15 Nov 1995 04:58:08 GMT Content-Length: 1741 Content-Type: multipart/byteranges; boundary=THIS_STRING_SEPARATES --THIS_STRING_SEPARATES Content-Type: application/pdf Content-Range: bytes 500-999/8000 ...the first range... --THIS_STRING_SEPARATES Content-Type: application/pdf Content-Range: bytes 7000-7999/8000 ...the second range --THIS_STRING_SEPARATES--</span></div></span></span></span></code></pre>{{</raw>}}

206は、大きめのファイル処理をするクライアントにとって便利なものです。こうしたファイルの処理には、複数の同時ストリームでダウンロードを分割したり、中断する必要があるからです。
