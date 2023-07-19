---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/205359838-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%84-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-
title: 도메인을 Cloudflare에 추가할 수 없습니다...
---

# 도메인을 Cloudflare에 추가할 수 없습니다...

## 도메인을 Cloudflare에 추가할 수 없습니다...

_본 문서는 도메인을 Cloudflare에 추가할 때 발생하는 문제를 해결하는 방법을 소개합니다._

### 이 문서에서

-   [1단계 - DNSSEC 비활성화](https://support.cloudflare.com/hc/ko/articles/205359838-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%84-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-#h_94453043811540417238269)
-   [2단계 - 도메인 등록](https://support.cloudflare.com/hc/ko/articles/205359838-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%84-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-#h_25187255171540417266656)
-   [3단계 - 루트 도메인의 DNS 확인](https://support.cloudflare.com/hc/ko/articles/205359838-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%84-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-#h_703638145121540417281357)
-   [4단계 - Cloudflare에서 도메인 차단 여부 확인](https://support.cloudflare.com/hc/ko/articles/205359838-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%84-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-#h_874829316161540417303369)

___

## 1단계 - DNSSEC 비활성화

**DNSSEC**가 도메인 등록 기관에서 비활성화된 경우, Cloudflare는 도메인에 권한 있는 DNS 확인을 제공할 수 없습니다. Cloudflare에서 도메인이 _활성화_된 후, **DNSSEC**를 재활성화할 수는 있지만, [Cloudflare의](https://support.cloudflare.com/hc/ko/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS) [DNSSEC](https://support.cloudflare.com/hc/ko/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS) [요건](https://support.cloudflare.com/hc/ko/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS)을 사용하여 **DNSSEC**를 구성해야 합니다.

등록 기관에서 비활성화된 **DNSSEC**의 증상: 

-   Cloudflare의 이름 서버로 전환한 후 DNS가 확인되지 않습니다.
-   DNS 쿼리 응답 상태가 _SERVFAIL_입니다.
-   도메인이 Cloudflare Overview 앱에서 _보류_ 상태로 남아 있습니다.

**DNSSEC**를 비활성화하기 위해 도움이 필요하면 도메인 공급자에게 문의하세요. _DS 레코드_가 도메인에 있다면 **DNSSEC**는 활성화되어 있을 것입니다. _DS 레코드_는 [https://mxtoolbox.com/ds.aspx](https://mxtoolbox.com/ds.aspx) 같은 타사 온라인 도구나다음의 명령줄 터미널을 통해 확인할 수 있습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ds cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

___

## 2단계 - 도메인 등록

도메인을 Cloudflare에 추가할 수 없는 데는 다양한 도메인 등록 문제가 있습니다.

-   도메인이 아직 [퍼블릭 접미사 목록](https://publicsuffix.org/list/)에 없는 새로운 TLD(Top-Level Domain)를 사용합니다.
-   다음과 비슷한 오류가 발생할 수 있습니다.

_bad.psl-example을 등록된 도메인으로 식별할 수 없습니다. 하위 도메인이 아닌 루트 도메인을 제공하고 있는지 확인하세요(예: subdomain.example.com이 아닌 example.com) (코드: 1099)_

-   도메인이 아직 완전히 등록되지 않았거나 등록 데이터가 이름 서버를 나열하지 않고 있습니다.

-   도메인 등록 기관에 문의하여 등록 데이터의 이름 서버를 업데이트하세요.

다음은 **\+ 사이트 추가**를 통해, 부적절하게 등록된 도메인을 추가할 때 Cloudflare dashboard에 발생하는 오류입니다.

-   _exampledomain.com은 등록된 도메인이 아닙니다(코드: 1049)_
-   _현재 exampledomain.com의 등록 기관과 호스팅 정보를 조회할 수 없습니다. Cloudflare 지원에 문의하거나 나중에 다시 시도하세요. (코드: 1110)_

___

## 3단계 - 루트 도메인의 DNS 확인

도메인을 Cloudflare에 추가하려면, 작동 중인 유효한 이름 서버에 대해 도메인이 _NS 레코드_를 반환해야 합니다. _NS 레코드_ 는 [https://www.whatsmydns.net/#NS/](https://www.whatsmydns.net/%23NS/) 같은 타사 온라인 도구를 사용하거나명령줄 터미널에서 dig 명령을 사용하여 확인할 수 있습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ns cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ns3.cloudflare.com.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ns4.cloudflare.com.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ns5.cloudflare.com.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ns6.cloudflare.com.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ns7.cloudflare.com.</span></div></span></span></span></code></pre>{{</raw>}}

또한, 도메인은 쿼리를 받았을 때 유효한 _SOA 레코드_를 반환해야 합니다. _SOA 레코드_는 [https://www.whatsmydns.net/#SOA/](https://www.whatsmydns.net/%23SOA/) 같은 타사 온라인 도구를 사용하거나다음의 명령줄 터미널을 통해 확인할 수 있습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short soa cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ns3.cloudflare.com. dns.cloudflare.com. 2029202248 10000 2400 604800 300</span></div></span></span></span></code></pre>{{</raw>}}

___

Cloudflare는 영구 또는 일시적으로 특정 도메인의 추가를 허용하지 않습니다.  이 두 가지 유형의 금지 유형을 제거하는 방법은 다음을 참조하시기 바랍니다.

### 일시적인 금지 제거

Cloudflare에 도메인을 추가하려는 시도가 너무 많이 관찰되면, 다음과 같은 오류가 반환됩니다.

_Cloudflare 요청 오류: \[1105\] 이 영역은 일시적으로 금지됐으며 현재 Cloudflare에 추가될 수 없습니다. Cloudflare 지원팀에 문의하시기 바랍니다._

3시간 동안 기다린 후 도메인을 Cloudflare에 다시 추가해보고, 그래도 안 되면, Cloudflare 지원팀에 문의하세요.

###   
영구 금지 제거 

도메인을 추가할 때 다음과 같은 오류가 발생하면 Cloudflare 지원팀에 문의하세요.

-   _이 영역은 현재 Cloudflare에 추가될 수 없습니다. Cloudflare 지원팀에 문의하시기 바랍니다. (코드: 1093)_

1097 오류가 있으면 abusereply@cloudflare.com으로 문의하세요.   

-   _오류: 이 영역은 차단됐으며 현재 CloudFlare에 추가될 수 없습니다. CloudFlare 지원팀에 문의하시기 바랍니다. (코드: 1097)_
