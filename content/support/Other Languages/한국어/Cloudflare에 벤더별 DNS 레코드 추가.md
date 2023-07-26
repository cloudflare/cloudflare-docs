---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360020991331-Cloudflare%EC%97%90-%EB%B2%A4%EB%8D%94%EB%B3%84-DNS-%EB%A0%88%EC%BD%94%EB%93%9C-%EC%B6%94%EA%B0%80
title: Cloudflare에 벤더별 DNS 레코드 추가
---

# Cloudflare에 벤더별 DNS 레코드 추가

## Cloudflare에 벤더별 DNS 레코드 추가

_본 문서는 Google Cloud, Amazon S3, Microsoft Azure, ClickFunnels, WPEngine, Zoho 같은 다양한 타사 소프트웨어를 지원하기 위해 DNS 레코드를 Cloudflare에 추가하는 방법을 설명합니다._

___

본 문서를 보려면, Cloudflare dashboard를 통해 DNS 레코드를 관리하는 방법에 대한 사전 지식이 필요합니다.  자세한 정보는  [DNS 레코드 관리](https://support.cloudflare.com/hc/ko/articles/360019093151)에 대한 Cloudflare의 문서를 참조하세요.

**Google**

다음 MX 레코드를 추가하세요.

| **이름** | **TTL** | **레코드 유형** | **우선 순위**  | **대상** |
| --- | --- | --- | --- | --- |
| @ | Auto | MX | 1 | ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT1.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT2.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT3.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT4.ASPMX.L.GOOGLE.COM |

DNS 레코드가 추가되면, 이는 다음과 같이 Cloudflare의 **DNS** 앱과 유사하게 나타납니다.

[Google Apps 이메일 구성을 시험하세요](https://toolbox.googleapps.com/apps/checkmx/check).

Google App Engine용  _CNAME 레코드_ 를 Cloudflare DNS에 추가하세요.

예를 들어 도메인이  _www.example.com_인 경우  _CNAME 레코드_ 는 다음과 유사합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www  CNAME  ghs.googlehosted.com</span></div></span></span></span></code></pre>{{</raw>}}

Google Apps 도메인용 리디렉션을 구성하려면  [Google의 URL 전달 가이드](https://support.google.com/a/answer/53340?hl=en)를 참조하세요.

**Amazon**

AWS 고객은 도메인의 이름 서버를 업데이트하여 Cloudflare dashboard의 **Overview**  앱에 등록된 Cloudflare 이름 서버를 가리키게 해야 합니다.

1.  AWS에 로그인하세요.
2.  탐색 모음의 상단 오른쪽에 있는 **내 계정**을 클릭하세요.
3.  드롭다운에서 **AWS 관리 콘솔**을 선택하세요.
4.  **서비스**를 클릭하고 **Route 53**을 선택하세요.
5.  두 곳의 이름 서버를 업데이트하세요.

-   **호스팅된 영역**을 클릭하고 도메인을 선택하여 Cloudflare의 이름 서버로 업데이트하세요.
-   이름 서버를 편집하여 Cloudflare의 이름 서버를 가리키게 하세요.

-   **등록된 도메인**을 클릭하세요.
-   도메인을 선택하여 Cloudflare의 이름 서버로 업데이트하세요.
-   **이름 서버 추가 또는 편집**을 클릭하세요.

[](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)[Amazon S3 버킷 만들기 방법](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)은 Amazon의 문서를 참조하세요.

전체 호스트 URL은 버킷에 할당되어 있습니다.

Cloudflare DNS의 AWS 버킷용 _CNAME 레코드_를 추가하세요. 예를 들어 버킷의 전체 호스트 URL이 _files.example.com_이면 다음과 유사한 _CNAME 레코드_를 추가하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">files  CNAME  files.example.com.s3.amazonaws.com</span></div></span></span></span></code></pre>{{</raw>}}

[SES 및 확인 설정](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim.html)은 Amazon의 문서를 참조하세요.

Amazon이 제공한 _TXT_와 _CNAME_ 확인 레코드를 찾으세요.

레코드를 Cloudflare DNS에 추가하세요.  예를 들어 Cloudflare 도메인이 _example.com_인 경우DNS 레코드는 다음과 유사합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  &quot;fmxqxT/icOYx4aA/bEUrDPMeax9/s3frblS+niixmqk=&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">verificationstring._domainkey.example.com  CNAME  verificationstring.dkim.amazonses.com</span></div></span></span></span></code></pre>{{</raw>}}

Amazon의 ELB 구성에 대한 내용은 [Amazon의 ELB 도움말 콘텐츠](http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html)를 참조하세요.

1.  호스트 이름에 대해 _CNAME 레코드_를 Cloudflare에 추가하세요. 예: _elb_
2.  Cloudflare **DNS** 앱에서  **도메인 이름**을 ELB 대상으로 교체하세요. _<AWS hostname>.<region>._elb.amazonaws.com은 올바른 _CNAME_ 대상 형식입니다. (예: _my-cool-cachepp-1344276401.eu-west-1._elb.amazonaws.com).
3.  AWS 지원에 문의하여 _AWS 호스트 이름_이나 _지역_을 결정하세요.

**Microsoft**

Microsoft의 [Azure DNS 설정](https://www.windowsazure.com/en-us/develop/net/common-tasks/custom-dns-web-site/) 문서를 따르세요.

Azure의 필수 레코드를 Cloudflare DNS에 추가하세요.

예를 들어 도메인이 _example.com_인 경우 레코드 형식은 다음과 유사합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  A  203.0.113.1</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.example.com  CNAME  example.azurewebsites.net</span></div></span></span></span></code></pre>{{</raw>}}

확인 레코드는 Azure의  [도메인 확인 레코드 만들기](https://docs.microsoft.com/en-us/office365/admin/dns/create-dns-records-for-azure-dns-zones?view=o365-worldwide#add-a-txt-record-for-verification) 문서를 참조하세요.

**기타 벤더**

올바른 Zoho DNS 레코드를 Cloudflare에 추가하는 방법은 아래를 참조하세요. 모든 예에서  _example.com_을실제 도메인 이름으로 변경하세요.

-   Zoho _MX 레코드_:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  MX  mx.zohomail.com (우선순위 10으로 설정)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  MX  mx2.zohomail.com (우선순위 20으로 설정)</span></div></span></span></span></code></pre>{{</raw>}}

-   (선택 사항) _SPF 레코드_를 추가하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  v=spf1 mx include:zoho.com ~all</span></div></span></span></span></code></pre>{{</raw>}}

-   (선택 사항) [사용자 지정 Zoho URL](https://adminconsole.wiki.zoho.com/domains/CustomURL.html)을 통해 이메일에 액세스하려면 _CNAME 레코드_를 추가하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">mail  CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

-   (선택 사항) [Zoho 도메인 유효성 검사 레코드](https://www.zoho.com/mail/help/adminconsole/domain-verification.html)를 추가하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">zb******** CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

일반적으로 DNS 레코드는 아래와 비슷합니다. _example.com_을실제 도메인 이름으로 변경하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">email  CNAME  sendgrid.net</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  SPF  v=spf1 a mx include:sendgrid.net ~all</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  v=spf1 a mx include:sendgrid.net ~all</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">mtpapi._domainkey.EXAMPLE.com  CNAME  dkim.sendgrid.net.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">smtpapi._domainkey.e.EXAMPLE.COM  CNAME  dkim.sendgrid.net</span></div></span></span></span></code></pre>{{</raw>}}

Ning의 [사용자 지정 도메인 및 DNS 항목](http://www.ning.com/help/?p%3D2870)을 참조하세요.

Ning의 사용자 지정 도메인이 _www.example.com_인 경우 다음과 같이 _CNAME_및 _A 레코드_를 추가하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.example.com  CNAME  example.ning.com.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.ning.com  A  208.82.16.68</span></div></span></span></span></code></pre>{{</raw>}}

Ning이 도메인을 확인하면, Ning DNS 레코드에 대해 회색 구름 아이콘을 오렌지색 구름 아이콘으로 변경하여, 트래픽이 Cloudflare로 프록시 설정될 수 있게 하세요.

DNS 레코드 요건에 대한 최신 정보는 SmugMug 문서를 참조하세요. 일반적으로 SmugMug용 _CNAME 레코드_를 추가하는 것은 다음과 비슷합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">photo  CNAME  domains.smugmug.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">photos  CNAME  domains.smugmug.com</span></div></span></span></span></code></pre>{{</raw>}}

SmugMug가 도메인을 확인하면, SmugMug DNS 레코드에 대해 회색 구름 아이콘을 오렌지색 구름 아이콘으로 변경하여, 트래픽이 Cloudflare로 프록시 설정될 수 있게 하세요.

DNS 레코드 요건에 대한 최신 정보는 [Mandrill의 DNS 레코드 문서](http://help.mandrill.com/entries/22030056-How-do-I-add-DNS-records-for-my-sending-domains-)를 참조하세요.

Mandrill의 경우 _SPF_ 및 _DKIM 레코드_를 추가해야 합니다. Mandrill에서 DNS 레코드 값을 받으세요.

Cloudflare DNS 앱에 _SPF_ 및 _DKIM 레코드_를 _TXT 레코드_로 추가하세요.

예를 들어 _example.com_이 Mandrill 도메인인 경우, 다음과 같은 DNS 레코드를 추가하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  v=spf1 include:spf.mandrillapp.com ?all</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">mandrill._domainkey.example.com  TXT  v=DKIM1\; (Mandrill이 제공한 값)</span></div></span></span></span></code></pre>{{</raw>}}

_CNAME 레코드_를 통해 Rackspace CloudFiles를 구성하세요. [Rackspace CloudFiles 문서](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)를 참조하세요[.](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)

Rackspace 지원에 올바른 _CNAME_ 대상을 확인하세요.

_CNAME 레코드_의 예는 다음과 같습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">rack  CNAME  e0978.r18.cf2.rackcdn.com</span></div></span></span></span></code></pre>{{</raw>}}

도메인 이름 서버를 Cloudflare로 설정한 후

1.  Cloudflare 대시보드에 로그인하세요.
2.  레코드를 추가할 도메인에 적절한 Cloudflare 계정을 클릭하세요.
3.  올바른 도메인을 선택했는지 확인하세요.
4.  **DNS** 앱을 클릭하세요.
5.  4개의 A 레코드 모두와 Squarespace의 www CNAME에 아래처럼 _프록시 설정됨_으로 표시되는지 확인하세요.
6.  'verify.squarespace.com' CNAME 레코드에 아래와 같이 _DNS 전용_이라고 표시됐는지 확인하세요.

![Squarespace에서 확보한 cloudflarecontent.com DNS 레코드의 스크린샷
](/images/support/dns_ui_update_squarespace_records.png)

올바로 설정되면, Squarespace DNS 설정 페이지에 '설정에 문제가 있습니다'가 나타납니다. **이것은 예상된 행동입니다**. 

이제 트래픽이 Cloudflare를 통해 전송되므로 Squarespace와 사이트 방문자는 Cloudflare IP 주소를 보게 됩니다. 이로서 Squarespace가 할당한 주소 대신 Cloudflare IP 주소가 반환되기 때문에 Squarespace 콘솔이 사이트 구성이 잘못됐다고 가정하게 됩니다. Cloudflare DNS가 올바로 구성됐다면(위 1~6단계) Squarespace 사이트는 이제 Cloudflare를 통해 작동해야 합니다.

_example.com_이 사용자 지정 도메인인 경우 다음과 같은 DNS 레코드를 Cloudflare에 추가하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  A  66.6.44.4</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.example.com  CNAME  domains.tumblr.com</span></div></span></span></span></code></pre>{{</raw>}}

___

## 관련 자료

-   [Cloudflare DNS 레코드 관리](https://support.cloudflare.com/hc/ko/articles/360019093151)
-   [CNAME 플래트닝](https://support.cloudflare.com/hc/articles/360020348832)
