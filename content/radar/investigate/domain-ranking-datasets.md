---
pcx_content_type: reference
title: Domains ranking
weight: 5
---

# Domains ranking

Cloudflare regularly generates a domain ranking based on DNS queries to [1.1.1.1](/1.1.1.1/),  Cloudflare's public DNS resolver.  Refer to the [blog post](https://blog.cloudflare.com/radar-domain-rankings/) for a deep dive. In short, Cloudflare generates two types of listings:

- An ordered list of the top 100 most popular domains globally and per country. This includes the last 24 hours and is updated daily.
- An unordered global most popular domains dataset, divided into buckets of the following number of domains: 200, 500, 1,000, 2,000, 5,000, 10,000, 20,000, 50,000, 100,000, 200,000, 500,000, 1,000,000. It includes the last seven days and is updated weekly.

## List of endpoints

### Top

#### Example: Get the current ordered top domains in the Cloudflare ranking

```bash
curl "https://api.cloudflare.com/client/v4/radar/ranking/top?name=top&limit=5" \
--header "Authorization: Bearer <API_TOKEN>"
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

For more information refer to [Get top domains](/api/operations/radar-get-ranking-top-domains).


#### Example: Download top `x` ranking bucket file

As mentioned in the [blog post](https://blog.cloudflare.com/radar-domain-rankings/), Cloudflare provides an ordered rank
for the top 100 domains, but for the remainder it only provides ranking buckets — like top 200 thousand, top one million,
etc.. These are available through Cloudflare's [datasets endpoints](/api/operations/radar-get-reports-datasets).

In the following example we will request the last available domain ranking buckets:

```bash
curl "https://api.cloudflare.com/client/v4/radar/datasets?limit=10&datasetType=RANKING_BUCKET" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
{
  "datasets": [
    {
      "id": 213,
      "title": "Top 1000000 ranking domains",
      "description": "Unordered top 1000000 from 2023-01-02 to 2023-01-09",
      "type": "RANKING_BUCKET",
      "tags": [
        "GLOBAL",
        "top_1000000"
      ],
      "meta": {
        "top": 1000000
      },
      "alias": "ranking_top_1000000"
    },
    ...
  ]
}
```

If you are interested in a specific top (like the top one million), go through the `meta.top` property. After finding the top you are looking for, get its `id` to fetch the dataset using the [`GET dataset download url`](/api/operations/radar-post-reports-dataset-download-url) endpoint.


Then you can request a download url:

```bash
curl "https://api.cloudflare.com/client/v4/radar/datasets/download" \
--header "Authorization: Bearer <API_TOKEN>" \
--header 'Content-Type: application/json' \
--data '{
  "datasetId": 213
}'
```

```json
{
  "dataset": {
    "url": "https://example.com/download"
  }
}
```


#### Example: Get the last top `x` ranking bucket

This endpoint allows you to directly request the latest top x bucket available (optionally at a given date)
[Get dataset stream](/api/operations/radar-get-reports-dataset-download) endpoint.

The dataset alias can be retrieved from the [Get datasets](/api/operations/radar-get-reports-datasets) endpoint
as the example above.

This stream endpoint is only available for datasets generated after 2023-01-08.


```bash
curl "https://api.cloudflare.com/client/v4/radar/datasets/ranking_top_1000" \
--header "Authorization: Bearer <API_TOKEN>"
```

```csv
domain
1rx.io
2mdn.net
360yield.com
3lift.com
a-msedge.net
a2z.com
...
```


## Next steps

Refer to [Investigate outages](/radar/investigate/outages/) to get data from outages occurring around the world.