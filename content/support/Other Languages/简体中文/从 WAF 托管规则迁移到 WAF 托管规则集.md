---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/5995821690637-%E4%BB%8E-WAF-%E6%89%98%E7%AE%A1%E8%A7%84%E5%88%99%E8%BF%81%E7%A7%BB%E5%88%B0-WAF-%E6%89%98%E7%AE%A1%E8%A7%84%E5%88%99%E9%9B%86
title: 从 WAF 托管规则迁移到 WAF 托管规则集
---

# 从 WAF 托管规则迁移到 WAF 托管规则集

## 从 WAF 托管规则迁移到 WAF 托管规则集

_Cloudflare 将允许客户开始将其区域从 WAF 托管规则迁移到新的 WAF 托管规则集。_

___

## 概述

2022 年 5 月 4 日，Cloudflare 将开始 [WAF 迁移](https://support.cloudflare.com/hc/articles/200172016)的第一阶段，从 WAF 托管规则迁移到新的 [WAF 托管规则集](https://developers.cloudflare.com/waf/managed-rulesets/)。您将能够在 Cloudflare Dashboard 中为您符合条件的区域开始迁移过程。 WAF 托管规则集具备以下优势：

-   提升检测性能
-   提高配置灵活性（定义自定义 WAF 筛选器，配置全局规则集覆盖）。
-   更好的用户体验
-   访问[暴露凭据检查](https://developers.cloudflare.com/waf/managed-rulesets/exposed-credentials-check/)

目前，迁移过程始终是由您在 Cloudflare Dashboard 中启动的。**迁移是不可逆的** — 一旦迁移到新的 WAF 托管规则集，您就不能再次使用 WAF 托管规则了。 将区域迁移到新的 WAF 托管规则集后，Cloudflare Dashboard 中的**托管规则**选项卡（位于**安全性** > **WAF** > **托管规则**中）将显示一个新界面，并且 WAF 托管规则 API 将停止工作。

___

## 迁移影响

您当前的托管规则配置将迁移到 WAF 托管规则集配置中，因此当您迁移到新的 WAF 时，您的区域将获得同样的保护措施。

Cloudflare 建议您在迁移后的几天内检查 Firewall Analytics 中的[**活动日志**](https://developers.cloudflare.com/waf/analytics/paid-plans/#activity-log)，寻找被 WAF 托管规则集阻止的任何合法请求。如果您发现任何被不当阻止的请求，可以将相应的 WAF 规则操作调整为 _Log_。如需详细了解如何更改“托管规则集”规则的操作，请参阅 WAF 文档中的[配置托管规则集中的单个规则](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-single-rule-in-a-managed-ruleset)。

### Cloudflare Dashboard 更改

迁移完成后，Cloudflare Dashboard 将显示 WAF 托管规则集界面（位于**安全性** > **WAF** > **托管规则**中），您可以在其中部署托管规则集并调整其配置。

![迁移到 WAF 托管规则集后，Cloudflare Dashboard 将显示一个新的界面，您可以在其中将托管规则集部署到您的区域。](/support/static/waf-migration-dashboard-differences.png)

与 WAF 托管规则不同的是，新界面中没有可启用 WAF 的全局开关按钮。您需要在您的区域内分别部署每个 WAF 托管规则集。

关于在仪表板中配置 WAF 托管规则集的更多详情，请参阅开发者文档中的[在仪表板中为区域部署托管规则集](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/)。

### API 更改

迁移后，与 WAF 托管规则交互的 API **将停止工作**。这些 API 如下所示：

-   [WAF 规则包](https://api.cloudflare.com/#waf-rule-packages-properties)
-   [WAF 规则组](https://api.cloudflare.com/#waf-rule-groups-properties)
-   [WAF 规则](https://api.cloudflare.com/#waf-rules-properties)

要与 WAF 托管规则集进行交互，您必须使用[规则集 API](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/)。关于通过 API 部署 WAF 托管规则集的更多详情，请参阅开发者文档中的[通过 API 部署规则集](https://developers.cloudflare.com/waf/managed-rulesets/deploy-api/)。

___

## 符合条件的区域（第 1 阶段）

迁移将分阶段进行。从 2022 年 5 月 4 日开始，迁移将覆盖部分符合条件的区域，并将逐步覆盖所有符合条件的区域。

在第 1 阶段，您可以迁移满足以下要求的区域：

-   该区域：
    -   禁用了 WAF，或
    -   启用了 WAF 并且仅启用了 Cloudflare 托管规则集（必须禁用 OWASP ModSecurity 核心规则集）。
-   该区域没有绕过、启用或禁用 WAF 托管规则的[防火墙规则](https://developers.cloudflare.com/firewall/cf-dashboard/)或[页面规则](https://support.cloudflare.com/hc/articles/218411427)：
    -   使用_绕过_ > _WAF 托管规则_ 配置了防火墙规则。
    -   使用_禁用安全性_ 配置了页面规则。
    -   使用 _Web 应用程序防火墙：关闭_ 或 _Web 应用程序防火墙：打开_ 配置了页面规则。
-   该区域没有 [URI 控制的 WAF 覆盖](https://api.cloudflare.com/#waf-overrides-properties)（仅通过 API 提供）。

任何不满足上述要求的区域都将无法在第 1 阶段进行迁移。

在稍后进行的第 2 阶段，所有区域都将符合迁移条件。本页将在第 2 阶段开始前更新更多信息。

___

## 开始迁移

请登录到 [Cloudflare Dashboard](https://dash.cloudflare.com/)，选择您的帐户和区域。

2\. 转至**安全性** > **WAF** > **托管规则**。

![WAF > 托管规则中显示的迁移横幅适用于符合条件的区域，它允许您从托管规则更新到 WAF 托管规则集。](/support/static/waf-migration-banner.png)

3\. 在更新横幅上，点击 **立即更新**。只有符合条件的区域才会显示此横幅。

4\. 在弹出对话框中，点击**更新**，确认您想着手从 WAF 托管规则迁移到 WAF 托管规则集。迁移是**不可逆**的。

确认操作后，迁移即告开始。

迁移过程可能需要几分钟时间。迁移完成后，仪表板将显示新的 WAF 托管规则集界面（位于**安全性** > **WAF** > **托管规则**中）。要检查迁移是否已经完成，请刷新仪表板。
