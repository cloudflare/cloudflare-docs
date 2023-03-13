---
pcx_content_type: reference
title: CNAME flattening diagram
weight: 2
layout: list
meta:
    description: See an example use case and the main steps involved in CNAME flattening.
---

# How CNAME flattening works

For the purpose of this diagram:
- `domain.test` is a zone in Cloudflare and has the following CNAME record.

{{<example>}}
| Type | Name | Content |
| --- | --- | --- |
| CNAME | `domain.test` | `external-origin.test`
{{</example>}}

- `external-origin.test` is a zone in a different DNS provider and has the following A record.

{{<example>}}
| Type | Name | Content |
| --- | --- | --- |
| A | `external-origin.test` | `192.0.2.0/24`
{{</example>}}

In order to respond to queries for `domain.test` directly with the IP address, Cloudflare processes as following: 

```mermaid
flowchart TB
accTitle: CNAME flattening diagram
accDescr: Diagram of CNAME flattening process when there is a request for a domain in Cloudflare and the zone has a CNAME record at root that points to an external A record.
 subgraph X [" "]
  direction TB
  A((User)) <--query for domain.test--> B[[Resolvers]] --> C
 end
 subgraph Y[Cloudflare DNS]
  direction TB
   C["Question: 
   domain.test IN A"] 
   C --- E{{Look up zone meta information}} --- F{{Look up record under found zone}} --> G["domain.test is a CNAME to external-origin.test
   Forced flattening enabled"] --- H{{Resolve external-origin.test}} --> I["Answer: 
   external-origin.test IN A 192.0.2.0/24"] --- J{{Append answer and override the qname}} --> K["Answer: 
   domain.test {$TTL} IN A 192.0.2.0/24"]--- L{{Since forced flattening is enabled, strip leading CNAMEs in answer if any}} --- M{Proxied?}
   M --yes--> O["Answer: 
   domain.test {$TTL} IN A {$Cloudflare IP}"] --> B
   M --no--> N["Answer:
   domain.test {$TTL} IN A 192.0.2.0/24"] --> B
 end
```