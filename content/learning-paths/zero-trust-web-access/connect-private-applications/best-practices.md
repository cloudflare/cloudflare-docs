---
title: Best practices
pcx_content_type: overview
weight: 2
layout: learning-unit
---

We recommend following these best practices when you deploy Cloudflare Tunnel for Zero Trust Web Access.

## Deploy another instance of cloudflared

For an additional point of availability, add a [`cloudflared` replica](/cloudflare-one/connections/connect-networks/deploy-tunnels/deploy-cloudflared-replicas/) to another host machine in your network.

## Standardize public hostnames

Most customers opt to standardize public hostname routes in a repeatable format. You can either use the internal hostname of the application, or you can generate a hostname that contains the private IP address and port of the origin service.

## Disable TLS verification

If your public hostname route serves an `HTTPS` application, we recommend enabling [**No TLS Verify**](/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/#notlsverify) to reduce connectivity issues caused by mismatched certificates. **No TLS Verify** disables TLS verification between `cloudflared` and the origin service, meaning that `cloudflared` will accept any certificate that the origin service provides. This setting has no impact on traffic between the user's browser and the `cloudflared` host, which will always be encrypted.

## (Optional) Add `Host` header to accommodate local traffic management tools

If your target application sits behind a load balancer or similar, you may need to set [**HTTP Host Header**](/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/#httphostheader) to the service hostname. Load balancers in between the origin service and `cloudflared` can be difficult to troubleshoot, and you can typically resolve the issue by adding a request header to match the way that the load balancer typically identifies traffic.

## Enable tunnel notifications

[Enable notifications](/cloudflare-one/connections/connect-networks/monitor-tunnels/notifications/) in the Cloudflare dashboard to monitor tunnel health.

## Update cloudflared

[Update `cloudflared`](/cloudflare-one/connections/connect-networks/downloads/update-cloudflared/) regularly to get the latest features and bug fixes.
