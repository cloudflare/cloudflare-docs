---
title: Importing data
weight: 8
pcx_content_type: concept
---

# Importing data

D1 allows you to import existing SQLite tables and their data directly, enabling you to migrate existing data into D1 quickly and easily. This can be useful when migrating applications to use Workers and D1, or when you want to prototype a schema locally before importing it to your D1 database(s).

## Import an existing database

To import an existing SQLite database into D1, you must have:

1. The Cloudflare [Wrangler CLI installed](/workers/wrangler/install-and-update/).
2. A database to use as the target
3. An existing SQLite (version 3.0+) database file to import.

{{<Aside type="note">}}

You cannot import a raw SQLite database (`.sqlite3` files) directly. Refer to [how to convert an existing SQLite file](#converting-sqlite-database-files) first.

{{</Aside>}}

For example, consider the following `users_export.sql` schema & values, which includes a `CREATE TABLE IF NOT EXISTS` statement:

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

With your `users_export.sql` file in the current working directory, you can pass the `--file=users_export.sql` flag to `d1 execute` to execute (import) our table schema and values:

```sh
$ wrangler d1 execute example-db --file=users_export.sql

🌀 Mapping SQL input into an array of statements
🌀 Parsing 1 statements
🌀 Executing on example-db (c7fe3a2a-9973-4231-85ff-edd63d7a4e6d):
🚣 Executed 1 command in 61.64555000513792ms
```

To confirm your table was imported correctly and is queryable, execute a `SELECT` statement against your `users` table directly:

```sh
$ wrangler d1 execute example-db --command "SELECT * FROM users LIMIT 100;"

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

Note that we apply a `LIMIT 100` clause here as a precaution: if you were importing a larger database with hundreds or thousands of rows, you may not want to output every row to the terminal.

From here, you can now query our new table from our Worker [using the D1 client API](/d1/platform/client-api/).

## Converting SQLite database files

{{<Aside type="note">}}

In order to convert a raw SQLite3 database dump (a `.sqlite3` file) you will need the [sqlite command-line tool](https://sqlite.org/cli.html) installed on your system.

{{</Aside>}}

If you have an existing SQLite database from another system, you can import its tables into a D1 database. Using the `sqlite` command-line tool, you can convert an `.sqlite3` file into a series of SQL statements that can be imported (executed) against a D1 database.

For example, if you have a raw SQLite dump called `db_dump.sqlite3`, run the following `sqlite` command to convert it:

```sh
$ sqlite3 db_dump.sqlite3 .dump > db.sql`.
```

You can then follow the steps to [import an existing database](#import-an-existing-database) into D1 by using the `.sql` file you generated from the database dump as the input to `wrangler d1 execute`.

## Troubleshooting

If you receive an error when trying to import an existing schema and/or dataaset into D1:

* Ensure you are importing data in SQL format (typically with a `.sql`) file extension. See [how to convert SQLite files](#converting-sqlite-database-files) if you have a `.sqlite3` database dump.
* Make sure the schema is [SQLite3](https://www.sqlite.org/docs.html) compatible. You cannot import data from a MySQL or PostgreSQL database into D1, as the types and SQL syntax are not directly compatible.
* If you have foreign key relationships between tables, ensure you are importing the tables in the right order. You can't refer to a table that doesn't yet exist.

## Next Steps

* Read the SQLite [`CREATE TABLE`](https://www.sqlite.org/lang_createtable.html) documentation
* Learn how to [use the D1 client API](/d1/platform/client-api/) from within a Worker
* Understand how [database migrations work](/d1/platform/migrations/) with D1
