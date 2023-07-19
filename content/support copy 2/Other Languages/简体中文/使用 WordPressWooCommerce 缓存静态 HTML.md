---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/236166048-%E4%BD%BF%E7%94%A8-WordPress-WooCommerce-%E7%BC%93%E5%AD%98%E9%9D%99%E6%80%81-HTML
title: 使用 WordPressWooCommerce 缓存静态 HTML
---

# 使用 WordPress/WooCommerce 缓存静态 HTML

## 使用 WordPress/WooCommerce 缓存静态 HTML

通过使用我们的_Bypass Cache on Cookie_ 功能，**Cloudflare Business 和 Enterprise 计划客户**能够在使用 WordPress 时缓存匿名页面浏览量。这可使静态 HTML 在我方站点进行缓存，无需在不同请求之间重新生成它。本教程将帮助您使用 WordPress 和 WooCommerce 对其进行设置。 

Enterprise Cloudflare 客户可使用_Custom Cache Keys_来进一步提升性能，有关更多详细信息，请联系您的客户经理。

在开始之前，务必确保将 Cloudflare 设置为遵循来自原始 Web 服务器的 _Cache-Control_ 标头；否则，您可能发现 _Cache-Control_ 标头被 Cloudflare 使用在**Browser Cache Expiration**选项中设置的值覆盖。要设置_Respect Existing Headers_选项，请访问 Cloudflare 控制面板中的**Caching**应用：

![](/images/support/Screen_Shot_2016-12-21_at_01.58.16.png)

向下滚动页面，找到**Browser Cache Expiration**选项，然后选择_Respect Existing Headers_值：

![](/images/support/Screen_Shot_2016-12-20_at_23.22.51.png)

完成此操作后，设置**Bypass Cache on Cookie** 规则。您可以在 Cloudflare 控制面板的**Page Rules**应用中执行此操作：

![](/images/support/VFGgnIk.png)

下一步，单击**Create Page Rule**，以便设置在我们站点上进行的静态 HTML 缓存。

第一步实际上是设置页面规则，以便匹配您的 WordPress 安装路径。如果您的站点位于 https://www.example.com，则该规则将为为 [https://www.example.com。](https://www.example.com./)

在此处的示例中，WordPress 正在 https://junade.com 上运行，因此 Page Rule 应与 https://junade.com/\* 相匹配。

![Screen_Shot_2017-03-09_at_16.54.36.png](/images/support/Screen_Shot_2017-03-09_at_16.54.36.png)

然后，您可以设置要应用的规则。

_Cache Everything_将指示 Cloudflare 缓存静态 HTML。

当_Bypass Cache on Cookie_ 规则与您设置的条件相匹配时，Cloudflare 将不会缓存 HTML（[而静态图像和其他文件仍将被缓存](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-)）。根据您正在使用原始 WordPress 还是 WooCommerce，您应使用以下配置之一：

<table><tbody><tr><td>WordPress（原生）</td><td>wp-.*|wordpress.*|comment_.*</td></tr><tr><td>具有 WooCommerce 的 WordPress &nbsp; &nbsp;</td><td>wp-.*|wordpress.*|comment_.*|woocommerce_.*</td></tr></tbody></table>

最后，设置_Edge Cache TTL_ 将定义 Cloudflare 在将缓存文件从原始 Web 服务器取回前应保留这些文件的最长时间。即使在设置了较长的边缘缓存 TTL 时间后，您仍能够[手动清除缓存](https://support.cloudflare.com/hc/en-us/articles/200169246-How-do-I-purge-my-cache-)，或者使用我们的 WordPress 插件自动管理缓存清除。

下一步，单击**Save and Deploy**，大功告成！

此外，通过使用 Cloudflare WordPress 插件的[_Automatic Cache Management_功能](https://support.cloudflare.com/hc/en-us/articles/115002708027-What-does-Automatic-Cache-Management-in-the-Cloudflare-Plugin-do-)，您还能够在您站点更改（即，更改/自定义您的主题或，或者编辑、删除或创建帖子、附件或页面）后自动为您站点清除缓存。
