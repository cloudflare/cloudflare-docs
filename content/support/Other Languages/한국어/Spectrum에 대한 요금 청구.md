---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360041721872-Spectrum%EC%97%90-%EB%8C%80%ED%95%9C-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC
title: Spectrum에 대한 요금 청구
---

# Spectrum에 대한 요금 청구

-   [Spectrum에 대한 요금 청구](https://support.cloudflare.com/hc/ko/articles/360041721872-Spectrum%EC%97%90-%EB%8C%80%ED%95%9C-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC "Spectrum에 대한 요금 청구")
-   [추가 서비스에 대한 요금 청구 이해](https://support.cloudflare.com/hc/ko/articles/115004555148-%EC%B6%94%EA%B0%80-%EC%84%9C%EB%B9%84%EC%8A%A4%EC%97%90-%EB%8C%80%ED%95%9C-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC-%EC%9D%B4%ED%95%B4 "추가 서비스에 대한 요금 청구 이해")
-   [Cloudflare Apps 요금 청구](https://support.cloudflare.com/hc/ko/articles/115000304671-Cloudflare-Apps-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC "Cloudflare Apps 요금 청구")
-   [Argo 요금 청구](https://support.cloudflare.com/hc/ko/articles/115000224192-Argo-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC "Argo 요금 청구")
-   [Cloudflare Load Balancing의 요금 청구](https://support.cloudflare.com/hc/ko/articles/115005254367-Cloudflare-Load-Balancing%EC%9D%98-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC "Cloudflare Load Balancing의 요금 청구")
-   [Cloudflare Rate Limiting의 요금 청구](https://support.cloudflare.com/hc/ko/articles/115000272247-Cloudflare-Rate-Limiting%EC%9D%98-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC "Cloudflare Rate Limiting의 요금 청구")
-   [Cloudflare Stream 요금 청구](https://support.cloudflare.com/hc/ko/articles/360016450871-Cloudflare-Stream-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC "Cloudflare Stream 요금 청구")

## Spectrum에 대한 요금 청구

_Cloudflare Spectrum의 요금이 어떻게 계산되는지 자세히 알아보세요._

___

## 개요

Cloudflare Spectrum으로 Cloudflare의 네트워크를 통해 TCP/UDP 트래픽을 프록시 설정할 수 있습니다.  Spectrum은 SSH 및 RDP 트래픽을 DDoS 공격으로부터 보호하고 네트워크 성능을 개선합니다. 

Spectrum은 도메인별로 요금을 부과하며, 프로 요금제의 경우 5GB, 비즈니스 및 기업 요금제의 경우 10GB를 무료로 제공합니다.

___

Spectrum은 유료 요금제 유형에 따라 최대 5GB 또는 10GB 트래픽까지 무료입니다.  요금제별 무료 트래픽 양을 초과한 후에는, Spectrum을 통과하는 트래픽 1GB마다 1달러가 부과됩니다.

각 도메인마다 프로토콜(SSH, Minecraft, RDP) 중 하나를 보호할 수 있습니다. 비즈니스 및 기업 요금제 사용자는 세 프로토콜을 모두 보호할 수 있지만 프로 요금제 사용자는 SSH와 Minecraft만 보호할 수 있습니다.  사용량은 프로토콜 전체에서 합산되며, Spectrum 사용량은 원하는 방식으로 할당할 수 있습니다.

예를 들어 비즈니스 요금제(10GB까지 무료 제공)를 사용 중이고 Spectrum을 통해 SSH 3GB, RDP 3GB, Minecraft 5GB 트래픽이 통과한 경우(3 + 3 + 5 = 11GB), 월간 요금으로 1달러가 부과됩니다(10GB 무료, 11 - 10 = 1GB에 대해 1달러 부과).

### 요금제별 가격

[Spectrum을 활성화하면](/spectrum/getting-started/getting-started/) 다음과 같이 가격이 적용됩니다.

| 요금제 | 프로토콜 | 무료 제공 | 무료 제공 이후 요금 | 최대 동시 연결 |
| --- | --- | --- | --- | --- |
| 프로 | SSH, Minecraft | 5GB | 1달러/GB | 10 |
| 비즈니스 | SSH, Minecraft, RDP | 10GB | 1달러/GB | 100 |
| 기업 | SSH, Minecraft, RDP | 10GB | 1달러/GB | 100 |

___

## 관련 자료

-   [Spectrum 개발자 문서](/spectrum/getting-started/)
