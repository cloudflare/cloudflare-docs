---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/205043158-PCI-%EC%A4%80%EC%88%98-%EB%B0%8F-Cloudflare-SSL-TLS
title: PCI 준수 및 Cloudflare SSLTLS
---

# PCI 준수 및 Cloudflare SSL/TLS

## PCI 준수 및 Cloudflare SSL/TLS

_Cloudflare를 구성하여 PCI 스캔 요건을 충족하는 방법을 살펴보고 이전 버전의 TLS/SSL에 대해 Cloudflare가 마련한 완화 조치를 알아보세요._

___

## 개요

TLS 1.0과 TLS 1.1은 알려진 취약성이 있어 정보 보호에 부족합니다. 특히 Cloudflare 고객의 경우, PCI의 주요 영향은 TLS 1.0과 TLS 1.1이 결제 카드 관련 트래픽을 보호하는 데 부족하다는 것입니다.

PCI 표준은 TLS 1.2 의 사용을 권장합니다.

또한 TLS 1.0 및 1.1의  [취약성에 대한 Cloudflare의 완화 조치](https://support.cloudflare.com/hc/en-us/articles/205043158#h_1TWWDdoBc31LFYj9kVNwlu) 도 알아보세요.

___

## 최소 TLS 버전을 1.2로 설정

TLS 1.2 이상 프로토콜을 이용한 연결만 허용하도록 Cloudflare 도메인을 구성하는 방법:

1\. Cloudflare dashboard에 로그인합니다.

2\. 적절한 Cloudflare 계정 및 응용 프로그램을 클릭합니다.

4\. **SSL/TLS** > **에지 인증서**로 이동합니다.

5\. **최소 TLS 버전**에 **TLS 1.2** 이상을 선택합니다.

___

Cloudflare는 TLS 1.2 이전 버전의 알려진 취약성에 대해 여러 가지 완화 조치를 실행합니다. 예를 들어 Cloudflare는 다음을 지원하지 않습니다.

1.  TLS의 헤더 압축
2.  SPDY 3.1의 헤더 압축
3.  RC4
4.  SSL 3.0
5.  클라이언트와의 재협상
6.  DHE 암호 제품군
7.  내보내기 등급 암호

Cloudflare 완화는 다음 공격으로부터 방어합니다.

-   CRIME
-   BREACH
-   POODLE
-   RC4 암호화 취약성
-   SSL 재협상
-   프로토콜 다운그레이드 공격
-   FREAK
-   LogJam
-   3DES는 TLS 1.1 및 1.2에 대해 완전히 비활성화되어 있고 Cloudflare는 TLS 1.0에 대해 완화 조치를 실행합니다.

Cloudflare는 다음에 대해 추가 완화를 제공합니다.

-   Heartbleed
-   Lucky Thirteen
-   CCS 주입 취약성

Cloudflare는 이러한 취약성에 대해 모든 서버를 패치했습니다. 또한 Cloudflare는 WAF는 Heartbleed 및 ShellShock 등의 취약성을 완화하는 WAF 관리형 규칙도 제공니다.

### ROBOT(Return of Bleichenbacher's Oracle Threat)

Cloudflare 상의 ROBOT 존재를 인식하는 보안 스캔은 위양성입니다. Cloudflare는 패딩을 실시간 검사하고 패딩이 잘못된 경우 무작위 세션으로 전환합니다.

### Sweet32(CVE-2016-2183)

TLS(Transport Layer Security) 프로토콜에서 3DES(Triple DES) 암호화 알고리즘 사용 시 취약성입니다. Sweet32는 현재 개념 공격의 증거이며 실제 이에 대해 알려진 예는 없습니다. Cloudflare는 다음과 같이 TLS 1.0 취약성을 수동으로 완화했습니다.

-   공격자는 하나의 TLS 세션에서 32GB 데이터를 수집해야 합니다.
-   Cloudflare는 32GB 데이터가 수집되기 훨씬 전에 영향을 받은 3DES 암호에 새로운 TLS 1.0 세션 키를 강제 적용합니다.
