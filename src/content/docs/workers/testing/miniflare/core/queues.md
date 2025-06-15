---
order: 8
title: "🚥 Queues"
---

- [Queues Reference](/queues/)

## Producers

Specify Queue producers to add to your environment as follows:

```js
const mf = new Miniflare({
	queueProducers: { MY_QUEUE: "my-queue" },
	queueProducers: ["MY_QUEUE"], // If binding and queue names are the same
});
```

## Consumers

Specify Workers to consume messages from your Queues as follows:

```js
const mf = new Miniflare({
	queueConsumers: {
		"my-queue": {
			maxBatchSize: 5, // default: 5
			maxBatchTimeout: 1 /* second(s) */, // default: 1
			maxRetries: 2, // default: 2
			deadLetterQueue: "my-dead-letter-queue", // default: none
		},
	},
	queueConsumers: ["my-queue"], // If using default consumer options
});
```

## Manipulating Outside Workers

For testing, it can be valuable to interact with Queues outside a Worker. You can do this by using the `workers` option to run multiple Workers in the same instance:

```js
const mf = new Miniflare({
	workers: [
		{
			name: "a",
			modules: true,
			script: `
			export default {
				async fetch(request, env, ctx) {
					await env.QUEUE.send(await request.text());
				}
			}
			`,
			queueProducers: { QUEUE: "my-queue" },
		},
		{
			name: "b",
			modules: true,
			script: `
			export default {
				async queue(batch, env, ctx) {
					console.log(batch);
				}
			}
			`,
			queueConsumers: { "my-queue": { maxBatchTimeout: 1 } },
		},
	],
});

const queue = await mf.getQueueProducer("QUEUE", "a"); // Get from worker "a"
await queue.send("message"); // Logs "message" 1 second later
```
