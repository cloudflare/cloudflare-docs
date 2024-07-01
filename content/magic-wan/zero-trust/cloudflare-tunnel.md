---
title: Cloudflare Tunnel
pcx_content_type: reference
---

# Cloudflare Tunnel

Magic WAN can be used together with [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) for easy access between your networks and applications.

By default, TCP, UDP, and ICMP traffic routed through Magic WAN tunnels and destined to routes behind Cloudflare Tunnel will be proxied/filtered through [Cloudflare Gateway](/cloudflare-one/policies/gateway/).

Cloudflare does not recommend that you overlap Magic WAN and Cloudflare Tunnel routes. If you must, ensure that every Cloudflare Tunnel route has a prefix length at least as long as that of any Magic WAN route. Failing to meet this condition will likely result in loss of connectivity.

## Test `cloudflared` tunnel integration

To check if a `cloudflared` tunnel is working properly with your Magic WAN connection, open a browser from a host behind your customer premise equipment, and browse to the `cloudflared` tunnel endpoint.

For example, imagine you have a Cloudflare Tunnel set up with a private network CIDR of `10.1.2.3/32`, a static route defined in Magic WAN for `10.1.2./24`, and the device you are trying to connect to is a web server. You can test connectivity to the web server by using a browser to load `https://10.1.2.3`. If the page loads correctly, your Cloudflare Tunnel is working properly. In this scenario, you have overlapping routes defined for Cloudflare Tunnel and Magic WAN.

As mentioned above, if you have overlapping routes in your Magic WAN and Cloudflare Tunnel routing configurations, Cloudflare Tunnel will take precedence. This happens whenever a `cloudflared` tunnel CIDR matches a packet, regardless of prefix length. For example, a `cloudflared` tunnel with prefix `10.1.2.0/24` will take precedence over a static route configured to `10.1.2.4/32`, sending packets over a GRE tunnel.

For more information, refer to [Connect private networks](/cloudflare-one/connections/connect-networks/private-net/cloudflared/).