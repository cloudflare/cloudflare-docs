---
title: Test your configuration
order: 4
---

# Test your exposed credentials checks configuration

After enabling and configuring exposed credentials checks, you may want to test if the checks are working properly.

Cloudflare provides a special set of credentials for this purpose:

* Username: `CF_EXPOSED_USERNAME`
* Password: `CF_EXPOSED_PASSWORD`

The WAF always considers these specific credentials as having been previously exposed. Use them to force an "exposed credentials" event, which allows you to check the behavior of your current configuration.

