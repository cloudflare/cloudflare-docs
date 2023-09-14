---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note">}}
The alpha [currently limits](/d1/platform/limits/) maximum database size to 500 MB and allows a total of 10 databases across all [Workers plans](/workers/platform/pricing/#workers). Pricing below is not yet final.
{{</Aside>}}

|                                 | [Workers Free](/workers/platform/pricing/#workers) | [Workers Paid](/workers/platform/pricing/#workers)                 |
| ------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| Rows read                       | 5 million / day                                    | First 25 billion / month included  + $0.001 / million rows |
| Rows written                    | 100,000 / day                                      | First 50 million / month included + $1.00 / million rows |
| Storage (per GB stored)         | 1GB (total)                                        | First 5GB included + $0.75 / GB-mo |



### Definitions
1. Rows read measure how many rows a query reads (scans), regardless of the size of each row. For example, if you have a table with 5000 rows and run a `SELECT * FROM table` as a full table scan, this would count as 5,000 rows read. A query that filters on an [unindexed column](/d1/learning/using-indexes/) may return fewer rows to your Worker, but is still required to read (scan) more rows to determine which subset to return.
2. Rows written measure how many rows were written to D1 database. A query that `INSERT` 10 rows into a `users` table would count as 10 rows written.
3. Row size or the number of columns in a row does not impact how rows are counted. A row that is 1 KB and a row that is 100 KB both count as one row.
4. Definining [indexes](/d1/learning/using-indexes/) on your table(s) reduce the number of rows read by a query when filtering on that indexed field. For example, if the `users` table has an index on a timestamp column `created_at`, the query `SELECT * FROM users WHERE created_at > ?1` would only need to read a subset of the table.
5. Indexes will add an additional written row when writes include the indexed column, as there are two rows written: one to the table itself, and one to the index. The performance benefit of an index and reduction in rows read will, in nearly all cases, offset this additonal write.
6. Storage is based on gigabytes stored per month, and is based on the sum of all databases in your account. Tables and indexes both count towards storage consumed.
7. Free limits reset daily at 00:00 UTC. Monthly included limits reset based on your monthly subscription renewal date, which is determined by the day you first subscribed.
8. There are no data transfer (egress) or throughput (bandwidth) charges for data accessed from D1.