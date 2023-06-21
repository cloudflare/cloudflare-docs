---
title: Attack coverage
pcx_content_type: reference
type: overview
weight: 3
meta:
  title: DDoS attack coverage
---

# DDoS attack coverage

The [DDoS Attack Protection managed rulesets](/ddos-protection/managed-rulesets/) provide protection against a variety of DDoS attacks across L3/4 (layers 3/4) and L7 of the OSI model. Cloudflare constantly updates these managed rulesets to improve the attack coverage, increase the mitigation consistency, cover new and emerging threats, and ensure cost-efficient mitigations.

[Advanced TCP Protection](/ddos-protection/tcp-protection/), available to [Magic Transit](/magic-transit/) customers, provides additional protection against sophisticated TCP-based DDoS attacks.

As a general guideline, Cloudflare customers are protected up to the layer on which their service operates. For example, a WAF customer is protected against DDoS attacks on Layer 7 (HTTP/HTTPS) all the way down including L3/4 attacks.

The following table includes a sample of covered attack vectors:

{{<table-wrap>}}

| OSI Layer       | Ruleset / Feature                                                                  | Example of covered DDoS attack vectors                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| L3/4            | [Network-layer DDoS Attack Protection](/ddos-protection/managed-rulesets/network/) | UDP flood attack<br/>SYN floods<br/>SYN-ACK reflection attack<br/>ACK floods<br/>Mirai and Mirai-variant L3/4 attacks<br/>ICMP flood attack<br/>SNMP flood attack<br/>QUIC flood attack<br/>Out of state TCP attacks<br/>Protocol violation attacks<br/>SIP attacks<br/>ESP flood<br/>DNS amplification attack<br/>DNS Garbage Flood<br/>DNS NXDOMAIN flood<br/>DNS Query flood<br/><br/>For more DNS protection options, refer to [Getting additional DNS protection](#getting-additional-dns-protection). |
| L3/4            | [Advanced TCP Protection](/ddos-protection/tcp-protection/) [^1]                   | Fully randomized and spoofed ACK floods, SYN floods, SYN-ACK reflection attacks, and other sophisticated TCP-based DDoS attacks                                                                                                                                                                                                                                                                              |
| L7 (HTTP/HTTPS) | [HTTP DDoS Attack Protection](/ddos-protection/managed-rulesets/http/)             | HTTP flood attack<br/>WordPress pingback attack<br/>HULK attack<br/>LOIC attack<br/>Slowloris attack<br/>Mirai and Mirai-variant HTTP attacks                                                                                                                                                                                                                                                                |

[^1]: Available to Magic Transit customers.

{{</table-wrap>}}

## Getting additional DNS protection

The Network-layer DDoS Attack Protection managed ruleset provides protection against some types of DNS attacks. For advanced DNS protection, consider the following options:

* Use Cloudflare as your authoritative DNS provider ([primary DNS](/dns/zone-setups/full-setup/) or [secondary DNS](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/)).
* If you are running your own nameservers, use [DNS Firewall](/dns/dns-firewall/) to get additional protection against DNS attacks like random prefix attacks.
