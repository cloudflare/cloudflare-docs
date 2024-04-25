---
pcx_content_type: configuration
title: Turso
---

# Turso

[Turso](https://turso.tech/) is an edge-hosted, distributed database based on [libSQL](https://libsql.org/), an open-source fork of SQLite. Turso was designed to minimize query latency for applications where queries comes from anywhere in the world.

{{<render file="_database_integrations_definition.md">}}

## Set up an integration with Turso

To set up an integration with Turso:

1. You need to install Turso CLI to create and populate a database. Use one of the following two commands in your terminal to install the Turso CLI:

  ```sh
  # On macOS and linux with homebrew
  $ brew install tursodatabase/tap/turso

  # Manual scripted installation
  $ curl -sSfL https://get.tur.so/install.sh | bash
  ```

  Next, run the following command to make sure the Turso CLI is installed:

  ```sh
  $ turso --version
  ```

2. Before you create your first Turso database, you have to authenticate with your GitHub account by running:

  ```sh
  $ turso auth login

  Waiting for authentication...
  ✔  Success! Logged in as <YOUR_GITHUB_USERNAME>
  ```
  After you have authenticated, you can create a database using the command `turso db create <DATABASE_NAME>`. Turso will create a database and automatically choose a location closest to you.

  ```sh
  $ turso db create my-db

  # Example:
  Creating database my-db in Amsterdam, Netherlands (ams)

  # Once succeeded:
  Created database my-db in Amsterdam, Netherlands (ams) in 13 seconds.
  ```
  With the first database created, you can now connect to it directly and execute SQL queries against it.

  ```sh
  $ turso db shell my-db
  ```

3. Copy the following SQL query into the shell you just opened:

    ```sql
    CREATE TABLE elements (
      id INTEGER NOT NULL,
      elementName TEXT NOT NULL,
      atomicNumber INTEGER NOT NULL,
      symbol TEXT NOT NULL
    );

    INSERT INTO elements (id, elementName, atomicNumber, symbol)
    VALUES (1, 'Hydrogen', 1, 'H'),
      (2, 'Helium', 2, 'He'),
      (3, 'Lithium', 3, 'Li'),
      (4, 'Beryllium', 4, 'Be'),
      (5, 'Boron', 5, 'B'),
      (6, 'Carbon', 6, 'C'),
      (7, 'Nitrogen', 7, 'N'),
      (8, 'Oxygen', 8, 'O'),
      (9, 'Fluorine', 9, 'F'),
      (10, 'Neon', 10, 'Ne');
    ```
4. Add the Turso database integration to your Worker:

    1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    2. In **Account Home**, select **Workers & Pages**.
    3. In **Overview**, select your Worker.
    4. Select **Integrations** > **Turso**.
    5. Follow the setup flow, selecting the database created in step 1.

5. In your Worker, install the Turso client library:

  ```sh
  $ npm install @libsql/client
  ```

6. The following example shows how to make a query to your Turso database in a Worker. The credentials needed to connect to Turso have been automatically added as [secrets](/workers/configuration/secrets/) to your Worker through the integration.

  ```ts
    import { Client as LibsqlClient, createClient } from "@libsql/client/web";

    export interface Env {
      LIBSQL_DB_URL?: string;
      LIBSQL_DB_AUTH_TOKEN?: string;
    }

    export default {
      async fetch(request, env, ctx): Promise<Response> {
        const client = buildLibsqlClient(env);

        try {
          const res = await client.execute('SELECT * FROM elements');
          return new Response(JSON.stringify(res), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          console.error('Error executing SQL query:', error);
          return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500
          });
        }
      },
    } satisfies ExportedHandler<Env>;

    function buildLibsqlClient(env: Env): LibsqlClient {
      const url = env.LIBSQL_DB_URL?.trim();
      if (url === undefined) {
        throw new Error("LIBSQL_DB_URL env var is not defined");
      }

      const authToken = env.LIBSQL_DB_AUTH_TOKEN?.trim();
      if (authToken == undefined) {
        throw new Error("LIBSQL_DB_AUTH_TOKEN env var is not defined");
      }

      return createClient({ url, authToken })
    }
  ```

  - The libSQL client library import `@libsql/client/web` must be imported exactly as shown when working with Cloudflare Workers. The non-web import will not work in the Workers environment.
  - The `Env` interface contains the [environment variable](/workers/configuration/environment-variables/) and [secret](/workers/configuration/secrets/) defined when you added the Turso integration in step 4.
  - The `Env` interface also caches the libSQL client object and router, which was created on the first request to the Worker.
  - The Worker uses `buildLibsqlClient` to query the `elements` database and returns the response as a JSON object.

With your environment configured and your code ready, you can now test your Worker locally before you deploy.

To learn more about Turso, refer to [Turso's official documentation](https://docs.turso.tech).
