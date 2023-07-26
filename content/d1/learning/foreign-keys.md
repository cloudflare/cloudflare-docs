---
title: Foreign keys
pcx_content_type: concept
weight: 4
---

# Foreign keys

D1 supports defining and enforcing foreign key constraints across tables in a database.

Foreign key constraints allow you to enforce relationships across tables. For example, creating a strict binding between a `user_id` in a `users` table and the `user_id` in an `orders` table, so that no order can be created against a user that does not exist.

Foreign key constraints can also prevent you from deleting rows in a `users` table when rows in the `orders` - 

{{<Aside type="note" heading="New experimental back-end">}}

D1 has a new experimental storage back-end that dramatically improves query throughput, latency and reliability. The experimental back-end will become the default back-end for all new D1 databases in the near future.

Foreign keys are only enforced on the experimental backend.

To create a database using the experimental back-end, use `wrangler` and set the `--experimental-backend` flag when creating a database: 

```sh
$ wrangler d1 create <DATABASE_NAME> --experimental-backend
```

Refer to the [announcement blog](https://blog.cloudflare.com/d1-turning-it-up-to-11/) to learn more about experimental back-end.

{{</Aside>}}

## Define a foreign key relationship

A foreign key relationship can be defined when creating a table via `CREATE TABLE` or when adding a column to an existing table via an `ALTER TABLE` statement.

To illustrate this with an example based on an e-commerce website with two tables:

* A `users` table that defines common properties about a user account, including a unique `user_id` identifier
* An `orders` table that maps an order back to a `user_id` in the user table.

This mapping is defined as `FOREIGN KEY`, which ensures that:

* ...
* ...
* ...

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    email_address TEXT,
    name TEXT,
    metadata TEXT
)

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    status INTEGER,
    item_desc TEXT,
    shipped_date INTEGER,
    FOREIGN KEY(user_who_ordered) REFERENCES users(user_id) ON DELETE RESTRICT
)
```



## Updating or deleting rows

* `ON UPDATE`
* `ON DELETE`

https://www.sqlite.org/foreignkeys.html#fk_actions

## Relax foreign key constraints

When running a [query](/d1/platform/client-api/), [migration](/d1/platform/migrations/) or [importing data](/d1/learning/importing-data/) against a D1 database, there may be situations in which you need to disable foreign key validation during table creation or changes to your schema.

* D1's foreign key enforcement is equivalent to SQLite's `PRAGMA foreign_keys = on` directive. Because D1 runs every query inside an implicit transaction, user queries cannot change this during a query or migration.
* Instead, D1 allows you to call `PRAGMA defer_foreign_keys = true` or `false`, which allows you to violate foreign key constraints temporarily.

{{<Aside type="warning">}}

If your migration or batch query does not resolve any outstanding foreign key violations, 
The constraints will only be enforced at the end of the query, and if violated, D1 will return a `FOREIGN KEY constraint failed` error.

{{</Aside>}}

For example, given ...

```sql
---
filename: 0002_add_profile_table.sql
---

-- example goes here

```

https://www.sqlite.org/pragma.html#pragma_defer_foreign_keys

## Handling errors

...



## Notes
