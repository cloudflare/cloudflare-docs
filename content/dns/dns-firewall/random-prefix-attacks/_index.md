---
pcx_content_type: concept
title: Random prefix attack mitigation
weight: 4
---

# Random prefix attack mitigation

{{<render file="_random-prefix-attack-definition.md">}}

As part of [DNS Firewall](/dns/dns-firewall/), Cloudflare can protect your upstream authoritative nameservers from these attacks by blocking DNS queries that are determined to be part of an attack and thus preventing them from reaching your authoritative nameservers, where they could cause harm by overloading resources. This protection is an opt-in feature because of the potential for false positives.

## Resources

- [Background information](/dns/dns-firewall/random-prefix-attacks/about/)
- [Setup](/dns/dns-firewall/random-prefix-attacks/setup/)

## Limitations

To reduce the impact of false positives, Cloudflare does not block domains on or directly under any zone on the [Public Suffix List](https://publicsuffix.org/). For example, this means that queries only to a domain like `example.com` or `example.co.uk` will not be blocked by the automatic random prefix attack mitigation (though other internal mitigations might catch and block an attack with significant volume).

In addition, the default setting for the automatic mitigation ensures that it will only be deployed if upstream authoritative nameservers are determined to be unresponsive (and likely overloaded by an attack). This means that, as long as your authoritative nameservers can handle the traffic during a random prefix attack, Cloudflare will not actively block queries in order to avoid false positives. This setting is called `"only_when_origin_unhealthy"` and is always true if not explicitly disabled during [Setup](/dns/dns-firewall/random-prefix-attacks/setup/).

Because Cloudflare does not know which domains and subdomains exist as DNS records on an upstream nameserver, this feature takes a best effort approach by blocking DNS queries to affected subdomains in order to allow upstream nameservers to keep responding to DNS queries to unaffected subdomains.
