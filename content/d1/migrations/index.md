---
title: Migrations
weight: 5
pcx_content_type: concept
---

# Migrations

Database migrations are a way of versioning your changes made to your database. Migrations are stored in a `migrations` folder inside your project directory and will contain versioned `.sql` files. This enables you to store and track changes throughout database development. 

## Features

Currently, the migrations system aims to be simple yet effective. With the current implementation, you can:

* Create an empty migration file.
* List unapplied migrations.
* Apply remaining migrations.

Every migration in the `migrations` folder has a specified version number and can be in sequential order. Every migration file is just an SQL file, where you can specify queries to be run. 

If applying a migration results in an error, this migration will be rolled back, and the previous successful migration will remain applied.

### Create a migration

To create a new migration, run the following command:

```sh
$ wrangler d1 migrations create <DATABASE_NAME> "<short-description>"
```

This will generate a new versioned file inside the migrations folder. A migration filename will look like:

`0000_<short-description>.sql`


### List migrations

To view a list of unapplied migration files in your `migrations` folder, run:

```sh
$ wrangler d1 migrations list <DATABASE_NAME>
```


### Apply migrations

To apply any unapplied migrations, run:

```sh
$ wrangler d1 migrations apply <DATABASE_NAME>
```

This command will confirm the migrations you are about to apply. After, a backup will be captured. 

The progress of each migration will be printed in the console.

When running the apply command in a CI/CD environment or another non-interactive command line, the confirmation step will be skipped, but the backup still takes place.

## Wrangler customizations

By default, the migrations are created in the `migrations/` folder relative to your `wrangler.toml` file. Creating migrations will keep a record of applied migrations in the `d1_migrations` table. 

This location and table name can be customized in your `wrangler.toml` file, inside the D1 binding.


```toml
[[ d1_databases ]]
binding = "<Binding-name>" # i.e. if you set this to "DB", it will be available in your Worker on env.DB
database_name = "<database-name>"
database_id = "<UUID>"
preview_database_id = "<UUID>"
migrations_table_name = "<short-description>"
migrations_folder_path = "<file-path>"
```


## Plans for the future

These are some of the features we plan to add in the future:

* **Down migration**: The same way that apply builds up the database, there will be a way to go down migrations or rollback changes.
* **Fake migrations**: Mark a migration as already applied without changing the database.
* **Apply only a specific migration**: Apply only a specific migration without going through the sequential order.

To request more features or to contribute directly to the Wrangler2 project, go to the [wrangler2 repository](https://github.com/cloudflare/wrangler2).
