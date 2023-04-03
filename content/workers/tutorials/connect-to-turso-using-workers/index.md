---
updated: 2023-04-01
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Connect to and query your Turso database using Workers
layout: single
---

# Connect to and query your Turso database using Workers

## Overview

This tutorial will show you how to combine Cloudflare Workers, a serverless platform that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure, and [Turso](https://chiselstrike.com/), an edge-hosted distributed database based on libSQL.

With both Workers & Turso, you can build globally distributed applications that are close to your users without having to maintain or operate infrastructure in tens or hundreds of regions.

## Prerequisites

Before you step through this tutorial, you should have:

* Successfully stepped through [setting up your first Cloudflare Worker](/workers/get-started/guide/) and/or have deployed a Cloudflare Worker before.
* Installed [Wrangler](/workers/wrangler/install-and-update/), a command-line tool for building Cloudflare Workers. 
* A [GitHub account](https://github.com/), required for authenticating to Turso.
* A basic familiarity with installing and using command-line interface (CLI) applications

## Install the Turso CLI

You will need the Turso CLI to create and populate a database. There are two ways to install it:

```sh
# On macOS or Linux with Homebrew
$ brew install chiselstrike/tap/turso

# Manual scripted installation
$ curl -sSfL <https://get.tur.so/install.sh> | bash
```

Once you've installed the Turso CLI, verify that the CLI is in your shell path:

```sh
$ turso --version
# This should output your current Turso CLI version (your installed version may be higher):
turso version v0.51.0
```

## Create and populate a database

Before we create our first Turso database, you need to log in to the CLI using your GitHub account.

```sh
$ turso auth login

Waiting for authentication...
✔  Success! Logged in as <your GitHub username>
```
This will open a browser window and ask you to sign into your GitHub account, if you are not already logged in. The first time you do this, you will need to give the Turso app permission to use your account. Click **Approve** to grant Turso the permissions needed.

Once you've authenticated, you can create a database. Turso will automatically choose a location closest to you.

```sh
$ turso db create my-db
# Example:
[===>                ]
Creating database my-db in Los Angeles, California (US) (lax)
# Once succeeded:
Created database my-db in Los Angeles, California (US) (lax) in 34 seconds.
```

With your first database created, you can now connect to it directly and execute SQL against it:

```sh
$ turso db shell my-db
```

In order to get started, we need to create and define a schema for our first table. In this example, we'll create a very simple `example_users` table with one column: `email` (of type `text`) and then populate it with one email address.

In the shell you just opened, past in the following SQL:

```sql
create table example_users (email text);
insert into example_users values ("foo@bar.com");
```

If the SQL statements succeeded, there will be no output. Note that the trailing semi-colons (`;`) are necessary to terminate each SQL statement.

Type `.quit` to exit the shell.

## Use Wrangler to create a Workers project

{{<Aside type="note">}}

Ensure you have [Wrangler installed](/workers/wrangler/install-and-update/) before you continue.

{{</Aside>}}

The Workers command-line interface, [Wrangler](/workers/wrangler/install-and-update/), allows you to create, locally develop, and publish your Workers projects.

To create a new Workers project (named worker-turso-ts), run the following:

```sh
$ npx wrangler init worker-turso-ts
```

In your terminal, you will be asked a series of questions related to your project.  Choose the following options to use TypeScript to write a `fetch` handler:

```sh
✔ Would you like to use git to manage this Worker? … no
✔ No package.json found. Would you like to create one? … yes
✔ Would you like to use TypeScript? … yes
✔ Would you like to create a Worker at worker-turso-ts/src/index.ts? › Fetch handler
✔ Would you like us to write your first test with Vitest? … no
```

To start developing your Worker, cd into your new project directory:

```sh
$ cd worker-turso-ts
```

In your project directory, wrangler init has generated the following files:

* `wrangler.toml`: Your Wrangler configuration file.
* `src/index.ts`: A minimal Hello World Worker written in TypeScript
* `package.json`: A minimal Node dependencies configuration file. Only generated if indicated in wrangler init command.
* `tsconfig.json`: TypeScript configuration that includes Workers types. Only generated if indicated in wrangler init command.

For this tutorial, only the `wrangler.toml` and `src/index.ts` files are relevant. We won't need to edit the other files, and they should be left as-is.

## Configure your Worker for your Turso database

The Turso client library requires two pieces of information to make a connection.

* `LIBSQL_DB_URL` - the connection string for your Turso database.
* `LIBSQL_DB_AUTH_TOKEN` - the authentication token for your Turos database. This should be kept a secret, and not committed to source code.

To get the URL for your database, run the following Turso CLI command, and copy the result:

```sh
$ turso db show my-db --url
# Output:
libsql://my-db-<your-github-username>.turso.io
```

Open `wrangler.toml` in your editor and at the bottom of the file, create a new `[vars]` section representing the [environmental variables](/workers/platform/environment-variables/) for your project:

```sh
---
filename: wrangler.toml
---
[vars]
LIBSQL_DB_URL = "paste-your-url-here"
```

Save the changes to `wrangler.toml`.

Next, we'll create a long-lived authentication token for our Worker to use when connecting to our database. Run the following Turso CLI command, and copy the output to your clipboard:

```sh
$ turso db tokens create my-db -e none
# Will output a long text string (an encoded JSON Web Token)
```

We'll now create a [Secret](/workers/platform/environment-variables/#add-secrets-to-your-project) to keep our authentication token, well, secret:

```sh
# Ensure you specify the secret name exactly: your Worker will need to reference it later.
➜  wrangler secret put LIBSQL_DB_AUTH_TOKEN
-------------------------------------------------------
? Enter a secret value: › <paste your token here>
```

Press <Enter> to save the token as a secret. Both `LIBSQL_DB_URL` and `LIBSQL_DB_AUTH_TOKEN` will be available in our Worker's environment at runtime.

## Install extra libraries

Install the Turso client library and a router:

```sh
$ npm install @libsql/client itty-router
```

The `@libsql/client` library allows you to query a Turso database. The `itty-router` library is a lightweight router we will use to help handle incoming requests to the worker.

## Write your Worker

Let's write our Worker. Our Worker will:

1. Handle a HTTP request
2. Route it to a specific handler to either list all users in our database or add a new user
3. Return the results and/or success

Open `src/index.ts` and delete the existing template. Copy the below code (exactly) and paste it into the file:

```ts
---
filename: src/index.ts
---

import { Client as LibsqlClient, createClient } from '@libsql/client/web';
import { Router, RouterType } from 'itty-router';

export interface Env {
    // The following two variables come from the worker environment
    LIBSQL_DB_URL?: string;
    LIBSQL_DB_AUTH_TOKEN?: string;

    // These objects are created before first use, then stashed here
    client?: LibsqlClient;
    router?: RouterType;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (env.router === undefined) {
            env.client = buildLibsqlClient(env);
            env.router = buildRouter(env);
        }

        return env.router.handle(request);
    },
};

function buildLibsqlClient(env: Env): LibsqlClient {
    const url = env.LIBSQL_DB_URL.trim();
    if (url === undefined) {
        throw new Error('LIBSQL_DB_URL env var is not defined')
    }

    const authToken = env.LIBSQL_DB_AUTH_TOKEN.trim();
    if (authToken === undefined) {
        throw new Error('LIBSQL_DB_AUTH_TOKEN env var is not defined')
    }

	return createClient({url, authToken});
}

function buildRouter(env: Env): RouterType {
    const client = env.client!;

    const router = Router();

    router.get('/users', async request => {
        const rs = await client.execute('select * from example_users');
        return new Response(
            JSON.stringify(rs),
            { headers: { 'Content-Type': 'application/json' } }
        );
    });

    router.get('/add-user', async request => {
        const email = request.query.email
        if (email === undefined) {
            return new Response('Missing email', { status: 400 });
        }
        if (typeof email !== 'string') {
            return new Response('email must be a single string', { status: 400 });
        }
        if (email.length === 0) {
            return new Response('email length must be > 0', { status: 400 });
        }

        try {
            await client.execute({
                sql: 'insert into example_users values (?)',
                args: [ email ]
            });
        } catch (e) {
            console.error(e);
            return new Response('database insert failed');
        }

        return new Response('Added');
    });

    router.all('*', () => new Response('Not Found.', { status: 404 }));

    return router;
}
```

Save the file with your changes.

Note:

* The libSQL client library import '@libsql/client/web' must be imported exactly as shown when working with Cloudflare workers. The non-web import will not work in the Workers environment.
* The Env interface contains the environment variable and secret we defined earlier.
* The Env interface also caches the libSQL client object and router, which are created on the first request to the worker.
* The `/users` route fetches all rows from the example_users table you created in the Turso shell. It simply serializes the ResultSet object as JSON directly to the caller.
* The `/add-user` route inserts a new row using a value provided in the query string.

With our environment configured and our code ready, let's move on to testing locally before we deploy.

## Run the Worker locally with Wrangler

To run a local instance of our Worker (entirely on your machine), run the following command:

```sh
$ wrangler dev --local
```

You should see output similar to the following:

```sh
Your worker has access to the following bindings:
- Vars:
  - LIBSQL_DB_URL: "your-url"
⎔ Starting a local server...
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ [b] open a browser, [d] open Devtools, [l] turn off local mode, [c] clear console, [x] to exit                                                                  	│
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
Debugger listening on ws://127.0.0.1:61918/1064babd-bc9d-4bed-b171-b35dab3b7680
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
[mf:inf] Worker reloaded! (40.25KiB)
[mf:inf] Listening on 0.0.0.0:8787
[mf:inf] - http://127.0.0.1:8787
[mf:inf] - http://192.168.1.136:8787
[mf:inf] Updated `Request.cf` object cache!
```

The localhost address — the one with `127.0.0.1` in it — is a web-server running locally on your machine.

Let's connect to it and validate our Worker returns the email address we inserted back when we first created our `example_users` table by visiting the `/users` route in your browser: [http://127.0.0.1:8787/users](http://127.0.0.1:8787/users) 

You should see JSON similar to the following containing the data from the `example_users` table:

```json
{"columns":["email"],"rows":[{"email":"foo@bar.com"}],"rowsAffected":0}
```

{{<Aside type="warning">}}
If you see an error instead of a list of users, double check that:

* You have entered the correct value for your `LIBSQL_DB_URL` in `wrangler.toml`.
* You have set a secret called `LIBSQL_DB_AUTH_TOKEN` with your database authentication token.

Both of these need to be present and match the variable names in your Worker's code.
{{</Aside>}}

Let's now test the `/add-users` route and pass it an email address to insert: [http://127.0.0.1:8787/add-user?email=test@test.com](http://127.0.0.1:8787/add-user?email=test@test.com.)

You should see the text “Added”. If you load the first URL with the /users route again ([http://127.0.0.1:8787/users](http://127.0.0.1:8787/users)), it will show the newly added row. You can repeat this as many times as you like: note that our application is very simple and won't stop you from adding duplicate email addresses.

Quit wrangler by typing `q` into the shell where it was started.

## Publish to Cloudflare

Now that we've validated our Worker can connect to our Turso database, let's publish it. Run the following Wrangler command to publish our Worker publicly:

```sh
$ npx wrangler publish
```

The first time you run this command, it will launch a browser, ask you to sign in with your Cloudflare account, and grant permissions to Wrangler.

The `publish` command will output some 

```sh
Your worker has access to the following bindings:
- Vars:
  - LIBSQL_DB_URL: "your-url"
...
Published worker-turso-ts (0.19 sec)
  https://worker-turso-ts.<your-Workers-subdomain>.workers.dev
Current Deployment ID: f9e6b48f-5aac-40bd-8f44-8a40be2212ff
```

Congratulations! You've now published a Worker that can connect to your Turso database, query it, and insert new data.

## Optional: Clean up

To clean up the resources we created as part of this tutorial:

* If you don't want to keep this Worker, run `wrangler delete worker-turso-ts` to delete the published Worker.
* You can also delete your Turso database via `turso db destroy my-db`.

## Next Steps

* Find the [complete project source code on GitHub](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-turso-ts/)
* Understand how to [debug your Cloudflare Worker](/workers/learning/debugging-workers/)
* Join the Cloudflare Developer Discord: https://discord.gg/rrZXVVcKQF 
* Join the ChiselStrike (Turso) Discord: https://discord.com/invite/4B5D7hYwub