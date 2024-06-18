---
_build:
  publishResources: false
  render: never
  list: never
---

The weight assigned to an endpoint controls the percentage of pool traffic sent to that endpoint. By default, all endpoints within a pool have a weight of **1**.

If you leave each endpoint with the default setting and choose a **Random** endpoint steering policy, each endpoint will receive the same percentage of traffic. If you use a **Hash** policy, that percentage will vary based on the IP distribution of your requests.