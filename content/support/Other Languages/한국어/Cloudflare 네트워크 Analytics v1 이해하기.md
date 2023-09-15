---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0
title: Cloudflare 네트워크 Analytics v1 이해하기
---

# Cloudflare 네트워크 Analytics v1 이해하기

_Magic Transit 및 Cloudflare Spectrum 고객이 계정 수준에서 제공되는 Network Analytics를 이용해 계층 3과 4의 트래픽 및 DDoS 공격에 대한 세부 사항을 어떻게 분석하는지 알아봅니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#7rrlY887ZX7ZDVmx2V4bcm)
-   [네트워크 Analytics 보기](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#7x2T95w9RGgg782pVMujPb)
-   [네트워크 Analytics 탐색](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_3WlP6WsWFl28h92oS2k8O2)
-   [데이터에 필터 적용](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_4Agjkc3QlLuhrCW43NsN3p)
-   [플로팅할 차원 선택](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_4UZtmYClrU0N7OYwZgHHoh)
-   [활동 로그 보기](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_6GOQ2ficyicPxirroGewJP)
-   [로그 데이터 및 보고서 내보내기](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_3grb6OPVreABUQaQBekfHn)
-   [한계](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_6tCVFw0V6ufdvQnRIxu19t)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#7flIreW1Np8fuxZYTbduF2)
-   [FAQ(질문과 대답)](https://support.cloudflare.com/hc/ko/articles/360038696631-Cloudflare-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-Analytics-v1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0#h_2CqXhNxV03M5IUwklSR3n6)

___

## 개요

네트워크 Analytics에 액세스하려면 다음이 필요합니다.

-   Cloudflare Enterprise 요금제
-   Cloudflare [Magic Transit](/magic-transit/) 또는 [Spectrum](/spectrum/).

Cloudflare **네트워크 Analytics** 보기에서는 네트워크 계층과 통신 계층의 트래픽 패턴 및 DDoS 공격에 대해 거의 실시간 가시성이 제공됩니다. Network Analytics는 [GraphQL Analytics API](/analytics/graphql-api/)를 통해 제공되는 것과 동일한 패킷 및 비트 수준 데이터를 가시화합니다.

![유형별 패킷 요약 정보가 표시된 Analytics 화면](/images/support/na-main-dashboard.png)

네트워크 Analytics을 이용하면 악의적인 트래픽의 보고 및 조사 속도를 높일 수 있습니다. 다음 매개변수로 데이터를 필터링할 수 있습니다.

-   Cloudflare에서 취한 완화 조치
-   소스 IP, 포트, ASN
-   대상 IP 및 포트
-   Cloudflare 데이터 센터의 도시 및 해당 트래픽이 관찰된 국가
-   공격 규모, 유형, 속도, 지속 기간
-   TCP 플래그 
-   IP 버전
-   프로토콜

네트워크 Analytics를 통해 핵심 인텔리전스를 신속하게 파악할 수 있습니다.

-   네트워크를 대상으로 하는 상위 공격 벡터
-   조치별로 구분된 시간에 따른 트래픽 완화
-   국가 또는 데이터 센터별 공격 출발지

___

**네트워크 Analytics** 보기는 Cloudflare 계정 홈 페이지에서 액세스할 수 있습니다.

**Network Analytics** 보기에 액세스하려면, 다음 절차를 따르면 됩니다.

1.  Cloudflare 계정에 로그인하세요.
2.  계정이 여러 개인 경우 Magic Transit 또는 Spectrum에 액세스할 수 있는 계정을 선택하세요.
3.  계정 **홈** 페이지에서 **네트워크 Analytics**를 클릭합니다.

___

## 네트워크 Analytics 탐색

### 헤드라인 요약 및 측면 패널

상단과 옆면의 패널에는 **시간 범위** 드롭다운 목록에서 선택한 기간 동안의 활동 요약이 표시됩니다.

![지난 24시간 동안의 활동을 요약하는 헤드라인 및 옆면 패털](/images/support/na-navigate.png)

헤드라인에는 총 패킷 또는 비트 수와 감지되고 완환된 공격 수가 표시됩니다. 진행 중인 공격이 있는 경우, 헤드라인에는 총 계수가 아니라 최대 패킷(또는 비트) 비율이 표시됩니다.

데이터 보기를 전환하려면, 옆면 패널의 **패킷** 또는 **비트**를 클릭합니다.

### 보기에 대한 시간 프레임 설정

**시간 범위** 드롭 다운 목록을 사용해 Network Analytics에 표시되는 데이터의 기간을 변경합니다. 시간 범위를 선택하면 선택 내용에 맞게 전체 내용이 변경됩니다.

_마지막 30분_을 선택하면 **네트워크 Analytics** 보기에 최근 30분 동안의 데이터가 표시되며 20초마다 새로 고쳐집니다. _실시간_ 알림이 통계량 드롭 다운 목록 옆에 표시되므로 보기가 자동으로 업데이트되고 있다는 것을 알 수 있습니다.

![네트워크 Analytics에서 활성화된 자동 새로 고침](/images/support/hc-dash-Network_Analytics-auto_refresh.png)

_사용자 정의 기간_ 옵션을 선택하면 지난 1년 중 30일 이하의 기간을 임의로 지정할 수 있습니다.

### 평균 속도 또는 전체 양 기준으로 보기 

드롭다운 목록에서 통계량을 선택하여 _평균 속도_ 및 _총 계수_ 간에 전환이 가능합니다. 

### IP 접두어 공지/취소 이벤트 표시

**주석 표시**를 이용하여 **네트워크 Analytics** 보기에서 IP 접두어의 공지/취소 이벤트에 대한 주석을 보이게 하거나 감출 수 있습니다. 각 주석을 클릭하면 자세한 내용이 표시됩니다.

![네트워크 Analytics 차트의 주석을 표시하기 위한 토글 버튼](/images/support/hc-dash-Network_Analytics-show_annotations.png)

### 패킷 요약 확대 

확대/축소하려면 차트 영역에서 마우스를 클릭하고 끄십시오. 이 기술을 사용하면 시간 범위를 3분까지로 확대할 수 있습니다.

![패킷 요약 확대 ](/images/support/unnamed.gif)

축소하려면 **시간 범위** 선택기에 있는 **시간 범위** 아이콘을 클릭합니다.

___

## 데이터에 필터 적용

다수의 필터 및 제외 사항을 적용하여 네트워크 Analytics에 표시되는 데이터의 범위를 조정할 수 있습니다.

필터는 네트워크 Analytics 페이지에 표시되는 모든 데이터에 영향을 줍니다.

네트워크 분석 데이터를 필터링하는 방법에는 **필터 추가** 단추를 사용하거나 **통계 필터**에서 하나를 클릭하는 두 가지가 있습니다.

### 필터 추가 버튼 사용

**필터 추가** 버튼을 클릭하면 **새 필터** 팝업이 열립니다. 필드, 연산자, 값을 입력하여 필터 식을 완성합니다. **적용**을 클릭하면, 내용이 변경됩니다.

필터를 적용할 때, 다음 가이드라인을 준수하십시오.

-   와일드카드는 지원되지 않습니다.
-   값을 따옴표로 묶지 않아도 됩니다.
-   ASN 번호를 지정할 때는 _AS_ 접두어를 넣지 않습니다. 예를 들어, _AS1423_이 아니라 _1423_을 입력합니다.

### stat 필터 사용

Network Analytics 통계량과 연관된 데이터 유형을 기반으로 필터링하려면 해당 통계량 위로 포인터를 가져갈 때 표시되는 **필터**와 **제외** 단추를 클릭합니다. 

이 예제에서는 **필터** 단추를 클릭하면 보기의 범위가 _허용_ 조치와 연관된 트래픽으로 제한됩니다.

### 적용된 필터로부터 Magic Firewall 규칙 생성

네트워크 Analytics에서 선택한 필터에 일치하는 모든 트래픽을 차단하도록 [Magic Firewall](/magic-firewall) 규칙을 작성할 수 있습니다. 현재 지원되는 필터는 다음과 같습니다.

-   대상 IP
-   프로토콜
-   소스 데이터 센터
-   소스 IP
-   TCP 플래그

다른 유형의 네트워크 Analytics 필터는 새 규칙 정의에 추가되지 않습니다. 그러나 Magic Firewall에서 추가로 규칙을 구성할 수 있습니다.

다음을 수행합니다.

1\. 네트워크 Analytics에 하나 이상의 필터를 적용합니다.

2\. **Magic Firewall 규칙 생성**을 클릭합니다.

![네트워크 Analytics의 방화벽 규칙 링크 생성](/images/support/hc-dash-Network_Analytics-create_firewall_rule.png)

선택한 필터 및 값과 함께 Magic Firewall 규칙 편집기가 표시됩니다.

3\. Magic Firewall 규칙 편집기에서 규칙 정의를 검토합니다.

4\. **새로 추가**를 클릭합니다.

### 지원되는 필드, 연산자, 값 

아래 표에는 네트워크 Analytics를 필터링하는 데 사용할 수 있는 필드, 연산자, 값의 범위가 정리되어 있습니다.

| 필드 | 연산자 | 값 |
| --- | --- | --- |
| 
작업

 | 

동일

동일하지 않음

 | 

\- 허용: Cloudflare의 자동화된 DDoS 방어 시스템을 통해 허용된 트래픽. 방화벽 규칙, flowtrackd, L7 규칙에 의해 완화되는 트래픽도 포함될 수 있습니다.

\- 차단: Cloudflare의 자동화된 DDoS 보호 시스템에 의해 차단된 트래픽.

\- 연결 추적: L7에만 적용(Magic Transit이 범위에서 제외되고 Magic Transit 접두어에 대해 conntract이 실행되지 않기 때문).

\- 속도 제한: 소스 IP, 서브네트 또는 모든 연결에 적용 가능. 이는 휴리스틱에 기초한 프로그램에 의해 결정됩니다.

\- 모니터링: 식별되었으나, 단순히 관찰만 하고 규칙을 적용하여 완화하도록 선택하지 않은 공격.

 |
| 

공격 ID

 | 

동일

동일하지 않음

 | 

공격 번호

 |
| 

공격 유형

 | 

동일

동일하지 않음

 | 

UDP 폭주

SYN 폭주

ACK 폭주

RST 폭주

LDAP 폭주

크리스마스 폭주

FIN 폭주

GRE 폭주

ICMP 폭주

 |
| 

대상 IP

 | 

동일

동일하지 않음

 | 

IP 주소

 |
| 

대상 포트

 | 

동일

동일하지 않음

이상

이상 또는 동일

이하

이하 또는 동일

 | 

포트 번호

포트 범위

 |
| 

대상 IP 범위

 | 

동일

동일하지 않음

 | 

IP 범위 및 마스크

 |
| 

IP 버전

 | 

동일

동일하지 않음

 | 

4 또는 6

 |
| 

프로토콜

 | 

동일

동일하지 않음

 | 

TCP

UDP

ICMP

GRE

 |
| 

소스 ASN

 | 

동일

동일하지 않음

 | 

AS 번호

 |
| 

소스 국가

 | 

동일

동일하지 않음

 | 

국가명

 |
| 

소스 데이터 센터

 | 

동일

동일하지 않음

 | 

데이터 센터 위치

 |
| 

소스 IP

 | 

동일

동일하지 않음

 | 

IP 주소

 |
| 

소스 포트

 | 

동일

동일하지 않음

이상

이상 또는 동일

이하

이하 또는 동일

 | 

포트 번호

포트 범위

 |
| 

TCP 플래그

 | 

동일

동일하지 않음

Contains

 | 

SYN, SYN-ACK, FIN, ACK, RST

 |

___

## 플로팅할 차원 선택

다양한 차원을 따라 네트워크 Analytics 데이터를 플로팅할 수 있습니다. 기본적으로 네트워크 Analytics는 조치별로 구분된 데이터를 표시합니다.

**요약** 탭 중 하나를 선택하여 다른 차원에 따른 데이터를 볼 수 있습니다.

![다양한 차원에 따른 데이터 시각화](/images/support/unnamed__1_.gif)

다음 옵션 중 선택할 수 있습니다. 

-   작업
-   공격 유형
-   대상 IP
-   대상 포트
-   IP 버전
-   프로토콜
-   소스 ASN
-   소스 국가
-   소스 데이터 센터
-   소스 IP
-   소스 포트
-   TCP 플래그

### 네트워크 Analytics 필터 공유 

네트워크 Analytics 페이지에서 필터를 추가하고 시간 범위를 지정하면 해당 매개변수를 반영하도록 URL이 변경됩니다.

데이터 보기를 공유하려면 URL을 복사하여 다른 사용자에게 전송하면 되며 받는 사람도 동일한 보기로 작업할 수 있습니다.

![네트워크 Analytics 페이지의 URL 선택](/images/support/hc-dashboard-network-analytics-6.png)

___

## 활동 로그 보기

네트워크 Analytics **활동 로그**에는 현재 선택된 시간 범위 내의 로그 이벤트가 500개까지 표시되며 시간 범위 보기마다 페이지당 10개의 결과가 표시됩니다. ([GraphQL Analytics API](/analytics/graphql-api/)에는 이러한 제한이 없습니다.) 

이벤트 세부사항을 표시하려면 이벤트와 연관된 확장 위젯을 클릭하십시오.

### 열 구성

활동 로그에 표시되는 열을 구성하려면 **열 편집** 단추를 클릭합니다. 

이는 특히 DDoS 공격을 파악할 때 유용하며 이 동안에 (많은 속성 중) IP 주소, 최대 비트 전송률, 공격 ID 등의 원하는 속성을 지정할 수 있습니다.

### 상위 항목 보기

**소스 국가**, **소스**, **대상** 패널에는 각 보기의 가장 위 항목이 표시됩니다.

표시할 항목 수를 선택하려면 해당 보기에 관련된 드롭다운 목록을 이용합니다.

상위 데이터 센터를 보려면 **소스 국가** 보기의 드롭다운 목록에서 _데이터 센터_를 선택합니다. **소스 국가** 보기가 **소스 데이터 센터** 보기로 대체됩니다.

___

## 로그 데이터 및 보고서 내보내기

### 활동 로그 데이터 내보내기 

한 번에 최대 500개의 원시 이벤트를 활동 로그에서 내보낼 수 있습니다. 이 옵션은 보안 정보 및 이벤트 관리 시스템(SIEM) 등의 별도 시스템 또는 데이터베이스에 저장된 데이터와 함께 Cloudflare 데이터를 결합하여 및 분석해야 하는 경우에 유용합니다.

로그 데이터를 내보내려면 **내보내기**를 클릭합니다.

내보낼 데이터를 렌더링하기 위해 CSV 또는 JSON 형식을 선택합니다. 다운로드하는 파일 이름에는 선택된 시간 범위가

_network-analytics-attacks-\[start time\]-\[end time\].json 패턴으로 반영됩니다._

### 네트워크 Analytics 보고서 내보내기 

**네트워크 Analytics**에서 스냅샷 보고서를 인쇄하거나 다운로드하려면 다음 절차를 수행합니다.

**보고서 인쇄**를 클릭합니다. 웹 브라우저의 인쇄 인터페이스에 인쇄 또는 PDF 저장의 옵션이 표시됩니다.

___

## 한계

현재 네트워크 Analytics에는 다음과 같은 제한사항이 있습니다.

-   네트워크 Analytics v1을 통해 [서비스 거부 데몬(dosd)](https://blog.cloudflare.com/who-ddosd-austin/) 공격에 대한 통찰력을 얻을 수 있습니다. 데이터를 적시에 볼 수는 있지만, 모든 이벤트를 완전하게 볼 수는 없습니다.
-   다음 데이터 소스는 네트워크 Analytics에서 제공되지 않습니다.
    -   방화벽 규칙_(Network Analytics v2에서 제공)_
    -   응용 프로그램 계층 규칙
    -   게이트키퍼 및 수동으로 적용된 규칙
    -   [flowtrackd](https://blog.cloudflare.com/announcing-flowtrackd/)(고급 TCP 보호)_(Network Analytics v2에서 제공)_
    -   WARP 트래픽 및 [오렌지색 구름으로 표시된 트래픽](https://support.cloudflare.com/hc/ko/articles/205177068)
-   CDN 등 Cloudflare 서비스가 프록시하는 데이터는 네트워크 Analytics에서 제공되지 않습니다.

___

## 관련 자료

-   [Cloudflare 네트워크 Analytics v2](/analytics/network-analytics/)
-   [Network Analytics v1에서 Network Analytics v2로 마이그레이션하기](/analytics/graphql-api/migration-guides/network-analytics-v2)
-   [Cloudflare GraphQL API](/analytics/graphql-api/)
-   [Cloudflare Analytics: 개요](https://support.cloudflare.com/hc/articles/360037684111)
-   [IANA 포트 번호 및 서비스 이름](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=1)

___

## FAQ(질문과 대답)

### Cloudflare가 네트워크 Analytics 포털에서 데이터를 보유하는 기간

Network Analytics v2(NAv2)를 이용하는 경우 **90일**까지의 이력 데이터를 쿼리할 수 .

Network Analytics는 v1(NAv1)은 GraphQL 노드를 사용하여 1분, 1시간, 1일 IP 플로우로 데이터를 갱신합니다. 예를 들어, ipFlows1mGroups 노드는 분 단위 총량으로 데이터를 저장한다.

NAv1에서 쿼리할 수 있는 과거 데이터의 범위를 파악하려면 다음 표를 이용하면 됩니다. _**notOlderThan**_ 열은 보유 기간을 표시합니다.

| 
GraphQL 데이터 노드

 | 

maxDuration\*

 | 

notOlderThan\*\*

 | 

네트워크 Analytics에서의 시간 범위 선택

 | 

데이터 포인트 수

 |
| --- | --- | --- | --- | --- |
| 

ipFlows1mGroup

 | 

25시간

 | 

30일

 | 

30분

 | 

30

 |
| 

6시간

 | 

71

 |
| 

12시간

 | 

48

 |
| 

24시간

 | 

96

 |
| 

ipFlows1dGroups

 | 

6개월

 | 

1년

 | 

1주

 | 

168

 |
| 

1개월

 | 

30

 |

_**\*maxDuration**__은 하나의 쿼리에서 요청할 수 있는 시간대(데이터 노드에 따라 다름)를 정의합니다._

_**\*\* notOlderThan**__을 이용하면 쿼리로 검색할 수 있는 과거 기간이 제한됩니다. 데이터가 Cloudflare 데이터베이스에 얼마나 오래 있는지를 나타냅니다._

대시보드에서 공격 로그에 대해 작업할 때는 다음 사항에 주의하시기 바랍니다.

-   공격 로그는 최소, 최대, 평균 데이터 속도에 대한 시작 및 종료 타임스탬프, 패킷 및 비트 통계량, 총량, 공격 유형, 취해진 조치 등과 함께 저장됩니다. 
-   소스 IP 주소는 개인 식별 정보로 간주됩니다. 그러므로 Cloudflare는 소스 IP 주소를 30일간만 보관합니다. 30일이 지나면 소스 IP 주소는 폐기되며 해당 로그는 먼저 1시간 그룹, 이어서 1일 그룹으로 롤업됩니다. 1시간 롤업은 6개월 간 보관됩니다. 1일 롤업은 1년 간 보관됩니다.

로그 데이터에 대한 쿼리 및 액세스에 대한 자세한 정보는 [GraphQL Analytics API](/analytics/graphql-api/limits).를 참조하시기 바랍니다.

### 네트워크 Analytics에서 대상 IP가 "사용 불가"라고 나오는 이유는 무엇입니까?

대상 IP가 Cloudflrae의 [DDoS 방어 시스템](https://blog.cloudflare.com/mitigating-a-754-million-pps-ddos-attack-automatically/)에서 생성된 실시간 서명에 포함되지 않은 경우 해당 _사용 불가_로 표시됩니다.

대상 IP를 보려면 **공격 ID**로 필터링한 후 상위 항목 목록에서 **대상** 섹션으로 스크롤하면 됩니다. 특정 공격 ID에 대해 필터링하면 네트워크 Analytics 대시보드 전체가 공격 보고서로 변경됩니다.
