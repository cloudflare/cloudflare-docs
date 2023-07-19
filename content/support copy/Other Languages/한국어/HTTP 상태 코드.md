---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115003014432-HTTP-%EC%83%81%ED%83%9C-%EC%BD%94%EB%93%9C
title: HTTP 상태 코드
---

# HTTP 상태 코드

## HTTP 상태 코드

## 개요

다음의 상태 코드는 Cloudflare가 HTTP 응답 코드를 처리할 때 인터넷 표준 추적 프로토콜을 어떻게 해석하는지 자세히 설명합니다. 표준화 상태와 이 프로토콜의 상태는 최신 버전의 '인터넷 공식 프로토콜 표준(STD 1)'에서 확인할 수 있습니다.

기본 설정에 의해 캐시할 수 있는 모든 HTTP 상태 코드는 메서드 정의나 캐시 제어에 명시적으로 규정되어 있지 않은 한 Cloudflare에서도 캐시할 수 있는 상태 코드로 간주됩니다. Cloudflare는 요청을 캐시하는 방식과 동이랗게 HTTP 응답을 캐시합니다. Cloudflare는 페이지 규칙, 에지 TTL, 원본 헤더를 고려해 캐시 여부를 결정합니다.

___

Cloudflare HTTP 상태 코드를 설명할 때 사용되는 용어는 다음과 같습니다.

### 서버

요청을 수신하고 응답을 전송하는 당사자로, 원본 서버나 중간 서버 중 하나입니다.

### 원본/호스트 서버

최종 대상 서버로, 이 서버가 웹 사이트의 콘텐츠를 실제로 호스팅합니다.

### 프록시 서버

원본 서버와 클라이언트 사이에 있는 서버로, Cloudflare를 프록시 서버의 예로 들 수 있습니다.

### 클라이언트

요청을 보내는 당사자로, 보통 브라우저에서 사이트에 액세스하는 최종 사용자를 말합니다. 하지만 API 클라이언트 또는 사이트에서 페이지를 요청하는 모든 당사자도 클라이언트에 해당됩니다.

### 백엔드

클라이언트로 전송되거나 클라이언트가 전송한 연결이 아니면서 프록시 서버 및/또는 원본 서버의 사이에 위치한 연결을 말합니다.

### 사용자 에이전트

요청을 전송할 때 사용되는 시스템을 말합니다. 브라우저일 수도 있고 유휴 상태의 API 요청처럼 요청을 전송하는 다른 프로그램일 수도 있습니다.

### 페이로드

헤더를 포함하지 않는 응답이나 요청 데이터를 말합니다. 페이로드는 응답/요청 본문이라고도 합니다.

___

## HTTP 상태 코드

-   [1XX Informational](https://support.cloudflare.com/hc/ko/articles/115003013892/)
-   [2XX Success](https://support.cloudflare.com/hc/ko/articles/115003014192)
-   [3XX Redirect](https://support.cloudflare.com/hc/ko/articles/115003011091/)
-   [4XX Client Error](https://support.cloudflare.com/hc/ko/articles/115003014512/)
-   [5XX Server Error](https://support.cloudflare.com/hc/ko/articles/115003011431/)

___

## 관련 자료

-   [Cloudflare가 어떤 콘텐츠를 캐시하도록 설정해야 할까요?](https://support.cloudflare.com/hc/ko/articles/202775670-How-Do-I-Tell-CloudFlare-What-to-Cache-)
-   [에지 TTL이란 무엇인가요?](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings)
