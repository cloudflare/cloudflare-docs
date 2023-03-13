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
flowchart LR
accTitle: CNAME flattening diagram
accDescr: Diagram of CNAME flattening process when there is a request for a domain in Cloudflare and the zone has a CNAME record at root that points to an external A record.

```