---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98
title: 4XX 클라이언트 오류
---

# 4XX 클라이언트 오류

**개요**

4XX 코드는 일반적으로 클라이언트 측에 발생한 오류를 알려주는 응답입니다. 네트워크 문제일 가능성도 있습니다. 

-   4XX 코드는 요청 메서드에 대한 응답으로 사용할 수 있습니다.

-   `HEAD` 요청인 경우를 제외하면 원본 서버는 설명과 사용자 에이전트가 표시해야 하는 설명을 포함해야 합니다.

Cloudflare는 이 오류를 원본 서버에서 직접 전달합니다

-   [400 Bad Request](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_400)  
-   [401 Unauthorized](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_401)
-   [402 Payment Required](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_402)
-   [403 Forbidden](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_403)
-   [404 Not Found](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_404)
-   [405 Method Not Allowed](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_405)
-   [406 Not Acceptable](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_406)
-   [407 Authentication Required](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_407)  
-   [408 Request Timeout](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_408)  
-   [409 Conflict](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_409)
-   [410 Gone](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_410)
-   [411 Length Required](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_411)
-   [412 Precondition Failed](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_412)  
-   [413 Payload Too Large](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_413)
-   [414 URI Too Long](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_414)
-   [415 Unsupported Media Type](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_415)
-   [417 Expectation Failed](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_417)
-   [429 Too Many Requests](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_429)
-   [451 Unavailable For Legal](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_451)
-   [499 Client Close Request](https://support.cloudflare.com/hc/ko/articles/115003014512-4XX-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%98%A4%EB%A5%98#code_499)

**400 Bad Request****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

서버는 클라이언트 오류(요청의 잘못된 구문, 유효하지 않은 요청 메시지 프레임, 사기성 요청 라우팅 등)로 보이는 문제가 있으면, 요청을 처리할 수 없거나, 처리하지 않습니다.

**401 Unauthorized(**[**RFC7235**](https://tools.ietf.org/html/rfc7235)**)**

유효한 인증 정보가 없이 요청이 전송됐습니다

-   서버는 [섹션 4.1](https://tools.ietf.org/html/rfc7235#section-4.1)에 따라 최소한 한 가지의 추가 인증 질문을 `WWW-Authenticate` 헤더 필드 형식으로 전송해야 합니다.
-   클라이언트는 같은 자격 증명으로 두 번째 요청을 전송할 수 있으며, 추가 인증 질문이 이전과 동일하다면, 서버는 클라이언트가 필요한 자격 증명을 찾을 수 있도록 엔터티를 제공합니다.

**402 Payment Required****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

아직 RFC 표준으로 규정되지는 않았지만, 추후를 위해 예약되어 있는 오류 유형입니다.

**403 Forbidden****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Cloudflare 브랜딩 없이 403 오류가 발생할 경우, 이는 Cloudflare가 아니라 원본 웹 서버에서 직접 반환된 것으로 일반적으로 서버의 권한 규칙과 관련되어 있습니다.

이 오류가 발생하는 주요 이유는 다음과 같습니다.  
1\. 사용자가 설정한 권한 규칙 또는 사용자가 설정한 .htaccess 규칙 내 오류  
2\. Mod\_security 규칙  
3\. IP 거부 규칙

Cloudflare는 사용자의 서버에 직접 액세스할 수 없으므로 403 오류 해결과 규칙 수정에 관한 지원은 호스팅 공급자에게 요청해야 합니다. 이때 [Cloudflare IP](https://www.cloudflare.com/ips)가 차단되지는 않았는지 다시 한번 확인하도록 하세요.

Cloudflare는 요청이, 오렌지 색 구름으로 된 Cloudflare 도메인에 활성화된 기본 WAF 규칙을 위반했거나 해당 특정 영역에 활성화된 WAF 규칙을 위반한 경우, 403 응답을 제공합니다. 자세한 내용은 [웹 애플리케이션 방화벽의 기능](https://support.cloudflare.com/hc/ko/articles/200172016)을 참조하세요. 또한, Cloudflare나 업로드된 SSL 인증서로 보호되지 않는 하위/도메인으로의 SSL 연결에 대해서도 403 Forbidden 응답을 제공합니다.

응답 본문에 Cloudflare 브랜딩이 있는 403 코드가 있다면, 이는 Cloudflare의 다양한 보안 기능과 함께 반환된 HTTP 응답 코드입니다.

-   웹 애플리케이션 방화벽 추가 인증 질문 및 페이지
-   기본적인 보호 수준의 추가 인증 질문
-   Cloudflare에서 발생하는 대부분의 1XXX 오류 코드
-   브라우저 무결성 검사
-   Cloudflare를 통해 Cloudflare가 발행한 인증서로 2차 하위 도메인(예:`*.*.example.com`)에 액세스하려는 경우, 이러한 호스트 이름이 인증서에 기재되어 있지 않기 때문에 브라우저에 HTTP 403 오류가 표시됩니다.

문의 사항이 있다면 표시된 메시지의 스크린샷을 첨부하거나 페이지에 표시된 모든 텍스트를 복사해 지원 요청 메시지에 붙여넣어 Cloudflare 지원팀으로 연락해주시기 바랍니다.

**404 Not Found****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

원본 서버가 요청된 페이지를 찾을 수 없거나, 찾으려 하지 않습니다. 이 오류 유형은 보통 호스트 서버가 해당 자원을 찾을 수 없다는 것을 의미합니다. 이 오류의 영구적인 형태에는 410 오류 코드가 사용됩니다.

이 유형의 오류는 일반적으로 사이트에 URL을 잘못 입력하거나, 다른 페이지에 대해 유효하지 않은 링크가 있거나, 기존 페이지가 이동·삭제되었거나, 검색 엔진이 사이트를 인덱싱하는 과정에서 오류가 발생하었을 때 발생합니다. 일반 사이트에서 이 유형의 오류는 전체 페이지 뷰의 약 3%를 차지하지만, Google Analytics와 같은 기존의 분석 플랫폼은 이 오류를 추적하지 못할 때가 많습니다.

이 오류가 발생하면 웹 사이트 소유자는 보통 사용자 정의 페이지를 실행합니다. 예로 [Apache에서 사용자 정의 404 페이지 실행하기](https://www.digitalocean.com/community/tutorials/how-to-create-a-custom-404-page-in-apache)가 있습니다.

Cloudflare는 원본 서버의 요청을 대신 처리하기만 할 뿐, 고객 웹 사이트에 404 오류를 생성하지 습니다. Cloudflare에서 운영되는 사이트에서 404 오류를 목격했다면 호스팅 공급자에 지원을 요청하시기 바랍니다.

**405 Method Not Allowed****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

원본 서버가 요청된 자원은 인식하지만, 사용된 요청 메소드를 지원하지 않습니다.

-   원본 서버는 해당 페이지에 `Allow` 헤더와 함께 지원되는 대상 목록을 제공해야 합니다.

그 예로는 오직 GET만 허용하는 변경 불가능한 페이지의 POST를 들 수 있습니다.

**406 Not Acceptable****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

원래 위치가 사전 설정된 (예: `Accept-Charset`와 `Accept-Language` 헤더를 통한 경우 )협상 헤더의 규칙을 따르기 때문에 페이지를 사용할 수 없습니다.

덜 선호하는 방법을 사용자 에이전트에 제공하는 간단한 방식으로 오류 생성 없이 상태 코드를 대체할 수 있습니다.

**407 Authentication Required(**[**RFC7235**](https://tools.ietf.org/html/rfc7235)**)**

클라이언트가 요청을 전송할 때 필요한 인증을 포함하지 않았습니다.

**408 Request Timeout****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

원본 서버가, 합리적이라고 여기는 시간 내 에 완성된 요청을 수신하지 못했습니다.

-   이 유형의 오류는 서버가 계속 대기하며 연결을 진행하기를 원치 않는다는 것을 의미합니다.

-   서버는 보통 '폐쇄형' 연결 옵션을 사용하기 때문에 많이 이용되지는 않습니다.

**409 Conflict****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

페이지 현재 상태와 충돌이 발생해 요청이 완료되지 않았습니다. 이 유형의 오류는 대개 다수의 클라이언트가 같은 페이지를 편집하려고 시도하는 PUT 요청에서 발생합니다.

-   서버는 클라이언트가 충돌의 원인을 파악할 수 있는 충분한 정보가 담긴 페이로드를 _작성해야 합니다_.
-   클라이언트는 요청을 다시 전송할 수 있으며, 다시 전송해야 합니다.

Cloudflare는 [Error 1001: DNS Resolution Error](https://support.cloudflare.com/hc/articles/360029779472#error1001)가 발생할 경우 409 응답을 생성합니다.

**410 Gone****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

요청된 자원이 원래 위치에서 영구적으로 삭제되었습니다.

-   서버가, 해당 자원을 참조하는 링크를 제거하라고 말하는 것입니다.
-   서버는 404 응답에 이 상태 코드를 사용할 수 없고, 어떠한 특정한 시간 동안에도 이 응답을 제공해야 할 필요가 없습니다.

**411 Length Required****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

클라이언트가 헤더에서 요청 본문의 `Content-Length`를 정의하지 않았으며, 이 내용이 있어야 해당 자원을 가져올 수 있습니다.

-   클라이언트는 헤더 필드를 추가한 뒤 이 요청을 다시 전송할 수 있습니다.

**412 Precondition Failed(**[**RFC7232**](https://tools.ietf.org/html/rfc7232)**)**

해당 자원이 클라이언트 측에서 규정한 요건을 충족하지 않아 서버가 요청을 거부했습니다.

버전 관리를 예로 들어, 클라이언트가 기존의 자원을 수정하면서, 클라이언트가 해당 자원을 다운로드하여 편집을 시작한 날짜와 일치하도록 `If-Unmodified-Since` 헤더를 설정한 경우를 생각해 보겠습니다. 이 날짜 이후, 편집한 내용을 업로드하기 전에 해당 자원이 편집(다른 클라이언트에 의한 경우가 많음)된 경우라면, 최종 편집 날짜는 클라이언트가 `If-Unmodified-Since`로 설정한 날짜 이후가 되기 때문에, 이 응답이 생성되게 됩니다.

Cloudflare는 이 응답을 제공합니다. 자세한 정보는 [ETag Headers](https://support.cloudflare.com/hc/ko/articles/218505467)를 참조하세요.

**413 Payload Too Large****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

서버가 허용하고자 하는 것보다 큰 페이로드를 클라이언트가 전송한 경우, 서버가 요청 처리를 거부하는 것입니다. 서버는 선택적으로 연결을 종료할 수 있습니다.

-   요청 처리 거부가 일시적인 경우, 서버는 `Retry-After` 헤더를 전송해 클라이언트가 요청을 다시 전송할 수 있는 시점을 지정해야 합니다.

**414 URI Too Long****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

URI가 너무 길어 서버가 요청 처리를 거부했습니다. 예를 들어, 클라이언트가 POST 이후 비정상적으로 긴 URI가 포함된 GET 요청을 시도하면 보안상 위협으로 간주되어 414 오류가 생성됩니다.

Cloudflare는 URI가 32KB보다 길 경우 이 응답을 생성합니다.

**415 Unsupported Media Type****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

서버가 현재 페이로드 형식의 처리를 거부했습니다. 이 오류를 식별해 해결하는 한 가지 방법으로는 클라이언트 요청에 전송된 `Content-Type` 또는 `Content-Encoding` 헤더를 확인하는 것이 있습니다.

**417 Expectation Failed****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

서버가 클라이언트 요청에 포함된 `Expect` 헤더에 규정된 요청을 충족하지 못했습니다.

**429 Too Many Requests(**[**RFC6585**](https://tools.ietf.org/html/rfc6585)**)**

서버가 지정한 시간 내에 클라이언트가 너무 많은 요청을 전송했습니다. 이 오류 유형은 일반적으로 "속도 제한"이라고 하며, 서버는 요청자가 지정된 시간 내에 요청을 다시 전송할 수 있다는 정보와 함께 이 오류에 응답하는 경우도 있습니다.

Cloudflare는 요청에 [속도 제한](https://www.cloudflare.com/rate-limiting/)이 있는 경우, 이 상태 코드를 생성해 전송합니다. 사이트 방문자가 이 오류 코드를 수신하는 경우에는 [Rate Limiting Analytics](https://support.cloudflare.com/hc/articles/115001635128#7Cy9dajZBWM5pm9aIP5mMD)에서 이 오류를 확인할 수 있습니다.

**451 Unavailable For Legal Reason(**[**RFC7725**](https://tools.ietf.org/html/rfc7725)**)**

서버가 법적 조치로 인해 페이지를 전송할 수 없습니다.

일반적으로 Google 등의 검색 엔진과 ATT 등의 ISP가 이 응답 코드의 영향을 받으며, 원본 서버는 이 응답 코드의 영향을 받지 않습니다.

-   응답 본문에는 법적 요구 사항의 상세한 정보가 담긴 설명을 포함해야 합니다.

**499 Client Close Request**

Nginx에 특정한 응답 코드로서, 서버가 요청을 처리하는 중 클라이언트가 연결을 종료해, 서버가 상태 코드를 반환할 수 없음을 의미합니다.

-   이 오류는 [Cloudflare Logs](https://support.cloudflare.com/hc/ko/articles/216672448-Enterprise-Log-Share-REST-API)와 기업 요금제 고객에게 제공되는 상태 코드 분석에 표시됩니다.
