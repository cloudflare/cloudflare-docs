---
weight: 2
title: Introduction to Vectorize
pcx_content_type: get-started
---

# Get started

Vectorize is Cloudflare's vector database. Vector databases allow you to use machine learning (ML) models to perform semantic search, recommendation, classification and anomaly detection tasks, as well as provide context to LLMs (Large Language Models).

This guide will instruct you through:

* Creating your first Vectorize index.
* Connecting a [Cloudflare Worker](/workers/) to your index.
* Inserting and performing a similarity search by querying your index.
## Prerequisites

To continue:

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [`npm`](https://docs.npmjs.com/getting-started).
3. Install [`Node.js`](https://nodejs.org/en/). Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](/workers/wrangler/install-and-update/) requires a Node version of `16.13.0` or later.

## 1. Create a Worker

{{<Aside type="note" header="New to Workers?">}}

Refer to [How Workers works](/workers/learning/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](/workers/get-started/guide/) to set up your first Worker.

{{</Aside>}}

You will create a new Worker as the container for both your Vectorize index and the Worker application that you will use to query your index.

Create a new project named `vectorize-tutorial` by running:

```sh
$ npm create cloudflare@latest
```

When setting up your `vectorize-tutorial` Worker, answering the questions as below:

* Your directory has been titled `vectorize-tutorial`.
* Choose `"Hello World" script` for the type of application.
* Select `yes` to using TypeScript.
* Select `yes` to using Git.
* Select `no` to deploying.

This will create a new `vectorize-tutorial` directory. Your new `vectorize-tutorial` directory will include:

* A `"Hello World"` [Worker](/workers/get-started/guide/#3-write-code) at `src/worker.ts` 
* A [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. `wrangler.toml` is how your `vectorize-tutorial` Worker will access your index.

{{<Aside type="note" heading="Familiar with Workers?">}}

If you are familiar with Cloudflare Workers, or initializing projects in a Continuous Integration (CI) environment, initialize a new project non-interactively by setting `CI=true` as an environmental variable when running `create cloudflare@latest`.

For example: `CI=true npm create cloudflare@latest vectorize-tutorial --type=simple --git --ts --deploy=false` will create a basic "Hello World" project ready to build on.

{{</Aside>}}

## 2. Create an index

{{<Aside type="note" heading="Vectorize open beta">}}

Vectorize is currently in open beta. Read [the announcement blog](https://blog.cloudflare.com/vectorize-vector-database-open-beta/) to learn more.

{{</Aside>}}

A vector database is distinct from a traditional SQL or NoSQL database: it is designed to store the vector 

To create your first Vectorize index, change into the directory you just created for your Workers project:

```sh
$ cd vectorize-tutorial
```

To create an index, you will need to use the `wrangler vectorize create` command and provide a name for the index. A good index name is:

* A combination of ASCII characters, shorter than 32 characters, and uses dashes (-) instead of spaces.
* Descriptive of the use-case and environment - for example, "production-doc-search" or "dev-recommendation-engine"
* Only used for describing the index, and is not directly referenced in code.

In addition, you will need to define both the [`dimensions`](/vectorize/learning/what-are-embeddings/) of the vectors you will store in the index, as well as the distance [`metric`](/learning/distance-metrics/) used to determine similar vectors when creating the index. **This configuration cannot be changed later**, as a vector database is configured for a fixed vector configuration.

{{<Aside type="note" heading="Wrangler version required">}}

Ensure you are using `wrangler` version `3.11.0` or later to use the `wrangler vectorize` commands.

{{</Aside>}}

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

[[[vectorize]]
binding = "VECTORIZE_INDEX" # i.e. available in your Worker on env.VECTORIZE_INDEX
index_name = "tutorial-index"
```

Specifically:

* The value (string) you set for `<BINDING_NAME>` will be used to reference this database in your Worker. In this tutorial, name your binding `DB`.
* The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_INDEX"` or `binding = "PROD_SEARCH_INDEX"` would both be valid names for the binding.
* Your binding is available in your Worker at `env.<BINDING_NAME>` and the Vectorize [client API](/vectorize/platform/client-api/) is exposed on this binding for use within your Workers application.

## 4. Insert vectors

TODO: insert vectors why / how / etc

First, go to your `vectorize-tutorial` Worker and open the `src/worker.ts` file. The `worker.ts` file is where you configure your Worker's interactions with your Vectorize index.

Clear the content of `worker.ts`. Paste the following code snippet into your `worker.ts` file. On the `env` parameter, replace `<BINDING_NAME>` with `VECTORIZE_INDEX`:

```typescript
---
filename: "src/worker.ts"
---

interface Env {
  VECTORIZE_INDEX: VectorizeIndex;
}
```

In the code above, you:

* Define a binding to your Vectorize index from your Workers code. This binding matches the `binding` value you set in `wrangler.toml` under `[[vectorize]]`
* Specify a set of example vectors that you will query against in the next step
* Insert those vectors into the index and confirm it was successful.

## 5. Query vectors (semantic search)

While in your project directory...

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

You can now visit the URL for your newly created project to query your live application! Open the URL in your web browser and you should see the following output:

```json

```

The output includes:

* similar scores
* vectors
* metadata

By finishing this tutorial, you have created a vector database, a Worker to access that database and deployed your project globally.

## Next steps

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord](https://discord.cloudflare.com/).
