---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200172016-%E4%BA%86%E8%A7%A3-WAF-%E6%89%98%E7%AE%A1%E8%A7%84%E5%88%99-Web-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E9%98%B2%E7%81%AB%E5%A2%99-
title: 了解 WAF 托管规则（Web 应用程序防火墙）
---

# 了解 WAF 托管规则（Web 应用程序防火墙）

## 了解 WAF 托管规则（Web 应用程序防火墙）

_WAF 托管规则监控对您域名的 Web 请求，并根据您启用的规则集过滤掉不需要的流量。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/200172016-%E4%BA%86%E8%A7%A3-WAF-%E6%89%98%E7%AE%A1%E8%A7%84%E5%88%99-Web-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E9%98%B2%E7%81%AB%E5%A2%99-#cAy9P8jRAD5eJw0QrL4VJ)
-   [关于误报和漏报的说明](https://support.cloudflare.com/hc/zh-cn/articles/200172016-%E4%BA%86%E8%A7%A3-WAF-%E6%89%98%E7%AE%A1%E8%A7%84%E5%88%99-Web-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E9%98%B2%E7%81%AB%E5%A2%99-#B6O9QKf2vhGcHZZoaaJP3)
-   [Cloudflare 托管规则集](https://support.cloudflare.com/hc/zh-cn/articles/200172016-%E4%BA%86%E8%A7%A3-WAF-%E6%89%98%E7%AE%A1%E8%A7%84%E5%88%99-Web-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E9%98%B2%E7%81%AB%E5%A2%99-#4vxxAwzbHx0eQ8XfETjxiN)
-   [软件包：OWASP ModSecurity 核心规则集](https://support.cloudflare.com/hc/zh-cn/articles/200172016-%E4%BA%86%E8%A7%A3-WAF-%E6%89%98%E7%AE%A1%E8%A7%84%E5%88%99-Web-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E9%98%B2%E7%81%AB%E5%A2%99-#sJbboLurEVhipzWYJQnyz)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/200172016-%E4%BA%86%E8%A7%A3-WAF-%E6%89%98%E7%AE%A1%E8%A7%84%E5%88%99-Web-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E9%98%B2%E7%81%AB%E5%A2%99-#6Tp6cDY8h4RtLwa7EdUoh3)

___

## 概述

托管规则是 Cloudflare WAF（Web 应用程序防火墙）的一项功能，可以识别并删除 HTTP GET 和 POST 请求的可疑活动。

托管规则识别的[恶意内容](https://www.cloudflare.com/learning/security/what-is-web-application-security/)示例包括：

-   垃圾评论中使用的常见关键词（_XX_、_Rolex_、_Viagra_ 等）
-   跨站点脚本（XSS），以及
-   SQL 注入（SQLi）。

托管规则面向 Pro、Business 和 Enterprise 计划，可用于任何[代理至 Cloudflare 的子域](https://support.cloudflare.com/hc/articles/200169626)。您可在**安全性** > **WAF** > **托管规则**下控制托管规则设置。托管规则包含 3 个软件包：

-   **Cloudflare 托管规则集**
-   **软件包：OWASP ModSecurity 核心规则集**
-   **客户要求的规则** 

通过 [Firewall Analytics](/waf/analytics/) **活动日志**查看已阻止的威胁，该日志位于 **安全性** > **概述**下。

### 重要须知

-   托管规则会产生有限数量的延迟。
-   WAF 托管规则更改需要大约 30 秒来进行全局更新。
-   Cloudflare 使用专有的规则来过滤流量。
-   已建立的 WebSocket 不会对后续请求触发托管规则。
-   托管规则解析 JSON 响应，以识别针对 API 的漏洞。JSON 有效负载解析限制为 128KB。
-   托管规则可缓解填充（Padding）技术攻击。建议进行如下设置：
    1.  开启 _100048_ 规则。此规则现在可以预防填充型攻击，但默认状态下并不启用，因为它会导致客户环境中出现许多误报。不过，客户务必要调优他们的托管规则配置，这很重要。Cloudflare 正在奋力开发效果更优的长期解决方案。
    2.  使用 [Expression Editor](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor) 创建防火墙规则，具体取决于对检查报头和/或正文以阻止较大有效负载（> 128 KB）的需求。务必首先在_日志_模式中测试您的防火墙规则，因为它可能容易产生误报。
        -   _http.request.body.truncated_
        -   _http.request.headers.truncated_
-   有一小部分托管规则是 Cloudflare 不会禁用的，即使**托管规则**在 Cloudflare 仪表板中处于_关闭_状态，例如 ID 为 _WP0025B_、_100043A_ 和 _100030_ 的规则。

___

## 关于误报和漏报的说明

默认情况下，WAF 托管规则通过 Cloudflare 仪表板进行全面管理，并且与大多数网站和 Web 应用程序兼容。不过，鉴于互联网广袤无垠，难免会出现误报和漏报情况：

-   **误报**：合法请求被当做恶意请求检测和过滤。
-   **漏报**：恶意请求未被过滤。

### WAF 托管规则误报故障排除

各个网站对可疑内容的定义都具有主观性。例如，发布到您网站上的 PHP 代码是可疑的，除非您的网站教授如何编码并要求访问者提交 PHP 代码。因此，此类网站必须禁用会干扰正常运作的相关托管规则。

若要测试是否存在误报，请将 WAF 设置为**模拟**模式，以记录对潜在攻击的响应，而不进行质询或阻止。另外，请使用 Firewall Analytics [**活动日志**](/waf/analytics/paid-plans#activity-log)来确定哪些托管规则导致了误报。

如果您因[旧版 WAF](https://support.cloudflare.com/hc/zh-cn/articles/200172016-Understanding-the-Cloudflare-Web-Application-Firewall-WAF-) 遇到误报，有几种可能的解决方案可选：

-   **将客户端的 IP 地址添加到** [**IP 访问规则**](https://support.cloudflare.com/hc/articles/217074967)**允许列表中：** 如果浏览器或客户端从相同的 IP 地址访问，则建议允许。
-   **禁用相应的**[**托管规则**](https://support.cloudflare.com/hc/articles/200172016)： 不再阻止或质询误报，但会降低总体网站安全性。规则 ID _981176_ 所阻止的请求引用 OWASP 规则。降低 OWASP 灵敏度可解决此问题。
-   **使用防火墙规则绕过 WAF 托管规则**： 创建含有 **bypass** 操作的防火墙规则，以针对特定的参数组合停用 WAF 托管规则。例如，针对特定 URL 和特定 IP 地址或用户代理[绕过托管规则](/firewall/cf-firewall-rules/actions/)。
-   **（不推荐）针对发往某一 URL 的流量禁用 WAF 托管规则：** 降低特定 URL 端点的安全性。通过[页面规则](https://support.cloudflare.com/hc/zh-cn/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-)来配置。

如果您因[新版 WAF](https://blog.cloudflare.com/new-cloudflare-waf/) 遇到误报，有几种可能的解决方案可选：

1.  **添加 WAF 例外：** 您可以在 [Cloudflare 仪表板](/waf/managed-rulesets/waf-exceptions/define-dashboard)中或使用[规则集 API](/waf/managed-rulesets/waf-exceptions/define-api) 定义 WAF 例外。
2.  **禁用相应的**[**托管规则**](https://support.cloudflare.com/hc/articles/200172016)： 不再阻止或质询误报，但会降低总体网站安全性。规则 ID _949110_ 所阻止的请求引用[新的 OWASP 规则](https://blog.cloudflare.com/new-cloudflare-waf/)。降低 OWASP 灵敏度可解决此问题。

**注意：**如果要[联系 Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)以验证 WAF 托管规则是否按预期触发，请提供在发送具体的相关请求时所采集的 [HAR 文件](https://support.cloudflare.com/hc/articles/203118044#h_8c9c815c-0933-49c0-ac00-b700700efce7)。

其他准则如下：

-   如果某一特定规则导致误报，请将规则的**模式**设置为_禁用_，而不是_关闭_整个规则**组**。
-   如果误报涉及网站上的管理员内容，请创建一条[**页面规则**](https://support.cloudflare.com/hc/articles/218411427)，针对网站资源的 _admin_ 部分（即 _yoursite.com/admin_）**禁用安全性**。

### WAF 托管规则漏报故障排除

要识别漏报，请查看源 Web 服务器上的 HTTP 日志。要减少误报，请使用以下检查列表：

-   **安全性** > **WAF** > **托管规则**下是否_启用_了 WAF 托管规则？
-   是否通过[**页面规则**](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings) _禁用_了 WAF 托管规则？
-   并不是所有 WAF 托管规则都默认启用，因此请查看各个 WAF 托管规则的默认操作。
    -   例如，Cloudflare 默认允许具有空用户代理的请求。要阻止具有空用户代理的请求，请将规则的**模式**设为**阻止**。
    -   再比如说，如果您想阻止充分的 SQL 注入攻击，请确保在 **Cloudflare Specials** 组下启用相关的 SQLi 规则并设置为**阻止**。
-   服务 HTTP 流量的 DNS 记录是否通过 Cloudflare 代理？
-   [**防火墙规则**是否绕过](/firewall/cf-firewall-rules/actions/#supported-actions)了托管规则？
-   [**IP 访问规则**](https://support.cloudflare.com/hc/articles/217074967)或[**防火墙规则**](/firewall/cf-firewall-rules/)允许的国家/地区、ASN、IP 范围或 IP 是否与攻击流量匹配？
-   定向到您的源站 IP 地址的恶意流量是否绕过了 Cloudflare 保护？在您的源 Web 服务器上阻止来自 [Cloudflare IP 地址](https://www.cloudflare.com/ips/)以外的所有流量。

___

## Cloudflare 托管规则集

**Cloudflare 托管规则集**包含由 Cloudflare 编写和管理的安全规则。单击**组**下的规则集名称，可显示规则描述。

**Cloudflare Specials** 是一个**组**，提供了防御[常见攻击](https://www.cloudflare.com/learning/security/what-is-web-application-security/)的核心防火墙安全性。

 

查看规则集时，Cloudflare 将显示每条规则的默认操作并列在**默认模式**下。特定 **Cloudflare** **托管规则集**内各条规则可用的**模式**包括：

-   _默认 -_ 采取查看具体规则时列在_**默认模式**_下的默认操作。
-   _禁用 -_ 关闭组中的特定规则。
-   _阻止_ - 请求被丢弃。
-   _旧版 CAPTCHA_ - 访问者收到 CAPTCHA 质询页面。
-   _模拟_ - 请求被允许通过，但记录到[**活动日志**](/waf/analytics/paid-plans#activity-log)中。

通过 Cloudflare 的 [WAF 变更日志](/waf/change-log/scheduled-changes/)，客户可以监控对 **Cloudflare 托管规则集**的持续更改。

___

## 软件包：OWASP ModSecurity 核心规则集

### 了解 Cloudflare 的 OWASP 软件包

**软件包：OWASP ModSecurity 核心规则集**根据触发的 OWASP 规则数量为每个请求指定一个分数。某些 OWASP 规则的敏感度分数高于其他规则。在 OWASP 评估请求后，Cloudflare 会将最终分数与为该域名配置的**敏感度**进行比较。如果分数超过**敏感度**，则根据**软件包：OWASP ModSecurity 核心规则集**中配置的**操作**来处理这个请求。

-   _阻止_ - 请求被丢弃。
-   _质询_ - 访问者收到 CAPTCHA 质询页面。
-   _模拟_ - 请求被允许通过，但记录到[**活动日志**](/waf/analytics/paid-plans#activity-log)中。

对于具体的**敏感度**，触发 WAF 所需的敏感度得分如下：

-   _低_ - 60 及以上
-   _中_ - 40 及以上
-   _高_ - 25 及以上

对于 Ajax 请求，则适用以下分数：

-   _低_ - 120 及以上
-   _中_ - 80 及以上
-   _高_ - 65 及以上

检查[活动日志](/waf/analytics/paid-plans#activity-log)，以查看最终分数以及各个触发的规则。

### 控制 Cloudflare 的 OWASP 软件包

**软件包：OWASP ModSecurity 核心规则集**包含来自于 [OWASP 项目](https://www.owasp.org/index.php/Category:OWASP_ModSecurity_Core_Rule_Set_Project)的若干规则。Cloudflare 不编写或管理 OWASP 规则。单击**组**下的规则集名称，可显示规则描述。与 **Cloudflare 托管规则集**不同，具体的 OWASP 规则为_开_或_关_状态。

要管理 OWASP 阈值，请在**软件包：OWASP ModSecurity 核心规则集**下将_灵敏度_设置为_低_、_中_或**高**。如果把**灵敏度**设置 _关闭_，将会禁用整个 OWASP 软件包，包括其所有规则。如何确定适当的**灵敏度**取决于您所在的行业和运营状况。例如，_低_设置适用于：

-   某些更有可能触发 WAF 的行业，以及
-   大文件上传。 

Cloudflare 建议首先将**敏感度**设置为_低_，再检查误报，然后进一步提高**敏感度**。

___

## 相关资源

-   [防火墙分析](/waf/analytics/)
-   [Cloudflare 防火墙规则](/firewall/cf-firewall-rules/)
-   [Cloudflare WAF 变更日志](/waf/change-log/scheduled-changes/)
