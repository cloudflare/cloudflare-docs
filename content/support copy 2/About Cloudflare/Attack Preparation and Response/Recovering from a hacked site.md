---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/203020124-Recovering-from-a-hacked-site
title: Recovering from a hacked site
---

# Recovering from a hacked site

## Overview

If your website has been hacked recently, review the recommended steps below to recover a hacked website and prevent future hacks.

### Recovering from an attack

-   Request details about the hack from your hosting provider including how they believe the site was hacked.
-   Request your hosting provider remove the malicious content placed on your website.
-   Resolve site warnings in [Google Webmaster Tools](https://www.google.com/webmasters/tools) and resubmit your site for Google’s review once the hack has been resolved.

### Preventing and mitigating the risks of a future hack

To reduce the probability of future hack, take the following actions:

#### Always update your Content Management System (CMS)

If you’re using WordPress, for example, ensure you’re on the most recent version of WordPress. CMS platforms push out updates to address known vulnerabilities. Always upgrade to the latest version when it becomes available.

#### Ensure your plugins are updated

If you’re using plugins or extensions on your website or CMS, keep them updated.

#### Activate Cloudflare’s [WAF managed rules](https://www.cloudflare.com/waf)

Customers on a paid Cloudflare plan can activate WAF managed rules to challenge or block known malicious behavior.

#### Secure your admin login

Many hacks are due to brute force attacks on login pages. Review services like [Rublon](https://rublon.com/) or [Jetpack](https://jetpack.com/features/security/) to help secure your site from attacks designed to target CMS platforms like WordPress.

#### Backup your site

If your site becomes hacked, avoid losing valid content by using a service like [CodeGuard](https://www.cloudflare.com/apps/codeguard) to restore your site from a backup.
