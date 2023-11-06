---
updated: 2023-10-30
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Create a serverless, globally distributed time-series API with Timescale
layout: single
---

# Create a serverless, globally distributed time-series API with Timescale


## Overview

In this tutorial you will learn to build an API on Workers which will ingest and query time-series data stored in Timescale (they make PostgreSQL faster in the cloud). Because we want to use Worker API routes for ingesting data, but we don't want to pay the high PostgreSQL connection penalty, we will be using Hyperdrive to proxy our database connection from the edge.

You will learn how to:

- Build and deploy Workers.
- Use Worker secrets with Wrangler.
- Deploy a Timescale service
- Integrate Workers, Hyperdrive and Timescale
- Query your new API

You can learn more about Timescale by visting their [documentation](https://docs.timescale.com/getting-started/latest/services/).

---

## Create a Worker project

Start by using `npm create cloudflare@latest` to create a Worker project from the command line:

```sh
---
header: Create a project
---
$ npm create cloudflare@latest
```

For setup, select the following options:
* `Where do you want to create your application?`: Input `timescale-api`
* `What type of application do you want to create?`: Select `"Hello World" Worker`.
* `Do you want to use TypeScript?`: Select `Yes`.
* `Do you want to deploy your application?`: Select `Yes`.

Make note of the URL that your application was deployed to. You will be using it when you configure your GitHub webhook.

Now move into your new project directory using the following command:

```sh
$ cd timescale-api
```

## Prepare your Timescale Service

{{<Aside type="note">}}
If you haven't signed up for Timescale then go to the [signup](https://timescale.com/signup) page and you can start a free 30 day trial with no credit card!
{{</Aside>}}

If you're creating a new service go to the [Timescale Console](https://console.cloud.timescale.com/) and follow these steps:

1. Select  **Create Service** by clicking the black plus in the upper right.
2. Choose **Time Series** as the service type 
3. Choose your desired region and instance size. 1 CPU will be enough for this tutorial.
4. Set a service name to replace the randomly generated one.
5. Select  **Create Service**.
6. On the right hand side expand the **Connection Info** dialog and copy the **Service URL**
7. Copy the password which is displayed, you will not be able to retreive this again
8. Click 'I stored my password, go to service overview'


If you are using a service you created previously you can retreive your service connection information in the [Timescale Console](https://console.cloud.timescale.com/):

1. Select the service (database) you want Hyperdrive to connect to.
2. Expand **Connection info**.
3. Copy the **Service URL**. The Service URL is the connection string that Hyperdrive will use to connect. This string includes the database hostname, port number and database name.

{{<Aside type="note">}}
If you do not have your password stored, you will need to select **Forgot your password?** and set a new **SCRAM** password. Save this password, as Timescale will only display it once.

You should ensure that you do not break any existing clients if when you reset the password.
{{</Aside>}}

Insert your password into the **Service URL** as follows (leaving the portion after the @ untouched):

```bash
postgres://tsdbadmin:YOURPASSWORD@...
```

This will be referred to as **SERVICEURL** in the following sections.

## 3. Create your Hypertable

Timescale allows you to turn regular PostgreSQL tables into [hypertables](https://docs.timescale.com/use-timescale/latest/hypertables/), which specialises them for dealing with time-series, events, or analytics data. Once you've made this change Timescale will seamlessly manage the hypertable's partitioning, as well as allow you to apply other features like compression or continuous aggregates.

Connect to your Timescale database using the Service URL you copied in the last step (it has the password embedded). 

If you're using the default PostgreSQL CLI tool **psql** ([installation instructions here](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/)) to connect you'd run it like so (substituting your own **Service URL** from the previous step). You could also connect using a graphical tool like PgAdmin.

```bash
$ psql SERVICEURL
```

Once you are connected create your table by pasting the following SQL:

```
CREATE TABLE readings(
  ts timestamptz DEFAULT now() NOT NULL,
  sensor UUID NOT NULL,
  metadata jsonb,
  value numeric NOT NULL
 );

SELECT create_hypertable('readings', 'ts');
```

That's it, Timescale will take care of the rest for you as you ingest and query data.

## 4. Create a database configuration

To create a new Hyperdrive instance you will need:

* Your **SERVICEURL** from Step 2.
* A NAME for your Hyperdrive service. We will use **hyperdrive**

{{<Aside type="note">}}
Hyperdrive is currently in public beta and is currently free to use for all Workers paid plans.
{{</Aside>}}

Hyperdrive uses the *create* command with the *--connection-string* argument to pass this information. Run it as follows:

```sh
$ wrangler hyperdrive create hyperdrive --connection-string="SERVICEURL"
```

{{<Aside type="note">}}

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](/hyperdrive/learning/troubleshooting/) to debug possible causes.

{{</Aside>}}

This command outputs your Hyperdrive ID, which you will need to paste at the bottom of your **wrangler.tom** file:

```toml
---
filename: wrangler.toml
---
# Pasted at bottom of file from the output of `wrangler hyperdrive create $NAME --connection-string=[...]` above.
[[hyperdrive]]
binding = "HYPERDRIVE"
id = "your-id-here"
```

Install the Postgres driver into your Worker project:


```sh
$ npm install pg

```

Now copy the below Worker code, and replacing the current code in `./src/index.js`.  This code does several things.

1. uses Hyperdrive to connect to Timescale using the the connection string generated from `env.HYPERDRIVE.connectionString` directly to the driver.
2. creates a `POST` route which accepts an array of JSON readings to insert into Timescale in one transaction
3. creates a `GET` route which will take limit parameter and then return the most recent readings. This could be adapted to filter by ID or by timestamp.

```ts
---
filename: src/worker.ts
---
import { Client } from 'pg';

export interface Env {
    HYPERDRIVE: any;
}

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const client = new Client({connectionString:env.HYPERDRIVE.connectionString});
        await client.connect();

        const url = new URL(request.url);
        // Create a route for inserting JSON as readings
        if (request.method === 'POST' && url.pathname === '/readings') {
            // Parse the request's JSON payload
            const productData = await request.json();

            // Write the raw query. We are using jsonb_to_recordset to expand the JSON
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

            // Collectthe raw row count inserted to return
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
};
```

## 5. Deploy your Worker

Run the following command to redeploy your Worker:
```bash
$ npx wrangler deploy  
```
Your application is now live and accessible at  `timescale-api.<YOUR_SUBDOMAIN>.workers.dev`. The exact URI will be shown in the output of the wrangler command you just ran.

After deploying, you can interact with your Timescale IoT readings database using your Cloudflare Worker. Connection from the edge will be faster because you are using CloudFlare Hyperdrive to connect from the edge.

You can now use your Cloudflare Worker to insert new rows into the  `readings`  table. To test this functionality, send a  `POST`  request to your Worker’s URL with the  `/readings`  path, along with a JSON payload containing the new product data:

```json
[
  { "sensor": "6f3e43a4-d1c1-4cb6-b928-0ac0efaf84a5", "value":0.3},
  { "sensor": "d538f9fa-f6de-46e5-9fa2-d7ee9a0f0a68", "value":10.8},
  { "sensor": "5cb674a0-460d-4c80-8113-28927f658f5f", "value":18.8},
  { "sensor": "03307bae-d5b8-42ad-8f17-1c810e0fbe63", "value":20.0},
  { "sensor": "64494acc-4aa5-413c-bd09-2e5b3ece8ad7", "value":13.1},
  { "sensor": "0a361f03-d7ec-4e61-822f-2857b52b74b3", "value":1.1},
  { "sensor": "50f91cdc-fd19-40d2-b2b0-c90db3394981", "value":10.3}
]
```

In this case we have omitted the `ts` (the timestamp) and `metadata` (the JSON blob) so they will be set to `now()` and `NULL` respectively.

Once you've tun the `POST` request you can also issue a `GET` request to your Worker’s URL with the  `/readings`  path. Set the `limit` parameter to control the amount of records you get back.

If you have **curl** installed you can test with the following commands (replace **<YOUR_SUBDOMAIN>** with your subdomain from the deploy command above):

```sh
---
header: Ingest some data
---
curl -X POST -d @- 'https://timescale-api.<YOUR_SUBDOMAIN>.workers.dev/readings' <<EOF
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
curl 'https://timescale-api.<YOUR_SUBDOMAIN>jsewell.workers.dev/readings?limit=10'
```

Congratulations, you've got a working example to ingest and query readings from the edge with Timescale, Workers, Hyperdrive and Typescript!

## Next steps

* Learn more about [How Hyperdrive Works](/hyperdrive/learning/how-hyperdrive-works/).
* Learn more about [Timescale](https://timescale.com).
* Refer to the [troubleshooting guide](/hyperdrive/learning/troubleshooting/) to debug common issues.
