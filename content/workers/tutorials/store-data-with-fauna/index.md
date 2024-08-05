---
updated: 2023-09-13
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Create a serverless, globally distributed REST API with Fauna
tags: [Hono]
languages: [TypeScript]
---

# Create a serverless, globally distributed REST API with Fauna

{{<tutorial-date-info>}}

In this tutorial, you learn how to store and retrieve data in your Cloudflare Workers applications by building a REST API that manages an inventory catalog using [Fauna](https://fauna.com/) as its data layer.

## Learning goals

- How to store and retrieve data from Fauna in Workers.
- How to use Wrangler to store secrets securely.
- How to use [Hono](https://hono.dev) as a web framework for your Workers.

Building with Fauna, Workers, and Hono enables you to create a globally distributed, strongly consistent, fully serverless REST API in a single repository.

Fauna is a document-based database with a flexible schema. This allows you to define the structure of your data – whatever it may be – and store documents that adhere to that structure. In this tutorial, you will build a product inventory, where each `product` document must contain the following properties:

- **title** - A human-friendly string that represents the title or name of a product.
- **serialNumber** - A machine-friendly string that uniquely identifies the product.
- **weightLbs** - A floating point number that represents the weight in pounds of the product.
- **quantity** A non-negative integer that represents how many items of a particular product there are in the inventory.

Documents are stored in a [collection](https://docs.fauna.com/fauna/current/reference/schema_entities/collection/). Collections in document databases are groups of related documents.

For this tutorial, all API endpoints are public. However, Fauna also offers multiple avenues for securing endpoints and collections. Refer to [Choosing an authentication strategy with Fauna](https://fauna.com/blog/choosing-an-authentication-strategy-with-fauna) for more information on authenticating users to your applications with Fauna.

{{<render file="_tutorials-before-you-start.md">}}

## Set up Fauna

### Create your database

Open the [Fauna dashboard](https://dashboard.fauna.com/) in your browser and log in to your Fauna account.

{{<Aside type="note" header="Fauna Account">}}

If you do not have a Fauna account, [sign up](https://dashboard.fauna.com/register) and deploy this template using the free tier.

{{</Aside>}}

In the Fauna dashboard:

1. Select **CREATE DATABASE**.
2. Provide a valid name.
3. Select a [Region Group](https://docs.fauna.com/fauna/current/administration/region_groups).
4. Select **CREATE**.

### Create a collection

To create a collection named **Products**, enter the FQL query in the **SHELL** window on right side of the screen.

```js
---
header: Create a new collection
---
Collection.create({ name: "Products" })
```

Select **Run**. You will see an output similar to the following.

```js
---
header: Output
---
{
  name: "Products",
  coll: Collection,
  ts: "<timestamp>",
  indexes: {},
  constraints: []
}
```

### Create a secret key

You must create a secret key to connect to the database from your Worker.

To create a secret key:

1. Go to **Explorer** in the Fauna dashboard.
2. Hover over your database name, and select the key icon to manage your keys.
3. Choose **Server Role** and enter a key name.

The Fauna dashboard displays the key's secret. Copy and save this server key to use in a later step.

{{<Aside type="warning" header="Protect your keys">}}

Server keys can read and write all documents in all collections and can call all [user-defined functions](https://docs.fauna.com/fauna/current/cookbook/data_model/user_defined_functions) (UDFs). Protect server keys and do not commit them to source control repositories.

{{</Aside>}}

## Manage your inventory with Workers

### Create a new Worker project

Create a new project by using [C3](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare).

{{<render file="_c3-run-command-with-directory.md" productFolder="workers" withParameters="fauna-workers">}}

To continue with this guide:

- For *What would you like to start with*?, select `Framework Starter`.
- For *Which development framework do you want to use?*, select `Hono`.
- For, *Do you want to deploy your application?*, select `No`.

Then, move into your newly created directory:

```sh
$ cd fauna-workers
```

Update the `wrangler.toml` file to set the name for the Worker.

```toml
---
header: wrangler.toml
---
name = "fauna-workers"
```

### Add your Fauna secret key as a secret

Before developing your Worker, add your Fauna secret key as a [secret](/workers/configuration/secrets/).

There are two types of secrets for [development](/workers/configuration/secrets/#local-development-with-secrets) or [production](/workers/configuration/secrets/#secrets-on-deployed-workers).

For development, add a `.dev.vars` file on the project root and write your secret.

```plain
---
header: .dev.vars
---
FAUNA_SECRET=<YOUR SECRET>
```

For production, store your secret safely with [`wrangler secret put` command](/workers/wrangler/commands/#put-3):

```sh
---
header: Store your Fauna secret
---
$ npx wrangler secret put FAUNA_SECRET
```

When prompted, paste the Fauna server secret you obtained earlier.

The `FAUNA_SECRET` secret is now injected automatically into your Worker code at runtime.

### Install dependencies

Install [the Fauna JavaScript driver](https://github.com/fauna/fauna-js) in your newly created Worker project.

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm">}}

```sh
---
header: Install the Fauna driver
---
$ npm install fauna
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
---
header: Install the Fauna driver
---
$ yarn add fauna
```

{{</tab>}}
{{</tabs>}}

### Base inventory logic

Replace the contents of your `src/index.ts` file with the skeleton of your API:

```ts
---
header: src/index.ts
---
import { Hono } from 'hono';
import { Client, fql, ServiceError } from 'fauna';

type Bindings = {
  FAUNA_SECRET: string;
};

type Variables = {
  faunaClient: Client;
};

type Product = {
  id: string;
  serialNumber: number;
  title: string;
  weightLbs: number;
  quantity: number;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use('*', async (c, next) => {
  const faunaClient = new Client({
    secret: c.env.FAUNA_SECRET,
  });
  c.set('faunaClient', faunaClient);
  await next();
});

app.get('/', (c) => {
  return c.text('Hello World');
});

export default app;
```

This is custom middleware to initialize the Fauna client and set the instance with `c.set()` for later use in another handler:

```js
---
header: Custom middleware for the Fauna Client
---
app.use('*', async (c, next) => {
  const faunaClient = new Client({
    secret: c.env.FAUNA_SECRET,
  });
  c.set('faunaClient', faunaClient);
  await next();
});
```

You can access the `FAUNA_SECRET` environment variable from `c.env.FAUNA_SECRET`. Workers run on a [custom JavaScript runtime](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) instead of Node.js, so you cannot use `process.env` to access your environment variables.

### Create product documents

Add your first Hono handler to the `src/index.ts` file. This route accepts `POST` requests to the `/products` endpoint:

```ts
---
header: Create product documents
---
app.post('/products', async (c) => {
  const { serialNumber, title, weightLbs } = await c.req.json<Omit<Product, 'id'>>();
  const query = fql`Products.create({
    serialNumber: ${serialNumber},
    title: ${title},
    weightLbs: ${weightLbs},
    quantity: 0
  })`;
  const result = await c.var.faunaClient.query<Product>(query);
  return c.json(result.data);
});

```

{{<Aside type="warning" header="Handler order">}}

In Hono, you should place your handler below the custom middleware.
This is because middleware and handlers are executed in sequence from top to bottom.
If you place the handler first, you cannot retrieve the instance of the Fauna client using `c.var.faunaClient`.

{{</Aside>}}

This route applied an FQL query in the `fql` function that creates a new document in the **Products** collection:

```js
---
header: Create query in FQL inside JavaScript
---
fql`Products.create({
  serialNumber: ${serialNumber},
  title: ${title},
  weightLbs: ${weightLbs},
  quantity: 0
})`
```

To review what a document looks like, run the following query. In the Fauna dashboard, go to **Explorer** > Region name > Database name like a `cloudflare_rest_api` > the **SHELL** window:

```js
---
header: Create query in pure FQL
---
Products.create({
  serialNumber: "A48432348",
  title: "Gaming Console",
  weightLbs: 5,
  quantity: 0
})
```

Fauna returns the created document:

```js
---
header: Newly created document
---
{
  id: "<document_id>",
  coll: Products,
  ts: "<timestamp>",
  serialNumber: "A48432348",
  title: "Gaming Console",
  weightLbs: 5,
  quantity: 0
}
```

Examining the route you create, when the query is successful, the data newly created document is returned in the response body:

```js
---
header: Return the new document data
---
return c.json({
  productId: result.data,
});
```

### Error handling

If Fauna returns any error, an exception is raised by the client. You can catch this exception in `app.onError()`, then retrieve and respond with the result from the instance of `ServiceError`.

```ts
---
header: Handle errors
---
app.onError((e, c) => {
  if (e instanceof ServiceError) {
    return c.json(
      {
        status: e.httpStatus,
        code: e.code,
        message: e.message,
      },
      e.httpStatus
    );
  }
  console.trace(e);
  return c.text('Internal Server Error', 500);
});
```

### Retrieve product documents

Next, create a route that reads a single document from the **Products** collection.

Add the following handler to your `src/index.ts` file. This route accepts `GET` requests at the `/products/:productId` endpoint:

```ts
---
header: Retrieve product documents
---
app.get('/products/:productId', async (c) => {
  const productId = c.req.param('productId');
  const query = fql`Products.byId(${productId})`;
  const result = await c.var.faunaClient.query<Product>(query);
  return c.json(result.data);
});
```

The FQL query uses the [`byId()`](https://docs.fauna.com/fauna/current/reference/schema_entities/collection/instance-byid) method to retrieve a full document from the **Productions** collection:

```js
---
header: Retrieve a document by ID in FQL inside JavaScript
---
fql`Products.byId(productId)`
```

If the document exists, return it in the response body:

```ts
---
header: Return the document in the response body
---
return c.json(result.data);
```

If not, an error is returned.

### Delete product documents

The logic to delete product documents is similar to the logic for retrieving products. Add the following route to your `src/index.ts` file:

```ts
---
header: Delete product documents
---
app.delete('/products/:productId', async (c) => {
  const productId = c.req.param('productId');
  const query = fql`Products.byId(${productId})!.delete()`;
  const result = await c.var.faunaClient.query<Product>(query);
  return c.json(result.data);
});
```

The only difference from the previous route is that you use the [`delete()`](https://docs.fauna.com/fauna/current/reference/auth/key/delete) method, combined with the `byId()` method, to delete a document.

When the delete operation is successful, Fauna returns the deleted document and the route forwards the deleted document in the response's body. If not, an error is returned.

## Test and deploy your Worker

Before deploying your Worker, test it locally by using Wrangler's [`dev`](/workers/wrangler/commands/#dev) command:

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm" >}}

```sh
---
header: Develop your Worker
---
$ npm run dev
```

{{</tab>}}
{{<tab label="yarn" >}}

```sh
---
header: Develop your Worker
---
$ yarn dev
```

{{</tab>}}
{{</tabs>}}

Once the development server is up and running, start making HTTP requests to your Worker.

First, create a new product:

```sh
---
header: Create a new product
---
$ curl \
    --data '{"serialNumber": "H56N33834", "title": "Bluetooth Headphones", "weightLbs": 0.5}' \
    --header 'Content-Type: application/json' \
    --request POST \
    http://127.0.0.1:8787/products
```

You should receive a `200` response similar to the following:

```json
---
header: Create product response
---
{
  "productId": "<document_id>"
}
```

{{<Aside type="note">}}

Copy the `productId` value for use in the remaining test queries.

{{</Aside>}}

Next, read the document you created:

```sh
---
header: Read a document
---
$ curl \
    --header 'Content-Type: application/json' \
    --request GET \
    http://127.0.0.1:8787/products/<document_id>
```

The response should be the new document serialized to JSON:

```json
---
header: Read product response
---
{
  "coll": {
    "name": "Products"
  },
  "id": "<document_id>",
  "ts": {
    "isoString": "<timestamp>"
  },
  "serialNumber": "H56N33834",
  "title": "Bluetooth Headphones",
  "weightLbs": 0.5,
  "quantity": 0
}
```

Finally, deploy your Worker using the [`wrangler deploy`](/workers/wrangler/commands/#deploy) command:

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm" >}}

```sh
---
header: Deploy your Worker
---
$ npm run deploy
```

{{</tab>}}
{{<tab label="yarn" >}}

```sh
---
header: Deploy your Worker
---
$ yarn deploy
```

{{</tab>}}
{{</tabs>}}

This publishes the Worker to your `*.workers.dev` subdomain.

## Update inventory quantity

As the last step, implement a route to update the quantity of a product in your inventory, which is `0` by default.

This will present a problem. To calculate the total quantity of a product, you first need to determine how many items there currently are in your inventory. If you solve this in two queries, first reading the quantity and then updating it, the original data might change.

Add the following route to your `src/index.ts` file. This route responds to HTTP `PATCH` requests on the `/products/:productId/add-quantity` URL endpoint:

```ts
---
header: Update inventory quantity
---
app.patch('/products/:productId/add-quantity', async (c) => {
  const productId = c.req.param('productId');
  const { quantity } = await c.req.json<Pick<Product, 'quantity'>>();
  const query = fql`Products.byId(${productId}){ quantity : .quantity + ${quantity}}`;
  const result = await c.var.faunaClient.query<Pick<Product, 'quantity'>>(query);
  return c.json(result.data);
});
```

Examine the FQL query in more detail:

```js
---
header: Update query in FQL inside JavaScript
---
fql`Products.byId(${productId}){ quantity : .quantity + ${quantity}}`;
```

{{<Aside type="note" header="Consistency guarantees in Fauna">}}

Even if multiple Workers update this quantity from different parts of the world, Fauna guarantees the consistency of the data across all Fauna regions. This article on [consistency](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021) explains how Fauna's distributed protocol works without the need for atomic clocks.

{{</Aside>}}

Test your update route:

```sh
---
header: Update product inventory
---
$ curl \
    --data '{"quantity": 5}' \
    --header 'Content-Type: application/json' \
    --request PATCH \
    http://127.0.0.1:8787/products/<document_id>/add-quantity
```

The response should be the entire updated document with five additional items in the quantity:

```json
---
header: Update product response
---
{
  "quantity": 5
}
```

Update your Worker by deploying it to Cloudflare.

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm" >}}

```sh
---
header: Update your Worker in Cloudflare
---
$ npm run deploy
```

{{</tab>}}
{{<tab label="yarn" >}}

```sh
---
header: Update your Worker in Cloudflare
---
$ yarn deploy
```

{{</tab>}}
{{</tabs>}}

## Related resources

In this tutorial, you learned how to use Fauna with Cloudflare Workers to create a globally distributed, strongly consistent, next-generation serverless REST API that serves data quickly to a worldwide audience.

If you would like to review the full source code for this application, you can find the repository [on GitHub](https://github.com/yusukebe/fauna-workers).
