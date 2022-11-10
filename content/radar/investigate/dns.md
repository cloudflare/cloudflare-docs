---
pcx_content_type: reference
title: DNS
weight: 3
---

# DNS

Access aggregated and anonymized DNS queries to our [1.1.1.1](https://1.1.1.1/dns/) public resolver service.

## Top locations

### Example: Geographical distribution of google.com vs yandex.ru

Let's look at the top locations from where DNS queries to `google.com` are coming:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/dns/top/locations?domain=google.com&dateRange=1d&format=json&limit=2" \
  -H "Authorization: Bearer <API_TOKEN>"
```

Most queries come from the United States and Brazil:

```json
{
  "clientCountryAlpha2": "US",
  "clientCountryName": "United States",
  "value": "43.474518"
}, {
  "clientCountryAlpha2": "BR",
  "clientCountryName": "Brazil",
  "value": "10.772799"
}
```

And looking at `yandex.ru`, a russian search engine:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/dns/top/locations?domain=yandex.ru&dateRange=1d&format=json&limit=2" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json"
```

```json
{
  "clientCountryAlpha2": "RU",
  "clientCountryName": "Russian Federation",
  "value": "73.710495"
}, {
  "clientCountryAlpha2": "DE",
  "clientCountryName": "Germany",
  "value": "5.518052"
}
```

As expected, most queries come from Russia.

{{<Aside type="note">}}
Take into account that this looks at the total number of DNS queries from that location and to that hostname, _out_ of the total DNS queries to the given hostname. In this sense, it's expected that locations with higher population numbers, like the United States, frequently appear in the top spots, even if the actual percentage is low.
{{</Aside>}}

Multiple hostnames can also be provided - take a look at the [API reference](https://api.cloudflare.com/#radar-dns-get-top-locations-by-dns-queries) for this endpoint. This is useful when the application we want to explore uses several hostnames to serve its content (e.g. a hostname for the main website, another hostname dedicated to its API, etc).

## Next steps

{{<button-group>}}
  {{<button type="primary" href="/radar/investigate/domain-ranking-datasets">}}Domain Rankings{{</button>}}
  {{<button type="secondary" href="/radar/investigate">}}Investigate others{{</button>}}
{{</button-group>}}