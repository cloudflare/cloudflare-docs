---
updated: 2022-11-23
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Build a Comments API
products: [Workers]
tags: [Hono]
---

# Build a Comments API

{{<tutorial-date-info>}}

In this tutorial, you will learn how to use D1 to add comments to a static blog site. To do this, you will construct a new D1 database, and build a JSON API that allows the creation and retrieval of comments.

## Prerequisites

Use [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler), the command-line tool for Cloudflare's developer products, to create a new directory and initialize a new Worker project:

```sh
$ npx wrangler init d1-example
```

{{<Aside type="note">}}
During the initialization process, Wrangler will ask you "What type of application do you want to create?". Choose "Hello World" script for this tutorial.
{{</Aside>}}

## 1. Install Hono

In this tutorial, you will use [Hono](https://github.com/honojs/hono), an Express.js-style framework, to build your API. To use Hono in this project, install it using `npm`:

```sh
$ npm install hono
```

## 2. Initialize your Hono application

In `src/worker.js`, initialize a new Hono application, and define the following endpoints:

- `GET /api/posts/:slug/comments`.
- `POST /api/posts/:slug/comments`.

```js
---
filename: worker.js
---
import { Hono } from 'hono'

const app = new Hono()

app.get('/api/posts/:slug/comments', async c => {
  // Do something and return an HTTP response
  // Optionally, do something with `c.req.param("slug")`
})

app.post('/api/posts/:slug/comments', async c => {
  // Do something and return an HTTP response
  // Optionally, do something with `c.req.param("slug")`
})

export default app
```

## 3. Create a database

You will now create a D1 database. In Wrangler v2, there is support for the `wrangler d1` subcommand, which allows you to create and query your D1 databases directly from the command line. Create a new database with `wrangler d1 create`:

```sh
$ wrangler d1 create d1-example
```

Reference your created database in your Worker code by creating a [binding](/workers/runtime-apis/bindings/) inside of your `wrangler.toml` file, Wrangler's configuration file. Bindings allow us to access Cloudflare resources, like D1 databases, KV namespaces, and R2 buckets, using a variable name in code. In `wrangler.toml`, set up the binding `DB` and connect it to the `database_name` and `database_id`:

```toml
---
filename: wrangler.toml
---
[[ d1_databases ]]
binding = "DB" # available in your Worker on `env.DB`
database_name = "d1-example"
database_id = "4e1c28a9-90e4-41da-8b4b-6cf36e5abb29"
```

With your binding configured in your `wrangler.toml` file, you can interact with your database from the command line, and inside your Workers function.

## 4. Interact with D1

Interact with D1 by issuing direct SQL commands using `wrangler d1 execute`:

```sh
$ wrangler d1 execute d1-example --remote --command "SELECT name FROM sqlite_schema WHERE type ='table'"

Executing on d1-example:

┌───────┐
│ name  │
├───────┤
│ d1_kv │
└───────┘
```

You can also pass a SQL file - perfect for initial data seeding in a single command. Create `schemas/schema.sql`, which will create a new `comments` table for your project:

```SQL
---
filename: schema.sql
---
DROP TABLE IF EXISTS comments;
CREATE TABLE IF NOT EXISTS comments (
  id integer PRIMARY KEY AUTOINCREMENT,
  author text NOT NULL,
  body text NOT NULL,
  post_slug text NOT NULL
);
CREATE INDEX idx_comments_post_slug ON comments (post_slug);

-- Optionally, uncomment the below query to create data

-- INSERT INTO COMMENTS (author, body, post_slug) VALUES ('Kristian', 'Great post!', 'hello-world');
```

With the file created, execute the schema file against the D1 database by passing it with the flag `--file`:

```sh
$ wrangler d1 execute d1-example --remote --file schemas/schema.sql
```

## 5. Execute SQL

In earlier steps, you created a SQL database and populated it with initial data. Now, you will add a route to your Workers function to retrieve data from that database. Based on your `wrangler.toml` configuration in previous steps, your D1 database is now accessible via the `DB` binding. In your code, use the binding to prepare SQL statements and execute them, for example, to retrieve comments:

```js
---
filename: worker.js
---
app.get('/api/posts/:slug/comments', async c => {
  const { slug } = c.req.param()
  const { results } = await c.env.DB.prepare(`
    select * from comments where post_slug = ?
  `).bind(slug).all()
  return c.json(results)
})
```

The above code makes use of the `prepare`, `bind`, and `all` functions on a D1 binding to prepare and execute a SQL statement. Refer to [D1 client API](/d1/build-with-d1/d1-client-api/) for a list of all methods available.

In this function, you accept a `slug` URL query parameter and set up a new SQL statement where you select all comments with a matching `post_slug` value to your query parameter. You can then return it as a JSON response.

## 6. Insert data

The previous steps grant read-only access to your data. To create new comments by inserting data into the database, define another endpoint in `src/worker.js`:

```js
---
filename: worker.js
---
app.post('/api/posts/:slug/comments', async c => {
  const { slug } = c.req.param()
  const { author, body } = await c.req.json()

  if (!author) return c.text("Missing author value for new comment")
  if (!body) return c.text("Missing body value for new comment")

  const { success } = await c.env.DB.prepare(`
    insert into comments (author, body, post_slug) values (?, ?, ?)
  `).bind(author, body, slug).run()

  if (success) {
    c.status(201)
    return c.text("Created")
  } else {
    c.status(500)
    return c.text("Something went wrong")
  }
})
```

## 7. Deploy your Hono application

With your application ready for deployment, use Wrangler to build and deploy your project to the Cloudflare network.

Begin by running `wrangler whoami` to confirm that you are logged in to your Cloudflare account. If you are not logged in, Wrangler will prompt you to login, creating an API key that you can use to make authenticated requests automatically from your local machine.

After you have logged in, confirm that your `wrangler.toml` file is configured similarly to what is seen below. You can change the `name` field to a project name of your choice:

```toml
---
filename: wrangler.toml
---
name = "d1-example"
main = "src/worker.js"
compatibility_date = "2022-07-15"

[[ d1_databases ]]
binding = "DB" # available in your Worker on env.DB
database_name = "<YOUR_DATABASE_NAME>"
database_id = "<YOUR_DATABASE_UUID>"
```

Now, run `npx wrangler deploy` to deploy your project to Cloudflare. When it has successfully deployed, test the API by making a `GET` request to retrieve comments for an associated post. Since you have no posts yet, this response will be empty, but it will still make a request to the D1 database regardless, which you can use to confirm that the application has deployed correctly:

```sh
# Note: Your workers.dev deployment URL may be different
$ curl https://d1-example.signalnerve.workers.dev/api/posts/hello-world/comments
[
  {
    "id": 1,
    "author": "Kristian",
    "body": "Hello from the comments section!",
    "post_slug": "hello-world"
  }
]
```

## 8. Test with an optional frontend

This application is an API back-end, best served for use with a front-end UI for creating and viewing comments. To test this back-end with a prebuild front-end UI, refer to the example UI in the [example-frontend directory](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-d1-api/example-frontend). Notably, the [`loadComments` and `submitComment` functions](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-d1-api/example-frontend/src/views/PostView.vue#L57-L82) make requests to a deployed version of this site, meaning you can take the frontend and replace the URL with your deployed version of the codebase in this tutorial to use your own data.

Interacting with this API from a front-end will require enabling specific Cross-Origin Resource Sharing (or _CORS_) headers in your back-end API. Hono allows you to enable Cross-Origin Resource Sharing for your application. Import the `cors` module and add it as middleware to your API in `src/worker.js`:

```typescript
---
highlight: [5]
filename: worker.js
---
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/api/*', cors());
```

Now, when you make requests to `/api/*`, Hono will automatically generate and add CORS headers to responses from your API, allowing front-end UIs to interact with it without erroring.

## Conclusion

In this example, you built a comments API for powering a blog. To see the full source for this D1-powered comments API, you can visit [cloudflare/workers-sdk/templates/worker-d1-api](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-d1-api).
