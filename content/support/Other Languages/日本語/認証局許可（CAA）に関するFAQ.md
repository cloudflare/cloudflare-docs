---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/115000310832-%E8%AA%8D%E8%A8%BC%E5%B1%80%E8%A8%B1%E5%8F%AF-CAA-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ
title: 認証局許可（CAA）に関するFAQ
---

# 認証局許可（CAA）に関するFAQ

## 認証局許可（CAA）に関するFAQ

_この記事では、CAA DNSレコードに関するよくある質問に回答します。_

### 本記事の内容

-   [_CAAとは？_](https://support.cloudflare.com/hc/ja/articles/115000310832-%E8%AA%8D%E8%A8%BC%E5%B1%80%E8%A8%B1%E5%8F%AF-CAA-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_83030816011543365917896)
-   _[CloudflareはCAAレコードをどのように評価しますか？](https://support.cloudflare.com/hc/ja/articles/115000310832-%E8%AA%8D%E8%A8%BC%E5%B1%80%E8%A8%B1%E5%8F%AF-CAA-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_66255839481543365927385)_
-   [CAAレコードがUniversal SSLの発行を除外するのに、なぜUniversal SSLを無効にしなければならないのですか？](https://support.cloudflare.com/hc/ja/articles/115000310832-%E8%AA%8D%E8%A8%BC%E5%B1%80%E8%A8%B1%E5%8F%AF-CAA-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_998474763141543365935375)
-   [_Universal SSLを有効にしておくのにどのレコードが追加されますか？_](https://support.cloudflare.com/hc/ja/articles/115000310832-%E8%AA%8D%E8%A8%BC%E5%B1%80%E8%A8%B1%E5%8F%AF-CAA-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_645975761191543365946939)
-   [_Universal SSLが無効になっている場合はどうなりますか？_](https://support.cloudflare.com/hc/ja/articles/115000310832-%E8%AA%8D%E8%A8%BC%E5%B1%80%E8%A8%B1%E5%8F%AF-CAA-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_217748692231543365960592)
-   [_どのようにUniversal SSLを再度有効にできますか？_](https://support.cloudflare.com/hc/ja/articles/115000310832-%E8%AA%8D%E8%A8%BC%E5%B1%80%E8%A8%B1%E5%8F%AF-CAA-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_322898447261543365970663)
-   _[CAAレコードを設定することによる危険性は何ですか？](https://support.cloudflare.com/hc/ja/articles/115000310832-%E8%AA%8D%E8%A8%BC%E5%B1%80%E8%A8%B1%E5%8F%AF-CAA-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ#h_681347546281543365982388)_

___

Certificate Authority Authorization（CAA）レコードにより、ドメインオーナーは、発行を特定の認証局（CA）に限定することができます。_CAAレコード_は、特定の状況下でCAが証明書を発行するのを防止します。詳細については、[RFC 6844](https://tools.ietf.org/html/rfc6844)を参照してください。

___

## CloudflareはCAAレコードをどのように評価しますか？

_CAAレコード_はCloudflareではなく、CAが評価します。

___

## _CAAレコード_がUniversal SSLの発行を除外するのに、なぜUniversal SSLを無効にしなければならないのですか？

Universal SSL証明書はお客様の間で共有されるため、_CAAレコード_が別のお客様のUniversal SSLの発行を妨げる場合があります。 したがって、Cloudflareは、別のお客様の_CAAレコード_に影響を及ぼさないようにするため、ユーザーのドメインのUniversal SSLを無効にする必要があります。

CloudflareのUniversal SSLを必要としない場合は、Cloudflare **SSL/TLS**アプリの**「エッジ証明書（Edge Certificates）」**タブで**「Universal SSLを無効にする（Disable Universal SSL）」**を選択します。

___

## Universal SSLを有効にしておくのにどのレコードが追加されますか？

Cloudflareの無料のUniversal SSL証明書を引き続き使用する場合、次のDNSレコードが自動的に設定されます：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com. IN CAA 0 issue &quot;comodoca.com&quot; example.com. IN CAA 0 issue &quot;digicert.com&quot; example.com. IN CAA 0 issue &quot;letsencrypt.org&quot; example.com. IN CAA 0 issuewild &quot;comodoca.com&quot; example.com. IN CAA 0 issuewild &quot;digicert.com&quot; example.com. IN CAA 0 issuewild &quot;letsencrypt.org&quot;</span></div></span></span></span></code></pre>{{</raw>}}

単独で_issuewild_ を使用すると、ワイルドカードの発行のみを許可します。したがって、**「タグ」**ドロップダウンで「_ワイルドカードと特定のホスト名を許可する（Allow wildcards and specific hostnames）_」 オプションを指定しない限り、Cloudflareは、ルートドメインを証明書に追加できません：  

![configuring_caa_records_comodoca_annotated.png](/images/support/configuring_caa_records_comodoca_annotated.png)

___

## Universal SSLが無効になっている場合はどうなりますか？

ドメイン名はUniversal SSL証明書からただちに削除され、[カスタムSSL証明書をアップロードする](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-)（BusinessプランまたはEnterpriseプランが必要）場合を除き、SSLエラーが表示されることになります。

___

## どのようにUniversal SSLを再度有効にできますか？

Cloudflareサポートにサポートチケットを提出してください。

___

## CAAレコードを設定することによる危険性は何ですか？

大規模な組織の一員である場合または複数の当事者がSSL証明書を取得する作業に関与している場合、組織に適用されるすべてのCAが発行できるように_CAAレコード_を含めます。  そうしないと、組織の他の部門に対するSSLの発行が誤ってブロックされる可能性があります。
