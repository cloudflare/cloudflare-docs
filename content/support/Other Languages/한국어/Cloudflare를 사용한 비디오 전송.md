---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/360057976851-Cloudflare%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EB%B9%84%EB%94%94%EC%98%A4-%EC%A0%84%EC%86%A1
title: Cloudflare를 사용한 비디오 전송
---

# Cloudflare를 사용한 비디오 전송

## Cloudflare를 사용한 비디오 전송

### 이 문서에서

-   [Cloudflare 서비스 사용](https://support.cloudflare.com/hc/ko/articles/360057976851-Cloudflare%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EB%B9%84%EB%94%94%EC%98%A4-%EC%A0%84%EC%86%A1#h_5mvWTaW0VyVyibnzFh5EK3)
-   [저는 웹사이트 운영자인데, 제 컨텐츠가 서비스 약관 위반으로 리디렉션되었습니다.](https://support.cloudflare.com/hc/ko/articles/360057976851-Cloudflare%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EB%B9%84%EB%94%94%EC%98%A4-%EC%A0%84%EC%86%A1#h_17ENJA5McX8FiFmwFhbacY)
-   [저는 웹 사이트 방문자인데, 액세스하려고 하는 사이트에서 제가 예상하는 컨텐츠 대신 Cloudflare 서비스 약관을 참조하라는 메시지가 표시됩니다.](https://support.cloudflare.com/hc/ko/articles/360057976851-Cloudflare%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EB%B9%84%EB%94%94%EC%98%A4-%EC%A0%84%EC%86%A1#h_ktzs0UjPIhrLq0EKVFhR3)
-   [저는 웹사이트 운영자인데, 서비스 약관 위반이 염려됩니다.](https://support.cloudflare.com/hc/ko/articles/360057976851-Cloudflare%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EB%B9%84%EB%94%94%EC%98%A4-%EC%A0%84%EC%86%A1#h_6B1A8c4GYUXZXtvk5nB6DI)

___

Cloudflare는 2010년에 누구나 안전하고 빠르며 안정적인 웹 서비스를 제공할 수 있어야 한다는 믿음을 갖고 출범했습니다. Cloudflare는 고객이 사이버 공격을 받을 때 더 많은 금액을 지불하면 안 된다고 생각하므로 웹 사이트에 대해 무료 및 정액제 가격을 제공합니다. 이러한 정책은 가능한 것은 대부분의 웹 사이트가 많은 대역폭을 소비하지 않기 때문이며, 따라서 Cloudflare는 모든 고객에게 적절한 가격대의 서비스를 제공할 수 있었습니다. Cloudflare는 처음부터 Cloudflare 대역폭을 이용한 비디오 콘텐츠의 스트리밍을 금지했습니다. 고객은 다른 공급자로부터 비디오를 임베드할 수는 있지만, Cloudflare의 서비스를 이용해 Cloudflare의 네트워크에서 고객의 방문자에게 비디오 비트를 전송하는 기능을 제한했습니다. 이는 일반적인 비디오의 1초가 하나의 웹 페이지 전체를 로드하는 것과 같은 대역폭을 소비하기 때문입니다.

시간이 지남에 따라 Cloudflare는 고객 중에 Cloudflare 네트워크를 이용해 비디오를 스트리밍하고자 하는 고객이 있다는 사실을 알게 됐습니다. 이를 수용하기 위해 Cloudflare는 [Stream](https://www.cloudflare.com/products/cloudflare-stream/) 제품을 개발했습니다. Stream은 고객이 네트워크에 얼마나 많은 부하를 부과하는지에 따라 요금을 청구하며 적절한 가격대로 최고의 성능을 제공합니다.

대부분의 고객은 이러한 제약을 존중하고 이러한 제약이 모든 Cloudflare 고객에게 양질의 서비스를 보장하기 위해 존재한다는 것을 이해하고 있지만, 애석하게도 서비스 약관을 위반하여 비디오를 스트링하도록 서비스를 잘못 구성하려고 시도하는 경우가 있습니다. Cloudflare는 모든 서비스가 모든 사용자에게 탁월한 서비스가 되기를 바라며 여기에는 [Galileo 프로젝트](https://www.cloudflare.com/galileo/), [Athenian 프로젝트](https://www.cloudflare.com/athenian/), [Fair Shot 프로젝트](https://www.cloudflare.com/fair-shot/) 등의 공공 서비스 프로젝트도 포함됩니다. Cloudflare의 서비스를 오용하는 소수의 사용자들로 인해 이러한 프로젝트를 수행하는 역량에 차질이 발생하고 있습니다.

본 페이지를 찾아오시게 된 이유에 근거하여 다음과 같이 Cloudflare 이용에 대한 권장 사항을 알려드리고자 합니다.

___

## 저는 웹사이트 운영자인데, 제 컨텐츠가 서비스 약관 위반으로 리디렉션되었습니다.

[셀프 서비스 가입 계약의 2.8조](https://www.cloudflare.com/terms/)를 위반하여 비디오나 HTML이 아닌 부적절한 용량의 콘텐츠((예: 이진 소프트웨어 코드 또는 다량의 이미지)를 제공하고자 하는 Free, Pro, Business 요금제 고객의 경우, Cloudflare는 컨텐츠를 대체 비디오 및 이미지로 리디렉션할 수 있습니다. 이 경우, 서비스 약관을 위반하는 구역에 대한 정보가 포함된 이메일 알림을 받게 되실 것입니다. 리디렉션을 회피하려고 하지 마시기 바랍니다. 그렇게 하면, 향후 Cloudflare 사용에 제약이 있을 수 있습니다.

## 리디렉션을 제거하기 위해 웹 관리자가 선택할 수 있는 옵션 

-   **리디렉션된 콘텐츠를 회색으로 흐려진 하위 도메인에서 제공**
    -   Cloudflare의 셀프 서비스 약관(TOS) 2.8조에 따라 해당 서비스를 포함하는 유료 요금제를 사용하지 않는 사용자가 html이 아닌, 부적절한 용량의 콘텐츠(이미지, 비디오 등)를 제공할 수 없습니다. TOS 2.8조에 규정된 제약은 회색 구름 아이콘으로 된(프록시되지 않은) 하위 도메인에는 적용되지 않습니다.

-   **아래 설명된 대로, 리디렉션된 콘텐츠를 유료 서비스에서 제공**

## 유료 제품을 이용해 Cloudflare에서 비디오 전송하기

Cloudflare는 특정 유료 서비스에서는 비디오 콘텐츠를 전송을 허용합니다. 비디오 콘텐츠 제공에 관심이 있는 경우, 두 가지 권장 옵션이 있습니다. 

### 옵션 1: Cloudflare Stream 

[Stream](https://www.cloudflare.com/products/cloudflare-stream/)은 비디오 응용 프로그램을 구축하기 위한 주문형 비디오 플랫폼입니다. Stream은 다양한 장치 및 네트워크 연결에 맞게 최적화된 비디오를 인코딩하고 저장하며 전송합니다. 

Stream을 시작하려면 대시보드에서 **Stream**으로 이동하거나 [등록](https://dash.cloudflare.com/sign-up/stream)하시기 바랍니다. Stream 비디오는 Cloudflare 계정의 도메인에 연결되지 않으며 Stream을 사용하는 데는 Cloudflare의 도메인이 필요하지 않습니다.

### 옵션 2: Stream Delivery(Enterprise 요금제 전용)

[Stream Delivery](https://www.cloudflare.com/products/stream-delivery/)는 전 세계에 위치한 Cloudflare의 데이터 센터를 통해 비디오 콘텐츠의 캐싱과 전송 서비스를 제공합니다. 이러한 CDN 기능은 Cloudflare Enterprise 요금제에만 제공됩니다. 이 옵션에 대해 자세히 알고 싶으시면 [영업 담당자에게 문의](https://www.cloudflare.com/products/stream-delivery/#)하시기 바랍니다.

___

## 저는 웹 사이트 방문자인데, 액세스하려고 하는 사이트에서 제가 예상하는 컨텐츠 대신 Cloudflare 서비스 약관을 참조하라는 메시지가 표시됩니다.

이 시나리오는 웹 사이트의 운영자가 [셀프 서비스 가입 계약(TOS) 의 2.8조](https://www.cloudflare.com/terms/)를 위반하고 사용자가 액세스하려는 컨텐츠를 전달하기 위해 필요한 유료 제품을 구매하지 않은 경우에 발생할 수 있습니다.

Cloudflare는 웹 사이트 운영자에게 위반에 대한 정보와 Cloudflare 서비스를 적절히 사용하여 사용자가 요청하는 컨텐츠를 전달할 수 있는 방법을 제공했습니다. 애석하지만, 웹 사이트 운영자가 (Cloudflare의 네트워크로 비디오 콘텐츠를 전송할 수 있는 제품을 구매하는 등의)구제 조치를 취하기 전까지는 이러한 제약을 해제할 수 있습니다.

그때까지는 다음과 같이 하실 수 있습니다.

1.  Cloudflare가 저렴한 비용의 서비스를 제공할 수 있도록 하는 바탕이 되는 규칙을 준수해 달라고 웹 사이트 운영자에게 요청합니다.
2.  [Galileo 프로젝트](https://www.cloudflare.com/galileo/), [Athenian 프로젝트](https://www.cloudflare.com/athenian/), [Fair Shot 프로젝트](https://www.cloudflare.com/fair-shot/) 등 Cloudflare가 더 나은 인터넷을 구축하기 위해 노력하는 일들에 대해 알아봅니다.

개인 정보가 더욱 잘 보호되고 안전한 인터넷 환경을 확보하기 위해 [1.1.1.1](https://1.1.1.1/) 을 설치합니다.

___

## 저는 웹사이트 운영자인데, 서비스 약관 위반이 염려됩니다.

비디오나 HTML이 아닌 부적절한 용량의 콘텐츠를 서비스하는 Free, Pro, Business 요금제 고객은 [셀프 서비스 가입 계약(TOS) 2.8조](https://www.cloudflare.com/terms/)를 위반하고 있을 수 있습니다. 비디오나 HTML이 아닌 대용량의 콘텐츠를 제공하려면 위에서 설명한 유료 옵션 중 하나를 사용하시기 바랍니다.

## 제공하는 콘텐츠에 대한 정보 얻기

고객님의 구간에서 제공하는 콘텐츠에 대한 자세한 정보(예: 콘텐츠 유형)가 필요한 경우, 다음 도구를 이용하시기 바랍니다.

-   Cache Analytics를 사용하는 경우: 대시보드에서 **Caching 탭**을 열고, 콘텐츠 유형별로 필터링하여 전송하는 트래픽 유형을 파악합니다. 
-   Cache Analytics를 사용하지 않는 경우: 대시보드에서 **Analytics 탭**을 열고, **성능** 섹션에서, 제공하는 콘텐츠 유형을 확인합니다.

![Cache Analytics - 전송되는 트래픽의 유형 확인](/images/support/traffic-types.png)

## 여전히 질문이 해결되지 않았습니까? 지원팀 문의

리디렉션에 대한 추가 질문이 있는 경우 (예: 콘텐츠 리디렉션이 오류라고 생각하여, 증거를 확인하고자 하는 경우), 다음 사항을 포함하여, [지원 티켓](https://dash.cloudflare.com/redirect?account=support)을 접수하시기 바랍니다. 

-   도메인 이름
-   문제 설명
-   Cloudflare 네트워크를 통해 제공하는 콘텐츠에 대한 설명
