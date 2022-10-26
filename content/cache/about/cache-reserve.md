---
title: Cache Reserve (beta)
pcx_content_type: concept
---

{{<beta>}} Cache Reserve {{</beta>}}

Cache Reserve is a large, persistent data store [implemented on top of R2](https://blog.cloudflare.com/r2-open-beta/). By pushing a single button in the dashboard, your website’s cacheable content will be written to Cache Reserve. In the same way that [Tiered Cache](https://blog.cloudflare.com/introducing-smarter-tiered-cache-topology-generation/) builds a hierarchy of caches between your visitors and your origin, Cache Reserve serves as the ultimate [upper-tier cache](/cache/about/tiered-cache/) that will reserve storage space for your assets for as long as you want. This ensures that your content is served from cache longer, shielding your origin from unneeded egress fees.

![Content served from origin and getting cached in Cache Reserve, and Edge Cache Data Centers (T1=upper-tier, T2=lower-tier) on its way back to the client](/cache/static/images/content-being-served.png)

How long content in Cache Reserve will be considered “fresh” is determined by Edge Cache TTL setting or Cache-Control headers at your origin, if [Edge Cache TTL](/cache/about/edge-browser-cache-ttl/#edge-cache-ttl) is not set. After freshness expires, Cloudflare will attempt to revalidate the asset when a subsequent request arrives in Cache Reserve for the asset. This is the same behavior as in Cloudflare's regular CDN.

The retention period of an asset is how long we will keep the asset in Cache Reserve before marking it for eviction. If an asset is not requested within the retention period, it will be evicted from Cache Reserve. Accessing the asset will extend the retention period by one period. By default, the Cache Reserve retention period is 30 days.

Assets must [meet certain criteria](#cache-reserve-asset-eligibility) to use Cache Reserve.

Cache Reserve is a usage-based product and [pricing](#pricing) is detailed below.

## Enable Cache Reserve

You can enable Cache Reserve from the dashboard or via API. In both situations, you need a paid Cache Reserve Plan.

To enable Cache Reserve through the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select a domain.
2.  Navigate to **Caching**.
3.  Enable **Cache Reserve**.

{{<Aside type="note" header="Note">}}You can pause Cache Reserve at any time. Pausing Cache Reserve means that Cloudflare’s network will no longer use Cache Reserve to serve data, but resources will remain in storage until they are purged or expired.{{</Aside>}}

![Cache Reserve enablement in the dashboard](/cache/static/images/cache-reserve-dash.png)

If you are an Enterprise customer and are interested in Cache Reserve, contact your account team to get help with your configuration.

Documentation for enabling Cache Reserve via API, is forthcoming.

## Cache Reserve asset eligibility

Not all assets are eligible for Cache Reserve. To be admitted into Cache Reserve, assets must have:

- Content-Length response header
- Freshness time-to-live of at least 10 hours (set by any means such as Cache-Control / CDN-Cache-Control origin response headers, [Edge Cache TTL](/cache/about/edge-browser-cache-ttl/#edge-cache-ttl), etc.)

## Limits

- Cache Reserve file limits are the same as [R2 limits](/r2/platform/limits/). Note that [CDN cache limits](/cache/about/default-cache-behavior/#customization-options-and-limitations) still apply. Assets larger than standard limits will not be stored in the standard CDN cache, so these assets will incur Cache Reserve operations costs far more frequently.
- Origin Range requests are not supported at this time from Cache Reserve.
- Vary for Images is currently not compatible with Cache Reserve.

## Pricing

Cache Reserve charges based on the total volume of data stored, along with two classes of operations on that data:

- [Class A operations](/r2/platform/pricing/#class-a-operations) which are more expensive and tend to mutate state.
- [Class B operations](/r2/platform/pricing/#class-b-operations) which tend to read existing state.

In most cases, a cache miss will result in both one class A and one class B operation, and a cache hit will result in one class B operation. Assets larger than 1 GB will incur more operations proportional to their size.

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

#### Free operations

Free operations include purging assets.

Cache Reserve will also be purged along with edge cache when you send a purge by URL request. Other purge methods such as purge by tag or prefix will invalidate the asset in Cache Reserve, but assets purged this way will still incur storage costs until they expire.

While Cache Reserve does require a paid plan, users can continue to use Cloudflare’s CDN (without Cache Reserve) for free. 

## Cache Reserve billing examples

#### Example 1

Assuming 1,000 assets (each 1 GB) are written to Cache Reserve at the start of the month and each asset is read 1,000 times, the estimated cost for the month would be:

{{<table-wrap>}}
|                    | Usage                                    | Billable Quantity | Price      |
|--------------------|------------------------------------------|-------------------|------------|
| Class B Operations | (1,000 assets) * (1,000 reads per asset) |         1,000,000 |      $0.36 |
| Class A Operations | (1,000 assets) * (1 write per asset)     |             1,000 |      $0.00 |
| Storage            | (1,000 assets) * (1GB per asset)         |   1,000 GB-months |     $15.00 |
| **TOTAL**          |                                          |                   | **$15.36** |
{{</table-wrap>}}

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

## Tips and best practices

Cache Reserve should be used with [Tiered Cache](/cache/about/tiered-cache/) enabled. Cache Reserve is designed for use with Tiered Cache enabled for maximum origin shielding. Using Cache Reserve without Tiered Cache may result in higher storage operation costs. Enabling Cache Reserve via the Cloudflare dashboard will check and provide a warning if you try to use Cache Reserve without Tiered Cache enabled.
