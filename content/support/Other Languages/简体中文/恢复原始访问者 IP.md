---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200170786-%E6%81%A2%E5%A4%8D%E5%8E%9F%E5%A7%8B%E8%AE%BF%E9%97%AE%E8%80%85-IP
title: 恢复原始访问者 IP
---

# 恢复原始访问者 IP

## 恢复原始访问者 IP

_了解如何配置 mod\_cloudflare，以根据您的源站 Web 服务器类型（包括 Apache、NGINX 和 Microsoft IIS 等）记录访问者的原始 IP 地址。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/200170786-%E6%81%A2%E5%A4%8D%E5%8E%9F%E5%A7%8B%E8%AE%BF%E9%97%AE%E8%80%85-IP#cF7JFXws2pZ4bgu)
-   [mod\_remoteip](https://support.cloudflare.com/hc/zh-cn/articles/200170786-%E6%81%A2%E5%A4%8D%E5%8E%9F%E5%A7%8B%E8%AE%BF%E9%97%AE%E8%80%85-IP#C5XWe97z77b3XZV)
-   [mod\_cloudflare](https://support.cloudflare.com/hc/zh-cn/articles/200170786-%E6%81%A2%E5%A4%8D%E5%8E%9F%E5%A7%8B%E8%AE%BF%E9%97%AE%E8%80%85-IP#S7Z4EJQFN997YRY)
-   [Web 服务器说明](https://support.cloudflare.com/hc/zh-cn/articles/200170786-%E6%81%A2%E5%A4%8D%E5%8E%9F%E5%A7%8B%E8%AE%BF%E9%97%AE%E8%80%85-IP#JUxJSMn3Ht5c5yq)
-   [用 HAProxy 恢复原始访问者 IP](https://support.cloudflare.com/hc/zh-cn/articles/200170786-%E6%81%A2%E5%A4%8D%E5%8E%9F%E5%A7%8B%E8%AE%BF%E9%97%AE%E8%80%85-IP#h_4vfodjrBunNww4MmSGAgmh)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/200170786-%E6%81%A2%E5%A4%8D%E5%8E%9F%E5%A7%8B%E8%AE%BF%E9%97%AE%E8%80%85-IP#h_qHFQv3Kt9lWvqXaP3womy)

___

## 概述

当您的[网站流量路由经过 Cloudflare 网络](https://support.cloudflare.com/hc/articles/205177068) 时，我们充当反向代理。这允许 Cloudflare 通过更有效地路由数据包并缓存静态资源（图片、JavaScript、CSS 等）来加快页面加载时间。因此，在响应和记录请求时，您的源站会返回 [Cloudflare IP 地址](https://www.cloudflare.com/ips/)。

例如，如果您安装的应用程序依赖于原始访问者的传入 IP 地址，则默认会记录 Cloudflare 的 IP 地址。原始访问者 IP 地址显示在名为 [_CF-Connecting-IP_](https://support.cloudflare.com/hc/articles/200170986) 的附加 HTTP 标头中。您可以按照我们的 [Web 服务器说明](https://support.cloudflare.com/hc/articles/200170786#JUxJSMn3Ht5c5yq)操作，在源服务器上记录原始访问者 IP 地址。如果此 HTTP 标头在请求到达您的源服务器时不可用，请检查您的[转换规则](/rules/transform/)和[管理转换](/rules/transform/managed-transforms/)配置。

下图演示了使用和不使用 Cloudflare 处理 IP 地址的不同方式。

![The diagram illustrates the different ways that IP addresses are handled with and without Cloudflare.](/images/support/Restoring_IPs__1_.png)

___

## mod\_remoteip

### 概述

Cloudflare 不再更新和支持 _mod\_cloudflare_。不过，如果您在使用 Apache Web 服务器，且运行的是 **Ubuntu Server 18.04** 和 **Debian 9 Stretch** 等操作系统，您可以使用 _mod\_remoteip_ 来记录访问者的原始 IP 地址。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">由于此模块是由第三方创建的，我们无法对插件相关的问题提供技术支持。</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

在 Apache Web 服务器上安装 _mod\_remoteip_：

1\. 通过发出以下命令来启用 _mod\_remoteip_：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enmod remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

2\. 更新站点配置以包含 _RemoteIPHeader CF-Connecting-IP_，例如 `/etc/apache2/sites-available/000-default.conf`


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerAdmin webmaster@localhost</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DocumentRoot /var/www/html</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ServerName remoteip.andy.support</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ErrorLog ${APACHE_LOG_DIR}/error.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CustomLog ${APACHE_LOG_DIR}/access.log combined</span></div></span></span></span></code></pre>{{</raw>}}

3\. 更新 `apache.conf` 中的 _LogFormat_ 组合条目，将 `/etc/apache2/apache2.conf.` 中的 _%h_ 替换为 _%a_。例如，如果当前的 _LogFormat_ 如下所示，


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%h %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

您应将 _LogFormat_ 更新为如下所示：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">LogFormat &quot;%a %l %u %t &quot;%r&quot; %&gt;s %O &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;&quot; combined</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4\. 通过输入以下代码和 [Cloudflare IP](https://www.cloudflare.com/ips/) 创建 `/etc/apache2/conf-available/remoteip.conf`，以定义受信任的代理地址：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPHeader CF-Connecting-IP</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.1 (示例 IP 地址)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">RemoteIPTrustedProxy 192.0.2.2 (示例 IP 地址)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(对 [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/) 上列出的所有 Cloudflare IP 重复此项)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5\. 启用 Apache 配置：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo a2enconf remoteip</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">启用 conf remoteip。</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">要激活新配置，您需要运行：</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">service apache2 reload</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

6\. 测试 Apache 配置：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo apache2ctl configtest</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Syntax OK</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

7\. 重新启动 Apache：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sudo systemctl restart apache2</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## mod\_cloudflare

mod\_cloudflare 的安装方式有两种：从 GitHub 下载 Apache 扩展，或在您的原始 Web 服务器上添加代码。

### 从 GitHub 下载数据包或脚本

如果您使用的是 Apache Web 服务器，可以从 [GitHub](https://github.com/cloudflare/mod_cloudflare) 下载 mod\_cloudflare。

### 添加代码到您的源站 Web 服务器

如果您无法安装 mod\_cloudflare，或者没有适合的 Cloudflare 插件可供您的内容管理平台恢复原始访问者 IP，请在您的源站 Web 服务器上将以下代码添加到需要原始访问者 IP 的任何页面的 <body> 标记内或前面：

`<?php if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];?>`

此命令仅会将 IP 地址提供给需要的脚本。不会将 IP 存储到实际的服务器日志。

### Apache

要删除 _mod\_cloudflare_，您应当注释掉加载 _mod\_cloudflare_ 的 Apache 配置行。

这根据您的 Linux 发行版而有不同；但对大多数用户而言，在 `/etc/apache2` 中查找就能搜索到这一行：

`LoadModule cloudflare_module`

注释掉或删除这一行，然后重启 Apache，_mod\_cloudflare_ 应该会消失。

如果运行的是 Ubuntu 或 Debian，您应该会看到。

`file/etc/apache2/mods-enabled/cloudflare.load`

删除此文件来移除 _mod\_cloudflare_，然后重启 Apache。

### Nginx

mod\_cloudflare 是通过修改 [Nginx 配置文件](http://nginx.org/en/docs/http/ngx_http_realip_module.html) `nginx.conf` 中的 `ngx_http_realip_module` 来安装的。

要删除 _mod\_cloudflare_，您应当注释掉或删除这一行，然后重启 Nginx，_mod\_cloudflare_ 应该就会消失_。_

___

## Web 服务器说明

参见如下有关如何配置 Web 服务器的说明，以根据您的 Web 服务器类型记录原始访问者 IP：

1.  确保安装以下内容：
    -   Red Hat/Fedora`sudo yum install httpd-devel libtool git`
    -   Debian/Ubuntu`sudo apt-get install apache2-dev libtool git`
2.  克隆以下内容以获取最新版本的 _mod\_cloudflare_：
    -   Red Hat/Fedora/Debian/Ubuntu：`git clone https://github.com/cloudflare/mod_cloudflare.git; cd mod_cloudflare`
3.  使用 Apache 扩展工具将 .c 文件转换为模块：
    -   Red Hat/Fedora/Debain/Ubuntu：`apxs -a -i -c mod_cloudflare.c`
4.  重启并验证模块是否处于活动状态：
    -   Red Hat/Fedora`service httpd restart; httpd -M|grep cloudflare`
    -   Debian/Ubuntu：`sudo apachectl restart; apache2ctl -M|grep cloudflare`
5.  如果您的 Web 服务器位于负载均衡器后面，请将下面这行添加到 Apache 配置中（通常是 httpd.conf），并将 123.123.123.123 替换为负载均衡器的 IP 地址：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">IfModule cloudflare_module</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPHeader X-Forwarded-For</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">CloudFlareRemoteIPTrustedProxy **[插入您的负载平衡器的 IP 地址]**</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">DenyAllButCloudFlare</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/IfModule</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

使用 [`ngx_http_realip_module` NGINX 模块](http://nginx.org/en/docs/http/ngx_http_realip_module.html)和以下配置参数：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">set_real_ip_from 192.0.2.1 (example IP address)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(repeat for all Cloudflare IPs listed at [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#use any of the following two</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">real_ip_header CF-Connecting-IP;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">#real_ip_header X-Forwarded-For;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

该前缀列表需要定期更新，我们在 [Cloudflare IP 地址](https://www.cloudflare.com/ips)中发布了完整列表。

另见：[Cloudflare 和 NGINX](https://danielmiessler.com/blog/getting-real-ip-addresses-using-cloudflare-nginx-and-varnish/)。

1.  运行以下脚本，将 mod\_cloudflare 作为 EasyApache 的一部分来安装：`bash <(curl -s https://raw.githubusercontent.com/cloudflare/mod_cloudflare/master/EasyApache/installer.sh)`
2.  安装时，您需要使用新的 mod\_cloudflare 插件重新编译您的 Apache。

在使用 Railgun（或其他反向代理软件，如 Varnish）时，用户的请求将来自 Railgun 服务器，而不是 Cloudflare。由于请求不直接来自 Cloudflare，因此默认情况下，添加的任何模块都不会恢复访问者 IP 地址。

1.  要解决此问题，请打开您的 Apache 配置。这通常可以在 `/etc/apache2/apache2.conf`、`/etc/httpd/httpd.conf`、`/usr/local/apache/conf/httpd.conf` 或其他位置上找到，具体取决于配置。如果不确定，请咨询您的主机提供商。
2.  在末尾处添加：`CloudflareRemoteIPTrustedProxy railgun_address`因此，如果您的 Railgun 服务器位于 127.0.0.1，则如下所示：`CloudflareRemoteIPTrustedProxy 127.0.0.1`
3.  如果您要将多台服务器添加到受信任代理列表中，可以将它们添加到末尾：CloudflareRemoteIPTrustedProxy 127.0.0.1 127.0.0.2

要使 Lighttpd 自动为访问日志和应用程序重写服务器 IP，您可从以下两个解决访问方案中选用一个。

1.  打开您的 **lighttpd.conf** 文件，并将 _mod\_extforward_ 添加到 _server.modules_ 列表。它必须在 _mod\_accesslog_ **之后**，才能在访问日志中显示实际 IP 地址
2.  将以下代码块添加到 **lighttpd.conf** 文件中服务器模块列表后的任意位置，然后重新启动 Lighttpd


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$HTTP[&quot;remoteip&quot;] == &quot;192.2.0.1 (example IP address)&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.forwarder = ( &quot;all&quot; =&gt; &quot;trust&quot; )</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">extforward.headers = (&quot;CF-Connecting-IP&quot;)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">（对 [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/) 上所列的 Cloudflare IP 重复此项）</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  前往 LiteSpeed Web 管理员控制台。
2.  在 Configuration 中，启用 Use Client IP in Header 选项。
3.  启用之后，您的访问日志就会显示正确的 IP 地址，甚至 PHP 的 `$_SERVER['REMOTE_ADDR']` 变量也会包含客户端的实际 IP 地址，而非 Cloudflare IP 地址，其本身就能解决您在支持 PHP 的网站（如 WordPress 或 vBulletin 安装）上启用 Cloudflare 时遇到的大多数问题。

##### IIS 7 - 8：

按照[此处](https://techcommunity.microsoft.com/t5/iis-support-blog/how-to-use-x-forwarded-for-header-to-log-actual-client-ip/ba-p/873115)的说明操作。

##### IIS 8.5 - 10：

自 IIS 8.5 起，自定义日志记录是内置选项。请参阅 [IIS 增强日志](http://www.iis.net/learn/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85)

1.  在 IIS Manager 中，双击您操作的站点的 _Actions_ 菜单中的 **Logging**。
2.  启动后，选择 **W3C** 作为格式，再单击 _Log File_ 子部分中格式下拉列表旁边的 **Select Fields**。
3.  单击 **Add Field**，再添加 _CF-Connecting-IP_ 标头。
4.  单击 **Ok**。您应该看到 **Custom Fields** 中反映出您的新条目。返回到 _Logging_ 窗口后，单击 **Apply**。

1.  如果这能成功，日志文件现在应该会有下划线：您应该也会看到字段中的变化：
2.  重启站点，再重启 W3SVC；如果更改没有立即生效，则重启整个实例。在 IIS 8.5+ 中使用增强型日志时，它 **不会恢复** 应用程序层面的原始访问者 IP。

要使 Tomcat7 自动将原始访问者 IP 恢复到您的访问日志和应用程序，您需要在日志架构中添加 `%{CF-Connecting-IP}i`。

例如，您可以将以下代码块添加到 `server.xml` 文件中。

`<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log."suffix=".txt" pattern="%{CF-Connecting-IP}i - %h %u %t - &quot;%r&quot; - %s - %b - %{CF-RAY}i"/>`

这会使您的日志类似于下方所示：

`Visitor IP - Cloudflare IP - [04/Dec/2014:23:18:15 -0500] - "GET / HTTP/1.1" - 200 - 1895 - 193d704b85200296-SJC`

要在通过 Cloudflare 运行 Invision Power Board 3 安装时正确匹配 IP，请按如下说明操作：

登录 IPB 安装的 ACP。

1.  单击 **System**。
2.  在 Overview 下，单击 **Security**。
3.  在 Security Center 下，单击 **Security Settings**。检查 _Trust IP addresses provided by proxies?_ 是否为绿色。

##### IPB4 对 _Trust IP addresses provided by proxies?_ 的说明

如果您的网络环境中通过代理处理请求（例如，在办公室或大学等内网环境中，或者设有负载均衡的服务器集群中），您可能需要启用此项设置，以便能使用正确的 IP 地址。但在启用后，恶意用户可通过不当使用系统来提供虚假的 IP 地址。在大多数环境中，此设置应不予使用。

如果您使用 Apache 服务器，我们建议您通过安装 [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) 将访问者 IP 恢复到您的日志中。

如果您因为没有服务器访问权限而无法安装 MOD，您或许能够[修改核心](https://www.phpbb.com/community/viewtopic.php?p=13936406#p13936406)。

最新版本的 MyBB 包含一个 Scrutinize User's IP address 选项。

`Admin CP > Configuration > Server and Optimization Options > Scrutinize User's IP address? > Yes`

此外，您也可以安装适用于 MyBB 1.6 的 [Cloudflare 管理插件](https://mods.mybb.com/view/antoligy-mybb-cloudflare-management-plugin)。

##### MyBB 1.6.0、1.6.1、1.6.2 或 1.6.3

1.  导航到 `./inc/functions.php`。
2.  找到第 2790 行。
3.  将：`if(isset($_SERVER['REMOTE_ADDR']))`替换为：`if(isset($_SERVER['HTTP_CF_CONNECTING_IP']))`
4.  然后，将：`$ip = $_SERVER['REMOTE_ADDR'];`替换为：`$ip = $_SERVER['HTTP_CF_CONNECTING_IP'];`

Vanilla 团队的一名成员编写了[适用于 Vanilla 的 Cloudflare 插件](https://open.vanillaforums.com/addon/cloudflaresupport-plugin)，可为自托管站点恢复原始访问者 IP 到日志文件。

由于此插件是由第三方创建的，我们无法对 plugin.MediaWiki 相关的问题提供技术支持

1.  打开 `includes/GlobalFunctions.php`。在大约第 370 行，将：`$forward = "\t(proxied via {$_SERVER['REMOTE_ADDR']}{$forward})";`更改为`$forward = "\t(proxied via {$_SERVER['HTTP_CF_CONNECTING_IP']}{$forward})";`
2.  打开 `includes/ProxyTools.php`。在大约第 79 行，找到：`if ( isset( $_SERVER['REMOTE_ADDR'] ) ){`并替换为：`if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ){`第二步仅适用于 MediaWiki 版本 1.18.0 及更旧版本。较新版本的 MediaWiki 已彻底重写 ProxyTools.php，以下代码已不再存在。
3.  在大约第 80 行，找到：`$ipchain = array( IP::canonicalize($_SERVER['REMOTE_ADDR']) );`保存并上传到您的源站 Web 服务器。

##### 对于 1.27.1 相近版本：

1.  找到 `GlobalFunctions.php` 中的第 1232 行，将`REMOTE_ADDR` 更改为 `HTTP_CF_CONNECTING_IP`。
2.  接下来，找到 `WebRequest.php` 中的第 1151 到 1159 行，将 `REMOTE_ADDR`  更改为 `HTTP_CF_CONNECTING_IP`。

某位 Xenforo 用户创建了[适用于 Cloudflare 的插件](https://xenforo.com/community/resources/solidmean-cloudflare-detect.1595/)。

由于此插件是由第三方创建的，我们无法对插件相关的问题提供技术支持。

1.  打开 `library/config.php`。
2.  在末尾处，添加：`if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) { $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];}`
3.  上传并覆盖。

某第三方创建了[适用于 Cloudflare 和 PunBB 的模块](http://punbb.informer.com/forums/post/147539/#p147539)，可以恢复原始访问者 IP。

由于此插件是由第三方创建的，我们无法对插件相关的问题提供技术支持。Cherokee 服务器

1.  在服务器上启动 `cherokee-admin`。
2.  在 Web 浏览器中，导航到 **Cherokee 管理界面**。
3.  针对由 Cloudflare 服务的域，选择 **Virtual Server**。
4.  在所选**虚拟服务器**的 _Logging_ 选项卡中，启用 Accept Forwarded IPs。
5.  在 _Accept from Hosts_ 框中，输入 [Cloudflare 的 IP 地址](https://www.cloudflare.com/ips/)。

您可以通过将 Livezilla 服务器配置中的 `PHP IP Server Param` 字段更改为 `HTTP_CF_CONNECTING_IP` 来修正 IP 地址。

将访问者 IP 恢复到 DataLife Engine：

1.  打开：/engine/inc/include/functions.inc.php找到：`$db_ip_split = explode( ".",$_SERVER['REMOTE_ADDR'] );`更改为：`$db_ip_split = explode(".",$_SERVER['HTTP_CF_CONNECTING_IP'] );`
2.  找到：`$ip_split = explode( ".",$_SERVER['REMOTE_ADDR'] );`更改为：`$ip_split = explode(".",$_SERVER['HTTP_CF_CONNECTING_IP'] );`
3.  打开：/engine/modules/addcomments.php找到：`$_SERVER['REMOTE_ADDR'],`更改为：`$_SERVER['HTTP_CF_CONNECTING_IP'],`
4.  找到：`$db_ip_split = explode( ".",$_SERVER['REMOTE_ADDR'] );`更改为：`$db_ip_split = explode( ".",$_SERVER['HTTP_CF_CONNECTING_IP'] );`

如果您使用托管控制平面 VestaCP，那么您的服务器上将同时运行 Nginx 和 Apache。请求先通过 Nginx 代理，再传到 Apache。

由于存在此 Nginx 代理，您实际上需要按照说明配置 Nginx，从而返回实际的访问者 IP 地址。不需要适用于 Apache 的 [Mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV)，除非您对部分请求禁用了 Nginx 服务器。添加 [mod\_remoteip](https://support.cloudflare.com/hc/articles/200170786#C5XWe97z77b3XZV) 到 Apache 不会与 Nginx 服务器配置产生冲突。

___

## 用 HAProxy 恢复原始访问者 IP

若要提取 X\_FORWARDD\_FOR 标头中的原始客户端 IP，您需要在 HAProxy 中使用以下配置：

1.  创建一个文本文件 `CF_ips.lst`，包含来自 https://www.cloudflare.com/en-gb/ips/ 的所有 IP 范围。
2.  确保在 HAProxy 中禁用 `option forwardfor`

HAProxy 配置：

`acl from_cf src -f /path/to/CF_ips.lst`

`acl cf_ip_hdr req.hdr(CF-Connecting-IP) -m found`

`http-request set-header X-Forwarded-For %[req.hdr(CF-Connecting-IP)]if from_cf cf_ip_hdr`

___

## 相关资源

-   [HTTP 请求标头](/fundamentals/get-started/http-request-headers)
-   [转换规则](/rules/transform/)
