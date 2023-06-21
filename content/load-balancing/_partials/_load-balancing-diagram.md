---
_build:
  publishResources: false
  render: never
  list: never
---

```mermaid
    flowchart LR
      accTitle: Load balancing flow
      accDescr: Load balancing involves a load balancer, pools, origins, monitors, and health monitors.
      B[Request 1] --> A
      C[Request 2] --> A
      D[Request 3] --> A
      A[Load balancer] -- Request 1 --> P1
      A -- Request 2 --> P2
      A -- Request 3 --> P3
      subgraph P1 [Pool 1]
      Origin1((Origin 1))
      Origin2((Origin 2))
      end
      subgraph P2 [Pool 2]
      Origin3((Origin 3))
      Origin4((Origin 4))
      end
      subgraph P3 [Pool 3]
      Origin5((Origin 5))
      Origin6((Origin 6))
      end
```