---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-
title: CloudflareのPage Rulesを理解した上で設定する（Page Rulesチュートリアル）
---

# CloudflareのPage Rulesを理解した上で設定する（Page Rulesチュートリアル）

## CloudflareのPage Rulesを理解した上で設定する（Page Rulesチュートリアル）

_Page Ruleでは、リクエストが定義されたURLパターンの1つに一致する時は、いつでも特定のアクションがトリガーされます。Page Ruleの作成方法と利用できる様々な設定について説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-#h_5a7SkOsNo5d5LE7e9IRiz)
-   [はじめに](https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-#h_7rzfw5kI8cqu4VKur6Mnur)
-   [Page Ruleの作成](https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-#h_38Gq7mduJiXIjpVLxp3q19)
-   [Page Ruleの編集](https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-#h_2WLkFHGqwlRgnZg3i0fl9I)
-   [ワイルドカードの一致と参照について](https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-#h_6N5SySNYCjYUUnCKnC1Ea6)
-   [Page Ruleの設定の概要](https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-#h_18YTlvNlZET4Poljeih3TJ)
-   [既知の問題](https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-#h_5lzcszkjqrZ2bZpZOtMQoP)
-   [その他の詳細](https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-#h_2VORFoOUImLy7rpTgEWYLM)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/218411427-Cloudflare%E3%81%AEPage-Rules%E3%82%92%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E4%B8%8A%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B-Page-Rules%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB-#h_7hlLS0cORjDJ2NCQqZTp8X)

___

## 概要

Page Ruleを定義し、URLパターンが一致するたびに、複数のアクションをトリガーすることができます。Page Ruleは、**Rules**アプリの**Page Rules**タブで利用できます。

ページルール数で許可されているのデフォルトの上限は、以下の通り、ドメインプランによって異なります。

| **プラン** | **許可されているページルール数の上限** |
| --- | --- |
| Free | 3 |
| Pro | 20 |
| Business | 50 |
| Enterprise | 125 |

Freeプラン、Proプラン、Businessプランのドメインに関しては、（最大100まで）[追加のルールを購入](https://www.cloudflare.com/features-page-rules/)できます。

___

## はじめに

ページルールの基本的な2つの動作を理解しておくことが重要です：

-   優先度が高く、一致しているページルールだけがリクエストに対して有効となります。
-   Cloudflareのダッシュボードでは、ページルールは降順で優先順位が付けられます。最も順位が高いルールが最上部に表示されます。

Page Ruleは、次のフォーマット（5つのセグメントから構成される）に基づくURLパターンと一致します:<scheme>://<hostname><:port>/<path>?<query\_string>

この4つのセグメントから成るURLの例は以下のようになります：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.example.com:443/image.png?parameter1=value1</span></div></span></span></span></code></pre>{{</raw>}}

_スキーム_と_ポート_のセグメントは任意です。省略した場合、_スキーム_が _http://_プロトコルと_https://_ プロトコル両方と一致します。_ポート_を特定しない場合、ルールはすべてのポートと一致します。

最後に、Page Ruleはいつでも無効にできます。ルールが無効になっている間、アクションはトリガーされませんが、ルールは**Rules**アプリの**Page Rules**タブで表示され、編集可能です。そしてドメインで許可されるルール数にカウントされます。_「下書きとして保存」_オプションでデフォルトで無効になるPage Ruleを作成できます。

___

## Page Ruleの作成

ページルール作成の手順：

1.  Cloudflareダッシュボードにログインします。
2.  Page Ruleを追加するドメインを選択します。
3.  **Rules**アプリをクリックします。
4.  **Page Rules**タブで**、****Page Ruleを作成する**をクリックします。_<あなたのドメイン>のPage Ruleを作成する_ダイアログが開きます。
5.  **「URLが一致する場合（If the URL matches）」**で、ルールに一致するURLまたはURLパターンを入力します。[_ワイルドカードの一致に関する詳細を読む_](https://support.cloudflare.com/hc/ja/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_6N5SySNYCjYUUnCKnC1Ea6)
6.  次に、「**設定を次のようにする（Then the settings are：）**」で、「**設定を追加する（+Add a Setting）**」をクリックし、ドロップダウンから希望する設定を選択します。ルール1つに対して設定を2つ以上含めることができます。セッティングについては[以下の概要](https://support.cloudflare.com/hc/ja/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ)をご覧ください。
7.  **Order** （順序）ドロップダウンで、_最初、最後_または_カスタム_で、希望する順序を特定します。
8.  保存するには、次のオプションを1つクリックします。
    -   **Save as Draft**（下書きとして保存）でルールを保存し、無効のままにします。
    -   **Save and Deploy**（保存して展開する）でルールを保存し、すぐに有効にします。

___

## Page Ruleの編集

既存のルールの変更方法：

1.  Cloudflareダッシュボードにログインします。
2.  Page Ruleを編集するドメインを選択します。
3.  **Rules**アプリをクリックします。
4.  **Page Rules**タブで、編集するルールを見つけます。
5.  必要な変更を行うために、次のようにします。
    -   ルールを有効/無効にするには、**On/Off**を切り替える。
    -   URLパターン、設定、順番を変更するために、「**編集**」ボタン（レンチアイコン）をクリックする。ダイアログで、変更したい情報を入力する。
    -   ルールを削除するために、「**削除**」ボタン（×アイコン）をクリックして「**確認**」ダイアログで「 **OK**」をクリックすると確認できます。

___

## ワイルドカードの一致と参照について

URLセグメントにアスタリスク記号 (\*) を使って特定のパターンと一致させることができます。例えば、


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/t*st</span></div></span></span></span></code></pre>{{</raw>}}

は、以下と一致します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/test</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/toast</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/trust</span></div></span></span></span></code></pre>{{</raw>}}

_example.com/foo/\*_ は、example.com/fooと一致しません。 しかし、 _example.com/foo\*_ は一致します。

### 役に立つヒント

-   _http_と_https_の両方と一致させるには、_example.com_とするだけです。_\*.example.com_にする必要はありません。
-   ドメインにある全ページを一致させるには、 _example.com/\*_と書き込みます。_example.com_ だけでは、うまくいきません。
-   ドメインにある全ページとそのサブドメインに一致させるには、\*_example.com/\*_と書き込みます。_example.com_ だけでは、うまくいきません。
-   Page Rule URLのワイルドカード （\*）は、文字が存在しない場合でも一致し、クエリー文字列を含むURLの任意の部分を含めることがあります。

### ワイルドカードの一致を参照

_$X_構文を使って、後で一致するワイルドカードを参照することができます。_X_は、globパターンのインデックスを示します。したがって、$1は最初のワイルドカードの一致を表し、$2は二番目のワイルドカードの一致を表すことになります。

これは、_転送 URL_で特に便利なものです。例：

以下を転送することにします：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://*.example.com/*</span></div></span></span></span></code></pre>{{</raw>}}

転送先：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/$1/$2.jpg</span></div></span></span></span></code></pre>{{</raw>}}

このルールが一致するのは：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://cloud.example.com/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

これは次に転送されることになります：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/cloud/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

転送 URLで、_$_の文字をそのまま使うには、先頭にバックスラッシュ（\\）を追加して、_\\$_とエスケープさせます。

___

## Page Ruleの設定の概要

リクエストがページルールで定義されているURLパターンと一致すると、設定でCloudflareのアクションがコントロールされます。設定を使うと、いくつかのダッシュボードアプリで、複数のCloudflare機能を有効/無効にすることができます。以下の点に注意してください：

-   設定によっては、Pro、Business、Enterpriseドメインプランのいずれかが必要な場合があります。
-   1つのルールについて複数の設定を行い、ルールがトリガーされた時に適用することができます。

以下は、利用可能な設定の全リストで、**Cloudflare Page Rules** UIで表示される順序を示しています。

| 
**設定**

 | 

**説明**

 | 

**プラン**

 |
| --- | --- | --- |
| 

HTTPSの常時使用

 | 

**Cloudflare SSL/TLS**アプリにある「**Edge証明書**」タブの**[常時HTTPSを使用する](/ssl/edge-certificates/additional-options/always-use-https)**機能をOnまたはOffにします。有効にすると、301リダイレクトを通して、_http://_URLが_https://_に変換されます。

この選択肢がまだ表示されるなら、アクティブな**Edge証明書**がないということです。

 | 

-   すべて

 |
| 

Auto Minify

 | 

どのファイル拡張子が自動的に縮小されるかを示します。[詳細を見る](https://support.cloudflare.com/hc/articles/200168196)。

 | 

-   すべて

 |
| 

HTTPSの自動リライト

 | 

**Cloudflare SSL/TLS**アプリにある「**エッジ証明書**」タブの**HTTPS の自動リライト**機能をOnまたはOffにします。[詳細を見る](/ssl/edge-certificates/additional-options/automatic-https-rewrites)。

 | 

-   すべて

 |
| 

Browser Cache TTL（ブラウザキャッシュTTL）

 | 

クライアントブラウザでキャッシュされるリソースが有効な状態を維持できる時間を管理します。Cloudflare UIとAPIの両方で、Enterpriseプランではないお客様が**ブラウザCache TTL**を_0_に設定することは禁止されています。[詳細を見る](/cache/how-to/edge-browser-cache-ttl/)。

 | 

-   すべて

 |
| 

Browser Integrity Check

 | 

訪問者のブラウザで、通常スパマーと特定のボットに関連づけられるヘッダーを調べます。[詳細を見る](https://support.cloudflare.com/hc/articles/200170086)。

 | 

-   すべて

 |
| 

Bypass Cache on Cookie

 | 

リクエストにあるCookie名に対して正規表現が一致する場合は、オリジンサーバーからキャッシュをバイパスし、リソースをフェッチします。

この設定と_Cache On Cookie_設定を同じPage Ruleに追加する場合、_Cache On Cookie_は_Bypass Cache on Cookie_より優先されます。

_下記の追加詳細で、限定的な正規表現のサポートについてご覧ください。_

 | 

-   Business
-   Enterprise

 |
| 

デバイスタイプ別にキャッシュする

 | 

訪問者のデバイスタイプに基づき、キャッシュするコンテンツを分けます。[詳細を見る](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only)。

 | 

-   Enterprise

 |
| 

Cache Deception Armor

 | 

静的アセットをキャッシュしておく一方で、Web Cache Deception攻撃から保護します。この設定では、URLの拡張子が戻された_Content-Type_と一致しているか検証します。[詳細を見る](/cache/cache-security/cache-deception-armor/)。

 | 

-   すべて

 |
| 

キャッシュキー

 | 

_カスタムキャッシュキー_とも呼ばれています。

キャッシュするリソースを決定する際、どの変数を含めるかを具体的に管理します。お客様は、URLだけではなく他の要素にも基づいてキャッシュするものを決定できます。[詳細を見る](/cache/how-to/cache-keys/)。

 | 

-   Enterprise

 |
| 

キャッシュレベル

 | 

選択したオプションに基づき、カスタムCachingを適用します。

**バイパス** \-Cloudflareはキャッシュしません。

**クエリ文字列なし** - クエリ文字列がない場合、キャッシュからリソースを配信します。

**クエリ文字列を無視する**\-クエリ文字列に関係なく、全員に同じリソースを配信します。

**標準 -** クエリ文字列を持つ静的コンテンツ全てをキャッシュします。

**すべてをキャッシュする**\- すべてのコンテンツを静的コンテンツとして扱い、[Cloudflareのデフォルトでキャッシュされたコンテンツ](/cache/concepts/default-cache-behavior#default-cached-file-extensions)を超えて、すべてのファイルタイプをキャッシュします。Page Ruleで **エッジCache TTL**を設定している場合を除き、オリジンWebサーバーからのCacheヘッダーを尊重します。**エッジCache TTL**\>_0__と組み合わせると、_**すべてをキャッシュする**では、オリジンWebサーバーのレスポンスからのCookieを削除します。  


 | 

-   すべて

 |
| 

Cache on Cookie (Cookieのキャッシュ)

 | 

Cookie名に一致する正規表現に基づいて、_すべてをキャッシュする_ オプション（_キャッシュレベル_設定）を適用します。

この設定と_Bypass Cache on Cookie_（Cookieのキャッシュのバイパス）の両方をPage Ruleに追加する場合、 _Cache On Cookie_が_Bypass Cache on Cookie_より優先されます。

 | 

-   Business
-   Enterprise

 |
| 

ステータスコードによるCache TTL

 | 

Enterpriseのお客様は、オリジンWebサーバーの応答ステータスに基づいてCache Time to Live (TTL)を設定できます。Cache TTLは、有効期限が切れていると判定されたり、Cacheから破棄される前にCloudflareネットワーク内のリソース期間を参照します。ステータスコードは、リソースのオリジンが戻します。   応答ステータスに基づくCache TTLの設定は、静的ファイルの初期設定キャッシュ動作（標準Caching）をオーバーライドし、オリジンWebサーバーによって送信されたCache指示をオーバーライドします。非静的アセットをキャッシュするには、Page Ruleを使ってCache EverythingのCacheレベルを設定してください。no-store Cache-Control または Low TTL（max-age/s-maxageを使用）を設定すると、オリジンWebサーバーへのリクエストが増加し、パフォーマンスが低下します。[詳細はこちら](https://support.cloudflare.com/hc/ja/articles/360043842472-Configuring-cache-TTL-by-status-code)。

 | 

-   Enterprise

 |
| 

Disable Apps（アプリの無効化）

 | 

有効化されている**Cloudflare アプリ**を全てOffにします。

 | 

-   すべて

 |
| 

Disable Performance（パフォーマンスの無効化）

 | 

Offにする：

-   [Auto Minify](https://support.cloudflare.com/hc/articles/200168196)
-   [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056)
-   [Mirage](https://support.cloudflare.com/hc/articles/200403554)
-   [Polish](https://support.cloudflare.com/hc/articles/360000607372)

 | 

-   すべて

 |
| 

Railgunの無効化

 | 

Cloudflare**スピード**アプリの**Railgun**機能をOffにします。

 | 

-   Business
-   Enterprise

 |
| 

セキュリティの無効化

 | 

Offにする：

-   [メールの暗号化](https://support.cloudflare.com/hc/articles/200170016)
-   [レート制限（旧バージョン）](https://support.cloudflare.com/hc/articles/115001635128)
-   [Scrape Shield](https://support.cloudflare.com/hc/articles/200171036)
-   [サーバー側の除外](https://support.cloudflare.com/hc/articles/200170036)
-   [URL（ゾーン）のロックダウン](/waf/tools/zone-lockdown/)
-   [WAFマネージドルール（旧バージョン）](https://support.cloudflare.com/hc/articles/200172016)

 | 

-   すべて

 |
| 

Edge Cache TTL（エッジキャッシュTTL）

 | 

Cloudflareエッジネットワークでリソースをキャッシュする時間を特定します。 _Edge Cache TTL_ は、レスポンスヘッダーでは表示されません。 最小_Edge Cache TTL_ は、プランタイプによって異なります：

Free - 2時間  
Pro - 1時間  
Business - 1秒  
Enterprise - 1秒

 | 

-   すべて

 |
| 

メールの暗号化

 | 

**Cloudflare Scrape Shield**アプリにある**Cloudflareメールの暗号化**機能をOnまたはOffにします。[詳細を見る](https://support.cloudflare.com/hc/articles/200170016)。

 | 

-   すべて

 |
| 

Forwarding URL（転送URL）

 | 

 _HTTP 301/302 リダイレクト_を使って、1つのURLを別のURLにリダイレクトします。_[上記のワイルドカードの一致と参照について、お読みください](https://support.cloudflare.com/hc/articles/218411427#h_6N5SySNYCjYUUnCKnC1Ea6)。_

 | 

-   すべて

 |
| 

ホストヘッダーオーバーライド

 | 

特定のホストヘッダーを適用します。[詳細を見る](https://support.cloudflare.com/hc/articles/206652947)。

 | 

-   Enterprise

 |
| 

IP ジオロケーションヘッダー

 | 

Cloudflareは、訪問者の国別コードを含む_CF-IPCountry_HTTPヘッダーを追加します。

 | 

-   すべて

 |
| 

Mirage

 | 

**Cloudflare Speed**アプリの**Cloudflare Mirage**をOnまたはOffにします。[詳細を見る](https://support.cloudflare.com/hc/articles/200403554)。

 | 

-   Pro
-   Business
-   Enterprise

 |
| 

日和見暗号化

 | 

**Cloudflare SSL/TLS**アプリにある「**エッジ証明書**」タブの**Cloudflare 日和見暗号化**機能をOnまたはOffにします。[詳細を見る](/ssl/edge-certificates/additional-options/opportunistic-encryption)。

 | 

-   すべて

 |
| オリジンキャッシュコントロール | [オリジンCacheコントロール](/cache/concepts/cache-control/)はFreeドメイン、Proドメイン、Businessドメインにおいてデフォルトで有効になっており、Enterpriseドメインについてはデフォルトで無効になっています。 | 

-   すべて

 |
| 

オリジンエラーページのパススルー

 | 

オリジンサーバーから送信された問題から生じたCloudflareエラーページをOnまたはOffにします。有効にした場合、この設定はオリジンで発行されたエラーページをトリガーします。

 | 

-   Enterprise

 |
| 

Polish

 | 

Cloudflare**Speed**アプリの**Polish** 機能のオプションを適用します。[詳細を見る](/images/polish)。

 | 

-   Pro
-   Business
-   Enterprise

 |
| 

検索文字列のソート

 | 

検索文字列の並び替えをOnまたはOffにします。検索文字列が同じ構造の時、キャッシングが向上します。[詳細を見る](https://support.cloudflare.com/hc/articles/206776797)。

 | 

-   Enterprise

 |
| 

オーバーライドを解決

 | 

オリジンアドレスを変更して、この設定で指定される値に変更します。[詳細を見る](https://support.cloudflare.com/hc/articles/206190798)。

 | 

-   Enterprise

 |
| 

強いETagsを尊重する

 | 

Cloudflare Cacheとオリジンサーバー間のバイトごとの同等性チェックをOnまたはOffにします。[詳細を見る](https://support.cloudflare.com/hc/articles/218505467)。

 | 

-   Enterprise

 |
| 

応答バッファリング

 | 

サイト訪問者にオリジンサーバーからのファイルを転送する前に、Cloudflareがファイル全体を受け取るまで待機すべきかどうかについてOnまたはOffにします。デフォルトでは、オリジンサーバーからパケットを受け取る時に、Cloudflareがそれをクライアントに送信します。

 | 

-   Enterprise

 |
| 

Rocket Loader

 | 

Cloudflare **Speed**アプリにある**Cloudflare Rocket Loader**機能をOnまたはOffにします**。**[詳細を見る](https://support.cloudflare.com/hc/articles/200168056)。

 | 

-   すべて

 |
| 

セキュリティレベル

 | 

**セキュリティ**アプリから**セキュリティ**レベル機能のオプションを管理します。[詳細はこちら](https://support.cloudflare.com/hc/articles/200170056)。

 | 

-   すべて

 |
| 

サーバー側の除外

 | 

Cloudflare**Scrape Shield**アプリの**Server Side Excludes**機能をOnまたはOffにします。[詳細を見る](https://support.cloudflare.com/hc/articles/200170036)。

 | 

-   すべて

 |
| 

SSL

 | 

Cloudflare**SSL/TLS**アプリで「**エッジ証明書**」タブの**SSL**機能のオプションを管理します。[詳細はこちら](/ssl/origin-configuration/ssl-modes)。

 | 

-   すべて

 |
| 

True Client IPヘッダー

 | 

Cloudflare**ネットワーク**アプリの**True-Client-IP ヘッダー**機能をOnまたはOffにします。[詳細を見る](https://support.cloudflare.com/hc/articles/206776727)。

 | 

-   Enterprise

 |
| 

Webアプリケーションファイアウォール（旧バージョン）

 | 

**セキュリティ**\>**WAF**\>**マネージドルール**＞の順で**WAFマネージドルール**をONまたはOFFにします。[詳細はこちら](https://support.cloudflare.com/hc/articles/200172016)。

Page Rulesを介して、個々のWAFマネージドルールを有効にしたり無効にしたりできません。

 | 

-   Pro
-   Business
-   Enterprise

 |

___

## 既知の問題

**Page Ruleの設定の問題により、「****_エラー 500（内部サーバーエラー）_****」**が発生する

**根本原因**：Page Rule の設定問題に起因する可能性があります。_転送URL_ルールのような、2つのワイルドカードを使用するPage Ruleを作成する場合、$2 プレースホルダーが2番目のワイルドカードを指すルールを作成することができます。下記の例をご覧ください。

![２つのワイルドカードを使ったPage Rule 設定の例転送URLには＄2プレースホルダー1つが含まれ、これが２つ目と一致するコンテンツに置き換えられます。 ](/images/support/page-rule-create.png)

同じルールを更新する場合、**URLが一致する場合**欄のワイルドカードを1つ削除して保存することができます。下記の例をご覧ください。

![単一のワイルドカードを使った不正確なPage Rule設定で、その$2 プレースホルダーを転送URLで使用する場合。この設定が原因で ](/images/support/page-rule-update.png)

これを行った場合、$2 プレースホルダーが存在しないワイルドカードを参照することになるため、URLがPage Rule をトリガーする際「_エラー 500（内部サーバーエラー）_」が発生します。

**解決策**：Page Ruleを更新し、2番目のワイルドカードを参照する_$2_を削除します。ワイルドカードが1種類しかなければ、_$1_のみが使用されます。

___

## その他の詳細

### Bypass Cache on Cookie 設定

この設定は、BusinessプランとEnterpriseプランのお客様にご利用いただけます。

**Bypass Cache on Cookie**設定は、以下のように基本的な正規表現（regex）をサポートします。

-   複数のCookieと一致させるためにパイプライン演算子（｜と表記）と_OR_ブール論理を使用します。たとえば、 Cookieの値にかかわらず、バイパスまたはPHPSESSIDと呼ばれるCookieが設定されている場合、bypass=.\*_|PHPSESSID=.\*_ は、キャッシュをバイパスします。
-   ワイルドカード演算子（”.\*"と表記）では、たとえば“t.\*st=” のルール値が、testと呼ばれるCookieと他にteeestと呼ばれるCookieの両方と一致するようにします。

制限事項には以下が含まれます：

-   １cookie regex当たり150文字　
-   １cookie regex当たり12ワイルドカード
-   cookie regexの各 | の間にワイルドカードは1つ

様々なプラットフォームで**Bypass Cache on Cookie**を設定する方法については、こちらの記事を参照してください。

-   [WordPressまたはWooCommerceで匿名のページビューをキャッシング](https://support.cloudflare.com/hc/articles/236166048)
-   [Magento 1とMagento 2で匿名ページビューをキャッシング](https://support.cloudflare.com/hc/articles/236168808)
-   [静的HTMLをキャッシュする方法は？](https://support.cloudflare.com/hc/articles/202775670)

**注意：**この設定とEnterpriseプラン限定の_Cache on Cookies_の設定の両方を同じPage Ruleに追加する場合は、_Cache on Cookie_が、_Bypass Cache on Cookie_よりも優先されます。

### ゾーン名はスラッシュ（/）で終わる必要がある

Page Ruleを保存する際、Cloudflareは**URLが一致する場合**フィールドで現行の各ゾーン名の後にスラッシュ（/）があることを確認します。たとえば、現行のゾーン名が`example.com`の場合：

-   `example.com` は `example.com/`として保存
-   `example.com/path/example.com` は `example.com/path/example.com/`として保存

`example.com/some-path/cloudflare.com`の場合は、ゾーン名は`cloudflare.com`ではないため、最後のスラッシュ_なし_で保存されることに留意してください。

### Page Rulesがサポートするネットワークポート

Page Ruleの**URLが一致する場合**フィールドでポートを特定する場合、ポートは次のどれかである必要があります。

-   [Cloudflareのプロキシと互換性がある](/fundamentals/get-started/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy)HTTP/HTTPSポートの1つ。
-   [Cloudflare Spectrum](/spectrum/) HTTPSアプリケーションのカスタムポート。

### WorkersでPage Rulesを使う

現在のリクエストのURLがPage Ruleと[Workersカスタムルート](/workers/platform/routes)の両方と一致する場合、適用されないPage Rule設定がいくつかあります。WorkersでPage Rulesを使う場合の詳細については、開発者ドキュメントの[Workers: Page Rules](/workers/configuration/workers-with-page-rules/)を参照してください。

___

## 関連リソース

-   [検討すべき推奨Page Rules](https://support.cloudflare.com/hc/articles/224509547)
-   [オレンジ/グレー色のクラウドに適切なサブドメインは？](https://support.cloudflare.com/hc/ja/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-)
-   [CloudflareでChache Everythingを使用する方法は？](https://support.cloudflare.com/hc/articles/202775670)
-   [静的HTMLをキャッシュする方法は？](https://support.cloudflare.com/hc/articles/200172256)
-   [コンテンツ管理システムのadminセクションを更新またはアクセスするときに、エラーメッセージをオフラインにする](https://support.cloudflare.com/hc/articles/200169526)
