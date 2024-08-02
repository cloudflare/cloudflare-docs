---
updated: 2023-10-30
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Create a serverless, globally distributed time-series API with Timescale
products: [Workers]
tags: [PostgreSQL]
---

# Create a serverless, globally distributed time-series API with Timescale

{{<tutorial-date-info>}}

In this tutorial, you will learn to build an API on Workers which will ingest and query time-series data stored in [Timescale](https://www.timescale.com/) (they make PostgreSQL faster in the cloud).

You will create and deploy a Worker function that exposes API routes for ingesting data, and use [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) to proxy your database connection from the edge and maintain a connection pool to prevent us having to make a new database connection on every request.

You will learn how to:

- Build and deploy a Cloudflare Worker.
- Use Worker secrets with the Wrangler CLI.
- Deploy a Timescale database service.
- Connect your Worker to your Timescale database service with Hyperdrive.
- Query your new API.

You can learn more about Timescale by reading their [documentation](https://docs.timescale.com/getting-started/latest/services/).

---

## 1. Create a Worker project

Run the following command to create a Worker project from the command line:

{{<render file="_c3-run-command-with-directory.md" productFolder="workers" withParameters="timescale-api">}}

{{<render file="_c3-post-run-steps.md" productFolder="workers" withParameters="Hello World example;;Hello World Worker;;TypeScript">}}

Make note of the URL that your application was deployed to. You will be using it when you configure your GitHub webhook.

Change into the directory you just created for your Worker project:

```sh
$ cd timescale-api
```

## 2. Prepare your Timescale Service

{{<Aside type="note">}}
If you have not signed up for Timescale, go to the [signup page](https://timescale.com/signup) where you can start a free 30 day trial with no credit card.
{{</Aside>}}

If you are creating a new service, go to the [Timescale Console](https://console.cloud.timescale.com/) and follow these steps:

1. Select **Create Service** by selecting the black plus in the upper right.
2. Choose **Time Series** as the service type.
3. Choose your desired region and instance size. 1 CPU will be enough for this tutorial.
4. Set a service name to replace the randomly generated one.
5. Select **Create Service**.
6. On the right hand side, expand the **Connection Info** dialog and copy the **Service URL**.
7. Copy the password which is displayed. You will not be able to retrieve this again.
8. Select **I stored my password, go to service overview**.

If you are using a service you created previously, you can retrieve your service connection information in the [Timescale Console](https://console.cloud.timescale.com/):

1. Select the service (database) you want Hyperdrive to connect to.
2. Expand **Connection info**.
3. Copy the **Service URL**. The Service URL is the connection string that Hyperdrive will use to connect. This string includes the database hostname, port number and database name.

{{<Aside type="note">}}
If you do not have your password stored, you will need to select **Forgot your password?** and set a new **SCRAM** password. Save this password, as Timescale will only display it once.

You should ensure that you do not break any existing clients if when you reset the password.
{{</Aside>}}

Insert your password into the **Service URL** as follows (leaving the portion after the @ untouched):

```txt
postgres://tsdbadmin:YOURPASSWORD@...
```

This will be referred to as **SERVICEURL** in the following sections.

## 3. Create your Hypertable

Timescale allows you to convert regular PostgreSQL tables into [hypertables](https://docs.timescale.com/use-timescale/latest/hypertables/), tables used to deal with time-series, events, or analytics data. Once you have made this change, Timescale will seamlessly manage the hypertable's partitioning, as well as allow you to apply other features like compression or continuous aggregates.

Connect to your Timescale database using the Service URL you copied in the last step (it has the password embedded).

If you are using the default PostgreSQL CLI tool [**psql**](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/) to connect, you would run psql like below (substituting your **Service URL** from the previous step). You could also connect using a graphical tool like [PgAdmin](https://www.pgadmin.org/).

```sh
$ psql <SERVICEURL>
```

Once you are connected, create your table by pasting the following SQL:

```sql
CREATE TABLE readings(
  ts timestamptz DEFAULT now() NOT NULL,
  sensor UUID NOT NULL,
  metadata jsonb,
  value numeric NOT NULL
 );

SELECT create_hypertable('readings', 'ts');
```

Timescale will manage the rest for you as you ingest and query data.

## 4. Create a database configuration

To create a new Hyperdrive instance you will need:

- Your **SERVICEURL** from [step 2](/hyperdrive/tutorials/serverless-timeseries-api-with-timescale/#2-prepare-your-timescale-service).
- A name for your Hyperdrive service. For this tutorial, you will use **hyperdrive**.

Hyperdrive uses the `create` command with the `--connection-string` argument to pass this information. Run it as follows:

```sh
$ npx wrangler hyperdrive create hyperdrive --connection-string="SERVICEURL"
```

{{<Aside type="note">}}

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](/hyperdrive/observability/troubleshooting/) to debug possible causes.

{{</Aside>}}

This command outputs your Hyperdrive ID. You can now bind your Hyperdrive configuration to your Worker in your `wrangler.toml` configuration by replacing the content with the following:

```toml
---
filename: wrangler.toml
---
name = "timescale-api"
main = "src/index.ts"
compatibility_date = "2023-10-30"

node_compat = true

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "your-id-here"
```

Install the Postgres driver into your Worker project:

```sh
$ npm install pg

```

Now copy the below Worker code, and replace the current code in `./src/index.ts`. The code below:

1. Uses Hyperdrive to connect to Timescale using the connection string generated from `env.HYPERDRIVE.connectionString` directly to the driver.
2. Creates a `POST` route which accepts an array of JSON readings to insert into Timescale in one transaction.
3. Creates a `GET` route which takes a `limit` parameter and returns the most recent readings. This could be adapted to filter by ID or by timestamp.

```ts
---
filename: src/index.ts
---
import { Client } from 'pg';

export interface Env {
    HYPERDRIVE: Hyperdrive;
}

export default {
    async fetch(
        request,
        env,
        ctx
    ): Promise<Response> {
        const client = new Client({connectionString:env.HYPERDRIVE.connectionString});
        await client.connect();

        const url = new URL(request.url);
        // Create a route for inserting JSON as readings
        if (request.method === 'POST' && url.pathname === '/readings') {
            // Parse the request's JSON payload
            const productData = await request.json();

            // Write the raw query. You are using jsonb_to_recordset to expand the JSON
            // to PG INSERT format to insert all items at once, and using coalesce to
            // insert with the current timestamp if no ts field exists
            const insertQuery = `
      INSERT INTO readings (ts, sensor, metadata, value)
      SELECT coalesce(ts, now()), sensor, metadata, value FROM jsonb_to_recordset($1::jsonb)
      AS t(ts timestamptz, sensor UUID, metadata jsonb, value numeric)
  `;

            const insertResult = await client.query(insertQuery, [
                JSON.stringify(productData)
            ]);

            // Collect the raw row count inserted to return
            const resp = new Response(JSON.stringify(insertResult.rowCount), {
                headers: { 'Content-Type': 'application/json' }
            });

            ctx.waitUntil(client.end());
            return resp;

	    // Create a route for querying within a time-frame
        } else if (request.method === 'GET' && url.pathname === '/readings') {
            const limit = url.searchParams.get('limit');

            // Query the readings table using the limit param passed
            const result = await client.query(
                'SELECT * FROM readings ORDER BY ts DESC LIMIT $1',
                [limit]
            );

            // Return the result as JSON
            const resp = new Response(JSON.stringify(result.rows), {
                headers: { 'Content-Type': 'application/json' }
            });

            ctx.waitUntil(client.end());
            return resp;
        }
    }
} satisfies ExportedHandler<Env>;
```

## 5. Deploy your Worker

Run the following command to redeploy your Worker:

```sh
$ npx wrangler deploy
```

Your application is now live and accessible at `timescale-api.<YOUR_SUBDOMAIN>.workers.dev`. The exact URI will be shown in the output of the wrangler command you just ran.

After deploying, you can interact with your Timescale IoT readings database using your Cloudflare Worker. Connection from the edge will be faster because you are using Cloudflare Hyperdrive to connect from the edge.

You can now use your Cloudflare Worker to insert new rows into the `readings` table. To test this functionality, send a `POST` request to your Worker’s URL with the `/readings` path, along with a JSON payload containing the new product data:

```json
[
  { "sensor": "6f3e43a4-d1c1-4cb6-b928-0ac0efaf84a5", "value": 0.3 },
  { "sensor": "d538f9fa-f6de-46e5-9fa2-d7ee9a0f0a68", "value": 10.8 },
  { "sensor": "5cb674a0-460d-4c80-8113-28927f658f5f", "value": 18.8 },
  { "sensor": "03307bae-d5b8-42ad-8f17-1c810e0fbe63", "value": 20.0 },
  { "sensor": "64494acc-4aa5-413c-bd09-2e5b3ece8ad7", "value": 13.1 },
  { "sensor": "0a361f03-d7ec-4e61-822f-2857b52b74b3", "value": 1.1 },
  { "sensor": "50f91cdc-fd19-40d2-b2b0-c90db3394981", "value": 10.3 }
]
```

This tutorial omits the `ts` (the timestamp) and `metadata` (the JSON blob) so they will be set to `now()` and `NULL` respectively.

Once you have sent the `POST` request you can also issue a `GET` request to your Worker’s URL with the `/readings` path. Set the `limit` parameter to control the amount of returned records.

If you have **curl** installed you can test with the following commands (replace `<YOUR_SUBDOMAIN>` with your subdomain from the deploy command above):

```bash
---
header: Ingest some data
---
curl --request POST --data @- 'https://timescale-api.<YOUR_SUBDOMAIN>.workers.dev/readings' <<EOF
[
  { "sensor": "6f3e43a4-d1c1-4cb6-b928-0ac0efaf84a5", "value":0.3},
  { "sensor": "d538f9fa-f6de-46e5-9fa2-d7ee9a0f0a68", "value":10.8},
  { "sensor": "5cb674a0-460d-4c80-8113-28927f658f5f", "value":18.8},
  { "sensor": "03307bae-d5b8-42ad-8f17-1c810e0fbe63", "value":20.0},
  { "sensor": "64494acc-4aa5-413c-bd09-2e5b3ece8ad7", "value":13.1},
  { "sensor": "0a361f03-d7ec-4e61-822f-2857b52b74b3", "value":1.1},
  { "sensor": "50f91cdc-fd19-40d2-b2b0-c90db3394981", "metadata": {"color": "blue" }, "value":10.3}
]
EOF
```

```sh
---
header: Query some data
---
$ curl "https://timescale-api.<YOUR_SUBDOMAIN>.workers.dev/readings?limit=10"
```

In this tutorial, you have learned how to create a working example to ingest and query readings from the edge with Timescale, Workers, Hyperdrive, and TypeScript.

## Next steps

- Learn more about [How Hyperdrive Works](/hyperdrive/configuration/how-hyperdrive-works/).
- Learn more about [Timescale](https://timescale.com).
- Refer to the [troubleshooting guide](/hyperdrive/observability/troubleshooting/) to debug common issues.
