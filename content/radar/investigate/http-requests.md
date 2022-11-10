---
pcx_content_type: reference
title: HTTP requests
weight: 3
---

# HTTP requests

While in [Netflows](/radar/investigate/netflows) we were looking at bytes and packets reaching our edge routers, here we're a layer above, looking at complete eyeball HTTP requests that reach websites served by Cloudflare's [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) product.

{{<Aside type="note">}}
HTTP traffic includes both HTTP and HTTPS traffic coming from end users (i.e. eyeball traffic).
 {{</Aside>}}

Most of the charts, in the [Adoption and Usage](https://radar.cloudflare.com/adoption-and-usage) section on Radar, come from this data source.

These endpoints can be broadly split into:

- timeseries: a timeseries of a group of metrics, e.g. when looking at IP version, displays an IPv4 timeseries and an IPv6 timeseries
- summary: displays a summary of a group of metrics over the specified time range, e.g. IPv4 traffic percentage out of the total HTTP traffic during that time period
- top: a list of the top locations or [ASes](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-an-autonomous-system/) ranked by adoption of a specific metric, for example, top locations by mobile device traffic (ie. which locations have a higher percentage of mobile traffic out of the total traffic for that location)

## Timeseries

### Example: hourly breakdown by device type

Let's look at traffic by device type globally with and without [bot traffic](/radar/concepts/bot-classes) (parameters for the `human` series: `name=human&botClass=LIKELY_HUMAN&dateRange=1d` and for the `bot` series: `name=bot&botClass=LIKELY_AUTOMATED&dateRange=1d`):

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/timeseries/device_type?name=human&botClass=LIKELY_HUMAN&dateRange=1d&name=bot&botClass=LIKELY_AUTOMATED&dateRange=1d&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

And here's the abbreviated response:

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
      "normalization": "PERCENTAGE",
    }
  }
}
```

Mobile devices tend to be considerably more present when looking at human generated traffic vs bot generated traffic.

{{<Aside type="note">}}
Take into account that device classification comes from the [User-agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent), so ultimately this depends on the user agent(s) that bots use.
 {{</Aside>}}

For more information refer to the [API reference](https://api.cloudflare.com/#radar-http-get-time-series-of-device-types) for this endpoint.

## Summary

### Example: overall breakdown by device type and human/bot traffic

We could also look at the same information but now asking for a summary of the device type breakdown over the _entire_ period, instead of per hour like we did above.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/summary/device_type?name=human&botClass=LIKELY_HUMAN&dateRange=1d&name=bot&botClass=LIKELY_AUTOMATED&dateRange=1d&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

The abbreviated response:

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

For more information refer to the [API reference](https://api.cloudflare.com/#radar-http-get-a-summary-of-device-types) for this endpoint.

### Example: breakdown by IP version and human/bot traffic

Let's look at another example, global breakdown of traffic by IP version, with and without bots:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/summary/ip_version?name=human&botClass=LIKELY_HUMAN&dateRange=1d&name=bot&botClass=LIKELY_AUTOMATED&dateRange=1d&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

And we get:

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

Bots tend to use more IPv4.

It's also interesting to know how our own ISP fares in IPv6 adoption. If you know your ISP's ASN (or check [here](https://radar.cloudflare.com/ip)), you can use the `asn` parameter (check the [API reference](https://api.cloudflare.com/#radar-http-get-a-summary-of-ip-versions) for other parameters) to find out.


## Tops

### Example: top locations by IPv6 traffic

Which locations have a higher adoption of [IPv6](https://en.wikipedia.org/wiki/IPv6) in the last 28 days?

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

Seems like India is leading the charge.

For more information refer to the [API reference](https://api.cloudflare.com/#radar-http-get-top-locations-by-ip-version) for this endpoint.

## Next steps

{{<button-group>}}
  {{<button type="primary" href="/radar/investigate/application-layer-attacks">}}Investigate application layer attacks{{</button>}}
  {{<button type="secondary" href="/radar/investigate">}}Investigate others{{</button>}}
{{</button-group>}}