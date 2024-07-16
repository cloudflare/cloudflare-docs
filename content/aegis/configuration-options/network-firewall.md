---
title: Network firewall
pcx_content_type: concept
weight: 2
meta:
  title: Use Aegis with network firewall
---

# Use Aegis with your network firewall

One of the main benefits of using Cloudflare Aegis is being able to update your network firewall rules to be more restrictive. Instead of allowing all [Cloudflare IP ranges](https://www.cloudflare.com/ips/), once you onboard to Aegis, you can update your firewall rules to only allow Aegis IPs.

This means moving from allowlisting millions of IPs that are publicly listed to only a few IPs that are much harder for attackers to discover, and not possible for them to use as the Source IP for requests.