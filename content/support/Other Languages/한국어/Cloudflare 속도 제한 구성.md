---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1
title: Cloudflare 속도 제한 구성
---

# Cloudflare 속도 제한 구성

_서비스 거부 공격, 무차별 로그인 시도 등의 남용 행동에 대해 웹 사이트 응용 프로그램을 보호할 수 있도록 Cloudflare 속도 제한을 구성합니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#4TBnjI1OqjroF6MLXB3Wmr)
-   [Analytics](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#7Cy9dajZBWM5pm9aIP5mMD)
-   [요금제 당 속도 제한 허용](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#4gd3s4xzV2xOE4CUbRIEAo)
-   [속도 제한 규칙의 구성 요소](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#4uDonp8FX9ARo4nzdBvXiY)
-   [속도 제한 임계값 파악](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#o8KwUgkUml3Y7bAapvXjP)
-   [과제 1: 기본 속도 제한 규칙 구성](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#3UWQC5PrVScHgEGRMobRMm)
-   [과제 2: 고급 기준 구성(Business 및 Enterprise 요금제 전용)](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#5iIwkkHwcJbNRynWjrDIGb)
-   [과제 3: 고급 응답 구성(Business 및 Enterprise 요금제 전용)](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#7uCtK6GPAfWDNlSHch7KBs)
-   [과제 4: 우회 옵션 구성(Enterprise 요금제 전용)](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#3rCyCwZTjnPl3brIt7Ytrg)
-   [규칙 실행 순서](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#rule-execution-order)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/115001635128-Cloudflare-%EC%86%8D%EB%8F%84-%EC%A0%9C%ED%95%9C-%EA%B5%AC%EC%84%B1#516XYZwx0Mdhh7hLMg60iT)

___

## 개요

Cloudflare **속도 제한**은 특정 URL이나 전체 도메인에 대한 과도한 요청 속도를 자동으로 파악하고 완화합니다.  요청 비율은 개별 Cloudflare 데이터 센터에 대해 로컬에서 계산됩니다.  **속도 제한**을 가장 많이 사용하는 것은 [DDoS](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/) 방어, [무차별 대입 공격](https://www.cloudflare.com/learning/bots/brute-force-attack/) 방어 등이며 포럼 검색, API 호출, 원본에서의 데이터베이스 집약적 작업을 포함하는 자원 등에 대한 액세스를 제한할 때도 이용합니다.

개별 IPv4 주소 또는 IPv6 /64 IP 범위가 규칙 임계값을 초과하면 원본 웹 서버에 대한 추가적인 요청이 차단되며 클라이언트가 요청 전송을 재개할 수 있는 시기를 표시하는 **Retry-After** 헤더를 포함하는 HTTP 429 응답이 반환됩니다.

___

## Analytics

**Analytics** > **보안**.에서 속도 제한에 대한 분석 자료를 볼 수 있습니다. 속도 제한 분석 자료에서는 시뮬레이션된 요청과 일치하는 트래픽이 실선으로 표시되고 실제 차단된 요청이 점선으로 표시됩니다. 속도 제한 규칙으로 생성된 로그는 Enterprise 요금제 고객만 [Cloudflare Logs](/logs/)를 통해 볼 수 있습니다.

Cloudflare는 차단된 요청에 대해 HTTP 429 오류를 반환합니다. Enterprise 요금제 고객은 **Analytics** > **트래픽**의 분석 대시보드에 있는 **상태 코드**에서 위치별로 차단된 요청에 대한 세부사항을 불 수 있습니다.

___

## 요금제 당 속도 제한 허용

허용된 속도 제한 규칙의 수는 도메인의 요금제에 따라 다릅니다.

| 요금제 | 규칙 수 | 활동 | 활동 지속 시간 | 요청 기간 |
| --- | --- | --- | --- | --- |
| 무료 | 1 | 차단 | 1분 또는 1시간 | 10초 또는 1분 |
| 프로 | 10 | 차단, 레거시 캡차, JS 인증 질문, 괸리형 인증 질문, 로그 | 1분 또는 1시간 | 10초 또는 1분 |
| 비즈니스 | 15 | 차단, 레거시 캡차, JS 인증 질문, 괸리형 인증 질문, 로그 | 1분, 1시간, 24시간 | 10초, 1분, 10분 |
| 기업 | 100 | 차단, 레거시 캡차, JS 인증 질문, 괸리형 인증 질문, 로그 | 10초부터 86,400초(24시간) 사이의 모든 지속 시간 | 10초에서 3600초(1시간) 사이의 입력된 모든 값 |

Cloudflare 속도 제한은 도메인의 Cloudflare 요금제에 따라 지원하는 구성 제어 수준이 다릅니다.  아래 표에는 요금제별로 수행할 수 있는 작업이 정리되어 있습니다.

| 
#

 | 

과제

 | 

가용성

 |
| --- | --- | --- |
| 

1

 | 

기본 속도 제한 규칙 구성

 | 

모든 요금제

 |
| 

2

 | 

고급 기준 구성

 | 

Business 및 Enterprise 요금제

 |
| 

3

 | 

고급 응답 구성

 | 

Business 및 Enterprise 요금제

 |
| 

4

 | 

우회 옵션 구성

 | 

Enterprise 요금제

 |

___

## 속도 제한 규칙의 구성 요소

속도 제한 규칙은 세 가지의 고유한 구성요소로 구성됩니다.  아래 각 구성 요소를 클릭하면, 세부 사항이 표시됩니다.

수신 요청을 다음과 비교합니다.

#### **요청 경로**

예:

-   http://example.com/example
-   http://example.com/example/\*

요청 경로는 대소문자를 구분하지 않습니다.  쿼리 문자열 (_?_) 또는 앵커(_#_) 뒤에서는 패턴과 콘텐츠를 비교할 수 없습니다.  별표(_\*_)는 빈 문자열을 포함하여, 모든 문자열과 일치합니다. 예:

-   \*.example.com/\*가 example.com의 모든 하위 도메인에 있는 모든 경로와 일치
-   \*example.com/example.html이 example.com과 일치 또는 example.com의 모든 하위 도메인에 있는 example.html
-   \*이 사이트의 모든 페이지와 일치

_example.com/path_에 대한 요청은 _example.com/path/_와 동일하지 않습니다.  이 규칙의 유일한 예외는 홈 페이지로서, _example.com_ 은 _example.com/_과 일치합니다.

#### **요청 스킴**

_HTTP_ 또는 _HTTPS_. 아무 것도 지정하지 않으면 둘 다 일치되고 규칙은 _\_ALL\__를 나열합니다.

#### **요청 메서드**

_POST_ 또는 _GET_. 아무 것도 지정하지 않으면 둘 다 일치되고 규칙은 _\_ALL\__를 나열합니다.

#### **(선택 사항) 원본 응답 코드**

예: 원래 웹 서버에서 HTTP 401 또는 403이 반환되는 경우에만 **속도 제한** 규칙을 일치.  응답 코드 기준과 일치하는 트리거된 규칙은 원본 응답 코드에 관계없이 해당 클라이언트의 후속 요청을 차단합니다. 

규칙은 동일한 클라이언트에서 수신되는 모든 요청의 수 및 시간에 일치할 수 있습니다.

#### **요청 수**

2개 이상의 요청을 지정합니다.  단일 요청 차단의 경우, 해당 경로를 사용할 수 없게 합니다(예: 원본 웹 서버가 403을 반환하도록 하여).

#### **요청 기간**

클라이언트의 요청이 지정된 지속 기간 동안 임계값을 초과하면 규칙이 트리거됩니다.

 

규칙 완화는 다음으로 구성됩니다.

#### **완화 조치**

속도 제한 조치는 위의 **요금제별 속도 제한 허용량**에서 언급한 대로 도메인 요금제에 따라 달라집니다.

-   **차단** **\-** 임계값을 초과하면, Cloudflare는 HTTP 429 오류를 냅니다.
-   **레거시 캡차** **\-** 방문자는 CAPTCHA 인증 질문을 통과해야 합니다. 통과한 경우, Cloudflare는 요청을 허락합니다.
-   **JS 인증 질문** **\-** 방문자가 Cloudflare JavaScript 인증 질문을 통과해야 합니다. 통과한 경우, Cloudflare는 요청을 허락합니다.
-   **로그 -** 요청이 [Cloudflare Logs](https://support.cloudflare.com/hc/articles/216672448)에 로깅됩니다.. 이를 통해 실제에 적용하기 전에 규칙을 테스트할 수 있습니다.

#### **금지 기간**

제한 시간 초과를 임계값보다 짧게 설정하면 API는 자동으로 제한 시간 초과를 임계값과 동일하게 맞춥니다. 

**속도 제한** [사용자 정의 오류 페이지](https://support.cloudflare.com/hc/articles/200172706) 가 지정되지 않은 경우, 방문자는 기본 HTML 페이지를 수신합니다.  또한, Business 및 Enterprise 요금제 고객은 규칙 자체에서 응답을 지정할 수 있으므로 아래의 _과제 3: 고급 응답 구성_을 참조하시기 바랍니다.

___

## 속도 제한 임계값 파악

Cloudflare **속도 제한**의 일반적인 임계값을 파악하려면, 24시간 동안의 캐시되지 않은 웹 사이트 요청을 동일한 24시간동안의 고유 방문자 수로 나눕니다. 이를 다시 예상 평균 방문 시간(분)으로 나눕니다.  마지막으로 4 이상의 수를 곱하면 웹 사이트에 예상되는 분당 임계값을 결정할 수 있습니다. 대부분의 공격이 일반적인 트래픽 속도에 비해 자릿수가 다르므로 4보다 큰 수를 써도 괜찮습니다.

특정 URL에 대한 URL 속도 제한을 파악하려면 해당 URL에 대한 24시간 동안의 캐시되지 않은 웹 사이트 요청과 고유 방문자 수를 이용합니다.  사용자 보고서 및 자체 모니터링에 따라 임계값을 조정하시기 바랍니다.

___

## 과제 1: 기본 속도 제한 규칙 구성

클릭하면, Cloudflare **속도 제한** 규칙의 두 가지 공통 유형을 작성하는 안내가 펼쳐집니다.

**속도 제한**에는 한 번 클릭으로 가동하는 **로그인 보호** 도구가 있으며 이는 기능은 5분 내에 5개 이상의 POST 요청을 전송하는 클라이언트를 15분 동안 차단하는 규칙을 작성합니다. 대부분의 무차별 대입 시도를 막기에 충분합니다.

1.  Cloudflare 계정에 로그인합니다.
2.  보호할 도메인을 선택합니다.
3.  **보안 > WAF > 속도 제한 규칙**으로 이동합니다.
4.  **속도 제한**에서 **로그인 보호**를 클릭합니다.
5.  표시되는 **로그인 보호** 대화 상자에서 **규칙 이름** 및 **로그인 URL입력**을 입력합니다.
6.  **저장**을 클릭합니다.
7.  **규칙 이름** 이 **속도 제한** 규칙 목록에 표시됩니다.

1\. Cloudflare dashboard에 로그인하세요.

2\. 적절한 도메인을 선택합니다.

3\. **보안** > **WAF** > **속도 제한 규칙**으로 이동합니다.

4\. **속도 제한 규칙 작성**을 클릭합니다. 새로운 규칙의 세부 사항을 지정할 대화 상자가 열립니다.

![예시 규칙 구성이 표시된 속도 제한 규칙 생성 팝업 대화 상자. 이 규칙은 한 시간 동안 분당 요청 수가 150건이 넘는 IP 주소의 요청을 차단합니다.](/images/support/previous-rate-limiting-create-rule.png)

5\. 서술적인 **규칙 이름**을 입력합니다.

6\. **URL에 일치하는 트래픽의 경우** 드롭다운에서 HTTP 스키마와 URL을 선택합니다.

7. **동일한 IP 주소가 초과하는 경우**에 샘플링 기간 동안의 요청 수를 나타내는  수치(1보다 큰 정수)를 입력합니다.

8\. **요청 수 계수 대상 시간**에는, 샘플링 기간(요청이 계수되는 기간)을 선택합니다. Enterprise 요금제의 도메인은 10초에서 3600초(1시간) 사이의 시간을 수동으로 입력할 수 있습니다.

9\. **Then** 드롭다운에서 요금제에 따라 제공되는 조치 중 하나를 선택합니다.  자세한 내용은 위의 _속도 제한 규칙의 구성 요소_에 있는 _규칙 완화_ 섹션을 검토하시기 바랍니다.

10\. **해당 방문자의 일치 트래픽**에 대해 _차단_ 또는 _로그_를 선택한 경우에는, 임계치가 트리거되었을 때 얼마나 오래 해당 옵션을 적용할지 선택합니다. Enterprise 요금제의 도메인은 10초에서 86,400초(24시간) 사이의 시간을 수동으로 입력할 수 있습니다.

11\. **저장 및 배포**를 클릭해 새 규칙을 활성화합니다.

새 규칙은 속도 제한 규칙 목록에 표시됩니다.

임계값을 낮게 설정할 때의 일반적인 주의 사항:

1.  기존 규칙을 그대로 두고 하위 임계값을 사용하여 새 규칙을 추가합니다.
2.  새 규칙이 배치되면, 이전 규칙의 조치 지속 시간이 지나기를 기다려서 이전 규칙을 삭제합니다.

(합법적인 클라이언트 차단으로 인해) 임계값을 높게 설정할 때는 기존 규칙 내에서 임계값을 늘립니다.

___

## 과제 2: 고급 기준 구성(Business 및 Enterprise 요금제 전용)

**고급 기준** 옵션은 어떠한 HTTP 메서드, 헤더 응답, 원본 응답 코드가 속도 제한 규칙에 일치할지 구성합니다.

새 규칙 또는 기존 규칙에 고급 기준을 구성하려면 다음 단계를 수행하면 됩니다.

1\. **고급 기준**을 확장합니다.

![속도 제한 규칙의 고급 기준 구성 시 사용할 수 있는 필드.](/images/support/previous-rate-limiting-advanced-criteria.png)

2\. **메서드** 드롭 다운에서 값을 선택합니다. 기본값은 _ANY_로 모든 HTTP 메서드와 일치합니다.

3\. **HTTP 응답 헤더**로 필터링합니다. 원본 웹 서버에서 반환된 헤더를 포함하려면 **헤더 응답 필드 추가**를 클릭합니다.

**CF-Cache-Status** 헤더가 기본적으로 표시되어 Cloudflare가 해당 자원에 대해 속도 제한을 적용하지 않고 캐시하도록 합니다. 캐시된 자원에 대해서도 속도 제한을 적용하려면 **X** 버튼을 눌러 이 헤더를 제거하거나 **캐시된 자원에 대해서도 속도 제한 적용**을 활성화합니다.

**HTTP 응답 헤더** 아래에 둘 이상의 헤더가 있는 경우, _AND_ 부울 논리가 적용됩니다. 헤더를 제외하려면 _Not Equals_ 옵션을 사용합니다. 헤더는 대소문자를 구분하지 않습니다.

4\. 일치시킬 각 HTTP 응답 코드의 숫자 값을 **원본 응답 코드**에 입력합니다. 두 개 이상의 HTTP 코드는 쉼표로 구분합니다(예: `401, 403`).

5\. (선택 사항) 요금제에 따라 추가적인 속도 제한 기능을 구성할 수 있습니다.

6\. **저장 및 배포**를 클릭합니다.

___

## 과제 3: 고급 응답 구성(Business 및 Enterprise 요금제 전용)

**고급 응답** 옵션은 규칙의 임계값이 초과된 경우 Cloudflare가 반환하는 정보의 형식을 구성합니다. 정적인 일반 텍스트 또는 JSON 콘텐츠를 반환받으려면 **고급 응답**을 이용하시기 바랍니다.

일반 텍스트 또는 JSON 응답 구성 방법:

1\. **고급 응답**을 확장합니다.

![속도 제한 규칙의 고급 응답 구성 시 사용할 수 있는 필드.](/images/support/previous-rate-limiting-advanced-response.png)

2\. 기본값 이외에 _사용자 지정 JSON_ 또는 _사용자 지정 택스트_를 **응답 유형** 형식으로 선택합니다.than the default: .

3\. 반환받고자 하는 일반 텍스트 또는 JSON 응답을 입력합니다. 최대 응답 크기는 32KB입니다.

4\. (선택 사항) 요금제에 따라 추가적인 속도 제한 기능을 구성할 수 있습니다.

5\. **저장 및 배포**를 클릭합니다.

### 사용자 지정 HTML 페이지 이용 또는 리디렉션

사용자 지정 HTML 페이지를 표시하려면 대시보드에서 HTTP 429 오류("요청이 너무 많음")에 대한 사용자 지정 페이지를 구성하시기 바랍니다. **응답 유형**에서 "기본 Cloudflare Rate Limiting 페이지"(이 필드의 기본값)을 선택한 경우 Cloudflare는 이 페이지를 표시합니다.

이 방법을 이용해 Rate Limiting이 적용된 클라이언트를 특정 URL로 리디렉션할 수 있습니다.

1\. 서버에서 표시하고자 할 페이지의 최종 URL로 리디렉션하는 HTML 페이지를 작성합니다. 다음의 예와 같이 페이지 내용에 [meta refresh](https://www.w3.org/TR/WCAG20-TECHS/H76.html) 태그를 포함해야 합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;!doctype html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta charset=&quot;utf-8&quot;&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;title&gt;사용자 지정 RL 페이지&lt;/title&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url='https://yourzonename/block'&quot; /&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;body&gt; &lt;/body&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/html&gt;</span></div></span></span></span></code></pre>{{</raw>}}

작성한 페이지의 공개 URL을 기록해 두시기 바랍니다.

2\. Cloudflare Dashboard에서 **계정 홈** > **구성** > **사용자 지정 페이지**로 .

3\. **429 오류**에서 **사용자 지정 페이지**를 클릭합니다.

4\. 서버에 생성한 페이지(meta refresh 태그가 있는 페이지)의 URL을 입력하고 **게시**를 클릭합니다.

일반 텍스트나 JSON을 반환하고 싶지만 응답이 32KB보다 큰 경우에도 이 방법을 이용합니다. 단, 이 경우에는 리디렉션 URL이 표시하고자 하는 일반 텍스트 또는 JSON 리소스의 URL이어야 합니다.

**참고:**

-   Rate Limiting 규칙이 429 오류에 대해 포함한 사용자 지정 HTML 페이지의 리디렉션 URL과 일치하면 안 됩니다.
-   서비스 거부 공격을 방지하기 위해 리디렉션 페이지에는 Caching가 캐시한 리소스만 포함되어야 합니다.

___

## 과제 4: 우회 옵션 구성(Enterprise 요금제 전용)

**우회**는 속도 제한 규칙이 일치하는 경우에도 특정한 일련의 URL들에 조치가 적용되지 않도록 허용 목록 또는 예외를 작성합니다.**우회** 구성은 다음 단계를 따릅니다.

1\. **우회**를 확장합니다.

2\. **URL에 대한 우회 규칙**에 속도 제한 규칙의 예외를 적용할 URL을 입력합니다.각 URL을 하나의 행으로 입력해야 합니다. URL에 지정된 HTTP 또는 HTTPS는 규칙이 저장될 때 자동으로 삭제되며 대신 해당 규칙은 HTTP와 HTTPS 둘 다에 적용됩니다.

![속도 제한 규칙을 우회한 2개의 URL 구성(행당 하나씩)](/images/support/previous-rate-limiting-bypass.png)

3\. (선택 사항) 요금제에 따라 추가적인 속도 제한 기능을 구성할 수 있습니다.

4\. **저장 및 배포**를 클릭합니다.

___

## 규칙 실행 순서

**사용 사례 1**: 요청이 아래의 두 가지 규칙 모두에 일치하는 경우,

-   규칙 1: _test.example.com_과 일치
-   규칙 2: _\*.example.com\*_와 일치

업로드하거나,

-   규칙 1: _\*.example.com\*_와 일치
-   규칙 2: _test.example.com_과 일치

규칙 2가 나중에 생성되었으므로 항상 먼저 트리거됩니다.

**사용 사례 2:** 도메인의 끝에서 별표(\*)를 제거하면, 규칙 실행은 어떤 규칙이 나중에 작성되었는가에 따릅니다**.**

-   규칙 1: _test.example.com_과 일치
-   규칙 2: _\*.example.com_과 일치

요청이 두 가지 규칙 모두에 일치하면 규칙 2가 먼저 트리거됩니다.

-   규칙 1: _\*.example.com_과 일치
-   규칙 2: _test.example.com_과 일치

요청이 두 가지 규칙 모두에 일치하면 규칙 2가 먼저 트리거됩니다.

___

## 관련 자료

-   [속도 제한의 ELS(Enterprise Log Share) 보고 방법](/logs/reference/log-fields)
-   [Cloudflare 속도 제한 문제 해결](https://support.cloudflare.com/hc/articles/115000546328)
-   [Cloudflare API를 통한 속도 제한 구성](https://api.cloudflare.com/#rate-limits-for-a-zone-properties)
