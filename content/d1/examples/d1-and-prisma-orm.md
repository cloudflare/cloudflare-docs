---
type: example
summary: Learn how to query D1 using Prisma ORM from a Cloudflare Worker.
tags:
  - Prisma ORM
  - D1
pcx_content_type: configuration
title: Query D1 using Prisma ORM
weight: 3
layout: example
---

## What is Prisma ORM?

[Prisma ORM](https://www.prisma.io/orm) is a next-generation JavaScript and TypeScript ORM that unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety and auto-completion.

To learn more about Prisma ORM, refer to the [Prisma documentation](https://www.prisma.io/docs).

## Query D1 from a Cloudflare Worker using Prisma ORM

This example shows you how to set up and deploy a Cloudflare Worker that is accessing a D1 database from scratch.

### Prerequisites

- [`Node.js`](https://nodejs.org/en/) and [`npm`](https://docs.npmjs.com/getting-started) installed on your machine.
- A [Cloudflare account](https://dash.cloudflare.com).

### 1. Create a Cloudflare Worker

Open your terminal, and run the following command to create a Cloudflare Worker using Cloudflare's [`hello-world`](https://github.com/cloudflare/workers-sdk/tree/4fdd8987772d914cf50725e9fa8cb91a82a6870d/packages/create-cloudflare/templates/hello-world) template:

```
$ npm create cloudflare@latest prisma-d1-example -- --type hello-world
```

In your terminal, you will be asked a series of questions related your project:
1. Answer `yes` to using TypeScript.
2. Answer `yes` to deploying your Worker.

Once you deploy your Worker, you should be able to preview your Worker at `https://prisma-d1-example.USERNAME.workers.dev`, which returns "Hello World" in the browser.

### 2. Initialize Prisma ORM


To set up Prisma ORM, go into your project directory, and install the Prisma CLI:

```sh
$ cd prisma-d1-example
$ npm install prisma --save-dev
```

Next, install the Prisma Client package and the driver adapter for D1:

```sh
$ npm install @prisma/client
$ npm install @prisma/adapter-d1
```

Finally, bootstrap the files required by Prisma ORM using the following command:

```sh
$ npx prisma init --datasource-provider sqlite
```

The command above:

1. Creates a new directory called `prisma` that contains your [Prisma schema](https://www.prisma.io/docs/orm/prisma-schema/overview) file.
2. Creates a `.env` file used to configure environment variables that will be read by the Prisma CLI.

In this tutorial, you will not need the `.env` file since the connection between Prisma ORM and D1 will happen through a [binding](/workers/configuration/bindings/). The next steps will instruct you through setting up this binding.

Since you'll use the [driver adapter](https://www.prisma.io/docs/orm/overview/databases/database-drivers#driver-adapters) feature which is currently in Preview, you need to explicitly enable it via  the `previewFeatures` field on the `generator` block.

Open your `schema.prisma` file and adjust the `generator` block to reflect as follows:

```diff
---
filename: prisma/schema.prisma
---
generator client {
  provider        = "prisma-client-js"
+	previewFeatures = ["driverAdapters"]
}
```

### 3. Create D1 database

In this step, you will set up your D1 database. You can create a D1 database via the Cloudflare Dashboard UI, or via the `wrangler` CLI. This tutorial will use the `wrangler` CLI.

Open your terminal and run the following command:

```sh
$ npx wrangler d1 create prisma-demo-db
```

You should receive the following output on your terminal:

```
✅ Successfully created DB 'prisma-demo-db' in region EEUR
Created your database using D1's new storage backend. The new storage backend is not yet recommended for production workloads, but backs up your data via
point-in-time restore.

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "prisma-demo-db"
database_id = "__YOUR_D1_DATABASE_ID__"
```

You now have a D1 database in your Cloudflare account with a binding to your Cloudflare Worker.

Copy the last part of the command output and paste it into your `wrangler.toml` file. It should look similar to this:

```toml
---
filename: wrangler.toml
---
name = "prisma-d1-example"
main = "src/index.ts"
compatibility_date = "2024-03-20"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "prisma-demo-db"
database_id = "__YOUR_D1_DATABASE_ID__"
```

`__YOUR_D1_DATABASE_ID__` should be replaced with the database ID of your D1 instance. If you were not able to fetch this ID from the terminal output, you can also find it in the [Cloudflare Dashboard](https://dash.cloudflare.com/), or by running `npx wrangler d1 info prisma-demo-db` in your terminal.

Next, you will create a database table in the database to send queries to D1 using Prisma ORM.

### 4. Create a table in the database

[Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/overview) does not support D1 yet, so you cannot follow the default migration workflows using `prisma migrate dev` or `prisma db push`.

However, D1 comes with its own [migration system](/d1/reference/migrations) and the Prisma CLI provides tools that still allow you to generate SQL statements for schema changes. In the following, you'll use both D1's migration system and the Prisma CLI to create and run a migration against your database.

First, create a new migration using the `wrangler` CLI:

```
npx wrangler d1 migrations create prisma-demo-db create_user_table
```

When prompted if the command can create a new folder called `migrations`, hit **Enter** to confirm.

The command has now created a new directory called `migrations` and an empty file called `0001_create_user_table.sql` inside of it:

```
migrations/
└── 0001_create_user_table.sql
```

Next, you need to add the SQL statement that will create a `User` table to that file.

Open the `schema.prisma` file and add the following `User` model to your schema:

```diff
---
filename: prisma/schema.prisma
---
+model User {
+  id    Int     @id @default(autoincrement())
+  email String  @unique
+  name  String?
+}
```

Now, run the following command in your terminal to generate the SQL statement that creates a `User` table equivalent to the `User` model above:

```sh
$ npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script > migrations/0001_create_user_table.sql
```

This stores a SQL statement to create a new `User` table in your migration file from before, here is what it looks like:

```sql
---
filename: migrations/0001_create_user_table.sql
---
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

Note that the `UNIQUE INDEX` on the `email` was created because the `User` model in your Prisma schema is using the [`@unique`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#unique) attribute on its `email` field.

You now need to use the `wrangler d1 migrations apply` command to send this SQL statement to D1. This command accepts two options:

- `--local`: Executes the statement against a _local_ version of D1. This local version of D1 is a SQLite database file that will be located in the `.wrangler/state` directory of your project. Use this approach when you want to develop and test your Worker on your local machine. Refer to [Local development](/d1/configuration/local-development/) to learn more.
- `--remote`: Executes the statement against your _remote_ version of D1. This version is used by your _deployed_ Cloudflare Workers. Refer to [Remote development](/d1/configuration/remote-development/) to learn more.

In this tutorial, you will do local and remote development. You will test the Worker locally and deploy your Worker afterwards. Open your terminal, and run both commands:

```sh
# For the local database
$ npx wrangler d1 migrations apply prisma-demo-db --local
```

```sh
# For the remote database
$ npx wrangler d1 migrations apply prisma-demo-db --remote
```

Hit **Enter** both times when you're prompted to confirm that the migration should be applied.

Next, create some data that you can query once the Worker is running. This time, you will run the SQL statement without storing it in a file:

```sh
# For the local database
$ npx wrangler d1 execute prisma-demo-db --command "INSERT INTO  \"User\" (\"email\", \"name\") VALUES
('jane@prisma.io', 'Jane Doe (Local)');" --local
```

```sh
# For the remote database
$ npx wrangler d1 execute prisma-demo-db --command "INSERT INTO  \"User\" (\"email\", \"name\") VALUES
('jane@prisma.io', 'Jane Doe (Remote)');" --remote
```

### 5. Query your database from the Worker

To query your database from the Worker using Prisma ORM, you need to:

1. Add `DB` to the `Env` interface.
2. Instantiate `PrismaClient` using the `PrismaD1` driver adapter.
3. Send a query using Prisma Client and return the result.

Open `src/index.ts` and replace the entire content with the following:

```ts
---
filename: src/index.ts
---
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

export interface Env {
  DB: D1Database
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const adapter = new PrismaD1(env.DB)
    const prisma = new PrismaClient({ adapter })

    const users = await prisma.user.findMany()
    const result = JSON.stringify(users)
    return new Response(result);
		},
};

```

Before running the Worker, you need to generate Prisma Client with the following command:

```sh
$ npx prisma generate
```

### 6. Run the Worker locally

Now that you have the database query in place and Prisma Client generated, run the Worker locally:

```sh
$ npm run dev
```

Open your browser at [`http://localhost:8787`](http://localhost:8787/) to check the result of the database query:

```json
---
filename: Browser output
---
[{"id":1,"email":"jane@prisma.io","name":"Jane Doe (Local)"}]
```

### 7. Deploy the Worker

To deploy the Worker, run the following command:

```sh
$ npm run deploy
```

Access your Worker at `https://prisma-d1-example.USERNAME.workers.dev`. Your browser should display the following data queried from your remote D1 database:

```json
---
filename: Browser output
---
[{"id":1,"email":"jane@prisma.io","name":"Jane Doe (Remote)"}]
```

Congratulations, you just deployed a Cloudflare Worker using D1 as a database and querying it via Prisma ORM 🎉

## Related resources

- [Prisma documentation](https://www.prisma.io/docs/getting-started).
-  To get help, open a new [GitHub Discussion](https://github.com/prisma/prisma/discussions/), or [ask the AI bot in the Prisma docs](https://www.prisma.io/docs).
- [Ready-to-run examples using Prisma ORM](https://github.com/prisma/prisma-examples/).
- Check out the [Prisma community](https://www.prisma.io/community), follow [Prisma on X](https://www.x.com/prisma) and join the [Prisma Discord](https://pris.ly/discord).
- [Developer Experience Redefined: Prisma & Cloudflare Lead the Way to Data DX](https://www.prisma.io/blog/cloudflare-partnership-qerefgvwirjq).