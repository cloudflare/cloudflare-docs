---
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115003013892-1XX-Informational
title: 1XX Informational
---

# 1XX Informational

## 1XX Informational

**개요**

1XX 코드는 대개 연결 상태 정보를 공유하는 데 사용되는 일시적인 응답으로, 최종 요청이나 응답 조치를 위한 것이 아닙니다. 서버의 요구 사항은 다음과 같습니다.

-   status 행 뒤에 오는 첫 번째 빈 행으로 응답을 모두 종료



-   [100 Continue](https://support.cloudflare.com/hc/ko/articles/115003013892-1XX-Informational#code_100)
-   [101 Switching Protocols](https://support.cloudflare.com/hc/ko/articles/115003013892-1XX-Informational#code_101)
-   [102 Processing](https://support.cloudflare.com/hc/ko/articles/115003013892-1XX-Informational#code_102)

**100 Continue([RFC7231](https://tools.ietf.org/html/rfc7231))**


**101 Switching Protocols([RFC7231](https://tools.ietf.org/html/rfc7231))**


**102 Processing([RFC2518](https://tools.ietf.org/html/rfc2518))**


Cloudflare가 102 응답을 받고 100초 이내에 응답을 수신하지 못할 경우 [Error 522: Connection Timed Out](https://support.cloudflare.com/hc/articles/115003011431#522error)이 생성됩니다. 102 응답은 [Error 524: A timeout error](https://support.cloudflare.com/hc/articles/115003011431#524error)를 방지하기 위해 사용할 수 있습니다.
