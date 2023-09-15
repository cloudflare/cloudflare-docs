---
_build:
  publishResources: false
  render: never
  list: never
---

```mermaid
    flowchart LR
      accTitle: Load balancing monitor flow
      accDescr: Monitors issue health monitor requests, which validate the current status of servers within each origin pool.
      Monitor -- Health Monitor ----> Origin2
      Origin2 -- Response ----> Monitor
      subgraph Origin pool
      Origin1((Origin 1))
      Origin2((Origin 2))
      end
```