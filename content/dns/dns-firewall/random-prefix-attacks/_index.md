---
pcx_content_type: navigation
title: Random prefix attacks
weight: 4
---

# Random prefix attack protection

{{<render file="_random-prefix-attack-definition.md">}}
<br/>

As part of [DNS Firewall](/dns/dns-firewall/), Cloudflare can protect your authoritative nameservers from these attacks by returning cached responses (if their TTL has not yet expired). This protection is an opt-in feature because of the potential for false positives.

## Resources

- [Background information](/dns/dns-firewall/random-prefix-attacks/about/)
- [Setup](/dns/dns-firewall/random-prefix-attacks/setup/)

## Limitations

To reduce the impact of false positives, Cloudflare does not block domains on the [Public Suffix List](https://publicsuffix.org/). For example, this means queries only to your root domain (`example.com`) will not trigger additional protection (though other internal mitigations might catch and block the attack with significant volume).

Because Cloudflare does not know which domains exist on an upstream server, this feature cannot mitigate all types of random prefix attacks.