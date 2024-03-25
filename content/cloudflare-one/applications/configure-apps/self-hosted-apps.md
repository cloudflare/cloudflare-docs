---
pcx_content_type: how-to
title: Self-hosted applications
weight: 2
---

# Add a self-hosted application

Cloudflare Access allows you to securely publish internal tools and applications to the Internet by providing an authentication layer between the end user and your origin. You can use signals from your existing identity providers (IdPs), device posture providers, and [other rules](/cloudflare-one/policies/access/#selectors) to control who can access your application.

![Cloudflare Access authenticates users to your internal applications.](/images/cloudflare-one/applications/network-diagram.png)

## Prerequisites

- An [active domain on Cloudflare](/fundamentals/setup/manage-domains/add-site/)
- Domain uses either a [full setup](/dns/zone-setups/full-setup/) or a [partial (`CNAME`) setup](/dns/zone-setups/partial-setup/)

## 1. Add your application to Access


1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.

2. Select **Add an application**.

3. Select **Self-hosted**.

4. Enter any name for the application.

5. Choose a **Session Duration**. The session duration determines the minimum frequency for which a user will be prompted to authenticate with the configured IdP. If you want users to re-authenticate every time they reach your application, select _No duration, expires immediately_.

6. In **Application domain**, enter the domains that will represent the application.

   - Domains must belong to an active zone in your Cloudflare account. You can either select a domain from the dropdown or enter a [custom domain](/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/) that you control.
   - You can use [wildcards](/cloudflare-one/policies/access/app-paths/) to protect multiple parts of an application that share a root path.

7. (Optional) Configure [App Launcher settings](/cloudflare-one/applications/app-launcher/) for the application.

8. {{<render file="access/_access-block-page.md">}}

9. {{<render file="access/_access-choose-idps.md">}}

10. Select **Next**.

## 2. Add an Access policy

You can now configure an [Access policy](/cloudflare-one/policies/access/) to control who can connect to your application.

1. Enter any name for your rule.

2. Specify a policy [action](/cloudflare-one/policies/access/#actions).

3. Assign [Access groups](/cloudflare-one/identity/users/groups/) to reuse existing rules, or create new rules. You can add as many include, exception, or require statements as needed.

4. (Optional) Customize the login experience for users who match this policy:

   - [Purpose justification](/cloudflare-one/policies/access/require-purpose-justification/)
   - [Temporary authentication](/cloudflare-one/policies/access/temporary-auth/)

5. Select **Next**.

## 3. (Optional) Configure advanced settings

You can configure the following advanced settings for your application:

- [Cross-Origin Resource Sharing (CORS)](/cloudflare-one/identity/authorization-cookie/cors/)
- [Cookie settings](/cloudflare-one/identity/authorization-cookie/#cookie-settings)
- [Automatic `cloudflared` authentication](/cloudflare-one/applications/non-http/cloudflared-authentication/#automatic-cloudflared-authentication)
- [Browser rendering](/cloudflare-one/applications/non-http/#enable-browser-rendering)

To finish configuring the application, select **Add application**.

## 4. Connect your origin to Cloudflare

Next, set up a [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) to make your internal application available over the Internet.

## 5. Validate the Access token

To secure your origin, you must validate the [application token](/cloudflare-one/identity/authorization-cookie/) issued by Cloudflare Access.

One option is to configure the Cloudflare Tunnel daemon, `cloudflared`, to validate the token on your behalf. This is done by enabling [**Protect with Access**](/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/#access) in your Cloudflare Tunnel settings. If you do not wish to use Cloudflare Tunnel, you can [manually configure your origin](/cloudflare-one/identity/authorization-cookie/validating-json/) to check all requests for a valid token.

Users can now connect to your self-hosted application after authenticating with Cloudflare Access.

## Product compatibility

When using Access self-hosted applications, the majority of Cloudflare products will be compatible with your application.

However, the following products are not supported:

- [Automatic Signed Exchanges](/speed/optimization/other/signed-exchanges/)
- [Automatic Platform Optimization](/automatic-platform-optimization)
- [Zaraz](/zaraz)

If these products are enabled for your Access application, disable them using a [Configuration Rule](/rules/configuration-rules/) scoped to the application domain.
