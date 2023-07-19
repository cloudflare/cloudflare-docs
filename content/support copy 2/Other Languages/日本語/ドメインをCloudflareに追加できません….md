---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/205359838-%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92Cloudflare%E3%81%AB%E8%BF%BD%E5%8A%A0%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93-
title: ドメインをCloudflareに追加できません…
---

# ドメインをCloudflareに追加できません…

## ドメインをCloudflareに追加できません…

_この記事では、Cloudflareにドメインを追加する際に発生するエラーのトラブルシューティングを行う手順について説明します。_

### 本記事の内容

-   [手順1 - DNSSECを無効にする](https://support.cloudflare.com/hc/ja/articles/205359838-%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92Cloudflare%E3%81%AB%E8%BF%BD%E5%8A%A0%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93-#h_94453043811540417238269)
-   [手順2 - ドメインを登録する](https://support.cloudflare.com/hc/ja/articles/205359838-%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92Cloudflare%E3%81%AB%E8%BF%BD%E5%8A%A0%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93-#h_25187255171540417266656)
-   [手順3 - ルートドメインのDNS解決を行う](https://support.cloudflare.com/hc/ja/articles/205359838-%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92Cloudflare%E3%81%AB%E8%BF%BD%E5%8A%A0%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93-#h_703638145121540417281357)
-   [手順4 - Cloudflareでドメインが禁止されているかどうかを確認する](https://support.cloudflare.com/hc/ja/articles/205359838-%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92Cloudflare%E3%81%AB%E8%BF%BD%E5%8A%A0%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93-#h_874829316161540417303369)

___

## 手順1 - DNSSECを無効にする

ユーザーのドメインレジストラーで**DNSSEC**が有効になっている場合、Cloudflareは権威DNSの解決を行うことができません。 Cloudflare上でドメインが_アクティブ_になった後で**DNSSEC**を再度有効にすることができますが、 [Cloudflareの](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS)[DNSSEC](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS)[要件](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS)を使用して**DNSSEC**を設定しなければなりません。

レジストラーで**DNSSEC**が有効になっている場合、次のような事象が発生する可能性があります：

-   Cloudflareのネームサーバーに切り替わった後にDNS解決が行われない。
-   DNSクエリのレスポンスステータスが、_SERVFAIL_である。
-   Cloudflare Overviewアプリ内でドメインが_保留中_ステータスのままである。

**DNSSEC**を無効にするのに支援が必要な場合は、ドメインプロバイダーに連絡してください。ドメインに対して_DS レコード_が存在する場合は、**DNSSEC** が有効になっている可能性があります。_DSレコード_ は、[https://mxtoolbox.com/ds.aspx](https://mxtoolbox.com/ds.aspx) のようなサードパーティのオンラインツールまたはコマンドラインターミナル：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ds cloudflare.comを介して確認できます。 2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

___

## 手順2 - ドメインを登録する

ドメインをCloudflareに追加することを妨げるドメイン登録に関する問題がいくつかあります：

-   ドメインは、[Public Suffix List](https://publicsuffix.org/list/)にない新しいTLD（トップレベルドメイン）を使用します。
-   次のようなエラーが表示される場合があります：

_bad.psl-exampleを登録済みドメインとして識別できませんでした。 サブドメインではなくルートドメインを提供していることを確認してください（例：subdomain.example.comではなく、example.com）（コード：1099）_

-   ドメインが完全に登録されていないか、登録データがネームサーバーを列挙していません

-   ドメインレジストラーに連絡して、登録されているネームサーバーを更新してください

**「+サイトの追加（+ Add site）」**を介して不適切に登録されたドメインを追加したときに、Cloudflareダッシュボードに表示される可能性があるエラーのいくつかを以下に示します：

-   _exampledomain.comは登録済みドメインではありません（コード：1049）_
-   _exampledomain.comのレジストラーとホスティング情報を検索できませんでした。 Cloudflareサポートに連絡するか、後ほど再度お試しください。 （コード：1110）_

___

## 手順3 - ルートドメインのDNS解決を行う

ドメインをCloudflareに追加する前に、動作している有効なネームサーバーに対してドメインが_NS レコード_を返す必要があります。 _NSレコード_は、[https://www.whatsmydns.net/#NS/](https://www.whatsmydns.net/%23NS/)のようなサードパーティのオンラインツールまたは次のようなdigコマンドを使用するコマンドラインターミナルを介して確認できます：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ns cloudflare.com ns3.cloudflare.com. ns4.cloudflare.com. ns5.cloudflare.com. ns6.cloudflare.com. ns7.cloudflare.com.</span></div></span></span></span></code></pre>{{</raw>}}

また、ドメインは、クエリを実行したときに有効な_SOAレコード_を返す必要があります。 _SOAレコード_は、[https://www.whatsmydns.net/#SOA/](https://www.whatsmydns.net/%23SOA/)のようなサードパーティのオンラインツールまたは次のようなコマンドラインターミナルを介して確認できます：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short soa cloudflare.com ns3.cloudflare.com. dns.cloudflare.com. 2029202248 10000 2400 604800 300</span></div></span></span></span></code></pre>{{</raw>}}

___

Cloudflareでは、特定のドメインを永続的または一時的に追加することを許可していません。  いずれかの種類の禁止を解除するには、以下の手順を参照してください。

### 一時的な禁止を解除する

ドメインをCloudflareに追加しようとする試みが多すぎることをCloudflareが確認した場合にエラーが返されます：

_Cloudflareリクエストのエラー\[1105\]：このゾーンは一時的に禁止されており、現時点ではCloudflareに追加できません。Cloudflareサポートに連絡してください。_

Cloudflareサポートに連絡する前に、3時間待ってCloudflareにドメインを再度追加してみてください。

###   
恒久的な禁止を取り消す

ドメインの追加時に次のいずれかのエラーが発生した場合は、Cloudflareサポートにリクエストを提出してください：

-   _エラー：このゾーンは禁止されており、現時点ではCloudflareに追加できません。Cloudflareサポートに連絡してください。（コード：1097）_
-   _現時点では、このゾーンをCloudflareに追加することはできません。Cloudflareサポートに連絡してください。（コード：1093）_
