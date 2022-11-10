---
pcx_content_type: reference
title: Netflows
weight: 3
---

# Netflows

[Netflows](https://en.wikipedia.org/wiki/NetFlow) shows eyeball network traffic data collected from Cloudflare's edge routers, aka Radar's `Internet Traffic Change`.

Netflows includes _all_ kinds of traffic our routers get, not just traffic to websites served by the Cloudflare [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) product.

## Timeseries

### Example: filtering by product

Besides comparing timeseries across locations or date ranges, already looked at in [Making comparisons](/radar/get-started/making-comparisons), we can also look at `ALL` traffic versus only `HTTP` traffic, using the `product` filter (for more information refer to the [API reference](https://api.cloudflare.com/#radar-netflows-get-netflow-time-series) for this endpoint). 

{{<Aside type="note" header="Netflows products">}}
`HTTP` only includes web traffic to our zones, while `ALL` also includes traffic to all other services, like [Spectrum](https://www.cloudflare.com/en-gb/products/cloudflare-spectrum/), [Magic Transit](https://www.cloudflare.com/en-gb/magic-transit/), [1.1.1.1](https://1.1.1.1/dns/), our public DNS resolver, and others.
 {{</Aside>}}



Let's look at both in two [autonomous systems](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-an-autonomous-system/).

First, we'll look at [AS3243](https://radar.cloudflare.com/as3243), a portuguese local Internet Service Provider or ISP (parameters for all traffic: `name=AS3243_all&product=ALL&dateRange=1d&asn=3243` and for just HTTP traffic: `name=AS3243_http&product=HTTP&dateRange=1d&asn=3243`):

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=meo_all&product=ALL&dateRange=1d&asn=3243&name=meo_http&product=HTTP&dateRange=1d&asn=3243&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

And here's the abbreviated response:

```json
"AS3243_all": {
	"timestamps": ["2022-11-08T14:00:00Z", "2022-11-08T15:00:00Z", "..."],
	"values": ["0.565885", "0.586434", "..."]
},
"AS3243_http": {
	"timestamps": ["2022-11-08T14:00:00Z", "2022-11-08T15:00:00Z", "..."],
	"values": ["0.548564", "0.568329", "..."]
},
```

We see that `HTTP` traffic values are similar to `ALL` traffic values - this means that most traffic Cloudflare sees as coming from this AS, is traffic to websites served by Cloudflare's [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) product.

And now, let's look at [AS174](https://radar.cloudflare.com/as174), another autonomous system that is not an ISP:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=AS174_all&product=ALL&dateRange=1d&asn=174&name=AS174_http&product=HTTP&dateRange=1d&asn=174&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

The abbreviated response:

```json
"AS174_all": {
	"timestamps": ["2022-11-08T14:00:00Z", "2022-11-08T15:00:00Z", "..."],
	"values": ["0.917348", "1.0", "..."]
},
"AS174_http": {
	"timestamps": ["2022-11-08T14:00:00Z", "2022-11-08T15:00:00Z", "..."],
	"values": ["0.381777", "0.408091", "..."]
}
```

Here, we see that `HTTP` traffic is much smaller than the rest which, since this is not an ISP serving end-users, makes sense.

Note that here we made two separate requests since we're only interested in whether `HTTP` comprises the majority of the traffic, in each AS, or not. If we wanted to actually [compare](/radar/get-started/making-comparisons) the traffic _values_ between them to, for example, see who has more traffic, we would have to make a single request including _all_ series. Here's how we could do that:


```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=AS174_all&product=ALL&dateRange=1d&asn=174&name=AS174_http&product=HTTP&dateRange=1d&asn=174&name=AS3243_all&product=ALL&dateRange=1d&asn=3243&name=AS3243_http&product=HTTP&dateRange=1d&asn=3243&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

which would lead to a response like this:

```json
"AS174_all": {
  "timestamps": ["2022-11-08T14:00:00Z", "2022-11-08T15:00:00Z", "..."],
  "values": ["0.917348", "1.0", "..."]
},
"AS174_http": {
  "timestamps": ["2022-11-08T14:00:00Z", "2022-11-08T15:00:00Z", "..."],
  "values": ["0.381777", "0.408091", "..."]
},
"AS3243_all": {
  "timestamps": ["2022-11-08T14:00:00Z", "2022-11-08T15:00:00Z", "..."],
  "values": ["0.317136", "0.328652", "..."]
},
"AS3243_http": {
  "timestamps": ["2022-11-08T14:00:00Z", "2022-11-08T15:00:00Z", "..."],
  "values": ["0.307429", "0.318505", "..."]
}
```

## Next steps

{{<button-group>}}
  {{<button type="primary" href="/radar/investigate/http-requests">}}Investigate HTTP requests{{</button>}}
  {{<button type="secondary" href="/radar/investigate">}}Investigate others{{</button>}}
{{</button-group>}}