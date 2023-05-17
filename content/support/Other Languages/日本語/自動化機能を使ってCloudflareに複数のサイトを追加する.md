---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360000841472-%E8%87%AA%E5%8B%95%E5%8C%96%E6%A9%9F%E8%83%BD%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6Cloudflare%E3%81%AB%E8%A4%87%E6%95%B0%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B
title: 自動化機能を使ってCloudflareに複数のサイトを追加する
---

# 自動化機能を使ってCloudflareに複数のサイトを追加する

_Cloudflare APIまたはCloudflareのCLIツールflarectlを使用して、複数のサイト（10以上）を一度にCloudflareに追加する方法を説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/360000841472-%E8%87%AA%E5%8B%95%E5%8C%96%E6%A9%9F%E8%83%BD%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6Cloudflare%E3%81%AB%E8%A4%87%E6%95%B0%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B#01EiMuIl9b6BVA2vUdCy2X)
-   [前提条件](https://support.cloudflare.com/hc/ja/articles/360000841472-%E8%87%AA%E5%8B%95%E5%8C%96%E6%A9%9F%E8%83%BD%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6Cloudflare%E3%81%AB%E8%A4%87%E6%95%B0%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B#2C6OkWg2Flbl6ZBJss7FjH)
-   [APIを介してドメインを追加する](https://support.cloudflare.com/hc/ja/articles/360000841472-%E8%87%AA%E5%8B%95%E5%8C%96%E6%A9%9F%E8%83%BD%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6Cloudflare%E3%81%AB%E8%A4%87%E6%95%B0%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B#3Mk8dKAR73TTdEKH2WLfzb)
-   [flarectlを介してドメインを追加する（CloudflareのCLIツール）](https://support.cloudflare.com/hc/ja/articles/360000841472-%E8%87%AA%E5%8B%95%E5%8C%96%E6%A9%9F%E8%83%BD%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6Cloudflare%E3%81%AB%E8%A4%87%E6%95%B0%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B#194axRKd2V27vV5bs4e8iD)
-   [一般的な問題](https://support.cloudflare.com/hc/ja/articles/360000841472-%E8%87%AA%E5%8B%95%E5%8C%96%E6%A9%9F%E8%83%BD%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6Cloudflare%E3%81%AB%E8%A4%87%E6%95%B0%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B#6yR1Cexb7t3HYDcHGVwMjn)

___

## 概要

複数のサイト（10以上）をCloudflareに一度に追加する必要がある場合は、Cloudflare APIを介して追加することができます。複数のサイトの追加は、次のような場合に役立ちます：

-   複数のドメインを単一の正規ドメインにマッピングする場合。例：Cloudflareを使用してさまざまな国のドメイン（.com.au、.co.ukなど）を保護したい。
-   代理店またはITコンサルタントであり、お客様に代わって複数のドメインを管理している場合（注：Cloudflareの[パートナープログラム](https://www.cloudflare.com/partners/)の利用をご検討ください）
-   複数の既存サイトをCloudflareに移動しようとしている

APIを使用することにより、複数のサイトを迅速に効率よく追加できます。特に、[ネームサーバーの変更方法](/dns/zone-setups/full-setup/setup)や[DNSレコードの追加方法](/dns/manage-dns-records/how-to/create-dns-records)に精通している場合はお勧めします。

___

## 前提条件

自動化機能を使ってCloudflareに複数のサイトを追加するには、以下が必要になります：

-   Cloudflareの既存アカウント（[サインアップ](https://www.cloudflare.com/a/signup) ／ [ログイン](https://www.cloudflare.com/a/login)）
-   コマンドラインに関する基本的な知識
-   カールがインストールされている（デフォルトではMac OSとLinux上）
-   Cloudflare [APIキー](https://support.cloudflare.com/hc/ja/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-)
-   （改行で区切られた）1行に1つずつ書かれた追加するドメインの一覧。例："domains.txt"

___

## APIを介してドメインを追加する

Cloudflareには、完全な機能を備えたAPI（[ドキュメント](https://api.cloudflare.com/)）があり、新しいドメインの作成を自動化し、DNSレコード、Page Rule、およびCloudflareの多くのセキュリティ項目を設定できます。このAPIを使用して、複数のドメインを一度に自動追加します。

端末アプリケーション（例： TerminalまたはTerminal.app） を開いて、APIキーとメールを設定します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

次に、各ドメイン名を取得するシンプルなforループを書きます


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt);do \ curl -X POST -H &quot;X-Auth-Key: $CF_API_KEY&quot; -H &quot;X-Auth-Email: $CF_API_EMAIL&quot; \ -H &quot;Content-Type: application/json&quot; \ &quot;https://api.cloudflare.com/client/v4/zones&quot;\  --data '{&quot;account&quot;: {&quot;id&quot;: &quot;id_of_that_account&quot;}, &quot;name&quot;:&quot;'$domain'&quot;,&quot;jump_start&quot;:true}'; done</span></div></span></span></span></code></pre>{{</raw>}}

「jump\_start」キーを使用すると、手動で設定しなくても済むように、Cloudflareが一般的なDNSレコードのスキャンを自動的に試行します。例：「www」、「mail」、「blog」、およびそのほか多数（すべてを網羅しているかを確認してください）。  _id\_of\_that\_account_ は、 **アカウントID**の下のCloudflare **Overview** アプリにあります。

APIは、Registrar（ドメインを登録した場所）で[変更する必要があるネームサーバー](https://support.cloudflare.com/hc/ja/articles/206455647-How-do-I-change-my-domain-nameservers-)を含む、レスポンスを返します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{ &quot;result&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;example.com&quot;,&quot;status&quot;: &quot;pending&quot;, &quot;paused&quot;: false, &quot;type&quot;: &quot;full&quot;, &quot;development_mode&quot;: 0, &quot;name_servers&quot;: [ &quot;chad.ns.cloudflare.com&quot;,&quot;lucy.ns.cloudflare.com&quot;], &quot;original_name_servers&quot;: [ &quot;ns-cloud-e1.googledomains.com&quot;,&quot;ns-cloud-e2.googledomains.com&quot;,&quot;ns-cloud-e3.googledomains.com&quot;,&quot;ns-cloud-e4.googledomains.com&quot;], &quot;original_registrar&quot;: null, &quot;original_dnshost&quot;: null, &quot;modified_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;created_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;meta&quot;: { &quot;step&quot;: 4, &quot;wildcard_proxiable&quot;: false, &quot;custom_certificate_quota&quot;: 0, &quot;page_rule_quota&quot;: 3, &quot;phishing_detected&quot;: false, &quot;multiple_railguns_allowed&quot;: false }, &quot;owner&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;type&quot;: &quot;user&quot;, &quot;email&quot;: &quot;you@example.com&quot; }, &quot;account&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;you@example.com&quot; }, &quot;permissions&quot;: [ &quot;#access:edit&quot;, &quot;#access:read&quot;, &quot;#analytics:read&quot;, &quot;#app:edit&quot;, &quot;#billing:edit&quot;, &quot;#billing:read&quot;, &quot;#cache_purge:edit&quot;, &quot;#dns_records:edit&quot;, &quot;#dns_records:read&quot;, &quot;#lb:edit&quot;, &quot;#lb:read&quot;, &quot;#logs:read&quot;, &quot;#member:edit&quot;, &quot;#member:read&quot;, &quot;#organization:edit&quot;, &quot;#organization:read&quot;, &quot;#ssl:edit&quot;, &quot;#ssl:read&quot;, &quot;#subscription:edit&quot;, &quot;#subscription:read&quot;, &quot;#waf:edit&quot;, &quot;#waf:read&quot;, &quot;#worker:edit&quot;, &quot;#worker:read&quot;, &quot;#zone:edit&quot;, &quot;#zone:read&quot;, &quot;#zone_settings:edit&quot;, &quot;#zone_settings:read&quot; ], &quot;plan&quot;: { &quot;id&quot;: &quot;0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee&quot;, &quot;name&quot;: &quot;Free Website&quot;, &quot;price&quot;: 0, &quot;currency&quot;: &quot;USD&quot;, &quot;frequency&quot;: &quot;&quot;, &quot;is_subscribed&quot;: true, &quot;can_subscribe&quot;: false, &quot;legacy_id&quot;: &quot;free&quot;, &quot;legacy_discount&quot;: false, &quot;externally_managed&quot;: false } }, &quot;success&quot;: true, &quot;errors&quot;: [], &quot;messages&quot;: []}</span></div></span></span></span></code></pre>{{</raw>}}

「name\_servers」キーがレスポンスにあることに注意してください。 これらは、アカウントに追加するすべてのサイトに対して同じ一意のペアになります。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;name_servers&quot;: [ &quot;chad.ns.cloudflare.com&quot;,&quot;lucy.ns.cloudflare.com&quot;]</span></div></span></span></span></code></pre>{{</raw>}}

Registrarで（上記の値ではなく）各自の値をコピーして、[ネームサーバーを更新](https://support.cloudflare.com/hc/ja/articles/206455647-How-do-I-change-my-domain-nameservers-)します。

___

## flarectlを介してドメインを追加する（CloudflareのCLIツール）

Cloudflareの公式CLIであるflarectlを使用してドメインを追加することもできます。オペレーティングシステム（Windows、macOS/Darwin、Linux）用の[ビルド済みパッケージをダウンロード](https://github.com/cloudflare/cloudflare-go/releases)し、それを使用してドメインを作成することができます。

まず、API 認証情報を設定する必要があります。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

次に、flarectl内で以下のコマンドを実行します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone create --zone=$domain --jumpstart=false; done</span></div></span></span></span></code></pre>{{</raw>}}

その後で、「flarectlゾーンリスト」を使用して、各ドメインのネームサーバーを取得できます。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone info --zone=$domain; done</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

[Cloudflareコミュニティ](https://community.cloudflare.com/)内でヘルプやヒントを探すことができます。

___

## 一般的な問題

このプロセスでエラーが返された場合、ドメインは登録されていない（登録されたばかりである）、サブドメインである、または無効である可能性があります。以下の記事では、最もよくあるケースについて説明します： 

-   [なぜドメインをCloudflareに追加できないのですか？](https://support.cloudflare.com/hc/ja/articles/205359838-I-cannot-add-my-domain-to-Cloudflare-)
-   [禁止されているサイト](https://support.cloudflare.com/hc/articles/205359838#h_874829316161540417303369)
