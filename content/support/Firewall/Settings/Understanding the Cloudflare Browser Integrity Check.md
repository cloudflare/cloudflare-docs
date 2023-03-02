---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170086-Understanding-the-Cloudflare-Browser-Integrity-Check
title: Understanding the Cloudflare Browser Integrity Check
---

# Understanding the Cloudflare Browser Integrity Check



## Overview

The Cloudflare **Browser Integrity Check (BIC)** operates similar to [Bad Behavior](https://bad-behavior.ioerror.us/) and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It also challenges visitors without a user agent or with a non-standard user agent such as commonly used by abusive bots, crawlers, or visitors.

**BIC** is enabled by default, and you can configure it in **Security** > **Settings**.  You can disable the **BIC** using a [firewall bypass rule](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/#supported-actions). Also, use a [Page Rule](https://support.cloudflare.com/hc/articles/218411427) to selectively enable or disable this feature for certain sections of your website.  For example,  [disable **BIC** for your API traffic](https://support.cloudflare.com/hc/articles/200504045).

___

## Related resources

[Understanding your site protections options](https://support.cloudflare.com/hc/articles/115002059131)
