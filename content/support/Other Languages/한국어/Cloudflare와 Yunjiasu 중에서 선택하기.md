---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/209156358-Cloudflare%EC%99%80-Yunjiasu-%EC%A4%91%EC%97%90%EC%84%9C-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0
title: Cloudflare와 Yunjiasu 중에서 선택하기
---

# Cloudflare와 Yunjiasu 중에서 선택하기

## Cloudflare와 Yunjiasu 중에서 선택하기

_성능과 보안을 위해 Cloudflare나 Yunjiasu 중 어떤 것을 선택해야 하는지 알아보세요._

___

## 개요

Cloudflare와 Baidu의 파트너십은 양자 모두에 많은 이점이 있습니다.

다음과 같은 경우 [Cloudflare](https://www.cloudflare.com/plans)에 등록하시기 바랍니다.

1.  대상 그룹의 상당수가 중국 본토 _밖_에 있습니다.
2.  영어로 제공되는 서비스(지원 포함)를 사용하고 싶습니다.
3.  [ICP 라이선스](https://support.cloudflare.com/hc/ko/articles/209714777-ICP-FAQ)가 없습니다.
4.  HTTPS가 필요합니다.

다음과 같은 경우 [Yunjiasu](http://su.baidu.com/)를 선택하시기 바랍니다.

1.  사용자가 주로 중국 본토에 있습니다.
2.  중국어로 제공되는 서비스(지원 포함)를 선호합니다.
3.  [ICP 라이선스](https://support.cloudflare.com/hc/ko/articles/209714777-ICP-FAQ)가 있습니다.
4.  도메인이 HTTP 전용입니다.

중국 네트워크는 합동 서비스이기 때문에 도메인은 한 번에 한 공급자를 통해서만 활성화될 수 있습니다. 도메인이 현재 Cloudflare 상에 있는 경우 Cloudflare 계정에서 도메인을 삭제한 후, Yunjiasu 계정에 [등록](http://su.baidu.com/)하고, 이를 Yunjiasu 계정에 추가해야 합니다. Yunjiasu에서 Cloudflare로 전환할 때도 단계는 동일합니다.

Cloudflare와 Yunjiasu 사이에 다른 도메인을 설정하면 두 서비스를 모두 사용할 수 있습니다.

___

## 관련 자료

[ICP 번호의 이해 및 구성](https://support.cloudflare.com/hc/articles/209714777)
