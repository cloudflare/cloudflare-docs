---
title: Migrations
weight: 5
pcx_content_type: concept
---

# Migrations

## Features

Currently, the migrations system aims to be simple and effective. Three features are included.
* **migrations create**: Create an empty migration file; this file is just pure SQL.
* **migrations list**: List unapplied migrations.
* **migrations apply**: Apply remaining migrations.

Every migration has a number and is in sequential order.

When applying a migration results in error, that migration is rolled back, and all the previous successful migrations remain committed.


### Create a migration
To create a new migration, run the migrations create command.

`wrangler d1 migrations create <database> "<migration name>"`

This will generate a new sequential number and create a new file inside the migrations folder.


### List migrations
To list the unapplied migrations, run the migrations list command.

`wrangler d1 migrations list <database>`


### Apply migrations
To apply the remaining migrations, run the migrations apply command.

`wrangler d1 migrations apply <database>`

This command will first confirm the migrations you are about to apply; after you accept the migrations, a new backup will be generated.

The progress of each migration will be printed in the console.

When running the apply command in a CI/CD environment or another non-TTY command line, the confirmation step will be skipped,
but the backup still takes place.


## Wrangler customizations
By default, the migrations are created in the `migrations/` folder relative to your `wrangler.toml` and the table that keeps track
of the applied migrations is in the `d1_migrations` folder.

This location and table name can be customized in your `wrangler.toml`, inside the D1 binding.


```toml
[[ d1_databases ]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "mydatabase"
database_id = "29f5fbe1-845b-4188-b107-05fd0e4881b6"
preview_database_id = "29f5fbe1-845b-4188-b107-05fd0e4881b6"
migrations_table_name = "my_migrations"
migrations_folder_path = "src/backend/migrations"
```


## Plans for the future

These are some of the features we plan to add in the future:
* **Down migration**: The same way that apply builds up the database, there will be a way to go down a migration or rollback changes.
* **Fake migrations**: Mark a migration as already applied without changing the database.
* **Apply only a specific migration**: Apply only a specific migration without going through the sequential order.

Feel free to request more features or to contribute directly to the [Wrangler2 project](https://github.com/cloudflare/wrangler2)
