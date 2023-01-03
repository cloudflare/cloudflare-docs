---
pcx_content_type: concept
title: DDoS Protection for Spectrum
weight: 0
---

# DDoS Protection for Spectrum

Spectrum provides DDoS Protection at layers 3-4 of the [OSI model](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/), that is against TCP and UDP based DDoS attacks.

Spectrum works as a layer 4 reverse proxy, therefore a proper TCP connection must be first established before traffic is proxied to the origin. This moves any impact of SYN or SYN-ACK reflection attacks to the Cloudflare edge. Additionally, by using Spectrum in front of your application, your origin IP is concealed — preventing attackers from targeting your origin server directly. It is also recommended that you replace your origin IP address after moving to Cloudflare, and lock it down to only accept traffic from [Cloudflare’s IP address range](https://www.cloudflare.com/ips/).

Random or out-of-state TCP packets should not be passed to the origin if a legitimate TCP connection has not yet been established between the client and Cloudflare. Spectrum also [leverages SYN cookie challenges as part of the Linux networking stack](https://blog.cloudflare.com/syn-packet-handling-in-the-wild/) to defend against floods.

Furthermore, if a flood of packets of an unspecified protocol target your application (for example, your Spectrum application is for TCP traffic, and a UDP flood targets your Spectrum application), the packets will be dropped. Similarly, if packets target a port or port range that you did not specify, they will also be dropped.

L3/4 DDoS attacks should be detected and mitigated by the [Network-layer DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/network/) that is enabled by default. This ruleset detects and mitigates DDoS attacks by dynamically fingerprinting attacks based on packet header fields.

For protecting HTTP/S applications against L7 DDoS attacks and to benefit from caching and additional features, onboard your application to Cloudflare’s Web Application Firewall/Content Delivery Network service, which works in tandem with Cloudflare Spectrum.

Refer to [Cloudflare DDoS Protection](/ddos-protection/) to learn more.