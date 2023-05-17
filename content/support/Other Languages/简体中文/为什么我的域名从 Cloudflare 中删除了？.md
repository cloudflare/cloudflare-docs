---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/221327488-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E4%BB%8E-Cloudflare-%E4%B8%AD%E5%88%A0%E9%99%A4%E4%BA%86-
title: 为什么我的域名从 Cloudflare 中删除了？
---

# 为什么我的域名从 Cloudflare 中删除了？

## 为什么我的域名从 Cloudflare 中删除了？

_本文提供了调查和恢复已从 Cloudflare 账户中删除的域名的步骤。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/221327488-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E4%BB%8E-Cloudflare-%E4%B8%AD%E5%88%A0%E9%99%A4%E4%BA%86-#h_71645430211540423470679)
-   [步骤 1 - 检查 Cloudflare 账户中的审核日志](https://support.cloudflare.com/hc/zh-cn/articles/221327488-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E4%BB%8E-Cloudflare-%E4%B8%AD%E5%88%A0%E9%99%A4%E4%BA%86-#h_75178970471540423485029)
-   [步骤 2 - 检查域注册是否列出 Cloudflare 域名服务器](https://support.cloudflare.com/hc/zh-cn/articles/221327488-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E4%BB%8E-Cloudflare-%E4%B8%AD%E5%88%A0%E9%99%A4%E4%BA%86-#h_84363930121540423493275)
-   [步骤 3 - 检查域名解析是否使用 Cloudflare 域名服务器](https://support.cloudflare.com/hc/zh-cn/articles/221327488-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E4%BB%8E-Cloudflare-%E4%B8%AD%E5%88%A0%E9%99%A4%E4%BA%86-#h_670950877161540423505236)
-   [恢复已删除的域](https://support.cloudflare.com/hc/zh-cn/articles/221327488-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E4%BB%8E-Cloudflare-%E4%B8%AD%E5%88%A0%E9%99%A4%E4%BA%86-#h_88537939911540919764865)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/221327488-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E4%BB%8E-Cloudflare-%E4%B8%AD%E5%88%A0%E9%99%A4%E4%BA%86-#h_186867048201540423513703)

___

## 概述

域名删除通常出于以下原因：

-   有权访问域的用户将其删除。
-   名称服务器不再指向 Cloudflare。Cloudflare 会持续监控域名注册。
-   域名没有完成身份验证（等待 60 天）。

___

Cloudflare **审核日志**包含有关域名删除的信息。有关**审核日志**功能的其他信息，请查看[使用审核日志](https://support.cloudflare.com/hc/en-us/articles/115002833612-How-do-I-use-Audit-Logs-)。

1.  登录 Cloudflare 仪表板。
2.  单击已删除域所在的相应 Cloudflare 账户。
3.  单击顶部第二个导航栏中的 **Audit Log**。
4.  在**域**中输入已删除的域名。
5.  单击_删除_ **操作**，并确保**资源**显示_帐户_。
6.  观察已删除域名的**日期**、**用户 IP 地址**和**用户**。
7.  如果**用户 IP 地址**是 _127.0.0.1_ 或不含任何数据，则删除是由 Cloudflare 的系统自动执行的。请转到第 2 步 

___

## 步骤 2 - 检查域注册是否列出 Cloudflare 域名服务器

1\. 使用操作系统提供的基于命令行的“whois”应用程序或 [whois.icann.org](https://whois.icann.org/en) 或 [www.whois.net](https://www.whois.net/) 等网站。

-   如果无法找到您的域的域名服务器详细信息，请与您的域名注册商或域名提供商联系，以提供域名注册信息。
-   确保 Cloudflare 的域名服务器是域名注册详细信息中列出的唯一两个域名服务器。
-   确保在域名注册中域名服务器拼写正确。

2\. 确认域名服务器与 Cloudflare **DNS** 应用的 **Cloudflare 域名服务器**部分中提供的域名服务器完全匹配。

3\. 如果识别出错误信息，请登录域名提供商的门户进行更新，或与您的域名提供商联系以获取帮助。

___

## 步骤 3 - 检查域名解析是否使用 Cloudflare 域名服务器

1\. 使用命令行或第三方工具确认是否已配置 Cloudflare 的域名服务器：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +trace NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

当 DNS 响应失败时，+trace 选项会输出详细信息。在联系 DNS 提供商解决问题时，此信息非常有用。

@8.8.8.8 选项返回 Google 公共 DNS 解析器的解析结果。结果将确认公共解析器是否收到 DNS 响应。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com 8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

-   确保 Cloudflare 的两个域名服务器是查询结果中返回的唯一域名服务器。
-   确保域名服务器拼写正确。
-   确认域名服务器与 Cloudflare **DNS** 应用的 **Cloudflare 域名服务器**部分中提供的域名服务器完全匹配。

2\. 如果识别出错误信息，请登录域名提供商的门户进行更新，或与您的域名提供商联系以获取帮助。

3\. 如果域名服务器和域名注册数据正确无误，请与您的域名提供商联系，以确认是否存在最近的 DNS 传播问题。

___

## 恢复已删除的域

通过位于 Cloudflare 仪表板顶部导航栏右侧的 **\+ 添加网站**链接恢复已删除的域。必须像添加新域一样添加域名。

___

## 相关资源

-   [辅助域名服务器](https://support.cloudflare.com/hc/en-us/articles/360001356152-How-do-I-setup-and-manage-Secondary-DNS-)（Enterprise 功能）
-   [CNAME 设置](/dns/zone-setups/partial-setup)（Business 和 Enterprise 功能）
-   [如何将域名服务器更改为 Cloudflare](/dns/zone-setups/full-setup/setup)
