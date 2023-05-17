---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98
title: SSL 常见问题
---

# SSL 常见问题

_查找有关 Cloudflare **SSL/TLS** 应用的常见问题的答案。_

### 本文内容

-   [我有多个 Cloudflare 证书，该使用哪一个？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_e2bd076d-beb3-40e8-adbe-075ba5a8851e)
-   [Cloudflare 的 SSL 是否对 SEO 有帮助？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_29550926411548959889544)
-   [激活 Cloudflare 的 SSL 需要多长时间？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_7dc4564e-f93a-4e1d-a338-90903a812b95)
-   [SSL 无效品牌检查是什么意思？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_62d0852f-0bc5-4d54-a83f-971ca452398d)
-   [如何将所有访问者重定向到 HTTPS /SSL？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_a61bfdef-08dd-40f8-8888-7edd8e40d156)
-   [Cloudflare SSL 是否支持国际化域名（IDN）？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_406905917121548959897352)
-   [SSL 是否适用于托管合作伙伴？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_848554486311548959913241)
-   [Cloudflare SSL 证书是共享的吗？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_293541339461548959928672)
-   [我的网站上安装了 SSL 证书，为什么我会看到 Cloudflare 证书？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_865954806521548960003696)
-   [我希望 Cloudflare 使用我在别处购买的 SSL 证书](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_406415940571548960012266)
-   [如何强制我的站点只使用 HTTPS/SSL？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_999722138611548960019807)
-   [“伽利略计划”是否包含 SSL 支持？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_745887958641548960026645)
-   [启用 Cloudflare 会影响 PayPal 的 TLS 1.2 要求吗？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_100356045661548960034406)
-   [如何从 Cloudflare 的中国数据中心提供 SSL 证书？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_853db670-78aa-4c98-99d4-3aa3d38f8d59)
-   [Cloudflare 是否支持 TLS 客户端身份验证？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_db0bcd71-24f9-4b0c-8cfc-7a5ed0f27649)
-   [如何使用 GitHub 启用 Universal SSL？](https://support.cloudflare.com/hc/zh-cn/articles/204144518-SSL-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_4e7e3537-ade2-431c-abe7-2dfe26e1cb9a)

___

### 我有多个 Cloudflare 证书，该使用哪一个？

Cloudflare 证书按[证书类型](https://support.cloudflare.com/hc/articles/203295200)以及最特定主机名划分优先级。  通常，SSL 证书优先级按从最高到最低的顺序如下排列：

-   [Custom SSL](https://support.cloudflare.com/hc/articles/200170466)
-   [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108)
-   [Universal SSL](https://support.cloudflare.com/hc/articles/204151138)

一般优先级的例外情况是基于主机名的特异性。  提及特定主机名的证书优先于通配符证书。  例如，明确提及 _www.example.com_ 的 Universal SSL 证书优先于通过通配符（例如 _\*.example.com_）匹配 _www_ 主机名的证书。

___

### Cloudflare 的 SSL 是否对 SEO 有帮助？

是的，Google 宣布他们使用 [HTTPS 作为 SEO 的排名信号](http://googleonlinesecurity.blogspot.co.uk/2014/08/https-as-ranking-signal_6.html)。

有关进一步的 SEO 调整，请参阅我们关于[使用 Cloudflare 提高 SEO 排名](https://support.cloudflare.com/hc/en-us/articles/231109348-How-do-I-Improve-SEO-Rankings-On-My-Website-Using-Cloudflare-)的文章。

___

### Cloudflare SSL 是否支持国际化域名（IDN）？

Cloudflare 支持双字节/IDN/punycode 域。  包含非拉丁字符的域接收 SSL 证书，就像添加到 Cloudflare 的任何其他域一样。

___

### 激活 Cloudflare 的 SSL 需要多长时间？

如果 Cloudflare 是您的 [权威 DNS 提供商](https://www.cloudflare.com/learning/dns/dns-server-types/#authoritative-nameserver)，则通常会在 Cloudflare 激活域后 15 分钟内发出 Universal SSL 证书，并且在域激活后不需要进一步的客户操作。 如果您通过权威 DNS 提供商处设置的 [CNAME 记录使用 Cloudflare 服务](https://support.cloudflare.com/hc/articles/360020615111)，则配置 Universal SSL 证书需要在权威 DNS 提供商处手动添加 [DNS 验证记录](https://support.cloudflare.com/hc/articles/360020615111#h_989980109291544055191509)。  Dedicated SSL 证书通常也会在 15 分钟内发出。

如果证书颁发机构要求对品牌、网络钓鱼或 TLD 要求进行人工审核，则颁发 Universal SSL 证书可能需要超过 24 小时。

___

### SSL 无效品牌检查是什么意思？

如果某些域包含与商标域冲突的字词，则不符合 Universal SSL 的条件。

要解决此问题，您可以：

-   如果域使用 Business 或 [Enterprise](https://www.cloudflare.com/enterprise-service-request) 计划，则[上传您自己的证书](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-)或
-   购买[专用证书](https://support.cloudflare.com/hc/en-us/articles/228009108-Dedicated-SSL-Certificates)

___

### 如何将所有访问者重定向到 HTTPS /SSL？

要重定向域中所有子域和主机的流量，请在 Cloudflare **SSL/TLS** 应用中启用**始终使用 HTTPS** 功能。  或者，如果您不希望整个站点重定向到 HTTPS，请使用 Cloudflare **[Page Rule](https://support.cloudflare.com/hc/en-us/articles/218411427)** 应用根据 URL 重定向。

在通过 Cloudflare 保护您的站点时，不建议在源 Web 服务器上执行重定向：

-   Page Rule 重定向在 Cloudflare 边缘进行处理，从而更快地响应并减少对服务器的请求。
-   源 Web 服务器重定向可能导致[重定向循环错误](https://support.cloudflare.com/hc/articles/115000219871)。

配置 Page Rule 时，_始终使用 HTTPS_ 操作是将 HTTP 请求重定向到 HTTPS 的最简单方法。  如果除强制 HTTPS 之外还需要重定向到其他子域，还可以将_转发 URL_ 操作与 _301_ 重定向搭配使用。例如，


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/*</span></div></span></span></span></code></pre>{{</raw>}}

与_转发 URL_


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.example.com/$1</span></div></span></span></span></code></pre>{{</raw>}}

的 Page Rule 匹配将对 _example.com_ 根域的请求重定向到 _www.example.com_ 子域，从而保护 URL 目录。

强制 HTTPS 不能解决[混合内容](https://support.cloudflare.com/hc/en-us/articles/200170476-How-do-I-fix-the-SSL-Mixed-Content-Error-Message-)的问题，因为浏览器会在发出请求之前检查所包含资源的协议。您需要在强制使用 HTTPS 的页面上仅使用相对链接或 HTTPS 链接。您也可以选择使用 Cloudflare 的 [Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/en-us/articles/227227647-How-do-I-use-Automatic-HTTPS-Rewrites-) 功能，来自动解析某些混合内容链接。

___

### SSL 是否适用于托管合作伙伴？

通过 CNAME 和完整 DNS 集成，通过主机合作伙伴添加的所有新 Cloudflare 域均可使用免费 Universal SSL 证书。

通过 Cloudflare 代理子域以提供免费 Universal SSL 证书。

___

### Cloudflare SSL 证书是共享的吗？

Universal SSL 证书在多个域中为多个客户共享。如果需要考虑证书共享，Cloudflare 建议使用 [Dedicated 或自定义 SSL 证书](https://support.cloudflare.com/hc/articles/203295200)。

___

### 我的网站上安装了 SSL 证书，为什么我会看到 Cloudflare 证书？

Cloudflare 必须解密流量才能缓存和过滤恶意流量。Cloudflare 根据 **SSL/TLS** 应用中选择的 [SSL 选项](https://support.cloudflare.com/hc/articles/200170416)重新加密流量或将纯文本流量发送到源 Web 服务器。

___

### 我希望 Cloudflare 使用我在别处购买的 SSL 证书

允许 Business 和 Enterprise 计划中的域上传[自定义 SSL 证书](https://support.cloudflare.com/hc/articles/200170466)。

___

### 如何强制我的站点只使用 HTTPS/SSL？

要强制所有流量使用 HTTPS，请在 Cloudflare **SSL/TLS** 应用中或[通过 **Page Rule** 应用](https://support.cloudflare.com/hc/articles/200170536)启用“始终使用 HTTPS”功能。

___

### “伽利略计划”是否包含 SSL 支持？

“伽利略计划”客户可以使用 Cloudflare 的[免费 Universal SSL](https://www.cloudflare.com/ssl) 来保护站点流量。

___

### 启用 Cloudflare 会影响 PayPal 的 TLS 1.2 要求吗？

不会。由于 Cloudflare 不代理直接与 paypal.com 建立的连接，因此为您的域启用 Cloudflare 不会影响建立 TLS 连接的方式。

要确定您的服务器或浏览器是否支持这些标准，请从使用 PayPal 的客户端或浏览器访问 [https://tlstest.paypal.com](https://tlstest.paypal.com/)。**PayPal\_Connection\_OK** 的响应表明客户端已支持与 PayPal 兼容的 TLS 标准。

___

### 如何从 Cloudflare 的中国数据中心提供 SSL 证书？

Cloudflare [Universal SSL](https://support.cloudflare.com/hc/articles/204151138) 和 [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108) 证书未在中国部署。  如果您的域使用 Enterprise 计划并且已被授予访问中国数据中心的权限，则 Cloudflare 在中国的数据中心仅在以下条件下为您的域提供 SSL 证书：

1.  您已上传[自定义 SSL 证书](https://support.cloudflare.com/hc/articles/200170466)。
2.  **允许在中国使用私钥（自定义证书）**在 Cloudflare **SSL/TLS** 应用中设置为_开_。

___

### Cloudflare 是否支持 TLS 客户端身份验证？

TLS 客户端身份验证可验证客户端提供的证书是否由公司的根证书的证书颁发机构签名。  通过在每个请求中验证此证书，可以将访问限制为授权的客户端连接。  要通过 Cloudflare 启用 TLS 客户端身份验证，请参阅有关[相互 TLS 身份验证](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/)的文档。

___

### 如何使用 GitHub 启用 Universal SSL？

请参阅 Cloudflare 关于[通过 GitHub Pages 使用 Cloudflare Universal SSL](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/) 的博客文章。
