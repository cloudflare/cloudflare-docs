---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/200170086-Understanding-the-Cloudflare-Browser-Integrity-Check
title: Browser Integrity Check
---

# Browser Integrity Check

{{<render file=_bic-description.md productFolder="waf">}}

## Disable Browser Integrity Check

**BIC** is enabled by default.

### Disable globally

To disable **BIC** globally for your zone:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Security** > **Settings**.
4. For **Browser Integrity Check**, switch the toggle to **Off**.

### Disable selectively

To disable **BIC** selectively, you can set up a [firewall skip rule](/waf/custom-rules/skip/). 

Also, use a [Configuration Rule](/rules/configuration-rules/) to selectively enable or disable this feature for certain sections of your website using a filter expression (such as a matching hostname or request URL path).
