---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115003013892-1XX-Informational
title: 1XX Informational
---

# 1XX Informational

## 1XX Informational

**개요**

1XX 코드는 대개 연결 상태 정보를 공유하는 데 사용되는 일시적인 응답으로, 최종 요청이나 응답 조치를 위한 것이 아닙니다. 서버의 요구 사항은 다음과 같습니다.

-   status 행 뒤에 오는 첫 번째 빈 행으로 응답을 모두 종료

-   HTTP 1.0에는 사용하지 않습니다 원본 서버는 HTTP 1.0 클라이언트에 1XX 응답을 전송하면 안 됩니다.

Cloudflare는 이러한 응답을 모두 전달할 뿐 절대로 응답을 생성하지 않습니다.

-   [100 Continue](https://support.cloudflare.com/hc/ko/articles/115003013892-1XX-Informational#code_100)
-   [101 Switching Protocols](https://support.cloudflare.com/hc/ko/articles/115003013892-1XX-Informational#code_101)
-   [102 Processing](https://support.cloudflare.com/hc/ko/articles/115003013892-1XX-Informational#code_102)

**100 Continue([RFC7231](https://tools.ietf.org/html/rfc7231))**

응답 본문을 전송할 수 있도록 초기 요청을 확인합니다. 원본 서버는 (요청 헤더에 따라) 요청을 수용하고자 합니다. 이 응답은 일반적으로 클라이언트가 응답 본문을 전송하기 전에 반환되며, 클라이언트가 불필요하거나 쓸모없는 데이터를 전송하는 것을 방지합니다. 서버의 요구 사항: 클라이언트가 `Expect: 100-continue` 헤더를 전송한 경우 서버는 반드시 `100 Continue`와 함께 즉시 응답하고, 입력 스트림을 계속 읽거나, 다른 응답 코드를 전송해야 합니다. Cloudflare는 Keep-Alive 연결을 사용하기 때문에 이 응답은 불필요합니다.

**101 Switching Protocols([RFC7231](https://tools.ietf.org/html/rfc7231))**

원본 서버가 프로토콜을 전환하겠다는 클라이언트의 요청을 수용했습니다. 클라이언트 요청이 헤더 필드의 `Upgrade`에 포함되어 있거나, 이 연결에 사용 중인 애플리케이션 프로토콜에 변경 사항이 있습니다. Upgrade 헤더 필드를 사용할 경우, 서버가 클라이언트의 우선순위 목록에서 현재 사용 중인 프로토콜보다 상위에 있는 프로토콜로 업그레이드한다는 것에 동의했음을 의미합니다. 또한, 원본 서버는 반드시 `Upgrade` 헤더 필드로 응답해 새로운 프로토콜로 연결이 전환되는 것을 알려야 합니다. 프로토콜의 전환은 클라이언트와 서버 모두에 유리하게 작용하는 것으로 가정됩니다. 가장 일반적인 이용 사례는 WebSockets의 경우입니다. Cloudflare의 WebSockets에 관한 자세한 정보는 블로그 게시물 [Cloudflare, 이제 Websockets 지원](https://blog.cloudflare.com/cloudflare-now-supports-websockets/)을 참조하세요.

**102 Processing([RFC2518](https://tools.ietf.org/html/rfc2518))**

서버가 클라이언트로부터 완료된 응답을 수신했지만, 처리에 더 많은 시간(20초 이상)이 소요될 것으로 예상됩니다. 서버는 요청이 완료된 후에 최종 응답을 전송해야 합니다. 이 응답은 HTTP 1.1 이상 버전에만 사용됩니다.

Cloudflare가 102 응답을 받고 100초 이내에 응답을 수신하지 못할 경우 [Error 522: Connection Timed Out](https://support.cloudflare.com/hc/articles/115003011431#522error)이 생성됩니다. 102 응답은 [Error 524: A timeout error](https://support.cloudflare.com/hc/articles/115003011431#524error)를 방지하기 위해 사용할 수 있습니다.
