---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360021111972-DNSSEC-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0
title: DNSSEC 문제 해결
---

# DNSSEC 문제 해결

## DNSSEC 문제 해결

_DNSSEC는 DNS를 보호합니다.  본 문서는 DNS 확인에 영향을 주는 DNSSEC 문제를 감지하는 방법을 소개합니다._ 

### 이 문서에서

-   [Dig로 DNSSEC 테스트](https://support.cloudflare.com/hc/ko/articles/360021111972-DNSSEC-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0#TroubleshootingDNSSEC-DNSSECinPracticewithDig)
-   [Dig로 DNSSEC 신뢰 체인 보기](https://support.cloudflare.com/hc/ko/articles/360021111972-DNSSEC-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0#TroubleshootingDNSSEC-ViewingtheDNSSECChainofTrustwithDig)
-   [Dig로 DNSSEC 유효성 검사 문제 해결](https://support.cloudflare.com/hc/ko/articles/360021111972-DNSSEC-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationwithDig)
-   [DNSViz로 DNSSEC 유효성 검사 문제 해결](https://support.cloudflare.com/hc/ko/articles/360021111972-DNSSEC-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz)
-   [다음 단계](https://support.cloudflare.com/hc/ko/articles/360021111972-DNSSEC-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0#TroubleshootingDNSSEC-What'sNext?)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/360021111972-DNSSEC-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0#h_388049682151546042422637)

___

## Dig로 DNSSEC 테스트

_Dig_는 DNS 레코드의 이름 서버를 쿼리하는 명령줄 도구입니다. 예를 들어, _dig_는 DNS 확인자에 _www.cloudflare.com_의 IP 주소를 문의할 수 있습니다(옵션으로 _+short_을 사용하면 결과만 출력됩니다)_._


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +short</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">198.41.215.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">198.41.214.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

_dig_로 DNSSEC 레코드를 확인하세요.  아래 예에서


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +dnssec +short</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">198.41.214.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">198.41.215.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">A 13 3 300 20180927180434 20180925160434 35273 cloudflare.com. DYYZ/bhHSAIlpvu/HEUsxlzkC9NsswbCQ7dcfcuiNBrbhYV7k3AI8t46 QMnOlfhwT6jqsfN7ePV6Fwpym3B0pg==</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

하위 도메인의 공개 키가아니라 루트 도메인의 공개 키에 대해 쿼리해야 합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DNSKEY cloudflare.com +short</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">257 3 13 mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+ KkxLbxILfDLUT0rAK9iUzy1L53eKGQ==</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">256 3 13 koPbw9wmYZ7ggcjnQ6ayHyhHaDNMYELKTqT+qRGrZpWSccr/lBcrm10Z 1PuQHB3Azhii+sb0PYFkH1ruxLhe5g==</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

DNS 응답은 두 개의 레코드로 이루어져 있습니다.

-   _DNSKEY 레코드_ **256**은 영역 서명 키로 불리는 공개 키로서 _A, MX, CNAME, SRV_ 등의 DNS 레코드 서명을 확인할 때 사용됩니다.

_dig_에 _+short_ 옵션을 사용하지 않는 경우,  **ad** 플래그가 응답 헤더에 있으면 DNS 응답이 DNSSEC 인증을 받은 것입니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 65326;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; QUESTION SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;www.cloudflare.com.        IN  A</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; ANSWER SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.cloudflare.com. 15  IN  A   198.41.215.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.cloudflare.com. 15  IN  A   198.41.214.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## Dig로 DNSSEC 신뢰 체인 보기

도메인 서명(예: _cloudflare.com_)의 완전한 확인은 상위 레벨 도메인(예: _.com_)에서 키 서명 키를 확인하는 것이 포함됩니다.  이후

DNSSEC가 활성화된 경우 등록 기관의 DNS에 _DS 레코드_가 필요합니다. _DS 레코드_에는 다양한 공개 키 서명 키는 물론 키에 대한 메타데이터가 포함됩니다.

_dig_를 사용하여 _DS 레코드_를 찾으세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig +short DS cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

_dig_는 응답이 이름 서버에서 반환됐는지,


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DS cloudflare.com +trace</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflare.com.     86400   IN  DS  2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">com.            172800  IN  NS  e.gtld-servers.net.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; Received 1213 bytes from 2001:502:1ca1::30#53(e.gtld-servers.net) in 37 ms</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

위 모든 단계를 수동으로 실행하는 것보다 더 간편한 방법은 [DNSViz 온라인 도구](http://dnsviz.net/)를 사용하는 것입니다. 자세한 내용은 [DNSViz를 사용한 DNSSEC 유효성 검사 문제 해결](https://support.cloudflare.com/hc/ko/articles/360021111972-DNSSEC-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz)이나 [DNSViz를 통한 cloudflare.com의 DNSSEC 결과](http://dnsviz.net/d/cloudflare.com/dnssec/) 예를 참조하시기 바랍니다.

___

## Dig로 DNSSEC 유효성 검사 문제 해결

등록 기관의 오래된 DNSSEC 레코드를 업데이트하거나 제거하지 않고 권한 있는 DNS 공급자를 변경하면, 문제가 발생합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 10663</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

으로 _dig_를


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1 +dnssec +cd +short</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">104.20.49.61</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">104.20.48.61</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

위 예에서 _+cd_ 옵션을 사용한 경우에는 올바른 DNS 응답을 수신하지만, DNSSEC를 사용하여 쿼리한 경우 _SERVFAIL_ 응답을 수신한다면 DNSSEC가 잘못 구성된 것입니다_._이 문제는 권한 있는 이름 서버가 변경됐지만 _DS 레코드_가 업데이트되지 않은 경우 종종 발생합니다.  공격자가 쿼리에 대한 응답을 조작하려 할 때도 이 문제가 발생할 수 있습니다. 

___

## DNSViz로 DNSSEC 유효성 검사 문제 해결

1.  [http://dnsviz.net/](http://dnsviz.net/)으로 이동하세요.
2.  텍스트 필드가 나타나면 도메인 이름을 입력하세요.
3.  DNSViz가 처음으로 사이트를 분석하는 경우, 표시된 **분석** 버튼을 클릭하세요.
4.  DNSViz가 사이트를 분석한 적이 있었다면, 표시되는

![Screen_Shot_2018-09-18_at_10.31.54_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.31.54_AM.png)

![Screen_Shot_2018-10-16_at_2.png](/images/support/Screen_Shot_2018-10-16_at_2.png)

![Screen_Shot_2018-09-18_at_10.25.49_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.25.49_AM.png)

___

## 다음 단계 

DNSSEC 실행으로 문제가 발견된 경우, 도메인 등록 기관에 문의하여 _DS 레코드_가, 권한 있는 DNS 공급자가 지정한 무엇과 일치하는지 확인하세요. Cloudflare가 권한 있는 DNS 공급자인 경우에는 [Cloudflare로 DNSSEC 구성](https://support.cloudflare.com/hc/articles/360006660072) 지침을 따르세요.

___

## 관련 자료

-   [DNSSEC 작동 원리](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) 
-   [DNS 보안](https://www.cloudflare.com/learning/dns/dns-security/)
-   [Cloudflare로 DNSSEC 구성](https://support.cloudflare.com/hc/articles/360006660072)
