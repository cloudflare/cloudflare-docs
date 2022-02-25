---
pcx-content-type: concept
title: Instant Logs
weight: 116
---

# Instant Logs

Instant Logs allows Cloudflare Enterprise customers to access a live stream of the traffic for their domain from the Cloudflare dashboard or from a command-line interface (CLI). Seeing data in real time allows you to investigate an attack, troubleshoot, debug or test out changes made to your network. Instant Logs is lightweight, simple to use and does not require any additional setup.

## Instant Logs on the Cloudflare dashboard

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).

2.  Select the Enterprise domain you want to use with Instant Logs.

3.  Go to **Analytics** > **Instant Logs**.

4.  Click **Start streaming**.

5.  Click **Add filters** to narrow down the events shown.

The filters you can add are **ASN**, **Cache status**, **Country**, **Client IP**, **Host**, **HTTP method**, **Path**, **Status code**, **Firewall action matches**, and **Firewall rule ID matches**. If you would like to see filtering on additional criteria, leave us feedback on the form linked on the Instant Logs page.

Once a filter is selected and the stream has started, only log lines that match the filter criteria will appear. Filters are not applied retroactively to logs already showing in the dash.

## Instant Logs on the CLI

### 1. Create an Instant Logs Job

Create a session by sending a `POST` request to our Instant Logs job endpoint with the following parameters:

*   **Fields** - List any field available in our [HTTP request dataset](/logs/reference/log-fields/zone/http_requests).

*   **Sample** - The sample parameter is the sample rate of the records set by the client: `"sample": 1` is 100% of records `"sample": 10` is 10% and so on.

{{<Aside type="note">}}

Instant Logs has a maximum data rate supported. For high volume domains, we sample server side as indicated in the `"sampleInterval"` parameter returned in the logs.

{{</Aside>}}

*   **Filters** - Use filters to drill down into specific events. Filters consist of three parts: key, operator and value. The keys we support are **Client ASN**, **CacheCacheStatus**, **ClientCountry**, **ClientIP**, **ClientRequestHost**, **ClientRequestMethod**, **ClientRequestPath**, **EdgeResponseStatus**, **FirewallMatchesAction**, and **FirewallMatchesRuleIDs**.

This is the list of the supported operators that we have available:

| **Name**    | **Op**      |
| ----------- | ----------- |
| Equals      | `"eq"`      |
| Not Equals  | `"neq"`     |
| Greater Than | `"gt"`     |
| Greater Than or Equal to  | `"geq"`  |
| Less Than      | `"lt"`   |
| Less Than or Equal to  | `"leq"`     |
| Starts with      | `"startsWith"`    |
| Ends with  | `"endsWith"`            |
| Contains      | `"contains"`         |
| Is in  | `"In"`            |

Below we have three examples of filters:

```bash
"filter":"{\"where\":{\"and\":[{\"key\":\"ClientCountry\",\"operator\":\"neq\",\"value\":\"ca\"}]}}"
```

```bash
"filter":"{\"where\":{\"and\":[{\"key\":\"EdgeResponseStatus\",\"operator\":\"in\",\"value\":\"200,201\"}]}}"
```

```bash
"filter":"{\"where\":{\"and\":[{\"key\":\"ClientRequestPath\",\"operator\":\"contains\",\"value\":\"/static\"}, {\"where\":{\"and\":[{\"key\":\"ClientRequestHost\",\"operator\":\"eq\",\"value\":\"theburritobot.com\"}]}}"
```

Example request using cURL:

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/logpush/edge/jobs' \
-H 'X-Auth-Key: <KEY>' \
-H 'X-Auth-Email: <EMAIL>' \
-H 'Content-Type: application/json' \
-d '{
    "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
    "sample": 1,
    "filter": "",
    "kind": "instant-logs"
}' | jq . 
```

Response:

The response will include a new field called **destination\_conf**. The value of this field is your unique WebSocket address that will receive messages from Cloudflare's edge.

```bash
{
    "errors": [],
    "messages": [],
    "result": {
        "id": 401,
        "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
        "sample": 100,
        "filter": "",
        "destination_conf": "wss://datalab.cfdata.org/instant-logs/ws/sessions/949f9eb846f06d8f8b7c91b186a349d2",
        "kind": "instant-logs"
    },
    "success": true
}
```

### 2. Connect to WebSocket

Using a CLI utility like [Websocat](https://github.com/vi/websocat), you can connect to the WebSocket and start immediately receiving logs.

```bash
websocat wss://datalab.cfdata.org/instant-logs/ws/sessions/949f9eb846f06d8f8b7c91b186a349d2
```

Response:

Once connected to the websocket, you will receive messages of line-delimited JSON.

### Angle Grinder

Now that you have a connection to Cloudflare's websocket and are receiving logs from the edge, you can start slicing and dicing the logs. A handy tool for this is [Angle Grinder](https://github.com/rcoh/angle-grinder). Angle Grinder lets you apply filtering, transformations and aggregations on stdin with first class JSON support. For example, to get the number of visitors from each country you can sum the number of events by the `ClientCountry` field.

```bash
websocat wss://datalab.cfdata.org/instant-logs/ws/sessions/949f9eb846f06d8f8b7c91b186a349d2 | agrind '* | json | sum(sampleInterval) by ClientCountry'
```

Response:

| **ClientCountry**    | **\_sum**      |
| ----------- | ----------- |
| pt | `4` |
| fr | `3` |
| us | `3` |
| om | `2` |
| ar | `1` |
| au | `1` |

## Datasets available

For the moment, HTTP requests is the only dataset available. In the future, we will expand to other datasets.

## Exporting

You can download the table of logs that appears in your dash using the **Export** button. The data will be downloaded in JSON format.

## Limits

Instant Logs has three limits set in place:

*   Only one active Instant Logs session per zone.
*   Maximum session time is 60 minutes.
*   If you stop listening to a socket for more than five minutes.

If either of these limits are reached, the logs stream will automatically stop.

## Common issues

*   Get a HTTP 301 when attempting to connect to the WebSocket.
    *   Make sure you are using the `wss://` protocol when connecting to your WebSocket.

*   Get a HTTP 429.
    *   Connection requests are rate limited. Try your request again after waiting a few minutes.

*   No data received.
    *   First, double check if you have a filter defined. If you do, it may be too strict (or incorrect) which ends up dropping all your data.
    *   If you are confident in your filter, check the sample rate you used when creating the session. For example, a sample of 100 means you will receive one log for every 100 requests to your zone.
    *   Finally, make sure the destination is proxied through Cloudflare (also known as orange clouded). We cannot log your request if it does not go through our edge network.

*   There was an error fetching your data.
    *   Make sure you have the correct permissions. In order to use Instant Logs you need Super Administrator, Administrator, Log Share or Log Share Reader permissions.

## Connect with us

If you have any feature requests or notice any bugs, share your feedback directly with us by joining the [Cloudflare Developers community on Discord](https://discord.gg/h35x2dkuq8).
