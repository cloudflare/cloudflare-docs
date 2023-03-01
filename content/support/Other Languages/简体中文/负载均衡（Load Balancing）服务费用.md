---
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115005254367-%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1-Load-Balancing-%E6%9C%8D%E5%8A%A1%E8%B4%B9%E7%94%A8
title: 负载均衡（Load Balancing）服务费用
---

# 负载均衡（Load Balancing）服务费用

## 负载均衡（Load Balancing）服务费用

_了解有关如何计算 Cloudflare Load Balancing 账单的更多信息。_

### 本文内容

-   [Cloudflare Load Balancing 定价](https://support.cloudflare.com/hc/zh-cn/articles/115005254367-%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1-Load-Balancing-%E6%9C%8D%E5%8A%A1%E8%B4%B9%E7%94%A8#12345679)
-   [Cloudflare Load Balancing 计费](https://support.cloudflare.com/hc/zh-cn/articles/115005254367-%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1-Load-Balancing-%E6%9C%8D%E5%8A%A1%E8%B4%B9%E7%94%A8#12345680)
-   [Load Balancing 计费使用](https://support.cloudflare.com/hc/zh-cn/articles/115005254367-%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1-Load-Balancing-%E6%9C%8D%E5%8A%A1%E8%B4%B9%E7%94%A8#12345681)
-   [Enterprise 客户计费](https://support.cloudflare.com/hc/zh-cn/articles/115005254367-%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1-Load-Balancing-%E6%9C%8D%E5%8A%A1%E8%B4%B9%E7%94%A8#12345682)

___

## Cloudflare Load Balancing 定价

Cloudflare Load Balancing 订阅最低为每月 5 美元至 50 美元，具体取决于您选择的订阅选项。

您可以根据源服务器数量、运行状况检查频率、检查的区域数量和地理路由，配置 Load Balancing 以满足您的特定要求。

5 美元的订阅可让您配置 2 个源服务器，60 秒运行状况检查和来自一 (1) 个区域的检查：比较适合直接 Load Balancing 或故障转移。

___

## Cloudflare Load Balancing 计费

启用后，Cloudflare Load Balancing 将在帐户级别计费。除了每月订阅之外，我们还将计算所配置的每个 Load Balancer 的每月 DNS 请求数（“查询”）。在您帐户中的所有 Load Balancer 之间共享的首 500000 个查询是免费的：除此之外的额外使用费用为每 500000 个查询 50 美分，不足 500000 个向上舍入。

例如：

-   81451 DNS 查询 = 订阅 + 0 美元使用费
-   511881 DNS 查询 = 订阅 + 0.50 美元使用费
-   2994155 DNS 查询 = 订阅 + 2.50 美元使用费

请注意，鉴于通过配置 CNAME 记录，不同网站可以共享 Load Balancer，所以首 500000 个查询基于您帐户中所有有效 Load Balancer，而不是基于每个网站（域名）。

___

对于您已配置的每个负载均衡主机名，按照对 Cloudflare 域名服务器的权威 [DNS 查询](https://en.wikipedia.org/wiki/Domain_Name_System)来计算使用量。

您可以将 Load Balancer 配置为针对 HTTP (S) 服务的“代理”（橙色云），以减少权威 DNS 查询的数量，这将把外部 DNS TTL 设置为 5 分钟，借助非常短的 DNS TTL 设置保持良好的故障转移性能。 [详细了解代理（橙色云）与未代理（灰色云）的分别。](https://support.cloudflare.com/hc/en-us/articles/115005138088-Load-Balancing-TTLs-and-Orange-vs-Grey-Cloud)

### Enterprise 客户计费

Enterprise 客户会根据与 Cloudflare 销售团队协定的价格进行计费。Enterprise 客户还可以使用以下功能：

-   从[每个 Cloudflare 数据中心](https://www.cloudflare.com/network/)执行运行状况检查（以提高故障转移粒度）
-   每个数据中心转向（覆盖特定位置应使用的源服务器，以及以何种顺序）
-   五秒运行状况检查间隔
-   支持超过 20 台源站
-   Cloudflare Enterprise 支持团队（包括 24x7 的电子邮件、电话支援和指定的解决方案工程师）
