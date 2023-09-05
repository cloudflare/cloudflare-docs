---
pcx_content_type: how-to
title: Isolate self-hosted application
weight: 4
layout: single
---

# Isolate self-hosted application

{{<Aside type="note">}}
Requires [Cloudflare Browser Isolation](/cloudflare-one/policies/browser-isolation/).
{{</Aside>}}

With Access policies, you can require users to open self-hosted applications in a secure [remote browser](/cloudflare-one/policies/browser-isolation/). Because the remote browser is directly integrated into our Secure Web Gateway platform, [HTTP policies](/cloudflare-one/policies/gateway/http-policies/) can be applied to isolated applications without needing to install the WARP client. This allows you to distribute internal applications to unmanaged users while retaining control over sensitive data.

## Prerequisites

Your browser must [allow third-party cookies](/cloudflare-one/identity/authorization-cookie/#allow-third-party-cookies-in-the-browser) on the application domain.

## Enable Browser Isolation

{{<render file="/_clientless-browser-isolation.md">}}

3. Next, go to **Access** > **Applications**.
4. Choose a [self-hosted application](/cloudflare-one/applications/configure-apps/self-hosted-apps/) and select **Configure**.
5. Choose an [Allow policy](/cloudflare-one/policies/access/) and select **Configure**.
6. Under **Additional settings**, turn on **Isolate application**.
7. Save the policy.

Browser Isolation is now enabled for users who match this policy. After the user logs into Access, the application will launch in a remote browser.

You can optionally add a second Allow policy for users on managed devices who do not require isolation.

## Policies for isolated applications

Traffic to the isolated Access application is filtered by your Gateway [HTTP policies](/cloudflare-one/policies/gateway/http-policies/). Useful policies include:

- [Identity-based policies](/cloudflare-one/policies/gateway/identity-selectors/) to allow or block requests based on user identity.
- [Data Loss Prevention policies](/cloudflare-one/policies/data-loss-prevention/) to log or block transmission of sensitive data.
- [Isolation policies](/cloudflare-one/policies/browser-isolation/isolation-policies/) to disable browser actions such as copy/paste, printing, or file downloads.

For example, if your application is hosted on `internal.site.com`, the following policy blocks users from uploading and downloading credit card numbers within the remote browser:

| Selector    | Operator | Value                   | Logic | Action |
| ----------- | -------- | ----------------------- | ----- | ------ |
| Domain      | in       | `internal.site.com`     | And   | Block  |
| DLP Profile | in       | `Financial Information` |       |        |

## Limitations

- [Automatic Signed Exchanges](/speed/optimization/other/signed-exchanges/enable-signed-exchange/), [Automatic Platform Optimization](/automatic-platform-optimization) and [Zaraz](/zaraz) are currently not supported and if enabled, should be disabled using a [Configuration Rule](/rules/configuration-rules/) scoped to the application domain.
