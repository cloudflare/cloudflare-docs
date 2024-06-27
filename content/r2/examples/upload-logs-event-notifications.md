---
title: Log and store upload events in R2 with event notifications
pcx_content_type: tutorial
content_type: 📝 Tutorial
products: [Queues, Workers]
difficulty: Beginner
updated: 2024-04-02
---

# Log and store upload events in R2 with event notifications

{{<tutorial-date-info>}}

This example provides a step-by-step guide on using [event notifications](/r2/buckets/event-notifications/) to capture and store R2 upload logs in a separate bucket.

## Prerequisites

To continue, you will need:
- A subscription to [Workers Paid](/workers/platform/pricing/#workers), required for using queues.

## 1. Install Wrangler

To begin, refer to [Install/Update Wrangler](/workers/wrangler/install-and-update/#install-wrangler) to install Wrangler, the Cloudflare Developer Platform CLI.

## 2. Create R2 buckets

You will need to create two R2 buckets:
- `example-upload-bucket`: When new objects are uploaded to this bucket, your [consumer Worker](/queues/get-started/#5-create-your-consumer-worker) will write logs.
- `example-log-sink-bucket`: Upload logs from `example-upload-bucket` will be written to this bucket.

To create the buckets, run the following Wrangler commands:

```sh
$ npx wrangler r2 bucket create example-upload-bucket
$ npx wrangler r2 bucket create example-log-sink-bucket
```

## 3. Create a queue

{{<Aside type="note">}}

You will need a [Workers Paid plan](/workers/platform/pricing/) to create and use Queues and Cloudflare Workers to consume event notifications.

{{</Aside>}}

Event notifications capture changes to data in `example-upload-bucket`. You will need to create a new queue to receive notifications:

```sh
$ npx wrangler queues create example-event-notification-queue
```

## 4. Create a Worker

Before you enable event notifications for `example-upload-bucket`, you need to create a [consumer Worker](/queues/reference/how-queues-works/#create-a-consumer-worker) to receive the notifications.

Create a new Worker with C3 (`create-cloudflare` CLI). [C3](/pages/get-started/c3/) is a command-line tool designed to help you set up and deploy new applications, including Workers, to Cloudflare.

{{<render file="/_c3-run-command.md" productFolder="/workers/" >}}

C3 will then prompt you for some information on your Worker.
1. Provide a name for your consumer Worker. This is also the name of the new directory where the Worker will be created.
2. For the question “What type of application do you want to create?”, select **"Hello World" Worker**.
3. For the question “Would you like to use TypeScript? (y/n)”, select **y**.
4. For the question “Do you want to deploy your application?”, select **n**.
This will create your Worker.

## 5. Configure your Worker

In your Worker project's [`wrangler.toml`](/workers/wrangler/configuration/) file, add a [queue consumer](/workers/wrangler/configuration/#queues) and [R2 bucket binding](/workers/wrangler/configuration/#r2-buckets). The queues consumer bindings will register your Worker as a consumer of your future event notifications and the R2 bucket bindings will allow your Worker to access your R2 bucket.

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

Add a [`queue` handler](/queues/configuration/javascript-apis/#consumer) to `src/index.ts` to handle writing batches of notifications to our log sink bucket (you do not need a [fetch handler](/workers/runtime-apis/handlers/fetch/)):

```ts
---
filename: index.ts
---
export interface Env {
    LOG_SINK: R2Bucket;
}

export default {
	async queue(batch: MessageBatch, env: Env): Promise<void> {
		const batchId = new Date().toISOString().replace(/[:.]/g, '-');
		const fileName = `upload-logs-${batchId}.json`;

		// Serialize the entire batch of messages to JSON
		const fileContent = new TextEncoder().encode(JSON.stringify(batch.messages));

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

To deploy your consumer Worker, run the [`wrangler deploy`](/workers/wrangler/commands/#deploy) command:

```sh
$ npx wrangler deploy
```

## 8. Enable event notifications

Now that you have your consumer Worker ready to handle incoming event notification messages, you need to enable event notifications with the [`wrangler r2 bucket notification create` command](/workers/wrangler/commands/#notification-create) for `example-upload-bucket`:

```sh
$ npx wrangler r2 bucket notification create example-upload-bucket --event-type object-create --queue example-event-notification-queue
```

## 9. Test

Now you can test the full end-to-end flow by uploading an object to `example-upload-bucket` in the Cloudflare dashboard. After you have uploaded an object, logs will appear in `example-log-sink-bucket` in a few seconds.
