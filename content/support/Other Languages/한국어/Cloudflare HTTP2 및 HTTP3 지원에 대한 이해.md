---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/200168076-Cloudflare-HTTP-2-%EB%B0%8F-HTTP-3-%EC%A7%80%EC%9B%90%EC%97%90-%EB%8C%80%ED%95%9C-%EC%9D%B4%ED%95%B4
title: Cloudflare HTTP2 및 HTTP3 지원에 대한 이해
---

# Cloudflare HTTP/2 및 HTTP/3 지원에 대한 이해

## Cloudflare HTTP/2 및 HTTP/3 지원에 대한 이해

_Cloudflare가 기존의 코드 베이스를 변경하지 않으면서, 웹 사이트의 속도를 높이기 위해 HTTP/2와 HTTP/3를 지원하는 방법에 대해 알아봅니다._

___

## 개요

HTTP/2 및 HTTP/3는 페이지 로드를 가속화하며 모든 [Cloudflare 요금제](http://www.cloudflare.com/plans)에 무료로 제공됩니다.  HTTP/2는 기본적으로 활성화되어 있으며 [Cloudflare의 에지 네트워크에 SSL 인증서](https://support.cloudflare.com/hc/articles/203295200#h_036e2e20-96d8-4199-bb1f-0fbb41b5cdd0)가 필요합니다. Cloudflare **Network** 앱을 통해 HTTP/2 및 HTTP/3를 구성합니다. Free 요금제 도메인은 HTTP/2를 비활성화할 수 없습니다.

브라우저와 웹 서버는 자동으로 제공되는 프로토콜 중 가장 높은 것과 협상합니다. 따라서 HTTP/3가 HTTP/2에 우선합니다.

연결에 사용되는 프로토콜을 판별하려면 웹 브라우저나 클라이언트에서 _example.com_/cdn-cgi/trace를 입력하되, _example.com_을 도메인 이름으로 교체해야 합니다. 여러 줄의 데이터가 반환됩니다. 결과에 _http=h2_ 가 표시되면, HTTP/2를 통해 연결된 것입니다. _http=http2+quic/99_는 HTTP/3인 경우이며, _http=http/1.x_는HTTP/1.x인 경우입니다.

___

HTTP/2를 사용하면 다음을 통해 페이지 로드 시간을 향상됩니다.

-   연결 다중화 - 단일 네트워크 요청에서 여러 자원을 추출합니다. 자원이 사용하면 응답을 보내 페이지 렌더링이 느려지지 않게 합니다.
-   HTTP 헤더 압축 - 헤더를 압축하고 HTTP 요청을 간소화하여, 헤더를 다시 보내지 않습니다.
-   HTTP/2 서버 푸시 - Cloudflare는 페이지 로드 속도를 높이기 위해, 추가 요청을 기다리지 않고 추가 자원을 제공해 클라이언트가 캐시할 수 있도록 합니다.

참고:

-   모든 브라우저가 HTTP/2를 지원하지는 않으며 대신 HTTP 1.x를 사용하는 경우도 있습니다.
-   연결 다중화는 도메인별로 수행됩니다.

___

## HTTP/3

HTTP/3을 사용하면 빠르고 안정적이며 안전한 연결이 가능합니다.  HTTP/3은 QUIC라는 Google의 프로토콜을 사용하여 기본적으로 인터넷 전송을 암호화합니다.  HTTP/3는 Cloudflare **Network** 앱에서 활성화합니다. 

자세한 정보는 [HTTP/3 개발자 문서](/http3/)를 검토하시기 바랍니다.

___

## 서버 푸시

서버 푸시 기능을 사용하면 원본 웹 서버가 이미지, 스타일시트, JavaScript 등과 같은 추가 자산에 대한 참조는 HTML을 구문 분석하지 않고도 클라이언트 또는 웹 브라우저로 자원을 보낼 수 있습니다. 서버 푸시는 페이지의 모든 스크립트 또는 스타일시트에 대한 일반적인 HTTP 요청 및 응답 주기를 방지합니다. 서버 푸시는 모든 Cloudflare 요금제에 제공됩니다.

서버 푸시는 원본 서버에서 **Link** 헤더의 rel=preload 매개변수 내에서 URI 참조를 추출합니다. 이러한 추가 URI가 클라이언트에 제공되게 됩니다. **Link** 헤더의 예:

`Link: </images/image.png>; rel=preload;`

`Link: </css/main.css>; rel=preload;`

서버 푸시는 페이지당 50개, 연결당 100개의 자산으로 제한됩니다.

___

## 관련 자료

-   [HTTP/3: 과거, 현재, 미래](https://blog.cloudflare.com/http3-the-past-present-and-future/)
-   [QUIC 적용](https://blog.cloudflare.com/the-quicening/)
-   [QUIC과 Rust를 향유하세요!](https://blog.cloudflare.com/enjoy-a-slice-of-quic-and-rust/)

브라우저 지원 정보: 

-   [HTTP/2](http://caniuse.com/#feat=http2)
-   [HTTP/3](https://caniuse.com/#feat=http3)
