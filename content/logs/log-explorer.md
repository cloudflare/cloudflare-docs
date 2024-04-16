---
pcx_content_type: concept
title: Log Explorer (beta)
weight: 118
---

{{<heading-pill style="beta">}}Log Explorer{{</heading-pill>}}

Log Explorer enables you to store and explore your Cloudflare logs directly within the Cloudflare Dashboard or API. Giving you visibility into your logs without the need to forward them to third parties. Logs are stored on Cloudflare's global network using the R2 object storage platform and can be queried via the Dashboard or SQL API.

{{<Aside type="note">}}

Log Explorer is currently in beta. To request access, complete the [sign-up form](https://cloudflare.com/lp/log-explorer/).

{{</Aside>}}

## Supported datasets

The following zone-level datasets are currently available with Log Explorer:

* [HTTP requests](/logs/reference/log-fields/zone/http_requests/) (`FROM http_requests`)
* [Firewall events](/logs/reference/log-fields/zone/firewall_events/) (`FROM firewall_events`)

## Authentication

In order to communicate with the API, you will need to configure the appropriate authentication headers.

* `X-Auth-Email` - the Cloudflare account email address associated with the domain
* `X-Auth-Key` - the Cloudflare API key

Alternatively, API tokens with Logs edit permissions can also be used for authentication:

* `Authorization: Bearer <API_TOKEN>`

## Enable Log Explorer

Use the Log Explorer API to enable Log Explorer for each dataset you wish to store. It may take up to 30 minutes after a logstream is enabled before you can view the logs.

The following curl command is an example for enabling `http_requests`, as well as the expected response when the command succeeds.

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/explorer/datasets \
  --header 'Authorization: Bearer <API_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
  "dataset": "http_requests"
}'
```

```bash
{
  "result": {
    "id": 1,
    "dataset": "http_requests",
    "created_at": "2023-09-25T22:12:31Z",
    "updated_at": "2023-09-25T22:12:31Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Use Log Explorer from the dashboard

Filtering and viewing your logs is available via the Cloudflare Dashboard.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and domain.
3. Go to **Analytics & Logs** > **Log Explorer**.
4. From the dropdown, select the **Dataset** you want to use.
5. Select a **Limit**. That is the maximum number of results to return, for example, 50.
6. Select the **Time period** from which you want to query, for example, the previous 12 hours.

![Log Explorer dashboard](/images/logs/log-explorer-dash.png)

7. Select **Add filter** to create your query. Select a **Field**, an **Operator**, and a **Value**.

![Log Explorer filters](/images/logs/log-explorer-filters.png)

8. A query preview is displayed. Select **Use custom SQL**, if you would like to change it.
9. Select **Run query** when you are done. The results are displayed below within the **Query results** section.

{{<Aside type="note">}}

You can also access the Log Explorer dashboard directly from the [Security Analytics dashboard](/waf/analytics/security-analytics/#logs). When doing so, the filters you applied in Security Analytics will automatically carry over to your query in Log Explorer.

{{</Aside>}}

## Use Log Explorer from the Query API

Log Explorer exposes a query endpoint that uses a familiar SQL syntax for querying your logs generated with Cloudflare's network.

For example, to find an HTTP request with a specific [Ray ID](/fundamentals/reference/cloudflare-ray-id/), you can perform the following SQL query.

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/explorer/query/sql \
  --header "Authorization: Bearer <API_TOKEN>" \
  --url-query query="SELECT clientRequestScheme, clientRequestHost, clientRequestMethod, edgeResponseStatus, clientRequestUserAgent FROM http_requests WHERE RayID = '806c30a3cec56817' LIMIT 1"
```

Which returns the following HTTP request details:

```bash
{
  "result": [
    {
      "clientrequestscheme": "https",
      "clientrequesthost": "example.com",
      "clientrequestmethod": "GET",
      "clientrequestuseragent": "curl/7.88.1",
      "edgeresponsestatus": 200
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Output formats

Log Explorer output can be presented in different formats, besides JSON: JSON Lines (also known as NDJSON), CSV, and plain text. The plain text uses ASCII tables similar to psql's `aligned` output mode. Besides the convenience factor of not having to translate the format on the client side, JSON Lines, CSV, and plain text formats have the advantage of being streamed from the API. So for large result sets, you will get a response earlier.

You can choose the output format with an HTTP `Accept` header, as shown in the table below:

| Output format | Content type           | Streaming? |
|---------------|------------------------|------------|
| JSON          | `application/json`     | No         |
| JSON Lines    | `application/x-ndjson` | Yes        |
| CSV           | `text/csv`             | Yes        |
| Plain text    | `text/plain`           | Yes        |


## Optimizing your queries

All the tables supported by Log Explorer contain a special column called `date`, which helps to narrow down the amount of data that is scanned to respond to your query, resulting in faster query response times. The value of `date` must be in the form of `YYYY-MM-DD`. For example, to query logs that occurred on October 12, 2023, add the following to your `WHERE` clause: `date = '2023-10-12'`. The column supports the standard operators of `<`, `>`, and `=`.

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/explorer/query/sql \
  --header 'Authorization: Bearer <API_TOKEN>' \
  --url-query query="SELECT clientRequestMethod, clientRequestPath, clientRequestProtocol FROM http_requests WHERE date = '2023-10-12' LIMIT 500"
```

## FAQs

### Which fields (or columns) are available for querying?

All fields listed in the datasets [Log Fields](/logs/reference/log-fields/) are viewable in Log Explorer. For filtering, only fields with simple values, such as those of type `bool`, `int`, `float`, or `string` are supported. Fields with key-value pairs are currently not supported. For example, you cannot use the fields `RequestHeaders` and `Cookies` from the HTTP requests dataset in a filter.

### Why does my query not complete or time out?

Log Explorer performs best when query parameters focus on narrower ranges of time. You may experience query timeouts when your query would return a large quantity of data. Consider refining your query to improve performance.

### My query returned an error. How do I figure out what went wrong?

We are actively working on improving error codes. If you receive a generic error, check your SQL syntax (if you are using the custom SQL feature), make sure you have included a date and a limit, and that the field you are filtering is not a key-value pair. If the query still fails it is likely timing out. Try refining your filters. 

### Where is the data stored?

The data is stored in Cloudflare R2. Each Log Explorer dataset is stored on a per-customer level, similar to Cloudflare D1, ensuring that your data is kept separate from that of other customers. In the future, this single-tenant storage model will provide you with the flexibility to create your own retention policies and decide in which regions you want to store your data.

### Does Log Explorer support Customer Metadata Boundary?

Customer metadata boundary is currently not supported for Log Explorer.

