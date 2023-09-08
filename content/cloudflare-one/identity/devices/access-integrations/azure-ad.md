---
pcx_content_type: how-to
title: Azure AD
weight: 1
---

# Azure AD

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows           | WARP not required                                                                 | All plans                                                     |

</div>
</details>

Cloudflare Access can integrate with Azure AD's Conditional Access feature to require that users connect to certain applications from managed devices. To enable, you must integrate Azure AD with Cloudflare Access as a cloud app that requires managed device connections. You can configure [per-app identity providers](/cloudflare-one/identity/idp-integration/) to segment which Access applications require Azure AD with managed devices and which only require Azure AD logins.

## Enforce Azure AD device posture in Access

1. Follow [these instructions](/cloudflare-one/identity/idp-integration/azuread/) to add Azure AD as an identity provider.

2. (Optional) If you want to allow users to reach certain applications with only Azure AD logins, and no device requirement, repeat Step 1 to create another identity provider. You will need to maintain two distinct integrations: one integration will require device management and the other will only require Azure AD logins. We recommend giving each identity provider a distinct name, for example `Azure AD (device posture)` and `Azure AD (login only)`.

3. Next, [create a new](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/require-managed-devices) Conditional Access policy in Azure AD. In that policy, you can require that users connect from Managed, Hybrid, or compliant devices.

4. In Azure AD, apply your Conditional Access policy to the `Azure AD (device posture)` integration.

5. You can now enable the Conditional Access policy for an Access application:
   1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Access** > **Applications**.
   2. Select **Edit** for the application that requires managed device connections.
   3. Open the **Authentication** tab.
   4. Enable the `Azure AD (device posture)` identity provider.
   5. Save the application.
