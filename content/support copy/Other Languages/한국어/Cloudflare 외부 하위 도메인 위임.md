---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360021357131-Cloudflare-%EC%99%B8%EB%B6%80-%ED%95%98%EC%9C%84-%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%9C%84%EC%9E%84
title: Cloudflare 외부 하위 도메인 위임
---

# Cloudflare 외부 하위 도메인 위임

## Cloudflare 외부 하위 도메인 위임

_하위 도메인 위임을 이용하면, Cloudflare 밖에 있는 특정 하위 도메인을 독립적으로 관리할 수 있는 유연성을얻게 됩니다._

___

## 개요

하위 도메인 위임으로 다양한 개인, 팀 또는 조직이 사이트의 다양한 하위 도메인을 관리할 수 있습니다.

예를 들어 _example.com_이Cloudflare의 DNS 앱에서 관리되는 _www.example.com_을 가진Cloudflare 도메인이고, _internal.example.com_이Cloudflare 외부의 이름 서버에 위임된 경우를 알아보겠습니다. 이 예에서  _internal.example.com_ 은_example.com_ 도메인에 대한Cloudflare 로그인 정보를 갖고 있지 않은 개인도 관리할 수 있습니다.

___

## 하위 도메인을 위임하세요

_internal.example.com_과 같은 하위 도메인을 위임하려면, DNS 확인자에 영역 파일을 찾을 곳을 알려주세요.

1.  Cloudflare dashboard에 로그인하세요.
2.  적절한 Cloudflare 계정을 클릭하세요.
3.  위임할 하위 도메인을 가진 도메인을 선택하세요.
4.   **DNS** 앱을 클릭하세요.
5.  하위 도메인용 _NS 레코드_ 를 만드세요. 예를 들면 다음과 같습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">internal.example.com NS ns1.externalhost.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">internal.example.com NS ns2.externalhost.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">internal.example.com NS ns3.externalhost.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

6.  (선택 사항) 위임된 이름 서버에 DNSSEC를 사용하는 경우, Cloudflare **DNS** 앱에 _DS 레코드_ 를 추가하세요.

___

## 관련 자료

-   [Cloudflare의 DNS 레코드 관리](https://support.cloudflare.com/hc/articles/360019093151)
-   [CNAME 설정 이해](https://support.cloudflare.com/hc/articles/360020348832)
-   [글루 레코드](https://www.ietf.org/rfc/rfc1912.txt) (RFC 1912 섹션 2.3)
