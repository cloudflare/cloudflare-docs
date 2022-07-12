---
pcx-content-type: content
title: Early Hints for SaaS
weight: 3
---

# Early Hints for SaaS

[Early Hints](/cache/about/early-hints/) allows the browser to begin loading resources while the origin server is compiling the full response. This improves webpage’s loading speed for the end user. As a SaaS provider, you may prioritize speed for some of your custom hostnames. Using custom metadata, you can [enable Early Hints](/cache/about/early-hints/#enabling-early-hints) per custom hostname.

---

## Prerequisites

Before you can employ Early Hints for SaaS, you need to create a custom hostname. Review [Get Started with Cloudflare for SaaS](/cloudflare-for-saas/getting-started/) if you have not already done so.

---

## Enable Early Hints per custom hostname via the API

1. [Locate your zone ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/), available in the Cloudflare dashboard.

2. Locate your Authentication Key by selecting **My Profile** > **API tokens** > **Global API Key**.

3. Locate your custom hostname ID by making a ‘get’ call in the API:

```json
curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames" \
    -H "X-Auth-Email: {email}" \
    -H "X-Auth-Key: {key}" \
    -H "Content-Type: application/JSON"

```

4. Make an API call such as the example below, specifying `”early_hints”:”on”` within the [custom metadata](/cloudflare-for-saas/ssl/hostname-specific-behavior/custom-metadata/):

```json
$ curl -sXPATCH \

"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/custom_hostnames/<HOSTNAME_ID>" \
-H "X-Auth-Email: {email}" \
-H "X-Auth-Key: {key}" \
-H "Content-Type: application/json" \
-d '{
 "ssl": {
   "method": "http",
   "type":"dv"
 },
 "custom_metadata": {
   "customer_id": "12345",
   "early_hints”:”on”
 }
}'

```
