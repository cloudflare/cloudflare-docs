---
updated: 2021-11-15
difficulty: Beginner
content_type: "📝 Tutorial"
pcx-content-type: tutorial
---

# Query Postgres from Workers using a database connector

<TutorialsBeforeYouStart/>

## Overview

In this tutorial you learn how to retrieve data in your Cloudflare Workers applications from a PostgreSQL database using [Postgres database connector](https://github.com/cloudflare/worker-template-postgres).

<Aside type="note">

If you are using a MySQL database, refer to the [MySQL database connector](https://github.com/cloudflare/worker-template-mysql) template.

</Aside>

For a quick start, you will use Docker to run a local instance of Postgres and PgBouncer, and to securely expose the stack to the Internet using Cloudflare Tunnel.

## Basic project scaffolding

To get started:

1. Run the following `git` command to clone a basic [Postgres database connector](https://github.com/cloudflare/worker-template-postgres) project.
1. After running the `git clone` command, `cd` into the new project.

```sh
$ git clone https://github.com/cloudflare/worker-template-postgres/
$ cd worker-template-postgres
```

## Cloudflare Tunnel authentication

To create and manage secure Cloudflare Tunnels, you first need to authenticate `cloudflared` CLI. 
Skip this step if you already have authenticated `cloudflared` locally.

```sh
$ docker run -v ~/.cloudflared:/etc/cloudflared cloudflare/cloudflared:2021.11.0 login
```

Running this command will:
* Prompt you to select your Cloudflare account and hostname.
* Download credentials and allow `cloudflared` to create Tunnels and DNS records.

## Start and prepare Postgres database

### Start the Postgres server

<Aside type="warning" header="Warning">

Cloudflare Tunnel will be accessible from the Internet once you run the following `docker compose` command. Cloudflare recommends that you secure your `TUNNEL_HOSTNAME` behind [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps) before you continue.

</Aside>

You can find a prepared `docker-compose` file that does not require any changes in `scripts/postgres` with the following services: 
1. **postgres**
1. **pgbouncer** - Placed in front of Postgres to provide connection pooling.
1. **cloudflared** - Allows your applications to connect securely, through a encrypted tunnel, without opening any local ports.

Run the following commands to start all services. Replace `postgres-tunnel.example.com` with a hostname on your Cloudflare zone to route traffic through this tunnel.

```sh
$ cd scripts/postgres
$ export TUNNEL_HOSTNAME=postgres-tunnel.example.com
$ docker compose up

# Alternative: Run `docker compose up -D` to start docker-compose detached
```

`docker-compose` will spin up and configure all the services for you, including the creation of the Tunnel's DNS record. 
The DNS record will point to the Cloudflare Tunnel, which keeps a secure connection between a local instance of `cloudflared` and the Cloudflare network. 

### Import example dataset

Once Postgres is up and running, seed the database with a schema and a dataset. For this tutorial, you will use the Pagila schema and dataset. Use `docker exec` to execute a command inside the running Postgres container and import [Pagila](https://github.com/devrimgunduz/pagila) schema and dataset.

```sh
$ curl https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-schema.sql | docker exec -i postgres_postgresql_1 psql -U postgres -d postgres
$ curl https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-data.sql | docker exec -i postgres_postgresql_1 psql -U postgres -d postgres
```

The above commands will download the SQL schema and dataset files from Pagila's GitHub repository and execute them in your local Postgres database instance.

## Edit Worker and query Pagila dataset

### Database connection settings

In `src/index.ts`, replace `https://dev.example.com` with your Cloudflare Tunnel hostname, ensuring that it is prefixed with the `https://` protocol:

```javascript
---
filename: src/index.ts
highlight: [4]
---
const client = new Client({
    user: 'postgres',
    database: 'postgres',
    hostname: 'https://REPLACE_WITH_TUNNEL_HOSTNAME',
    password: '',
    port: 5432,
})
```

At this point, you can deploy your Worker and make a request to it to verify that your database connection is working.

### Query Pagila dataset

The template script includes a simple query to select a number (`SELECT 42;`) that is executed in the database. Edit the script to query the imported Pagila dataset if the `pagila-table` query parameter is present.

```javascript
// Query the database.

// Parse the URL, and get the 'pagila-table' query parameter (which may not exist)
const url = new URL(request.url)
const pagilaTable = url.searchParams.get("pagila-table")

let result
// if pagilaTable is defined, run a query on the Pagila dataset
if ([
  "actor",
  "address",
  "category",
  "city",
  "country",
  "customer",
  "film",
  "film_actor",
  "film_category",
  "inventory",
  "language",
  "payment",
  "payment_p2020_01",
  "payment_p2020_02",
  "payment_p2020_03",
  "payment_p2020_04",
  "payment_p2020_05",
  "payment_p2020_06",
  "rental",
  "staff",
  "store",
].includes(pagilaTable)) {
  result = await client.queryObject(`SELECT * FROM ${pagilaTable};`)
} else {
  const param = 42
  result = await client.queryObject(`SELECT ${param} as answer;`)
}

// Return result from database.
return new Response(JSON.stringify(result))
```

## Worker deployment

In `wrangler.toml`, enter your Cloudflare account ID in the line containing `account_id`:

<Aside type="note">

[Refer to our Quick Start guide](https://developers.cloudflare.com/workers/get-started/guide#7-configure-your-project-for-deployment) if you do not know where to find your Cloudflare Account ID.

</Aside>

```toml
---
filename: wrangler.toml
highlight: [3]
---
name = "worker-postgres-template"
type = "javascript"
account_id = ""
```

Publish your function:

```sh
$ wrangler publish
✨  Built successfully, built project size is 10 KiB.
✨  Successfully published your script to
 https://workers-postgres-template.example.workers.dev
```

### Set secrets

Create and save [a Client ID and a Client Secret](https://developers.cloudflare.com/cloudflare-one/identity/service-auth/service-tokens) to Worker secrets in case your Tunnel is protected by Cloudflare Access.

```sh
$ wrangler secret put CF_CLIENT_ID
$ wrangler secret put CF_CLIENT_SECRET
```

### Test the Worker

Request some of the Pagila tables by adding the `?pagila-table` query parameter with a table name to the URL of the Worker.

```sh
$ curl https://example.workers.dev/?pagila-table=actor
$ curl https://example.workers.dev/?pagila-table=address
$ curl https://example.workers.dev/?pagila-table=country
$ curl https://example.workers.dev/?pagila-table=language
```

## Cleanup

Run the following command to stop and remove the Docker containers and networks:

```sh
$ docker compose down

# Stop and remove containers, networks
```
