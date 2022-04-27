---
pcx-content-type: concept
title: Enable HTTP destination 
weight: 50
---

# Enable HTTP destination

Cloudflare Logpush now supports the ability to send logs to arbitrary HTTP endpoints.

Note that when using Logpush to HTTP endpoints, Cloudflare customers are expected to perform their own authentication of the pushed logs. For example, customers may specify a secret token in the URL or an HTTP header of the Logpush destination.

## Manage via API

To create a job, make a `POST` request to the [Logpush job creation endpoint URL](/logs/reference/logpush-api-configuration/) with the appropriate parameters.

The supported parameters are as follows:

- Fields that are unchanged from other sources:
    - **dataset** (required): For example, `http_requests`.
    - **name** (optional): We suggest using your domain name as the job name.
    - **logpull_options** (optional): Refer to [Logpush API configuration options](/logs/reference/logpush-api-configuration/#options) to configure fields, sample rate, and timestamp format.
- Unique fields: 
    - **destination_conf**: Where to send the logs. This consists of an endpoint URL and HTTP headers used.
        - Any `"header_*"` URL parameters will be used to set request headers.
            - Thus, the HTTPS endpoint cannot have custom URL parameters that conflicts with this.
            - These parameters must be properly URL-encoded (that is, use `"%20"` for a whitespace), otherwise some special characters may be decoded incorrectly.
        - `destination_conf` may have more URL parameters in addition to special `"header_*"` parameters.
            - Non URL-encoded special characters will be encoded when uploading.
        - Example: `https://logs.example.com?header_Authorization=Basic%20REDACTED&tags=host:theburritobot.com,dataset:http_requests`
    - **max_upload_bytes** (optional): The maximum uncompressed file size of a batch of logs. This must be at least 5 MB. Note that there is no way to set a minimum file size; this means that log files may be much smaller than this batch size.
    - **max_upload_records** (optional): The maximum number of log lines per batch. This must be at least 1000 lines or more. Note that there is no way to specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

{{<Aside type="note" header="Note">}}
**Ownership_challenge** is not required.
{{</Aside>}}


## Example curl request

```bash
$ curl -s https://api.cloudflare.com/client/v4/zones/$ZONE_TAG/logpush/jobs -X POST -d '
{
  "name": "theburritobot.com-https",
  "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
  "destination_conf": "https://logs.example.com?header_Authorization=Basic%20REDACTED&tags=host:theburritobot.com,dataset:http_requests",
  "max_upload_bytes": 5000000,
  "max_upload_records": 1000,
  "dataset": "http_requests",
  "enabled": true
}' \
-H "X-Auth-Email: $X_AUTH_EMAIL" \
-H "X-Auth-Key: $X_AUTH_KEY"
```