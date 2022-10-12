---
pcx_content_type: concept
title: Total TLS
weight: 14
---

# Total TLS

{{<render file="_total-tls.md">}}
<br>

When issued, these certificates will have a type of **Advanced - Total TLS**.

When you [enable](#enable-total-tls) Total TLS, Cloudflare will also show a warning on proxied DNS records that are not covered by a TLS certificate.

## Availability

Total TLS is available for domains that have purchased [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) and are currently using a [full DNS setup](/dns/zone-setups/full-setup/).

## Enable Total TLS

To enable Total TLS:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable Opportunistic Encryption in the dashboard:
 
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Choose your account and domain.
3. Go to **SSL/TLS** > **Edge Certificates**.
4. For **Total TLS**, switch the toggle to **On** and - if desired - choose an issuing **Certificate Authority**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To enable Total TLS with the API, send a [`PATCH`](https://api.cloudflare.com/#total-tls-enable-or-disable-total-tls) request with the `enabled` parameter set to your desired setting (`true` or `false`).

You can also specify a desired certificate authority by adding a value to the `certificate_authority` parameter.
 
{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

If you select a preferred certificate authority, you cannot change your certificate authority without first disabling Total TLS.

{{</Aside>}}