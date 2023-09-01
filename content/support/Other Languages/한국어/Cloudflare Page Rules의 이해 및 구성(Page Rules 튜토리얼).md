---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-
title: Cloudflare Page Rules의 이해 및 구성(Page Rules 튜토리얼)
---

# Cloudflare Page Rules의 이해 및 구성(Page Rules 튜토리얼)

_요청이 사용자가 정의한 URL 패턴 중 하나와 일치하면, Page Rules는 특정 조치를 트리거합니다. 페이지 규칙을 작성 및 편집하는 방법과 사용 가능한 여러 설정을 알아봅니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-#h_5a7SkOsNo5d5LE7e9IRiz)
-   [시작하기 전에](https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-#h_7rzfw5kI8cqu4VKur6Mnur)
-   [페이지 규칙 생성](https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-#h_38Gq7mduJiXIjpVLxp3q19)
-   [페이지 규칙 편집](https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-#h_2WLkFHGqwlRgnZg3i0fl9I)
-   [와일드카드 일치 및 참조 이해](https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-#h_6N5SySNYCjYUUnCKnC1Ea6)
-   [Page Rules 설정 요약](https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-#h_18YTlvNlZET4Poljeih3TJ)
-   [알려진 문제점](https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-#h_5lzcszkjqrZ2bZpZOtMQoP)
-   [추가 정보](https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-#h_2VORFoOUImLy7rpTgEWYLM)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/218411427-Cloudflare-Page-Rules%EC%9D%98-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EA%B5%AC%EC%84%B1-Page-Rules-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-#h_7hlLS0cORjDJ2NCQqZTp8X)

___

## 개요

특정 URL 패턴이 일치할 때마다 하나 이상의 동작을 트리거하도록 페이지 규칙을 정의할 수 있습니다. Page Rules는 **Page Rules** 앱의 **Page Rules** 앱에 있습니다.

허용되는 페이지 규칙의 기본 수는 아래에 정리된 것처럼 도메인 요금제에 따라 다릅니다.

| **요금제** | **허용되는 페이지 규칙** |
| --- | --- |
| 
무료

 | 

3

 |
| 

프로

 | 

20

 |
| 

비즈니스

 | 

50

 |
| 

기업

 | 

125

 |

Free, Pro, Business 요금제 도메인의 경우,  [추가 규칙(최대 100개)을 구매](https://www.cloudflare.com/features-page-rules/) 할 수 있습니다.

___

## 시작하기 전에

Page Rules의 두 가지 기본 동작을 이해해야 합니다.

-   요청에 대해 일치된 페이지 규칙 중 우선순위가 가장 높은 규칙만 적용됩니다.
-   페이지 규칙은 Cloudflare 대시보드에서 위에서부터 우선순위가 높은 규칙이 배열됩니다.

Page Rule은 다섯 부분으로 구성된 <scheme>://<hostname><:port>/<path>?<query\_string>의 형식에 기초해 URL 패턴의 일치 여부를 검사합니다.

이러한 4개의 부분이 있는 예시 URL은 다음과 같습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.example.com:443/image.png?parameter1=value1</span></div></span></span></span></code></pre>{{</raw>}}

_scheme_과 _port_는 선택 사항입니다. _scheme_을 생략하면,  _http://_와 _https://_ 프로토콜 모두에 일치됩니다. _port_가 지정되지 않으면, 모든 포트에 일치됩니다.

마지막으로, 언제든지 페이지 규칙을 비활성화할 수 있습니다. 특정 규칙을 비활성화하면 조치는 트리거되지 않지만, **Rules** 앱의 **Page Rules** 탭에는 표시되고 편집할 수 있으며 도메인에 허용되는 규칙 수에 포함됩니다.  _초안으로 저장_   옵션을 사용하면, 생성된 페이지 규칙은 기본적으로 비활성화됩니다.

___

## 페이지 규칙 생성

페이지 규칙을 작성하는 단계는 다음과 같습니다.

1.  Cloudflare dashboard에 로그인합니다.
2.  페이지 규칙을 추가할 도메인을 선택합니다.
3.  **Rules** 앱을 클릭합니다.
4.  **Page Rules** 탭에서 **페이지 규칙 작성**을 클릭합니다. _<your domain>의 페이지 규칙 생성_ 대화 상자가 표시됩니다.
5.   **URL이 일치하는 경우**에 규칙과 일치해야 하는 URL 또는 URL 패턴을 입력합니다. [_와일드 카드 일치에 대해 자세히 보기_](https://support.cloudflare.com/hc/ko/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_6N5SySNYCjYUUnCKnC1Ea6)
6.  다음으로 **설정:**에서 **+ 설정 추가**를 클릭하고, 드롭다운에서 원하는 설정을 선택합니다. 하나의 규칙에 둘 이상의 설정을 포함할 수 있습니다. 설정에 대한 자세한 내용은 아래의 [요약](https://support.cloudflare.com/hc/ko/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ)을 참조하세요.
7.  **순서** 드롭다운에서 _최초, 마지막_, _사용자 지정_ 중 원하는 순서를 지정합니다.
8.  다음 옵션 중 한 가지를 클릭해 저장합니다.
    -   **초안으로 저장** 하면 규칙을 저장하고 비활성화합니다.
    -   **저장 및 배포** 를 선택하면 규칙을 저장하고 즉시 활성화합니다.

___

## 페이지 규칙 편집

기존 규칙을 수정하려면 다음을 수행합니다.

1.  Cloudflare dashboard에 로그인합니다.
2.  페이지 규칙을 편집할 도메인을 선택합니다.
3.  **Rules** 앱을 클릭합니다.
4.  **Page Rules** 탭에서 편집할 규칙을 찾습니다.
5.  다음과 같이 필요한 내용을 변경합니다.
    -   규칙을 활성화하거나 비활성화하려면 **켜짐/꺼짐** 토글을 클릭합니다.
    -   URL 패턴, 설정, 순서를 수정하려면 **편집** 버튼(렌치 아이콘)을 클릭합니다. 대화 상자에 변경할 정보를 입력합니다.
    -   규칙을 삭제하려면 **삭제** 버튼(x 아이콘)을 클릭하고 **확인** 대화 상자에서 **확인**을 클릭합니다.

___

## 와일드카드 일치 및 참조 이해

URL 세그먼트에서 별표(\*)를 사용하면 특정 패턴에 일치시킬 수 있습니다. 예:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/t*st</span></div></span></span></span></code></pre>{{</raw>}}

다음과 일치합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/test</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/toast</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/trust</span></div></span></span></span></code></pre>{{</raw>}}

_example.com/foo/\*_은 example.com/foo와 일치하지 않습니다. 하지만, _example.com/foo\*_은 일치합니다.

### 유용한 팁

-   _http_와 _https_를 모두 일치시키려면 _example.com_을 작성합니다. _\*example.com_이라고 쓸 필요는 없습니다.
-   도메인의 모든 페이지를 일치시키려면, _example.com/\*_로 씁니다. _example.com_이라고만 쓰면 안 됩니다.
-   도메인과 하위 도메인의 모든 페이지를 일치시키려면 _example.com/\*_로 씁니다. _example.com_이라고만 쓰면 안 됩니다.
-   Page Rule URL의 와일드 카드(\*)는 문자가 없는 경우에도 일치하며 쿼리 문자열을 포함하여 URL의 모든 부분을 포함할 수 있다.

### 와일드카드 일치 참조

일치한 와일드카드는 추후에 _$X_  구문을 사용하여 참조할 수 있습니다. _X_는 glob 패턴의 색인을 표시합니다. 즉, $1은 첫 번째 와일드카드 일치, $2는 두 번째 와일드카드 일치를 나타냅니다.

이는  _URL 전달_  설정 시 특히 유용합니다. 예:

다음을


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://*.example.com/*</span></div></span></span></span></code></pre>{{</raw>}}

다음으로 전달할 수 있습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/$1/$2.jpg</span></div></span></span></span></code></pre>{{</raw>}}

이 규칙은


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://cloud.example.com/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

일치하며, 따라서 다음으로 전달됩니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/cloud/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

URL 전달에서  _$_  문자를 사용하려면, 앞에 "\\"를 추가하여 이를 _\\$_와 같이 이스케이프 문자를 만듭니다. 

___

요청이 페이지 규칙에 지정된 URL 패턴과 일치하게 되면 Cloudflare가 취하는 조치를 설정이 제어합니다. 설정을 이용하여 다수의 대시보드 앱에서 다수의 Cloudflare 기능을 활성화하거나 비활성화할 수도 있습니다. 다음을 참고하시기 바랍니다.

-   설정 중에는 Pro, Business, Enterprise 요금제 도메인에만 적용되는 것도 있습니다.
-   규칙이 트리거될 때 적용할 설정을 둘 이상 지정할 수 있습니다.

다음은 사용 가능한 전체 설정 목록을 **Cloudflare Page Rules** UI에 나타나는 순서대로 정리한 것입니다.

| 
**설정**

 | 

**설명**

 | 

**요금제**

 |
| --- | --- | --- |
| 

HTTPS 항상 사용

 | 

**Cloudflare SSL/TLS** 앱의 **에지 인증서** 탭에 있는 **[항상 HTTPS](/ssl/edge-certificates/additional-options/always-use-https)** 기능을 켜거나 끕니다. 활성화되면, 모든 _http://_ URL은 301 리디렉션을 통해 _https://_로 변환됩니다.

이 옵션이 표시되지 않으면 활성  **에지 인증서**가 없는 것입니다.

 | 

-   전체

 |
| 

자동 최소화

 | 

자동으로 축소할 파일 확장자를 표시합니다.[자세히 알아보세요](https://support.cloudflare.com/hc/articles/200168196).

 | 

-   전체

 |
| 

Automatic HTTPS Rewrites

 | 

**Cloudflare SSL/TLS** 앱의 **Edge 인증서** 탭에서 **Cloudflare 자동 HTTPS 재작성** 기능을 켜거나 끕니다.[자세히 알아보세요](/ssl/edge-certificates/additional-options/automatic-https-rewrites).

 | 

-   전체

 |
| 

브라우저 캐시 TTL

 | 

클라이언트 브라우저가 캐시한 자원이 유효한 상태로 유지되는 기간을 제어합니다. Cloudflare UI 및 API 모두 Enterprise 도메인이 아닌 경우, **브라우저 캐시 TTL** 을 _0_으로 설정할 수 없습니다. [자세히 알아보세요](/cache/how-to/edge-browser-cache-ttl/).

 | 

-   전체

 |
| 

브라우저 무결성 검사

 | 

방문자의 브라우저에서 스패머 및 특정 봇에 많이 연결되는 헤더를 검사합니다. [자세히 알아보세요](https://support.cloudflare.com/hc/articles/200170086).

 | 

-   전체

 |
| 

쿠키에 대한 캐시 무시

 | 

정규식이 요청에 있는 쿠키 이름과 일치하는 경우, 캐시를 우회하고 원본 서버의 자원을 페치합니다.

하나의 페이지 규칙에 이 설정과 _Cache On Cookie_ 설정을 같이 넣으면, _Cache On Cookie_가 _Bypass Cache on Cookie_ 설정에 우선합니다.

_제한된 정규식 지원에 대해 학습하려면 아래의 세부 사항을 참조하시기 바랍니다._

 | 

-   비즈니스
-   기업

 |
| 

장치 유형별 캐시

 | 

방문자의 장치 유형에 따라 캐시하는 콘텐츠를 구분합니다. [자세히 알아보세요.](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only)

 | 

-   기업

 |
| 

캐시 속임수 방어

 | 

정적 자산의 캐시를 허용하면서 웹 캐시 속임수 공격으로부터 보호합니다. 이 설정은 URL의 확장이 반환된 _Content-Type_과 일치하는지 확인합니다.[자세히 알아보세요.](/cache/cache-security/cache-deception-armor/)

 | 

-   전체

 |
| 

캐시 키

 | 

 _사용자 정의 캐시 키_라고도 합니다.

어떤 자원을 캐시할지 결정할 때 포함할 변수를 구체적으로 제어합니다. 이를 통해, URL만이 아니라 다른 정보에 따라 어떤 것을 캐시할지 결정할 수 있습니다. [자세히 알아보세요](/cache/how-to/cache-keys/).

 | 

-   기업

 |
| 

캐시 수준

 | 

선택한 옵션에 따라 사용자 정의 캐싱을 적용합니다.

**Bypass** \- Cloudflare는 캐시하지 않습니다.

**쿼리 문자열 없음** -  쿼리 문자열이 없는 경우 캐시에서 자원을 전달합니다.

**쿼리 문자열 무시** - 쿼리 문자열과 무관하게 모든 사용자에게 동일한 자원을 전달합니다.

**표준 -** 쿼리 문자열이 있는 모든 정적 콘텐츠를 캐시합니다.

**모두 캐시** - 모든 콘텐츠를 정적인 것으로 간주하고 [Cloudflare 기본 캐시 콘텐츠](/cache/concepts/default-cache-behavior#default-cached-file-extensions) 이외의 모든 파일 유형을 캐시합니다. 페이지 규칙에서 **Edge Cache TTL**도 설정하지 않았다면, 원본 웹 서버의 캐시 헤더를 따릅니다. **Edge Cache TTL > 0과 결합된 경우**_0_,**모두 캐시**는 원본 웹 서버 응답에서 쿠키를 제거합니다.   


 | 

-   전체

 |
| 

쿠키에 따른 캐시

 | 

쿠키 이름에 대한 정규식 일치를 기반으로 _모두 캐시_ 옵션(_캐시 수준_ 설정)을 적용합니다.

같은 페이지 규칙에 이 설정과  _쿠키에 대한 캐시 무시_  설정을 같이 넣으면, _쿠키에 따라 캐시_가  _쿠키에 대한 캐시 무시_ 설정에 우선합니다.

 | 

-   비즈니스
-   기업

 |
| 

상태 코드를 이용한 캐시 TTL

 | 

Enterprise 고객은 원본 웹 서버의 응답 상태에 따라 캐시 TTL(Time-to-live)을 설정할 수 있습니다. 캐시 TTL이란 Cloudflare 네트워크에 있는 자원이 진부화되었다고 표시되거나 캐시에서 폐기되기 전까지의 시간을 말합니다. 자원의 원본에서 상태 코드가 반환됩니다. 응답 상태에 따라 캐시 TTL을 설정하면 정적 파일에 대한 기본 캐시 작업(표준 캐시)가 재정의되고 원본 웹 서버가 보내는 캐시 지침도 재정의됩니다. 비정적 자산을 캐시하려면, Page Rule을 이용해 캐시 수준을 '모두 캐시'로 설정하시기 바랍니다. 비저장 캐시 제어를 설정하거나 (max-age/s-maxage를 이용하여) TTL을 낮게 설정하면 원본 웹 서버에 대한 요청이 많아져 성능이 떨어집니다.[자세히 알아보세요.](https://support.cloudflare.com/hc/ko/articles/360043842472-Configuring-cache-TTL-by-status-code).

 | 

-   기업

 |
| 

앱 비활성화

 | 

활성 **Cloudflare Apps**를 모두 끕니다.

 | 

-   전체

 |
| 

성능 비활성화

 | 

다음을 끕니다.

-   [자동 최소화](https://support.cloudflare.com/hc/articles/200168196)
-   [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056)
-   [Mirage](https://support.cloudflare.com/hc/articles/200403554)
-   [Polish](https://support.cloudflare.com/hc/articles/360000607372)

 | 

-   전체

 |
| 

Railgun 비활성화

 | 

Cloudflare **Speed** 앱의 **Railgun** 기능을 끕니다.

 | 

-   비즈니스
-   기업

 |
| 

보안 비활성화

 | 

다음을 끕니다.

-   [이메일 난독화](https://support.cloudflare.com/hc/articles/200170016)
-   [속도 제한(이전 버전)](https://support.cloudflare.com/hc/articles/115001635128)
-   [Scrape Shield](https://support.cloudflare.com/hc/articles/200171036)
-   [서버 측 제외](https://support.cloudflare.com/hc/articles/200170036)
-   [URL(영역) 잠금](/waf/tools/zone-lockdown/)
-   [WAF 관리형 규칙(이전 버전)](https://support.cloudflare.com/hc/articles/200172016)

 | 

-   전체

 |
| 

에지 캐시 TTL

 | 

Cloudflare 에지 네트워크에서 자원을 캐시하는 기간을 지정합니다._Edge Cache TTL_ 은 응답 헤더에 보이지 않습니다. 최소 _Edge Cache TTL_은 요금제에 따라 다릅니다.

Free - 2시간  
Pro - 1시간  
Business - 1초  
Enterprise - 1초

 | 

-   전체

 |
| 

이메일 난독화

 | 

**Cloudflare Scrape Shield** 앱의 **Cloudflare 이메일 난독화** 기능을 켜거나 끕니다.[자세히 알아보세요.](https://support.cloudflare.com/hc/articles/200170016)

 | 

-   전체

 |
| 

URL 전달

 | 

_HTTP 301/302 리디렉션_을 사용하여 하나의 URL을 다른 URL로 리디렉션합니다.  _[와일드카드 일치 및 참조](https://support.cloudflare.com/hc/articles/218411427#h_6N5SySNYCjYUUnCKnC1Ea6)를 참조하시기 바랍니다._

 | 

-   전체

 |
| 

Host Header Override

 | 

특정 호스트 헤더를 적용합니다. [자세히 알아보세요](https://support.cloudflare.com/hc/articles/206652947).

 | 

-   기업

 |
| 

IP 위치 정보 헤더

 | 

Cloudflare는 방문자에 해당하는 국가 코드가 포함된 _CF-IPCountry_ HTTP 헤더를 추가합니다.

 | 

-   전체

 |
| 

Mirage

 | 

Cloudflare **Speed** 앱의 **Cloudflare Mirage**를 켜거나 끕니다.[자세히 알아보세요](https://support.cloudflare.com/hc/articles/200403554).

 | 

-   프로
-   비즈니스
-   기업

 |
| 

편의적 암호화

 | 

Cloudflare **SSL/TLS** 앱의 **에지 인증서** 탭에 있는 **Cloudflare 편의적 암호화** 기능을 켜거나 끕니다. [자세히 알아보세요](/ssl/edge-certificates/additional-options/opportunistic-encryption).

 | 

-   전체

 |
| 원본 캐시 제어 | Free, Pro, Business 요금제 도메인의 경우 [원본 캐시 제어](/cache/concepts/cache-control/)가 기본적으로 활성화되어 있으며, Enterprise 요금제 도메인의 경우 기본적으로 비활성화되어 있습니다. | 

-   전체

 |
| 

원본 오류 페이지 패스스루

 | 

원본 서버로부터 전송된 문제에서 생성된 Cloudflare 오류 페이지를 켜거나 끕니다. 이 설정이 활성화되면 원본에서 만들어진 오류 페이지가 트리거됩니다.

 | 

-   기업

 |
| 

Polish

 | 

Cloudflare  **Speed**  앱의  **Polish**  기능의 옵션을 적용합니다. [자세히 알아보세요](/images/polish).

 | 

-   프로
-   비즈니스
-   기업

 |
| 

Query String Sort

 | 

쿼리 문자열의 재배열을 켜거나 끕니다. 쿼리 문자열의 구조가 동일한 경우, 캐싱이 개선됩니다.[자세히 알아보세요](https://support.cloudflare.com/hc/articles/206776797).

 | 

-   기업

 |
| 

Resolve Override

 | 

이 설정에 지정된 값으로 원본 주소를 변경합니다. [자세히 알아보세요](https://support.cloudflare.com/hc/articles/206190798).

 | 

-   기업

 |
| 

강력한 ETags 존중

 | 

Cloudflare 캐시와 원본 서버 간에 바이트별 동등성 검사를 켜거나 끕니다. [자세히 알아보세요](https://support.cloudflare.com/hc/articles/218505467).

 | 

-   기업

 |
| 

응답 버퍼링

 | 

Cloudflare가 원본 서버에서 전체 파일을 받은 후 사이트 방문자에게 전달할지 여부를 켜거나 끕니다. 기본적으로 Cloudflare는 원본 서버에서 패킷이 도착하면 클라이언트로 패킷을 전송합니다.

 | 

-   기업

 |
| 

Rocket Loader

 | 

Cloudflare **Speed** 앱의 **로켓 로더**를 켜거나 끕니다. [자세히 알아보세요](https://support.cloudflare.com/hc/articles/200168056).

 | 

-   전체

 |
| 

보안 수준

 | 

**보안** 앱의 **보안 수준** 기능 제어 옵션. [자세히 알아보세요](https://support.cloudflare.com/hc/articles/200170056).

 | 

-   전체

 |
| 

서버 측 제외

 | 

Cloudflare **Scrape Shield** 앱의 **서버측 제외** 기능을 켜거나 끕니다. [자세히 알아보세요](https://support.cloudflare.com/hc/articles/200170036).

 | 

-   전체

 |
| 

SSL

 | 

Cloudflare **SSL/TLS** 앱에 있는 **에지 인증서** 탭의 **SSL** 기능에 대한 제어 옵션.[자세히 알아보세요.](/ssl/origin-configuration/ssl-modes)

 | 

-   전체

 |
| 

진정한 클라이언트 IP 헤더

 | 

Cloudflare **네트워크** 앱의 **True-Client-IP 헤더** 기능을 켜거나 끕니다. [자세히 알아보세요](https://support.cloudflare.com/hc/articles/206776727).

 | 

-   기업

 |
| 

웹 애플리케이션 방화벽(이전 버전)

 | 

**보안** > **WAF** > **관리형 규칙**에서 **WAF 관리형 규칙을 켜거나 끕니다**. [자세히 알아보세요](https://support.cloudflare.com/hc/articles/200172016).

Page Rules를 통해서는 WAF 관리형 규칙을 개별적으로 활성화/비활성화할 수 없습니다.

 | 

-   프로
-   비즈니스
-   기업

 |

___

## 알려진 문제점

**Page Rule 구성 문제로 인한 "****_오류 500(내부 서버 오류)_****"**

**근본 원인**: Page Rule의 문제로 인한 것일 수 있습니다. _전달 URL_ 규칙처럼 두 개의 와일드카드를 쓰는 Page Rule을 만들 때는 두 번째 와일드카드를 $2 자리표시자로 언급하는 경우가 있습니다. 다음 예를 참조하세요.

![두 개의 와일드카드가 있는 Page Rule 구성 예. 전달 URL에 $2 자리 표시자가 포함되어 있는데 이는 일치하는 내용으로 대체됩니다 ](/images/support/page-rule-create.png)

동일한 규칙을 업데이트할 때는 **If the URL matches** 필드의 와일드카드 하나를 제거하고 저장하면 됩니다. 다음 예를 참조하세요.

![전달 URL에 $2 자리 표시자가 포함되어 있으며 하나의 와일드 카드가 있는 잘못된 Page Rule. 이  ](/images/support/page-rule-update.png)

그렇게 하면 $2 자리표시자가 존재하지 않는 와일드카드를 참조하므로 URL이 해당 페이지 규칙을 트리거할 때 "_오류 500(내부 서버 오류)"_가 발생하게 됩니다.

**해결**: Page Rule을 업데이트하고 두 번째 와일드카드에 대한 _$2_ 참조를 제거합니다. 와일드카드가 하나만 있다면 _$1_만 이용할 수 있습니다.

___

## 추가 정보

### 쿠키에 대한 캐시 무시 설정

이 설정은 Business 및 Enterprise 요금제 고객에게 제공됩니다.

**쿠키에 대한 캐시 무시** 설정은 다음과 같이 기본 정규식을 지원합니다.

-   _OR_ 부울 논리를 사용하여 여러 쿠키를 일치시키는 파이프 연산자('|'로 표시). 예를 들어, bypass=.\*_| PHPSESSID = .\*_ 는 쿠키 값에 상관없이 bypass 또는 PHPSESSID라는 쿠키가 설정된 경우, 캐시를 생략합니다.
-   와일드카드 연산자 ('.\*'로 표시됨), “t.\*st=”의 규칙 값은 test라는 이름의 쿠키와 teeest라는 이름의 쿠키에 모두 일치.

제한사항은 다음과 같습니다.

-   쿠키 정규식당 150자
-   쿠키 정규식당 와일드카드 12개
-   쿠키 정규식에서 각 | 사이에 와일드카드 1개

다양한 플랫폼을 사용하여 **쿠키에 대한 캐시 무시**를 구성하는 방법은,

-   [WordPress 또는 WooCommerce에서 익명 페이지 뷰 캐시하기](https://support.cloudflare.com/hc/articles/236166048)
-   [Magento 1과 Magento 2에서 익명 페이지 뷰 캐시하기](https://support.cloudflare.com/hc/articles/236168808)
-   ['정적 HTML의 캐시 방법'을 참조하시기 바랍니다.](https://support.cloudflare.com/hc/articles/202775670)

**참고:** 이 설정과 Enterprise 요금제에만 제공되는 _쿠키에 따라 캐시_ 설정을 하나의 페이지 규칙에 추가하면 _쿠키에 따라 캐시_가 _쿠키에 대한 캐시 무시_ 보다 우선합니다.

### 구역 이름은 슬래시로 끝나야 합니다

Page Rule을 저장할 때, Cloudflare는 **URL이 일치하는 경우** 필드의 현재 구역 이름 뒤에 슬래시가 있도록 보장합니다. 예를 들어 현재 구역 이름이 `example.com`인 경우,

-   `example.com`은 `example.com/`으로 저장
-   `example.com/path/example.com`은 `example.com/path/example.com/`으로 저장

`example.com/some-path/cloudflare.com`은 구역 이름이 `cloudflare.com`이 아니므로 마지막에 슬래시가 _없이_ 저장됩니다.

### Page Rules가 지원하는 네트워크 포트

**If the URL matches** 필드 또는 Page Rule에서 포트를 지정하면 해당 포트는 다음 중 한 가지여야 합니다.

-   [Cloudflare 프록시와 호환되는](/fundamentals/get-started/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy) HTTP/HTTPS 포트 중 하나.
-   [Cloudflare Spectrum](/spectrum/) HTTPS 응용 프로그램의 사용자 지정 포트.

### Workers와 함께 Page Rules 사용하기

현재 요청의 URL이 Page Rule 및 [Workers 사용자 지정 경로](/workers/platform/routes)에 모두 일치하는 경우 Pages Rules 설정 중에는 적용되지 않는 것이 있습니다. Workers와 함께 Page Rules를 사용하는 방법에 대해서는 개발자 문서의 [Workers: Page Rules](/workers/configuration/workers-with-page-rules/)를 참조하시기 바랍니다.

___

## 관련 자료

-   [고려할 권장 Page Rules](https://support.cloudflare.com/hc/articles/224509547)
-   [오렌지색 / 회색 구름에 적합한 하위 도메인](https://support.cloudflare.com/hc/ko/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-)
-   [Cloudflare에서 모두 캐시를 사용하는 방법](https://support.cloudflare.com/hc/articles/202775670)
-   ['정적 HTML의 캐시 방법'을 참조하시기 바랍니다.](https://support.cloudflare.com/hc/articles/200172256)
-   [콘텐츠 관리 시스템의 관리 섹션을 업데이트하거나 액세스할 때의 오프라인 오류 메시지](https://support.cloudflare.com/hc/articles/200169526)
