---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/200169566-%EC%A4%91%EA%B5%AD%EC%97%90%EC%84%9C-%EC%B0%A8%EB%8B%A8%EB%90%9C-Cloudflare-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0
title: 중국에서 차단된 Cloudflare 도메인 문제 해결
---

# 중국에서 차단된 Cloudflare 도메인 문제 해결

### 이 섹션의 문서

-   [사이트 문제 해결을 위한 정보 수집](https://support.cloudflare.com/hc/ko/articles/203118044-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%A0%95%EB%B3%B4-%EC%88%98%EC%A7%91 "사이트 문제 해결을 위한 정보 수집")
-   [Cloudflare 지원팀에 문의](https://support.cloudflare.com/hc/ko/articles/200172476-Cloudflare-%EC%A7%80%EC%9B%90%ED%8C%80%EC%97%90-%EB%AC%B8%EC%9D%98 "Cloudflare 지원팀에 문의")
-   [웹 트래픽 급증 문제 해결](https://support.cloudflare.com/hc/ko/articles/200172906-%EC%9B%B9-%ED%8A%B8%EB%9E%98%ED%94%BD-%EA%B8%89%EC%A6%9D-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0 "웹 트래픽 급증 문제 해결")
-   [크롤링 오류 해결](https://support.cloudflare.com/hc/ko/articles/200169806-%ED%81%AC%EB%A1%A4%EB%A7%81-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0 "크롤링 오류 해결")
-   [누락된 이미지 문제 해결](https://support.cloudflare.com/hc/ko/articles/200169906-%EB%88%84%EB%9D%BD%EB%90%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0 "누락된 이미지 문제 해결")
-   [Facebook으로의 공유 문제 해결](https://support.cloudflare.com/hc/ko/articles/217720788-Facebook%EC%9C%BC%EB%A1%9C%EC%9D%98-%EA%B3%B5%EC%9C%A0-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0 "Facebook으로의 공유 문제 해결")
-   [중국에서 차단된 Cloudflare 도메인 문제 해결](https://support.cloudflare.com/hc/ko/articles/200169566-%EC%A4%91%EA%B5%AD%EC%97%90%EC%84%9C-%EC%B0%A8%EB%8B%A8%EB%90%9C-Cloudflare-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0 "중국에서 차단된 Cloudflare 도메인 문제 해결")

![](/images/support/513a9e8b35eaed0a35fce9cc22f9972e37872a33.png)

#### Cloudflare 커뮤니티에 가입하세요

[답 받기](https://community.cloudflare.com/)

1.  [Cloudflare 도움말 센터](https://support.cloudflare.com/hc/ko)
2.  [문제 해결](https://support.cloudflare.com/hc/ko/categories/200276217-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0)
3.  [일반 문제 해결](https://support.cloudflare.com/hc/ko/sections/200804937-%EC%9D%BC%EB%B0%98-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0)

## 중국에서 차단된 Cloudflare 도메인 문제 해결

_사용자의 Cloudflare 사이트가 중국의 방화장성(Great Firewall) 방화벽에 의해 차단되었는지를 확인합니다._

___

## 개요

도메인에 연결된 Cloudflare IP가 중국에서 차단된 경우, 다음의 세부 정보를 [Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476)에 제공해야 합니다.

1\. 네트워크 경로를 설명하는 중국 내 [도메인에 대한 추적 경로](http://support.cloudflare.com/entries/22050846-how-do-i-run-a-traceroute).

2\. [Great Firewall Checker](http://www.greatfirewallofchina.org/)의 결과.

3\. 중국 내 위치에서의 도메인에 대한 DNS 확인 응답. [DNS Checker](https://dnschecker.org/) 등 도구의 사용을 권장합니다.

4\. 사이트에서 호스팅하는 콘텐츠 타입.  중국은 음란물, 도박 및 특정한 유형의 정치 토론을 포함한 일부 콘텐츠를 검열하여 삭제합니다.

Cloudflare 지원팀은 도메인이 중국에서 차단되었는지만 확인할 수 있으며, 차단을 해제할 권한은 없습니다.
