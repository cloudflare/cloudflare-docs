---
pcx_content_type: content
title: Early Hints for SaaS
weight: 3
---

# Early Hints for SaaS

[Early Hints](/cache/about/early-hints/) allows the browser to begin loading resources while the origin server is compiling the full response. This improves webpage’s loading speed for the end user. As a SaaS provider, you may prioritize speed for some of your custom hostnames. Using custom metadata, you can [enable Early Hints](/cache/about/early-hints/#enabling-early-hints) per custom hostname.

---

## Prerequisites

Before you can employ Early Hints for SaaS, you need to create a custom hostname. Review [Get Started with Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) if you have not already done so.

---

## Enable Early Hints per custom hostname via the API

1. [Locate your zone ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/), available in the Cloudflare dashboard.

2. Locate your Authentication Key by selecting **My Profile** > **API tokens** > **Global API Key**.

3. If you are [creating a new custom hostname](/api/operations/custom-hostname-for-a-zone-create-custom-hostname), make an API call such as the example below, specifying `"early_hints": "on"`:

```json
$ curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames" \
    -H "X-Auth-Email: {email}" \
    -H "X-Auth-Key: {key}" \
    -H "Content-Type: application/json" \
    --data '
    {"hostname": "{hostname}",
      "ssl": {
        "method": "http",
        "type": "dv",
        "settings": {
          "http2": "on",
          "min_tls_version": "1.2",
          "tls_1_3": "on",
          "early_hints": "on"
        },
        "bundle_method": "ubiquitous",
        "wildcard": false
      }
    }'
```

4. For an existing custom hostname, locate the `id` of that hostname via a `GET` call:

```json
$ curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames?hostname={hostname}" \
    -H "X-Auth-Email: {email}" \
    -H "X-Auth-Key: {key}" \
    -H "Content-Type: application/json"
```

5. Then make an API call such as the example below, specifying `"early_hints": "on"`:

```json
$ curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames/{id}" \
    -H "X-Auth-Email: {email}" \
    -H "X-Auth-Key: {key}" \
    -H "Content-Type: application/json" \
    --data '{
      "ssl": {
        "method": "http",
        "type": "dv",
        "settings": {
          "http2": "on", //Note: These settings will be set to default if not included when updating early hints
          "min_tls_version": "1.2",
          "tls_1_3": "on",
          "early_hints": "on"
        }
      }
    }'
```

Currently, all options within `settings` are required in order to prevent those options from being set to default. You can pull the current settings state prior to updating Early Hints by leveraging the output that returns the `id` for the hostname. 
