---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/209714777-ICP-%EB%B2%88%ED%98%B8%EC%9D%98-%EC%9D%B4%ED%95%B4%EC%99%80-%EC%84%A4%EC%A0%95
title: ICP 번호의 이해와 설정
---

# ICP 번호의 이해와 설정

## ICP 번호의 이해와 설정

_ICP 번호를 신청해 웹 사이트에 업로드하는 방법을 알아봅니다. 중국 본토 서버에서 호스팅되는 모든 도메인은 ICP가 필수입니다._

___

## 개요

ICP(Internet Content Provider) 번호는 중국 본토 서버에서의 웹사이트 호스팅이나 중국 본토 서버로부터의 콘텐츠 제공을 허가하는 정부 발행 등록 번호입니다. 중국 본토의 모든 공공 웹사이트는 반드시 ICP 번호를 웹 사이트 홈페이지에 표기해야 합니다.  호스팅 공급자는 ICP 번호가 없는 웹 사이트를 폐쇄해야 하며, 아무런 공지 없이 웹 사이트가 폐쇄되는 경우도 많습니다.

한 회사가 소유한 여러 개의 웹 사이트는 같은 ICP 번호를 사용할 수 있습니다. MIIT 웹 사이트에서 [이미 도메인에 할당된 ICP 번호가 있는지 여부를 확인](http://www.beian.miit.gov.cn/publish/query/indexFirst.action)할 수 있습니다.

___

## 필요한 서류

개인 자격으로 웹사이트를 소유한 경우, 일반적으로 다음의 서류를 제출해야 합니다.

-   ICP 신청 양식
-   신분증 사본
-   웹사이트 정보 인증 양식
-   도메인 인증서 사본

영리 기업을 대표하는 경우, 다음의 서류를 제출해야 합니다.

-   사업자 등록증 사본
-   조직 코드 인증서 

___

중국 산업정보기술부(MIIT)가 성 단위로 발행하는 ICP 번호에는 2가지 유형이 있습니다.

ICP 라이선스 - 예를 들어, 베이징 ICP 라이선스 번호 XXXXXXXX는 상업적인 웹 사이트에 발급되고, 상품이나 서비스를 온라인으로 판매하는 모든 웹 사이트를 대상으로 합니다. 이 라이선스는 상업적인 조직에만 부여되며 개인은 신청할 수 없습니다.

ICP 비안 - 예를 들어, 베이징 ICP 비안 등록 번호 XXXXXXXX는 개인 블로그처럼 비상업적인 웹 사이트에 발급되며, 직접 판매가 이루어지지 않는 웹 사이트가 대상 범위에 포함됩니다.

___

## ICP 신청 프로세스

ICP 라이선스는 호스팅 공급자나 클라우드 서비스 공급자를 통해 신청하는 것이 좋습니다. 공급자에게 필요한 서류를 제공해야 공급자가 사용자 대신 ICP 번호를 신청할 수 있습니다(위 에서_필요한 서류_ 참조).

필요한 모든 서류를 제출한 후 ICP 번호가 발급되기까지의 시간은 웹 사이트의 유형과 회사가 등록된 성에 따라 다르며, 약 4~8주가 소요됩니다. MIIT 등록 비용은 따로 없지만, 공급자가 비용을 청구할 수도 있습니다.

ICP 번호와 인증서가 발급됐다면 웹 사이트 홈페이지의 하단에 ICP 번호를 추가하세요.

![이전 URL: https://support.cloudflare.com/hc/article_attachments/360040367132/baidu_home_page.png
문서 ID: 209714777 | ICP 번호의 이해와 설정
](/support/static/hc-import-baidu_home_page.png)

___

## 관련 자료

[Cloudflare와 Yunjiasu 중 어떤 것을 선택해야 할까요?](https://support.cloudflare.com/hc/articles/209156358)
