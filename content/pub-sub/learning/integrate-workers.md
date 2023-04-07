---
title: Integrate with Workers
pcx_content_type: tutorial
weight: 2
---

# Integrate with Workers

Once of the most powerful features of Pub/Sub is the ability to connect [Cloudflare Workers](/workers) — powerful serverless functions that run on the edge — and filter, aggregate and mutate every message published to that broker. Workers can also mirror those messages to other sources, including writing to [Cloudflare R2 storage](/r2/), external databases, or other cloud services beyond Cloudflare, making it easy to persist or analyze incoming message payloads and data at scale.

There are three ways to integrate a Worker with Pub/Sub:

1. **As an “On Publish” hook that receives all messages published to a Broker**. This allows the Worker to modify, copy to other destinations (such as [R2](/r2/) or [KV](/workers/learning/how-kv-works/)), filter and/or drop messages before they are delivered to subscribers.
2. (Not yet available in beta) **Publishing directly to a Pub/Sub topic from a Worker.** You can publish telemetry and events to Pub/Sub topics from your Worker code.
3. (Not yet available in beta) **Subscribing to a Pub/Sub topic (or topics) from within a Worker**. This allows the Worker to act as any other subscriber and consume messages published either from external clients (over MQTT) or from other Workers.

You can use one, many or all of these integrations as needed.

## On-Publish Hooks

"On-Publish" hooks are a powerful way to filter and modify messages as they are published to your Pub/Sub Broker.

* The Worker runs as a "post-publish" hook where messages are accepted by the broker, passed to the Worker, and messages are only sent to clients who subscribed to the topic after the Worker returns a valid HTTP response.
* If the Worker does not return a response (intentionally or not), or returns an HTTP status code other than HTTP 200, the message is dropped.
* All `PUBLISH` messages (packets) published to your Broker are sent to the Worker. Other MQTT packets, such as CONNECT or AUTH packets, are automatically handled for you by Pub/Sub.

### Connect a Worker to a Broker

{{<Aside type="note" heading="Important">}}

You must validate the signature of every incoming message to ensure it comes from Cloudflare and not an untrusted third-party.

{{</Aside>}}

To connect a Worker to a Pub/Sub Broker as an on-publish hook, you'll need to:

1. Create a Cloudflare Worker (or expand an existing Worker) to handle incoming POST requests from the broker. The public URL of your Worker will be the URL you configure your Broker to send messages to.
2. Configure the broker to send messages to the Worker by setting the `on_publish.url` field on your Broker.
3. **Important**: Verify the signature of the payload using the public keys associated with your Broker to confirm the request was from your Pub/Sub Broker, and **not** an untrusted third-party or another broker.
4. Inspect or mutate the message (the HTTP request payload) as you see fit!
5. Return an HTTP 200 OK with a well-formed response, which allows the broker to send the message on to any subscribers. 

The following is an end-to-end example showing how to:

* Authenticate incoming requests from Pub/Sub (and reject those not from Pub/Sub)
* Replace the payload of a message on a specific topic
* Return the message to the Broker so that it can forward it to subscribers

{{<Aside type="note">}}

You should be familiar with setting up a [Worker](/workers/get-started/guide/) before continuing with this example.
  
{{</Aside>}}

To ensure your Worker can validate incoming requests, you must make the public keys available to your Worker via an [environmental variable](/workers/platform/environment-variables/). To do so, we can fetch the public keys from our Broker:

```sh
$ wrangler pubsub broker public-keys YOUR_BROKER --namespace=NAMESPACE_NAME
```

You should receive a success response that resembles the example below, with the public key set from your Worker:

```json
"keys": [
  {
    "use": "sig",
    "kty": "OKP",
    "kid": "JDPuYJqHOvqzlakkNFQ9kfN7WsYs5uHndp_ziRdmOCU",
    "crv": "Ed25519",
    "alg": "EdDSA",
    "x": "Phf82R8tG1FdY475-AgtlaWIwH1lLFlfWu5LrsKhyjw"
  },
  {
    "use": "sig",
    "kty": "OKP",
    "kid": "qk7Z4hbN738v-m2CKdVaKTav9pU32MAaQXB2tDaQ-_o",
    "crv": "Ed25519",
    "alg": "EdDSA",
    "x": "Bt4kQWcK_XhZP1ZxEflsoYbqaBm9rEDk_jNWPdhxwTI"
  }
]
```

Copy the array of public keys into your `wrangler.toml` as an environmental variable:

{{<Aside type="note">}}

Your public keys will be unique to your own Pub/Sub Broker: you should ensure you're copying the keys associated with your own Broker.
  
{{</Aside>}}

```toml
---
filename: wrangler.toml
---
name = "my-pubsub-worker"
type = "javascript"

account_id = "<YOUR ACCOUNT_ID>"
workers_dev = true

# Define top-level environment variables
# under the `[vars]` block using
# the `key = "value"` format
[vars]
# This will be accessible via env.BROKER_PUBLIC_KEYS in our Worker
# Note that we use three single quotes (') around our raw JSON
BROKER_PUBLIC_KEYS = '''{
  "keys": [
    {
      "use": "sig",
      "kty": "OKP",
      "kid": "JDPuYJqHOvqzlakkNFQ9kfN7WsYs5uHndp_ziRdmOCU",
      "crv": "Ed25519",
      "alg": "EdDSA",
      "x": "Phf82R8tG1FdY475-AgtlaWIwH1lLFlfWu5LrsKhyjw"
    },
    {
      "use": "sig",
      "kty": "OKP",
      "kid": "qk7Z4hbN738v-m2CKdVaKTav9pU32MAaQXB2tDaQ-_o",
      "crv": "Ed25519",
      "alg": "EdDSA",
      "x": "Bt4kQWcK_XhZP1ZxEflsoYbqaBm9rEDk_jNWPdhxwTI"
    }
  ]
}'''
```

With the `BROKER_PUBLIC_KEYS` environmental variable set, we can now access these in our Worker code. The [`@cloudflare/pubsub`](https://www.npmjs.com/package/@cloudflare/pubsub) package allows you to authenticate the incoming request against your Broker's
public keys.

To install `@cloudflare/pubsub`, you can use `npm` or `yarn`:

```sh
$ npm i @cloudflare/pubsub
```

With `@cloudflare/pubsub` installed, we can now import both the `isValidBrokerRequest` function and our `PubSubMessage` types into
our Worker code directly:

```typescript
---
filename: index.ts
---
// An example that shows how to consume and transform Pub/Sub messages from a Cloudflare Worker.

/// <reference types="@cloudflare/workers-types" />

import { isValidBrokerRequest, PubSubMessage } from "@cloudflare/pubsub"

async function pubsub(
  messages: Array<PubSubMessage>,
  env: any,
  ctx: ExecutionContext
): Promise<Array<PubSubMessage>> {
  // Messages may be batched at higher throughputs, so we should loop over
  // the incoming messages and process them as needed.
  for (let msg of messages) {
    console.log(msg);
    // Replace the message contents in our topic - named "test/topic"
    // as a simple example
    if (msg.topic.startsWith("test/topic")) {
      msg.payload = `replaced text payload at ${Date.now()}`;
    }
  }

  return messages;
}

const worker = {
  async fetch(req: Request, env: any, ctx: ExecutionContext) {
    // Retrieve this from your Broker's "publicKey" field.
    //
    // Each Broker has a unique key to distinguish between your Broker vs. others
    // We store these keys in environmental variables (/workers/platform/environment-variables/)
    // to avoid needing to fetch them on every request.
    let publicKeys = env.BROKER_PUBLIC_KEYS;

    // Critical: you must validate the incoming request is from your Broker.
    //
    // In the future, Workers will be able to do this on your behalf for Workers
    // in the same account as your Pub/Sub Broker.
    if (await isValidBrokerRequest(req, publicKeys)) {
      // Parse the PubSub message
      let incomingMessages: Array<PubSubMessage> = await req.json();

      // Pass the messages to our pubsub handler, and capture the returned
      // message.
      let outgoingMessages = await pubsub(incomingMessages, env, ctx);

      // Re-serialize the messages and return a HTTP 200.
      // The Content-Type is optional, but must either by
      // "application/octet-stream" or left empty.
      return new Response(JSON.stringify(outgoingMessages), { status: 200 });
    }

    return new Response("not a valid Broker request", { status: 403 });
  },
};

export default worker;
```

Once you've published your Worker using `wrangler publish`, you will need to configure your Broker to invoke the Worker. This is done by setting the `--on-publish-url` value of your Broker to the _publicly accessible_ URL of your Worker:

```sh
$ wrangler pubsub broker update YOUR_BROKER --namespace=NAMESPACE_NAME --on-publish-url="https://your.worker.workers.dev"
```

You should receive a success response that resembles the example below, with the URL of your Worker:

```json
{
  "id": "4c63fa30ee13414ba95be5b56d896fea",
  "name": "example-broker",
  "authType": "TOKEN",
  "created_on": "2022-05-11T23:19:24.356324Z",
  "modified_on": "2022-05-11T23:19:24.356324Z",
  "expiration": null,
  "endpoint": "mqtts://example-broker.namespace.cloudflarepubsub.com:8883",
  "on_publish": {
    "url": "https://your-worker.your-account.workers.dev"
}
```

Once you set this, _all_ MQTT `PUBLISH` messages sent to your Broker from clients will be delivered to your Worker for further processing. You can use our [web-based live demo](https://demo.mqtt.dev) to test that your Worker is correctly validating requests and intercepting messages.

Note that other HTTPS-enabled endpoints are valid destinations to forward messages to, but may incur latency and/or reduce message delivery success rates as messages will necessarily need to traverse the public Internet.

### Message Payload

Below is an example of a PubSub message sent over HTTP to a Worker:

```json
[
    {
        "mid": 0,
        "broker": "my-broker.my-namespace.cloudflarepubsub.com",
        "topic": "us/external/metrics/abc-456-def-123/request_count",
        "clientId": "broker01G24VP1T3B51JJ0WJQJWCSY61",
        "receivedAt": 1651578191,
        "contentType": null,
        "payloadFormatIndicator": 1,
        "payload": "<payload>"
    },
    {
        "mid": 1,
        "broker": "my-broker.my-namespace.cloudflarepubsub.com",
        "topic": "ap/external/metrics/abc-456-def-123/transactions_processed",
        "clientId": "broker01G24VS053KYGNBBX8RH3T7CY5",
        "receivedAt": 1651578193,
        "contentType": null,
        "payloadFormatIndicator": 1,
        "payload": "<payload>"
    }
]
```

### Per-Message Metadata and TypeScript Support

Messages delivered to a Worker, or sent from a Worker, are wrapped with additional metadata about the message so that you can more easily inspect the topic, message format, and other properties that can help you to route & filter messages.

This metadata includes:

- the `broker` the message was associated with, so that your code can distinguish between messages from multiple Brokers
- the `topic` the message was published to by the client. **Note that this is readonly: attempting to change the topic in the Worker is invalid and will result in that message being dropped**.
- a `receivedTimestamp`, set when Pub/Sub first parses and deserializes the message
- the `mid` (“message id”) of the message. This is a unique ID allowing Pub/Sub to track messages sent to your Worker, including which messages were dropped (if any). The `mid` field is immutable and returning a modified or missing `mid` will likely cause messages to be dropped.

This metadata, including their JavaScript types and whether they are immutable (“`readonly`”), are expressed as the `PubSubMessage` interface in the [@cloudflare/pubsub](https://github.com/cloudflare/pubsub) library.

The `PubSubMessage` type may grow to include additional fields over time, and we recommend importing `@cloudflare/pubsub` (instead of copy+pasting) to ensure your code can benefit from any future changes.

### Batching

Messages sent to your on-publish Worker may be batched: each batch is an array of 1 or more `PubSubMessage`.

- Batching helps to reduce the number of invocations against your Worker, and can allow you to better aggregate messages when writing them to upstream services.
- Pub/Sub’s batching mechanism is designed to batch messages arriving simultaneously from publishers, and not wait several seconds.
- It does **not** measurably increase the latency of message delivery.

### On-Publish Best Practices

- Only inspect the topics you need to to reduce the compute your Worker needs to do.
- Use `ctx.waitUntil` if you need to write to storage or communicate with remote services and avoid increasing message delivery latency while waiting on those operations to complete.
- Catch exceptions using [try-catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) - if your on-publish hook is able to “fail open”, you should use the `catch` block to return messages to the Broker in the event of an exception so that messages aren’t dropped.

## Troubleshoot Workers integrations

Some common failure modes can result in messages not being sent to subscribed clients when a Worker is processing messages, including:

- Failing to correctly validate incoming requests. This can happen if you are not using the correct public keys (keys are unique to each of your Brokers), if the keys are malformed, and/or if you have not populated the keys in the Worker via environmental variables.
- Not returning a HTTP 200 response. Any other HTTP status code is interpreted as an error and the message is dropped.
- Not returning a valid Content-Type. The Content-Type in the HTTP response header must be `application/octet-stream`
- Taking too long to return a response (more than 10 seconds). You can use [`ctx.waitUntil`](/workers/runtime-apis/fetch-event/#waituntil) if you need to write messages to other destinations after returning the message to the broker.
- Returning an invalid or unstructured body, a body or payload that exceeds size limits, or returning no body at all.

Because the Worker is acting as the "server" in the HTTP request-response lifecycle, invalid responses from your Worker can fail silently, as the Broker can no longer return an error response.

