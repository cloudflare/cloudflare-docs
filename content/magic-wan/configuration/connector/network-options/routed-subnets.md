---
pcx_content_type: concept
title: Routed subnets
---

```mermaid
flowchart TB
accTitle: Routed subnets
accDescr: Some LANs are complex, and might have additional subnets behind L3 routers.

a((WAN)) --> b

subgraph b [Connector]
direction TB
c(LAN 1)
d(LAN N)
end

c --> e(subnet x):::blue
d --> f(subnet 192.168.100.0/24):::blue

f --> g(192.168.100.10):::blue

g --> h(routed subnet x):::red
g --> i(192.168.200.0/24):::red
g --> j(routed subnet y):::red
j --> k(routed subnet z):::red

classDef blue fill:#add8e6
classDef red fill:#ff6900
```

<br>

```mermaid
flowchart TB
accTitle: Routed subnets
accDescr: Some LANs are complex, and might have additional subnets behind L3 routers.
a(Blue color represents <br> directly connected subnets):::blue
b(Red color represents <br> routed subnets):::red

classDef blue fill:#add8e6
classDef red fill:#ff6900
```
