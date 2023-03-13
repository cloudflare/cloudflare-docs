---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115003014192-2XX-%EC%84%B1%EA%B3%B5
title: 2XX 성공
---

# 2XX 성공

## 2XX 성공

**개요**

2XX 코드는 응답이 성공적으로 처리되었음을 나타냅니다. 이 코드는 대개 클라이언트가 요청한 작업이 수신되어 성공적으로 승인되었음을 의미합니다.

-   [200 OK](https://support.cloudflare.com/hc/ko/articles/115003014192-2XX-%EC%84%B1%EA%B3%B5#code_200)
-   [201 Created](https://support.cloudflare.com/hc/ko/articles/115003014192-2XX-%EC%84%B1%EA%B3%B5#code_201)
-   [202 Accepted](https://support.cloudflare.com/hc/ko/articles/115003014192-2XX-%EC%84%B1%EA%B3%B5#code_202)
-   [203 Non-Authoritative](https://support.cloudflare.com/hc/ko/articles/115003014192-2XX-%EC%84%B1%EA%B3%B5#code_203)
-   [204 No Content](https://support.cloudflare.com/hc/ko/articles/115003014192-2XX-%EC%84%B1%EA%B3%B5#code_204)
-   [205 Reset Content](https://support.cloudflare.com/hc/ko/articles/115003014192-2XX-%EC%84%B1%EA%B3%B5#code_205)
-   [206 Partial Content](https://support.cloudflare.com/hc/ko/articles/115003014192-2XX-%EC%84%B1%EA%B3%B5#code_206)

**200 OK****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

모두가 가장 좋아하는 응답입니다. 요청이 성공적으로 처리되었습니다.

응답 페이로드는 사용된 요청 메서드에 따라 달라집니다. 요청 메서드에 대해 예상되는 응답 본문은 다음과 같습니다.

-   GET - 요청된 자원에 해당하는 헤더와 데이터
-   HEAD - 요청된 자원에 해당하는 헤더(실제 데이터는 제외)
-   POST - 작업의 상태 또는 작업을 통해 얻은 결과

200 응답은 항상 _페이로드를 포함해야_ 하지만, 이것이 필수 요건은 아닙니다. 따라서 원본 서버가 아무것도 포함되지 않은 200 응답을 생성할 수도 있습니다. RFC 표준을 준수하려면 이 경우에 204 응답이 생성되어야 합니다(CONNECT 예외).

이 응답은 프록시 서버와 브라우저에서 캐시할 수 있도록 기본 설정되어 있습니다. Cloudflare [캐시 제어](https://support.cloudflare.com/hc/ko/articles/202775670)에 명시되어 있지 않은 경우, 이 응답이 포함된 [정적 콘텐츠](https://support.cloudflare.com/hc/ko/articles/200172516)는 기본값인 2시간 동안 에지에 캐시합니다.  

**201 Created****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

요청이 성공적이었고, 서버가 1개 이상의 새로운 자원을 생성하고 있습니다. 새로운 자원의 위치는 Location 헤더 필드 또는 요청의 URI 중 하나에 위치해야 합니다. 새로 생성된 자원에 대한 설명과 링크는 일반적으로 페이로드에서 찾아볼 수 있습니다.

-   [RFC7231 섹션 7.2](https://tools.ietf.org/html/rfc7231#section-7.2)에서 201 응답의 ETag, Last-Modified와 같은 검증 헤더 필드의 의미와 목적에 대한 설명을 찾아볼 수 있습니다.

**202 Accepted****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

요청이 승인되었고 현재 원본 서버에서 처리되고 있습니다. 클라이언트는 요청이 처리되는 동안, 서버의 지정 내용에 따라 요청에 따른 작업을 실행하거나, 실행하지 않을 수 있습니다.

**203 Non-Authoritative Information****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

요청은 성공적이었지만, 원본 서버가 아닌 다른 출처에서 전송되었다는 것을 설명하는 응답으로, 200 상태 코드의 선택적 대안입니다. 원본 서버의 응답이 프록시 또는 중간 서버에서 수정되었습니다. 예를 들어, 203 응답은 이 자원이 프록시에서 캐시되어 있기 때문에 이와 유사한 추후 요청의 경우 동일한 자원이 있는 캐시 서버에 도달할 수도 있고 도달하지 않을 수도 있다는 점을 알리기 위해 이용할 수 있습니다. 또 다른 예로는 로컬 원본 서버에만 적용할 수 있는 헤더가 제거된 경우를 들 수 있습니다.

-   기본적으로 캐시할 수 있는 응답이지만, Cloudflare는 캐시하지 않습니다.
-   Cloudflare는 이 응답을 생성하지 않지만, 프록시가 있을 경우 다른 프록시의 요청을 대신 처리할 수는 있습니다. 예외적인 경우는 [Cloudflare가 HTTP 요청 헤더를 처리하는 방식](https://support.cloudflare.com/hc/ko/articles/200170986)에서 확인할 수 있습니다.

**204 No Content([RFC7231](https://tools.ietf.org/html/rfc7231))**

요청된 동작이 원본 서버에서 올바르게 실행되었습니다. 이 응답은 일반적으로 문서 편집기에서 '저장' 동작이 원본 서버로 전송되었지만, 페이로드를 클라이언트에 반환할 필요는 없을 때 사용됩니다. 사용자에게 저장이 성공적으로 처리되었다는 메시지를 보내는 것은 가능합니다.

-   204 응답을 반환할 때는 페이로드를 포함해서는 안 됩니다.
-   기본적으로 캐시할 수 있는 응답이지만, Cloudflare는 캐시하지 않습니다.

**205 Reset Content****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

원본 서버가 클라이언트에게, 요청을 전송하기 전에 보기를 원래 상태로 재설정하도록 제의하는 응답입니다. 요청에 페이로드가 포함된, 양식이나 기타 입력 제출에 자주 사용되며, 원본 서버가 성공적으로 요청을 처리했으며, 브라우저에 추가적인 제출이 가능하다는 것을 알려줍니다.

-   205 응답은 절대로 페이로드를 반환하면 안 됩니다. Content-Length가 0으로 설정되거나 크기가 0바이트인 응답 바로 뒤에 오는 청크 응답만 허용됩니다.

**206 Partial Content(**[**RFC7233**](https://tools.ietf.org/html/rfc7233)**)**

페이지 일부에 대한 요청이 성공적으로 처리됐으며, 페이로드에 위치해 있습니다. 요청은 다음 중 하나의 방법으로 범위를 표시했어야 합니다.

1.  Content Range 등 HTTP 헤더가 포함된 단일 부분 요청과 크기(응답 헤더에 표시된 경우 페이로드의 8진수와 동일해야 함). 예: `Content Range: bytes 21010-47021/47022`
2.  HTTP 헤더의 `Content-Type: multipart/byteranges`가 포함된 복수의 청크. 각 부분에 Content-Range 필드가 포함되어야 하지만 응답의 **HTTP 헤더** _이외_의 부분에 포함되어야 함. [RFC7233 섹션 4.1](https://tools.ietf.org/html/rfc7233%23section-4.1)에 설명된 것처럼 한계 명시.  예:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> HTTP/1.1 206 Partial Content</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     Date: Wed, 15 Nov 1995 06:25:24 GMT</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     Last-Modified: Wed, 15 Nov 1995 04:58:08 GMT</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     Content-Length: 1741</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     Content-Type: multipart/byteranges; boundary=THIS_STRING_SEPARATES</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     --THIS_STRING_SEPARATES</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     Content-Type: application/pdf</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     Content-Range: bytes 500-999/8000</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     ...the first range...</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     --THIS_STRING_SEPARATES</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     Content-Type: application/pdf</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     Content-Range: bytes 7000-7999/8000</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     ...the second range</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     --THIS_STRING_SEPARATES--</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

 206 응답은 대기 시간 단축을 위해 클라이언트에 동시에 다수의 스트림을 분할하거나 또는 단속적으로 다운로드해야 할 때 유용합니다.
