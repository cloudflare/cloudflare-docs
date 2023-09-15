---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360020739772-%E4%BD%BF%E7%94%A8-Cloudflare-Logs-ELS-%E8%B0%83%E6%9F%A5-DDoS-%E6%B5%81%E9%87%8F-%E4%BB%85%E9%99%90-Enterprise-
title: 使用 Cloudflare Logs（ELS）调查 DDoS 流量（仅限 Enterprise）
---

# 使用 Cloudflare Logs（ELS）调查 DDoS 流量（仅限 Enterprise）

_了解如何通过有效整理 Cloudflare Logs（过去称为 ELS）来辨别恶意流量的来源。_ 

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/360020739772-%E4%BD%BF%E7%94%A8-Cloudflare-Logs-ELS-%E8%B0%83%E6%9F%A5-DDoS-%E6%B5%81%E9%87%8F-%E4%BB%85%E9%99%90-Enterprise-#overview)
-   [第 1 步：查询 Cloudflare Logs 前先收集所需的信息](https://support.cloudflare.com/hc/zh-cn/articles/360020739772-%E4%BD%BF%E7%94%A8-Cloudflare-Logs-ELS-%E8%B0%83%E6%9F%A5-DDoS-%E6%B5%81%E9%87%8F-%E4%BB%85%E9%99%90-Enterprise-#step1)
-   [第 2 步：下载并保存日志](https://support.cloudflare.com/hc/zh-cn/articles/360020739772-%E4%BD%BF%E7%94%A8-Cloudflare-Logs-ELS-%E8%B0%83%E6%9F%A5-DDoS-%E6%B5%81%E9%87%8F-%E4%BB%85%E9%99%90-Enterprise-#step2)
-   [第 3 步：整理日志](https://support.cloudflare.com/hc/zh-cn/articles/360020739772-%E4%BD%BF%E7%94%A8-Cloudflare-Logs-ELS-%E8%B0%83%E6%9F%A5-DDoS-%E6%B5%81%E9%87%8F-%E4%BB%85%E9%99%90-Enterprise-#step3)
-   [示例工作流程](https://support.cloudflare.com/hc/zh-cn/articles/360020739772-%E4%BD%BF%E7%94%A8-Cloudflare-Logs-ELS-%E8%B0%83%E6%9F%A5-DDoS-%E6%B5%81%E9%87%8F-%E4%BB%85%E9%99%90-Enterprise-#example-workflow)

___

## 概述

借助 Cloudflare Logs（以前称为 ELS），您可以访问实用的数据来分析可能呈现出 DDoS 攻击相关模式的流量。您可以通过整理 Cloudflare Logs 数据来进行这种分析。要开始操作，请按照下述步骤操作，并查看提供的示例工作流程。

在按照这些说明操作前，您需要：

-   [cat](http://www.linfo.org/cat.html)
-   [jq](https://stedolan.github.io/jq/)
-   [Cloudflare Logs Logpull API](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)

___

收集下列信息：

1.  区域管理员电子邮件地址
2.  区域 ID（可在 **Overview** > **Zone ID** 下找到）
3.  客户端 API 密钥
4.  开始时间（示例格式：1529171100)
5.  结束时间（示例格式：1529171100)

___

## 第 2 步：下载并保存日志

注意：Cloudflare 端点具有 1 小时范围限值，每次请求的日志文件大小也必须小于 1GB。如果文件大小超过 1GB，下载会在 1GB 处截断，即使所请求时间的日志事件未能包含在内。为避免截断日志，请将时间从 1 小时缩短到 45 分钟之类的时长，直到日志文件大小小于 1GB。

#### 选项 1：

**下载 Cloudflare Logs 中的 \*所以\* 字段，并保存到 els.txt：**

模板：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=(curl -s -H &quot;X-Auth-Email: email&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

示例（以及值）：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/5b5f0xxxcbfbaxxxxxx0416d22f7b/logs/received?start=1529171100&amp;end=1529171100&amp;fields=(curl -s -H &quot;X-Auth-Email: monkey@bannana.com&quot; -H &quot;X-Auth-Key: api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received/fields&quot; | jq '. | to_entries[] | .key' -r | paste -sd &quot;,&quot; -)&quot;</span></div></span></span></span></code></pre>{{</raw>}}

#### 选项 2：

**下载 Cloudflare Logs 中的 \*特定\* 字段，并保存到 els.txt：  
**

此命令仅在您请求的日志中包含以下字段：_CacheCacheStatus、CacheResponseBytes、CacheResponseStatus、CacheTieredFill 和 ClientASN_。

请从[此处](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-Logpull-REST-API)查看 Cloudflare Logs 的完整列表。 

模板：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:email&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/zone id/logs/received?start=starttime&amp;end=endtime&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

示例（以及值）：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">curl -sv -o els.txt-H &quot;X-Auth-Email:monkey@bannana.com&quot; -H &quot;X-Auth-Key:api key&quot; &quot;https://api.cloudflare.com/client/v4/zones/xx5x0xxxc45baxxxxxx0x6d23fxx/logs/received?start=1529171100&amp;end=1529171100&amp;fields=CacheCacheStatus,CacheResponseBytes,CacheResponseStatus,CacheTieredFill,ClientASN”</span></div></span></span></span></code></pre>{{</raw>}}

___

## 第 3 步：整理日志

按照字段值整理日志，并输出到文件中。按 HTTP 200 响应整理并输出到 els-200.txt 文件：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

按 HTTP 525 响应整理并输出到 els-525.txt 文件


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt| grep &quot;:525,&quot; &gt; els-525.txt</span></div></span></span></span></code></pre>{{</raw>}}

**字段****值“:525,”****源于何处？**

模式 _:525,_（冒号、状态代码、逗号）是 _EdgeResponseStatus_ 字段独有的。如果简单地搜索 HTTP 状态代码 _525_ 而不加冒号和结尾逗号，则也会包含其他字段（例如 _EdgeStartTimeStamp_）中的模式 _525_，包括许多数字并且也可能包含数字序列 _525_。

![](/images/support/12.png)

注意：原样的输出文件（els-200.txt 和 els-525.txt）非常不易读。若要以更易读的格式查看，请在以下命令中使用 jq：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-525.txt | jq '.'</span></div></span></span></span></code></pre>{{</raw>}}

**按字段****统计****请求****数****并输出到****文件**

在本例中，我们统计 SSL 协议版本的请求数，这在 Cloudflare Logs 中用 _ClientSSLProtocol_ 字段表示（注意以下以下名称名称前的句点）。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientSSLProtocol els-200.txt |sort -n |uniq -c |sort -n &gt; ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat ClientSSLProtocol.txt</span></div></span></span></span></code></pre>{{</raw>}}

**示例输出：**

![](/images/support/11.png)

_ClientRequestURI、ClientIP、ClientRequestUserAgent、ClientCountry_ 和 _ClientRequestHost_ 字段通常在这些日志中查找攻击模式时最有帮助的字段。

-   按照 _ClientRequestUserAgent_ 整理可以设置 User Agent Blocking 规则。
-   按照 _ClientCountry_ 整理可以基于国家/地区设置防火墙规则。
-   按照 _ClientRequestURI_ 整理可以为请求数最多的页面设置 Rate Limiting 规则。

___

## 示例工作流程

通常，您需要按照多个字段来整理，以分析和辨别攻击的来源。例如，请查看以下工作流程：

**操作 1**：按照 _HTTP 200_ 响应整理您下载的 Cloudflare Logs，并输出到 els-200.txt。

**原因**：您不关心 Cloudflare 已阻止的响应；即，导致 HTTP 响应 _503_ 或 _403_ 的请求。在我们边缘网络导致 _200 HTTP_ 响应的请求不会被 Cloudflare 阻止，有可能会一路通达源站（如果它未在 Cloudflare 边缘缓存）。具有恶意目的人可专门设计此类请求，使源站负担过重。

**操作方法**：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els.txt | grep &quot;:200,&quot; &gt; els-200.txt</span></div></span></span></span></code></pre>{{</raw>}}

**  
操作 2**：按照 URI 整理“仅 HTTP 200”日志，并输出到 els-200-URI.txt。

**原因**：在 200 响应中，您想要查看被请求次数最多的页面。

**操作方法**：

查找排名最前的 URI：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientRequestURI els-200.txt |sort -n |uniq -c |sort -n &gt; els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-top-URIs.txt</span></div></span></span></span></code></pre>{{</raw>}}

从此列表中挑一个 URI 并将含有该 URI 的日志条目输出到单独的文件。为此，可将以下命令中的 _/ClientRequestURI/path/to/something/_ 替换您选择的 URI：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200.txt| grep &quot;/ClientRequestURI/path/to/something/&quot; &gt; els-200-URI-1.txt</span></div></span></span></span></code></pre>{{</raw>}}

**  
操作 3**：按照 IP 地址统计特定 URI 的“仅 HTTP 200”响应，并输出到 els-200-URI-1-Top-IP.txt

**原因**：您想要查看请求该 URI 并导致 200 响应的排名最前的 IP 地址。

**操作方法：**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ jq -r .ClientIP els-200-URI-1.txt |sort -n |uniq -c |sort -n &gt; els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

**输出文件的内容：**


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">~$ cat els-200-URI-1-Top-IP.txt</span></div></span></span></span></code></pre>{{</raw>}}

您可以按照请求 URI 和请求这些 URI 的 IP 来缩小 200 HTTP 响应的范围。也可以通过相反的方式整理日志，按照排名最前的 IP 地址缩小日志条目范围，再查看各个 IP 地址请求最多的 URI 是哪些。
