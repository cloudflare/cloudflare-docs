---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-
title: SSLに関するFAQ（よくある質問）
---

# SSLに関するFAQ（よくある質問）

_Cloudflare **SSL/TLS**アプリに関して、よくある質問の回答が見つかります。_

### 本記事の内容

-   [Cloudflare証明書を複数所有しているが、どれが使われます？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_e2bd076d-beb3-40e8-adbe-075ba5a8851e)
-   [CloudflareのSSLを所有すると、SEOに役立ちますか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_29550926411548959889544)
-   [Cloudflare SSLのアクティブ化にはどのくらい時間がかかりますか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_7dc4564e-f93a-4e1d-a338-90903a812b95)
-   [SSL無効ブランドチェックとはどういう意味ですか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_62d0852f-0bc5-4d54-a83f-971ca452398d)
-   [訪問者全員をHTTPS/SSLにリダイレクトするにはどうすればいいですか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_a61bfdef-08dd-40f8-8888-7edd8e40d156)
-   [Cloudflare SSLは、国際化ドメイン名(IDN)をサポートしますか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_406905917121548959897352)
-   [SSLはホスティングパートナーにも機能しますか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_848554486311548959913241)
-   [Cloudflare SSL証明書は共有できますか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_293541339461548959928672)
-   [自分のWebサイトにはSSL証明書がインストールされているのに、Cloudflare証明書が表示されるのはなぜですか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_865954806521548960003696)
-   [他からSSL証明書を購入したけれど、Cloudflareでも使いたい](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_406415940571548960012266)
-   [自分のサイトがHTTPS/SSLだけを使うようにするにはどうすればいいですか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_999722138611548960019807)
-   [Project Galileoは、SSLサポートがありますか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_745887958641548960026645)
-   [Cloudflareの有効化はPaypalのTSL 1.2 要件に影響しますか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_100356045661548960034406)
-   [Cloudflareの中国データセンターからのSSL証明書を提示するにはどうすればいいですか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_853db670-78aa-4c98-99d4-3aa3d38f8d59)
-   [Cloudflareは、TSLクライアント認証をサポートしていますか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_db0bcd71-24f9-4b0c-8cfc-7a5ed0f27649)
-   [Universal SSLをGIthubで有効化するには、どうすればいいですか？](https://support.cloudflare.com/hc/ja/articles/204144518-SSL%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8BFAQ-%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F-#h_4e7e3537-ade2-431c-abe7-2dfe26e1cb9a)

___

### Cloudflare証明書を複数所有しているが、どれが使われます？

Cloudflare 証明書は、[証明書のタイプ](https://support.cloudflare.com/hc/articles/203295200)と最も特異なホスト名で優先されます。一般に、SSL証明書の優先順位は、次のように最も高い順位から最も低い順位へと行われます。

-   [カスタムSSL](https://support.cloudflare.com/hc/articles/200170466)
-   [専用SSL](https://support.cloudflare.com/hc/articles/228009108)
-   [Universal SSL](https://support.cloudflare.com/hc/articles/204151138)   

一般的な優先順位付けでは、ホスト名の特異性に基づいて例外があります。得意なホスト名を持つ証明書は、ワイルドカード証明書より優先されます。 例えば、_www.example.com_を明示するUniversal SSL証明書は、 _\*.example.com._のようなワイルドカードを経由する_www_ホスト名と一致する証明書よりも優先されます。  

___

### CloudflareのSSLを所有すると、SEOに役立ちますか？

はい、Googleは[SEOのランキングシグナルとしてHTTPS](http://googleonlinesecurity.blogspot.co.uk/2014/08/https-as-ranking-signal_6.html)を使用すると発表しました。

SEOの微調整については、[CloudflareでSEOランキングを向上させる](https://support.cloudflare.com/hc/en-us/articles/231109348-How-do-I-Improve-SEO-Rankings-On-My-Website-Using-Cloudflare-)の記事をご覧ください。

___

### Cloudflare SSLは、国際化ドメイン名(IDN)をサポートしますか？

Cloudflareは、double byte / IDN / punycodeドメインをサポートします。ラテン文字以外の文字を持つドメインは、Cloudflareに追加される他のドメインのようにSSL証明書を受信します。

___

### Cloudflare SSLのアクティブ化にはどのくらい時間がかかりますか？

Cloudflareが[権限DNSプロバイダーである場合](https://www.cloudflare.com/learning/dns/dns-server-types/#authoritative-nameserver)、Universal SSL証明書は通常Cloudflareでドメインがアクティブ化してから15分以内で発行され、ドメインのアクティブ化の後はお客様が何かする必要はありません。また、[Cloudflareサービスを権限DNSプロバイダーに設定されたCNAMEレコード](https://support.cloudflare.com/hc/articles/360020615111)セットを介して利用する場合は、Universal SSL証明書の提示には、権限DNSプロバイダーで、[DNS認証記録](https://support.cloudflare.com/hc/articles/360020615111#h_989980109291544055191509)を手動で追加する必要があります。専用SSL証明書も、通常15分以内に発行されます。

認証局がブランド、フィッシング、TLD要件を手動で確認する必要がある場合、Universal SSL証明書の発行に24時間以上かかることがあります。

___

### SSL無効ブランドチェックとはどういう意味ですか？

商標登録されているドメインに抵触する単語が含まれている場合、Universal SSLの対象外となるドメインもあります。

この問題を解決するために、以下のどちらかを行います。

-   ドメインがBusinessプランか[Enterprise](https://www.cloudflare.com/enterprise-service-request)プランの場合、[証明書をアップロードする](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-)、または
-   [専用証明書](https://support.cloudflare.com/hc/en-us/articles/228009108-Dedicated-SSL-Certificates)を購入する

___

### 訪問者全員をHTTPS/SSLにリダイレクトするにはどうすればいいですか？

ドメインでサブドメインとホスト全てのトラフィックをリダイレクトするには、Cloudflare **SSL/TLS** アプリの**「Edge証明書」**タブにある**常にHTTPSを使用する**機能を有効にしてください。または、サイト全体をHTTPSにリダイレクトしたくない場合は、Cloudflareの**[Page Rule](https://support.cloudflare.com/hc/en-us/articles/218411427)**アプリを使用して、URLベースでリダイレクトします。

Cloudflare経由でサイトを保護しつつ、オリジンWebサーバーでリダイレクトを実行することはお勧めしません。

-   Page Ruleのリダイレクトは、Cloudflare Edgeで処理されてレスポンスが速くなり、サーバーへのリクエスト減少という結果につながります。
-   オリジンWebサーバーのリダイレクトは、[リダイレクトループエラー](https://support.cloudflare.com/hc/articles/115000219871)を引き起こす可能性があります。

Page Ruleを設定する際、_常にHTTPSを使用する_アクションが、HTTPリクエストをHTTPSにリアダイレクトするのに最も簡単な方法です。また、HTTPSの強制に加えて、他のサブドメインにリダイレクトする必要がある場合は、_転送URL_アクションを_301_のリダイレクトで使うことができます。例えば、Page Ruleが一致する


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/*</span></div></span></span></span></code></pre>{{</raw>}}

と_転送URL_の


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.example.com/$1</span></div></span></span></span></code></pre>{{</raw>}}

が、URLディレクトリを保持する一方で、_example.com_ ルートドメインのリクエストを_www.example.com_サブドメインにリダイレクトします。

ブラウザが、リクエストをする以前に含まれるリソースのプロトコルをチェックするため、HTTPSの強制では[混在コンテンツ](https://support.cloudflare.com/hc/en-us/articles/200170476-How-do-I-fix-the-SSL-Mixed-Content-Error-Message-)の問題は解決されません。HTTPSに強制するページの関連リンクまたはHTTPSリンクだけを使用する必要があります。[HTTPの自動書き換え](https://support.cloudflare.com/hc/en-us/articles/227227647-How-do-I-use-Automatic-HTTPS-Rewrites-)の機能性を使って、Cloudflareが混在コンテンツリンクを自動的に解決します。

___

### SSLはホスティングパートナーにも機能しますか？

無料のUniversal SSL証明書は、新しいCloudflareドメイン全てで利用可能となり、CNAMEとFull DNS統合の両方を通じてホスティングパートナー経由で追加されます。

Cloudflareを介してサブドメインをプロキシし、無料Universal SSL証明書を提示してください。

___

### Cloudflare SSL証明書は共有できますか？

Universal SSL証明書は、複数のお客様に複数のドメインを通して共有できます。証明書の共有を不安に思われるなら、Cloudflareは[専用SSL証明書またはカスタムSSL証明書](https://support.cloudflare.com/hc/articles/203295200)をお勧めします。

___

### SSL証明書は自分のWebサイトにインストールされているのに、Cloudflare証明書が表示されるのはなぜですか？

Cloudflareは、悪意のあるトラフィックをキャッシュし、フィルターをかけるために、トラフィック を複合化する必要があります。**SSL/TLS** アプリの「**概要**」タブで選択された[SSLオプション](https://support.cloudflare.com/hc/articles/200170416)次第で、Cloudflareは、トラフィック を再暗号化するか、PlainテキストトラフィックをオリジンWebサーバーを送信します。

___

### 他からSSL証明書を購入したけれど、Cloudflareでも使いたい

BusinessプランとEnterpriseプランのドメインでは、[カスタムSSL証明書](https://support.cloudflare.com/hc/articles/200170466)アップロードができます。

___

### 自分のサイトがHTTPS/SSLだけを使うようにするにはどうすればいいですか？

HTTPSにトラフィックを全て強制するには、Cloudflare **SSL/TLS** アプリまたは[**Page Rule**アプリ](https://support.cloudflare.com/hc/articles/200170536)を経由して「**Edge証明書**」タブ内にある「常にHTTPSを使用する」機能を有効化します。

___

### Project Galileoは、SSLサポートがありますか？

Project Galileoのお客様は、Cloudflareの[無料Universal SSL](https://www.cloudflare.com/ssl)を使用して、サイトのトラフィックを保護することができます。

___

### Cloudflareの有効化はPaypalのTSL 1.2 要件に影響しますか？

いいえ、Cloudflareはpaypal.comとの直接接続をプロキシしないため、ドメインでCloudflareを有効化しても、TLS接続に影響を与えることはありません。

こうした基準をご利用のサーバーまたはブラウザがサポートするかどうか確認するには、PayPalを使っているクライアントまたはブラウザから[https://tlstest.paypal.com](https://tlstest.paypal.com/) を開いてください。**PayPal\_Connection\_OK** というレスポンスは、クライアントがすでにPayPalと互換性のあるTLS基準をサポートしていることを示します。

___

### Cloudflareの中国データセンターからのSSL証明書を提示するにはどうすればいいですか？

Cloudflare [Universal SSL](https://support.cloudflare.com/hc/articles/204151138) と[専用SSL](https://support.cloudflare.com/hc/articles/228009108)証明書は中国では展開されません。Enterpriseプランのドメインで、中国のデータセンターへのアクセス権がある場合、中国にあるCloudflareのデータセンターだけが次の条件のもと、ドメインにSSL証明書を提供できます。

1.  [カスタムSSL証明書](https://support.cloudflare.com/hc/articles/200170466)のアップロードが完了しました。
2.  「**中国のプライベートキー（カスタム証明書）を許可する**」は、Cloudflare **SSL/TLS**アプリの**Edge 証明書**タブで、_On_に設定されます。

___

### Cloudflareは、TSLクライアント認証をサポートしていますか？

TLSクライアント認証は、クライアントが提示する証明書に会社のルート認証局証明書が署名しているかどうかを検証します。リクエストごとにこの証明書を検証することで、権限を持つクライアント接続に制限がかかることがあります。Cloudflareを用いたTLSクライアント認証を有効にするには、[相互TLS認証](/access/service-auth/mtls/)で弊社の文書を参照してください。

___

### Universal SSLをGithubで有効化するにはどうすれがいいですか？  

[GitHubページでCloudflareのUniversal SSLを使用する方法](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/)については、Cloudflareにブログを参照してください。
