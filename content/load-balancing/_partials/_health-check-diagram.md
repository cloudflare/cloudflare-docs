---
_build:
  publishResources: false
  render: never
  list: never
---

<div class="mermaid">
    flowchart LR
      accTitle: Load balancing monitor flow
      accDescr: Monitors issue health checks, which validate the current status of servers within each origin pool.
      Monitor -- Healthcheck ----> Origin2
      Origin2 -- Response ----> Monitor
      subgraph Origin pool
      Origin1((Origin 1))
      Origin2((Origin 2))
      end
</div>