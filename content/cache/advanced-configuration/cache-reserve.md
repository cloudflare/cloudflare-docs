---
title: Cache Reserve
pcx_content_type: concept
---

# Cache Reserve

Cache Reserve is a large, persistent data store [implemented on top of R2](/r2/). By pushing a single button in the dashboard, your website’s cacheable content will be written to Cache Reserve. In the same way that [Tiered Cache](/cache/how-to/tiered-cache/) builds a hierarchy of caches between your visitors and your origin, Cache Reserve serves as the ultimate [upper-tier cache](/cache/how-to/tiered-cache/) that will reserve storage space for your assets for as long as you want. This ensures that your content is served from cache longer, shielding your origin from unneeded egress fees.

![Content served from origin and getting cached in Cache Reserve, and Edge Cache Data Centers (T1=upper-tier, T2=lower-tier) on its way back to the client](/images/cache/content-being-served.png)

How long content in Cache Reserve will be considered “fresh” is determined by Edge Cache TTL setting or Cache-Control headers at your origin, if [Edge Cache TTL](/cache/how-to/edge-browser-cache-ttl/#edge-cache-ttl) is not set. After freshness expires, Cloudflare will attempt to revalidate the asset when a subsequent request arrives in Cache Reserve for the asset. This is the same behavior as in Cloudflare's regular CDN.

The retention period of an asset is how long we will keep the asset in Cache Reserve before marking it for eviction. If an asset is not requested within the retention period, it will be evicted from Cache Reserve. Accessing the asset will extend the retention period by one period. By default, the Cache Reserve retention period is 30 days.

Assets must [meet certain criteria](#cache-reserve-asset-eligibility) to use Cache Reserve.

Cache Reserve is a usage-based product and [pricing](#pricing) is detailed below. While Cache Reserve does require a paid plan, users can continue to use Cloudflare’s CDN (without Cache Reserve) for free.

## Enable Cache Reserve

A paid Cache Reserve Plan is required for the enablement.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select a domain.
2.  Go to **Caching** > **Cache Reserve**.
3.  Select **Enable storage sync**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Refer to the [Change Cache Reserve setting API](/api/operations/zone-cache-settings-change-cache-reserve-setting) for more information.

{{</tab>}}
{{</tabs>}}

{{<Aside type="note" header="Note">}}You can pause Cache Reserve at any time. Pausing Cache Reserve means that Cloudflare’s network will no longer use Cache Reserve to serve data, but resources will remain in storage until they are purged or expired.{{</Aside>}}

If you are an Enterprise customer and are interested in Cache Reserve, contact your account team to get help with your configuration.

## Cache Reserve asset eligibility

Not all assets are eligible for Cache Reserve. To be admitted into Cache Reserve, assets must:

- Be cacheable, according to Cloudflare's standard [cacheability factors](/cache),
- Have a freshness time-to-live (TTL) of at least 10 hours (set by any means such as Cache-Control / [CDN-Cache-Control](/cache/concepts/cache-control/) origin response headers, [Edge Cache TTL](/cache/how-to/edge-browser-cache-ttl/#edge-cache-ttl), [Cache TTL By Status](/cache/how-to/configure-cache-status-code/), or [Cache Rules](/cache/how-to/cache-rules/)),
- Have a Content-Length response header.
- When using [Image transformations](/images/manage-images/create-variants/), original files are eligible for Cache Reserve, but resized file variants are not eligible because transformations happen after Cache Reserve in the response flow.

## Limits

- Cache Reserve file limits are the same as [R2 limits](/r2/platform/limits/). Note that [CDN cache limits](/cache/concepts/default-cache-behavior/#customization-options-and-limits) still apply. Assets larger than standard limits will not be stored in the standard CDN cache, so these assets will incur Cache Reserve operations costs far more frequently.
- Origin Range requests are not supported at this time from Cache Reserve.
- Vary for Images is currently not compatible with Cache Reserve.
- Requests to [R2 public buckets linked to a zone's domain](/r2/buckets/public-buckets//) will not use Cache Reserve. Enabling Cache Reserve for the connected zone will use Cache Reserve only for requests not destined for the R2 bucket.
- Cache Reserve makes requests for uncompressed content directly from the origin. Unlike the standard Cloudflare CDN, Cache Reserve does not include the `Accept-Encoding: gzip` header when sending requests to the origin.

## Usage

Like the standard CDN, Cache Reserve also uses the `cf-cache-status` header to indicate cache statuses like `MISS`, `HIT`, and `REVALIDATED`. Cache Reserve cache misses and hits are factored into the dashboard's cache hit ratio.

Individual sampled requests that filled or were served by Cache Reserve are viewable via the [CacheReserveUsed](/logs/reference/log-fields/zone/http_requests/) Logpush field.

Cache Reserve monthly operations and storage usage are viewable in the dashboard.

## Pricing

Cache Reserve charges based on the total volume of data stored, along with two classes of operations on that data:

- [Class A operations](/r2/pricing/#class-a-operations) which are more expensive and tend to mutate state.
- [Class B operations](/r2/pricing/#class-b-operations) which tend to read existing state.

In most cases, a Cache Reserve miss will result in both one class A and one class B operation, and a Cache Reserve hit will result in one class B operation. Assets larger than 1 GB will incur more operations proportional to their size.

### Cache Reserve pricing

<table>
  <tbody>
    <th></th>
    <th>Rates</th>
    <tr>
      <td>Storage</td>
      <td>$0.015 / GB-month</td>
    </tr>
    <tr>
      <td>Class A Operations (writes)</td>
      <td>$4.50 / million requests</td>
    </tr>
    <tr>
      <td>Class B Operations (reads)</td>
      <td>$0.36 / million requests</td>
    </tr>
  </tbody>
</table>

{{<render file="_cache-reserve-billing-note.md">}}

### Storage usage

Storage is billed using gigabyte-month (GB-month) as the billing metric. A GB-month is calculated by recording total bytes stored for the duration of the month.

For example:
- Storing 1 GB for 30 days will be charged as 1 GB-month.
- Storing 2 GB for 15 days will be charged as 1 GB-month.

### Operations

Operations are performed by Cache Reserve on behalf of the user to write data from the origin to Cache Reserve and to pass that data downstream to other parts of Cloudflare’s network. These operations are managed internally by Cloudflare.

#### Class A operations (writes)

Class A operations are performed based on cache misses from Cloudflare’s CDN. When a request cannot be served from cache, it will be fetched from the origin and written to cache reserve as well as our edge caches on the way back to the visitor.

#### Class B operations (reads)

Class B operations are performed when data needs to be fetched from Cache Reserve to respond to a miss in the edge cache.

#### Purge

Asset purges are free operations.

Cache Reserve will also be purged along with edge cache when you send a purge by URL request.

Other purge methods, such as purge by tag, host, prefix, or purge everything will force an attempt to revalidate on the subsequent request for the Cache Reserve asset. Note that assets purged this way will still incur storage costs until their retention TTL expires.

{{<Aside type="note">}}Note this differs from the standard CDN's purge by tag, host, or prefix features which force a cache miss, requiring the origin to deliver the asset in full.{{</Aside>}}

## Cache Reserve billing examples

#### Example 1

Assuming 1,000 assets (each 1 GB) are written to Cache Reserve at the start of the month and each asset is read 1,000 times, the estimated cost for the month would be:

{{<table-wrap>}}
|                    | Usage                                    | Billable Quantity | Price      |
|--------------------|------------------------------------------|-------------------|------------|
| Class B Operations | (1,000 assets) * (1,000 reads per asset) |         1,000,000 |      $0.36 |
| Class A Operations | (1,000 assets) * (1 write per asset)     |             1,000 |      $4.50 |
| Storage            | (1,000 assets) * (1GB per asset)         |   1,000 GB-months |     $15.00 |
| **TOTAL**          |                                          |                   | **$19.86** |
{{</table-wrap>}}

{{<render file="_cache-reserve-billing-note.md">}}

#### Example 2

Assuming 1,000,000 assets (each 1 MB) are in Cache Reserve, and:
- each asset expires and is rewritten into Cache Reserve 1 time per day
- each asset is read 2 times per day

the estimated cost for the month would be:

{{<table-wrap>}}
|                    | Usage                                               | Billable Quantity | Price       |
|--------------------|-----------------------------------------------------|-------------------|-------------|
| Class B Operations | (1,000,000 assets) * (2 reads per day) * (30 days)  |        60,000,000 |      $21.60 |
| Class A Operations | (1,000,000 assets) * (1 write per day) * (30 days)  |        30,000,000 |     $135.00 |
| Storage            | (1,000,000 assets) * (1MB per asset)                |   1,000 GB-months |      $15.00 |
| **TOTAL**          |                                                     |                   | **$171.60** |
{{</table-wrap>}}

{{<render file="_cache-reserve-billing-note.md">}}

## Tips and best practices

Cache Reserve should be used with [Tiered Cache](/cache/how-to/tiered-cache/) enabled. Cache Reserve is designed for use with Tiered Cache enabled for maximum origin shielding. Using Cache Reserve without Tiered Cache may result in higher storage operation costs. Enabling Cache Reserve via the Cloudflare dashboard will check and provide a warning if you try to use Cache Reserve without Tiered Cache enabled.

## Cache Reserve Analytics

Cache Reserve Analytics provides insights regarding your Cache Reserve usage. It allows you to check what content is stored in Cache Reserve, how often it is being accessed, how long it has been there and how much egress from your origin it is saving you.

In the **Overview** section, under **Cache Reserve**, you have access to the following metrics:

- **Egress savings (bandwidth)** - is an estimation based on response bytes served from Cache Reserve that did not need to be served from your origin server. These are represented as cache hits.
- **Requests served by Cache Reserve** - is the number of requests served by Cache Reserve (total).
- **Data storage summary** - is based on a representative sample of requests. Refer to [Sampling](/analytics/graphql-api/sampling/) for more details about how Cloudflare samples data.
    - **Current data stored** - is the data stored (currently) over time.
    - **Aggregate storage usage** - is the total of storage used for the selected timestamp.
- **Operations** - [Class A](/cache/advanced-configuration/cache-reserve/#class-a-operations-writes) (writes) and [Class B](/cache/advanced-configuration/cache-reserve/#class-b-operations-reads) (reads) operations over time.

## Cache Reserve clear button

You can remove all data stored in Cache Reserve through the dashboard or via API. To clear your cache reserve:
- Cache Reserve must have already been enabled for the zone.
- Cache Reserve needs to be off.

Be aware that the deletion may take up to 24 hours to complete.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select a domain.
2. Go to **Caching** > **Cache Reserve**.
3. In **Delete Cache Reserve Data**, select **Delete Storage**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To delete Cache Reserve data via API use the following example requests. For more information, refer to the [API documentation](/api/operations/zone-cache-settings-start-cache-reserve-clear).

```bash
---
header: Request 1: Get Cache Reserve status
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/cache/cache_reserve \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": {
    "editable": true,
    "id": "cache_reserve",
    "value": "off"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

If Cache Reserve is turned off, you can proceed to the Cache Reserve Clear operation.

```bash
---
header: Request 2: Start Cache Reserve Clear
---
curl --request POST \
https://api.cloudflare.com/client/v4/zones/{zone_id}/cache/cache_reserve_clear \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": {
    "id": "cache_reserve_clear",
    "start_ts": "2024-06-02T10:00:00.12345Z",
    "state": "In-progress"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</tab>}}
{{</tabs>}}

