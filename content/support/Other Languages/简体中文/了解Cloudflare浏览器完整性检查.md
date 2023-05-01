---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/4405914311181-%E4%BA%86%E8%A7%A3Cloudflare%E6%B5%8F%E8%A7%88%E5%99%A8%E5%AE%8C%E6%95%B4%E6%80%A7%E6%A3%80%E6%9F%A5
title: 了解Cloudflare浏览器完整性检查
---

# 了解Cloudflare浏览器完整性检查

1.  [Cloudflare帮助中心](https://support.cloudflare.com/hc/zh-cn)
2.  [防火墙](https://support.cloudflare.com/hc/zh-cn/categories/200275228-%E9%98%B2%E7%81%AB%E5%A2%99)
3.  [设置](https://support.cloudflare.com/hc/zh-cn/sections/360003834432-%E8%AE%BE%E7%BD%AE)

_了解 Cloudflare浏览器完整性检查如何拒绝带有被垃圾邮件发送者滥用的 HTTP标头的请求访问您的网站。_

___

## 概述

Cloudflare **浏览器完整性检查 (BIC)** 的操作类似于[恶意行为](https://bad-behavior.ioerror.us/)，查找垃圾邮件发送者最常滥用的常见 HTTP 标头并拒绝其访问您的页面。 它还质询没有用户代理或具有非标准用户代理的访问者，例如滥用自动程序、网络爬虫或访问者常用的。

默认情况下，**BIC** 是通过 Cloudflare **防火墙**应用的**设置**选项卡启用的。 您可以使用[防火墙 BYPASS 规则](/firewall/cf-firewall-rules/actions/#supported-actions)禁用 **BIC**。 此外，使用[页面规则](https://support.cloudflare.com/hc/articles/218411427)有选择地为您网站的某些部分启用或禁用此功能。 例如，[为您的 API 流量禁用 **BIC**](https://support.cloudflare.com/hc/articles/200504045) 。

___

## 相关资源

[了解您的站点保护选项](https://support.cloudflare.com/hc/zh-cn/articles/115002059131-%E4%BA%86%E8%A7%A3%E6%82%A8%E7%9A%84%E7%AB%99%E7%82%B9%E4%BF%9D%E6%8A%A4%E9%80%89%E9%A1%B9)
