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

- Node.js and npm installed on your machine
- A Cloudflare account

### 1. Create a Cloudflare Worker

As a first step, go ahead and use `npm create` to bootstrap a plain version of a Cloudflare Worker (using Cloudflare's [`hello-world`](https://github.com/cloudflare/workers-sdk/tree/4fdd8987772d914cf50725e9fa8cb91a82a6870d/packages/create-cloudflare/templates/hello-world) template). Run the following command in your terminal:

```
npm create cloudflare@latest prisma-d1-example -- --type hello-world
```

This will bring up a CLI wizard. Select all the *default* options by hitting **Enter** every time a question appears.

At the end of the wizard, you should have a deployed Cloudflare Worker at the domain `https://prisma-d1-example.USERNAME.workers.dev` which simply renders "Hello World" in the browser.

### 2. Initialize Prisma ORM

With your Worker in place, let's go ahead and set up Prisma ORM.

First, navigate into the project directory and install the Prisma CLI:

```
cd prisma-d1-example
npm install prisma --save-dev
```

Next, install the Prisma Client package as well as the driver adapter for D1:

```
npm install @prisma/client
npm install @prisma/adapter-d1
```

Finally, bootstrap the files required by Prisma ORM using the following command:

```
 npx prisma init --datasource-provider sqlite
```

This command did two things:

- It created a new directory called `prisma` that contains your [Prisma schema](https://www.prisma.io/docs/orm/prisma-schema/overview) file.
- It created a `.env` file which is typically used to configure environment variables that will be read by the Prisma CLI.

In this tutorial, you won't need the `.env` file since the connection between Prisma ORM and D1 will happen through a [binding](/workers/configuration/bindings/). You'll find instructions for setting up this binding in the next step.

Since you'll be using the [driver adapter](https://www.prisma.io/docs/orm/overview/databases/database-drivers#driver-adapters) feature which is currently in Preview, you need to explicitly enable it via  the `previewFeatures` field on the `generator` block.

Open your `schema.prisma` file and adjust the `generator` block to look as follows:

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

In this step, you'll set up your D1 database. There generally are two approaches to this. Either using the Cloudflare Dashboard UI or via the `wrangler` CLI. You'll use the CLI in this tutorial.

Open your terminal and run the following command:

```
npx wrangler d1 create prisma-demo-db
```

If everything went well, you should see an output similar to this:

```
✅ Successfully created DB 'prisma-demo-db' in region EEUR
Created your database using D1's new storage backend. The new storage backend is not yet recommended for production workloads, but backs up your data via
point-in-time restore.

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "prisma-demo-db"
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

Note that `__YOUR_D1_DATABASE_ID__` in the snippet above is a placeholder that should be replaced with the database ID of your own D1 instance. If you weren't able to grab this ID from the terminal output, you can also find it in the [Cloudflare Dashboard](https://dash.cloudflare.com/) or by running `npx wrangler d1 info prisma-demo-db` in your terminal.

Next, you'll create a database table in the database in order to be able to send some queries to D1 using Prisma ORM.

### 4. Create a table in the database

[Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/overview) doesn't support D1 yet, so you can't follow the "default" migration workflows using `prisma migrate dev` or `prisma db push`. However, the Prisma CLI provides tools that still allow you to generate SQL statements which you can then manually send to D1 via the `wrangler` CLI.

Open the `schema.prisma` file and add the following `User` model to it:

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

Next, run the following command in your terminal to generate the SQL statement that creates a `User` table that's equivalent to the `User` model above:

```
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script > prisma/schema.sql
```

This stores a SQL statement to create a new `User` table in a new file called `schema.sql` in the `prisma` directory. Here's what it looks like:

```sql
---
filename: prisma/schema.sql
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

You now need to use the `wrangler d1 execute`  command to send this SQL statement to D1. Note that this command accepts two options:

- `--local`: Executes the statement against a _local_ version of D1. This local version of D1 is a SQLite database file that'll be located in the `.wrangler/state` directory of your project. This approach is useful, when you want to develop and test your Worker on your local machine. Learn more [here](/d1/configuration/local-development/).
- `--remote`: Executes the statement against your _remote_ version of D1. This version is used by your _deployed_ Cloudflare Workers. Learn more [here](/d1/configuration/remote-development/).

In this tutorial, you'll do both: test the Worker locally _and_ deploy it afterwards. So, you need to run both commands. Open your terminal and paste the following commands:

```
# For the local database
npx wrangler d1 execute prisma-demo-db --file=prisma/schema.sql --local

# For the remote database
npx wrangler d1 execute prisma-demo-db --file=prisma/schema.sql --remote
```

Let's also create some dummy data that we can query once the Worker is running. This time, you'll run the SQL statement without storing it in a file:

```
# For the local database
npx wrangler d1 execute prisma-demo-db --command "INSERT INTO  \"User\" (\"email\", \"name\") VALUES
('jane@prisma.io', 'Jane Doe (Local)');" --local

# For the remote database
npx wrangler d1 execute prisma-demo-db --command "INSERT INTO  \"User\" (\"email\", \"name\") VALUES
('jane@prisma.io', 'Jane Doe (Remote)');" --remote
```

### 5. Query your database from the Worker

In order to query your database from the Worker using Prisma ORM, you need to:

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

```
npx prisma generate
```

### 6. Run the Worker locally

With the database query in place and Prisma Client generated, you can go ahead and run the Worker locally:

```
npm run dev
```

Now you can open your browser at [`http://localhost:8787`](http://localhost:8787/) to see the result of the database query:

```json
---
filename: Browser output
---
[{"id":1,"email":"jane@prisma.io","name":"Jane Doe (Local)"}]
```

### 7. Deploy the Worker

To deploy the Worker, run the the following command:

```
npm run deploy
```

As before, your deployed Worker is accessible via `https://prisma-d1-example.USERNAME.workers.dev`. If you navigate your browser to that URL, you should see the following data that's queried from your remote D1 database:

```json
---
filename: Browser output
---
[{"id":1,"email":"jane@prisma.io","name":"Jane Doe (Remote)"}]
```

Congratulations, you just deployed a Cloudflare Worker using D1 as a database and querying it via Prisma ORM 🎉

## Next steps

Here are some more useful resources to check out if you want to learn more about Prisma ORM:

- **Docs**: [Get started with Prisma ORM](https://www.prisma.io/docs/getting-started)
- **Help**: Open a new [GitHub Discussion](https://github.com/prisma/prisma/discussions/) or [ask the AI bot in the Prisma docs](https://www.prisma.io/docs)
- **Examples**: [Ready-to-run examples using Prisma ORM](https://github.com/prisma/prisma-examples/)
- **Community**: Check out the [Prisma community](https://www.prisma.io/community), follow [Prisma on X](https://www.x.com/prisma) and join the [Prisma Discord](https://pris.ly/discord)
- **Blog**: [Developer Experience Redefined: Prisma & Cloudflare Lead the Way to Data DX](https://www.prisma.io/blog/cloudflare-partnership-qerefgvwirjq)