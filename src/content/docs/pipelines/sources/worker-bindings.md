---
title: Worker Bindings
pcx_content_type: concept
sidebar:
  order: 1
head:
  - tag: title
    content: Worker Bindings
---

import { Render, PackageManagers } from "~/components"

You can send records to your Pipeline directly from a [Cloudflare Worker](workers/). To do so, you need to:
1. Create a Worker
2. Create a Pipeline
3. Add your Pipeline as a binding in your Workers' `wrangler.toml` file
4. Write your Worker, to send records to your Pipeline

## 1. Create a Worker
Create a Cloudflare Worker if you don't already have one. This Worker will send records to your Pipeline.

To create a Worker, run:

<PackageManagers
	type="create"
	pkg="cloudflare@latest"
	args={"pipeline-worker"}
/>

<Render
	file="c3-post-run-steps"
	product="workers"
	params={{
		one: "Hello World example",
		two: "Hello World Worker",
		three: "TypeScript",
	}}
/>

This will create a new directory, which will include both a `src/index.ts` Worker script, and a [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. Navigate into the newly created directory:

```sh
cd pipeline-worker
```

## 2. Create a Pipeline
Create a new Pipeline, if you don't already have one. Follow the instructions in the (get started guide)[pipelines/get-started] if this is your first time creating a Pipeline.

By default, Worker bindings are enabled on all Pipelines. Keep track of the name you gave your Pipeline in this stage; we'll use it in the next step.

## 3. Add a Binding
To connect your Worker to your Pipeline, you need to create a binding. [Bindings](workers/runtime-apis/bindings/) allow you to grant specific capabilities to your Worker.

Open your newly generated `wrangler.toml` configuration file and add the following:

```toml
[[pipelines]]
	binding = "MY_PIPELINE"
	queue = "<MY-PIPELINE-NAME>"
```

Replace `<MY-PIPELINE-NAME>` with the name of the Pipeline you created in step 2. Next, replace `MY_PIPELINE` with the name you want for your `binding`. The binding must be a valid JavaScript variable name. This is the variable you will use to reference this queue in your Worker.

## 4. Write your Worker
You will now configure your Worker to send records to your Pipeline. Your Worker will:

1. Take a request it receives from the browser
2. Transform the request to JSON
3. Send the resulting record to your Pipeline

In your Worker project directory, open the `src` folder and add the following to your `index.ts` file:
```ts
export interface Env {
   <MY_PIPELINE>: Pipeline<any>;
}

export default {
	async fetch(req, env, ctx): Promise<Response> {
		let record = {
			url: req.url,
			method: req.method,
			headers: Object.fromEntries(req.headers)
		}
		await env.MY_PIPELINE.send([record]);
		return new Response('Success');
	},
} satisfies ExportedHandler<Env>;
```

Replace `MY_PIPELINE` with the name of the binding you set in Step 3. If sending the record to the Pipeline fails, your Worker will return an error (raise an exception). If sending the record succeeds, it will return `Success` back with a HTTP `200` status code to the browser.

In a production application, you would likely use a [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) statement to catch the exception and handle it directly (for example, return a custom error or even retry).

### Publish your Worker
With your `wrangler.toml` file and `index.ts` file configured, you are ready to publish your producer Worker. To publish your producer Worker, run:

```sh
npx wrangler deploy
```

You should see output that resembles the below, with a `*.workers.dev` URL by default.

```
Uploaded <YOUR-WORKER-NAME> (0.76 sec)
Published <YOUR-WORKER-NAME> (0.29 sec)
  https://<YOUR-WORKER-NAME>.<YOUR-ACCOUNT>.workers.dev
```

Copy your `*.workers.dev` subdomain and paste it into a new browser tab. Refresh the page a few times to send records to your Pipeline. Your browser should return the `Success` response after sending the record to your Pipeline.

## 5. Verify in R2
Go to the R2 bucket you created in step 2 via [the Cloudflare dashboard](https://dash.cloudflare.com/). You should see a prefix for today's date. Click through, and you'll find one or more files, containing the records you sent in step 4.
