---
title: Limits
pcx_content_type: concept
---

# Limits

## Rate limiting on managed public buckets through `r2.dev`

Managed public bucket access through an `r2.dev` subdomain is not intended for production usage and has a rate limit applied to it. If you exceed the rate limit, requests through your `r2.dev` subdomain will be temporarily throttled and you will receive a `429 Too Many Requests` response. For production use cases, consider linking a [custom domain](/r2/buckets/public-buckets/#custom-domains) to your bucket.

## Account plan limits

{{<table-wrap>}}

| Feature                         | Limit                                 |
| ------------------------------- | ------------------------------------- |
| Bucket                          | 1000 buckets per account              |
| Data storage per bucket         | Unlimited                             |
| Object key length               | 1,024 bytes                           |
| Object metadata size            | 8,192 bytes                           |
| Object size                     | 5 TB per object                       |
| Maximum object name length      | 1024 bytes                            |
| Maximum upload size<sup>1</sup> | 5 GB                                  |
| Maximum upload parts            | 10,000                                |
| Maximum custom domains per bucket | 50                                  |

{{</table-wrap>}}

<sup>1</sup> Max upload size applies to uploading a file via one request, uploading a part of a multipart upload, or copying into a part of a multipart upload. If you have a Worker, its inbound request size is
constrained by [Workers request limits](/workers/platform/limits#request-limits). The max upload size limit does not apply to subrequests.<br>
Review the [Examples](/r2/examples/) on how to use the SDKs.<br>

{{<render file="_limits_increase.md" productFolder="workers">}}

## Caching

Currently Cloudflare's [Tiered Cache](/cache/how-to/tiered-cache/) feature is not compatible with responses from R2. These responses will act as if Tiered Cache is not configured. 
