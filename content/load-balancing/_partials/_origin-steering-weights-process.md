---
_build:
  publishResources: false
  render: never
  list: never
---

To customize weights when you [create or edit a pool](/load-balancing/how-to/create-pool/), set the **Weight** to a number between 0 and 1 (expressed in increments of .01). Cloudflare will then send traffic to that pool based on a combination of your origin steering policy and the following formula.

```txt
% of traffic to origin = origin weight ÷ sum of all weights in the pool
```

<details>
<summary>Origin weight example</summary>
<div>

Here’s an example applying weights to three origin servers with a **Random** origin steering policy:

- **Weights:** Origin Server A = 0.25; Origin Server B = 0.25; Origin Server C = 0.50
- **When all origins are healthy**, each origin will receive the following proportion of total traffic: A = 25%; B = 25%; C = 50%.
- **When one origin is unhealthy** (such as origin C), each healthy origin will receive the following proportion of total traffic: A = 50%; B=50%.

A significant amount of traffic is required for the distribution to converge on the expected values.

</div>
</details>

An origin with a weight of **0** should not receive any traffic sent to that pool (though the origin will still receive health monitor requests).

You can also see this value in the **Percent** field when creating or editing a pool in the dashboard.

{{<Aside type="note" header="Note:">}}

If an origin is used in multiple pools and has multiple weights assigned, the total traffic sent to that pool will differ from the percentage specified in each individual pool.

{{</Aside>}}