---
pcx_content_type: concept
title: Pricing
---

# Pricing

{{<Aside type="note">}}
While in public Alpha, D1 is currently free to use on all [Workers plans](/workers/platform/pricing/#workers). Refer to the [our recent announcement](https://blog.cloudflare.com/d1-turning-it-up-to-11/)) for more information.
{{</Aside>}}

D1 bills based on:

* **Usage**: Queries you issue against D1 will count as rows read, rows written, or both (for transactions or batches).
* **Scale-to-zero**: You are not billed for "hours" or "capacity units". If you are not issuing queries against your database, you are not billed for compute.
* **Storage**: You are only billed for storage above the included [limits](/d1/platform/limits/) of your plan.

## Billing metrics 

{{<render file="_d1-pricing.md" productFolder="workers">}}

## Frequently Asked Questions

Frequently asked questions related to D1 pricing:

* Will D1 always have a free tier? 

Yes, the [Workers free tier](/workers/platform/pricing/#workers) will always include the ability to prototype and experiment with D1 for free.

* What happens if I exceed the daily limits on reads & writes, or the total storage limit, on the free tier?

{{<Aside type="note">}}
Note: These free limits are not currently enforced during the open alpha.
{{</Aside>}}

When your account hits the daily read and/or write limits, you will not be able to issue queries against D1. The D1 API will return errors to your client indicating that your daily limits have been exceeded. Once you have reached your included storage limit, you will need to delete unused databases or clean up stale data before you can insert new data, create or alter tables or create indexes and triggers.

Upgrading to the Paid plan will remove these limits, typically within minutes.

* What happens if I exceed the monthly included reads, writes and/or storage on the paid tier?

{{<Aside type="note">}}
Note: Billing is not currently enabled during the alpha.
{{</Aside>}}

You will be billed for the additional reads, writes and storage according to [D1's pricing metrics](#billing-metrics).

* When will D1 start billing me?

For [Workers Paid tier](/workers/platform/pricing/#workers) users, we intend to start billing for additional usage beyond the included reads, writes and storage by (no earlier than) September 2023. We will notify all customers via email (the super administrator address on their account) prior to this change.

* How can I estimate my (eventual) bill?

Every query returns a `meta` object that contains a total count of the rows read (`rows_read`) and rows written (`rows_written`) by that query. For example, a query that performs a full table scan (for instance, `SELECT * FROM users`) from a table with 5000 rows would return a `rows_read` value of `5000`:

```json
"meta": {
  "duration": 0.20472300052642825,
  "size_after": 45137920,
  "rows_read": 5000,
  "rows_written": 0
}
```

These are also included in the D1 [Cloudflare dashboard](https://dash.cloudflare.com) and the [analytics API](/d1/platform/metrics-analytics/), allowing you to attribute read and write volumes to specific databases, time periods, or both.

* Does D1 charge for data transfer / egress?

No.

* Does D1 charge additional for additional compute?

D1 itself does not charge for additional compute. Workers querying D1 and computing results: for example, serializing results into JSON and/or issuing queries, are billed per [Workers pricing](/workers/platform/pricing/#workers), in addition to your D1 specific usage.

* Do queries I issue from the dashboard or wrangler (the CLI) count as billable usage?

Yes: any queries you issue against your database, including `INSERT`ing existing data into a new database, table scans (`SELECT * FROM table`), or creating indexes count as either reads or writes.

* Can I use an index to reduce the number of rows read by a query?

Yes, you can use an index to reduce the number of rows read by a query. [Creating indexes](/d1/learning/using-indexes/) for your most queried tables and filtered columns reduce how much data is scanned and improve query performance at the same time. If you have a read-heavy workload (most common), this can be particularly advantageous. Writing to columns referenced in an index will add at least one (1) additional row written to account for updating the index, but this is typically offset by the reduction in rows read due to the benefits of an index.

* Does a freshly created database, and/or an empty table with no rows, contribute to my storage?

Yes, although minimal. An empty table consumes at least a few kilobytes, based on the number of columns (table width) in the table. An empty database consumes approximately 100KB of storage.
