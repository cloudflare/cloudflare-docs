---
weight: 2
pcx_content_type: reference
title: IP addresses
layout: list
meta:
  description: Get IPv4 and IPv6 addresses for Cloudflare DNS resolvers, 1.1.1.1 and 1.1.1.1 for Families.
---

# 1.1.1.1 IP addresses

Consider the tables below to know which IPv4 or IPv6 addresses are used by the different Cloudflare DNS resolver offerings.

For detailed guidance refer to the [Set up documentation](/1.1.1.1/setup/).

## 1.1.1.1

{{<table-wrap>}}

|     Use case    |       IPv4      |                    IPv6                   |
| --------------- | --------------- | ----------------------------------------- |
| Public resolver | `1.1.1.1` <br/>`1.0.0.1` | `2606:4700:4700::1111` <br/>`2606:4700:4700::1001` |

{{</table-wrap>}}

## 1.1.1.1 for Families

{{<table-wrap>}}

| Use case                        | IPv4            | IPv6                                      |
|---------------------------------|-----------------|-------------------------------------------|
| Block malware                   | `1.1.1.2` <br/>1.0.0.2 | `2606:4700:4700::1112` <br/>`2606:4700:4700::1002` |
| Block malware and adult content | `1.1.1.3` <br/>1.0.0.3 | `2606:4700:4700::1113` <br/>`2606:4700:4700::1003` |

{{</table-wrap>}}