---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/228503147-%E5%8A%A0%E5%BF%AB-WordPress-%E5%B9%B6%E6%8F%90%E9%AB%98%E6%80%A7%E8%83%BD
title: 加快 WordPress 并提高性能
---

# 加快 WordPress 并提高性能

## 加快 WordPress 并提高性能

_了解如何加快 WordPress 并提高性能。_

___

Cloudflare 的 CDN 服务可以帮助在我们庞大的全球网络中缓存您的内容，但性能不仅仅是将静态文件移动到离访问者更近的地方。Cloudflare 提供的不仅仅是 CDN，Cloudflare 的优化功能还可以让您提高 WordPress 站点的性能，超越传统 CDN 的功能。

### 缓存匿名页面访问量

![Creating a cache rule for anonymous page views.](/images/support/hc-import-screen_shot_2017_03_09_at_16_54_36_1_.png)

Cloudflare 的“[Bypass Cache on Cookie](https://support.cloudflare.com/hc/en-us/articles/236166048)”功能允许 Cloudflare 完全缓存未登录的页面。这意味着您的服务器可以节省时间和资源，无需重新生成 HTML 实际上是静态的页面，同时不会干扰动态行为 - 只要用户登录 WordPress 控制面板或向 WooCommerce 添加内容，即可绕过Edge Cache。

### 优化图像

图像可能会极大增加页面加载时间；幸运的是，Cloudflare 可以帮助显著缩短图像加载时间。您可以在 Cloudflare 仪表板的 **Speed** **应用** > **优化** 中找到这些功能。

在启用 **Polish** 后，您可以压缩图像和删除元数据来显著缩短图像和网页加载时间。无锁优化将剥离大部分元数据，如 EXIF 数据，但不会改变图像细节。有损优化将剥离大部分元数据，同时将图像压缩约 15%。

![The different options you have to configure Cloudflare Polish.](/images/support/hc-import-cms_wordpress_polish.png)

如果您希望针对移动访问者优化您的站点，启用 **Mirage 图像优化**将允许根据最终用户网络连接和设备类型优化和交付图像：

![Enable Mirage to optimize images for mobile visitors.](/images/support/hc-import-screen_shot_2016_09_30_at_15_29_04.png)

### 启用 HTTP/2

**HTTP/2** 可实现多种性能功能，包括多路复用、标头压缩。要在 WordPress 站点上启用 HTTP/2，请确保您的站点已通过 HTTPS 加载。

**启用 SSL** 后，还必须确保将用户重定向到 HTTPS 版本，以便可以通过 HTTP/2 加载。您可以使用 _Always use HTTPS_ **Page Rule** 来执行此操作：

![Create a page rule to ensure your Wordpress website is correctly loaded over HTTP/2](/images/support/hc-import-screen_shot_2016_09_30_at_15_34_14.png)

Cloudflare 的 **WordPress 插件**允许您使用 HTTP/2 服务器推送向用户推送必要的资产，从而大幅减少加载 CSS 和 JavaScript 所需的往返次数。有关设置的教程，请参阅[如何在 WordPress 中启用 HTTP/2 服务器推送指南](https://support.cloudflare.com/hc/articles/115002816808)。

### Minify Assets

Cloudflare 能够有效地压缩 JS、CSS 和 HTML，而无需更改您的网站。我们建议您在 Cloudflare 控制面板中启用极简化功能，而不是在您的站点上安装插件以实现相同目的。或者，如果您使用 Grunt 或 Gulp 作为构建过程的一部分，则可以将极简化作为其中的一部分来实现。

由于 HTTP/2 多路复用请求，我们建议不要将 CSS 或 JavaScript 文件连接在一起，或在服务器上安装任何可能执行此操作的内容。

### 高级性能工具

-   Business 和 Enterprise 客户可以使用 Cloudflare 的 [Railgun Origin Network Optimizer](https://www.cloudflare.com/website-optimization/railgun/)。
-   Enterprise 用户可以使用“Prefetching URLs From HTML Headers”和 Custom Cache Keys 来提升缓存性能 - 请联系您指定的客户经理以获取设置帮助，如果您还不是 Enterprise 客户，请[联系我们的销售团队](https://www.cloudflare.com/enterprise-free-trial/)。
