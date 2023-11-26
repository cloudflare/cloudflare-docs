---
weight: 1
title: Get started
pcx_content_type: get-started
---

# Get started

Hyperdrive accelerates access to your existing databases from Cloudflare Workers, making even single-region databases feel globally distributed.

By maintaining a connection pool to your database within Cloudflare's network, Hyperdrive reduces seven round-trips to your database before you can even send a query: the TCP handshake (1x), TLS negotiation (3x), and database authentication (3x).

Hyperdrive understands the difference between read and write queries to your database, and can cache the most common read queries, improving performance and reducing load on your origin database.

This guide will instruct you through:

- Creating your first Hyperdrive configuration.
- Creating a [Cloudflare Worker](/workers/) and binding it to your Hyperdrive configuration.
- Establishing a database connection from your Worker to a public database.

## Prerequisites

{{<Aside type="note" header="Workers Paid plan required">}}

Hyperdrive is available to all users on the [Workers Paid plan](/workers/platform/pricing/#workers).

{{</Aside>}}

To continue, you will need:

1. A [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you do not have one already.
2. [`npm`](https://docs.npmjs.com/getting-started) installed on your local machine.
3. [`Node.js`](https://nodejs.org/en/) installed. Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](/workers/wrangler/install-and-update/) requires a Node version of `16.17.0` or later.
4. **A publicly accessible PostgreSQL (or PostgreSQL compatible) database**. Cloudflare recommends [Neon](https://neon.tech/) if you do not have an existing database. Read the [Neon's documentation to create your first database](https://neon.tech/docs/introduction).

## 1. Log in

Before creating your Hyperdrive binding, log in with your Cloudflare account by running:

```sh
$ npx wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

## 2. Create a Worker

{{<Aside type="note" header="New to Workers?">}}

Refer to [How Workers works](/workers/learning/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](/workers/get-started/guide/) to set up your first Worker.

{{</Aside>}}

Create a new project named `hyperdrive-tutorial` by running:

```sh
$ npm create cloudflare@latest
```

When setting up your `hyperdrive-tutorial` Worker, answering the questions as below:

- Name your directory `hyperdrive-tutorial`.
- Choose `"Hello World" script` for the type of application.
- Select `yes` to using TypeScript.
- Select `yes` to using Git.
- Select `no` to deploying.

This will create a new `hyperdrive-tutorial` directory. Your new `hyperdrive-tutorial` directory will include:

- A `"Hello World"` [Worker](/workers/get-started/guide/#3-write-code) at `src/index.ts`.
- A [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. `wrangler.toml` is how your `hyperdrive-tutorial` Worker will connect to Hyperdrive.

{{<Aside type="note" heading="Familiar with Workers?">}}

If you are familiar with Cloudflare Workers, or initializing projects in a Continuous Integration (CI) environment, initialize a new project non-interactively by setting `CI=true` as an environmental variable when running `create cloudflare@latest`.

For example: `CI=true npm create cloudflare@latest hyperdrive-tutorial --type=simple --git --ts --deploy=false` will create a basic "Hello World" project ready to build on.

{{</Aside>}}

## 3. Connect Hyperdrive to a database

{{<Aside type="note" heading="Supported database engines">}}

Hyperdrive currently works with PostgreSQL and/or PostgreSQL compatible databases, including CockroachDB and Materialize.

Support for other database engines, including MySQL, is on the roadmap.

{{</Aside>}}

Hyperdrive works by connecting to your database.

To create your first Hyperdrive database configuration, change into the directory you just created for your Workers project:

```sh
$ cd hyperdrive-tutorial
```

{{<Aside type="note" heading="Supported database engines">}}

Support for the new `hyperdrive` commands in the wrangler CLI requires a wrangler version of `3.10.0` or later. You can use `npx wrangler@latest` to always ensure you are using the latest version of wrangler.

{{</Aside>}}

To create your first Hyperdrive, you will need:

- The IP address (or hostname) and port of your database.
- The database username (for example, `hyperdrive-demo`) you configured in a previous step.
- The password associated with that username.
- The name of the database you want Hyperdrive to connect to. For example, `postgres`.

Hyperdrive accepts the combination of these parameters in the common connection string format used by database drivers:

```sh
postgres://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name
```

Most database providers will provide a connection string you can directly copy-and-paste directly into Hyperdrive.

To create a Hyperdrive connection, run the `wrangler` command, replacing the placeholder values passed to the `--connection-string` flag with the values of your existing database:

```sh
$ npx wrangler hyperdrive create $NAME --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

If successful, the command will output your new Hyperdrive configuration:

```json
{
  "id": "<example id: 57b7076f58be42419276f058a8968187>",
  "name": "your-config-name",
  "origin": {
    "host": "YOUR_DATABASE_HOST",
    "port": 5432,
    "database": "DATABASE",
    "user": "DATABASE_USER"
  },
  "caching": {
    "disabled": false
  }
}
```

Copy the `id` field: you will use this in the next step to make Hyperdrive accessible from your Worker script.

{{<Aside type="note">}}

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](/hyperdrive/learning/troubleshooting/) to debug possible causes.

{{</Aside>}}

## 4. Bind your Worker to Hyperdrive

You must create a binding for your Worker to connect to your Hyperdrive configuration. [Bindings](/workers/configuration/bindings/) allow your Workers to access resources, like D1, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind your Hyperdrive configuration to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---
node_compat = true # required for database drivers to function

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "a76a99bc342644deb02c38d66082262a" # the ID associated with the Hyperdrive you just created
```

Specifically:

- The value (string) you set for the `name` (binding name) will be used to reference this database in your Worker. In this tutorial, name your binding `HYPERDRIVE`.
- The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "hyperdrive"` or `binding = "productionDB"` would both be valid names for the binding.
- Your binding is available in your Worker at `env.<BINDING_NAME>`.

## 5. Run a query against your database

### Install a database driver

To connect to your database, you will need a database driver which allows you to authenticate and query your database. For this tutorial, you will use [node-postgres](https://node-postgres.com/), one of the most widely used PostgreSQL drivers.

To install `node-postgres`, ensure you are in the `hyperdrive-tutorial` directory. Open your terminal and run the following command:

```sh
# For existing projects, use pg v8.11.0 or greater
$ npm i pg
```

With the driver installed, you can now create a Worker script that queries your database.

### Write a Worker

After you have set up your database, you will run a SQL query from within your Worker.

Go to your `hyperdrive-tutorial` Worker and open the `index.ts` file. The `index.ts` file is where you configure your Worker's interactions with D1.

Populate your `index.ts` file with the following code:

```typescript
---
filename: src/index.ts
---
import { Client } from 'pg';

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "HYPERDRIVE" with the variable name you defined.
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		console.log(JSON.stringify(env))
		// Create a database client that connects to your database via Hyperdrive
		// Hyperdrive generates a unique connection string you can pass to
		// supported drivers, including node-postgres, Postgres.js, and the many
		// ORMs and query builders that use these drivers.
		const client = new Client({ connectionString: env.HYPERDRIVE.connectionString });

		try {
			// Connect to your database
			await client.connect();

			// Test query
			let result = await client.query({ text: 'SELECT * FROM pg_tables' });

			// Return result rows as JSON
			return Response.json({ result: result });
		} catch (e) {
			console.log(e);
			return Response.json({ error: JSON.stringify(e) }, { status: 500 });
		}
	},
};
```

In the code above, you have:

1. Created a new database `Client` configured to connect to your database via Hyperdrive.
2. Connected to the database via `await client.connect()`.
3. Initiated a query via `await client.query()` that outputs all tables (user and system created) in the database.
4. Returned the response as JSON to the client.

## 6. Deploy your database

You can now deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

```sh
$ npx wrangler deploy
# Outputs: https://hyperdrive-tutorial.<YOUR_SUBDOMAIN>.workers.dev
```

You can now visit the URL for your newly created project to query your live database.

For example, if the URL of your new Worker is `hyperdrive-tutorial.<YOUR_SUBDOMAIN>.workers.dev`, accessing `https://hyperdrive-tutorial.<YOUR_SUBDOMAIN>.workers.dev/` will send a request to your Worker that queries your database directly.

By finishing this tutorial, you have created a Hyperdrive configuration, a Worker to access that database and deployed your project globally.

## Next steps

- Learn more about [how Hyperdrive works](/hyperdrive/learning/how-hyperdrive-works/).
- How to [configure query caching](/hyperdrive/learning/query-caching/).
- [Troubleshooting common issues](/hyperdrive/learning/troubleshooting/) when connecting a database to Hyperdrive.

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord](https://discord.gg/cloudflaredev).
