---
updated: 2021-11-15
difficulty: Beginner
content_type: "📝 Tutorial"
pcx-content-type: tutorial
---

# Query Postgres from Workers using a database connector

<TutorialsBeforeYouStart/>

## Overview

In this tutorial you learn how to retrieve data in your Cloudflare Workers applications from a Postgres database using [postgres database connector](https://github.com/cloudflare/worker-template-postgres).

For a quick start, you will use docker to run a local instance of Postgres, PgBouncer and securely expose the stack to the internet using Cloudflare Tunnel.

## Basic project scaffolding

To get started:
1. Run the following `wrangler` command to generate a basic postgres database-connector project using the [worker-template-postgres](https://github.com/cloudflare/worker-template-postgres). 
2. After running the `wrangler generate` command, `cd` into the new project.
3. Use the current state of the git repository as the initial commit by running the `git add` and `git commit` commands in your terminal.

```sh
$ wrangler generate workers-postgres https://github.com/cloudflare/worker-template-postgres
$ cd workers-postgres
```

## Cloudflare Tunnel authentication

To create and manage secure Cloudflare Tunnels, you first need to authenticate `cloudflared` CLI. 
Skip this step if you have cloudflared authenticated locally already.

```sh
$ docker run -v ~/.cloudflared:/etc/cloudflared cloudflare/cloudflared:2021.11.0 login
```

You will be prompted to select Cloudflare account and zone, which download credentials and allow `cloudflared` to create Tunnels and DNS records.

## Start and prepare postgres database

### Start postgres server

<Aside type="warning" header="Warning">

Cloudflare Tunnel will be accessible from the internet once you run the following `docker compose` command. We highly recommend [putting Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps) in front of your `TUNNEL_HOSTNAME` before you continue. 

</Aside>

You can find prepared docker-compose file _(no changes required)_ in `scripts/postgres` with a following services: 
1. **postgres**
2. **pgbouncer** _(in front of postgres to provide connection pooling)_
3. **cloudflared** _(to enable your applications to securely connect, through a encrypted tunnel, without opening any ports up locally)_

Run following commands to start all services, replace `postgres-tunnel.example.com` with a hostname on your Cloudflare zone to route traffic through this tunnel.

```sh
$ cd scripts/postgres
$ export TUNNEL_HOSTNAME=postgres-tunnel.example.com
$ docker compose up

# run `docker compose up -D` to start docker compose detached
```

Docker compose will spin up and configure all the services for you, including creation of the Tunnel's DNS record. 
DNS record is pointed to the Cloudflare Tunnel, which keeps secure connection between a local instance of `cloudflared` and the Cloudflare network. 

### Import example dataset

Once postgres is up and running, seed the database with a schema and dataset. For this tutorial, you will use the Pagila schema and dataset. Use the `docker exec` command to execute into the running postgres container and import [Pagila](https://github.com/devrimgunduz/pagila) schema and dataset.

```sh
$ curl https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-schema.sql | docker exec -i postgres_postgresql_1 psql -U postgres -d postgres
$ curl https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-data.sql | docker exec -i postgres_postgresql_1 psql -U postgres -d postgres
```

Commands above are downloading SQL schema and data to import from Pagila GitHub repository and executing it in your local postgres database instance.

## Edit Worker and query Pagila dataset

### Database connection settings
In `src/index.ts`, replace `https://dev.example.com` with your Cloudflare Tunnel hostname, and Make sure its prefixed by `https://` protocol:

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

The template script comes with a simple query to select a number (`SELECT 42;`). The `SELECT` query is executed on the database, at this point you can deploy your Worker and make a request against it to verify your database connection is working.

### Query Pagila dataset

Edit the script to query imported Pagila dataset if `pagila-table` query parameter is present.

```javascript
// Query the database.

// Parse the URL, and get 'pagila-table' parameter
const url = new URL(request.url)
const pagilaTable = url.searchParams.get("pagila-table")

let result
// if pagilaTable is defined, query from Pagila dataset
if (pagilaTable) {
  result = await client.queryObject(`SELECT * FROM ${pagilaTable};`)
} else {
  const param = 42
  result = await client.queryObject(`SELECT ${param} as answer;`)
}

// Return result from database.
return new Response(JSON.stringify(result))
```

## Worker deployment

In `wrangler.toml`, add your Cloudflare account ID:

<Aside>

[Check out our Quick Start guide](https://developers.cloudflare.com/workers/get-started/guide#7-configure-your-project-for-deployment) if you're unsure where to find your Cloudflare Account ID.

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
 https://workers-postgres.example.workers.dev
```

### Set secrets

Create and save [Client ID and Client Secret](https://developers.cloudflare.com/cloudflare-one/identity/service-auth/service-tokens) to Worker secrets in case your Tunnel is protected by Cloudflare Access.

```sh
$ wrangler secret put CF_CLIENT_ID
$ wrangler secret put CF_CLIENT_SECRET
```

### Test Worker

Request some of the Pagila tables by adding `?pagila-table` query parameter to the URL of the Worker.

```sh
$ curl https://example.workers.dev/?pagila-table=actor
$ curl https://example.workers.dev/?pagila-table=address
$ curl https://example.workers.dev/?pagila-table=country
$ curl https://example.workers.dev/?pagila-table=language
```

## Cleanup

```sh
$ docker compose down

# Stop and remove containers, networks
```
