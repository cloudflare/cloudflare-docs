---
pcx_content_type: overview
title: About
weight: 4
meta:
    title: About random prefix attacks - DNS Firewall
---

# About random prefix attacks

{{<render file="_random-prefix-attack-definition.md">}}
<br/>

## Attack charactertistics

### Queries for nonexistent domains

If the request only involved nonexistent domains, the `NXDOMAIN` errors would only be served by the top-level domain (TLD) nameservers for `com.`.

<div class="mermaid">
    flowchart RL
      accTitle: Random prefix attacks diagram
      A[Request to <code>random.com</code>] --> B[<code>1.1.1.1</code>]
      B --> C[<code>com.</code> TLD NS]
      C --<code>NXDOMAIN error</code>--> A
      subgraph DNS resolver
        B
      end
</div>
<br/>

### Queries for nonexistent subdomains

These attacks are successful because they target subdomains, which require a response from a domain's authoritative nameservers. 

<div class="mermaid">
    flowchart RL
      accTitle: Random prefix attacks diagram
      A[Request to <code>random.example.com</code>] --> B[<code>1.1.1.1</code>]
      B --> C[Authoritative NS]
      C --<code>NXDOMAIN error</code>--> A
      subgraph DNS resolver
        B
      end
</div>
<br/>

With an attack against a subdomain, the resolver will resolve the query and is forced to fully resolve it against the authoritative since these random subdomains are likely not cached by the resolver. The lookup for the zone NS will be cached. If the client sends enough of these queries, and the authoritative cannot handle the query load, it will fall over, taking the zone down for all queries, not just the attacker.

This attack is difficult to mitigate for a few reasons. From the perspective of the authoritative nameservers, the attacker appears to be Cloudflare (`1.1.1.1`) since that is the source of the queries, blocking Cloudflare is not an option since that will block legitimate traffic.

Additionally, it is hard for the authoritative nameservers to process lots of uncached negative queries, since they are the most expensive (checking empty non-terminals). Even with some caching, it is impossible to already know the answer to every possible query ahead of time, especially when the zone data is too large to fit in memory.

## Solution

When you [enable random prefix attack mitigations](/dns/dns-firewall/random-prefix-attacks/setup/), Cloudflare monitors incoming queries for potential random prefix attacks.

When we detect an attack, we will temporarily stop querying your upstream nameservers for subdomains, sub-subdomains, and more. Cloudflare will then respond with cached responses (if their TTL has not yet expired).