---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/217912538-DNS%EA%B0%80-%EC%9E%91%EB%8F%99%ED%95%98%EC%A7%80-%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4
title: DNS가 작동하지 않습니다
---

# DNS가 작동하지 않습니다

## DNS가 작동하지 않습니다

_본 문서는 DNS가 도메인에서 작동하지 않는 이유와 문제 해결 방법을 제공합니다._

___

## 증상

Safari나 Chrome 같은 웹 브라우저에는 몇 가지 일반적인 DNS 오류가 있습니다.

-   _이 사이트에 연결할 수 없습니다_
-   _이 웹페이지를 사용할 수 없습니다_
-   _err\_name\_not\_resolved_
-   _서버를 찾을 수 없습니다_
-   [_오류 1001 DNS 확인 오류_](https://support.cloudflare.com/hc/articles/360029779472#error1001)

___

## 일반적인 원인과 해결책

다음은 가장 일반적인 DNS 확인 오류 원인과 해결 방법입니다.

### 도메인 또는 하위 도메인 입력 오류

요청 URL에 도메인이나 하위 도메인의 철자를 올바로 입력했는지 확인하세요.

### DNS 레코드 없음

Cloudflare 대시보드의 **DNS** 앱에 필요한 DNS 레코드가 있는지 확인하세요. 다음 레코드가 있어야 합니다.

-   루트 도메인(예: _example.com_)
-   기존의 모든 하위 도메인(예: _www.example.com, blog.example.com_, 기타)

A 및 CNAME [DNS 레코드](/dns/manage-dns-records/how-to/create-dns-records) 설정 방법을 알아보세요.

### DNSSEC는 도메인이 Cloudflare에 추가된 후 비활성화됩니다

도메인을 Cloudflare에 추가하기 전에, 도메인 공급자에 [DNSSEC가 비활성화되지 않은 경우](https://support.cloudflare.com/hc/articles/205359838#h_94453043811540417238269), DNS 확인 실패가 발생합니다.

### 이름 서버가 더 이상 Cloudflare를 가리키지 않습니다

Cloudflare dashboard의 **DNS** 앱을 통해 DNS 레코드를 관리하지만 도메인이 Cloudflare 이름 서버를 가리키지 않은 경우 DNS 확인이 실패합니다. 이 문제는 도메인 등록 기관이 도메인의 이름 서버가 기본 이름 서버를 가리키게 전환한 경우 발생할 수 있습니다.이 문제인지 확인하려면 [도메인이 Cloudflare 이름 서버를 사용하는지 알아보세요.](https://support.cloudflare.com/hc/articles/4426809598605)

### 미확인 IP 주소

드물지만, URL을 요청하는 클라이언트의 DNS 확인자가 DNS 레코드의 유효한 IP 주소를 확인하지 못할 수도 있습니다. 잠시 기다린 후 페이지를 다시 로드하여 문제가 사라졌는지 확인하세요.이 문제는 Cloudflare와 관련이 없지만, [Cloudflare의 DNS 확인자](/1.1.1.1/setup/)를 사용하면 도움이 될 수 있습니다.호스팅 공급자에게 현재 DNS 확인자에 대한 추가 도움을 요청하세요.
