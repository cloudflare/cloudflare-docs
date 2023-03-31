---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360016450871-Cloudflare-Stream-%EC%9A%94%EA%B8%88-%EC%B2%AD%EA%B5%AC
title: Cloudflare Stream 요금 청구
---

# Cloudflare Stream 요금 청구

## Cloudflare Stream 요금 청구

_Cloudflare Stream 가격과 요금 계산법에 대해 자세히 알아보세요._

___

## 개요

[Cloudflare Stream](https://support.cloudflare.com/hc/ko/articles/360017801091)은 동영상 애플리케이션을 구축하기 위한 주문형 비디오 플랫폼입니다.가격은 아래와 같이 사용량과 저장량에 따라 산출됩니다.

사용자에게 전달된 동영상 길이:

-   월별 1,000분당 1달러

Cloudflare Stream에 저장된 동영상 시간:

-   1,000분당 5달러
-   사전 대금 청구

___

Cloudflare Stream은 월별로 요금을 청구합니다. Stream은 사용량 기반이기 때문에 이전 달의 시청 및 저장 시간에 따라 요금을 청구합니다.예를 들어, 9월 청구서에는 8월 Stream 사용량에 대한 요금이 포함됩니다.

청구 요금은 1,000분 단위로 올림합니다. 다음은 전송 및 저장 시간에 따른 예상 가격입니다.

| **분** | **올림한 시간** | **발생 요금** |
| --- | --- | --- |
| 
사용자에게 1,999분 전송됨

 | 

2,000분

 | 

2.00달러

 |
| 

Stream에 3,001분 저장됨

 | 

4,000분

 | 

20.00달러

 |
| 기간에 대한 총 요금(전송 시간 + 저장 시간) | 

22.00달러

 |

___

## Cloudflare Stream 청구 대상 시간

청구 대상 시간은 Cloudflare에서 방문자에게 동영상을 전송하는 데 소요한 시간을 의미합니다.

사이트 방문자가 동영상을 로드하고 보지 않은 경우에도 Cloudflare는 동영상 전송에 대해 요금을 부과합니다. 하지만, 방문자의 브라우저가 동영상을 로컬로 캐싱한 경우에는 시청 시간에 대한 요금을 부과하지 않습니다. 다시 말해, 방문자가 동영상을 여러 번 보더라도, 이후 시청 시간에 대해서는 요금이 부과되지 않습니다.

Cloudflare Stream 프리로드는 브라우저마다 다르게 작동합니다. 동영상 몇 초만 프리로드하는 브라우저도 있으며, 동영상 전체를 프리로드하는 브라우저도 있습니다. 프리로드는 동영상 가용성을 최적화하는 데 유용하지만, 본인의 상황에 적절한지 판단해야 합니다.

Cloudflare dashboard에서 Cloudflare Stream 청구 대상 시간을 보고 전송 시간에 따른 요금을 예측할 수 있습니다.

Stream 시청 시간 보기 

1.  Cloudflare 계정에 로그인하세요.
2.  **내 프로필** 드롭다운에서 **요금 청구**를 클릭하세요. Cloudflare 계정에 연계된 도메인 목록이 나타납니다.
3.  Stream을 사용하는 도메인을 선택하세요.
4.  왼쪽 탐색 모음에서 **청구 대상 사용량**을 클릭하세요. 현재 일일 트래픽을 보여주는 그래프가 표시됩니다.
5.  그래프 위의 드롭다운에서 **이전 달**을 선택하고 **현재까지 사용량**을 클릭하여 이전 달의 사용량을 보세요.

___

-   [Cloudflare Stream 동영상 플랫폼](https://support.cloudflare.com/hc/ko/articles/360017801091)
-   [Cloudflare Stream 개발자 문서](https://developers.cloudflare.com/stream/getting-started/)
