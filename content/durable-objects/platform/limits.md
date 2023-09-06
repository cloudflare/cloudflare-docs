---
pcx_content_type: concept
title: Limits
weight: 9
---

# Limits

Durable Objects are only available on the [Workers Paid plan](/workers/platform/pricing/#workers).


| Feature                                    | Limit                                             |
| ------------------------------------------ | --------------------------------------------------|
|  Number of Objects                         | Unlimited (within an account or of a given class) |
|  Storage per account                       | 50 GB (can be raised by contacting Cloudflare) <sup>1</sup>   |
|  Storage per class                         | unlimited                                         |
|  Storage per Object                        | unlimited                                         |
|  Key size                                  | 2 KiB(2048 bytes)                                 |
|  Value size                                | 128 KiB (131072 bytes)                            |
|  WebSocket message size                    | 1 MiB (only for received messages)                |
|  CPU per request                           | 30s (including websocket messages)                |

{{<Aside type="note">}}

You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. To request an increase to a limit, complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

{{</Aside>}}

Durable Objects can scale horizontally across many Durable Objects. Each individual Object is inherently single-threaded.

An individual Object has a soft limit of 1,000 requests per second. A simple get on a small value that directly returns the response may realize a higher request throughput.

Correspondingly, a Durable Object that (for example) serializes and/or deserializes large JSON values or performs larger `list()` operations may be more limited in terms of request throughput. A Durable Object that receives too many requests will, after attempting to queue them, return an [overloaded](/durable-objects/platform/troubleshooting/#durable-object-is-overloaded) error to the caller.

Durable Objects have been built such that the number of Objects in the system do not need to be limited. You can create and run as many separate Durable Objects as you want. The main limit to your usage of Durable Objects is the total storage limit per account. If you need more storage, contact your account team or complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

<sup>1</sup> Durable Objects both bills and measures storage based on a gigabyte (1 GB = 1,000,000,000 bytes) and not a gibibyte (GiB).