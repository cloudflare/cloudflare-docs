---
title: Additional details
order: 18
---

# Additional details

## Estimating daily data volume

To estimate the amount of data for a zone per day (the number of log lines and the amount of bytes they take up), request a 1% or 10% sample of data for a 1-hour period (use 10% if your volume is low). Note that `start=2018-12-15T00:00:00Z` and `end=2018-12-15T01:00:00Z` span a 1-hour period, and `sample=0.1`.

```bash
curl -s \
    -H "X-Auth-Email: <REDACTED>" \
    -H "X-Auth-Key: <REDACTED>" \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received?start=2018-12-15T00:00:00Z&end=2018-12-15T01:00:00Z&sample=0.1" \
    >sample.log
...
$ wc -l sample.log
83 sample.log
...
$ ls -lh sample.log
-rw-r--r-- 1 mik mik 25K Dec 17 15:49 sample.log
```

Based on this information, the approximate number of messages/day is 19,920 (83*10*24), and the byte size is 6MB (25K*10*24). The size estimate is based on the default response field set. Changing the response field set (*see [Fields](/logpull-api/understanding-the-basics/#fields)*) will change the response size.

To get a good estimate of daily traffic, it is best to get at least 30 log lines in your hourly sample. If the response size is too small (or too large), adjust the sample value, not the time range.

## Compression

Responses are compressed by default (gzip). `cURL` decompresses responses transparently, unless called with:

`-H "accept-encoding: gzip"`

 In that case, the output remains gzipped. Compressed data is approximately 5-10% of its uncompressed size. This means that a 1GB uncompressed response gets compressed down to 50-100MB.

## Service expectations

### Successful requests

If the response or timeout limit is exceeded or there is any problem fetching the response, a `200` status will be returned and the response will end with the non-JSON text line “Error streaming data.” Because responses are streamed, there is no way to identify the error ahead of time. A response is successful if it does not end with the “Error streaming data" text line.

Once you receive a successful response for a given zone and time range, the following is true for all subsequent requests:

* The number and content of returned records will be same
* The order of records returned may (and is likely to) be different

### Response fields

Regarding the inclusion of the *fields* parameter:

* When fields are explicitly included in the request URL, the fields returned will not change
* When not specified in the URL, the default fields are returned
* The default fields may change at any time

### Limits

The following usage restrictions apply:

* **Rate limits:** exceeding these limit results in a `429` error response
  - 15 requests/min per zone
  - 180 requests/min per user (email address)
* **Time range:** the maximum difference between the *start* and *end* parameters can be 1 hour
* **Response size:** the maximum response size is 10GiB per request, which is equivalent to about 15M records when about 55 fields are selected (more records can be retrieved when less fields are selected because the per record size will be smaller)
* **Timeout:** the response will fail with a terminated connection after 10 minutes
* **Stream Timeout:** the request will be terminated with a `408` error response if the connection is idle for 30s. This timeout usually means that the request is probably too exhaustive (frequent timeouts (> 12/hr) will result in subsequent queries
to be blocked with status code 429 for 1hr) and so:
    * try requesting records using lesser number of fields
    * try with smaller **start** and **end** parameters
