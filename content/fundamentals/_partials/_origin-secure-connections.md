---
_build:
  publishResources: false
  render: never
  list: never
---

*   **SSL**:
    *   To encrypt traffic between Cloudflare and your server, [choose Full (strict)](/ssl/origin-configuration/ssl-modes/#strict) SSL/TLS mode (requires server configuration)
    *   To ensure requests originate from the Cloudflare network, [set up authenticated origin pulls](/ssl/origin-configuration/authenticated-origin-pull/).
*   **Prevent external connections**:
    *   **Origin Server** (moderately secure): Configure your origin server to [only allow traffic from Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/#configure-origin-server).
    *   **Cloudflare Tunnel** (very secure): To encrypt all traffic and prevent any inbound connections to your origin, [set up a Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/).
