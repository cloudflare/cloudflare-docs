---
order: 0
pcx-content-type: how-to
hidden: true
---

# Private networks

You can connect private networks and the services running in those networks to Cloudflare using [Cloudflare Tunnel](/glossary#cloudflare-tunnel). End users can connect to those resources using the Cloudflare WARP agent by first authenticating into your organization's account.

Cloudflare Tunnel runs a lightweight [daemon](/glossary#daemon) named ([`cloudflared`](/glossary#cloudflared)) in your infrastructure that establishes outbound connections (Tunnels) between your environment and the Cloudflare edge. Administrators define the IPs available in that environment and associate them with the Tunnel.

When users connect to an IP made available through Cloudflare Tunnel, WARP sends their connection through Cloudflare's network to the corresponding Tunnel.

In order to connect private networks, you'll first need to:

1. [Download and install `cloudflared`](/connections/connect-apps/install-and-setup/installation) in your private network
2. [Authenticate `cloudflared`](/connections/connect-apps/install-and-setup/setup)

Once `cloudflared` has been installed and authenticated, you will need 4 high-level steps to connect your network to users enrolled in your organization's Cloudflare for Teams account.

1. [Create a Tunnel](/connections/connect-networks/private-net/create-tunnel)
2. [Configure IPs in WARP](/connections/connect-devices/warp/exclude-traffic)
3. [Run your Tunnel](/connections/connect-apps/run-tunnel)
4. [Enroll clients to connect](/connections/connect-devices/warp/warp-settings#device-enrollment-permissions)

Be sure to check out our [Tutorials](/tutorials), where you can also find
best practices for managing Tunnels as an administrator.
