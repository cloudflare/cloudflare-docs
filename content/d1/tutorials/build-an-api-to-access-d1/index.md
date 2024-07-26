---
updated: 2024-07-26
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Build an API to access D1
products: [Workers]
tags: [Hono]
---

# Build an API to access D1 outside of your Workers or Pages project

{{<tutorial-date-info>}}

In this tutorial, you will learn how to create an API that allows you to securely run queries against a D1 database. This is useful if you want to access a D1 database outside of a Worker or Pages project. While you can query a D1 database via the [REST API](/api/operations/cloudflare-d1-create-database), this approach is not recommende due to rate limits and high latency.

To access a D1 database outside of a Worker project, you need to create an API using a Worker. Your application can then securely interact with this API to run D1 queries.

{{<Aside type="note">}}

The tutorial does not cover how to sanitize SQL queries. Please ensure that you sanitize query statements before executing them.

{{</Aside>}}

## Prerequisites

{{<render file="_prereqs.md" productFolder="workers">}}

## 1. Create a new project

Use [C3](/learning-paths/workers/get-started/c3-and-wrangler/#c3), the command-line tool for Cloudflare's developer products, to create a new directory and initialize a new Worker project:

```sh
$ npm create cloudflare d1-http
```

In your terminal, you will be asked a series of questions related to your project. Choose the following options:

- For the `What type of application do you want to create?` prompt, select `"Hello World" Worker`.
- For the `Do you want to use TypeScript?` prompt, select `Yes`.
- For the `Do you want to use git for version control?` prompt, select `Yes`.
- For the `Do you want to deploy your application?` prompt, select `No`.

To start developing, change into your new project directory:

```sh
$ cd d1-http
```

## 2. Install Hono

In this tutorial, you will use [Hono](https://github.com/honojs/hono), an Express.js-style framework, to build the API. To use Hono in this project, install it using `npm`:

```sh
$ npm install hono
```

## 3. Add API_KEY

To ensure that the API Key is secure, you will add it as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/). To do so, create a `.dev.vars` file in the root directory. Add your API key in the file as follows.

```env
API_KEY="YOUR_API_KEY"
```

Replace `YOUR_API_KEY` with a valid string value. You can also generate this value using the following command.

```sh
$ openssl rand -base64 32
```

Your Hono applicaton will use this API key for authentication.

## 4. Initialise the application

In the `src/index.ts` file, import the required packages, initialize a new Hono application, and configure the following middleware:

- [Bearer Auth](https://hono.dev/docs/middleware/builtin/bearer-auth): Adds authentication to the API.
- [Logger](https://hono.dev/docs/middleware/builtin/logger): Allows monitoring the flow of requests and responses.
- [Pretty JSON](https://hono.dev/docs/middleware/builtin/pretty-json): Enables "JSON pretty print" for JSON response bodies.

```ts
---
filename: src/index.ts
---
import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

type Bindings = {
	DB: D1Database;
	API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', prettyJSON(), logger(), async (c, next) => {
	const auth = bearerAuth({ token: c.env.API_KEY });
	return auth(c, next);
});;
```

## 5. Add API endpoints

Next, in the `src/index.ts` file, add the following endpoints:

- POST `/api/all`
- POST `/api/exec`
- POST `/api/batch`

```ts
---
filename: src/index.ts
---

...

app.post('/api/all', async (c)=> {
    return c.text('/api/all endpoint')
})

app.post('/api/exec', async (c)=> {
    return c.text('/api/exec endpoint')
})

app.post('/api/batch', async (c)=> {
    return c.text('/api/batch endpoint')
})

export default app;
```

Start the development server by running the following command:

```sh
$ npm run dev
```

To test the API locally, execute the below cURL command. Replace `YOUR_API_KEY` with the value you set in the `.dev.vars` file.

```sh
$ curl -H "Authorization: Bearer YOUR_API_KEY" "http://localhost:8787/api/all" --data '{}'
```

You should get the following output

```txt
/api/all endpoint
```

The Hono application is now set up. You can test the other enpoints and add more endpoints if needed. The API does not yet return any information from your database. In the next steps, you will create a database, add its bindings, and update the endpoints to interact with the database.

## 6. Create a database

If you don't have a D1 database already, you can create a new database with `wrangler d1 create`:

```sh
$ npx wrangler d1 create d1-http-example
```

You might be asked to login to your Cloudflare. Once logged in, the command will create a new D1 database. You should see a similar output in your terminal.

```txt
✅ Successfully created DB 'd1-http-example' in region EEUR
Created your new D1 database.

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "d1-http-example"
database_id = "1234567890"
```

Make a note of the displayed `database_name` and `database_id`. You will use this to reference to the database by creating a [binding](/workers/runtime-apis/bindings/).

Open the `wrangler.toml` file, Wrangler's configuration file. Add the following binding in the file. Make sure that the `database_name` and the `database_id` are correct.

```toml
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "d1-http-example"
database_id = "1234567890"
```

You can now access the database in the Hono application.

## 7. Create a table

To create a table in your newly created database, create a new `schemas/schema.sql` file and paste the following SQL statement into the file. The code will drop any table named `posts` if it exists and then create a new table `posts` with the field `id`, `author`, `title`, `body`, and `post_slug`.

```sql
---
filename: schemas/schema.sql
---
DROP TABLE IF EXISTS posts;
CREATE TABLE IF NOT EXISTS posts (
  id integer PRIMARY KEY AUTOINCREMENT,
  author text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  post_slug text NOT NULL
);
```

Optinally, you can add the below INSERT statement to populate the table.

```sql
INSERT INTO posts (author, title, body, post_slug) VALUES ('Harshil', 'D1 HTTP API', 'Learn to create an API to query your D1 database.','d1-http-api');
```

In your terminal, execute the following command to create this table:

```sh
$ npx wrangler d1 execute d1-http-example --file=./schemas/schema.sql
```

Upon successful execution, a new table will be added to your database.

{{<Aside type="note">}}

The table will be created in the local instance of the database. If you want to add this table to your production database, append the above command with the `--remote` flag.

{{</Aside>}}

## 8. Query the database

Your application can now access the D1 database. In this step, you will update the API endpoints to query the database and return the result.

In your `src/index.ts` file, update the code as follow.

```ts
---
filename: src/index.ts
---
...
app.post('/api/all', async (c) => {
	try {
		let { query, params } = await c.req.json();
		let stmt = c.env.DB.prepare(query);
		if (params) {
			stmt = stmt.bind(params);
		}

		const result = await stmt.all();
		return c.json(result);
	} catch (err) {
		return c.json({ error: `Failed to run query: ${err}` }, 500);
	}
});

app.post('/api/exec', async (c) => {
	try {
		let { query } = await c.req.json();
		let result = await c.env.DB.exec(query);
		return c.json(result);
	} catch (err) {
		return c.json({ error: `Failed to run query: ${err}` }, 500);
	}
});

app.post('/api/batch', async (c) => {
	try {
		let { batch } = await c.req.json();
		let stmts = [];
		for (let query of batch) {
			let stmt = c.env.DB.prepare(query.query);
			if (query.params) {
				stmts.push(stmt.bind(query.params));
			} else {
				stmts.push(stmt);
			}
		}
		const results = await c.env.DB.batch(stmts);
		return c.json(results);
	} catch (err) {
		return c.json({ error: `Failed to run query: ${err}` }, 500);
	}
});
...
```

In the above code, the endpoints are updated to receive `query` and `params`. These queries and parameters are passed to the respective functions to interact with the database. If the query is successful, you recieve the result from the database. If there is an error, the error message is returned.

## 9. Test the API

Now that the API can query the database, you can test it locally. If the local database is empty, populate it with some data.

Start the development server by executing the following command:

```sh
$ npm run dev
```

In a new terminal window, execute the following cURL commands. Make sure to replace `YOUR_API_KEY` with the correct value.

```sh
---
header: /api/all
---
$ curl -H "Authorization: Bearer YOUR_API_KEY" "http://localhost:8787/api/all" --data '{"query": "SELECT title FROM posts WHERE id=?", "params":1}'
```

```sh
---
header: /api/batch
---
$ curl -H "Authorization: Bearer YOUR_API_KEY" "http://localhost:8787/api/batch" --data '{"batch": [ {"query": "SELECT title FROM posts WHERE id=?", "params":1},{"query": "SELECT id FROM posts"}]}'
```

```sh
---
header: /api/exec
---
$ curl -H "Authorization: Bearer YOUR_API_KEY" "localhost:8787/api/exec" --data '{"query": "INSERT INTO posts (author, title, body, post_slug) VALUES ('\''Harshil'\'', '\''D1 HTTP API'\'', '\''Learn to create an API to query your D1 database.'\'','\''d1-http-api'\'')" }'
```

If everything is implemented correctly, the above commands should result successful outputs.

## 10. Deploy the API

Now that everything is working as expected, the last step is to deploy it to the Cloudflare network. You will use Wrangler to deploy the API. The deployment involves two steps:

1. Create a table in the production database
2. Deploy the app

### 9.1 Create the table in the production database

Until now, you were running a local instance of D1 database. To use the API in production, you need to add the table to your remote (production) database. To add the table to your production database, run the following command:

```sh
$ npx wrangler d1 execute d1-http-example --file=./schemas/schema.sql --remote
```

You should now be able to view the table on the Cloudflare D1 dashboard.

### 9.2 Deploy the app

To deploy the application to the Cloudflare network, run the following command:

```sh
$ npx wrangler deploy
```

Upon successful deployment, you will get the link of the deployed app in the terminal. Make a note of it.

Next, execute the `wrangler secret put <KEY>` command to add the `API_KEY` to the deployed project.

```sh
$ npx wrangler secret put API_KEY
```

Enter the value of your API key. Your API key will get added to your project. Using this value you can make secure API calls to your deployed API.

To test it, run the following cURL command with the correct `YOUR_API_KEY` and `WORKERS_URL`.

```sh
$ curl -H "Authorization: Bearer YOUR_API_KEY" "https://WORKERS_URL.workers.dev/api/exec" --data '{"query": "SELECT 1"}'
```

## Conclusion

In this tutorial, you created an API that interacts with your D1 database. You deployed this API to the Workers. You can use this API in your external application to execute queries against your D1 database. To make your API more secure, sanitize the query before executing it. You can check out a similar implimentation that use Zod for validation in [this GitHub repository](https://github.com/elithrar/http-api-d1-example).
