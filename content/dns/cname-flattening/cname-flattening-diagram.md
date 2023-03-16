---
pcx_content_type: reference
title: Example diagram
weight: 3
layout: list
meta:
    title: CNAME flattening diagram
    description: Consider an example use case and the main steps involved in CNAME flattening.
---

# How CNAME flattening works

With `CNAME` flattening, Cloudflare returns an IP address instead of the target hostname that a `CNAME` record points to.
This process supports a few features and delivers better performance and flexibility, as mentioned in the [CNAME flattening concept page](/dns/cname-flattening/).

Consider the diagram below to have an overview of the steps that may be involved in CNAME flattening. 

{{<Aside type="note">}}
Note that this is a simpler scenario. Cases where CNAME flattening is optional and/or the target hostname is not external to Cloudflare work differently.
{{</Aside>}}

## Example use case

- `domain.test` is a zone in Cloudflare and has the following CNAME record:

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| CNAME | `domain.test` | `external-origin.test` | 3600 |
{{</example>}}

- `external-origin.test` is a zone in a different DNS provider and has the following A record:

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | ---|
| A | `external-origin.test` | `192.0.2.1` | 7200 |
{{</example>}}

In this case, the process to respond to queries for `domain.test` directly with the IP address can be represented by the following diagram:

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

   This means that domain.test is a CNAME at the zone apex
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

## Aspects to consider

- If the `CNAME` record is proxied in Cloudflare, the answer is made up of a [Cloudflare IP](https://www.cloudflare.com/ips/) and its Time to Live (TTL) is set to 300.
- If the `CNAME` record in Cloudflare is not proxied, the flattened answer consists of the IP address from the external DNS provider and its TTL corresponds to the lower value between the external record and the Cloudflare `CNAME` record.