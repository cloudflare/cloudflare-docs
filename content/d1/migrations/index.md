---
title: Migrations
weight: 5
pcx_content_type: concept
---

# Migrations

## Features

Currently the migrations system aims to be simple and effective, due to that only 3 features included.
* **Migrations create**: Create a empty migration file, this file is just pure sql.
* **Migrations list**: List unapplied migrations.
* **Migrations apply**: Apply remaining migrations.

Every migration has a number and they are applied in sequential order.

When theres an error applying a migration, only the migration that trowed an error is rollback, all previous successfully migrations remaining committed.


### Create a migration
To create a new migration just run the migrations create command.

`wrangler d1 migrations create <database> "<migration name>"`

This will generate a new sequential number and create a new file inside the migrations folder.


### List migrations
To list unapplied migrations run the migrations list command.

`wrangler d1 migrations list <database>`


### Apply migrations
To apply remaining migrations run the migrations apply command.

`wrangler d1 migrations apply <database>`

This command will firstly confirm the migrations you are about to apply, after you accept the migrations a new backup will be generated before
starting to apply migrations.

A table is printed in the cli with the progress of each migration.

When running the apply command in a CI/CD environment or other non TTY command line, the confirmation step will be skipped,
but the backup still takes place.


## Wrangler customizations
By default migrations are created in the `migrations/` folder relative to your `wrangler.toml` and the table that keeps track
of the applied migrations is `d1_migrations`.

This location and table name can be customized in your `wrangler.toml`, inside the d1 binding.
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

There are already planned several features that would improve the developer experience. Fell free to request more features or to contribute directly to this
in the [Wrangler2 project](https://github.com/cloudflare/wrangler2)
* **Down migration**: The same way that apply builds up the database, there should be a way to go down a migration or more and rollback changes.
* **Fake migrations**: Mark a migration as already applied without changing the database.
* **Apply only a specific migration**: Apply only a specific migration without going trough the sequential order.
