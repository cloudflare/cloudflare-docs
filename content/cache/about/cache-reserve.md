---
title: Cache Reserve (beta)
pcx-content-type: concept
meta:
  title: Cache Reserve (beta)
---

# Cache Reserve (beta)

Cache Reserve is a new way to persistently serve all static content from Cloudflare’s global cache. 

Cache Reserve solves the problem of less popular content that is evicted repeatedly and needs to be served from an origin, increasing costs. Cache Reserve ensures that even if a specific content has not been requested in months, it can still be served from Cloudflare’s cache - avoiding the need to pull it from the origin and saving the customer money on egress. 

## Configuration

Enabling Cache Reserve can be done from the dashboard or via API. In both situations, you need a paid Cache Reserve Plan.

To enable Cache Reserve through the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select a zone.
2.  Navigate to **Caching**.
3.  Enable **Cache Reserve**.

{{<Aside type="note" header="Note">}}You can pause Cache Reserve at any time. Pausing cache reserve means that Cloudflare’s network will no longer use cache reserve to serve data, but resources will remain in storage until they are purged or expired.{{</Aside>}}

![Cache Reserve enablement in the dash](/cache/static/images/cache-reserve-dash.png)

If you are an Enterprise customer and interested in this product, please contact your account team to help configure it for you.

To Enable Cache Reserve via API, please refer to the API docs (link missing). Enabling via the API will not provide a warning if you attempt to use Cache Reserve without Tiered Cache enabled, which may increase your operations costs.

## Limits

- Cache Reserve may cache larger files than the standard CDN cache limits (link missing) (up to [R2 limits](https://developers.cloudflare.com/r2/platform/limits/)). However, serving these files may tend to incur extra operation costs because all requests for these files will attempt to use Cache Reserve.
- How long something will remain in Cache Reserve, how long it will be considered fresh, is determined by `Cache-Control` headers set at your origin. If no directive is set (`s-maxage`, etc), the default applied to the asset will be 30 days. Following the expiration of the retention period, Cloudflare will revalidate the asset when a subsequent request arrives in Cache Reserve for the asset.
- The retention period of an asset is how long we will keep the asset in Cache Reserve before marking it for eviction. If an asset is not requested for more than 30 days, it may be evicted from Cache Reserve.
- Origin Range requests are not supported at this time from Cache Reserve.

## Pricing

Cache Reserve charges based on the total volume of data stored, along with two classes of operations on that data:

- [Class A operations](https://developers.cloudflare.com/r2/platform/pricing/#class-a-operations) which are more expensive and tend to mutate state.
- [Class B operations](https://developers.cloudflare.com/r2/platform/pricing/#class-b-operations) which tend to read existing state.

### Cache Reserve pricing

<table>
  <tbody>
    <th></th>
    <th>Paid - Rates</th>
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

Operations are performed by Cache Reserve on behalf of the user in order to write data from the origin to cache reserve and to pass that data downstream to other parts of Cloudflare’s network. You do not need to manage this.

#### Class A operations (writes)

Class A Operations are performed based on misses from Cloudflare’s CDN. When a request cannot be served from cache, it will be fetched from the origin and written to cache reserve as well as our edge caches on the way back to the visitor. 

#### Class B operations (reads)

Class B Operations are performed when data needs to be fetched from Cache Reserve to respond to a miss in the edge cache. 

#### Operations billing examples:

- 10,000 writes in a month will be charged $4.50
- One read in a month will be charged $0.36.
- 2,999,000 writes will be charged $9.00.

#### Free operations

Free operations include purging assets.

Cache Reserve will respect Cache-Control, CDN-Cache-Control headers.

Cache Reserve will also be purged along with edge cache when a purge by URL request is sent by the customer. Other purge methods such as purge by tag or prefix will invalidate the asset in Cache Reserve, but assets purged this way will still incur storage costs until they expire.

While Cache Reserve does require a paid plan, users can continue to use Cloudflare’s CDN (without Cache Reserve) for free. 

## Tips and Best Practices

Cache Reserve should be used with [Tiered Cache](https://developers.cloudflare.com/cache/about/tiered-cache/) enabled. Cache Reserve is designed for use with Tiered Cache enabled for maximum origin shielding. Using Cache Reserve without Tiered Cache may result in higher storage operation costs. Enabling via the UI will check and provide a warning if you try to use Cache Reserve without Tiered Cache enabled. 