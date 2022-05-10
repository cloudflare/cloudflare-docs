---
title: Integrate with Workers
pcx-content-type: tutorial
weight: 2
---

# Integrate with Workers

Once of the most powerful features of Pub/Sub is the ability to connect [Cloudflare Workers](/workers) — powerful serverless functions that run on the edge — and filter, aggregate and mutate every message published to that broker. Workers can also mirror those messages to other sources, including writing to [Cloudflare R2 storage](/r2/), external databases, or other cloud services beyond Cloudflare, making it easy to persist or analyze incoming message payloads and data at scale.

The Worker runs as a "post-publish" hook where messages are accepted by the broker, passed to the Worker, and messages are only sent to clients who subscribed to the topic after the Worker returns a valid HTTP response. If the Worker does not return a response (intentionally or not), or returns an HTTP status code other than HTTP 200, the message is dropped.

## Connect a Worker to a broker

1. Create a Cloudflare Worker (or expand an existing Worker) to handle incoming POST requests from the broker. 
2. Configure the broker to send messages to the Worker.
3. Verify the signature of the payload to confirm the request was from your PubSub Broker and not an untrusted third-party or another broker.
4. Inspect or mutate the message (the HTTP request payload) as you see fit.
5. Return an HTTP 200 OK with a well-formed response, which allows the broker to send the message on to any subscribers. 

{{<Aside type="note" heading="Important">}}

You must validate the signature of every incoming message to ensure it comes from Cloudflare and not an untrusted third-party.

{{</Aside>}}

```js
// An example that shows how to consume and transform Pub/Sub messages from a Cloudflare Worker.

/// <reference types="@cloudflare/workers-types" />

// Retrieve this from your Broker's "publicKey" field.
// Each Broker has a unique key to distinguish between your Broker vs. others.
const BROKER_PUBLIC_KEY = "BROKER_SPECIFIC_PUBLIC_KEY";
const SIGNATURE_FORMAT = "NODE-ED25519";

interface PubSubMessage {
  readonly broker: string;
  readonly namespace: string;
  readonly topic: string;
  readonly clientId: string;
  readonly receivedAt: number;
  readonly contentType: string;
  readonly payloadFormatIndicator: number;
  payload: string;
}

async function isValidBrokerRequest(req: Request): Promise<boolean> {
  if (req.method !== "POST") {
    return false;
  }

  let signature = req.headers.get("X-Signature-Ed25519");
  let timestamp = req.headers.get("X-Signature-Timestamp");

  if (signature === null || timestamp === null) {
    return false;
  }

  let body = await req.clone().text();

  let alg = { name: SIGNATURE_FORMAT, namedCurve: SIGNATURE_FORMAT };

  // Decode our hex-encoded public key, and the hex encoded signature, into raw
  // bytes before we can use them to verify the signature.
  let keyBuffer = new Uint8Array(
    BROKER_PUBLIC_KEY.match(/[0-9a-f]{2}/gi).map((s) => parseInt(s, 16))
  ).buffer;
  let signatureBuffer = new Uint8Array(
    signature.match(/[0-9a-f]{2}/gi).map((s) => parseInt(s, 16))
  ).buffer;

  let publicKey = await crypto.subtle.importKey("raw", keyBuffer, alg, false, [
    "verify",
  ]);

  if (
    await crypto.subtle.verify(
      SIGNATURE_FORMAT,
      publicKey,
      signatureBuffer,
      new TextEncoder().encode(timestamp + body)
    )
  ) {
    return true;
  }

  return false;
}

async function pubsub(
  messages: Array<PubSubMessage>,
  env: any,
  ctx: ExecutionContext
): Promise<Array<PubSubMessage>> {    

  // Messages may be batched at higher throughputs, so we should loop over
  // the incoming messages and process them as needed.
  for (let msg of messages) {  
    // MQTT message payloads don't have to be strings, and can be streams of bytes.
    // In this simple example, we only mutate UTF-8 (string) message payloads.
    if (msg.payloadFormatIndicator === 1) {
      msg.payload = `replaced text payload at ${Date.now()}`;
    }
  }

  return messages;
}

const worker = {
  async fetch(req: Request, env: any, ctx: ExecutionContext) {
    // Critical: you must validate the incoming request is from your Broker
    // In the future, Workers will be able to do this on your behalf for Workers
    // in the same account as your Pub/Sub Broker.
    if (await isValidBrokerRequest(req)) {

      // Parse the PubSub messages (one or more)
      let incomingMessages: Array<PubSubMessage> = await req.json();
      
      // Pass the message(s) to our pubsub handler, and capture the returned
      // message.
      let outgoingMessages = await pubsub(incomingMessages, env, ctx);

      // Re-serialize the message(s) and return a HTTP 200.
      // The Content-Type is optional, but must either by
      // "application/octet-stream" or left empty.
      return new Response(JSON.stringify(outgoingMessages), { status: 200 });
    }

    return new Response("not a valid Broker request", { status: 403 });
  },
};

export default worker;
```

Below is an example of a PubSub message sent over HTTP to a Worker:

```bash
[
    {
        "broker": "my-broker",
        "namespace": "my-namespace",
        "topic": "us/external/metrics/abc-456-def-123/request_count",
        "clientId": "01G24VP1T3B51JJ0WJQJWCSY61",
        "jti": "01G2DA0P2M5K7EKS5ET6SW4TTF",
        "receivedAt": 1651578191,
        "contentType": "application/json",
        "payloadFormatIndicator": 1,
        "payload": "<payload>"
    },
    {
        "broker": "my-broker",
        "namespace": "my-namespace",
        "topic": "ap/external/metrics/abc-456-def-123/transactions_processed",
        "clientId": "01G24VS053KYGNBBX8RH3T7CY5",
        "jti": "01G2DA0V43B0SP6XEPHDD0DSJC",
        "receivedAt": 1651578193,
        "contentType": "application/json",
        "payloadFormatIndicator": 1,
        "payload": "<payload>"
    }
]
```

## Troubleshoot Workers integrations

Some common failure modes can result in messages not being sent to subscribed clients when a Worker is processing messages, including:

- Not returning a HTTP 200 response. Any other HTTP status code is interpreted as an error and the message is dropped.
- Not returning a valid Content-Type. The Content-Type in the HTTP response header must be `application/octet-stream`
- Taking too long to return a response (more than 10 seconds). You can use [`ctx.waitUntil`](/workers/runtime-apis/fetch-event/#waituntil) if you need to write messages to other destinations after returning the message to the broker.
- Returning an invalid or unstructured body, a body or payload that exceeds size limits, or returning no body at all.

Because the Worker is acting as the "server" in the HTTP request-response lifecycle, invalid responses from your Worker can fail silently, as the Broker can no longer return an error response.

