---
content_type: 📝 Tutorial
difficulty: Intermediate
pcx_content_type: tutorial
title: Create a fine-tuned OpenAI model with R2
updated: 2023-09-18
weight: 1
---

# Create a fine-tuned OpenAI model with R2

In this tutorial, you will use the [OpenAI](https://openai.com) API and [Cloudflare R2](/r2) to create a [fine-tuned model](https://platform.openai.com/docs/guides/fine-tuning). This feature in OpenAI's API allows you to derive a custom model from OpenAI's various large language models based on a set of custom instructions and example answers. These instructions and example answers are written in a document, known as a fine-tune document. This document will be stored in R2 and dynamically provided to OpenAI's APIs when creating a new fine-tune model.

In order to use this feature, you will do the following tasks:

1. Upload a fine-tune document to R2.
2. Read the R2 file and upload it to OpenAI.
3. Create a new fine-tuned model based on the document.

![Demo](/images/workers/tutorials/finetune/finetune-example.png)

To review the completed code for this application, refer to the [GitHub repository for this tutorial](https://github.com/kristianfreeman/openai-finetune-r2-example).

## Prerequisites

Before you start, make sure you have:

- A Cloudflare account. If you do not have one, [sign up](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.
- An OpenAI API key.
- A fine-tune document, structured as [JSON Lines](https://jsonlines.org/). Use the [example document](https://github.com/kristianfreeman/openai-finetune-r2-example/blob/16ca53ca9c8589834abe317487eeedb8a24c7643/example_data.jsonl) in the source code.

## 1. Create a Worker application

First, use the `c3` CLI to create a new Cloudflare Workers project.

```sh
$ npm create cloudflare@latest <PROJECT_NAME>
```

Replace `<PROJECT_NAME>` with your desired project name. You can use the "Basic Worker script" template, which will create a single code file `src/index.js` inside your project.

## 2. Upload a fine-tune document to R2

Next, upload the fine-tune document to R2. R2 is a key-value store that allows you to store and retrieve files from within your Workers application.

Create a new R2 bucket using [`wrangler r2 bucket create`](/workers/wrangler/commands/#create-2). Replace `<BUCKET_NAME>` with your desired bucket name.

Note that bucket names must be lowercase and can only contain dashes.

```sh
$ npx wrangler r2 bucket create <BUCKET_NAME>
```

Next, upload a file using [`npx wrangler r2 object put`](/workers/wrangler/commands/#put-2). `<PATH>` is the combined bucket and file path of the file you want to upload -- for example, `finetune.jsonl`. Replace `<FILE_NAME>` with the local filename of your fine-tune document.

```sh
$ npx wrangler r2 object put <PATH> -f <FILE_NAME>
```

## 3. Initialize your Worker application

In your Worker application, set up a new application using [Hono](https://hono.dev/), a lightweight framework for building Cloudflare Workers applications. Hono provides an interface for defining routes and middleware functions.

The `use` code block is a middleware function to add the OpenAI API client to the context of all routes. This middleware function allows us to access the client from within any route handler.

`onError()` defines an error handler to return any errors as a JSON response.

```javascript
---
filename: src/index.js
---
import OpenAI from 'openai'

const app = new Hono()

app.use('*', async (c, next) => {
	const openai = new OpenAI({
		apiKey: c.env.OPENAI_API_KEY,
	})
	c.set("openai", openai)
	await next()
})

app.onError((err, c) => {
  return c.text(err.message, 500)
})

export app;
```

### 4. Read R2 files and upload them to OpenAI

In this section, you will define the route and function responsible for handling file uploads.

The `GET /files` route listens for `GET` requests with a query parameter `file`, representing a filename of an uploaded fine-tune document in R2. The function uses the `createFile` function to manage the file upload process.

In `createFile`, your Worker reads the file from R2 and converts it to a `File` object. Your Worker then uses the OpenAI API to upload the file and return the response.

```javascript
---
filename: src/index.js
---
// New import added at beginning of file
import { toFile } from 'openai/uploads'

const createFile = async (c: Context, r2Object: R2ObjectBody) => {
	const openai: OpenAI = c.get("openai")

	const blob = await r2Object.blob()
	const file = await toFile(blob, r2Object.key)

	const uploadedFile = await openai.files.create({
		file,
		purpose: "fine-tune",
	})

	return uploadedFile
}

app.get('/files', async c => {
	const fileQueryParam = c.req.query("file")
	if (!fileQueryParam) return c.text("Missing file query param", 400)

	const file = await c.env.ASSETS.get(fileQueryParam)
	if (!file) return c.text("Couldn't find file", 400)

	const uploadedFile = await createFile(c, file)
	return c.json(uploadedFile)
})
```

### 5. Create fine-tuned models

This section includes the `GET /models` route and the `createModel` function. The route handles incoming requests for creating a new fine-tuned model. The function `createModel` takes care of specifying the details and initiating the fine-tuning process with OpenAI.

```javascript
---
filename: src/index.js
---
const createModel = async (c: Context, fileId: string) => {
	const openai: OpenAI = c.get("openai")

	const body = {
		training_file: fileId,
		model: "gpt-3.5-turbo",
	}

	return openai.fineTuning.jobs.create(body)
}

app.get('/models', async c => {
	const fileId = c.req.query("file_id")
	if (!fileId) return c.text("Missing file ID query param", 400)

	const model = await createModel(c, fileId)
	return c.json(model)
})
```

### 6. List all fine-tune jobs

This section describes the `GET /jobs` route and the corresponding `getJobs` function. The route provides an interface for retrieving a list of all fine-tuning jobs. The function interacts with OpenAI's API to fetch and return this information.

```javascript
---
filename: src/index.js
---
app.get('/jobs', async c => {
	const jobs = await getJobs(c)
	return c.json(jobs)
})

const getJobs = async (c: Context) => {
	const openai: OpenAI = c.get("openai")
	const resp = await openai.fineTuning.jobs.list()
	return resp.data
}
```

### 7. Deploy your application

After you have created your Worker application and added the required functions, deploy the application.

Before you deploy, you must set the `OPENAI_API_KEY` [secret](/workers/configuration/secrets/) for your application. Do this by running the [`npx wrangler secret put`](/workers/wrangler/commands/#put-3) command:

```sh
$ npx wrangler secret put OPENAI_API_KEY
```

To deploy your Worker application to the Cloudflare global network:

1. Make sure you are in your Worker project's directory, then run the [`npx wrangler deploy`](/workers/wrangler/commands/#deploy) command:

```sh
$ npx wrangler deploy
```

2. Wrangler will package and upload your code.

3. After your application is deployed, Wrangler will provide you with your Worker's URL.


### 8. View the fine-tune job status and use the model

To use your application, create a new fine-tune job by making a request to the `/files` with a `file` query param matching the filename you uploaded earlier:

```sh
$ curl https://your-worker-url.com/files?file=finetune.jsonl
```

When the file is uploaded, issue another request to `/models`, passing the `file_id` query parameter. This should match the `file_id` returned as JSON from the `/files` route:

```sh
$ curl https://your-worker-url.com/models?file_id=file-abc123
```

Finally, visit `/jobs` to see the status of your fine-tune jobs in OpenAI. Once the fine-tune job has completed, you can see the `fine_tuned_model` value, indicating a fine-tuned model has been created.

![Jobs](/images/workers/tutorials/finetune/finetune-jobs.png)

Visit the [OpenAI Playground](https://platform.openai.com/playground) in order to use your fine-tune model. Select your fine-tune model in the **Model** section on the right sidebar of the interface.

![Demo](/images/workers/tutorials/finetune/finetune-example.png)

Use it in any API requests you make to OpenAI's chat completions endpoints. For instance, in the below code example:

```javascript
openai.chat.completions.create({
  messages: [{ role: "system", content: "You are a helpful assistant." }],
  model: "ft:gpt-3.5-turbo:my-org:custom_suffix:id",
});
```

## Next steps

To build more with Workers, refer to [Tutorials](/workers/tutorials).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord](https://discord.gg/cloudflaredev) to connect with other developers and the Cloudflare team.
