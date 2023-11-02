---
weight: 2
title: Introduction to Vectorize
pcx_content_type: get-started
---

# Get started

{{<render file="_vectorize-beta.md">}}

Vectorize is Cloudflare's vector database. Vector databases allow you to use machine learning (ML) models to perform semantic search, recommendation, classification and anomaly detection tasks, as well as provide context to LLMs (Large Language Models).

This guide will instruct you through:

- Creating your first Vectorize index.
- Connecting a [Cloudflare Worker](/workers/) to your index.
- Inserting and performing a similarity search by querying your index.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [`npm`](https://docs.npmjs.com/getting-started).
3. Install [`Node.js`](https://nodejs.org/en/). Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](/workers/wrangler/install-and-update/) requires a Node version of `16.13.0` or later.

## 1. Create a Worker

{{<Aside type="note" header="New to Workers?">}}

Refer to [How Workers works](/workers/learning/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](/workers/get-started/guide/) to set up your first Worker.

{{</Aside>}}

You will create a new project that will contain a Worker script, which will act as the client application for your Vectorize index.

Create a new project named `vectorize-tutorial` by running:

```sh
$ npm create cloudflare@latest
```

When setting up your `vectorize-tutorial` Worker, answering the questions as below:

- Enter `vectorize-tutorial` as the directory for where you want to create your application.
- Choose `"Hello World Worker"` for the type of application.
- Select `yes` to using TypeScript.
- Select `yes` to using Git.
- Select `no` to deploying.

This will create a new `vectorize-tutorial` directory. Your new `vectorize-tutorial` directory will include:

- A `"Hello World"` [Worker](/workers/get-started/guide/#3-write-code) at `src/index.ts`
- A [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. `wrangler.toml` is how your `vectorize-tutorial` Worker will access your index.

{{<Aside type="note" heading="Familiar with Workers?">}}

If you are familiar with Cloudflare Workers, or initializing projects in a Continuous Integration (CI) environment, initialize a new project non-interactively by setting `CI=true` as an environmental variable when running `create cloudflare@latest`.

For example: `CI=true npm create cloudflare@latest vectorize-tutorial --type=simple --git --ts --deploy=false` will create a basic "Hello World" project ready to build on.

{{</Aside>}}

## 2. Create an index

{{<Aside type="note" heading="Vectorize open beta">}}

Vectorize is currently in open beta. Read [the announcement blog](https://blog.cloudflare.com/vectorize-vector-database-open-beta/) to learn more.

{{</Aside>}}

A vector database is distinct from a traditional SQL or NoSQL database: it is designed to store vector embeddings, which are representations of data, but not the original data itself.

To create your first Vectorize index, change into the directory you just created for your Workers project:

```sh
$ cd vectorize-tutorial
```

To create an index, you will need to use the `wrangler vectorize create` command and provide a name for the index. A good index name is:

- A combination of ASCII characters, shorter than 32 characters, and uses dashes (-) instead of spaces.
- Descriptive of the use-case and environment - for example, "production-doc-search" or "dev-recommendation-engine"
- Only used for describing the index, and is not directly referenced in code.

In addition, you will need to define both the `dimensions` of the vectors you will store in the index, as well as the distance `metric` used to determine similar vectors when creating the index. **This configuration cannot be changed later**, as a vector database is configured for a fixed vector configuration.

{{<render file="_vectorize-wrangler-version.md">}}

Run the following `wrangler vectorize` command:

```sh
$ npx wrangler vectorize create tutorial-index --dimensions=3 --metric=cosine

✅ Successfully created index 'tutorial-index'

[[vectorize]]
binding = "VECTORIZE_INDEX" # i.e. available in your Worker on env.VECTORIZE_INDEX
index_name = "tutorial-index"
```

This will create a new vector database, and output the [binding](/workers/configuration/bindings/) configuration needed in the next step.

## 3. Bind your Worker to your index

You must create a binding for your Worker to connect to your Vectorize index. [Bindings](/workers/configuration/bindings/) allow your Workers to access resources, like Vectorize or R2, from Cloudflare Workers. You create bindings by updating your `wrangler.toml` file.

To bind your index to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[[vectorize]]
binding = "VECTORIZE_INDEX" # i.e. available in your Worker on env.VECTORIZE_INDEX
index_name = "tutorial-index"
```

Specifically:

- The value (string) you set for `<BINDING_NAME>` will be used to reference this database in your Worker. In this tutorial, name your binding `VECTORIZE_INDEX`.
- The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_INDEX"` or `binding = "PROD_SEARCH_INDEX"` would both be valid names for the binding.
- Your binding is available in your Worker at `env.<BINDING_NAME>` and the Vectorize [client API](/vectorize/platform/client-api/) is exposed on this binding for use within your Workers application.

## 4. Insert vectors

Before we can query a vector database, we need to insert vectors for it to query against. In practice, these vectors would be generated from data (text, images, etc) we pass to a machine learning model, but we're going to define some static vectors to illustrate how vector search works on its own.

First, go to your `vectorize-tutorial` Worker and open the `src/index.ts` file. The `index.ts` file is where you configure your Worker's interactions with your Vectorize index.

Clear the content of `index.ts`. Paste the following code snippet into your `index.ts` file. On the `env` parameter, replace `<BINDING_NAME>` with `VECTORIZE_INDEX`:

```typescript
---
filename: src/index.ts
---

export interface Env {
	// This makes our vector index methods available on env.VECTORIZE_INDEX.*
	// e.g. env.VECTORIZE_INDEX.insert() or .query()
	VECTORIZE_INDEX: VectorizeIndex;
}

// Sample vectors: 3 dimensions wide.
//
// Vectors from a machine-learning model are typically ~100 to 1536 dimensions
// wide (or wider still).
const sampleVectors: Array<VectorizeVector> = [
	{ id: '1', values: [32.4, 74.1, 3.2], metadata: { url: '/products/sku/13913913' } },
	{ id: '2', values: [15.1, 19.2, 15.8], metadata: { url: '/products/sku/10148191' } },
	{ id: '3', values: [0.16, 1.2, 3.8], metadata: { url: '/products/sku/97913813' } },
	{ id: '4', values: [75.1, 67.1, 29.9], metadata: { url: '/products/sku/418313' } },
	{ id: '5', values: [58.8, 6.7, 3.4], metadata: { url: '/products/sku/55519183' } },
];

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let path = new URL(request.url).pathname;
		if (path.startsWith("/favicon")) {
			return new Response('', { status: 404 });
		}

		// We only need to insert vectors into our index once
		if (path.startsWith("/insert")) {
			// Insert some sample vectors into our index
			// In a real application, these vectors would be the output of a machine learning (ML) model,
			// such as Workers AI, OpenAI, or Cohere.
			const inserted = await env.VECTORIZE_INDEX.insert(sampleVectors);

			// Return the number of IDs we successfully inserted
			return Response.json(inserted);
		}

		return Response.json({text: "nothing to do... yet"}, { status: 404 })
	}
};
```

In the code above, you:

- Define a binding to your Vectorize index from your Workers code. This binding matches the `binding` value you set in `wrangler.toml` under `[[vectorize]]`
- Specify a set of example vectors that you will query against in the next step
- Insert those vectors into the index and confirm it was successful.

In the next step, you will expand the Worker to query the index and the vectors we insert.

## 5. Query vectors

In this step, we will take a vector representing an incoming query and use it to search our index.

First, go to your `vectorize-tutorial` Worker and open the `src/index.ts` file. The `index.ts` file is where you configure your Worker's interactions with your Vectorize index.

Clear the content of `index.ts`. Paste the following code snippet into your `index.ts` file. On the `env` parameter, replace `<BINDING_NAME>` with `VECTORIZE_INDEX`:

```typescript
---
filename: src/index.ts
---
export interface Env {
	// This makes our vector index methods available on env.VECTORIZE_INDEX.*
	// e.g. env.VECTORIZE_INDEX.insert() or .query()
	VECTORIZE_INDEX: VectorizeIndex;
}

// Sample vectors: 3 dimensions wide.
//
// Vectors from a machine-learning model are typically ~100 to 1536 dimensions
// wide (or wider still).
const sampleVectors: Array<VectorizeVector> = [
	{ id: '1', values: [32.4, 74.1, 3.2], metadata: { url: '/products/sku/13913913' } },
	{ id: '2', values: [15.1, 19.2, 15.8], metadata: { url: '/products/sku/10148191' } },
	{ id: '3', values: [0.16, 1.2, 3.8], metadata: { url: '/products/sku/97913813' } },
	{ id: '4', values: [75.1, 67.1, 29.9], metadata: { url: '/products/sku/418313' } },
	{ id: '5', values: [58.8, 6.7, 3.4], metadata: { url: '/products/sku/55519183' } },
];

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let path = new URL(request.url).pathname;
		if (path.startsWith("/favicon")) {
			return new Response('', { status: 404 });
		}

		// We only need to insert vectors into our index once
		if (path.startsWith("/insert")) {
			// Insert some sample vectors into our index
			// In a real application, these vectors would be the output of a machine learning (ML) model,
			// such as Workers AI, OpenAI, or Cohere.
			let inserted = await env.VECTORIZE_INDEX.insert(sampleVectors);

			// Return the number of IDs we successfully inserted
			return Response.json(inserted);
		}

		// return Response.json({text: "nothing to do... yet"}, { status: 404 })

		// In a real application, we would take a user query - e.g. "what is a
		// vector database" - and transform it into a vector emebedding first.
		//
		// In this example, we're going to construct a simple vector that should
		// match vector id #5
		const queryVector: Array<number> = [54.8, 5.5, 3.1];

		// Query our index and return the three (topK = 3) most similar vector
		// IDs with their similarity score.
		//
		// By default, vector values are not returned, as in many cases the
		// vectorId and scores are sufficient to map the vector back to the
		// original content it represents.
		const matches = await env.VECTORIZE_INDEX.query(queryVector, { topK: 3, returnValues: true, returnMetadata: true });

		return Response.json({
			// This will return the closest vectors: we'll see that the vector
			// with id = 5 has the highest score (closest to 1.0) as the
			// distance between it and our query vector is the smallest.
			// We return the full set of matches so we can see the possible scores.
			matches: matches,
		});
	},
};
```

## 6. Deploy your Worker

Before deploying your Worker globally, log in with your Cloudflare account by running:

```sh
$ wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

From here, you can deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

```sh
$ npx wrangler deploy
# Outputs: https://vectorize-tutorial.<YOUR_SUBDOMAIN>.workers.dev
```

## 7. Query your index

You can now visit the URL for your newly created project to insert vectors and then query them. With the URL for your deployed Worker - e.g. `https://vectorize-tutorial.<YOUR_SUBDOMAIN>.workers.dev/` - open your browser and:

1. Insert our vectors first by visiting `/insert` — this should return the below:

```json
// https://vectorize-tutorial.<YOUR_SUBDOMAIN>.workers.dev/insert
{ "count": 5, "ids": [1, 2, 3, 4, 5] }
```

Subsequent visits will return `count:0` as you cannot `.insert()` the same vector IDs.

2. Query our index - we expect our query vector of `[54.8, 5.5, 3.1]` to be closest to vector ID `5` - by visiting the root path of `/` . This will return the three (`topK: 3`) closest matches, as well as their vector values and metadata.

You will see that `vectorId: 5` has a `score` of `0.999909486`: because we're using `cosine` as our distance metric, the closer the score to `1.0`, the closer our vectors are.

```json
// https://vectorize-tutorial.<YOUR_SUBDOMAIN>.workers.dev/
{
  "matches": {
    "count": 3,
    "matches": [
      {
        "id": "5",
        "score": 0.999909486,
        "values": [58.79999923706055, 6.699999809265137, 3.4000000953674316],
        "metadata": {
          "url": "/products/sku/55519183"
        }
      },
      {
        "id": "4",
        "score": 0.789848214,
        "values": [75.0999984741211, 67.0999984741211, 29.899999618530273],
        "metadata": {
          "url": "/products/sku/418313"
        }
      },
      {
        "id": "2",
        "score": 0.611976262,
        "values": [15.100000381469727, 19.200000762939453, 15.800000190734863],
        "metadata": {
          "url": "/products/sku/10148191"
        }
      }
    ]
  }
}

```

From here, we could experiment by passing a different `queryVector` and observing the results: the matches and the `score` should change based on the change in distance between the query vector and the vectors in our index.

In a real-world application, the `queryVector` would be the vector embedding representation of a query from a user or system, and our `sampleVectors` would be generated from real content. To build on this example, see the [vector search tutorial](/vectorize/get-started/embeddings/) that combines Workers AI + Vectorize to build an end-to-end application with Workers.

## Next steps

- [Build an end-to-end vector search application](/vectorize/get-started/embeddings/) using Workers AI and Vectorize.
- Learn more about [how vector databases work](/vectorize/learning/what-is-a-vector-database/)
- See [examples](/vectorize/platform/client-api/) on how to use the Vectorize API from Cloudflare Workers
