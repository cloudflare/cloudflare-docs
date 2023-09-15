---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360037684251-%E4%BA%86%E8%A7%A3-Cloudflare-Site-Analytics
title: 了解 Cloudflare Site Analytics
---

# 了解 Cloudflare Site Analytics

## 了解 Cloudflare Site Analytics

_Cloudflare (Site) Analytics 应用可帮助您深入了解您的 Cloudflare 帐户中各个网站。这些指标包括针对 Web 流量、安全性、性能、DNS 和 Workers 的请求和响应数据。_

___

## 概述

Cloudflare Dashboard (Site) **Analytics** 应用是整个 Cloudflare 分析产品线的一个重要组件。具体来说，您可通过此应用访问在网站或域名级别上收集的广泛指标。

___

## 查看您的网站分析结果

要查看您网站的指标，请执行以下操作：

1.  登录 Cloudflare 仪表板。
2.  单击与您网站对应的 **Cloudflare 帐户**，然后选择**域名**。
3.  接下来，单击 **Analytics** 应用图标。

加载之后，Analytics 应用会显示一组用于**流量**、**安全性**、**性能**、**DNS**、**Workers** 和**日志**（仅限 Enterprise 域）的选项卡。要了解可用的各项指标，请参阅下面的_检查您的网站指标_。

![Cloudflare Dashboard 中显示 Web 流量数据的 Analytics 应用 UI](/images/support/hc-dash-analytics-dashboard_overview.png)

Pro、Business 和Enterprise 计划客户可以在“流量”选项卡下查看最新的 Web 分析数据。

![屏幕截图中显示 Pro、Business 和 Enterprise 客户使用 Cloudflare Analytics 仪表板时的用户界面。](/images/support/hc-dash-analytics-web_traffic.png)

___

## 查看您的指标

本节概述了各个 Analytics 应用选项卡下提供的指标。在继续之前，请注意每个选项卡可能包含：

-   一个或多个面板，用来进一步分类基本指标；以及
-   一个下拉菜单（面板右上角），用来过滤特定时间段的指标。您可以选择的时间段可能会根据域所关联的 Cloudflare 计划而有不同。

下方是每个 Analytics 应用选项卡的摘要。

### 流量

#### Free 计划

这些指标不仅包括合法用户请求，也包括爬网程序和威胁。“流量”选项卡具有以下面板：

-   **Web 流量** - 显示_请求_、_带宽_，_唯一访问者_和[_状态代码_](https://support.cloudflare.com/hc/articles/206973867-Status-code-metrics-in-Cloudflare-Site-Analytics)的指标。请注意，如果您使用 Cloudflare Workers，则 **Workers** 选项卡下也提供子请求分析。
-   **各国家/地区 Web 流量请求** - 一幅交互式地图，按照国家/地区细分请求数量。此面板还包括**热门流量国家/地区**数据表，显示请求数最多的国家/地区（最多为五个，但要存在数据）。
-   **分享您的统计数据 -** 您可在社交媒体（Twitter）上分享以下实际站点统计信息：_保存的字节_、_服务的 SSL 请求_和_阻止的攻击_。

#### Pro、Business 或 Enterprise 计划

分析数据基于 Cloudflare 的边缘日志，不需要第三方脚本或跟踪程序。“流量”选项卡提供以下指标：

-   **访问数** - 访问数定义为源自一个独立网站或直接链接的页面浏览量。Cloudflare 会检查 HTTP 引荐来源与主机名不匹配的地方。一次访问可以包含多次页面浏览。
-   **页面浏览量** - 页面浏览定义为内容类型为 HTML 的一次成功 HTTP 响应。 
-   **请求数** - HTTP 请求。一次典型的页面浏览需要多个请求。
-   **数据传输量** - 请求中传输的 HTTP 数据总量。

要查看更多详细指标，请**添加过滤器**。您还可以按照**引荐来源**、**主机**、**国家/地区**、**路径**、**状态代码**、**源站状态代码**、**浏览器**、**操作系统**或**设备类型**来过滤各项指标。

要更改时间段，请使用图表上方右侧的下拉菜单。您也可以拖动来放大图表。

### 安全

对于这个选项卡，图表数量和类型可能会根据现有数据和客户计划而有不同。此选项卡中的大部分指标来自 Cloudflare Firewall 应用。提供的面板包括：

-   **威胁** - 显示了说明网站所遭受威胁的数据摘要和面积图。
-   **各国家/地区的威胁** - 一幅交互式地图，突出显示了威胁的来源国家/地区。它还包括统计了**热门威胁国家/地区**和**热门爬网程序/机器人**的数据表。
-   **速率限制**（附加服务）- 提供突出显示匹配和阻止的请求的折线图，以速率限制为基础。要了解更多信息，请参阅 [Rate Limiting Analytics](https://support.cloudflare.com/hc/zh-cn/articles/115003414428-Rate-Limiting-Analytics)。
-   **概述** - 显示一系列饼图：**已停止威胁总数**、**Traffic Served Over SSL** 以及**缓解的威胁类型**。如果可用，展开**详细信息**链接可显示带有数字数据的表格。

### 性能

此选项卡下汇总的指标跨越多项 Cloudflare 服务。提供的面板包括：

-   **源服务器性能（Argo）**（附加服务） - 显示有关最近 48 小时 Cloudflare 边缘网络和源服务器之间响应时间的指标。如需更多详细信息，请参阅 [Argo Analytics](https://support.cloudflare.com/hc/articles/115001255631-Argo-Analytics)。
-   **概述** - 显示一系列饼图：**使用的客户端 HTTP 版本**、**节省的带宽**和**内容类型明细**。如果可用，展开**详细信息**链接可显示带有数字数据的表格。

### DNS

DNS 选项卡显示 DNS 查询的一些统计信息。请注意，只要 Cloudflare 是站点的权威 DNS 服务器，就会提供这些指标，即使站点不由 Cloudflare 代理也是如此。因此，不面向具有 [CNAME 设置](https://support.cloudflare.com/hc/articles/360020348832-Understanding-a-CNAME-Setup)的站点提供 DNS 指标。

DNS 选项卡提供的指标面板包括：

-   **DNS 查询** - 显示 DNS 记录指标的多种面积图和数据表，包括按_响应代码_和_记录类型_划分的查询，以及返回 _NXDOMAIN_ 响应（DNS 记录不存在）的记录。您可以通过在靠近顶部的下拉列表中输入记录名称（例如，www.example.com），按照一个或多个 DNS 记录进行过滤。
-   **各数据中心的 DNS 查询** - 供您查看 Cloudflare数据中心之间的 DNS 查询分布。指标显示为交互式地图和数据表，并包含_流量_、_NXDOMAIN_ 和 _NOERROR_ 的统计信息。

### Workers

此面板提供 Cloudflare Workers 的指标。要了解更多信息，请阅读 [Cloudflare 分析和 Workers](https://support.cloudflare.com/hc/articles/360007553512-Cloudflare-analytics-with-Workers)。

### 日志

“日志”选项卡不是指标功能。不过，Enterprise 计划客户可以启用 [Cloudflare Logs Logpush](/logs/about/) 服务。通过 Logpush 服务，您可以使用自选的任何分析工具来下载和分析数据。

___

## 相关资源

-   [Cloudflare Analytics：快速概览](/analytics)
-   [Cloudflare Analytics GraphQL API](/analytics/)
