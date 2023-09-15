---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1
title: 了解 Cloudflare Network Analytics v1
---

# 了解 Cloudflare Network Analytics v1

_了解 Magic Transit 和 Cloudflare Spectrum 客户如何使用帐户级 Network Analytics 来探索第 3 层和第 4 层流量和 DDoS 攻击详情。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#7rrlY887ZX7ZDVmx2V4bcm)
-   [查看网络分析](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#7x2T95w9RGgg782pVMujPb)
-   [浏览 Network Analytics](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#h_3WlP6WsWFl28h92oS2k8O2)
-   [对数据应用过滤器](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#h_4Agjkc3QlLuhrCW43NsN3p)
-   [选择要绘图的维度](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#h_4UZtmYClrU0N7OYwZgHHoh)
-   [查看活动日志](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#h_6GOQ2ficyicPxirroGewJP)
-   [导出日志数据和报告](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#h_3grb6OPVreABUQaQBekfHn)
-   [局限性](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#h_6tCVFw0V6ufdvQnRIxu19t)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#7flIreW1Np8fuxZYTbduF2)
-   [常见问题](https://support.cloudflare.com/hc/zh-cn/articles/360038696631-%E4%BA%86%E8%A7%A3-Cloudflare-Network-Analytics-v1#h_2CqXhNxV03M5IUwklSR3n6)

___

## 概述

访问 Network Analytics 具有以下要求：

-   Cloudflare Enterprise 计划
-   Cloudflare [Magic Transit](/magic-transit/) 或 [Spectrum](/spectrum/)。

Cloudflare **Network Analytics** 视图提供对网络层和传输层流量模式及 DDoS 攻击的近实时洞察能力。Network Analytics 可视化呈现数据包和位级别的数据，与通过 [GraphQL Analytics API](/analytics/graphql-api/) 提供的数据相同。

![分析面板显示每个类型的数据包摘要](/images/support/na-main-dashboard.png)

Network Analytics 可以加快恶意流量的报告和调查。您可以按照以下参数来过滤数据：

-   Cloudflare 采取的缓解措施
-   来源 IP、端口、ASN
-   目的地 IP 和端口
-   观察流量的 Cloudflare 数据中心所属的城市和国家/地区
-   攻击规模、类型、速率和持续时间
-   TCP 标志
-   IP 版本
-   协议

使用 Network Analytics 来快速识别重要情报：

-   针对网络的热门攻击手段
-   不同时间的流量缓解，按操作细分
-   攻击来源，按国家/地区或数据中心细分

___

## 查看网络分析

您可以从 Cloudflare 帐户的主页中访问 **Network Analytics** 视图。

若要访问 **Network Analytics** 视图，请按照下列步骤操作：

1.  登录您的 Cloudflare 帐户。
2.  如果您拥有多个帐户，请选择有权访问 Magic Transit 或 Spectrum 的帐户。
3.  在帐户的**主页**中，单击 **Network Analytics**。

___

### 标题摘要和侧面板

标题和侧面板提供**时间范围**下拉列表中所选时间段的活动摘要。

![标题和侧面板汇总过去 24 小时的活动情况](/images/support/na-navigate.png)

标题提供数据包或比特总数，以及检测到并缓解的攻击次数。如果有攻击正在进行当中，标题会显示数据包（或比特）最大速率，而不是总数。

要切换数据视图，可单击**数据包**或**位**侧面板。

### 设置视图的时间范围

使用**时间范围**下拉列表来更改 Network Analytics 显示数据的时间范围。选择时间范围后，整个视图将会更新以反映您的选择。

当您选择_最近 30 分钟_ 时，**Network Analytics** 视图会显示最近 30 分钟的数据，并且每 20 秒刷新一次。统计信息下拉列表旁边会显示_实时_通知，告诉您视图会不断自动更新：

![Network Analytics 中已启用自动刷新](/images/support/hc-dash-Network_Analytics-auto_refresh.png)

如果选择_自定义范围_ 选项，您可以指定最长 30 天的时间范围，这个时间范围可位于过去 365 天中的任意时间段。

### 根据平均速率或总量来查看

从下拉列表中选择一个统计信息，以切换绘制_平均速率_和_总计数_图表。 

### 显示 IP 前缀广告/撤消事件

启用**显示注释**切换开关，以在 **Network Analytics** 视图中显示或隐藏已广告/撤销的 IP 前缀事件的注释。点击各个注释了解详情。

![用于在 Network Analytics 图表中显示注释的开关按钮](/images/support/hc-dash-Network_Analytics-show_annotations.png)

### 放大至“数据包”摘要

在图表的某个区域上点击并拖动鼠标以进行放大。使用此技巧时，您可以放大到短至 3 分钟的时间范围。

![放大至“数据包”摘要 ](/images/support/unnamed.gif)

要放大图表，可单击**时间范围**选择器中的 **X** 图标。

___

## 对数据应用过滤器

您可以应用多个过滤器和排除项，来调整 Network Analytics 中显示的数据范围。

过滤器会作用于 Network Analytics 页面中显示的所有数据。

您可以通过两种方法来过滤网络分析数据：使用**添加过滤器**按钮，或单击某一个**统计过滤器**。

### 使用“添加过滤器”按钮

单击**添加过滤器**按钮，以打开**新建过滤器**弹出窗口。指定字段、运算符和值，以完成过滤器表达式。单击**应用**以更新视图。

应用过滤器时，请遵循以下准则：

-   不支持通配符。
-   不需要将值用引号括起。
-   指定 ASN 编号时，请省略 _AS_ 前缀。例如，请输入 _1423_，而不是 _AS1423_。

### 使用统计过滤器

要基于与 Network Analytics 统计信息之一相关联的数据类型进行过滤，请使用指针悬停在统计信息上时显示的**过滤**和**排除**按钮。

在这个示例中，单击**过滤**按钮会将视图范围缩小到仅与 _Allow_ 操作关联的流量。

### 从应用的筛选器中创建 Magic Firewall 规则

您可以创建一个 [Magic Firewall](/magic-firewall) 规则，以阻止与 Network Analytics 中选定的筛选器匹配的所有流量。目前支持的筛选器有：

-   目的地 IP
-   协议
-   来源数据中心
-   来源 IP
-   TCP 标志

其他类型的 Network Analytics 筛选器不会添加到新的规则定义中，但您可以在 Magic Firewall 中进一步配置该规则。

请执行下列操作：

1\. 在 Network Analytics 中应用一个或多个筛选器。

2\. 点击**创建 Magic Firewall 规则**。

![Network Analytics 中的“创建防火墙规则”链接](/images/support/hc-dash-Network_Analytics-create_firewall_rule.png)

Magic Firewall 规则编辑器显示了选定的筛选器和值。

3\. 在 Magic Firewall 规则编辑器中检查规则定义。

4\. 点击**新建**。

### 支持的过滤器字段、运算符和值

下表显示了可用于过滤 Network Analytics 数据的各种字段、运算符和值。

| 字段 | 运算符 | 价值 |
| --- | --- | --- |
| 
操作

 | 

等于

不等于

 | 

\- 允许：允许通过 Cloudflare 自动化 DDoS 保护系统的流量。还可能包括通过防火墙规则、flowtrackd 和 L7 规则缓解的流量。

\- 阻止：被 Cloudflare 自动化 DDoS 保护系统阻止的流量。

\- 连接跟踪：仅适用于 L7，因为 Magic Transit 被排除在范围之外，而且连接跟踪模块也从未针对 Magic Transit 前缀运行。

\- 速率限制：可以针对每个来源 IP、子网或任何连接应用。其决策根据试探法以编程方式做出。

\- 监控：已识别出但选择只是简单观察而不用任何规则缓解的攻击。

 |
| 

攻击 ID

 | 

等于

不等于

 | 

攻击编号

 |
| 

攻击类型

 | 

等于

不等于

 | 

UDP 洪水

SYN 洪水

ACK 洪水

RST 洪水

LDAP 洪水

圣诞节洪水

FIN 洪水

GRE 洪水

ICMP 洪水

 |
| 

目的地 IP

 | 

等于

不等于

 | 

IP 地址

 |
| 

目的地端口

 | 

等于

不等于

大于

大于或等于

小于

小于或等于

 | 

端口号

端口范围

 |
| 

目的地 IP 范围

 | 

等于

不等于

 | 

IP 范围和掩码

 |
| 

IP 版本

 | 

等于

不等于

 | 

4 或 6

 |
| 

协议

 | 

等于

不等于

 | 

TCP

UDP

ICMP

GRE

 |
| 

来源 ASN

 | 

等于

不等于

 | 

AS 编号

 |
| 

来源国家/地区

 | 

等于

不等于

 | 

国家/地区名称

 |
| 

来源数据中心

 | 

等于

不等于

 | 

数据中心位置

 |
| 

来源 IP

 | 

等于

不等于

 | 

IP 地址

 |
| 

来源端口

 | 

等于

不等于

大于

大于或等于

小于

小于或等于

 | 

端口号

端口范围

 |
| 

TCP 标志

 | 

等于

不等于

包含

 | 

SYN、SYN-ACK、FIN、ACK、RST

 |

___

## 选择要绘图的维度

您可以沿着各种维度来绘制 Network Analytics 数据的图表。默认情况下，Network Analytics 会显示按操作细分的数据。

选择其中一个**摘要**选项卡，以查看不同维度的数据。

![跨越多个维度直观呈现数据](/images/support/unnamed__1_.gif)

您可以从以下选项中选择：

-   操作
-   攻击类型
-   目的地 IP
-   目的地端口
-   IP 版本
-   协议
-   来源 ASN
-   来源国家/地区
-   来源数据中心
-   来源 IP
-   来源端口
-   TCP 标志

### 共享 Network Analytics 过滤器

在 Network Analytics 页面中添加过滤器并指定时间范围时，URL 会更改以反映这些参数。

要共享您的数据视图，请复制 URL 并将其发送给其他用户，这样他们就能使用同一个视图。

![选择 Network Analytics 页面的 URL](/images/support/hc-dashboard-network-analytics-6.png)

___

## 查看活动日志

Network Analytics **活动日志**显示当前选定时间范围内最多 500 个日志事件，每个时间范围视图中每页显示 10 个结果。（[GraphQL Analytics API](/analytics/graphql-api/) 没有此限制。）

要显示事件详情，请点击与事件关联的扩展小部件。

### 配置列

要配置活动日志中显示哪些列，可单击**编辑列**按钮。

当您希望识别 DDoS 攻击时，此功能特别有用。在过程当中，您可以指定所需的属性，例如 IP地址、最大比特率和攻击 ID 等。

### 查看排行榜

**源国家/地区**、**源**和**目的地**面板中显示各个视图中排名在前的项目。

若要选择显示的项目数，请使用与视图关联的下拉列表。

要查看排名在前的数据中心，请从**源国家/地区**视图的下拉列表中选择_数据中心_。**源数据中心**视图将取代**源国家/地区**视图。

___

## 导出日志数据和报告

### 导出活动日志数据

一次最多可以从活动日志中导出 500 个源事件。如果需要将 Cloudflare 数据与存储在其他系统或数据库（例如安全信息与事件管理系统（SIEM））中的数据进行合并和分析，您可以使用这个选项。

要导出日志数据，可单击**导出**。

选择 CSV 或 JSON 格式，以呈现导出的数据。下载的文件名将反映所选的时间范围，格式如下：

_network-analytics-attacks-\[开始时间\]-\[结束时间\].json_

### 导出 Network Analytics 报告

要从 **Network Analytics** 中打印或下载快照报告，请按照以下步骤操作：

单击**打印报告**。Web 浏览器的打印界面中显示用于打印或另存为 PDF 的选项。

___

## 局限性

Network Analytics 目前具有以下限制：

-   Network Analytics v1 提供有关[拒绝服务后台程序（dosd）](https://blog.cloudflare.com/who-ddosd-austin/)攻击的见解。尽管它可适时提供数据视图，但没有所有事件的完整视图。
-   Network Analytics v1 中不提供下列数据源：
    -   防火墙规则 _（在 Network Analytics v2 中提供）_
    -   应用程序层规则
    -   Gatekeeper 和手动应用的规则
    -   [flowtrackd](https://blog.cloudflare.com/announcing-flowtrackd/)（高级 TCP 保护）_（在 Network Analytics v2 中提供）_
    -   WARP 流量和[橙色云流量](https://support.cloudflare.com/hc/zh-cn/articles/205177068)
-   Network Analytics 不提供来自用于代理流量的 Cloudflare 服务的数据，如 CDN。

___

## 相关资源

-   [Cloudflare Network Analytics v2](/analytics/network-analytics/)
-   [从 Network Analytics v1 迁移至 Network Analytics v2](/analytics/graphql-api/migration-guides/network-analytics-v2)
-   [Cloudflare GraphQL API](/analytics/graphql-api/)
-   [Cloudflare Analytics：快速概览](https://support.cloudflare.com/hc/articles/360037684111)
-   [IANA 端口号和服务名称](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=1)

___

## 常见问题

### Cloudflare 在 Network Analytics 门户网站中将数据保留多久时间？

如果您使用的是 Network Analytics v2 (NAv2)，您可以查询的历史数据范围是 **90 天**。

Network Analytics v1 (NAv1) 使用 GraphQL 节点将数据汇总为 1 分钟、1 小时和 1 天 IP 流。例如，ipFlows1mGroups 节点存储以分钟为单位聚合的数据。

要确定在 NAv1 中您可以查询的历史数据范围，请参考以下表格。_**notOlderThan**_ 列可用作保留时间指标。

| 
GraphQL 数据节点

 | 

maxDuration\*

 | 

notOlderThan\*\*

 | 

Network Analytics 中的时间范围选择

 | 

数据点数量

 |
| --- | --- | --- | --- | --- |
| 

ipFlows1mGroups

 | 

25 小时

 | 

30 天

 | 

30 分钟

 | 

30

 |
| 

6 小时

 | 

71

 |
| 

12 小时

 | 

48

 |
| 

24 小时

 | 

96

 |
| 

ipFlows1dGroups

 | 

6 个月

 | 

1 年

 | 

1 周

 | 

168

 |
| 

1 个月

 | 

30

 |

_**\*maxDuration**_ _定义可在一个查询中请求的时间窗口（因数据节点而异）。_

_**\*\*notOlderThan**_ _限制查询可以搜索的记录时间范围。它指示数据在我们数据库中保留了多长时间。_

在操作仪表板中的攻击日志时，请记住以下几点：

-   攻击日志中会存储开始和结束时间戳，最小、最大和平均数据速率的数据包和比特数统计信息，以及总数、攻击类型和采取的操作。
-   来源 IP 地址被视为个人个识别信息。因此，Cloudflare 仅将它们存储 30 天。30 天后，来源 IP 地址会被丢弃，并且日志将先汇总为 1 小时分组，然后汇总为 1 天分组。1 小时汇总将存储 6 个月，1 天汇总则存储 1 年。

如需有关查询和访问日志数据的更多信息，请参考 [GraphQL Analytics API](/analytics/graphql-api/limits)。

### 为什么 Network Analytics 表示目的地 IP 的状态是“不可用”？

当目的地 IP 没有包含在 [DDoS 保护系统](https://blog.cloudflare.com/mitigating-a-754-million-pps-ddos-attack-automatically/)生成的实时签名中时，该目的地 IP 就会显示为_不可用_。

若要查看目的地 IP，请按**攻击 ID** 过滤，然后滚动到顶部项目列表的**目的地**部分。对某个特定的攻击 ID 进行过滤时，整个 Network Analytics 仪表板就变成了一份攻击报告。
