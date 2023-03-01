---
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/5995821690637-WAF-%EA%B4%80%EB%A6%AC%ED%98%95-%EA%B7%9C%EC%B9%99%EC%9C%BC%EB%A1%9C%EB%B6%80%ED%84%B0-WAF-Managed-Rulesets%EB%A1%9C%EC%9D%98-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98
title: WAF 관리형 규칙으로부터 WAF Managed Rulesets로의 마이그레이션
---

# WAF 관리형 규칙으로부터 WAF Managed Rulesets로의 마이그레이션

## WAF 관리형 규칙으로부터 WAF Managed Rulesets로의 마이그레이션

_Cloudflare는 고객이 해당 영역을 WAF 관리형 규칙으로부터 새로운 WAF Managed Rulesets로 마이그레이션하는 일을 시작하도록 할 것입니다._

___

## 개요

2022년 5월 4일 Cloudflare는 [WAF 관리형 규칙](https://support.cloudflare.com/hc/articles/200172016)으로부터 [WAF Managed Rulesets](https://developers.cloudflare.com/waf/managed-rulesets/)로의 WAF 마이그레이션 1단계를 시작합니다. 고객은 대상 영역의 Cloudflare Dashboard에서 마이그레이션 프로세스를 시작할 수 있습니다. WAF Managed Rulesets는 다음의 장점이 있습니다.

-   감지 성능 개선
-   구성 유연성 개선(사용자 지정 WAF 필터 정의, 전역 규칙 세트 재정의 구성)
-   사용자 경험 개선
-   [노출된 자격 증명 확인](https://developers.cloudflare.com/waf/managed-rulesets/exposed-credentials-check/)에 액세스

현재 마이그레이션 프로세스는 언제나 Cloudflare Dashboard 내에서 고객에 의해 시작됩니다. **마이그레이션은 비가역적이어서** 새로운 WAF Managed Rulesets로 마이그레이션하고나면 WAF 관리형 규칙으로 돌아갈 수 없습니다. 영역을 새로운 WAF Managed Rulesets로 마이그레이션하면 Cloudflare Dashboard의 **관리형 규칙** 탭(**보안** > **WAF** > **관리형 규칙**에 있음)에 새로운 인터페이스가 표시되며 WAF 관리형 규칙 API는 작동하지 않게 됩니다.

___

## 마이그레이션의 영향

현재의 관리형 규칙 구성도 WAF Managed Rulesets 구성으로 마이그레이션되어 새로운 WAF로 이전한 영역에 동일한 보호 기능이 적용됩니다.

Cloudflare는 마이그레이션 이후 며칠 동안 정당한 요청이 WAF Managed Rulesets에 차단되지 않는지 방화벽 분석의 [**활동 로그**](https://developers.cloudflare.com/waf/analytics/paid-plans/#activity-log)를 확인하실 것을 권고합니다. 부적절하게 차단되는 요청이 있는 경우 해당 WAF 규칙의 조치를 _로그_로 조정하면 됩니다. Managed Ruleset 규칙의 조치 변경에 대한 자세한 내용은 WAF 문서에 있는 [Managed Ruleset 내에서의 단일 규칙 구성](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-single-rule-in-a-managed-ruleset)을 참조하시기 바랍니다.

### Cloudflare Dashboard의 변경

마이그레이션이 완료되면 Cloudflare Dashboard의 **보안** > **WAF** > **관리형 규칙**에 WAF Managed Rulesets 인터페이스가 표시되며 여기에서 Managed Rulesets를 배포하고 구성을 조정할 수 있습니다.

![WAF Managed Rulesets로 마이그레이션하고 나면 Cloudflare Dashboard에는 Managed Rulesets를 고객의 영역에 배포할 수 있는 새로운 인터페이스가 표시됩니다.](/support/static/waf-migration-dashboard-differences.png)

WAF 관리형 규칙과 달리 새로운 인터페이스에는 WAF를 활성화하는 전역 켜짐/꺼짐 버튼이 없습니다. 대신 고객이 각 WAF Managed Ruleset를 개별적으로 고객의 영역에 배포해야 합니다.

Dashboard에서의 WAF Managed Rulesets를 구성에 대한 자세한 내용은 개발자 문서의 [Dashboard에서 단일 영역에 Managed Rulesets 배포하기](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/)를 참조하시기 바랍니다.

### API의 변경

마이그레이션이 완료되면 WAF 관리형 규칙과 대화하기 위한 API가 **작동하지 않게 됩니다**. 이러한 API는 다음과 같습니다.

-   [WAF Rule Packages](https://api.cloudflare.com/#waf-rule-packages-properties)
-   [WAF Rule Groups](https://api.cloudflare.com/#waf-rule-groups-properties)
-   [WAF 규칙](https://api.cloudflare.com/#waf-rules-properties)

WAF Managed Rulesets와 대화하려면 [Rulesets API](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/)를 사용해야 합니다. API를 통한 WAF Managed Rulesets 배포에 대해서는 개발자 문서의 [API를 통한 규칙 세트 배포](https://developers.cloudflare.com/waf/managed-rulesets/deploy-api/)를 참조하시기 바랍니다.

___

## 대상 영역(1단계)

마이그레이션은 단계별로 진행됩니다. 2022년 5월 4일부터 대상 영역의 일부에 대해 마이그레이션이 제공되며 서서히 모든 대상 영역에 제공될 것입니다.

1단계 중에는 다음 요건을 충족하는 영역을 마이그레이션할 수 있습니다.

-   해당 영역의
    -   WAF가 비활성화되어 있거나
    -   WAF가 활성화되어 있고 Cloudflare Managed Ruleset만 활성화(OWASP ModSecurity Core Rule Set이 비활성화되어야 함)되어 있어야 함.
-   해당 영역에 WAF 관리형 규칙을 우회, 활성화, 비활성화하는 [방화벽 규칙](https://developers.cloudflare.com/firewall/cf-dashboard/) 또는 [Page Rules](https://support.cloudflare.com/hc/articles/218411427)이 없어야 함.
    -   _우회_ > _WAF 관리형 규칙_을 통해 구성된 방화벽 규칙.
    -   _보안 비활성화_를 통해 구성된 Page Rules.
    -   _웹 애플리케이션 방화벽: 꺼짐_ 또는 _웹 애플리케이션 방화벽: 켜짐_을 통해 구성된 Page Rules.
-   해당 영역에 [URI 제어 WAF 재정의](https://api.cloudflare.com/#waf-overrides-properties)(API를 통해서만 제공)가 없어야 .

이러한 요건을 충족하지 않는 모든 영역은 1단계 중에 마이그레이션할 수 없습니다.

추후의 2단계에서는 모든 영역이 마이그레이션 대상이 됩니다. 이 페이지는 2단계가 시작하기 전에 업데이트될 것입니다.

___

## 마이그레이션 시작

1\. [Cloudflare Dashboard](https://dash.cloudflare.com/)에 로그인하고 계정과 영역을 선택합니다.

2\. **보안** > **WAF** \> **관리형 규칙**으로 이동합니다.

![대상 영역의 경우 WAF > 관리형 규칙에 표시되는 마이그레이션 배너를 이용하여 관리형 규칙에서 WAF Managed Rulesets로 업데이트할 수 .](/support/static/waf-migration-banner.png)

3\. 업데이트 배너에서 **지금 업데이트**를 클릭합니다. 이 배너는 대상 영역에만 표시됩니다.

4\. 팝업 대화 상자에서 **업데이트**를 클릭해 WAF 관리형 규칙으로부터 WAF Managed Rulesets로 마이그레이션하겠다고 확인합니다.. 마이그레이션은 **비가역적**입니다.

작업을 확인하면 마이그레이션이 시작됩니다.

마이그레이션 과정은 수 분이 걸릴 수 있습니다. 마이그레이션이 종료되면 대시보드의 **보안** > **WAF** > **관리형 규칙**에 새 WAF Managed Rulesets가 표시됩니다. 마이그레이션이 종료되었는지 확인하려면 대시보드를 새로 고침하면 됩니다.
