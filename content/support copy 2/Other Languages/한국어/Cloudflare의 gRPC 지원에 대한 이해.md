---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360050483011-Cloudflare%EC%9D%98-gRPC-%EC%A7%80%EC%9B%90%EC%97%90-%EB%8C%80%ED%95%9C-%EC%9D%B4%ED%95%B4
title: Cloudflare의 gRPC 지원에 대한 이해
---

# Cloudflare의 gRPC 지원에 대한 이해

## Cloudflare의 gRPC 지원에 대한 이해

_Cloudflare gRPC 지원으로 API 트래픽을 보호하는 방법을 알아봅니다._

___

## 개요

gRPC 프로토콜은 대역폭 사용량 감소, 대기 시간 단축, 빠른 실행으로 페이로드가 낮은 효율적 API를 구축하기 위해 2015년 Google이 개발했습니다. Cloudflare는 오렌지색 구름으로 된 gRPC 엔드포인트 상의 API 보호를 위해 gRPC를 지원합니다.

Cloudflare에의 gRPC 트래픽 실행은 대부분의 Cloudflare 제품(WAF, Bot Management, Page Rules 등)과 호환됩니다. gRPC 지원은 모든 요금제에 추가 비용 없이 제공됩니다.  하지만 Argo Smart Routing, WAF, 봇 관리 등의 추가 기능 제품에서의 gRPC 트래픽에 대해서는 요금이 부과될 수 있습니다. gRPC 지원은 광범위하게 테스트되어 안정적인 것으로 생각되지만, 여전히 버그 가능성이 있습니다.  예기치 않은 작동은 [Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476)에 알려주시기 바랍니다.

___

## 요건

-   gRPC 엔드포인트는 포트 443에서 데이터를 받아야 합니다. 
-   gRPC 엔드포인트가 TLS와 HTTP/2를 지원해야 합니다.
-   HTTP/2가 ALPN으로 공지되어야 합니다.
-   gRPC 요청의 **Content-Type** 헤더에 대해 _application/grpc_ 또는 _application/grpc+<메시지 유형_(예: _application/grpc+proto_)을 사용합니다.

___

## 한계

다음 제품은 gRPC 요청에 대해 기능이 제한됩니다.

-   **Argo Tunnel**은 현재 gRPC를 지원하지 않습니다.
-   **Cloudflare Access**는 Cloudflare의 역방향 프록시를 통해 전송된 gRPC 트래픽을 지원하지 않습니다. Cloudflare에서 gRPC를 사용하는 경우, Access는 gRPC 트래픽을 무시합니다. Access로 보호되는 민감한 원본 서버에 대해서는 gRPC를 사용하지 않도록 하거나, 원본 서버에 대해 gRPC 트래픽을 인증하는 다른 방법을 사용할 것을 권장합니다.

___

아래의 지침에 따라 gRPC를 활성화합니다.

1.  Cloudflare 계정에 로그인하세요.
2.  적절한 도메인을 선택하세요.
3.  **네트워크** 앱을 클릭합니다.
4.  **gRPC**를 토글하십시오.
