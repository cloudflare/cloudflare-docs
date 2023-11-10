---
pcx_content_type: concept
title: Limits
---

# Limits

{{<Aside type="note" heading="D1 is currently in public beta">}}

Many of these limits will increase during D1's [public beta](/workers/platform/betas/). Join the [`#d1-beta`](https://discord.cloudflare.com) channel in the Cloudflare Developer Discord or subscribe to D1's [public changelog](/d1/changelog/) to keep up to date with changes.

{{</Aside>}}

| Feature                                            | Limit                                        |
| -------------------------------------------------- | -------------------------------------------- | 
| Databases                                          | 50,000 (Workers Paid) <sup>beta</sup> / 10 (Free) |
| Maximum database size                              | 2 GB (Workers Paid) <sup>beta</sup> / 500 MB (Free) |
| Maximum storage per account                        | 50 GB (Workers Paid) <sup>beta</sup> / 5 GB (Free) |
| [Time Travel](/d1/learning/time-travel/) duration (point-in-time recovery) | 30 days (Workers Paid) / 7 days (Free) |
| Maximum Time Travel restore operations             | 10 restores per 10 minute (per database)     |
| Queries per Worker invocation (read [subrequest limits](/workers/platform/limits/#how-many-subrequests-can-i-make))                      | 50 (Bundled) / 1000 (Unbound)
| Maximum number of columns per table                | 100                                          |
| Maximum number of rows per table                | Unlimited (excluding per-database storage limits) |
| Maximum string, `BLOB` or table row size           | 1,000,000 bytes (1 MB)                        |
| Maximum SQL statement length                       | 100,000 bytes (100 KB)                        |
| Maximum bound parameters per query                 | 100                                          |
| Maximum arguments per SQL function                 | 32                                           |
| Maximum characters (bytes) in a `LIKE` or `GLOB` pattern | 50 bytes                               |
| Maximum bindings per Workers script                 | Approximately 5,000 <sup>1</sup>     |

{{<Aside type="note">}}

If you would like to explore other storage solutions for your application, Cloudflare also offers [Workers KV](/kv/api/), [Durable Objects](/durable-objects/), and [R2](/r2/get-started/). 

Refer to the [Storage options guide](/workers/learning/storage-options/) to review which storage option is right for your use case.

{{</Aside>}}

<sup>beta</sup> This is a beta-only limitation. The maximum storage per-database, storage per-account and number of databases will automatically increase for paid plans during the course of D1's public beta.

<sup>1</sup> A single Worker script can have up to 1 MB of script metadata. A binding is defined as a binding to a resource, such as a D1 database, KV namespace, environmental variable or secret. Each resource binding is approximately 150-bytes, however environmental variables and secrets are controlled by the size of the value you provide. Excluding environmental variables, you can bind up to ~5,000 D1 databases to a single Worker script.

{{<render file="_limits_increase.md" productFolder="workers">}}