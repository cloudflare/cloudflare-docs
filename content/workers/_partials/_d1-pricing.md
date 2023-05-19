---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note">}}
The alpha [currently limits](/d1/platform/limits/) maximum database size to 100 MB and allows a total of 10 databases across all [Workers plans](/workers/platform/pricing/#workers). Pricing below is not yet final.
{{</Aside>}}

|                                 | [Workers Free](/workers/platform/pricing/#workers) | [Workers Paid](/workers/platform/pricing/#workers)                 |
| ------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| Read units (per 4KB scanned)    | 5 million / day                                    | First 25 billion / month included  + $0.001 / million units |
| Write units (per 1KB written)   | 100,000 / day                                      | First 50 million / month included + $1.00 / million units |
| Storage (per GB stored)         | 1GB (total)                                        | First 5GB included + $0.75 / GB-mo |

Notes:

1. Read units measure how much data a query reads (scans), in units of 4 KB. For example, if you have a table with 5000 rows, with each row ~200 bytes, and run a `SELECT * FROM table`, your query would scan (5000 rows * 0.2KB / 4KB read unit) 1000 KB in total, or 250 read units.
2. Write units measure how much data was written to a D1 database, in 1KB units. An `INSERT` of a single row of 1900 bytes — a userID, name, email address and comments field, for example — would count as two (2) write units (2KB).
3. Both read and write units are rounded up to the nearest whole unit. A query that reads 1,000 rows of approximately 90 bytes (`1000*.009 / 4`), would consume 23 read units.
4. Storage is based on gigabytes stored per month, and is based on the sum of all databases in your account. Tables and indexes both count towards storage consumed.
5. Free limits reset daily at 00:00 UTC. Monthly included limits reset based on your monthly subscription renewal date, which is determined by the day you first subscribed.
6. There are no data transfer (egress) or throughput (bandwidth) charges for data accessed from D1.