---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360021357131-%E5%A7%94%E6%B4%BE-Cloudflare-%E4%B9%8B%E5%A4%96%E7%9A%84%E5%AD%90%E5%9F%9F
title: 委派 Cloudflare 之外的子域
---

# 委派 Cloudflare 之外的子域

## 委派 Cloudflare 之外的子域

_子域委派提供了独立管理 Cloudflare 之外的某些子域的灵活性。_

___

## 概述

子域委派允许不同的个人、团队或组织管理站点的不同子域。

例如，将 _example.com_ 视为 Cloudflare 域，其中 w_ww.example.com_ 在 Cloudflare 的 **DNS** 应用中管理，而 _internal.example.com_ 则委托给 Cloudflare 之外的域名服务器。在此示例中，_internal.example.com_ 现在可以由无法访问 _example.com_ 域的 Cloudflare 凭据的个人管理。

___

## 委派子域

要委派子域（例如 _internal.example.com_），请告知 DNS 解析器在何处查找区域文件：

1.  登录 Cloudflare 仪表板。
2.  单击相应的 Cloudflare 账户。
3.  选择包含要委派的子域的域。
4.  单击 **DNS** 应用。
5.  为子域创建 _NS 记录_。例如：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">internal.example.com NS ns1.externalhost.cominternal.example.com NS ns2.externalhost.cominternal.example.com NS ns3.externalhost.com</span></div></span></span></span></code></pre>{{</raw>}}

6.  （可选）如果委派的域名服务器已启用 DNSSEC，则在 Cloudflare **DNS** 应用中添加 _DS 记录_。

___

## 相关资源

-   [管理 Cloudflare 中的 DNS 记录](https://support.cloudflare.com/hc/articles/360019093151)
-   [了解 CNAME 设置](https://support.cloudflare.com/hc/articles/360020348832)
-   [粘合记录](https://www.ietf.org/rfc/rfc1912.txt)（RFC 1912 第 2.3 节）
