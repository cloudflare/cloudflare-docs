---
pcx_content_type: concept
title: Limits
weight: 2
---

{{<Aside type="note" heading="Vectorize public beta limits">}}

Many of these limits will increase during Vectorize's [public beta](/workers/platform/betas/). Refer to the [changelog](/vectorize/platform/changelog/) or join the [`#vectorize-beta`](https://discord.cloudflare.com/) channel in the Cloudflare Developer Discord to keep up to date with changes.

{{</Aside>}}
# Limits

The following limits apply to accounts, indexes and vectors (as specified):

| Feature                           | Current Limit                               |
| --------------------------------- | ------------------------------------------- |
| Indexes per account               | 100 indexes <sup>beta</sup>                 |
| Maximum dimensions per vector     | 1536 dimensions <sup>beta</sup>             |
| Maximum vector ID length          | 64 bytes                                    |
| Metadata per vector               | 10KiB <sup>beta</sup>                       |
| Maximum returned results (`topK`) | 20   <sup>beta</sup>                        |
| Maximum upsert batch size (per batch) | 1000 <sup>beta</sup> (Workers) / 5000 <sup>beta</sup> (HTTP API) |
| Maximum index name length         | 63 bytes                                    |
| Maximum vectors per index         | 200,000 <sup>beta</sup>                     |
| Maximum namespaces per index      | 1000 namespaces  <sup>beta</sup>            |
| Maximum namespace name length     | 63 bytes                                    |

<sup>beta</sup> This limit is beta only and is expected to increase over time.
