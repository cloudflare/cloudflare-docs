---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115000272247-Cloudflare-Rate-Limiting%EC%9D%98-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC
title: Cloudflare Rate Limiting의 요금 청구
---

# Cloudflare Rate Limiting의 요금 청구

## Cloudflare Rate Limiting의 요금 청구

_Cloudflare Rate Limiting 요금이 어떻게 계산되는지 알아보세요._

___

## 개요

[Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128)은 특정 URL이나 전체 도메인에 대한 과도한 요청 속도를 자동으로 파악하고 완화합니다.  Rate Limiting은 [DDoS](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/)와 [무차별 암호 대입 공격](https://www.cloudflare.com/learning/bots/brute-force-attack/)으로부터 보호하고 포럼 검색, API 호출, 원본의 데이터베이스를 집중 사용하는 자원에 대한 액세스를 제한합니다. 

기업 요금제 고객에게는 약정에 따른 정액제가 적용됩니다. 다른 요금제 고객에게는 [사용량에 따라 요금을 청구하며](https://support.cloudflare.com/hc/ko/articles/115004555148), 요금은 월간 구독 청구서에 반영됩니다.

모든 웹사이트에서 처음 10,000개 요청은 무료입니다. 이후 10,000개 요청당 0.05달러가 부과됩니다.

예를 들어, Rate Limiting 규칙에 해당하는 총 35,000개의 양호/허용 요청을 받은 경우

-   1 - 10,000개: 무료
-   10,001 - 20,000개: 0.05달러
-   20,001 - 30,000개: 0.05달러
-   30,001 - 35,000개: 0.05달러 (10,000개 요청 중 일부만 사용한 경우에도 비례하여 요금이 부과되지 않습니다.)

다음 [청구일](https://support.cloudflare.com/hc/ko/articles/200170286-How-does-CloudFlare-s-billing-for-apps-and-paid-plans-work-#section2)에 Rate Limiting에 대해 총 0.15달러가 청구됩니다. 금액은 청구서에 품목으로 나타나며, 청구된 요청의 총 개수가 나열됩니다.

사이트 별로 수신한 10,000개 요청이 아니라, 계정의 모든 사이트가 수신한 총 요청 중 첫 10,000개가 무료입니다. 즉 한 사이트에서 20,000개 요청을 받고 다른 사이트에서 30,000개 요청을 받았다면 총 50,000개의 요청에 대해 0.15달러가 아니라 0.20달러가 청구됩니다.

___

Rate Limiting은 모든 웹사이트에서 정의된 규칙에 맞는 양호한(차단되지 않은) 요청의 개수에 따라 요금이 청구됩니다. 각 요청은 한 번만 계산되므로 요청이 여러 규칙과 일치하더라도 요금이 중복 부과되지 않습니다.

예를 들어 규칙이 example.com/ratelimit/\*와 일치하고 분당 30개 이상 요청을 보낸 클라이언트를 차단하는 경우:

-   클라이언트 A는  example.com/ratelimit/foo에 20,000개 요청을 분당 10개 속도로 보냅니다. 모든 요청이 허용됩니다.
-   클라이언트 B는 example.com/ratelimit/bar에 일반적으로 분당 10개 속도로 90,000개 요청을 보내지만 분당 30개로 폭주합니다. 폭주 기간 중 60,000개 요청이 차단되지만 요청 속도가 떨어지면 30,000개는 허용됩니다.
-   클라이언트 C는 example.com/elsewhere에 20,000개 요청을 분당 40개 속도로 보냅니다. 이것은 임계값을 초과하지만 규칙 경로에 일치하지 않습니다. 따라서 20,000개 요청 모두 허용됩니다.

이 예에서 50,000(30,000 + 20,000)개 요청에 대해 요금이 청구됩니다. 클라이언트 A와 B가 모두 규칙에 일치하는 요청을 보냈지만 클라이언트 B의 요청 중 일부가 차단되어 이에 대한 요금이 청구되지 않습니다. 총 비용은 (50,000 - 10,000) \* 0.05달러 = 0.20달러입니다.

| 
**클라이언트**

 | 

**요청 URL**

 | 

**요청**

 | 

**결과**

 | 

**월간 비용**

 |
| --- | --- | --- | --- | --- |
| A | example.com/ratelimit/foo | 20,000개, 10개/분 | URL 패턴이 일치하지만 임계값이 초과되지 않았습니다. 모든 요청이 통과합니다. | 

(2-1)\*0.05달러 = 0.05달러

_10,000개 요청에 대해서만 요금이 청구됩니다. 첫 번째 10,000개는 무료이기 때문입니다._

 |
| B |  example.com/ratelimit/bar | 

90,000:

60,000개, 30개/분 + 30,000개, 30개/분

 | URL 패턴이 일치합니다. 규칙이 60,000개를 차단하고 30,000개를 허용합니다. | 3\*0.05달러 = 0.15달러 |
| C |  example.com/elsewhere | 20,000개, 40개/분 | URL 패턴이 일치하지 않습니다. 규칙이 적용되지 않습니다. 모든 요청이 통과합니다. | 0.00달러 |
|  **총 요금:** | 0.20달러 |
