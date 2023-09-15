---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors
title: Troubleshooting Cloudflare 1XXX errors
---

# Troubleshooting Cloudflare 1XXX errors

_Cloudflare가 프록시 역할을 하는 사이트의 1XXX 오류를 진단하고 해결합니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#h_e6ba4204-ab4f-464b-afdc-e8177e418e34)
-   [Error 1000: DNS points to prohibited IP](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1000)
-   [Error 1001: DNS resolution error](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1001)
-   [Error 1002: DNS points to Prohibited IP](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1002a)
-   [Error 1002: Restricted](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1003)
-   [Error 1003 Access Denied: Direct IP Access Not Allowed](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1003)
-   [Error 1004: Host Not Configured to Serve Web Traffic](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1004)
-   [1006, 1007, 1008, 1106 오류 액세스 거부: 사용자의 IP 주소가 금지되어 있습니다](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error100610071008)
-   [오류 1009 액세스 거부: 금지된 국가 또는 지역](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#h_1FIuVf9XCVpeBz8Cn6B0Fj)
-   [Error 1010: The owner of this website has banned your access based on your browser's signature](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1010)
-   [Error 1011: Access Denied (Hotlinking Denied)](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1011)
-   [Error 1012: Access Denied](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1012)
-   [Error 1013: HTTP hostname and TLS SNI hostname mismatch](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1013)
-   [Error 1014: CNAME Cross-User Banned](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1014)
-   [Error 1015: You are being rate limited](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1015)
-   [Error 1016: Origin DNS error](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1016)
-   [Error 1018: Could not find host](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1018)
-   [Error 1019: Compute server error](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1019)
-   [Error 1020: Access denied](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1020)
-   [오류 1023: 호스트를 찾을 수 없습니다](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1023)
-   [Error 1025: Please check back later](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1025)
-   [오류 1033: Argo Tunnel 오류](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#h_W81O7hTPalZtYqNYkIHgH)
-   [오류 1034: 에지 IP 제한됨](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#h_4eD6Gcxp4zQqS4ciCJaLt0)
-   [오류 1035: 유효하지 않은 요청 재작성(유효하지 않은 URI 경로)](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1035)
-   [오류 1036: 유효하지 않은 요청 재작성(최대 길이 초과됨)](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1036)
-   [오류 1037: 유효하지 않은 재작성 규칙(식을 평가할 수 없음)](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1037)
-   [오류 1040: 유효하지 않은 요청 재작성(헤더 수정이 허용되지 않음)](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1040)
-   [오류 1041: 유효하지 않은 요청 재작성(유효하지 않은 헤더 값)](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1041)
-   [Error 1101: Rendering error](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1101)
-   [Error 1102: Rendering error](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1102)
-   [오류 1104: 이 이메일 주소의 변형이 이미 Cloudflare 시스템에 있습니다. 하나의 변형만이 허용됩니다.](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#error1104)
-   [Error 1200: Cache connection limit](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#h_302a97f3-eba3-4c0a-a589-76ba95f60dcf)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#h_80755d09-43f2-4656-b1f9-2989196b30a6)

___

## 개요

이 문서에 설명된 오류는 Cloudflare가 프록시 역할을 하는 웹 사이트를 방문할 때 발생할 수 있습니다. Cloudflare API 또는 대시보드 오류는  [Cloudflare API 문서](https://api.cloudflare.com/)를 참조하세요. HTTP 409, 530, 403, 429 오류는 응답으로 HTTP 상태 헤더에 반환된 HTTP 오류 코드를 말합니다. 1XXX 오류는 응답의 HTML 본문에 표시됩니다.

각 오류 설명에 있는 해결 방법으로도 오류를 해결할 수 없다면 [Cloudflare 지원팀에 문의](https://support.cloudflare.com/hc/articles/200172476)하시기 바랍니다.

___

## Error 1000: DNS points to prohibited IP

### 일반적인 원인

Cloudflare가 다음의 이유 중 하나 때문에 요청을 중단했습니다.

-   Cloudflare DNS 앱 내의 A 레코드가 [Cloudflare IP 주소](https://www.cloudflare.com/ips/)를 가리키도록 하지 않으면 Load Balancer 원본이 프록시된 레코드를 가리킵니다.
-   Cloudflare DNS A 레코드 또는 CNAME 레코드가 proxy\_pass 기능을 사용하는 Nginx 웹 서버 등의 다른 리버스 프록시를 조회하며 이 역방향 프록시가 요청을 대신 처리해 Cloudflare로 전송합니다.
-   X-Forwarded-For 요청 헤더가 100자를 초과합니다.
-   요청에 두 개의 X-Forwarded-For 헤더가 포함되어 있습니다.
-   원본에서의 서버 이름 지시(SNI: Server Name Indication) 문제 또는 불일치가 발생합니다.

### 문제 해결

-   Cloudflare DNS 앱의 A 레코드가 [Cloudflare IP 주소](https://www.cloudflare.com/ips/)를 가리키는 경우, IP 주소를 원본 웹 서버의 IP 주소로 업데이트하세요.
-   원본 웹 서버에 Cloudflare 프록시를 통해 요청을 반송하는 리버스 프록시가 있습니다. 리버스 프록시를 사용하지 말고, 호스팅 공급자나 사이트 관리자에게 연락해 원본 웹 서버에 HTTP 리디렉션을 설정하세요.

___

## Error 1001: DNS resolution error

### 일반적인 원인

-   존재하지 않는 도메인의 Cloudflare IP 주소로 웹 요청이 전송되었습니다.
-   Cloudflare를 사용하지 않는 외부 도메인에 Cloudflare에서 활성화된 도메인에 대한 CNAME 레코드가 있습니다.
-   DNS CNAME 레코드의 대상이 확인되지 않습니다.
-   Cloudflare DNS 앱의 CNAME 레코드가 DNS 공급자를 통한 확인을 필요로 하는데, 현재 DNS 공급자가 오프라인 상태입니다.
-   [사용자 지정 호스트 이름(SaaS용 SSL](/ssl/ssl-for-saas)) 도메인에 [Always Online](/cache/how-to/always-online/)이 활성화되어 있습니다.

### 문제 해결

Cloudflare 이외의 도메인은, 해당 도메인이 Cloudflare 계정에 추가되지 않는 한 Cloudflare 도메인에 CNAME 할 수 없습니다.

[Cloudflare CNAME 설정](/dns/zone-setups/partial-setup)에 사용된 DNS 레코드에 직접 액세스를 시도하는 경우에도 1001 오류가 발생할 수 있습니다(예: _www.example.com.cdn.cloudflare.net_).

[사용자 지정 호스트 이름(SaaS용 SSL)](/ssl/ssl-for-saas)을 사용 중인 경우   [Always Online](/cache/how-to/always-online/#enable-always-online) 을 비활성화하세요.

___

## Error 1002: DNS points to Prohibited IP

### 일반적인 원인

-   Cloudflare DNS 앱의 DNS 레코드가 [Cloudflare IP 주소](https://www.cloudflare.com/ips/) 중 하나를 가리킵니다.
-   Cloudflare DNS 앱의 CNAME 레코드에 대상이 잘못 지정되어 있습니다.
-   도메인이 Cloudflare에 있지 않은데, Cloudflare 도메인을 참조하는 CNAME이 포함되어 있습니다.

### 문제 해결

Cloudflare _A 레코드_ 또는 _CNAME 레코드_를 업데이트해 Cloudflare IP 주소가 아닌 실제 IP 주소를 가리키도록 합니다.

1.  호스팅 공급자에 연락해 실제 IP 주소나 CNAME 레코드 대상을 확인합니다.
2.  Cloudflare 계정에 로그인합니다.
3.  1002 오류를 생성하는 도메인을 선택합니다.
4.  **DNS** 앱을 선택합니다.
5.  업데이트할 _A_ 레코드이 **값**을 클릭합니다.
6.  _A_ 레코드를 업데이트합니다.

원본 웹 서버가 Cloudflare를 통해 자체 요청을 프록시 처리하지 않게 하려면 원본 웹 서버에서 Cloudflare 도메인을 다음 중 하나로 설정하세요.

-   내부 NAT’d IP 주소
-   원본 웹 서버의 퍼블릭 IP 주소

___

## Error 1002: Restricted

### 일반적인 원인

Cloudflare 도메인이 로컬 IP 주소, 허용되지 않은 IP 주소, 또는 도메인과 연관이 없는 IP 주소로 확인되고 있습니다.

### 문제 해결

웹사이트 소유자인 경우

1.  호스팅 공급자에 문의해 원본 웹 서버의 IP 주소를 확인합니다.
2.  Cloudflare 계정에 로그인합니다.
3.  Cloudflare DNS 앱의 A 레코드를 호스팅 공급자가 확인해 준 IP 주소로 업데이트합니다.

___

## Error 1003 Access Denied: Direct IP Access Not Allowed

### 일반적인 원인

클라이언트 또는 브라우저가  [Cloudflare IP 주소](https://www.cloudflare.com/ips)에 직접 액세스하고 있습니다.

### 문제 해결

URL에 Cloudflare IP 주소 대신 웹 사이트 도메인 이름을 입력하세요.

___

## Error 1004: Host Not Configured to Serve Web Traffic

### 일반적인 원인

-   서비스 오용 또는 서비스 약관 위반으로 인해 Cloudflare 직원이 도메인에서 프록시 기능을 비활성화했습니다.
-   DNS 변경 사항이 아직 업데이트되지 않았거나 사이트 소유자의 DNS _A 레코드_i가 [Cloudflare IP 주소](https://www.cloudflare.com/ips)를 가리킵니다.

### 문제 해결

문제가  5분 이상  계속될 경우, [Cloudflare 지원팀에 문의](https://support.cloudflare.com/hc/articles/200172476)하세요.

___

## 1006, 1007, 1008, 1106 오류 액세스 거부: 사용자의 IP 주소가 금지되어 있습니다

### 일반적인 원인

Cloudflare 고객이 클라이언트 또는 브라우저에서 오는 트래픽을 차단했습니다.

### 문제 해결

웹 사이트 소유자에게 Cloudflare 보안 환경을 점검하거나 클라이언트 IP 주소를 허용해달라고 요청하세요. 웹 사이트 소유자가 요청을 차단한 것이므로 Cloudflare 지원팀은 고객의 보안 환경을 변경할 수 없습니다.

___

## 오류 1009 액세스 거부: 금지된 국가 또는 지역

### 일반적인 원인

웹 사이트(예: example.com)의 소유자가 귀하의 IP 주소가 있는 국가 또는 지역의 웹 사이트 액세스를 금지했습니다.

### 문제 해결

[IP 액세스 규칙](https://support.cloudflare.com/hc/ko/articles/217074967-Configuring-IP-Access-Rules) 보안 기능에서 IP 주소가 허용되는지 확인하시기 바랍니다.

___

## Error 1010: The owner of this website has banned your access based on your browser's signature

### 일반적인 원인

 웹 사이트 소유자가 클라이언트 웹 브라우저를 기반으로  사용자의 요청을 차단했습니다.

### 문제 해결

웹 사이트 소유자에게 요청이 차단되었다는 사실을 알리세요. 웹 사이트 소유자에게 연락할 방법을 모르는 경우, [Whois 데이터베이스](https://whois.icann.org/en/lookup)를 통해 도메인의 연락처 정보를 찾아볼 수 있습니다. 사이트 소유자는 **Firewall** 앱의 **설정** 탭을 통해 **브라우저**  **무결성 검사**를 비활성화할 수 있습니다.

___

## Error 1011: Access Denied (Hotlinking Denied)

### 일반적인 원인

[Cloudflare 핫링크 보호](https://support.cloudflare.com/hc/articles/200170026)를 사용하는 페이지를  요청했습니다.

### 문제 해결

웹 사이트 소유자에게 요청이 차단되었다는 사실을 알리세요. 웹 사이트 소유자에게 연락할 방법을 모르는 경우, [Whois 데이터베이스](https://whois.icann.org/en/lookup)를 통해 도메인의 연락처 정보를 찾아볼 수 있습니다. **핫링크 보호**는 Cloudflare **Scrape Shield** 앱에서 관리할 수 있습니다.

___

## Error 1012: Access Denied

### 일반적인 원인

웹 사이트 소유자가 방문자의 컴퓨터나 네트워크(ip\_address)에서 악성 활동을 감지해 액세스를 금지했습니다. 방문자의 컴퓨터가 맬웨어나 바이러스에 감염됐을 가능성이 높습니다.

### 문제 해결

바이러스 백신 소프트웨어를 업데이트하고 시스템 전체 검사를 실행하세요. Cloudflare는 사이트 소유자가 도메인에 설정한 보안 환경을 변경할 수 없습니다. 사이트 소유자에게 IP 주소를 허용해달라고 요청하면 웹 사이트에 다시 액세스할 수 있습니다. 웹 사이트 소유자에게 연락할 방법을 모르는 경우,  [Whois 데이터베이스](https://whois.icann.org/en/lookup)를 통해 도메인의 연락처 정보를 찾아볼 수 있습니다.

___

## Error 1013: HTTP hostname and TLS SNI hostname mismatch

### 일반적인 원인

클라이언트 또는 브라우저에서  [서버 이름 표시](/fundamentals/glossary#server-name-indication-sni) (SNI)를 통해 전송된 호스트 이름이 요청 호스트 헤더와 일치하지 않습니다.

### 문제 해결

1013 오류는 대개 다음의 원인으로 인해 발생합니다.

-   로컬 브라우저가 올바르지 않은 SNI 호스트 헤더를 설정
-   SSL 트래픽을 프록시하는 네트워크가 요청의 호스트 헤더와 SNI 간의 불일치를 유발함

 [SSL Shopper](https://www.sslshopper.com/ssl-checker.html) 등의 온라인 도구를 통해 SNI 일치 여부를 테스트해볼 수 있습니다.

Cloudflare 지원팀에 다음과 같은 정보를 제공하세요.

1.  오류를 재생하면서 캡처한  [HAR file](https://support.cloudflare.com/hc/articles/203118044) .

___

## Error 1014: CNAME Cross-User Banned

### 일반적인 원인

Cloudflare는 서로 다른 Cloudflare 계정의 도메인 간 DNS _CNAME 레코드_를 허용하지 않도록 기본 설정되어 있습니다._CNAME 레코드_는 도메인(_www.example.com_CNAME to _api.example.com_)과 동일한 사용자 계정 내 구간(_www.example.com_CNAME to _www.example.net_)에서 허용되며 [SaaS용 Cloudflare](https://www.cloudflare.com/saas/) 솔루션을 이용하는 경우에도 허용됩니다.

### 문제 해결

다른 Cloudflare 계정에 CNAME 레코드 확인을 허용할 경우 CNAME 대상의 도메인 소유자는 [SaaS용 Cloudflare](https://www.cloudflare.com/saas/), 구체적으로는 [SaaS용 SSL](/ssl/ssl-for-saas/)을 이용해야 합니다.

___

## Error 1015: You are being rate limited

### 일반적인 원인

사이트 소유자가 방문자 트래픽에  [속도 제한](https://support.cloudflare.com/hc/articles/115001635128) 을 걸었습니다.

### 문제 해결

-   사이트 방문객의 경우, 사이트 소유자에게 연락해 본인의 IP를 속도 제한에서 풀어달라고 요청하세요.
-   사이트 소유자의 경우, [Cloudflare 속도 제한  임계값](https://support.cloudflare.com/hc/articles/115001635128)을 참조해 속도 제한  설정을 변경하세요.
-   속도 제한이 짧은 시간(예: 1초) 이후 차단하는 경우, 시간을 10초로 늘려보세요.

___

## Error 1016: Origin DNS error

### 일반적인 원인

Cloudflare가 원본 웹 서버의 IP 주소를 확인하지 못했습니다.

1016 오류의 일반적인 원인은 다음과 같습니다.

-   원본 IP 주소가 언급된 DNS _A 레코드_가 누락되었습니다.
-   Cloudflare DNS 내 _CNAME 레코드_가 확인할 수 없는 외부 도메인을 가리킵니다.
-   Cloudflare [Load Balancer](/load-balancing/) 기본값, 지역, 폴백 풀에서 원본 호스트 이름(CNAME)을 인식할 수 없습니다. 다른 풀을 사용할 수 없는 경우 실제 IP에 설정된 폴백 풀을 백업으로 사용할 수 있습니다.
-   CNAME 원본으로 Spectrum 앱을 생성할 경우, 먼저 Cloudflare DNS 측에 원본을 가리키는 CNAME을 생성해야 합니다. 자세한 내용은 [Spectrum CNAME 원본](/spectrum/how-to/cname-origins) 을 참조하세요

### 문제 해결

1016 오류를 해결하는 방법은 다음과 같습니다.

1.  Cloudflare DNS 설정에 [DNS 검색 도구](https://dnschecker.org/)에서 인식되는 유효한 IP 주소를 가리키는 _A 레코드_가 포함되어 있는지 확인하세요.
2.  CNAME 레코드가 다른 도메인을 가리킬 경우 대상 도메인이 [DNS 검색 도구](https://dnschecker.org/)에서 검색되는지 확인하세요.

___

## Error 1018: Could not find host

### 일반적인 원인

-   Cloudflare 도메인이 최근에 활성화되었고 도메인 설정을 Cloudflare 에지 네트워크로 전파하는 데 지연이 발생하고 있습니다.
-   Cloudflare 도메인이 호스팅 공급자 등의 Cloudflare 파트너를 통해 생성되었고 호스팅 공급자의 DNS가 실패했습니다.

### 문제 해결

다음의 정보와 함께  [Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476) 에 연락해주시기 바랍니다.

1.  도메인 이름
2.  오류 메시지에 **RayID**가 언급된 1018 오류 스크린샷
3.  1018 오류가 발생한 시간과 표준 시간대

___

## Error 1019: Compute server error

### 일반적인 원인

Cloudflare Worker 스크립트가 반복적으로 자신을 참조합니다.

### 문제 해결

Cloudflare Worker가 동일한 Workers 스크립트를 호출하는 URL에 액세스하지 않도록 합니다.

___

## Error 1020: Access denied

### 일반적인 원인

클라이언트 또는 브라우저가 Cloudflare 고객의 방화벽 규칙에 의해 차단되었습니다.

### 문제 해결

웹 사이트 소유자가 아닌 경우, 웹 사이트 소유자에게 1020 오류 메시지의 스크린샷을 제공하세요.

웹 사이트 소유자의 경우, 다음의 단계를 따라 문제를 해결하세요.

1.  고객으로부터 1020 오류의 스크린샷을 받습니다.
2.  Cloudflare **Firewall** 앱의 **개요** 탭에 있는 [**방화벽 이벤트**](/waf/analytics)에서 방문자의 1020 오류 메시지에 있는 **RayID** 또는 클라이언트 IP 주소를 찾습니다.

3\. 차단의 원인을 파악해 **방화벽 규칙**을 업데이트하거나, [**IP 액세스 규칙**](https://support.cloudflare.com/hc/articles/217074967)에서 방문자 IP 주소를 허용합니다.

___

## 오류 1023: 호스트를 찾을 수 없습니다

### 일반적인 원인

-   소유자가 막 Cloudflare에 등록하였다면 웹 사이트 정보가 Cloudflare 전역 네트워크에 배포되는 데 몇 분이 걸릴 수 있습니다. 사이트 구성에 문제가 있습니다.
-   일반적으로 이는 계정이 파트너 조직(예: 호스팅 공급자)에 등록되어 있고 공급자의 제공자의 DNS가 실패하는 경우에 발생합니다.

### 문제 해결

다음의 정보와 함께  [Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476) 에 연락해주시기 바랍니다.

1.  도메인 이름
2.  오류 메시지에 **RayID**가 언급된 1023 오류 스크린샷
3.  1023 오류가 발생한 시간과 표준 시간대

___

## Error 1025: Please check back later

### 일반적인 원인

도메인이  [Cloudflare Workers의 요금제 제한](/workers/platform/limits)을 초과해 요청이 처리되지 않았습니다.

### 문제 해결:

Workers 대시보드의  [요금제 페이지](https://dash.cloudflare.com/redirect?account=workers/plans) 에서 무제한 Workers 요금제를 구매하세요.

___

## 오류 1033: Argo Tunnel 오류

### 일반적인 원인

Cloudflare 네트워크에 있는 웹 사이트(`tunnel.example.com`) 페이지를 요청했습니다. 해당 호스트(`tunnel.example.com`)는 Argo Tunnel로 구성되었으며 현재 Cloudflare가 이를 확인할 수 없습니다.

### 문제 해결

-   **이 웹 사이트의 방문자인 경우**: 잠시 후 다시 시도하시기 바랍니다.
-   **이 웹 사이트의 소유자인 경우**: _cloudflared_가 실행 중이며 해당 네트워크에 도달할 수 있는지 확인하시기 바랍니다. 터널에 대해 [로드 밸런싱](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb)을 사용해야 하는 경우도 있습니다.

___

## 오류 1034: 에지 IP 제한됨

### 일반적인 원인

이제 이전에 도메인이 `1.1.1.1`을 가리키도록 했던 고객에게는 **1034 오류**가 발생합니다. 이는 구성 오류 및/또는 남용 가능성을 방지하기 위한 Cloudflare 시스템의 새로운 에지 유효성 검사 기능으로 인한 것입니다.

### 문제 해결

DNS 레코드가 귀사의 통제 하에 있는 IP 주소를 가리키도록 하고, "원본 없는" 설정을 위해 플레이스홀더 IP 주소가 필요한 경우에는 IPv6 예약 주소 `100::` 또는 IPv4 예약 주소 `192.0.2.0`을 이용하시기 바랍니다.

___

## 오류 1035: 유효하지 않은 요청 재작성(유효하지 않은 URI 경로)

### 일반적인 원인

재작성된 URI 경로의 값 또는 식이 유효하지 않습니다.

URL 재작성의 대상이 `/cdn-cgi/`의 하위 경로인 경우에도 이 오류가 발생합니다.

### 문제 해결

재작성된 URI 경로가 비어 있지 않은지와 `/`(슬래시) 문자로 시작되는지 확인하십시오.

예를 들어, 다음 URI 경로 재작성 식은 유효하지 않습니다.

`concat(lower(ip.geoip.country), http.request.uri.path)`

`/` 접두어를 추가하여 위의 식을 수정하시기 바랍니다.

`concat("/", lower(ip.geoip.country), http.request.uri.path)`

___

## 오류 1036: 유효하지 않은 요청 재작성(최대 길이 초과됨)

### 일반적인 원인

재작성된 URI 경로나 쿼리 문자열의 값 또는 식이 너무 깁니다.

### 문제 해결

새 URI 경로/쿼리 문자열 값의 값 또는 식 길이를 짧게 하시기 바랍니다.

___

## 오류 1037: 유효하지 않은 재작성 규칙(식을 평가할 수 없음)

### 일반적인 원인

재작성 규칙의 식을 평가할 수 없습니다. 이 오류에는 여러 가지 원인이 있지만, 식 요소 중 하나에 평가 시 정의되지 않는 값이 포함되어 있는 경우가 있습니다.

예를 들어, 다음 URL 재작성 동적 식을 사용하면 1037오류가 발생하고 `X-Source` 헤더가 요청에 포함되지 않습니다.

`http.request.headers["x-source"][0]`

### 문제 해결

재작성 식의 모든 요소를 정의하시기 바랍니다. 예를 들어, 헤더 값을 참조하는 경우라면, 헤더가 설정되어 있는지 확인하십시오.

___

## 오류 1040: 유효하지 않은 요청 재작성(헤더 수정이 허용되지 않음)

### 일반적인 원인

HTTP 요청 헤더 수정 규칙이 변경할 수 없는 HTTP 헤더를 수정하려 하고 있습니다.

### 문제 해결

[예약된 HTTP 요청 헤더](/rules/transform#http-request-header-modification-rules) 중 하나를 수정하려 하고 있지 않은지 확인하시기 바랍니다.

___

## 오류 1041: 유효하지 않은 요청 재작성(유효하지 않은 헤더 값)

### 일반적인 원인

추가/수정된 헤더 값이 너무 길거나 허용되지 않는 문자를 포함되어 있습니다.

### 문제 해결

-   짧은 값 또는 식으로 헤더 값을 정의하십시오.
-   허용되지 않는 문자를 삭제하십시오. 허용되는 문자에 대한 자세한 정보는 개발자 문서에서 [HTTP 요청 헤더 이름 및 값의 형식](/rules/transform/create-header-modification-rule#format-of-http-request-header-names-and-values)을 참조하시기 바랍니다.

___

## Error 1101: Rendering error

### 일반적인 원인

Cloudflare Worker가 JavaScript 런타임 예외를 실행했습니다.

### 문제 해결:

Cloudflare 지원팀에 [문제에 관한 자세한 정보를 제공](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)하세요.

___

## Error 1102: Rendering error

### 일반적인 원인

Cloudflare Worker가  [CPU 시간제한](/workers/observability/log-from-workers/#identifying-and-handling-errors-and-exceptions)을 초과했습니다. CPU 시간은 loops, parsing JSON 등의 코드를 실행하는 데 걸리는 시간을 말합니다. 네트워크 요청(가져오기, 응답하기)에 걸리는 시간은 CPU 시간에 포함되지 않습니다.

### 문제 해결

Workers 코드 개발자에게 연락해 활성화된 Workers 스크립트에서 CPU 사용을 최소화하도록 코드를 최적화합니다.

___

## 오류 1104: 이 이메일 주소의 변형이 이미 Cloudflare 시스템에 있습니다. 하나의 변형만이 허용됩니다.

### 일반적인 원인

이 오류는 추가하려는 이메일의 변형이 추가된 경우 발생합니다. 예를 들어 _my+user@example.com_과 _my.user@example.com_는 Cloudflare 시스템에서 동일하게 취급됩니다.

### 문제 해결

과거 사용자로 로그인한 후 이메일을 "폐기" 주소로 변경하면 새로운 이메일을 이용할 수 있습니다.

___

## Error 1200: Cache connection limit

### 일반적인 원인

Cloudflare 에지에 원본 웹 서버의 처리를 기다리는 요청이 지나치게 많이 대기하고 있습니다.  이 제한은  Cloudflare 시스템을 보호하기 위한 것입니다.

### 문제 해결

들어오는 연결을 더 빨리 허용하도록 원본 웹 서버의 설정을 변경하세요.  캐시 설정을 조정해 캐시 적중률을 개선하면 원본 웹 서버에 도달하는 요청의 수가 감소합니다.  호스팅 공급자나 웹 관리자에게 연락해 도움을 요청하세요.

___

## 관련 자료

-   [Cloudflare 지원팀에 문의하기](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [Cloudflare 오류 페이지 사용자 지정하기](https://support.cloudflare.com/hc/articles/200172706)
