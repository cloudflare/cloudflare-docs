---
pcx_content_type: reference
title: HTTP requests
weight: 1
---

# HTTP requests

While in [Netflows](/radar/investigate/netflows/) we can inspect bytes and packets reaching Cloudflare's edge routers, in HTTP requests we are a layer above in the [OSI model](https://en.wikipedia.org/wiki/OSI_model). HTTP requests examines complete HTTP requests from end users that reach websites served by Cloudflare's [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/).

{{<Aside type="note">}}
HTTP traffic includes both HTTP and HTTPS traffic coming from end users.
{{</Aside>}}

Most of the charts in the [Adoption and Usage](https://radar.cloudflare.com/adoption-and-usage) section on Radar come from this data source.

These endpoints can be broadly split into:

- `timeseries`: A time series of a group of metrics. For example, when looking at IP version, displays an IPv4 time series and an IPv6 time series.
- `summary`: Displays a summary of a group of metrics over the specified time range. For example, IPv4 traffic percentage out of the total HTTP traffic during that time period.
- `top`: A list of the top locations or [Autonomous Systems](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-an-autonomous-system/) (ASes) ranked by adoption of a specific metric. For example, top locations by mobile device traffic (like which locations have a higher percentage of mobile traffic out of the total traffic for that location).

## List of endpoints

### Timeseries

#### Example: hourly breakdown by device type

In this example, we will request traffic by device type globally, with and without [bot traffic](/radar/concepts/bot-classes/). Parameters for the `human` series are `name=human&botClass=LIKELY_HUMAN&dateRange=1d`. For the `bot` series, the parameters are `name=bot&botClass=LIKELY_AUTOMATED&dateRange=1d`:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/timeseries/device_type?name=human&botClass=LIKELY_HUMAN&dateRange=1d&name=bot&botClass=LIKELY_AUTOMATED&dateRange=1d&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

Here is the abbreviated response:

```json
{
  "success": true,
  "errors": [],
  "result": {
    "human": {
      "timestamps": ["2022-11-03T13:00:00Z", "2022-11-03T14:00:00Z", ".."],
      "mobile": ["52.5532", "52.146628", ".."],
      "desktop": ["47.394791", "47.800731", ".."],
      "other": ["0.052009", "0.052642", ".."]
    },
    "bot": {
      "timestamps": ["2022-11-03T13:00:00Z", "2022-11-03T14:00:00Z", ".."],
      "desktop": ["83.833892", "84.017711", ".."],
      "mobile": ["16.156748", "15.969936", ".."],
      "other": ["0.00936", "0.012353", ".."]
    },
    "meta": {
      "dateRange": {
        "startTime": "2022-11-03T13:00:00Z",
        "endTime": "2022-11-04T13:00:00Z"
      },
      "normalization": "PERCENTAGE"
    }
  }
}
```

Mobile devices tend to be considerably more present when examining human generated traffic versus bot generated traffic.

{{<Aside type="note">}}
Note that device classification comes from the [User-agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) header. Ultimately, this classification depends on the user agent(s) that bots use.
{{</Aside>}}

For more information refer to [Get time series of device types](/api/operations/radar_get_TimeseriesDeviceType).

### Summary

#### Example: overall breakdown by device type and human/bot traffic

We can also look at the same information asking for a summary of the device type breakdown over the entire period, instead of a per hour breakdown like in the example before.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/summary/device_type?name=human&botClass=LIKELY_HUMAN&dateRange=1d&name=bot&botClass=LIKELY_AUTOMATED&dateRange=1d&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

Here is the abbreviated response:

```json
"human": {
  "mobile": "54.967243",
  "desktop": "44.974006",
  "other": "0.058751"
},
"bot": {
  "desktop": "83.275452",
  "mobile": "16.707455",
  "other": "0.017093"
}
```

For more information refer to the [API reference](/api/operations/radar_get_SummaryDeviceType) for this endpoint.

#### Example: breakdown by IP version and human/bot traffic

In the following example, we will examine global breakdown of traffic by IP version, with and without bots:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/summary/ip_version?name=human&botClass=LIKELY_HUMAN&dateRange=1d&name=bot&botClass=LIKELY_AUTOMATED&dateRange=1d&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

This returns the following:

```json
"human": {
  "IPv4": "76.213647",
  "IPv6": "23.786353"
},
"bot": {
  "IPv4": "91.492032",
  "IPv6": "8.507968"
}
```

Bots tend to use more IPv4 addresses.

It is also interesting to know how your ISP fares in IPv6 adoption. If you know your ISP’s autonomous system number (ASN), you can use the `asn` parameter to query for this information. Refer to the [API reference](/api/operations/radar_get_SummaryIpVersion) for other parameters.

If you do not know your ISP’s ASN, you can use [Radar](https://radar.cloudflare.com/ip) to find what it is.

### Top

#### Example: top locations by IPv6 traffic

In the following example, we will find which locations had a higher adoption of [IPv6](https://en.wikipedia.org/wiki/IPv6) in the last 28 days.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/top/locations/ip_version/IPv6?name=ipv6&botClass=LIKELY_HUMAN&dateRange=28d&format=json&limit=5" \
     -H "Authorization: Bearer <API_TOKEN>"
```

```json
"ipv6": [
  {
    "clientCountryAlpha2": "IN",
    "clientCountryName": "India",
    "value": "50.612747"
  }, {
    "clientCountryAlpha2": "MY",
    "clientCountryName": "Malaysia",
    "value": "46.233654"
  }, {
    "clientCountryAlpha2": "UY",
    "clientCountryName": "Uruguay",
    "value": "39.796762"
  }, {
    "clientCountryAlpha2": "LK",
    "clientCountryName": "Sri Lanka",
    "value": "39.709355"
  }, {
    "clientCountryAlpha2": "VN",
    "clientCountryName": "Vietnam",
    "value": "39.1514"
  }
]
```

According to the returned data, India is leading in IPv6 adoption.

For more information refer to the [API reference](/api/operations/radar_get_HttpTopLocationsByIpVersion) for this endpoint.

## Next steps

Refer to [Application layer attacks](/radar/investigate/application-layer-attacks/) to learn more about mitigfated HTTP requests.