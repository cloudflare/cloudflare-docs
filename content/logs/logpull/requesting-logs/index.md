---
pcx_content_type: reference
title: Requesting logs
weight: 15
layout: single
---

# Requesting logs

## Endpoints

The three endpoints supported by the Logpull API are:

- `GET /logs/received` - returns HTTP request log data based on the parameters specified
- `GET /logs/received/fields` - returns the list of all available log fields
- `GET /logs/rayids/<rayid>` - returns HTTP request log data matching `<rayid>`

## Required authentication headers

The following headers are required for all endpoint calls:

- `X-Auth-Email` - the Cloudflare account email address associated with the domain
- `X-Auth-Key` - the Cloudflare API key

Alternatively, API tokens with Logs Edit permissions can also be used for authentication:

- `Authorization: Bearer <API_TOKEN>`

## Parameters

The API expects endpoint parameters in the GET request query string. The following are example formats:

`logs/received`

```bash
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received?start=<unix|rfc3339>&end=<unix|rfc3339>[&count=<int>][&sample=<float>][&fields=<FIELDS>][&timestamps=<string>][&CVE-2021-44228=<boolean>]
```

`logs/rayids/<RAY_ID>`

```bash
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/rayids/<RAY_ID>?[&fields=<string>][&timestamps=<strings>]
```

The following table describes the parameters available:

{{<table-wrap>}}

| Parameter      | Description                                                                                                                                                                                                                                                                                                                          | Applies to                                | Required |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | -------- |
| start          | <p>- Inclusive</p> <p>- Timestamp formatted as `UNIX` (UTC by definition), `UNIX Nano`, or `rfc3339` (specifies time zone)</p> <p>- Must be no more than 7 days earlier than now</p>                                                                                                                                                 | /logs/received                            | Yes      |
| end            | <p>- Exclusive</p> <p>- Same format as <em>start</em></p> <p>- Must be at least 1 minute earlier than now and later than <em>start</em></p>                                                                                                                                                                                          | /logs/received                            | Yes      |
| count          | <p>- Return up to that many records</p> <p>- Do not include if returning all records</p> <p>- Results are not sorted; therefore, different data for repeated requests is likely</p> <p></p> <p>- Applies to number of total records returned, not number of sampled records</p>                                                      | /logs/received                            | No       |
| sample         | <p>- Return only a sample of records</p> <p>- Do not include if returning all records</p> <p>- Value can range from `0.0` (exclusive) to `1.0` (inclusive)</p> <p>- `sample=0.1` means return 10% (1 in 10) of all records</p> <p>- Results are random; therefore, different numbers of results for repeated requests are likely</p> | /logs/received                            | No       |
| fields         | <p>- Comma-separated list of fields to return</p> <p>- If empty, the default list is returned</p>                                                                                                                                                                                                                                    | <p>/logs/received</p> <p>/logs/rayids</p> | No       |
| timestamps     | <p>- Format in which timestamp fields will be returned</p> <p>- Value options are: `unixnano` (default), `unix`, `rfc3339`</p> <p>- Timestamps returned as integers for `unix` and `unixnano` and as strings for `rfc3339`</p>                                                                                                       | <p>/logs/received</p> <p>/logs/rayids</p> | No       |
| CVE-2021-44228 | <p>- Optional redaction for [CVE-2021-44228](https://www.cve.org/CVERecord?id=CVE-2021-44228). This option will replace every occurrence of the string `${` with `x{`.</p> <p> For example: `CVE-2021-44228=true` </p>                                                                                                               | <p>/logs/received</p>                     | No       |

{{</table-wrap>}}

{{<Aside type="note" header="Note">}}

The maximum time range from **start** to **end** cannot exceed 1 hour. Because **start** is inclusive and **end** is exclusive, to get all the data for every minute, starting at 10AM, the proper values are:

`start=2018-05-15T10:00:00Z&end=2018-05-15T10:01:00Z`, then `start=2018-05-15T10:01:00Z&end=2018-05-15T10:02:00Z` and so on.

The overlap will be handled correctly.

{{</Aside>}}

## Example API requests using cURL

`logs/received`

```bash
curl -s \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>" \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received?start=2017-07-18T22:00:00Z&end=2017-07-18T22:01:00Z&count=1&fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID"
```

`logs/rayids/<RAY_ID>`

```bash
curl -s \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>" \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/rayids/47ff6e2c812d3ccb?timestamps=rfc3339"
```

{{<Aside type="note" header="Note">}}

The IATA code returned as part of the **Ray ID** does not need to included in the request. For example, if you have a **RayID** such as `49ddb3e70e665831-DFW`, only include `49ddb3e70e665831` in your request.

{{</Aside>}}

## Fields

Unless specified in the **fields** parameter, the API returns a limited set of log fields. This default field set may change at any time. The list of all available fields is at:

`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received/fields`

The order in which fields are specified does not matter, and the order of fields in the response is not specified.

Using bash subshell and `jq`, you can download the logs with all available fields without manually copying and pasting the fields into the request. For example:

```bash
curl -s \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>" \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received?start=2017-07-18T22:00:00Z&end=2017-07-18T22:01:00Z&count=1&fields=$(curl -s -H "X-Auth-Email: <EMAIL>" -H "X-Auth-Key: <API_KEY>" "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received/fields" | jq '. | to_entries[] | .key' -r | paste -sd "," -)"
```

Refer to [HTTP request fields](/logs/reference/log-fields/zone/http_requests) for the currently available fields.
