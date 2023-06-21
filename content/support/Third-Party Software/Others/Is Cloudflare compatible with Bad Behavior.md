---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169496-Is-Cloudflare-compatible-with-Bad-Behavior-
title: Is Cloudflare compatible with Bad Behavior
---

# Is Cloudflare compatible with Bad Behavior?



## Bad Behavior compatibility

Absolutely. Please make sure you're working on the [latest version of Bad Behavior](https://bad-behavior.ioerror.us/download/) to ensure best performance. You would also want to enable the following in Bad Behavior:

-   **Reverse Proxy**: Turn on.
-   **Reverse Proxy Header**: Change the default of `X-Forwarded-For` to `CF-Connecting-IP`.

![Old URL: https://support.cloudflare.com/hc/article_attachments/360020914452/cf-bad-behavior.png
Article IDs: 200169496 | Is Cloudflare compatible with Bad Behavior?
](/support/static/hc-import-cf_bad_behavior.png)

Note: You don't need to allow Cloudflare's IPs because the `CF-Connecting-IP` value will restore this.
