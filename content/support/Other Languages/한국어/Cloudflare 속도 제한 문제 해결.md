---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115000546328-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0
title: Cloudflare 속도 제한 문제 해결
---

# Cloudflare 속도 제한 문제 해결

## Cloudflare 속도 제한 문제 해결

_Cloudflare API를 이용해 적절한 속도 제한의 요청 일치를 막고 오류를 야기하는 공통 문제를 해결합니다._

___

## 개요

몇 가지 일반적인 **속도 제한** 구성 문제로 인해 요청이 적절게 일치하지 않는 경우가 발생합니다.

-   **규칙 패턴에 HTTP 또는 HTTPS 프로토콜 스킴 포함**(예: _https://example.com/\*_). HTTP 또는 HTTPS 트래픽과만 일치하도록 규칙을 제한하려면 요청 일치에서 스킴 배열을 사용합니다(예: _"schemes": \[ "HTTPS" \]_)
-   **후행 슬래시 문자(/) 누락**. Cloudflare **속도 제한**은 홈 페이지의 요청(예: _example.com_ 및 _example.com/_)만 동등한 것으로 간주하고 다른 경로(예: _example.com/path/_와 _example.com/path_)는 동등한 것으로 간주하지 않습니다_._ 트레일링 슬래시가 있든 없든 요청 경로를 일치시키려면 와일드카드 일치(예: _example.com/path \*_)를 사용합니다 
-   **쿼리 문자열 또는 앵커 포함**(예: _example.com/path?foo=bar_ 또는 _example.com/path#section1_). _example.com/path_라는 규칙은 _example.com/path?foo=bar_에 대한 요청에 일치합니다.
-   [**IP Access 규칙**](https://support.cloudflare.com/hc/articles/217074967)**으로 속도 제한을 대체.**
-   **포트 번호 포함**(예: _example.com:8443/api/_). 속도 제한 제품은 규칙 내의 포트 번호를 고려하지 않으며 포트 번호는 규칙에 영향이 있습니다. URL 에서 포트 번호를 삭제하면 속도 제한 규칙이 예상대로 트리거될 것입니다.

또한, Cloudflare API를 통해 **속도 제한** 구성을 할 수 없게 되는 몇 가지 일반적인 오류가 있습니다.

-   _아직 디코딩이 아직 실행되지 않음_ -요청에 _Content-Type: application/json_ 헤더가 누락되었음을 의미합니다. API 요청에 헤더를 추가하면 문제가 해결됩니다.
-   _Ratelimit.api.not\_entitled_ - Enterprise 요금제 고객은 규칙을 추가하기 전에 Cloudflare 계정 팀에 문의해야 합니다.
-   기타 오류는 [API 문서](https://api.cloudflare.com/#rate-limits-for-a-zone-errors)에 설명되어 있습니다. 특정 오류가 확실하지 않은 경우, API 키를 수정한 후 실패한 API 요청으로 [Cloudflare 지원팀에 문의](https://support.cloudflare.com/hc/articles/200172476)하시기 바랍니다.

___

## 한계

속도 제한은 사용자가 정의한 속도를 초과하는 트래픽의 급증을 제한하기 위한 것입니다. 이 시스템은 정확한 수의 요청이 원본 서버에 도달할 수 있도록 허용하기 위해 설계한 것이 아닙니다. 요청을 감지하고 내부 카운터를 업데이트하는 사이에 지연이 발생할 수도 있습니다. 이 지연(수초 이내)으로 인해 에지에서 조치(차단, 인증 질문 등)를 시행하기 전까지 과도한 요청이 원본에 도달하는 경우도 있습니다.

___

## 관련 자료

-   [Cloudflare 속도 제한 구성](https://support.cloudflare.com/hc/articles/115001635128)
