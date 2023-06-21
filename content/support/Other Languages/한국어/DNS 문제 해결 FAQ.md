---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360020296512-DNS-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-FAQ
title: DNS 문제 해결 FAQ
---

# DNS 문제 해결 FAQ

## DNS 문제 해결 FAQ

_본 문서는 Cloudflare DNS의 일반적인 문제를 해결하기 위한 지침을 제공합니다._

### 이 문서에서

-   [왜 dc-######### 하위 도메인이 있습니까?](https://support.cloudflare.com/hc/ko/articles/360020296512-DNS-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-FAQ#h_84167303211544035341530)
-   [왜 DNS 쿼리가 잘못된 결과를 반환합니까?](https://support.cloudflare.com/hc/ko/articles/360020296512-DNS-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-FAQ#h_62993872051544035354776)
-   [A, AAAA 또는 CNAME 레코드를 찾을 수 없는 이유](https://support.cloudflare.com/hc/ko/articles/360020296512-DNS-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-FAQ#h_75993570981544035362746)
-   ['이름 서버가 변경됐습니다'라는 이메일을 받는 이유가 무엇입니까?](https://support.cloudflare.com/hc/ko/articles/360020296512-DNS-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-FAQ#h_752983037101544035373001)
-   [왜 DNS API를 통해 특정 TLD를 추가할 수 없습니까?](https://support.cloudflare.com/hc/ko/articles/360020296512-DNS-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-FAQ#h_84167303211544035341531)

___

## 왜 dc-######### 하위 도메인이 있습니까?

dc-##### 하위 도메인은 SRV 또는 _MX 레코드_가 Cloudflare로 프록시 설정하게 구성된 도메인을 확인할 때 발생하는 충돌을 극복하도록 추가됩니다.

따라서 Cloudflare는 원본 IP 주소로 확인되는 dc-##### DNS 레코드를 생성합니다. Cloudflare 프록시는 다른 모든 트래픽에 대해 작동하며 dc-##### 레코드는 MX 또는 SRV 레코드에 대한 트래픽이 프록시되지 않도록(원본 IP로 직접 확인됨) 보장합니다.

예를 들어 Cloudflare를 사용하기 전에 메일에 대한 DNS 레코드가 다음이었다고 생각해 보겠습니다.

`example.com MX example.com``example.com A 192.0.2.1`

Cloudflare를 사용하고 _A 레코드_를 프록시 설정하면, Cloudflare가 Cloudflare IP(아래의 예에서 203.0.113.1)와 함께 DNS 응답을 제공합니다.

`example.com MX example.com``example.com A 203.0.113.1`

메일 트래픽을 Cloudflare로 프록시 설정하면 메일 서비스가 중단되기 때문에, Cloudflare는 이 상황을 감지하고 dc-##### 레코드를 만듭니다.

`example.com MX dc-1234abcd.example.com``dc-1234abcd.example.com A 192.0.2.1` `example.com A 203.0.113.1`

dc-###### 레코드는 다음 중 한 방법으로만 삭제할 수 있습니다.

-   도메인에 대한 메일이 수신되지 않으면 _MX 레코드를 삭제_합니다.
-   도메인이 메일을 수신하면, _MX 레코드_를 업데이트하여 Cloudflare가 프록시 설정하지 않은 메일 하위 도메인에 대한 별도 _A 레코드_를 확인하세요.

`example.com MX mail.example.com``mail.example.com A 192.0.2.1``example.com A 203.0.113.1`

___

재귀 DNS 캐시가 복구하지 못하면, 타사 도구가 올바른 DNS 결과를 반환하지 못하는 경우가 있습니다. 이 경우 다음 방법으로 공용 DNS 캐시를 제거하세요.

-   [OpenDNS의 DNS 캐시 제거](http://www.opendns.com/support/cache/)
-   [Google의 DNS 캐시 제거](https://developers.google.com/speed/public-dns/cache)
-   [로컬로 DNS 캐시 제거](https://documentation.cpanel.net/display/CKB/How%2BTo%2BClear%2BYour%2BDNS%2BCache)

___

## A, AAAA 또는 CNAME 레코드를 찾을 수 없는 이유

_A, AAAA 또는 CNAME 레코드를 찾을 수 없다_는 것은 Cloudflare **DNS** 앱에 DNS 확인을 위한 적절한 레코드가 부족하다는 것입니다.

[누락된 DNS 레코드를 도메인에 추가](/dns/manage-dns-records/how-to/create-dns-records)하세요.

___

## '이름 서버가 변경됐습니다'라는 이메일을 받는 이유가 무엇입니까?

Cloudflare는, Cloudflare가 DNS를 호스팅하는 도메인에 대해, 도메인이 Cloudflare의 이름 서버를 이용하여 DNS를 확인하는지 계속하여 확인합니다. Cloudflare의 이름 서버가 사용되지 않는 경우 Cloudflare **Overview** 앱에서 도메인 상태가 _활성_에서 _이동됨_으로 변경되고 고객에게 이메일이 발송됩니다. 7일을 초과하여 _이동됨_ 상태에 있는 도메인은, 상태가 다시 _활성_으로 바뀌지 않으면 삭제됩니다.

이 문제를 해결하려면 도메인 등록 기관의 DNS를 업데이트하여 Cloudflare 이름 서버를 사용해야 합니다.

1.  [도메인 문제 해결 문서](https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-)의 2와 3단계를 따르세요.
2.  Cloudflare UI **Overview** 앱에서 **지금 다시 확인**을 클릭하세요.

___

## 왜 DNS API를 통해 특정 TLD를 추가할 수 없습니까?

DNS API는 .cf, .ga, .gq, .ml, 또는 .tk TLD를 포함한 도메인에 사용할 수 없습니다. 이러한 TLD를 관리하려면 Cloudflare dashboard를 사용하세요. Enterprise 고객은 [Cloudflare 지원팀](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730)에 문의하여 이 한계를 제거할 수 있습니다.
