---
pcx_content_type: concept
title: Limits
weight: 2
---

# Limits

Durable Objects are only available on the [Workers Paid plan](/workers/platform/pricing/#workers). Durable Objects limits are the same as [Workers Limits](/workers/platform/limits/), as well as the following limits that are specific to Durable Objects:


| Feature                                    | Limit                                             |
| ------------------------------------------ | --------------------------------------------------|
|  Number of Objects                         | Unlimited (within an account or of a given class) |
|  Maximum Durable Object namespaces         | 500 (identical to the [script limit](/workers/platform/limits/)) |
|  Storage per account                       | 50 GB (can be raised by contacting Cloudflare) <sup>1</sup>   |
|  Storage per class                         | Unlimited                                         |
|  Storage per Object                        | Unlimited                                         |
|  Key size                                  | 2 KiB(2048 bytes)                                 |
|  Value size                                | 128 KiB (131072 bytes)                            |
|  WebSocket message size                    | 1 MiB (only for received messages)                |
|  CPU per request                           | 30s (including WebSocket messages) <sup>2</sup>   |

<sup>1</sup> Durable Objects both bills and measures storage based on a gigabyte </br> (1 GB = 1,000,000,000 bytes) and not a gibibyte (GiB). </br>

<sup>2</sup> Each incoming HTTP request or WebSocket _message_ resets the remaining available CPU time to 30 seconds. This allows the Durable Object to consume up to 30 seconds of compute after each incoming network request, with each new network request resetting the timer. If you consume more than 30 seconds of compute between incoming network requests, there is a heightened chance that the individual Durable Object is evicted and reset.

{{<render file="_limits_increase.md" productFolder="workers">}}

## How much work can a single Durable Object do?

Durable Objects can scale horizontally across many Durable Objects. Each individual Object is inherently single-threaded.

* An individual Object has a soft limit of 1,000 requests per second. You can have an unlimited number of individual objects per namespace.
* A simple [storage](/durable-objects/api/transactional-storage-api/) `get()` on a small value that directly returns the response may realize a higher request throughput compared to a Durable Object that (for example) serializes and/or deserializes large JSON values.
* Similarly, a Durable Object that performs multiple `list()` operations may be more limited in terms of request throughput.

A Durable Object that receives too many requests will, after attempting to queue them, return an [overloaded](/durable-objects/observability/troubleshooting/#durable-object-is-overloaded) error to the caller.

## How many Durable Objects can I create?

Durable Objects are designed such that the number of individual objects in the system do not need to be limited, and can scale horizontally.

* You can create and run as many separate Durable Objects as you want within a given Durable Object namespace.
* The main limit to your usage of Durable Objects is the total storage limit per account.
* If you need more storage, contact your account team or complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.
