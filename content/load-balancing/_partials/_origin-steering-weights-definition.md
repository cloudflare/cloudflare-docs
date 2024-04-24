---
_build:
  publishResources: false
  render: never
  list: never
---

The weight assigned to a server controls the percentage of pool traffic sent to that server. By default, all origins within a pool have a weight of **1**.

If you leave each origin with the default setting and choose a **Random** origin steering policy, each pool will receive the same percentage of traffic. If you use a **Hash** policy, that percentage will vary based on the IP distribution of your requests.