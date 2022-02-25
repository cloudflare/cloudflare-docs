---
_build:
  publishResources: false
  render: never
  list: never
---

When you secure origin connections, it prevents attackers from discovering and overloading your origin server with requests.

*   **DNS**: [Set up proxied (orange-clouded) DNS records](/dns/manage-dns-records/reference/proxied-dns-records) and [change your domain nameservers](/dns/zone-setups/full-setup), which will also require that you [allow Cloudflare IP addresses](https://support.cloudflare.com/hc/articles/201897700) at your origin.
*   **SSL**:
    *   To encrypt traffic between Cloudflare and your server, [choose Full (strict)](/ssl/origin-configuration/ssl-modes#strict) SSL/TLS mode (requires server configuration)
    *   To ensure requests originate from the Cloudflare network, [set up authenticated origin pulls](/ssl/origin-configuration/authenticated-origin-pull).
*   **Prevent external connections**:
    *   **Firewall** (moderately secure): Set up a [Firewall Rule](/firewall/cf-dashboard) that only allows traffic from [Cloudflare IP addresses](https://www.cloudflare.com/ips/).
    *   **Cloudflare Tunnel** (very secure): To encrypt all traffic and prevent any inbound connections to your origin, [set up a Cloudflare Tunnel](/cloudflare-one/connections/connect-apps).
