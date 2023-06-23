---
pcx_content_type: overview
title: Enable
weight: 1
meta: 
    title: Enable Rocket Loader
---

# Enable Rocket Loader

To enable or disable Rocket Loader, use the following instructions.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable or disable **Rocket Loader** in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2.  Select your account and domain.
3.  Go to **Speed** > **Optimization**.
4.  For **Rocket Loader**, switch the toggle to **On**.

{{<render file="_rocket-loader-csp.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable **Rocket Loader** with the API, send a [`PATCH`](/api/operations/zone-settings-change-rocket_loader-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).

{{<render file="_rocket-loader-csp.md">}}

{{</tab>}}
{{</tabs>}}

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}