---
title: Limits
pcx_content_type: concept
weight: 2
---

# Limits

{{<Aside type="note">}}

We want to encourage you to build any application you can dream up, and realize that doesn't always fit within our limits. 

To increase any of our limits, [please fill out our form!](https://forms.gle/ukpeZVLWLnKeixDu7)

{{</Aside>}}

## Rate limiting on managed public buckets through `r2.dev`

Managed public bucket access through an `r2.dev` subdomain is not intended for production usage, and has a rate limit applied to it. When exceeding this rate limit, requests through your `r2.dev` subdomain will be temporarily throttled, and receive a `429 Too Many Requests` response. For production use cases, consider linking a [custom domain](/r2/data-access/public-buckets/#custom-domains) to your bucket.

## Account plan limits

{{<table-wrap>}}

| Feature                         | Limit                                 |
| ------------------------------- | ------------------------------------- |
| Bucket                          | 1000 buckets per account              |
| Data storage per bucket         | Unlimited                             |
| Object metadata size            | 2,048 bytes                           |
| Object size                     | 5 TB per object<sup>1</sup>           |
| Maximum upload size<sup>3</sup> | 5 GB<sup>2</sup>                      |
| Maximum upload parts            | 10,000                                |

{{</table-wrap>}}

<sup>1</sup>The object size limit is 5 GB less than 5 TB, so 4.995 TB.<br>
<sup>2</sup>The max upload size is 5 MB less than 5 GB, so 4.995 GB.<br>
<sup>3</sup>Max upload size applies to uploading a file via one request, uploading a part of a multipart upload, or
copying into a part of a multipart upload. If you have a Worker, its inbound request size is
constrained by [Workers request limits](/workers/platform/limits#request-limits). The max upload size limit does not apply to subrequests.<br>
Review the [Examples](/r2/examples/) on how to use SDKs with the S3 API to upload large files.<br>

To increase these limits, contact your Cloudflare account team.
