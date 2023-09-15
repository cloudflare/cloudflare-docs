---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98
title: Cloudflare 自动程序产品
---

# Cloudflare 自动程序产品 - 常见问题 – Cloudflare帮助中心

## Cloudflare 自动程序产品 - 常见问题

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#12345679)
-   [Cloudflare 如何检测机器人？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_vGKNSEuBtE5ymreIHOucE)
-   [怎样知道我的计划里包含哪些内容？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_3dC1nAamuWNwImCpIkdlC8)
-   [如何设置机器人产品？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_2PHwjg1FfXSS3K1aZE00yH)
-   [Yandex 机器人被 WAF 托管规则（ID 100203）意外阻止。](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#Yandex-bot-unexpectedly-blocked-WAF-100203)
-   [机器学习的工作原理？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_4iPjq7Qq4Ozsq0XwibA2ea)
-   [为什么我会看到关于防火墙规则的“托管质询”操作？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#managed-challenge)
-   [威胁分数和 Bot Management 分数有何区别？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_131SlrJFhqmrJjs0joDaXE)
-   [什么是 cf.bot\_management.verified\_bot？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_zzzgV0HSwPUhOEs5UY9sD)
-   [我运行一个良性机器人，并希望将它添加到允许列表中（cf.bot\_management.verified\_bot）。应该怎么办？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_5itGQRBabQ51RwT5cNJX8u)
-   [我需要什么信息来对机器人问题进行故障排除？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_2Ffw8AKdwQySoI8rnO02pc)
-   [如果我收到了机器人抵御模式（BFM）或超级机器人抵御模式（SBFM）引起的误报，该怎么办？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#5KX8t3C6SObnoWs5F6YOlU)
-   [超级机器人抵御模式功能（SBFM）即使在关闭后仍会阻止请求，这是为什么？](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#h_6Q8mNs9Ur9mvXhjcH1KBcn)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/360035387431-Cloudflare-%E8%87%AA%E5%8A%A8%E7%A8%8B%E5%BA%8F%E4%BA%A7%E5%93%81-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#3zR4ro73zaHshu5OldQIuB)

___

## 概述

Cloudflare 机器人解决方案可以识别并缓解自动化流量，以保护您的域免受恶意机器人的危害。

如需进一步了解这些机器人解决方案及其设置方法，请参阅[开发人员文档](/bots/)。

___

Cloudflare 使用多种方法来检测机器人，具体视不同计划而异。如需更多详细信息，请参阅 [Cloudflare 机器人产品](/bots/about/plans)。

___

## 怎样知道我的计划里包含哪些内容？

要了解计划中包含的内容，请查阅我们的[开发人员文档](/bots/about/plans)。

___

## 如何设置机器人产品？

要了解如何设置机器人产品，请查阅我们的[开发人员文档](/bots/get-started)。

___

## Yandex 机器人被 WAF 托管规则（ID 100203）意外阻止。

Yandex 更新机器人的频率很高，在传播这些变化时，您可能会看到更多误报。最新更新的机器人偶尔会被 Cloudflare WAF 托管规则（ID 100203）阻止，因为 Yandex 机器人的 IP 列表尚未与 Yandex 的最新变化同步。

**变通方法：**

-   暂时禁用 WAF 托管规则（ID 100203），
-   或创建一个带有_绕过_ 操作的防火墙规则，当请求来自 **Yandex IP** 并且用户代理包含 **Yandex** 时，将绕过 WAF 托管规则。请参阅我们的[开发人员文档](/firewall/cf-firewall-rules/actions)。

**解决方案：**

当新的 Yandex IP 传播到我们的系统后，这些请求就不再被阻止。这可能需要长达 48 小时。如果在 48 小时后，您看到有任何 Yandex 机器人仍然被阻止，并且机器人没有任何变化，请联系 [Cloudflare 支持](https://support.cloudflare.com/hc/zh-cn/articles/200172476-Contacting-Cloudflare-Support)。

___

## 机器学习的工作原理？

受监督的机器学习会提取某些变量（X，例如性别和年龄），并预测另一个变量（Y，例如收入）。

在 Bot Management 和超级机器人抵御模式中，X 变量是请求特征，而 Y 变量则代表根据 X 值求解 CAPTCHA 验证码的概率。

Cloudflare 使用来自数百万请求的数据，并定期对系统进行重新训练。您可以从自己的请求日志了解此数据的信息，例如 Cloudflare Logpull 和 Logpush，以及 Firewall API。

___

## 为什么我会看到关于防火墙规则的“托管质询”操作？

当您选择使用“机器人抵御模式”或“超级机器人抵御模式”质询不同的机器人类别时，您将看到**采取的操作**为**托管质询**的防火墙事件。

您可能还会看到因[防火墙规则](https://support.cloudflare.com/hc/articles/200170136#managed-challenge)而产生的“托管质询”。

___

## 威胁分数和 Bot Management 分数有何区别？

区别是显着的：

-   威胁分数（_cf.threat\_score_）是 Cloudflare 用来确定 IP 信誉的分数。范围是 0（好）到 100（差）。
-   Bot Management 分数（_cf.bot\_management.score）_是 Cloudflare 在 Bot Management 中用来衡量请求是来自人类还是来自脚本的分数。分数范围从 1（机器人）到 99（人类）。低分表示请求来自脚本、API 服务或自动化代理。高分表示请求来自使用标准桌面或移动 Web 浏览器的人类。

这些字段可通过 [Cloudflare Firewall Rules](/firewall/cf-firewall-rules) 使用。

___

## 什么是 cf.bot\_management.verified\_bot？

请求的 _cf.bot\_management.verified\_bot_ 值是一个布尔值，表示该请求是否来自 允许的机器人。

Cloudflare 构建了一个良性自动化机器人允许列表，例如 Google Search Engine、Pingdom，等等。

这个允许列表大体上基于反向 DNS 验证，也就是说，我们允许的 IP 确实与提出请求的服务相匹配。除此之外，Cloudflare 还使用包括 ASN 块和公共列表在内的多种验证方法。如果客户无法使用这些验证类型中的任何一种，我们将使用内部 Cloudflare 数据和机器学习来识别来自良性机器人的合法 IP 地址。

要允许来自良性机器人的流量，请使用防火墙规则中的[已验证机器人](/ruleset-engine/rules-language/fields#dynamic-fields)字段。

___

## 我运行一个良性机器人，并希望将它添加到允许列表中（cf.bot\_management.verified\_bot）。应该怎么办？

Cloudflare 在 [Cloudflare Radar](https://radar.cloudflare.com/verified-bots) 中维护着一份经验证机器人的样本列表。

作为机器人运营者，要想被 Cloudflare 列为已验证的机器人，您的机器人必须符合我们的[已验证的机器人公共政策](/bots/reference/verified-bots-policy/)。如果您的机器人符合此标准，请提交此[在线申请](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link)。

___

## 我需要什么信息来对机器人问题进行故障排除？

如果您在使用机器人解决方案时遇到错误，并且需要提交支持请求，请提供以下信息：

-   RayID
-   IP 地址
-   防火墙规则 ID、规则表达式、CAPTCHA 求解率
-   误报中常见的用户代理
-   误报中常见的 ASN
-   防火墙中异常活动的屏幕截图，例如图表中出现流量质询激增
-   有问题的 URI 或路径
-   域的配置方式的粗略描述。
    -   是否一个区域使用了 SSL for SaaS 而其他区域则没有？
    -   是否大多数 API 流量发送到了特定的 URI？
    -   您期望的移动流量有多少？

___

## 如果我收到了机器人抵御模式（BFM）或超级机器人抵御模式（SBFM）引起的误报，该怎么办？

**如何禁用 BFM****/SBFM 功能？**

如果您在使用 BFM/SBFM 功能时遇到任何问题（如误报），可以在**安全性** > **机器人**下禁用该功能。

-   对于 **Free** 计划，请将**机器人抵御模式**选项切换为**关**
-   对于 **Pro** 计划，请点击**配置超级机器人抵御模式**链接，并将**绝对自动化**和**经过验证的机器人**功能逐个设置为**允许**，然后将**静态资源保护**和 **JavaScript 检测**选项切换为**关**
-   对于 **Business** 和 **Enterprise**（无机器人管理附加服务）计划，请点击**配置超级机器人抵御模式**链接，并将**绝对自动化**、**疑似自动化**和**经过验证的机器人**功能逐一设置为**允许**，然后将**静态资源保护**和 **JavaScript 检测**选项切换为**关**

___

## 超级机器人抵御模式功能（SBFM）即使在关闭后仍会阻止请求，这是为什么？

这是一个已知的问题，机器人团队正设法在不久的将来解决这个问题。与此同时，有一种变通方法可以解决此类问题。 您需要运行以下 API 命令来检查和删除 SBFM 规则集：

1\. 列出区域级别的现有规则集


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X GET &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets&quot;\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

2\. 从步骤 1 的输出中，找到与该区域的 SBFM 配置关联的规则集 ID。您应该能够看到该结果的 `"kind": "zone"` 和 `"phase": "http_request_sbfm"`。

3\. 使用您找到的规则集 ID 来删除 SBFM 规则集


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -X DELETE &quot;https://api.cloudflare.com/client/v4/zones/zone_id/rulesets/rulesets_id&quot;\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Email: email&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;X-Auth-Key: key&quot; \</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H &quot;Content-Type: application/json&quot;</span></div></span></span></span></code></pre>{{</raw>}}

请注意，您需要将 <key> 替换为您自己的 API 密钥，该密钥可以从 [API 令牌](https://dash.cloudflare.com/profile/api-tokens)中获取。

___

## 相关资源

-   [Cloudflare Bot Management](/bots/)（开发人员文档）
-   [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/)（开发人员文档）
-   [Cloudflare Bot Management：机器学习和其他](https://blog.cloudflare.com/cloudflare-bot-management-machine-learning-and-more/)（Cloudflare 博客）
-   [阻止机器人：机器学习的实践经验](https://blog.cloudflare.com/stop-the-bots-practical-lessons-in-machine-learning/)（Cloudflare 博客）
