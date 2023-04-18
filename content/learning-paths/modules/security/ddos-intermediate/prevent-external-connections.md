---
title: Restrict external connections
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

To fully secure your origin, you should limit or restrict external connections to your origin server. These suggestions vary in their level of completeness and complexity and depend on your application and origin setup.

## Moderately secure

### Block other IP addresses

As part of [proxying your DNS records](/learning-paths/modules/security/ddos-baseline/proxy-dns-records/), you might have [allowed Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/) at your origin.

If you chose this approach, you could go one step further and explicitly [block IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/#block-other-ip-addresses-recommended) that are not from Cloudflare or your trusted partners, vendors, or application.

### Basic HTTP Authentication

