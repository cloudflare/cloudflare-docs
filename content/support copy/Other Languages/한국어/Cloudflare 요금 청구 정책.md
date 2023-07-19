---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360025829831-Cloudflare-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC-%EC%A0%95%EC%B1%85
title: Cloudflare 요금 청구 정책
---

# Cloudflare 요금 청구 정책

## Cloudflare 요금 청구 정책

_Cloudflare 요금 청구 정책이 어떻게 계정과 연계된 도메인, 요금제, 추가 서비스에 적용되는지 알아보세요._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/360025829831-Cloudflare-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC-%EC%A0%95%EC%B1%85#12345679)
-   [Cloudflare 유료 요금제 업그레이드 또는 다운그레이드](https://support.cloudflare.com/hc/ko/articles/360025829831-Cloudflare-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC-%EC%A0%95%EC%B1%85#12345680)
-   [기업 요금제의 청구 및 결제](https://support.cloudflare.com/hc/ko/articles/360025829831-Cloudflare-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC-%EC%A0%95%EC%B1%85#12345682)
-   [승인된 결제 방법](https://support.cloudflare.com/hc/ko/articles/360025829831-Cloudflare-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC-%EC%A0%95%EC%B1%85#12345683)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/360025829831-Cloudflare-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC-%EC%A0%95%EC%B1%85#12345684)

___

## 개요

Cloudflare 요금제와 추가 서비스는 계정 내 도메인별로 30일마다 청구됩니다.

Cloudflare도 현지 법에 따라 판매세를 징수합니다. 판매세는 Cloudflare 계정에 저장된 배송 또는 청구 주소의 9자리 우편번호에 따라 산정됩니다.

Cloudflare는 계정에 추가된 모든 도메인과 관련하여 요금제와 구독(또는 추가 서비스)에 대해 별도 청구서를 발행합니다.

예를 들어 test1.com 및 test2.com 이동일한 Cloudflare 계정에 추가되어 Pro 요금제로 업그레이드되면 20달러 요금이 두 개 포함된 청구서 하나를 받게 됩니다.  blog.test1.com 이나 blog.test2.com 같은하위 도메인은 청구 대상 도메인이 아닙니다.

유료 요금제나 추가 서비스를 시작한 날짜에 청구 기간이 시작되며, 이 날짜가 [청구서 날짜](https://support.cloudflare.com/hc/articles/205610698)가 됩니다. 예를 들어 1월 10일에 요금제를 업그레이드하면, 향후 요금제 요금은 매달 10일에 청구됩니다.

유료 요금제, 구독 또는 추가 서비스를 주문하는 경우 다음 사항에 동의해야 합니다.

_귀하는 "활성화"를 클릭함으로써 다음 월간 청구 기간이 시작하기_ _**전에**_ _계정 대시보드에서 취소하지 않으면, 선택한 구독 요금제 레벨 및/또는 추가 서비스의 가격이 정기 요금으로 지정한 결제 방법에 청구되는 지속적인 월별 구독을 구매한다는 것에 동의합니다._

_**전체 월 기간에 대해 요금이 청구되며 이 기간 동안 취소하면 환불을 받을 수 없습니다.귀하는 구독을 구매함으로써 최소 1개월의 의무 구매 기간에 동의한 것입니다.**_

___

도메인이 유료 요금제(예: 프로) 상에 있고 높은 요금제(예: 비즈니스)로 업그레이드하는 경우

-   청구서는 청구 주기가 끝날 때까지 높은 요금제를 비례 적용합니다.
-   Cloudflare는 청구 주기가 끝날 때까지 낮은 요금제를 비례 적용합니다.
-   다음 청구 주기가 시작되면, 청구서는 높은 요금제의 전체 비용을 반영합니다.

예를 들어 청구일이 1월 1일이고 1월 15일에 프로 요금제에서 비즈니스 요금제로 업그레이드한 경우,

-   청구서는 1월 15일부터 1월 30일까지 사용 기간에 대해 비즈니스 요금제를 비례 반영합니다(100달러).
-   또한, 1월 1일부터 1월 15일까지 사용 기간에 대해 프로 요금제를 비례 청구합니다(10달러).
-   1월 31일에 Cloudflare dashboard에, 1월 1일부터 1월 30일까지 청구 기간에 대한 110달러가 표시됩니다.

도메인이 유료 요금제(예: 비즈니스) 상에 있고 낮은 요금제(예: 프로)로 다운그레이드하는 경우

-   현재 청구 서비스 기반이 종료되면, 현재의 요금제 유형과 상위 등급 Cloudflare 요금제의 기능이 다운드레이드됩니다. 
-   다음 청구 서비스 기간에는 하위 등급 요금제 및 기능 요율로 청구될 것입니다.

예를 들어 청구일이 2월 1일이고 2월 15일에 비즈니스 요금제에서 프로 요금제로 다운그레이드한 경우

-   비즈니스 플랜 기능 및 서비스를 3월 1일까지 이용할 수 있습니다.
-   3월 요금제 비용은 20달러 감소할 것입니다.

___

## 기업 요금제의 청구 및 결제

기업 고객은 Cloudflare 계정팀과 협력하여 자신의 필요에 가장 적절한 요금제와 서비스 계약을 수립합니다. Cloudflare 회계팀이 기업 요금제 요금을 접수하고 처리합니다.

기업 요금제 계정 소유자는 Cloudflare 회계팀으로부터 직접 청구서를 받습니다.

___

## 승인된 결제 방법

Cloudflare는 VISA, MasterCard, American Express, Discover, Paypal만 수용합니다. 다른 결제 방법(예: Union Pay 또는 Maestro)은 현재 사용할 수 없습니다.

유효한 결제 방법을 사용하는지 확인한 후 요금제 유형을 변경하거나 구독을 활성화하세요.

___

## 관련 자료

-   [Cloudflare 셀프 서비스 구독 약정](https://www.cloudflare.com/terms/)
-   [Cloudflare 청구서 이해](https://support.cloudflare.com/hc/en-us/articles/205610698-Understanding-Cloudflare-Invoices)
-   [Cloudflare 판매세 이해](https://support.cloudflare.com/hc/en-us/articles/360026135951-Understanding-Cloudflare-sales-tax)
