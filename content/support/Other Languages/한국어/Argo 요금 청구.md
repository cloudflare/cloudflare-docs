---
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115000224192-Argo-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC
title: Argo 요금 청구
---

# Argo 요금 청구

## Argo 요금 청구

_Argo 요금이 어떻게 계산되는지 알아보세요._

___

## 개요

Argo는 웹 트래픽 라우팅 결정을 분석하고 최적화하여 도메인의 로드 속도를 높입니다.

Argo는 월 단위로 요금이 청구되기 때문에, Cloudflare와 Argo를 사용하는 도메인별 방문자 사이의 데이터 전송량(업로드 및 다운로드 대역폭 모두)에 따라 요금이 부과됩니다.

Argo는 또한 사용량에 기반하기 때문에 청구서에는 이전 달의 사용량이 반영됩니다. 예를 들어, 9월 청구서에는 8월 Argo 사용량에 대한 요금이 포함됩니다.

___

Argo 요금 청구에는 캐시 적중과 Cloudflare 네트워크에 대한 요청 및 응답에 대한 요금이 포함됩니다.

Cloudflare dashboard에서 Argo를 활성화하면 매달 5.00달러가 청구됩니다. Cloudflare와 방문자 사이에 처음으로 1GB의 트래픽을 전송한 후, 1GB당 0.10 달러가 추가로 부과됩니다.

대시보드의 **Traffic** 앱에서 Argo를 켜고 끄더라도 여러 번 요금이 부과되지 않습니다.

하지만 **요금 청구** 탭 아래 _구독_ 섹션에서 Argo 구독을 취소한 후 다시 활성화하면 요금이 여러 번 부과됩니다.

다음은 예상 트래픽에 따른 예상 가격입니다.

<table><tbody><tr><td><p><strong>예상 트래픽</strong></p></td><td><p><strong>예상 비용(도메인별)</strong></p></td></tr><tr><td><p>&lt; 1GB</p></td><td><p>5달러</p></td></tr><tr><td><p>10GB</p></td><td><p>5.90달러</p></td></tr><tr><td><p>100GB</p></td><td><p>14.90달러</p></td></tr><tr><td><p>1TB(1,000GB)</p></td><td><p>104.90달러</p></td></tr><tr><td><p>10TB</p></td><td><p>1,004.90달러</p></td></tr></tbody></table>
