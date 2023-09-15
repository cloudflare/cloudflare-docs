---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/200170166-%EB%AA%A8%EB%B2%94-%EC%82%AC%EB%A1%80-DDoS-%EC%98%88%EB%B0%A9-%EC%A1%B0%EC%B9%98
title: 모범 사례 DDoS 예방 조치
---

# 모범 사례: DDoS 예방 조치

## 모범 사례: DDoS 예방 조치

_Cloudflare를 사용하는 사이트를 DDoS 공격으로부터 보호하기 위한 모범 사례를 알아보세요._

___

## 개요

Cloudflare에 가입한 후 아래 권장 사항을 통해 사이트가 DDoS 공격을 완벽히 대비하고 있는지 확인하세요.

### DNS 레코드를 Cloudflare에 프록시 설정하세요

공격자는 원본 IP 주소를 파악하여 Cloudflare의 보호를 받지 않는 원본 웹 서버를 직접 공격하려 합니다. 트래픽을 Cloudflare로 프록시 설정하여 직접 공격으로부터 원본 IP 주소를 숨기세요.

다음과 같은 조치로 DNS 레코드 보호를 극대화하세요.

1.  [Cloudflare 프록시(오렌지색 구름)를 사용하세요.](https://support.cloudflare.com/hc/articles/200169626)
2.  FTP 또는 SSH용 DNS 레코드를 제거하고 원본 IP를 사용하여 FTP 또는 SSH 요청을 직접 실행하세요. 또는 [Cloudflare Spectrum](/spectrum/getting-started/)으로 FTP와 SSH를 프록시 설정하세요.
3.  [메일 서버와 통신하는 A, AAAA 또는 CNAME 레코드를 회색 구름으로 전환하세요.](https://support.cloudflare.com/hc/articles/200168876)
4.  무료, 프로, 비즈니스 요금제의 경우 도메인 내 와일드카드를 제거하세요. 이들 도메인을 통해 원본 IP 주소가 노출됩니다. [Cloudflare는 기업 요금제 상의 도메인에 대해서만 와일드카드를 보호합니다](https://support.cloudflare.com/hc/articles/360017421192#CloudflareDNSFAQ-DoesCloudflaresupportwildcardDNSentries).

### Cloudflare IP의 요청을 제한하지 마세요

트래픽을 Cloudflare로 프록시 설정하면 [Cloudflare의 IP 주소](http://www.cloudflare.com/ips)에서 원본 웹 서버로 연결됩니다. 따라서 원본 웹 서버가 [Cloudflare IP를 허용해야](https://support.cloudflare.com/hc/articles/201897700) 합니다.

### Cloudflare나 신뢰할 수 있는 소스에서 시작하지 않은 트래픽을 차단하세요

Cloudflare나 신뢰할 수 있는 파트너, 벤더 또는 애플리케이션 IP 주소에서 시작하지 않은 트래픽을 확실히 차단하세요.

### 원본 서버 로그에서 원본 방문자 IP를 복원하세요

공격 뒤에 숨은 진짜 IP를 보려면 원본 서버 로그에서 [원본 방문자 IP를 복원하세요](https://support.cloudflare.com/hc/sections/200805497). 그렇게 하지 않으면, 모든 트래픽이 로그에 Cloudflare의 IP로 표시됩니다. Cloudflare는 언제나 원래의 방문자 IP 주소를 [HTTP 헤더](https://support.cloudflare.com/hc/articles/200170986)로 요청에 포함시킵니다. 호스팅 공급자에게, 리버스 프록시를 사용하고 있으며, 현재 연결을 조회하면 모든 트래픽이 Cloudflare의 IP에서 발생한다고 알리세요.

### 사이트를 Cloudflare로 옮긴 후 서버 IP 주소를 변경하세요

Cloudflare는 Cloudflare로 프록시 설정된 트래픽에 대해 원본 서버 IP 주소를 숨깁니다. 추가 보안 조치로서, 호스팅 공급자에게 연락하여 새로운 원본 서버 IP를 요청할 것을 권장합니다.

### Rate Limiting을 사용하여 무차별 암호 대입 공격과 계층 7 DDoS 공격을 막으세요

웹사이트 관리자는 정상적인 HTTP 요청으로 위장한 공격을 막기 위해, Rate Limiting을 이용하여 웹사이트가 수신할 부하의 임계값을 상세 지정할 수 있습니다. 클릭 한 번으로 기본 Rate Limiting을 설정하여 [무차별 암호 입력 공격으로부터 로그인 페이지를 보호하세요](https://support.cloudflare.com/hc/articles/115001635128#3UWQC5PrVScHgEGRMobRMm).

Cloudflare 무료, 프로, 비즈니스 요금제에는 월별 무료 요청 10,000개가 포함되어 있습니다. 자세한 내용은  [Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) 가이드를 참조하시기 바랍니다.

___

## 관련 자료

-   [Cloudflare DDoS 방어 이해](https://support.cloudflare.com/hc/articles/200172676)
-   [DDoS 공격에 대한 대응](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [DDoS 공격이란?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
