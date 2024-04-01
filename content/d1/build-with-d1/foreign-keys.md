---
title: Foreign keys
pcx_content_type: concept
weight: 5
---

# Foreign keys

D1 supports defining and enforcing foreign key constraints across tables in a database.

Foreign key constraints allow you to enforce relationships across tables. For example, creating a strict binding between a `user_id` in a `users` table and the `user_id` in an `orders` table, so that no order can be created against a user that does not exist.

Foreign key constraints can also prevent you from deleting rows that reference rows in other tables: for example, deleting rows from the `users` table when rows in the `orders` table refer to them.

By default, D1 enforces that foreign key constraints are valid within all queries and migrations. This is identical to the behaviour you would observe when setting `PRAGMA foreign_keys = on` in SQLite for every transaction.

## Defer foreign key constraints

When running a [query](/d1/build-with-d1/client-api/), [migration](/d1/platform/migrations/) or [importing data](/d1/learning/importing-data/) against a D1 database, there may be situations in which you need to disable foreign key validation during table creation or changes to your schema.

* D1's foreign key enforcement is equivalent to SQLite's `PRAGMA foreign_keys = on` directive. Because D1 runs every query inside an implicit transaction, user queries cannot change this during a query or migration.
* Instead, D1 allows you to call `PRAGMA defer_foreign_keys = true` or `false`, which allows you to violate foreign key constraints temporarily.

{{<Aside type="warning">}}

If your migration or batch query does not resolve any outstanding foreign key violations, your migration or query will fail with an error.

The constraints will only be enforced at the end of the query, and if violated, D1 will return a `FOREIGN KEY constraint failed` error.

{{</Aside>}}

For example, given ...

```sql
---
filename: 0002_add_profile_table.sql
---

-- example goes here

```

## Define a foreign key relationship

A foreign key relationship can be defined when creating a table via `CREATE TABLE` or when adding a column to an existing table via an `ALTER TABLE` statement.

To illustrate this with an example based on an e-commerce website with two tables:

* A `users` table that defines common properties about a user account, including a unique `user_id` identifier
* An `orders` table that maps an order back to a `user_id` in the user table.

This mapping is defined as `FOREIGN KEY`, which ensures that:

* You cannot delete a row from the `users` table that would violate the foreign key constraint. In practice, this means that you can't end up with orders that do not have a valid user to map back to.
* `orders` are always defined against a valid `user_id`, mitigating the risk of creating orders that refer to invalid (or non-existant) users.
* Deleting orders does not delete users. The `ON DELETE RESTRICT` action as part of the table definition enables this.

The schema:

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
    user_who_ordered INTEGER,
    FOREIGN KEY(user_who_ordered) REFERENCES users(user_id) ON DELETE RESTRICT
)
```

You can define multiple foreign key relationships per-table, and foreign key definitions can reference multiple tables within your overall database schema. 

## `ON UPDATE` and `ON DELETE`

You can define _actions_ as part of your foreign key definitions to either limit or propagate changes to a parent row (`REFERENCES table(column)`). This can make using foreign key constraints in your application easier to reason about, and help either clean up related data or prevent data from being islanded.

There are five actions you can set when defining the `ON UPDATE` and/or `ON DELETE` clauses as part of a foreign key relationship. You can also define different actions for `ON UPDATE` and `ON DELETE` depending on your requirements.

* `CASCADE` - updating or deleting a parent key deletes all child keys (rows) associated it.
* `RESTRICT` - a parent key cannot be updated or deleted when _any_ child key refers to it. Unlike the default foreign key enforcement, relationships with `RESTRICT` applied return errors immediately, and not at the end of the transaction.
* `SET DEFAULT` - set the child column(s) referred to by the foreign key defintion to the `DEFAULT` value defined in the schema. If no `DEFAULT` is set on the child columns, you cannot use this action.
* `SET NULL` - set the child column(s) referred to by the foreign key defintion to SQL `NULL`.
* `NO ACTION` - take no action.

You should take care when using `CASCADE`: although it can be the desired behaviour in some cases, deleting child rows across tables can have undesirable effects and/or result in unintended side effects for your users.

In the following example, deleting a user from the `users` table will delete all related rows in the `scores` table as we've defined `ON DELETE CASCADE`. This may make sense in our application if we did not want to retain the scores for any users we've deleted entirely, but might mean that _other_ users can no longer look up or refer to scores that were still valid.

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    email_address TEXT,
)

CREATE TABLE scores (
    score_id INTEGER PRIMARY KEY,
    game TEXT,
    score INTEGER,
    player_id INTEGER,
    FOREIGN KEY(player_id) REFERENCES users(user_id) ON DELETE CASCADE
)
```

## Next Steps

* Read the SQLite [`FOREIGN KEY`](https://www.sqlite.org/foreignkeys.html) documentation.
* Learn how to [use the D1 client API](/d1/build-with-d1/d1-client-api/) from within a Worker.
* Understand how [database migrations work](/d1/reference/migrations/) with D1.
