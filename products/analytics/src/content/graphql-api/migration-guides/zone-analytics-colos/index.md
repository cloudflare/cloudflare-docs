---
order: 12
pcx-content-type: reference
---
# Zone Analytics Colos Endpoint to GraphQL Analytics

This guide shows how you might migrate from the deprecated (and soon to be
sunset) zone analytics API to the GraphQL API. It provides an example for a
plausible use-case of the colos endpoint, then shows how that use-case is
translated to the GraphQL API. It also explores features of the GraphQL API
that make it more powerful than the API it replaces.

In this example, we want to calculate the number of requests for a particular
colo, broken down by the hour in which the requests occurred. Referring to the
zone analytics colos endpoint, we can construct a "curl" which retrieves the
data from the API.

```bash
curl -H "Authorization: Bearer $API_TOKEN" "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/analytics/colos?since=2020-12-10T00:00:00Z"  > colos_endpoint_output.json
```

This query says:

- Given an `API_TOKEN` which has Analytics Read access to `ZONE_ID`.
- Fetch colos analytics for `ZONE_ID` with a time range that starts on
  `2020-12-10T00:00:00Z` (`since` paramenter) to now.

The question that we want to answer is: "what is the number of requests for ZHR
per hour?" Using the colos endpoint response data and some wrangling by jq we
can answer that question with this command:

```bash
cat colos_endpoint_output.json | jq  -c '.result[] | {colo_id: .colo_id, timeseries: .timeseries[]} | {colo_id: .colo_id, timeslot: .timeseries.since, requests: .timeseries.requests.all, bandwidth: .timeseries.bandwidth.all} | select(.requests > 0) | select(.colo_id == "ZRH") '
```

This jq command is a bit of a mouthful, so let's break it down:

```bash
.result[]
```

This means "break out the result array into individual json lines"

```bash
{colo_id: .colo_id, timeseries: .timeseries[]}
```

This breaks out each json line into multiple json lines. Each resulting line
contains a `colo_id` and one element of the `timeseries` array. 

```bash
{colo_id: .colo_id, timeslot: .timeseries.since, requests: .timeseries.requests.all, bandwidth: .timeseries.bandwidth.all}
```

This flattens out the data we are interested in that is inside the timeseries
object of each line.

```bash
select(.requests > 0) | select(.colo_id == "ZRH")
```

This selects only lines that contain more than 0 requests and the `colo_id` is ZRH.

So the final data we get looks something like this:

<details>
<summary>Response</summary>
<div>

```json
{"colo_id":"ZRH","timeslot":"2020-12-10T00:00:00Z","requests":601,"bandwidth":683581}
{"colo_id":"ZRH","timeslot":"2020-12-10T01:00:00Z","requests":484,"bandwidth":550936}
{"colo_id":"ZRH","timeslot":"2020-12-10T02:00:00Z","requests":326,"bandwidth":370627}
{"colo_id":"ZRH","timeslot":"2020-12-10T03:00:00Z","requests":354,"bandwidth":402527}
{"colo_id":"ZRH","timeslot":"2020-12-10T04:00:00Z","requests":446,"bandwidth":507234}
{"colo_id":"ZRH","timeslot":"2020-12-10T05:00:00Z","requests":692,"bandwidth":787688}
{"colo_id":"ZRH","timeslot":"2020-12-10T06:00:00Z","requests":1474,"bandwidth":1676166}
{"colo_id":"ZRH","timeslot":"2020-12-10T07:00:00Z","requests":2839,"bandwidth":3226871}
{"colo_id":"ZRH","timeslot":"2020-12-10T08:00:00Z","requests":2953,"bandwidth":3358487}
{"colo_id":"ZRH","timeslot":"2020-12-10T09:00:00Z","requests":2550,"bandwidth":2901823}
{"colo_id":"ZRH","timeslot":"2020-12-10T10:00:00Z","requests":2203,"bandwidth":2504615}
...
```

</div>
</details>

So, how do we do the same thing using the GraphQL API?

The GraphQL API allows us to be much more specific about the data that we want
to retrieve. While the colos endpoint forces us to retrieve all the information
is has about the breakdown of requests and bandwidth per colo, using the
GraphQL API allows us to fetch only the information we are interested in.

The data we want is about HTTP requests. Hence, we use the canonical source for
HTTP request data, also known as `httpRequestsAdaptiveGroups`. This node in
GraphQL API allows you to filter and group by almost any dimension of an http
request imaginable. It is "Adaptive" so responses will be fast since it is
driven by our 
["ABR" technology](https://blog.cloudflare.com/explaining-cloudflares-abr-analytics/).

Let's craft a GraphQL API query to retrieve the data we need to answer the
question: "what is the number of requests for ZHR per hour?" 

```text
{
  viewer {
    zones(filter: {zoneTag:"$ZONE_TAG"}) {
      httpRequestsAdaptiveGroups(filter: {datetime_gt: "2020-12-10T00:00:00Z", coloCode:"ZRH"}, limit:10000, orderBy: [datetimeHour_ASC]) {
        count
        sum {
          edgeResponseBytes
        }
        avg {
          sampleInterval
        }
        count
        dimensions {
          datetimeHour
          coloCode
        }
      }
    }
  }
}
```

Then we can run it with "curl":

```bash
curl -X POST -H 'Authorization: Bearer $API_TOKEN'  https://api.cloudflare.com/client/v4/graphql -d "@./coloGroups.json" > graphqlColoGroupsResponse.json
```

We can answer our question in the same way as before using jq:

```bash
cat graphqlColoGroupsResponse.json| jq -c '.data.viewer.zones[] | .httpRequestsAdaptiveGroups[] | {colo_id: .dimensions.coloCode, timeslot: .dimensions.datetimeHour, requests: .count, bandwidth: .sum.edgeResponseBytes}'
```

This command is much simpler than what we had before, because the data returned
by the GraphQL API is much simpler than what is returned by the colos endpoint.

Still, it is worth explaining the command since it will help to understand some
of the concepts underlying the GraphQL API.

```bash
.data.viewer.zones[]
```

The format of a GraphQL response is much the same as the query. A successful
response always contains a "data" object which wraps the data in the response.
A query will always have a "viewer" object which represents your user. Then, we
unwrap the zones objects, one per line. Our query only has one zone (since this
is how we chose to do it). But a query could have multiple zones as well. 

```bash
.httpRequestsAdaptiveGroups[]
```

The httpRequestsAdaptiveGroups field is a list, where each datapoint in the
list represents a combination of the dimensions that were selected, along with
the aggregation that was selected for that combination of the dimensions. Here,
we unwrap each of the datapoints, one per row.

```bash
{colo_id: .dimensions.coloCode, timeslot: .dimensions.datetimeHour, requests: .count, bandwidth: .sum.edgeResponseBytes}
```

This is straightforward: it just selects the attributes of each datapoint that
we are interested in, in the format which we used previously in the colos
endpoint.

The GraphQL API is so much more powerful than this, though. You can filter and
group the data by any dimensions you can think of. This feature is totally
absent from the colos endpoint in the Zone Analytics API.
