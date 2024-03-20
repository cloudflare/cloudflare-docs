---
pcx_content_type: reference
title: Pull consumers
weight: 15
meta:
  title: Cloudflare Queues - Pull consumers
---

# Pull consumers

A pull-based consumer allows you to pull from a queue over HTTP from any environment and/or programming language outside of Cloudflare Workers. A pull-based consumer can be useful when your message consumption rate is limited by upstream infrastructure or long-running tasks.

## Push or pull?

Deciding whether to configure a push-based consumer or a pull-based consumer will depend on how you are using your queues, as well as the configuration of infrastructure upstream from your queue consumer.

- As a general rule-of-thumb, starting with a [push-based consumer](/queues/reference/how-queues-works/#consumers) is the easiest way to get started and consume from a queue. A push-based consumer runs on Workers, and by default, will automatically scale up and consume messages as they are written to the queue.
- Use a pull-based consumer if you need to consume messages from existing infrastucture outside of Cloudflare Workers, and/or where you need to carefully control how fast messages are consumed. A pull-based consumer must explicitly make a call to pull (and then acknowledge) messages from the queue, only when it is ready to do so.

Note that you can remove and attach a new consumer on a queue at any time, allowing you to change from a pull-based to a push-based consumer if your requirements change.

# Configuration

{{<Aside type="note" header="Retrieve an API bearer token">}}

To configure a pull-based consumer, you will need to create [an API token](/fundamentals/api/get-started/create-token/) with both the `queues#read` and `queues#write` permissions. A consumer must be able to write to a queue to acknowledge messages.

{{</Aside>}}

There are four steps required to configure a pull-based consumer and receive messages from a queue:

1. Enabling HTTP pull for the queue
2. Creating a valid authentication token for the HTTP client
3. Pulling message batches from the queue
4. Acknowledging and/or retrying messages within a batch

## 1. Enabling HTTP pull

You can enable HTTP pull or change a queue from push-based to pull-based via `wrangler.toml`, the `wrangler` CLI, or via the Cloudflare dashboard.

### wrangler.toml

A HTTP consumer can be configured in `wrangler.toml` by setting `type = "http_pull"` in the consumer configuration.

```toml
[[queues.consumer]]
# Required
queue = "QUEUE_NAME"
type = "http_pull"
# Optional
visibility_timeout_ms = 5000
max_retries = 5
dead_letter_queue = "SOME_OTHER_QUEUE"
```

Omitting the `type` property will default the queue to push-based.

### Dashboard

TODO

### wrangler CLI

You can enable a pull-based consumer on any existing queue by using the `wrangler queues consumer:http` sub-commands and providing a queue name.

```sh
$ npx wrangler queues consumer:http add $QUEUE_NAME
```

Note that if you have an existing push-based consumer, you will need to remove that first. `wrangler` will return an error if you attempt to call `consumer:http add` on a queue with an existing consumer configuration:

```sh
$ wrangler queues consumer:worker remove $QUEUE_NAME $SCRIPT_NAME
```

{{<Aside type="note">}}

If you remove the Worker consumer with `wrangler` but do not delete the `[[queues.consumer]]` configuration from `wrangler.toml`, subsequent deployments of your Worker will fail when they attempt to add a conflicting consumer configuration.

Ensure you remove the consumer configuration first.

{{</Aside>}}

## 2. Consumer authentication

HTTP Pull consumers require an [API token](/fundamentals/api/get-started/create-token/) with the `com.cloudflare.api.account.queues_read` and `com.cloudflare.api.account.queues_write` permissions.

Both read _and_ write are required as a pull-based consumer needs to write to the queue state in order to acknowledge the messages it receives: consuming messages mutates the queue.

API tokens are presented as Bearer tokens in the `Authorization` header of a HTTP request in the format `Authorization: Bearer $YOUR_TOKEN_HERE`. The following example shows how to pass an API token using the `curl` HTTP client:

```sh
$ curl "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/queues/${QUEUE_ID}/messages/pull" \
  --data '{ "visibilityTimeout": 10000, "batchSize": 2 }' \
  -H "Authorization: Bearer ${QUEUES_TOKEN}" \
  -H "Content-Type: application/json"
```

You may authenticate and run multiple concurrent pull-based consumers against a single queue, noting that all consumers will share the same (rate limit](queues/platform/limits/) against the Cloudflare API.

### Create API tokens

To create an API token:

1. Visit the API tokens page of the [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens/)
2. Select **Create Token**
3. Scroll to the bottom of the page and select **Create Custom Token**
4. Give the token a name - e.g. `queue-pull-token`
5. Under the **Permissions** section, choose **Account** and then **Queues**. Ensure you have selected **Edit** (read+write).
6. (Optional) Select **All accounts** (default) or a specific account to scope the token to.
7. Select **Continue to summary** and then **Create token**

You will need to note the token down: it will only be displayed once.

## 3. Pulling messages

To pull a message, make a HTTP POST request to the [Queues REST API](/api/operations/queue-create-queue-consumer) with a JSON-encoded body that optionally specifies a `visibility_timeout` and a `batch_size`, or an empty JSON object (`{}`):

```ts
// POST /accounts/${CF_ACCOUNT_ID}/queues/${QUEUE_ID}/messages/pull with the timeout & batch size
let resp = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/queues/${QUEUE_ID}/messages/pull`,
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${QUEUES_API_TOKEN}`,
    },
    // Optional - you can provide an empty object '{}' and the defaults will apply.
    body: JSON.stringify({ visibility_timeout: 6000, batch_size: 50 }),
  }
);
```

This will return an array of messages (up to the specified `batch_size`) in the below format:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "messages": [
      {
        "body": "hello",
        "id": "1ad27d24c83de78953da635dc2ea208f",
        "timestampMs": 1689615013586,
        "attempts": 2,
        "leaseID": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..NXmbr8h6tnKLsxJ_AuexHQ.cDt8oBb_XTSoKUkVKRD_Jshz3PFXGIyu7H1psTO5UwI.smxSvQ8Ue3-ymfkV6cHp5Va7cyUFPIHuxFJA07i17sc"
      },
      {
        "body": "world",
        "id": "95494c37bb89ba8987af80b5966b71a7",
        "timestampMs": 1689615013586,
        "attempts": 2,
        "leaseID": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..QXPgHfzETsxYQ1Vd-H0hNA.mFALS3lyouNtgJmGSkTzEo_imlur95EkSiH7fIRIn2U.PlwBk14CY_EWtzYB-_5CR1k30bGuPFPUx1Nk5WIipFU"
      }
    ]
  }
}
```

Each message object has five fields:

1. `body` - this may be base64 encoded based on the [content-type the message was published as](#content-types).
2. `id` - a unique, read-only ephemeral identifier for the message.
3. `timestampMs` - when the message was published to the queue in milliseconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time). This allows you to determine how old a message is by subtracting it from the current timestamp.
4. `attempts` - how many times the message has been attempted to be delivered in full. When this reaches the value of `max_retries`, the message will not be re-delivered and will be deleted from the queue permanently.
5. `leaseID` - the encoded lease ID of the message. The `leaseID` is used to explicitly acknowledge or retry the message, and is only stable for the current pull. 

The `leaseID` allows your pull consumer to explicitly acknowledge some, none or all messages in the batch or mark them for retry. If messages are not acknowledged or marked for retry by the consumer, then they will be marked for re-delivery once the `visibility_timeout` is reached.

You can configure both `batch_size` and `visibility_timeout` when pulling from a queue:

* `batch_size` (defaults to 5; max 100) - how many messages are returned to the consumer in each pull.
* `visibility_timeout` (defaults to 30 second; max 12 hours) - defines how long the consumer has to explicitly acknowledge messages delivered in the batch based on their `leaseID`. Once this timeout expires, messages are assumed unacknowledged and queued for re-delivery again.

### Concurrent consumers

You may have multiple HTTP clients pulling from the same queue concurrently: each client will receieve a unique batch of messages and retain the "lease" on those messages up until the `visibility_timeout` expires, or until those messages are marked for retry.

Messages marked for retry will be put back into the queue and can be delivered to any consumer. Messages are _not_ tied to a specific consumer, as consumers do not have an identity and to avoid a slow or stuck consumer from holding up processing of messages in a queue.

Multiple consumers can be useful in cases where you have multiple upstream resources (e.g. GPU infrastructure), where you want to autoscale based on the [backlog](/queues/reference/metrics/) of a queue, and/or cost.

## 4. Acknowledging messages

Messages pulled by a consumer need to be either acknowledged or marked for retry. To acknowledge and/or mark messages to be retried:

```ts
// POST /accounts/${CF_ACCOUNT_ID}/queues/${QUEUE_ID}/messages/ack with the leaseIDs
let resp = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/queues/${QUEUE_ID}/messages/ack`,
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${QUEUES_API_TOKEN}`,
    },
    // If you have no messages to retry, you can return an empty array - retry: []
    body: JSON.stringify({ ack: ["leaseID1", "leaseID2", "etc"], retry: ["leaseID4"] }),
  }
);
```

Specifically:

* You should provide every `leaseID` in the request to the `/ack` endpoint if you are processing those messages in your consumer. If you do not acknowledge a message, it will be marked for re-delivery (put back in the queue).
* You can optionally mark messages to be retried: for example, if there is an error processing the message or you have upstream resource pressure. Explicitly marking a message for retry will place it back into the queue immediately, instead of waiting for a (potentially long) `visibility_timeout` to be reached.
* You can make multiple calls to the `/ack` endpoint as you make progress through a batch of messages, but we recommend grouping acknowledgements to avoid hitting [API rate limits](/queues/reference/limits/).

## Examples

### TypeScript (Node.js)

The following example is a Node.js-based TypeScript application that pulls from a queue on startup, acknowledges messages after writing them to stdout, and polls the queue at a fixed interval.

In a production application, you could replace writing to stdout with inserting into a database, making HTTP requests to an upstream service, or writing to object storage.

```ts

```

### Go

The following example is a Go application that pulls from a queue on startup, acknowledges messages after writing them to stdout, and polls the queue at a fixed interval.

```go


```

## Content types

{{<Aside type="warning">}}

When attaching a pull-based consumer to a queue, you should ensure that messages are sent with only a `text`, `bytes` or `json` [content type](/queues/reference/javascript-apis/#queuescontenttype).

The default content type is `json`.

Pull-based consumers cannot decode the `v8` content type as it is specific to the Workers runtime.

{{</Aside>}}

TODO - note on content types

## Next steps

- Review the [REST API documentation](https://developers.cloudflare.com/api/operations/queue-create-queue-consumer) and schema for Queues
- Learn more about [how to make API calls](/fundamentals/api/how-to/make-api-calls/) to the Cloudflare API.
- Understand [what limit apply](/queues/platform/limits/) when consuming and writing to a queue.
