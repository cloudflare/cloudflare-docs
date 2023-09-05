---
title: Cloudflare Gateway
pcx_content_type: tutorial
meta:
  title: Connect to Cloudflare Gateway with Magic WAN
---

# Cloudflare Gateway with Magic WAN

[Cloudflare Gateway](/cloudflare-one/policies/gateway/), our comprehensive Secure Web Gateway, allows you to set up policies to inspect DNS, network, HTTP, and egress traffic.

You can apply network and HTTP Gateway policies alongside [Magic Firewall](/magic-firewall/) policies (for L3/4 traffic filtering) to Internet-bound traffic or private traffic entering the Cloudflare network via Magic WAN. [DNS filtering](/learning-paths/dns-filtering/) requires using Cloudflare’s DNS resolver.

## HTTPS Filtering

In order to inspect HTTPS traffic, you need to [install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#download-the-cloudflare-root-certificate) on any client machines that are not running [WARP](/cloudflare-one/connections/connect-devices/warp/). This is required in order for Cloudflare to terminate TLS.

If you cannot or do not want to install the certificate, you can create [Do Not Inspect](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) policies to exempt Magic WAN traffic or disable TLS decryption entirely.

## Outbound Internet traffic

By default, the following traffic routed through Magic WAN tunnels and destined to public IP addresses is proxied/filtered through Cloudflare Gateway:

- TCP and UDP traffic sourced from [RFC1918](https://datatracker.ietf.org/doc/html/rfc1918) IPs or WARP devices.
- TCP and UDP traffic sourced from [BYO](/byoip/) or [Leased IPs](/magic-transit/cloudflare-ips/) and destined to a well-known port (`0`-`1023`).

Traffic destined to public IPs will be routed over the public Internet, unless explicitly specified otherwise. If you want to configure specific public IP ranges to be routed through your Magic WAN tunnels instead of over the public Internet after filtering, contact your account team.

This traffic will egress from Cloudflare according to the [egress policies](/cloudflare-one/policies/gateway/egress-policies/) you define in Cloudflare Gateway. By default, it will egress from a shared [Cloudflare public IP range](https://cloudflare.com/ips).

## Private traffic

By default, TCP, UDP, and ICMP traffic routed through Magic WAN tunnels and destined to routes behind [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/#cloudflare-tunnel) will be proxied/filtered through Cloudflare Gateway.

Contact your account team to enable Gateway filtering for traffic destined to routes behind Magic WAN tunnels. If enabled, by default, TCP and UDP traffic sourced from and destined to [RFC1918](https://datatracker.ietf.org/doc/html/rfc1918) space, [WARP](/cloudflare-one/connections/connect-devices/warp/), or [BYO](/byoip/) or [Leased IPs](/magic-transit/cloudflare-ips/) with source port higher than `1023` and destination port lower than `1024` will be proxied/filtered by Cloudflare Gateway. 

Optionally, more specific matches may be specified to override the default:

- Source IP prefix in a subset of RFC1918 space, or [BYO](/byoip/) or [Leased IPs](/magic-transit/cloudflare-ips/)
- Destination IP prefix in a subset of RFC1918 space, or [BYO](/byoip/) or [Leased IPs](/magic-transit/cloudflare-ips/)
- Destination port number anywhere from `0`-`65535`

Source ports are hard-coded to `1024`-`65535` and may not be overridden.

{{<render file="_traceroute.md">}}