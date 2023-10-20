---
title: Allow Cloudflare IP addresses
pcx_content_type: overview
weight: 2
layout: learning-unit
---

{{<render file="_allow-cloudflare-ips.md" productFolder="fundamentals">}}

## Review external tools

To avoid blocking Cloudflare IP addresses unintentionally, review your external tools to check that:

- Any security plugins — such as those for WordPress — allow Cloudflare IP addresses.
- The [mod_security](https://github.com/SpiderLabs/ModSecurity) plugin is up to date.

## Configure origin server

### Allowlist Cloudflare IP addresses

{{<render file="_allow-cloudflare-ips-tactical.md" productFolder="fundamentals">}}

### Block other IP addresses (recommended)

{{<render file="_block-cloudflare-ips-tactical.md" productFolder="fundamentals">}}