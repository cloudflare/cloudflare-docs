---
_build:
  publishResources: false
  render: never
  list: never
---

To configure Hyperdrive, you will need:

- The IP address (or hostname) and port of your database.
- The database username (for example, `hyperdrive-demo`) you configured in a previous step.
- The password associated with that username.
- The name of the database you want Hyperdrive to connect to. For example, `postgres`.

Hyperdrive accepts the combination of these parameters in the common connection string format used by database drivers:

```txt
postgres://USERNAME:PASSWORD@HOSTNAME_OR_IP_ADDRESS:PORT/database_name
```

Most database providers will provide a connection string you can directly copy-and-paste directly into Hyperdrive.

To create a Hyperdrive configuration with the [Wrangler CLI](/workers/wrangler/install-and-update/), open your terminal and run the following command. Replace <NAME_OF_HYPERDRIVE_CONFIG> with a name for your Hyperdrive configuration and paste the connection string provided from your database host, or replace `user`, `password`, `HOSTNAME_OR_IP_ADDRESS`, `port`, and `database_name` placeholders with those specific to your database:

```sh
$ npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

{{<Aside type="note">}}

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](/hyperdrive/observability/troubleshooting/) to debug possible causes.

{{</Aside>}}

This command outputs a binding for `wrangler.toml`:

```toml
---
filename: wrangler.toml
---
name = "hyperdrive-example"
main = "src/index.ts"
compatibility_date = "2023-09-11"

node_compat = true # required for database drivers to function

# Pasted from the output of `wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string=[...]` above.
[[hyperdrive]]
binding = "HYPERDRIVE"
id = ""
```

Install the driver:

```sh
$ npm install pg
```

Copy the below Worker code, which passes the connection string generated from `env.HYPERDRIVE.connectionString` directly to the driver.

```ts
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
	async fetch(request, env, ctx): Promise<Response> {
		console.log(JSON.stringify(env))
		// Create a database client that connects to our database via Hyperdrive
		// Hyperdrive generates a unique connection string you can pass to
		// supported drivers, including node-postgres, Postgres.js, and the many
		// ORMs and query builders that use these drivers.
		const client = new Client({ connectionString: env.HYPERDRIVE.connectionString });

		try {
			// Connect to our database
			await client.connect();

			// Test query
			const result = await client.query({ text: 'SELECT * FROM pg_tables' });

			// Returns result rows as JSON
			return Response.json({ result: result });
		} catch (e) {
			console.log(e);
			return Response.json({ error: e.message }, { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
```

## Next steps

- Learn more about [How Hyperdrive Works](/hyperdrive/configuration/how-hyperdrive-works/).
- Refer to the [troubleshooting guide](/hyperdrive/observability/troubleshooting/) to debug common issues.
- Understand more about other [storage options](/workers/platform/storage-options/) available to Cloudflare Workers.
