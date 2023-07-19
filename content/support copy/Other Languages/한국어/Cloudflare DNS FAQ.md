---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ
title: Cloudflare DNS FAQ
---

# Cloudflare DNS FAQ

_Cloudflare DNS 앱과 관련된 일반적인 문제에 대해 도움을 받으세요._

### 이 문서에서

-   [DNS에 대한 자세한 정보는 어디에서 찾을 수 있습니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_GceQe7yLNteKL7WN8Fo2V)
-   [Cloudflare는 무료 DNS(도메인 이름 서버) 공급자입니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_5AzfKIrChBLWiegj2LqTBx)
-   [Cloudflare는 DNS 쿼리에 대해 비용을 청구합니까, 아니면 제한합니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_2hngeJgVJQtBClJB3cVQgq)
-   [이름 서버를 변경하여 Cloudflare를 가리키게 하려면 어디에서 작업해야 합니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_6gPUYJL7OXyKn7OEaAwipE)
-   [Cloudflare는 도메인이 가질 수 있는 DNS 레코드의 수를 제한합니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#RW4QZK9AQYTX3499R4SG)
-   [Cloudflare가 프록시 설정하지 않는 레코드 유형은 어떤 것들입니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_6mb72z48vZY69qLaqRO7we)
-   [Cloudflare 상에 없는 도메인을 Cloudflare 상에 있는 도메인으로 리디렉션하는 데 CNAME을 적용할 수 있습니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_5o8rP75kFhX9g6jaDNSoTQ)
-   [Cloudflare는 와일드카드 DNS 항목을 지원합니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_2C7rPZioPs5FIMJgvWiPST)
-   [DNS 변경 사항이 구현되는 데 얼마나 걸립니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_14OysgtO7JgA3N8KAtdZCn)
-   [Cloudflare는 도메인 마스킹을 제공합니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_1POmiVdco4wE6nwRTmsJsf)
-   [왜 Cloudflare DNS 서버에 쿼리를 할 수 없습니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_7DVKxAlJIDkVgdAiBdpFqs)
-   [Cloudflare에 등록할 때 DS 레코드를 제거해야 하는 이유는 무엇입니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_3yslZOSrNhsasnFQz7E8T1)
-   [DS 레코드를 제거하면 어떻게 됩니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_6yAiPswlhUgChycYuyLwvw)
-   [Cloudflare는 EDNS0(DNS용 확장 메커니즘)를 지원합니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_1sl0Bnvuv1fPoO6NkqWlI4)
-   [서버 IP 주소나 호스팅 공급자를 변경하면 어떻게 해야 합니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_48mRDrZWcDoNy86Vh430dJ)
-   [Cloudflare 이름 서버는 어디에서 찾을 수 있습니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_4DQSdKPOf5WeRRGX4UoSrG)
-   [내 도메인의 DNS 응답에 Cloudflare A 또는 AAAA 레코드/IP 주소가 표시되는 이유는 무엇인가요?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_2hZzaAXD1FZ85LaoygALPE)
-   [DNS 레코드 옆의 구름 아이콘은 오렌지색이나 회색이어야 합니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_4KiZSEaZkCCJXEDGuD9Htf)
-   [하위 도메인을 Cloudflare에 바로 추가할 수 있습니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_2TF12dhvaLH91R6POBV0el)
-   [403 Terraform을 사용하여 DNS 레코드를 생성할 때의 인증 오류](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_7db6AC21wyy5Xuq8vk17lY)
-   [내 도메인을 추가한 후 임의 DNS 레코드 수백 개가 표시되는 이유는 무엇입니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_1lFKZFkAFRGtDPNZetRq52)
-   [파킹된 도메인/리디렉션 전용/원본 없는 설정에 어떤 IP를 사용해야 합니까?](https://support.cloudflare.com/hc/ko/articles/360017421192-Cloudflare-DNS-FAQ#h_5mPkNqCpR3dklDjTvbASCI)

___

[Cloudflare 학습 센터 DNS 가이드](https://www.cloudflare.com/learning/dns/what-is-dns/)를 참조하시기 바랍니다.

___

## Cloudflare는 무료 DNS(도메인 이름 서버) 공급자입니까?

예. Cloudflare는 모든 요금제에서 [무료 DNS 서비스](https://www.cloudflare.com/dns)를 고객에게 제공합니다. 다음을 참고하시기 바랍니다.

1.  Cloudflare를 사용하기 위해 호스팅 공급자를 변경하지 않아도 됩니다.
2.  등록 기관을 바꾸지 않아도 됩니다. 권한 있는 이름 서버가 Cloudflare 이름 서버를 가리키게 등록 기관을 변경하기만 하면 됩니다.

2018년 10월 현재, 도메인을 [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)로 이전할 수 있습니다.

___

## Cloudflare는 DNS 쿼리에 대해 비용을 청구합니까, 아니면 제한합니까?

Cloudflare는 DNS 쿼리를 제한하거나 상한을 두지 않지만 가격은 요금제 수준에 따라 다릅니다.

Free, Pro, Business 요금제 고객의 경우 Cloudflare는 DNS 쿼리에 대해 비용을 청구하지 않습니다.

Enterprise 요금제 고객의 경우 Cloudflare는 사용자 지정 견적을 생성하기 위한 가격 입력으로 월별 DNS 쿼리 수를 사용합니다. 초과분은 청구되지 않습니다.

___

## 이름 서버를 변경하여 Cloudflare를 가리키게 하려면 어디에서 작업해야 합니까?

등록 기관에서 변경하세요. 등록 기관은 호스팅 공급자일 수도 있고 그렇지 않을 수도 있습니다. 도메인의 등록 기관이 어디인지 모르면 [WHOis 검색](http://www.whois.net/)을 통해 찾을 수 있습니다.[이름 서버를 Cloudflare로 변경](/dns/zone-setups/full-setup/setup)의 지침을 따르세요.

___

## Cloudflare는 도메인이 가질 수 있는 DNS 레코드의 수를 제한합니까?

예. 현재 Free, Pro, Business 고객은 생성할 수 있는 DNS 레코드 수에 제한이 있습니다.

Enterprise 고객인 경우 추가 DNS 레코드가 필요한 경우 계정 팀에 문의하시면 됩니다.

___

## Cloudflare가 프록시 설정하지 않는 레코드 유형은 어떤 것들입니까?

Cloudflare는 다음 레코드 유형을 프록시하지 않습니다.

-   LOC
-   MX
-   NS
-   SPF
-   TXT
-   SRV
-   CAA

___

## Cloudflare 상에 없는 도메인을 Cloudflare 상에 있는 도메인으로 리디렉션하는 데 CNAME을 적용할 수 있습니까?

아닙니다. Cloudflare 상에 없는 사이트에 대한 리디렉션을 수행하려면 원본 웹 서버에서 기존 301 또는 302 리디렉션을 설정하시기 바랍니다.

CNAME 레코드를 통해 Cloudflare 사이트가 아닌 사이트를 리디렉션하면 DNS 확인 오류가 발생합니다. Cloudflare는 Cloudflare에 있는 도메인의 역방향 프록시이므로 Cloudflare에 있지 않은 도메인에 대한 CNAME 리디렉션은 트래픽을 보낼 위치를 알 수 없습니다.

___

## Cloudflare는 와일드카드 DNS 항목을 지원합니까?

Cloudflare는 이제 모든 고객 요금제에서 DNS 관리를 위한 프록시 와일드카드 '\*' 레코드를 지원합니다. 이전에는 Enterprise 요금제에만 제공되었습니다.

___

## DNS 변경 사항이 구현되는 데 얼마나 걸립니까?

기본적으로 Cloudflare 영역 파일에 대한 변경 사항이나 추가 사항은 5분 이내에 적용됩니다. 로컬 DNS 캐시는 업데이트에 시간이 더 걸릴 수 있습니다. 따라서 완전히 전파하는 데 5분이 넘을 수 있습니다.

이 설정은 [DNS 레코드](/dns/manage-dns-records/how-to/create-dns-records)의 TTL(Time-to-Live) 값에 의해 제어됩니다.프록시된 레코드는 300초(자동) 이내에 업데이트되지만 프록시되지 않은 레코드의 TTL은 사용자 정의할 수 있습니다.

___

## Cloudflare는 도메인 마스킹을 제공합니까?

아닙니다. Cloudflare는 도메인 마스킹이나 DNS 리디렉션 서비스를 제공하지 않습니다(호스팅 공급자가 제공할 수 있음).그러나 [대량 리디렉션](/rules/url-forwarding/bulk-redirects/) 을 통한 URL 전달은 제공합니다.

___

## 왜 Cloudflare DNS 서버에 쿼리를 할 수 없습니까?

ANY 쿼리는 특별한 쿼리로, 오해하는 경우가 많습니다. 이 쿼리는 일반적으로 DNS 이름에서 사용할 수 있는 모든 레코드 유형을 가져오는 데 사용되지만, 반환하는 것은 재귀 확인자의 캐시에 있는 모든 유형에 불과합니다. 따라서 ANY 쿼리를 디버깅에 사용하면 혼란이 일어날 수 있습니다.

CNAME 플래트닝 같은 Cloudflare의 다양한 첨단 DNS 기능 때문에 ANY 쿼리에 올바른 응답을 제공하는 것이 복잡하고 불가능할 수 있습니다. 예를 들어 DNS 레코드가 동적으로 이동하거나 원격으로 저장될 때 동시에 모든 결과를 받는 것이 어렵거나 불가능할 수 있습니다.

프로덕션에서는 ANY를 거의 사용하지 않지만, ANY가 반환하는 긴 응답을 활용할 수 있도록 DNS 반사 공격에 사용되는 경우가 많습니다.

Cloudflare 고객은 레코드를 나열하는 데 ANY 쿼리를 사용하지 않고, 로그인한 후 DNS 앱 설정을 확인하면, DNS 레코드를 더 잘 파악할 수 있습니다.

2015년 9월, 모든 권한 있는 DNS 고객에 대해 ANY 쿼리를 차단하기로 결정됐지만, 가상 DNS 고객은 영향을 받지 않습니다.

Cloudflare 블로그에서 [DNS ANY 메타쿼리 유형 사용 중단](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/)에 대해 알아보세요.

___

## Cloudflare에 등록할 때 DS 레코드를 제거해야 하는 이유는 무엇입니까?

Cloudflare는 DNSSEC를 지원합니다. Cloudflare 사용 중 등록 기관에 DS 레코드가 있으면, Google 및 noErrrorfrom 같은 유효성 검사 확인자를 사용할 때, SERVFAIL과 같은 오류가 발생할 수 있습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">다음은 오류의 예입니다.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">╰─➤ dig dnssec-failed.org @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;&lt;&gt;&gt; DiG 9.8.3-P1 &lt;&lt;&gt;&gt; dnssec-failed.org @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; global options: +cmd</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; Got answer:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 5531</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0 ;; QUESTION SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;dnssec-failed.org. IN A</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Cloudflare는 도메인에 [DNSSEC를 사용](https://support.cloudflare.com/hc/articles/360006660072)할 때 , DNSSEC 지원을 통해 상위 도메인에 업로드해야 하는 DS 레코드를 제공합니다.

___

## DS 레코드를 제거하면 어떻게 됩니까?

DS 레코드를 제거하면 무효화 프로세스가 시작되어 도메인의 DNS 레코드 서명이 취소됩니다. 이 작업을 통해, 권한 있는 이름 서버를 변경할 수 있습니다. 기존 고객인 경우 Cloudflare를 사용하는 데 영향이 없습니다. 신규 고객은 이 단계를 완료해야 Cloudflare를 성공적으로 사용할 수 있습니다.

___

## Cloudflare는 EDNS0(DNS용 확장 메커니즘)를 지원합니까?

예, Cloudflare DNS는 EDNS0을 지원합니다. EDNS0는 모든 Cloudflare 고객이 사용할 수 있습니다. 이것은 DNS 확인자(재귀 DNS 공급자)가 대형 메시지와 DNSSEC를 지원하는 경우, 신호 지원을 추가하는 최신 DNS 실행을 위한 기본 요소입니다.

EDNS0는 [DNS 확장용](http://en.wikipedia.org/wiki/Extension_mechanisms_for_DNS)으로 처음 승인된 메카니즘 세트이며, 처음에는 [RFC 2671](https://datatracker.ietf.org/doc/html/rfc2671)로 발표됐습니다.

___

## 서버 IP 주소나 호스팅 공급자를 변경하면 어떻게 해야 합니까?

호스팅 공급자나 서버 IP 주소를 전환한 후 Cloudflare **DNS** 앱의 IP 주소를 업데이트하세요. 새로운 호스팅 공급자가 DNS가 사용해야 할 새 IP 주소를 제공합니다. **DNS** 앱에서 DNS 레코드 내용을 수정하려면, IP 주소를 클릭하고 새 IP 주소를 입력하세요.

___

## Cloudflare 이름 서버는 어디에서 찾을 수 있습니까?

Cloudflare 계정의 **DNS** 앱 아래에서 **Cloudflare 이름 서버**를 검토하세요.

특정 Cloudflare 이름 서버와 연계된 IP 주소는 분석 명령이나 [whatsmydns.net](https://www.whatsmydns.net/)처럼 온라인으로 호스팅된 타사 DNS 조회 도구를 통해 검색할 수 있습니다.

___

## 내 도메인의 DNS 응답에 Cloudflare A 또는 AAAA 레코드/IP 주소가 표시되는 이유는 무엇인가요?

Cloudflare로 프록시 설정된 DNS 레코드의 경우, Cloudflare의 IP 주소는 원본 서버 IP 주소 대신 DNS 쿼리로 반환됩니다. 따라서 Cloudflare는 웹사이트에 대한 모든 요청을 최적화하고, 캐시하고, 보호할 수 있습니다.

___

## DNS 레코드 옆의 구름 아이콘은 오렌지색이나 회색이어야 합니까?

기본적으로 웹 트래픽을 처리하는 A 및 CNAME 레코드(HTTP 및 HTTPs)만 Cloudflare로 프록시 설정할 수 있습니다. 기타 다른 DNS 레코드는 회색 구름로 전환해야 합니다. 자세한 내용은 [지원 가이드](/dns/manage-dns-records/reference/proxied-dns-records)를 참조하세요.

___

## 하위 도메인을 Cloudflare에 바로 추가할 수 있습니까?

Enterprise 고객만 하위 [도메인 지원](https://support.cloudflare.com/hc/articles/360026440252) 을 통해 Cloudflare에 직접 하위 도메인을 추가할 수 있습니다.

___

## 403 Terraform을 사용하여 DNS 레코드를 생성할 때의 인증 오류

**문제 설명**

Terraform을 Cloudflare API와 함께 사용할 때 `오류: DNS 레코드 생성 실패: HTTP 상태 403: 인증 오류(10000)`가 반환됩니다.

**근본 원인**

오류가 고객 코드 구문(구체적으로 zone\_id = data.cloudflare\_zones.example\_com.id)에 있는 것으로 밝혀졌으므로 오류에 오해의 소지가 있는 것 같습니다.

**솔루션**

인수 `zone_id = data.cloudflare_zones.example_com.zones[0].id`인지 확인하시기 바랍니다.더 자세한 사용 사례는 [이](https://github.com/cloudflare/terraform-provider-cloudflare/issues/913) GitHub 스레드에서 찾을 수 있습니다.

___

## 내 도메인을 추가한 후 임의 DNS 레코드 수백 개가 표시되는 이유는 무엇입니까?

이는 이전의 권한 있는 DNS에서 와일드카드 \* 레코드가 구성되었을 때 발생할 수 있습니다. /api/operations/dns-records-for-a-zone-delete-dns-record API를 사용하여 이러한 레코드를 대량으로 제거할 수 있습니다. 또는 Cloudflare Dashboard에서 도메인을 삭제한 다음 신뢰할 수 있는 DNS에서 와일드카드 레코드를 삭제하고 도메인을 다시 추가할 수도 있습니다.

___

## 파킹된 도메인/리디렉션 전용/원본 없는 설정에 어떤 IP를 사용해야 합니까?

"originless" 설정에서 자리 표시자 주소가 필요한 경우 Cloudflare DNS에서 IPv6 예약 주소 **100::** 또는 IPv4 예약 주소 **192.0.2.0**을 사용하여 프록시 모드에서 항목을 생성함으로써 Cloudflare Page Rules 또는 Cloudflare Workers를 활용할 수 있습니다.
