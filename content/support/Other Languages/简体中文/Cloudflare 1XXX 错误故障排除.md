---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4
title: Cloudflare 1XXX 错误故障排除
---

# Cloudflare 1XXX 错误故障排除

_诊断并解决 Cloudflare 代理的站点的 1XXX 错误。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#h_e6ba4204-ab4f-464b-afdc-e8177e418e34)
-   [错误 1000：DNS 指向禁止的 IP](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1000)
-   [错误 1001：DNS 解析错误](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1001)
-   [错误 1002：DNS 指向禁止的 IP](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1002a)
-   [错误 1002：受到限制](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1003)
-   [错误 1003 访问遭拒：直接 IP 访问不被允许](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1003)
-   [错误 1004：主机未配置为服务 Web 流量](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1004)
-   [错误 1006、1007、1008 或 1106 拒绝访问：您的 IP 地址已被禁止](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error100610071008)
-   [错误 1009 访问被拒绝：国家或地区被禁止](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#h_1FIuVf9XCVpeBz8Cn6B0Fj)
-   [错误 1010：本网站的所有者已根据您的浏览器签名禁止您的访问](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1010)
-   [错误 1011：访问遭拒（热链接被拒绝）](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1011)
-   [错误 1012：访问遭拒](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1012)
-   [错误 1013：HTTP 主机名和 TLS SNI 主机名不匹配](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1013)
-   [错误 1014：禁止跨用户 CNAME](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1014)
-   [错误 1015：您受到速率限制](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1015)
-   [错误 1016：源 DNS 错误](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1016)
-   [错误 1018：找不到主机](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1018)
-   [错误 1019：计算服务器错误](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1019)
-   [错误 1020：访问遭拒](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1020)
-   [错误 1023：找不到主机](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1023)
-   [错误 1025：请稍后再检查](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1025)
-   [错误 1033：Argo Tunnel 错误](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#h_W81O7hTPalZtYqNYkIHgH)
-   [错误 1034：边缘 IP 受限](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#h_4eD6Gcxp4zQqS4ciCJaLt0)
-   [错误 1035：无效请求重写（无效 URI 路径）](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1035)
-   [错误 1036：无效请求重写（超过最大长度）](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1036)
-   [错误 1037：无效重写规则（无法对表达式求值）](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1037)
-   [错误 1040：无效请求重写（不允许修改标头）](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1040)
-   [错误 1041：无效请求重写（无效标头值）](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1041)
-   [错误 1101：渲染错误](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1101)
-   [错误 1102：渲染错误](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1102)
-   [错误 1104：此电子邮件地址的一个变体在我们的系统中已被占用。只允许有一种变体。](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#error1104)
-   [错误 1200：缓存连接限制](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#h_302a97f3-eba3-4c0a-a589-76ba95f60dcf)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/360029779472-Cloudflare-1XXX-%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#h_80755d09-43f2-4656-b1f9-2989196b30a6)

___

## 概述

本文描述的错误可能会在访问由 Cloudflare 代理的网站时发生。对于 Cloudflare API 或仪表板错误，请查阅我们的 [Cloudflare API 文档](https://api.cloudflare.com/)。HTTP 409、530、403 和 429 错误是 HTTP 错误代码，在响应的 HTTP 标头中返回。1XXX 错误出现在响应的 HTML 正文中。

如果下方各错误描述中的解决方案未能解决错误，请联系 [Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)。

___

## 错误 1000：DNS 指向禁止的 IP

### 常见原因

Cloudflare 因为以下某一原因停止了请求：

-   Cloudflare DNS 应用中的 A 记录指向 [Cloudflare IP 地址](https://www.cloudflare.com/ips/)，或负载平衡器源站指向代理记录。
-   您的 Cloudflare DNS A 或 CNAME 记录引用了其他反向代理（如使用 proxy\_pass 功能的 Nginx Web 服务器），它将请求二次代理到 Cloudflare。
-   请求的 X-Forwarded-For 标头的长度超过 100 个字符。
-   该请求包括两个 X-Forwarded-For 标头。
-   服务器名称指示（SNI）问题或在源站不匹配。

### 解决方案

-   如果 Cloudflare DNS 应用中的 A 记录指向 [Cloudflare IP 地址](https://www.cloudflare.com/ips/)，请将该 IP 地址更新为您的源 Web 服务器 IP 地址。
-   您的源站上有反向代理通过 Cloudflare 代理将请求发回。 请联系主机提供商或站点管理员在源站上配置 HTTP 重定向，而不要使用反向代理。

___

## 错误 1001：DNS 解析错误

### 常见原因

-   Web 请求发送到不存在的 Cloudflare 域中的 Cloudflare IP 地址。
-   一个不使用 Cloudflare 的外部域具有指向 Cloudflare 上活跃域的 CNAME 记录
-   无法解析 DNS CNAME 记录的目标。
-   您的 Cloudflare DNS 应用中的 CNAME 记录需要通过某一 DNS 提供商解析，但该提供商目前已离线。
-   为[自定义主机名（SSL for SaaS）](/ssl/ssl-for-saas)启用了 [Always Online](/cache/how-to/always-online/)。

### 解决方案

非 Cloudflare 域无法 CNAME 到 Cloudflare 域，除非此非 Cloudflare 域已添加至 Cloudflare 帐户。

试图直接访问用于 [Cloudflare CNAME 设置](/dns/zone-setups/partial-setup)的 DNS 记录也会导致错误 1001（示例：_www.example.com.cdn.cloudflare.net_）。

如果使用[自定义主机名（SSL for SaaS）](/ssl/ssl-for-saas)，请禁用 [Always Online](/cache/how-to/always-online/#enable-always-online)。

___

## 错误 1002：DNS 指向禁止的 IP

### 常见原因

-   您的 Cloudflare DNS 应用中的 DNS 记录指向某一 [Cloudflare IP 地址](https://www.cloudflare.com/ips/)。
-   您的 Cloudflare DNS 应用中为 CNAME 记录指定了不正确的目标。
-   您的域不在 Cloudflare 中，但具有指向 Cloudflare 域的 CNAME。

### 解决方案

更新您的 Cloudflare _A_ 或 _CNAME 记录_，以指向您的源站 IP 地址，而不是 Cloudflare IP 地址：

1.  联系您的主机提供商，以确认源站 IP 地址或 CNAME 记录目标。
2.  登录您的 Cloudflare 帐户。
3.  选择生成错误 1002 的域。
4.  选择 **DNS** 应用程序。
5.  单击要更新的 _A_ 记录的**值**。
6.  更新 _A_ 记录。

要确保源 Web 服务器不通过 Cloudflare 代理其自己的请求，请配置源 Web 服务器，使其将 Cloudflare 域解析到：

-   内部 NAT 的 IP 地址，或
-   源 Web 服务器的公用 IP 地址。

___

## 错误 1002：受到限制

### 常见原因

Cloudflare 域解析到本地或被禁的 IP 地址，或者未与该域关联的 IP 地址。

### 解决方案

如果您是网站所有者：

1.  与您的主机提供商核实源 Web 服务器 IP 地址；
2.  登录您的 Cloudflare 帐户；并且
3.  将 Cloudflare DNS 应用中的 A 记录更新为已由您的主机提供商确认的 IP 地址。

___

## 错误 1003 访问遭拒：直接 IP 访问不被允许

### 常见原因

客户端或浏览器直接访问了 [Cloudflare IP 地址](https://www.cloudflare.com/ips)。

### 解决方案

浏览到您的 URL 中的网站域名，而不是 Cloudflare IP 地址。

___

## 错误 1004：主机未配置为服务 Web 流量

### 常见原因

-   由于滥用或违反服务条款，Cloudflare 工作人员停用了该域的代理。
-   DNS 更改尚未传播，或网站所有者的 DNS _A 记录_指向 [Cloudflare IP 地址](https://www.cloudflare.com/ips)。

### 解决方案

如果问题持续时间超过 5 分钟，请[联系 Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)。

___

## 错误 1006、1007、1008 或 1106 拒绝访问：您的 IP 地址已被禁止

### 常见原因

某 Cloudflare 客户阻止了来自您的客户端或浏览器的流量。

### 解决方案

请网站所有者调查他们的 Cloudflare 安全设置，或允许您的客户端 IP 地址。由于网站所有者阻止了您的请求，Cloudflare 支持无法覆盖客户的安全设置。

___

## 错误 1009 访问被拒绝：国家或地区被禁止

### 常见原因

网站（例如 example.com）的所有者禁止您的 IP 地址所在的国家或地区访问该网站。

### 解决方案

请确保在 [IP 访问规则](https://support.cloudflare.com/hc/zh-cn/articles/217074967-Configuring-IP-Access-Rules)安全功能下允许使用您的 IP 地址。

___

## 错误 1010：本网站的所有者已根据您的浏览器签名禁止您的访问

### 常见原因

客户端上的 Web 浏览器阻止了您的请求。

### 解决方案

将阻止情况告知网站所有者。如果您无法确定如何联系网站所有者，请通过 [Whois 数据库](https://whois.icann.org/en/lookup)查找域的联系信息。网站所有者可以通过**防火墙**应用程序的**设置**选项卡禁用**浏览器****完整性检查**。

___

## 错误 1011：访问遭拒（热链接被拒绝）

### 常见原因

对使用 [Cloudflare Hotlink 保护](https://support.cloudflare.com/hc/articles/200170026)的资源发出了请求。

### 解决方案

将阻止情况告知网站所有者。如果您无法确定如何联系网站所有者，请通过 [Whois 数据库](https://whois.icann.org/en/lookup)查找域的联系信息。**Hotlink 保护**通过 Cloudflare **Scrape Shield** 应用进行管理。

___

## 错误 1012：访问遭拒

### 常见原因

站点所有者基于从访问者的计算机或网络（ip\_address）检测到的恶意活动，禁用了访问权限。 原因最有可能是访问者的计算机上感染了病毒或恶意软件。

### 解决方案

更新您的防病毒软件，并运行全面系统扫描。Cloudflare 无法覆盖站点所有者为域设定的安全设置。要请求网站访问权限，请联系站点所有者并让其允许您的 IP 地址。如果您无法确定如何联系网站所有者，请通过 [Whois 数据库](https://whois.icann.org/en/lookup)查找域的联系信息。

___

## 错误 1013：HTTP 主机名和 TLS SNI 主机名不匹配

### 常见原因

客户端或浏览器通过[服务器名称指示](/fundamentals/glossary#server-name-indication-sni)（SNI）发送的主机名与请求主机标头不匹配。

### 解决方案

错误 1013 通常由以下原因造成：

-   您的本地浏览器设置了错误的 SNI 主机标头，或者
-   网络代理 SSL 流量导致 SNI 与请求的主机标头不匹配。

使用诸如 [SSL Shopper](https://www.sslshopper.com/ssl-checker.html) 等工具测试 SNI 不匹配。

向 Cloudflare 支持提供以下信息：

1.  重现错误期间捕获的 [HAR 文件](https://support.cloudflare.com/hc/articles/203118044)

___

## 错误 1014：禁止跨用户 CNAME

### 常见原因

默认情况下，Cloudflare 禁止在不同 Cloudflare 帐户的多个域之间使用 DNS _CNAME 记录_。_CNAME 记录_在一个域中（_www.example.com_ CNAME 指向 _api.example.com_）是允许的，也允许跨同一用户帐户内的多个区域（_www.example.com_ CNAME 指向 _www.example.net_）或使用我们的 [Cloudflare for SaaS](https://www.cloudflare.com/saas/) 解决方案。

### 解决方案

要允许对另一个 Cloudflare 帐户中的域进行 CNAME 记录解析，CNAME 目标的域所有者必须使用 [Cloudflare for SaaS](https://www.cloudflare.com/saas/)，更具体而言就是我们的 [SSL for SaaS](/ssl/ssl-for-saas/) 解决方案。

___

## 错误 1015：您受到速率限制

### 常见原因

站点所有者实施了[速率限制](https://support.cloudflare.com/hc/articles/115001635128)，并且影响到您的访问者流量。

### 解决方案

-   如果您是站点访问者，请联系站点所有者，请其将您的 IP 从速率限制中排除。
-   如果您是站点所有者，请查看 [Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) 阈值并调整您的速率限制配置。
-   如果速率限制在很短时间内（如 1 秒钟）阻止请求，请尝试将时长延长到 10 秒。

___

## 错误 1016：源 DNS 错误

### 常见原因

Cloudflare 无法解析源 Web 服务器 IP 地址。

1016 错误的最常见原因：

-   缺少提及源站 IP 地址的 DNS _A 记录_。
-   Cloudflare DNS 中的 _CNAME 记录_指向了无法解析的外部域。
-   Cloudflare [负载平衡器](/load-balancing/)默认、区域和回退池中的源站主机名不可解析。请使用配置有原始 IP 的后备池作为备份，以防所有其他池均不可用。
-   创建 CNAME 源站 Spectrum 应用程序时，首先需要在 Cloudflare DNS 端创建一个指向该源站的 CNAME。请参阅 [Spectrum CNAME 源站](/spectrum/how-to/cname-origins)了解更多详细信息

### 解决方案

解决 1016 错误：

1.  验证您的 Cloudflare DNS 设置是否包含指向有效 IP 地址的 _A 记录_，该地址应通过 [DNS 查找工具](https://dnschecker.org/)进行解析。
2.  对于指向另一个域的 CNAME 记录，请确保能够通过 [DNS 查询工具](https://dnschecker.org/)解析。

___

## 错误 1018：找不到主机

### 常见原因

-   Cloudflare 域是在最近激活的，域设置传播到 Cloudflare 边缘网络时存在延迟。
-   Cloudflare 域是通过 Cloudflare 合作伙伴（例如，托管服务提供商）创建的，该提供商的 DNS 有故障。

### 解决方案

联系 [Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)并提供以下详细信息：

1.  您的域名
2.  1018 错误的屏幕截图，包括错误消息中提及的 **RayID**
3.  发生 1018 错误的时间和时区

___

## 错误 1019：计算服务器错误

### 常见原因

Cloudflare Worker 脚本以递归方式引用了其自身。

### 解决方案

确保 Cloudflare Worker 不访问调用同一 Workers 脚本的 URL。

___

## 错误 1020：访问遭拒

### 常见原因

客户端或浏览器被 Cloudflare 客户的防火墙规则阻止。

### 解决方案

如果您不是网站所有者，请向网站所有者提供您收到的 1020 错误消息的屏幕截图。

如果您是网站所有者：

1.  从客户那里获取 1020 错误屏幕截图
2.  搜索 Cloudflare **防火墙**应用程序的**概述**选项卡的[**防火墙事件日志**](/waf/analytics)，查找访问者的 1020 错误消息中是否有 **RayID** 或客户端 IP 地址。

3\. 评估阻止原因，再更新**防火墙规则**或在 [**IP 访问规则**](https://support.cloudflare.com/hc/articles/217074967)中允许访问者的 IP 地址。

___

## 错误 1023：找不到主机

### 常见原因

-   如果您刚刚注册 Cloudflare，则可能需要等待几分钟时间，让网站信息分发到我们的全球网络。站点的配置出了问题。
-   通过合作伙伴组织（例如，托管提供商）注册了帐户并且提供商的 DNS 失败时，通常会发生这种情况。

### 解决方案

联系 [Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)并提供以下详细信息：

1.  您的域名
2.  1023 错误的屏幕截图，包括错误消息中提及的 **RayID**
3.  发生 1023 错误的时间和时区

___

## 错误 1025：请稍后再检查

### 常见原因

由于域达到了 [Cloudflare Workers 的计划限值](/workers/platform/limits)，因此请求未得到服务。

### 解决方案：

通过 Workers 仪表板上的[计划](https://dash.cloudflare.com/redirect?account=workers/plans)页面购买 Unlimited Workers 计划。

___

## 错误 1033：Argo Tunnel 错误

### 常见原因

您请求了网站（如 `tunnel.example.com`）的一个页面，该网站位于 Cloudflare 网络上。主机（`tunnel.example.com`）被配置为 Argo Tunnel，Cloudflare 当前无法解析该主机。

### 解决方案

-   **如果您是该网站的访问者**：请在几分钟后重试。
-   **如果您是该网站的所有者**：请确保 _cloudflared_ 正在运行并可以访问网络。您可能需要为您的隧道启用[负载平衡](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb)。

___

## 错误 1034：边缘 IP 受限

### 常见原因

以前将域指向 `1.1.1.1` 的客户现在会遇到 **1034 错误**。这是因为 Cloudflare 系统采取了新的边缘验证检查措施，目的是防止配置错误和/或潜在的滥用。

### 解决方案

确保 DNS 记录指向您控制的 IP 地址，如果需要有占位 IP 地址才能进行“无来源”设置，请使用 IPv6 保留地址 `100::` 或 IPv4 保留地址 `192.0.2.0`。

___

## 错误 1035：无效请求重写（无效 URI 路径）

### 常见原因

您重写的 URI 路径的值或表达式无效。

当 URL 重写的目的地是 `/cdn-cgi/` 下的路径时，也会发生此错误。

### 解决方案

请确保重写的 URI 路径不为空，并且以 `/`（斜杠）字符开头。

例如，以下 URI 路径重写表达式无效：

`concat(lower(ip.geoip.country),http.request.uri.path)`

要修正上面的表达式，请添加 `/` 前缀：

`concat("/", lower(ip.geoip.country),http.request.uri.path)`

___

## 错误 1036：无效请求重写（超过最大长度）

### 常见原因

您重写的 URI 路径或查询字符串的值或表达式太长。

### 解决方案

对新的 URI 路径/查询字符串值使用较短的值或表达式。

___

## 错误 1037：无效重写规则（无法对表达式求值）

### 常见原因

无法对重写规则的表达式求值。导致这一错误的原因有多种，有可能是因为一个表达式元素在求值时包含了未定义的值。

例如，当使用下面的 URL 重写动态表达式，并且 `X-Source` 标头未包含在请求中时，您会收到 1037 错误。

`http.request.headers["x-source"][0]`

### 解决方案

请确保重写表达式的所有元素都已得到定义。例如，如果您要引用标头值，请确保已设置标头。

___

## 错误 1040：无效请求重写（不允许修改标头）

### 常见原因

您尝试修改的 HTTP 标头是 HTTP 请求标头修改规则所无法更改的。

### 解决方案

请确保您不会尝试修改任一[保留 HTTP 请求标头](/rules/transform#http-request-header-modification-rules)。

___

## 错误 1041：无效请求重写（无效标头值）

### 常见原因

添加/修改的标头值太长或包含禁止字符。

### 解决方案

-   使用较短的值或表达式来定义标头值。
-   删除禁止字符。请参阅《开发人员文档》中的 [HTTP 请求标头名称和值的格式](/rules/transform/create-header-modification-rule#format-of-http-request-header-names-and-values)，以进一步了解可接受的字符。

___

## 错误 1101：渲染错误

### 常见原因

Cloudflare Worker 抛出了运行时 JavaScript 异常。

### 解决方案：

向 Cloudflare 支持[提供相应的问题详情](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)。

___

## 错误 1102：渲染错误

### 常见原因

Cloudflare Worker 超过了 [CPU 时间限值](/workers/observability/log-from-workers/#identifying-and-handling-errors-and-exceptions)。CPU 时间是执行代码（如循环或分析 JSON 等）所花费的时间。网络请求（获取、响应）所花费的时间不计入 CPU 时间。

### 解决方案

联系 Workers 代码的开发者，请他们优化代码以降低 Workers 活动脚本中的 CPU 使用量。

___

## 错误 1104：此电子邮件地址的一个变体在我们的系统中已被占用。只允许有一种变体。

### 常见原因

如果已添加的电子邮件包含了您要添加的电子邮件的某种变体，就会出现该错误。例如，_my+user@example.com_ 和 _my.user@example.com_ 在我们的系统中视为相同。

### 解决方案

以旧用户身份登录，并将电子邮件改为“一次性”地址，将会释放出新的电子邮件。

___

## 错误 1200：缓存连接限制

### 常见原因

在 Cloudflare 的边缘上排队的请求太多，这些请求正在等待您的源 Web 服务器的处理。这个限制可保护 Cloudflare 的系统。

### 解决方案

调整源 Web 服务器以更快接受传入连接。调整缓存设置以提高缓存命中率，使更少的请求到达您的源 Web 服务器。请联系您的托管服务提供商或 Web 管理员以获取帮助。

___

## 相关资源

-   [联系 Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476#h_7b55d494-b84d-439b-8e60-e291a9fd3d16)
-   [自定义 Cloudflare 错误页面](https://support.cloudflare.com/hc/articles/200172706)
