---
pcx_content_type: how-to
title: Get started
weight: 3
---

# Get started

{{<Aside type="note">}}

Client IP Geolocation is currently in closed Beta testing.

{{</Aside>}}

There are several things you can do to best handle traffic from Cloudflare VPN and forward-proxy users:

- **Origin operators**:
  - Do not block IP addresses associated with our VPN and proxy products (see the [About section](/client-ip-geolocation/about/) for more details)
  - To get even more accurate geolocation data, ensure your origin is [reachable via IPv6](/client-ip-geolocation/faq/)
- **Geolocation data providers**:
  - Regularly pull updated geolocation data from the [Cloudflare API](https://api.cloudflare.com/local-ip-ranges.csv)
- **Users of WARP and 1.1.1.1**:
  - Review the [FAQs](/client-ip-geolocation/faq/#cloudflare-vpn-users) and [About section](/client-ip-geolocation/about/) to learn exactly how, how much, and why we share geolocation data
