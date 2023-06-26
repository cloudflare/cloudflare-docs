---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360057976851-%E4%BD%BF%E7%94%A8-Cloudflare-%E4%BA%A4%E4%BB%98%E8%A7%86%E9%A2%91
title: 使用 Cloudflare 交付视频
---

# 使用 Cloudflare 交付视频

## 使用 Cloudflare 交付视频

### 本文内容

-   [使用 Cloudflare 服务](https://support.cloudflare.com/hc/zh-cn/articles/360057976851-%E4%BD%BF%E7%94%A8-Cloudflare-%E4%BA%A4%E4%BB%98%E8%A7%86%E9%A2%91#h_5mvWTaW0VyVyibnzFh5EK3)
-   [我是网站运营商，我的内容由于违反服务条款而被重定向](https://support.cloudflare.com/hc/zh-cn/articles/360057976851-%E4%BD%BF%E7%94%A8-Cloudflare-%E4%BA%A4%E4%BB%98%E8%A7%86%E9%A2%91#h_17ENJA5McX8FiFmwFhbacY)
-   [我是网站访问者，我要访问的网站显示一条引用 Cloudflare 服务条款的消息，而不是我期望的内容](https://support.cloudflare.com/hc/zh-cn/articles/360057976851-%E4%BD%BF%E7%94%A8-Cloudflare-%E4%BA%A4%E4%BB%98%E8%A7%86%E9%A2%91#h_ktzs0UjPIhrLq0EKVFhR3)
-   [我是网站运营商，我担心违反服务条款](https://support.cloudflare.com/hc/zh-cn/articles/360057976851-%E4%BD%BF%E7%94%A8-Cloudflare-%E4%BA%A4%E4%BB%98%E8%A7%86%E9%A2%91#h_6B1A8c4GYUXZXtvk5nB6DI)

___

Cloudflare 于 2010 年成立，坚信人人都应享有安全、快速、可靠的 Web 展示。我们认为，遭受网络攻击时您不应被迫支付更多费用，因此我们面向网站提供免费和固定价格两种定价模式。之所以可行，是因为大多数网站不会占用太多带宽，我们能够以经济实惠的方式向所有人提供服务。从最初开始，我们就禁止利用我们的带宽来流式传输视频内容。虽然您可以嵌入来自其他提供商的视频，但我们限制您使用我们的服务将视频片段从我们的网络交付给您的访问者。其原因在于，典型视频的每一秒都需要与加载完整网页一样多的带宽。

随着时间推移，我们意识到一些客户希望使用我们的网络来流式传输视频。为满足这些需求，我们开发了 [Stream](https://www.cloudflare.com/products/cloudflare-stream/) 产品。Stream 提供出色的性能，并以实惠的价格基于您给我们网络的负载收取费用。

遗憾的是，尽管大多数人尊重这些限制并理解其宗旨是确保让所有 Cloudflare 客户享受到高质量的服务，但部分用户意图违反我们的服务条款，将我们的服务不当配置为用于流式传输视频。我们希望确保我们的服务给每一个人带来出色的体验，我们也开展了[伽利略计划](https://www.cloudflare.com/galileo/)、[雅典项目](https://www.cloudflare.com/athenian/)和 [Fair Shot 项目](https://www.cloudflare.com/fair-shot/)等公共服务计划。少数人滥用我们的服务限制了我们开展这些计划的能力。

下面提供了一些 Cloudflare 服务使用建议，请根据进入此页面的原因加以参考。

___

## 我是网站运营商，我的内容由于违反服务条款而被重定向

如果您在使用 Free、Pro 或 Business 计划，并且提供视频或过多数量的非 HTML 内容（如软件二进制文件或大量图像），因而违反[自助订阅协议第 2.8 节](https://www.cloudflare.com/terms/)，Cloudflare 可能会将您的内容重定向到替换视频和图像。发生这种情况时，您会收到一封电子邮件通知，内含有关违反服务条款的区域的信息。请勿尝试规避重定向，否则可能会导致您以后彻底不能使用 Cloudflare。

## 网络管理员解除重定向的选项 

-   **从灰色云子域提供重定向内容**
    -   根据 Cloudflare 自助服务条款（TOS）第 2.8 节，用户如果没有订购含有相关服务的付费计划，不得提供过多数量的非 HTML 内容，例如图像和视频。TOS 第 2.8 节中规定的限制不适用于从灰色云（非代理）子域提供内容。

-   **从下述付费服务提供重定向内容**

## 利用付费产品来通过 Cloudflare 交付视频

Cloudflare 允许通过特定的付费服务交付视频内容。如果您有兴趣提供视频内容，可从两个建议选项中选择。

### 选项 1：Cloudflare Stream 

[Stream](https://www.cloudflare.com/products/cloudflare-stream/) 是用于构建视频应用程序的视频点播平台。Stream 可以编码、存储和交付针对不同设备和网络连接格式化的优化视频。

要开始使用 Stream，请从仪表板访问 **Stream** [或注册帐户](https://dash.cloudflare.com/sign-up/stream)。Stream 视频不会附加到 Cloudflare 帐户中的域，您也不需要在 Cloudflare 上拥有域便能用 Stream。

### 选项 2：Stream Delivery（仅限 Enterprise）

[Stream Delivery](https://www.cloudflare.com/products/stream-delivery/) 通过遍布全球的 Cloudflare 数据中心高速缓存和交付视频内容。此 CDN 功能仅面向 Cloudflare Enterprise 计划。若要了解此选项，请[联系销售团队](https://www.cloudflare.com/products/stream-delivery/#)。

___

## 我是网站访问者，我要访问的网站显示一条引用 Cloudflare 服务条款的消息，而不是我期望的内容

如果网站运营商违反[自助订阅协议（TOS）的 2.8 节](https://www.cloudflare.com/terms/)，并且没有购买适当的付费产品来交付您尝试访问的内容，则可能发生这种情况。

我们已告知网站运营商有关违规的信息，以及他们可以如何恰当使用 Cloudflare 服务来交付您所请求的内容。遗憾的是，除非网站运营商采取改正措施（例如购买经授权可通过 Cloudflare 网络交付视频内容的产品），否则我们无法解除这些限制。

在此期间您可以做的事情：

1.  告知网站运营商首先要遵守促成我们提供低成本服务的规则。
2.  详细了解 Cloudflare 采取哪些行动来帮助建设更加美好的互联网，例如[伽利略计划](https://www.cloudflare.com/galileo/)、[雅典项目](https://www.cloudflare.com/athenian/)和 [Fair Shot 项目](https://www.cloudflare.com/fair-shot/)。

安装 [1.1.1.1](https://1.1.1.1/)，以享受更加私密、安全的互联网体验。

___

## 我是网站运营商，我担心违反服务条款

Free、Pro 或 Business 计划用户如果提供视频或过多数量的非 HTML 内容，可能会违反[自助订阅协议（TOS）第 2.8 节](https://www.cloudflare.com/terms/)。要提供视频或大量非 HTML 内容，建议您使用上述付费选项之一。

## 获取有关您要交付的内容的信息

如果需要更多有关您的区域正在提供的内容的信息（例如，内容类型），您可以使用以下工具：

-   Cache Analytics 用户：打开仪表板上的**高速缓存**选项卡，以按内容类型筛选并确定您在传输的流量类型。
-   没有 Cache Analytics 的用户：打开仪表板上的**分析**选项卡，然后选择**性能**部分以获取有关您在提供的内容的信息。

![Cache Analytics - 确定所传输流量的类型](/images/support/traffic-types.png)

## 仍有问题？请联系支持团队

如果您对重定向有其他疑问（例如，如果认为您的内容被错误地重定向并且有支持证据），请提交[支持工作单](https://dash.cloudflare.com/redirect?account=support)并附上以下信息：

-   您的域名
-   问题的描述
-   您通过 Cloudflare 网络提供的内容的说明
