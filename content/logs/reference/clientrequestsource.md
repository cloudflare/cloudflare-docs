---
pcx-content-type: reference
title: ClientRequestSource field
weight: 130
---

# ClientRequestSource field

The possible values for the `ClientRequestSource` field are the following:

{{<table-wrap>}}

| Value                                      | Request source          | Description                                  |
| ------------------------------------------ | --------------- | -------------------------------------------- |
| <span style="font-weight: 400;">`0`</span> | unknown         | Should never happen.                        |
| <span style="font-weight: 400;">`1`</span> | eyeball         | A request from an end user. If you want to count requests made the Cloudflare Edge, the query should filter on `requestSource=eyeball`.            |
| <span style="font-weight: 400;">`2`</span> | purge           | A request made by Cloudflare's purge system.             |
| <span style="font-weight: 400;">`3`</span> | alwaysOnline    | A request made by Cloudflare's Always Online crawler.                   |
| <span style="font-weight: 400;">`4`</span> | healthcheck     |  A request made by Cloudflare's Health Check system.                                      |
| <span style="font-weight: 400;">`5`</span> | edgeWorkerFetch | A fetch request made from an edge Worker. |
| <span style="font-weight: 400;">`6`</span> | edgeWorkerCacheAPI | A cache API call made from an edge Worker.                        |
| <span style="font-weight: 400;">`7`</span> | edgeWorkerKV    | A KV call made from an edge Worker.                        |  
| <span style="font-weight: 400;">`8`</span> | imageResizing   | Requests made by Cloudflare's Image Resizing product.                        |  
| <span style="font-weight: 400;">`9`</span> | orangeToOrange  | A request that comes from another orange clouded zone.                        |   
| <span style="font-weight: 400;">`10`</span> | sslDetector     | A request made by Cloudflare's [SSL Detector system](https://blog.cloudflare.com/ssl-tls-recommender/).                        |   
| <span style="font-weight: 400;">`11`</span> | earlyHintsCache | An [Early Hint request](https://blog.cloudflare.com/early-hints/).                       |

{{</table-wrap>}}