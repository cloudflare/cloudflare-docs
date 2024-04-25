---
pcx_content_type: concept
title: Limits
weight: 2
---

# Limits

| Feature                                            | Limit                                        |
| -------------------------------------------------- | -------------------------------------------- | 
| Databases                                          | 50,000 (Workers Paid) / 10 (Free) |
| Maximum database size                              | 10 GB (Workers Paid) / 500 MB (Free) |
| Maximum storage per account                        | 250 GB (Workers Paid)<sup>1</sup> / 5 GB (Free) |
| [Time Travel](/d1/reference/time-travel/) duration (point-in-time recovery) | 30 days (Workers Paid) / 7 days (Free) |
| Maximum Time Travel restore operations             | 10 restores per 10 minute (per database)     |
| Queries per Worker invocation (read [subrequest limits](/workers/platform/limits/#how-many-subrequests-can-i-make))                      | 50 (Bundled) / 1000 (Unbound)
| Maximum number of columns per table                | 100                                          |
| Maximum number of rows per table                | Unlimited (excluding per-database storage limits) |
| Maximum string, `BLOB` or table row size           | 1,000,000 bytes (1 MB)                        |
| Maximum SQL statement length                       | 100,000 bytes (100 KB)                        |
| Maximum bound parameters per query                 | 100                                          |
| Maximum arguments per SQL function                 | 32                                           |
| Maximum characters (bytes) in a `LIKE` or `GLOB` pattern | 50 bytes                               |
| Maximum bindings per Workers script                 | Approximately 5,000 <sup>2</sup>     |
| Maximum SQL query duration                    | 30 seconds                        |

{{<Aside type="note">}}

If you would like to explore other storage solutions for your application, Cloudflare also offers [Workers KV](/kv/api/), [Durable Objects](/durable-objects/), and [R2](/r2/get-started/). 

Refer to the [Choose a data or storage product](/workers/platform/storage-options/) to review which storage option is right for your use case.

{{</Aside>}}

<sup>1</sup> The maximum storage per account can be increased by request on Workers Paid and Enterprise plans. See the guidance on limit increases on this page to request an increase. 

<sup>2</sup> A single Worker script can have up to 1 MB of script metadata. A binding is defined as a binding to a resource, such as a D1 database, KV namespace, environmental variable or secret. Each resource binding is approximately 150-bytes, however environmental variables and secrets are controlled by the size of the value you provide. Excluding environmental variables, you can bind up to ~5,000 D1 databases to a single Worker script.

{{<render file="_limits_increase.md" productFolder="workers">}}
