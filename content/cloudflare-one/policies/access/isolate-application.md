---
pcx_content_type: how-to
title: Isolate self-hosted application
weight: 4
---

# Isolate self-hosted application

{{<Aside type="note">}}
Requires [Cloudflare Browser Isolation](/cloudflare-one/policies/browser-isolation/).
{{</Aside>}}

With Access policies, you can require users to open self-hosted applications in a secure [remote browser](/cloudflare-one/policies/browser-isolation/). Because the remote browser is directly integrated into our Secure Web Gateway platform, [HTTP policies](/cloudflare-one/policies/gateway/http-policies/) can be applied to isolated applications without needing to install the WARP client. This allows you to distribute internal applications to unmanaged users while retaining control over sensitive data.

## Prerequisites

{{<render file="/access/_isolation-prereqs.md">}}

## Enable Browser Isolation

{{<render file="/access/_enable-isolation.md">}}

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

## Product compatibility

For a list of products that are incompatible with the **Isolate application** feature, refer to [Product Compatibility](/cloudflare-one/applications/configure-apps/self-hosted-apps/#product-compatibility) .
