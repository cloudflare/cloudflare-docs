---
_build:
  publishResources: false
  render: never
  list: never
---

To customize weights when you [create or edit a pool](/load-balancing/pools/create-pool/), set the **Weight** to a number between 0 and 1 (expressed in increments of .01). Cloudflare will then send traffic to that pool based on a combination of your endpoint steering policy and the following formula.

```txt
% of traffic to endpoint = endpoint weight ÷ sum of all weights in the pool
```

{{<details header="Endpoint weight example">}}

Here’s an example applying weights to three endpoints with a **Random** endpoint steering policy:

- **Weights:** Endpoint A = 0.25; Endpoint B = 0.25; Endpoint C = 0.50
- **When all endpoints are healthy**, each endpoint will receive the following proportion of total traffic: A = 25%; B = 25%; C = 50%.
- **When one endpoint is unhealthy** (such as endpoint C), each healthy endpoint will receive the following proportion of total traffic: A = 50%; B=50%.

A significant amount of traffic is required for the distribution to converge on the expected values.

{{</details>}}

An endpoint with a weight of **0** should not receive any traffic sent to that pool (though the endpoint will still receive health monitor requests).

You can also see this value in the **Percent** field when creating or editing a pool in the dashboard.

{{<Aside type="note" header="Note:">}}

If an endpoint is used in multiple pools and has multiple weights assigned, the total traffic sent to that pool will differ from the percentage specified in each individual pool.

{{</Aside>}}
