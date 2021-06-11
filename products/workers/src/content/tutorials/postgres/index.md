---
updated: 2021-06-10
difficulty: Intermediate
content_type: "💾 Storage"
---

# Build data-driven applications with Workers and PostgreSQL

## Overview

Many applications for the web are built using industry-standards like PostgreSQL, an open-source SQL database. Instead of directly connecting your user interface to that database, it's common for developers to use a backend server to format and proxy API requests to that database. Instead of building a backend server for this task, we can make use of Cloudflare Workers and recent improvements to the PostgreSQL developer experience - namely, PostgREST: a REST API built specifically for PostgreSQL. By doing this, we can handle API requests to our database without needing to maintain another piece of infrastructure.

In this tutorial, we'll explore how to integrate with PostgREST and PostgreSQL using Workers.

## Prerequisites

To effectively learn from this tutorial, you should have an instance of PostgreSQL configured. In addition, you'll need to install PostgREST, a separate service that provides REST API access to your Postgres database.

If you want a quick way to get up and running with these tools, check out [postgres-postgrest-cloudflared-example](https://github.com/signalnerve/postgres-postgrest-cloudflared-example/), an example project that uses `docker-compose` to set up a PostgreSQL database, PostgREST, and `cloudflared`, which exposes the PostgREST endpoint to the internet for use in our Workers function.

In order to continue with the tutorial, ensure that you have a publicly accessible URL for your PostgREST endpoint.

## Create a Workers function

Begin by creating a new Workers function, using `wrangler generate`:

```sh
---
header: Create a Workers function
---
$ wrangler generate postgrest-example
$ cd postgrest-example
```

Inside of your Workers function, configure `wrangler.toml` with your account ID. The Workers function will also use `webpack` for bundling, so you can change the `type` value to "webpack":

```toml
---
file: wrangler.toml
highlight: [2, 4]
---
name = "postgrest-worker-example"
type = "webpack"

account_id = "yourAccountId"
```

## Build an API using postgrest-js

PostgREST provides a consistent REST API structure for use in your applications. Each _table_ in your PostgreSQL database has a separate path as `/:table_name`, and you can add query parameters to that URL to do lookups in your database - for instance, to find all users with an ID of `1`, you can make a `GET` request to `/users?id=eq.1`.

The URL structure makes it great for exploration, but in an application, it'd be great to have something easier to use. [postgrest-js](https://github.com/supabase/postgrest-js/) is an open-source package that wraps PostgREST in an expressive JavaScript API. We'll use it in our project to build a few endpoints to work with our PostgreSQL database in a Workers function.

Begin by installing `postgrest-js`:

```sh
---
header: Installing postgrest-js
---
$ npm install @supabase/postgrest-js
```

Before we can work with `postgrest-js` in our application, we need to quickly patch `cross-fetch`, the internal tool that `postgrest-js` uses for making HTTP requests, with Workers' built-in `fetch` API. We can do this by creating a custom Webpack config, and updating `wrangler.toml` to use it. Create `webpack.config.js` with the below configuration:

```js
---
file: webpack.config.js
---
module.exports = {
  target: "webworker",
  entry: "./index.js",
  externals: [
    { 'cross-fetch': 'fetch' }
  ]
}
```

In `wrangler.toml`, define the `webpack_config` key, and use your new file as the value:

```toml
---
file: wrangler.toml
highlight: [3]
---
name = "postgrest-worker-example"
type = "webpack"
webpack_config = "webpack.config.js"

account_id = "yourAccountId"
```

With the Webpack build configured, `postgrest-js` is ready to be used inside of your new Workers function. In `index.js`, import the package, and set up a new instance of `PostgrestClient`. Note that the `POSTGREST_ENDPOINT` is a placeholder for the publicly accessible endpoint mentioned earlier in this tutorial:

```js
---
file: index.js
highlight: [1, 2]
---
import { PostgrestClient } from '@supabase/postgrest-js'
const client = new PostgrestClient(POSTGREST_ENDPOINT)

addEventListener('fetch', event => {
// ... Rest of code
```

With a new client set up, we can make our first request from inside the Workers function to our PostgREST endpoint. To do this, we'll _select_ data from a table inside of our database, using the `from` and `select` functions in `postgrest-js`. In the below example, I'll use the `users` table, and select everything inside of it, though if you're bringing your own PostgreSQL setup to this tutorial, you can adjust accordingly. Replace the default code in `handleRequest` with the below code:

```js
---
file: index.js
---
// ... Rest of code

async function handleRequest(request) {
  const { data, error } = await client
    .from('users')
    .select()
  
  if (error) throw error

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-type': 'application/json'
    }
  })
}
```

This code is identical to making a `GET` request to `/users` on our PostgREST endpoint. In this example, we get the `data` object back from `postgrest-js`, and then return it to the client as JSON.

To publish this function, we can run `wrangler publish`:

```sh
---
header: Publish the Workers function
---
$ wrangler publish
✨  Built successfully, built project size is 3 KiB.
✨  Successfully published your script to
 https://postgrest-worker-example.signalnerve.workers.dev
```

Before you can work with your deployed function, we need to set the `POSTGREST_ENDPOINT`, which tells Workers where to actually make requests to. We can do this by setting a `wrangler secret`, an encrypted value that is only available inside of the Workers function:

```sh
$ wrangler secret put POSTGREST_ENDPOINT
Enter the secret text you'd like assigned to the variable POSTGREST_ENDPOINT on the script named postgrest-worker-example:
**************
🌀  Creating the secret for script name postgrest-worker-example
✨  Success! Uploaded secret POSTGREST_ENDPOINT.
```

We can now visit our Workers function in browser (for instance, `https://postgrest-worker-example.signalnerve.workers.dev`) to see it run correctly. It should return a simple JSON array of your PostgreSQL data, for instance:

```json
---
header: JSON array returning from PostgREST in a Workers function
---
[{"id":1,"name":"Kristian"}]
```

### Adding a router

To make our project more interesting, let's add a router to handle multiple potential paths in our application. For instance, we may want to have one path which returns _all_ users, and another path that returns a single user _based on ID_. Our URL structure will look like this:

| Route            | Action                    |
| ---------------- | ------------------------- |
| `GET /users`     | Get all users             |
| `GET /users/:id` | Get one user, based on ID |

To build this, we'll use [`itty-router`](https://github.com/kwhitley/itty-router), a small router built in JavaScript that works incredibly well with Cloudflare Workers. Begin by installing the package:

```sh
---
header: Installing itty-router
---
$ npm install itty-router
```

With `itty-router` installed, we can import the package, and instantiate a new router at the top of our serverless function:

```js
---
file: index.js
highlight: [2, 5]
---
import { PostgrestClient } from '@supabase/postgrest-js'
import { Router } from 'itty-router'

const client = new PostgrestClient(POSTGREST_ENDPOINT)
const router = Router()
```

As with most routers, `itty-router` works by adding routes off of `router`, based on the HTTP method clients will access them by. In our case, we have two routes - `GET /users`, and `GET /users/:id`. Let's take our current code, and port it into a `GET /users` route, which will retrieve all the users in our `users` table. In the below sample, we make an identical request using `postgrest-js` as before, but modify the JSON response slightly, so that it returns an object with a `users` array:

```js
---
file: index.js
---
router.get('/users', async () => {
  const { data, error } = await client.from('users').select()
  if (error) throw error

  return new Response(JSON.stringify({ users: data }), {
    headers: { 'content-type': 'application/json' },
  })
})
```

With our first route configured, we need to tell the Workers function to pass requests off to our `router`. We can do this by removing the `handleRequest` function in our code entirely, and calling `router.handle` in our `fetch` event listener:

```
---
file: index.js
highlight: [4, 11]
---
const router = Router()

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request))
})

router.get("/users", () => {
  // PostgREST code
})

# The below function can be deleted
async function handleRequest(request) {
  // Old PostgREST code
}
```

Deploy the new version of the function using `wrangler publish`, and you should see that your previous code now runs at `/users`, returning a JSON array of users:

```json
---
header: Updated JSON object returning users in a Workers function
---
{"users":[{"id":1,"name":"Kristian"}]}
```

You'll notice that our original _root_ path, `/`, now has nothing configured, and will throw an exception. To fix this, we can use `itty-router`'s `all` method, which acts as a catch-all for any routes not explicitly handled by other route handlers. Below, we'll return a new `404 Not Found` response for any route we don't recognize:

```js
---
file: index.js
highlight: [5]
---
router.get('/users', async () => {
  // Existing code
})

router.all('*', () => new Response("Not Found", { status: 404 }))
```

Our second planned route is `GET /users/:id`, which should return a single user based on their ID. We can set this up by configuring another route, which uses _parameters_ to capture part of the URL and make it available as part of our route handler as an object `params`:

```js
---
file: index.js
---
router.get('/users/:id', async ({ params } => {
  const { id } = params
  console.log(id) // e.g. 5, if route is /users/5
})
```

With the ID captured as the variable `id`, we can use `postgrest-js` to select from our `users` table again, but with an added _filter_ that requires any returned users have a matching ID. This will effectively limit our response to a single user, such as a user with an ID of 1. To do this, we'll add a new `filter` clause to the beginning of some very familiar `postgrest-js` code:

```js
---
file: index.js
highlight: [3, 4, 5, 6]
---
router.get('/users/:id', async ({ params }) => {
  const { id } = params
  const { data, error } = await client
    .from('users')
    .select()
    .eq('id', id)
})
```

By implementing this, we should get a JSON array of users back, but since it will be filtering based on ID, it can either have be an empty array (when no user is found), or an array with a single item (a user was found). Based on this, we can complete this route handler by returning a JSON object with a key `user`, which is either `null` or the object returned from PostgREST for our found user:

```js
---
file: index.js
highlight: [8, 10, 12, 13, 14, 15]
---
router.get('/users/:id', async ({ params }) => {
  const { id } = params
  const { data, error } = await client
    .from('users')
    .select()
    .eq('id', id)

  if (error) throw error

  const user = data.length ? data[0] : null

  return new Response(JSON.stringify({ user }), {
    headers: { 'content-type': 'application/json' },
    status: user ? 200 : 404
  })
})
```

Deploy your function again with `wrangler publish`, and you should now be able to look up users based on their ID, such as `/users/1`. If there's a user in the database with that given ID, you'll get a JSON response (with a status of `200 Found`) containing the user data, otherwise the JSON response will be a `null` value (with a status of `404 Not Found`):

```json
---
header: JSON object for a found user based on ID
---
{"user":{"id":1,"name":"Kristian"}}
```

```json
---
header: Empty JSON object when no user is found
---
{"user":null}
```

### Creating new users

To complete our Workers function, we'll create a third endpoint, which will allow you to create users from your Workers + PostgREST API. To do this, we'll make a `POST` request to `/users`, passing in a JSON payload with the data we want to persist in our database. For instance, if the `users` table contains a `name` value, we can post a JSON payload with the format `{"name":"Kristian"}`, which PostgREST will insert into the database.

In our Workers function, we can implement this by setting up a new `POST` handler, and parsing the request _body_ (the data being sent as part of the request) as JSON inside of that handler:

```js
---
file: index.js
---
router.post('/users', async request => {
  const userData = await request.json()
})
```

With that data available as `userData`, we can use the `insert` function to create a new user in our database. `postgrest-js` will return the new user back from PostgREST, so we can return that user as the JSON response back to the client:

```js
---
file: index.js
highlight: [2, 3, 4, 6, 8, 9, 10]
---
router.post('/users', async request => {
  const userData = await request.json()
  const { data: user, error } = await client
    .from('users')
    .insert([userData])

  if (error) throw error

  return new Response(JSON.stringify({ user }), {
    headers: { 'content-type': 'application/json' },
  })
})
```

Deploy the updated function using `wrangler publish`. To test this new endpoint, we can use `cURL`, a command-line tool for making requests. Copy the below command, replacing the base part of the URL with your unique Workers.dev deployment. The response back should be a new user:

```sh
---
header: Creating a new user using cURL
---
$ curl https://postgrest-worker-example.signalnerve.workers.dev/users \
  -X POST \
  -H "Content-type: application/json" \
  -d '{"name": "Dog"}'
{"user":{"id":2,"name":"Dog"}}
```

## Conclusion

In this tutorial, you've used PostgREST, `postgrest-js`, and Cloudflare Workers to build a serverless API for your PostgreSQL database. This architecture provides an infinitely-scaling and secure approach to interfacing between your databases and your frontend applications, while still retaining the control and flexibility of staying locked out of Database-as-a-Service tools and other complicated SDKs for data management.

If you enjoyed this tutorial, you might enjoy some of the other tutorials we have for Cloudflare Workers - check them out!

- [Authorize users with Auth0](/tutorials/authorize-users-with-auth0)
- [Build a Slackbot](/tutorials/build-a-slackbot)
- [GitHub SMS notifications using Twilio](/tutorials/github-sms-notifications-using-twilio)