---
pcx_content_type: concept
title: Secure Web Gateway
weight: 1
meta:
  title: Gateway policies
---

# Gateway policies

Cloudflare Gateway, our comprehensive Secure Web Gateway, allows you to set up policies to inspect DNS, Network, HTTP, and Egress traffic.

- **DNS policies** inspect DNS queries. You can block domains and IP addresses from resolving on your devices. For more information on DNS filtering, refer to our [Learning Center article](https://www.cloudflare.com/learning/access-management/what-is-dns-filtering/).
- **Network policies** inspect individual TCP/UDP/GRE packets. You can block access to specific ports on your origin server, including non-HTTP resources.
- **HTTP policies** inspect HTTP requests. You can block specific URLs from loading, not just the domain itself. For more information on URL filtering, refer to our [Learning Center article](https://www.cloudflare.com/learning/access-management/what-is-url-filtering/).
- **Egress policies** inspect traffic to assign egress IP addresses unique to your organization.
- **Resolver policies** inspect DNS queries to enable resolution by custom authoritative nameservers.

{{<Aside>}}
When creating or editing policies, keep in mind that it may take up to 60 seconds for that policy to be updated across all of our data centers.
{{</Aside>}}

## Selecting a policy type

The recommended policy type depends on what kind of traffic you are trying to filter. Generally speaking:

- To block websites, create an HTTP policy.
- To block non-HTTP traffic such as SSH and RDP, create a network policy.
- To block malware and other security threats, create both DNS and HTTP policies.
- To assign static IP addresses to your organization's egress traffic, create an egress policy.

Refer to the [DNS](/cloudflare-one/policies/gateway/dns-policies/), [network](/cloudflare-one/policies/gateway/network-policies/), [HTTP](/cloudflare-one/policies/gateway/http-policies/), and [egress](/cloudflare-one/policies/gateway/egress-policies/) configuration pages to see the available filtering options within each policy builder.
