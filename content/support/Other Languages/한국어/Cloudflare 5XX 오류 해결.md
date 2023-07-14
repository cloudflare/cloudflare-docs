---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0
title: Cloudflare 5XX 오류 해결
---

# Cloudflare 5XX 오류 해결

_Cloudflare가 프록시 역할을 하는 사이트의 5XX 오류를 진단하고 해결합니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#h_42ad57a0-3926-4162-b55e-c3a31864ea09)
-   [오류 분석](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#500error)
-   [Error 500: internal server error](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#500error)
-   [Error 502 bad gateway 또는 Error 504 gateway timeout](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#502504error)
-   [Error 503: service temporarily unavailable](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#503error)
-   [Error 520: web server returns an unknown error](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#520error)
-   [Error 521: web server is down](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#521error)
-   [Error 522: connection timed out](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#522error)
-   [Error 523: origin is unreachable](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#523error)
-   [Error 524: a timeout occurred](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#524error)
-   [Error 525: SSL handshake failed](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#525error)
-   [Error 526: invalid SSL certificate](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#526error)
-   [527 오류: Railgun Listener to origin 오류](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#527error)
-   [Error 530](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#530error)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/115003011431-Cloudflare-5XX-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0#h_3ef3e669-ebcb-41e6-b688-e9ade0944392)

___

## 개요

대부분의 5XX 오류를 해결할 때는, 먼저 호스팅 공급자나 사이트 관리자에게 연락해 문제를 해결하고 데이터를 수집하는 것이 바람직합니다.

### 호스팅 공급자에 제공해야 할 필수적인 오류 정보

1.  구체적인 5XX 오류 코드와 메시지
2.  5XX 오류가 발생한 시간과 표준 시간대
3.  HTTP 5XX 오류가 발생한 URL(예: _https://www.example.com/images/icons/image1.png_)

호스팅 공급자 또는 사이트 관리자에게 제공해야 할 추가적인 정보는 아래의 각 오류 설명에 나와 있습니다. Cloudflare [사용자 지정 오류 페이지](https://support.cloudflare.com/hc/articles/200172706)를 사용하면 이 문서에 설명된 기본 오류 페이지의 디자인을 변경할 수 있습니다.

___

## 오류 분석

계정 내 지원 포털에서 각 도메인의 Error Analytics를 확인할 수 있습니다. Error Analytics를 이용하면 HTTP 오류 코드로 전반적인 오류에 대해 통찰력을 얻을 수 있으며, 오류를 진단하고 해결하는 데 필요한 URL, 응답, 원본 서버 IP 주소, Cloudflare 데이터 센터 정보를 얻을 수 있습니다. Error Analytics는 1%의 트래픽 샘플을 바탕으로 생성됩니다.

Error Analytics 조회

-   Cloudflare 지원 포털로 이동합니다. 지원 포털에 접속하는 방법은 [지원 티켓 접수 지침](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730)에서 확인할 수 있습니다.
-   **Error Analytics** 섹션으로 스크롤합니다.
-   **Visit Error Analytics**를 클릭합니다.
-   조사가 필요한 도메인을 입력합니다.
-   **Errors over time** 그래프가 표시됩니다.
-   그래프 아래에 있는 테이블의 상태 코드를 클릭해 트래픽 오류에 관한 상세 정보를 펼칩니다.

___

## Error 500: internal server error

500 오류는 일반적으로 원본 웹 서버에서 발생한 문제를 의미합니다.원본 웹 서버가 생성한 일반적인 HTTP 500 오류 메시지는 _Error establishing database_ _connection_입니다.이 문제는 호스팅 공급자에 연락해 해결할 수 있습니다.

**문제 해결**

[호스팅 공급자에 상세 정보를 제공](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)하면 문제 해결에 도움이 될 수 있습니다.

하지만 500 오류의 HTML 응답 본문에 'cloudflare' 또는 'cloudflare-nginx'가 포함되어 있을 경우에는 [Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476)에 다음의 정보를 제공해야 합니다.

1.  도메인 이름
2.  5XX 오류가 발생한 시간과 표준 시간대
3.  500 오류가 발견된 브라우저에서 _www.example.com/cdn-cgi/trace_의출력(_www.example.com_을실제 도메인 및 호스트 이름으로 변경)

___

## Error 502 bad gateway 또는 Error 504 gateway timeout

HTTP 502 오류 또는 504 오류는 Cloudflare가 원본 웹 서버에 접속할 수 없는 경우에 발생합니다.

잠재적인 원인은 다음의 두 가지입니다.

-   (가장 일반적인 원인) [원본 웹 서버에서의 502/504 오류](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b)
-   [Cloudflare에서의 502/504 오류](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_845d633d-0842-4315-9dd2-53185cc4e1de)

### 원본 웹 서버에서의 502/504 오류

Cloudflare는 원본 웹 서버가 표준 HTTP 502 bad gateway 또는 504 gateway timeout 오류로 응답할 때 Cloudflare 브랜딩이 포함된 502/504 오류를 반환합니다.

![Cloudflare 브랜드가 있는 502 오류의 예](/images/support/image1.png)

**문제 해결**

호스팅 공급자에 연락해 원본 웹 서버에 발생한 다음과 같은 일반적인 원인을 해결하세요.

-   502/504 오류가 발생한 방문자 URL의 호스트 이름과 도메인에 대한 요청에 원본 서버가 응답하는지 확인합니다.
-   과도한 서버 부하, 충돌, 네트워크 장애를 조사합니다.
-   시간을 초과하거나 차단된 애플리케이션 또는 서비스를 파악합니다.

### Cloudflare에서의 502/504 오류

Cloudflare에서의 502/504 오류는 다음의 예처럼 표시됩니다.

![브랜드가 없는 502 오류의 예](/images/support/image5.png)

오류에 'cloudflare'가 포함되지 않은 경우 [원본에서의 502/504 오류](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b)이므로 호스팅 공급자에 지원을 요청해야 합니다.

**문제 해결**

다음의 세부 정보를 [Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476)에 제공하면, 문의가 신속하게 처리됩니다.

1.  오류가 발생한 시간과 표준 시간대
2.  HTTP 502/504 오류가 발생한 URL(예: _https://www.example.com/images/icons/image1.png_)
3.  _www.example.com/cdn-cgi/trace_를 검색할 때의출력(_www.example.com_을HTTP 502/504 오류가 발생한 도메인과 호스트 이름)

___

## Error 503: service temporarily unavailable

HTTP 503 오류는 원본 웹 서버가 과부하 상태일 때 발생합니다. 이 메시지에는 두 가지의 잠재적 원인이 있습니다.

-   오류의 HTML 응답 본문에 'cloudflare' 또는 'cloudflare-nginx'가 포함되지 않은 경우

**문제 해결**: 호스팅 공급자에 연락해 공급자 측에서 원본 웹 서버에 속도 제한 요청을 전송했는지 확인하세요.

-   오류의 HTML 응답 본문에 'cloudflare' 또는 'cloudflare-nginx'가 포함된 경우

**문제 해결**: 이 경우는 Cloudflare 데이터 센터에 연결 문제가 발생한 것을 의미합니다. [Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476)에 다음의 정보를 제공하세요.

1.  도메인 이름
2.  503 오류가 발생한 시간과 표준 시간대
3.  503 오류가 발견된 브라우저에서 _www.example.com/cdn-cgi/trace_의출력(_www.example.com_을실제 도메인 및 호스트 이름으로 변경)

___

## Error 520: web server returns an unknown error

520 오류는 원본 서버가, 내용이 없거나, 알 수 없거나, 예상치 못한 응답을 Cloudflare로 반환할 때 발생합니다.

**문제 해결**

[호스팅 공급자나 사이트 관리자에게 요청](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)해, 원본 웹 서버에서 충돌과 관련된 오류 로그를 검토하고 다음과 같은 일반적인 원인을 확인하세요.

-   원본 웹 서버 애플리케이션 충돌
-   원본 웹 서버에서 허용되지 않은 [Cloudflare IP](https://www.cloudflare.com/ips)
-   16KB를 초과하는 헤더(주로 쿠키가 너무 많아 발생)
-   원본 웹 서버가 HTTP 상태 코드나 응답 본문이 없는 빈 응답을 전송한 경우
-   누락된 응답 헤더 또는 [적절한 HTTP 오류 응답](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)을 반환하지 않는 서버
    -   `업스트림에서 응답 헤더를 읽는 중에 업스트림이 조기에 연결을 종료`하는 것이 로그에서 발견할 수 있는 일반적인 오류입니다. 이는 원본 웹 서버에 문제가 있어 Cloudflare에 502 오류가 발생했음을 나타냅니다.

호스팅 공급자나 사이트 관리자에게 연락한 후에도 520 오류가 계속될 경우, 다음의 정보를 [Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476)에 제공하세요.

-   오류 발생 시 요청된 페이지의 전체 URL
-   520 오류 메시지에서의 Cloudflare **cf-ray**
-   _http://www.example.com/cdn-cgi/trace_의출력(_www.example.com_을520 오류가 발생한 호스트 이름과 도메인으로 변경)
-   [HAR 파일](https://support.cloudflare.com/hc/articles/203118044) 2개:
    -   웹 사이트에서 Cloudflare가 활성화된 파일 1개
    -   [Cloudflare가 일시적으로 비활성화](https://support.cloudflare.com/hc/articles/200169176)된 파일 1개

___

## Error 521: web server is down

521 오류는 원본 웹 서버가 Cloudflare의 연결을 거부할 때 발생합니다. 원본 웹 서버에서의 보안 솔루션이 특정한 [Cloudflare IP 주소](https://www.cloudflare.com/ips)의 정상적인 연결을 차단할 수 있습니다.

521 오류의 가장 일반적인 원인 두 가지는 다음과 같습니다.

-   원본 웹 서버 애플리케이션이 다운됨
-   Cloudflare 요청이

**문제 해결**

[호스팅 공급자나 사이트 관리자에게 요청](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)해 다음과 같은 일반적인 원인을 제거하세요.

-   원본 웹 서버가 응답하는지 확인
-   원본 웹 서버 오류 로그를 검토해 웹 서버 애플리케이션 충돌이나 중단을 파악
-   [Cloudflare IP 주소](https://www.cloudflare.com/ips)가 차단되거나 속도 제한이 걸려있지 않은지 확인
-   원본 웹 서버 방화벽이나 다른 보안 소프트웨어에서 모든 [Cloudflare IP 범위](https://www.cloudflare.com/ips) 허용
-   **SSL/TLS 모드**를 **Full** 또는 **Full (Strict**)로 설정한 경우 [Cloudflare 원본 인증서](/ssl/origin-configuration/origin-ca)를 설치했는지 확인
-   [Cloudflare 커뮤니티](https://community.cloudflare.com/t/community-tip-fixing-error-521-web-server-is-down/42461)에서 문제 해결에 관한 추가 정보 검색

___

## Error 522: connection timed out

522 오류는 Cloudflare가 원본 웹 서버에 연결 중 제한 시간을 초과했을 때 발생합니다. Cloudflare와 원본 웹 서버 중 어디에서 오류가 발생하는지에 따라 두 가지의 제한 시간 초과가 HTTP 522 오류를 야기합니다.

1.  연결이 설정되기 전, Cloudflare가 SYN을 전송한 지 15초 이내에 원본 웹 서버가 SYN+ACK를 반환하지 않았습니다.
2.  연결이 설정된 후, 원본 웹 서버가 90초 이내에 Cloudflare의 페이지 요청을 인식(ACK)하지 못했습니다.

**문제 해결**

[호스팅 공급자에 연락](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)해 원본 웹 서버에 다음과 같은 일반적인 원인이 있는지 확인하세요.

-   (가장 일반적인 원인) .htaccess, iptables, 또는 방화벽에서 [Cloudflare IP 주소](https://www.cloudflare.com/ips/)에 속도 제한이 걸려 있거나 차단되어 있습니다. 호스팅 공급자가 Cloudflare IP 주소를 허용하는지 확인하세요.
-   원본 웹 서버가 과부하 상태이거나 오프라인 상태가 되어 수신 요청을 누락시킵니다.
-   [Keepalives](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html)가 원본 웹 서버에서 비활성화되어 있습니다.
-   Cloudflare **DNS** 앱의 실제 IP 주소가 호스팅 공급자가 원본 웹 서버에 제공한 현재 IP 주소와 일치하지 않습니다.
-   원본 웹 서버에서 패킷이 누락되었습니다.

[Cloudflare Pages](/pages/)를 사용하고 있는 경우 사용자 지정 도메인 설정이 있고 CNAME 레코드가 사용자 지정 Pages 도메인을 가리키고 있는지 확인하세요. 사용자 지정 Pages 도메인 설정 지침은 [여기](/pages/getting-started#adding-a-custom-domain)에 있습니다.

위의 방법으로도 문제를 해결하지 못할 경우, 호스팅 공급자나 사이트 관리자에게 다음의 정보를 요청한 후 [Cloudflare 지원팀에 문의](https://support.cloudflare.com/hc/articles/200172476)하는 것이 좋습니다.

-   원본 웹 서버에서 문제가 발생하기 전에 원본 웹 서버로 가장 많이 연결된 [Cloudflare IP 주소](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)로의 [MTR 또는 추적 경로](http://www.cloudflare.com/ips). 원본 웹 서버 로그에서, 연결된 Cloudflare IP를 확인합니다.
-   관련 로그, 호스팅 공급자와의 통신 등 호스팅 공급자의 조사에서 밝혀진 상세한 결과.

___

## Error 523: origin is unreachable

523 오류는 Cloudflare가 원본 웹 서버에 연결할 수 없을 때 발생합니다. 이 오류는 일반적으로 Cloudflare와 원본 웹 서버 사이의 네트워크 장치에 원본 IP 주소로의 경로가 없을 때 발생합니다.

**문제 해결** [호스팅 공급자에 연락](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)해 원본 웹 서버에서 다음과 같은 일반적인 원인을 제거하세요.

-   올바른 IP 주소가 Cloudflare DNS 앱에서 A 또는 AAAA 레코드로 기재되어 있는지 확인합니다.
-   원본 웹 서버와 Cloudflare 간 또는 원본 웹 서버의 인터넷 라우팅 문제를 해결합니다.

위의 방법으로도 문제를 해결하지 못할 경우, 호스팅 공급자나 사이트 관리자에게 다음의 정보를 요청하세요.

-   원본 웹 서버에서 문제가 발생하기 전에 원본 웹 서버로 가장 많이 연결된 [Cloudflare IP 주소](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)로의 [MTR 또는 추적 경로](http://www.cloudflare.com/ips). 원본 웹 서버 로그에서 연결된 Cloudflare IP를 확인합니다.
-   Cloudflare 호스팅 파트너를 통해 Railgun을 사용하는 경우, [호스팅 공급자에 연락](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)해 523 오류를 해결합니다.
-   Railgun 설치를 직접 관리하는 경우 다음을 제공하세요.
    -   Railgun 서버에서 원본 웹 서버로의 [추적 경로](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87).
    -   Railgun 서버의 최신 syslog 파일

___

## Error 524: a timeout occurred

524 오류는 Cloudflare가 성공적으로 원본 웹 서버에 연결되었지만, 기본값인 100초의 연결 시간 동안 원본 웹 서버가 HTTP 응답을 제공하지 않았음을 의미합니다. 이는 고객님의 서버가 과도한 작업(예: 대용량 데이터에 대한 쿼리)을 수행 중이어서 과도한 시간이 걸리거나 서버가 자원 문제로 어려움을 겪어 제 시간에 데이터를 반환하지 못하기 때문에 발생할 수 있습니다.

**문제 해결**

이 문제를 해결하기 위해 제시할 수 있는 대안은 다음과 같습니다.

-   큰 HTTP 프로세스의 상태 폴링을 통해 이 오류 발생 회피.
-   [호스팅 공급자에 연락](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)해 원본 웹 서버에서 다음과 같은 일반적인 원인을 제거하세요.
    -   원본 웹 서버에서 오랫동안 실행되는 프로세스
    -   원본 웹 서버의 과부하

-   Enterprise 요금제 고객은 [proxy\_read\_timeout API 엔트포인트](/api/operations/zone-settings-change-proxy_read_timeout-setting)를 이용해 524 오류의 제한 시간을 6000초까지 늘릴 수 있습니다.
-   데이터를 대규모로 내보내는 작업처럼, 완료하는 데 100초 이상이 걸리는 HTTP 요청을 자주 실행하는 경우, 이러한 프로세스를, Cloudflare **DNS** 앱에서 프록시 역할을 하지 않는 하위 도메인 뒤로 이동하세요.
-   Cloudflare Railgun을 사용하는 도메인에 524 오류가 발생할 경우, _lan.timeout_을 기본값인 30초보다 높게 설정한 후 Railgun 서비스를 재시작하세요.

___

## Error 525: SSL handshake failed

525 오류는 Cloudflare와 원본 웹 서버 사이의 SSL 핸드셰이크가 실패했음을 나타냅니다. 이 오류는 다음의 두 가지 조건에 모두 해당하는 경우에 발생합니다.

1.  Cloudflare와 원본 웹 서버 간 [SSL 핸드셰이크](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)가 실패
2.  Cloudflare **SSL/TLS** 앱의 **개요** 탭에 [_Full_](/ssl/origin-configuration/ssl-modes) 또는 _Full(Strict)_ **SSL/TLS**가 설정되어 있음

**문제 해결**

[호스팅 공급자에 연락](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)해 원본 웹 서버에서 다음과 같은 일반적인 원인을 제거하세요.

-   유효한 SSL 인증서가 설치되지 않음
-   443 포트(또는 다른 사용자 지정 보안 포트)가 열려 있지 않음
-   [SNI](https://support.cloudflare.com/hc/articles/360026016272)가 지원되지 않음
-   Cloudflare가 허용한 [암호 그룹](/ssl/ssl-tls/cipher-suites)이 원본 웹 서버에서 지원되는 암호 그룹과 일치하지 않음

**추가 확인 사항**

-   원본 서버에 인증서를 설치했는지 확인합니다. 일부 테스트의 실행 방법은 [이 문서](https://support.cloudflare.com/hc/ko/articles/203118044-Gathering-information-for-troubleshooting-sites#h_0c7f48b3-fc29-4266-8c63-477fe61a11c4)를 참고하시기 바랍니다. 인증서가 없는 경우에는 무료인 [Cloudflare 원본 CA 인증서](/ssl/origin-configuration/origin-ca)를 생성하여 설치해도 됩니다. 원본 CA 인증서를 사용하면 Cloudflare와 원본 웹 서버 사이 트래픽을 암호화할 수 있습니다.
-   고객의 서버가 이용하는 [암호 그룹을 검토](/ssl/ssl-tls/cipher-suites)하여 Cloudflare가 지원하는 암호 그룹과 일치하는지 확인합니다.
-   525 오류가 발생한 타임스탬프의 서버 오류 로그를 검토하여 SSL 핸드셰이크 중 연결을 재설정할 오류가 있는지 여부를 확인합니다.

___

## Error 526: invalid SSL certificate

526 오류는 다음의 두 가지 조건에 모두 해당하는 경우에 발생합니다.

1.  Cloudflare가 원본 웹 서버의 SSL 인증서의 유효성을 확인할 수 없음
2.  Cloudflare **SSL/TLS** 앱의 **개요** 탭에 [_Full SSL (Strict)_](/ssl/origin-configuration/ssl-modes#full-strict) **SSL**이 설정되어 있습니다.

**문제 해결**

호스팅 공급자나 서버 관리자에게 요청해 원본 웹 서버의 SSL 인증서를 검토하고 다음을 확인하세요.

-   인증서가 만료되지 않음
-   인증서가 취소되지 않음
-   인증서에 (자체 서명이 아닌) [인](https://support.cloudflare.com/hc/articles/360026016272)[증 기관](https://support.cloudflare.com/hc/articles/360026016272)의 서명이 기재되어 있
-   요청되거나 대상이 되는 도메인 이름과 호스트 이름이 인증서의 **일반 이름** 또는 **주체 대체 이름**과 동일함
-   원본 웹 서버가 SSL 443 포트를 통한 연결을 허용함
-   [Cloudflare를 일시 중지](https://support.cloudflare.com/hc/articles/200169176)하고 [https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com](https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com)에접속해(www.example.com은 호스트 이름과 도메인으로 대체)SSL 인증서 원본에 문제가 없는지 확인

![오류가 없는 SSL 인증서가 표시된 화면](/images/support/hc-import-troubleshooting_5xx_errors_sslshopper_output.png)

원본 서버가 자체적으로 서명한 인증서를 사용하는 경우, 도메인이 _Full SSL(Strict)_ 대신 _Full_ _SSL_을 사용하도록 설정하세요. 원본 서버에서 SSL을 설정하는 방법은 [SSL 설정 권장 사항](/ssl/origin-configuration/ssl-modes)을 참조할 수 있습니다.

___

## 527 오류: Railgun Listener to origin 오류

527 오류는 Cloudflare와 사용자의 [Railgun 서버((rg-listener)](https://support.cloudflare.com/hc/articles/200168406) 간의 연결이 중단되었음을 의미합니다. 이 오류의 일반적인 원인은 다음과 같습니다.

-   방화벽 간섭
-   Railgun 서버와 Cloudflare 간 네트워크 사고 또는 패킷 손실

527 오류의 일반적인 원인은 다음과 같습니다.

-   [연결 제한 시간 초과](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c559b9e5-a342-47ed-bfae-66e10e42aade)
-   [LAN 제한 시간 초과](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_f8e4890c-9459-4c9a-a4ab-e9b44fa16dbf)
-   [연결 거부](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_2e3e4251-3642-4fce-bbcf-1a45bb2b2c11)
-   [TLS/SSL 관련 오류](https://support.cloudflare.com/hc/ko/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c30fe02c-98f2-4cbf-af8c-bafa9b4f5b8f)

Cloudflare 지원팀에 연락해야 할 경우, Railgun Listener에서 다음의 정보를 수집해 지원팀에 제공하도록 하세요.

-   _railgun.conf_ 파일의전체 내용
-   _railgun-nat.conf_ 파일의전체 내용
-   발생한 오류가 자세히 설명되어 있는 Railgun 로그 파일

### 연결 제한 시간 초과

다음의 Railgun 로그 오류는 Railgun Listener와 원본 웹 서버 간 연결이 실패했음을 의미합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/example.com: dial tcp 0.0.0.0:443: i/o timeout</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">no response from origin (timeout) 0.0.0.0:80/example.com</span></div></span></span></span></code></pre>{{</raw>}}

**문제 해결**

호스팅 공급자에 도움을 요청해 원본 웹 서버와 Railgun Listener 간 연결성 문제를 테스트해보세요. 예를 들어, netcat 명령어로 Railgun Listener에서 원본 웹 서버의 _SERVERIP_와 _PORT_(HTTP의 경우 80, HTTPS의 경우 443)를 실행할 때의 연결성을 테스트해볼 수 있습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nc -vz SERVERIP PORT</span></div></span></span></span></code></pre>{{</raw>}}

### LAN 제한 시간 초과

다음의 Railgun Listener 로그 오류는 원본 웹 서버가 기본값인 30초의 제한 시간 이내에 Railgun Listener로 HTTP 응답을 전송하지 않을 때 생성됩니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  connection failed 0.0.0.0:443/example.com: dial tcp 0.0.0.0:443: i/o timeout</span></div></span></span></span></code></pre>{{</raw>}}

시간은 railgun.conf 파일의 lan.timeout 매개변수로 조정할 수 있습니다.

**문제 해결**

_lan.timeout_의한도(_railgun.conf_에서)를 늘리거나 웹 서버 구성을 검토합니다. 호스팅 공급자에 연락해 원본 웹 서버가 과부하되지는 않았는지 확인하세요.

### 연결 거부

다음의 오류는 Railgun Listener에서 전송된 요청이 거부됐을 때 표시됩니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Error getting page: dial tcp 0.0.0.0:80:connection refused</span></div></span></span></span></code></pre>{{</raw>}}

**문제 해결**

원본 웹 서버의 방화벽에서 Railgun Listener의 IP를 허용하세요.

### TLS/SSL 관련 오류

TLS 연결이 실패하면 다음의 오류가 Railgun 로그에 표시됩니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/example.com: remote error: handshake failure</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/example.com: dial tcp 0.0.0.0:443:connection refused</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 127.0.0.1:443/www.example.com: x509: certificate is valid for</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com, not www.example.com</span></div></span></span></span></code></pre>{{</raw>}}

**문제 해결**

TLS/SSL 오류가 발생할 경우, 원본 웹 서버에서 다음을 확인하세요.

-   443 포트가 열려 있음
-   SSL 인증서가 원본 웹 서버로부터 제공됨
-   원본 웹 서버 SSL 인증서의 일반 이름과 주체 대체 이름에, 요청되거나 대상이 되는 호스트 이름이 포함되어 있음
-   Cloudflare **SSL/TLS** 앱의 **개요** 탭에 **SSL**이 [Full 또는Full(Strict)](/ssl/origin-configuration/ssl-modes)로 설정되어 있음

___

## Error 530

HTTP 530 오류가 반환될 때는 1XXX가 함께 반환됩니다. [Cloudflare 도움말 센터에서 구체적인 1XXX 오류](https://support.cloudflare.com/hc/sections/200820298)에 관한 문제 해결 정보를 찾아볼 수 있습니다.

___

## 관련 자료

-   [사이트 문제 해결을 위한 정보 수집](https://support.cloudflare.com/hc/ko/articles/203118044)
-   [Cloudflare 지원팀에 문의하기](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Cloudflare 오류 페이지 사용자 지정하기](https://support.cloudflare.com/hc/articles/200172706)
-   [MTR/추적 경로 진단과 사용](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)
-   [Cloudflare 커뮤니티 팁](https://community.cloudflare.com/tag/communitytip)
