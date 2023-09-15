---
pcx_content_type: how-to
title: Setup
weight: 2
meta:
    title: Set up Authenticated Origin Pulls
---

# Set up Authenticated Origin Pulls

To set up Authenticated Origin Pulls - which help ensure requests to your origin server come from the Cloudflare network - choose whether to enable them on [all hostnames in your zone](/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) or on a [per-hostname basis](/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/).

---

## Other situations

### Use specialized certificates

To apply different client certificates simultaneously at both the zone and hostname level, you can combine zone-level and per-hostname custom certificates.

First set up [zone-level pulls](/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) using a certificate. Then, upload multiple, specialized certificates for [individual hostnames](/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/).

{{<Aside type="note" header="Note">}}

Since per-hostname certificates are more specific, they take precedence over zone certificates.

{{</Aside>}}

### Delete a certificate

Client certificates are not deleted from Cloudflare upon expiration unless a [delete](/api/operations/zone-level-authenticated-origin-pulls-delete-certificate) or [replace](/api/operations/zone-level-authenticated-origin-pulls-upload-certificate) request is sent to the Cloudflare API.

However, requests are dropped at your origin if your origin only accepts a valid client certificate.

### Replace a client cert (without downtime)

For hostname:

1.  [Upload the new certificate](/api/operations/per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

2.  [Enable Authenticated Origin Pulls for that specific hostname](/api/operations/per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication).

For global:

1.  [Upload the new certificate](/api/operations/zone-level-authenticated-origin-pulls-upload-certificate).

2.  [Check whether new certificate is Active](/api/operations/zone-level-authenticated-origin-pulls-get-certificate-details).

3.  Once certificate is active, [delete the previous certificate](/api/operations/zone-level-authenticated-origin-pulls-delete-certificate).
