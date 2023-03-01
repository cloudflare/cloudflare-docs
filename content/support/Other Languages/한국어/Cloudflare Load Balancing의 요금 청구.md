---
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115005254367-Cloudflare-Load-Balancing%EC%9D%98-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC
title: Cloudflare Load Balancing의 요금 청구
---

# Cloudflare Load Balancing의 요금 청구

## Cloudflare Load Balancing의 요금 청구

_Cloudflare Load Balancing의 요금이 어떻게 계산되는지 자세히 알아보세요._

___

## 개요

**Cloudflare Load Balancing**은 원본 웹 서버와 풀에 대해 DNS 기반 부하 분산과 능동 상태 검사를 제공합니다. Cloudflare Load Balancing을 사용하면 계정 수준에서 요금이 청구됩니다. 구성된 Load Balancer별로 매달 DNS 요청 개수("쿼리")를 계산하여 월간 구독 요금에 추가됩니다.

계정 내 모든 Load Balancer에서 공유된 처음 500,000개의 쿼리는 무료입니다. 이를 넘어 추가 사용한 경우 500,000개 쿼리당 50센트가 부과되고 500,000개 단위로 요금이 올라갑니다.

예를 들면 다음과 같습니다.

-   81,451개의 DNS 쿼리 = 구독 요금 + 0달러(사용량).
-   511,881개의 DNS 쿼리 = 구독 요금 + 0.50달러(사용량)
-   2,994,155개의 DNS 쿼리 = 구독 요금 + 2.50달러(사용량)

첫  500,000개 쿼리는 사이트(도메인)가 아니라 계정 내에 활성화된 Load Balancer 전체에 기반합니다. Load Balancer는 CNAME 레코드를 구성하여 여러 사이트에서 공유할 수 있기 때문입니다.

___

Cloudflare Load Balancing 구독 요금은 선택된 구독 옵션에 따라 월간 5-50달러에서 시작합니다.

원본 개수, 상태 검사 빈도, 검사 지역 개수, 지오 라우팅에 따라 특정 요건에 맞게 Load Balancing을 구성할 수 있습니다.

5달러의 구독인 경우, Cloudflare 계정당 원본 2개, 풀당 원본 5개, 60초 상태 검사, 1개 지역에서 검사를 구성할 수 있으며, 이는 단순한 부하 분산이나 장애 조치에 이상적입니다. 동일한 원본 IP 주소를 포함하는 상이한 풀은 계정의 고유 원본으로 간주됩니다.

원본당 월별 5달러를 지불하면 추가 원본을 이용할 수 있습니다. 20개가 넘는 원본을 이용하려는 경우 [영업팀에 문의하시기 바랍니다.](https://www.cloudflare.com/lp/dashboard-ss-load-balancing/)

___

## Load Balancing 청구 대상 사용량

사용량은 사용자가 구성한 부하 분산된 호스트 이름마다, Cloudflare의 이름 서버에 대한 권한 있는 [DNS 쿼리](https://en.wikipedia.org/wiki/Domain_Name_System)개수로 산정합니다.

HTTP(S) 서비스에 대해 Load Balancer를 "프록시 설정됨"(오렌지색 구름)으로 구성하면, 권한 있는 DNS 쿼리 개수를 줄일 수 있습니다. 이렇게 하면 외부 DNS TTL이 5분으로 설정되고 장애 조치 성능이, 매우 짧은 DNS TTL과 동일하게 유지됩니다. [프록시 설정됨(오렌지색 구름)과 프록시 설정 안 됨(회색 구름)에 대한 자세한 내용을 알아보세요.](https://support.cloudflare.com/hc/ko/articles/115005138088-Load-Balancing-TTLs-and-Orange-vs-Grey-Cloud)

### 기업 요금제 고객에 대한 요금 청구

기업 요금제 고객은 Cloudflare 기업 영업팀과 논의한 내용을 바탕으로 요금이 부과됩니다. 기업 고객은 다음과 같은 추가 기능을 이용할 수 있습니다.

-   [모든 Cloudflare 데이터센터](https://www.cloudflare.com/network/)에서 상태 검사 실행(상세 장애 조치 강화를 위해)
-   데이터 센터별 스티어링(특정 위치를 사용하는 경우 원본과 원본 순서 재정의)
-   상태 검사 간격 5초
-   20개를 초과하는 원본 서버 지원
-   Cloudflare 기업 지원(상시 이메일, 전화, 지명 솔루션 엔지니어 포함)
