---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360020739772-Cloudflare-Logs-ELS-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6-DDoS%E3%83%88%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B-Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-
title: Cloudflare Logs (ELS)を使用して、DDoSトラフィックを調べる（Enterpriseプランのみ）
---

# Cloudflare Logs (ELS)を使用して、DDoSトラフィックを調べる（Enterpriseプランのみ）

_Cloudflare Longs（旧ELS）を効果的にそーとして、悪意のあるトラフィックのソースを特定する方法を説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/360020739772-Cloudflare-Logs-ELS-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6-DDoS%E3%83%88%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B-Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-#3HsXqW7d3IsVSiXaSahndu)
-   [Step 1:Cloudflare Logsを紹介する前に、必要な情報を収集](https://support.cloudflare.com/hc/ja/articles/360020739772-Cloudflare-Logs-ELS-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6-DDoS%E3%83%88%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B-Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-#5M6vcNVVDhT11LZLh4j9Sb)
-   [Step 2: ログをダウンロードし、保存](https://support.cloudflare.com/hc/ja/articles/360020739772-Cloudflare-Logs-ELS-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6-DDoS%E3%83%88%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B-Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-#2jBVMFoEjzNQo8pBRDIDZA)
-   [Step 3: ログのソート](https://support.cloudflare.com/hc/ja/articles/360020739772-Cloudflare-Logs-ELS-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6-DDoS%E3%83%88%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B-Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-#2tevqpfbZxVtOz6bAILuu8)
-   [作業の流れ（例）](https://support.cloudflare.com/hc/ja/articles/360020739772-Cloudflare-Logs-ELS-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6-DDoS%E3%83%88%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%82%92%E8%AA%BF%E3%81%B9%E3%82%8B-Enterprise%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E3%81%BF-#bNjbvBfyV4w7fQ9iHGUVV)

___

## 概要

Cloudflare Logs(旧ELS)では、DDoS攻撃と関連するパターンを示している可能性があるトラフィックの分析に役に立つデータへのアクセスができます。Cloudflare Logs のデータをソートすることで、この種類の分析ができます。始めるにあたり、次で説明されている手順に従い、作業の流れ（例）を確認してください。

この手順を始める前に、必要となるもの：

-   [cat](http://www.linfo.org/cat.html)
-   [jq](https://stedolan.github.io/jq/)
-   [Cloudflare Logs Logpull API](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)

___

## Step 1:Cloudflare Logsを紹介する前に、必要な情報を収集

次の情報を収集してください：

1.  Zone管理者のemail アドレス
2.  Zone ID (**概要**（Overview）>**Zone ID**の順で見つけられます)
3.  クライアントAPIキー
4.  開始時間（例：1529171100)
5.  終了時間（例：1529171100)

___

## Step 2: ログをダウンロードし、保存

Cloudflareのエンドポイントには１時間のSWATH制限があり、ログのファイルサイズはリクエスト一つに対して1GB未満でなければなりません。ファイルサイズが1GBを超える場合は、リクエストを受けた時間から記録されたイベントを含まないとしても、ダウンロードが１GBになったところで遮断されます。ログの切り捨て処理を避けるために、1時間から45分に時間を短縮し、ログのファイルサイズが1GB未満になるまで続けます。

### オプション 1:

Cloudflare Logsから「全て」のフィールドをダウンロードし、els.txtに保存します：

テンプレート：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=(curl -s -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

例（値を含む）：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/5b5f0xxxcbfbaxxxxxx0416d22f7b/logs/received?start=1529171100&amp;end=1529171100&amp;fields=(curl -s -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

### オプション ２：

Cloudflare Logsから「特定」のフィールドをダウンロードして、els.txtを保存します：

このコマンドには、リクエストした次のフィールドだけが含まれます： _CacheCacheStatus, CacheResponseBytes, CacheResponseStatus, CacheTieredFill, ClientASN_

Cloudflare Logsフィールドの全リストは、[こちら](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)でご覧ください。テンプレート：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:email&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

例（値を含む）：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:monkey@bannana.com&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/xx5x0xxxc45baxxxxxx0x6d23fxx/logs/received?start=1529171100&amp;end=1529171100&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

___

## Step 3: ログのソート

ログをフィールド値でソートし、ファイルに出力します。

-   HTTP 200 レスポンスでソートし、els-200.txtというファイルに出力します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

-   HTTP 525 レスポンスでソートし、els-525.txtというファイルに出力します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:525,&quot; &gt; els-525.txt</span></div></span></span></span></code></pre>{{</raw>}}

### フィールド値の「:525,」はどこから来たのですか？

_:525,_（コロン、ステータスコード、カンマ）というパターンは、_EdgeResponseStatus_フィールドに固有のものです。コロンと末尾のカンマがないHTTPステータスコード「_525_」を検索すると、_EdgeStartTimeStamp_のような他のフィールドに _525_がついたログエントリを含むということになります。例えば、数字が長かったり、数値列「_525_」を含むこともあります。

![EdgeResponseStatusフィールドが強調表示された出力ファイルのスクリーンショット](/images/support/hc-external-edge_response_status_ELS.png)

出力ファイル（els-200.txt と els-525.txt）はそのままで読み取りができる状態ではありません。読みやすい形式で表示するために、jqを次のコマンドで使います。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-525.txt | jq '.'</span></div></span></span></span></code></pre>{{</raw>}}

### フィールドでリクエストをカウントし、ファイルに出力する

この例では、SSLプロトコルバージョンでリクエストをカウントします。このバージョンはCloudflare Logs（下記のフィールド名以前の期間に注意してください）の_ClientSSLProtocol_ フィールドで示されています。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientSSLProtocol els-200.txt |sort -n |uniq -c |sort -n &gt; ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}

### 出力（例）：

![ELSログをソートする際の出力例のスクリーンショット](/images/support/hc-import-11.png)

 _ClientRequestURI、 ClientIP、ClientRequestUserAgent、ClientCountry_、_ClientRequestHost_フィールドは通常、こうしたログで攻撃パターンを見つける際に最も役に立つフィールドです。

-   _ClientRequestUserAgent_ でソートすると、ユーザーエージェントによるブロックルールが設定できます。
-   _ClientCountry_ でソートすると、国別でファイアウォールルールが設定できます。
-   _ClientRequestURI_ でソートすると、リクエスト数が最も多いページに対してレート制限の設定ができるようになります。

___

## 作業の流れ（例）

多くの場合、攻撃ソースを分析および特定するために、多くのフィールドでソートする必要があります。例えば、次に示される作業の流れをご覧ください:

**Action 1**: _HTTP 200_ レスポンスでダウンロードしたCloudflare ログをソートし、els-200.txt.に出力します。

**理由**:Cloudflareで、すでにブロックされているレスポンスに興味はないはずです。つまり、HTTPレスポンス _503_ または _403_を発生させるリクエストなのです。当社のエッジで_200 HTTP_が発生するリクエストがCloudflareでブロックされていて、アセットがCloudflareのエッジでキャッシュされない場合、オリジンまでずっと進む可能性があります。悪意がある場合、こうしたリクエストは、オリジンに過負荷となるようにデザインされています。

**方法**：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt | grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Action 2**: URIで「HTTP 200のみ」ソートし、els-200-URI.txtに出力します。

**理由**：200レスポンスのなかで、最もリクエストされるページが見たいからです。**方法**：

上位のURIを見つける：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientRequestURI els-200.txt |sort -n |uniq -c |sort -n &gt; els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}

URIをこのリストから選び、URIで自身のファイルにログエントリを出力します。これをするには、次のコマンドを選択したURIを使って次のコマンドを_/ClientRequestURI/path/to/something/_に置き換えます：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200.txt| grep &quot;/ClientRequestURI/path/to/something/&quot; &gt; els-200-URI-1.txt</span></div></span></span></span></code></pre>{{</raw>}}

**Action 3**:IPアドレスで、URI特定の「HTTP 200のみ」レスポンスをカウントし、els-200-URI-1-Top-IP.txtに出力します

**理由**: URIをリクエストし、200レスポンスになるトップIPアドレスを表示するため。

**方法：**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientIP els-200-URI-1.txt |sort -n |uniq -c |sort -n &gt; els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

**ファイルのコンテンツを出力する：**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

リクエストURIとこうしたURIをリクエストするIPで、200 HTTPSレスポンスを絞り込むことができます。トップIPアドレスでログエントリーを絞り込みながら、その逆のソートもできます。そして、どのURIがIPアドレスで最もリクエストされるかも確認できます。
