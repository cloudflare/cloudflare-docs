---
title: Get started
pcx_content_type: get-started
weight: 2
---

# Get started with Argo Smart Routing

Argo Smart Routing is a one-click solution to speed up your global traffic.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable [Argo Smart Routing](https://dash.cloudflare.com/?to=/:account/:zone/traffic) in the dashboard:

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Traffic** > **Argo**.
3. For **Argo Smart Routing**, switch the toggle to **On**.
4. Provide your billing information.

    * If you do not have a [billing profile](/fundamentals/account-and-billing/account-setup/create-billing-profile/), enter your billing information.

    * If you have a billing profile, confirm your billing information.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable Argo Smart Routing with the API, send a [`PATCH`](https://developers.cloudflare.com/api/operations/argo-smart-routing-patch-argo-smart-routing-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).

You will need to already have a [billing profile](/fundamentals/account-and-billing/account-setup/create-billing-profile/) on your account to enable Argo Smart Routing.

{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

If you are an Enterprise user, you can add the Argo permission to your account by contacting your Account Executive or Customer Success Manager.

{{</Aside>}}

## Enable Argo Tiered Cache

[Cache](/cache/) works by storing a copy of website content at Cloudflare's data centers. Argo Tiered Cache divides these data centers into a hierarchy based on location. This allows Cloudflare to deliver content from data centers closest to your visitor.

Argo Smart Routing and Argo Tiered Cache work together to provide the most efficient connection for visitors to your site. For more information, go to [Tiered Cache](/cache/about/tiered-cache/).
