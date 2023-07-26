---
title: Migrations
pcx_content_type: concept
---

# Migrations

Database migrations are a way of versioning your database. Each migration is stored as an `.sql` file in your `migrations` folder. The `migrations` folder is created in your project directory when you create your first migration. This enables you to store and track changes throughout database development.

## Features

Currently, the migrations system aims to be simple yet effective. With the current implementation, you can:

- [Create](/workers/wrangler/commands/#migrations-create) an empty migration file.
- [List](/workers/wrangler/commands/#migrations-list) unapplied migrations.
- [Apply](/workers/wrangler/commands/#migrations-apply) remaining migrations.

Every migration file in the `migrations` folder has a specified version number in the filename. Files are listed in sequential order. Every migration file is an SQL file where you can specify queries to be run.

## Applying migrations

When running a migration in D1, ...

* Foreign keys
* ...

## Wrangler customizations

By default, migrations are created in the `migrations/` folder in your Worker project directory. Creating migrations will keep a record of applied migrations in the `d1_migrations` table found in your database.

This location and table name can be customized in your `wrangler.toml` file, inside the D1 binding.

```toml
[[ d1_databases ]]
binding = "<BINDING_NAME>" # i.e. if you set this to "DB", it will be available in your Worker at `env.DB`
database_name = "<DATABASE_NAME>"
database_id = "<UUID>"
preview_database_id = "<UUID>"
migrations_table = "<d1_migrations>" # Customize this value to change your applied migrations table name
migrations_dir = "<FOLDER_NAME>" # Customize this value to rename the `migrations` folder
```

## Plans for the future

These are some of the features we plan to add in the future:

- **Down migration**: The same way that apply builds up the database, there will be a way to go down migrations or rollback changes.
- **Fake migrations**: Mark a migration as already applied without changing the database.
- **Apply only a specific migration**: Apply only a specific migration without going through the sequential order.

To request more features or to contribute directly to the Wrangler project, go to the [Wrangler repository](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler).
