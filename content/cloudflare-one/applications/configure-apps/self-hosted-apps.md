---
pcx_content_type: how-to
title: Self-hosted applications
weight: 2
---

# Add a self-hosted application

Cloudflare Access allows you to securely publish internal tools and applications to the Internet by providing an authentication layer between the end user and your origin. You can use signals from your existing identity providers (IdPs), device posture providers, and [other rules](/cloudflare-one/policies/access/#selectors) to control who can access your application.

![Cloudflare Access authenticates users to your internal applications.](/cloudflare-one/static/documentation/applications/network-diagram.png)

## Prerequisites

- [Add a website](/fundamentals/get-started/setup/add-site/) to Cloudflare.
- [Change your domain nameservers](/dns/zone-setups/full-setup/) to Cloudflare.

## 1. Add your application to Access

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access > Applications**.

2. Select **Add an application**.

3. Select **Self-hosted**.

4. Enter any name for the application.

5. Choose a **Session Duration**. The session duration determines the minimum frequency for which a user will be prompted to authenticate with the configured IdP. If you want users to re-authenticate every time they reach your application, select _No duration, expires immediately_.

6. In **Application domain**, enter the domains that will represent the application.
   - Domains must belong to an active zone in your Cloudflare account. You can either select a domain from the dropdown or enter a [custom domain](/cloudflare-for-platforms/cloudflare-for-saas/security/access-for-saas/) that you control.
   - You can use [wildcards](/cloudflare-one/policies/access/app-paths/) to protect multiple parts of an application that share a root path.

7. (Optional) If you want the application to be visible in the [App Launcher](/cloudflare-one/applications/app-launcher):
   1. Select **Enable App in App Launcher**. The App Launcher link will only appear for users who are allowed by your Access policies. Blocked users will not see the app in their App Launcher.

   {{<Aside type="note">}}
   This toggle does not impact the user's ability to reach the application. Allowed users can always reach the application via a direct link, regardless of whether the toggle is enabled. Blocked users will never have access to the application.
   {{</Aside>}}

   2. Choose a domain to use for the App Launcher link.
   3. To add a custom logo for your application, select **Custom** and enter a link to your desired image.

   {{<Aside type="note">}}
   If you are having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` will not work. However, `https://www.example.com/upload/logo.png` will.
   {{</Aside>}}

8. In the **Identity Providers** card, select the identity providers you want to enable for your app.

9. (Optional) Turn on **Instant Auth** if you selected only one IdP and want users to skip the identity provider selection step.

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
- [Automatic `cloudflared` authentication](/cloudflare-one/applications/non-http/#automatic-cloudflared-authentication)
- [Browser rendering](/cloudflare-one/applications/non-http/#rendering-in-the-browser)

To finish configuring the application, select **Add application**.

## 4. Connect your origin to Cloudflare

Next, set up a [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) to make your internal application available over the Internet.

## 5. Validate the Access token

To secure your origin, you must validate the [application token](/cloudflare-one/identity/authorization-cookie/) issued by Cloudflare Access.

One option is to configure the Cloudflare Tunnel daemon, `cloudflared`, to validate the token on your behalf. This is done by enabling [**Protect with Access**](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/ingress/#access) in your Cloudflare Tunnel settings. If you do not wish to use Cloudflare Tunnel, you can [manually configure your origin](/cloudflare-one/identity/authorization-cookie/validating-json/) to check all requests for a valid token.

Users can now connect to your self-hosted application after authenticating with Cloudflare Access.
