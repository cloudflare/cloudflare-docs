---
title: Importing Data
weight: 1
pcx_content_type: concept
---

# Importing Data

D1 allows you to import existing SQLite tables & their data directly, enabling you to migrate existing data into D1 quickly and easily. This can be useful when migrating applications to use Workers + D1, or when you want to prototype a schema locally before importing it to your D1 database(s).

## Import an Existing Database

To import an existing SQLite database into D1, you need to:

1. Have the Cloudflare [Wrangler CLI installed](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
2. Create a database to use as the target
3. Have an existing SQLite (version 3.0+) database file to import

{{<Aside type="note">}}

You cannot import SQLite database (`.sqlite3`) directly. Use the `sqlite3` [command line tool](https://sqlite.org/cli.html) to convert the database dump: `sqlite3 db_dump.sqlite3 .dump > db.sql`.

{{</Aside>}}

For example, consider the following `users_export.sql` schema & values, which includes a `CREATE TABLE IF NOT EXISTS` statement

```sql
CREATE TABLE IF NOT EXISTS users (
	id VARCHAR(50),
	full_name VARCHAR(50),
	created_on DATE
);
insert into users (id, full_name, created_on) values ('01GREFXCN9519NRVXWTPG0V0BF', 'Catlaina Harbar', '2022-08-20 05:39:52');
insert into users (id, full_name, created_on) values ('01GREFXCNBYBGX2GC6ZGY9FMP4', 'Hube Bilverstone', '2022-12-15 21:56:13');
insert into users (id, full_name, created_on) values ('01GREFXCNCWAJWRQWC2863MYW4', 'Christin Moss', '2022-07-28 04:13:37');
insert into users (id, full_name, created_on) values ('01GREFXCNDGQNBQAJG1AP0TYXZ', 'Vlad Koche', '2022-11-29 17:40:57');
insert into users (id, full_name, created_on) values ('01GREFXCNF67KV7FPPSEJVJMEW', 'Riane Zamora', '2022-12-24 06:49:04');
```

With our `users_export.sql` file in the current working directory, we can pass the `--file=users_export.sql` flag to `d1 execute` to execute (import) our table schema & values:

```sh
➜  wrangler d1 execute example-db --file=users_export.sql

🌀 Mapping SQL input into an array of statements
🌀 Parsing 1 statements
🌀 Executing on example-db (c7fe3a2a-9973-4231-85ff-edd63d7a4e6d):
🚣 Executed 1 command in 61.64555000513792ms
```

To confirm our table was imported correctly and is queryable, we can execute a simple `SELECT` statement against our `users` table directly:

```sh
➜  wrangler d1 execute example-db --command "SELECT * FROM users LIMIT 100;"

🌀 Mapping SQL input into an array of statements
🌀 Parsing 1 statements
🌀 Executing on example-db (63571930-b2f1-4bdb-bffa-a7db6ee04c5d):
🚣 Executed 1 command in 102.00563299655914ms
┌────────────────────────────┬──────────────────┬─────────────────────┐
│ id                         │ full_name        │ created_on          │
├────────────────────────────┼──────────────────┼─────────────────────┤
│ 01GREFXCN9519NRVXWTPG0V0BF │ Catlaina Harbar  │ 2022-08-20 05:39:52 │
├────────────────────────────┼──────────────────┼─────────────────────┤
│ 01GREFXCNBYBGX2GC6ZGY9FMP4 │ Hube Bilverstone │ 2022-12-15 21:56:13 │
├────────────────────────────┼──────────────────┼─────────────────────┤
│ 01GREFXCNCWAJWRQWC2863MYW4 │ Christin Moss    │ 2022-07-28 04:13:37 │
├────────────────────────────┼──────────────────┼─────────────────────┤
│ 01GREFXCNDGQNBQAJG1AP0TYXZ │ Vlad Koche       │ 2022-11-29 17:40:57 │
├────────────────────────────┼──────────────────┼─────────────────────┤
│ 01GREFXCNF67KV7FPPSEJVJMEW │ Riane Zamora     │ 2022-12-24 06:49:04 │
└────────────────────────────┴──────────────────┴─────────────────────┘
```

Note that we apply a `LIMIT 100` clause here as a precaution: if we were importing a larger database with hundreds or thousands of rows, we may not want to output every row to the terminal.

From here, we can now query our new table from our Worker [using the D1 client API](https://developers.cloudflare.com/d1/platform/client-api/).

## Troubleshooting

If you receive an error when trying to import an existing schema and/or dataaset into D1:

* Ensure you are importing data in SQL format (typically with a `.sql`) file extension. You cannot import SQLite database (`.sqlite3`) directly. Use the `sqlite3` [command line tool](https://sqlite.org/cli.html) to convert the database dump: `sqlite3 db_dump.sqlite3 .dump > db.sql`.
* Make sure the schema is [SQLite 3](https://www.sqlite.org/docs.html) compatible. You cannot import data from a MySQL or PostgreSQL database into D1, as the types and SQL syntax are not directly compatible.
* If you have foreign key relationships between tables, ensure you are importing the tables in the right order. You can't refer to a table that doesn't yet exist.

## Next Steps

* Read the SQLite [`CREATE TABLE`](https://www.sqlite.org/lang_createtable.html) documentation
* Learn how to [use the D1 client API](https://developers.cloudflare.com/d1/platform/client-api/) from within a Worker
* Understand how [database migrations work](https://developers.cloudflare.com/d1/platform/migrations/) with D1
