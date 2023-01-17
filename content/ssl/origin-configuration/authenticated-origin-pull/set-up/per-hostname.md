---
pcx_content_type: how-to
title: Per-hostname
weight: 2
meta:
    title: Per-hostname authenticated origin pulls
---

# Per-hostname authenticated origin pulls

When you enable Authenticated Origin Pull per hostname, all proxied traffic to the specified hostname is authenticated at the origin web server. Customers can use client certificates from their Private PKI to authenticate connections from Cloudflare.

1.  Upload a custom certificate following [these instructions](/ssl/edge-certificates/custom-certificates/uploading/#using-the-api), but use the [`/origin_tls_client_auth/hostnames/certificates` endpoint](https://developers.cloudflare.com/api/operations/per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

{{<Aside type="note" header="Note">}}
Save the certificate ID `id` since it is required for the next step.
{{</Aside>}}

2.  On a specific hostname, [enable Authenticated Origin Pull](https://developers.cloudflare.com/api/operations/per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication).

### Replace a client cert (without downtime)

For hostname:

1.  [Upload the new certificate](https://developers.cloudflare.com/api/operations/per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

2.  [Enable Authenticated Origin Pull for that specific hostname](https://developers.cloudflare.com/api/operations/per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication).

For global:

1.  [Upload the new certificate](https://developers.cloudflare.com/api/operations/zone-level-authenticated-origin-pulls-upload-certificate).

2.  [Check whether new certificate is Active](https://developers.cloudflare.com/api/operations/zone-level-authenticated-origin-pulls-get-certificate-details).

3.  Once certificate is active, then [delete the old certificate](https://developers.cloudflare.com/api/operations/zone-level-authenticated-origin-pulls-delete-certificate).
