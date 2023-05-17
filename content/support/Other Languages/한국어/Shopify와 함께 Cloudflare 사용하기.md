---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/203464660-Shopify%EC%99%80-%ED%95%A8%EA%BB%98-Cloudflare-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
title: Shopify와 함께 Cloudflare 사용하기
---

# Shopify와 함께 Cloudflare 사용하기

## Shopify와 함께 Cloudflare 사용하기

_Shopify의 Cloudflare 보안 및 성능 이점 외에 개인 Cloudflare 계정을 Shopify 판매자로 설정하는 방법을 알아봅니다._

___

## 개요

Cloudflare는 Shopify와 제휴하여 모든 Shopify 판매자 웹 사이트에 Cloudflare의 성능 및 보안 혜택을 제공하고 있습니다. 또한, Shopify 판매자가 Cloudflare Enterprise 요금제를 이용하는 경우 이 계정을 이용해 웹 트래픽을 Cloudflare로 프록시할 수 있습니다. Shopify의 Cloudflare 혜택 외에 자체 계정으로 Cloudflare를 사용하는 경우를 O2O(Orange-to-Orange)라고 합니다. O2O는 사용자와 Shopify의 보안 설정을 모두 적용합니다.

![Cloudflare에서 Shopify 판매자에게 O2O가 작동하는 방식을 나타내는 그림.](/support/static/hc-ext-shopify_o2o.png)

___

## Shopify웹 사이트에서 O2O 활성화

Cloudflare Enterprise 요금제에서만 O2O를 활성화할 수 있습니다.

계정에서 O2O를 활성화하려면 shops.myshopify.com 도메인을 가리키는 A 또는 CNAME DNS 레코드가 필요합니다. 레코드를 오렌지색 구름으로 변경합니다.

프록시가 활성화된 DNS 레코드를 추가한 후 계정 팀에 문의하여 쇼핑 도메인에서 O2O를 활성화할 수 있습니다.

___

## 모범 사례

O2O와 함께 사용하는 경우 특정 Cloudflare 기능은 구매자에게 트래픽 흐름을 방해하거나 잘못된 데이터를 방문자에게 표시할 수 있습니다. 즉, 다음을 수행해야 합니다.

-   다음 Cloudflare 기능은 사용하지 않는다.
    -   [HTML 캐싱](/cache/)
    -   [사용자 정의 방화벽 규칙](/firewall/)
    -   [속도 제한](https://support.cloudflare.com/hc/articles/115001635128)
    -   [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552)
    -   [부하 분산](/load-balancing/)
    -   [IPv6](https://support.cloudflare.com/hc/articles/229666767)
-   다음 Cloudflare 기능에 주의하십시오.
    -   [페이지 규칙](https://support.cloudflare.com/hc/articles/218411427): Shopify에 사용되는 서브도메인과 일치하는 올바르게 구성된 페이지 규칙은 웹 사이트에 대한 전자 상거래 방문자의 플로우를 차단하거나 왜곡할 수 있습니다.
    -   [Workers](/workers/): Page Rules와 유사하게 Workers도 웹 사이트의 트래픽 흐름을 방해하여 결과적으로 매출이 낮아질 수 있습니다. Workers 이용 시 주의가 필요합니다. Shopify에 사용되는 하위 도메인은 Workers 경로에서 제외하는 것이 좋습니다.
    -   [DNS CAA 레코드](/ssl/edge-certificates/caa-records/): Shopify는 Let’s Encrypt를 이용하여 상인들에게 SSL/TLS 인증서를 발급합니다. DNS CAA 레코드를 추가하는 경우 Let's Encrypt를 인증 기관(CA)으로 선택해야 하며 그렇게 하지 않으면 HTTPS 연결이 실패할 수 있습니다.

___

## 추가 도움말

자체 Cloudflare 계정을 설정하는 Shopify 판매자인 경우 계정 팀 또는 Cloudflare 지원팀에 문의하여 문제를 해결하시기 바랍니다. Cloudflare는 Cloudflare가 해결할 수 없는 기술적인 문제가 있는 경우 Shopify에 의지합니다.

-   [Cloudflare 지원팀에 문의](https://support.cloudflare.com/hc/ko/articles/200172476-Contacting-Cloudflare-Support)
