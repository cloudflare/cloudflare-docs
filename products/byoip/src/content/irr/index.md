---
title: IRR Records
weight: 2
---

The Internet Route Registry (IRR) is a globally distributed database of routing information. The IRR is made up of many individual datasources, some managed by regional entities such as RIPE, APNIC, and ARIN.

Each datasource contains routing information about particular prefixes and which ASNs are authorized to announce them. All routing information is compiled across these different sources and used to inform backbone router configuration.

Before Cloudflare will announce your prefixes it is important that the IRR entries for your prefixes reflect the right information (i.e. the prefixes and ASN match what you want Cloudflare to announce).
