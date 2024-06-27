---
updated: 2023-09-25
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Build a Retrieval Augmented Generation (RAG) AI
weight: 2
products: [Workers, Vectorize]
tags: [AI, Hono]
---

# Build a Retrieval Augmented Generation (RAG) AI

{{<tutorial-date-info>}}

This guide will instruct you through setting up and deploying your first application with Cloudflare AI. You will build a fully-featured AI-powered application, using tools like Workers AI, Vectorize, D1, and Cloudflare Workers.

At the end of this tutorial, you will have built an AI tool that allows you to store information and query it using a Large Language Model. This pattern, known as Retrieval Augmented Generation, or RAG, is a useful project you can build by combining multiple aspects of Cloudflare's AI toolkit. You do not need to have experience working with AI tools to build this application.

{{<render file="_prereqs.md" productFolder="/workers/" >}}

You will also need access to [Vectorize](/vectorize/platform/pricing/).

## 1. Create a new Worker project

C3 (`create-cloudflare-cli`) is a command-line tool designed to help you setup and deploy Workers to Cloudflare as fast as possible.

Open a terminal window and run C3 to create your Worker project:

{{<tabs labels="npm | yarn | pnpm">}}
{{<tab label="npm" default="true">}}

```sh
$ npm create cloudflare@latest
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn create cloudflare@latest
```

{{</tab>}}
{{<tab label="pnpm">}}

```sh
$ pnpm create cloudflare@latest
```

{{</tab>}}
{{</tabs>}}

This will prompt you to install the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) package, and lead you through setup.

For this guide, set up a basic Worker:

1. Name your new Worker directory by specifying where you want to create your application.
2. Select `"Hello World" Worker` as the type of application you want to create.
3. Answer `no` to using TypeScript.

You will be asked if you would like to deploy the project to Cloudflare.

- If you choose to deploy, you will be asked to authenticate (if not logged in already), and your project will be deployed to the Cloudflare global network.
- If you choose not to deploy, go to the newly created project directory to begin writing code. Deploy your project by following the instructions in [step 4](/workers/get-started/guide/#4-deploy-your-project).

In your project directory, C3 has generated the following:

1. `wrangler.toml`: Your [Wrangler](/workers/wrangler/configuration/#sample-wranglertoml-configuration) configuration file.
2. `worker.js` (in `/src`): A minimal `'Hello World!'` Worker written in [ES module](/workers/reference/migrate-to-module-workers/) syntax.
3. `package.json`: A minimal Node dependencies configuration file.
4. `package-lock.json`: Refer to [`npm` documentation on `package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json).
5. `node_modules`: Refer to [`npm` documentation `node_modules`](https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules).

## 2. Develop with Wrangler CLI

The Workers command-line interface, [Wrangler](/workers/wrangler/install-and-update/), allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#deploy) your Workers projects. C3 will install Wrangler in projects by default.

After you have created your first Worker, run the [`wrangler dev`](/workers/wrangler/commands/#dev) command in the project directory to start a local server for developing your Worker. This will allow you to test your Worker locally during development.

```sh
$ npx wrangler dev --remote
```

{{<Aside type="note">}}

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.

If you have issues with this step or you do not have access to a browser interface, refer to the [`wrangler login`](/workers/wrangler/commands/#login) documentation for more information.

{{</Aside>}}

You will now be able to go to [http://localhost:8787](http://localhost:8787) to see your Worker running. Any changes you make to your code will trigger a rebuild, and reloading the page will show you the up-to-date output of your Worker.

## 3. Adding the AI binding

To begin using Cloudflare's AI products, you can add the `ai` block to `wrangler.toml`. This will set up a binding to Cloudflare's AI models in your code that you can use to interact with the available AI models on the platform.

This example features the [`@cf/meta/llama-3-8b-instruct` model](/workers-ai/models/llama-3-8b-instruct/), which generates text.

```toml
---
filename: wrangler.toml
---

[ai]
binding = "AI"
```

Now, find the `src/index.js` file. Inside the `fetch` handler, you can query the `LLM` binding:

```js
---
filename: src/index.js
---
export default {
	async fetch(request, env, ctx) {
    const answer = await env.AI.run(
      '@cf/meta/llama-3-8b-instruct',
      {
        messages: [
          { role: 'user', content: `What is the square root of 9?` }
        ]
      }
    )

    return new Response(JSON.stringify(answer))
	}
}
```

By querying the LLM binding, we can interact directly with the Cloudflare AI large language model directly in our code.

You can deploy your Worker using `wrangler`:

```sh
$ npx wrangler deploy
```

Making a request to your Worker will now return a response from the LLM binding.

```sh
$ curl https://example.username.workers.dev
{"response":"Answer: The square root of 9 is 3."}
```

## 4. Adding embeddings using Cloudflare D1 and Vectorize

Embeddings allow you to add additional capabilities to the language models you can use in your Cloudflare AI projects. This is done via **Vectorize**, Cloudflare's vector database.

To begin using Vectorize, create a new embeddings index using `wrangler`. This index will store vectors with 768 dimensions, and will use cosine similarity to determine which vectors are most similar to each other:

```sh
$ npx wrangler vectorize create vector-index --dimensions=768 --metric=cosine
```

Then, add the configuration details for your new Vectorize index to `wrangler.toml`:

```toml
# ... existing wrangler configuration

[[vectorize]]
binding = "VECTOR_INDEX"
index_name = "vector-index"
```

A vector index allows you to store a collection of dimensions, which are floating point numbers used to represent your data. When you want to query the vector database, you can also convert your query into dimensions. **Vectorize** is designed to efficiently determine which stored vectors are most similar to your query.

To implement the searching feature, you must set up a D1 database from Cloudflare. In D1, you can store your app's data. Then, you change this data into a vector format. When someone searches and it matches the vector, you can show them the matching data.

Create a new D1 database using `wrangler`:

```sh
$ npx wrangler d1 create database
```

Then, paste the configuration details output from the previous command into `wrangler.toml`:

```toml
# ... existing wrangler configuration

[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "database"
database_id = "abc-def-geh" # replace this with a real database_id (UUID)
```

In this application, we'll create a `notes` table in D1, which will allow us to store notes and later retrieve them in Vectorize. To create this table, run a SQL command using `wrangler d1 execute`:

```sh
$ npx wrangler d1 execute database --remote --command "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, text TEXT NOT NULL)"
```

Now, we can add a new note to our database using `wrangler d1 execute`:

```sh
$ npx wrangler d1 execute database --remote --command "INSERT INTO notes (text) VALUES ('The best pizza topping is pepperoni')"
```

## 5. Creating notes and adding them to Vectorize

To expand on your Workers function in order to handle multiple routes, we will add `hono`, a routing library for Workers. This will allow us to create a new route for adding notes to our database. Install `hono` using `npm`:

```sh
$ npm install hono
```

Then, import `hono` into your `src/index.js` file. You should also update the `fetch` handler to use `hono`:

```js
---
filename: src/index.js
---
import { Hono } from "hono"
const app = new Hono()

app.get('/', async (c) => {
  const answer = await c.env.AI.run(
    '@cf/meta/llama-3-8b-instruct',
    {
      messages: [
        { role: 'user', content: `What is the square root of 9?` }
      ]
    }
  )

  return c.json(answer)
})

export default app
```

This will establish a route at the root path `/` that is functionally equivalent to the previous version of your application. Now, we can add a new route for adding notes to our database.

This example features the [`@cf/baai/bge-base-en-v1.5` model](/workers-ai/models/bge-base-en-v1.5/), which can be used to create an embedding. Embeddings are stored and retrieved from our vector database [Vectorize](/vectorize/). The user's query is also turned into an embedding so that it can be used for searching within Vectorize.

```js
---
filename: src/index.js
---
app.post('/notes', async (c) => {
  const { text } = await c.req.json()
  if (!text) {
			return c.text("Missing text", 400);
  }

  const { results } = await c.env.DB.prepare("INSERT INTO notes (text) VALUES (?) RETURNING *")
    .bind(text)
    .run()

  const record = results.length ? results[0] : null

  if (!record) {
			return c.text("Failed to create note", 500);
	}

  const { data } = await c.env.AI.run('@cf/baai/bge-base-en-v1.5', { text: [text] })
  const values = data[0]

  if (!values) {
			return c.text("Failed to generate vector embedding", 500);
	}

  const { id } = record
  const inserted = await c.env.VECTOR_INDEX.upsert([
    {
      id: id.toString(),
      values,
    }
  ])

  return c.json({ id, text, inserted })
})
```

This function does the following things:

1. Parse the JSON body of the request to get the `text` field.
2. Insert a new row into the `notes` table in D1, and retrieve the `id` of the new row.
3. Convert the `text` into a vector using the `embeddings` model of the LLM binding.
4. Upsert the `id` and `vectors` into the `vector-index` index in Vectorize.
5. Return the `id` and `text` of the new note as JSON.

By doing this, you will create a new vector representation of the note, which can be used to retrieve the note later.

## 6. Querying Vectorize to retrieve notes

To complete your code, you can update the root path (`/`) to query Vectorize. You will convert the query into a vector, and then use the `vector-index` index to find the most similar vectors.

Since we are using cosine similarity, the vectors with the highest cosine similarity will be the most similar to the query. We can introduce a `SIMILIARITY_CUTOFF` to only return vectors that are above a certain similarity threshold. In this case, we will use a cutoff of `0.75`, but you can adjust this value to suit your needs.

We will also specify the `topK` parameter as part of the optional parameters to the `query` function. The `topK` parameter limits the number of vectors returned by the function. For instance, providing a `topK` of 1 will only return the _most similar_ vector based on the query. You may customize this for your own needs.

With the list of similar vectors, you can retrieve the notes that match the record IDs stored alongside those vectors. You can insert the text of those notes as context into the prompt for the LLM binding. We'll update the prompt to include the context, and to ask the LLM to use the context when responding.

Finally, you can query the LLM binding to get a response.

```js
---
filename: src/index.js
---
import { Hono } from 'hono'
const app = new Hono()

// Existing post route...
// app.post('/notes', async (c) => { ... })

app.get('/', async (c) => {
  const question = c.req.query('text') || "What is the square root of 9?"

  const embeddings = await c.env.AI.run('@cf/baai/bge-base-en-v1.5', { text: question })
  const vectors = embeddings.data[0]

  const SIMILARITY_CUTOFF = 0.75
  const vectorQuery = await c.env.VECTOR_INDEX.query(vectors, { topK: 1 });
  const vecIds = vectorQuery.matches
    .filter(vec => vec.score > SIMILARITY_CUTOFF)
    .map(vec => vec.id)

  let notes = []
  if (vecIds.length) {
    const query = `SELECT * FROM notes WHERE id IN (${vecIds.join(", ")})`
    const { results } = await c.env.DB.prepare(query).bind().all()
    if (results) notes = results.map(vec => vec.text)
  }

  const contextMessage = notes.length
    ? `Context:\n${notes.map(note => `- ${note}`).join("\n")}`
    : ""

  const systemPrompt = `When answering the question or responding, use the context provided, if it is provided and relevant.`

  const { response: answer } = await c.env.AI.run(
    '@cf/meta/llama-3-8b-instruct',
    {
      messages: [
        ...(notes.length ? [{ role: 'system', content: contextMessage }] : []),
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ]
    }
  )

  return c.text(answer);
})

app.onError((err, c) => {
  return c.text(err)
})

export default app

```

## 7. Deploy your project

If you did not deploy your Worker during [step 1](/workers/get-started/guide/#1-create-a-new-worker-project), deploy your Worker via Wrangler, to a `*.workers.dev` subdomain, or a [Custom Domain](/workers/configuration/routing/custom-domains/), if you have one configured. If you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

```sh
$ npx wrangler deploy
```

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

{{<Aside type="note" header="Note">}}

When pushing to your `*.workers.dev` subdomain for the first time, you may see [`523` errors](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-523-origin-is-unreachable) while DNS is propagating. These errors should resolve themselves after a minute or so.

{{</Aside>}}

## Related resources

To do more:

- Explore the reference diagram for a [Retrieval Augmented Generation (RAG) Architecture](/reference-architecture/diagrams/ai/ai-rag/).
- Review Cloudflare's [AI documentation](/workers-ai).
- Review [Tutorials](/workers/tutorials/) to build projects on Workers.
- Explore [Examples](/workers/examples/) to experiment with copy and paste Worker code.
- Understand how Workers works in [Reference](/workers/reference/).
- Learn about Workers features and functionality in [Platform](/workers/platform/).
- Set up [Wrangler](/workers/wrangler/install-and-update/) to programmatically create, test, and deploy your Worker projects.
