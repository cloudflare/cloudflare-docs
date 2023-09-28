---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting
title: 配置 Cloudflare Rate Limiting
---

# 配置 Cloudflare Rate Limiting

_配置 Cloudflare Rate Limiting，以防止拒绝服务攻击、暴力登录以及其他滥用行为。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#4TBnjI1OqjroF6MLXB3Wmr)
-   [分析](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#7Cy9dajZBWM5pm9aIP5mMD)
-   [各计划的速率限制额度](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#4gd3s4xzV2xOE4CUbRIEAo)
-   [速率限制规则的组成部分](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#4uDonp8FX9ARo4nzdBvXiY)
-   [识别速率限制阈值](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#o8KwUgkUml3Y7bAapvXjP)
-   [任务 1：配置基本速率限制规则](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#3UWQC5PrVScHgEGRMobRMm)
-   [任务 2：配置高级条件（仅 Business 和 Enterprise 计划）](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#5iIwkkHwcJbNRynWjrDIGb)
-   [任务 3：配置高级响应（仅 Business 和 Enterprise 计划）](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#7uCtK6GPAfWDNlSHch7KBs)
-   [任务 4：配置绕过选项（仅 Enterprise 计划）](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#3rCyCwZTjnPl3brIt7Ytrg)
-   [规则执行顺序](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#rule-execution-order)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/115001635128-%E9%85%8D%E7%BD%AE-Cloudflare-Rate-Limiting#516XYZwx0Mdhh7hLMg60iT)

___

## 概述

Cloudflare **Rate Limiting** 可自动识别针对特定 URL 或整个域的过高请求速率并加以缓解。请求速率是针对单个 Cloudflare 数据中心局部计算的。**Rate Limiting** 最常见的用途是 [DDoS](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/) 保护、[暴力攻击](https://www.cloudflare.com/learning/bots/brute-force-attack/)保护，以及限制对论坛搜索、API 调用或涉及源服务器上数据库密集型操作的资源的访问。

一旦有个别 IPv4 地址或 IPv6 / 64 IP 范围超出规则阈值，就会通过 HTTP 429 响应阻止对源 Web 服务器的后续请求，该响应包括一个 **Retry-After** 标头，用来指示客户端何时可以恢复发送请求。

___

## 分析

在 **分析** > **安全性**下，查看速率限制分析。限速率限制分析使用实线来表示与模拟请求匹配的流量，并用虚线来描述实际被阻止的请求。只有 Enterprise 客户才能通过 [Cloudflare Logs](/logs/) 查看由速率限制规则生成的日志。

对于阻止的请求，Cloudflare 会返回 HTTP 429 错误。有关每个位置已阻止请求的详细信息，Enterprise 客户可在分析仪表板（**Analytics** > **流量**）中的**状态代码**下查看。

___

## 各计划的速率限制额度

允许的速率限制规则数量取决于域的计划：

| 计划 | 规则数 | 操作 | 操作持续时间 | 请求期间 |
| --- | --- | --- | --- | --- |
| 免费 | 1 | 阻止 | 1 分钟或 1 小时 | 10 秒钟或 1 分钟 |
| Pro | 10 | 阻止、旧版 CAPTCHA、JS 质询、托管质询或记录 | 1 分钟或 1 小时 | 10 秒钟或 1 分钟 |
| Business | 15 | 阻止、旧版 CAPTCHA、JS 质询、托管质询或记录 | 1 分钟、1 小时或 24 小时 | 10 秒钟、1 分钟或 10 分钟 |
| 企业 | 100 | 阻止、旧版 CAPTCHA、JS 质询、托管质询或记录 | 可以输入 10 秒到 86400 秒（24 小时）范围内的任何时间长度 | 可以输入 10 秒到 3600 秒（1 小时）范围内的任何值。 |

Cloudflare Rate Limiting 支持多种级别的配置控制，具体取决于域的 Cloudflare 计划。下表列出了您可以根据自己的计划执行的操作：

| 
＃

 | 

任务

 | 

适用于

 |
| --- | --- | --- |
| 

1

 | 

配置基本速率限制规则

 | 

所有计划

 |
| 

2

 | 

配置高级条件

 | 

Business 和 Enterprise 计划

 |
| 

3

 | 

配置高级响应

 | 

Business 和 Enterprise 计划

 |
| 

4

 | 

配置绕过选项

 | 

优势和特点

 |

___

## 速率限制规则的组成部分

速率限制规则包含三个不同的组成部分。单击下面的组件可展详细信息：

传入请求基于以下几项进行匹配：

#### **请求路径**

示例：

-   http://example.com/example
-   http://example.com/example/\*

请求路径不区分大小写。模式无法匹配查询字符串（_？_）或锚点（_＃_）后的内容。星号（_\*_）会匹配任何字符序列，包括空序列。示例：

-   \*.example.com/\*匹配 example.com 的任何子域上的任何路径
-   \*example.com/example.html 匹配 example.com 上的 example.html 或 example.com 的任何子域
-   \* 匹配您站点上的任何页面

对 _example.com/path_ 的请求与 _example.com/path/_ 的并不相同。此规则的唯一例外是主页，_example.com_ 匹配 _example.com/_。

#### **请求方案**

_HTTP_ 或 _HTTPS_。如果未指定，则两者都匹配，规则将列出 _\_ALL\__。

#### **请求方法**

_POST_ 或 _GET_。如果未指定，则所有方法都匹配，规则将列出 _\_ALL\__。

#### **（可选）源响应代码**

例如，只有 HTTP 401 或 403 是从源 Web 服务器返回的，才会匹配**速率限制**规则。触发的规则如果匹配响应代码条件，将阻止来自该客户端的后续请求，且无论源响应代码是什么。

规则可以匹配来自同一客户端的所有请求的数量和时间段：

#### **请求数量**

最少指定两个请求。若要阻止单个请求，使路径不可用便可；例如，通过将源 Web 服务器配置为返回 403。

#### **请求期间**

一旦客户的请求在指定的持续时间内超过阈值，就会触发规则。

 

规则缓解包括：

#### **缓解操作**

速率限制操作取决于域的计划，如上方**各计划的速率限制额度**所述：

-   **阻止** **\-** 超过阈值时，Cloudflare 发出 HTTP 429 错误。
-   **旧版 CAPTCHA** **\-** 访问者必须通过 CAPTCHA 质询。如果通过，则 Cloudflare 允许该请求。
-   **JS 质询** **\-** 访问者必须通过 Cloudflare JavaScript 质询。如果通过，则 Cloudflare 允许该请求。
-   **记录 -** 请求记录到 [Cloudflare Logs](https://support.cloudflare.com/hc/articles/216672448) 中。这有助于在应用至生产环境前测试规则。

#### **禁令期限**

如果超时设置为短于阈值，会导致 API 自动将超时增加到等于阈值。

如果没有指定[自定义错误页面](https://support.cloudflare.com/hc/articles/200172706)，**Rate Limiting** 访问者会收到默认的 HTML 页面。此外，Business 和 Enterprise 客户还可在规则本身中指定响应，具体参见下方的_任务 3：配置高级响应_。

___

## 识别速率限制阈值

要确定 Cloudflare **Rate Limiting** 的一般阈值，可将 24 小时未缓存网站请求数除以同一 24 小时期间的唯一访问者数。然后，除以一次访问的估计平均分钟数。最后，再乘以 4（或更大），以确定您的网站大致的每分钟阈值。值大于 4 没有关系，因为大多数攻击比典型的流量速率高出一个数量级。

要确定特定 URL 的 URL 速率限制，请使用针对该 URL 的 24 小时未缓存请求数和唯一访问者数。根据用户报告和您自己的监控来调整阈值。

___

## 任务 1：配置基本速率限制规则

单击可展开有关创建两种常见 Cloudflare **Rate Limiting** 规则的详细信息。

**Rate Limiting** 提供一个称为**保护您的登录**的一键式工具，它可以创建一条规则，在 5 分钟内发送超过 5 个 POST 请求时将客户端阻止 15 分钟。这足以阻止大多数的暴力登录。

1.  登录您的 Cloudflare 帐户。
2.  选择要保护的域。
3.  前往**安全性 > WAF > 速率限制规则**。
4.  在**速率限制**下，单击**保护您的登录**。
5.  在显示的**保护您的登录**对话框中，输入**规则名称**和**输入您的登录 URL**。
6.  单击**保存**。
7.  **规则名称将**显示在您的**速率限制**规则列表中。

1\. 登录 Cloudflare 仪表板。

2\. 选择适当的域。

3\. 转至**安全性** > **WAF** > **速率限制规则**。

4\. 单击**创建速率限制规则**。这会打开一个对话框，供您输入新规则的详细信息。

![创建速率限制规则弹出对话框，其中包含了规则配置示例。如果某些 IP 地址在一小时内每分钟发送超过 150 个请求，该规则将阻止来自这些 IP 地址的请求。](/images/support/previous-rate-limiting-create-rule.png)

5\. 输入一个描述性强的**规则名称**。

6\. 对于**如果流量匹配 URL**，从下拉列表中选择一种 HTTP 方案以及一个 URL。

7\. 在**来自相同 IP 地址超过**中，输入一个大于 1 的整数，以代表一个采样周期中的请求数。

8\. 对于**每一类请求**，选择采样区间（计算请求数量的期间）。Enterprise 计划中的域可以手动输入 10 秒到 3600 秒（1 小时）范围内的任意时长。

9\. 对于**则**下拉菜单，选择一个您的计划可用的操作。请参阅上方_速率限制规则组成部分_的_规则缓解_小节。

10.如果您选择了_阻止_或_记录_，那么在**匹配来自该访问者的流量**中，请选择一旦触发了阈值时要应用该选项多久时间。Enterprise 计划中的域可以手动输入 10 秒到 86400 秒（24 小时）范围内的任意值。

11\. 要激活您的新规则，请单击**保存并部署**。

新规则将显示在速率限制规则列表中。

通常，在设置较低的阈值时：

1.  保留现有的规则，并添加一条使用这个较低阈值的新规则。
2.  新规则部署到位后，等待旧规则的操作持续时间过去，然后再删除旧规则。

设置较高的阈值时（可能会阻止合法客户端），请提高现有规的阈值。

___

## 任务 2：配置高级条件（仅 Business 和 Enterprise 计划）

**高级条件**选项配置哪些 HTTP方法、标头响应和源站响应代码与您的速率限制匹配。

要为新规则或现有规则配置高级条件，请执行以下步骤：

1\. 展开**高级条件**。

![为速率限制规则配置“高级条件”时可用的字段。](/images/support/previous-rate-limiting-advanced-criteria.png)

2\. 从**方法**下列菜单中选择一个值。默认值是 _ANY_，其匹配所有 HTTP 方法。

3\. 按照 **HTTP 响应标头**筛选。点击**添加标头响应字段**，以包含您的源 Web 服务器返回的标头。

默认情况下会显示 **CF-Cache-Status** 标头，以便 Cloudflare 提供缓存的资源，而不是限制这些资源的速率。要想同时对缓存资源进行速率限制，请删除此标头，具体方法是点击 **X** 按钮，或启用**也对缓存资产应用速率限制**。

如果 **HTTP 响应标头**下有多个标头，则会应用 _AND_ 布尔值逻辑。要排除标头，请使用_不等于_选项。各个标头都不区分大小写。

4\. 在**源站响应代码**下，输入要匹配的各个 HTTP 响应代码的数值。用逗号分隔两个或多个 HTTP 代码（例如：`401, 403`）。

5.（可选）根据您的计划，配置额外的速率限制功能。

6\. 点击**保存并部署**。

___

## 任务 3：配置高级响应（仅 Business 和 Enterprise 计划）

**高级响应**选项可用来配置 Cloudflare 在超过规则阈值时返回的信息格式。如果您希望返回静态纯文本或 JSON 内容，请使用**高级响应**。

要配置纯文本或 JSON 响应：

1\. 展开**高级响应**。

![为速率限制规则配置“高级响应”时可用的字段。](/images/support/previous-rate-limiting-advanced-response.png)

2\. 选择除默认值以外的**响应类型**格式：_自定义 JSON_ 或_自定义 TEXT_。

3\. 输入您希望返回的纯文本或 JSON 响应。最大响应大小为 32 kB。

4.（可选）根据您的计划，配置额外的速率限制功能。

5\. 点击**保存并部署**。

### 使用自定义 HTML 页面或重定向

如果您希望显示一个自定义的 HTML 页面，请在仪表板中为 HTTP 429 错误（“请求次数过多”）配置一个自定义页面。当您在**响应类型**中选择“默认 Cloudflare 速率限制页面”（该字段的默认值）时，Cloudflare 将显示此页面。

您可以使用这种方法将限速的客户重定向到一个特定的 URL：

1\. 在您的服务器上创建一个 HTML 页面，该页面将重定向到您希望显示的页面的最终 URL。在页面内容中包含一个[元刷新](https://www.w3.org/TR/WCAG20-TECHS/H76.html) Tag 标记，如下例所示：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;!doctype html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta charset=&quot;utf-8&quot;&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;title&gt;Custom RL page&lt;/title&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url='https://yourzonename/block'&quot; /&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;body&gt; &lt;/body&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/html&gt;</span></div></span></span></span></code></pre>{{</raw>}}

记下您所创建的页面的公共 URL。

2\. 在 Cloudflare 仪表板中，导航到 **帐户首页** > **配置** > **自定义页面**。

3\. 在 **429 错误**下方单击**自定义页面**。

4\. 输入您在服务器上创建的页面的 URL（该页面包含元刷新 Tag 标记），然后单击**发布**。

如果您希望返回纯文本或 JSON 内容，但响应大于 32 kB，请遵循同样的方法。在本例中，重定向 URL 将是您希望显示的纯文本或 JSON 资源的 URL。

**注意：**

-   您的速率限制规则必须与您在自定义 HTML 页面中包含的、与 429 错误相关的重定向 URL 不一致。
-   为了防止拒绝服务攻击，重定向页面应当仅包含 Cloudflare 缓存的资源。

___

## 任务 4：配置绕过选项（仅 Enterprise 计划）

**绕过**选项会创建一个允许列表或例外；这样，即使匹配了速率限制，也不会将任何操作应用于一组特定的 URL。通过以下步骤来配置**绕过**：

1\. 展开**绕过**。

2\. 在**对以下 URL 绕过规则**中，输入要从速率限制规则能够排除的 URL。一行输入一个 URL。保存规则时会自动删除 URL 中指定的 HTTP 或 HTTPS，规则会同时应用于 HTTP 和 HTTPS。

![为速率限制规则配置两个要绕过的 URL（每行一个）。](/images/support/previous-rate-limiting-bypass.png)

3.（可选）根据您的计划，配置额外的速率限制功能。

4\. 点击**保存并部署**。

___

## 规则执行顺序

**使用案例 1**：如果请求与以下两个规则都匹配，

-   规则 1：与 _test.example.com_ 匹配
-   规则 2：与 _\*.example.com\*_ 匹配

或

-   规则 1：与 _\*.example.com\*_ 匹配
-   规则 2：与 _test.example.com_ 匹配

则始终先触发规则 2，因为规则 2 是后创建的。

**使用案例 2：**删除域名末尾的星号 (\*) 后，规则执行将取决于哪个规则是最后创建的**。**

-   规则 1：与 _test.example.com_ 匹配
-   规则 2：与 _\*.example.com_ 匹配

如果请求与两个规则都匹配，则先触发上面的规则 2

-   规则 1：与 _\*.example.com_ 匹配
-   规则 2：与 _test.example.com_ 匹配

如果请求与两个规则都匹配，则先触发上面的规则 2

___

## 相关资源

-   [ELS (Enterprise Log Share) 中如何报告 Rate Limiting？](/logs/reference/log-fields)
-   [Cloudflare Rate Limiting 故障排除](https://support.cloudflare.com/hc/articles/115000546328)
-   [从 Cloudflare API 配置 Rate Limiting](https://api.cloudflare.com/#rate-limits-for-a-zone-properties)
