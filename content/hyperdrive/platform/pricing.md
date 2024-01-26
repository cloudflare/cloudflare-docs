---
pcx_content_type: concept
title: Pricing
weight: 1
---

# Pricing

{{<Aside type="note" header="Hyperdrive beta">}}

Hyperdrive is currently in public beta and is currently free to use for all [Workers paid plans](/workers/platform/pricing/).

{{</Aside>}}

Hyperdrive has two primary components:

- Connection pooling (always free).
- Query caching and analytics (pricing coming soon).

Connection pooling improves the connection latency between a client (such as Cloudflare Workers) and your origin database by keeping a pool of active connections. Connection pooling will always be free.

Query caching and analytics allow Hyperdrive to cache your most popular read queries and provide detailed analytics around cache hit rates, query latencies, and table-level statistics.

Read [How Hyperdrive Works](/hyperdrive/configuration/how-hyperdrive-works/) for more details on how connections and query caching operate.
