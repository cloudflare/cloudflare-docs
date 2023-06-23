---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360020739772-Cloudflare-Logs-ELS-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-DDoS-%ED%8A%B8%EB%9E%98%ED%94%BD-%EC%A1%B0%EC%82%AC-%EA%B8%B0%EC%97%85-%EC%9A%94%EA%B8%88%EC%A0%9C%EC%97%90%EB%A7%8C-%ED%95%B4%EB%8B%B9-
title: Cloudflare Logs(ELS)를 사용한 DDoS 트래픽 조사(기업 요금제에만 해당)
---

# Cloudflare Logs(ELS)를 사용한 DDoS 트래픽 조사(기업 요금제에만 해당)

_Cloudflare Logs(구 ESL)를 효율적으로 정렬해 악의적인 트래픽의 출처를 파악하는 방법을 알아봅니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/360020739772-Cloudflare-Logs-ELS-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-DDoS-%ED%8A%B8%EB%9E%98%ED%94%BD-%EC%A1%B0%EC%82%AC-%EA%B8%B0%EC%97%85-%EC%9A%94%EA%B8%88%EC%A0%9C%EC%97%90%EB%A7%8C-%ED%95%B4%EB%8B%B9-#3HsXqW7d3IsVSiXaSahndu)
-   [1단계: Cloudflare Logs에 쿼리를 입력하기 전에 필요한 정보 수집](https://support.cloudflare.com/hc/ko/articles/360020739772-Cloudflare-Logs-ELS-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-DDoS-%ED%8A%B8%EB%9E%98%ED%94%BD-%EC%A1%B0%EC%82%AC-%EA%B8%B0%EC%97%85-%EC%9A%94%EA%B8%88%EC%A0%9C%EC%97%90%EB%A7%8C-%ED%95%B4%EB%8B%B9-#5M6vcNVVDhT11LZLh4j9Sb)
-   [2단계: 로그 다운로드 및 저장](https://support.cloudflare.com/hc/ko/articles/360020739772-Cloudflare-Logs-ELS-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-DDoS-%ED%8A%B8%EB%9E%98%ED%94%BD-%EC%A1%B0%EC%82%AC-%EA%B8%B0%EC%97%85-%EC%9A%94%EA%B8%88%EC%A0%9C%EC%97%90%EB%A7%8C-%ED%95%B4%EB%8B%B9-#2jBVMFoEjzNQo8pBRDIDZA)
-   [3단계: 로그 정렬](https://support.cloudflare.com/hc/ko/articles/360020739772-Cloudflare-Logs-ELS-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-DDoS-%ED%8A%B8%EB%9E%98%ED%94%BD-%EC%A1%B0%EC%82%AC-%EA%B8%B0%EC%97%85-%EC%9A%94%EA%B8%88%EC%A0%9C%EC%97%90%EB%A7%8C-%ED%95%B4%EB%8B%B9-#2tevqpfbZxVtOz6bAILuu8)
-   [워크플로 예제](https://support.cloudflare.com/hc/ko/articles/360020739772-Cloudflare-Logs-ELS-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-DDoS-%ED%8A%B8%EB%9E%98%ED%94%BD-%EC%A1%B0%EC%82%AC-%EA%B8%B0%EC%97%85-%EC%9A%94%EA%B8%88%EC%A0%9C%EC%97%90%EB%A7%8C-%ED%95%B4%EB%8B%B9-#bNjbvBfyV4w7fQ9iHGUVV)

___

## 개요

Cloudflare Logs(구 ESL)에서는 DDoS 공격과 관련된 패턴을 나타내는 트래픽을 분석할 수 있는 유용한 데이터에 액세스할 수 있습니다. Cloudflare 로그 데이터를 정렬함으로써 이러한 분석은 수행할 수 있습니다. 아래에 설명된 단계를 수행하고 제공된 워크플로 예제를 검토함으로써, 시작해 보세요.

사전에 준비해야 할 항목은 다음과 같습니다.

-   [cat](http://www.linfo.org/cat.html)
-   [jq](https://stedolan.github.io/jq/)
-   [Cloudflare Logs Logpull API](https://support.cloudflare.com/hc/ko/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)

___

다음의 정보를 수집합니다.

1.  구역 관리자의 이메일 주소
2.  구역 ID(**Overview**\>**Zone ID**)
3.  클라이언트 API 키
4.  시작 시간(형식 예시: 1529171100)
5.  종료 시간(형식 예시: 1529171100)

___

## 2단계: 로그 다운로드 및 저장

Cloudflare 엔드포인트에는 1시간의 시간제한이 있으며, 로그 파일의 크기는 요청당 1GB 미만이어야 합니다. 파일 크기가 1GB를 초과하면, 요청된 시간에 기록된 이벤트가 포함되어 있지 않더라도 1GB 이후로 다운로드가 중단됩니다. 로그가 잘리지 않도록 하려면 로그 파일 크기가 1GB 미만이 될 때까지 시간을 1시간에서 45분으로 줄여야 합니다.

### 옵션 1:

Cloudflare Logs에서 \*모든\* 필드를 다운로드해 els.txt로 저장합니다.

템플릿:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=(curl -s -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

예(값 포함):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/5b5f0xxxcbfbaxxxxxx0416d22f7b/logs/received?start=1529171100&amp;end=1529171100&amp;fields=(curl -s -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

### 옵션 2:

Cloudflare Logs에서 \*특정\* 필드를 다운로드해 els.txt로 저장합니다.

이 명령어는 사용자가 요청한 로그에서 _CacheCacheStatus, CacheResponseBytes, CacheResponseStatus, CacheTieredFill, ClientASN_ 필드만 포함합니다.

Cloudflare Logs 필드의 전체 목록은 [여기](https://support.cloudflare.com/hc/ko/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)에서 확인할 수 있습니다. 템플릿:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:email&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

예(값 포함):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:monkey@bannana.com&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/xx5x0xxxc45baxxxxxx0x6d23fxx/logs/received?start=1529171100&amp;end=1529171100&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

___

## 3단계: 로그 정렬

로그를 필드 값으로 정렬해 파일로 출력합니다.

-   HTTP 200 응답을 기준으로 정렬해 els-200.txt라는 이름의 파일로 출력합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

-   HTTP 525 응답을 기준으로 정렬해 els-525.txt라는 이름의 파일로 출력합니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:525,&quot; &gt; els-525.txt</span></div></span></span></span></code></pre>{{</raw>}}

### ':525,'가 속하는 필드

_:525,_ 패턴(콜론, 상태 코드, 쉼표)은 _EdgeResponseStatus_ 필드에 속하는 고유한 값입니다. 콜론과 쉼표 없이 HTTP 상태 코드 _525_를 검색하는 경우에도 _EdgeStartTimeStamp_처럼 다른 필드에 _525_ 패턴이 있는 로그 항목이 포함됩니다. EdgeStartTimeStamp는 많은 숫자로 구성되기 때문에 가끔씩 _525_라는 숫자 배열이 포함될 수 있습니다.

![EdgeResponseStatus 필드가 강조된 출력 파일 스크린샷
](/images/support/hc-external-edge_response_status_ELS.png)

출력 파일(els-200.txt and els-525.txt)은 원본 상태로는 가독성이 떨어집니다. 가독성을 높이려면, 다음의 명령어에 jq를 사용하세요.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-525.txt | jq '.'</span></div></span></span></span></code></pre>{{</raw>}}

### 필드 값으로 요청 수를 계산해 파일로 출력하기

이 예에서는 Cloudflare Logs의 _ClientSSLProtocol_ 필드에 표시된 SSL 프로토콜 버전별로 요청의 수를 셉니다(필드 이름 앞 마침표에 주의).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientSSLProtocol els-200.txt |sort -n |uniq -c |sort -n &gt; ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}

### 출력 예:

![ELS 로그를 정렬할 때 출력 예를 보여주는 스크린샷
](/images/support/hc-import-11.png)

_ClientRequestURI, ClientIP, ClientRequestUserAgent, ClientCountry_ 및 _ClientRequestHost_ 필드는 일반적으로 이러한 형식의 로그에서 공격 패턴을 찾는 데 가장 유용합니다.

-   _ClientRequestUserAgent_를 기준으로 정렬하면 사용자 에이전트 차단 규칙을 설정할 수 있습니다.
-   _ClientCountry_를 기준으로 정렬하면 국가별로 방화벽 규칙을 설정할 수 있습니다.
-   _ClientRequestURI_를 기준으로 정렬하면 요청이 가장 많은 페이지에 속도 제한 규칙을 설정할 수 있습니다.

___

## 워크플로 예제

공격의 출처를 분석해 파악하기 위해 다양한 필드로 로그를 분류해야 하는 경우가 많습니다. 다음의 워크플로를 예로 살펴보겠습니다.

**조치 1**: 다운로드한 Cloudflare Logs를  _HTTP 200_ 응답 기준으로 정렬해 els-200.txt로 출력합니다.

**이유**: HTTP _503_ 또는 _403_ 응답을 반환하는 요청처럼 이미 Cloudflare에 의해 차단된 응답을 확인할 필요는 없습니다. 에지에서 _HTTP 200_ 응답을 반환하는 요청은 Cloudflare에 의해 차단되지 않았으며 콘텐츠가 Cloudflare 에지에 캐시로 저장되지 않은 경우 원본 웹 서버까지 도달할 확률이 큽니다. 이러한 요청이 악성 공격인 경우에는 원본 웹 서버의 과부하를 유발합니다.

**방법**:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt | grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

**조치 2**: 'HTTP 200 only' 로그를 URI 기준으로 정렬해 els-200-URI.txt로 출력합니다.

**이유**: 200 응답 중에서 요청이 가장 많은 페이지를 확인해야 합니다. **방법**:

상위 URI를 찾습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientRequestURI els-200.txt |sort -n |uniq -c |sort -n &gt; els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}

이 목록에서 하나의 URI를 선택해 로그 항목을 해당 URI와 함께 본래 파일로 출력합니다. 아래의 명령어에서 _/ClientRequestURI/path/to/something/_를 선택한 URI로 대체하면 이 작업을 수행할 수 있습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200.txt| grep &quot;/ClientRequestURI/path/to/something/&quot; &gt; els-200-URI-1.txt</span></div></span></span></span></code></pre>{{</raw>}}

**조치 3**: URI 특정 'HTTP 200 only' 응답을 IP 주소 기준으로 정렬해 els-200-URI-1-Top-IP.txt로 출력합니다.

**이유**: URI를 요청해 200 응답을 반환하는 상위 IP 주소를 확인해야 합니다.

**방법:**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientIP els-200-URI-1.txt |sort -n |uniq -c |sort -n &gt; els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

**파일의 내용을 출력합니다.**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

요청 URI와 이러한 URI를 요청하는 IP를 기준으로 HTTP 200 응답의 범위를 좁힐 수 있습니다. 반대로, 상위 IP 주소로 로그 항목의 범위를 줄여 어떤 URI가 IP 주소에 가장 많이 요청되는지를 확인해 로그를 정렬할 수도 있습니다.
