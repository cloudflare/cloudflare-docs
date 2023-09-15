---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200169466-%E6%88%91%E5%8F%AF%E4%BB%A5%E5%B0%86-Cloudflare-%E4%B8%8E-WebSockets-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8%E5%90%97-
title: 我可以将 Cloudflare 与 WebSockets 一起使用吗？
---

# 我可以将 Cloudflare 与 WebSockets 一起使用吗？

## 我可以将 Cloudflare 与 WebSockets 一起使用吗？

可以，所有 Cloudflare 客户可以使用WebSockets，按套餐计划分配并发连接。了解有关 [WebSockets](https://www.cloudflare.com/websockets/) 的更多信息以及该协议的最常见用法。

WebSockets 是客户端和源服务器之间持续的开放连接。在 WebSockets 连接中，客户端和源服务器可以来回传递数据，而无需重新建立会话。用户可以在 WebSockets 连接中快速交换数据。WebSockets 通常用于在线聊天和游戏等实时应用程序。

对于_我的_网站，我需要参加什么计划？

<table><tbody><tr><td><strong>Cloudflare 计划</strong></td><td><strong>并发连接<br>容量</strong></td><td><strong>示范用例</strong></td></tr><tr><td>Free</td><td>低</td><td>兴趣爱好或演示网站</td></tr><tr><td>Pro</td><td>中</td><td>项目或小型企业</td></tr><tr><td>Business</td><td>高</td><td>对运营至关重要的业务</td></tr><tr><td>Enterprise</td><td>定制</td><td>关键任务和大容量</td></tr></tbody></table>

为什么这些容量限制不是具体的数字？

Cloudflare 为 Enterprise 客户支持几个高容量、关键任务的 WebSockets 应用程序。

自 2014 年[引入 WebSockets 支持](https://blog.cloudflare.com/cloudflare-now-supports-websockets/)以来，Cloudflare 的网络地图几乎增加了两倍，从 28 个地点增加到 150 多个（2018 年中期）。在所有地点，我们都添加了计算资源和多个 1 级带宽提供商。

我们对现在向所有客户提供 WebSockets 的能力充满信心，但我们也在充分考虑按计划级别分配资源（包括 WebSockets 连接）。因此，我们从指南开始，将从客户的采用中吸取经验。

我们启用优化互联网的现代技术。最好的方法是让客户参与、成长和蓬勃发展。

如果我的网站使用的并发 WebSockets 连接比 Cloudflare 预期多，会怎么样？

没有任何问题。在合理范围内，Cloudflare 允许在我们的基准之外偶尔出现使用高峰，而且也不会采用不必要的限制。

如出现反复性高峰或持续的高使用量，我们将与您协商：我们将联系您，以了解有关您应用程序的更多信息。除非滥用或攻击，否则我们不会在未联系客户的情况下，对任何应用程序施加限制导致报错。

如果客户的使用量占用与其当前计划级别不相称的资源，则可能会要求他们升级到符合其需求的计划级别。

如何在 Cloudflare 中使用 WebSockets？

通过 Cloudflare 发送 WebSockets 流量无需其他配置。Cloudflare 将立即开始将您的 WebSockets 代理到您的源服务器。 

我可以通过 SSL 使用 WebSockets 吗？

可以。通过 Cloudflare 的 WebSockets 与 Cloudflare 的 SSL 完全兼容，并且支持 wss 方案。

技术说明

当 Cloudflare 向其全球网络发布新代码时，我们可能会重新启动服务器，从而终止 WebSockets 连接。
