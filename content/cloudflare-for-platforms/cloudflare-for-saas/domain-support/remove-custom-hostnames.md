---
pcx_content_type: how-to
title: Remove custom hostnames
weight: 3
meta:
    description: Learn how to remove custom hostnames for inactive customers.
---

# Remove custom hostnames

As a SaaS provider, your customers may decide to no longer participate in your service offering. If that happens, you need to stop routing traffic through those custom hostnames.

## Domains using Cloudflare

If your customer's domain is also using Cloudflare, they can stop routing their traffic through your custom hostname by updating their Cloudflare DNS.

If they update their [`CNAME` record](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#step-3--have-customer-create-cname-record) so that it no longer points to your `CNAME` target:

- The domain's traffic will not route through your custom hostname.
- The custom hostname will enter into a **Moved** state.

If the custom hostname is in a **Moved** state for seven days, it will transition into a **Deleted** state.

## Domains not using Cloudflare

If your customer's domain is not using Cloudflare, you must remove a customer's custom hostname from your zone if they decide to churn.

This is especially important if your end customers are using Cloudflare because if the custom hostname changes the DNS target to point away from your SaaS zone, the custom hostname will continue to route to your service. This is a result of the [custom hostname priority logic](/ssl/reference/certificate-and-hostname-priority/#hostname-priority-cloudflare-for-saas).

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_delete-custom-hostname-dash.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

To delete a custom hostname and any issued certificates using the API, send a [`DELETE` request](/api/operations/custom-hostname-for-a-zone-delete-custom-hostname-(-and-any-issued-ssl-certificates)).

{{</tab>}}
{{</tabs>}}

## For end customers

{{<render file="_saas-customer-churn.md">}}