---
updated: 2023-04-01
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Connect to and query your Turso database using Workers
layout: single
---

# Connect to and query your Turso database using Workers

This tutorial will guide you on how to build globally distributed applications with Cloudflare Workers, and [Turso](https://chiselstrike.com/), an edge-hosted distributed database based on libSQL. By using Workers and Turso, you can create applications that are close to your end users without having to maintain or operate infrastructure in tens or hundreds of regions.

## Prerequisites

Before continuing with this tutorial, you should have:

* Successfully [created up your first Cloudflare Worker](/workers/get-started/guide/) and/or have deployed a Cloudflare Worker before.
* Installed [Wrangler](/workers/wrangler/install-and-update/), a command-line tool for building Cloudflare Workers.
* A [GitHub account](https://github.com/), required for authenticating to Turso.
* A basic familiarity with installing and using command-line interface (CLI) applications.

## Install the Turso CLI

You will need the Turso CLI to create and populate a database. Run either of the following two commands in your terminal to install the Turso CLI:

```sh
# On macOS or Linux with Homebrew
$ brew install chiselstrike/tap/turso

# Manual scripted installation
$ curl -sSfL <https://get.tur.so/install.sh> | bash
```

After you have installed the Turso CLI, verify that the CLI is in your shell path:

```sh
$ turso --version
# This should output your current Turso CLI version (your installed version may be higher):
turso version v0.51.0
```

## Create and populate a database

Before you create your first Turso database, you need to log in to the CLI using your GitHub account by running:

```sh
$ turso auth login

Waiting for authentication...
✔  Success! Logged in as <your GitHub username>
```

`turso auth login` will open a browser window and ask you to sign into your GitHub account, if you are not already logged in. The first time you do this, you will need to give the Turso application permission to use your account. Select **Approve** to grant Turso the permissions needed.

After you have authenticated, you can create a database by running `turso db create <DATABASE_NAME>`. Turso will automatically choose a location closest to you.

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

To get started with your database, create and define a schema for your first table. In this example, you will create a `example_users` table with one column: `email` (of type `text`) and then populate it with one email address.

In the shell you just opened, paste in the following SQL:

```sql
create table example_users (email text);
insert into example_users values ("foo@bar.com");
```

If the SQL statements succeeded, there will be no output. Note that the trailing semi-colons (`;`) are necessary to terminate each SQL statement.

Type `.quit` to exit the shell.

## Use Wrangler to create a Workers project

The Workers command-line interface, [Wrangler](/workers/wrangler/install-and-update/), allows you to create, locally develop, and publish your Workers projects.

To create a new Workers project (named `worker-turso-ts`), run the following:

```sh
$ npx wrangler init worker-turso-ts
```

In your terminal, you will be asked a series of questions related to your project. Choose the following options to use TypeScript to write a `fetch` handler:

```sh
✔ Would you like to use git to manage this Worker? … no
✔ No package.json found. Would you like to create one? … yes
✔ Would you like to use TypeScript? … yes
✔ Would you like to create a Worker at worker-turso-ts/src/index.ts? › Fetch handler
✔ Would you like us to write your first test with Vitest? … no
```

To start developing your Worker, `cd` into your new project directory:

```sh
$ cd worker-turso-ts
```

In your project directory, `wrangler init` has generated the following files:

* `wrangler.toml`: Your Wrangler configuration file.
* `src/index.ts`: A minimal Hello World Worker written in TypeScript
* `package.json`: A minimal Node dependencies configuration file. Only generated if indicated in `wrangler init` command.
* `tsconfig.json`: TypeScript configuration that includes Workers types. Only generated if indicated in `wrangler init` command.

For this tutorial, only the `wrangler.toml` and `src/index.ts` files are relevant. You will not need to edit the other files, and they should be left as is.

## Configure your Worker for your Turso database

The Turso client library requires two pieces of information to make a connection:

1. `LIBSQL_DB_URL` - The connection string for your Turso database.
2. `LIBSQL_DB_AUTH_TOKEN` - The authentication token for your Turos database. This should be kept a secret, and not committed to source code.

To get the URL for your database, run the following Turso CLI command, and copy the result:

```sh
$ turso db show my-db --url
# Output:
libsql://my-db-<your-github-username>.turso.io
```

Open `wrangler.toml` in your editor and at the bottom of the file, create a new `[vars]` section representing the [environment variables](/workers/platform/environment-variables/) for your project:

```toml
---
filename: wrangler.toml
---
[vars]
LIBSQL_DB_URL = "paste-your-url-here"
```

Save the changes to `wrangler.toml`.

Next, create a long-lived authentication token for your Worker to use when connecting to your database. Run the following Turso CLI command, and copy the output to your clipboard:

```sh
$ turso db tokens create my-db -e none
# Will output a long text string (an encoded JSON Web Token)
```

You will now [create a secret](/workers/platform/environment-variables/#add-secrets-to-your-project) to keep your authentication token confidential:

```sh
# Ensure you specify the secret name exactly: your Worker will need to reference it later.
$  npx wrangler secret put LIBSQL_DB_AUTH_TOKEN
-------------------------------------------------------
? Enter a secret value: › <paste your token here>
```

Select `<Enter>` on your keyboard to save the token as a secret. Both `LIBSQL_DB_URL` and `LIBSQL_DB_AUTH_TOKEN` will be available in your Worker's environment at runtime.

## Install extra libraries

Install the Turso client library and a router:

```sh
$ npm install @libsql/client itty-router
```

The `@libsql/client` library allows you to query a Turso database. The `itty-router` library is a lightweight router you will use to help handle incoming requests to the worker.

## Write your Worker

You will now write a Worker that will:

1. Handle an HTTP request.
2. Route it to a specific handler to either list all users in our database or add a new user.
3. Return the results and/or success.

Open `src/index.ts` and delete the existing template. Copy the below code exactly as is and paste it into the file:

```ts
---
filename: src/index.ts
---

import { Client as LibsqlClient, createClient } from "@libsql/client/web";
import { Router, RouterType } from "itty-router";

export interface Env {
    // The environment variable containing your the URL for your Turso database.
    LIBSQL_DB_URL?: string;
    // The Secret that contains the authentication token for your Turso database.
    LIBSQL_DB_AUTH_TOKEN?: string;

    // These objects are created before first use, then stashed here
    // for future use
    router?: RouterType;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (env.router === undefined) {
            env.router = buildRouter(env);
        }

        return env.router.handle(request);
    },
};

function buildLibsqlClient(env: Env): LibsqlClient {
    const url = env.LIBSQL_DB_URL?.trim();
    if (url === undefined) {
        throw new Error("LIBSQL_DB_URL env var is not defined");
    }

    const authToken = env.LIBSQL_DB_AUTH_TOKEN?.trim();
    if (authToken === undefined) {
        throw new Error("LIBSQL_DB_AUTH_TOKEN env var is not defined");
    }

    return createClient({ url, authToken });
}

function buildRouter(env: Env): RouterType {
    const router = Router();

    router.get("/users", async () => {
        const client = buildLibsqlClient(env);
        const rs = await client.execute("select * from example_users");
        return Response.json(rs);
    });

    router.get("/add-user", async (request) => {
        const client = buildLibsqlClient(env);
        const email = request.query.email;
        if (email === undefined) {
            return new Response("Missing email", { status: 400 });
        }
        if (typeof email !== "string") {
            return new Response("email must be a single string", { status: 400 });
        }
        if (email.length === 0) {
            return new Response("email length must be > 0", { status: 400 });
        }

        try {
            await client.execute({
                sql: "insert into example_users values (?)",
                args: [email],
            });
        } catch (e) {
            console.error(e);
            return new Response("database insert failed");
        }

        return new Response("Added");
    });

    router.all("*", () => new Response("Not Found.", { status: 404 }));

    return router;
}
```

Save your `src/index.ts` file with your changes.

Note:

* The libSQL client library import '@libsql/client/web' must be imported exactly as shown when working with Cloudflare workers. The non-web import will not work in the Workers environment.
* The `Env` interface contains the environment variable and secret you defined earlier.
* The `Env` interface also caches the libSQL client object and router, which are created on the first request to the Worker.
* The `/users` route fetches all rows from the `example_users` table you created in the Turso shell. It simply serializes the `ResultSet` object as JSON directly to the caller.
* The `/add-user` route inserts a new row using a value provided in the query string.

With your environment configured and your code ready, you will now test your Worker locally before you deploy.

## Run the Worker locally with Wrangler

To run a local instance of our Worker (entirely on your machine), run the following command:

```sh
$ npx wrangler dev --local
```

You should be able to review output similar to the following:

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

Connect to it and validate your Worker returns the email address you inserted when you created your `example_users` table by visiting the `/users` route in your browser: [http://127.0.0.1:8787/users](http://127.0.0.1:8787/users).

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

Test the `/add-users` route and pass it an email address to insert: [http://127.0.0.1:8787/add-user?email=test@test.com](http://127.0.0.1:8787/add-user?email=test@test.com.)

You should see the text `“Added”`. If you load the first URL with the `/users` route again ([http://127.0.0.1:8787/users](http://127.0.0.1:8787/users)), it will show the newly added row. You can repeat this as many times as you like. Note that due to its design, your application will not stop you from adding duplicate email addresses.

Quit Wrangler by typing `q` into the shell where it was started.

## Publish to Cloudflare

After you have validated that your Worker can connect to your Turso database, publish your Worker. Run the following Wrangler command to publish our Worker publicly:

```sh
$ npx wrangler publish
```

The first time you run this command, it will launch a browser, ask you to sign in with your Cloudflare account, and grant permissions to Wrangler.

The `publish` command will output the following:

```sh
Your worker has access to the following bindings:
- Vars:
  - LIBSQL_DB_URL: "your-url"
...
Published worker-turso-ts (0.19 sec)
  https://worker-turso-ts.<your-Workers-subdomain>.workers.dev
Current Deployment ID: f9e6b48f-5aac-40bd-8f44-8a40be2212ff
```

You have now published a Worker that can connect to your Turso database, query it, and insert new data.

## Optional: Clean up

To clean up the resources you created as part of this tutorial:

* If you do not want to keep this Worker, run `wrangler delete worker-turso-ts` to delete the published Worker.
* You can also delete your Turso database via `turso db destroy my-db`.

## Related resources

* Find the [complete project source code on GitHub](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-turso-ts/).
* Understand how to [debug your Cloudflare Worker](/workers/learning/debugging-workers/).
* Join the [Cloudflare Developer Discord](https://discord.gg/rrZXVVcKQF).
* Join the [ChiselStrike (Turso) Discord](https://discord.com/invite/4B5D7hYwub).