---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115000272247-Cloudflare-Rate-Limiting-%E6%9C%8D%E5%8A%A1%E8%B4%B9%E7%94%A8
title: Cloudflare Rate Limiting 服务费用
---

# Cloudflare Rate Limiting 服务费用

## Cloudflare Rate Limiting 服务费用

_了解有关如何计算 Cloudflare Rate Limiting 账单的更多信息。_

___

Enterprise 客户将按合同中所定的费用来收取。所有其他用户会[根据其使用量](https://support.cloudflare.com/hc/en-us/articles/115004555148)收费，并显示在每月的订阅发票中，详细信息如下：

您所有网站的首 10000 个可计费请求均为免费。然后，每 10000 个请求的收费为 0.05 美元。举例说，如果您任何符合 rate limiting 规则的良好/允许的总请求数量为 35000 个：

-   1 - 10000 免费。
-   10001 - 20000 的费用为 0.05 美元
-   20001 - 30000 的费用为 0.05 美元
-   30001 - 35000 的费用为 0.05 美元（如果您只使用所付 10000 个请求中的一部分，也是按 10000 个请求来收费）

在下一个[账单日期](https://support.cloudflare.com/hc/en-us/articles/200170286-How-does-CloudFlare-s-billing-for-apps-and-paid-plans-work-#section2)，您将给收取总计 0.15 美元的 Rate Limiting 费用。费用将在您的账单上显示为行式项目，并会列出已计费的请求总数。

请注意，首 10000 个请求适用于您帐户中的所有网站，而不是每个网站的 10000 个免费请求：如果您有一个网站有 20000 个请求，而另一个网站有 30000 个请求，那么您的账单将按总计 50000 个请求计费 0.20 美元，而不是 0.15 美元。

___

## Rate Limiting 可计费使用

Rate Limiting 根据您所有网站中与您定义的规则匹配的良好（未阻止）请求的数量来计费。每个请求只计算一次，因此如果一个请求符合多个规则，也不会重复收费。

例如，一条规则匹配 example.com/ratelimit/\* 并阻止每分钟发送超过 30 个请求的客户端：

-   客户端 A 以每分钟 10 个请求的速率向 example.com/ratelimit/foo 发送 20000 个请求。那些请求都是允许的。
-   客户端 B 向 example.com/ratelimit/bar 发送 90000 个请求，通常以每分钟 10 个请求的速率发送，但突发会超过每分钟 30 个请求。其中 60000 个请求在突发期间被阻止，当请求率较低时，允许 30000 个请求。
-   客户端 C 以每分钟 40 个请求的速率向 example.com/elsewhere 发送 20000 个请求。虽然这超出了限制值，但与规则路径不匹配，因此允许所有 20000 个请求。

在此示例中，50000 (30000 + 20000) 个请求是可计费的：客户端 A 和 B 都发送了与规则匹配的请求，但是客户端 B 的部分请求被阻止，并且那些被阻止的请求未被计费。总计费用为 (50000 - 10000) \* 0.05 美元= 0.20 美元。

| 
**客户端**

 | 

**请求 URL**

 | 

**请求数量**

 | 

**结果**

 | 

**每月费用**

 |
| --- | --- | --- | --- | --- |
| A | example.com/ratelimit/foo | 20000 个（每分钟10 个请求） | URL 模式匹配但未超过限制值。所有请求均通过。 | 

(2-1)\*0.05 美元 = 0.05 美元

_仅对 10000 个请求收费，因为允许的首 10000 个请求不会产生任何费用。_

 |
| B |  example.com/ratelimit/bar | 

90000 个：

60000 个（每分钟30 个请求）+ 30000 个（未达每分钟30 个请求）

 | URL 模式匹配。规则阻止 60000 个请求，允许 30000 个请求。 | 3\*0.05 美元 = 0.15 美元 |
| C |  example.com/elsewhere | 20000 个（每分钟40 个请求） | URL 模式不匹配。规则不适用。所有请求均通过。 | 0.00 美元 |
|  **总计费：** | 0.20 美元 |
