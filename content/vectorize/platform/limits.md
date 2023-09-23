---
pcx_content_type: concept
title: Limits
weight: 9
---

{{<Aside type="note" heading="Vectorize public beta limits">}}

Many of these limits will increase during Vectorize's [public beta](/workers/platform/betas/). Visit the [changelog](/vectorize/changelog/) or join the [`#vectorize-beta`](https://discord.cloudflare.com/) channel in the Cloudflare Developer Discord to keep up to date with changes.

{{</Aside>}}
# Limits

The following limits apply to accounts, indexes and vectors (as specified):

| Feature                           | Current Limit                               |
| --------------------------------- | ------------------------------------------- |
| Indexes per account               | 10 index <sup>beta</sup>                    |
| Maximum dimensions per vector     | 1536 dimensions <sup>beta</sup>             |
| Maximum ID length                 | 64 bytes                                    |
| Metadata per vector               | 10KiB <sup>beta</sup>                       |
| Maximum returned results (`topK`) | 20   <sup>beta</sup>                        |
| Maximum upsert batch size         | 1000 <sup>beta</sup>                        |

<sup>beta</sup> This limit is beta only and is expected to increase during the beta.
