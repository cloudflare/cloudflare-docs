---
pcx_content_type: tutorial
title: Query a pgEdge Distributed PostgreSQL Cluster from Cloudflare Workers
updated: 2024-06-27
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
---

# Query a pgEdge Distributed PostgreSQL Cluster from Cloudflare Workers

## Overview

In this tutorial, you will learn how to use a Cloudflare Worker to consume data from a pgEdge Cloud Postgres database in a three-node distributed multi-active replication cluster.

You will create a Worker function that connects to your database using [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) to proxy your database connection and maintain a connection pool to prevent us having to make a new database connection on every request. 

You will learn how to:

- Deploy a Cloudflare Worker with the Cloudflare Wrangler CLI.
- Create and connect to a pgEdge distributed Postgres cluster.
- Use Cloudflare Wrangler to create a [Hyperdrive](/hyperdrive/) connection to your pgEdge Postgres database.
- Query your pgEdge Postgres database with a Cloudflare Worker.
- Test your configuration optimizations.

## Before you start

All of the tutorials assume you have already completed the [Get started guide](/workers/get-started/guide/), which gets you set up with a Cloudflare Workers account, [C3](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare), and [Wrangler](/workers/wrangler/install-and-update/).

## 1. Create a Cloudflare Worker

Run the following command to create a Worker project from the command line:

```sh
---
header: Create a project
---
$ npm create cloudflare@latest
```

For setup, select the following options:

- `Where do you want to create your application?`: Enter: `pgedge`
- `What type of application do you want to create?`: Select ``Hello World Worker`.
- `Do you want to use TypeScript?`: Select `Yes`.
- `Do you want to deploy your application?`: Select `Yes`.

When you're finished responding to prompts, the CLI will deploy the Worker and display a Worker URL similar to:

`https://pgedge-worker.your-name-423.workers.dev`

Then, navigate into the `pgedge` directory, and install the Cloudflare Wrangler CLI in your project:

```sh
$ cd pgedge
$ npm install wrangler --save-dev
```

## 2. Create a pgEdge Cluster

Visit the pgEdge website to sign up for a free pgEdge Designer Edition Cloud account. After signing up, connect to the pgEdge Cloud console, and deploy a 3-node cluster. When the deployment completes, copy the PSQL connection string displayed in the `Get Started` pane, and connect to the Postgres server hosted in pgEdge Cloud. You can connect using the `psql` command-line tool or a GUI tool like pgAdmin.

The PSQL command will look similar to the following:

```sh
$ PGSSLMODE=require PGPASSWORD=randompassword psql -U app -h random-name.a1.pgedge.io -d defaultdb
```

After connecting, use the following statements to create a table and populate the table with records:

```sql
CREATE TABLE products(id varchar, name varchar, primary key(id));
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

When you return to the pgEdge console, the `products` table will be listed in the `Start Replication` pane. Select the `Start Replication` button to start replication across the nodes in your cluster.

Navigate to the `Connect to your database` pane, and copy the connection string for the `app` user that is displayed on the `Nearest node` tab. You will need to provide this connection string in the command that creates a Hyperdrive.

## 3. Create a Hyperdrive

{{<render file="_npx-wrangler-hyperdrive.md">}}

## 4. Update the Cloudflare Worker to query pgEdge

Open the `src/index.ts` file, and update the Worker code to include the following code that:

- Uses Hyperdrive to create a connection with the pgEdge Postgres database.
- Queries the `products` table (created in step 2).
- Returns the result set in a JSON string.

```ts
import { Client } from "pg";

export interface Env {
  HYPERDRIVE: Hyperdrive;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const client = new Client(env.HYPERDRIVE.connectionString);
    try {
      await client.connect();
      const result = await client.query("SELECT * FROM products");
      ctx.waitUntil(client.end());
      const items = result.rows.map((row: any) => {
        return { id: row.id, name: row.name };
      });
      return new Response(JSON.stringify({ items }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.log(e);
      return Response.json({ error: JSON.stringify(e) }, { status: 500 });
    }
  },
};
```

After updating the file, use the following command to deploy your Cloudflare Worker:

```sh
$ npx wrangler deploy
```

When the command completes, the result set includes a URL. Navigate to the URL with your browser or curl to review information about the `products` table.

## 5. Compare System Latency

We can test the system latency by using Terraform and a simple `Go` program that issues multiple HTTPS requests to our Cloudflare Worker and recorded the average request latencies. A sample open-source project has been created to share scripts and Terraform code to configure this and can be accessed on [GitHub](https://github.com/pgEdge/cloudflare-pgedge-latency-tests).

Some of the environments evaluated combine regional TCP connection pooling (via Hyperdrive) with the latency-based DNS routing you get with a pgEdge database. _Latency by Location (in ms)_ improved dramatically when using Hyperdrive and pgEdge nearest node queries:

| Hyperdrive | pgEdge PostgreSQL   | Los Angeles | Salt Lake City | Dallas | Montreal | London |
| ---------- | ------------------- | ----------- | -------------- | ------ | -------- | ------ |
| `off`      | pgEdge us-east node | 530         | 549            | 331    | 248      | 604    |
| `off`      | pgEdge nearest node | 366         | 388            | 333    | 247      | 210    |
| `on`       | pgEdge us-east node | 88          | 103            | 122    | 71       | 139    |
| `on`       | pgEdge nearest node | 71          | 79             | 103    | 71       | 72     |

The fastest configuration - Hyperdrive with pgEdge's _nearest node_ - improved request latencies for end-users dramatically. Some users (for example, the user in London) experienced latencies that were cut in half (139 ms to 72 ms) when using pgEdge's nearest-node capability.

When used in conjunction with pgEdge Postgres Cloud, Hyperdrive provides a big win.

## Related Resources

- You can download the pgEdge testing scripts, Terraform code, and test setup from [GitHub](https://github.com/pgEdge/cloudflare-pgedge-latency-tests).

- You can learn more about pgEdge PostgreSQL Cloud by reviewing the [documentation](https://docs.pgedge.com/cloud).
