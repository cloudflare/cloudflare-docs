---
pcx_content_type: reference
title: Netflows
weight: 2
---

# Netflows

[Netflows](https://en.wikipedia.org/wiki/NetFlow) shows network traffic data from end users collected from Cloudflare's edge routers. Netflows' data also feeds the [Internet traffic change](https://radar.cloudflare.com/) chart.

Netflows includes all types of traffic from Cloudflare's routers, not just traffic to websites served by Cloudflare's [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/).

## List of endpoints

### Timeseries

#### Example: filtering by product

Besides comparing time series across locations or date ranges (discussed in [Make comparisons](/radar/get-started/making-comparisons/)), we can also examine `ALL` traffic versus only `HTTP` traffic using the `product` filter. For more information, refer to the [API reference](/api/operations/radar_get_Timeseries) for this endpoint.

{{<Aside type="note" header="NetFlow products">}}
`HTTP` traffic only includes web traffic to Cloudflare's zones, while `ALL` also includes traffic to all other services, like [Spectrum](/spectrum/), [Magic Transit](/magic-transit/), [1.1.1.1](/1.1.1.1/), and others.
{{</Aside>}}

In the following example, we will examine both `ALL` and `HTTP` traffic in two [autonomous systems](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-an-autonomous-system/). First, we will examine [AS3243](https://radar.cloudflare.com/as3243), a Portuguese local Internet Service Provider (ISP). The parameters for all traffic are `name=AS3243_all&product=ALL&dateRange=1d&asn=3243`, and for just the HTTP traffic are `name=AS3243_http&product=HTTP&dateRange=1d&asn=3243`):

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=meo_all&product=ALL&dateRange=1d&asn=3243&name=meo_http&product=HTTP&dateRange=1d&asn=3243&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

This is the abbreviated response:

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

`HTTP` traffic values are similar to `ALL` traffic values. This means that most traffic Cloudflare receives from this AS is traffic to websites served by Cloudflare's [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) product.

In this other example, we will examine [AS174](https://radar.cloudflare.com/as174), another autonomous system that is not an ISP:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=AS174_all&product=ALL&dateRange=1d&asn=174&name=AS174_http&product=HTTP&dateRange=1d&asn=174&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>"
```

The abbreviated response is:

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

Here, there is less `HTTP` traffic compared to other types of traffic — which makes sense, since this is not an ISP serving end-users.

Note that here we made two separate requests since we are only interested in whether `HTTP` comprises the majority of the traffic in each AS or not. If we wanted to actually [compare](/radar/get-started/making-comparisons/) the traffic values between them to, for example, examine who has more traffic, we would have to make a single request including all series. Here is how we could do that:

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

This response shows how Cloudflare receives more traffic from AS174 than from AS3243.

## Next steps

Refer to [HTTP requests](/radar/investigate/http-requests/) for more information about requests from end users.