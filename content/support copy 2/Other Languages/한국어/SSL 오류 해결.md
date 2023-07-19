---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/200170566-SSL-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0
title: SSL 오류 해결
---

# SSL 오류 해결

## SSL 오류 해결

_Cloudflare를 통해 프록시 설정된 도메인으로 이동할 때 발생하는 일반적인 SSL 오류를 해결하세요._

___

## 개요

Cloudflare가 도메인에 SSL 인증서를 제공하기 전에는, 일부 브라우저에서 HTTPS 트래픽에 대해 다음과 같은 오류가 발생합니다.

**Firefox**

     _ssl\_error\_bad\_cert\_domain_     _이 연결은 신뢰할 수 없습니다_

**Chrome**

     _이 연결은 비공개가 아닙니다_

**Safari**

     _Safari가 웹사이트를 확인할 수 없습니다_

**Edge/Internet Explorer**

     _웹 사이트의 보안 인증서에 문제가 있습니다_

도메인에 Cloudflare SSL 인증서가 제공됐더라도, 오래된 브라우저는 Cloudflare Universal SSL 인증서가 사용하는 [SNI(서버 이름 표시) 프로토콜](https://en.wikipedia.org/wiki/Server_Name_Indication#Support)을 지원하지 않기 때문에 오류를 표시할 수 있습니다.  [브라우저가 SNI를 지원하는지 확인하세요](https://caniuse.com/#feat=sni).

[Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730)은 프로, 비즈니스, 기업 요금제 도메인에 대해, 범용, 전용, 사용자 지정 또는 사용자 지정 호스트 이름 인증서에 대한 비SNI 지원을 활성화할 수 있습니다.

최신 브라우저를 사용해도 SSL 오류가 발생한 경우, 다음과 같은 일반적인 SSL 오류 원인을 확인하세요.

-   [리디렉션 루프 오류 또는 HTTP 525 또는 526 오류](https://support.cloudflare.com/hc/ko/articles/200170566-SSL-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#h_7ec9ed4a-80ae-4fca-8be7-89a13c195d19)
-   [하위 도메인 일부만 SSL 오류를 반환](https://support.cloudflare.com/hc/ko/articles/200170566-SSL-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#h_55e4d315-c60d-4798-9c4c-c75d9baed1b7)
-   [Cloudflare Universal SSL 인증서가 유효하지 않음](https://support.cloudflare.com/hc/ko/articles/200170566-SSL-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#h_122b94f3-ff14-4544-b5fa-8875e08ff5f0)
-   [OCSP 응답 오류](https://support.cloudflare.com/hc/ko/articles/200170566-SSL-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#h_51354cf8-de93-4894-85e6-f0f7453d766d)
-   [SSL 만료됨 또는 SSL 불일치 오류](https://support.cloudflare.com/hc/ko/articles/200170566-SSL-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f)

___

### 리디렉션 루프 오류 또는 HTTP 525 또는 526 오류

**증상**

 방문자가 도메인을 방문할 때 [리디렉션 루프 오류](https://support.cloudflare.com/hc/articles/115000219871)나 HTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error) 또는 [526](https://support.cloudflare.com/hc/articles/115003011431#526error) 오류가 발생합니다. 이러한 오류는 Cloudflare **SSL/TLS** 앱의 현재 Cloudflare SSL/TSL 암호화 모드가 원본 웹 서버의 구성과 호환되지 않을 때 발생합니다.

**문제 해결**

리디렉션 루프의 경우, [리디렉션 루프 오류 해결](https://support.cloudflare.com/hc/articles/115000219871) 가이드를 참조하시기 바랍니다.

HTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error) 또는 [526](https://support.cloudflare.com/hc/articles/115003011431#526error) 오류를 해결하려면 아래 권장 SSL 구성을 참조하세요. 원본 웹 서버에 따라 다음과 같이 조치하세요.

-   원본 웹 서버에 인증 기관의 유효한 인증서나Cloudflare의 [원본 CA 인증서](https://support.cloudflare.com/hc/articles/115000479507)가 있는 경우, _[전체](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)_ 또는 _[전체(Strict)](https://support.cloudflare.com/hc/articles/200170416#h_8afd8a8d-382d-4694-a2b2-44cbc9f637ef)_ **SSL** 옵션을 사용하세요.

-   원본 웹 서버에 자체 서명 SSL 인증서가 있는 경우 [_전체_ **SSL** 옵션](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)을 사용하세요.

-   원본 웹 서버에 설치된 SSL 인증서가 부족한 경우 [_유연_ **SSL** 옵션](https://support.cloudflare.com/hc/articles/200170416#h_4e0d1a7c-eb71-4204-9e22-9d3ef9ef7fef)을 사용하세요.

___

### 하위 도메인 일부만 SSL 오류를 반환

**증상**[Cloudflare Universal SSL](https://support.cloudflare.com/hc/articles/204151138)과 일반 [Dedicated SSL 인증서](https://support.cloudflare.com/hc/articles/228009108)가 루트 레벨 도메인(_example.com_)과 하위 도메인 한 레벨(_\*.example.com_)만 보호합니다. 첫 번째 하위 레벨(예: _www.example.com_)에서는 오류가 없지만, 두 번째 하위 레벨(예: _www.example.com_)에서 오류가 발생하는 경우, 아래 방법 중 하나를 사용하여 문제를 해결하세요.

**문제 해결**

-   도메인이 비즈니스 요금제 이상에 있는지 확인하고 _dev.www.example.com_를 포함하는 [사용자 지정 SSL 인증서](https://support.cloudflare.com/hc/articles/200170466)를 업로드하거나,
-   _dev.www.example.com_를 포함하는 [사용자 지정 호스트 이름이 포함된 Dedicated SSL 인증서](https://support.cloudflare.com/hc/articles/228009108)를 구매하거나,
-   원본 웹 서버의 두 번째 레벨 하위 도메인에 대해 유효한 인증서가 있는 경우 _example.com_에 대한 Cloudflare **DNS** 앱에서 _dev.www_ 호스트 이름 옆에 있는 오렌지색 구름 아이콘을 클릭하세요.

___

### Cloudflare Universal SSL 인증서가 유효하지 않음

**증상**

모든 활성 Cloudflare 도메인에 [Universal SSL 인증서](https://support.cloudflare.com/hc/articles/204151138)가 제공됩니다. SSL 오류가 발생하고 도메인에 대한 Cloudflare **SSL/TLS** 앱의 **에지 인증서** 탭 내에 **유형** _Universal_이 없는 경우 Universal SSL 인증서가 아직 제공되지 않은 것입니다.

Cloudflare가 도메인 이름에 대한 인증서를 발행하려면, SSL 벤더가 각 SSL 인증서 요청을 확인해야 합니다. 이 과정은 15분에서 24시간까지 걸릴 수 있습니다. SSL 인증서 업체가 도메인 이름을 추가 검토하겠다고 표시하는 경우도 있습니다.

**문제 해결**

-   Universal SSL을 활성화하거나,
-   [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108)인증서를 구매하거나,
-   [사용자 지정 SSL 인증서](https://support.cloudflare.com/hc/articles/200170466)를 Cloudflare에 업로드하세요.

Cloudflare 도메인 활성화 후 24시간 내에 Cloudflare SSL 인증서가 발행되지 않은 경우:

-   원본 웹 서버에 유효한 SSL 인증서가 있다면 [Cloudflare를 일시 중지하고](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753),
-   [지원 티켓을 발행해](https://support.cloudflare.com/hc/ko/requests/new) 다음 정보를 제공하세요.  
    -   영향을 받은 도메인 이름
    -   오류 스크린샷

Cloudflare를 일시 중지하면, 지원팀이 문제를 조사하는 동안에 원본 웹 서버가 올바로 HTTPS 트래픽을 처리할 수 있습니다.

___

### OCSP 응답 오류

**증상** 사이트 방문자에게 OCSP 응답 오류가 발생합니다.

**문제 해결  
**  
이 오류의 원인은 브라우저 버전 문제이거나 Cloudflare의 SSL 업체가 조치해야 하는 문제입니다. 올바른 진단을 위해, 브라우저 오류가 발생한 방문자가 제공한 아래 정보로 [지원 티켓을 발행하세요](https://support.cloudflare.com/hc/ko/requests/new) .

1.  _[https://aboutmybrowser.com/](https://aboutmybrowser.com/)_의 출력
2.  방문자 웹브라우저의 _https://example.com/cdn-cgi/trace_ 출력. _example.com_을 웹사이트의 도메인 이름으로 교체하세요.

___

### SSL 만료됨 또는 SSL 불일치 오류

**증상  
**  
방문자의 브라우저에 SSL 만료나 SSL 불일치 관련 오류 메시지가 나타납니다.

**문제 해결**

-   영향을 받은 도메인 이름
-   오류 스크린샷

___

## 관련 자료

-   [리디렉션 루프 오류](https://support.cloudflare.com/hc/articles/115000219871)
-   [혼합 콘텐츠 오류](https://support.cloudflare.com/hc/articles/200170476)
-   [브라우저의 SNI 지원 여부 확인](https://caniuse.com/#feat=sni)
