---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/203464660-Cloudflare-%E4%B8%8E-Shopify-%E6%90%AD%E9%85%8D
title: Cloudflare 与 Shopify 搭配
---

# Cloudflare 与 Shopify 搭配

## Cloudflare 与 Shopify 搭配

_了解如何以最佳方式将个人 Cloudflare 帐户设置为 Shopify 商家，以及 Shopify 的 Cloudflare 安全性和性能优势。_

___

## 概述

Cloudflare 与 Shopify 携手为所有 Shopify 商家网站提供Cloudflare 的性能与安全性优势。Shopify 商家还可以订阅 Enterprise 计划，使用自己的 Cloudflare 帐户将 Web 流量通过 Cloudflare 进行代理。在享受 Shopify 的 Cloudflare 好处外还使用自己的帐户开启 Cloudflare，这称为 Orange-to-Orange（O2O）。O2O 会同时应用于您本身和 Shopify 的安全性设置。

![O2O 如何在 Cloudflare 上为 Shopify 商家工作的示意图。](/support/static/hc-ext-shopify_o2o.png)

___

## 为 Shopify 网站启用 O2O

启用 O2O 仅面向 Cloudflare Enterprise 计划。

要为您的帐户启用 O2O，需要通过一个 A 或 CNAME DNS 记录将您的商店域指向域名 shop.myshopify.com。将该记录设为橙色云。

添加启用了代理的 DNS 记录后，请与您的客户团队联系，以在商店域上启用 O2O。

___

## 最佳做法

当与 O2O 一起使用时，Cloudflare 的某些功能会中断 Shopify 商店的流量，或向访问者显示不正确的数据，这意味着您应该：

-   不使用以下 Cloudflare 功能：
    -   [HTML 缓存](/cache/)
    -   [自定义防火墙规则](/firewall/)
    -   [速率限制](https://support.cloudflare.com/hc/articles/115001635128)
    -   [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552)
    -   [负载平衡](/load-balancing/)
    -   [IPv6](https://support.cloudflare.com/hc/articles/229666767)
-   要注意以下 Cloudflare 功能：
    -   [页面规则](https://support.cloudflare.com/hc/articles/218411427): 与 Shopify 使用的子域相匹配的页面规则配置不正确，可能会阻止或扭曲电子商务访问者对您网站的访问。
    -   [Workers](/workers/)：与页面规则类似，Workers 可能会中断发往您网站的流量，从而导致收益缩减。编写 Workers 应谨慎。建议您从 Workers 路由中排除用于 Shopify 的子域。
    -   [DNS CAA 记录](/ssl/edge-certificates/caa-records/)：Shopify 使用 Let’s Encrypt 为商家域颁发 SSL/TLS 证书。如果您添加任何 DNS CAA 记录，则必须选择 Let’s Encrypt 作为证书颁发机构（CA），否则 HTTPS 连接可能会出错。

___

## 其他帮助

如果您是 Shopify 商家，并且开设了自己的 Cloudflare 帐户，请与您的客户团队或 Cloudflare 支持部门联系，以帮助解决问题。如果有 Cloudflare 无法解决的技术问题，Cloudflare 会向 Shopify 求助。

-   [联系 Cloudflare 支持](https://support.cloudflare.com/hc/zh-cn/articles/200172476-Contacting-Cloudflare-Support)
