---
title: Store upload logs to R2 with event notifications
pcx_content_type: how-to
---

# Store upload logs to R2 with event notifications

This example provides a step-by-step guide on using event notifications to capture and store R2 upload logs in a separate bucket.

## Prerequisites

To continue, you will need:
- A subscription to Workers Paid, required for using Queues.

## 1. Set up Wrangler

To begin, install [`npm`](https://docs.npmjs.com/getting-started). Then [install Wrangler, the Developer Platform CLI](/workers/wrangler/install-and-update/).

## 2. Create R2 buckets

You will need to create two R2 buckets:
- `example-upload-bucket`: When new objects are uploaded to this bucket, our consumer Worker will write logs.
- `example-log-sink-bucket`: Upload logs from `example-upload-bucket` will be written to this bucket.

To create the buckets, run the following Wrangler commands:

```sh
$ npx wrangler r2 bucket create example-upload-bucket
$ npx wrangler r2 bucket create example-log-sink-bucket
```

## 3. Create a Queue

Event notifications will be used to capture changes to data in `example-upload-bucket`, so you'll need to create a new Queue to receive notifications:

```sh
$ npx wrangler queues create example-event-notification-queue
```

## 4. Create a Worker

Before you enable event notifications for `example-upload-bucket` you need to create a [consumer Worker](/queues/reference/how-queues-works/#create-a-consumer-worker) to receive the notifications.

Create a new Worker with the C3 (create-cloudflare-cli) CLI, a command-line tool designed to help you setup and deploy Workers to Cloudflare as fast as possible.

```sh
$ npm create cloudflare@latest 
```

C3 will then prompt you for some information on your Worker.
1. Provide a name for your consumer Worker. This is also the name of the new directory where the Worker will be created.
2. For the question “What type of application do you want to create?”, select **"Hello World" Worker**.
3. For the question “Would you like to use TypeScript? (y/n)”, select **y**.
4. For the question “Do you want to deploy your application?”, select **n**.
This will create your Worker.

## 5. Configure your Worker

In the `wrangler.toml` file, add a Queue consumer and R2 bucket binding. This will register your Worker as a consumer of your future event notifications and allow us to access your R2 bucket.

```toml
---
filename: wrangler.toml
---
name = "event-notification-writer"
main = "src/index.ts"
compatibility_date = "2024-03-29"
compatibility_flags = ["nodejs_compat"]

[[queues.consumers]]
queue = "example-event-notification-queue"
max_batch_size = 100
max_batch_timeout = 5

[[r2_buckets]]
binding = "LOG_SINK"
bucket_name = "example-log-sink-bucket"
```

## 6. Write event notification messages to R2

Add a `queue` handler to `src/index.ts` to handle writing batches of notifications to our log sink bucket (you don’t need a fetch handler):

```ts
---
filename: index.ts
---
export interface Env {
    LOG_SINK: R2Bucket;
}

export default {
	async queue(batch: MessageBatch<any>, env: Env): Promise<void> {
		const batchId = new Date().toISOString().replace(/[:.]/g, '-');
		const fileName = `upload-logs-${batchId}.json`;

		const logRecords = batch.messages.map(({ timestamp, body }) => ({
			timestamp: timestamp,
			action: body.action,
			key: body.object.key,
			bucket: body.bucket
		  }));
	
		// Serialize the entire batch of messages to JSON
		const fileContent = new TextEncoder().encode(JSON.stringify(logRecords));

		// Write the batch of messages to R2
		await env.LOG_SINK.put(fileName, fileContent, {
			httpMetadata: {
			  contentType: "application/json"
			}
		});
	}
};
```

## 7. Deploy your Worker

To deploy your consumer Worker, run the following command:

```sh
$ npx wrangler deploy
```

## 8. Enable event notifications

Now that you have your consumer Worker ready to handle incoming event notification messages, you need to enable event notifications for `example-upload-bucket`:

```sh
$ npx wrangler r2 bucket notification create example-upload-bucket --event-type object-create --queue example-event-notification-queue
```

## 9. Done, time to test

That’s it! Now you can test the full end to end flow by uploading an object to `example-upload-bucket` in the dashboard. After you’ve uploaded an object, logs will appear in `example-log-sink-bucket` in a few seconds.
