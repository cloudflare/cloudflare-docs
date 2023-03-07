---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98
title: 3XX 리디렉션
---

# 3XX 리디렉션

## 3XX 리디렉션

**개요**

3XX 코드는 사용자 에이전트가 요청 페이지를 완전하게 확보하려면 다른 방식을 사용해야 한다는 것을 의미하는 응답들입니다.

리디렉션 위치는 다음 중 하나에서 설정되어야 합니다.

1.  응답 내 `Location` 헤더 필드. 자동 리디렉션에 유용
2.  정정 위치로의 하이퍼링크(선택 사항)가 포함된 응답의 페이로드

-   [300 Multiple](https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98#code_300)
-   [301 Moved Permanently](https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98#code_301)
-   [302 Found](https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98#code_302)
-   [303 See Other](https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98#code_303)
-   [304 Not Modified](https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98#code_304)
-   [305 Use Proxy](https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98#code_305)
-   [306 Switch Proxy](https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98#code_306)
-   [307 Temporary Redirect](https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98#code_307)
-   [308 Permanent Redirect](https://support.cloudflare.com/hc/ko/articles/115003011091-3XX-%EB%A6%AC%EB%94%94%EB%A0%89%EC%85%98#code_308)

**300 Multiple Choices****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

해당 자원에 대해 클라이언트에게 다수의 옵션이 있습니다. 예를 들면, 이 응답은 다양한 동영상 형식을 표시할 때, 서로 다른 [확장자](https://en.wikipedia.org/wiki/File_extensions)를 가진 파일 목록을 보여줄 때, [단어 의미의 중의성을 해소](https://en.wikipedia.org/wiki/Word_sense_disambiguation)할 때 사용될 수 있습니다.

**301 Moved Permanently****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

요청된 자원에 대한 영구적인 URL 리디렉션. 대상 자원에 영구적인 새 URI가 할당되었고, 이후 이 자원을 참조할 때는 페이지를 조회할 때는 포함된 URI 중 하나를 사용해야 합니다.

Cloudflare가 이 응답을 생성할 수 있기 때문에 따로 페이지 규칙을 사용해 원본 서버의 응답에 요청을 전송하지 않아도 됩니다. Cloudflare로 리디렉션을 생성하는 자세한 방법은 [Page Rules URL 전달](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)에서 확인할 수 있습니다.

**302 Found(Temporary Redirect)****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

301 리디렉션과 유사하지만, 일시적인 목적으로만 사용됩니다. 사용자 에이전트가 자동으로 `Location` 헤더를 따를 수 있지만, 301 응답처럼 현재 URI를 대체해서는 안 됩니다.

Cloudflare가 이 응답을 생성할 수 있기 때문에 따로 페이지 규칙을 사용해 원본 서버의 응답에 요청을 전송하지 않아도 됩니다. Cloudflare로 리디렉션을 생성하는 자세한 방법은 [Page Rules URL 전달](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)에서 확인할 수 있습니다.

**303 See Other(HTTP/1.1 버전 및 이후 버전)****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

사용자 에이전트는 GET 요청으로 이 리디렉션을 따라야 합니다. _참고: 이 응답은 리디렉션된 자원이 본래 요청된 자원과 반드시 일치하지 않을 수 있다는 점에서 301 응답과는 다릅니다._

-   원본 서버가 데이터를 올바르게 수신했음을 알리고 적절한 캐시 동작을 허용하는 `POST/DELETE` 요청에 대한 응답으로 사용됩니다.
-   본래의 303 응답은 캐시할 수 없지만, 두 번째 요청(`GET`)에 대한 응답은 다른 URI에 있기 때문에 캐시할 수 있습니다.

**304 Not Modified(**[**RFC7232**](https://tools.ietf.org/html/rfc7232)**)**

요청된 자원을 사용할 수 있고, 캐시가 유효하다는 것을 클라이언트에 알려줍니다. 요청된 자원을 원본 서버에서 수정하지 않았습니다. 클라이언트는 원본 서버에 다시 연결하지 않아도 지정된 자원의 페이로드를 수신할 수 있으며, 따라서 이 요청을 리디렉션해 저장된 페이지를 사용합니다. 304 응답을 수신하는 캐시의 요건은  [\[RFC7234\] 섹션 4.3.4](https://tools.ietf.org/html/rfc7234#section-4.3.4)에 설명되어 있습니다.

이 응답에 앞서 클라이언트는 현재 어떤 자원이 저장되어 있는지를 알려주는 조건부 GET 또는 HEAD 요청을 전송했습니다. 서버는 클라이언트와 서버 간 데이터 전송량을 최소화하기 위해 클라이언트에 이 자원의 가장 최신 버전을 사용할 수 있다는 승인을 보냅니다.

-   메시지 본문을 포함하지 않아야 합니다.

-   `Cache-Control, Content-Location, Date, ETag, Expires`, `Vary` 등 200 응답에 앞서 설정된 헤더를 포함해야 합니다.

너무 오래되어 원본 웹 서버에서 다시 유효성을 검증받아야 하는 요청이 Cloudflare로 전송되면 Cloudflare는 304 응답을 전송해 캐시의 버전이 원본 웹 서버의 버전과 일치하는 것을 확인해줍니다. 이 응답에는 `CF-Cache-Status: REVALIDATED` 헤더가 포함되며, Cloudflare는 `If-Modified-Since` 헤더를 사용해 버전을 확인합니다. 더 자세한 정보는 [ETag 헤더](https://support.cloudflare.com/hc/ko/articles/218505467)에서 확인할 수 있습니다.

**305 Use Proxy(사용 중단)****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

요청이 원본 웹 서버 대신 Location 헤더에 명시된 프록시 URI를 통해 충족되어야 합니다. 이 상태 코드는 보안상 위험으로 인해 사용이 중단되었습니다.

**306 Switch Proxy(사용 중단)****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

이후의 요청은 반드시 명시된 프록시로 전송되어야 한다는 통지입니다.

**307 Temporary Redirect****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

리디렉션을 자동으로 실행할 경우 GET, POST 등의 요청 메소드가 본래의 요청에 사용된 것과 다르면 안 된다는 점을 제외하면 302 응답과 유사합니다.

-   사용자 에이전트가 자동으로 `Location` 헤더를 따를 수는 있지만, 본래의 URI를 대체해서는 안 됩니다.  

**308 Permanent Redirect(**[**RFC7538**](https://tools.ietf.org/html/rfc7538#section-3)**)**

리디렉션을 자동으로 실행할 경우 GET, POST 등의 요청 메소드가 본래의 요청에 사용된 것과 다르면 안 된다는 점을 제외하고 301 응답과 유사한 영구적 리디렉션 응답입니다.

-   사용자 에이전트는 자동으로 `Location` 헤더를 따라야 합니다.
-   사용자 에이전트는 본래의 URI를 Location 또는 페이로드에 업데이트된 URI로 대체해야 합니다.
