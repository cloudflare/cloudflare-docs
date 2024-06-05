---
pcx_content_type: tutorial
title: Cloudflare IP addresses
weight: 4
---

# Cloudflare IP addresses

{{<render file="_cloudflare-ips.md" productFolder="fundamentals">}}

## Allow Cloudflare IP addresses

{{<render file="_allow-cloudflare-ips.md" productFolder="fundamentals">}}

## Configure origin server

### Allowlist Cloudflare IP addresses

{{<render file="_allow-cloudflare-ips-tactical.md" productFolder="fundamentals">}}

### Block other IP addresses (recommended)

{{<render file="_block-cloudflare-ips-tactical.md" productFolder="fundamentals">}}

## Review external tools
To avoid blocking Cloudflare IP addresses unintentionally, review your external tools to check that:

- Any security plugins — such as those for WordPress — allow Cloudflare IP addresses.
- The [ModSecurity](https://github.com/SpiderLabs/ModSecurity) plugin is up to date.

### Additional recommendations

#### Further protection

For further recommendations on securing your origin server, refer to our guide on [protecting your origin server](/fundamentals/basic-tasks/protect-your-origin-server/).

### Customize Cloudflare IP addresses

{{<render file="_customize-cloudflare-ips.md" productFolder="fundamentals">}}

### IP range updates

Cloudflare's IP ranges do not change frequently. When they do change, they are added to our [list of IP ranges](https://www.cloudflare.com/en-in/ips/) before being put into production. You can also use the Cloudflare API to programmatically keep your configuration updated.
