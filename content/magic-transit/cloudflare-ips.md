---
title: Cloudflare IPs
pcx_content_type: concept
weight: 8
---

# Use a Cloudflare IP

In addition to using Magic Transit with your own IP address, you can use Magic Transit with a Cloudflare-managed IP address. This option is helpful for users who do not meet the `/24` prefix length requirements or who want to protect a smaller network.

To protect your network using a Cloudflare IP address, contact your account manager. After receiving your IP address, you will need to:

- [Create a tunnel](/magic-transit/how-to/configure-tunnels/).
- [Set up static routes](/magic-transit/how-to/configure-static-routes).
- [Configure health checks](/magic-transit/how-to/run-endpoint-health-checks).
- Confirm [tunnel](/magic-transit/how-to/run-tunnel-health-checks/) and endpoint health checks were properly configured.
- Update your infrastructure at your own pace to use the allocated Cloudflare IPs.

When you use a Cloudflare-managed IP space, you do not need a [Letter Of Authorization (LOA)](/magic-transit/prerequisites/#draft-letter-of-authorization). You can skip this step from the Prerequisites page.