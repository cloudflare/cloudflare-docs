---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/360020991331-%E3%83%99%E3%83%B3%E3%83%80%E3%83%BC%E5%9B%BA%E6%9C%89%E3%81%AEDNS%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92Cloudflare%E3%81%AB%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B
title: ベンダー固有のDNSレコードをCloudflareに追加する
---

# ベンダー固有のDNSレコードをCloudflareに追加する

-   [Cloudflare外のサブドメインの権限委任を行う](https://support.cloudflare.com/hc/ja/articles/360021357131-Cloudflare%E5%A4%96%E3%81%AE%E3%82%B5%E3%83%96%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%AE%E6%A8%A9%E9%99%90%E5%A7%94%E4%BB%BB%E3%82%92%E8%A1%8C%E3%81%86 "Cloudflare外のサブドメインの権限委任を行う")
-   [ベンダー固有のDNSレコードをCloudflareに追加する](https://support.cloudflare.com/hc/ja/articles/360020991331-%E3%83%99%E3%83%B3%E3%83%80%E3%83%BC%E5%9B%BA%E6%9C%89%E3%81%AEDNS%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92Cloudflare%E3%81%AB%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B "ベンダー固有のDNSレコードをCloudflareに追加する")

## ベンダー固有のDNSレコードをCloudflareに追加する

_この記事では、Google Cloud、Amazon S3、Microsoft Azure、ClickFunnels、WPEngine、およびZohoを含む、さまざまなサードパーティソフトウェアをサポートするために、CloudflareにDNSレコードを追加する方法を説明します。_

___

この記事を読むにあたって、Cloudflareダッシュボードを介したDNSレコードの管理に関する事前知識が必要となります。  詳細については、Cloudflareの記事[「DNSレコードを管理する」](https://support.cloudflare.com/hc/en-us/articles/360019093151)を参照してください。

  
**Google**

次のMXレコードを追加します：

| **お名前** | **TTL** | **レコードタイプ** | **優先度**  | **ターゲット** |
| --- | --- | --- | --- | --- |
| @ | 自動 | MX | 1 | ASPMX.L.GOOGLE.COM |
| @ | 自動 | MX | 5 | ALT1.ASPMX.L.GOOGLE.COM |
| @ | 自動 | MX | 5 | ALT2.ASPMX.L.GOOGLE.COM |
| @ | 自動 | MX | 10 | ALT3.ASPMX.L.GOOGLE.COM |
| @ | 自動 | MX | 10 | ALT4.ASPMX.L.GOOGLE.COM |

追加すると、次のようなDNSレコードがCloudflareの**DNS**アプリに表示されます：

[Google Appsメールの設定をテストします](https://toolbox.googleapps.com/apps/checkmx/check)。

Google App Engineの_CNAMEレコード_をCloudflare DNSに追加します。

たとえば、ドメインが_www.example.com_の場合、 _CNAMEレコード_は次のようになります：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www CNAME ghs.googlehosted.com</span></div></span></span></span></code></pre>{{</raw>}}

Google Appsドメインのリダイレクトを設定するには、[転送URLに関するGoogleのガイド](https://support.google.com/a/answer/53340?hl=en)を参照してください。

**Amazon**

AWSのお客様は、Cloudflareダッシュボードの**Overview**アプリに記載されているCloudflareネームサーバーを指すようにドメインのネームサーバーを更新しなければなりません：

1.  AWSにログインします。
2.  ナビゲーションバーの右上にある**「マイアカウント（My Account）」**をクリックします。
3.  ドロップダウンから**「AWSマネジメントコンソール（AWS Management Console）」**を選択します。
4.  **「サービス（Services）」**をクリックして、**「ルート53（Route 53）」**を選択します。
5.  二箇所のネームサーバーを更新します：
    
    -   **「ホストゾーン（Hosted zones）」**をクリックして、Cloudflareのネームサーバーを更新するドメインを選択します。
    -   Cloudflareのネームサーバーを指すようネームサーバーを編集します。
    
      
    -   **「登録済みドメイン（Registered domains）」**をクリックします。
    -   Cloudflareのネームサーバーを更新するドメインを選択します。
    -   **「ネームサーバーの追加または編集（Add or edit name servers）」**をクリックします。

[Amazon S3バケット](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)[を作成する](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)方法については、Amazonのドキュメントを参照してください。

バケットに割り当てられているフルホストURLに注意してください。

Cloudflare DNS内でAWSバケットの_CNAMEレコード_を追加します。 たとえば、バケットのフルホストURLが_files.example.com_である場合、 以下のような_CNAMEレコード_を追加します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">files CNAME files.example.com.s3.amazonaws.com</span></div></span></span></span></code></pre>{{</raw>}}

[SESおよび検証の設定](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim.html)については、Amazonのドキュメントを参照してください。

Amazonが提供する_TXT_と_CNAME_の検証レコードを検索します。

レコードをCloudflare DNSに追加します。  たとえば、Cloudflareドメインが_example.com_の場合、DNSレコードは次のようになります：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com TXT  &quot;fmxqxT/icOYx4aA/bEUrDPMeax9/s3frblS+niixmqk=&quot; verificationstring._domainkey.example.com CNAME verificationstring.dkim.amazonses.com</span></div></span></span></span></code></pre>{{</raw>}}

AmazonでのELB設定については、[AmazonのELBヘルプコンテンツ](http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html)を参照してください。

1.  ホスト名に対する_CNAMEレコード_をCloudflareに追加します。例：_elb_
2.  Cloudflare **DNS**アプリで、**ドメイン名**をELBターゲットに置換します：  
    _  
    <AWS hostname>.<region>。_elb.amazonaws.comは正しい_CNAME_ターゲットフォーマット  
    です（例：_my-cool-cachepp-1344276401.eu-west-1._elb.amazonaws.com）。
3.  AWSサポートに連絡して、_AWSホスト名_または_地域_を確認してください。

**Microsoft**

Microsoftの[「DNS設定値を設定する」](https://www.windowsazure.com/en-us/develop/net/common-tasks/custom-dns-web-site/)手順に従います。

Azureの必要なレコードをCloudflare DNSに追加します。

たとえば、ドメインが_example.com_の場合、レコードフォーマットは次のようになります：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com A 203.0.113.1 www.example.com CNAME  example.azurewebsites.net</span></div></span></span></span></code></pre>{{</raw>}}

検証レコードについては、Azureのドキュメント[「ドメイン検証レコードを作成する」](https://docs.microsoft.com/en-us/office365/admin/dns/create-dns-records-for-azure-dns-zones?view=o365-worldwide#add-a-txt-record-for-verification)を参照してください。

**そのほかのベンダー**

正しいZoho DNSレコードをCloudflareに追加する場合は、以下の例を参照してください。 すべての例で、_example.com_を実際のドメイン名に置換します：

-   Zoho _MXレコード_を追加します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com MX mx.zohomail.com (set Priority to 10) example.com MX mx2.zohomail.com (set Priority to 20)</span></div></span></span></span></code></pre>{{</raw>}}

-   （オプション）_SPFレコード_を追加します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com TXT v=spf1 mx include:zoho.com ~all</span></div></span></span></span></code></pre>{{</raw>}}

-   （オプション）[カスタムZoho URL](https://adminconsole.wiki.zoho.com/domains/CustomURL.html)経由でメールにアクセスするには、_CNAMEレコード_を追加します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">mail CNAME business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

-   （オプション）[Zohoドメイン検証レコード](https://www.zoho.com/mail/help/adminconsole/domain-verification.html)を追加するには、次のようにします：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">zb******** CNAME business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

通常、DNSレコードは以下のようなものになります。 _example.com_を実際のドメイン名に置換します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">email CNAME sendgrid.net example.com SPF v=spf1 a mx include:sendgrid.net ~all example.com TXT v=spf1 a mx include:sendgrid.net ~all mtpapi._domainkey.EXAMPLE.com CNAME dkim.sendgrid.net. smtpapi._domainkey.e.EXAMPLE.COM CNAME dkim.sendgrid.net</span></div></span></span></span></code></pre>{{</raw>}}

-   DNS設定については、[WPEngineのドキュメント](http://wpengine.com/support/how-to-configure-your-dns/)を参照してください。
-   _Aレコード_または_CNAMEレコード_をCloudflare DNSに追加するかどうかを決めます：  
    [WPengineでIPアドレスを見つける](http://wpengine.com/support/find-ip/)

  

-   レコードの追加の詳細については、Cloudflare のドキュメント[「DNSレコードを管理する」](https://support.cloudflare.com/hc/en-us/articles/360019093151)を参照してください。

Ningのドキュメント[「カスタム ドメインとDNSエントリー」](http://www.ning.com/help/?p%3D2870)を参照してください。

Ningカスタムドメインが_www.example.com_の場合、 次のように_CNAMEレコード_と_Aレコード_を追加します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.example.com CNAME example.ning.com. example.ning.com A 208.82.16.68</span></div></span></span></span></code></pre>{{</raw>}}

Ningがドメインを確認したら、トラフィックがCloudflareにプロキシできるように、NingのDNSレコードのグレー色の雲マークをオレンジ色の雲マークに変更します。

DNSレコード要件の最新情報については、SmugMugのドキュメントを参照してください。通常、次のようなSmugMugの_CNAMEレコード_を追加します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">photo CNAME domains.smugmug.com photos CNAME domains.smugmug.com</span></div></span></span></span></code></pre>{{</raw>}}

SmugMugがドメインを確認したら、トラフィックがCloudflareにプロキシできるように、SmugMugのDNSレコードのグレー色の雲マークをオレンジ色の雲マークに変更します。

DNSレコード要件に関する最新情報については、[DNSレコードに関するMandrillの記事](http://help.mandrill.com/entries/22030056-How-do-I-add-DNS-records-for-my-sending-domains-)を参照してください。

Mandrillでは、_SPFレコード_と_DKIMレコード_を追加する必要があります。 MandrillからDNSレコード値を取得してください。

Cloudflare DNSアプリ内で_SPFレコード_と_DKIMレコード_を_TXTレコード_として追加します。

たとえば、_example.com_がMandrillドメインの場合、次のようなDNSレコードを追加します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com TXT v=spf1 include:spf.mandrillapp.com ?all mandrill._domainkey.example.com TXT v=DKIM1\; (values from Mandrill)</span></div></span></span></span></code></pre>{{</raw>}}

ドメインネームサーバーがCloudflareに設定されていることを確認したら、以下の手順に従います。 

1\. Cloudflareダッシュボードにログインします。

2\. レコードを追加するドメインの該当するCloudflareアカウントをクリックします。

3\. 正しいドメインが選択されていることを確認します。

4\. **DNS**アプリをクリックします。

5\. 4つのAレコードすべてとSquarespaceからのwww CNAMEが（以下に示されているように）_「プロキシ済み（Proxied）」_とマークされていることを確認します。

6\. 「verify.squarespace.com」のCNAMEレコードが（以下のように）_DNS Only_とマークされていることを確認します。

![cloudflare_with_squarespace.png](/images/support/cloudflare_with_squarespace.png)

正しく設定されている場合、「Squarespace DNS設定（Squarespace DNS Settings）」ページに「設定に問題があります（Settings contain problems）」と表示されるようになります。 **これは、想定される動作です**。 

![squarespace_dns_settings.png](/images/support/squarespace_dns_settings.png)トラフィックがCloudflareを通じて送信されるようになったので、Squarespaceとサイトの訪問者はCloudflareのIPアドレスを見るようになります。これにより、Squarespaceコンソールは、Squarespaceが割り当てたアドレスではなくCloudflare IPが返されたため、サイトの設定が間違っているとみなします。 Cloudflare DNSを適切に設定している限り（上記の手順1～6）、SquarespaceサイトはCloudflareを通じて動作するはずです。

_example.com_がカスタムドメインである場合は、以下のようなDNSレコードをCloudflareに追加します：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com A 66.6.44.4 www.example.com CNAME domains.tumblr.com</span></div></span></span></span></code></pre>{{</raw>}}

___

## 関連リソース

-   [CloudflareのDNSレコードを管理する](https://support.cloudflare.com/hc/en-us/articles/360019093151)
-   [CNAMEのフラット化](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)
