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

Consider the diagram below to have an overview of the steps that may be involved in `CNAME` flattening. 

{{<Aside type="note">}}
Note that this is a simpler scenario. Cases where `CNAME` flattening is optional and/or the target hostname is not external to Cloudflare work differently.
{{</Aside>}}

## Example use case

- `domain.test` is a zone on Cloudflare and has the following `CNAME` record:

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| `CNAME` | `domain.test` | `external-origin.test` | `3600` |
{{</example>}}

- `external-origin.test` is a zone on a different DNS provider and has the following A record:

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | ---|
| `A` | `external-origin.test` | `192.0.2.1` | `7200` |
{{</example>}}

In this case, the process to respond to queries for `domain.test` directly with the IP address can be represented by the following diagram:

```mermaid
flowchart BT
accTitle: CNAME flattening diagram
accDescr: Diagram of CNAME flattening process when there is a request for a domain in Cloudflare and the zone has a CNAME record at apex that points to an external A record.
  A((User)) <--query for <code>domain.test</code>--> B[Resolver] --> C
  C["Question: 
  <code>domain.test IN A</code>"]
 subgraph Y[Cloudflare DNS]
 direction RL
  D{{Look up record}} --> G["Answer:
  <code>domain.test 3600 CNAME external-origin.test</code>

  This means that <code>domain.test</code> is a <code>CNAME</code> at the zone apex.
  Forced <code>CNAME</code> flattening is enabled."] --- H{{Resolve <code>external-origin.test</code>}}
  K{{Append answer with overwritten query name}} --> L["Answer:
  <code>domain.test 7200 IN A 192.0.2.1</code>"] --- M{Proxy status}
  M --Proxied--> O["Answer:
  <code>domain.test 300 IN A {$Cloudflare IP 1}</code>
  <code>domain.test 300 IN A {$Cloudflare IP 2}</code>"]
  M --DNS only--> N["Answer:
  <code>domain.test 3600 IN A 192.0.2.1</code>"]
 end
 
 subgraph Z [External DNS provider]
  J["Answer:
  <code>external-origin.test 7200 IN A 192.0.2.1</code>"]
 end
 
 C --> D
 H --- J --- K
 O --> B
 N --> B
```

## Aspects to consider

- If the `CNAME` record is proxied in Cloudflare, the answer is made up of multiple [Cloudflare IPs](https://www.cloudflare.com/ips/) and its Time to Live (TTL) is set to `300`.
- If the `CNAME` record in Cloudflare is not proxied, the flattened answer consists of the IP address from the external DNS provider and its TTL corresponds to the lower value between the external record and the Cloudflare `CNAME` record.