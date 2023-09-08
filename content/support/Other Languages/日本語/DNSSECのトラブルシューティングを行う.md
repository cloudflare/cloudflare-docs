---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360021111972-DNSSEC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86
title: DNSSECのトラブルシューティングを行う
---

# DNSSECのトラブルシューティングを行う

## DNSSECのトラブルシューティングを行う

_DNSSECはDNSを保護します。  この資料では、DNS解決に影響するDNSSECの問題を検出する方法について説明します。_ 

### 本記事の内容

-   [digを使用してDNSSECをテストする](https://support.cloudflare.com/hc/ja/articles/360021111972-DNSSEC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86#TroubleshootingDNSSEC-DNSSECinPracticewithDig)
-   [digを使用してDNSSECの信頼の連鎖（Chain of Trust）を表示する](https://support.cloudflare.com/hc/ja/articles/360021111972-DNSSEC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86#TroubleshootingDNSSEC-ViewingtheDNSSECChainofTrustwithDig)
-   [digを使用してDNSSEC検証のトラブルシューティングを行う](https://support.cloudflare.com/hc/ja/articles/360021111972-DNSSEC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationwithDig)
-   [DNSVizを使用してDNSSEC検証のトラブルシューティングを行う](https://support.cloudflare.com/hc/ja/articles/360021111972-DNSSEC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz)
-   [次のステップ](https://support.cloudflare.com/hc/ja/articles/360021111972-DNSSEC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86#TroubleshootingDNSSEC-What'sNext?)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/360021111972-DNSSEC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86#h_388049682151546042422637)

___

## digを使用してDNSSECをテストする

_Dig_は、DNSレコードのネームサーバーにクエリを実行するためのコマンドラインツールです。たとえば、_dig_ はDNSリゾルバーに_www.cloudflare.com_ のIPアドレスを問い合わせることが できます_+short_オプションは結果のみを出力します）_：_


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +short 198.41.215.162 198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

_dig_を使用してDNSSECレコードを検証します。  以下の例では、


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +dnssec +short 198.41.214.162 198.41.215.162 A 13 3 300 20180927180434 20180925160434 35273 cloudflare.com. DYYZ/bhHSAIlpvu/HEUsxlzkC9NsswbCQ7dcfcuiNBrbhYV7k3AI8t46 QMnOlfhwT6jqsfN7ePV6Fwpym3B0pg==</span></div></span></span></span></code></pre>{{</raw>}}

サブドメインの公開鍵ではなく、ルートドメインの公開鍵にクエリを実行します： 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DNSKEY cloudflare.com +short 257 3 13 mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+ KkxLbxILfDLUT0rAK9iUzy1L53eKGQ== 256 3 13 koPbw9wmYZ7ggcjnQ6ayHyhHaDNMYELKTqT+qRGrZpWSccr/lBcrm10Z 1PuQHB3Azhii+sb0PYFkH1ruxLhe5g==</span></div></span></span></span></code></pre>{{</raw>}}

DNSレスポンスには、次の2つのレコードが含まれます：

-   _DNSKEYレコード_**256**は、ゾーン署名鍵（zone-signing key）と呼ばれる公開鍵であり、_A、MX、CNAME、SRV_などのDNSレコードの署名を検証するのに使用されます。

_+short_オプションを_dig_と使用しない場合に、レスポンスヘッダーに**ad**フラグが表示されると、DNSレスポンスはDNSSEC認証されます：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com [...] ;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 65326;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1 [...] ;; QUESTION SECTION: ;www.cloudflare.com.        IN  A [...] ;; ANSWER SECTION: www.cloudflare.com. 15  IN  A   198.41.215.162 www.cloudflare.com. 15  IN  A   198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

___

## digを使用してDNSSECの信頼の連鎖（Chain of Trust）を表示する

ドメイン署名の完全検証（例：_cloudflare.com_）は最上位のドメインでの鍵署名鍵を検証する必要があります（例：_.com_）。 続いて、同様の検証が 

DNSSECが有効になっている場合、レジストラーのDNSで_DSレコード_が必要になります。 _DSレコード_には、公開鍵署名鍵のハッシュと鍵に関するメタデータが含まれます。

_dig_を使用して、_DSレコード_を検索します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig +short DS cloudflare.com 2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

_dig_は答えが


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DS cloudflare.com +trace [...] cloudflare.com。86400   IN  DS  2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9 [...] com.            172800  IN  NS  e.gtld-servers.net. [...] ;; Received 1213 bytes from 2001:502:1ca1::30#53(e.gtld-servers.net) in 37 ms</span></div></span></span></span></code></pre>{{</raw>}}

上記のすべての手順を手動で実行する簡単な方法は、[DNSVizオンラインツール](http://dnsviz.net/)を使用することです。詳細については、[DNSVizを使用したDNSSEC検証のトラブルシューティング](https://support.cloudflare.com/hc/ja/articles/360021111972-DNSSEC%E3%81%AE%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz) または[DNSVizを介したcloudflare.comのDNSSEC結果](http://dnsviz.net/d/cloudflare.com/dnssec/)の例を参照してください。

___

## digを使用してDNSSEC検証のトラブルシューティングを行う

レジストラーで古いDNSSECレコードを更新または削除せずに、権威DNSプロバイダーを変更すると問題が発生します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1 ;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0 ;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 10663</span></div></span></span></span></code></pre>{{</raw>}}

を実行して、_SERVFAIL_レスポンスがDNSSECに関連付けられているかどうかを確認します


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1 +dnssec +cd +short 104.20.49.61 104.20.48.61</span></div></span></span></span></code></pre>{{</raw>}}

上記の例では、_+cd_ オプションを使用しているときに正しいDNSレスポンスを受信した場合はDNSSECの誤設定が行われますが、DNSSECを使用したクエリは _SERVFAIL_レスポンス_を返します。_ この問題は、権威ネームサーバーは変更されるが、_DSレコード_ が更新されない場合に発生することが多いです。  この問題は、攻撃者がクエリに対するレスポンスを偽造しようとした場合にも発生することがあります。 

___

## DNSVizを使用してDNSSEC検証のトラブルシューティングを行う

1.  [http://dnsviz.net/](http://dnsviz.net/)に移動します。
2.  表示されるテキストフィールドにドメイン名を入力します。
3.  DNSVizが過去に一度もサイトを分析したことがない場合は、表示される**「分析（Analizye）」**ボタンをクリックします。
4.  DNSVizが過去にサイトを分析したことがある場合は、

![Screen_Shot_2018-09-18_at_10.31.54_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.31.54_AM.png)

![Screen_Shot_2018-10-16_at_2.png](/images/support/Screen_Shot_2018-10-16_at_2.png)

![Screen_Shot_2018-09-18_at_10.25.49_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.25.49_AM.png)

___

## 次のステップ

DNSSEC実装で問題が検出された場合は、ドメインのレジストラーに連絡して、_DSレコード_が権威DNSプロバイダーが指定したものと一致することを確認します。 Cloudflareが権威DNS プロバイダーである場合は、[「Cloudflareを使用してDNSSECを設定する」](https://support.cloudflare.com/hc/articles/360006660072)に記載されている手順を行います。

___

## 関連リソース

-   [DNSSECの仕組み](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/)
-   [DNSセキュリティ](https://www.cloudflare.com/learning/dns/dns-security/)
-   [Cloudflareを使用してDNSSECを設定する](https://support.cloudflare.com/hc/articles/360006660072)
