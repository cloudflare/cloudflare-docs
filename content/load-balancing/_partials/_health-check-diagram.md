---
_build:
  publishResources: false
  render: never
  list: never
---

<div class="mermaid">
    flowchart LR
    Monitor -- Healthcheck ----> Origin2
    Origin2 -- Response ----> Monitor
    subgraph Origin pool
    Origin1((Origin 1))
    Origin2((Origin 2))
    end
</div>