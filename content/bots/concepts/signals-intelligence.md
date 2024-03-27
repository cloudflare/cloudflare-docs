---
pcx_content_type: concept
title: Signals Intelligence
---

# Bots Signals Intelligence

Signals Intelligence fields are fields that shows observations about a particular JA4 that Cloudflare has seen globally over the last hour.

## Available fields

| Field name | Description |
| `browser_pct` | Percentage of global traffic from user-agents identifying as browsers in the last hour using this fingerprint. |
| `heuristics_pct` | Percentage of global traffic identified by our heuristics engine as bad bots. |
| `cache_hit_pct` | Percentage of global traffic from in the last hour made to cached objects using this fingerprint. |
| `unique_zones` | Percentile of unique zones Cloudflare sees this fingerprint on in the past hour. |
| `4xx_pct` | Percentage of global traffic from in the last hour using this fingerprint that resulted in an HTTP 4xx response. |