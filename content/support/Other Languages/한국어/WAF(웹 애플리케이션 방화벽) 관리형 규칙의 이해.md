---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/200172016-WAF-%EC%9B%B9-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%B0%A9%ED%99%94%EB%B2%BD-%EA%B4%80%EB%A6%AC%ED%98%95-%EA%B7%9C%EC%B9%99%EC%9D%98-%EC%9D%B4%ED%95%B4
title: WAF(웹 애플리케이션 방화벽) 관리형 규칙의 이해
---

# WAF(웹 애플리케이션 방화벽) 관리형 규칙의 이해

## WAF(웹 애플리케이션 방화벽) 관리형 규칙의 이해

_WAF 관리형 규칙은 사용자의 도메인에 대한 웹 요청을 감시하여 사용자가 활성화한 규칙 세트에 따라 원치않는 트래픽을 필터링합니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/200172016-WAF-%EC%9B%B9-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%B0%A9%ED%99%94%EB%B2%BD-%EA%B4%80%EB%A6%AC%ED%98%95-%EA%B7%9C%EC%B9%99%EC%9D%98-%EC%9D%B4%ED%95%B4#cAy9P8jRAD5eJw0QrL4VJ)
-   [WAF 긍정 오류 및 부정 오류에 대한 참고](https://support.cloudflare.com/hc/ko/articles/200172016-WAF-%EC%9B%B9-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%B0%A9%ED%99%94%EB%B2%BD-%EA%B4%80%EB%A6%AC%ED%98%95-%EA%B7%9C%EC%B9%99%EC%9D%98-%EC%9D%B4%ED%95%B4#B6O9QKf2vhGcHZZoaaJP3)
-   [Cloudflare 관리 규칙 세트](https://support.cloudflare.com/hc/ko/articles/200172016-WAF-%EC%9B%B9-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%B0%A9%ED%99%94%EB%B2%BD-%EA%B4%80%EB%A6%AC%ED%98%95-%EA%B7%9C%EC%B9%99%EC%9D%98-%EC%9D%B4%ED%95%B4#4vxxAwzbHx0eQ8XfETjxiN)
-   [패키지: OWASP ModSecurity 핵심 규칙 집합](https://support.cloudflare.com/hc/ko/articles/200172016-WAF-%EC%9B%B9-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%B0%A9%ED%99%94%EB%B2%BD-%EA%B4%80%EB%A6%AC%ED%98%95-%EA%B7%9C%EC%B9%99%EC%9D%98-%EC%9D%B4%ED%95%B4#sJbboLurEVhipzWYJQnyz)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/200172016-WAF-%EC%9B%B9-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%B0%A9%ED%99%94%EB%B2%BD-%EA%B4%80%EB%A6%AC%ED%98%95-%EA%B7%9C%EC%B9%99%EC%9D%98-%EC%9D%B4%ED%95%B4#6Tp6cDY8h4RtLwa7EdUoh3)

___

## 개요

Cloudflare WAF(웹 애플리케이션 방화벽)의 기능인 관리형 규칙은 HTTP GET 및 POST 요청에서의 의심스러운 활동을 식별하여 삭제합니다.

관리형 규칙이 파악하는 [악의적 콘텐츠](https://www.cloudflare.com/learning/security/what-is-web-application-security/)의 예는 다음과 같습니다.

-   댓글 스팸에 많이 쓰이는 키워드(_XX_, _Rolex_, _Viagra_ 등), 
-   XSS(교차 사이트 스크립팅) 공격 
-   SQL 삽입(SQi).

관리형 규칙은 Pro, Business, Enterprise 요금제에서 [Cloudflare로 프록시되는 하위 도메인](https://support.cloudflare.com/hc/articles/200169626)에 제공됩니다. **보안** > **WAF** > **관리형 규칙**에서 관리형 규칙 설정을 제어합니다.관리형 규칙에는 세 가지 패키지가 포함됩니다.

-   **Cloudflare 관리 규칙 세트**
-   **패키지: OWASP ModSecurity 핵심 규칙 집합**
-   **고객 요청 규칙**

**보안** > **개요**에서 제공되는 [방화벽 분석](/waf/analytics/) **활동 로그**에서 차단된 위협을 검토할 수 있습니다.

### 중요한 고려사항

-   관리형 규칙에 의해 제한된 대기 시간이 발생합니다.
-   WAF 관리형 규칙을 변경하면 전세계에 업데이트되는 데 약 30초가 걸립니다.
-   Cloudflare는 고유의 규칙을 사용하여 트래픽을 필터링합니다. 
-   확립된 WebSockets은 후속 요청에 대해 WAF를 트리거하지 않습니다.
-   관리형 규칙은 JSON 응답을 구문 분석하여 API를 대상으로 하는 취약점을 식별합니다. JSON 페이로드 구문 분석은 128KB로 제한됩니다.
-   WAF는 패딩 기법을 완화합니다. 다음을 권장합니다.
    1.  규칙 _100048_을 켭니다. 이 규칙은 이제 패딩 형태의 공격을 방어하지만 고객 환경에서 긍정 오류를 유발할 수 있으므로 기본적으로 배포되어 있지는 않습니다. 하지만 고객이 WAF를 적절히 조정하는 것이 중요합니다. Cloudflare는 개선된 장기적 솔루션을 개발하고 있습니다.
    2.  헤더 및/또는 본문을 확인해 128KB 이상의 대규모 페이로드를 차단할 필요가 있는 경우에는 [식 편집기](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor)를 이용해 방화벽 규칙을 작성합니다. 긍정 오류가 발생하기 쉬우므로 먼저 _로그_ 모드에서 방화벽 규칙을 테스트하여야 합니다.
        -   _http.request.body.truncated_
        -   _http.request.headers.truncated_
-   Cloudflare Dashboard에서 **관리형 규칙**을 _끈_ 경우에도 Cloudflare가 비활성화하지 않는 WAF 규칙이 몇 가지 있으며 규칙 ID _WP0025B_, _100043A_, _100030_ 등이 그 예입니다.

___

기본적으로 WAF 관리형 규칙은 Cloudflare Dashboard를 통해 완전히 관리할 수 있으며, 대부분의 웹 사이트 및 웹 응용 프로그램과 호환됩니다. 하지만 인터텟의 엄청난 규모를 고려하면 긍정 오류와 부정 오류가 가능합니다.

-   **긍정 오류**: 합법적인 요청을 감지하고 악의적인 것으로 필터링하는 경우.
-   **부정 오류**: 악의적 요청이 필터링되지 않은 경우.

### WAF 관리형 규칙의 긍정 오류 문제점 해결

의심스러운 콘텐츠는 웹사이트에 따라 주관적으로 정의됩니다. 예를 들어 웹 사이트에 게시된 PHP 코드는 의심스럽지만, 웹 사이트가 방문자에게 코딩 방법을 가르치고 방문자에게 PHP 코드를 제출하라고 한다면 예외입니다. 따라서 이러한 웹 사이트는 정상 작업을 방해하는 관리형 규칙을 사용하지 않도록 설정해야 합니다.

긍정 오류를 테스트하려면 WAF 관리형 규칙을 **시뮬레이션** 모드로 설정하여, 인증 질문 또는 차단 없이 가능한 공격에 대한 대응을 기록하게 합니다. 또한, 방화벽 분석 [**활동 로그**](/waf/analytics/paid-plans#activity-log)를 사용하여 긍정 오류를 발생시킨 관리형 규칙을 판별합니다.

[레거시 WAF](https://support.cloudflare.com/hc/ko/articles/200172016-Understanding-the-Cloudflare-Web-Application-Firewall-WAF-)로 인해 긍정 오류가 발생하는 경우 몇 가지 해결 방법이 있습니다.

-   [**IP Access 규칙**](https://support.cloudflare.com/hc/articles/217074967) **허용 목록에 클라이언트의 IP 주소를 추가:** 해당 브라우저 또는 클라이언트가 동일한 IP 주소에서 방문하는 경우 이를 허용하는 것이 좋습니다. 
-   **해당** [**관리형 규칙**](https://support.cloudflare.com/hc/articles/200172016) 비활성화: 긍정 오류를 차단하거나 이에 대해 질문을 제기하지는 않지만, 전반적인 사이트 보안은 약화됩니다. 규칙 ID _981176_에 의해 차단된 요청이 OWASP 규칙을 참조합니다. 이 문제를 해결하려면, OWASP 민감도를 낮추세요.
-   **방화벽 규칙을 사용하여 WAF 관리형 규칙을 우회**: 매개변수의 특정 조합에 대해 **우회** 조치가 포함된 방화벽 규칙을 작성하여 WAF 관리형 규칙을 비활성화합니다. 예를 들어, 특정 URL및 특정 IP 주소 또는 사용자 에이전트에 대해서는 [관리형 규칙 우회](/firewall/cf-firewall-rules/actions/)를 적용합니다.
-   **(권장하지 않음) 특정 URL로의 트래픽에 WAF 관리형 규칙 비활성화**: 특정 URL 엔드포인트의 보안 수준을 낮춥니다.  [Page Rules](https://support.cloudflare.com/hc/ko/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-)를 통해 구성됩니다.

[새 WAF](https://blog.cloudflare.com/new-cloudflare-waf/)로 인해 긍정 오류가 발생하는 경우 몇 가지 해결 방법이 있습니다.

1.  **WAF 예외 추가:** [Cloudflare 대시보드](/waf/managed-rulesets/waf-exceptions/define-dashboard)에서 또는 [Rulesets API](/waf/managed-rulesets/waf-exceptions/define-api)를 이용해 WAF 예외를 추가할 수 .
2.  **해당** [**관리형 규칙**](https://support.cloudflare.com/hc/articles/200172016) 비활성화: 긍정 오류를 차단하거나 이에 대해 질문을 제기하지는 않지만, 전반적인 사이트 보안은 약화됩니다. 규칙 ID _949110_에 의해 차단된 요청이 [새 OWASP 규칙](https://blog.cloudflare.com/new-cloudflare-waf/)을 참조합니다. 이 문제를 해결하려면, OWASP 민감도를 낮추세요.

**참고:** 예상대로 WAF 관리형 규칙이 트리거되는지 여부를 확인하기 위해 [Cloudflare 지원팀에 문의](https://support.cloudflare.com/hc/articles/200172476)하실 때는, 해당 특정 요청을 보낼 때 캡처한 [HAR 파일을 보내시기](https://support.cloudflare.com/hc/articles/203118044#h_8c9c815c-0933-49c0-ac00-b700700efce7) 바랍니다.

다음 추가 지침도 참고하세요.

-   하나의 특정 규칙이 긍정 오류를 야기하는 경우에는, 전체 규칙 **그룹**을 _해제_ 하지 말고 해당 규칙의 **모드** 를 _비활성화_로 설정하세요.
-   웹 사이트에 관리자 컨텐츠에서 긍정 오류가 발생하는 경우에는, _관리_ 섹션(_yoursite.com/admin_)에 대해 [**페이지 규칙**](https://support.cloudflare.com/hc/articles/218411427) 을 **보안 비활성화**로 설정하세요.

### WAF 관리형 규칙의 부정 오류 문제점 해결

부정 오류를 식별하려면 원본 웹 서버의 HTTP 로그를 검토합니다. 부정 오류를 줄이려면 다음 체크리스트를 점검합니다.

-   WAF 관리형 규칙이 **보안** > **WAF** > **관리형 규칙**에서 _활성화_되어 있습니까?
-   WAF 관리형 규칙이 [**Page Rules**](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings)에서 _비활성화_되어 있습니까?
-   모든 관리형 규칙이 기본적으로 활성화되어 있지 않으니 개별 관리형 규칙의 기본 조치를 검토하시기 바랍니다.
    -   예를 들어 Cloudflare는 기본적으로 사용자 에이전트가 비어 있는 요청을 허용합니다. 사용자 에이전트가 비어 있는 모든 요청을 차단하려면 규칙 **모드**를 **차단**으로 변경하세요.
    -   다른 예로서 완화되지 않은 SQL 삽입 공격을 차단하고자 하는 경우, 해당 SQLi 규칙을 활성화하고 **Cloudflare Specials** 그룹에서 **차단**으로 설정해야 합니다.
-   HTTP 트래픽을 처리하는 DNS 레코드가 Cloudflare를 통해 프록시되고 있나요?
-   [**방화벽 규칙** 중에 관리형 규칙을 우회](/firewall/cf-firewall-rules/actions/#supported-actions)하는 것이 있습니까?
-   [**IP 액세스 규칙**](https://support.cloudflare.com/hc/articles/217074967) 또는 [**방화벽 규칙**](/firewall/cf-firewall-rules/)의 허용 국가, ASN, IP 범위, IP 중에 공격 트래픽과 일치하는 것이 있습니까?
-   원본 IP 주소를 향하는 악성 트래픽이 Cloudflare의 보호를 우회하고 있나요? 원본 웹 서버에서 [Cloudflare의 IP 주소](https://www.cloudflare.com/ips/)를 제외한 모든 트래픽을 차단하세요.

___

## Cloudflare 관리 규칙 세트

**Cloudflare 관리 규칙 집합**에는 Cloudflare가 작성하고 준비한 보안 규칙이 포함되어 있습니다. **그룹** 아래에서 규칙 집합 이름을 클릭하면, 해당 규칙의 설명을 표시됩니다. 

**Cloudflare Specials**는 [많이 쓰이는 공격](https://www.cloudflare.com/learning/security/what-is-web-application-security/)에 대해 핵심 WAF 보안을 제공하는 **그룹**입니다.

 

특정 규칙 집합가 표시될 때 각 규칙에 대한 기본 조치가 **기본 모드** 아래에 나열됩니다. 특정 **Cloudflare** **관리 규칙 집합**의 개별 규칙에 사용 가능한 **모드**는 다음과 같습니다.

-   _기본값 - 특정 규칙을 표시할 때_ _**기본 모드**_ _아래에 나열된 기본 조치를 취합니다._
-   _비활성화 -_ 그룹 내의 특정 규칙을 끕니다**.**
-   _차단_ - 요청을 버립니다.
-   _레거시 캡차_ - 방문자에게 캡차 인증 질문 페이지가 제시됩니다.
-   _시뮬레이션_ - 요청을 허용하지만, [**활동 로그**](/waf/analytics/paid-plans#activity-log)에 로깅합니다.

Cloudflare의 [WAF 변경 로그](/waf/change-log/scheduled-changes/)를 통해 **Cloudflare 관리 규칙** 집합에 진행 중인 변경 사항을 모니터링할 수 있습니다.

___

## 패키지: OWASP ModSecurity 핵심 규칙 집합

### Cloudflare OWASP 패키지의 이해

**패키지: OWASP ModSecurity 핵심 규칙 집합**는 OWASP 규칙이 트리거된 수에 따라 각 요청에 점수를 부여합니다. 일부 OWASP 규칙은 다른 규칙보다 민감도 점수가 높습니다. OWASP가 요청을 평가하고 나면 Cloudflare는 도메인에 대해 구성된 **민감도**와 이 점수를 비교합니다. 점수가 **민감도**보다 크면 해당 요청에 대해 **패키지: OWASP ModSecurity 핵심 규칙 집합**에 구성된 **조치**가 적용됩니다.

-   _차단_ - 요청을 버립니다.
-   _인증 질문_ -방문자에게 캡차 챌린지 페이지가 발송됩니다.
-   _시뮬레이션_ - 요청을 허용하지만, [**활동 로그**](/waf/analytics/paid-plans#activity-log)에 로깅합니다.

특정 **민감도**에 대해 다음 점수가 되면 WAF가 트리거됩니다.

-   _낮음_ - 60점 이상
-   _중간_ - 40점 이상
-   _높음_ - 25점 이상

Ajax 요청의 경우, 다음의 기준이 적용됩니다.

-   _낮음_ - 120점 이상
-   _중간_ - 80점 이상
-   _높음_ - 65점 이상

[활동 로그](/waf/analytics/paid-plans#activity-log)를 검토하면, 최종 점수 및 트리거된 개별 규칙을 확인할 수 있습니다.

### Cloudflare의 OWASP 패키지 제어

**패키지: OWASP ModSecurity 핵심 규칙 집합**에는 [OWASP 프로젝트](https://www.owasp.org/index.php/Category:OWASP_ModSecurity_Core_Rule_Set_Project)의 여러 규칙이 포함되어 있습니다. Cloudflare는 OWASP 규칙을 작성하거나 큐레이트하지 않습니다.  **그룹** 아래에 있는 규칙 집합 이름을 클릭하면 해당 규칙의 설명이 표시됩니다. **Cloudflare 관리 규칙 집합**와 달리 특정 OWASP 규칙은 _켜짐_ 또는 _꺼짐_으로 설정되어 있습니다.

OWASP 임계값을 관리하려면, **패키지: OWASP ModSecurity 코어 규칙 집합**에서 _민감도_를 _낮음_, _중간_, **높음** 중에서 선택하세요. **민감도**를 _꺼짐_으로 설정하면, 전체 OWASP 패키지(규칙 전체 포함)가 비활성화됩니다. 적절한 **민감도**는 업종과 운영 형태에 따라 다릅니다.예를 들어, _낮음_은 다음의 경우에 적절합니다.

-   특정 비즈니스 업계에서는 WAF를 트리거하고
-   대형 파일 업로드를 허용할 가능성이 큽니다. 

Cloudflare는 처음에 **민감도**를 _낮음_으로 설정하고, 긍정 오류를 검토한 후 **민감도**를 높일 것을 권장합니다.

___

## 관련 자료

-   [방화벽 분석](/waf/analytics/)
-   [Cloudflare 방화벽 규칙](/firewall/cf-firewall-rules/)
-   [Cloudflare의 WAF 변경 로그](/waf/change-log/scheduled-changes/)
