---
pcx_content_type: concept
title: Limits
---

# Limits

{{<Aside type="note" heading="D1 is currently in alpha">}}

Many of these limits will increase during D1's [public alpha](/workers/platform/betas/). Join the [`#d1-open-alpha`](https://discord.gg/rrZXVVcKQF) channel in the Cloudflare Developer Discord to keep up to date with changes.

{{</Aside>}}

| Feature                                            | Limit                                        |
| -------------------------------------------------- | -------------------------------------------- | 
| Databases                                          | 10 per account <sup>1</sup>                  |
| Database size                                      | 500 MB [new storage subsystem](/d1/changelog/#new-default-storage-subsystem) - 100 MB (legacy alpha backend) <sup>2</sup>                          |
| [Time Travel](/d1/learning/time-travel/) duration (point-in-time recovery)      | 30 days (Workers Paid) / 7 days (Free)       |
| Maximum Time Travel restore operations             | 10 restores per 10 minute (per database)     |
| Queries per Worker invocation (see [subrequest limits](/workers/platform/limits/#how-many-subrequests-can-i-make))                      | 50 (Bundled) / 1000 (Unbound)
| Maximum [database backups](/d1/learning/backups/)  | 24 hours (backups are hourly) (alpha only)   |
| Maximum number of columns per table                | 100                                          |
| Maximum number of rows per table                | Unlimited (excluding per-database storage limits) |
| Maximum string, `BLOB` or table row size           | 1,000,000 bytes (1MB)                        |
| Maximum SQL statement length                       | 100,000 bytes (100KB)                        |
| Maximum bound parameters per query                 | 100                                          |
| Maximum arguments per SQL function                 | 32                                            |
| Maximum characters (bytes) in a `LIKE` or `GLOB` pattern | 50 bytes |

{{<Aside type="note">}}

If you would like to explore other storage solutions for your application, Cloudflare also offers [Workers KV](/workers/runtime-apis/kv/), [Durable Objects](/durable-objects/), and [R2](/r2/get-started/). 

Refer to the [Storage options guide](/workers/learning/storage-options/) to review which storage option is right for your use case.

{{</Aside>}}

<sup>1</sup> Request adjustments to limits that conflict with your project goals by contacting Cloudflare. To make a request, complete the [Limit Increase Request Form](https://docs.google.com/forms/d/e/1FAIpQLSd_fwAVOboH9SlutMonzbhCxuuuOmiU1L_I5O2CFbXf_XXMRg/viewform), or speak to your account team. Note that not all limits can be increased.

<sup>2</sup> This is an alpha-only limit, and we intend to increase this as D1 moves towards General Availability (GA).
