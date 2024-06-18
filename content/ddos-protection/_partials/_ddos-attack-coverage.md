---
_build:
  publishResources: false
  render: never
  list: never
---

{{<table-wrap>}}

| OSI Layer       | Ruleset / Feature                                                                  | Example of covered DDoS attack vectors |
| --------------- | ---------------------------------------------------------------------------------- | -------------------------------------- |
| L3/4            | [Network-layer DDoS Attack Protection](/ddos-protection/managed-rulesets/network/) | UDP flood attack<br/>SYN floods<br/>SYN-ACK reflection attack<br/>ACK floods<br/>Mirai and Mirai-variant L3/4 attacks<br/>{{<glossary-tooltip term_id="ICMP">}}ICMP{{</glossary-tooltip>}} flood attack<br/>SNMP flood attack<br/>QUIC flood attack<br/>Out of state TCP attacks<br/>Protocol violation attacks<br/>SIP attacks<br/>ESP flood<br/>DNS amplification attack<br/>DNS Garbage Flood<br/>DNS NXDOMAIN flood<br/>DNS Query flood<br/><br/>For more DNS protection options, refer to [Getting additional DNS protection](/ddos-protection/about/attack-coverage/#getting-additional-dns-protection). |
| L3/4            | [Advanced TCP Protection](/ddos-protection/tcp-protection/) [^1]                   | Fully randomized and spoofed ACK floods, SYN floods, SYN-ACK reflection attacks, and other sophisticated TCP-based DDoS attacks |
| L7              | [Advanced DNS Protection](/ddos-protection/dns-protection/) {{<markdown>}}{{< inline-pill style="beta" >}}{{</markdown>}} [^1]                  | Sophisticated and fully randomized DNS attacks, including random-prefix attacks and DNS laundering attacks |
| L7 (HTTP/HTTPS) | [HTTP DDoS Attack Protection](/ddos-protection/managed-rulesets/http/)             | HTTP flood attack<br/>WordPress pingback attack<br/>HULK attack<br/>LOIC attack<br/>Slowloris attack<br/>Mirai and Mirai-variant HTTP attacks |

[^1]: Available to Magic Transit customers.

{{</table-wrap>}}