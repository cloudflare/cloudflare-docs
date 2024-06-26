---
title: Replace insecure JS libraries
pcx_content_type: reference
meta:
  title: Replace insecure JavaScript libraries
---

# Replace insecure JavaScript libraries

This feature, when turned on, automatically rewrites URLs to external JavaScript libraries to point to Cloudflare-hosted libraries instead. This change improves security and performance, and reduces the risk of malicious code being injected.

This rewrite operation currently supports the `polyfill` JavaScript library hosted in `polyfill.io`.

{{<Aside type="warning" header="Warning">}}
You may need to update your CSP when turning on **Replace insecure JavaScript libraries**. The feature, when enabled, will not perform any rewrites if a {{<glossary-tooltip term_id="content security policy (CSP)">}}Content Security Policy (CSP){{</glossary-tooltip>}} is present with a `script-src` or `default-src` directive. Cloudflare will not check `report-only` directives and it will not modify CSP headers.

Additionally, if you are defining a CSP via HTML `meta` tag, you must either turn off this feature or switch to a CSP defined in an HTTP header.
{{</Aside>}}

## How it works

When turned on, Cloudflare will check HTTP(S) proxied traffic for `script` tags with an `src` attribute pointing to a potentially insecure service and replace the `src` value with the equivalent link hosted under [CDNJS](https://cdnjs.cloudflare.com/).

The rewritten URL will keep the original URL scheme (`http://` or `https://`).

For `polyfill.io` URL rewrites, all `3.*` versions of the `polyfill` library are supported. If an unknown version is requested, Cloudflare will rewrite the URL to use the latest `3.*` version of the library (currently `3.111.0`).

## Availability

The feature is available in all Cloudflare plans, and is turned on by default on Free plans.

---

## Configure

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and zone.
2. Go to **Security** > **Settings**.
3. For **Replace insecure JavaScript libraries**, switch the toggle to **On** or **Off**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Issue a `PATCH` request similar to the following:

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/replace_insecure_js" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{ "value": "on" }'
```

{{</tab>}}
{{</tabs>}}
