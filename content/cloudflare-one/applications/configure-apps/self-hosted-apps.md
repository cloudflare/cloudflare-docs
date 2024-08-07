---
pcx_content_type: how-to
title: Self-hosted applications
weight: 2
---

# Add a self-hosted application

{{<render file="access/_self-hosted-intro.md">}}

![Cloudflare Access authenticates users to your internal applications.](/images/cloudflare-one/applications/network-diagram.png)

## Prerequisites

- An [active domain on Cloudflare](/fundamentals/setup/manage-domains/add-site/)
- Domain uses either a [full setup](/dns/zone-setups/full-setup/) or a [partial (`CNAME`) setup](/dns/zone-setups/partial-setup/)

## 1. Add your application to Access

{{<render file="access/_self-hosted-app.md">}}

## 2. Add an Access policy

{{<render file="access/_self-hosted-policy.md">}}

## 3. (Optional) Configure advanced settings

{{<render file="access/_self-hosted-settings.md">}}

## 4. Connect your origin to Cloudflare

Next, set up a [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) to make your internal application available over the Internet.

## 5. Validate the Access token

{{<render file="access/_secure-tunnel-with-access.md">}}

Users can now connect to your self-hosted application after authenticating with Cloudflare Access.

## Product compatibility

When using Access self-hosted applications, the majority of Cloudflare products will be compatible with your application.

However, the following products are not supported:

- [Automatic Signed Exchanges](/speed/optimization/other/signed-exchanges/)
- [Automatic Platform Optimization](/automatic-platform-optimization)
- [Zaraz](/zaraz)

You can disable Automatic Signed Exchanges and Zaraz for a specific application - instead of across your entire zone - using a [Configuration Rule](/rules/configuration-rules/) scoped to the application domain.
