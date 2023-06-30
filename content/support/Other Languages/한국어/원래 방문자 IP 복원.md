---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/200170786-%EC%9B%90%EB%9E%98-%EB%B0%A9%EB%AC%B8%EC%9E%90-IP-%EB%B3%B5%EC%9B%90
title: 원래 방문자 IP 복원
---

# 원래 방문자 IP 복원

## 원래 방문자 IP 복원

_mod\_cloudflare를 설정해 원본 웹 서버의 유형에 따라(Apache, Nginx, Microsoft II 등) 원래 방문자의 IP 주소 로그를 기록하는 방법을 알아봅니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/200170786-%EC%9B%90%EB%9E%98-%EB%B0%A9%EB%AC%B8%EC%9E%90-IP-%EB%B3%B5%EC%9B%90#cF7JFXws2pZ4bgu)
-   [mod\_remoteip](https://support.cloudflare.com/hc/ko/articles/200170786-%EC%9B%90%EB%9E%98-%EB%B0%A9%EB%AC%B8%EC%9E%90-IP-%EB%B3%B5%EC%9B%90#C5XWe97z77b3XZV)
-   [mod\_cloudflare](https://support.cloudflare.com/hc/ko/articles/200170786-%EC%9B%90%EB%9E%98-%EB%B0%A9%EB%AC%B8%EC%9E%90-IP-%EB%B3%B5%EC%9B%90#S7Z4EJQFN997YRY)
-   [웹 서버 지침](https://support.cloudflare.com/hc/ko/articles/200170786-%EC%9B%90%EB%9E%98-%EB%B0%A9%EB%AC%B8%EC%9E%90-IP-%EB%B3%B5%EC%9B%90#JUxJSMn3Ht5c5yq)
-   [HAProxy로 원래 방문자 IP 복원](https://support.cloudflare.com/hc/ko/articles/200170786-%EC%9B%90%EB%9E%98-%EB%B0%A9%EB%AC%B8%EC%9E%90-IP-%EB%B3%B5%EC%9B%90#h_4vfodjrBunNww4MmSGAgmh)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/200170786-%EC%9B%90%EB%9E%98-%EB%B0%A9%EB%AC%B8%EC%9E%90-IP-%EB%B3%B5%EC%9B%90#h_qHFQv3Kt9lWvqXaP3womy)

___

## 개요

[웹 사이트 트래픽이 Cloudflare 네트워크를 통해 라우팅된](https://support.cloudflare.com/hc/articles/205177068) 경우, Cloudflare는 리버스 프록시의 역할을 합니다. 이렇게 함으로써, Cloudflare는 패킷을 더 효율적으로 라우팅하고 이미지, JavaScript, CSS 등의 정적 콘텐츠를 캐시해 페이지 로드 시간을 단축할 수 있습니다. 그 결과, 원본 서버가 요청에 응답하고 로그를 작성할 때는 [Cloudflare IP 주소](https://www.cloudflare.com/ips/)를 반환하게 됩니다.

예를 들어 원래 방문자의 유입되는 IP 주소에 의존하는 애플리케이션을 설치하는 경우 기본적으로 Cloudflare IP 주소가 기록됩니다.원래 방문자 IP 주소는 [_CF-Connecting-IP_](https://support.cloudflare.com/hc/articles/200170986) 라는 추가된 HTTP 헤더에 나타납니다. [웹 서버 지침](https://support.cloudflare.com/hc/articles/200170786#JUxJSMn3Ht5c5yq)에 따라 원본 서버에 원래 방문자 IP 주소를 기록할 수 있습니다.요청이 원본 서버에 도달했는데 이 HTTP 헤더를 사용할 수 없는 경우 [변환 규칙](/rules/transform/) 및 [관리형 변환](/rules/transform/managed-transforms/) 구성을 확인하시기 바랍니다.

아래 그림에서 Cloudflare를 사용할 때와 사용하지 않을 때 IP 주소를 어떻게 달리 처리하는지 알 수 있습니다.

![The diagram illustrates the different ways that IP addresses are handled with and without Cloudflare.](/images/support/Restoring_IPs__1_.png)

___

## mod\_remoteip

### 개요

Cloudflare는 이제 _mod\_cloudflare_를 업데이트하거나 지원하지 않습니다.하지만 **Ubuntu Server 18.04**, **Debian 9 Stretch** 등의 운영체제로 Apache 웹 서버를 사용 중인 경우, _mod\_remoteip_를 사용해 원래 방문자의 IP 주소를 기록할 수 있습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">이 모듈은 외부 개발자가 개발한 것이기 때문에 Cloudflare는 이 모듈과 관련된 문제에 대해 기술 지원을 제공할 수 없습니다.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

다음의 단계에 따라 _mod\_remoteip_를 Apache 웹 서버에 설치합니다.

1\. 다음의 명령어를 실행해 _mod\_remoteip_를 활성화합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enmod remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

2\. _RemoteIPHeader CF-Connecting-IP_가 포함되도록 사이트 설정을 업데이트합니다(예:`/etc/apache2/sites-available/000-default.conf`).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerAdmin webmaster@localhost</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DocumentRoot /var/www/html</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerName remoteip.andy.support</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ErrorLog ${APACHE_LOG_DIR}/error.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CustomLog ${APACHE_LOG_DIR}/access.log combined</span></div></span></span></span></code></pre>{{</raw>}}

3\. `apache.conf`의 결합 _LogFormat_ 항목을 업데이트해서 `/etc/apache2/apache2.conf.`의 _%h_를 _%a_로 대체합니다.예를 들면, 현재 _LogFormat_이 다음과 같이 표시될 경우,


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

_LogFormat_을 다음과 같이 업데이트해야 합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%a %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4\. 아래의 코드와 [Cloudflare IP](https://www.cloudflare.com/ips/)를 입력해 `/etc/apache2/conf-available/remoteip.conf`를 생성하여 신뢰할 수 있는 프록시 주소를 정의합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.1 (예의 IP 주소)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.2 (예의 IP 주소)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">([https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/)에 열거된 모든 Cloudflare IP 주소에 대해 반복)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5\. Apache 구성을 활성화합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enconf remoteip </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">conf remoteip를 활성화.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">새 구성을 활성화하려면 다음을 실행해야 합니다. </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">service apache2 reload</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

6\. Apache 구성을 테스트합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo apache2ctl configtest</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Syntax OK</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

7\. Apache를 다시 시작합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo systemctl restart apache2</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## mod\_cloudflare

mod\_cloudflare를 설치하는 방법에는 2가지가 있습니다. 하나는 Github에서 Apache 확장 프로그램을 다운로드하는 것이고, 다른 하나는 원본 웹 서버에 코드를 추가하는 것입니다.

### Github에서 패킷/스크립트 다운로드

Apache 웹 서버를 사용하는 경우, [GitHub](https://github.com/cloudflare/mod_cloudflare)에서 mod\_cloudflare를 다운로드할 수 있습니다.

### 원본 웹 서버에 코드 추가

mod\_cloudflare를 설치할 수 없거나, 콘텐츠 관리 시스템이 원래 방문자의 IP를 복원할 때 사용할 수 있는 Cloudflare 플러그인이 없을 경우, 원래 방문자의 IP가 필요한 모든 페이지의 <body> 태그 앞 또는 원본 웹 서버에 다음의 코드를 추가하세요.

`<?php if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];?>`

이 명령은 IP 주소가 필요한 스크립트에만 IP 주소를 제공하며, 실제 서버 로그에는 IP 주소를 저장하지 않습니다.

### Apache

To remove _mod\_cloudflare_, you should comment out the Apache config line that loads _mod\_cloudflare_.

This varies based on your Linux distribution, but for most people, if you look `in /etc/apache2`, you should be able to search to find the line:

`LoadModule cloudflare_module`

Comment or remove this line, then restart apache, and _mod\_cloudflare_ should be gone.

If you are running Ubuntu or Debian, you should see.

`file/etc/apache2/mods-enabled/cloudflare.load`

delete this file to remove _mod\_cloudflare_, then restart Apache.

### Nginx

Mod\_cloudflare is installed by modifying [the nginx configuration file](http://nginx.org/en/docs/http/ngx_http_realip_module.html) `nginx.conf` with the `ngx_http_realip_module`.

To remove _mod\_cloudflare_ you should comment or remove this line, then restart nginx, and _mod\_cloudflare_ should be gone_._

___

## 웹 서버 지침

웹 서버 유형에 따라 원래 방문자 IP를 기록하도록 웹 서버를 구성하는 방법에 대한 지침은 아래를 참조하시기 바랍니다.

1.  다음이 설치되어 있는지 확인하세요.
    -   Red Hat/Fedora`sudo yum install httpd-devel libtool git`
    -   Debian/Ubuntu`sudo apt-get install apache2-dev libtool git`
2.  가장 최신 버전의 _mod\_cloudflare_에 다음을 복제합니다.
    -   Red Hat/Fedora/Debian/Ubuntu:`git clone https://github.com/cloudflare/mod_cloudflare.git; cd mod_cloudflare`
3.  Apache 확장 프로그램 도구를 사용해 .c 파일을 모듈로 변환합니다.
    -   Red Hat/Fedora/Debain/Ubuntu:`apxs -a -i -c mod_cloudflare.c`
4.  재시작하여 모듈이 활성화되었는지 확인합니다.
    -   Red Hat/Fedora`service httpd restart; httpd -M|grep cloudflare`
    -   Debian/Ubuntu:`sudo apachectl restart; apache2ctl -M|grep cloudflare`
5.  웹 서버가 Load Balancer 뒤에 있을 경우, Apache 설정(보통 httpd.conf)에 다음의 행을 추가한 뒤 Load Balancer의 IP 주소를 123.123.123.123으로 대체합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">IfModule cloudflare_module</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPHeader X-Forwarded-For</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPTrustedProxy **[Load Balancer IP 주소 삽입]**</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DenyAllButCloudFlare</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/IfModule</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

[`ngx_http_realip_module` NGINX 모듈](http://nginx.org/en/docs/http/ngx_http_realip_module.html)과 다음 구성 매개변수를 사용합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">set_real_ip_from 192.0.2.1(예의 IP 주소) </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">([https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/)에 열거된 모든 Cloudflare IP에 대해 반복)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#다음 중 하나를 사용합니다.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">real_ip_header CF-Connecting-IP;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#real_ip_header X-Forwarded-For;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

접두사 목록은 정기적으로 업데이트해야 합니다. Cloudflare가 발행한 [Cloudflare IP 주소](https://www.cloudflare.com/ips)에서 접두사 전체 목록을 확인할 수 있습니다.

[Cloudflare 및 NGINX](https://danielmiessler.com/blog/getting-real-ip-addresses-using-cloudflare-nginx-and-varnish/)도 참조하세요.

1.  다음 스크립트를 실행하여 mod\_cloudflare를 EasyApache의 일부로 설치합니다. `bash <(curl -s https://raw.githubusercontent.com/cloudflare/mod_cloudflare/master/EasyApache/installer.sh)`.
2.  설치 시 새로운 mod\_cloudflare 플러그인으로 Apache를 다시 컴파일해야 합니다.

Railgun(또는 Varnish 등의 기타 리버스 프록시 소프트웨어)를 사용하면 사용자의 요청은 Cloudflare가 아닌 Railgun으로부터 전송됩니다. 요청이 Cloudflare에서 전송되지 않기 때문에 기본 설정에서는 mod\_cloudflare가 원래 방문자의 IP 주소를 복원할 수 없습니다.

1.  이 문제를 해결하려면 먼저 Apache 구성을 엽니다. 이는 보통 `/etc/apache2/apache2.conf`,`/etc/httpd/httpd.conf`,`/usr/local/apache/conf/httpd.conf`에 있으며 설정에 따라 다른 위치에 있기도 합니다. 확실하지 않은 경우에는 호스팅 공급자에게 문의하세요.
2.  가장 마지막에 다음을 추가합니다.`CloudflareRemoteIPTrustedProxy railgun_address`따라서 Railgun 서버가 127.0.0.1에 위치한 경우에는 다음 예시처럼 표시됩니다.`CloudflareRemoteIPTrustedProxy 127.0.0.1`
3.  신뢰할 수 있는 프록시 목록에 하나 이상의 서버를 추가해야 할 경우, 마지막에 이를 추가할 수 있습니다.CloudflareRemoteIPTrustedProxy 127.0.0.1 127.0.0.2

Lighttpd로 액세스 로그와 애플리케이션에 자동으로 서버 IP를 다시 쓰려면, 아래에 설명된 두 가지 방법 중 하나를 실행하면 됩니다.

1.  **lighttpd.conf** 를 엽니다.파일을 만들고 _server.modules_ 목록에 _mod\_extforward_를추가합니다.액세스 로그에 실제 IP를 표시하려면 이는 _mod\_accesslog_**다음**에 와야 합니다.
2.  **lighttpd.conf** 파일의 서버 모듈 목록 뒤 아무 곳에나 다음 코드 블록을 추가하고Lighttpd를 다시 시작합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$HTTP[&quot;remoteip&quot;] == &quot;192.2.0.1 (example IP address)&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.forwarder = ( &quot;all&quot; =&gt; &quot;trust&quot; )</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.headers = (&quot;CF-Connecting-IP&quot;)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">([https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/)에 나열된 모든 Cloudflare IP에 대해 반복)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  LiteSpeed 웹 관리 콘솔로 이동합니다.
2.  구성에서 '헤더에서 클라이언트 IP 사용' 옵션을 활성화합니다.
3.  3\. 이 옵션을 활성화하면, 액세스 로그에 정확한 IP 주소가 표시되며 PHP의 `$_SERVER['REMOTE_ADDR']` 변수에도 Cloudflare IP 주소 대신 클라이언트의 실제 IP 주소가 표시됩니다. 이 방법을 이용하면, PHP가 활성화된 웹 사이트(WordPress나 vBulletin 설치)에서 Cloudflare를 활성화했을 때 발생하는 문제의 대부분이 해결됩니다.

##### IIS 7~8의 경우

[여기](https://techcommunity.microsoft.com/t5/iis-support-blog/how-to-use-x-forwarded-for-header-to-log-actual-client-ip/ba-p/873115)에 있는 지침을 따릅니다.

##### IIS 8.5~10의 경우

IIS 8.5 이후의 버전부터는 사용자 지정 로깅 옵션이 기본 제공됩니다. [IIS 확장 로깅](http://www.iis.net/learn/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85)을 참조하세요.

1.  IIS Manager에서 작업 중인 사이트의 _작업_ 메뉴에서 **로깅**을 더블 클릭합니다.
2.  작업이 실행되면 형식으로 **W3C**를 선택한 후 _로그 파일_ 하위 섹션에 있는 형식 드롭다운 옆에서 **필드 선택**을 클릭합니다.
3.  **필드 추가**를 클릭한 후 _CF-Connecting-IP_ 헤더를 추가합니다.
4.  **확인**을 클릭합니다. 이제 **사용자 지정 필드** 아래에 새 항목이 반영된 것을 확인할 수 있습니다. _로깅_ 창으로 다시 돌아오면 **적용**을 클릭합니다.

1.  이 과정이 성공적으로 완료되면 로그 파일에 밑줄 문자가 포함되어야 합니다.필드에서 다음과 같은 변경 사항도 확인할 수 있습니다.
2.  변경 사항이 즉시 반영되지 않을 경우 사이트와 W3SVC, 인스턴스 전체를 차례로 재시작해볼 수 있습니다.IIS 8.5 이상에서 향상된 로깅을 사용할 경우에는 **애플리케이션 수준에서 원래 방문자 IP를** 복원하지 않습니다.

Tomcat7으로 액세스 로그와 애플리케이션에서 원래 방문자의 IP를 자동으로 복원하려는 경우, 로그 스키마에 `%{CF-Connecting-IP}i`를 추가해야 합니다.

예를 들어, 아래의 블록을 `server.xml` 파일에 추가하면됩니다.

`<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log." suffix=".txt" pattern="%{CF-Connecting-IP}i - %h %u %t - &quot;%r&quot; - %s - %b - %{CF-RAY}i"/>`

그러면 로그가 다음과 같이 될 것입니다.

`Visitor IP - Cloudflare IP - [04/Dec/2014:23:18:15 -0500] - "GET / HTTP/1.1" - 200 - 1895 - 193d704b85200296-SJC`

[Magento와 Cloudflare](https://tall-paul.co.uk/2012/03/02/magento-show-remote-ip-when-using-cloudflare/)로 원래 방문자의 IP를 복원하는 방법에 관한 정보는 이 타사 튜토리얼을 참고하십시오.

또한, Cloudflare가 직접 작성한 것은 아니지만 일부 고객들이 도움이 된다고 추천하는 [Magento 확장 프로그램](https://marketplace.magento.com/)도 참조하실 수 있습니다.

이 플러그인은 외부업체가 작성했기 때문에 Cloudflare는 이 플러그인과 관련된 문제에 대해 기술 지원을 제공할 수 없습니다.

Cloudflare를 통해 Invision Power Board 3 설치를 실행할 경우, 다음의 단계에 따라 올바른 IP 매칭을 활성화할 수 있습니다.

IPB 설치 ACP에 로그인합니다.

1.  **시스템**을 클릭합니다.
2.  Overview에서 **보안**을 클릭합니다.
3.  보안 센터에서 **보안 설정**을 클릭합니다._Trust IP addresses provided by proxies?_가 녹색으로 표시되어 있는지 확인합니다.

##### _Trust IP addresses provided by proxies?_에 대한 IPB4 설명

회사나 대학의 인트라넷 환경, 부하가 분산된 서버 클러스터 환경처럼 네트워크 환경이 프록시를 통해 요청이 처리되도록 설정되어 있다면, 이 설정을 활성화해야 정확한 IP 주소를 사용할 수 있는 경우가 있습니다. 하지만 이 설정을 활성화하면 악의적인 사용자가 시스템을 악용해 가짜 IP 주소를 제공할 수도 있습니다. 대부분의 환경에서는 이 설정이 비활성화 상태로 유지되어야 합니다.

Apache 서버를 사용 중인 경우에는 방문자의 IP를 로그에 복원하기 위해 [mod\_cloudflare](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) 설치를 권장합니다.

서버에 액세스하여 모드를 설치할 수 없는 경우 [코어를 수정](https://www.phpbb.com/community/viewtopic.php?p=13936406#p13936406)할 수 있을 것입니다.

MyBB 최신 버전에는 Scrutinize User's IP address 옵션이 포함되어 있습니다.

`Admin CP > Configuration > Server and Optimization Options > Scrutinize User's IP address? > Yes`

또는, MyBB 1.6에서 사용할 수 있는 [Cloudflare 관리 플러그인](https://mods.mybb.com/view/antoligy-mybb-cloudflare-management-plugin)을 설치하는 방법도 있습니다.

##### MyBB 1.6.0, 1.6.1, 1.6.2, 1.6.3

1.  `./inc/functions.php`로 이동합니다.
2.  2790행으로 이동합니다.
3.  대체합니다.`if(isset($_SERVER['REMOTE_ADDR']))`다음으로 대체합니다.`if(isset($_SERVER['HTTP_CF_CONNECTING_IP']))`
4.  이어서 대체합니다.`$ip = $_SERVER['REMOTE_ADDR'];`다음으로 대체합니다.`$ip = $_SERVER['HTTP_CF_CONNECTING_IP'];`

자체적으로 호스팅하는 사이트의 경우, Vanilla 팀원 한 사람이 작성한 [Vanilla용 Cloudflare 플러그인](https://open.vanillaforums.com/addon/cloudflaresupport-plugin)을 사용해 로그 파일에 원래 방문자의 IP를 복원할 수 있습니다.

이 플러그인은 외부업체가 작성했기 때문에 Cloudflare는 이 플러그인과 관련된 문제에 대해 기술 지원을 제공할 수 없습니다.MediaWiki

1.  `includes/GlobalFunctions.php`를 엽니다. 약 370번째 행에서 아래의 행을 변경합니다.`$forward = "\t(proxied via {$_SERVER['REMOTE_ADDR']}{$forward})";`다음으로 변경합니다.`$forward = "\t(proxied via {$_SERVER['HTTP_CF_CONNECTING_IP']}{$forward})";`
2.  `includes/ProxyTools.php`를 엽니다. 약 79번째 행에서 아래의 행을 찾습니다.`if ( isset( $_SERVER['REMOTE_ADDR'] ) ){`다음으로 대체합니다.`if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ){`두 번째 단계는 1.18.0 버전과 그 이전 버전의 MediaWiki에만 적용됩니다. ProxyTools.php를 전면적으로 재작성한 최신 버전의 MediaWiki에서는 다음 코드가 더 이상 존재하지 않습니다.
3.  약 80번째 행에서 아래의 행을 찾습니다.`$ipchain = array( IP::canonicalize($_SERVER['REMOTE_ADDR']) );`저장한 후 원본 웹 서버로 업로드합니다.

##### 1.27.1 버전의 경우

1.  `GlobalFunctions.php`의 1,232번째 행으로 이동해 `REMOTE_ADDR`을 `HTTP_CF_CONNECTING_IP`로 변경합니다.
2.  다음으로 `WebRequest.php` 로 이동하여 1151행에서 1159행까지 `REMOTE_ADDR` 을 `HTTP_CF_CONNECTING_IP`로 변경합니다.

Xenforo 사용자가 작성한 [Cloudflare용 플러그인](https://xenforo.com/community/resources/solidmean-cloudflare-detect.1595/)을 사용할 수 있습니다.

이 플러그인은 외부업체가 작성했기 때문에 Cloudflare는 이 플러그인과 관련된 문제에 대해 기술 지원을 제공할 수 없습니다.

1.  `library/config.php`를 엽니다.
2.  마지막에 다음을 추가합니다.`if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];}`
3.  업로드한 뒤 덮어씁니다.

외부업체가 개발한 [Cloudflare/PunBB용 모듈](http://punbb.informer.com/forums/post/147539/#p147539)로 원래 방문자의 IP를 복원할 수 있습니다.

이 플러그인은 외부업체가 작성했기 때문에 Cloudflare는 이 플러그인과 관련된 문제에 대해 기술 지원을 제공할 수 없습니다.Cherokee 서버

1.  서버에서 `cherokee-admin`을 실행합니다.
2.  웹 브라우저에서 **Cherokee Administration interface**로 이동합니다.
3.  Cloudflare 서비스를 사용하는 도메인으로 **Virtual Server**를 선택합니다.
4.  선택한 **Virtual Server**의 _Logging_ 탭에서 Accept Forwarded IPs를 활성화합니다.
5.  _Accept from Hosts_ 상자에 [Cloudflare IP 주소](https://www.cloudflare.com/ips/)를 입력합니다.

Livezilla 서버 설정의 `PHP IP Server Param` 필드를 `HTTP_CF_CONNECTING_IP`로 변경해 IP 주소를 수정할 수 있습니다.

다음의 단계에 따라 DataLife Engine으로 원래 방문자의 IP를 복원할 수 있습니다.

1.  엽니다./engine/inc/include/functions.inc.php다음을 찾습니다.`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`다음으로 변경합니다.`$db_ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
2.  다음을 찾습니다.`$ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`다음으로 변경합니다.`$ip_split = explode(".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`
3.  엽니다./engine/modules/addcomments.php다음을 찾습니다.`$_SERVER['REMOTE_ADDR'],`다음으로 변경합니다.`$_SERVER['HTTP_CF_CONNECTING_IP'],`
4.  다음을 찾습니다.`$db_ip_split = explode( ".", $_SERVER['REMOTE_ADDR'] );`다음으로 변경합니다.`$db_ip_split = explode( ".", $_SERVER['HTTP_CF_CONNECTING_IP'] );`

외부 개발자가 개발한 [TYPO3용 Cloudflare 확장 프로그램](https://extensions.typo3.org/extension/cloudflare/)을 사용해 로그에서 원래 방문자의 IP를 복원할 수 있습니다. 이 확장 프로그램에는 Cloudflare 캐시를 제거하는 기능도 탑재되어 있습니다.

이 플러그인은 외부업체가 작성했기 때문에 Cloudflare는 이 플러그인과 관련된 문제에 대해 기술 지원을 제공할 수 없습니다.

호스팅 제어 패널 VestaCP를 사용하는 경우에는 Nginx와 Apache가 모두 서버에서 실행됩니다. 요청은 Nginx를 통해 대신 처리되어 Apache로 전달됩니다.

이 Nginx 프록시로 인해 원래 방문자의 IP 주소가 반환되도록 하려면 지침에 따라 Nginx를 설정해야 합니다.일부 요청을 처리할 수 없도록 Nginx 서버를 비활성화해 놓은 상태가 아니라면 Apache용 [mod\_cloudflare](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)는 필요하지 않습니다. Apache에 [mod\_cloudflare](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)를 추가해도 Nginx 서버 설정과 충돌이 발생하지는 않습니다.

___

## HAProxy로 원래 방문자 IP 복원

X\_FORWARDD\_FOR 헤더에서 원래 클라이언트 IP를 추출하려면 HAProxy에서 다음 구성을 사용해야 합니다.

1.  https://www.cloudflare.com/en-gb/ips/의 모든 IP 범위를 포함하는 텍스트 파일 CF`_ ips.lst`를 만듭니다.
2.  HAProxy에서 `forwardfor 옵션`을 비활성화해야 합니다.

HAProxy 구성:

`acl from_cf src -f /path/to/CF_ips.lst`

`acl cf_ip_hdr req.hdr(CF-Connecting-IP) -m found`

`http-request set-header X-Forwarded-For %[req.hdr(CF-Connecting-IP)] if from_cf cf_ip_hdr`

___

## 관련 자료

-   [HTTP 요청 헤더](/fundamentals/get-started/http-request-headers)
-   [변환 규칙](/rules/transform/)
