---
title: Get started
pcx_content_type: get-started
weight: 2
meta:
    description: Learn how to enable Argo Smart Routing in the Cloudflare dashboard.
---

# Get started with Argo Smart Routing

Argo Smart Routing is a one-click solution to speed up your global traffic.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable [Argo Smart Routing](https://dash.cloudflare.com/?to=/:account/:zone/traffic) in the dashboard:

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Traffic** > **Argo Smart Routing**.
3. For **Argo Smart Routing**, switch the toggle to **On**.
4. Provide your billing information.

    * If you do not have a [billing profile](/fundamentals/subscriptions-and-billing/create-billing-profile/), enter your billing information.

    * If you have a billing profile, confirm your billing information.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable Argo Smart Routing with the API, send a [`PATCH`](/api/operations/argo-smart-routing-patch-argo-smart-routing-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).

You will need to already have a [billing profile](/fundamentals/subscriptions-and-billing/create-billing-profile/) on your account to enable Argo Smart Routing.

{{</tab>}}
{{</tabs>}}

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

## Billing

If Cloudflare mitigates attacks on your site - whether through DDoS protection, the WAF, or other mechanisms - that traffic will not be included in any charges for Argo Smart Routing.

{{<render file="_ubb-recommendation.md" productFolder="fundamentals">}}

## Enable Tiered Cache

[Cache](/cache/) works by storing a copy of website content at Cloudflare's data centers. [Tiered Cache](/cache/how-to/tiered-cache/) divides these data centers into a hierarchy based on location. This behavior allows Cloudflare to deliver content from data centers closest to your visitor.

Argo Smart Routing and Tiered Cache work together to provide the most efficient connection for visitors to your site. For more information, go to [Tiered Cache](/cache/how-to/tiered-cache/).
