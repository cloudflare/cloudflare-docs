---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/200170196-DDoS-%EA%B3%B5%EA%B2%A9%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0
title: DDoS 공격에 대응하기
---

# DDoS 공격에 대응하기

## DDoS 공격에 대응하기

_웹사이트를 DDoS(분산 서비스 거부) 공격으로부터 보호하세요. 현재 진행 중인 공격을 차단하기 위한 기본 대응을 알아보세요._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/200170196-DDoS-%EA%B3%B5%EA%B2%A9%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0#h_49125146-d910-42ad-a0d8-3d08a4eae681)
-   [1단계: 공격 중 모드 활성화](https://support.cloudflare.com/hc/ko/articles/200170196-DDoS-%EA%B3%B5%EA%B2%A9%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0#h_dfff923a-5879-4750-a747-ed7b639b6e19)
-   [2단계: WAF(웹 애플리케이션 방화벽) 활성화](https://support.cloudflare.com/hc/ko/articles/200170196-DDoS-%EA%B3%B5%EA%B2%A9%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0#h_b97416a5-5196-4f12-acb6-f81bbfcfa95f)
-   [3단계: 방화벽 앱을 통한 트래픽 추가 인증 또는 차단](https://support.cloudflare.com/hc/ko/articles/200170196-DDoS-%EA%B3%B5%EA%B2%A9%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0#h_a2c9a5ce-d652-46db-9e82-bc3f06835348)
-   [4단계: Cloudflare 지원팀에 문의](https://support.cloudflare.com/hc/ko/articles/200170196-DDoS-%EA%B3%B5%EA%B2%A9%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0#h_995ffed3-18a9-4f8c-833c-81236061b1e8)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/200170196-DDoS-%EA%B3%B5%EA%B2%A9%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0#h_034beb4b-231e-40d8-b938-5c1b446e26a6)

___

## 개요

Cloudflare의 네트워크는 초대형 [DDoS 공격](https://www.cloudflare.com/ddos)을 자동으로 완화합니다. 콘텐츠를 Cloudflare에 캐시해도 작은 DDoS 공격으로부터 웹사이트를 보호할 수 있지만, 캐시되지 않은 자산에는 본 가이드에서 제공된 수동 개입을 추가해야 하는 경우도 있습니다.

___

## 1단계: 공격 중 모드 활성화

 [**공격 중 모드**](https://support.cloudflare.com/hc/articles/200170076) 활성화 방법:

1\. Cloudflare 계정에 로그인하세요.

2\. 현재 공격을 받는 도메인을 선택하세요.

3\. Cloudflare **Overview** 앱의 **빠른 작업** 섹션에서 **공격 중 모드** 를  _켜짐_으로 전환하세요.

4\. \[선택 사항\] **방화벽** 앱의 **설정** 탭에서 [**인증 유효 기간**](https://support.cloudflare.com/hc/articles/200170136)을 조정하세요.

___

## 2단계: WAF(웹 애플리케이션 방화벽) 활성화

다음과 같이 Cloudflare [WAF](https://support.cloudflare.com/hc/ko/articles/200172016-What-does-the-Web-Application-Firewall-WAF-do-)를 사용하세요.

1.  Cloudflare 계정에 로그인하세요.
2.  추가 보호가 필요한 도메인을 선택하세요.
3.  **Firewall** 앱의  **관리형 규칙** 탭에서 **웹 애플리케이션 방화벽**을 _켜짐_으로 전환하세요.

___

## 3단계: Firewall 앱을 통한 트래픽 추가 인증 또는 차단

Cloudflare **Firewall** 앱은 다음과 같은 방법으로 트래픽 차단을 용이하게 합니다.

-   [**IP 액세스 규칙**](/waf/tools/ip-access-rules/) \- 여러 IP 주소/16 또는 /24 IP 범위, 또는 ASN(자치 시스템 번호)을 차단하는 데 추천합니다. 
-   [**방화벽 규칙**](/firewall/cf-dashboard/create-edit-delete-rules/) \- 국가, 유효한 IP 범위 또는 복잡한 공격 패턴을 차단하는 데 추천합니다.

-   [**영역 잠금**](/waf/tools/zone-lockdown/) \- 신뢰할 수 있는 IP 주소나 범위만을 사이트에 허용할 때 추천합니다.
-   [**사용자 에이전트 차단**](/waf/tools/user-agent-blocking/) \- 전체 도메인에 대해 의심스러운 [사용자 에이전트 헤더](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)를 차단할 때 추천합니다.

차단하거나 대응할 국가나 IP를 결정하려면 로그 파일을 확인하세요. 호스팅 공급자에게 문의하여 다음을 파악하세요.

-   원본 웹 서버에 도달한 공격 트래픽
-   공격이 액세스하고 있는 리소스 
-   공격의 공통 특징(IP 주소, 사용자 에이전트, 국가 또는 ASNs, 기타)

___

## 4단계: Cloudflare 지원팀에 문의

위 조치를 이용하여 원본 웹 서버에 대한 과부하 공격을 막지 못한 경우, [Cloudflare 지원팀에 도움을 요청하세요](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730). 

___

## 관련 자료

-   [Cloudflare DDoS 방어 이해](https://support.cloudflare.com/hc/articles/200172676)
-   [모범 사례: DDoS 예방 조치](https://support.cloudflare.com/hc/articles/200170166)
-   [“I’m Under Attack 모드”는 어떻게 작동합니까?](https://support.cloudflare.com/entries/22053133)
-   [Cloudflare Logs를 사용한 DDoS 트래픽 조사(기업 요금제 전용)](https://support.cloudflare.com/hc/ko/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [사법 기관에 DDoS 공격을 신고하는 방법](https://www.icann.org/news/blog/how-to-report-a-ddos-attack)
