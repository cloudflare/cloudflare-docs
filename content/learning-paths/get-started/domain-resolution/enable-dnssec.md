---
title: Enable DNSSEC
pcx_content_type: overview
weight: 3
layout: learning-unit
---

{{<render file="_dnssec-definition.md" productFolder="DNS">}}

When you enable DNSSEC, Cloudflare signs your zone, publishes your public signing keys, and generates your **DS** record.

## Step 1 - Activate DNSSEC in Cloudflare

{{<render file="_dnssec-cloudflare-steps.md" productFolder="DNS">}}

## Step 2 — Add DS record to your registrar

{{<render file="_dnssec-registrar-steps.md" productFolder="DNS">}}

{{<Aside type="note" header="Note:">}}

Cloudflare automatically adds **DS** records for domains using Cloudflare Registrar or those using `.ch` and `.cz` top-level domains.

{{</Aside>}}