---
title: Forming an expression
order: 4
---

# Forming an expression

Rules are written as using the Cloudflare Firewall Rules language - a DSL intented to mimic Wireshark semantics. See the documentation for more details: https://developers.cloudflare.com/firewall/cf-firewall-language

To start with a simple case, here's how you'd match a source IP:

```ip.src == 192.0.2.0```


Expressions can be more complex by joining multiple clauses via a logical operator:

```ip.src == 192.0.2.1 && (tcp.flags.push || tcp.flags.reset)```


# Restrictions

Wirefilter comparisons support CIDR notation, but only inside sets.  For example:

```
ip.src == 192.0.2.0/24  # bad
ip.src in { 192.0.2.0/24 }  # good
```

Expressions have a complexity limit. It is most easily reached when there are many joined or nested clauses in the expression.  Here's an example:

```
(tcp.dstport == 1000 || tcp.dstport == 1001) && (tcp.dstport == 1002 || tcp.dstport == 1003) && (tcp.dstport == 1004 || tcp.dstport == 1005) && (tcp.dstport == 1006 || tcp.dstport == 1007) && (tcp.dstport == 1008 || tcp.dstport == 1009) && (tcp.dstport == 1010 || tcp.dstport == 1011) && (tcp.dstport == 1012 || tcp.dstport == 1013) && (tcp.dstport == 1014 || tcp.dstport == 1015) && (tcp.dstport == 1016 || tcp.dstport == 1017)
```

If the limit is reached, the response will have a 400 status code and an error message of "ruleset exceeds complexity constraints".  Split the expression into multiple rules and try again.
