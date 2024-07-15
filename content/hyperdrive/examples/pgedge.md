---
type: example
summary: Connect Hyperdrive to a pgEdge Postgres database.
pcx_content_type: example
title: Connect to pgEdge Cloud
weight: 4
---

# Connect to pgEdge Cloud

This example shows you how to connect Hyperdrive to a [pgEdge](https://pgedge.com/) Postgres database. pgEdge Cloud provides easy deployment of secure, fully-managed, and fully-distributed Postgres.

## 1. Allow Hyperdrive access

You can connect Hyperdrive to any existing pgEdge database by configuring your Hyperdrive connection with the database connection string.

### pgEdge Dashboard

1. Go to the [**pgEdge dashboard**](https://app.pgedge.com/databases) and select the database you wish to connect to.
2. In the **Connect to your database** section, copy the connection string for the `app` user that is displayed on the [`Nearest node` tab](https://docs.pgedge.com/cloud/database/manage_db#connect-to-your-database). 

With the connection string, you can now create a Hyperdrive database configuration.

## 2. Create a database configuration

{{<render file="_npx-wrangler-hyperdrive.md">}}

## 3. Update the Cloudflare Worker to query pgEdge

Open the `src/index.ts` file, and update the code to include the following:

```ts
import { Client } from 'pg';

export interface Env {
    HYPERDRIVE: Hyperdrive;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
   	 const client = new Client(env.HYPERDRIVE.connectionString);
   	 try {
   		 await client.connect();
   		 const result = await client.query('SELECT * FROM spock.node');
   		 ctx.waitUntil(client.end());
   		 const items = result.rows.map((row: any) => {
   			 return { id: row.node_id, name: row.node_name };
   		 });
   		 return new Response(JSON.stringify({ items }), {
   			 headers: { 'Content-Type': 'application/json' },
   		 });
   	 } catch (e) {
   		 console.log(e);
   		 return Response.json({ error: JSON.stringify(e) }, { status: 500 });
   	 }
    },
};
```

After updating the file, use the following command to deploy the updates:

```sh
$ npx wrangler deploy
```

After completing these steps, you can use the Cloudflare Worker to query your Postgres database, provisioned and managed by pgEdge Cloud. 
