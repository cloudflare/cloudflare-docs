---
pcx_content_type: how-to
title: Enable
weight: 1
meta:
    title: Enable Total TLS
---

# Enable Total TLS

To enable Total TLS - which issues individual certificates for your proxied hostnames - follow these instructions:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable Total TLS in the dashboard:
 
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Choose your account and domain.
3. Go to **SSL/TLS** > **Edge Certificates**.
4. For **Total TLS**, switch the toggle to **On** and - if desired - choose an issuing **Certificate Authority**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To enable Total TLS with the API, send a [`PATCH`](/api/operations/total-tls-enable-or-disable-total-tls) request with the `enabled` parameter set to your desired setting (`true` or `false`).

You can also specify a desired certificate authority by adding a value to the `certificate_authority` parameter.
 
{{</tab>}}
{{</tabs>}}

## Aspects to consider

* If you select a preferred certificate authority, you cannot change your certificate authority without first disabling Total TLS.

* {{<render file="_total-tls-character-limitation.md">}}