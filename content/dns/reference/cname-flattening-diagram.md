---
pcx_content_type: reference
title: CNAME flattening diagram
weight: 2
layout: list
meta:
    description: Consider an example use case and the main steps involved in CNAME flattening.
---

# How CNAME flattening works

For the purpose of this diagram:
- `domain.test` is a zone in Cloudflare and has the following CNAME record.

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| CNAME | `domain.test` | `external-origin.test` | 3600 |
{{</example>}}

- `external-origin.test` is a zone in a different DNS provider and has the following A record.

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | ---|
| A | `external-origin.test` | `192.0.2.1` | 7200 |
{{</example>}}

In order to respond to queries for `domain.test` directly with the IP address, Cloudflare processes as following: 

```mermaid
flowchart TD
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
   C --- E{{Look up zone meta information}} --- F{{Look up record under found zone}} --> G["Answer: 
   domain.test 3600 CNAME external-origin.test

   Means that domain.test is a CNAME at apex
   Forced CNAME flattening is enabled"] --- H{{Resolve external-origin.test}}
   K{{Append answer and override the name}} --> L["Answer: 
   domain.test 7200 IN A 192.0.2.1"] --- M{Proxy status}
   M --Proxied--> O["Answer: 
   domain.test 300 IN A {$Cloudflare IP}"] --> B
   M --DNS only--> N["Answer:
   domain.test 3600 IN A 192.0.2.1"] --> B
 end
 subgraph Z ["External DNS provider"]
  direction RL
    H --- J["Answer: 
   external-origin.test 7200 IN A 192.0.2.1"] --- K
 end
 
```