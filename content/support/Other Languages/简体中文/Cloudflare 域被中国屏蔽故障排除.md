---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200169566-Cloudflare-%E5%9F%9F%E8%A2%AB%E4%B8%AD%E5%9B%BD%E5%B1%8F%E8%94%BD%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4
title: Cloudflare 域被中国屏蔽故障排除
---

# Cloudflare 域被中国屏蔽故障排除

### 此组别内的文章

-   [收集信息以排查站点问题](https://support.cloudflare.com/hc/zh-cn/articles/203118044-%E6%94%B6%E9%9B%86%E4%BF%A1%E6%81%AF%E4%BB%A5%E6%8E%92%E6%9F%A5%E7%AB%99%E7%82%B9%E9%97%AE%E9%A2%98 "收集信息以排查站点问题")
-   [联系 Cloudflare 支持](https://support.cloudflare.com/hc/zh-cn/articles/200172476-%E8%81%94%E7%B3%BB-Cloudflare-%E6%94%AF%E6%8C%81 "联系 Cloudflare 支持")
-   [如果我的网站将要迎来流量高峰，该怎么办？](https://support.cloudflare.com/hc/zh-cn/articles/200172906-%E5%A6%82%E6%9E%9C%E6%88%91%E7%9A%84%E7%BD%91%E7%AB%99%E5%B0%86%E8%A6%81%E8%BF%8E%E6%9D%A5%E6%B5%81%E9%87%8F%E9%AB%98%E5%B3%B0-%E8%AF%A5%E6%80%8E%E4%B9%88%E5%8A%9E- "如果我的网站将要迎来流量高峰，该怎么办？")
-   [爬网错误故障排除](https://support.cloudflare.com/hc/zh-cn/articles/200169806-%E7%88%AC%E7%BD%91%E9%94%99%E8%AF%AF%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4 "爬网错误故障排除")
-   [图像缺失故障排除](https://support.cloudflare.com/hc/zh-cn/articles/200169906-%E5%9B%BE%E5%83%8F%E7%BC%BA%E5%A4%B1%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4 "图像缺失故障排除")
-   [分享至 Facebook 问题故障排除](https://support.cloudflare.com/hc/zh-cn/articles/217720788-%E5%88%86%E4%BA%AB%E8%87%B3-Facebook-%E9%97%AE%E9%A2%98%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4 "分享至 Facebook 问题故障排除")
-   [Cloudflare 域被中国屏蔽故障排除](https://support.cloudflare.com/hc/zh-cn/articles/200169566-Cloudflare-%E5%9F%9F%E8%A2%AB%E4%B8%AD%E5%9B%BD%E5%B1%8F%E8%94%BD%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4 "Cloudflare 域被中国屏蔽故障排除")

![](/images/support/513a9e8b35eaed0a35fce9cc22f9972e37872a33.png)

1.  [Cloudflare帮助中心](https://support.cloudflare.com/hc/zh-cn)
2.  [故障排除](https://support.cloudflare.com/hc/zh-cn/categories/200276217-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)
3.  [一般故障排除](https://support.cloudflare.com/hc/zh-cn/sections/200804937-%E4%B8%80%E8%88%AC%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)

## Cloudflare 域被中国屏蔽故障排除

_确认中国 GFW 防火墙是否屏蔽您的 Cloudflare 站点。_

___

## 概述

要确认中国境内是否屏蔽了与您的域关联的 Cloudflare IP，请向 [Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476)提供以下详细信息：

1.从中国境内某一位置 [traceroute 您的域](http://support.cloudflare.com/entries/22050846-how-do-i-run-a-traceroute)的记录，以演示网络路径。 

2.[Great Firewall Checker](http://www.greatfirewallofchina.org/) 的结果。

3.从中国境内某一位置进行 DNS 解析的响应结果。  您可考虑使用 [DNS Checker](https://dnschecker.org/) 等工具。

4.您的站点上托管的内容的类型。  中国确实会屏蔽特定的内容，如色情、赌博和某些类型的政治讨论。

Cloudflare 支持只能确认某个域是不是被中国屏蔽，对取消屏蔽没有任何掌控力。
