---
title: Use indexes
pcx_content_type: concept
weight: 3
---

# Use indexes

Indexes enable D1 to improve query performance over the indexed columns for common (popular) queries by reducing the amount of data (number of rows) the database has to scan when running a query.

## When is an index useful?

Indexes are useful:

* When you want to improve the read performance over columns that are regularly used in predicates - for example, a `WHERE email_address = ?` or `WHERE user_id = 'a793b483-df87-43a8-a057-e5286d3537c5'` - email addresses, usernames, user IDs and/or dates are good choices for columns to index in typical web applications or services.
* For enforcing uniqueness constraints on a column or columns - for example, an email address or user ID via the `CREATE UNIQUE INDEX`.
* In cases where you query over multiple columns together - `(customer_id, transaction_date)`.

Indexes are automatically updated when the table and column(s) they reference are inserted, updated or deleted. You do not need to manually update an index after you write to the table it references.

## Create an index

{{<Aside type="note">}}
Tables that use the default primary key (an `INTEGER` based `ROWID`), or that define their own `INTEGER PRIMARY KEY`, do not need to create an index for that column.
{{</Aside>}}

To create an index on a D1 table, use the `CREATE INDEX` SQL command and specify the table and column(s) to create the index over.

For example, given the following `orders` table, you may want to create an index on `customer_id`. Nearly all of your queries against that table filter on `customer_id`, and you would see a performance improvement by creating an index for it.

```sql
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY,
    customer_id STRING NOT NULL, -- for example, a unique ID aba0e360-1e04-41b3-91a0-1f2263e1e0fb
    order_date STRING NOT NULL,
    status INTEGER NOT NULL,
    last_updated_date STRING NOT NULL
)
```

To create the index on the `customer_id` column, execute the below statement against your database: 

{{<Aside type="note">}}
A common naming format for indexes is `idx_TABLE_NAME_COLUMN_NAMES`, so that you can identify the table and column(s) your indexes are for when managing your database.
{{</Aside>}}

```sql
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id)
```

Queries that reference the `customer_id` column will now benefit from the index:

```sql
-- Uses the index: the indexed column is referenced by the query.
SELECT * FROM orders WHERE customer_id = ?

-- Does not use the index: customer_id is not in the query.
SELECT * FROM orders WHERE order_date = '2023-05-01'
```

In more complex cases, you can confirm whether an index was used by D1 by [analyzing a query](#testing-an-index) directly.

## List indexes

List the indexes on a database, as well as the SQL definition, by querying the `sqlite_schema` system table:

```sql
SELECT name, type, sql FROM sqlite_schema WHERE type IN ('index');
```

This will return output resembling the below:

```sh
┌──────────────────────────────────┬───────┬────────────────────────────────────────┐
│ name                             │ type  │ sql                                    │
├──────────────────────────────────┼───────┼────────────────────────────────────────┤
│ idx_users_id                     │ index │ CREATE INDEX idx_users_id ON users(id) │
└──────────────────────────────────┴───────┴────────────────────────────────────────┘
```

Note that you cannot modify this table, or an existing index. To modify an index, [delete it first](#removing-indexes) and [create a new index](#creating-an-index) with the updated definition.

## Test an index

Validate that an index was used for a query by prepending a query with [`EXPLAIN QUERY PLAN`](https://www.sqlite.org/eqp.html). This will output a query plan for the succeeding statement, including which (if any) indexes were used.

For example, if you assume the `users` table has an `email_address TEXT` column and you created an index `CREATE UNIQUE INDEX idx_email_address ON users(email_address)`, any query with a predicate on `email_address` should use your index. 

```sql
EXPLAIN QUERY PLAN SELECT * FROM users WHERE email_address = 'foo@example.com';
QUERY PLAN
`--SEARCH users USING INDEX idx_email_address (email_address=?)
```

Review the `USING INDEX <INDEX_NAME>` output from the query planner, confirming the index was used.

This is also a fairly common use-case for an index. Finding a user based on their email address is often a very common query type for login (authentication) systems.

## Multi-column indexes

For a multi-column index (an index that specifies multiple columns), queries will only use the index if they specify either _all_ of the columns, or a subset of the columns provided all columns to the "left" are also within the query.

Given an index of `CREATE INDEX idx_customer_date_transaction_date ON transactions(customer_id, transaction_date)`, the following table shows when the index is used (or not):

| Query                                                             | Index Used?   |
| ----------------------------------------------------------------- | ------------- |
| `SELECT * FROM transactions WHERE customer_id = '1234' AND transaction_date = '2023-03-25'` | Yes: specifies both columns in the index. |
| `SELECT * FROM transactions WHERE transaction_date = '2023-03-28'` | No: only specifies `transaction_date`, and does not include other leftmost columns from the index. |
| `SELECT * FROM transactions WHERE customer_id = '56789'` | Yes: specifies `customer_id`, which is the leftmost column in the index. |
  
Notes:

* If you created an index over three columns instead — `customer_id`, `transaction_date` and `shipping_status` — a query that uses both `customer_id` and `transaction_date` would use the index, as you are including all columns "to the left".
* With the same index, a query that uses only `transaction_date` and `shipping_status` would _not_ use the index, as you have not used `customer_id` (the leftmost column) in the query.

## Partial indexes

Partial indexes are indexes over a subset of rows in a table. Partial indexes are defined by the use of a `WHERE` clause when creating the index. A partial index can be useful to omit certain rows, such as those where values are `NULL` or where rows with a specific value are present across queries.

* A concrete example of a partial index would be on a table with a `order_status INTEGER` column, where `6` might represent `"order complete"` in your application code.
* This would allow queries against orders that are yet to be fulfilled, shipped or are in-progress, which are likely to be some of the most common users (users checking their order status).
* Partial indexes also keep the index from growing unbounded over time. The index does not need to keep a row for every completed order, and completed orders are likely to be queried far fewer times than in-progress orders.

A partial index that filters out completed orders from the index would resemble the following:

```sql
CREATE INDEX idx_order_status_not_complete ON orders(order_status) WHERE order_status != 6
```

Partial indexes can be faster at read time (less rows in the index) and at write time (fewer writes to the index) than full indexes. You can also combine a partial index with a [multi-column index](#multi-column-indexes).

## Removing indexes

Use `DROP INDEX` to remove an index. Dropped indexes cannot be restored.

## Considerations

Take note of the following considerations when creating indexes:

* Indexes are not always a free performance boost. You should create indexes only on columns that reflect your most-queried columns. Indexes themselves need to be maintained. When you write to an indexed column, the database needs to write to the table and the index.
* You cannot create indexes that reference other tables or use non-deterministic functions, since the index would not be stable.
* Indexes cannot be updated. To add or remove a column from an index, [remove](#removing-indexes) the index and then [create a new index](#creating-an-index) with the new columns.
* Indexes contribute to the overall storage required by your database: an index is effectively a table itself.
