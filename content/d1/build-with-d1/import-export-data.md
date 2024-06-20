---
title: Import and export data
weight: 1
pcx_content_type: concept
---

# Import and export data

D1 allows you to import existing SQLite tables and their data directly, enabling you to migrate existing data into D1 quickly and easily. This can be useful when migrating applications to use Workers and D1, or when you want to prototype a schema locally before importing it to your D1 database(s).

D1 also allows you to export a database. This can be useful for [local development](/d1/build-with-d1/local-development/) or testing.

## Import an existing database

To import an existing SQLite database into D1, you must have:

1. The Cloudflare [Wrangler CLI installed](/workers/wrangler/install-and-update/).
2. A database to use as the target.
3. An existing SQLite (version 3.0+) database file to import.

{{<Aside type="note">}}

You cannot import a raw SQLite database (`.sqlite3` files) directly. Refer to [how to convert an existing SQLite file](#convert-sqlite-database-files) first.

{{</Aside>}}

For example, consider the following `users_export.sql` schema & values, which includes a `CREATE TABLE IF NOT EXISTS` statement:

```sql
CREATE TABLE IF NOT EXISTS users (
	id VARCHAR(50),
	full_name VARCHAR(50),
	created_on DATE
);
INSERT INTO users (id, full_name, created_on) VALUES ('01GREFXCN9519NRVXWTPG0V0BF', 'Catlaina Harbar', '2022-08-20 05:39:52');
INSERT INTO users (id, full_name, created_on) VALUES ('01GREFXCNBYBGX2GC6ZGY9FMP4', 'Hube Bilverstone', '2022-12-15 21:56:13');
INSERT INTO users (id, full_name, created_on) VALUES ('01GREFXCNCWAJWRQWC2863MYW4', 'Christin Moss', '2022-07-28 04:13:37');
INSERT INTO users (id, full_name, created_on) VALUES ('01GREFXCNDGQNBQAJG1AP0TYXZ', 'Vlad Koche', '2022-11-29 17:40:57');
INSERT INTO users (id, full_name, created_on) VALUES ('01GREFXCNF67KV7FPPSEJVJMEW', 'Riane Zamora', '2022-12-24 06:49:04');
```

With your `users_export.sql` file in the current working directory, you can pass the `--file=users_export.sql` flag to `d1 execute` to execute (import) our table schema and values:

```sh
$ wrangler d1 execute example-db --remote --file=users_export.sql
```

To confirm your table was imported correctly and is queryable, execute a `SELECT` statement to fetch all the tables from your D1 database:

```sh
$ wrangler d1 execute example-db --remote --command "SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name;"

...
🌀 To execute on your local development database, remove the --remote flag from your wrangler command.
🚣 Executed 1 commands in 0.3165ms
┌────────┐
│ name   │
├────────┤
│ _cf_KV │
├────────┤
│ users  │
└────────┘
```

{{<Aside type="note">}}
The `_cf_KV` table is a reserved table used by D1's underlying storage system. It cannot be queried and does not incur read/write operations charges against your account.

{{</Aside>}}

From here, you can now query our new table from our Worker [using the D1 client API](/d1/build-with-d1/d1-client-api/).

### Convert SQLite database files

{{<Aside type="note">}}

In order to convert a raw SQLite3 database dump (a `.sqlite3` file) you will need the [sqlite command-line tool](https://sqlite.org/cli.html) installed on your system.

{{</Aside>}}

If you have an existing SQLite database from another system, you can import its tables into a D1 database. Using the `sqlite` command-line tool, you can convert an `.sqlite3` file into a series of SQL statements that can be imported (executed) against a D1 database.

For example, if you have a raw SQLite dump called `db_dump.sqlite3`, run the following `sqlite` command to convert it:

```sh
$ sqlite3 db_dump.sqlite3 .dump > db.sql
```

Once you have run the above command, you will need to edit the output SQL file to be compatible with D1:

1. Remove `BEGIN TRANSACTION` and `COMMIT;` from the file
2. Remove the following table creation statement (if present):
   ```sql
   CREATE TABLE _cf_KV (
		key TEXT PRIMARY KEY,
		value BLOB
   ) WITHOUT ROWID;
   ```

You can then follow the steps to [import an existing database](#import-an-existing-database) into D1 by using the `.sql` file you generated from the database dump as the input to `wrangler d1 execute`.

## Foreign key constraints

When importing data, you may need to temporarily disable [foreign key constraints](/d1/build-with-d1/foreign-keys/). To do so, call `PRAGMA defer_foreign_keys = true` before making changes that would violate foreign keys.

Refer to the [foreign key documentation](/d1/build-with-d1/foreign-keys/) to learn more about how to work with foreign keys and D1.


## Export an existing D1 database

In addition to importing existing SQLite databases, you might want to export a D1 database for local development or testing. You can export a D1 database to a `.sql` file using [wrangler d1 export](/workers/wrangler/commands/#export) and then execute (import) with `d1 execute --file`.

To export full D1 database schema and data:
```sh
$ npx wrangler d1 export <database_name> --remote --output=./database.sql
```

To export single table schema and data:
```sh
$ npx wrangler d1 export <database_name> --remote --table=<table_name> --output=./table.sql
```

To export only D1 database schema:
```sh
$ npx wrangler d1 export <database_name> --remote --output=./schema.sql --no-data=true
```

To export only D1 table schema:
```sh
$ npx wrangler d1 export <database_name> --remote --table=<table_name> --output=./schema.sql --no-data=true
```

### Known limitations

- Export is not supported for virtual tables, including databases with virtual tables. D1 supports virtual tables for full-text search using SQLite's [FTS5 module](https://www.sqlite.org/fts5.html). As a workaround, delete any virtual tables, export, and then recreate virtual tables.
- A running export will block other database requests.

## Troubleshooting

If you receive an error when trying to import an existing schema and/or dataset into D1:

- Ensure you are importing data in SQL format (typically with a `.sql` file extension). Refer to [how to convert SQLite files](#convert-sqlite-database-files) if you have a `.sqlite3` database dump.
- Make sure the schema is [SQLite3](https://www.sqlite.org/docs.html) compatible. You cannot import data from a MySQL or PostgreSQL database into D1, as the types and SQL syntax are not directly compatible.
- If you have foreign key relationships between tables, ensure you are importing the tables in the right order. You cannot refer to a table that does not yet exist.
- If you receive a `"cannot start a transaction within a transaction"` error, make sure you have removed `BEGIN TRANSACTION` and `COMMIT` from your dumped SQL statements.

## Next Steps

* Read the SQLite [`CREATE TABLE`](https://www.sqlite.org/lang_createtable.html) documentation.
* Learn how to [use the D1 client API](/d1/build-with-d1/d1-client-api/) from within a Worker.
* Understand how [database migrations work](/d1/reference/migrations/) with D1.
