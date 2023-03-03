---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200170566-%E8%A7%A3%E5%86%B3-SSL-%E9%94%99%E8%AF%AF
title: 解决 SSL 错误
---

# 解决 SSL 错误

## 解决 SSL 错误

_对浏览到通过 Cloudflare 代理的域时观察到的常见 SSL 错误进行故障排除。_

___

## 概述

在 Cloudflare 为您的域提供 SSL 证书之前，各种浏览器中会出现 HTTPS 流量的以下错误：

**Firefox**

     _ssl\_error\_bad\_cert\_domain_     _此连接不受信任_

**Chrome**

     _您所用连接不是专用连接_

**Safari**

     _Safari 无法验证网站的身份_

**Edge/Internet Explorer**

     _此网站的安全证书存在问题_

即使为您的域配置了 Cloudflare SSL 证书，旧版浏览器也会显示有关不受信任的 SSL 证书的错误，因为它们不[支持 Cloudflare Universal SSL 证书使用的服务器名称指示（SNI）协议](https://en.wikipedia.org/wiki/Server_Name_Indication#Support)。

否则，如果在使用新版浏览器时出现 SSL 错误，请查看以下常见的 SSL 错误原因：

-   [重定向循环错误或 HTTP 525 或 526 错误](https://support.cloudflare.com/hc/zh-cn/articles/200170566-%E8%A7%A3%E5%86%B3-SSL-%E9%94%99%E8%AF%AF#h_7ec9ed4a-80ae-4fca-8be7-89a13c195d19)
-   [仅部分子域返回 SSL 错误](https://support.cloudflare.com/hc/zh-cn/articles/200170566-%E8%A7%A3%E5%86%B3-SSL-%E9%94%99%E8%AF%AF#h_55e4d315-c60d-4798-9c4c-c75d9baed1b7)
-   [您的 Cloudflare Universal SSL 证书未激活](https://support.cloudflare.com/hc/zh-cn/articles/200170566-%E8%A7%A3%E5%86%B3-SSL-%E9%94%99%E8%AF%AF#h_122b94f3-ff14-4544-b5fa-8875e08ff5f0)
-   [OCSP 响应错误](https://support.cloudflare.com/hc/zh-cn/articles/200170566-%E8%A7%A3%E5%86%B3-SSL-%E9%94%99%E8%AF%AF#h_51354cf8-de93-4894-85e6-f0f7453d766d)
-   [SSL 已过期或 SSL 不匹配错误](https://support.cloudflare.com/hc/zh-cn/articles/200170566-%E8%A7%A3%E5%86%B3-SSL-%E9%94%99%E8%AF%AF#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f)

___

### 重定向循环错误或 HTTP 525 或 526 错误

**表现**

访问者在浏览到您的域时发现[重定向循环错误](https://support.cloudflare.com/hc/articles/115000219871)，或观察到 HTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error) 或 [526](https://support.cloudflare.com/hc/articles/115003011431#526error) 错误。当 Cloudflare **SSL/TLS** 应用中的当前 Cloudflare SSL 选项与您的源 Web 服务器配置不兼容时，会发生这些错误。

**解决方案**

有关重定向循环的信息，请参阅我们的[解决重定向循环错误](https://support.cloudflare.com/hc/articles/115000219871)指南。

要解决 HTTP [525](https://support.cloudflare.com/hc/articles/115003011431#525error) 或 [526](https://support.cloudflare.com/hc/articles/115003011431#526error) 错误，请参阅下面推荐的 SSL 配置。例如，如果您的源 Web 服务器...

-   具有证书颁发机构提供的有效证书或 Cloudflare 提供的 [Origin CA 证书](https://support.cloudflare.com/hc/articles/115000479507)，则使用_[完全](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)_或 _[完全（严格）](https://support.cloudflare.com/hc/articles/200170416#h_8afd8a8d-382d-4694-a2b2-44cbc9f637ef)_**SSL** 选项

-   具有自签名 SSL 证书，则使用[_完全_ **SSL** 选项](https://support.cloudflare.com/hc/articles/200170416#h_845b3d60-9a03-4db0-8de6-20edc5b11057)

-   缺少任何已安装的 SSL 证书，则使用[_灵活_ **SSL** 选项](https://support.cloudflare.com/hc/articles/200170416#h_4e0d1a7c-eb71-4204-9e22-9d3ef9ef7fef)。

___

### 仅部分子域返回 SSL 错误

-   确保域至少在 Business 计划中，并上传涵盖 _dev.www.example.com_ 的[自定义 SSL 证书](https://support.cloudflare.com/hc/articles/200170466)，或者
-   购买涵盖 _dev.www.example.com_ 附带[自定义主机名的 Dedicated SSL 证书](https://support.cloudflare.com/hc/articles/228009108)，或者
-   如果您的源 Web 服务器上的二级子域具有有效证书，请单击 Cloudflare **DNS** 应用中 _dev.www_ 主机名旁 _example.com_ 的橙色云图标。

___

### 您的 Cloudflare Universal SSL 证书未激活

**表现**

所有激活的 Cloudflare 域都提供 [Universal SSL 证书](https://support.cloudflare.com/hc/articles/204151138)。如果您发现 SSL 错误，并且在 Cloudflare **SSL/TLS** 应用的**边缘证书**部分中您的域没有**类型**为 _Universal_ 的证书，则尚未配置 Universal SSL 证书。

在 Cloudflare 为域名发出证书之前，我们的 SSL 供应商会验证每个 SSL 证书请求。此过程可能需要 15 分钟到 24 小时。我们的 SSL 证书供应商有时会标记域名以供进一步审核。

**解决方案**

-   在 Cloudflare **SSL/TLS** 应用中启用 Universal SSL，或
-   或购买 [Dedicated SSL](https://support.cloudflare.com/hc/articles/228009108) 证书，或者
-   将[自定义 SSL 证书](https://support.cloudflare.com/hc/articles/200170466)上传到 Cloudflare。

如果在 Cloudflare 域激活后 24 小时内未发出 Cloudflare SSL 证书：

-   如果您的源 Web 服务器具有有效的 SSL 证书，则[暂停 Cloudflare](https://support.cloudflare.com/hc/articles/203118044#h_8654c523-e31e-4f40-a3c7-0674336a2753)，并
-   [打开支持票证](https://support.cloudflare.com/hc/en-us/requests/new)以提供以下信息：  
    -   受影响的域名，以及
    -   您观察到的错误的屏幕截图。

在支持团队调查此问题时，暂停 Cloudflare 将允许从您的源 Web 服务器正确提供 HTTPS 流量。

___

### OCSP 响应错误

**表现**您站点的访问者发现 OCSP 响应错误。

**解决方案  
**  
此错误可能是由浏览器版本造成的，也可能是由需要 Cloudflare 的 SSL 供应商之一注意的问题造成的。为了正确诊断，请[打开支持票证](https://support.cloudflare.com/hc/en-us/requests/new)，其中包含观察到浏览器错误的访问者提供的以下信息：

1.  来自 _[https://aboutmybrowser.com/](https://aboutmybrowser.com/)_ 的输出
2.  来自访问者浏览器的 _https://example.com/cdn-cgi/trace_ 的输出。将 _example.com_ 替换为您网站的域名。

___

### SSL 已过期或 SSL 不匹配错误

**表现  
**  
访问者在浏览器中发现有关 SSL 过期或 SSL 不匹配的错误消息。

**解决方案**

-   受影响的域名，以及
-   您观察到的错误的屏幕截图。

___

## 相关资源

-   [重定向循环错误](https://support.cloudflare.com/hc/articles/115000219871)
-   [混合内容错误](https://support.cloudflare.com/hc/articles/200170476)
