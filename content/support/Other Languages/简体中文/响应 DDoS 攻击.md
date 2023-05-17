---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200170196--%E5%93%8D%E5%BA%94-DDoS-%E6%94%BB%E5%87%BB
title: 响应 DDoS 攻击
---

# 响应 DDoS 攻击

## 响应 DDoS 攻击

_防止您的网站遭受[分布式拒绝服务 (DDoS) 攻击](https://www.cloudflare.com/ddos)。了解基本的对策以停止进行中的攻击。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/200170196--%E5%93%8D%E5%BA%94-DDoS-%E6%94%BB%E5%87%BB#h_49125146-d910-42ad-a0d8-3d08a4eae681)
-   [第 1 步：启用 **Under Attack Mode**](https://support.cloudflare.com/hc/zh-cn/articles/200170196--%E5%93%8D%E5%BA%94-DDoS-%E6%94%BB%E5%87%BB#h_dfff923a-5879-4750-a747-ed7b639b6e19)
-   [第 2 步： 启用 **Web Application Firewall** (WAF)](https://support.cloudflare.com/hc/zh-cn/articles/200170196--%E5%93%8D%E5%BA%94-DDoS-%E6%94%BB%E5%87%BB#h_b97416a5-5196-4f12-acb6-f81bbfcfa95f)
-   [第 3 步：通过 **Firewall** 应用质询或阻止流量](https://support.cloudflare.com/hc/zh-cn/articles/200170196--%E5%93%8D%E5%BA%94-DDoS-%E6%94%BB%E5%87%BB#h_a2c9a5ce-d652-46db-9e82-bc3f06835348)
-   [第 4 步：联系 Cloudflare 支持](https://support.cloudflare.com/hc/zh-cn/articles/200170196--%E5%93%8D%E5%BA%94-DDoS-%E6%94%BB%E5%87%BB#h_995ffed3-18a9-4f8c-833c-81236061b1e8)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/200170196--%E5%93%8D%E5%BA%94-DDoS-%E6%94%BB%E5%87%BB#h_034beb4b-231e-40d8-b938-5c1b446e26a6)

___

## 概述

Cloudflare 的网络会自动防御大规模 [DDoS 攻击](https://www.cloudflare.com/ddos)。在 Cloudflare 上缓存内容也可防止您的网站遭受小规模 DDoS 攻击，但未缓存的资源可能需要本指南中介绍的额外手动干预步骤。

___

## 第 1 步：启用 **Under Attack Mode**

如何激活 **[Under Attack Mode](https://support.cloudflare.com/hc/articles/200170076)**：

1.  登录您的 Cloudflare 帐户。
2.  选择当前遭受攻击的域。
3.  在 Cloudflare **Overview** 应用的 **Quick Actions** 部分中，将 **Under Attack Mode** 切换到 _On_。
4.  \[可选\] 调整 **Firewall**  应用中 **Settings** 选项卡内的 **[Challenge Passage](https://support.cloudflare.com/hc/articles/200170136)**。

___

## 第 2 步：启用 **Web Application Firewall** (WAF)

通过以下步骤启用 Cloudflare [WAF](https://support.cloudflare.com/hc/en-us/articles/200172016-What-does-the-Web-Application-Firewall-WAF-do-)：

1.  登录您的 Cloudflare 帐户。
2.  设置需要额外保护的域。
3.  在 **Firewall** 应用的 **Managed Rules** 选项卡中，将 **Web Application Firewall** 切换到 _On_。

___

## 第 3 步：通过 **Firewall** 应用质询或阻止流量

Cloudflare **Firewall** 应用可通过以下方式协助流量拦截：

**[IP 访问规则](/waf/tools/ip-access-rules/)** - 建议用于阻止多个 IP 地址、/16 或 /24 IP 范围或自治系统编号 (ASN)。 
**[防火墙规则](/firewall/cf-dashboard/create-edit-delete-rules/)** - 建议用于阻止国家/地区、任意有效的 IP 范围或更为复杂的攻击模式。
**[Zone Lockdown](/waf/tools/zone-lockdown/)** - 建议用于仅允许受信任的 IP 地址或范围访问您的站点的某一部分。
**[User Agent Blocking](/waf/tools/user-agent-blocking/)** - 建议用于阻止整个域中可疑的[用户代理标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)。

要决定阻止或质询哪些国家/地区或 IP，请查看您的日志文件。联系您的主机提供商以帮助确定以下几项：

-   到达您的源站 Web 服务器的攻击流量；
-   攻击所访问的资源；以及
-   攻击的常见特征（IP 地址、用户代理、国家/地区或 ASN 等）。

___

## 第 4 步：联系 Cloudflare 支持

如果您无法通过上述步骤阻止攻击造成您的源站 Web 服务器过载，请[联系 Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730)寻求帮助。

___

## 相关资源

-   [了解 Cloudflare DDOS 防护](https://support.cloudflare.com/hc/articles/200172676)
-   [最佳做法：DDoS 预防措施](https://support.cloudflare.com/hc/articles/200170166)
-   [“I’m Under Attack 模式”的作用是什么？](https://support.cloudflare.com/entries/22053133)
-   [使用 Cloudflare Logs 来调查 DDoS 流量（仅限 Enterprise）](https://support.cloudflare.com/hc/en-us/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [如何向执法机构报告 DDoS 攻击](https://www.icann.org/news/blog/how-to-report-a-ddos-attack)
