---
weight: 1
title: Get started
pcx_content_type: get-started
---

# Get started

This guide will instruct you through:

* Creating your first database using D1, Cloudflare’s native serverless SQL database.
* Creating a schema and querying your database via the command-line.
* Connecting a [Cloudflare Worker](/workers/) to your D1 database to query it programmatically.

This guide assumes you already have a [Cloudflare account](/fundamentals/account-and-billing/account-setup/create-account/).

## 1. Prerequisites

You will need to install [`create cloudflare`], which will also install [wrangler](/workers/wrangler/install-and-update/), a command-line tool for building Cloudflare Workers and creating D1 databases.

* To install these tools, ensure you have [`npm`](https://docs.npmjs.com/getting-started) and [`Node.js`](https://nodejs.org/en/) installed.
* Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions.
* Wrangler requires a Node version of `16.13.0` or later.

We'll install these tools as part of creating a new project in the next step.

## 2. Create a new project

{{<Aside type="note" header="New to Workers?">}}

Refer to [How Workers works](/workers/learning/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](/workers/get-started/guide/) to setup your first Worker.

{{</Aside>}}

You will create a new Workers project as the container for both your D1 database and the Worker application that you will use to query your database.

Create a new project named `d1-tutorial` by running `npm create cloudflare` and answering the questions with the answers below:

* name = `d1-tutorial` (this will be set for us)
* type = `"Hello World" script`
* typescript = `yes`
* git = `yes`
* deploy = `no` (we'll deploy our app later)

```sh
$ npm create cloudflare d1-tutorial
```

```sh
╭ Create an application with Cloudflare Step 1 of 3
│
├ Where do you want to create your application?
│ dir d1-tutorial
│
├ What type of application do you want to create?
│ type "Hello World" script
│
├ Do you want to use TypeScript?
│ typescript yes
│
├ Copying files from "simple" template
│
├ Do you want to use git?
│ git yes
│
╰ Application created

╭ Installing dependencies Step 2 of 3
│
├ Installing dependencies
│ installed via `npm install`
│
├ Committing new files
│ git initial commit
│
╰ Dependencies Installed

╭ Deploy with Cloudflare Step 3 of 3
│
├ Do you want to deploy your application?
│ no deploying via `npm run deploy`
│
├  APPLICATION CREATED  Deploy your application with npm run deploy
│
│ Run the development server npm run start
│ Deploy your application npm run deploy
│ Read the documentation https://developers.cloudflare.com/workers
│ Stuck? Join us at https://discord.gg/cloudflaredev
│
╰ See you again soon!
```

This will create a new directory (`d1-tutorial`). Your new directory will include both simple `src/worker.js` Worker script, and a [`wrangler.toml`](/workers/wrangler/configuration/) configuration file which is how your `d1-tutorial` Worker will access your D1 database.

{{<Aside type="note" heading="Familiar with Workers?">}}

If you're familiar with Cloudflare Workers, or initializing projects in a Continuous Integration (CI) environment, you can initialize a new project non-interactively by setting `CI=true` as an environmental variable when running `create cloudflare`.

For example: `CI=true npm create cloudflare d1-tutorial --type=simple --git --ts --deploy=false` will create a basic "Hello World" project ready to build on.

{{</Aside>}}

## 3. Create a database

A D1 database is conceptually similar to many other databases: a database may contain one or more tables, the ability to query those tables, and optional indexes. D1 uses the familar [SQL query language](https://www.sqlite.org/lang.html) (as used by SQLite).

To create your first D1 database, change into the directory you just created for your Workers project:

```sh
$ cd d1-tutorial
```

Run the following `wrangler d1` command and give your database a name. A good database name is:

* Typically a combination of ASCII characters, shorter than 32 characters, and uses dashes (-) instead of spaces
* Descriptive of the use-case and environment - for example, "staging-db-web" or "production-db-backend"
* Only used for describing the database, and is not directly referenced in code.

```sh
$ wrangler d1 create <DATABASE_NAME>

✅ Successfully created DB '<DATABASE_NAME>'

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<DATABASE_NAME>"
database_id = "<unique-ID-for-your-database>"
```

This will create a new D1 database, and output the [binding](/workers/platform/bindings/) configuration needed in the next step.

## 4. Bind your Worker to your D1 database

You must create a binding for your Worker to connect to your D1 database. [Bindings](/workers/platform/bindings/) allow your Workers to access resources, like D1, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind your D1 database to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<DATABASE_NAME>"
database_id = "<unique-ID-for-your-database>"
```

Specifically:

* The value (string) you set for `<BINDING_NAME>` will be used to reference this database in your Worker. In this tutorial, we'll call it `DB` to keep it simple.
* The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_DB"` or `binding = "productionDB"` would both be valid names for the binding.
* Your binding is available in your Worker at `env.<BINDING_NAME>` and the D1 [client API](/d1/platform/client-api/) is exposed on this binding.

{{<Aside type="note">}}

When you execute the `wrangler d1 create` command, the client API package (which implements the D1 API and database class) is automatically installed. For more information on the D1 Client API, refer to [D1 Client API](/d1/platform/client-api/).

{{</Aside>}}

You can also bind your D1 database to a Pages Function. For more information, refer to [Functions Bindings](/pages/platform/functions/bindings/#d1-databases).

## 5. Run a query against your D1 database

### Configure your D1 database

With `wrangler.toml` configured properly, set up your database. You will use the following example `schema.sql` file to configure your database. Copy the following code and save it as a `schema.sql` file in the `d1-tutorial` Worker directory you created in step 2:

```sql
---
filename: schema.sql
---
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');
```

You will configure your database to run and test locally first. Bootstrap your new D1 database by running:

```sh
$ wrangler d1 execute <DATABASE_NAME> --local --file=./schema.sql
```

Then validate your data is in your database by running:

```sh
$ wrangler d1 execute <DATABASE_NAME> --local --command='SELECT * FROM Customers'
```

### Write queries within your Worker

After you have set up your database, you will run an SQL query from within your Worker.

First, go to your Worker project and open the `worker.ts` file. The `worker.ts` file is where you configure your Worker's interactions with D1.

Paste the following code snippet into your `worker.ts` file (replacing the existing code) and on the `env` parameter, replace `<BINDING_NAME>` with the binding name you set in step 4:

```typescript
---
filename: "src/worker.ts"
---
export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/beverages") {
      // If you didn't use "DB" as your binding name, change it here
      const { results } = await env.DB.prepare(
        "SELECT * FROM Customers WHERE CompanyName = ?"
      )
        .bind("Bs Beverages")
        .all();
      return Response.json(results);
    }

    return new Response(
      "Call /api/beverages to see everyone who works at Bs Beverages"
    );
  },
};
```

In the code above, we:

* Define a binding to our D1 database in our TypeScript code. This binding matches the `binding` value we set in `wrangler.toml` under `[[d1_databases]]`
* Query our database using `env.DB.prepare` to issue a [prepared query](/d1/platform/client-api/) with a placeholder (the `?` in the query).
* Call `.bind()` to safely and securely bind a value to that placeholder. In a real application, we would allow a user to define the `CompanyName` they want to list results for. Using `.bind()` prevents users from executing arbitary SQL (known as "SQL injection") against our application and deleting or otherwise modifying your database.
* Execute the query by calling `.all()` to return all rows (or none, if the query returns none)
* Return our query results, if any, in JSON format with `Response.json(results)`

After configuring your Worker, you can test your project locally before you deploy globally.

## 6. Develop locally with Wrangler

While in your project directory, test your database locally by running:

```sh
$ wrangler dev
```

When you run `wrangler dev`, Wrangler will give you a URL (most likely `localhost:8787`) to review your Worker. After you visit the URL Wrangler provides, you will see this message: `Call /api/beverages to see everyone who works at Bs Beverages`.

To test that your database is running successfully, add `/api/beverages` to the provided Wrangler URL: for example, `localhost:8787/api/beverages`. After doing this, you should see your data being displayed in the browser.

## 7. Deploy your database

Before deploying your D1 database and Worker globally, you'll need to log in with your [Cloudflare account](/fundamentals/account-and-billing/account-setup/create-account/). To log in, run the following command:

```sh
$ wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

To deploy your Worker to production, you must first repeat the [database bootstrapping](/d1/get-started/#configure-your-d1-database) steps _without_ the `--local` flag to give your Worker data to read. This will create the database tables and import the data into the production version of your database, running on Cloudflare's global network.

First, bootstrap your database with the `schema.sql` file you created in step 4:

```sh
$ wrangler d1 execute <DATABASE_NAME> --file=./schema.sql
```

Then validate the data is in production by running:

```sh
$ wrangler d1 execute <DATABASE_NAME> --command='SELECT * FROM Customers'
```

Finally, deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

```sh
$ wrangler deploy

# Outputs:
Total Upload: 0.19 KiB / gzip: 0.16 KiB
Uploaded d1-tutorial (3.18 sec)
Published d1-tutorial (6.29 sec)
  https://d1-tutorial.YOURNAMEHERE.workers.dev
Current Deployment ID: 1b680ecc-6f38-4be7-b982-063d425ef204
```

You can now visit the URL for your newly created project to query your live database!

For example, if the URL of your new Worker is `d1-tutorial.yourname.workers.dev`, accessing `https://d1-tutorial.yourname.workers.dev/api/beverages` will send a request to your Worker that queries your live database directly.

By finishing this tutorial, you have created a D1 database, a Worker to access that database and deployed your project globally!

## Next steps

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord](https://discord.gg/cloudflaredev).

- [Supported Wrangler commands for D1](/workers/wrangler/commands/#d1)
- Learn how to use the [D1 client API](/d1/platform/client-api/) within your Worker.
- Explore [community projects built on D1](/d1/platform/community-projects/).

