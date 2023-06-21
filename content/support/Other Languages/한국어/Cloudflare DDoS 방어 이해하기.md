---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/200172676-Cloudflare-DDoS-%EB%B0%A9%EC%96%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0
title: Cloudflare DDoS 방어 이해하기
---

# Cloudflare DDoS 방어 이해하기

## Cloudflare DDoS 방어 이해하기

_Cloudflare가 DDoS 공격을 차단하는 방법과 웹사이트가 공격 받고 있는지 여부를 파악하는 방법을 알아보세요._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/200172676-Cloudflare-DDoS-%EB%B0%A9%EC%96%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_948b870f-2a72-481a-8186-cccc7f4f7c9b)
-   [Cloudflare HTTP DDoS 공격 방어 관리 규칙 세트](https://support.cloudflare.com/hc/ko/articles/200172676-Cloudflare-DDoS-%EB%B0%A9%EC%96%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#http-ddos-managed-rules)
-   [Cloudflare 네트워크 계층 DDoS 공격 방어 관리 규칙 세트](https://support.cloudflare.com/hc/ko/articles/200172676-Cloudflare-DDoS-%EB%B0%A9%EC%96%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#network-ddos-managed-rules)
-   [DDoS 공격을 받고 있는지 판단하세요](https://support.cloudflare.com/hc/ko/articles/200172676-Cloudflare-DDoS-%EB%B0%A9%EC%96%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_bc8656d7-0088-4da1-b8da-2a369caa72d3)
-   [Cloudflare가 나를 공격하고 있습니까?](https://support.cloudflare.com/hc/ko/articles/200172676-Cloudflare-DDoS-%EB%B0%A9%EC%96%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_60eb7a1e-a0b0-45c9-9c19-d67b93eea470)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/200172676-Cloudflare-DDoS-%EB%B0%A9%EC%96%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_5d49e839-e040-49a9-acce-11bd03dfdcc2)

___

## 개요

 [DDoS(분산 서비스 거부 공격)](https://www.cloudflare.com/ddos) 이 있으면, 최종 사용자가 온라인 서비스를 사용할 수 없습니다.  Cloudflare의 모든 요금제는 계층 3, 4, 7 DDoS 공격을 무제한으로 완화합니다. Cloudflare는 공격 크기에 따라 요금을 청구하지 않으며 공격 크기, 유형, 기간에 제한을 두지 않습니다.

Cloudflare의 네트워크는 대형 [DDoS 공격](https://www.cloudflare.com/ddos)을 자동 모니터링하고 완화하도록 구축됐습니다. Cloudflare에 콘텐츠를 캐시하면 웹사이트는 소형 DDoS 공격으로부터 보호되지만 캐시하지 않은 자산은 [수동으로 DDoS 공격에 대응](/ddos-protection/best-practices/respond-to-ddos-attacks/)해야 합니다.

또한 Cloudflare는 소규모의 DDoS 공격 완화도 도와드립니다.

-   모든 요금제의 구역에 대해 HTTP 오류율이 _높음_(기본값) 민감도 수준인 초당 1,000 오류 임계값을 넘는 경우. [HTTP DDoS 관리 규칙 세트를 구성](/ddos-protection/managed-rulesets/http)함으로써 민감도 수준을 낮출 수 있습니다.

-   Pro 요금제, Business 요금제, Enterprise 요금제 구역에 대해서는 Cloudflare가 감지 정확도를 높이기 위한 추가 검사를 수행합니다. 초당 오류 값은 정상적인 원본 트래픽 수준의 5배 이상이어야 합니다.

Cloudflare는 52X 범위의 모든 HTTP 오류(내부 서버 오류)와 [530 오류](https://support.cloudflare.com/hc/articles/115003011431#530error)를 제외한 모든 53X 범위 오류에 기초하여 결정합니다.

HTTP DDoS 공격 완화는 방화벽 분석 대시보드에 HTTP DDoS 이벤트로 표시됩니다.이러한 이벤트는 [Cloudflare Logs](/logs/)에서도 볼 수 있습니다.

현재는 HTTP 오류 비율에 기반한 DDoS 완화에서는 고객이 특정 HTTP 오류 코드를 배제할 수 없습니다.

Cloudflare 학습 센터에서  [유명한 DDoS 공격](https://www.cloudflare.com/learning/ddos/famous-ddos-attacks/) 및 [DDoS](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) 를 자세히 알아보시기 바랍니다. 본 문서의 끝에 있는 관련 자료 섹션에서 DDoS 사례 연구도 참조할 수 있습니다.

___

Cloudflare HTTP DDoS 공격 방어 관리 규칙 세트는 알려진 공격 패턴, 알려진 공격 도구, 의심스러운 패턴, 프로토콜 위반, 대량의 원본 오류를 초래하는 요청, 원본/캐시에 도달하는 과도한 트래픽, 에지의 응용 프로그램 계층에 대한 추가적인 공격 벡터 등과 비교하기 위해 이용하는 사전 구성된 규칙의 모음입니다, 규칙 세트는 모든 요금제의 Cloudflare 고객이 사용할 수 있으며 기본적으로 활성화되어 있습니다.

정당한 트래픽이 급증할 것으로 예상되는 경우에는 정당한 트래픽을 공격 트래픽으로 잘못 식별하여 차단하거나 인증 질문을 제기하는 긍정 오류를 방지할 수 있도록 DDoS 방어 설정의 사용자 정의를 검토하시기 바랍니다.

Cloudflare HTTP DDoS 공격 방어 관리 규칙 세트 및 사용 가능한 구성 설정에 대한 자세한 내용은 [Cloudflare 개발자 포털](/ddos-protection/managed-rulesets/http) 및 최신 블로그 게시물을 참조하세요.

HTTP DDoS 공격 방어 시스템이 취하는 조치에 대한 자세한 내용은 [HTTP DDoS 공격 방어 매개 변수: 조치](/ddos-protection/managed-rulesets/http/override-parameters#action)를 참고하시기 .

___

## Cloudflare 네트워크 계층 DDoS 공격 방어 관리 규칙 세트

Cloudflare 네트워크 계층 DDoS 공격 방어 관리 규칙 세트는 OSI 모델의 계층 3과 4에서의 알려진 DDoS 공격 벡터와 비교하기 위해 이용하는 사전 구성된 규칙의 모음입니다, 규칙 세트는 모든 요금제의 Cloudflare 고객이 사용할 수 있으며 기본적으로 활성화되어 있습니다.

Cloudflare 네트워크 계층 DDoS 공격 방어 관리 규칙 세트 및 사용 가능한 구성 설정에 대한 자세한 내용은 [Cloudflare 개발자 포털](/ddos-protection/managed-rulesets/network) 및 최신 블로그 게시물을 참조하세요.

L3/4 DDoS 공격 방어 시스템이 취하는 조치에 대한 자세한 내용은 [네크워크 계층 DDoS 공격 방어 매개 변수: 조치](/ddos-protection/managed-rulesets/network/override-parameters#action)를 참고하시기 바랍니다.

___

## DDoS 공격을 받고 있는지 판단하세요

DDoS 공격을 받고 있다는 일반적인 징후:

-   사이트가 오프라인이거나 요청에 대한 응답이 느립니다.
-   Cloudflare **Analytics** 앱의 **Cloudflare를 통한 요청** 또는 **대역폭** 그래프에 예상치 못한 급증이 있습니다.
-   원본 웹 서버 로그에 일반적인 방문자 행동과 일치하지 않는 이상한 요청이 있습니다.

___

## Cloudflare가 나를 공격하고 있습니까?

Cloudflare가 귀사의 사이트를 공격하는 것으로 잘못 인식되는 두 가지의 흔한 시나리오가 있습니다.

-    [원본 방문자 IP 주소를 복구하지 않으면](https://support.cloudflare.com/hc/ko/sections/200805497-Restoring-Visitor-IPs) 모든 프록시 설정된 요청에 대해 Cloudflare IP 주소가 서버 로그에 나타납니다.
-   공격자가 Cloudflare IP를 스푸핑합니다.  [Cloudflare Spectrum](/spectrum/get-started/)을 사용하지 않는다면 Cloudflare는  [몇 개의 특정 포트를 통해 원본 웹 서버에만 트래픽을 보냅니다](https://support.cloudflare.com/hc/articles/200169156) .

이상적으로는, Cloudflare가 리버스 프록시이기 때문에 호스팅 공급자는  [Cloudflare IP 주소](https://www.cloudflare.com/ips/)에서 시작된 공격 트래픽을 관찰하게 됩니다. 이와 반대로 Cloudflare에 속하지 않는 IP 주소에서 시작된 연결이 나타나면 원본 웹 서버가 공격을 받고 있는 것입니다. 트래픽이 Cloudflare 네트워크를 우회하기 때문에 Cloudflare는 원본 IP 주소에 대한 공격을 막을 수 없습니다.

___

## 관련 자료

-   [DDoS 공격에 대응하기](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [모범 사례: DDoS 예방 조치](https://support.cloudflare.com/hc/articles/200170166)
-   [Cloudflare Logs를 사용한 DDoS 트래픽 조사(기업 요금제 전용)](https://support.cloudflare.com/hc/ko/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [DDoS 공격이란?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
-   [DNS 증폭 공격의 작동 원리](http://blog.cloudflare.com/deep-inside-a-dns-amplification-ddos-attack)

### 사례 연구

-   [65Gbps DDoS 공격 시작 방법 및 차단 방법](http://blog.cloudflare.com/65gbps-ddos-no-problem)
-   [공격 중단으로 끝나지 않는 사이버 전쟁](http://blog.cloudflare.com/ceasefires-dont-end-cyberwars)
-   [반사 공격에 대한 숙고](https://blog.cloudflare.com/reflections-on-reflections/)
-   [100Gbps DDoS 공격을 일으키는 SSDP(Stupidly Simple DDoS Protocol)](https://blog.cloudflare.com/ssdp-100gbps/)
-   [Memcrashed - UDP 포트 11211에서 시작된 주요 증폭 공격](https://blog.cloudflare.com/memcrashed-major-amplification-attacks-from-port-11211/)
-   [대형 DDoS의 진짜 원인 - IP 스푸핑](https://blog.cloudflare.com/the-root-cause-of-large-ddos-ip-spoofing/)
