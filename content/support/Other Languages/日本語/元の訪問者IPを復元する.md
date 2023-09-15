---
pcx_content_type: troubleshooting
language_tag: japanese
source: https://support.cloudflare.com/hc/ja/articles/200170786-%E5%85%83%E3%81%AE%E8%A8%AA%E5%95%8F%E8%80%85IP%E3%82%92%E5%BE%A9%E5%85%83%E3%81%99%E3%82%8B
title: 元の訪問者IPを復元する
---

# 元の訪問者IPを復元する

## 元の訪問者IPを復元する

_訪問者のオリジナルIPアドレスを記録するために、オリジンWebサーバーのタイプ(Apache、NGINX、Microsoft IISなど）に基づいてmod\_cloudflareを設定する方法を説明します。_

### 本記事の内容

-   [概要](https://support.cloudflare.com/hc/ja/articles/200170786-%E5%85%83%E3%81%AE%E8%A8%AA%E5%95%8F%E8%80%85IP%E3%82%92%E5%BE%A9%E5%85%83%E3%81%99%E3%82%8B#cF7JFXws2pZ4bgu)
-   [mod\_remoteip](https://support.cloudflare.com/hc/ja/articles/200170786-%E5%85%83%E3%81%AE%E8%A8%AA%E5%95%8F%E8%80%85IP%E3%82%92%E5%BE%A9%E5%85%83%E3%81%99%E3%82%8B#C5XWe97z77b3XZV)
-   [mod\_cloudflare](https://support.cloudflare.com/hc/ja/articles/200170786-%E5%85%83%E3%81%AE%E8%A8%AA%E5%95%8F%E8%80%85IP%E3%82%92%E5%BE%A9%E5%85%83%E3%81%99%E3%82%8B#S7Z4EJQFN997YRY)
-   [Webサーバーの説明](https://support.cloudflare.com/hc/ja/articles/200170786-%E5%85%83%E3%81%AE%E8%A8%AA%E5%95%8F%E8%80%85IP%E3%82%92%E5%BE%A9%E5%85%83%E3%81%99%E3%82%8B#JUxJSMn3Ht5c5yq)
-   [HAProxyで元の訪問者IPを復元する](https://support.cloudflare.com/hc/ja/articles/200170786-%E5%85%83%E3%81%AE%E8%A8%AA%E5%95%8F%E8%80%85IP%E3%82%92%E5%BE%A9%E5%85%83%E3%81%99%E3%82%8B#h_4vfodjrBunNww4MmSGAgmh)
-   [関連リソース](https://support.cloudflare.com/hc/ja/articles/200170786-%E5%85%83%E3%81%AE%E8%A8%AA%E5%95%8F%E8%80%85IP%E3%82%92%E5%BE%A9%E5%85%83%E3%81%99%E3%82%8B#h_qHFQv3Kt9lWvqXaP3womy)

___

## 概要

 [WebサイトトラフィックがCloudflreネットワークを介してルーティングしている](https://support.cloudflare.com/hc/articles/205177068)時、当社はリバースプロキシとして機能します。これにより、パケットをより効率的にルーティングし、静的リソース（画像、JavaScript、CSSなど）のキャッシングして、Cloudflareはページ読み込み時間をスピードアップさせられます。その結果として、リクエストに応答してそれをログし、オリジナルサーバーが [Cloudflare IP アドレス](https://www.cloudflare.com/ips/)を返します。

例えば、元の訪問者の受信IPアドレスに依存するアプリケーションをインストールする場合、CloudflareのIPアドレスがデフォルトでログに記録されます。元の訪問者のIPアドレスは、[_CF-Connecting-IP_](https://support.cloudflare.com/hc/articles/200170986) というHTTPヘッダを付加して表示されます。[Webサーバーの説明書](https://support.cloudflare.com/hc/articles/200170786#JUxJSMn3Ht5c5yq) に従えば、オリジンサーバーで元の訪問者のIPアドレスを記録することができます。リクエストがオリジンサーバーに到達したときにこのHTTPヘッダーが利用できない場合は、[Transform Rules](/rules/transform/)と[Managed Transforms](/rules/transform/managed-transforms/) の設定を確認してください。

次の図は、Cloudflareを利用する場合と利用しない場合のIPアドレス処理の違いを示しています。

![The diagram illustrates the different ways that IP addresses are handled with and without Cloudflare.](/images/support/Restoring_IPs__1_.png)

___

## mod\_remoteip

### 概要

Cloudflareでは、 _mod\_cloudflare_ の更新およびサポートを終了させていただきました。しかし、 Apache Webサーバーを **Ubuntu Server 18.04** や **Debian 9 Stretch**などのオペレーテングシステムでお使いの場合は、 _mod\_remoteip_ を使って、訪問者のオリジナルIPアドレスを記録することは可能です。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">このモジュールは外部関係者によって作成されているため、当社はプラグインに関係する問題に対してのテクニカルサポートが提供できません。</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Apache Webサーバーで _mod\_remoteip_ をインストールするには：

1\.  _mod\_remoteip_ を有効化するために次のコマンドを出します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enmod remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

2\.  _RemoteIPHeader CF-Connecting-IP_を含むサイト設定に更新します。例： `/etc/apache2/sites-available/000-default.conf`


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerAdmin webmaster@localhost</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DocumentRoot /var/www/html</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerName remoteip.andy.support</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ErrorLog ${APACHE_LOG_DIR}/error.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CustomLog ${APACHE_LOG_DIR}/access.log combined</span></div></span></span></span></code></pre>{{</raw>}}

3\.  `apache.conf`で結合された _LogFormat_ エントリを `/etc/apache2/apache2.conf.` で、 _%h_ を _%a_ に替えてから更新してください。例えば、現在の _LogFormat_ は次のように表示されています。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

 _LogFormat_ を次のように更新します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%a %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4\. 次のコードと [Cloudflare IP](https://www.cloudflare.com/ips/)を入力して、 `/etc/apache2/conf-available/remoteip.conf` を作成し、信頼されるプロキシアドレスを定義します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.1 (example IP address)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.2 (IPアドレスの例)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">( [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/)に記載されているすべてのCloudflare IPについて繰り返します）</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5\. Apacheの設定を有効にします。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enconf remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Enabling conf remoteip.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">新しい設定を有効にするには、</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">service apache2 reloadを実行する必要があります。</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

6\. Apache設定をテストします。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo apache2ctl configtest</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Syntax OK</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

7\. Apacheを再起動します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo systemctl restart apache2</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## mod\_cloudflare

mod\_cloudflare のインストールには、GitHub から Apache 拡張機能をダウンロードする方法と、オリジンのWebサーバーにコードを追加する方法の2種類があります。

### Githubからパケットやスクリプトをダウンロードする

Apache Webサーバーを使用している場合、[GitHub](https://github.com/cloudflare/mod_cloudflare)から mod\_cloudflare をダウンロードすることができます。

### オリジンWebサーバー にコードを追加する方法

mod\_cloudflareをインストールできない場合、またはコンテンツ管理システムプラットフォームに使えるCloudflareプラグインがなく、オリジナル訪問者のIPが復元できない場合、オリジナル訪問者のIPを必要とするページにある<body>タブの中か、その前に、このコードをオリジンWebサーバーに追加してください。

`<?php if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];?>`

この作業では、IPアドレスが必要なスクリプトで利用できるようになっただけです。実際のサーバーログにIPを保存するということではありません。

### Apache

 _mod\_cloudflare_を削除するには、 _mod\_cloudflare_を読み込むApache設定行にコメントアウトしなければなりません。

これは、Linuxディストリビューションによって異なりますが、ほとんどの人は`in /etc/apache2`を見れば、その行を見つけるための検索ができるはずです。

`LoadModule cloudflare_module`

この行にコメントするか、この行を削除し、Apacheを再起動させると _mod\_cloudflare_ がなくなっているはずです。

UbuntuやDebianを実行している場合は、次を見てください。

`file/etc/apache2/mods-enabled/cloudflare.load`

このファイルを削除して、 _mod\_cloudflare_を消去します。それからApacheを再起動します。

### Nginx

Mod\_cloudflareは、 [NGINX設定ファイル](http://nginx.org/en/docs/http/ngx_http_realip_module.html) `nginx.conf` を `ngx_http_realip_module`で変更することで、インストールされます。

 _mod\_cloudflare_ を消去するには、この行をコメントまたは消去する必要があります。それからNGINXを再起動させると、 _mod\_cloudflare_ はなくなっているはずです_。_

___

## Webサーバーの説明

Webサーバーの種類に応じたオリジナルの訪問者IPを記録するための設定方法については、以下を参照してください。

1.  以下がインストールされていることを確認してください。
    -   Red Hat/Fedora`sudo yum install httpd-devel libtool git`
    -   Debian/Ubuntu`sudo apt-get install apache2-dev libtool git`
2.   _mod\_cloudflare_の最新ビルドのために以下を複製します:
    -   Red Hat/Fedora/Debian/Ubuntu:`git clone https://github.com/cloudflare/mod_cloudflare.git; cd mod_cloudflare`
3.  Apache拡張ツールを使用して、.c fileをモジュールに変換します：
    -   Red Hat/Fedora/Debain/Ubuntu:`apxs -a -i -c mod_cloudflare.c`
4.  再起動させ、モジュールがアクティブであることを確認します：
    -   Red Hat/Fedora`service httpd restart; httpd -M|grep cloudflare`
    -   Debian/Ubuntu:`sudo apachectl restart; apache2ctl -M|grep cloudflare`
5.  Webサーバーはロードバランサの背部にある場合は、以下の行をApache設定 (通常、httpd.conf)に追加し、123.123.123.123をロードバランサのIPアドレスに置き換えます。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">IfModule cloudflare_module</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPHeader X-Forwarded-For</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPTrustedProxy **[ロードバランサのIPアドレスを挿入]**</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DenyAllButCloudFlare</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/IfModule</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

[`ngx_http_realip_module` NGINX モジュール](http://nginx.org/en/docs/http/ngx_http_realip_module.html) および以下の設定パラメータを使用します。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">set_real_ip_from 192.0.2.1 (IPアドレスの例)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">( [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/)に記載されているすべてのCloudflare IPについて繰り返します)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">以下の二つのうち、どちらかを使用</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">real_ip_header CF-Connecting-IP;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#real_ip_header X-Forwarded-For;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

プレフィックスのリストは定期的に更新される必要があり、 [Cloudflare IPアドレス](https://www.cloudflare.com/ips)に完全版リストを公開しています。

[CloudflareとNGINX](https://danielmiessler.com/blog/getting-real-ip-addresses-using-cloudflare-nginx-and-varnish/) も参照してください。

1.  次のスクリプトを実行して、EasyApache の一部としてmod\_cloudflareをインストールします: `bash<(curl -s https://raw.githubusercontent.com/cloudflare/mod_cloudflare/master/EasyApache/installer.sh)`
2.  インストールにあたり、Apacheを新規のmod\_cloudflare プラグインでリコンパイルする必要があります。

Railgun(または、Varnishなどのリバースプロキシソフトウェア)を使用する時、ユーザーのリクエストはCloudflareの代わりに、Railgunサーバーから送信されます。これは、リクエストが直接Cloudflareから送信されず、mod\_cloudflareがデフォルトで訪問者IPアドレスを復元しないからです。

1.  これを修正するには、Apache設定を開きます。これは通常、 `/etc/apache2/apache2.conf` `/etc/httpd/httpd.conf`、 `/usr/local/apache/conf/httpd.conf` o、またはほかのロケーションで見つかります。不明な場合は、ホスティングプロバイダーにお問い合わせください。
2.  最後に追加するもの:`CloudflareRemoteIPTrustedProxy railgun_address`したがって、Railgunサーバーが127.0.0.1にある場合、次のようになります：`CloudflareRemoteIPTrustedProxy 127.0.0.1`
3.  3\. 信頼するプロキシ一覧に追加するサーバーが複数ある場合、最後にそうしたサーバーを追加することができます：CloudflareRemoteIPTrustedProxy 127.0.0.1 127.0.0.2

Lighttpdが自動的にログとアプリケーションにアクセスするためのサーバーIPを書き換えるようにするには、以下のソリューション二つのどちらかにしたがってください。

1.  **lighttpd.conf** ファイルを開き、 _mod\_extforward_ を _server.modules_ に追加します。 _mod\_accesslog_ の **あと** に来ないと、アクセスログに実際のIP が表示されません。
2.  **lighttpd.conf**ファイルの任意の場所に、以下のコードブロックをサーバモジュールリストの後に追加し、Lighttpdを再起動します


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$HTTP[&quot;remoteip&quot;] == &quot;192.2.0.1 (IPアドレスの例)&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.forwarder = ( &quot;all&quot; =&gt; &quot;trust&quot; )</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.headers = (&quot;CF-Connecting-IP&quot;)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">([https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/) に記載されているすべてのCloudflare IPについて繰り返す)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  「LiteSpeed Web Admin Console」に移動します。
2.  「設定」の「ヘッダ」にある「クライアント IPを使用する」オプションを有効化します。
3.  有効になると、アクセスログが正しいIPアドレスを表示します。そして、PHPの`$_SERVER['REMOTE_ADDR']` 変数に、Cloudflare IPアドレスの代わりとなるクライアントの実IPアドレスが含まれます。（WordPressまたはｖBulletinなどがインストールする）PHP有効化Webサイトで、Cloudflareを有効化すると、それ自体であなたが直面する問題の多くを解決してくれます。

##### IIS 7 - 8の場合:

 [こちら](https://techcommunity.microsoft.com/t5/iis-support-blog/how-to-use-x-forwarded-for-header-to-log-actual-client-ip/ba-p/873115)の指示に従ってください。

##### IIS 8.5 - 10の場合:

IIS 8.5以降では、カスタムログインがビルトインオプションとなっています。 [IIS Enhanced Logging](http://www.iis.net/learn/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85)を参照してください

1.  IIS Managerで、作業中のサイトの_アクション（Actions）_ メニューの **ログイン(Logging)** をダブルクリックしてください。
2.  起動後、フォーマットとして **W3C**を選択してから、 _ログファイル(Log File)_サブセクションでフォーマットドロップダウンのとなりにある **フィールドを選択する(Select Fields)**をクリックします。
3.   **フィールドを追加する(Add Field)** をクリックし、 _CF-Connecting-IP_ ヘッダに追加します。
4.   **Ok**をクリックします。これで、 **カスタムフィールド(Custom Fields)**で、新しいエントリが反映されているはずです。戻ったときに _ロギング_ ウィンドウで **適用(Apply)** をクリックします。

1.  無事に完了すると、ログファイルにアンダーバーが付きます。フィールドでの変更がこのように確認できます。
2.  変更がすぐに反映されない場合は、サイトを再起動します。次に W3SVC、そしてインスタント全体を再起動します。IIS 8.5+で拡張ロギングを使用する場合 **、** アプリケーションレベルのオリジナルビジターIPを復元しません。

Tomcat 7が自動的にオリジナル訪問者IPをあなたのアクセスログとアプリケーションに復元するようにするには、ログスキーマに `%{CF-Connecting-IP}i` を追加する必要があります。

例えば、以下のブロックを `server.xml` ファイルに追加することができます。

`<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log."suffix=".txt" pattern="%{CF-Connecting-IP}i - %h %u %t - &quot;%r&quot; - %s - %b - %{CF-RAY}i"/>`

その結果、ログは次のようになります。

`Visitor IP - Cloudflare IP - [04/Dec/2014:23:18:15 -0500] - "GET / HTTP/1.1" - 200 - 1895 - 193d704b85200296-SJC`

 [MagentoとCloudflare](https://tall-paul.co.uk/2012/03/02/magento-show-remote-ip-when-using-cloudflare/)で、オリジナル訪問者IPを復元するためのサードパーティのチュートリアルを参照してください。

同様に、Cloudflareがこの [Magento拡張](https://marketplace.magento.com/)を書き込みませんでしたが、役立つと感じた当社のお客様もいらっしゃいました。

このモジュールは外部関係者によって作成されているため、当社はプラグインに関係する問題に対してテクニカルサポートが提供できません。

Cloudflareを介してインビジョンパワーボード3インストールを実行するときに、正しいIPのマッチングを有効化するには、次の手順に従ってください:

IPBインストールのACPにログインするします。

1.  **システム** をクリックします。
2.  「概要」の下の「 **セキュリティ**」(Security)をクリックします。
3.  セキュリティセンターの下の「 **セキュリティ設定**」をクリックします。 _プロキシが提供する信頼IPアドレスをチェックしますか？_ がグリーンであることを確認します。

#####  _プロキシが提供するIPアドレスを信頼しますか?_のIPB4説明

ネットワーク環境で、リクエストがプロキシ経由（オフィスや大学構内のインターネット状況、または負荷分散サーバークラスターなど）で処理されていることが分かる場合、正しいIPアドレスが使われるように、この設定を有効化する必要があるかもしれません。ただし、有効化する際に、悪意のあるユーザーがシステムを悪用して偽のIPアドレスを提示する可能性があります。ほとんどの環境では、この設定をオフにしておくべきでしょう。

Apacheサーバーをご利用なら、ログに訪問者IPを復元させるために[mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) のインストールをお勧めします。

MODをインストールするためにサーバーにアクセスできない場合は、[コアを変更する](https://www.phpbb.com/community/viewtopic.php?p=13936406#p13936406)ことができるかもしれません。

MyBBの最新バージョンには、「ユーザーIPアドレスを詳しく調べる」オプションが含まれています。

`管理CP＞設定＞サーバーと最適化オプション＞ユーザーのIPアドレスを詳しく調べますか？>はい`

また、MyBB 1.6で利用できる [Cloudflare管理プラグイン](https://mods.mybb.com/view/antoligy-mybb-cloudflare-management-plugin) をインストールすることもできます。

##### MyBB 1.6.0, 1.6.1, 1.6.2, または 1.6.3

1.   `./inc/functions.php`に移動します。
2.  2790行目へ移動します。
3.  置き換えます：`if(isset($_SERVER['REMOTE_ADDR']))`それと：`if(isset($_SERVER['HTTP_CF_CONNECTING_IP']))`
4.  再度、置換します：`$ip = $_SERVER['REMOTE_ADDR'];`それと：`$ip = $_SERVER['HTTP_CF_CONNECTING_IP'];`

Vanillaチームのメンバーが、 [Vanilla用のCloudflareプラグイン](https://open.vanillaforums.com/addon/cloudflaresupport-plugin) を作成しており、オリジナル訪問者IPを自己ホストサイトのログファイルに復元することができます。

このモジュールは外部関係者によって作成されているため、当社はプラグインに関係する問題に対してテクニカルサポートを提供できません。

1.   `includes/GlobalFunctions.php`を開きます。370行目ぐらいで、以下のように変更します。`$forward = "\t(proxied via {$_SERVER['REMOTE_ADDR']}{$forward})";`から`$forward = "\t(proxied via {$_SERVER['HTTP_CF_CONNECTING_IP']}{$forward})";`
2.   `includes/ProxyTools.php`を開きます。79行目ぐらいで、以下を探します。`if ( isset( $_SERVER['REMOTE_ADDR'] ) ){`そして、次に置き換えます：`if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ){`第２ステップは、MediaWiki バージョン 1.18.0とそれ以前のバージョンにのみ適用されます。MediaWikiの新しいバージョンは、ProxyTools.phpが完全に書き直され、以下のコードは存在しなくなりました。
3.  80行目ぐらいで以下を探します。`$ipchain = array( IP::canonicalize($_SERVER['REMOTE_ADDR']) );`保存し、オリジンWebサーバーにアップロードします。

##### 1.27.1前後のバージョンの場合：

1.   `GlobalFunctions.php`の1232行に移動して、 `REMOTE_ADDR` を `HTTP_CF_CONNECTING_IP`に変更します。
2.  次に、 `WebRequest.php` 、1151行目から1159行目にかけて、 `REMOTE_ADDR` を `HTTP_CF_CONNECTING_IP`に変更します。

XenForoユーザーが [Cloudflare用のプラグイン](https://xenforo.com/community/resources/solidmean-cloudflare-detect.1595/)を作成しました。

このモジュールは外部関係者によって作成されているため、当社はプラグインに関係する問題に対してテクニカルサポートが提供できません。

1.   `library/config.php`を開きます。
2.  最後に、以下を付け加えます。`if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];}`
3.  アップロードして上書きします。

外部関係者が、オリジナル訪問者IPを復元する [CloudflareとPunBB用のモジュール](http://punbb.informer.com/forums/post/147539/#p147539) を作成しました。

このプラグインは外部関係者によって作成されているため、当社はプラグインに関係する問題に対してテクニカルサポートが提供できません。Cherokeeサーバーは、

1.  サーバーに `cherokee-admin` を開きます。
2.  Webブラウザで **Cherokee管理インターフェース** に移動します。
3.  Cloudflareが提供しているドメインの **仮想サーバー** を選択します。
4.  4\.  _「ロギング」_ タブで選択した **仮想サーバー**で、転送されたIPを受け入れるを有効化します。
5.   _「ホストから受け入れる」_  ボックスに、 [CloudflareのIPアドレス](https://www.cloudflare.com/ips/)を入力します。

Livezillaサーバー上で `PHP IP Server Param` フィールドを `HTTP_CF_CONNECTING_IP`に変更すると、IPアドレスを修正することができます。

訪問者IPをDataLife Engineに復元するには：

1.  Open:/engine/inc/include/functions.inc.php見つけます:`$db_ip_split = explode( ".",$_SERVER['REMOTE_ADDR'] );`次に変更します:`$db_ip_split = explode(".",$_SERVER['HTTP_CF_CONNECTING_IP'] );`
2.  見つけます:`$ip_split = explode( ".",$_SERVER['REMOTE_ADDR'] );`次に変更します:`$ip_split = explode(".",$_SERVER['HTTP_CF_CONNECTING_IP'] );`
3.  Open:/engine/modules/addcomments.php見つけます:`$_SERVER['REMOTE_ADDR'],`次に変更します:`$_SERVER['HTTP_CF_CONNECTING_IP'],`
4.  見つけます:`$db_ip_split = explode( ".",$_SERVER['REMOTE_ADDR'] );`次に変更します:`$db_ip_split = explode( ".",$_SERVER['HTTP_CF_CONNECTING_IP'] );`

外部関係者が、オリジナル訪問者IPをあなたのログに復元する [Cloudflare extension for TYPO3](https://extensions.typo3.org/extension/cloudflare/) 拡張機能を作成しました。この拡張機能により、Cloudflareのキャッシュをクリアにする能力も備わります。

このモジュールは外部関係者によって作成されているため、当社はプラグインに関係する問題に対してテクニカルサポートが提供できません。

ホスティングパネルのVestaCPをご利用の場合は、サーバーでNginxとApacheを両方実行していることになります。リクエストは、Apacheに行く前に、Nginxを通してプロキシされます。

このNginxプロキシのため、実訪問者IPアドレスを戻すためにNginxを設定する手順説明が必要となります。 Apacheの[Mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) は必要ではありません。 [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) をApacheに追加するとNginxサーバー設定と競合しません。

___

## HAProxyで元の訪問者IPを復元する

X\_FORWARDD\_FORヘッダで元のクライアントIPを抽出するためには、HAProxyで以下の設定を行う必要があります。

1.  CF`_ips.lst` https://www.cloudflare.com/en-gb/ips/ からのすべてのIP範囲を含むテキストファイルを作成します。
2.  HAProxyで`転送オプション`が無効になっていることを確認します。

HAProxyのコンフィグです。

`acl from_cf src -f /path/to/CF_ips.lst`

`acl cf_ip_hdr req.hdr(CF-Connecting-IP) -m found`

`http-request set-header X-Forwarded-For %[req.hdr(CF-Connecting-IP)]if from_cf cf_ip_hdr`

___

## 関連リソース

-   [HTTPリクエストヘッダー](/fundamentals/get-started/http-request-headers)
-   [ルールの変更](/rules/transform/)
