---
pcx_content_type: concept
title: Limits
weight: 9
---

# Limits

Durable Objects are only available on the Workers Paid plan.


| Feature                                    | Limit                                             |
| ------------------------------------------ | --------------------------------------------------|
|  Number of objects                         | unlimited (within an account or of a given class) |
|  Storage per account                       | 50 GB (can be raised by contacting Cloudflare)    |
|  Storage per class                         | unlimited                                         |
|  Storage per object                        | unlimited                                         |
|  Key size                                  | 2 KiB(2048 bytes)                                 |
|  Value size                                | 128 KiB (131072 bytes)                            |
|  Websocket message size                    | 1 MiB (only for received messages)                |
|  CPU per request                           | 30s (including websocket messages)                |



Durable Objects scale well across Objects, but each object is inherently single-threaded. A baseline of 100 req/sec is a good floor estimate of the request rate an individual Object can handle, though this will vary with workload.

Durable Objects have been built such that the number of Objects in the system do not need to be limited. You can create and run as many separate Durable Objects as you want. The main limit to your usage of Durable Objects is the total storage limit per account. If you need more storage, contact your account team.

