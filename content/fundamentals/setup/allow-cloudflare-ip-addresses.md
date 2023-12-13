---
pcx_content_type: tutorial
title: Allow Cloudflare IP addresses
weight: 5
---

# Allow Cloudflare IP addresses

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

### Additional recommendations

#### Further protection

For further recommendations on securing your origin server, refer to our guide on [protecting your origin server](/fundamentals/basic-tasks/protect-your-origin-server/).

#### Visitor IP information

Because your origin server will receive Cloudflare IP addresses instead of visitor IP addresses, your server will return Cloudflare IP addresses when logging or responding to requests.

If you want sampled logs of visitor IP addresses and are on an Enterprise plan, we recommend that you use [Cloudflare Logs](/logs/about/).

Alternatively, if you want non-sampled logs directly from your server or your application's response depends on the incoming IP address of an individual visitor, you can also [restore visitor IP addresses](/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/). 

### IP range updates

Cloudflare's IP ranges do not change frequently. When they do change, they are added to our [list of IP ranges](https://www.cloudflare.com/en-in/ips/) before being put into production. An email notification will be sent out in advance to give you enough time to make configuration changes. You can also use the Cloudflare API to programmatically keep your configuration updated.