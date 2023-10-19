---
title: List types
pcx_content_type: concept
weight: 3
---

# List types

## Threat intelligence

Cloudflare handles millions of HTTP requests each second and blocks billions of cyber threats each day. Cloudflare uses that data to detect malicious actors on the Internet and turns that information into a list of known malicious IP addresses. Cloudflare also integrates with a number of third-party vendors to augment the coverage.

The threat intelligence feed categories are described in [Managed IP Lists](/waf/tools/lists/managed-lists/#managed-ip-lists).  All of these lists are compatible with Magic Firewall.

## IP lists

Use IP lists ([custom lists](/waf/tools/lists/custom-lists/) containing IP addresses) to easily group services in networks, like web servers, or for lists of known bad IP addresses to make managing good network endpoints easier. IP lists are helpful for users with very expansive firewall rules with many IP lists. You can add up to 100,000 IPs per list that can used in rules.

## Geo-blocking

Geo-blocking enables you to selectively allow or block traffic to any country.
