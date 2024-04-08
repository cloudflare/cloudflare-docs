---
title: Limits
pcx_content_type: how-to
weight: 12
meta:
  title: Workers Analytics Engine — Limits
---

# Limits

The following limits apply to Workers Analytics Engine:

* Analytics Engine will accept up to twenty blobs, twenty doubles, and one index per call to `writeDataPoint`.
* The total size of all blobs in a request must not exceed 5120 bytes.
* Each index must not be more than 96 bytes.
* You can write a maximum of 25 data points per Worker invocation (client HTTP request). Each call to `writeDataPoint` counts towards this limit.

## Data retention

Data written to Workers Analytics Engine is stored for three months.

Interested in longer retention periods? Join the `#analytics-engine` channel in the [Cloudflare Developers Discord](https://discord.cloudflare.com/) and tell us more about what you are building.