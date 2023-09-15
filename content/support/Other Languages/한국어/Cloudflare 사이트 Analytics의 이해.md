---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360037684251-Cloudflare-%EC%82%AC%EC%9D%B4%ED%8A%B8-Analytics%EC%9D%98-%EC%9D%B4%ED%95%B4
title: Cloudflare 사이트 Analytics의 이해
---

# Cloudflare 사이트 Analytics의 이해

## Cloudflare 사이트 Analytics의 이해

_Cloudflare (사이트) Analytics 앱을 통해 Cloudflare 계정 내 각 사이트에 대한 통찰력을 얻을 수 있습니다. 이 지표들은 웹 트래픽, 보안, 성능, DNS, Workers에 대한 요청 및 응답 데이터로 구성됩니다._

___

## 개요

Cloudflare 대시보드 (사이트) **Analytics** 앱은 전체 Cloudflare Analytics 제품군의 주요 구성 요소입니다.  구체적으로, 이 앱을 통해서 웹 사이트 또는 도메인 수준에서 수집된 광범위한 지표를 이용할 수 있습니다.

___

웹 사이트의 지표를 보려면 다음을 수행하십시오.

1.  Cloudflare dashboard에 로그인합니다.
2.  사이트에 해당하는 Cloudflare **계정**을 클릭한 후 **도메인**을 선택합니다.
3.  이어서 **Analytics**앱 아이콘을 클릭합니다.

Analytics 앱이 로드되면, **트래픽**, **보안**, **성능**, **DNS**, **Workers**, **Logs**(Enterprise 요금제 도메인 전용) 등 탭이 표시됩니다. 사용 가능한 지표는 아래의 _웹 사이트 지표 검토_를 참조하시기 바랍니다.

![웹 트래픽 데이터가 표시된 Cloudflare Dashboard의 Analytics 앱 UI](/images/support/hc-dash-analytics-dashboard_overview.png)

Pro, Business, Enterprise 요금제의 경우, 트래픽 탭 아래에 최신 웹 Analytics가 표시됩니다.

![Pro, Business, Enterprise 고객의 Cloudflare Analytics 대시보드 UI 스크린샷.](/images/support/hc-dash-analytics-web_traffic.png)

___

## 웹 사이트 지표 보기

이 섹션에서는 각 Apps 앱 탭에서 사용할 수 있는 지표에 대해 간략히 설명합니다. 진행하기 전에 각 탭에는 다음 사항들이 포함될 수 있으니 참고하시기 바랍니다.

-   기반이 되는 지표의 추가 범주를 표현하는 하나 이상의 패널,
-   특정 기간에 대해 지표를 필터링할 수 있는 드롭다운(패널의 오른쪽 상단). 선택할 수 있는 기간은 도메인이 연관된 Cloudflare 요금제에 따라 달라질 수 있습니다.

다음은 각 Analytics 앱 탭의 요약입니다.

### 트래픽

#### Free 요금제

이 지표에는 적법한 사용자 요청과 크롤러 및 위협이 포함됩니다. 트래픽 탭에는 다음과 같은 패널이 있습니다. 

-   **웹 트래픽** - _요청_, _대역폭_, _고유 방문자_, [_상태 코드_](https://support.cloudflare.com/hc/articles/206973867-Status-code-metrics-in-Cloudflare-Site-Analytics)에 대한 지표를 표시합니다. Cloudflare Workers를 사용하는 경우에는 **Workers** 탭에서 하위 요청 분석이 제공됩니다.
-   **국가별 웹 트래픽 요청** - 요청 수를 국가별로 보여주는 대화식 맵입니다.  이 패널에는 요청 수가 가장 많은 국가(데이터가 있는 경우 최대 5개)를 표시하는 **상위 트래픽 국가/지역** 의 데이터 테이블도 포함됩니다.
-   **통계 공유 -** _저장된 바이트 수,_ _제공된 SSL 요청_, _차단한 공격_에 대해 실제 통계를 소셜 미디어(Twitter)에 공유할 수 있습니다.

#### Pro, Business, Enterprise 요금제

Analytics는 Cloudflare의 에지 로그를 기반으로 하며 타사 스크립트 또는 트래커가 필요 없습니다. 트래픽 탭에는 다음과 같은 지표가 있습니다.

-   **방문** - 방문은 다른 웹 사이트 또는 직접 링크에서 시작된 페이지 조회로 정의됩니다. Cloudflare는 HTTP 참조자가 호스트 이름과 일치하지 않는지 점검합니다. 1회의 방문은 다수의 페이지 조회로 구성될 수 있습니다.
-   **페이지 조회** - 페이지 조회는 HTML 콘텐츠 유형에 대한 성공적인 HTTP 응답으로 정의됩니다.
-   **요청** - HTTP 요청. 일반적인 페이지 보기에는 다수의 요청이 필요합니다.
-   **데이터 전송** - 요청에서 전송된 전체 HTTP 데이터.

자세한 메트릭을 보려면 **필터 추가**를 클릭합니다. 각 지표를 **참조자**, **호스트**, **국가**, **경로**, **상태 코드**, **원본 상태 코드**, **브라우저**, **운영 체제**, **장치 유형**에 따라 필터링할 수도 있습니다.

기간을 변경하려면 그래프 위의 드롭다운 메뉴를 사용합니다. 그래프 자체를 끌어 확대/축소할 수도 있습니다.

### 보안

이 탭에에 표시되는 차트의 수와 유형은 기존 데이터 및 고객 요금제에 따라 다를 수 있습니다. 이 탭에 있는 대부분의 지표는 Cloudflare 방화벽 앱에서 가져옵니다. 다음 패널이 제공됩니다.

-   **위협** - 사이트에 대한 위협을 표시하는 데이터 요약 및 영역 차트가 표시됩니다.
-   **국가별 위협** - 위협이 발생한 국가를 강조하여 표시하는 대화식 맵입니다. **상위 위협 국가/지역** 및 **상위 크롤러/봇**에 대한 통계가 있는 데이터 테이블도 포함됩니다.
-   **속도 제한**(추가 기능 서비스) - 속도 제한에 따라, 기준과 일치하여 차단된 요청을 강조 표시하는 선형 차트가 제공됩니다. 자세한 내용은 [속도 제한 분석](https://support.cloudflare.com/hc/ko/articles/115003414428-Rate-Limiting-Analytics)을 참조하시기 바랍니다.
-   **개요** - **차단한 전체 위협**, **SSL을 통한 트래픽 수신**, **미완료 위협 유형**에 대한 일련의 원형 차트가 표시합니다. 펼칠 수 있는 **세부사항** 링크가 제공되는 경우, 숫자 데이터의 표가 표시됩니다.

### 성능

이 탭에서 집계되는 지표는 다수의 Cloudflare 서비스에서 가져온 것입니다. 다음 패널이 제공됩니다.

-   **원본 성능(Argo)**(추가 기능 서비스) - 지난 48시간 동안 Cloudflare 에지 네트워크와 원본 서버 간의 응답 시간에 관련된 지표가 표시됩니다. 자세한 내용은 [Argo Analytics](https://support.cloudflare.com/hc/articles/115001255631-Argo-Analytics)를 참조하시기 바랍니다.
-   **개요** - **사용된 클라이언트 HTTP 버전**, **절약된 대역폭**, **콘텐츠 유형 내역**에 대한 일련의 원형 차트가 표시됩니다. 펼칠 수 있는 **세부사항** 링크가 제공되는 경우, 숫자 데이터의 표가 표시됩니다.

### DNS

DNS 탭은 DNS 쿼리에 대한 몇 가지 통계를 제공합니다. 사이트를 Cloudflare가 의해 프록시하지 않는 경우에도 Cloudflare가 사이트의 권한 있는 DNS 서버라면 지표를 이용할 수 있습니다. 따라서 [CNAME 설정](https://support.cloudflare.com/hc/articles/360020348832-Understanding-a-CNAME-Setup)된 사이트에 대해서는 DNS 메트릭이 제공되지 않습니다.

DNS 탭에서 이용할 수 있는 지표 패널은 다음과 같습니다.

-   **DNS 쿼리** - _응답 코드_나 _레코드 유형_별 쿼리와 _NXDOMAIN_ 응답(DNS 레코드가 없음)을 반환한 레코드 등 DNS 레코드 지표에 대한 일련의 영역 차트와 데이터 테이블이 표시됩니다. 상단의 드롭다운에 레코드 이름(예: www.example.com)을 입력하여 하나 이상의 DNS 레코드로 필터링할 수 있습니다.
-   **데이터 센터별 DNS 쿼리** - Cloudflare의 데이터 센터에 대한 DNS 퀴리의 분포를 확인할 수 있습니다. 지표는 대화식 맵 및 데이터 테이블로 표시되며 _트래픽_, _NXDOMAIN_, _NOERROR_에 대한 통계가 포함합니다.

### Workers

이 패널에는 Cloudflare Workers의 지표가 표시됩니다. 자세한 내용은 [Workers를 이용한 Cloudflare Analytics](https://support.cloudflare.com/hc/articles/360007553512-Cloudflare-analytics-with-Workers)를 참조하시기 바랍니다.

### 로그

Logs 탭은 지표 기능이 아닙니다. 대신, Enterprise 요금제 고객은 [Cloudflare Logs Logpush](/logs/about/) 서비스를 사용할 수 있습니다. Logpush를 사용하면, 선택한 분석 도구를 사용하여 데이터를 다운로드하고 분석할 수 있습니다.

___

## 관련 자료

-   [Cloudflare Analytics: 개요](/analytics)
-   [Cloudflare Analytics GraphQL API](/analytics/)
