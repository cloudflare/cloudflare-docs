---
title: Cloudflare Gateway
pcx_content_type: reference
meta:
  title: Connect to Cloudflare Gateway with Magic WAN
---

# Cloudflare Gateway with Magic WAN

[Cloudflare Gateway](/cloudflare-one/policies/gateway/), our comprehensive Secure Web Gateway, allows you to set up policies to inspect DNS, network, HTTP, and egress traffic.

You can apply network and HTTP Gateway policies alongside [Magic Firewall](/magic-firewall/) policies (for L3/4 traffic filtering) to Internet-bound traffic or private traffic entering the Cloudflare network via Magic WAN.

## HTTPS Filtering

In order to inspect HTTPS traffic, you need to [install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#download-the-cloudflare-root-certificate) on any client machines that are not running [WARP](/cloudflare-one/connections/connect-devices/warp/). This is required in order for Cloudflare to terminate TLS.

If you cannot or do not want to install the certificate, you can create [Do Not Inspect](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) policies to exempt Magic WAN traffic or disable TLS decryption entirely.

## Outbound Internet traffic

By default, the following traffic routed through Magic WAN tunnels and destined to public IP addresses is proxied/filtered through Cloudflare Gateway:

- TCP, UDP, and ICMP traffic sourced from [RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918) IPs or WARP devices.
- TCP and UDP traffic sourced from [BYO](/byoip/) or [Leased IPs](/magic-transit/cloudflare-ips/) and destined to a well-known port (`0`-`1023`).

Traffic destined to public IPs will be routed over the public Internet, unless explicitly specified otherwise. If you want to configure specific public IP ranges to be routed through your Magic WAN tunnels instead of over the public Internet after filtering, contact your account team.

This traffic will egress from Cloudflare according to the [egress policies](/cloudflare-one/policies/gateway/egress-policies/) you define in Cloudflare Gateway. By default, it will egress from a shared Cloudflare public IP range.

## Private traffic

By default, TCP, UDP, and ICMP traffic routed through Magic WAN tunnels and destined to routes behind [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/#cloudflare-tunnel) will be proxied/filtered through Cloudflare Gateway.

Contact your account team to enable Gateway filtering for traffic destined to routes behind Magic WAN tunnels. If enabled, by default, TCP and UDP traffic sourced from and destined to [RFC1918](https://datatracker.ietf.org/doc/html/rfc1918) space, [WARP](/cloudflare-one/connections/connect-devices/warp/), or [BYO](/byoip/) or [Leased IPs](/magic-transit/cloudflare-ips/) with source port higher than `1023` and destination port lower than `1024` will be proxied/filtered by Cloudflare Gateway.

Optionally, more specific matches may be specified to override the default:

- Source IP prefix in a subset of RFC1918 space, or [BYO](/byoip/) or [Leased IPs](/magic-transit/cloudflare-ips/)
- Destination IP prefix in a subset of RFC1918 space, or [BYO](/byoip/) or [Leased IPs](/magic-transit/cloudflare-ips/)
- Destination port number anywhere from `0`-`65535`

Source ports are hard-coded to `1024`-`65535` and may not be overridden.

{{<render file="_traceroute.md">}}

## Test Gateway integration

To check if Gateway is working properly with your Magic WAN connection, open a browser from a host behind your customer premise equipment, and browse to `https://ifconfig.me`.

If you are still in the process of testing Gateway, and Cloudflare is not your default route, configure a policy-based route on your router to send traffic to Cloudflare Gateway first, before browsing to `https://ifconfig.me`.

Confirm there is an entry for the test in [HTTP Gateway Activity Logs](/cloudflare-one/insights/logs/gateway-logs/#http-logs). The destination IP address should be the public IP address of `ifconfig.me`, and the source IP address should be the private (WAN) address of the host with the browser. Your outbound connection should be sourced from a Magic WAN IP address, and not any public IP address that Cloudflare might be advertising on your behalf. This is true as well when using [Magic Transit With Egress Option](/reference-architecture/architectures/magic-transit/#magic-transit-with-egress-option-enabled).

Additionally, test both `http://ifconfig.me` (non-TLS) and `https://ifconfig.me` (TLS) to ensure that your [TCP maximum segment size (MSS Clamping)](/magic-wan/prerequisites/#set-maximum-segment-size) has been set properly.  If the response to the HTTPS query hangs or fails, but HTTP works, it is possible that the MSS value is too high or not set. Reduce this value on your customer premise equipment to match the overhead introduced by your [IKE](/magic-wan/reference/tunnels/#supported-configuration-parameters) and [ESP](https://en.wikipedia.org/wiki/IPsec#Encapsulating_Security_Payload) settings.
