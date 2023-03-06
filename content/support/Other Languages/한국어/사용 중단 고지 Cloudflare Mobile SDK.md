---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360054452251-%EC%82%AC%EC%9A%A9-%EC%A4%91%EB%8B%A8-%EA%B3%A0%EC%A7%80-Cloudflare-Mobile-SDK
title: 사용 중단 고지 Cloudflare Mobile SDK
---

# 사용 중단 고지: Cloudflare Mobile SDK

## 사용 중단 고지: Cloudflare Mobile SDK

_Cloudflare는 모바일 SDK 사용을 중지합니다. 2021년 2월 22일 이후에는 포털에 로그인할 수 없으며 모바일 앱에 대한 통계를 볼 수 없습니다._

___

## Cloudflare, 2021년 2월 22일에 모바일 SDK 포털 종료

Cloudflare는 모바일 SDK 사용을 중지합니다. 2021년 2월 22일 이후에는 포털에 로그인할 수 없으며 모바일 앱에 대한 통계를 볼 수 없습니다.

귀하의 앱에 모바일 SDK를 포함하는 것은 Cloudflare에 대한 신뢰의 표시이므로 Cloudflare는 경솔하게 이를 결정하지 않았습니다. 모바일 SDK는 가속 모드에서 최대한 빨리 앱을 개발하고 지표 모드에서 성능을 파악할 수 있는 두 가지를 지원하기 위해 구축된 것입니다.

그러나 Cloudflare는 업계 표준인 QUIC에 노력을 집중할 수 있도록 사내 ASAP 프로토콜의 개발을 중단하기로 결정했습니다. 가속 모드를 사용하지 않게 되면서 모바일 SDK에 지표 모드를 계속 유지하는 일에 대한 관심은 충분하지 않게 됐습니다. 모바일 성능 측정에는 [Firebase Performance Monitoring](https://firebase.google.com/products/performance) 등의 제품을 사용해 보시기를 권장합니다.

포털이 없어져도 SDK를 사용하는 모바일 앱은 계속 작동하겠지만, 모바일 SDK를 가능한 한 빨리 제거하기를 권장합니다.
