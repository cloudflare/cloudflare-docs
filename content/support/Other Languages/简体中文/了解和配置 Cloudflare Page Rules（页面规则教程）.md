---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-
title: 了解和配置 Cloudflare Page Rules（页面规则教程）
---

# 了解和配置 Cloudflare Page Rules（页面规则教程）

## 了解和配置 Cloudflare Page Rules（页面规则教程）

_每当请求与您定义的某个 URL 模式匹配时，页面规则就会触发特定操作。学习创建和编辑页面规则，并了解可用的不同设置。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-#h_5a7SkOsNo5d5LE7e9IRiz)
-   [开始前须知](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-#h_7rzfw5kI8cqu4VKur6Mnur)
-   [创建页面规则](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-#h_38Gq7mduJiXIjpVLxp3q19)
-   [编辑页面规则](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-#h_2WLkFHGqwlRgnZg3i0fl9I)
-   [了解通配符匹配和引用](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-#h_6N5SySNYCjYUUnCKnC1Ea6)
-   [页面规则设置摘要](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-#h_18YTlvNlZET4Poljeih3TJ)
-   [已知问题](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-#h_5lzcszkjqrZ2bZpZOtMQoP)
-   [其他详情](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-#h_2VORFoOUImLy7rpTgEWYLM)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-#h_7hlLS0cORjDJ2NCQqZTp8X)

___

## 概述

您可以定义页面规则，在匹配某个 URL 模式时触发一个或多个操作。页面规则位于 **Rules** 应用的**页面规则**选项卡中。

允许的页面规则默认数量取决于域的计划，如下表所示。

| **计划** | **允许的页面规则** |
| -------- | ------------------ |
| 免费     | 3                  |
| Pro      | 20                 |
| Business | 50                 |
| 企业     | 125                |

对于 Free、Pro 和 Business 计划中的域名，您可以[购买额外的规则](https://www.cloudflare.com/features-page-rules/) （最多 100 条）。

___

## 开始前须知

务必要了解两种基本的页面规则行为：

-   只有优先级最高的匹配页面规则才会对请求起作用。
-   页面规则在 Cloudflare 仪表板中以降序方式排列，优先级最高的规则排在最前面。

页面规则根据以下格式（由五个段组成）来与 URL 模式匹配：<scheme>://<hostname><:port>/<path>?<query\_string>

如下为含有这四个段的 URL 示例：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.example.com:443/image.png?parameter1=value1</span></div></span></span></span></code></pre>{{</raw>}}

 _scheme_ 和 _port_ 片段是可选的。如果省略，则 _scheme_ 将与 _http://_ 和 _https://_ 协议匹配。如果未指定 _port_，则规则将匹配所有端口。

最后，您可以随时禁用页面规则。规则禁用之后不会触发操作，但仍会显示在 **Rules** 应用的**页面规则**选项卡中，并可编辑，也计入您的域所允许的规则数量。_保存为草稿_选项可以创建默认禁用的页面规则。

___

## 创建页面规则

创建页面规则的步骤如下：

1.  登录 Cloudflare 仪表板。
2.  选择您要添加页面规则的域。
3.  单击 **Rules** 应用。
4.  在**页面规则**选项卡下，单击**创建页面规则**。这时会开_为 <您的域> 创建页面规则_对话框。
5.  在**如果 URL 匹配**下，输入应该与规则匹配的 URL 或 URL 模式。[_了解有关通配符匹配的更多信息_](https://support.cloudflare.com/hc/zh-cn/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_6N5SySNYCjYUUnCKnC1Ea6)
6.  接下来，在**则设置为：**下，单击 **+ 添加设置**，再从下拉列表中选择所需的设置。每条规则可以包含多项设置。[下方摘要](https://support.cloudflare.com/hc/zh-cn/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ)中提供了有关设置的更多信息。
7.  在**顺序**下拉列表中，指定所需的顺序：_最前、最后_或_自定义_。
8.  若要保存，请单击以下选项之一：
    -   **保存为草稿**，保存规则并使其保持禁用状态。
    -   **保存并部署**，保存规则并立即启用它。

___

## 编辑页面规则

要修改现有的规则，请执行以下操作：

1.  登录 Cloudflare 仪表板。
2.  选择您要编辑页面规则的域。
3.  单击 **Rules** 应用。
4.  在**页面规则**选项卡下，找到您要编辑的规则。
5.  继续进行必要的更改，如下所示：
    -   要启用或禁用某一规则，请单击**开/关**按钮。
    -   要修改 URL 模式、设置和顺序，请单击**编辑**按钮（扳手图标）。在对话框中，输入您想要更改的信息。
    -   要删除规则，请单击**删除**按钮（x 图标），然后在**确认**对话框中单击**确定**来确认。

___

## 了解通配符匹配和引用

您可以在任何 URL 片段中使用星号（\*）来匹配特定模式。例如，


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/t*st</span></div></span></span></span></code></pre>{{</raw>}}

将匹配：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/test</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/toast</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/trust</span></div></span></span></span></code></pre>{{</raw>}}

_example.com/foo/\*_ 不与 example.com/foo 匹配，但 _example.com/foo\*_ 是匹配的。

### 有用提示

-   要同时匹配 _http_ 和 _https_，只需写入 _example.com_ 即可。无需写入 _\*example.com_。
-   要匹配一个域上的每个页面，可以写 _example.com/\*_。只写 _example.com_ 是不行的。
-   要匹配一个域及其子域上的每个页面，可以写 _example.com/\*_。只写 _example.com_ 是不行的。
-   即使不存在字符，页面规则 URL 中的通配符 (\*) 也会匹配，并且可能包含该 URL 的任何部分，包括查询字符串。

### 引用通配符匹配

您可以使用 _$X_ 语法，引用稍后匹配的通配符。_X_ 表示 glob 模式的索引。$1 代表第一个通配符匹配，$2 代表第二个通配符匹配，依此类推。

在_转发 URL_ 设置中，这特别有用。示例：

您可以转发：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://*.example.com/*</span></div></span></span></span></code></pre>{{</raw>}}

到：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/$1/$2.jpg</span></div></span></span></span></code></pre>{{</raw>}}

此规则将匹配：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://cloud.example.com/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

这最后将转发到：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/cloud/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

要在转发 URL 中使用字面上的 _$_ 字符，请前面添加反斜杠（\\）来进行转义： _\\$_

___

## 页面规则设置摘要

设置控制了请求与页面规则中定义的 URL 模式匹配时 Cloudflare 会采取的操作。您可以使用设置来跨仪表板应用启用和禁用多个 Cloudflare 功能。请注意：

-   某些设置需要 Pro、Business 或 Enterprise 域计划。
-   您可以指定在规则触发时应用多项设置。

下方列出了可用设置的完整列表，按照它们在 **Cloudflare Page Rules** UI 中出现的顺序显示。

| 
**设置**

 | 

**描述**

 | 

**计划**

 |     |
 | --- ||  |
 |     |

始终使用 HTTPS

 | 

打开或关闭 **Cloudflare SSL/TLS** 应用中**边缘证书**选项卡的**[始终使用 HTTPS](/ssl/edge-certificates/additional-options/always-use-https)** 功能。启用后，任何 _http://_ URL 都会通过 301 重定向转换为 _https://_。

如果此选项没有出现，这表示您没有生效的**边缘证书**。

 | 

-   所有

 |
| 

自动缩小

 | 

指出哪些文件扩展名要自动缩小。[了解更多](https://support.cloudflare.com/hc/articles/200168196)。

 | 

-   所有

 |
| 

Automatic HTTPS Rewrites

 | 

打开或关闭 **Cloudflare SSL/TLS** 应用中**边缘证书**选项卡的 **Cloudflare 自动 HTTPS 重写**功能。[了解更多](/ssl/edge-certificates/additional-options/automatic-https-rewrites)。

 | 

-   所有

 |
| 

浏览器缓存 TTL

 | 

控制客户端浏览器缓存的资源在多久时间内保持有效。对于非 Enterprise 域，Cloudflare UI 和 API 都会禁止将**浏览器缓存 TTL** 设置为 _0_。[了解更多](/cache/how-to/edge-browser-cache-ttl/)。

 | 

-   所有

 |
| 

浏览器完整性检查

 | 

检查访问者的浏览器中通常与垃圾邮件发送者和某些机器人相关的标头。[了解更多](https://support.cloudflare.com/hc/articles/200170086)。

 | 

-   所有

 |
| 

绕过 Cookie 上的缓存

 | 

如果正则表达式与请求中出现的 Cookie 名称匹配，则绕过缓存并从源服务器提取资源。

如果您将这个设置和 _Cache On Cookie_ 设置都添加到同一 Page Rule 中，则 _Cache On Cookie_ 的优先级将高于 _Bypass Cache on Cookie_。

_参见下文中的其他详细信息，以了解支持的少量正则表达式。_

 | 

-   Business
-   企业

 |
| 

按设备类型缓存

 | 

根据访问者的设备类型，分隔缓存的内容。[了解更多](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only)。

 | 

-   企业

 |
| 

Web 缓存欺骗防护

 | 

防止 Web 缓存欺骗攻击，同时仍然允许缓存静态资产。此设置会验证 URL 的扩展部分是否匹配返回的 _Content-Type_。[了解更多](/cache/cache-security/cache-deception-armor/)。

 | 

-   所有

 |
| 

缓存键

 | 

也称为_自定义缓存键_。

专门用于控制在决定要缓存哪些资源时要包括的变量。这允许客户基于除了 URL 之外的其他内容来确定缓存内容。[了解更多](/cache/how-to/cache-keys/)。

 | 

-   企业

 |
| 

缓存级别

 | 

根据所选的选项应用自定义缓存：

**绕过** \- Cloudflare 不进行缓存。

**无查询字符串** - 只有在无查询字符串时才从缓存中提供资源。

**忽略查询字符串** \- 即使是不同的查询字符串，依旧向每个人提供相同资源。

**标准 -** 缓存具有查询字符串的所有静态内容。

**全部缓存** \-  将所有内容视为静态内容，并缓存 [Cloudflare 默认缓存内容](/cache/concepts/default-cache-behavior#default-cached-file-extensions)之外的所有内容类型。尊重来自源 Web 服务器的缓存标头，除非页面规则中也设置了**边缘缓存 TTL**。与**边缘缓存 TTL** > _0_ 组合使用时，**全部缓存**会移除来自源 Web 服务器响应的 Cookie。  


 | 

-   所有

 |
| 

Cookie 上的缓存

 | 

根据匹配 Cookie 名称的政策表达式，应用_全部缓存_选项（_缓存级别_设置）。

如果您同时这个设置和_绕过 Cookie 上的缓存_ 设置添加到同一页面规则中，则 _Cookie 上的缓存_的优先级将高于_绕过 Cookie 上的缓存_。

 | 

-   Business
-   企业

 |
| 

缓存 TTL（按状态代码）

 | 

企业客户可以根据源站 Web 服务器的响应状态来设置缓存生存时间（TTL）。缓存 TTL 指的是资源在 Cloudflare 网络中的持续时间（在被标记为过时或从缓存中丢弃之前）。状态代码是由资源的源站返回的。   如果根据响应状态设置缓存 TTL，会覆盖静态文件的默认缓存行为（标准缓存），并覆盖源站 Web 服务器发送的缓存指令。要缓存非静态资产，请使用 Page Rule 将缓存级别设置为“全部缓存”。如果设置无存储 Cache-Control 或低 TTL（使用max-age/s-maxage），会增加对源站 Web 服务器的请求并降低性能。[了解更多](https://support.cloudflare.com/hc/zh-cn/articles/360043842472-Configuring-cache-TTL-by-status-code)。

 | 

-   企业

 |
| 

禁用应用程序

 | 

关闭所有生效的 **Cloudflare 应用**。

 | 

-   所有

 |
| 

禁用性能：

 | 

关闭：

-   [自动缩小](https://support.cloudflare.com/hc/articles/200168196)
-   [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056)
-   [Mirage](https://support.cloudflare.com/hc/articles/200403554)
-   [Polish](https://support.cloudflare.com/hc/articles/360000607372)

 | 

-   所有

 |
| 

禁用 Railgun

 | 

关闭 **Cloudflare Speed** 应用的 **Railgun** 功能。

 | 

-   Business
-   企业

 |
| 

禁用安全性

 | 

关闭：

-   [电子邮件混淆](https://support.cloudflare.com/hc/articles/200170016)
-   [速率限制（旧版）](https://support.cloudflare.com/hc/articles/115001635128)
-   [Scrape Shield](https://support.cloudflare.com/hc/articles/200171036)
-   [服务器端排除](https://support.cloudflare.com/hc/articles/200170036)
-   [URL（区域）锁定](/waf/tools/zone-lockdown/)
-   [WAF 托管规则（旧版）](https://support.cloudflare.com/hc/articles/200172016)

 | 

-   所有

 |
| 

边缘缓存 TTL

 | 

指定资源在 Cloudflare 边缘网络中缓存多久时间。_边缘缓存 TTL_ 不显示在响应标头中。_边缘缓存 TTL_ 最小值取决于计划类型：

Free - 2 小时  
Pro - 1 小时  
Business - 1 秒钟  
Enterprise - 1 秒钟

 | 

-   所有

 |
| 

电子邮件混淆

 | 

打开或关闭 **Cloudflare Scrape Shield** 应用的 **Cloudflare 电子邮件混淆**功能。[了解更多](https://support.cloudflare.com/hc/articles/200170016)。

 | 

-   所有

 |
| 

转发 URL

 | 

使用 _HTTP 301/302 重定向_将一个 URL 重定向到另一个 URL。_参见上文中的[了解通配符匹配和引用](https://support.cloudflare.com/hc/articles/218411427#h_6N5SySNYCjYUUnCKnC1Ea6)。_

 | 

-   所有

 |
| 

主机标头覆盖

 | 

应用特定的主机标头。[了解更多](https://support.cloudflare.com/hc/articles/206652947)。

 | 

-   企业

 |
| 

IP 地理位置标头

 | 

Cloudflare 会添加 _CF-IPCountry_ HTTP 标头，其包含与访问者对应的国家/地区代码。

 | 

-   所有

 |
| 

Mirage

 | 

打开或关闭 **Cloudflare Speed** 应用的 **Cloudflare Mirage** 功能。[了解更多](https://support.cloudflare.com/hc/articles/200403554)。

 | 

-   Pro
-   Business
-   企业

 |
| 

随机加密

 | 

打开或关闭 **Cloudflare SSL/TLS** 应用中**边缘证书**选项卡的 **Cloudflare 随机加密**功能。[了解更多](/ssl/edge-certificates/additional-options/opportunistic-encryption)。

 | 

-   所有

 |
| 源缓存控制 | Free、Pro 和 Business 域默认启用[源站缓存控制](/cache/concepts/cache-control/)，Enterprise 域则默认禁用此设置。 | 

-   所有

 |
| 

源错误页面通过

 | 

打开或关闭从发送自源服务器的问题生成的 Cloudflare 错误页面。如果启用，此设置将触发由源服务器发出的错误页面。

 | 

-   企业

 |
| 

Polish

 | 

应用来自 **Cloudflare Speed** 应用的 **Polish** 功能的选项。[了解更多](/images/polish)。

 | 

-   Pro
-   Business
-   企业

 |
| 

查询字符串排序

 | 

打开或关闭对查询字符串重新排序。当查询字符串具有相同的结构时，缓存功能会改善。[了解更多](https://support.cloudflare.com/hc/articles/206776797)。

 | 

-   企业

 |
| 

解析覆盖

 | 

将源地址更改为此设置中指定的值。[了解更多](https://support.cloudflare.com/hc/articles/206190798)。

 | 

-   企业

 |
| 

尊重强 ETag

 | 

打开或关闭 Cloudflare 缓存和源服务器之间的逐字节等效性检查。[了解更多](https://support.cloudflare.com/hc/articles/218505467)。

 | 

-   企业

 |
| 

响应缓冲

 | 

打开或关闭 Cloudflare 是否应先等待源服务器发来整个文件后再转发给站点访问者。默认情况下，Cloudflare 在数据包从源服务器到达时将其发送到客户端。

 | 

-   企业

 |
| 

Rocket Loader

 | 

打开或关闭 Cloudflare **Speed** 应用中的 **Cloudflare Rocket Loader** 功能**。**[了解更多](https://support.cloudflare.com/hc/articles/200168056)。

 | 

-   所有

 |
| 

安全级别

 | 

控制**安全性**应用的**安全性级别**功能的各个选项。[了解更多](https://support.cloudflare.com/hc/articles/200170056)。

 | 

-   所有

 |
| 

服务器端排除

 | 

打开或关闭 **Cloudflare Scrape Shield** 应用的**服务器端排除**功能。[了解更多](https://support.cloudflare.com/hc/articles/200170036)。

 | 

-   所有

 |
| 

SSL

 | 

控制 **Cloudflare SSL/TLS** 应用中**边缘证书**选项卡的 **SSL** 功能的各个选项。[了解更多](/ssl/origin-configuration/ssl-modes)。

 | 

-   所有

 |
| 

真实客户端 IP 标头

 | 

打开或关闭 **Cloudflare Caching** 应用的 **True-Client-IP 标头**功能。[了解更多](https://support.cloudflare.com/hc/articles/206776727)。

 | 

-   企业

 |
| 

Web 应用程序防火墙（旧版）

 | 

打开或关闭 **WAF 托管规则**（在**安全性** > **WAF** > **托管规则**中定义）。[了解更多](https://support.cloudflare.com/hc/articles/200172016)。

无法通过页面规则启用或禁用各个 WAF 托管规则。

 | 

-   Pro
-   Business
-   企业

 |

___

## 已知问题

**导致“****_错误 500（内部服务器错误）_****”**的 Page Rule 配置问题

**根本原因**：这可能是由于 Page Rule 的配置问题造成的。在创建使用两个通配符的 Page Rule（例如_转发 URL_ 规则）时，可以创建一个用 $2 占位符提及第二个通配符的规则。请参阅下面的示例：

![“示例页面规则”配置（带有两个通配符）。转发 URL 包含一个 $2 的占位符，它将被替换为第二个 ](/images/support/page-rule-create.png)

在更新同一规则时，您可以删除**如果 URL 匹配**字段中的其中一个通配符，然后保存。请参阅下面的示例：

![“不正确的页面规则”配置（带有一个通配符）所匹配的内容，但仍然使用转发 URL 中的 $2 占位符。此配置会导致 ](/images/support/page-rule-update.png)

如果您这样做，$2 占位符就会引用一个不再存在的通配符，因此，当一个 URL 触发 Page Rule 时，就会引发_错误 500（内部服务器错误）_。

**解决方案**：更新 Page Rule 并删除对第二个通配符引用的 _$2_。如果只有一个通配符，则只能使用 _$1_。

___

## 其他详情

### “绕过 Cookie 上的缓存”设置

此设置面向 Business 和 Enterprise 客户。

**绕过 Cookie 上的缓存**设置支持基本的正则表达式（regex），如下所示：

-   管道运算符（用 | 表示）可利用 _OR_ 布尔值逻辑匹配多个 Cookie。例如，bypass=.\*_|PHPSESSID=.\*_ 会在 Cookie 调用了绕过操作或设置了 PHPSESSID 时绕过缓存，不论 Cookie 的值是什么。
-   使用通配符运算符（以 \* 表示）时，“t.\*st=”这样的规则值将同时匹配名为 test 的 Cookie 和名为 teeest 的 Cookie。

限制如下：

-   每个 Cookie 正则表达式 150 个字符
-   每个 Cookie 正则表达式 12 个通配符
-   Cookie 正则表达式中每个 | 之间 1 个通配符

要了解如何针对不同平台陪住**绕过 Cookie 上的缓存**，请参阅以下文章：

-   [使用 WordPress 或 WooCommerce 缓存匿名页面访问量](https://support.cloudflare.com/hc/articles/236166048)
-   [使用 Magento 1 和 Magento 2 缓存匿名页面访问量](https://support.cloudflare.com/hc/articles/236168808)
-   [如何缓存静态 HTML？](https://support.cloudflare.com/hc/articles/202775670)

**注意：**如果您同时将此设置与仅限 Enterprise 的 _Cookie 上的缓存_设置一同添加到同一页面规则，则 _Cookie 上的缓存_的优先级将高于_绕过 Cookie 上的缓存_。

### 区域名称出现时必须以斜杠结尾

保存页面规则时，Cloudflare 将确保**如果 URL 匹配**字段中的当前区域名称每次出现时，后面都有一个斜杠。例如，如果当前区域名称是 `example.com`，则：

-   `example.com` 将保存为 `example.com/`
-   `example.com/path/example.com` 将保存为 `example.com/path/example.com/`

请注意，`example.com/some-path/cloudflare.com` 保存时将_不带_ 最终斜杠，因为区域名称不是 `cloudflare.com`。

### Page Rules 支持的网络端口

如果您在 Page Rule 的**如果 URL 匹配**字段中指定一个端口，则它必须是下列端口之一：

-   [与 Cloudflare 的代理兼容的](/fundamentals/get-started/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy) HTTP/HTTPS 端口之一。
-   [Cloudflare Spectrum](/spectrum/) HTTPS 应用程序的自定义端口。

### 将页面规则用于 Workers

如果当前请求的 URL 同时匹配页面规则和 [Workers 自定义路由](/workers/platform/routes)，则将不会应用某些页面规则设置。关于将页面规则用于 Workers 的详情，请参阅开发人员文档中的 [Workers：页面规则](/workers/configuration/workers-with-page-rules/)。

___

## 相关资源

-   [要考虑的建议页面规则](https://support.cloudflare.com/hc/articles/224509547)
-   [哪些子域适用于橙色云/灰色云？](https://support.cloudflare.com/hc/zh-cn/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-)
-   [如何缓存对 Cloudflare 使用“全部缓存”？](https://support.cloudflare.com/hc/articles/202775670)
-   [如何缓存静态 HTML？](https://support.cloudflare.com/hc/articles/200172256)
-   [更新或访问我的内容管理系统的管理部分时显示脱机错误消息](https://support.cloudflare.com/hc/articles/200169526)
