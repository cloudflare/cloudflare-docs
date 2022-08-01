---
title: List types
pcx_content_type: concept
weight: 3
---

# List types

## Threat intelligence

Cloudflare sees approximately 28 million HTTP requests each second and blocks 76 billion cyber threats each day. Cloudflare uses that data to detect malicious actors on the Internet and turns that information into a list of known malicious IP addresses. Cloudflare also integrates with a number of third-party vendors to augment the coverage.

The threat intelligence feed categories include Malware, Anonymizer, and Botnet Command-and-Control centers. Malware and Botnet lists cover properties on the Internet distributing malware and known command-and-control centers. Anonymizers contain a list of known forward proxies that allow attackers to hide their IP addresses.

- **Anonymizer** - Targets sites that allow users to surf the Internet anonymously.
- **Botnet** — Targets sites that are queried by compromised devices to exfiltrate information or potentially infect other devices in a network.
- **Malware** — Targets sites hosting malicious content and other compromised websites.

## IP Lists

IP Lists can be used to easily group services in networks, like web servers, or for lists of known bad IP addresses to make managing good network endpoints easier. IP lists are helpful for users with very expansive firewall rules with many IP lists. You can add up to 100,000 IPs per list that can used in rules.

## Geo-blocking

Geo-blocking enables you to selectively allow or block traffic to any country.
