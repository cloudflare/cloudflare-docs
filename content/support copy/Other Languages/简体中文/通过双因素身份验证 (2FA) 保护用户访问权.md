---
pcx_content_type: troubleshooting
language_tag: chinese
title: 通过双因素身份验证 (2FA) 保护用户访问权
source: https://support.cloudflare.com/hc/zh-cn/articles/200167906-%E9%80%9A%E8%BF%87%E5%8F%8C%E5%9B%A0%E7%B4%A0%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81-2FA-%E4%BF%9D%E6%8A%A4%E7%94%A8%E6%88%B7%E8%AE%BF%E9%97%AE%E6%9D%83
title: 通过双因素身份验证 (2FA) 保护用户访问权
---

# 通过双因素身份验证 (2FA) 保护用户访问权 – Cloudflare帮助中心



## 概述

双因素身份验证 (2FA) 允许帐户所有者提升 Cloudflare 帐户的登录安全性。此额外的身份验证步骤要求您同时提供您知道的信息（例如 Cloudflare 密码）和您所拥有的信息（例如来自移动设备的身份验证代码）。 

为了确保您在无法访问移动设备（即新手机）的情况下也可以安全地访问帐户，Cloudflare 还提供了备份代码供下载。 

超级管理员是唯一可以在 Cloudflare 帐户上启用 2FA 的用户。作为帐户所有者，您将自动分配到超级管理员角色。启用 2FA 后，需要所有 Cloudflare 帐户成员在其移动设备上配置 2FA。

___

## 为您的 Cloudflare 帐户启用双因素身份验证

要为您的 Cloudflare 登录启用双因素身份验证：

1.登录 Cloudflare 仪表板。

2.在 **My Profile** 下拉菜单下，单击 **My Profile**。

3.单击 **Authentication** 选项卡。 

4.向下滚动到 **Two-Factor Authentication** 部分，然后单击以将其切换为 _On_ 。

![2FA_enable.png](/images/support/2FA_enable.png)

___

## 为您的 Cloudflare 登录配置双因素身份验证

所有 Cloudflare 帐户持有人都需要启用 2FA。如果您不是超级管理员，

-   在接受邀请加入 Cloudflare 帐户成为成员之前，您将必须打开 2FA。
-   选择您喜欢的身份验证应用，然后将其下载到您的移动设备上。有许多身份验证应用可用，包括 [Google Authenticator](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en&oco=0) 和 [Authy](https://authy.com/features/)。您会看到一个二维码。 

要启用 2FA，请执行以下操作：

1.使用您的移动设备扫描二维码，然后从身份验证应用输入代码。

2.输入您的 Cloudflare 密码，然后单击 **Next**。

-   如果您无法扫描二维码，请单击 **Can't scan QR code, Follow alternative steps** 手动配置身份验证应用。

![2FA_scan_QR_code.png](/images/support/2FA_scan_QR_code.png)

3.输入密码，然后再次单击 **Next** 以查看您的备份查看代码。

4.您看到备份代码后，我们建议您将其保存在安全的位置。您可以单击 **Download** 、 **Print** 或 **Copy** 保存代码，然后单击 **Next** 。

![2FA_review_and_backup_codes_v2.png](/images/support/2FA_review_and_backup_codes_v2.png)

您可以在以下屏幕上或随时在 **Authentication** 选项卡中重新生成备份代码。 

5.在备份代码设置屏幕上，单击 **Next** 以完成。您将看到 **Two-Factor Authentication** 现在为 _On_ 状态。

6.您还可以选择请求一组新的备份代码。单击 **regenerate them now** 以保存一组新的双因素备份代码。

![2FA_configuration_complete.png](/images/support/2FA_configuration_complete.png)

___

## 为您的 Cloudflare 帐户禁用双因素身份验证。

超级管理员是唯一可以在 Cloudflare 帐户上禁用 2FA 的用户。这将导致对所有帐户成员禁用 2FA。 

要为您的 Cloudflare 帐户禁用 2FA：

1.登录 Cloudflare 仪表板。

2.在 **My Profile** 下拉菜单下，单击 **My Profile**。

3.单击 **Authentication** 选项卡。

4.向下滚动到 **Two-Factor Authentication** 部分，然后单击以将其切换为 _Off_ 。您将看到一个确认屏幕。

5.输入您的密码、身份验证应用代码或备份代码，然后单击 **Disable** 。

![2FA_disable.png](/images/support/2FA_disable.png)

___

## 还原对 Cloudflare 双因素身份验证的访问权限

2FA 的最常见问题与失去对移动设备或身份验证代码的访问权限有关。在大多数情况下，您可以通过使用备份代码或查看首选身份验证应用的文档来解决此问题。

设置 2FA 时，系统会提示您将备份代码保存在安全的位置。要使用 Cloudflare 备份代码恢复丢失的访问权限，请执行以下操作：

1.从存储备份的位置检索备份代码。

2.导航到 Cloudflare 登录页面。

3.在登录屏幕中输入备份代码，然后单击 **Log in**。

![2FA_backup_code_login_annontated.png](/images/support/2FA_backup_code_login_annontated.png)

4.备份代码一经使用，即刻失效。

5.  如果您尝试重新输入备份代码或输入错误的代码，则会在屏幕底部看到错误消息。多次尝试失败后，系统将提示您重新登录。

您可以查看的一些常见的身份验证应用的文档：

-   [Google Authenticator](https://support.google.com/accounts/answer/185834?hl=en&ref_topic=2954345)
-   [Authy](https://www.authy.com/phones/change/)

如果仍然无法登录到 Cloudflare 帐户，请[联系支持部门](mailto:support@cloudflare.com)，并提供以下信息：

-   您帐户中的域名列表（1 个或更多）
-   与每个域名（1 个或多个）关联的 Web 服务器的 IP 地址/CNAME 记录
-   每个域名的托管服务提供商的名称（1 个或更多）
-   您的域名注册商中每个域名的原始域名服务器（1 个或多个）
-   （可选）您用于在 Cloudflare.com 帐户上激活 Authy 的电话号码 

___

## 相关资源

-   [Google Authentication 文档](https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345&co=GENIE.Platform%3DiOS&oco=0)
-   [Authy 文档](https://authy.com/help/)
-   [在 Cloudflare 上设置多用户帐户](https://support.cloudflare.com/hc/en-us/articles/205065067-Setting-up-Multi-User-accounts-on-Cloudflare)
