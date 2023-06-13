---
updated: 2023-06-12
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Connect to a PostgreSQL Database with Cloudflare Workers
layout: single
---

# Connect to a PostgreSQL Database with Cloudflare Workers

In this tutorial, you will learn how to create a Cloudflare Workers project and connect to a PostgreSQL database using [TCP Sockets](/workers/runtime-apis/tcp-sockets/). We'll demonstrate this by creating a Workers application that interacts with a product database inside of PostgreSQL.

## Prerequisites

Before you start, make sure you have:

- A Cloudflare account - if you don't have one, [sign up](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.
- Node.js and `npm` installed on your machine.
- Access to a PostgreSQL database.

## Step 1: Create a new project

First, use the [`create-cloudflare` CLI](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) to create a new Cloudflare Workers project. To do this, open a terminal window and run the following command:

```sh
$ npm create cloudflare
```

or `yarn`:

```sh
$ yarn create cloudflare
```

This will prompt you to install the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) package and lead you through a setup wizard.

Once your project has been configured and scaffolded, you will be asked if you would like to deploy the project to Cloudflare. If you choose not to deploy, you can navigate to the newly created project folder to begin development. Otherwise, you'll be asked to authenticate (if not logged in already), and your project will be deployed.

## Step 2: Add the PostgreSQL connection library

To connect to a PostgreSQL database, you will need the `pg` library. In your project folder, run the following command to install the library:

```sh
$ npm install pg
```

Make sure you are using `pg` (node-postgres) version `8.11.0` or higher, as earlier versions do not support the Cloudflare Workers TCP Sockets API.

## Step 3: Configure the connection to the PostgreSQL database

In this step, choose one of the two methods to connect to your PostgreSQL database:

1. [Using a connection string](#using-a-connection-string)
2. [Setting explicit parameters](#setting-explicit-parameters)

### Using a connection string

Create a connection string with the format:

```
postgresql://username:password@host:port/database
```

Replace `username`, `password`, `host`, `port`, and `database` with the appropriate values for your PostgreSQL database.

Next, set your connection string as a [secret](/workers/platform/environment-variables/#add-secrets-to-your-project) so that it is not stored as plain text. Use [`wrangler secret put`](/workers/wrangler/commands/#secret) with the example variable name `DB_URL`:

```sh
$ wrangler secret put DB_URL
➜  wrangler secret put DB_URL
-------------------------------------------------------
? Enter a secret value: › ********************
✨ Success! Uploaded secret DB_URL
```

### Setting explicit parameters

Configure each database parameter as an [environment variable](/workers/platform/environment-variables/) via the [dashboard](/workers/platform/environment-variables/#environment-variables-via-the-dashboard) or in your `wrangler.toml` file. Here's an example:

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

To set your password as a [secret](/workers/platform/environment-variables/#add-secrets-to-your-project) so that it is not stored as plain text, use [`wrangler secret put`](/workers/wrangler/commands/#secret). `DB_PASSWORD` is an example variable name for this secret to be accessed in your Worker:

```sh
$ wrangler secret put DB_PASSWORD
-------------------------------------------------------
? Enter a secret value: › ********************
✨ Success! Uploaded secret DB_PASSWORD
```

## Step 4: Connect to the PostgreSQL database in the Worker

Open your Worker's main file (e.g., `index.ts`) and import the `Client` class from the `pg` library:

```javascript
import { Client } from "pg";
```

In the `fetch` event handler, connect to the PostgreSQL database using your chosen method, either the connection string or the explicit parameters:

### Using a connection string

```javascript
const client = new Client(env.DB_URL);
await client.connect();
```

### Setting explicit parameters

```javascript
const client = new Client({
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME
});
await client.connect();
```

## Step 5: Interact with the products database

To demonstrate how to interact with the products database, you will fetch data from the `products` table by creating a Worker that queries the table when a request is received.

{{<Aside type="note">}}

If you're following along in your own PostgreSQL instance, set up the `products` using the following SQL `CREATE TABLE` statement. This statement defines the columns and their respective data types for the `products` table:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL
);
```

{{</Aside>}}

Replace the existing code in your `index.ts` file with the following code:

```javascript
---
filename: index.ts
--- 
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
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
};
```

This code establishes a connection to the PostgreSQL database and queries the `products` table, returning the results as a JSON response.

## Step 6: Deploy the Worker

If you haven't already deployed the project, use the following command to deploy the Worker:

```sh
$ npx wrangler deploy
```

Now you can interact with your PostgreSQL products database using your Cloudflare Worker. Whenever a request is made to your Worker's URL, it will fetch data from the `products` table and return it as a JSON response. You can modify the query as needed to retrieve the desired data from your products database.

## Step 7: Insert a new row into the products database

To insert a new row into the `products` table, create a new API endpoint in your Worker that handles a `POST` request. When a `POST` request is received with a JSON payload, the Worker will insert a new row into the `products` table with the provided data.

As mentioned above, let's assume the `products` table has the following columns: `id`, `name`, `description`, and `price`.

Add the following code snippet inside the `fetch` event handler in your `index.ts` file, before the existing query code:

```javascript
---
filename: index.ts
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

Modify your existing deployment code to accommodate the new feature:

```javascript
---
filename: index.ts
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

## Conclusion and next steps

Congratulations! You've successfully created a Cloudflare Worker that connects to a PostgreSQL database and handles fetching data and inserting new rows into a products table. This is just the beginning of what you can achieve with Cloudflare Workers and databases.

For more inspiration, check out additional tutorials in our [tutorials section](/workers/tutorials) and explore the database features in the [Databases documentation](/workers/databases).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord](https://discord.gg/cloudflaredev) to connect with fellow developers and the Cloudflare team.
