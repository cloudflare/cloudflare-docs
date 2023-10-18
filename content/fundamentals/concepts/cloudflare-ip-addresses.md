---
pcx_content_type: concept
title: Cloudflare IP addresses
weight: 3
---

# Cloudflare IP addresses

Cloudflare has several [IP address ranges](https://www.cloudflare.com/ips/) which are shared by all proxied hostnames.

Together, these IP addresses form the backbone of our [Anycast network](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/), helping distribute traffic amongst various edge network servers. The IP addresses listed are those which you may receive requests to your origin server from. Cloudflare has other IP ranges not listed here for other products and services, these other IP addresses will not make connections from Cloudflare to your origin.

## Allow Cloudflare IP addresses

Because of [how Cloudflare works](/fundamentals/concepts/how-cloudflare-works/), all traffic to your origin server will appear to be coming from Cloudflare IP addresses.

To avoid rate limiting or blocking these requests, you will want to [allow Cloudflare IPs](/fundamentals/setup/allow-cloudflare-ip-addresses/) at your origin server.

## Customize Cloudflare IP addresses

If they do not want to use Cloudflare IP addresses — which are shared by all proxied hostnames — Enterprise customers have two potential alternatives:

- [**Bring Your Own IP (BYOIP)**](/byoip/): Cloudflare announces your IPs in all our locations.
- **Static IP addresses**: Cloudflare sets static IP addresses for your domain. For more details, contact your account team.

Business and Enterprise customers can also reduce the number of Cloudflare IPs that their domain shares with other Cloudflare customer domains by [uploading a Custom SSL certificate](/ssl/edge-certificates/custom-certificates/).
