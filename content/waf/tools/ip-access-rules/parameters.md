---
title: Parameters
pcx_content_type: reference
weight: 3
meta:
  title: IP Access rule parameters
layout: list
---

# Parameters

An IP Access rule will apply a certain action to incoming traffic based on the visitor's IP address, IP range, country, or Autonomous System Number (ASN).

## IP address

Type         | Example value
-------------|--------------
IPv4 address | `192.0.2.3`
IPv6 address | `2001:db8::`

## IP range

{{<table-wrap>}}

| Type             | Example value    | Start of range | End of range                             |                    Number of addresses |
|------------------|------------------|----------------|------------------------------------------|---------------------------------------:|
| IPv4 `/24` range | `192.0.2.0/24`   | `192.0.2.0`    | `192.0.2.255`                            |                                    256 |
| IPv4 `/16` range | `192.168.0.0/16` | `192.168.0.0`  | `192.168.255.255`                        |                                 65,536 |
| IPv6 `/64` range | `2001:db8::/64`  | `2001:db8::`   | `2001:db8:0000:0000:ffff:ffff:ffff:ffff` |             18,446,744,073,709,551,616 |
| IPv6 `/48` range | `2001:db8::/48`  | `2001:db8::`   | `2001:db8:0000:ffff:ffff:ffff:ffff:ffff` |      1,208,925,819,614,629,174,706,176 |
| IPv6 `/32` range | `2001:db8::/32`  | `2001:db8::`   | `2001:db8:ffff:ffff:ffff:ffff:ffff:ffff` | 79,228,162,514,264,337,593,543,950,336 |

{{</table-wrap>}}

## Country

You can specify a country by name or two-letter [ISO-3166-1 alpha-2 codes](https://www.iso.org/iso-3166-country-codes.html). For example:

* `US`
* `germany`
* `CN`

Cloudflare uses the following special country alpha-2 codes that are not part of the ISO:

* `T1`: [Tor exit nodes](https://support.cloudflare.com/hc/articles/203306930) (country name: `Tor`)
* `XX`: Unknown/reserved

{{<Aside type="note" header="Notes about country blocking">}}
* Block by country is only available on Enterprise plans.
* IP addresses globally allowed by Cloudflare will override an IP Access rule country block, but they will not override a country block via [firewall rules](/firewall/).
{{</Aside>}}

## Autonomous System Number (ASN)

Type | Example value
-----|--------------
ASN  | `AS13335`
