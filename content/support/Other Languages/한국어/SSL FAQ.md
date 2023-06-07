---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ
title: SSL FAQ
---

# SSL FAQ

_Cloudflare **SSL/TLS** 앱과 관련된 일반적인 질문에 대한 답을 찾아보세요._

### 이 문서에서

-   [Cloudflare 인증서가 여러 개 있습니다. 어떤 것을 사용해야 합니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_e2bd076d-beb3-40e8-adbe-075ba5a8851e)
-   [Cloudflare의 SSL이 SEO에 도움이 됩니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_29550926411548959889544)
-   [Cloudflare의 SSL을 활성화하는 데 시간이 얼마나 걸립니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_7dc4564e-f93a-4e1d-a338-90903a812b95)
-   [SSL 무효 브랜드 검사가 무슨 의미입니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_62d0852f-0bc5-4d54-a83f-971ca452398d)
-   [어떻게 모든 방문자를 HTTPS/SSL로 리디렉션합니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_a61bfdef-08dd-40f8-8888-7edd8e40d156)
-   [Cloudflare SSL이 IDN(Internationalized Domain Name)을 지원합니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_406905917121548959897352)
-   [SSL이 호스팅 파트너를 위해 작동합니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_848554486311548959913241)
-   [Cloudflare SSL 인증서가 공유됩니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_293541339461548959928672)
-   [SSL 인증서가 웹사이트에 설치되어 있습니다. 왜 Cloudflare 인증서가 보입니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_865954806521548960003696)
-   [다른 곳에서 구매한 SSL 인증서를 Cloudflare가 사용하게 하고 싶습니다.](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_406415940571548960012266)
-   [어떻게 사이트가 HTTPS/SSL만 사용하게 합니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_999722138611548960019807)
-   [갈릴레오 프로젝트에 SSL 지원이 포함됩니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_745887958641548960026645)
-   [Cloudflar를 사용하면 PayPal의 TLS 1.2 요건에 영향을 줍니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_100356045661548960034406) 
-   [Cloudflare 중국 데이터 센터의 SSL 인증서를 어떻게 사용합니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_853db670-78aa-4c98-99d4-3aa3d38f8d59)
-   [Cloudflare가 TLS 클라이언트 인증을 지원합니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_db0bcd71-24f9-4b0c-8cfc-7a5ed0f27649)
-   [Github를 포함한 Universal SSL을 어떻게 활성화합니까?](https://support.cloudflare.com/hc/ko/articles/204144518-SSL-FAQ#h_4e7e3537-ade2-431c-abe7-2dfe26e1cb9a)

___

### Cloudflare 인증서가 여러 개 있습니다. 어떤 것을 사용해야 합니까?

Cloudflare 인증서는 [인증서 유형](https://support.cloudflare.com/hc/articles/203295200)은 물론 가장 구체적인 이름별로 우선 순위가 지정됩니다.  일반적으로 SSL 인증서의 우선 순위는 다음과 같이 높은 순위에서 낮은 순위로 지정됩니다.

-   [사용자 지정 SSL](https://support.cloudflare.com/hc/articles/200170466)
-   [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108)
-   [Universal SSL](https://support.cloudflare.com/hc/articles/204151138)   

일반적인 우선 순위의 예외는 호스트 이름의 구체성에 따라 발생합니다.  특정 호스트 이름을 언급한 인증서는 와일드카드 인증서에 비해 우선합니다.  예를 들어 _www.example.com_을 명시한 Universal SSL 인증서는 _\*.example.com_처럼 와일드카드를 이용하여 _www_ 호스트이름을 연결하는 인증서보다 우선합니다.  

___

### Cloudflare의 SSL이 SEO에 도움이 됩니까?

예. Google은 [HTTPS를 SEO 순위 지정에 사용한다고 발표했습니다](http://googleonlinesecurity.blogspot.co.uk/2014/08/https-as-ranking-signal_6.html).

SEO 순위 개선 방법에 대한 자세한 내용은 [Cloudflare로 SEO 순위 개선](https://support.cloudflare.com/hc/ko/articles/231109348-How-do-I-Improve-SEO-Rankings-On-My-Website-Using-Cloudflare-) 문서를 참조하시기 바랍니다.

___

### Cloudflare SSL이 IDN(Internationalized Domain Name)을 지원합니까?

Cloudflare는 더블 바이트/IDN/Punycode 도메인을 지원합니다.  비라틴 문자를 포함한 도메인은 Cloudflare에 추가된 다른 도메인과 마찬가지로 SSL 인증서를 받습니다.

___

### Cloudflare의 SSL을 활성화하는 데 시간이 얼마나 걸립니까?

Cloudflare가 [권한 있는 DNS 공급자](https://www.cloudflare.com/learning/dns/dns-server-types/#authoritative-nameserver)인 경우, 일반적으로 Cloudflare에서 도메인이 활성화된 지 15분 내에 Universal SSL 인증서가 발행되며 도메인이 활성화된 후 사용자의 추가 작업이 필요하지 않습니다. 한편, [권한 있는 DNS 공급자의 CNAME 레코드를 통해](https://support.cloudflare.com/hc/articles/360020615111) Cloudflare 서비스를 사용하는 경우, Universal SSL 인증서를 제공하기 위해 [DNS 유효성 검사 레코드를](https://support.cloudflare.com/hc/articles/360020615111#h_989980109291544055191509) 권한 있는 DNS 공급자에 수동으로 추가해야 합니다.  일반적으로 Dedicated SSL 인증서도 15분 내에 발행됩니다.

인증 기관이 브랜드, 피싱, TLD 요건 등의 수동 검토를 요구하는 경우, Universal SSL 인증서 발행에 24시간 이상이 걸릴 수 있습니다.

___

### SSL 무효 브랜드 검사가 무슨 의미입니까?

일부 도메인은 트레이드마크 도메인과 충돌하는 단어가 포함되어 있으면 Universal SSL을 사용할 수 없습니다.  

이 문제를 해결하기 위해

-   도메인이 비즈니스 또는 [기업](https://www.cloudflare.com/enterprise-service-request) 요금제 상에 있는 경우, [자체 인증서를 업로드](https://support.cloudflare.com/hc/ko/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-)하거나
-   [Dedicated 인증서](https://support.cloudflare.com/hc/ko/articles/228009108-Dedicated-SSL-Certificates)를 구매하세요

___

### 어떻게 모든 방문자를 HTTPS/SSL로 리디렉션합니까?

도메인 내 모든 하위 도메인과 호스트의 트래픽을 리디렉션하려면 Cloudflare **SSL/TLS** 앱의 **에지 인증서** 탭에서 **HTTPS 항상 사용** 기능을 활성화하세요.  한편, 전체 사이트를 HTTPS로 리디렉션하지 않으려면 Cloudflare **[Page Rules](https://support.cloudflare.com/hc/ko/articles/218411427)** 앱을 사용하여 URL 기반으로 리디렉션할 수도 있습니다.

Cloudflare로 사이트를 보호하는 중에는, 원본 웹 서버에서 리디렉션을 실행하지 않는 것이 좋습니다.

-   페이지 규칙 리디렉션은 Cloudflare 에지에서 처리되어 응답 속도를 높이고 서버에 대한 요청을 줄입니다.
-   원본 웹 서버 리디렉션으로 인해 [리디렉션 루프 오류](https://support.cloudflare.com/hc/articles/115000219871)가 발생할 수 있습니다.

Page Rules를 구성할 때 _HTTPS 항상 사용_ 옵션이 HTTP 요청을 HTTPS로 리디렉션하는 가장 간편한 방법입니다.  또한 HTTPS 강제 사용과 더불어 다른 하위 도메인으로 리디렉션해야 하는 경우, _301_ 리디렉션을 이용한 _URL 전달_ 옵션도 사용할 수 있습니다. 예를 들어 페이지 규칙이


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/*을</span></div></span></span></span></code></pre>{{</raw>}}

https://www.example.com/$1의 _URL 전달_과


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">연결하면</span></div></span></span></span></code></pre>{{</raw>}}

_example.com_ 루트 도메인의 요청이 _www.example.com_ 하위 도메인으로 리디렉션되고 URL 디렉토리는 보존됩니다.

HTTPS 강제 사용은 브라우저가 요청하기 전에 포함된 리소스의 프로토콜을 확인하기 때문에, [혼합 콘텐츠](https://support.cloudflare.com/hc/ko/articles/200170476-How-do-I-fix-the-SSL-Mixed-Content-Error-Message-) 문제를 해결하지 못합니다. HTTPS를 강제 사용하려는 페이지에 상대 링크나 HTTPS 링크를 사용해야 합니다. Cloudflare는 [Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/ko/articles/227227647-How-do-I-use-Automatic-HTTPS-Rewrites-) 기능을 사용하여 혼합 콘텐츠 링크를 자동 해결합니다.

___

### SSL이 호스팅 파트너를 위해 작동합니까?

무료 Universal SSL 인증서는 CNAME 및 전체 DNS 통합을 통해 호스팅 파트너가 추가한 모든 새 Cloudflare 도메인에 사용할 수 있습니다.

Cloudflare를 통해 하위 도메인을 프록시 설정하여, 무료 Universal SSL 인증서를 제공하세요.

___

### Cloudflare SSL 인증서가 공유됩니까?

Universal SSL 인증서는 다수의 고객을 위해 다수의 도메인에서 공유됩니다. 인증서 공유가 우려된다면, Cloudflare는 [Dedicated 또는 사용자 지정 SSL 인증서](https://support.cloudflare.com/hc/articles/203295200)를 권장합니다.

___

### SSL 인증서가 웹사이트에 설치되어 있습니다. 왜 Cloudflare 인증서가 보입니까?

Cloudflare는 악의적인 트래픽을 캐싱하고 필터링하기 위해 트래픽을 해석해야 합니다. Cloudflare는 **SSL/TLS** 앱의 **개요** 탭에서 선택된 [SSL 옵션](https://support.cloudflare.com/hc/articles/200170416)에 따라 트래픽을 다시 암호화하거나 일반 텍스트 트래픽을 원본 웹 서버에 보냅니다.

___

### 다른 곳에서 구매한 SSL 인증서를 Cloudflare가 사용하게 하고 싶습니다.

비즈니스 및 기업 요금제 상의 도메인은 [사용자 지정 SSL 인증서](https://support.cloudflare.com/hc/articles/200170466)를 업로드할 수 있습니다.

___

### 어떻게 사이트가 HTTPS/SSL만 사용하게 합니까?

모든 트래픽에 HTTPS를 강제 사용하려면, Cloudflare **SSL/TLS** 앱의 **에지 인증서** 탭이나 [**Page Rules** 앱](https://support.cloudflare.com/hc/articles/200170536)을 통해 "HTTPS 항상 " 기능을 활성화하세요.

___

### 갈릴레오 프로젝트에 SSL 지원이 포함됩니까?

갈릴레오 프로젝트 고객은 Cloudflare의 [무료 Universal SSL](https://www.cloudflare.com/ssl)로 사이트 트래픽을 보호할 수 있습니다.

___

### Cloudflar를 사용하면 PayPal의 TLS 1.2 요건에 영향을 줍니까?

아닙니다. Cloudflare는 paypal.com과 직접 연결을 프록시 설정하지 않기 때문에  도메인에 Cloudflare를 사용해도 TLS 연결 방식에 영향을 주지 않습니다.

서버나 브라우저가 이 표준을 지원하는지 알아보려면, PayPal을 사용하는 클라이언트나 브라우저에서 [https://tlstest.paypal.com](https://tlstest.paypal.com/)을 방문하세요. **PayPal\_Connection\_OK**  응답을 받으면, 클라이언트가 PayPal과 호환되는 TLS 표준을 이미 지원한다는 것입니다.

___

### Cloudflare 중국 데이터 센터의 SSL 인증서를 어떻게 사용합니까?

Cloudflare [Universal SSL](https://support.cloudflare.com/hc/articles/204151138) 및 [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108) 인증서는 중국에 배포되지 않았습니다.  도메인이 기업 요금제 상에 있고 중국 데이터 센터에 접근할 수 있다면, Cloudflare의 중국 데이터 센터는 다음과 같은 조건에서만 도메인에 SSL 인증서를 제공합니다.

1.  [사용자 지정 SSL 인증서](https://support.cloudflare.com/hc/articles/200170466)가 업로드되어 있습니다.
2.  **중국에서 개인 키 사용(사용자 지정 인증서)**가 Cloudflare **SSL/TLS** 앱의 **에지 인증서** 탭에 _켜짐_으로 설정되어 있습니다.

___

### Cloudflare가 TLS 클라이언트 인증을 지원합니까?

TLS 클라이언트 인증은 클라이언트가 제시한 인증서가 기업의 루트 인증 기관 인증서가 서명한 것인지 확인합니다.  각 요청의 인증서를 확인하여 인증된 클라이언트 연결로만 액세스를 제한할 수 있습니다.  Cloudflare를 통해 TLS 클라이언트 인증을 활성화하려면 [상호 TLS 인증](/access/service-auth/mtls/) 문서를 참조하세요.

___

### Github로 Universal SSL을 어떻게 활성화합니까?  

[GitHub 페이지를 포함한 Cloudflare의 Universal SSL 사용](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/)에 대한 Cloudflare 블로그 게시물을 참조하세요.
