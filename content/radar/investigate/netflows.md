---
pcx_content_type: reference
title: Netflows
weight: 3
---

# Netflows, aka Internet Traffic Change

[Netflows](https://en.wikipedia.org/wiki/NetFlow) shows network traffic data collected from Cloudflare's edge routers, aka Radar's "Internet Traffic Change".

Netflows includes _all_ kinds of traffic our routers get, not just traffic to websites protected by Cloudflare.

## Timeseries

### Example: filtering by product

Besides comparing timeseries across locations or date ranges, already looked at in [Making comparisons](/radar/get-started/making-comparisons), we can also look at `ALL` traffic versus only `HTTP` traffic, using the `product` filter.

`HTTP` only includes web traffic to our zones, while `ALL` also includes traffic to all other services, like our [1.1.1.1 public DNS resolver](https://1.1.1.1/dns/).

Let's look at both in AS3243, a portuguese local ISP (parameters for all traffic: `name=meo_all&product=ALL&dateRange=1d&asn=3243` and for just HTTP traffic: `name=meo_http&product=HTTP&dateRange=1d&asn=3243`):

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=meo_all&product=ALL&dateRange=1d&asn=3243&name=meo_http&product=HTTP&dateRange=1d&asn=3243&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json"
```

And here's the abbreviated response:

```json
"meo_all": {
	"timestamps": ["2022-11-02T17:00:00Z", "2022-11-02T18:00:00Z", "..."],
	"values": ["0.535174", "0.659869", "..."]
},
"meo_http": {
	"timestamps": ["2022-11-02T17:00:00Z", "2022-11-02T18:00:00Z", "..."],
	"values": ["0.516916", "0.641151", "..."]
},
```

We see that `HTTP` traffic values are similar to `ALL` traffic values - this means that most traffic Cloudflare sees as coming from this AS, is traffic to websites protected by Cloudflare.

And now, let's look at AS32934, an autonomous system belonging to Facebook:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=facebook_all&product=ALL&dateRange=1d&asn=32934&name=facebook_http&product=HTTP&dateRange=1d&asn=32934&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json"
```

The abbreviated response:

```json
"facebook_all": {
	"timestamps": ["2022-11-02T16:00:00Z", "...", "2022-11-03T15:00:00Z"],
	"values": ["0.912763", "...", "0.992138"]
},
"facebook_http": {
	"timestamps": ["2022-11-02T16:00:00Z", "...", "2022-11-03T15:00:00Z"],
	"values": ["0.103601", "...", "0.130437"]
}
```

Here, we that `HTTP` traffic to Cloudflare protected websites is much less than the rest which, since this is not an ISP serving end-users, makes sense.

Note that here we made two separate requests since we're only interested in whether `HTTP` comprises the majority of the traffic, in each AS, or not. If we wanted to actually [compare](/radar/get-started/making-comparisons) the traffic _values_ between them to, for example, see who has more traffic, we would have to make a single request including _all_ series. Here's how we could do that:


```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=facebook_all&product=ALL&dateRange=1d&asn=32934&name=facebook_http&product=HTTP&dateRange=1d&asn=32934&name=meo_all&product=ALL&dateRange=1d&asn=3243&name=meo_http&product=HTTP&dateRange=1d&asn=3243&format=json&aggInterval=1h" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json"
```

which would lead to a response like this:

```json
"facebook_all": {
  "timestamps": ["2022-11-02T17:00:00Z", "2022-11-02T18:00:00Z", "..."],
  "values": ["0.768535", "0.647243", "..."]
},
"facebook_http": {
  "timestamps": ["2022-11-02T17:00:00Z", "2022-11-02T18:00:00Z", "..."],
  "values": ["0.102706", "0.097851", "..."]
},
"meo_all": {
  "timestamps": ["2022-11-02T17:00:00Z", "2022-11-02T18:00:00Z", "..."],
  "values": ["0.146757", "0.180952", "..."]
},
"meo_http": {
  "timestamps": ["2022-11-02T17:00:00Z", "2022-11-02T18:00:00Z", "..."],
  "values": ["0.141751", "0.175819", "..."]
}
```

## Next steps

{{<button-group>}}
  {{<button type="primary" href="/radar/investigate/http-requests">}}Investigate HTTP requests{{</button>}}
  {{<button type="secondary" href="/radar/investigate">}}Investigate others{{</button>}}
{{</button-group>}}