---
updated: 2022-11-23
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Build a Comments API
---

# Build a Comments API

In this tutorial, you'll learn how to use D1 to add comments to a static blog site. To do this, you will construct a new D1 database, and build a JSON API that allows the creation and retrieval of comments.

## Project setup

First, create a new directory and initialize a new project using [Wrangler](https://github.com/cloudflare/wrangler2), the command-line tool for Cloudflare's developer products:

```sh
$ mkdir d1-example && d1-example
$ npm init -y && npm install -D wrangler
$ npx wrangler init
```

In this example, we’ll use [Hono](https://github.com/honojs/hono), an Express.js-style framework, to rapidly build your API. To use Hono in this project, install it using NPM:

```sh
$ npm install hono
```

Then, in `src/index.ts`, we’ll initialize a new Hono app, and define a few endpoints - `GET /API/posts/:slug/comments`, and `POST /get/api/:slug/comments`. Using Hono, it's easy to create a few request handlers, including the ability to pattern match on a `slug` key:

```js
import { Hono } from 'hono'
import { cors } from 'hono/cors'

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

## Create a database

Now you'll create a D1 database. In Wrangler 2, there is support for the `wrangler d1` subcommand, which allows you to create and query your D1 databases directly from the command line. Create a new database with `wrangler d1 create`:

```sh
$ wrangler d1 create d1-example
```

With a created database, you can reference the database in your code using a binding inside of `wrangler.toml`, Wrangler's configuration file. Bindings allow us to access Cloudflare resources, like D1 databases, KV namespaces, and R2 buckets, using a simple variable name in code. In `wrangler.toml`, set up the binding `DB` and connect it to the `database_name` and `database_id`:

```toml
[[ d1_databases ]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "d1-example"
database_id = "4e1c28a9-90e4-41da-8b4b-6cf36e5abb29"
```

{{<Aside type="notice" header="Beta notice">}}

Note that this directive, the `[[d1_databases]]` field, currently requires a beta version of wrangler. You can install this for your project using the command `npm install -D wrangler/beta`.

{{</Aside>}}

With the database configured in `wrangler.toml`, you can interact with it from the command line, and inside your Workers function.

## Interact with D1

First, you can issue direct SQL commands using `wrangler d1 execute`:

```sh
$ wrangler d1 execute d1-example --command "SELECT name FROM sqlite_schema WHERE type ='table'"

Executing on d1-example:

┌─────────────────┐
│ name            │
├─────────────────┤
│ sqlite_sequence │
└─────────────────┘
```

You can also pass a SQL file - perfect for initial data seeding in a single command. Create `src/schema.sql`, which will create a new `comments` table for your project:

```SQL
drop table if exists comments;
create table comments (
  id integer primary key autoincrement,
  author text not null,
  body text not null,
  post_slug text not null
);
create index idx_comments_post_id on comments (post_slug);

-- Optionally, uncomment the below query to create data

-- insert into comments (author, body, post_slug)
-- values ("Kristian", "Great post!", "hello-world");
```

With the file created, execute the schema file against the D1 database by passing it with the flag `--file`:

```sh
$ wrangler d1 execute d1-example --file src/schema.sql
```

## Executing SQL

So far, you've created a SQL database with just a few commands and seeded it with initial data. Now you can add a route to your Workers function to retrieve data from that database. Based on your wrangler.toml config, the D1 database is now accessible via the `DB` binding. In your code, you can use the binding to prepare SQL statements and execute them, for instance, to retrieve comments:

```js
app.get('/api/posts/:slug/comments', async c => {
  const { slug } = c.req.param()
  const { results } = await c.env.DB.prepare(`
    select * from comments where post_slug = ?
  `).bind(slug).all()
  return c.json(results)
})
```

The above code makes use of the `prepare`, `bind`, and `all` functions on a D1 binding to prepare and execute a SQL statement. The full documentation for all methods available in D1's client API can be found [here](/d1/platform/client-api).

In this function, you accept a `slug` URL query parameter and set up a new SQL statement where you select all comments with a matching `post_slug` value to your query parameter. you can then return it as a simple JSON response.

## Insert data

So far, you've built read-only access to your data. Next, you can define another endpoint function that allows creating new comments, by inserting data into the database:

```js
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

## Deployment

With your application ready for deployment, you can use Wrangler to quickly build and publish your project to your Cloudflare account.

Begin by running `wrangler whoami` to confirm that you are logged in to yuor Cloudflare account. If you are not logged in, Wrangler will prompt you to login, creating an API key that you can use to make authenticated requests automatically from your local machine.

Once you've logged in, confirm that your `wrangler.toml` file is configured similarly to what is seen below. You can change the `name` field to a project name of your choice:

```toml
name = "d1-example"
main = "src/index.ts"
compatibility_date = "2022-07-15"

[[ d1_databases ]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<YOUR_DATABASE_NAME>"
database_id = "<YOUR_DATABASE_UUID>"
```

Now, run `wrangler publish` to publish your project to Cloudflare Workers. When it has successfully published, you can test the API by making a `GET` request to retrieve comments for an associated post. Since we have no posts yet, this response will be empty, but it will still make a request to the D1 database regardless, which we can use to confirm that the application has deployed correctly:

```sh
# Note: Your workers.dev deployment URL may be different
$ curl https://d1-example.signalnerve.workers.dev/api/posts/hello-world/comments | jq
[
  {
    "id": 1,
    "author": "Kristian",
    "body": "Hello from the comments section!",
    "post_slug": "hello-world"
  }
]
```

## Testing with an optional frontend

This application is just an API backend, best served for use with a frontend UI for actually creating and viewing comments. If you'd like to test this backend with a prebuild frontend UI, visit the example UI at [codewithkristian/d1-frontend-app](https://github.com/codewithkristian/d1-frontend-app). Notably, the [`loadComments` and `submitComment` functions](https://github.com/codewithkristian/d1-frontend-app/blob/master/src/views/PostView.vue#L57-L82) make requests to a deployed version of this site, meaning you can take the frontend and replace the URL with your deployed version of the codebase in this tutorial to use your own data.

Note that interacting with this API from a frontend will require enabling specific Cross-Origin Resource Sharing (or *CORS*) headers in your backend API. Luckily, Hono has a quick way to enable this for your application. Import the `cors` module and add it as middleware to your API in `src/index.ts`:

```typescript
---
highlight: [5]
---
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('/api/*', cors());
```

Now, when you make requests to `/api/*`, Hono will automatically generate and add CORS headers to responses from your API, allowing frontend UIs to interact with it without erroring.

## Conclusion

In this example, you built a comments API for powering a blog. To see the full source for this D1-powered comments API, you can visit [cloudflare/templates/worker-d1-api](https://github.com/cloudflare/templates/tree/main/worker-d1-api).
