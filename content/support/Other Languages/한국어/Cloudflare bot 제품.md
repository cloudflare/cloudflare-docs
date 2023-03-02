---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ
title: Cloudflare bot 제품-FAQ
---

# Cloudflare bot 제품-FAQ

## Cloudflare bot 제품-FAQ

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#12345679)
-   [Cloudflare의 봇 관리 방식](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#h_vGKNSEuBtE5ymreIHOucE)
-   [내 요금제에 포함된 내용 알아보기](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#h_3dC1nAamuWNwImCpIkdlC8)
-   [봇 제품 설정 방법](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#h_2PHwjg1FfXSS3K1aZE00yH)
-   [WAF 관리형 규칙 id 100203에 의해 Yandex 봇이 예기치 않게 차단되었습니다](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#Yandex-bot-unexpectedly-blocked-WAF-100203)
-   [기계 학습은 어떻게 작동합니까?](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#h_4iPjq7Qq4Ozsq0XwibA2ea)
-   [방화벽 규칙에 대해 관리형 인증 질문 조치를 받는 이유는 무엇입니까?](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#managed-challenge)
-   [위협 점수와 봇 관리 점수의 차이는 무엇입니까?](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#h_131SlrJFhqmrJjs0joDaXE)
-    [cf.bot\_management.verified\_bot은 무엇인가요?](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#h_zzzgV0HSwPUhOEs5UY9sD)
-   [양호한 봇을 실행하고 있으며 이를 허용 목록(cf.bot\_management.verified\_bot)에 추가하고자 합니다. 어떻게 해야 하나요?](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#h_5itGQRBabQ51RwT5cNJX8u)
-   [봇 관련 문제 해결에 필요한 정보](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#h_2Ffw8AKdwQySoI8rnO02pc)
-   [봇 차단 모드(BFM) 또는 슈퍼 봇 차단 모드(SBFM)에서 긍정 오류가 발생하면 어떻게 해야 하나요?](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#5KX8t3C6SObnoWs5F6YOlU)
-   [슈퍼 봇 차단 모드(SBFM)를 껐는데도 여전히 요청을 차단하고 있습니다. 이유가 무엇인가요?](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#h_6Q8mNs9Ur9mvXhjcH1KBcn)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/360035387431-Cloudflare-bot-%EC%A0%9C%ED%92%88-FAQ#3zR4ro73zaHshu5OldQIuB)

___

## 개요

Cloudflare 봇 관련 솔루션은 악성 봇으로부터 사이트를 보호하기 위해 자동화된 트래픽을 식별하고 완화합니다.

봇 관련 솔루션에 대한 자세한 정보와 설정 방법은 [개발자 문서](https://developers.cloudflare.com/bots/)를 검토하시기 바랍니다.

___

Cloudflare는 봇 감지에 다양한 방법을 사용하며 이는 요금제에 따라 다릅니다. 자세한 내용은 [Cloudflare 봇 관련 제품](https://developers.cloudflare.com/bots/about/plans)을 참고하시기 바랍니다.

___

## 내 요금제에 포함된 내용 알아보기

요금제에 포함된 항목을 자세히 알려면, [개발자 문서](https://developers.cloudflare.com/bots/about/plans)를 참조하세요.

___

## 봇 제품 설정 방법

봇 제품 설정 방법을 알려면, [개발자 문서](https://developers.cloudflare.com/bots/get-started)를 참조하세요.

___

## WAF 관리형 규칙 id 100203에 의해 Yandex 봇이 예기치 않게 차단되었습니다

Yandex는 봇을 매우 빈번하게 업데이트하기 때문에 이러한 변경 사항이 전파되는 동안에 긍정 오류가 증가하기도 합니다. 새로운 봇과 최근에 변경된 봇이 Cloudflare WAF 규칙 id 100203에 의해 차단되는 일이 발생하는 경우가 있습니다. Yandex 봇의 IP 목록이 아직 Yandex의 최근 변경 사항과 동기화되지 않았기 때문입니다.

**임시 해결책:**

-   WAF 관리형 규칙 id 100203을 일시적으로 비활성화하거나
-   **Yandex IP**에서 온 요청으로 사용자 에이전트에 **Yandex**가 포함된 경우 WAF 관리형 규칙을 우회할 수 있도록 _우회_ 조치가 포함된 방화벽 규칙을 만듭니다.[개발자 문서](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions)를 참조하세요.

**솔루션:**

새로운 Yandex IP가 Cloudflare 시스템에 전파되고 나면 해당 요청이 차단되는 일은 없을 것입니다. 이때까지는 48시간이 걸릴 수 있습니다. 48시간이 지난 후에도 봇에 변경 사항이 없는 상태에서 Yandex 봇이 차단되는 경우, [Cloudflare 지원팀](https://support.cloudflare.com/hc/ko/articles/200172476-Contacting-Cloudflare-Support)에 문의하시기 바랍니다.

___

## 기계 학습은 어떻게 작동합니까?

관리 기계 학습은 성별과 나이 등의 특정 변수(X)로 소득 등의 다른 변수(Y)를 예측합니다.

Cloudflare 봇 관리 및 슈퍼 봇 차단 모드에서는 X 변수가 요청의 특성이고 Y 변수는 X 값을 기반으로 하여 계산한 캡차를 통과할 확률을 나타냅니다.

Cloudflare는 수백만 개의 요청에서 얻은 데이터를 사용하며 주기적으로 시스템을 다시 트레이닝합니다. 자체 요청 로그(예: Cloudflare Logpull 및 Logpush, 방화벽 API)에서 이 데이터에 대해 알 수 있습니다.

___

## 방화벽 규칙에 대해 관리형 인증 질문 조치를 받는 이유는 무엇입니까?

봇 차단 모드 또는 슈퍼 봇 차단 모드에서 다양한 봇 범주에 대해 인증 질문을 하기로 선택하게 되면, **관리형 인증 질문**의 **조치 취함**으로 방화벽 이벤트가 표시됩니다.

[방화벽 규칙](https://support.cloudflare.com/hc/articles/200170136#managed-challenge)에 따라서 관리형 인증 질문을 받게 될 수도 있습니다.

___

## 위협 점수와 봇 관리 점수의 차이는 무엇입니까?

이 차이는 중요합니다.

-   위협 점수(_cf.threat\_score_)는 IP 평판을 결정하기 위해 이용합니다. 점수는 0(양호)-100(악성)로 표시됩니다.
-   Bot 관리 점수(_cf.bot\_management.score)_ 는 요청이 사용자에서 온 것인지 스크립트에서 온 것인지 측정하기 위해 봇 관리에서 사용합니다**.** 점수는 1(봇)-99(인간)로 표시됩니다. 점수가 낮으면 요청이 스크립트, API 서비스, 자동화된 에이전트에서 발생했음을 나타냅니다. 점수가 높으면 사용자가 표준 데스크탑 또는 모바일 웹 브라우저를 사용하여 요청했음을 나타냅니다.

이 필드들은 [Cloudflare 방화벽 규칙](https://developers.cloudflare.com/firewall/cf-firewall-rules)을 통해 사용할 수 있습니다.

___

##  cf.bot\_management.verified\_bot은 무엇인가요?

요청의 _cf.bot\_management.verified\_bot_ 값은 해당 요청이 Cloudflare가 허용하는 봇에서 왔는지를 나타내는 부울 값입니다.

Cloudflare는 Google 검색 엔진, Pingdom 등 좋은 자동화 봇의 허용 목록을 만들었습니다.

이 허용 목록은 역방향 DNS 검증을 기반으로 한 대규모 목록이므로 Cloudflare가 허용하는 IP가 요청 서비스와 실제로 일치합니다. 이 외에도 Cloudflare는 ASN 블록 및 공용 목록을 포함한 여러 가지 유효성 검사 방법을 사용합니다. 고객에게 이러한 유효성 검사 유형을 사용할 수 없는 경우라면 Cloudflare 내부 데이터와 기계 학습을 사용하여 양호한 봇의 합법적 IP 주소를 식별합니다.

양호한 봇으로부터의 트래픽을 허용하려면 방화벽 규칙에 있는 [검증된 봇](https://developers.cloudflare.com/ruleset-engine/rules-language/fields#dynamic-fields) 필드를 사용합니다.

___

## 양호한 봇을 실행하고 있으며 이를 허용 목록(cf.bot\_management.verified\_bot)에 추가하고자 합니다. 어떻게 해야 하나요?

Cloudflare는 [Cloudflare 레이더](https://radar.cloudflare.com/verified-bots)에 확인된 봇의 표본 목록을 유지합니다.

봇 운영자로서 Cloudflare에 확인된 봇으로 등록되기 위해서는 봇이 Cloudflare의 [확인된 봇 공개 정책](https://developers.cloudflare.com/bots/reference/verified-bots-policy/)을 따라야 합니다.귀사의 봇이 이 기준을 충족한다면 이 [온라인 신청서](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link)를 제출하시기 바랍니다.

___

## 봇 관련 문제 해결에 필요한 정보

봇 관련 제품에 문제가 있어 지원 요청을 내실 때는 다음 정보를 포함하시기 바랍니다.

-   RayID
-   IP 주소
-   방화벽 규칙 ID, 규칙 표현식, 캡차 해결 비율
-   긍정 오류에서 많이 발견되는 사용자 에이전트
-   긍정 오류에서 많이 발견되는 ASN
-   방화벽의 특이한 활동을 보여주는 스크린샷(예: 그래프 상 인증 질문을 받는 트래픽이 급증한 경우)
-   문제가 있는 URI 또는 경로
-   도메인의 구성 방식에 대한 개략적 설명.
    -   다른 구간은 SaaS용 SSL가 아니고 한 구간만 SaaS용 SSL인지 여부
    -   대부분의 API 트래픽이 특정 URI로 전송되는지 여부
    -   기대되는 모바일 트래픽의 양

___

## 봇 차단 모드(BFM) 또는 슈퍼 봇 차단 모드(SBFM)에서 긍정 오류가 발생하면 어떻게 해야 하나요?

**BFM****/SBFM 기능을 비활성화하는 방법**

BFM/SBFM 기능 사용 중 문제(예: 긍정 오류)가 발생한다면 **보안** > **봇**에서 비활성화하시기 .

-   **Free** 요금제의 경우, **봇 차단 모드** 옵션을 **꺼짐**으로 합니다.
-   **Pro** 요금제의 경우, **슈퍼 봇 차단 모드 구성** 링크를 클릭한 후 **명확한 자동화** 및 **확인된 봇**을 **허용**으로 설정하고 **정적 자원 보호** 및 **JavaScript 감지** 옵션을 **꺼짐**으로 전환합니다
-   **Business** 요금제 및 **Enterprise** 요금제(봇 관리 추가 기능이 없는 상태)의 경우, **슈퍼 봇 차단 모드** 링크를 클릭한 후 **명확한 자동화**, **자동화 가능성 높음**, **확인된 봇**을 **허용**으로 설정하고 **정적 자원 보호** 및 **JavaScript 감지** 옵션을 **꺼짐**으로 전환합니다

___

## 슈퍼 봇 차단 모드(SBFM)를 껐는데도 여전히 요청을 차단하고 있습니다. 이유가 무엇인가요?

이는 알려진 문제점으로 봇 팀이 조속히 해결하기 위해 노력하고 있습니다. 그 때까지는 이를 해결하기 위한 임시 해결책이 있습니다. 다음 API 명령을 실행해 SBFM 규칙 세트를 확인하고 제거해야 합니다.

1\. 구역 수준에서의 기존 규칙 세트 목록 작성


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X GET &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

2\. 1단계의 출력에서 해당 구역의 SBFM 구성에 연결된 규칙 세트 ID를 찾습니다. 해당 규칙 세트의 `"kind": "zone"` 및 `"phase": "http_request_sbfm"`를 찾을 수 있을 것입니다.

3\. 찾은 규칙 세트 ID를 이용해 SBFM 규칙 세트 삭제


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X DELETE &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets/rulesets_id&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

<key>는 고객의 API 키로 교체해야 합니다. 해당 키는 [API 토큰](https://dash.cloudflare.com/profile/api-tokens)에서 찾을 수 .

___

## 관련 자료

-   [Cloudflare 봇 관리](https://developers.cloudflare.com/bots/)(개발자 문서)
-   [Cloudflare 방화벽 규칙](https://developers.cloudflare.com/firewall/cf-firewall-rules/)(개발자 문서)
-   [Cloudflare 봇 관리: 기계 학습 등](https://blog.cloudflare.com/cloudflare-bot-management-machine-learning-and-more/)(Cloudflare 블로그)
-   [봇 차단: 기계 학습의 실천적 교훈](https://blog.cloudflare.com/stop-the-bots-practical-lessons-in-machine-learning/)(Cloudflare Blog)
