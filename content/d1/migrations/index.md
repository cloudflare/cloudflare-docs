---
title: Migrations
weight: 5
pcx_content_type: concept
---

# Migrations

Database migrations are a way of versioning your database. Each migration is stored as an `.sql` file in your `migrations` folder. The `migrations` folder is created in your project directory when you create your first migration. This enables you to store and track changes throughout database development.

## Features

Currently, the migrations system aims to be simple yet effective. With the current implementation, you can:

* Create an empty migration file.
* List unapplied migrations.
* Apply remaining migrations.

Every migration file in the `migrations` folder has a specified version number in the filename. Files are listed in sequential order. Every migration file is an SQL file where you can specify queries to be run.

### Create a migration

To create a new migration, run the following command with your database name applied:

```sh
$ wrangler d1 migrations create <DATABASE_NAME> "<MIGRATION_FILENAME>"
```

This will generate a new versioned file inside the `migrations` folder. Name your migration file as a description of your version. This will make it easier for you to find your version in the `migrations` folder. An example filename looks like:

`0000_create_user_table.sql`

The filename will include a version number and the migration filename you specified above.

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

This command will prompt you to confirm the migrations you are about to apply. Confirm that you would like to proceed. After, a backup will be captured. 

The progress of each migration will be printed in the console.

When running the apply command in a CI/CD environment or another non-interactive command line, the confirmation step will be skipped, but the backup will still be captured.

If applying a migration results in an error, this migration will be rolled back, and the previous successful migration will remain applied.

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

* **Down migration**: The same way that apply builds up the database, there will be a way to go down migrations or rollback changes.
* **Fake migrations**: Mark a migration as already applied without changing the database.
* **Apply only a specific migration**: Apply only a specific migration without going through the sequential order.

To request more features or to contribute directly to the Wrangler2 project, go to the [wrangler2 repository](https://github.com/cloudflare/wrangler2).
