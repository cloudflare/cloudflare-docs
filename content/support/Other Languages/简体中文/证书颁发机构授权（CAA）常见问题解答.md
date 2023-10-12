---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115000310832-%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83-CAA-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94
title: 证书颁发机构授权（CAA）常见问题解答
---

# 证书颁发机构授权（CAA）常见问题解答

## 证书颁发机构授权（CAA）常见问题解答

_本文回答了有关 CAA DNS 记录的几个常见问题。_

### 本文内容

-   [_什么是 CAA？_](https://support.cloudflare.com/hc/zh-cn/articles/115000310832-%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83-CAA-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_83030816011543365917896)
-   _[Cloudflare 如何评估 CAA 记录？](https://support.cloudflare.com/hc/zh-cn/articles/115000310832-%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83-CAA-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_66255839481543365927385)_
-   [如果我的 CAA 记录不包括颁发 Universal SSL，为什么必须禁用 Universal SSL？](https://support.cloudflare.com/hc/zh-cn/articles/115000310832-%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83-CAA-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_998474763141543365935375)
-   [_要启用 Universal SSL，需要添加哪些记录？_](https://support.cloudflare.com/hc/zh-cn/articles/115000310832-%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83-CAA-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_645975761191543365946939)
-   [_禁用 Universal SSL 时会发生什么？_](https://support.cloudflare.com/hc/zh-cn/articles/115000310832-%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83-CAA-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_217748692231543365960592)
-   [_如何重新启用 Universal SSL？_](https://support.cloudflare.com/hc/zh-cn/articles/115000310832-%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83-CAA-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_322898447261543365970663)
-   _[设置 CAA 记录有哪些危险？](https://support.cloudflare.com/hc/zh-cn/articles/115000310832-%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83-CAA-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_681347546281543365982388)_

___

证书颁发机构授权（CAA）记录允许域所有者将颁发限制为指定的证书颁发机构（CA）。_CAA 记录_可阻止 CA 在某些情况下颁发证书。  有关更多详细信息，请参阅 [RFC 6844](https://tools.ietf.org/html/rfc6844)。

___

## Cloudflare 如何评估 CAA 记录？

_CAA 记录_由 CA 评估，而不是由 Cloudflare 评估。

___

## 如果我的 _CAA 记录_排除了颁发 Universal SSL，为什么必须禁用 Universal SSL？

由于 Universal SSL 证书在客户之间共享，因此您的 _CAA 记录_可能会阻止颁发其他客户的 Universal SSL。因此，Cloudflare 必须为您的域禁用 Universal SSL，以确保您的 _CAA 记录_不会影响其他客户。

如果您不需要 Cloudflare 提供的 Universal SSL，请在 **SSL/TLS** 应用中**禁用 Universal SSL**。

___

## 要启用 Universal SSL，需要添加哪些记录？

如果您继续使用 Cloudflare 的免费 Universal SSL 证书，则会自动设置以下 DNS 记录：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com.IN CAA 0 issue &quot;comodoca.com&quot;example.com.IN CAA 0 issue &quot;digicert.com&quot;example.com.IN CAA 0 issue &quot;letsencrypt.org&quot;example.com.IN CAA 0 issuewild &quot;comodoca.com&quot;example.com.IN CAA 0 issuewild &quot;digicert.com&quot;example.com.IN CAA 0 issuewild &quot;letsencrypt.org&quot;</span></div></span></span></span></code></pre>{{</raw>}}

单独使用时，_issuewild_ 只允许颁发通配符证书。  因此，除非您在**标记**下拉列表中指定_允许通配符和特定主机名_选项，否则 Cloudflare 无法将您的根域添加到证书中：  

![configuring_caa_records_comodoca_annotated.png](/images/support/configuring_caa_records_comodoca_annotated.png)

___

## 禁用 Universal SSL 时会发生什么？

您的域名将立即从 Universal SSL 证书中移除，除非您[上传自定义 SSL 证书](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-)（需要 Business 或 Enterprise Plan），否则您的用户将观察到 SSL 错误。

___

## 如何重新启用 Universal SSL？

向 Cloudflare 支持部门提交支持票证。

___

## 设置 CAA 记录有哪些危险？

如果您属于大型组织的成员或多方负责获取 SSL 证书的组织，请包括允许颁发适用于您组织的所有 CA 的 _CAA 记录_。  如果不这样做，可能会无意中阻止为组织中的其他部分颁发 SSL。
