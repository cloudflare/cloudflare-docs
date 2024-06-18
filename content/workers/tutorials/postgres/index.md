---
updated: 2023-06-12
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Connect to a PostgreSQL database with Cloudflare Workers
---

# Connect to a PostgreSQL database with Cloudflare Workers

{{<tutorial-date-info>}}

In this tutorial, you will learn how to create a Cloudflare Workers application and connect it to a PostgreSQL database using [TCP Sockets](/workers/runtime-apis/tcp-sockets/). The Workers application you create in this tutorial will interact with a product database inside of PostgreSQL.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [`npm`](https://docs.npmjs.com/getting-started).
3. Install [`Node.js`](https://nodejs.org/en/). Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](/workers/wrangler/install-and-update/) requires a Node version of `16.17.0` or later.
4. Make sure you have access to a PostgreSQL database.

## 1. Create a Worker application

First, use the [`create-cloudflare` CLI](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) to create a new Worker application. To do this, open a terminal window and run the following command:

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm" no-code="true">}}

```sh
$ npm create cloudflare@latest
```

{{</tab>}}
{{<tab label="yarn" no-code="true">}}

```sh
$ yarn create cloudflare
```

{{</tab>}}
{{</tabs>}}

This will prompt you to install the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) package and lead you through a setup wizard.

To continue with this guide:

1. Give your new Worker application a name.
2. Select `"Hello World" Worker` for the type of application.
3. Choose `Yes` to using TypeScript.
4. Select `No` to deploying your application.

If you choose to deploy, you will be asked to authenticate (if not logged in already), and your project will be deployed. If you deploy, you can still modify your Worker code and deploy again at the end of this tutorial.

### Enable Node.js compatibility

[Add polyfills](/workers/wrangler/configuration/#add-polyfills-using-wrangler) for a subset of Node.js APIs to your Worker by adding the `node_compat` key to your `wrangler.toml`.

```toml
---
header: wrangler.toml
---
node_compat = true
```

## 2. Add the PostgreSQL connection library

To connect to a PostgreSQL database, you will need the `pg` library. In your Worker application directory, run the following command to install the library:

```sh
$ npm install pg
```

Make sure you are using `pg` (node-postgres) version `8.11.0` or higher, as earlier versions do not support the Cloudflare Workers [TCP Sockets API](/workers/runtime-apis/tcp-sockets/).

## 3. Configure the connection to the PostgreSQL database

Choose one of the two methods to connect to your PostgreSQL database:

1. [Use a connection string](#use-a-connection-string).
2. [Set explicit parameters](#set-explicit-parameters).

### Use a connection string

A connection string contains all the information needed to connect to a database. It is a URL that contains the following information:

```
postgresql://username:password@host:port/database
```

Replace `username`, `password`, `host`, `port`, and `database` with the appropriate values for your PostgreSQL database.

Set your connection string as a [secret](/workers/configuration/secrets/) so that it is not stored as plain text. Use [`wrangler secret put`](/workers/wrangler/commands/#secret) with the example variable name `DB_URL`:

```sh
$ npx wrangler secret put DB_URL
➜  wrangler secret put DB_URL
-------------------------------------------------------
? Enter a secret value: › ********************
✨ Success! Uploaded secret DB_URL
```

### Set explicit parameters

Configure each database parameter as an [environment variable](/workers/configuration/environment-variables/) via the [Cloudflare dashboard](/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard) or in your `wrangler.toml` file. Refer to an example of a`wrangler.toml` file configuration:

```toml
---
filename: wrangler.toml
---

[vars]
DB_USERNAME = "postgres"
# Set your password by creating a secret so it is not stored as plain text
DB_HOST = "ep-aged-sound-175961.us-east-2.aws.neon.tech"
DB_PORT = "5432"
DB_NAME = "productsdb"
```

To set your password as a [secret](/workers/configuration/secrets/) so that it is not stored as plain text, use [`wrangler secret put`](/workers/wrangler/commands/#secret). `DB_PASSWORD` is an example variable name for this secret to be accessed in your Worker:

```sh
$ npx wrangler secret put DB_PASSWORD
-------------------------------------------------------
? Enter a secret value: › ********************
✨ Success! Uploaded secret DB_PASSWORD
```

## 4. Connect to the PostgreSQL database in the Worker

Open your Worker's main file (for example, `worker.ts`) and import the `Client` class from the `pg` library:

```typescript
---
filename: worker.ts
---
import { Client } from "pg";
```

In the `fetch` event handler, connect to the PostgreSQL database using your chosen method, either the connection string or the explicit parameters.

### Use a connection string

```typescript
---
filename: worker.ts
---
const client = new Client(env.DB_URL);
await client.connect();
```

### Set explicit parameters

```typescript
---
filename: worker.ts
---
const client = new Client({
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME
});
await client.connect();
```

## 5. Interact with the products database

To demonstrate how to interact with the products database, you will fetch data from the `products` table by querying the table when a request is received.

{{<Aside type="note">}}

If you are following along in your own PostgreSQL instance, set up the `products` using the following SQL `CREATE TABLE` statement. This statement defines the columns and their respective data types for the `products` table:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL
);
```

{{</Aside>}}

Replace the existing code in your `worker.ts` file with the following code:

```typescript
---
filename: worker.ts
---
export default {
  async fetch(request, env, ctx): Promise<Response> {
    const client = new Client(env.DB_URL);
    await client.connect();

    // Query the products table
    const result = await client.query("SELECT * FROM products");

    // Return the result as JSON
    const resp = new Response(JSON.stringify(result.rows), {
      headers: { "Content-Type": "application/json" },
    });

    // Clean up the client
    ctx.waitUntil(client.end());
    return resp;
  },
} satisfies ExportedHandler<Env>;
```

This code establishes a connection to the PostgreSQL database within your Worker application and queries the `products` table, returning the results as a JSON response.

## 6. Deploy your Worker

Run the following command to deploy your Worker:

```sh
$ npx wrangler deploy
```

Your application is now live and accessible at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

After deploying, you can interact with your PostgreSQL products database using your Cloudflare Worker. Whenever a request is made to your Worker's URL, it will fetch data from the `products` table and return it as a JSON response. You can modify the query as needed to retrieve the desired data from your products database.

## 7. Insert a new row into the products database

To insert a new row into the `products` table, create a new API endpoint in your Worker that handles a `POST` request. When a `POST` request is received with a JSON payload, the Worker will insert a new row into the `products` table with the provided data.

Assume the `products` table has the following columns: `id`, `name`, `description`, and `price`.

Add the following code snippet inside the `fetch` event handler in your `worker.ts` file, before the existing query code:

```typescript
---
filename: worker.ts
---
const url = new URL(request.url);
if (request.method === "POST" && url.pathname === "/products") {
  // Parse the request's JSON payload
  const productData = await request.json();

  // Insert the new product into the database
  const insertQuery = `
    INSERT INTO products (name, description, price)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [productData.name, productData.description, productData.price];
  const insertResult = await client.query(insertQuery, values);

  // Return the inserted row as JSON
  const insertResp = new Response(JSON.stringify(insertResult.rows[0]), {
    headers: { "Content-Type": "application/json" },
  });

  // Clean up the client
  ctx.waitUntil(client.end());
  return insertResp;
}
```

This code snippet does the following:

1. Checks if the request is a `POST` request and the URL path is `/products`.
2. Parses the JSON payload from the request.
3. Constructs an `INSERT` SQL query using the provided product data.
4. Executes the query, inserting the new row into the `products` table.
5. Returns the inserted row as a JSON response.

Now, when you send a `POST` request to your Worker's URL with the `/products` path and a JSON payload, the Worker will insert a new row into the `products` table with the provided data.

Modify your existing Worker code to accommodate the new feature:

```typescript
---
filename: worker.ts
---
if (request.method === "POST" && url.pathname === "/products") {
  // (Insert a new row as detailed in the code snippet above)
} else if (request.method === "GET" && url.pathname === "/products") {
  // (Fetch data from the products table as detailed in Step 5)
}
```

After making these changes, deploy the Worker again by running:

```sh
$ npx wrangler deploy
```

You can now use your Cloudflare Worker to insert new rows into the `products` table. To test this functionality, send a `POST` request to your Worker's URL with the `/products` path, along with a JSON payload containing the new product data:

```json
{
  "name": "Sample Product",
  "description": "This is a sample product",
  "price": 19.99
}
```


You have successfully created a Cloudflare Worker that connects to a PostgreSQL database and handles fetching data and inserting new rows into a products table.

## Next steps

To build more with databases and Workers, refer to [Tutorials](/workers/tutorials) and explore the [Databases documentation](/workers/databases).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord](https://discord.cloudflare.com) to connect with fellow developers and the Cloudflare team.
