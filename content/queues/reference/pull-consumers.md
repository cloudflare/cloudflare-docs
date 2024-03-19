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

Deciding whether to configure a push-based consumer or a pull-based consumer will intend on how you are using your queues, as well as the configuration of infrastructure upstream from your queue consumer.

* As a general rule-of-thumb, starting with a [push-based consumer](/queues/reference/how-queues-works/#consumers) is the easiest way to get started and consume from a queue. A push-based consumer runs on Workers, and by default, will automatically scale up and consume messages as they are written to the queue.
* Use a pull-based consumer if you need to consume messages from existing infrastucture outside of Cloudflare Workers, and/or where you need to carefully control how fast messages are consumed. A pull-based consumer must explicitly make a call to pull (and then acknowledge) messages from the queue, one batch at a time.

Note that you can remove and attach a new consumer on a queue at any time, allowing you to change from a pull-based to a push-based consumer if your requirements change.

# Configuration

{{<Aside type="note" header="Retrieve an API bearer token">}}

To configure a pull-based consumer, you will need to create [an API token](/fundamentals/api/get-started/create-token/) with both the `queues#read` and `queues#write` permissions. A consumer must be able to write to a queue to acknowledge messages.

{{</Aside>}}

1. Configure a consumer
2. Authenticate to the API
3. Pull messages 
4. Acknowledge messages

## Authentication

HTTP Pull consumers require an [API token](/fundamentals/api/get-started/create-token/) with the `com.cloudflare.api.account.queues_read` and `com.cloudflare.api.account.queues_write` permissions.

Both read _and_ write are required as a pull-based consumer needs to write to the queue state in order to acknowledge the messages it receives: consuming messages mutates the queue.

API tokens are presented as Bearer tokens in the `Authorization` header of a HTTP request in the format `Authorization: Bearer $YOUR_TOKEN_HERE`. The following example shows how to pass an API token using the `curl` HTTP client:

```sh
$ curl "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/queues/${QUEUE_ID}/messages/pull" --data '{"ack":["<lease_id_here>"], "retry":[]}' \
     -H "Authorization: Bearer ${QUEUES_TOKEN}" \
     -H "Content-Type:application/json"
```

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

## Content types

{{<Aside type="warning">}}

When attaching a pull-based consumer to a queue, you should ensure that messages are sent with only a `text`, `bytes` or `json` [content type](/queues/reference/javascript-apis/#queuescontenttype).

The default content type is `json`.

Pull-based consumers cannot decode the `v8` content type as it is specific to the Workers runtime.

{{</Aside>}}

TODO - note on content types

## Pulling messages

TODO - 

* Pulling
* Concept of visibility timeouts
* Concurrent HTTP consumers and lease IDs
* Batching

## Acknowledging messages

Messages pulled by a consumer need to be either acknowledged or marked for retry. 

* Lease IDs
* Acknowledge messages
* Retry messages

Each batch of messages resembles the below:

```json
"messages": [
  {
    "body": "/w9vIgRwYXRoIgQvYmFyIgl0aW1lc3RhbXBOACD5bk6WeEIiC2V5ZWJhbGxDb2xvIgNGUkF7Aw==",
    "id": "36ea2f1830198434b38beecd0f0cd710",
    "timestampMs": 1689615003982,
    "attempts": 2,
    "leaseID": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..RfWt2aMeYjBYybmg8rD14w.ywDMzXnWwvvQsVSUZHFS7Zgq-J7lEGyVUYnji3-9mW8.vVrSSHNvmaWR9Pf0RWjfrJ8BcMod33lVotDL20paKsw"
  },
  {
    "body": "/w9vIgRwYXRoIgwvZmF2aWNvbi5pY28iCXRpbWVzdGFtcE4AoCJvTpZ4QiILZXllYmFsbENvbG8iA0ZSQXsD",
    "id": "23ad9999022e4c0b5e691b117272872d",
    "timestampMs": 1689615004270,
    "attempts": 2,
    "leaseID": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..B9DHkRYwWhtY37_m55XH4A.u-uD9m0GEVo--g4Mnfe-x_FQGpR_gkZezKylhdR70bk.90UAi0mPv3zaKG7KIoGbywsUjo9AIFWFHt2XhVSEoAE"
  }
]
```

# Examples

## TypeScript (Node.js)

The following example is a Node.js-based TypeScript application that pulls from a queue on startup, acknowledges messages after writing them to stdout, and polls the queue at a fixed interval.

In a production application, you could replace writing to stdout with inserting into a database, making HTTP requests to an upstream service, or writing to object storage.

```ts


```

## Go

The following example is a Go application that pulls from a queue on startup, acknowledges messages after writing them to stdout, and polls the queue at a fixed interval.

```go


```

## Next steps

* Review the [REST API documentation]() and schema for Queues
* Learn more about [how to make API calls](/fundamentals/api/how-to/make-api-calls/) to the Cloudflare API.
* Metrics
* Configuration