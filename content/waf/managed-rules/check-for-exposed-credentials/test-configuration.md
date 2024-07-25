---
pcx_content_type: reference
title: Test your configuration
weight: 5
meta:
  title: Test your exposed credentials checks configuration
---

# Test your exposed credentials checks configuration

After enabling and configuring exposed credentials checks, you may want to test if the checks are working properly.

Cloudflare provides a special set of case-sensitive credentials for this purpose:

{{<render file="_exposed-creds-test-credentials.md">}}

The WAF always considers these specific credentials as having been previously exposed. Use them to force an "exposed credentials" event, which allows you to check the behavior of your current configuration.
