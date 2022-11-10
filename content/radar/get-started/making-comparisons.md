---
pcx_content_type: reference
title: Making comparisons
weight: 3
---

# Making comparisons

When comparing time series, across locations/time ranges/etc, in endpoints that normalize values using [MinMax](/radar/concepts/normalization), we __must__ do so in the __same__ request, by asking for multiple series. All values will then be normalized using the same minimum and maximum value and can safely be compared against each other.

[Netflows](/radar/investigate/netflows.md) values are normalized using [Min0Max](/radar/concepts/normalization), so we'll use it as an example ([API reference](https://api.cloudflare.com/#radar-netflows-get-netflow-time-series)).

## Comparing locations

Let's compare the traffic change across different locations, United States and Portugal (using [alpha-2 codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)), for the last 7 days:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=us_data&dateRange=7d&location=US&name=pt_data&dateRange=7d&location=PT&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

Here, we're asking for 2 timeseries. The 1st series has these parameters:

`
name=us_data&dateRange=7d&location=US
`

and the 2nd series has these:

`
name=pt_data&dateRange=7d&location=PT
`

All of these parameters are arrays and it's the position in the array that defines the series the filter belongs to. For more information on the available parameters refer to the [endpoint's reference](https://api.cloudflare.com/#radar-netflows-get-netflow-time-series).

The response (shortened below for brevity) uses the provided `name` property to wrap the timestamps and corresponding values. Charting these, it would be obvious that Cloudflare received much less traffic from Portugal than from the United States.

```json
{
  "success": true,
  "errors": [],
  "result": {
    "us_data": {
      "timestamps": [ "2022-10-26T17:00:00Z", "2022-11-02T15:00:00Z" ],
      "values": [ "0.871752", "1" ]
    },
    "pt_data": {
      "timestamps": [ "2022-10-26T17:00:00Z", "2022-11-02T15:00:00Z" ],
      "values": [ "0.020457", "0.012313" ]
    },
    "meta": {
      "dateRange": {
        "startTime": "2022-10-26T17:00:00Z",
        "endTime": "2022-11-02T17:00:00Z"
      },
      "aggInterval": "ONE_HOUR",
    }
  }
}
```

Take into account that comparisons can be made in most endpoints, not just endpoints that use `MinMax`.


## Comparing date ranges

Let's compare the same location, United States, across different date ranges, using the shortcuts `7d` and `7dControl`, which respectively mean, the last 7 days, and the last 7 days before those, so this week versus the previous week.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=this_week&dateRange=7d&location=US&name=previous_week&dateRange=7dControl&location=US&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

So, the 1st series has these parameters:

`
name=this_week&dateRange=7d&location=US
`

and the 2nd series has these:

`
name=previous_week&dateRange=7dControl&location=US
`

And now, inside the `result` property, you should see something like this:

```json
{
  "this_week": {
    "timestamps": [ "2022-10-27T13:00:00Z", "2022-10-27T14:00:00Z", "...", "2022-11-03T12:00:00Z" ],
    "values": [ "0.794321", "1", "...", "0.718433"]
  },
  "previous_week": {
    "timestamps": [ "2022-10-20T13:00:00Z", "2022-10-20T14:00:00Z", "...", "2022-10-27T12:00:00Z" ],
    "values": [ "0.774392", "0.835071", "...", "0.720181"]
  }
}
```

Looking at this, we see that the maximum value was reached at `2022-10-27T14:00:00Z` (all Radar timestamps are in  `UTC`). We also see what the date range shortcuts `7d` and `7dControl` were resolved to at the time this was run.

### Using specific timestamps

We can also ask for specific timestamps. For example, let's look at [Tonga](https://blog.cloudflare.com/tonga-internet-outage/) in October versus January 2022, when there was an outage.


```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=tonga&dateStart=2022-10-15T02%3A00%3A00Z&dateEnd=2022-10-15T05%3A00%3A00Z&location=TO&name=tonga_outage&dateStart=2022-01-15T02%3A00%3A00Z&dateEnd=2022-01-15T05%3A00%3A00Z&location=TO&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

So, the 1st series has these parameters (URL encoded):

`
name=tonga&dateStart=2022-10-15T02%3A00%3A00Z&dateEnd=2022-10-15T05%3A00%3A00Z%&location=TO
`

and the 2nd series has these:

`
name=tonga_outage&dateStart=2022-01-15T02%3A00%3A00Z&&dateEnd=2022-01-15T05%3A00%3A00Z&location=TO
`

We also asked for an [aggregation interval](/radar/concepts/aggregation-intervals) of 1 hour (`aggInterval=1h`), so that all results could be placed here (both `format` and `aggInterval` are not arrays, as specified in the [API reference](https://api.cloudflare.com/#radar-netflows-get-netflow-time-series), and apply globally to all series in the request).

Inside the `result` property, you should see something like this:

```json
"tonga": {
  "timestamps": ["2022-10-15T02:00:00Z", "2022-10-15T03:00:00Z", "2022-10-15T04:00:00Z", "2022-10-15T05:00:00Z"],
  "values": ["1.0", "0.832473", "0.820083", "0.79408"]
},
"tonga_outage": {
  "timestamps": ["2022-01-15T02:00:00Z", "2022-01-15T03:00:00Z", "2022-01-15T04:00:00Z", "2022-01-15T05:00:00Z"],
  "values": ["0.354105", "0.357287", "0.181811", "0.044198"]
}
```

Traffic dropped to almost 0 during the outage. Charting it (but setting the end date to January 18 to make it clearer):

![Tonga October vs January 2022](/radar/static/tonga_outage.png)


## Next steps

{{<button-group>}}
  {{<button type="primary" href="/radar/investigate/netflows">}}Investigate Netflows{{</button>}}
  {{<button type="secondary" href="/radar/investigate">}}Investigate others{{</button>}}
{{</button-group>}}