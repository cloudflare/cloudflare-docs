---
pcx_content_type: troubleshooting
language_tag: korean
source: https://support.cloudflare.com/hc/ko/articles/115000310832-CAA-Certification-Authority-Authorization-FAQ
title: CAA(Certification Authority Authorization) FAQ
---

# CAA(Certification Authority Authorization) FAQ

## CAA(Certification Authority Authorization) FAQ

_본 문서는 CAA DNS 레코드에 대한 몇 가지 일반적인 질문에 대해 답을 제공합니다._

### 이 문서에서

-   [CAA란 무엇입니까?](https://support.cloudflare.com/hc/ko/articles/115000310832-CAA-Certification-Authority-Authorization-FAQ#h_83030816011543365917896)
-   [Cloudflare는 어떻게 CAA 레코드를 평가합니까?](https://support.cloudflare.com/hc/ko/articles/115000310832-CAA-Certification-Authority-Authorization-FAQ#h_66255839481543365927385)
-   [CAA 레코드가 Universal SSL 발행을 제외하면 Universal SSL을 반드시 비활성화해야 하는 이유는 무엇입니까?](https://support.cloudflare.com/hc/ko/articles/115000310832-CAA-Certification-Authority-Authorization-FAQ#1NjLKMPWXlhOiJkxogo1pC)
-   [Universal SSL을 계속 사용하려면 어떤 레코드를 추가해야 합니까?](https://support.cloudflare.com/hc/ko/articles/115000310832-CAA-Certification-Authority-Authorization-FAQ#h_645975761191543365946939)
-   [Universal SSL이 비활성화되면 어떻게 됩니까?](https://support.cloudflare.com/hc/ko/articles/115000310832-CAA-Certification-Authority-Authorization-FAQ#h_217748692231543365960592)
-   [Universal SSL을 어떻게 재활성화합니까?](https://support.cloudflare.com/hc/ko/articles/115000310832-CAA-Certification-Authority-Authorization-FAQ#h_322898447261543365970663)
-   [CAA 레코드를 설정할 때 어떤 위험이 있습니까?](https://support.cloudflare.com/hc/ko/articles/115000310832-CAA-Certification-Authority-Authorization-FAQ#h_681347546281543365982388)

___

CAA(Certificate Authority Authorization) 레코드를 이용하면 도메인 소유자는 특정 CA(Certificate Authority)에 대한 발행을 제한할 수 있습니다. _CAA 레코드_ 는 CA가 특정 상황에서 인증서를 발행하지 못하도록 합니다.  자세한 내용은 [RFC 6844](https://tools.ietf.org/html/rfc6844) 를 참조하세요.

___

## Cloudflare는 어떻게 CAA 레코드를 평가합니까?

_CAA 레코드_ 는 Cloudflare가 아닌 CA가 평가합니다.

___

## CAA 레코드가 Universal SSL 발행을 제외하면 Universal SSL을 반드시 비활성화해야 하는 이유는 무엇입니까?

Universal SSL 인증서는 고객 사이에 공유되기 때문에, 한 고객의 _CAA 레코드_ 가 다른 고객의 Universal SSL 발행을 막을 수 있습니다. 따라서, Cloudflare는 도메인용 Universal SSL를 비활성화하여  _CAA 레코드_ 가 다른 고객에게 영향을 주지 않게 해야 합니다.

Cloudflare의 Universal SSL이 필요하지 않은 경우 Cloudflare **SSL/TLS** 앱의  **에지 인증서**  탭에서  **Universal SSL 비활성화** 를 선택하세요.

___

## Universal SSL을 계속 사용하려면 어떤 레코드를 추가해야 합니까?

Cloudflare의 무료 Universal SSL 인증서를 계속 사용하면 다음 DNS 레코드가 자동 설정됩니다.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com IN CAA 0 issue &quot;comodoca.com&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com IN CAA 0 issue &quot;digicert.com&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com IN CAA 0 issue &quot;letsencrypt.org&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com IN CAA 0 issuewild &quot;comodoca.com&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com IN CAA 0 issuewild &quot;digicert.com&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com IN CAA 0 issuewild &quot;letsencrypt.org&quot;</span></div></span></span></span></code></pre>{{</raw>}}

 _issuewild_ 는 단독으로 사용된 경우  와일드카드 발행만 허용합니다.  따라서  **태그** 드롭다운에  _와일드카드 및 특정 호스트 이름 허용_ 옵션이 지정돼야 Cloudflare 루트 도메인을 인증서에 추가할 수 있습니다.

![특정 호스트 이름만 허용하게 태그된 Cloudflare 대시보드의 comodoca.com에 대한 CCA 레코드를 보여주는 스크린샷](/images/support/dns_ui_updates_caa_records.png)

___

## Universal SSL이 비활성화되면 어떻게 됩니까?

 [사용자 지정 SSL 인증서](https://support.cloudflare.com/hc/ko/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-) (비즈니스 또는 기업 요금제 필요)를 업로드하지 않으면 도메인 이름이 Universal SSL에서 즉시 제거되고 사용자에게 SSL 오류가 나타납니다.

___

## Universal SSL을 어떻게 재활성화합니까?

Cloudflare 지원팀에 지원 티켓을 보내세요.

___

## CAA 레코드를 설정할 때 어떤 위험이 있습니까?

큰 조직 또는 여러 당사자에게 SSL 인증서 확보 과제가 부여된 조직의 일원인 경우, _CAA 레코드_를 포함시켜 조직에 가용한 모든 CA가 발행될 수 있게 하세요.  이렇게 하지 않으면, 의도하지 않게 조직 내 다른 부문에 대한 SSL 발행이 차단될 수 있습니다.
