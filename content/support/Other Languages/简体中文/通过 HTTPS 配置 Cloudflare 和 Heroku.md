---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/205893698-%E9%80%9A%E8%BF%87-HTTPS-%E9%85%8D%E7%BD%AE-Cloudflare-%E5%92%8C-Heroku
title: 通过 HTTPS 配置 Cloudflare 和 Heroku
---

# 通过 HTTPS 配置 Cloudflare 和 Heroku

## 通过 HTTPS 配置 Cloudflare 和 Heroku

Heroku 是一个支持多种预配置编程语言的云 PaaS。Heroku 可处理您的所有底层运行，因此您可以专注于您的应用程序，而不需要为命令行分心。

本文将介绍如何使用 Cloudflare 配置 Heroku，以便通过 HTTPS 为您的流量提供服务。本文假设您已经在 [Cloudflare 中已有一个活动域](https://support.cloudflare.com/hc/en-us/sections/200820158-CloudFlare-101)，以及正在使用 Heroku 应用。

1.  登录 Heroku，选择您的应用，然后转到**Settings （设置）**。
2.  向下滚动到 **Domains and certificates**，然后单击**Add Domain**以添加域名。

如果您通过 CLI 操作 Heroku，可以选择使用以下命令添加域名：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">heroku domain:add [example.com]</span></div></span></span></span></code></pre>{{</raw>}}

## 设置您的 Cloudflare DNS

**重要事项：**忽略在上一步中创建的推荐 Heroku CNAME（example.com.herokudns.com）。Cloudflare 的安全和速度功能无法与此记录一起使用。 请使用为您的应用配置的默认 Heroku 域名（通常格式如下：_cf-solutions.herokuapp.com_）。

## 添加子域

首先，登录您的 Cloudflare 帐户，导航到 **DNS** 应用并为您的 Heroku 应用添加 _CNAME_ 条目。

![Screen_Shot_2018-01-23_at_2.58.16_PM.png](/images/support/Screen_Shot_2018-01-23_at_2.58.16_PM.png)

## 添加根域

在 Heroku 中添加根域或顶端域需要使用从根指向的 CNAME 记录。您不能在 Heroku 中使用 A 记录，因为没有已公开的 IP 地址可供 Heroku 用户使用。

不用担心，Cloudflare 提供了 [CNAME flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root) 来解析对根域的请求。您只需为您的根添加 CNAME 记录（例如 kingkong.com），并将其指向相同的服务器名称 (cf-solutions.herokuapp.com)。 

## 确认您的域已通过 Cloudflare 路由

确认 Cloudflare 是否适用于您的域的最简单方法是发出 cURL 命令。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">╰─➤  curl -I www.kingkong.solutionsHTTP/1.1 200 OKDate:Tue, 23 Jan 2018 18:51:30 GMTContent-Type: text/html; charset=UTF-8Connection: keep-aliveSet-Cookie: __cfduid=daeef1c4f83da8dd3ae5745d5e869b78e1516733490; expires=Wed, 23-Jan-19 18:51:30 GMT; path=/; domain=.www.kingkong.solutions; HttpOnlyCache-Control: public, max-age=0Last-Modified:Mon, 31 Dec 1979 04:08:00 GMTX-Powered-By:ExpressServer: cloudflareCF-RAY:3e1cf1d936f28c52-SFO-DOG</span></div></span></span></span></code></pre>{{</raw>}}

您可以通过 _\_\_cfuid_ cookie 或 _CF-Ray_ 响应标头识别 Cloudflare 代理的请求。如果存在这两者中的任何一个，那代表您的请求将由 Cloudflare 代理。

您可对已在 DNS 设置中配置的任何子域重复上述 cURL 命令。

## 为域名设置 SSL

1.  Cloudflare 将为所有付费计划提供 SAN 通配符证书，并为免费版计划提供 SNI 通配符证书。有关 SSL [的完整详细信息，请访问此处](https://www.cloudflare.com/ssl)。
2.  如果您还有任何问题，请到 Cloudflare 仪表板中的 **Crypto** 应用。选择_Flexible（灵活）_模式，以通过 HTTPS 为所有公共访问者提供网站服务：

一旦证书状态更改为 **• 活动证书**，传入流量将通过 HTTPS 提供给您的网站（例如，访问者将在浏览器栏中看到以您的域名前缀为 HTTPS）。 

## 强制所有流量通过 HTTPS

要强制所有流量通过 HTTPS，请使用 Cloudflare 仪表板中的 **Page Rule** 应用：

导航到 Page Rule 应用后，便可以开始添加涵盖整个域的新规则：

![Capto_Capture_2018-01-23_03-17-19_PM.png](/images/support/Capto_Capture_2018-01-23_03-17-19_PM.png)

输入您的 Page Rule（即“http://\*example.com/\*”），然后单击**保存并部署**。

然后，您可以像以前一样使用类似的 cURL 命令来验证是否通过 HTTPS 强制执行所有请求。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">╰─➤  curl -I -L kingkong.solutionsHTTP/1.1 301 Moved PermanentlyDate:Tue, 23 Jan 2018 23:17:44 GMTConnection: keep-aliveCache-Control: max-age=3600Expires:Wed, 24 Jan 2018 00:17:44 GMTLocation: https://kingkong.solutions/Server: cloudflareCF-RAY:3e1e77d5c42b8c52-SFO-DOG</span></div></span></span></span></code></pre>{{</raw>}}

如果 SSL 不适用于您的域（例如，您的 SSL 证书尚未颁发），您将在重定向后看到 HTTP 响应的 [525](https://support.cloudflare.com/hc/en-us/articles/200278659-Error-525-SSL-handshake-failed) 或 [526](https://support.cloudflare.com/hc/en-us/articles/200721975-Error-526-Invalid-SSL-certificate) 错误。

请注意，颁发 Universal SSL 证书有可能需要长达 24 小时。付费版的 SSL 证书通常会在 10-15 分钟内颁发。
