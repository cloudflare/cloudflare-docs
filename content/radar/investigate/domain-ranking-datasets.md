---
pcx_content_type: reference
title: Domains Ranking
weight: 3
---


# Domains ranking

Cloudflare regularly generates a Domain Ranking based on DNS queries to [1.1.1.1](https://1.1.1.1/dns/), our public DNS resolver.  Check the [blog post](https://blog.cloudflare.com/radar-domain-rankings/) for more information but, in short, we generate 2 kinds of listings:

- Ordered list of the top 100 most popular domains globally and per country. Last 24 hours, updated daily.
- Unordered global most popular domains datasets divided into buckets of the following sizes: 200, 500, 1,000, 2,000, 5,000, 10,000, 20,000, 50,000, 100,000, 200,000, 500,000, 1,000,000. Last 7 days, updated weekly.

### Example: Get the current ordered top domains in the Cloudflare ranking

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/ranking/top?name=top&format=json&limit=5" \
  -H "Authorization: Bearer <API_TOKEN>"
```

```json
{
  "rank": 1,
  "domain": "google.com"
},
{
  "rank": 2,
  "domain": "googleapis.com"
},
{
  "rank": 3,
  "domain": "facebook.com"
},
{
  "rank": 4,
  "domain": "gstatic.com"
},
{
  "rank": 5,
  "domain": "apple.com"
}
```

For more information refer to the [API reference](https://api.cloudflare.com/#radar-ranking-get-domains-rank-top) for this endpoint.

### Example: Get the last top X ranking bucket

As mentioned in the [blog post](https://blog.cloudflare.com/radar-domain-rankings/), Cloudflare provides an ordered rank for the top 100 domains, but for the remainder it only provides ranking buckets, e.g. top 200k, top 1 million, etc. These are available through our [datasets](https://api.cloudflare.com/#radar-datasets-get-datasets) endpoints.

So, let's get the last available domain ranking buckets:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/datasets?limit=5&offset=0&datasetType=RANKING_BUCKET&format=json" \
  -H "Authorization: Bearer <API_TOKEN>"
```

```json
"datasets": [
  {
    "id": 72,
    "title": "Top 1000000 ranking domains",
    "description": "Unordered top 1000000 from 2022-10-24 to 2022-10-31",
    "type": "RANKING_BUCKET",
    "tags": [
      "GLOBAL",
      "top_1000000"
    ],
    "meta": {
      "top": 1000000
    }
  },
  ...
]
```

Now, if you're interested in a specific top, e.g. the top 1000000, go through the list and look at the `meta.top` property and then having the `id`, the download url for that dataset can be fetched using the [download](https://api.cloudflare.com/#radar-datasets-get-dataset-download-url) endpoint.


## Next steps

{{<button-group>}}
  {{<button type="primary" href="/radar/investigate/outages">}}Investigate Outages{{</button>}}
  {{<button type="secondary" href="/radar/investigate">}}Investigate others{{</button>}}
{{</button-group>}}