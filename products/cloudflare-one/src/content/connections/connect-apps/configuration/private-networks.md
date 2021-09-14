---
order: 4
pcx-content-type: concept
---

# Private networks

You can connect private networks and the services running in those networks to Cloudflare using [Cloudflare Tunnel](/glossary#cloudflare-tunnel). End users can then connect to those resources using the [WARP client](/connections/connect-devices/warp) by first authenticating into your organization's account. When users connect to an IP made available through Cloudflare Tunnel, WARP sends their connection through Cloudflare's network to the corresponding tunnel.

Cloudflare Tunnel relies on a piece of software, `cloudflared`, to create those connections. Administrators define the IPs available in that environment and associate them with the Tunnel. Users in your organization can then reach the service by enrolling into your organization's Cloudflare for Teams account and using the WARP agent.

Once enrolled, user endpoints will be able to connect to private [RFC 1918](https://tools.ietf.org/html/rfc1918) IP space and other ranges that you control. Applications running on those endpoints will be able to reach those private IPs as well in a private network model.
Cloudflare Tunnel relies on a piece of software, `cloudflared`, to create those connections.

To connect a private network to Cloudflare's edge, check out our [tutorial](/tutorials/warp-to-tunnel).
