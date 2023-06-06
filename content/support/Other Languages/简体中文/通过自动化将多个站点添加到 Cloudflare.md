---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360000841472-%E9%80%9A%E8%BF%87%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B0%86%E5%A4%9A%E4%B8%AA%E7%AB%99%E7%82%B9%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare
title: 通过自动化将多个站点添加到 Cloudflare
---

# 通过自动化将多个站点添加到 Cloudflare

_了解如何使用 Cloudflare API 或 Cloudflare 的 CLI 工具 flarectl 一次向 Cloudflare 添加多个站点（10 个以上）。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/360000841472-%E9%80%9A%E8%BF%87%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B0%86%E5%A4%9A%E4%B8%AA%E7%AB%99%E7%82%B9%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare#01EiMuIl9b6BVA2vUdCy2X)
-   [先决条件](https://support.cloudflare.com/hc/zh-cn/articles/360000841472-%E9%80%9A%E8%BF%87%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B0%86%E5%A4%9A%E4%B8%AA%E7%AB%99%E7%82%B9%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare#2C6OkWg2Flbl6ZBJss7FjH)
-   [通过 API 添加域名](https://support.cloudflare.com/hc/zh-cn/articles/360000841472-%E9%80%9A%E8%BF%87%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B0%86%E5%A4%9A%E4%B8%AA%E7%AB%99%E7%82%B9%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare#3Mk8dKAR73TTdEKH2WLfzb)
-   [通过 flarectl（Cloudflare 的 CLI 工具）添加域名](https://support.cloudflare.com/hc/zh-cn/articles/360000841472-%E9%80%9A%E8%BF%87%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B0%86%E5%A4%9A%E4%B8%AA%E7%AB%99%E7%82%B9%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare#194axRKd2V27vV5bs4e8iD)
-   [常见问题](https://support.cloudflare.com/hc/zh-cn/articles/360000841472-%E9%80%9A%E8%BF%87%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B0%86%E5%A4%9A%E4%B8%AA%E7%AB%99%E7%82%B9%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare#6yR1Cexb7t3HYDcHGVwMjn)

___

## 概述

如果需要一次向 Cloudflare 添加多个站点（10 个以上），可以通过 Cloudflare API 来完成。在以下情况下添加多个站点非常有用：

-   将多个域名映射回单个规范域名，例如您希望 Cloudflare 保护的不同国家/地区（.com.au、.co.uk 等）的域名
-   您是代理商或 IT 咨询公司，并为您的客户管理多个域名（注意：您应该考虑 Cloudflare [合作伙伴计划](https://www.cloudflare.com/partners/)）
-   您要将现有的一组网站转移到 Cloudflare

使用 API，您可以快速地添加多个站点，特别是您已熟悉[如何更改名称服务器](/dns/zone-setups/full-setup/setup)或[添加 DNS 记录](/dns/manage-dns-records/how-to/create-dns-records)的情况下。

___

## 先决条件

要通过自动化将多个站点添加到 Cloudflare，您需要：

-   一个现有的 Cloudflare 帐户（[注册](https://www.cloudflare.com/a/signup) / [登录](https://www.cloudflare.com/a/login)）
-   基本熟悉命令行
-   已安装 curl（macOS 和 Linux 上默认安装）
-   您的 Cloudflare [API 密钥](https://support.cloudflare.com/hc/zh-cn/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-)
-   要添加的域名列表（每行一个域名，使用换行符分隔，例如“domains.txt”）

___

## 通过 API 添加域名

Cloudflare 具有功能齐全的 API（[文档](https://api.cloudflare.com/)），允许您自动创建新域名，以及配置 DNS 记录、页面规则和诸多安全设置。我们将使用此 API 自动同时添加多个域名。

打开您的终端应用程序（例如 Terminal 或 Terminal.app），并设置您的 API 密钥和电子邮件：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

接着，我们编写一个简单的 for 循环来获取每个域名：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt);do \  curl -X POST -H &quot;X-Auth-Key: $CF_API_KEY&quot; -H &quot;X-Auth-Email: $CF_API_EMAIL&quot; \  -H &quot;Content-Type: application/json&quot; \  &quot;https://api.cloudflare.com/client/v4/zones&quot;\  --data '{&quot;account&quot;: {&quot;id&quot;: &quot;id_of_that_account&quot;}, &quot;name&quot;:&quot;'$domain'&quot;,&quot;jump_start&quot;:true}'; done</span></div></span></span></span></code></pre>{{</raw>}}

“jump\_start”键会使 Cloudflare 自动尝试扫描常见 DNS 记录，例如“www”、“mail”和“blog”等等；这样，您就不必手动配置它们（但仍然要确认我们已全部找到它们）。_id\_of\_that\_account_ 可在 Cloudflare **概述**应用的**帐户 ID** 下找到。

API 会返回响应，包括您需要在您的注册商处（您注册域名的地方）更改的[名称服务器](https://support.cloudflare.com/hc/zh-cn/articles/206455647-How-do-I-change-my-domain-nameservers-)。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{ &quot;result&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;example.com&quot;,&quot;status&quot;: &quot;pending&quot;, &quot;paused&quot;: false, &quot;type&quot;: &quot;full&quot;, &quot;development_mode&quot;: 0, &quot;name_servers&quot;: [ &quot;chad.ns.cloudflare.com&quot;,&quot;lucy.ns.cloudflare.com&quot;], &quot;original_name_servers&quot;: [ &quot;ns-cloud-e1.googledomains.com&quot;,&quot;ns-cloud-e2.googledomains.com&quot;,&quot;ns-cloud-e3.googledomains.com&quot;,&quot;ns-cloud-e4.googledomains.com&quot;], &quot;original_registrar&quot;: null, &quot;original_dnshost&quot;: null, &quot;modified_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;created_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;meta&quot;: { &quot;step&quot;: 4, &quot;wildcard_proxiable&quot;: false, &quot;custom_certificate_quota&quot;: 0, &quot;page_rule_quota&quot;: 3, &quot;phishing_detected&quot;: false, &quot;multiple_railguns_allowed&quot;: false }, &quot;owner&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;type&quot;: &quot;user&quot;, &quot;email&quot;: &quot;you@example.com&quot; }, &quot;account&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;you@example.com&quot; }, &quot;permissions&quot;: [ &quot;#access:edit&quot;, &quot;#access:read&quot;, &quot;#analytics:read&quot;, &quot;#app:edit&quot;, &quot;#billing:edit&quot;, &quot;#billing:read&quot;, &quot;#cache_purge:edit&quot;, &quot;#dns_records:edit&quot;, &quot;#dns_records:read&quot;, &quot;#lb:edit&quot;, &quot;#lb:read&quot;, &quot;#logs:read&quot;, &quot;#member:edit&quot;, &quot;#member:read&quot;, &quot;#organization:edit&quot;, &quot;#organization:read&quot;, &quot;#ssl:edit&quot;, &quot;#ssl:read&quot;, &quot;#subscription:edit&quot;, &quot;#subscription:read&quot;, &quot;#waf:edit&quot;, &quot;#waf:read&quot;, &quot;#worker:edit&quot;, &quot;#worker:read&quot;, &quot;#zone:edit&quot;, &quot;#zone:read&quot;, &quot;#zone_settings:edit&quot;, &quot;#zone_settings:read&quot; ], &quot;plan&quot;: { &quot;id&quot;: &quot;0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee&quot;, &quot;name&quot;: &quot;Free Website&quot;, &quot;price&quot;: 0, &quot;currency&quot;: &quot;USD&quot;, &quot;frequency&quot;: &quot;&quot;, &quot;is_subscribed&quot;: true, &quot;can_subscribe&quot;: false, &quot;legacy_id&quot;: &quot;free&quot;, &quot;legacy_discount&quot;: false, &quot;externally_managed&quot;: false } }, &quot;success&quot;: true, &quot;errors&quot;: [], &quot;messages&quot;: []}</span></div></span></span></span></code></pre>{{</raw>}}

注意响应中的 "name\_servers" 键。对于您在帐户下添加的所有站点，这些通常是同一对，例如：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;name_servers&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;chad.ns.cloudflare.com&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;lucy.ns.cloudflare.com&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">]</span></div></span></span></span></code></pre>{{</raw>}}

复制提供给您的值（不是上面的值）并在您的注册商处[更新名称名服务器](https://support.cloudflare.com/hc/zh-cn/articles/206455647-How-do-I-change-my-domain-nameservers-)。

___

## 通过 flarectl（Cloudflare 的 CLI 工具）添加域名

您还可以使用 Cloudflare 的官方 CLI 工具 flarectl 添加域名。您可以为您的操作系统（Windows、macOS/Darwin、Linux）[下载预建程序包](https://github.com/cloudflare/cloudflare-go/releases)，并用来创建域名。

您需要先设置 API 凭据：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

... 然后在 flarectl 中运行以下命令：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt);do flarectl zone create --zone=$domain --jumpstart=false; done</span></div></span></span></span></code></pre>{{</raw>}}

在此之后，可以通过“flarectl zone list”获取每个域的名称服务器：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt);do flarectl zone info --zone=$domain; done</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

在 [Cloudflare 社区](https://community.cloudflare.com/)中搜索帮助或提示。

___

## 常见问题

如果此过程中返回了任何错误，则域名可能未注册（或刚刚注册），或者它是子域或无效。以下文章介绍了最常见的情况：

-   [为什么无法将我的域名添加到 Cloudflare？](https://support.cloudflare.com/hc/zh-cn/articles/205359838-I-cannot-add-my-domain-to-Cloudflare-)
-   [阻止的网站](https://support.cloudflare.com/hc/articles/205359838#h_874829316161540417303369)
