---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/214820528-%E9%AA%8C%E8%AF%81%E5%B7%B2%E5%9C%A8-Cloudflare-%E4%B8%8A%E6%BF%80%E6%B4%BB%E7%9A%84%E7%AB%99%E7%82%B9%E7%9A%84-Let-s-Encrypt-%E8%AF%81%E4%B9%A6
title: 验证已在 Cloudflare 上激活的站点的 Let’s Encrypt 证书
---

# 验证已在 Cloudflare 上激活的站点的 Let’s Encrypt 证书

## 验证已在 Cloudflare 上激活的站点的 Let’s Encrypt 证书

_了解如何验证已激活 Cloudflare 站点的 Let’s Encrypt SSL 证书。_

___

## 概述

本指南描述如何在以下文档中所述的官方 Let's Encrypt 客户端中使用 Webroot 方法进行验证的其他详细信息：[https://letsencrypt.readthedocs.org/en/latest/using.html#webroot](https://letsencrypt.readthedocs.org/en/latest/using.html#webroot)

注意，Let's Encrypt 客户端用于 ACME 身份验证的默认方式使用 DVSNI 方法。对于已启用 Cloudflare 的域，这将失败，因为我方终止了 SSL (TLS)，并且 ACME 服务器不会看到客户端在源站呈现的证书。启用 Cloudflare 时，使用备用 ACME 验证方法（如 DNS 或 HTTP）将能够验证成功。

___

## HTTP 验证

如果您是第一次为已在 Cloudflare 上激活的站点配置 Let's Encrypt，则使用 webroot 方法进行验证，这是成功验证并获取证书和私钥对所需的步骤。 

1.  下载 Let’s Encrypt 客户端并切换到下载目录：


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">git clone https://github.com/letsencrypt/letsencrypt</span></div></span></span></span></code></pre>{{</raw>}}


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cd letsencrypt/</span></div></span></span></span></code></pre>{{</raw>}}
    
2.  运行可实现自动安装的脚本：  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">./letsencrypt-auto</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  通过将 `letsencrypt` 客户端与 `certonly` 命令和 `--webroot` 标志一同使用，您能够使用 HTTP 验证来验证并获取证书/密钥对 。示例命令：  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/root/.local/share/letsencrypt/bin/letsencrypt certonly --webroot --webroot-path /usr/share/nginx/html/ --renew-by-default --email email@host.tld --text --agree-tos -d example.tld -d www.example.tld</span></div></span></span></span></code></pre>{{</raw>}}
    
      
    其中  
    
    **\--webroot-path**
    
    是您站点所在服务器上的目录（该示例中使用了 nginx）
    
    **\--renew-by-default**
    
    在域名为先前获得的证书的超集时选择默认续订
    
    **\--email**
    
    是用于注册和恢复联系方式的电子邮件。
    
    **\--text**
    
    显示文本输出
    
    **\--agree-tos**
    
    同意 Let’s Encrypt 的订户协议
    
    **\-d**
    
    指定要添加到 SAN 的主机名。
    
4.  成功完成此验证方法将显示类似于以下内容的文本：  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">恭喜您！您的证书和链已保存在 /etc/letsencrypt/live/example.tld/fullchain.pem 中。    您的证书将于 2016-03-03 到期。要在将来获得新版本的证书，    只需再次运行 Let's Encrypt 即可。</span></div></span></span></span></code></pre>{{</raw>}}
    
5.  注意，证书和密钥都将保存到`/etc/letsencrypt/live/example.tld/`。获得这两者后，您将需要手动更新虚拟主机，以使用此密钥/证书对。

务必在 Cloudflare 仪表板中查看域的page rules，以及确认任何方面都不会导致对验证 URL 的请求被重定向或只能通过 HTTPS 访问。

___

## 续订

当需要续订时，使用 `letsencrypt renew`[命令](https://letsencrypt.readthedocs.org/en/latest/using.html#renewal)应可使证书成功续订，无需进行任何 Cloudflare 配置更改，前提是：

-   letsencrypt 客户端用于续订的 .conf 文件指定了`authenticator = webroot`。
-   验证 URL 可通过 HTTP 访问。
-   没有为该 URL 应用重定向。

或者，重复上述步骤将重新颁发新证书。
