---
pcx_content_type: reference
title: CNAME flattening diagram
weight: 2
layout: list
---

# How CNAME flattening works

See an example use case and the main steps involved when Cloudflare does CNAME flattening.

For the purpose of this diagram, consider:
- `domain.example` is a zone in Cloudflare and has a CNAME record like the following:

{{<example>}}
| Type | Name | Content |
| --- | --- | --- |
| CNAME | `domain.example` | `external-origin.example`
{{</example>}}

- `external-origin.example` is a zone in a different DNS provider and has the following A record:

{{<example>}}
| Type | Name | Content |
| --- | --- | --- |
| A | `external-origin.example` | `192.0.2.0/24`
{{</example>}}

```mermaid
flowchart TB
accTitle: CNAME flattening diagram
accDescr: Diagram of CNAME flattening process when there is a request for a domain in Cloudflare and the zone has a CNAME record at root that points to an external A record.
 subgraph X[User request]
  direction TB
  A((User)) <--query for domain.example--> B[[Resolvers]] --> C
 end
 subgraph Y[Cloudflare DNS]
  direction TB
   C["Question: 
   domain.example IN A"] 
   C --- D{{Check for other cases}} --- E{{Look up zone meta information}} --- F{{Look up record under found zone}} --> G["domain.example is a CNAME to external-origin.example
   Forced flattening enabled"] --- H{{Resolve external-origin.example}} --> I["Answer: 
   external-origin.example IN A 192.0.2.0/24"] --- J{{Append answer and override the qname}} --> K["Answer: 
   domain.example {$TTL} IN A 192.0.2.0/24"]--- L{{Since forced flattening == true, strip leading CNAMEs in answer if any}} --- M{Proxied?}
   M --yes--> O["Answer: 
   domain.example {$TTL} IN A {$Cloudflare IP}"] --> B
   M --no--> N["Answer:
   domain.example {$TTL} IN A 192.0.2.0/24"] --> B
 end
```