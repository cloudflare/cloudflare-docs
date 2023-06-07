---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360000841472-%EC%9E%90%EB%8F%99%ED%99%94%EB%A5%BC-%ED%86%B5%ED%95%B4-%EC%97%AC%EB%9F%AC-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80
title: 자동화를 통해 여러 사이트를 Cloudflare에 추가
---

# 자동화를 통해 여러 사이트를 Cloudflare에 추가

_Cloudflare API 또는 Cloudflare의 CLI 도구, flarectl을 사용하여 10개 이상의 여러 사이트를 추가하는 방법을 알아보시기 바랍니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/360000841472-%EC%9E%90%EB%8F%99%ED%99%94%EB%A5%BC-%ED%86%B5%ED%95%B4-%EC%97%AC%EB%9F%AC-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80#01EiMuIl9b6BVA2vUdCy2X)
-   [필수 구성 요소](https://support.cloudflare.com/hc/ko/articles/360000841472-%EC%9E%90%EB%8F%99%ED%99%94%EB%A5%BC-%ED%86%B5%ED%95%B4-%EC%97%AC%EB%9F%AC-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80#2C6OkWg2Flbl6ZBJss7FjH)
-   [API를 통한 도메인 추가](https://support.cloudflare.com/hc/ko/articles/360000841472-%EC%9E%90%EB%8F%99%ED%99%94%EB%A5%BC-%ED%86%B5%ED%95%B4-%EC%97%AC%EB%9F%AC-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80#3Mk8dKAR73TTdEKH2WLfzb)
-   [flarectl(Cloudflare의 CLI 도구)을 통한 도메인 추가](https://support.cloudflare.com/hc/ko/articles/360000841472-%EC%9E%90%EB%8F%99%ED%99%94%EB%A5%BC-%ED%86%B5%ED%95%B4-%EC%97%AC%EB%9F%AC-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80#194axRKd2V27vV5bs4e8iD)
-   [일반적인 문제](https://support.cloudflare.com/hc/ko/articles/360000841472-%EC%9E%90%EB%8F%99%ED%99%94%EB%A5%BC-%ED%86%B5%ED%95%B4-%EC%97%AC%EB%9F%AC-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-Cloudflare%EC%97%90-%EC%B6%94%EA%B0%80#6yR1Cexb7t3HYDcHGVwMjn)

___

## 개요

10개 이상의 여러 사이트를 한 번에 Cloudflare에 추가해야 하는 경우, Cloudflare API를 통해 처리할 수 있습니다. 여러 사이트를 추가하는 것은 다음과 같은 경우 유용합니다.

-   여러 도메인을 하나의 정식 도메인에 매핑하는 경우. 예: 여러 국가(.com.au, .co.uk, 기타)의 도메인을 Cloudflare로 보호하려는 경우
-   에이전시나 IT 컨설팅 회사로서 고객을 대신하여 여러 도메인을 관리하는 경우(주의: Cloudflare [Partner 프로그램](https://www.cloudflare.com/partners/)을 참조하시기 바랍니다)
-   기존 사이트를 Cloudflare로 이전하는 경우

특히 [이름 서버를 변경하는 방법](/dns/zone-setups/full-setup/setup)이나 [DNS 레코드를 추가하는 방법](/dns/manage-dns-records/how-to/create-dns-records)에 이미 친숙한 경우, API를 사용하면 여러 사이트를 신속하고 효율적으로 추가할 수 있습니다.

___

## 필수 구성 요소

자동화를 통해 여러 사이트를 Cloudflare에 추가할 때 필요한 것:

-   기존 Cloudflare 계정([등록](https://www.cloudflare.com/a/signup)/[로그인](https://www.cloudflare.com/a/login))
-   명령줄에 대한 기본 지식
-   curl 설치(macOS & Linux의 경우 기본)
-   Cloudflare [API 키 보유](https://support.cloudflare.com/hc/ko/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-)
-   줄별로 작성된, 추가하려는 도메인 목록(줄 바꿈으로 구분됨). 예: "domains.txt"

___

## API를 통한 도메인 추가

Cloudflare는 완벽한 기능을 갖춘 API([문서](https://api.cloudflare.com/))를 갖추고 있으며, 이를 통해 새로운 도메인 생성을 자동화하는 것은 물론 DNS 레코드, Page Rules, 기타 다양한 보안 설정을 구성할 수 있습니다. Cloudflare는 이 API로 여러 도메인을 한 번에 자동 추가합니다.

터미널 애플리케이션(예: Terminal 또는 Terminal.app)을 열고 API 키와 이메일을 설정하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

이어서, 도메인 이름별로 간단한 루프를 작성하세요. 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do \  curl -X POST -H &quot;X-Auth-Key: $CF_API_KEY&quot; -H &quot;X-Auth-Email: $CF_API_EMAIL&quot; \  -H &quot;Content-Type: application/json&quot; \  &quot;https://api.cloudflare.com/client/v4/zones&quot; \  --data '{&quot;account&quot;: {1}, &quot;name&quot;:&quot;'$domain'&quot;,&quot;jump_start&quot;:true}'; done</span></div></span></span></span></code></pre>{{</raw>}}

"jump\_start" 키에 따라 Cloudflare가 "www", "mail", "blog" 또는 기타 다양한 공통 DNS 레코드를 자동으로 검색하기 때문에 수동으로 구성하지 않아도 됩니다(하지만 검색된 DNS는 수동으로 확인해야 합니다).  _id\_of\_that\_account_는 **계정 ID** 아래 Cloudflare **Overview** 앱에 있습니다.

API는 등록 기관(도메인이 등록된)에서 [변경해야 하는 이름 서버](https://support.cloudflare.com/hc/ko/articles/206455647-How-do-I-change-my-domain-nameservers-)를 포함한 응답을 반환합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{ &quot;result&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;example.com&quot;, &quot;status&quot;: &quot;pending&quot;, &quot;paused&quot;: false, &quot;type&quot;: &quot;full&quot;, &quot;development_mode&quot;: 0, &quot;name_servers&quot;: [ &quot;chad.ns.cloudflare.com&quot;, &quot;lucy.ns.cloudflare.com&quot; ], &quot;original_name_servers&quot;: [ &quot;ns-cloud-e1.googledomains.com&quot;, &quot;ns-cloud-e2.googledomains.com&quot;, &quot;ns-cloud-e3.googledomains.com&quot;, &quot;ns-cloud-e4.googledomains.com&quot; ], &quot;original_registrar&quot;: null, &quot;original_dnshost&quot;: null, &quot;modified_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;created_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;meta&quot;: { &quot;step&quot;: 4, &quot;wildcard_proxiable&quot;: false, &quot;custom_certificate_quota&quot;: 0, &quot;page_rule_quota&quot;: 3, &quot;phishing_detected&quot;: false, &quot;multiple_railguns_allowed&quot;: false }, &quot;owner&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;type&quot;: &quot;user&quot;, &quot;email&quot;: &quot;you@example.com&quot; }, &quot;account&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;you@example.com&quot; }, &quot;permissions&quot;: [ &quot;#access:edit&quot;, &quot;#access:read&quot;, &quot;#analytics:read&quot;, &quot;#app:edit&quot;, &quot;#billing:edit&quot;, &quot;#billing:read&quot;, &quot;#cache_purge:edit&quot;, &quot;#dns_records:edit&quot;, &quot;#dns_records:read&quot;, &quot;#lb:edit&quot;, &quot;#lb:read&quot;, &quot;#logs:read&quot;, &quot;#member:edit&quot;, &quot;#member:read&quot;, &quot;#organization:edit&quot;, &quot;#organization:read&quot;, &quot;#ssl:edit&quot;, &quot;#ssl:read&quot;, &quot;#subscription:edit&quot;, &quot;#subscription:read&quot;, &quot;#waf:edit&quot;, &quot;#waf:read&quot;, &quot;#worker:edit&quot;, &quot;#worker:read&quot;, &quot;#zone:edit&quot;, &quot;#zone:read&quot;, &quot;#zone_settings:edit&quot;, &quot;#zone_settings:read&quot; ], &quot;plan&quot;: { &quot;id&quot;: &quot;0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee&quot;, &quot;name&quot;: &quot;Free Website&quot;, &quot;price&quot;: 0, &quot;currency&quot;: &quot;USD&quot;, &quot;frequency&quot;: &quot;&quot;, &quot;is_subscribed&quot;: true, &quot;can_subscribe&quot;: false, &quot;legacy_id&quot;: &quot;free&quot;, &quot;legacy_discount&quot;: false, &quot;externally_managed&quot;: false } }, &quot;success&quot;: true, &quot;errors&quot;: [], &quot;messages&quot;: []}</span></div></span></span></span></code></pre>{{</raw>}}

"name\_servers" 키가 응답에 있음을 주목하십시오. 이것은 계정에 추가한 모든 사이트에 동일한 고유 쌍입니다. 예:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;name_servers&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;chad.ns.cloudflare.com&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;lucy.ns.cloudflare.com&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> ]</span></div></span></span></span></code></pre>{{</raw>}}

값(위의 값이 아님!)을 복사하고 등록 기관의 [이름 서버를 업데이트하세요](https://support.cloudflare.com/hc/ko/articles/206455647-How-do-I-change-my-domain-nameservers-).

___

## flarectl(Cloudflare의 CLI 도구)을 통한 도메인 추가

Cloudflare의 공식 CLI인 flarectl을 사용하여 도메인을 추가할 수도 있습니다. 운영 체제(Windows, macOS/Darwin, Linux)용으로 [미리 제작된 패키지를 다운로드](https://github.com/cloudflare/cloudflare-go/releases)하고 이를 사용하여 도메인을 만들 수 있습니다.

먼저 API 자격 증명을 설정해야 합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

이어서, flarectl에 다음과 같이 명령을 실행하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone create --zone=$domain --jumpstart=false; done</span></div></span></span></span></code></pre>{{</raw>}}

이후 "flarectl zone list"를 통해 도메인별 이름 서버를 갖게 됩니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone info --zone=$domain; done</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

[Cloudflare 커뮤니티](https://community.cloudflare.com/)에서 도움말이나 팁을 검색해보세요.

___

## 일반적인 문제

이 과정에서 오류가 나타나면 도메인이 등록되지 않았거나(또는 등록만 됐거나), 하위 도메인이거나, 유효하지 않을 수 있습니다. 다음 문서는 가장 일반적인 사례를 소개하고 있습니다. 

-   [왜 도메인을 Cloudflare에 추가할 수 없습니까?](https://support.cloudflare.com/hc/ko/articles/205359838-I-cannot-add-my-domain-to-Cloudflare-)
-   [사이트 차단됨](https://support.cloudflare.com/hc/articles/205359838#h_874829316161540417303369)
