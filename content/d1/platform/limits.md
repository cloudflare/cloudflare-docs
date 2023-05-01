---
pcx_content_type: concept
title: Limits
---

# Limits

{{<Aside type="note" heading="D1 is currently in alpha">}}

Many of these limits will increase during D1's [public alpha](/workers/platform/betas/). Join the [`#d1-open-alpha`](https://discord.gg/rrZXVVcKQF) channel in the Cloudflare Developer Discord to keep up to date with changes.

{{</Aside>}}

{{<table-wrap>}}

| Feature                                            | Limit                                   |
| -------------------------------------------------- | --------------------------------------- |
| Databases                                          | 10 per account <sup>1</sup>             |
| Database size                                      | 100 MB <sup>2</sup>                     |
| Maximum [database backups](/d1/learning/backups/)  | 24 hours (backups are hourly)           |
| Maximum number of columns per table                | 100                                     |
| Maximum string, `BLOB` or table row size           | 1,000,000 bytes (1MB)                   |
| Maximum SQL statement length                       | 100,000 bytes (100KB)                   |

{{</table-wrap>}}

{{<Aside type="note">}}

If you would like to explore other storage solutions for your application, Cloudflare also offers [Workers KV](/workers/runtime-apis/kv/), [Durable Objects](/workers/runtime-apis/durable-objects/), and [R2](/r2/get-started/). 

Refer to the [Storage options guide](/workers/platform/storage-options/) to review which storage option is right for your use case.

{{</Aside>}}

* <sup>1</sup> Request adjustments to limits that conflict with your project goals by contacting Cloudflare. To make a request, complete the [Limit Increase Request Form](https://docs.google.com/forms/d/e/1FAIpQLSd_fwAVOboH9SlutMonzbhCxuuuOmiU1L_I5O2CFbXf_XXMRg/viewform), or speak to your account team. Note that not all limits can be increased.
* <sup>2</sup> This is an alpha-only limit, and we intend to increase this as D1 moves towards General Availability (GA).
