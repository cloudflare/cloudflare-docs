---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-
title: 4xx Client Error (クライアントエラー)
---

# 4xx Client Error (クライアントエラー)

**概要**

4xxコードは通常、クライアント側で問題を特定するエラーレスポンスです。ネットワークの問題となる可能性があります。

-   あらゆるリクエストメソッドにレスポンスとして使用することができます

-   オリジンサーバー には`HEAD`リクエストの例外がついた、User-Agentが表示しなければならない説明を含んでいる必要があります

Cloudflareがオリジンから直接エラーを出します。

-   [400 Bad Request  （不正なリクエストです）](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_400)
-   [401 Unauthorized (無承認です)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_401)
-   [402 Payment Required (有料です）](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_402)
-   [403 Forbidden (アクセス権がありません)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_403)
-   [404 Not Found（見つかりませんでした）](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_404)
-   [405 Method Not Allowed (そのメソッドは不可です)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_405)
-   [406 Not Acceptabl (受理不可です)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_406)
-   [407 Authentication Required  (認証が必要です)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_407)
-   [408 Request Timeout  (時間切れです)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_408)
-   [409 Conflict (競合しています)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_409)
-   [410 Gone (消滅しています)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_410)
-   [411 Length Required (長さを指定してください)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_411)
-   [412 Precondition Failed (前提条件が満たされていません)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_412)
-   [413 Payload Too Large (リクエストデータが大きすぎです)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_413)
-   [414 URI Too Long (URIが長すぎます)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_414)
-   [415 Unsupported Media Type (そのメディアは使えません)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_415)
-   [417 Expectation Failed (Expectヘッダで失敗しました)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_417)
-   [429 Too Many Requests (リクエストが多すぎます)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_429)
-   [451 Unavailable For Legal (法的理由で利用不可です)](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_451)
-   [499 Client Close Request (クライアントがリクエストを切断）](https://support.cloudflare.com/hc/ja/articles/115003014512-4xx-Client-Error-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%A8%E3%83%A9%E3%83%BC-#code_499)

**400 Bad Request**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

サーバーはクライアントエラーと考えられる何か(例：不正なリクエストシンタックス、無効なリクエストメッセージフレーミング、不正なリクエストルーティング)があるため、リクエストが処理できません。

**401 Unauthorized (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

リクエストは、適切な認証情報と送信されませんでした

-   サーバーは、[セクション4.1](https://tools.ietf.org/html/rfc7235#section-4.1)に準じて、`WWW-Authenticate`ヘッダーフィールドの形式で、少なくともチャレンジ一つと送られなければなりません。
-   クライアントは、認証情報が同じ二つ目のリクエストを送信するかもしれません。そして、チャレンジが一つ前のものと同一だった場合、クライアントがどの認証情報を必要としているか見つける手伝いをするためにサーバーがエンティティを提供します。

**402 Payment Required** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

RFC 基準でまだ実行されていませんが、今後の使用のために保留されています

**403 Forbidden** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Cloudflareのブランディングがない403が表示された場合、これはCloudflareからではなく、オリジンWebサーバーから直接返されます。そして、一般的にサーバーの許可ルールに関連しています。このエラーの

最大の原因は：  
1\. 設定した許可ルール、または設定した.htaccessルールでのエラー  
2.Mod\_securityルール  
3\. IP拒否ルール

Cloudflareはサーバーに直接アクセスできないので、403 エラーを解決するためにホスティングプロバイダーに連絡してください。[CloudflareのIP](https://www.cloudflare.com/ips)がブロックされていないことを必ず確認してください。

Cloudflareは、リクエストがオレンジ色のクラウドがついたCloudflareドメインを有効にするデフォルトのWAFルールか、特定のゾーンを有効にするWAFルールのどちらかに違反した場合、403レスポンスを提供します。[Webアプリケーションファイアウォールの機能とは？](https://support.cloudflare.com/hc/en-us/articles/200172016)を参照してください。Cloudflareは、Cloudflareがカバーしていない、またはSSL証明書がアップデートしないサブドメイン/ドメインへのSSL接続の403 Forbidden レスポンスを提供します。

レスポンス本文にCloudflareのブランディングを含む403レスポンスが表示されている場合、これは、セキュリティ機能の多くとともに返されるHTTPレスポンスコードです。

-   Webアプリケーションファイアウォール チャレンジとブロックページ
-   基本的な保護レベルチャレンジ
-   1xxx Cloudflareエラーコードのほとんど
-   ブラウザ保全性チェック
-   第二レベルのサブドメインにアクセス使用とする場合（例-`*.*.example.com`)Cloudflareが発行する証明書を使うCloudflareを通して、HTTP 403エラーがブラウザに表示されます。これは、ホスト名が証明書に示されていないためです。

ご質問がある場合は、Cloudflareサポートに連絡してください。その際は表示されているメッセージのスクリーンショットかページ上のテキストを全てコピーしたものをサポートチケットと一緒にご提示ください。

**404 Not Found** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

オリジンサーバーが有効になっていたか、リクエストされたか、リソースを見つけられませんでした。通常、これはホストサーバーがリソースを見つけられなかったということを意味します。このエラーのさらに恒久的なバージョンを提供するには、410エラーコードを使用しなければなりません。

こうしたエラーは、たいてい誰かがあなたのサイトでURLの入力ミスをした時か、他のページから破損したリンクがある場合か、以前存在していたページが移動させられたか、削除された場合または検索エンジンがあなたのサイトのインデックスを作成する場合に発生します。典型的なサイトでは、こうしたエラーがページビュー全体の3%を占めていますが、Google Analyticsのような従来の分析プラットフォームで追跡されないことがよくあります。

Webサイト所有者は通常、このエラーが生成された際に提供するカスタムページを実装します。例えば、[Apacheではカスタム404ページを実装します](https://www.digitalocean.com/community/tutorials/how-to-create-a-custom-404-page-in-apache)。

Cloudflareは、お客様のWebサイトに404を生成しませんが、オリジンサーバー からリクエストのみをプロキシします。Cloudflareが提供するサイトに404が表示される場合は、ホスティングプロバイダーにヘルプの問い合わせをしてください。

**405 Method Not Allowed** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

オリジンサーバー はリクエストされたリソースを認識していますが、使用されるリクエストメソットがサポートされていません。

-   オリジンサーバー は、リソースでサポートされているターゲットのリストとともに`Allow`ヘッダーを提供しなければなりません。

例としては、変更できないリソースのPOSTで、 これはGETだけを受け入れます。

**406 Not Acceptable** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

リソースは、以前設定されたネゴシエーションヘッダーに準拠しているオリジンでは利用できません。（例：`Accept-Charset`と`Accept-Language`ヘッダー経由）

このステータスコードは、このエラーを生成する代わりにUser-Agentに優先度の低いメソッドを提供するだけで、置き換えることができます。

**407 Authentication Required  (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

クライアントは、リクエストと要求された認証を送信できませんでした。

**408 Request Timeout**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

オリジンサーバー は妥当な時間内でリクエスト全部を受信しませんでした。

-   サーバーは待機し、接続を継続しないことを意味します。

-   通常、サーバーは「クローズ」コネクションオプションの使用を選ぶため、あまり使用されません。

**409 Conflict** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

リソースの現在の状態と競合しているため、リクエストが完了しませんでした。通常、複数のクライアントが同様のリソースを編集しようと施工するPUTリクエスト上で発生します。

-   サーバー_は_クライアントが競合の原因を認識するために十分な情報を含んだペイロードを生成しなければなりません。
-   クライアントはリクエストを再試行できます、そして再度行わなければなりません。

Cloudflareは、エラー1001: DNS Resolution Error[を示す409](https://support.cloudflare.com/hc/articles/360029779472#error1001)レスポンスを生成します。

**410 Gone** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

要求されたリソースは、オリジンで恒久的に消滅します。

-   リソースを参照するリンクを削除するべきだとサーバーから提案が出ています。
-   サーバーは、404レスポンスではなくこのステータスコードを使用する資格を持っていないか、特定の期間にこのレスポンスを持つことが要求されていません。

**411 Length Required** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

クライアントはヘッダーのリクエスト本文にある`Content-Length`を定義しませんでした。そして、これによりリソースの取得が必要となります。

-   クライアントは、ヘッダーフィールド追加後、リクエストを再送信するかもしれません。

**412 Precondition Failed  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

リソースがクライアントが指定した条件を満たさなかったので、サーバーはリクエストを拒否しました。

バージョン管理の例として、クライアントが既存のリソースを修正します。そして、 クライアントがリソースをダウンロードした日付と一致する`If-Unmodified-Since`ヘッダーを設定し、編集します。この日付の後、そして修正をアップデートをする前に、リソースが修正された場合（別のクライアントが行うことが多い）、クライアントが`If-Unmodified-Since`で日付を設定した後に最終編集日を編集するので、このレスポンスが生成されます。

Cloudflareはこのレスポンスを提供します。詳細情報はこちらで: [ETag ヘッダー](https://support.cloudflare.com/hc/en-us/articles/218505467)

**413 Payload Too Large**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

クライアントから送信されたペイロードが受信したいサーバーよりも大きいため、リクエスト処理がサーバーから拒否されました。サーバーは接続と切断するオプションがあります。

-   この拒否が一時的にしか発生しない場合、サーバーは`Retry-After`ヘッダーを送信して、いつクライアントがリクエストを再試行するべきかを指定します。

**414 URI Too Long** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

URIが長すぎるため処理できなかったサーバーからの拒否。例えば、クライアントがPOSTの後に並外れて長いURIが付いたGETリクエストを試行している場合、これはセキュリティリスクと考えられ、414が生成されます。

Cloudflareが、32KBより長いURIへのこのレスポンスを生成します。

**415 Unsupported Media Type** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

現行のペイロードの形式を処理するサーバーからの拒否。この問題を認識し、解決する方法が、クライアントのリクエストで送信された`Content-Type`と`Content-Encoding`ヘッダーを調べます。

**417 Expectation Failed** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

サーバーが、クライアントのリクエストの`Expect`ヘッダーで指定される要件を満たせませんでした。

**429 Too Many Requests (**[**RFC6585**](https://tools.ietf.org/html/rfc6585)**)**

クライアントが、サーバーにしたがって指定された時間内に送信したリクエストの数が多すぎです。「レート制限」と呼ばれることもよくあります。特定期間が経過した後に、リクエスターが再試行できるようにする情報とともに、サーバーがレスポンスします。

Cloudflareがこのステータスコードを生成し、リクエストが[レート制限](https://www.cloudflare.com/rate-limiting/)されているときにこのコードを送信します。サイト訪問者がこうしたエラーを受信する場合、[レート制限分析](https://support.cloudflare.com/hc/articles/115001635128#7Cy9dajZBWM5pm9aIP5mMD)で、これが表示されます。

**451 Unavailable For Legal Reason (**[**RFC7725**](https://tools.ietf.org/html/rfc7725)**)**

サーバーは、法的措置のためにリソースを配信できません。

通常、検索エンジン（例：Google)とISP (例：ATT)がこのレスポンスコードの影響を受けるのであり、オリジンサーバーが受けるのではありません。

-   レスポンスは、法的要求の詳細とともにレスポンス本文にある説明を含む必要があります。

**499 Client Close Request (クライアントがリクエストを切断）**

Nginx固有のレスポンスコードであり、サーバーがリクエストをまだ処理しているうちに、クライアントが接続を閉じる時間を示します。これはサーバーがステータスコードを送り返すことができないようにします。

-   これは、[Enterpriseログのシェア](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-REST-API)とEnterpriseプランのお客様のためのステータスコード分析に示されます。
