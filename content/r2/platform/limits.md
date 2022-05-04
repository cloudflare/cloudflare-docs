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
| Object size                  | 5 TB per object<sup>1</sup>|
| Max upload size<sup>3</sup>  | 5 GB<sup>2</sup>           |

{{</table-wrap>}}

1. The object size limit is 5 GB under 5 TB. 
2. The max upload size is 5 MB under 5 GB.
3. Max upload size applies to uploading a file via one request, uploading a part of a multipart upload, or
copying into a part of a multipart upload. If you have a Worker, its inbound request size is
constrained by [Workers limits](/workers/platform/limits). The max upload size limit does not apply to subrequests.

To increase these limits, contact your Cloudflare account team.
