---
title: Limits
pcx-content-type: concept
---

# Limits

## Account plan limits

{{<table-wrap>}}

| Feature                      | Limit                     |
| ---------------------------- | ------------------------- |
| Bucket                       | 1000 buckets per account  |
| Data storage per bucket      | Unlimited                 |
| Object size                  | 5TB per object<sup>1</sup>|
| Max upload size<sup>2</sup>  | 5GB<sup>1</sup>           |

{{</table-wrap>}}

1. The object size limit is 5 GB under 5TB. The max upload size is 5 MB under 5GB.
2. This applies to uploading a file via one request, uploading a part of a multipart upload, or
copying into a part of a multipart upload. If you have a worker, its inbound request size is
constrained by [Workers limits](/workers/platform/limits). That limit doesn't apply to subrequests.

To increase these limits, contact your Cloudflare account team.
