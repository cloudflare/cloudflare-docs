---
pcx_content_type: how-to
title: Enable HTTP destination
weight: 50
---

# Enable HTTP destination

Cloudflare Logpush now supports the ability to send logs to configurable HTTP endpoints.

Note that when using Logpush to HTTP endpoints, Cloudflare customers are expected to perform their own authentication of the pushed logs. For example, customers may specify a secret token in the URL or an HTTP header of the Logpush destination.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5. In **Select a destination**, choose **HTTP destination**.

6. Enter the **HTTP endpoint** where you want to send the logs to, and select **Continue**.

7. Select the dataset to push to the storage service.

8. In the next step, you need to configure your logpush job:
    - Enter the **Job name**.
    - Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](/logs/reference/filters/) for more information. Not all datasets have this option available.
    - In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.

9. In **Advanced Options**, you can:
    - Choose the format of timestamp fields in your logs (`RFC3339`(default),`Unix`, or `UnixNano`).
    - Select a [sampling rate](/logs/get-started/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.
    - Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.

10. Select **Submit** once you are done configuring your logpush job.

## Manage via API

To create a Logpush job, make a `POST` request to the [Logpush job creation endpoint URL](/logs/get-started/api-configuration/) with the appropriate parameters.

The supported parameters are as follows:

- Fields that are unchanged from other sources:
    - **dataset** (required): For example, `http_requests`.
    - **name** (optional): We suggest using your domain name as the job name.
    - **output_options** (optional): Refer to [Log Output Options](/logs/reference/log-output-options/) to configure fields, sample rate, and timestamp format.
- Unique fields:
    - **destination_conf**: Where to send the logs. This consists of an endpoint URL and HTTP headers used.
        - Any `"header_*"` URL parameters will be used to set request headers.
            - The HTTPS endpoint cannot have custom URL parameters that conflicts with any `"header_*"` URL parameters you have set.
            - These parameters must be properly URL-encoded (that is, use `"%20"` for a whitespace), otherwise some special characters may be decoded incorrectly.
        - `destination_conf` may have more URL parameters in addition to special `"header_*"` parameters.
            - Non URL-encoded special characters will be encoded when uploading.
        - Example: `https://logs.example.com?header_Authorization=Basic%20REDACTED&tags=host:theburritobot.com,dataset:http_requests`
    - **max_upload_bytes** (optional): The maximum uncompressed file size of a batch of logs. This must be at least 5 MB. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.
    - **max_upload_records** (optional): The maximum number of log lines per batch. This must be at least 1000 lines or more. Note that you cannot to specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

{{<Aside type="note" header="Note">}}
The `ownership_challenge` parameter is not required to create a Logpush job to an HTTP endpoint. You need to make sure that the file upload to validate the destination accepts a gzipped `test.txt.gz` with content as {"content":"tests"} compressed, otherwise it will return an error, like `error validating destination: error writing object: error uploading`.
{{</Aside>}}


## Example curl request

```bash
$ curl -s https://api.cloudflare.com/client/v4/zones/$ZONE_TAG/logpush/jobs -X POST -d '
{
  "name": "theburritobot.com-https",
  "output_options": {
      "field_names": ["EdgeStartTimestamp", "RayID"],
      "timestamp_format": "rfc3339"
  },
  "destination_conf": "https://logs.example.com?header_Authorization=Basic%20REDACTED&tags=host:theburritobot.com,dataset:http_requests",
  "max_upload_bytes": 5000000,
  "max_upload_records": 1000,
  "dataset": "http_requests",
  "enabled": true
}' \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json"
```
