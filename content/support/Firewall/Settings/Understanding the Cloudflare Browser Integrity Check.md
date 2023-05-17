---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170086-Understanding-the-Cloudflare-Browser-Integrity-Check
title: Understanding the Cloudflare Browser Integrity Check
---

# Understanding the Cloudflare Browser Integrity Check



## Overview

The Cloudflare **Browser Integrity Check (BIC)** operates similar to [Bad Behavior](https://bad-behavior.ioerror.us/) and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It also challenges visitors without a user agent or with a non-standard user agent such as commonly used by abusive bots, crawlers, or visitors.

**BIC** is enabled by default, and you can configure it in **Security** > **Settings**. You can disable the **BIC** using a [firewall skip rule](/waf/custom-rules/skip/). Also, use a [Configuration Rule](/rules/configuration-rules/) to selectively enable or disable this feature for certain sections of your website using a filter expression (such as a matching hostname or request url path).

___

## Related resources

[Understanding your site protections options](https://support.cloudflare.com/hc/articles/115002059131)
