---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/217720788-Facebook%EC%9C%BC%EB%A1%9C%EC%9D%98-%EA%B3%B5%EC%9C%A0-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0
title: Facebook으로의 공유 문제 해결
---

# Facebook으로의 공유 문제 해결

## Facebook으로의 공유 문제 해결

Cloudflare **Firewall** 앱을 통해 Facebook IP를 차단하지 않도록 하는 방법을 알아봅니다.

___

## Overview

Cloudflare는 Facebook의 요청을 차단하거나 검수하지 않도록 기본 설정되어 있습니다. 하지만, 다음과 같은 경우에는 웹 사이트를 Facebook에 게시했을 때 _Attention Required_ 오류가 반환됩니다.

-   보안 수준이 글로벌 수준이나 [페이지 규칙](https://support.cloudflare.com/hc/articles/200172336)에서 [I'm Under Attack](https://support.cloudflare.com/hc/search/click?data=BAh7CjoHaWRpBN5a7gs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiSC9oYy9lbi11cy9hcnRpY2xlcy8yMDAxNzAyMDYtSG93LWRvLUktZW5hYmxlLUktbS1VbmRlci1BdHRhY2stbW9kZS0GOwdGOg5zZWFyY2hfaWRJIik4YjE5YTBmNS0zNDViLTRkZmEtYmEzYy01NDk4NDlhNmZkNjEGOwdGOglyYW5raQ8%3D--12cd9c846382e475f31a1186344911da7ed54d9c)으로 설정된 경우,
-   사용자 정의 방화벽 추가 인증 질문이 있거나, Facebook IP 주소를 포함한 차단이 설정된 경우

Facebook 문제를 해결하려면 다음 중 하나의 방식을 사용하세요.

-   해당 IP, ASN 또는 Facebook IP에 추가 인증을 요구하거나 이를 차단하는 국가 [방화벽 규칙](https://support.cloudflare.com/hc/articles/360016473712) 또는 [IP 액세스 규칙](https://support.cloudflare.com/hc/articles/217074967)을 삭제합니다.
-   [IP 액세스 규칙](https://support.cloudflare.com/hc/articles/217074967)에서 AS32934와 AS63293을 허용해, 추가 인증, 차단, Under Attack 추가 인증 등을 재정의합니다.

Facebook 공유와 관련된 문제가 발생한 경우, Facebook [Object Debugger](https://developers.facebook.com/tools/debug/og/object/)의 **Fetch New Scrape Information** 옵션을 사용해 페이지를 다시 스크래핑해야 합니다.

문제가 계속될 경우 다음의 정보와 함께 [Cloudflare 지원팀에](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) 연락해주시기 바랍니다.

-   Facebook에 공유할 수 없는 웹 사이트의 URL
-   [Facebook 디버그 도구](https://developers.facebook.com/tools/debug/og/object/) 결과
-   URL을 다시 스크래핑했다는 확인
