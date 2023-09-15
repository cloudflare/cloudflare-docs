---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360038470312-SameSite-%EC%BF%A0%ED%82%A4%EC%99%80-Cloudflare%EC%9D%98-%EC%83%81%ED%98%B8%EC%9E%91%EC%9A%A9-%EC%9D%B4%ED%95%B4
title: SameSite 쿠키와 Cloudflare의 상호작용 이해
---

# SameSite 쿠키와 Cloudflare의 상호작용 이해

## SameSite 쿠키와 Cloudflare의 상호작용 이해

_SameSite 쿠키가 무엇이며, 이 쿠키가 CSRF(Cross-Site Request Forgery)로부터 보호하는 방법을 알아보세요._

___

## 개요

[Google Chrome의 SameSite 쿠키](https://www.chromium.org/updates/same-site)는 Google Chrome이 SameSite 컨트롤을 처리하는 방법을 변경합니다.  Google은 SameSite를 사용하여 사용자를 추적하는 마케팅 쿠키와 공격자가 쿠키를 훔치거나 조작할 수 있게 하는 CSRF(Cross-Site Request Forgery)를 차단합니다.  

SameSite 쿠키에는 세 가지 모드가 있습니다.

-   **Strict**: 쿠키는 1차 당사자(방문한 도메인)가 만듭니다. 예를 들어, 1차 당사자 쿠키는 Cloudflare.com을 방문할 때 Cloudflare가 만듭니다.
-   **Lax**: 쿠키는 도메인 정점(예: _\*.foo.com_)에만 발송됩니다.  예를 들어 누군가(_blog.naughty.com_)가 이미지(_img.foo.com/bar.png_)를 핫링크하면, 클라이언트는 _img.foo.com_에 쿠키를 보내지 않습니다. 1차 당사자나 정점 컨텍스트가 아니기 때문입니다.
-   **None**: 모든 요청에 쿠키가 발송됩니다.

[Cloudflare 쿠키](https://support.cloudflare.com/hc/articles/200170156)용 SameSite 설정:

| Cloudflare 쿠키 | SameSite 설정 | HTTPS 전용 |
| --- | --- | --- |
| \_\_cfduid | SameSite=Lax | 아니요 |
| \_\_cf\_bm | SameSite=None; Secure | 예 |
| cf\_clearance | SameSite=None; Secure | 예 |
| \_\_cfruid | SameSite=None; Secure | 예 |
| \_\_cflb | SameSite=Lax | 아니요 |

___

## SameSite 및 cf\_clearance 쿠키의 알려진 문제

[**방화벽 규칙**](https://support.cloudflare.com/hc/articles/360016473712)이나 [**IP 액세스 규칙**](https://support.cloudflare.com/hc/articles/217074967) 등에서 [Cloudflare CAPTCHA](https://support.cloudflare.com/hc/articles/200170136) 또는 JavaScript 추가 질문이 풀리면, 클라이언트 브라우저에 **cf\_clearance** 쿠키가 설정됩니다. _cf\_clearance_ 쿠키는 기본 수명이 30분이며 Cloudflare **Firewall** 앱의 **설정** 탭 내 [**추가 질문 통과**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e)를 통해 설정됩니다. 

Cloudflare는 **cf\_clearance** 쿠키에 **SameSite**\=_None_을 사용합니다. 다른 호스트 이름의 방문자 요청이 후속 챌린지를 받거나 오류가 생기지 않게 하기 위해서입니다. **SameSite**\=_None_을 사용하지 않으면 _Secure_ 플래그와 함께 설정해야 합니다.

_Secure_ 플래그를 사용하려면 HTTPS 연결을 통해 쿠키를 보내야 합니다.  웹사이트 어디선가 HTTP를 사용하는 경우, **cf\_clearance** 쿠키는 **SameSite**\=_Lax_로 기본 설정되며 웹사이트 문제를 일으킬 수 있습니다.

웹사이트 어디선가 HTTP를 사용하는 경우, **cf\_clearance** 쿠키는 **SameSite**\=_Lax_로 기본 설정되며 이로 인해 웹사이트가 올바로 작동하지 않을 수 있습니다. 이 문제를 해결하려면 웹사이트 트래픽을 HTTPS로 옮기세요.  Cloudflare는 다음과 같은 두 가지 기능을 제공합니다. 

-   [**Automatic HTTPS Rewrites**](https://support.cloudflare.com/hc/articles/227227647) 
-   [**HTTPS 항상 사용**](https://support.cloudflare.com/hc/articles/204144518#h_a61bfdef-08dd-40f8-8888-7edd8e40d156)

___

## 관련 자료

-   [SameSite 쿠키에 대한 자세한 정보](https://web.dev/samesite-cookies-explained/) 
-   [Cloudflare Cookies 이해](https://support.cloudflare.com/hc/articles/200170156)
-   [Cloudflare SSL FAQ](https://support.cloudflare.com/hc/articles/204144518#h_999722138611548960019807)
-   [Automatic HTTPS Rewrites 이해](https://support.cloudflare.com/hc/articles/227227647)
