---
title: Database commands
weight: 12
pcx_content_type: concept
---

# Database commands

D1 supports a number of database-level commands that allow you to list tables, indexes, and inspect the schema for a given table or index.

## Commands

You can execute any of these commands via the D1 console in the Cloudflare dashboard, [`wrangler d1 execute`](/workers/wrangler/commands/#d1), or with the [D1 client API](/d1/build-databases/query-databases/).

### `PRAGMA table_list`

Lists the tables in the database. This includes the system tables maintained by D1.

```sql
┌────────┬────────────────────┬───────┬──────┬────┬────────┐
│ schema │ name               │ type  │ ncol │ wr │ strict │
├────────┼────────────────────┼───────┼──────┼────┼────────┤
│ main   │ _cf_KV             │ table │ 2    │ 1  │ 0      │
├────────┼────────────────────┼───────┼──────┼────┼────────┤
│ main   │ sqlite_schema      │ table │ 5    │ 0  │ 0      │
├────────┼────────────────────┼───────┼──────┼────┼────────┤
│ temp   │ sqlite_temp_schema │ table │ 5    │ 0  │ 0      │
└────────┴────────────────────┴───────┴──────┴────┴────────┘
```

### `PRAGMA table_info(TABLE_NAME)`

Shows the schema (columns, types, null, default values) for the given `TABLE_NAME`.

```sql
┌─────┬────────────────┬───────────────┬─────────┬────────────┬────┐
│ cid │ name           │ type          │ notnull │ dflt_value │ pk │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 0   │ Id             │ INTEGER       │ 0       │            │ 1  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 1   │ CustomerId     │ VARCHAR(8000) │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 2   │ EmployeeId     │ INTEGER       │ 1       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 3   │ OrderDate      │ VARCHAR(8000) │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 4   │ RequiredDate   │ VARCHAR(8000) │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 5   │ ShippedDate    │ VARCHAR(8000) │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 6   │ ShipVia        │ INTEGER       │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 7   │ Freight        │ DECIMAL       │ 1       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 8   │ ShipName       │ VARCHAR(8000) │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 9   │ ShipAddress    │ VARCHAR(8000) │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 10  │ ShipCity       │ VARCHAR(8000) │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 11  │ ShipRegion     │ VARCHAR(8000) │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 12  │ ShipPostalCode │ VARCHAR(8000) │ 0       │            │ 0  │
├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤
│ 13  │ ShipCountry    │ VARCHAR(8000) │ 0       │            │ 0  │
└─────┴────────────────┴───────────────┴─────────┴────────────┴────┘
```

### `PRAGMA table_xinfo(TABLE_NAME)`

Similar to `PRAGMA table_info(TABLE_NAME)` but also includes [generated columns](/d1/reference/generated-columns/).

### `PRAGMA index_list(TABLE_NAME)`

Show the indexes for the given `TABLE_NAME`.

```sql
┌─────┬───────────────────┬────────┬────────┬─────────┐
│ seq │ name              │ unique │ origin │ partial │
├─────┼───────────────────┼────────┼────────┼─────────┤
│ 0   │ idx_ordered_users │ 0      │ c      │ 0       │
└─────┴───────────────────┴────────┴────────┴─────────┘
```

### `PRAGMA index_info(INDEX_NAME)`

Show the indexed column(s) for the given `INDEX_NAME`.

```sql
┌───────┬─────┬────────────┐
│ seqno │ cid │ name       │
├───────┼─────┼────────────┤
│ 0     │ 2   │ created_at │
└───────┴─────┴────────────┘
```

### Query `sqlite_master`

You can also query the `sqlite_master` table to show all tables, indexes, and the original SQL used to generate them:

```sql
SELECT name, sql FROM sqlite_master
```
```json
      {
        "name": "users",
        "sql": "CREATE TABLE users ( user_id INTEGER PRIMARY KEY, email_address TEXT, created_at INTEGER, deleted INTEGER, settings TEXT)"
      },
      {
        "name": "idx_ordered_users",
        "sql": "CREATE INDEX idx_ordered_users ON users(created_at DESC)"
      },
      {
        "name": "Order",
        "sql": "CREATE TABLE \"Order\" ( \"Id\" INTEGER PRIMARY KEY, \"CustomerId\" VARCHAR(8000) NULL, \"EmployeeId\" INTEGER NOT NULL, \"OrderDate\" VARCHAR(8000) NULL, \"RequiredDate\" VARCHAR(8000) NULL, \"ShippedDate\" VARCHAR(8000) NULL, \"ShipVia\" INTEGER NULL, \"Freight\" DECIMAL NOT NULL, \"ShipName\" VARCHAR(8000) NULL, \"ShipAddress\" VARCHAR(8000) NULL, \"ShipCity\" VARCHAR(8000) NULL, \"ShipRegion\" VARCHAR(8000) NULL, \"ShipPostalCode\" VARCHAR(8000) NULL, \"ShipCountry\" VARCHAR(8000) NULL)"
      },
      {
        "name": "Product",
        "sql": "CREATE TABLE \"Product\" ( \"Id\" INTEGER PRIMARY KEY, \"ProductName\" VARCHAR(8000) NULL, \"SupplierId\" INTEGER NOT NULL, \"CategoryId\" INTEGER NOT NULL, \"QuantityPerUnit\" VARCHAR(8000) NULL, \"UnitPrice\" DECIMAL NOT NULL, \"UnitsInStock\" INTEGER NOT NULL, \"UnitsOnOrder\" INTEGER NOT NULL, \"ReorderLevel\" INTEGER NOT NULL, \"Discontinued\" INTEGER NOT NULL)"
      }
```

## Related resources

* Learn [how to create indexes](/d1/build-databases/use-indexes/#list-indexes) in D1.
* Use D1's [JSON functions](/d1/reference/query-json/) to query JSON data.
* Use [`wrangler dev`](/workers/wrangler/commands/#dev) to run your Worker and D1 locally and debug issues before deploying.
