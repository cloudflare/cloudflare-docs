---
type: example
summary: Connect Hyperdrive to a pgEdge Postgres database.
pcx_content_type: configuration
title: Connect to pgEdge Cloud
weight: 4
layout: example
---

The following example shows you how to connect Hyperdrive to a [pgEdge](https://pgedge.com/) Postgres database. pgEdge Cloud provides easy deployment of fully-managed, fully-distributed, and secure Postgres.




## 2. Create a pgEdge Database

Visit the [pgEdge website](https://www.pgedge.com/get-started/cloud) to sign up for a pgEdge Developer Edition account. After signing up, connect to the pgEdge Cloud console, and [deploy a 3-node cluster](https://docs.pgedge.com/cloud/cluster/create_cluster). When the deployment completes, use the [PSQL connection string](https://docs.pgedge.com/cloud/connecting/psql) displayed in the `Get Started` pane to connect to the Postgres server.

After connecting, use the following statements to generate a table and records:

`CREATE TABLE products(id varchar, name varchar, primary key(id));`

```sql
INSERT INTO products (id, name) VALUES
('1', 'Whisper Quiet Vacuum'),
('2', 'Everlast Lightbulbs'),
('3', 'Magic Sponge Erasers'),
('4', 'EcoFresh Laundry Detergent'),
('5', 'Sunrise Alarm Clock'),
('6', 'Infinity Batteries'),
('7', 'Gleam Window Cleaner'),
('8', 'IronGlide Steam Iron'),
('9', 'Breeze Air Purifier'),
('10', 'QuickFix Super Glue');
```

Return to the pgEdge console and select the `Start Replication` button to [start replication](https://docs.pgedge.com/cloud/database/manage_db#the-start-replication-pane) across your cluster. 

Navigate to the `Connect to your database` panel, and copy the connection string for the `app` user that is displayed on the [`Nearest node` tab](https://docs.pgedge.com/cloud/database/manage_db#connect-to-your-database). 


## 3. Create a Hyperdrive

Move to a terminal window, and use the following command to [create a Hyperdrive](https://developers.cloudflare.com/hyperdrive/get-started/):

`npx wrangler hyperdrive create pgedge --connection-string="pgedge_connection_string"`

When the command completes, it will return information about the Hyperdrive, including the Hyperdrive UUID. Copy the ID, and update the `wrangler.toml` file to include the following information:

```sql
node_compat = true # required for the postgres connection

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "hyperdrive_uuid"
```

## 4. Update the Cloudflare worker to Query pgEdge

Open the `src/index.ts` file, and update the code to include the following:

```js
import { Client } from 'pg';

export interface Env {
    HYPERDRIVE: Hyperdrive;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
   	 const client = new Client(env.HYPERDRIVE.connectionString);
   	 try {
   		 await client.connect();
   		 const result = await client.query('SELECT * FROM products');
   		 ctx.waitUntil(client.end());
   		 const items = result.rows.map((row: any) => {
   			 return { id: row.id, name: row.name };
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

`npx wrangler deploy`

After completing these steps, you can use the Cloudflare worker to query your Postgres database, provisioned and managed by pgEdge Cloud. 




















