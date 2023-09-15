---
title: Limits
pcx_content_type: concept
---

# Limits

{{<Aside type="note">}}

We want to encourage you to build any application you can dream up, but we realize that does not always fit within our limits. 

To increase any of our limits, fill out the [Limit Increase Request form](https://forms.gle/ukpeZVLWLnKeixDu7).

{{</Aside>}}

## Rate limiting on managed public buckets through `r2.dev`

Managed public bucket access through an `r2.dev` subdomain is not intended for production usage and has a rate limit applied to it. If you exceed the rate limit, requests through your `r2.dev` subdomain will be temporarily throttled and you will receive a `429 Too Many Requests` response. For production use cases, consider linking a [custom domain](/r2/buckets/public-buckets/#custom-domains) to your bucket.

## Account plan limits

{{<table-wrap>}}

| Feature                         | Limit                                 |
| ------------------------------- | ------------------------------------- |
| Bucket                          | 1000 buckets per account              |
| Data storage per bucket         | Unlimited                             |
| Object metadata size            | 8,192 bytes                           |
| Object size                     | 5 TiB per object<sup>1</sup>           |
| Maximum upload size<sup>3</sup> | 5 GiB<sup>2</sup>                      |
| Maximum upload parts            | 10,000                                |
| Maximum custom domains per bucket | 50                                |

{{</table-wrap>}}

<sup>1</sup>The object size limit is 5 GiB less than 5 TiB, so 4.995 TiB.<br>
<sup>2</sup>The max upload size is 5 MiB less than 5 GiB, so 4.995 GiB.<br>
<sup>3</sup>Max upload size applies to uploading a file via one request, uploading a part of a multipart upload, or copying into a part of a multipart upload. If you have a Worker, its inbound request size is
constrained by [Workers request limits](/workers/platform/limits#request-limits). The max upload size limit does not apply to subrequests.<br>
Review the [Examples](/r2/examples/) on how to use SDKs with the S3 API to upload large files.<br>

To increase these limits, contact your Cloudflare account team.
