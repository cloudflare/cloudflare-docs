---
order: 2
pcx-content-type: how-to
---

# Get started

<Aside type="note">

Client IP Geolocation is currently in closed Beta testing.

</Aside>

There are several things you can do to best handle traffic from Cloudflare VPN and forward-proxy users:

- **Origin operators**:
    - Do not block IP addresses associated with our VPN and proxy products (see the [About section](/about) for more details)
    - To get even more accurate geolocation data, ensure your origin is [reachable via IPv6](/faq)
- **Geolocation data providers**:
    - Regularly pull updated geolocation data from the [Cloudflare API](https://api.cloudflare.com/local-ip-ranges.csv)
- **Users of WARP and 1.1.1.1**:
    - Review the [FAQs](/faq#cloudflare-vpn-users) and [About section](/about) to learn exactly how, how much, and why we share geolocation data
