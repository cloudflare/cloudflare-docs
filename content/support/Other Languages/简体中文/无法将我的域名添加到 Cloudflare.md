---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/205359838-%E6%97%A0%E6%B3%95%E5%B0%86%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare-
title: 无法将我的域名添加到 Cloudflare...
---

# 无法将我的域名添加到 Cloudflare...

## 无法将我的域名添加到 Cloudflare...

_本文提供了排除在将域添加到 Cloudflare 时发生的错误的步骤。_

### 本文内容

-   [第 1 步 - 禁用 DNSSEC](https://support.cloudflare.com/hc/zh-cn/articles/205359838-%E6%97%A0%E6%B3%95%E5%B0%86%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare-#h_94453043811540417238269)
-   [第 2 步 - 注册域名](https://support.cloudflare.com/hc/zh-cn/articles/205359838-%E6%97%A0%E6%B3%95%E5%B0%86%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare-#h_25187255171540417266656)
-   [第 3 步 - 解析根域的 DNS](https://support.cloudflare.com/hc/zh-cn/articles/205359838-%E6%97%A0%E6%B3%95%E5%B0%86%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare-#h_703638145121540417281357)
-   [第 4 步 - 验证域名是否在 Cloudflare 已禁止](https://support.cloudflare.com/hc/zh-cn/articles/205359838-%E6%97%A0%E6%B3%95%E5%B0%86%E6%88%91%E7%9A%84%E5%9F%9F%E5%90%8D%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare-#h_874829316161540417303369)

___

## 第 1 步 - 禁用 DNSSEC

在您的域名注册商处启用 **DNSSEC** 时，Cloudflare 无法为域提供权威 DNS 解析。域在 Cloudflare 中处于_活动_状态后，您可以重新启用 **DNSSEC**，但必须使用 [Cloudflare 的](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS) [DNSSEC](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS) [要求](https://support.cloudflare.com/hc/en-us/articles/360006660072-Understanding-and-Configuring-DNSSEC-in-Cloudflare-DNS)配置 **DNSSEC**。

在注册商处启用 **DNSSEC** 的可能症状包括：

-   切换到 Cloudflare 的域名服务器后，DNS 无法解析。
-   DNS 查询响应状态为 _SERVFAIL_。
-   域在 Cloudflare Overview 应用中保持_待处理_状态。

如果您需要协助禁用 **DNSSEC**，请与您的域名提供商联系。如果域中存在 _DS 记录_，则可能启用 **DNSSEC**。_DS 记录_可以通过第三方在线工具（例如 [https://mxtoolbox.com/ds.aspx](https://mxtoolbox.com/ds.aspx)）或通过命令行终端进行检查：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ds cloudflare.com2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

___

## 第 2 步 - 注册域名

有多个域名注册问题会阻止将域添加到 Cloudflare：

-   域使用尚未在[公共前缀列表](https://publicsuffix.org/list/)上的新 TLD（顶级域）
-   您可能会看到类似于以下内容的错误：

_我们无法将 bad.psl-example 识别为注册域名。请确保您提供的是根域而不是任何子域（例如，example.com，而不是 subdomain.example.com）（代码：1099）_

-   域尚未完全注册或注册数据未列出域名服务器

-   请与您的域名注册商联系，以更新注册中的域名服务器

以下是通过 **\+ 添加站点**添加注册不正确的域时 Cloudflare 仪表板中可能出现的一些错误：

-   _exampledomain.com 不是注册域名（代码：1049）_
-   _目前无法查找 exampledomain.com 的注册商和托管信息。请联系 Cloudflare 支持部门或稍后再试。（代码：1110）_

___

## 第 3 步 - 解析根域的 DNS

在将域添加到 Cloudflare 之前，域必须为有效的工作域名服务器返回 _NS 记录_。_NS 记录_可以通过第三方在线工具（例如 [https://www.whatsmydns.net/#NS/](https://www.whatsmydns.net/%23NS/)）或使用 dig 命令通过命令行终端进行检查：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short ns cloudflare.comns3.cloudflare.com. ns4.cloudflare.com. ns5.cloudflare.com. ns6.cloudflare.com. ns7.cloudflare.com.</span></div></span></span></span></code></pre>{{</raw>}}

此外，域在查询时必须返回有效的 _SOA 记录_。_SOA 记录_可以通过第三方在线工具（例如 [https://www.whatsmydns.net/#SOA/](https://www.whatsmydns.net/%23SOA/)）或通过命令行终端进行检查：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +short soa cloudflare.comns3.cloudflare.com. dns.cloudflare.com.2029202248 10000 2400 604800 300</span></div></span></span></span></code></pre>{{</raw>}}

___

Cloudflare 禁止永久或临时添加某些域名。  请参阅以下说明以删除这两种类型的禁令。

### 取消临时禁令

当 Cloudflare 观察到太多次尝试将域添加到 Cloudflare 时，会返回错误：

_Cloudflare 请求错误：\[1105\] 此区域已临时禁用，目前无法添加到 Cloudflare，请联系 Cloudflare 支持部门。_

在联系 Cloudflare 支持部门之前，请等待 3 个小时再尝试将域重新添加到 Cloudflare。

###   
清除永久禁令

如果在添加域时发现以下任何错误，请向 Cloudflare 支持部门提交请求：

-   _错误：此区域已禁用，目前无法添加到 Cloudflare，请联系 Cloudflare 支持部门。（代码：1097）_
-   _此区域目前无法添加到 Cloudflare，请联系 Cloudflare 支持部门。（代码：1093）_
