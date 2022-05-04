---
title: Cloudflare IPs
pcx-content-type: concept
weight: 7
---

# Use a Cloudflare IP

In addition to using Magic Transit with your own IP address, you can use Magic Transit with a Cloudflare-managed IP address. This option is helpful for users who do not meet the /24 prefix length requirements or who want to protect a smaller network.

To protect your network using a Cloudflare IP address, contact your account manager. After you receiving your IP address, you will need to:

- [Create a GRE tunnel](/magic-transit/how-to/configure-tunnels)
- [Set up static routes](/magic-transit/how-to/configure-static-routes)
- [Configure health checks](/magic-transit/how-to/run-endpoint-health-checks)
- Confirm tunnel and endpoint health checks were properly configured
- Update your infrastructure at your own pace to use the allocated Cloudflare IPs

When you use a Cloudflare-managed IP space, you can skip the steps for providing an LOA and advertising your prefixes that are associated with bringing your own IP.