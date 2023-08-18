---
updated: 2021-11-04
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Create a serverless, globally distributed REST API with Fauna
layout: single
---

# Create a serverless, globally distributed REST API with Fauna

{{<render file="_tutorials-before-you-start.md">}}

## Overview

In this tutorial, you will  learn how to store and retrieve data in your Cloudflare Workers applications by building a REST API that manages an inventory catalog using [Fauna][fauna] as its data layer.

## Learning goals

- How to store and retrieve data from Fauna in Workers.
- How to use Wrangler to store secrets securely.
- How to use [Hono][hono] as a web framework for your Workers.

Building with Fauna, Workers, and Hono enables you to create a globally distributed, strongly consistent, fully serverless REST API in a single repository. You can develop your application as if it were a monolith but gain the resilience and reduced latency of a distributed application running at the edge.

Fauna is a document-based database with a flexible schema. This allows you to define the structure of your data – whatever it may be – and store documents that adhere to that structure. In this tutorial, you will build a product inventory, where each `product` document must contain the following properties:

- **title** - A human-friendly string that represents the title or name of a product.
- **serialNumber** - A machine-friendly string that uniquely identifies the product.
- **weightLbs** - A floating point number that represents the weight in pounds of the product.
- **quantity** A non-negative integer that represents how many items of a particular product there are in the inventory.

Documents are stored in the **Products** [collection][fauna-collections]. Collections in document databases are groups of related documents.

For this tutorial, all API endpoints are public. However, Fauna also offers multiple avenues for securing endpoints and collections. Refer to [Choosing an authentication strategy with Fauna][fauna-choosing-authentication-strategy] for more information on authenticating users to your applications with Fauna.

## Set up Fauna

### Create your database

Open the [Fauna dashboard][fauna-dashboard] in your browser and log in to your Fauna account.

{{<Aside type="note" header="Fauna Account">}}

If you do not have a Fauna account, you can [sign up](https://dashboard.fauna.com/signup?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021) and deploy this template using the free tier.

{{</Aside>}}

In the Fauna dashboard:

1. Select **Create database**.
2. Provide a valid name.
3. Select the **Classic** [Region Group][fauna-region-groups].
4. Select **Create**.

### Create the products catalog

You will now create a collection to store your inventory documents.

1. Go to **Collections** in the Fauna dashboard. 
2. Select **New Collection**.
3. In the **Collection Name** field, name your collection **Products** and select **Save**.

### Create a server key

You must create a key to connect to the database from your Worker.

1. Go to **Security** in the Fauna dashboard. 
2. Select **New Key** to create a new key.
3. In the **Role** dropdown, choose _Server_.

The Fauna dashboard displays the key's secret. Copy and save this server key to use in a later step.

{{<Aside type="warning" header="Protect your keys">}}

Server keys can read and write all documents in all collections and can call all [user-defined functions](https://docs.fauna.com/fauna/current/learn/understanding/user_defined_functions?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021) (UDFs). Protect server keys and do not commit them to source control repositories.

{{</Aside>}}

## Manage your inventory with Workers

### Create a new Worker project

Create a new project by using [`create-cloudflare` CLI](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare).

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm" >}}

```sh
---
header: Create a new project
---
$ npm create cloudflare@latest
```

{{</tab>}}
{{<tab label="yarn" >}}

```sh
---
header: Create a new project
---
$ yarn create cloudflare
```

{{</tab>}}
{{</tabs>}}

To continue with this guide:

1. Give your new Worker application a name.
2. Select `"Hello World" Worker` for the type of application.
3. Select `Yes` to using TypeScript.
4. Select `Yes` to deploying your application.

{{<Aside type="note" header="Deploy before storing secrets">}}

You must deploy a version of your project before storing your server secret in the next step.

{{</Aside>}}

### Add your Fauna secret as an environment variable

After creating and deploying your Worker, store your Fauna client [secret](/workers/wrangler/commands/#put-3) safely with the following command:

```sh
---
header: Store your Fauna secret
---
$ wrangler secret put FAUNA_SECRET
```

When prompted, paste the Fauna server secret you obtained earlier.

The `FAUNA_SECRET` environment variable is now injected automatically into your Worker code at runtime.

### Install dependencies

First, install the Fauna JavaScript driver.

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm">}}

```sh
---
header: Install the Fauna driver
---
$ npm install faunadb
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
---
header: Install the Fauna driver
---
$ yarn add faunadb
```

{{</tab>}}
{{</tabs>}}

Next, install the [Hono][hono] framework for Cloudflare Workers.

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm">}}

```sh
---
header: Install the Hono
---
$ npm install hono
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
---
header: Install the Hono
---
$ yarn add hono
```

{{</tab>}}
{{</tabs>}}

### JavaScript utility functions

Create a `src/utils.ts` file in the project folder and paste the following code:

```ts
---
header: src/utils.ts
---
import { RequestResult } from 'faunadb';

export function getFaunaError(error: unknown) {
  if (error && typeof error === 'object' && 'requestResult' in error) {
    if (error.requestResult instanceof RequestResult) {
      const responseContent = error.requestResult.responseContent;
      const { code, description } = responseContent.errors[0];
      let status;

      switch (code) {
        case 'unauthorized':
        case 'authentication failed':
          status = 401;
          break;
        case 'permission denied':
          status = 403;
          break;
        case 'instance not found':
          status = 404;
          break;
        case 'instance not unique':
        case 'contended transaction':
          status = 409;
          break;
        default:
          status = 500;
      }

      return { code, description, status };
    }
  }
}
```

The `getFaunaError()` function extracts the [HTTP response status codes][http-status-codes] and description for the most common errors returned by Fauna.

### Base inventory logic

Replace the contents of your `src/worker.ts` file with the skeleton of your API:

```ts
---
header: src/worker.ts (skeleton)
---
import { Hono } from 'hono';
import faunadb from 'faunadb';
import { getFaunaError } from './utils';

const { Create, Collection, Get, Ref, Delete, Add, Select, Let, Var, Update } =
  faunadb.query;

type Bindings = {
  FAUNA_SECRET: string;
};

type Variables = {
  faunaClient: faunadb.Client;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use('*', async (c, next) => {
  const faunaClient = new faunadb.Client({
    secret: c.env.FAUNA_SECRET,
  });
  c.set('faunaClient', faunaClient);
  await next();
});

app.get('/', (c) => {
  return c.text('Hello World!');
});

export default app;

```

This is a custom middleware to initialize the Fauna client and set the instance with `c.set()` for later use in another handler:

```js
---
header: Custom middleware for the Fauna Client
---
app.use('*', async (c, next) => {
 const faunaClient = new faunadb.Client({
  secret: c.env.FAUNA_SECRET,
 });
 c.set('faunaClient', faunaClient);
 await next();
});
```

You can access `FAUNA_SECRET` environment variables from `c.env.FAUNA_SECRET`. Workers run on a custom JavaScript runtime instead of Node.js, so you can't use `process.env` to access your environment variables.

### Create product documents

Add your first Hono handler to the `src/worker.ts` file. This route accepts `POST` requests to the `/products` endpoint:

```ts
---
header: Create product documents
---
app.post('/products', async (c) => {
  const { serialNumber, title, weightLbs } = await c.req.json();
  const result = await c.get('faunaClient').query<{
    ref: {
      id: string;
    };
  }>(
    Create(Collection('Products'), {
      data: {
        serialNumber,
        title,
        weightLbs,
        quantity: 0,
      },
    })
  );
  return c.json({
    productId: result.ref.id,
  });
});
```

This route applies an FQL query written in JavaScript that creates a new document in the **Products** collection:

```js
---
header: Create query in FQL inside JavaScript
---
Create(
  Collection('Products'),
  {
    data: {
      serialNumber,
      title,
      weightLbs,
      quantity: 0
    }
  }
)
```

To review what a document looks like, navigate to the **Shell** tab in the Fauna dashboard and run the following query:

```js
---
header: Create query in pure FQL
---
Create(
  Collection('Products'),
  {
    data: {
      serialNumber: "A48432348",
      title: "Gaming Console",
      weightLbs: 5,
      quantity: 0
    }
  }
)
```

Fauna returns the created document:

```js
---
header: Newly created document
---
{
  ref: Ref(Collection("Products"), "<document_id>"),
  ts: <timestamp>,
  data: {
    serialNumber: "A48432348",
    title: "Gaming Console",
    weightLbs: 5,
    quantity: 0
  }
}
```

- **ref** - A [reference][fql-reference] to the newly created document.
- **ts** - The timestamp of the new document creation in microseconds.
- **data** - The actual content of the document.

Examining the route you create, when the query is successful, the ID of the newly created document is returned in the response body:

```js
---
header: Return the new document ID
---
return c.json({
  productId: result.ref.id,
});
```

### Error handling

If Fauna returns any error, an exception is raised by the client. You catch that exception in `app.onError()` and respond with the result from the `getFaunaError()` utility function.

```ts
---
header: Handle errors
---
app.onError((e, c) => {
  const faunaError = getFaunaError(e);
  if (faunaError) {
    return c.json(faunaError, faunaError?.status);
  }
  return c.text('Internal Server Error', 500);
});
```

### Retrieve product documents

Next, create a route that reads a single document from the **Products** collection.

Add the following handler to your `src/worker.ts` file. This route accepts `GET` requests at the `/products/:productId` endpoint:

```ts
---
header: Retrieve product documents
---
app.get('/products/:productId', async (c) => {
  const productId = c.req.param('productId');
  const result = await c
    .get('faunaClient')
    .query(Get(Ref(Collection('Products'), productId)));
  return c.json(result);
});
```

The FQL query uses the [Get][fql-get] function to retrieve a full document from a document reference:

```js
---
header: Retrieve a document by ID in FQL inside JavaScript
---
Get(Ref(Collection('Products'), productId))
```

If the document exists, return it in the response body:

```ts
---
header: Return the document in the response body
---
return c.json(result);
```

If not, an error is returned.

### Delete product documents

The logic to delete product documents is similar to the logic for retrieving products. Add the following route to your `src/worker.ts` file:

```ts
---
header: Delete product documents
---
app.delete('/products/:productId', async (c) => {
  const productId = c.req.param('productId');
  const result = await c
    .get('faunaClient')
    .query(Delete(Ref(Collection('Products'), productId)));
  return c.json(result);
});
```

The only difference with the previous route is that you use the [Delete][fql-delete] function to delete a document by providing its reference.

When the delete operation is successful, Fauna returns the deleted document and the route forwards the deleted document in the response's body. If not, an error is returned.

## Test and deploy your Worker

Before deploying your Worker, test it locally by using Wrangler's [dev][wrangler-dev] command.
You can execute it with NPM or Yarn:

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm" >}}

```sh
---
header: Deploy your Worker
---
$ npm run start
```

{{</tab>}}
{{<tab label="yarn" >}}

```sh
---
header: Deploy your Worker
---
$ yarn start
```

{{</tab>}}
{{</tabs>}}

Once the development server is up and running, you can start making HTTP requests to your Worker.

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
  "ref": {"@ref":{"id":"<document_id>","collection":{"@ref":{"id":"Products","collection":{"@ref":{"id":"collections"}}}}}},"ts":1617887459975000,
  "data": {
    "serialNumber": "H56N33834",
    "title": "Bluetooth Headphones",
    "weightLbs":0.5,
    "quantity":0
  }
}
```

Finally, deploy your Worker using the [`wrangler deploy`][wrangler-publish] command.
You can execute this with NPM or Yarn:

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

## Updating inventory quantity

As the last step, implement a route to update the quantity of a product in your inventory, which is `0` by default.

This will present a problem. To calculate the total quantity of a product, you first need to determine how many items there currently are in your inventory. If you solve this in two queries, first reading the quantity and then updating it, the original data might change.

Fauna solves this by reading and updating the quantity of a product in a single FQL transaction. It is important to mention that all FQL queries are, in fact, transactions. If anything fails, all changes are reverted back thanks to Fauna's ACID properties.

Add the following route to your `src/worker.ts` file. This route responds to HTTP `PATCH` requests on the `/products/:productId/add-quantity` URL endpoint:

```ts
---
header: Update inventory quantity
---
app.patch('/products/:productId/add-quantity', async (c) => {
  const productId = c.req.param('productId');
  const { quantity } = await c.req.json();
  const result = await c.get('faunaClient').query(
    Let(
      {
        productRef: Ref(Collection('Products'), productId),
        productDocument: Get(Var('productRef')),
        currentQuantity: Select(['data', 'quantity'], Var('productDocument')),
      },
      Update(Var('productRef'), {
        data: {
          quantity: Add(Var('currentQuantity'), quantity),
        },
      })
    )
  );
  return c.json(result);
});
```

Examine the FQL query in more detail:

```js
---
header: Update query in FQL inside JavaScript
---
Let(
  {
    productRef: Ref(Collection('Products'), productId),
    productDocument: Get(Var('productRef')),
    currentQuantity: Select(['data', 'quantity'], Var('productDocument'))
  },
  Update(
    Var('productRef'),
    {
      data: {
        quantity: Add(
          Var('currentQuantity'),
          quantity
        )
      }
    }
  )
)
```

This query uses the FQL [Let][fql-let] function to set some variables for use later in the query:

- **productRef** - The **Ref** of the document to update.
- **productDocument** - The full product document that will be updated.
- **currentQuantity** - The currently available quantity of the product. You extract the property by using the FQL [Select][fql-select] function.

You can access the values of variables created by `Let` in any subsequent FQL expressions by using the FQL [Var][fql-var] function.

After declaring the variables, `Let` accepts an FQL expression as a second parameter. This expression is where you update your document:

```js
---
header: Update a product document
---
Update(
  Var('productRef'),
  {
    data: {
      quantity: Add(
        Var('currentQuantity'),
        quantity
      )
    }
  }
)
```

The FQL [Update][fql-update] function only updates the provided properties of a document. In this example, only the `quantity` property is updated.

Finally, this query calculates the new total quantity by adding the value of `quantity` to `currentQuantity` using the FQL [Add][fql-add] function.

{{<Aside type="note" header="Consistency guarantees in Fauna">}}

Even if multiple Workers update this quantity from different parts of the world, Fauna guarantees the consistency of the data across all Fauna regions. [This article](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021) explains how Fauna's distributed protocol works without the need for atomic clocks.

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
  "ref": {"@ref":{"id":"<document_id>","collection":{"@ref":{"id":"Products","collection":{"@ref":{"id":"collections"}}}}}},
  "ts": 1617890383200000,
  "data": {
    "serialNumber": "H56N33834",
    "title": "Bluetooth Headphones",
    "weightLbs": 0.5,
    "quantity": 5
  }
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

## Complete code

If you would like to review the full source code for this application, you can find the repository [on GitHub](https://github.com/yusukebe/fauna-workers).

## Clean up

To remove the resources you create in this tutorial, delete your Worker in the Cloudflare dashboard > **Workers & Pages** > select your Worker > **Manage Service** > **Delete**:

![Delete your Worker by following the steps above](/images/workers/tutorials/fauna/delete-worker.png)

Finally, delete your Fauna database from its settings in the Fauna dashboard:

![Delete your Fauna database in the Fauna dashboard](/images/workers/tutorials/fauna/delete-database.png)

## Related resources

In this tutorial, you learned how to use Fauna with Cloudflare Workers to create a globally distributed, strongly consistent, next-generation serverless REST API that serves data quickly to a worldwide audience.

To build your own production-ready applications, refer to the [Fauna Workers quickstart](https://github.com/fauna-labs/fauna-workers). The quickstart implements suggested practices like a least-privilege security model and business logic encapsulation in user-defined functions.

If you would like to speak directly with a Fauna expert about building your applications on Cloudflare Workers with Fauna, [contact][fauna-contact] Fauna.

[fauna]: https://fauna.com/?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fauna-choosing-authentication-strategy]: https://fauna.com/blog/choosing-an-authentication-strategy-with-fauna?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fauna-collections]: https://docs.fauna.com/fauna/current/learn/introduction/key_concepts#collections?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fauna-contact]: https://www2.fauna.com/cloudflare-contact?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fauna-dashboard]: https://dashboard.fauna.com/?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fauna-region-groups]: https://docs.fauna.com/fauna/current/api/fql/region_groups#how-to-use-region-groups?utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fql-add]: https://docs.fauna.com/fauna/current/api/fql/functions/add?lang=shell&utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fql-delete]: https://docs.fauna.com/fauna/current/api/fql/functions/delete?lang=shell&utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fql-get]: https://docs.fauna.com/fauna/current/api/fql/functions/get?lang=shell&utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fql-let]: https://docs.fauna.com/fauna/current/api/fql/functions/let?lang=shell&utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fql-reference]: https://docs.fauna.com/fauna/current/api/fql/functions/ref?lang=shell&utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fql-select]: https://docs.fauna.com/fauna/current/api/fql/functions/select?lang=shell&utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fql-update]: https://docs.fauna.com/fauna/current/api/fql/functions/update?lang=shell&utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[fql-var]: https://docs.fauna.com/fauna/current/api/fql/functions/var?lang=shell&utm_source=Cloudflare&utm_medium=referral&utm_campaign=Q4_CF_2021
[hono]: https://hono.dev/
[http-status-codes]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
[wrangler-dev]: /workers/wrangler/commands/#dev
[wrangler-publish]: /workers/wrangler/commands/#publish
