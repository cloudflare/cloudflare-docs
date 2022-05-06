---
pcx-content-type: concept
title: Secure Web Gateway
weight: 1
meta:
  title: Secure Web Gateway policies
---

# Secure Web Gateway policies

With Secure Web Gateway, Cloudflare Zero Trust allows you to set up policies to inspect DNS, HTTP, and Network traffic.

- **DNS policies** inspect DNS queries. You can block domains and IP addresses from resolving on your devices. For more information on DNS filtering, refer to our [Learning Center article](https://www.cloudflare.com/learning/access-management/what-is-dns-filtering/).
- **HTTP policies** inspect HTTP requests. You can block specific URLs from loading, not just the domain itself. For more information on URL filtering, refer to our [Learning Center article](https://www.cloudflare.com/learning/access-management/what-is-url-filtering/).
- **Network policies** inspect individual TCP/UDP/GRE packets. You can block access to specific ports on your origin server, including non-HTTP resources.

{{<Aside>}}
When creating or editing policies, keep in mind that it may take up to 60 seconds for that policy to be updated across all of our data centers.
{{</Aside>}}