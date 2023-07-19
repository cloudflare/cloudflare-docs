---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/221327488-%EC%99%9C-Cloudflare%EC%97%90%EC%84%9C-%EC%A0%9C-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%B4-%EC%82%AD%EC%A0%9C%EB%90%90%EC%8A%B5%EB%8B%88%EA%B9%8C-
title: 왜 Cloudflare에서 제 도메인이 삭제됐습니까
---

# 왜 Cloudflare에서 제 도메인이 삭제됐습니까?

## 왜 Cloudflare에서 제 도메인이 삭제됐습니까?

_본 문서에서는 Cloudflare 계정에서 삭제된 도메인을 조사하고 복구하는 절차를 소개합니다._

### 이 문서에서

-   [개요](https://support.cloudflare.com/hc/ko/articles/221327488-%EC%99%9C-Cloudflare%EC%97%90%EC%84%9C-%EC%A0%9C-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%B4-%EC%82%AD%EC%A0%9C%EB%90%90%EC%8A%B5%EB%8B%88%EA%B9%8C-#h_71645430211540423470679)
-   [Step 1 - Check Audit Logs in your Cloudflare account](https://support.cloudflare.com/hc/ko/articles/221327488-%EC%99%9C-Cloudflare%EC%97%90%EC%84%9C-%EC%A0%9C-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%B4-%EC%82%AD%EC%A0%9C%EB%90%90%EC%8A%B5%EB%8B%88%EA%B9%8C-#h_75178970471540423485029)
-   [Step 2 - Check whether domain registration lists Cloudflare nameservers](https://support.cloudflare.com/hc/ko/articles/221327488-%EC%99%9C-Cloudflare%EC%97%90%EC%84%9C-%EC%A0%9C-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%B4-%EC%82%AD%EC%A0%9C%EB%90%90%EC%8A%B5%EB%8B%88%EA%B9%8C-#h_84363930121540423493275)
-   [3단계 - 도메인 확인에서 Cloudflare 이름 서버를 사용하는지 확인](https://support.cloudflare.com/hc/ko/articles/221327488-%EC%99%9C-Cloudflare%EC%97%90%EC%84%9C-%EC%A0%9C-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%B4-%EC%82%AD%EC%A0%9C%EB%90%90%EC%8A%B5%EB%8B%88%EA%B9%8C-#h_670950877161540423505236)
-   [삭제된 도메인 복구](https://support.cloudflare.com/hc/ko/articles/221327488-%EC%99%9C-Cloudflare%EC%97%90%EC%84%9C-%EC%A0%9C-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%B4-%EC%82%AD%EC%A0%9C%EB%90%90%EC%8A%B5%EB%8B%88%EA%B9%8C-#h_88537939911540919764865)
-   [관련 자료](https://support.cloudflare.com/hc/ko/articles/221327488-%EC%99%9C-Cloudflare%EC%97%90%EC%84%9C-%EC%A0%9C-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%B4-%EC%82%AD%EC%A0%9C%EB%90%90%EC%8A%B5%EB%8B%88%EA%B9%8C-#h_186867048201540423513703)

___

## 개요

일반적인 도메인 삭제 이유:

-   도메인에 액세스 권한이 있는 사용자가 도메인을 삭제했습니다.
-   이름 서버가 더 이상 Cloudflare를 가리키지 않습니다. Cloudflare는 지속적으로 도메인 등록을 모니터링합니다.
-   도메인이 인증되지 않았습니다(60일 동안 보류).

___

## Step 1 - Check Audit Logs in your Cloudflare account

Cloudflare **Audit Logs** contain information about domain deletion.  Review [using the Audit Logs](https://support.cloudflare.com/hc/en-us/articles/115002833612-How-do-I-use-Audit-Logs-) for additional information about the **Audit Logs** feature.

1.  Log in to the Cloudflare dashboard.
2.  Click the appropriate Cloudflare account where the deleted domain existed.
3.  Click **Audit Log** in the second navigation bar from the top.
4.  For **Domain**, enter the domain name that was deleted.
5.  Click on a _Delete_ **Action** and ensure that **Resource** says _Account_.
6.  Observe the **Date**, **User IP Address**, and **User** that deleted the domain.
7.  If **User IP Address** is _127.0.0.1_ or contains no data, the deletion was automatically performed by Cloudflare’s systems: Move to Step 2 

___

## Step 2 - Check whether domain registration lists Cloudflare nameservers

1\. Use either the command-line based “whois” application provided with your Operating System or a website such as [whois.icann.org](https://whois.icann.org/en) or [www.whois.net](https://www.whois.net/).

-   If you are unable to find the nameserver details for your domain, reach out to your domain registrar or domain provider to provide the domain registration information.
-   Ensure Cloudflare’s nameservers are the only two nameservers listed in the domain registration details.
-   Ensure nameservers are spelled correctly in the domain registration.

2\. Confirm that the nameservers exactly match the nameservers provided within the **Cloudflare Nameservers** section of the Cloudflare **DNS** app.

3\. If you identify incorrect information, log in to your domain provider’s portal to make updates or contact your domain provider for assistance.

___

1\. Use command-line or third-party tools to confirm if Cloudflare's nameservers are configured:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +trace NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

+trace 옵션은 DNS 응답이 실패하면 상세 정보를 출력합니다. 이 정보는 DNS 공급자 문제를 해결할 때 유용한 경우가 많습니다.

@8.8.8.8 옵션을 이용하면 Google의 공용 DNS 확인자가 제공한 결과를 반환합니다. 결과를 통해, 공용 확인자가 DNS 응답을 받았는지 확인할 수 있습니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com 8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

-   쿼리 결과에 Cloudflare의 이름 서버 두 개만 반환됐는지 확인하세요.
-   철자가 잘못된 이름 서버가 있는지 확인하세요. 
-   Confirm the nameservers exactly match the nameservers provided within the **Cloudflare Nameservers** section of the Cloudflare **DNS** app.

2\. If you identify incorrect information, log in to your domain provider’s portal to make updates or contact your domain provider for assistance.

3\. If the nameserver and domain registration data are correct, reach out to your domain provider to confirm if there have been recent DNS propagation issues.

___

## 삭제된 도메인 복구

Cloudflare 대시보드의 상단 탐색 모음 오른쪽에 있는 **\+ 사이트 추가** 링크로 삭제된 도메인을 복구하세요.도메인은 새 도메인처럼 추가돼야 합니다.

___

## 관련 자료

-   [보조 이름 서버](https://support.cloudflare.com/hc/en-us/articles/360001356152-How-do-I-setup-and-manage-Secondary-DNS-)(Enterprise 요금제의 기능)
-   [CNAME 설정](/dns/zone-setups/partial-setup)(Business 및 Enterprise 요금제의 기능)
-   [이름 서버를 Cloudflare로 변경하는 방법](/dns/zone-setups/full-setup/setup)
