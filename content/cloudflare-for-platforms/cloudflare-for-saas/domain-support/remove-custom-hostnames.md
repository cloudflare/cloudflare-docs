---
pcx_content_type: how-to
title: Remove custom hostnames
weight: 3
meta:
    description: Learn how to remove custom hostnames for inactive customers.
---

# Remove custom hostnames

As a SaaS provider, you must remove a customer's custom hostname from your zone if they decide to churn. 

This is especially important if your end customers are using Cloudflare because if the custom hostname changes the DNS target to point away from your SaaS zone, the custom hostname will continue to route to your service. This is a result of the [custom hostname priority logic](/ssl/reference/certificate-and-hostname-priority/#hostname-priority-ssl-for-saas).

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
{{<render file="_delete-custom-hostname-dash.md">}}
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To delete a custom hostname and any issued certificates using the API, send a [`DELETE` request](/api/operations/custom-hostname-for-a-zone-delete-custom-hostname-(-and-any-issued-ssl-certificates)).
 
{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

**For end customers**: if you have recently churned with your service (SaaS) provider but traffic continues to route to them, your service provider likely still has your domain listed as a custom hostname. Contact [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476) for further assistance.

{{</Aside>}}