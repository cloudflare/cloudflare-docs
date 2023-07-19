---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/200168876-Cloudflare-%EC%82%AC%EC%9A%A9-%EC%8B%9C-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%A0%84%EC%86%A1-%EC%95%88-%EB%90%A8
title: Cloudflare 사용 시 이메일 전송 안 됨
---

# Cloudflare 사용 시 이메일 전송 안 됨

## Cloudflare 사용 시 이메일 전송 안 됨

_Cloudflare의 기본 구성으로는 HTTP 트래픽만 프록시 설정할 수 있으며, 메일 트래픽이 끊깁니다._

___

## 문제 해결 팁

아래에 소개된 _Cloudflare의 MX 레코드용 모범 사례_를 실행하고 있는데도 메일 수발신에 문제가 있다면 다음과 같이 조치하세요.

### DNS 레코드가 없습니까?

메일 관리자에게 문의하여 도메인용 DNS 레코드가 올바를지 확인하세요. DNS 레코드를 추가하거나 편집하는 데 도움이 필요하면 [Cloudflare의 DNS 레코드 관리](https://support.cloudflare.com/hc/ko/articles/360019093151) 가이드를 참조하세요.

### 메일 관련 DNS 레코드를 Cloudflare로 프록시 설정하지 마세요.

“mail.domain.com”의 _MX 레코드_가 있는 경우, “mail.domain.com”의 _A 레코드_는[Cloudflare의 DNS 레코드 관리](https://support.cloudflare.com/hc/ko/articles/360019093151) 가이드에서 설명한 것처럼 DNS _A 레코드_ 옆에 "회색 구름" 아이콘이 있어야 합니다.

### 메일 공급자에게 문의하여 지원을 받으세요.

DNS 레코드를 편집한 직후에 이메일이 작동하지 않으면, 메일 관리자나 메일 공급자에게 문의하여 문제 해결 지원을 받고, 문제에 대한 데이터를 Cloudflare 지원팀에 제공할 수 있게 하세요.

___

메일 트래픽을 성공적으로 전달하려면, 다음 안내를 따르세요.

-   메일 관련 DNS 레코드를 “회색 구름”으로 표시해, 메일 트래픽이 Cloudflare를 통해 프록시 설정되지 않도록 합니다.
-   메일 트래픽과 HTTP/HTTPS 트래픽에 별도 IP 주소를 사용하세요. Cloudflare는 다른 IP 범위의 비연속 IP를 사용할 것을 권장합니다.
-   기본적으로 메일 트래픽은 Cloudflare를 통해 프록시 설정할 수 없기 때문에, 원본 웹 서버의 IP 주소가 노출됩니다. 공격자는 원본 IP 주소에 대한 정보를 이용하여, Cloudflare 보안 기능을 우회하고 웹 서버를 직접 공격할 수 있습니다.
-   Cloudflare를 통해 프록시 설정된 루트 도메인에 대해 _MX 레코드_를 구성하지 마세요.
-   _MX 레코드_에 루트 도메인 이름을 지정하는 호스팅 회사가 많습니다. Cloudflare의 DNS를 사용할 때는, “mail.example.com” 같은 하위 도메인 이름을 _MX 레코드_에 지정하고 Cloudflare에 “mail.example.com”용 별도 _A 레코드_를 만들어 메일 서버의 IP 주소를 가리키게 하세요.
