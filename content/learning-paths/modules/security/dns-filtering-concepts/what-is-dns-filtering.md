---
title: What is DNS filtering
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

DNS filtering is the process of using the Domain Name System to block malicious websites and filter out harmful or inappropriate content. This ensures that company data remains secure and allows companies to have control over what their employees can access on company-managed networks. DNS filtering is often part of a larger access control strategy.

```mermaid
flowchart LR
A[Browser] --  What is the IP address of www.example.com? --> B

subgraph ide1 [Cloudflare Gateway]
    direction TB
    B(DNS policies)-.->C((DNS resolver))
end
C --> D[(Nameservers)]
```

```mermaid
flowchart TD
A[Domain blocked by DNS policy?] --Yes --> B[Block page is configured?] --Yes--> C[Return IP of Gateway block page]
B--No-->E[Refuse to respond]
A --No --> D[Return IP of www.example.com]
```

A URL generally assumes the form
`protocol://subdomain.domain.tld/path?query`.
DNS filtering applies to only `subdomain.domain.tld`. You cannot filter by protocol, path, or query type.

## Related resources
- For more background information on DNS filtering, refer to our [Learning Center](
https://www.cloudflare.com/learning/access-management/what-is-dns-filtering/).
- Learn about the [benefits](https://www.cloudflare.com/products/zero-trust/cloudflare-vs-cisco-umbrella/
) of replacing your DNS filtering software with Cloudflare Gateway.