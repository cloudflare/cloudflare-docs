---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4
title: Cloudflare 5XX 错误故障排除
---

# Cloudflare 5XX 错误故障排除

_诊断并解决 Cloudflare 代理的站点的 5XX 错误。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#h_42ad57a0-3926-4162-b55e-c3a31864ea09)
-   [错误分析](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#500error)
-   [Error 500: internal server error](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#500error)
-   [Error 502 bad gateway 或 Error 504 gateway timeout](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#502504error)
-   [Error 503: service temporarily unavailable](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#503error)
-   [Error 520: web server returns an unknown error](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#520error)
-   [Error 521: web server is down](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#521error)
-   [Error 522: connection timed out](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#522error)
-   [Error 523: origin is unreachable](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#523error)
-   [Error 524: a timeout occurred](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#524error)
-   [错误 525：SSL 握手失败](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#525error)
-   [Error 526: invalid SSL certificate](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#526error)
-   [527 错误：Railgun Listener 至源站错误](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#527error)
-   [Error 530](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#530error)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Cloudflare-5XX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#h_3ef3e669-ebcb-41e6-b688-e9ade0944392)

___

## 概述

在排查 5XX 错误时，正确的操作步骤是先联系您的主机提供商或站点管理员来排除故障并收集数据。

### 需要向主机提供商提供的错误详情

1.  具体的 5XX 错误代码和消息
2.  发生 5XX 错误的时间和时区
3.  造成 HTTP 5XX 错误的 URL（例如：_https://www.example.com/images/icons/image1.png_）

下方的各个错误描述中列出了应向主机提供商或站点管理员提供的其他详情。Cloudflare [Custom Error Pages](https://support.cloudflare.com/hc/articles/200172706) 可更改本文探讨的默认错误页面的外观。

___

## 错误分析

每个域的错误分析可在您的帐户的支持门户中获得。通过错误分析，您可以按 HTTP 错误代码深入了解总体错误情况，它还提供了诊断和解决问题所需的 URL、响应、源站 IP 地址和 Cloudflare 数据中心。错误分析基于的是 1% 的流量样本。

要查看错误分析：

-   导航到 Cloudflare 支持门户。请参阅关于[提交支持票证](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730)的说明，了解如何访问支持门户。
-   往下滚动到**错误分析**部分。
-   点击**查看错误分析**。
-   输入要调查的域。
-   此时将显示**一段时间内的错误**。
-   点击图表下方表格中的状态代码，展开流量错误详情。

___

## Error 500: internal server error

500 错误通常表示您的源站 Web 服务器存在问题。_Error establishing database_ _connection_ 是源站 Web 服务器生成的常见 HTTP 500 错误消息。[联系您的主机提供商](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)来解决。

**解决方案**

[向主机提供商提供详细信息](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)，协助对问题进行故障排除。

不过，如果 500 错误的 HTML 响应代码中包含“cloudflare”或“cloudflare-nginx”，请将以下信息提供给 [Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)：

1.  您的域名
2.  发生 500 错误的时间和时区
3.  观察到 500 错误的浏览器的 _www.example.com/cdn-cgi/trace_ 输出（将 _www.example.com_ 替换为您实际的域名和主机名）。

___

## Error 502 bad gateway 或 Error 504 gateway timeout

当 Cloudflare 无法与您的源站 Web 服务器建立联系时，会发生 HTTP 502 或 504 错误。

可能的原因有两种：

-   （最常见原因）[502/504 源自您的源站 Web 服务器](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b)
-   [502/504 源自 Cloudflare](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_845d633d-0842-4315-9dd2-53185cc4e1de)

### 502/504 源自您的源站 Web 服务器

当您的源站 Web 服务器标准的 HTTP 502 网关损坏或 504 网关超时错误响应时，Cloudflare 将返回带有 Cloudflare 标志的 HTTTP 502 或 504 错误：

![Cloudflare 品牌化错误 502 的示例。](/images/support/image1.png)

**解决方案**

联系您的主机提供商，在您的源站 Web 服务器上排查这些常见的原因：

-   确保在请求生成生成 502 或 504 错误的访问者 URL 中的主机名和域名时，源站服务器能够响应请求。
-   调查服务器过载、崩溃或网络故障。
-   识别发生超时或被阻止的应用程序或服务。

### 502/504 源自 Cloudflare

源自 Cloudflare 的 502 或 504 错误如下方所示：

![非品牌化错误 502 的示例。](/images/support/image5.png)

如果错误未提及“cloudflare”，请联系主机提供商来寻求与[源自源站的 502/504 错误](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_85e06a1a-fa89-4685-aa24-2aaf57c0141b)相关的帮助。

**解决方案**

为避免处理您的查询时发生延迟，请向 [Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)提供以下必要详情：

1.  发生问题的时间和时区
2.  造成 HTTP 502 或 504 错误的 URL（例如：_https://www.example.com/images/icons/image1.png_）
3.  浏览 _www.example.com/cdn-cgi/trace_ 时的输出（将 _www.example.com_ 替换为导致 HTTP 502 或 504 错误的域名和主机名）

___

## Error 503: service temporarily unavailable

HTTP 错误 503 在源站 Web 服务器过载时发生。 可能的原因有两种，可通过错误消息来辨别：

-   错误的 HTML 响应正文中不包含“cloudflare”或“cloudflare-nginx”。

**解决方案**：联系您的主机提供商，以核实是否针对您的源站 Web 服务器的请求实施了速率限制。

-   错误的 HTML 响应正文中包含“cloudflare”或“cloudflare-nginx”。

**解决方案**：Cloudflare 数据中心中发生了连接问题。向 [Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)提供以下信息：

1.  您的域名
2.  发生 503 错误的时间和时区
3.  观察到 503 错误的浏览器的 _www.example.com/cdn-cgi/trace_ 输出（将 _www.example.com_ 替换为您实际的域名和主机名）。

___

## Error 520: web server returns an unknown error

当源站服务器向 Cloudflare 返回空白、未知或意外响应时，会发生 520 错误。

**解决方案**

[联系您的主机提供商或站点管理员](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)，请他们核查您的源站 Web 服务器日志中的崩溃并检查以下常见原因：

-   源站 Web 服务器应用程序崩溃
-   您的源站上未允许 [Cloudflare IP](https://www.cloudflare.com/ips)。
-   标头超过 16 KB（通常因为 Cookie 数量过多）
-   源站 Web 服务器的空响应中缺少 HTTP 状态代码或响应正文
-   缺少响应标头或源站 Web 服务器未返回[正确的 HTTP 错误响应](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)。
    -   `在从上游读取响应标头时，上游过早地关闭了连接`，这是我们在日志中可能注意到的一个常见错误。这表明源站 Web 服务器有问题，导致Cloudflare 生成 520 错误。

如果在联系主机提供商或站点管理员后仍然出现 520 错误，请向 [Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)提供以下信息：

-   发生错误时所请求资源的完整 URL
-   520 错误消息中的 Cloudflare **cf-ray**
-   来自 _http://www.example.com/cdn-cgi/trace_ 时的输出（将 _www.example.com_ 替换为您发生 520 错误时的您的域名和主机名）
-   两个 [HAR 文件](https://support.cloudflare.com/hc/articles/203118044)：
    -   一个在您网站上启用了 Cloudflare 时生成
    -   另一个在[临时禁用 Cloudflare](https://support.cloudflare.com/hc/articles/200169176) 后生成。

___

## Error 521: web server is down

源站 Web 服务器拒绝来自 Cloudflare 的连接时，会发生 521 错误。源站上的安全解决方案可能阻止了来自某些 [Cloudflare IP 地址](https://www.cloudflare.com/ips)的合法连接。

521 错误的两个最常见原因：

-   源站 Web 服务器应用程序离线
-   Cloudflare 请求被阻止

**解决方案**

[联系您的站点管理员或主机提供商](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)以排除这些常见原因：

-   确保您的源站 Web 服务器正常响应
-   查看源站 Web 服务器错误日志，以确定 Web 服务器应用程序崩溃或中断。
-   确认没有阻止 [Cloudflare IP 地址](https://www.cloudflare.com/ips)或对其施加速率限制
-   在您的源站 Web 服务器的防火墙或其他安全软件中允许所有 [Cloudflare IP 范围](https://www.cloudflare.com/ips)
-   确认您是否将 **SSL/TLS 模式**设置为 **Full** 或 **Full (Strict**)，以及您是否安装了 [Cloudflare Origin 证书](/ssl/origin-configuration/origin-ca)
-   查找 [Cloudflare 社区](https://community.cloudflare.com/t/community-tip-fixing-error-521-web-server-is-down/42461)的更多故障排除信息。

___

## Error 522: connection timed out

Cloudflare 联系源站 Web 服务器时超时会发生 522 错误。 有两种不同的错误导致 HTTP 错误 522，具体取决于 Cloudflare 和源站 Web 服务器之间发生超时的时间：

1.  在连接建立之前，源站 Web 服务器未在 Cloudflare 发送 SYN 后 15 秒内将 SYN + ACK 返回给 Cloudflare。
2.  在连接建立之后，源站 Web 服务器未在 90 秒内确认（ACK）Cloudflare 的资源请求。

**解决方案**

[联系您的主机提供商](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)，从源站 Web 服务器上排查下列常见原因：

-   （最常见）.htaccess、iptables 或防火墙中阻止了 [Cloudflare IP 地址](https://www.cloudflare.com/ips/)或对其设置了速率限制。确认您的主机提供商允许 Cloudflare IP 地址。
-   源站 Web 服务器过载或离线，因而丢弃了传入的请求。
-   源站 Web 服务器上禁用了 [Keepalives](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html) 功能。
-   Cloudflare **DNS** 应用中的源站 IP 地址与主机提供商当前为您的源站 Web 服务器置备的 IP 地址不匹配。
-   您的源站 Web 服务器上丢弃了数据包。

如果您使用的是 [Cloudflare Pages](/pages/)，请确认您已经设置了自定义域，并且您的 CNAME 记录指向您的自定义 Pages 域。如需了解如何设置自定义 Pages 域，请点击[此处](/pages/getting-started#adding-a-custom-domain)。

如果上述原因都未能促成解决方案，请向主机提供商或站点管理员索取以下信息，然后[联系 Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)：

-   从源站 Web 服务器到发生问题前最常连接您的源站 Web 服务器的 [Cloudflare IP 地址](http://www.cloudflare.com/ips)的 [MTR 或 traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) 结果。在源站 Web 服务器日志记录的 IP 中，找到一个可成功连接的 IP。
-   来自主机提供商调查的详细信息，如相关的日志或与主机提供商的对话。

___

## Error 523: origin is unreachable

当 Cloudflare 无法联系您的源站 Web 服务器时，会发生 523 错误。这通常在 Cloudflare 和源站 Web 服务器之间的网络设备没有通向源站 IP 地址的路由时发生。

**解决方案** [联系您的主机提供商](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)，在您的源站 Web 服务器上排查下列常见原因：

-   确认您的 Cloudflare DNS 应用中为 A 或 AAAA 记录列出了正确的源站 IP 地址。
-   对源站与 Cloudflare 之间的互联网路由问题进行故障排除，或者对源站本身的问题进行故障排除。

如果上述原因都未能促成解决方案，请向主机提供商或站点管理员索取以下信息：

-   从源站 Web 服务器到发生问题前最常连接您的源站 Web 服务器的 [Cloudflare IP 地址](http://www.cloudflare.com/ips)的 [MTR 或 traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) 结果。从源站 Web 服务器日志查找一个可连接的 Cloudflare IP。
-   如果您通过 Cloudflare 托管服务合作伙伴使用 Railgun，请[联系您的主机提供商](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)来排查 523 错误。
-   如果您自己管理 Railgun 安装，请提供以下信息：
    -   从 Railgun 服务器到源站 Web 服务器的 [traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) 结果。
    -   来自 Railgun 服务器的最新系统日志文件。

___

## Error 524: a timeout occurred

524 错误表明 Cloudflare 成功连接了源服务器，但源站 Web 服务器没有在默认的 100 秒连接超时结束前提供 HTTP 响应。如果源站服务器由于要做太多工作而花费太长时间（例如，大数据查询），或者因为服务器在争抢资源而无法及时返回任何数据，那么可能会发生这种情况。

**解决方案**

以下是我们建议的解决这一问题的方案：

-   实施大型 HTTP 进程的状态轮询，以避免遇到该错误。
-   [联系您的主机提供商](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)，从您的源站 Web 服务器上排查下列常见原因：
    -   源站 Web 服务器上长时间运行的进程。
    -   发生过载的源站 Web 服务器。

-   Enterprise 客户可以使用 [proxy\_read\_timeout API 端点](https://api.cloudflare.com/#zone-settings-change-proxy-read-timeout-setting)将 524 超时延长到最长 600 秒。
-   如果您经常运行需要超过 100 秒才能完成的 HTTP 请求（例如大量数据导出），请在 Cloudflare **DNS** 应用中将这些进程移动到未由 Cloudflare 代理的子域后面。
-   如果使用 Cloudflare Railgun 的域发生错误 524，请确保 _lan.timeout_ 设置的值高于默认的 30 秒，再重启 railgun 服务。

___

## 错误 525：SSL 握手失败

525 错误表示 Cloudflare 与源站 Web 服务器之间的 SSL 握手失败。满足以下两个条件时会发生 525 错误：

1.  Cloudflare 与源站 Web 服务器之间的 [SSL 握手](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)失败，以及
2.  Cloudflare **SSL/TLS** 应用的**概述**选项卡中设置了 [_Full_ 或 _Full (Strict)_](/ssl/origin-configuration/ssl-modes) **SSL**。

**解决方案**

[联系您的主机提供商](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_cf28c038-16c1-4841-a85f-f905240aaebe)，从您的源站 Web 服务器上排查下列常见原因：

-   未安装有效的 SSL 证书
-   未开启 443 端口（或其他自定义安全端口）
-   无 [SNI](https://support.cloudflare.com/hc/articles/360026016272) 支持
-   Cloudflare 接受的加密套件与源站 Web 服务器支持的[加密套件](/ssl/ssl-tls/cipher-suites)不匹配。

**其他检查**

-   检查您的源站服务器上是否安装了证书。您可以查看[这篇文章](https://support.cloudflare.com/hc/zh-cn/articles/203118044-Gathering-information-for-troubleshooting-sites#h_0c7f48b3-fc29-4266-8c63-477fe61a11c4)，详细了解如何运行一些测试。如果您没有任何证书，你可以创建并安装免费的 [Cloudflare Origin CA 证书](/ssl/origin-configuration/origin-ca)。使用 Origin CA 证书，您就加密 Cloudflare 与源站 Web 服务器之间的流量。
-   [检查服务器使用的密码套件](/ssl/ssl-tls/cipher-suites)以确保它们与 Cloudflare 支持的密码套件匹配。
-   根据看到的 525 的时间戳检查服务器的错误日志，以确保有错误可能导致在 SSL 握手期间重置连接。

___

## Error 526: invalid SSL certificate

满足以下两个条件时会发生 526 错误：

1.  Cloudflare 无法验证您的源站 Web 服务器上的 SSL 证书；
2.  Cloudflare **SSL/TLS** 应用的**概述**选项卡中设置了 [_Full SSL (Strict)_](/ssl/origin-configuration/ssl-modes#full-strict) **SSL**。

**解决方案**

请您服务器管理员或主机提供商核查源站 Web 服务器的 SSL 证书，并进行以下验证：

-   证书没有到期
-   证书没有撤销
-   证书由[](https://support.cloudflare.com/hc/articles/360026016272)[证书颁发机构](https://support.cloudflare.com/hc/articles/360026016272)签名（而非自签名）
-   所请求的域名或目标域名和主机名列在证书的 **Common Name** 或 **Subject Alternative Name** 中
-   您的源站 Web 服务器接受通过 SSL 端口 443 进行连接
-   [暂停 Cloudflare](https://support.cloudflare.com/hc/articles/200169176) 并访问 [https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com](https://www.sslshopper.com/ssl-checker.html#hostname=www.example.com)（将 www.example.com 替换为您的主机名和域名），以验源站 SSL 证书并无问题：

![该屏幕显示了没有错误的 SSL 证书。](/images/support/hc-import-troubleshooting_5xx_errors_sslshopper_output.png)

如果源站服务器使用自签名证书，请将域配置为使用 _Full_ _SSL_ 而非 _Full SSL (Strict)_。请参考[适用于您的源站的 SSL 推荐设置](/ssl/origin-configuration/ssl-modes)。

___

## 527 错误：Railgun Listener 至源站错误

527 错误表示 Cloudflare 和源站的 [Railgun 服务器（rg-listener）](https://support.cloudflare.com/hc/articles/200168406)之间发生连接中断。常见的原因包括：

-   防火墙干扰
-   Railgun 服务器和 Cloudflare 之间网络故障或数据包丢失

527 错误的最常见原因包括：

-   [连接超时](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c559b9e5-a342-47ed-bfae-66e10e42aade)
-   [超过 LAN 超时](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_f8e4890c-9459-4c9a-a4ab-e9b44fa16dbf)
-   [连接遭拒](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_2e3e4251-3642-4fce-bbcf-1a45bb2b2c11)
-   [TLS/SSL 相关错误](https://support.cloudflare.com/hc/zh-cn/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#h_c30fe02c-98f2-4cbf-af8c-bafa9b4f5b8f)

如果要联系 Cloudflare 支持，请提供以下来自 Railgun Listener 的信息：

-   _railgun.conf_ 文件的完整内容
-   _railgun-nat.conf_ 文件的完整内容内容
-   详述观察到的错误的 Railgun 日志文件

### 连接超时

下列 Railgun 日志错误表明 Railgun Listener 和源站 Web 服务器之间存在连接故障：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/example.com:dial tcp 0.0.0.0:443: i/o timeout</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">no response from origin (timeout) 0.0.0.0:80/example.com</span></div></span></span></span></code></pre>{{</raw>}}

**解决方案**

联系您的主机提供商，以协助测试源站 Web 服务器和 Railgun Listener 之间的连接问题。例如，运行 netcat 命令可以测试从 Railgun Listener 到源站 Web 服务器的 _SERVERIP_ 和 _PORT_（80 用于 HTTP，或 443 用于 HTTPS）的连接：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nc -vz SERVERIP PORT</span></div></span></span></span></code></pre>{{</raw>}}

### 超过 LAN 超时

如果源站 Web 服务器未在 30 秒默认超时内向 Railgun Listener 发送 HTTP 响应，则生成以下 Railgun Listener 日志错误：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  connection failed 0.0.0.0:443/example.com: dial tcp 0.0.0.0:443: i/o timeout</span></div></span></span></span></code></pre>{{</raw>}}

可以通过 railgun.conf 文件的 lan.timeout 参数调整这一时间。

**解决方案**

提高 _railgun.conf_ 中的 _lan.timeout_ 限值，或检查 Web 服务器配置。联系您的主机提供商，以确认源站 Web 服务器是否过载。

### 连接遭拒

当来自 Railgun Listener 的请求遭到拒绝时，Railgun 日志中会出现以下错误：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Error getting page: dial tcp 0.0.0.0:80:connection refused</span></div></span></span></span></code></pre>{{</raw>}}

**解决方案**

允许 Railgun Listener 的 IP 处于源站 Web 服务器的防火墙中。

### TLS/SSL 相关错误

如果 TLS 连接失败，Railgun 日志中会出现以下错误：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/example.com:remote error: handshake failure</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 0.0.0.0:443/example.com:dial tcp 0.0.0.0:443:connection refused</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">connection failed 127.0.0.1:443/www.example.com:x509: certificate is valid for</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com,www.example.com</span></div></span></span></span></code></pre>{{</raw>}}

**解决方案**

如果发生 TLS/SSL 错误，请在源站 Web 服务器上检查并确保：

-   已开启 443 端口
-   源站 Web 服务器出示了 SSL 证书
-   源站 Web 服务器的 SSL 证书的 SAN 或 Common Name 中包含请求的主机名或目标主机名
-   在 Cloudflare **SSL/TLS** 应用的**概述**选项卡中将 **SSL** 设为 [Full 或 Full (Strict)](/ssl/origin-configuration/ssl-modes)

___

## Error 530

返回 HTTP 错误 530 时会同时显示 1XXX 错误。[在 Cloudflare 帮助中心中搜索具体的 1XXX 错误](https://support.cloudflare.com/hc/sections/200820298)，以了解故障排除信息。

___

## 相关资源

-   [收集信息以排查站点问题](https://support.cloudflare.com/hc/zh-cn/articles/203118044)
-   [联系 Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [自定义 Cloudflare 错误页面](https://support.cloudflare.com/hc/articles/200172706)
-   [MTR/Traceroute 诊断和用法](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87)
-   [Cloudflare 社区提示](https://community.cloudflare.com/tag/communitytip)
