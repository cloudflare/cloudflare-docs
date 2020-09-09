---
title: Requesting logs
alwaysopen: true
weight: 14
---


- [Endpoints](#endpoints)
- [Required authentication headers](#required-authentication-headers)
- [Parameters](#parameters)
- [Example API requests using cURL](#example-api-requests-using-curl)
- [Fields](#fields)

<a id="endpoints" style="color: inherit">

### Endpoints
</a>

The three endpoints the Logpull API supports are:

* `GET /logs/received` - returns HTTP request log data based on the parameters specified
* `GET /logs/received/fields` - returns the list of all available log fields
* `GET /logs/rayids/<rayid>` - returns HTTP request log data matching `<rayid>`

<a id="required-authentication-headers" style="color: inherit">

### Required authentication headers
</a>

The following headers are required for all endpoint calls:

* `X-Auth-Email` - the Cloudflare account email address associated with the domain
* `X-Auth-Key` - the Cloudflare API key

<a id="parameters" style="color: inherit">

### Parameters
</a>

The API expects endpoint parameters in the GET request query string.  See the example formats below.

`logs/received`

```bash
https://api.cloudflare.com/client/v4/zones/<zone_id>/logs/received?start=<unix|rfc3339>&end=<unix|rfc3339>[&count=<int>][&sample=<float>][&fields=<fields>][&timestamps=<string>]
```

`logs/rayids/<rayid>`

```bash
https://api.cloudflare.com/client/v4/zones/<zone_id>/logs/rayids/<ray_id>?[&fields=<string>][&timestamps=<strings>]
```

The following table describes the parameters available:

<table style="border: solid 2px darkgrey; width: 75%;">
    <thead style="background: #ffeadf;">
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Applies to</th>
            <th>Required?</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><em>start</em></td>
            <td>
                <p>- Inclusive</p>
                <p>- Timestamp formatted as UNIX (UTC by definition), UNIX Nano, or rfc3339 (specifies time zone)</p>
                <p>- Must be no more than 7 days earlier than now</p>
            </td>
            <td>/logs/received</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><em>end</em></td>
            <td>
                <p>- Exclusive</p>
                <p>- Same format as <em>start</em></p>
                <p>- Must be at least 1 minute earlier than now and later than <em>start</em></p>
            </td>
            <td>/logs/received</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td><em>count</em></td>
            <td>
                <p>- Return up to that many records</p>
                <p>- Do not include if returning all records</p>
                <p>- Results are not sorted; therefore, different data for repeated requests is likely</p>
                <p></p>
                <p>- Applies to number of total records returned, not number of sampled records</p>
            </td>
            <td>/logs/received</td>
            <td>No</td>
        </tr>
        <tr>
            <td><em>sample</em></td>
            <td>
                <p>- Return only a sample of records</p>
                <p>- Do not include if returning all records</p>
                <p>- Value can range from 0.001 to 1.0 (inclusive)</p>
                <p>- <em>sample=0.1</em> means return 10% (1 in 10) of all records</p>
                <p>- Results are random; therefore, different numbers of results for repeated requests are likely</p>
            </td>
            <td>/logs/received</td>
            <td>No</td>
        </tr>
        <tr>
            <td><em>fields</em></td>
            <td>
                <p>- Comma-separated list of fields to return</p>
                <p>- If empty, the default list is returned</p>
            </td>
            <td>
                <p>/logs/received</p>
                <p>/logs/rayids</p>
            </td>
            <td>No</td>
        </tr>
        <tr>
            <td><em>timestamps</em></td>
            <td>
                <p>- Format in which timestamp fields will be returned</p>
                <p>- Value options are: <em>unixnano</em> (default), <em>unix</em>, <em>rfc3339</em></p>
                <p>- Timestamps retuned as integers for <em>unix</em> and <em>unixnano</em> and as strings for <em>rfc3339</em></p>
            </td>
            <td>
                <p>/logs/received</p>
                <p>/logs/rayids</p>
            </td>
            <td>No</td>
        </tr>
    </tbody>
</table>


<Aside type="note">

The maximum time range from <em>start</em> to <em>end</em> can't exceed 1 hour. Because <em>start</em> is inclusive and <em>end</em> is exclusive, to get all the data for every minute, starting at 10AM, the proper values are:

`start=2018-05-15T10:00:00Z&end=2018-05-15T10:01:00Z`, then `start=2018-05-15T10:01:00Z&end=2018-05-15T10:02:00Z` and so on.

The overlap will be handled correctly.
</Aside>

<a id="example-api-requests-using-curl" style="color: inherit">

### Example API requests using cURL
</a>

`logs/received`

```bash
curl -s \
    -H "X-Auth-Email: <REDACTED>" \
    -H "X-Auth-Key: <REDACTED>" \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received?start=2017-07-18T22:00:00Z&end=2017-07-18T22:01:00Z&count=1&fields=RayID,ClientIP"
```

`logs/rayids`

```bash
curl -s \
    -H "X-Auth-Email: <REDACTED>" \
    -H "X-Auth-Key: <REDACTED>" \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/rayids/47ff6e2c812d3ccb?timestamps=rfc3339"
```

<Aside type="note">

The IATA code returned as part of the Ray ID does not need to included in the request. For example: if you have a RayID such as `49ddb3e70e665831-DFW` only include `49ddb3e70e665831` in your request.
</Aside>

<a id="fields" style="color: inherit">

### Fields
</a>

Unless specified in the <em>fields parameter</em>, the API returns a limited set of log fields. This default field set may change at any time. The list of all available fields is at:

`https://api.cloudflare.com/client/v4/zones/<zone_id>/logs/received/fields`

The order in which fields are specified doesn't matter, and the order of fields in the response is not specified.

Using <em>Bash</em> subshell and <em>jq</em>, you can download the logs with all available fields without manually copying and pasting the fields into the request. For example:

```bash
curl -s \
    -H "X-Auth-Email: <REDACTED>" \
    -H "X-Auth-Key: <REDACTED>" \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received?start=2017-07-18T22:00:00Z&end=2017-07-18T22:01:00Z&count=1&fields=$(curl -s -H "X-Auth-Email: <REDACTED>" -H "X-Auth-Key: <REDACTED>" "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received/fields" | jq '. | to_entries[] | .key' -r | paste -sd "," -)"
```

*See [HTTP request fields](/logs/log-fields/#http-requests)* for the currently available fields.