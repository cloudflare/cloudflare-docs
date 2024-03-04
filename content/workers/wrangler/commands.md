---
pcx_content_type: reference
title: Commands
meta:
  title: Commands - Wrangler
  description: Create, develop, and deploy your Cloudflare Workers with Wrangler commands.
---

# Wrangler commands

Wrangler offers a number of commands to manage your Cloudflare Workers.

- [`docs`](#docs) - Open this page in your default browser.
- [`init`](#init) - Create a new project from a variety of web frameworks and templates.
- [`generate`](#generate) - Create a Wrangler project using an existing [Workers template](https://github.com/cloudflare/worker-template).
- [`d1`](#d1) - Interact with D1.
- [`vectorize`](#vectorize) - Interact with Vectorize indexes.
- [`hyperdrive`](#hyperdrive) - Manage your Hyperdrives.
- [`deploy`](#deploy) - Deploy your Worker to Cloudflare.
- [`dev`](#dev) - Start a local server for developing your Worker.
- [`publish`](#publish) - Publish your Worker to Cloudflare.
- [`delete`](#delete-3) - Delete your Worker from Cloudflare.
- [`kv:namespace`](#kvnamespace) - Manage Workers KV namespaces.
- [`kv:key`](#kvkey) - Manage key-value pairs within a Workers KV namespace.
- [`kv:bulk`](#kvbulk) - Manage multiple key-value pairs within a Workers KV namespace in batches.
- [`r2 bucket`](#r2-bucket) - Manage Workers R2 buckets.
- [`r2 object`](#r2-object) - Manage Workers R2 objects.
- [`secret`](#secret) - Manage the secret variables for a Worker.
- [`secret:bulk`](#secretbulk) - Manage multiple secret variables for a Worker.
- [`tail`](#tail) - Start a session to livestream logs from a deployed Worker.
- [`pages`](#pages) - Configure Cloudflare Pages.
- [`queues`](#queues) - Configure Workers Queues.
- [`login`](#login) - Authorize Wrangler with your Cloudflare account using OAuth.
- [`logout`](#logout) - Remove Wrangler’s authorization for accessing your account.
- [`whoami`](#whoami) - Retrieve your user information and test your authentication configuration.
- [`deployments`](#deployments) - Retrieve details for recent deployments.
- [`rollback`](#rollback) - Rollback to a recent deployment.
- [`dispatch-namespace`](#dispatch-namespace) - Interact with a [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dispatch-namespace).
- [`mtls-certificate`](#mtls-certificate) - Manage certificates used for mTLS connections.
- [`types`](#types) - Generate types from bindings and module rules in configuration.

{{<Aside type="note">}}

The following global flags work on every command.

{{<definitions>}}

- `--config` {{<type>}}string{{</type>}}
  - Path to `.toml` configuration file.
- `--help` {{<type>}}boolean{{</type>}}
  - Show help.
- `--version` {{<type>}}boolean{{</type>}}
  - Show version number.
- `--experimental-json-config` {{<type>}}boolean{{</type>}}
  - ⚠️ This is an experimental command. Read configuration from a `wrangler.json` file, instead of `wrangler.toml`. `wrangler.json` is a [JSONC](https://code.visualstudio.com/docs/languages/json#_json-with-comments) file.

{{</definitions>}}

{{</Aside>}}

---

## How to run Wrangler commands

This page provides a reference for Wrangler commands.

```txt
wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

Since Cloudflare recommends [installing Wrangler locally](/workers/wrangler/install-and-update/) in your project(rather than globally), the way to run Wrangler will depend on your specific setup and package manager.

{{<tabs labels="npm | yarn | pnpm">}}
{{<tab label="npm" default="true">}}

```sh
$ npx wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

{{</tab>}}
{{<tab label="pnpm">}}

```sh
$ pnpm wrangler <COMMAND> <SUBCOMMAND> [PARAMETERS] [OPTIONS]
```

{{</tab>}}
{{</tabs>}}

You can add Wrangler commands that you use often as scripts in your project's `package.json` file:

```json
{
  ...
  "scripts": {
    "deploy": "wrangler deploy",
    "dev": "wrangler dev"
  }
  ...
}
```

You can then run them using your package manager of choice:


{{<tabs labels="npm | yarn | pnpm">}}
{{<tab label="npm" default="true">}}

```sh
$ npm run deploy
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn run deploy
```

{{</tab>}}
{{<tab label="pnpm">}}

```sh
$ pnpm run deploy
```

{{</tab>}}
{{</tabs>}}

---

## `docs`

Open the Cloudflare developer documentation in your default browser.

```txt
wrangler docs [<COMMAND>]
```

{{<definitions>}}

- `COMMAND` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The Wrangler command you want to learn more about. This opens your default browser to the section of the documentation that describes the command.

{{</definitions>}}

## `init`

Create a new project via the [create-cloudflare-cli (C3) tool](/workers/get-started/guide/#1-create-a-new-worker-project). A variety of web frameworks are available to choose from as well as templates. Dependencies are installed by default, with the option to deploy your project immediately.

```txt
wrangler init [<NAME>] [OPTIONS]
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}} {{<prop-meta>}}(default: name of working directory){{</prop-meta>}}
  - The name of the Workers project. This is both the directory name and `name` property in the generated `wrangler.toml` [configuration](/workers/wrangler/configuration/) file.
- `--yes` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Answer yes to any prompts for new projects.
- `--from-dash` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Fetch a Worker initialized from the dashboard. This is done by passing the flag and the Worker name. `wrangler init --from-dash <WORKER_NAME>`.
  - The `--from-dash` command will not automatically sync changes made to the dashboard after the command is used. Therefore, it is recommended that you continue using the CLI.
    {{</definitions>}}

---

## `generate`

{{<Aside type="note">}}

This command has been deprecated as of [Wrangler v3](/workers/wrangler/migration/update-v2-to-v3/) and will be removed in a future version.

{{</Aside>}}

Create a new project using an existing [Workers template](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker).

```txt
wrangler generate [<NAME>] [TEMPLATE]
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}} {{<prop-meta>}}(default: name of working directory){{</prop-meta>}}
  - The name of the Workers project. This is both the directory name and `name` property in the generated `wrangler.toml` [configuration](/workers/wrangler/configuration/) file.
- `TEMPLATE` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The URL of a GitHub template, with a default [worker-template](https://github.com/cloudflare/worker-template). Browse a list of available templates on the [cloudflare/workers-sdk](https://github.com/cloudflare/workers-sdk/tree/main/templates#usage) repository.

{{</definitions>}}

---

## `d1`

Interact with Cloudflare's D1 service.

{{<Aside type="note">}}
[D1](/d1/) is currently in open beta. Report D1 bugs in [GitHub](https://github.com/cloudflare/workers-sdk/issues/new/choose).
{{</Aside>}}

### `create`

Creates a new D1 database, and provides the binding and UUID that you will put in your `wrangler.toml` file.

```txt
wrangler d1 create <DATABASE_NAME> [OPTIONS]
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the new D1 database.
- `--location` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Provide an optional [location hint](/d1/configuration/data-location/) for your database leader.
  - Available options include `weur` (Western Europe), `eeur` (Eastern Europe), `apac` (Asia Pacific), `wnam` (Western North America), and `enam` (Eastern North America).
    {{</definitions>}}

### `info`

Get information about a D1 database, including the current database size and state.

```txt
wrangler d1 info <DATABASE_NAME> [OPTIONS]
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database to get information about.
- `--json` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Return output as JSON rather than a table.

{{</definitions>}}

### `list`

List all D1 databases in your account.

```txt
wrangler d1 list [OPTIONS]
```

{{<definitions>}}

- `--json` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Return output as JSON rather than a table.

{{</definitions>}}

### `delete`

Delete a D1 database.

```txt
wrangler d1 delete <DATABASE_NAME> [OPTIONS]
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database to delete.
- `-y, --skip-confirmation` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Skip deletion confirmation prompt.

{{</definitions>}}

### `execute`

Execute a query on a D1 database.

```txt
wrangler d1 execute <DATABASE_NAME> [OPTIONS]
```

{{<Aside type="note">}}

You must provide either `--command` or `--file` for this command to run successfully.

{{</Aside>}}

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database to execute a query on.
- `--command` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The SQL query you wish to execute.
- `--file` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Path to the SQL file you wish to execute.
- `-y, --yes` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Answer `yes` to any prompts.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Execute commands/files against a local database for use with [wrangler dev](#dev).
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory to use for local persistence (for use in combination with `--local`).
- `--json` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Return output as JSON rather than a table.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Execute commands/files against a preview D1 database (as defined by `preview_database_id` in [Wrangler.toml](/workers/wrangler/configuration/#d1-databases)).
- `--batch-size` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Number of queries to send in a single batch.

{{</definitions>}}

### `time-travel restore`

Restore a database to a specific point-in-time using [Time Travel](/d1/reference/time-travel/).

```txt
wrangler d1 time-travel restore <DATABASE_NAME> [OPTIONS]
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database to execute a query on.
- `--bookmark` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - A D1 bookmark representing the state of a database at a specific point in time.
- `--timestamp` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - A UNIX timestamp or JavaScript date-time `string` within the last 30 days.
- `--json` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Return output as JSON rather than a table.

{{</definitions>}}

### `time-travel info`

Inspect the current state of a database for a specific point-in-time using [Time Travel](/d1/reference/time-travel/).

```txt
wrangler d1 time-travel info <DATABASE_NAME> [OPTIONS]
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database to execute a query on.
- `--timestamp` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - A UNIX timestamp or JavaScript date-time `string` within the last 30 days.
- `--json` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Return output as JSON rather than a table.

{{</definitions>}}

### `backup create`

Initiate a D1 backup.

```txt
wrangler d1 backup create <DATABASE_NAME>
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database to backup.

{{</definitions>}}

### `backup list`

List all available backups.

```txt
wrangler d1 backup list <DATABASE_NAME>
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database to list the backups of.

{{</definitions>}}

### `backup restore`

Restore a backup into a D1 database.

```txt
wrangler d1 backup restore <DATABASE_NAME> <BACKUP_ID>
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database to restore the backup into.
- `BACKUP_ID` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The ID of the backup you wish to restore.

{{</definitions>}}

### `backup download`

{{<Aside type="warning">}}
This command only works on databases created during D1's alpha period. You can check which version your database uses with `wrangler d1 info <DATABASE_NAME>`.

This command will not work on databases that are created during the current beta period. As of now, there is no solution to download existing data of a beta database to your local machine. Refer to [Time Travel](/d1/reference/time-travel/) in the D1 documentation for more information on D1's approach to backups in its beta period.
{{</Aside>}}

Download existing data to your local machine.

```txt
wrangler d1 backup download <DATABASE_NAME> <BACKUP_ID>
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database you wish to download the backup of.
- `BACKUP_ID` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The ID of the backup you wish to download.
- `--output` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The `.sqlite3` file to write to (defaults to `'<DB_NAME>.<SHORT_BACKUP_ID>.sqlite3'`).

{{</definitions>}}

### `migrations create`

Create a new migration.

This will generate a new versioned file inside the `migrations` folder. Name your migration file as a description of your change. This will make it easier for you to find your migration in the `migrations` folder. An example filename looks like:

`0000_create_user_table.sql`

The filename will include a version number and the migration name you specify below.

```txt
wrangler d1 migrations create <DATABASE_NAME> <MIGRATION_NAME>
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database you wish to create a migration for.
- `MIGRATION_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - A descriptive name for the migration you wish to create.

{{</definitions>}}

### `migrations list`

View a list of unapplied migration files.

```txt
wrangler d1 migrations list <DATABASE_NAME> [OPTIONS]
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database you wish to list unapplied migrations for.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Show the list of unapplied migration files on your locally persisted D1 database.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory to use for local persistence (for use in combination with `--local`).
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Show the list of unapplied migration files on your preview D1 database (as defined by `preview_database_id` in [`wrangler.toml`](/workers/wrangler/configuration/#d1-databases)).

{{</definitions>}}

### `migrations apply`

Apply any unapplied migrations.

This command will prompt you to confirm the migrations you are about to apply. Confirm that you would like to proceed. After, a backup will be captured.

The progress of each migration will be printed in the console.

When running the apply command in a CI/CD environment or another non-interactive command line, the confirmation step will be skipped, but the backup will still be captured.

If applying a migration results in an error, this migration will be rolled back, and the previous successful migration will remain applied.

```txt
wrangler d1 migrations apply <DATABASE_NAME> [OPTIONS]
```

{{<definitions>}}

- `DATABASE_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the D1 database you wish to apply your migrations on.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Execute any unapplied migrations on your locally persisted D1 database.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory to use for local persistence (for use in combination with `--local`).
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Execute any unapplied migrations on your preview D1 database (as defined by `preview_database_id` in [`wrangler.toml`](/workers/wrangler/configuration/#d1-databases)).
- `--batch-size` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Number of queries to send in a single batch.

{{</definitions>}}

---

## `hyperdrive`

{{<Aside type="note">}}
Hyperdrive is currently in open beta. Report Hyperdrive bugs in [GitHub](https://github.com/cloudflare/workers-sdk/issues/new/choose).
{{</Aside>}}

Manage [Hyperdrive](/hyperdrive/) database configurations.

### `create`

Create a new Hyperdrive configuration.

```txt
wrangler hyperdrive create <ID> [OPTIONS]
```

{{<definitions>}}

- `ID` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The ID of the Hyperdrive configuration to create.
- `--connection-string` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The database connection string in the form `postgres://user:password@hostname:port/database`.

{{</definitions>}}

### `update`

Update an existing Hyperdrive configuration.

```txt
wrangler hyperdrive update <ID> [OPTIONS]
```

{{<definitions>}}

- `ID` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The ID of the Hyperdrive configuration to update.
- `--origin-host` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The new database hostname or IP address Hyperdrive should connect to.
- `--origin-port` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The new database port to connect to.
- `--database` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The new database (name) to connect to. For example, Postgres or defaultdb.
- `--origin-user` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The new username used to authenticate to the database.
- `--origin-password` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The new password used to authenticate to the database.

{{</definitions>}}

### `list`

List all Hyperdrive configurations.

```txt
wrangler hyperdrive list
```

### `delete`

Delete an existing Hyperdrive configuration.

```txt
wrangler hyperdrive delete <ID>
```

{{<definitions>}}

- `ID` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the Hyperdrive configuration to delete.

{{</definitions>}}

### `get`

Get an existing Hyperdrive configuration.

```txt
wrangler hyperdrive get <ID>
```

{{<definitions>}}

- `ID` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the Hyperdrive configuration to get.

{{</definitions>}}

---

## `vectorize`

{{<Aside type="note">}}
Vectorize is currently in open beta. Report Vectorize bugs in [GitHub](https://github.com/cloudflare/workers-sdk/issues/new/choose).
{{</Aside>}}

Interact with a [Vectorize](/vectorize/) vector database.

### `create`

Creates a new vector index, and provides the binding and name that you will put in your `wrangler.toml` file.

```txt
wrangler vectorize create <INDEX_NAME> [--dimensions=<NUM_DIMENSIONS>] [--metric=<DISTANCE_METRIC>]
```

{{<definitions>}}

- `INDEX_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the new index to create. Cannot be changed.
- `--dimensions` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The vector dimension width to configure the index for. Cannot be changed after creation.
- `--metric` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The distance metric to use for calculating vector distance. Must be one of `cosine`, `euclidean`, or `dot-product`.

{{</definitions>}}

### `get`

Get details about an individual index, including its configuration.

```txt
wrangler vectorize get <INDEX_NAME>
```

{{<definitions>}}

- `INDEX_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the index to fetch details for.

{{</definitions>}}
### `list`

List all Vectorize indexes in your account, including the configured dimensions and distance metric.

```txt
wrangler vectorize list
```

### `delete`

Delete a Vectorize index.

```txt
wrangler vectorize delete <INDEX_NAME> [OPTIONS]
```

{{<definitions>}}

- `INDEX_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the Vectorize index to delete.
- `--force` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Skip confirmation when deleting the index (Note: This is not a recoverable operation).

{{</definitions>}}

### `insert`

Insert vectors into an index.

```txt
wrangler vectorize insert <INDEX_NAME> [OPTIONS]
```

{{<definitions>}}

- `INDEX_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the Vectorize index to delete.
- `--file` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - A file containing the vectors to insert in newline-delimited JSON (JSON) format.
- `--batch-size` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The number of vectors to insert at a time (default: `5000`).

{{</definitions>}}

---

## `dev`

Start a local server for developing your Worker.

```txt
wrangler dev [<SCRIPT>] [OPTIONS]
```

{{<Aside type="note">}}

None of the options for this command are required. Many of these options can be set in your `wrangler.toml` file. Refer to the [`wrangler.toml` configuration](/workers/wrangler/configuration) documentation for more information.

{{</Aside>}}

{{<Aside type="warning">}}

As of Wrangler v3.2.0, `wrangler dev` is supported by any Linux distributions providing `glibc 2.31` or higher (e.g. Ubuntu 20.04/22.04, Debian 11/12, Fedora 37/38/39), macOS version 11 or higher, and Windows (x86-64 architecture).

{{</Aside>}}

{{<definitions>}}

- `SCRIPT` {{<type>}}string{{</type>}}
  - The path to an entry point for your Worker. Only required if your `wrangler.toml` does not include a `main` key (for example, `main = "index.js"`).
- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Name of the Worker.
- `--no-bundle` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Skip Wrangler's build steps. Particularly useful when using custom builds. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/) for more information.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--compatibility-date` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used.
- `--compatibility-flags`, `--compatibility-flag` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Flags to use for compatibility checks.
- `--latest` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Use the latest version of the Workers runtime.
- `--ip` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - IP address to listen on, defaults to `localhost`.
- `--port` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Port to listen on.
- `--inspector-port` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Port for devtools to connect to.
- `--routes`, `--route` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Routes to upload.
  - For example: `--route example.com/*`.
- `--host` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Host to forward requests to, defaults to the zone of project.
- `--local-protocol` {{<type>}}"http"|"https"{{</type>}} {{<prop-meta>}}(default: http){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Protocol to listen to requests on.
- `--local-upstream` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Host to act as origin in local mode, defaults to `dev.host` or route.
- `--assets` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Root folder of static assets to be served.
  - Use in combination with `--name` and `--latest` for basic static file hosting. For example: `wrangler dev --name personal_blog --assets dist/ --latest`.
- `--site` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Root folder of static assets for Workers Sites.
- `--site-include` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Only matched items will be uploaded.
- `--site-exclude` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Matched items will not be uploaded.
- `--upstream-protocol` {{<type>}}"http"|"https"{{</type>}} {{<prop-meta>}}(default: https){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Protocol to forward requests to host on.
- `--var` {{<type>}}key:value[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Array of `key:value` pairs to inject as variables into your code. The value will always be passed as a string to your Worker.
  - For example, `--var git_hash:$(git rev-parse HEAD) test:123` makes the `git_hash` and `test` variables available in your Worker's `env`.
  - This flag is an alternative to defining [`vars`](/workers/wrangler/configuration/#non-inheritable-keys) in your `wrangler.toml`. If defined in both places, this flag's values will be used.
- `--define` {{<type>}}key:value[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Array of `key:value` pairs to replace global identifiers in your code.
  - For example, `--define GIT_HASH:$(git rev-parse HEAD)` will replace all uses of `GIT_HASH` with the actual value at build time.
  - This flag is an alternative to defining [`define`](/workers/wrangler/configuration/#non-inheritable-keys) in your `wrangler.toml`. If defined in both places, this flag's values will be used.
- `--tsconfig` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Path to a custom `tsconfig.json` file.
- `--minify` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Minify the Worker.
- `--node-compat` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Enable Node.js compatibility.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory to use for local persistence.
- `--remote` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Develop against remote resources and data stored on Cloudflare's network.
- `--test-scheduled` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Exposes a `/__scheduled` fetch route which will trigger a scheduled event (Cron Trigger) for testing during development. To simulate different cron patterns, a `cron` query parameter can be passed in: `/__scheduled?cron=*+*+*+*+*`.
- `--log-level` {{<type>}}"debug"|"info"|"log"|"warn"|"error"|"none"{{</type>}} {{<prop-meta>}}(default: log){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify Wrangler's logging level.

{{</definitions>}}

`wrangler dev` is a way to [locally test](/workers/observability/local-development-and-testing/) your Worker while developing. With `wrangler dev` running, send HTTP requests to `localhost:8787` and your Worker should execute as expected. You will also see `console.log` messages and exceptions appearing in your terminal.

---

## `deploy`

Deploy your Worker to Cloudflare.

```txt
wrangler deploy [<SCRIPT>] [OPTIONS]
```

{{<Aside type="note">}}

None of the options for this command are required. Also, many can be set in your `wrangler.toml` file. Refer to the [`wrangler.toml` configuration](/workers/wrangler/configuration/) documentation for more information.

{{</Aside>}}

{{<definitions>}}

- `SCRIPT` {{<type>}}string{{</type>}}
  - The path to an entry point for your Worker. The path to an entry point for your Worker. Only required if your `wrangler.toml` does not include a `main` key (for example, `main = "index.js"`).
- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Name of the Worker.
- `--no-bundle` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Skip Wrangler's build steps. Particularly useful when using custom builds. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/) for more information.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--outdir` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Path to directory where Wrangler will write the bundled Worker files.
- `--compatibility-date` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used.
- `--compatibility-flags`, `--compatibility-flag` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Flags to use for compatibility checks.
- `--latest` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Use the latest version of the Workers runtime.
- `--assets` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Root folder of static assets to be served.
  - Use in combination with `--name` and `--latest` for basic static file hosting. For example: `npx wrangler deploy --name personal_blog --assets dist/ --latest`.
- `--site` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Root folder of static assets for Workers Sites.
- `--site-include` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Only matched items will be uploaded.
- `--site-exclude` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Matched items will not be uploaded.
- `--var` {{<type>}}key:value[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Array of `key:value` pairs to inject as variables into your code. The value will always be passed as a string to your Worker.
  - For example, `--var git_hash:$(git rev-parse HEAD) test:123` makes the `git_hash` and `test` variables available in your Worker's `env`.
  - This flag is an alternative to defining [`vars`](/workers/wrangler/configuration/#non-inheritable-keys) in your `wrangler.toml`. If defined in both places, this flag's values will be used.
- `--define` {{<type>}}key:value[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Array of `key:value` pairs to replace global identifiers in your code.
  - For example, `--define GIT_HASH:$(git rev-parse HEAD)` will replace all uses of `GIT_HASH` with the actual value at build time.
  - This flag is an alternative to defining [`define`](/workers/wrangler/configuration/#non-inheritable-keys) in your `wrangler.toml`. If defined in both places, this flag's values will be used.
- `--triggers`, `--schedule`, `--schedules` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Cron schedules to attach to the deployed Worker. Refer to [Cron Trigger Examples](/workers/configuration/cron-triggers/#examples).
- `--routes`, `--route` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Routes where this Worker will be deployed.
  - For example: `--route example.com/*`.
- `--tsconfig` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Path to a custom `tsconfig.json` file.
- `--minify` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Minify the bundled Worker before deploying.
- `--node-compat` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Enable node.js compatibility.
- `--dry-run` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Compile a project without actually deploying to live servers. Combined with `--outdir`, this is also useful for testing the output of `npx wrangler deploy`. It also gives developers a chance to upload our generated sourcemap to a service like Sentry, so that errors from the Worker can be mapped against source code, but before the service goes live.
- `--keep-vars` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - It is recommended best practice to treat your Wrangler developer environment as a source of truth for your Worker configuration, and avoid making changes via the Cloudflare dashboard.
  - If you change your environment variables or bindings in the Cloudflare dashboard, Wrangler will override them the next time you deploy. If you want to disable this behaviour set `keep-vars` to `true`.

{{</definitions>}}

---

## `publish`

Publish your Worker to Cloudflare.

```txt
wrangler publish [OPTIONS]
```

{{<Aside type="note">}}

This command has been deprecated as of v3 in favor of [`wrangler deploy`](#deploy). It will be removed in v4.

{{</Aside>}}

---

## `delete`

Delete your Worker and all associated Cloudflare developer platform resources.

```txt
wrangler delete [<SCRIPT>] [OPTIONS]
```

{{<definitions>}}

- `SCRIPT` {{<type>}}string{{</type>}}
  - The path to an entry point for your Worker. The path to an entry point for your Worker. Only required if your `wrangler.toml` does not include a `main` key (for example, `main = "index.js"`).
- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Name of the Worker.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--dry-run` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Do not actually delete the Worker. This is useful for testing the output of `wrangler delete`.

{{</definitions>}}

## `kv:namespace`

Manage Workers KV namespaces.

{{<Aside type="note">}}
The `kv:...` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [Workers KV](/kv/). Learn more about using Workers KV with Wrangler in the [Workers KV guide](/kv/get-started/).
{{</Aside>}}

### `create`

Create a new namespace.

```txt
wrangler kv:namespace create <NAMESPACE> [OPTIONS]
```

{{<definitions>}}

- `NAMESPACE` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the new namespace.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace (the `preview_id` value).

{{</definitions>}}

The following is an example of using the `create` command to create a KV namespace called `MY_KV`.

```sh
$ npx wrangler kv:namespace create "MY_KV"
🌀 Creating namespace with title "worker-MY_KV"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
kv_namespaces = [
  { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

The following is an example of using the `create` command to create a preview KV namespace called `MY_KV`.

```sh
$ npx wrangler kv:namespace create "MY_KV" --preview
🌀 Creating namespace with title "my-site-MY_KV_preview"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
kv_namespaces = [
  { binding = "MY_KV", preview_id = "15137f8edf6c09742227e99b08aaf273" }
]
```

### `list`

List all KV namespaces associated with the current account ID.

```txt
wrangler kv:namespace list
```

The following is an example that passes the Wrangler command through the `jq` command:

```sh
$ npx wrangler kv:namespace list | jq "."
[
  {
    "id": "06779da6940b431db6e566b4846d64db",
    "title": "TEST_NAMESPACE"
  },
  {
    "id": "32ac1b3c2ed34ed3b397268817dea9ea",
    "title": "STATIC_CONTENT"
  }
]
```

### `delete`

Delete a given namespace.

```txt
wrangler kv:namespace delete {--bindings=<BINDING>|--namespace-id=<NAMESPACE_ID>} [OPTIONS]
```

{{<Aside type="warning">}}
This command requires `--binding` or `--namespace-id`.
{{</Aside>}}

{{<definitions>}}

- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

The following is an example of deleting a KV namespace called `MY_KV.`

```sh
$ npx wrangler kv:namespace delete --binding=MY_KV
Are you sure you want to delete namespace f7b02e7fc70443149ac906dd81ec1791? [y/n]
yes
Deleting namespace f7b02e7fc70443149ac906dd81ec1791
Deleted namespace f7b02e7fc70443149ac906dd81ec1791
```

The following is an example of deleting a preview KV namespace called `MY_KV`.

```sh
$ npx wrangler kv:namespace delete --binding=MY_KV --preview
Are you sure you want to delete namespace 15137f8edf6c09742227e99b08aaf273? [y/n]
yes
Deleting namespace 15137f8edf6c09742227e99b08aaf273
Deleted namespace 15137f8edf6c09742227e99b08aaf273
```

## `kv:key`

Manage key-value pairs within a Workers KV namespace.

{{<Aside type="note">}}
The `kv:...` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [Workers KV](/kv/). Learn more about using Workers KV with Wrangler in the [Workers KV guide](/kv/get-started/).
{{</Aside>}}

### `put`

Write a single key-value pair to a particular namespace.

```txt
wrangler kv:key put <KEY> {<VALUE>|--path=<PATH>} {--binding=<BINDING>|--namespace-id=<NAMESPACE_ID>} [OPTIONS]
```

{{<Aside type="warning">}}
This command requires a `VALUE` or `--path`.</br>
This command requires a `--binding` or `--namespace-id` flag.
{{</Aside>}}

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key to write to.
- `VALUE` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The value to write.
- `--path` {{<prop-meta>}}optional{{</prop-meta>}}
  - When defined, the value is loaded from the file at `--path` rather than reading it from the `VALUE` argument. This is ideal for security-sensitive operations because it avoids saving keys and values into your terminal history.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--ttl` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The lifetime (in number of seconds) that the key-value pair should exist before expiring. Must be at least `60` seconds. This option takes precedence over the `expiration` option.
- `--expiration` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The timestamp, in UNIX seconds, indicating when the key-value pair should expire.
- `--metadata` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Any (escaped) JSON serialized arbitrary object to a maximum of 1024 bytes.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with locally persisted data.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory for locally persisted data.

{{</definitions>}}

The following is an example that puts a key-value into the namespace with binding name of `MY_KV`.

```sh
$ npx wrangler kv:key put --binding=MY_KV "my-key" "some-value"
Writing the value "some-value" to key "my-key" on namespace f7b02e7fc70443149ac906dd81ec1791.
```

The following is an example that puts a key-value into the preview namespace with binding name of `MY_KV`.

```sh
$ npx wrangler kv:key put --binding=MY_KV --preview "my-key" "some-value"
Writing the value "some-value" to key "my-key" on namespace 15137f8edf6c09742227e99b08aaf273.
```

The following is an example that puts a key-value into a namespace, with a time-to-live value of `10000` seconds.

```sh
$ npx wrangler kv:key put --binding=MY_KV "my-key" "some-value" --ttl=10000
Writing the value "some-value" to key "my-key" on namespace f7b02e7fc70443149ac906dd81ec1791.
```

The following is an example that puts a key-value into a namespace, where the value is read from the `value.txt` file.

```sh
$ npx wrangler kv:key put --binding=MY_KV "my-key" --path=value.txt
Writing the contents of value.txt to the key "my-key" on namespace f7b02e7fc70443149ac906dd81ec1791.
```

### `list`

Output a list of all keys in a given namespace.

```txt
wrangler kv:key list {--binding=<BINDING>|--namespace-id=<NAMESPACE_ID>} [OPTIONS]
```

{{<Aside type="warning">}}
This command requires `--binding` or `--namespace-id`.
{{</Aside>}}

{{<definitions>}}

- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--prefix` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Only list keys that begin with the given prefix.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with locally persisted data.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory for locally persisted data.

{{</definitions>}}

Below is an example that passes the Wrangler command through the `jq` command:

```sh
$ npx wrangler kv:key list --binding=MY_KV --prefix="public" | jq "."
[
  {
    "name": "public_key"
  },
  {
    "name": "public_key_with_expiration",
    "expiration": "2019-09-10T23:18:58Z"
  }
]
```

### `get`

Read a single value by key from the given namespace.

```txt
wrangler kv:key get <KEY> {--binding=<BINDING>|--namespace-id=<NAMESPACE_ID>} [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key value to get.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to get from.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to get from.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--text` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Decode the returned value as a UTF-8 string.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with locally persisted data.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory for locally persisted data.

{{</definitions>}}

The following is an example that gets the value of the `"my-key"` key from the KV namespace with binding name `MY_KV`.

```sh
$ npx wrangler kv:key get --binding=MY_KV "my-key"
value
```

### `delete`

Remove a single key value pair from the given namespace.

```txt
wrangler kv:key delete <KEY> {--binding=<BINDING>|--namespace-id=<NAMESPACE_ID>} [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key value to get.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with locally persisted data.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory for locally persisted data.

{{</definitions>}}

The following is an example that deletes the key-value pair with key `"my-key"` from the KV namespace with binding name `MY_KV`.

```sh
$ npx wrangler kv:key delete --binding=MY_KV "my-key"
Deleting the key "my-key" on namespace f7b02e7fc70443149ac906dd81ec1791.
```

## `kv:bulk`

Manage multiple key-value pairs within a Workers KV namespace in batches.

{{<Aside type="note">}}
The `kv:...` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [Workers KV](/kv/). Learn more about using Workers KV with Wrangler in the [Workers KV guide](/kv/get-started/).
{{</Aside>}}

### `put`

Write a JSON file containing an array of key-value pairs to the given namespace.

```txt
wrangler kv:bulk put <FILENAME> {--binding=<BINDING>|--namespace-id=<NAMESPACE_ID>} [OPTIONS]
```

{{<Aside type="warning">}}
This command requires `--binding` or `--namespace-id`.
{{</Aside>}}

{{<definitions>}}

- `FILENAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The JSON file containing an array of key-value pairs to write to the namespace.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with locally persisted data.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory for locally persisted data.

{{</definitions>}}

This command takes a JSON file as an argument with a list of key-value pairs to upload. An example of JSON input:

```json
[
  {
    "key": "test_key",
    "value": "test_value",
    "expiration_ttl": 3600
  }
]
```

KV namespace values can only store strings. In order to save complex a value, stringify it to JSON:

```json
[
  {
    "key": "test_key",
    "value": "{\"name\": \"test_value\"}",
    "expiration_ttl": 3600
  }
]
```

Refer to the full schema for key-value entries uploaded via the bulk API:

{{<definitions>}}

- `key` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key’s name. The name may be 512 bytes maximum. All printable, non-whitespace characters are valid.
- `value` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The UTF-8 encoded string to be stored, up to 25 MB in length.
- `metadata` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Any arbitrary object (must serialize to JSON) to a maximum of 1024 bytes.
- `expiration` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The time, measured in number of seconds since the UNIX epoch, at which the key should expire.
- `expiration_ttl` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The number of seconds the document should exist before expiring. Must be at least `60` seconds.
- `base64` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - When true, the server will decode the value as base64 before storing it. This is useful for writing values that would otherwise be invalid JSON strings, such as images. Defaults to `false`.

{{</definitions>}}

{{<Aside type="note">}}
If both `expiration` and `expiration_ttl` are specified for a given key, the API will prefer `expiration_ttl`.
{{</Aside>}}

The following is an example of writing all the key-value pairs found in the `allthethingsupload.json` file.

```sh
$ npx wrangler kv:bulk put --binding=MY_KV allthethingsupload.json
Success!
```

### `delete`

Delete all keys read from a JSON file within a given namespace.

```txt
wrangler kv:bulk delete <FILENAME> {--binding=<BINDING>|--namespace-id=<NAMESPACE_ID>} [OPTIONS]
```

{{<Aside type="warning">}}
This command requires `--binding` or `--namespace-id`.
{{</Aside>}}

{{<definitions>}}

- `FILENAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The JSON file containing an array of keys to delete from the namespace.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with locally persisted data.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory for locally persisted data.

{{</definitions>}}

This command takes a JSON file as an argument containing an array of keys to delete.
The following is an example of the JSON input:

```json
["test_key_1", "test_key_2"]
```

The following is an example of deleting all the keys found in the `allthethingsdelete.json` file.

```sh
$ npx wrangler kv:bulk delete --binding=MY_KV allthethingsdelete.json
? Are you sure you want to delete all keys in allthethingsdelete.json from kv-namespace with id "f7b02e7fc70443149ac906dd81ec1791"? › (Y/n)
Success!
```

---

## `r2 bucket`

Interact with buckets in an R2 store.

{{<Aside type="note">}}
The `r2 bucket` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [the R2 API](/r2/api/workers/workers-api-reference/).
{{</Aside>}}

### `create`

Create a new R2 bucket.

```txt
wrangler r2 bucket create <NAME>
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the new R2 bucket.

{{</definitions>}}

### `delete`

Delete an R2 bucket.

```txt
wrangler r2 bucket delete <NAME>
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the R2 bucket to delete.

{{</definitions>}}

### `list`

List R2 bucket in the current account.

```txt
wrangler r2 bucket list
```

### `sippy enable`

{{<Aside type="note">}}
Sippy is currently in beta. To report bugs or request features, fill out the [Cloudflare R2 incremental migration feedback form](https://forms.gle/7WuCsbu5LmWkQVu76).
{{</Aside>}}

Enable [Sippy](/r2/data-migration/sippy/) incremental migration for a bucket.

```txt
wrangler r2 bucket sippy enable <NAME> [OPTIONS]
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the R2 bucket to enable Sippy.
- `--provider` {{<type>}}"AWS"|"GCS"{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The provider of your source object storage bucket.
- `--bucket` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of your source object storage bucket.
- `--r2-key-id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - Your R2 Access Key ID. Requires read and write access.
- `--r2-secret-access-key` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - Your R2 Secret Access Key. Requires read and write access.
- `--jurisdiction` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The jurisdiction where this R2 bucket is located, if a jurisdiction has been specified. Refer to [Jurisdictional Restrictions](/r2/reference/data-location/#jurisdictional-restrictions)
- **AWS S3 provider-specific options:**
- `--key-id` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Your AWS Access Key ID. Requires [read and list access](/r2/data-migration/sippy/#amazon-s3).
- `--secret-access-key` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Your AWS Secret Access Key. Requires [read and list access](/r2/data-migration/sippy/#amazon-s3).
- `--region` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The AWS region where your S3 bucket is located. For example: `us-west-2`.
- **Google Cloud Storage provider-specific options:**
- `--service-account-key-file` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The path to your Google Cloud service account key JSON file. This will read the service account key file and populate `client_email` and `private_key` options. Requires [read and list access](/r2/data-migration/sippy/#google-cloud-storage).
- `--client-email` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The client email for your Google Cloud service account key. Requires [read and list access](/r2/data-migration/sippy/#google-cloud-storage).
- `--private-key` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The private key for your Google Cloud service account key. Requires [read and list access](/r2/data-migration/sippy/#google-cloud-storage).
- Note that you must provide either `service-account-key-file` or `client_email` and `private_key` for this command to run successfully.

{{</definitions>}}

### `sippy disable`

Disable [Sippy](/r2/data-migration/sippy/) incremental migration for a bucket.

```txt
wrangler r2 bucket sippy disable <NAME>
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the R2 bucket to disable Sippy.

{{</definitions>}}

### `sippy get`

Get the status of [Sippy](/r2/data-migration/sippy/) incremental migration for a bucket.

```txt
wrangler r2 bucket sippy get <NAME>
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the R2 bucket to get the status of Sippy.

{{</definitions>}}

---

## `r2 object`

Interact with R2 objects.

{{<Aside type="note">}}
The `r2 object` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [the R2 API](/r2/api/workers/workers-api-reference/).
{{</Aside>}}

### `get`

Fetch an object from an R2 bucket.

```txt
wrangler r2 object get <OBJECT_PATH> [OPTIONS]
```

{{<definitions>}}

- `OBJECT_PATH` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The source object path in the form of `{bucket}/{key}`.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with locally persisted data.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory for locally persisted data.

{{</definitions>}}

### `put`

Create an object in an R2 bucket.

```txt
wrangler r2 object put <OBJECT_PATH> [OPTIONS]
```

{{<definitions>}}

- `OBJECT_PATH` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The destination object path in the form of `{bucket}/{key}`.
- `--file` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The path of the file to upload. Note you must provide either `--file` or `--pipe`.
- `--pipe` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Enables the file to be piped in, rather than specified with the `--file` option. Note you must provide either `--file` or `--pipe`.
- `--content-type` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - A standard MIME type describing the format of the object data.
- `--content-disposition` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specifies presentational information for the object.
- `--content-encoding` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specifies what content encodings have been applied to the object and thus what decoding mechanisms must be applied to obtain the media-type referenced by the `Content-Type` header field.
- `--content-language` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The language the content is in.
- `--cache-control` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specifies caching behavior along the request/reply chain.
- `--expires` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The date and time at which the object is no longer cacheable.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with locally persisted data.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory for locally persisted data.
 {{</definitions>}}

### `delete`

Delete an object in an R2 bucket.

```txt
wrangler r2 object delete <OBJECT_PATH> [OPTIONS]
```

{{<definitions>}}

- `OBJECT_PATH` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The destination object path in the form of `{bucket}/{key}`.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with locally persisted data.
- `--persist-to` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify directory for locally persisted data.

{{</definitions>}}

---

## `secret`

Manage the secret variables for a Worker.

### `put`

Create or replace a secret for a Worker.

```txt
wrangler secret put <KEY> [OPTIONS]
```

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The variable name for this secret to be accessed in the Worker.

- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Perform on a specific Worker rather than inheriting from `wrangler.toml`.

- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.

{{</definitions>}}

When running this command, you will be prompted to input the secret's value:

```sh
$ npx wrangler secret put FOO
? Enter a secret value: › ***
🌀 Creating the secret for script worker-app
✨ Success! Uploaded secret FOO
```

The `put` command can also receive piped input. For example:

```sh
$ echo "-----BEGIN PRIVATE KEY-----\nM...==\n-----END PRIVATE KEY-----\n" | wrangler secret put PRIVATE_KEY
```

### `delete`

Delete a secret for a Worker.

```txt
wrangler secret delete <KEY> [OPTIONS]
```

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The variable name for this secret to be accessed in the Worker.

- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific Worker rather than inheriting from `wrangler.toml`.

- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.

{{</definitions>}}

### `list`

List the names of all the secrets for a Worker.

```txt
wrangler secret list [OPTIONS]
```

{{<definitions>}}

- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Perform on a specific Worker rather than inheriting from `wrangler.toml`.

- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Perform on a specific environment

{{</definitions>}}

The following is an example of listing the secrets for the current Worker.

```sh
$ npx wrangler secret list
[
  {
    "name": "FOO",
    "type": "secret_text"
  }
]
```

---

## `secret:bulk`

Upload multiple secrets for a Worker at once.

```txt
wrangler secret:bulk [<FILENAME>] [OPTIONS]
```

{{<definitions>}}

- `FILENAME` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The JSON file containing key-value pairs to upload as secrets, in the form `{"SECRET_NAME": "secret value", ...}`.
  - If omitted, Wrangler expects to receive input from `stdin` rather than a file.

- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific Worker rather than inheriting from `wrangler.toml`.

- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.

{{</definitions>}}

The following is an example of uploading secrets from a JSON file redirected to `stdin`. When complete, the output summary will show the number of secrets uploaded and the number of secrets that failed to upload.

```json
---
filename: secrets.json
---
{
  "secret-name-1": "secret-value-1",
  "secret-name-2": "secret-value-2"
}
```

```sh
$ npx wrangler secret:bulk < secrets.json
🌀 Creating the secrets for the Worker "script-name"
✨ Successfully created secret for key: secret-name-1
...
🚨 Error uploading secret for key: secret-name-1
✨ Successfully created secret for key: secret-name-2

Finished processing secrets JSON file:
✨ 1 secrets successfully uploaded
🚨 1 secrets failed to upload
```

## `tail`

Start a session to livestream logs from a deployed Worker.

```txt
wrangler tail <WORKER> [OPTIONS]
```

{{<definitions>}}

- `WORKER` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of your Worker or the route the Worker is running on.
- `--format` {{<type>}}"json"|"pretty"{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The format of the log entries.
- `--status` {{<type>}}"ok"|"error"|"canceled"{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by invocation status.
- `--header` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by HTTP header.
- `--method` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by HTTP method.
- `--sampling-rate` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Add a fraction of requests to log sampling rate (between `0` and `1`).
- `--search` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by a text match in `console.log` messages.
- `--ip` {{<type>}}(string|"self")[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by the IP address the request originates from. Use `"self"` to show only messages from your own IP.

{{</definitions>}}

After starting `wrangler tail`, you will receive a live feed of console and exception logs for each request your Worker receives.

If your Worker has a high volume of traffic, the tail might enter sampling mode. This will cause some of your messages to be dropped and a warning to appear in your tail logs. To prevent messages from being dropped, add the options listed above to filter the volume of tail messages.

{{<Aside type="note">}}
It may take up to 1 minute (60 seconds) for a tail to exit sampling mode after adding an option to filter tail messages.
{{</Aside>}}

If sampling persists after using options to filter messages, consider using [instant logs](https://developers.cloudflare.com/logs/instant-logs/).

---

## `pages`

Configure Cloudflare Pages.

### `dev`

Develop your full-stack Pages application locally.

```txt
wrangler pages dev [<DIRECTORY>] [OPTIONS] [-- <COMMAND...>]
```

{{<definitions>}}

- `DIRECTORY` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The directory of static assets to serve.
- `COMMAND...` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The proxy command(s) to run.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}} {{<prop-meta>}}(default: true){{</prop-meta>}}
  - Run on your local machine.
- `--port` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}} {{<prop-meta>}}(default: 8788){{</prop-meta>}}
  - The port to listen on (serve from).
- `--proxy` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The port to proxy (where the static assets are served).
- `--script-path` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}} {{<prop-meta>}}(default: "\_worker.js"){{</prop-meta>}}
  - The location of the single Worker file if not using functions.
- `--binding` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Bind an environment variable or secret (for example, `--binding <VARIABLE_NAME>=<VALUE>`).
- `--kv` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Binding name of [KV namespace](/kv/) to bind (for example, `--kv <BINDING_NAME>`).
- `--r2` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Binding name of [R2 bucket](/pages/functions/bindings/#interact-with-your-r2-buckets-locally) to bind (for example, `--r2 <BINDING_NAME>`).
- `--d1` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Binding name of [D1 database](/pages/functions/bindings/#interact-with-your-d1-databases-locally) to bind (for example, `--d1 <BINDING_NAME>`).
- `--do` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Binding name of Durable Object to bind (for example, `--do <BINDING_NAME>=<CLASS>`).
- `--live-reload` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}} {{<prop-meta>}}(default: false){{</prop-meta>}}
  - Auto reload HTML pages when change is detected.
- `--compatibility-flag` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Runtime compatibility flags to apply.
- `--compatibility-date` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Runtime compatibility date to apply.

{{</definitions>}}

### `project list`

List your Pages projects.

```txt
wrangler pages project list
```

### `project create`

Create a new Cloudflare Pages project.

```txt
wrangler pages project create <PROJECT_NAME> [OPTIONS]
```

{{<definitions>}}

- `PROJECT_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of your Pages project.
- `--production-branch` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The name of the production branch of your project.

{{</definitions>}}

### `project delete`

Delete a Cloudflare Pages project.

```txt
wrangler pages project delete <PROJECT_NAME> [OPTIONS]
```

{{<definitions>}}

- `PROJECT_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the Pages project to delete.
- `--yes` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Answer `"yes"` to confirmation prompt.

{{</definitions>}}

### `deployment list`

List deployments in your Cloudflare Pages project.

```txt
wrangler pages deployment list [--project-name <PROJECT_NAME>]
```

{{<definitions>}}

- `--project-name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The name of the project you would like to list deployments for.

{{</definitions>}}

### `deployment tail`

Start a session to livestream logs from your deployed Pages Functions.

```txt
wrangler pages deployment tail [<DEPLOYMENT>] [OPTIONS]
```

{{<definitions>}}

- `DEPLOYMENT` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - ID or URL of the deployment to tail. Specify by environment if deployment ID is unknown.
- `--project-name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The name of the project you would like to tail.
- `--environment` {{<type>}}"production"|"preview"{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - When not providing a specific deployment ID, specifying environment will grab the latest production or preview deployment.
- `--format` {{<type>}}"json"|"pretty"{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The format of the log entries.
- `--status` {{<type>}}"ok"|"error"|"canceled"{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by invocation status.
- `--header` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by HTTP header.
- `--method` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by HTTP method.
- `--sampling-rate` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Add a percentage of requests to log sampling rate.
- `--search` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by a text match in `console.log` messages.
- `--ip` {{<type>}}(string|"self")[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by the IP address the request originates from. Use `"self"` to show only messages from your own IP.

{{</definitions>}}

{{<Aside type="note">}}
Filtering with `--ip self` will allow tailing your deployed Functions beyond the normal request per second limits.
{{</Aside>}}

After starting `wrangler pages deployment tail`, you will receive a live stream of console and exception logs for each request your Functions receive.

### `deploy`

Deploy a directory of static assets as a Pages deployment.

```txt
wrangler pages deploy <BUILD_OUTPUT_DIRECTORY> [OPTIONS]
```

{{<definitions>}}

- `BUILD_OUTPUT_DIRECTORY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The [directory](/pages/configuration/build-configuration/#framework-presets) of static files to upload.
- `--project-name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The name of the project you want to deploy to.
- `--branch` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The name of the branch you want to deploy to.
- `--commit-hash` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The SHA to attach to this deployment.
- `--commit-message` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The commit message to attach to this deployment.
- `--commit-dirty` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Whether or not the workspace should be considered dirty for this deployment.

{{</definitions>}}

{{<Aside type="note">}}

Your site is deployed to `<PROJECT_NAME>.pages.dev`. If you do not provide the `--project-name` argument, you will be prompted to enter a project name in your terminal after you run the command.

{{</Aside>}}

### `publish`

Publish a directory of static assets as a Pages deployment.

```txt
wrangler pages publish [<DIRECTORY>] [OPTIONS]
```

{{<Aside type="note">}}

This command has been deprecated as of v3 in favor of [`wrangler pages deploy`](#deploy-1). It will be removed in v4.

{{</Aside>}}

---

## `queues`

{{<Aside type="note">}}
Queues is currently in open beta. Report Queues bugs in [GitHub](https://github.com/cloudflare/workers-sdk/issues/new/choose).
{{</Aside>}}

Manage your Workers [Queues](/queues/) configurations.

### `create`

Create a new Queue.

```txt
wrangler queues create <name> [OPTIONS]
```

{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the queue to create.

{{</definitions>}}

### `delete`

Delete an existing queue.

```txt
wrangler queues delete <name> [OPTIONS]
```

{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the queue to delete.

{{</definitions>}}

### `list`

List all queues in the current account.

```txt
wrangler queues list [OPTIONS]
```

### `consumer`

Manage queue consumer configurations.

### `consumer add <script-name>`

Add a Worker script as a [queue consumer](/queues/reference/how-queues-works/#consumers).

```txt
wrangler queues consumer add <queue-name> <script-name> [OPTIONS]
```

{{<definitions>}}

- `queue-name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the queue to add the consumer to.
- `script-name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the Workers script to add as a consumer of the named queue.

{{</definitions>}}

### `consumer remove`

Remove a consumer from a queue.

```txt
wrangler queues consumer remove <queue-name> <script-name>
```

{{<definitions>}}

- `queue-name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the queue to remove the consumer from.
- `script-name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the Workers script to remove as the consumer.

{{</definitions>}}

---

## `login`

Authorize Wrangler with your Cloudflare account using OAuth. Wrangler will attempt to automatically open your web browser to login with your Cloudflare account.

If you prefer to use API tokens for authentication, such as in headless or continuous integration environments, refer to [Running Wrangler in CI/CD](/workers/wrangler/ci-cd/).

```txt
wrangler login [OPTIONS]
```

{{<definitions>}}

- `--scopes-list` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - List all the available OAuth scopes with descriptions.
- `--scopes $SCOPES` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Allows to choose your set of OAuth scopes. The set of scopes must be entered in a whitespace-separated list,
    for example, `$ npx wrangler login --scopes account:read user:read`.

{{</definitions>}}

{{<Aside type="note">}}
`wrangler login` uses all the available scopes by default if no flags are provided.
{{</Aside>}}

If Wrangler fails to open a browser, you can copy and paste the URL generated by `wrangler login` in your terminal into a browser and log in.

### Use `wrangler login` on a remote machine

If you are using Wrangler from a remote machine, but run the login flow from your local browser, you will receive the following error message after logging in:`This site can't be reached`.

To finish the login flow, run `wrangler login` and go through the login flow in the browser:

```sh
$ npx wrangler login
 ⛅️ wrangler 2.1.6
-------------------
Attempting to login via OAuth...
Opening a link in your default browser: https://dash.cloudflare.com/oauth2/auth?xyz...
```

The browser login flow will redirect you to a `localhost` URL on your machine.

Leave the login flow active. Open a second terminal session. In that second terminal session, use `curl` or an equivalent request library on the remote machine to fetch this `localhost` URL. Copy and paste the `localhost` URL that was generated during the `wrangler login` flow and run:

```sh
$ curl <LOCALHOST_URL>
```

---

## `logout`

Remove Wrangler's authorization for accessing your account. This command will invalidate your current OAuth token.

```txt
wrangler logout
```

If you are using `CLOUDFLARE_API_TOKEN` instead of OAuth, and you can logout by deleting your API token in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **My Profile** > **API Tokens**.
3. Select the three-dot menu on your Wrangler token.
4. Select **Delete**.

---

## `whoami`

Retrieve your user information and test your authentication configuration.

```txt
wrangler whoami
```

---

## `deployments`

{{<Aside type="note">}}
Deployments are currently in open beta. Report deployments bugs in [GitHub](https://github.com/cloudflare/workers-sdk/issues/new/choose).
{{</Aside>}}

For more information about deployments and how they work, refer to [Deployments](/workers/configuration/deployments).

### `list`

Retrieve details for the 10 most recent deployments. Details include `Deployment ID`, `Created on`, `Author`, `Source`, and an indication of which deployment is `Active`. Where applicable, details also include rollback information and a `Message` if one was provided on rollback.

```txt
wrangler deployments list [OPTIONS]
```

{{<definitions>}}

- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific Worker rather than inheriting from `wrangler.toml`.
    {{</definitions>}}

Example output:

```sh
Deployment ID:  y565f193-a6b9-4c7f-91ae-4b4e6d98ftbf
Created on:     2022-11-11T15:49:08.117218Z
Author:         example@cloudflare.com
Source:         Dashboard

Deployment ID:  91943f34-4802-4af7-a350-b5894c73ff34
Created on:     2022-11-11T15:50:08.117218Z
Author:         example@cloudflare.com
Source:         Dashboard

Deployment ID:  31d8f2f0-fba3-4ce9-8427-933f42541b56
Created on:     2022-11-11T15:51:08.117218Z
Author:         example@cloudflare.com
Source:         Rollback from Wrangler 🤠
Rollback from:  y565f193-a6b9-4c7f-91ae-4b4e6d98ftbf
Message:        This is a message submitted on rollback

Deployment ID:  7c2761da-5a45-4cb2-9448-a662978e3a59
Created on:     2022-11-11T15:52:08.117218Z
Author:         example@cloudflare.com
Source:         Rollback from Dashboard 🖥️
Rollback from:  31d8f2f0-fba3-4ce9-8427-933f42541b56

Deployment ID:  e81fe980-7622-6e1d-740b-1457de3e07e2
Created on:     2022-11-11T15:53:20.79936Z
Author:         example@cloudflare.com
Source:         Wrangler
🟩 Active
```

### `view` <deployment-id>

Retrieve details for the specified deployment, or the latest if no ID is provided. Details include `Deployment ID`, `Author`, `Source`, `Created on`, and bindings. Where applicable, details also include rollback information and a `Message` if one was provided on rollback.

```txt
wrangler deployments view [<DEPLOYMENT_ID>]
```

{{<definitions>}}

- `DEPLOYMENT_ID` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The ID of the deployment you wish to view.
- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific Worker rather than inheriting from `wrangler.toml`.
    {{</definitions>}}

Example output:

```sh
Deployment ID:      07d7143d-0284-427e-ba22-2d5e6e91b479
Created on:         2023-03-02T21:05:15.622446Z
Author:             example@cloudflare.com
Source:             Upload from Wrangler 🤠
------------------------------------------------------------
Author ID:          e5a3ca86e08fb0940d3a05691310bb42
Usage Model:        bundled
Handlers:           fetch
Compatibility Date: 2022-10-03
--------------------------bindings--------------------------
[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "testr2"

[[kv_namespaces]]
id = "79300c6d17eb4180a07270f450efe53f"
binding = "MY_KV"
```

## `rollback`

{{<Aside type="note">}}
Rollback is currently in open beta. Report rollback bugs in [GitHub](https://github.com/cloudflare/workers-sdk/issues/new/choose).
{{</Aside>}}

Rollback to a specified deployment by ID, or to the previous deployment if no ID is provided. The command will prompt you for confirmation of the rollback. On confirmation, you will be prompted to provide an optional message.

There are limitations on what deployments you can rollback to. Refer to [Rollbacks in the Deployments documentation](/workers/configuration/deployments#rollbacks) for more information.

{{<Aside type="warning">}}
A rollback will immediately replace the current deployment and become the active deployment across all your deployed routes and domains. This change will not affect work in your local development environment.
{{</Aside>}}

```txt
wrangler rollback [<DEPLOYMENT_ID>] [OPTIONS]
```

{{<definitions>}}

- `DEPLOYMENT_ID` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The ID of the deployment you wish to view.
- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific Worker rather than inheriting from `wrangler.toml`.
- `--message` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Add message for rollback. Accepts empty string. When specified, interactive prompts for rollback confirmation and message are skipped.
    {{</definitions>}}

Example output:

```sh
🚧 `wrangler rollback` is a beta command. Please report any issues to https://github.com/cloudflare/workers-sdk/issues/new/choose
Successfully rolled back to deployment ID: e81fe980-7622-6e1d-740b-1457de3e07e2
Current Deployment ID: 04d22369-6e55-49ff-944a-d21e216d9f3e
```

---

## dispatch namespace

### `list`

List all dispatch namespaces.

```txt
wrangler dispatch-namespace list
```

### `get`

Get information about a dispatch namespace.

```txt
wrangler dispatch-namespace get <NAME>
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the dispatch namespace to get details about.

{{</definitions>}}

### `create`

Create a dispatch namespace.

```txt
wrangler dispatch-namespace create <NAME>
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the dispatch namespace to create.

{{</definitions>}}

### `delete`

Delete a dispatch namespace.

```txt
wrangler dispatch-namespace get <NAME>
```

{{<Aside type="note">}}
You must delete all user Workers in the dispatch namespace before it can be deleted.
{{</Aside>}}

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the dispatch namespace to delete.

{{</definitions>}}

### `rename`

Rename a dispatch namespace.

```txt
wrangler dispatch-namespace get <OLD_NAME> <NEW_NAME>
```

{{<definitions>}}

- `OLD_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The previous name of the dispatch namespace.

- `NEW_NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The new name of the dispatch namespace.

{{</definitions>}}

---

## `mtls-certificate`

Manage client certificates used for mTLS connections in subrequests.

These certificates can be used in [`mtls_certificate` bindings](/workers/runtime-apis/bindings/mtls), which allow a Worker to present the certificate when establishing a connection with an origin that requires client authentication (mTLS).

### `upload`

Upload a client certificate.

```txt
wrangler mtls-certificate upload --cert <PATH> --key <PATH> [OPTIONS]
```

{{<definitions>}}

- `--cert` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - A path to the TLS certificate to upload. Certificate chains are supported.
- `--key` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - A path to the private key to upload.
- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The name assigned to the mTLS certificate at upload.

{{</definitions>}}

The following is an example of using the `upload` command to upload an mTLS certificate.

```sh
$ npx wrangler mtls-certificate upload --cert cert.pem --key key.pem --name my-origin-cert
Uploading mTLS Certificate my-origin-cert...
Success! Uploaded mTLS Certificate my-origin-cert
ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Expires: 1/01/2025
```

You can then add this certificate as a [binding](/workers/runtime-apis/bindings/) in your `wrangler.toml`:

```toml
mtls_certificates = [
  { binding = "MY_CERT", certificate_id = "99f5fef1-6cc1-46b8-bd79-44a0d5082b8d" }
]
```

Note that the certificate and private keys must be in separate (typically `.pem`) files when uploading.

### `list`

List mTLS certificates associated with the current account ID.

```txt
wrangler mtls-certificate list
```

The following is an example of using the `list` command to upload an mTLS certificate.

```sh
$ npx wrangler mtls-certificate list
ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
Name: my-origin-cert
Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Created on: 1/01/2023
Expires: 1/01/2025

ID: c5d004d1-8312-402c-b8ed-6194328d5cbe
Issuer: CN=another-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Created on: 1/01/2023
Expires: 1/01/2025
```

### `delete`

Delete a client certificate.

```txt
wrangler mtls-certificate delete {--id <ID|--name <NAME>}
```

{{<definitions>}}

- `--id` {{<type>}}string{{</type>}}
  - The ID of the mTLS certificate.
- `--name` {{<type>}}string{{</type>}}
  - The name assigned to the mTLS certificate at upload.

{{</definitions>}}

The following is an example of using the `delete` command to delete an mTLS certificate.

```sh
$ npx wrangler mtls-certificate delete --id 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
Are you sure you want to delete certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d (my-origin-cert)? [y/n]
yes
Deleting certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d...
Deleted certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d successfully
```

---

## `types`

Generate types from bindings and module rules in configuration.

```sh
wrangler types [<PATH>] [OPTIONS]
```

{{<definitions>}}

- `PATH` {{<type>}}string{{</type>}} {{<prop-meta>}}(default: `worker-configuration.d.ts`){{</prop-meta>}}
  - The path to where the declaration file for your Worker will be written.
  - The path to the declaration file must have a `d.ts` extension.

- `--env-interface` {{<type>}}string{{</type>}} {{<prop-meta>}}(default: `Env`){{</prop-meta>}}
  - The name of the interface to generate for the environment object.
  - Not valid if the Worker uses the Service Worker syntax.

{{</definitions>}}


<!--TODO Add examples of DTS generated output -->
