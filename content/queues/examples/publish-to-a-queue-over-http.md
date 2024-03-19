---
title: Publish to a Queue via HTTP
summary: Publish to a Queue directly via HTTP and Workers.
pcx_content_type: configuration
weight: 30
layout: example
meta:
  title: Queues - Publish Directly via HTTP
---

The following example shows you how to publsh messages to a queue from any HTTP client, using a shared secret to securely authenticate the client.

This allows you to write to a Queue from any service or programming language that support HTTP, including Go, Rust, Python or even a Bash script.

### Prerequisites

- A [queue created](/queues/get-started/#3-create-a-queue) via the [Cloudflare dashboard](https://dash.cloudflare.com) or the [wrangler CLI](/workers/wrangler/install-and-update/).
- A [configured **producer** binding](/queues/reference/configuration/#producer) in the Cloudflare dashboard or `wrangler.toml` file.

Configure your `wrangler.toml` file as follows:

```toml
---
filename: wrangler.toml
---
name = "my-worker"

[[queues.producers]]
  queue = "my-queue"
  binding = "YOUR_QUEUE"

```

### 1. Create a shared secret

Before you deploy the Worker, you need to create a [secret](/workers/configuration/secrets/) that you can use as a shared secret. A shared secret is a secret that both the client uses to authenticate and the server (your Worker) matches against for authentication.

{{<Aside type="warning">}}

Do not commit secrets to source control. You should use [`wrangler secret`](/workers/configuration/secrets/) to store API keys and authentication tokens securely.

{{</Aside>}}

To generate a cryptographically secure secret, you can use the `openssl` command-line tool and `wrangler secret` to create a hex-encoded string that can be used as the shared secret:

```sh
$ openssl rand -hex 32
# This will output a 65 character long hex string
```

Copy this string and paste it into the prompt for `wrangler secret`:

```sh
$ npx wrangler secret put QUEUE_AUTH_SECRET

# Outputs:
✨ Success! Uploaded secret QUEUE_AUTH_SECRET
```

This secret will also need to be used by the client application writing to the queue: ensure you store it securely.

### 2. Create the Worker

The following Worker script:

1. Authenticates the client using a shared secret.
2. Validates that the payload uses JSON.
3. Publishes the payload to the queue.

```ts
---
filename: src/index.ts
---
interface Env {
	YOUR_QUEUE: Queue;
	QUEUE_AUTH_SECRET: string;
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		// Authenticate that the client has the correct auth key
		if (env.QUEUE_AUTH_SECRET == "") {
			return Response.json({ err: "application not configured" }, { status: 500 });
		}

		// Return a HTTP 403 (Forbidden) if the auth key is invalid/incorrect/misconfigured
		let authToken = req.headers.get("Authorization") || "";
		let encoder = new TextEncoder();
		// Securely compare our secret with the auth token provided by the client
		try {
			if (!crypto.subtle.timingSafeEqual(encoder.encode(env.QUEUE_AUTH_SECRET), encoder.encode(authToken))) {
				return Response.json({ err: "invalid auth token provided" }, { status: 403 });
			}
		} catch (e) {
			return Response.json({ err: "invalid auth token provided" }, { status: 403 });
		}

		// Optional: Validate the payload is JSON
		// In a production application, we may more robustly validate the payload
		// against a schema using a library like 'zod'
		let messages;
		try {
			messages = await req.json();
		} catch (e) {
			// Return a HTTP 400 (Bad Request) if the payload isn't JSON
			return Response.json({ err: "payload not valid JSON" }, { status: 500 });
		}

		// Publish to the Queue
		try {
			await env.YOUR_QUEUE.send(messages);
		} catch (e: any) {
			console.log(`failed to send to the queue: ${e}`);
			// Return a HTTP 500 (Internal Error) if our publish operation fails
			return Response.json({ error: e.message }, { status: 500 });
		}

		// Return a HTTP 200 if the send succeeded!
		return Response.json({ success: true });
	},
};
```

To deploy this Worker:

```sh
$ npx wrangler deploy
```

### 3. Send a test message

To make sure you successfully authenticate and write a message to your queue, use `curl` on the command line:

```sh
# Make sure to replace the placeholder with your shared secret
$ curl -H "Authorization: pasteyourkeyhere" "https://YOUR_WORKER.YOUR_ACCOUNT.workers.dev" --data '{"messages": [{"msg":"hello world"}]}'
# Outputs:
{"success":true}
```

This will issue a HTTP POST request, and if successful, return a HTTP 200 with a `success: true` response body.

- If you receive a HTTP 403, this is because the `Authorization` header is invalid, or you did not configure a secret.
- If you receive a HTTP 500, this is either because you did not correctly create a shared secret to your Worker, or you attempted to send an invalid message to your queue.

You can use [`wrangler tail`](/workers/observability/logging/real-time-logs/) to debug the output of `console.log`.
