---
order: 10
---

# Azure AD

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Cloudflare Access can integrate with Azure AD's Conditional Access feature to require users connect to certain applications from managed devices. To enable, you must integrate Azure AD with Cloudflare Access as a cloud app that requires managed device connections. You can use Cloudflare Access' [per-app IdP feature](/configuring-identity-providers/#configuring-applications-to-specific-identity-providers) to segment which Access applications require Azure AD with managed devices and which only require Azure AD.

## Azure AD configuration

When you [integrate Cloudflare Access with Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/what-is-single-sign-on), Azure AD treats Cloudflare as a single cloud application, even if you have multiple applications secured with Cloudflare Access. To introduce device posture requirements, Cloudflare Access can reuse that same integration.

> If you want to allow users to reach certain applications with only Azure AD logins, and no device requirement, you will need to maintain two distinct integrations. One integration with Cloudflare will require device management and the other will only require Azure AD logins. You can configure which applications secured by Cloudflare Access use which integration in the steps below.

1. Follow [the instructions to integrate](/configuring-identity-providers/azuread/) Cloudflare Access as a cloud app with Azure AD.
1. Repeat this step a second time if you want to maintain an integration that does not require Azure AD device management. We recommend giving each a distinct name that will be used in the steps below.
    ![Name Providers](/static/azuread-device/name-providers.png)
1. Next, [create a new](https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/require-managed-devices) `Conditional Access` policy in Azure AD. In that policy, you can require that users connect from Managed, Hybrid, or compliant devices.
1. Apply that policy to the integration with Cloudflare Access.

## Cloudflare Access configuration

In the Cloudflare for Teams dashboard, you can configure which applications require connections from a managed device and which do not.

1. Navigate to an application that should require managed device connections.
1. Open the "Authentication" tab.
1. Toggle the Azure AD integration that requires managed device usage.
    ![Name Providers](/static/azuread-device/select-integration.png)