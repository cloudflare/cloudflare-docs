---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/4405924494477-Cloudflare-%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97-%E5%B7%B2%E9%98%BB%E6%AD%A2%E7%9A%84%E6%80%BB%E5%A8%81%E8%83%81%E6%95%B0-
title: Cloudflare 如何计算“已阻止的总威胁数”
---

# Cloudflare 如何计算“已阻止的总威胁数”

1.  [Cloudflare帮助中心](https://support.cloudflare.com/hc/zh-cn)
2.  [分析](https://support.cloudflare.com/hc/zh-cn/categories/200276267-%E5%88%86%E6%9E%90)
3.  [了解更多](https://support.cloudflare.com/hc/zh-cn/sections/360007476851-%E4%BA%86%E8%A7%A3%E6%9B%B4%E5%A4%9A)

## Cloudflare 如何计算“已阻止的总威胁数”

## 概述

“已阻止的总威胁数”用于测量以您的网站为攻击目标的“可疑”及“恶意”请求的数量。当请求进入 Cloudflare 网络时，将按照我们的 IP 信誉数据库接收以下标签：

-   **正规：** 直接传输到您的网站的请求
-   **可疑：** 已使用 CAPTCHA 页面或 JavaScript 质询页面进行质询的请求
-   **错误：** 由于浏览器完整性检查 (BIC)或者用户配置的设置（如 WAF 规则或 IP 范围阻止），请求已被阻止

Cloudflare 使用从 Project Honeypot 以及我们自己的流量等来源收集的“威胁分数”来确定访问者是正规的还是恶意的。 当正规访问者通过质询时，这有助于抵消之前从该 IP 地址看到的负面行为的“威胁分数”。 我们的系统便会从这其中了解到哪个是威胁。

除了威胁分析之外，您还可以监控访问您网站的搜索引擎爬虫。 对于大多数网站，威胁和网络爬虫占流量的 20% - 50%。
