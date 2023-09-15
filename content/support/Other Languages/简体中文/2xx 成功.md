---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115003014192-2xx-%E6%88%90%E5%8A%9F
title: 2xx 成功
---

# 2xx 成功

## 2xx 成功

**概述**

2xx 代码表示成功的响应。这通常意味着已成功过接收、理解并接受客户端请求的操作。

-   [200 OK](https://support.cloudflare.com/hc/zh-cn/articles/115003014192-2xx-%E6%88%90%E5%8A%9F#code_200)
-   [201 Created](https://support.cloudflare.com/hc/zh-cn/articles/115003014192-2xx-%E6%88%90%E5%8A%9F#code_201)
-   [202 Accepted](https://support.cloudflare.com/hc/zh-cn/articles/115003014192-2xx-%E6%88%90%E5%8A%9F#code_202)
-   [203 Non-Authoritative](https://support.cloudflare.com/hc/zh-cn/articles/115003014192-2xx-%E6%88%90%E5%8A%9F#code_203)
-   [204 No Content](https://support.cloudflare.com/hc/zh-cn/articles/115003014192-2xx-%E6%88%90%E5%8A%9F#code_204)
-   [205 Reset Content](https://support.cloudflare.com/hc/zh-cn/articles/115003014192-2xx-%E6%88%90%E5%8A%9F#code_205)
-   [206 Partial Content](https://support.cloudflare.com/hc/zh-cn/articles/115003014192-2xx-%E6%88%90%E5%8A%9F#code_206)

**200 OK** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

人人都爱的响应：请求已成功。

响应有效负载将取决于使用的请求方法。如下列出了对应请求方法的预期响应正文：

-   GET - 与所请求资源对应的标头和数据
-   HEAD - 仅含与所请求资源对应的标头，没有实际的数据
-   POST - 操作的状态或从操作中获得的结果

200 响应_始终应_包含有效负载，但这不是要求，因此源站服务器可能会生成零长度的 200 响应。若要遵循 RFC 标准，这种情形中应生成 204（例外 CONNECT）

默认情况下，可由代理服务器和浏览器缓存。如果 Cloudflare [缓存控制](https://support.cloudflare.com/hc/en-us/articles/202775670)未有指定，具有此响应的[静态资源](https://support.cloudflare.com/hc/en-us/articles/200172516)将默认在我们的边缘缓存 2 小时。 

**201 Created** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

请求成功，正在创建一个或更多新资源。Location 标头中应存在新资源的位置，或由请求的 URI 提供。通常，有效负载将描述并引用新生成资源的链接。

-   请参阅 [RFC 7231 第 7.2 节](https://tools.ietf.org/html/rfc7231#section-7.2)中对 201 响应中验证器标头字段（如 ETag 和 Last-Modified 等）的含义和用途的讨论。

**202 Accepted** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

请求已被接受，目前正在由源站服务器处理。 根据服务器的规范，客户端可能会在处理实际进行期间对请求作出反应，也可能不作出反应。

**203 Non-Authoritative Information** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

200 状态代码的可选替代，用于说明请求已成功但并不直接来自源站服务器。原始的源站服务器响应已被代理或中间服务器修改。例如，可以使用 203 来告知客户端此资源已在代理上缓存，因此后续的类似请求不一定会到达具有该相同资源的缓存服务器。又如，当仅适用于本地源站服务器的标头被剔除时。

-   默认情况下是可以缓存的响应，但 Cloudflare 不予缓存。
-   Cloudflare 永不会生成此响应，但其他代理上存在时可以从中代理。Cloudflare 借助这些例外来尊重源站服务器响应：[Cloudflare 如何处理 HTTP 请求标头](https://support.cloudflare.com/hc/en-us/articles/200170986)

**204 No Content ([RFC7231](https://tools.ietf.org/html/rfc7231))**

源站服务器上正确执行了请求的操作。常见用例是在文档编辑器中，“保存”操作已发送到源站服务器，但没有有效负载需要返回到客户端。可能仍然希望提醒用户保存已成功。

-   返回 204 响应时，一定不会有有效负载。
-   默认情况下是可以缓存的响应，但 Cloudflare 不予缓存。

**205 Reset Content** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

源站服务器建议客户端将视图重置为请求之前的原始状态。通常用于表单或其他输入提交。在请求中发送了有效负载，源站服务器成功进行了操作，现在通知浏览器允许进行其他提交。

-   205 响应绝不会返回有效负载。Content-Length 为 0 或被截断的响应后仅允许紧接将近或等于零字节的响应。

**206 Partial Content (**[**RFC 7233**](https://tools.ietf.org/html/rfc7233)**)**

请求的部分资源已成功，并位于有效负载中。请求必须已通过以下方式之一注明了范围：

1.  单个部分请求带有 HTTP 标头，包括 Content Range 后跟大小。（如果响应标头中存在，则必须与有效负载中的八位字节完全相等）例如，`Content Range: bytes 21010-47021/47022`
2.  HTTP 标头中有多个与 `Content-Type: multipart/byteranges` 相关的块，包括为各个部分分别列出 Content-Range 字段，但_不_在响应 **HTTP 标头**中。也需要 [RFC 7233 第 4.1 节](https://tools.ietf.org/html/rfc7233%23section-4.1)中规定的分界线。例如


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> HTTP/1.1 206 Partial Content     Date:Wed, 15 Nov 1995 06:25:24 GMT     Last-Modified:Wed, 15 Nov 1995 04:58:08 GMT     Content-Length:1741     Content-Type: multipart/byteranges; boundary=THIS_STRING_SEPARATES     --THIS_STRING_SEPARATES     Content-Type: application/pdf     Content-Range: bytes 500-999/8000     ...the first range...     --THIS_STRING_SEPARATES     Content-Type: application/pdf     Content-Range: bytes 7000-7999/8000     ...the second range     --THIS_STRING_SEPARATES--</span></div></span></span></span></code></pre>{{</raw>}}

 206 通常用于处理需要分割的较大文件的客户端，或者具有多个同步流以改进延迟的已中断下载。
