---
title: Connection forwarding
pcx_content_type: concept
weight: 3
layout: wide
---

# Connection forwarding

Since IPv6 address ranges are deployed globally, no forwarding is needed.

For IPv4 traffic, based on [IPs allocation](/aegis/about/ips-allocation/), not all egress data centers will have access to an applicable Aegis IP.

Aegis does not forward to another location in response to traffic spikes. Instead, each IPv4 can be split across up to four locations, where some of these locations may have multiple data centers. IP capacity in each data center can also be adjusted in accordance with the amount of traffic that reaches each location.

After a request reaches Cloudflare on an ingress data center, and the cache service sends a request for the egress router to connect to your origin, the following scenarios are possible.

## Traffic can egress from the same server

If the server running the egress router has access to an applicable Aegis IP, traffic egresses from that server.

```mermaid
flowchart LR
        accTitle: Cloudflare Aegis and connection forwarding
        accDescr: Diagram showing IPv4 connection forwarding for Cloudflare Aegis - Same data center.
        A[Client]
        subgraph Data center A
        X[(Cache service)] --> B[(Egress router <br/> <small>*has Aegis IP</small>)]
        end
        C[(Origin server)]

        A --ingress--> X
        B --egress--> C
```

## Connection forwarding is needed

If the server does not have access to an applicable Aegis IP, the following options are checked and the first that is possible will take place:

* Another server in the same data center has access to an applicable Aegis IP and the connection is forwarded to that server.

```mermaid
flowchart LR
        accTitle: Cloudflare Aegis and connection forwarding
        accDescr: Diagram showing IPv4 connection forwarding for Cloudflare Aegis - Same data center.
        A[Client]
        subgraph Data center A
        X[(Cache service)] --> B[(Egress router <br/> <small>*no Aegis IP</small>)]
        B --> Y[(Egress server <br/> <small>*has Aegis IP</small>)]
        end
        C[(Origin server)]

        A --ingress--> X
        Y --egress--> C
```

* Another data center in the same location has access to an applicable Aegis IP and the connection is forwarded to that data center.

```mermaid
flowchart LR
        accTitle: Cloudflare Aegis and connection forwarding
        accDescr: Diagram showing IPv4 connection forwarding for Cloudflare Aegis - Different data center.
        A[Client]
        subgraph Location 1
        subgraph Data center A
        X[(Cache service)] --> B[(Egress router <br/> <small>*no Aegis IP</small>)]
        end
        subgraph Data center B
        B --> Y[(Egress server <br/> <small>*has Aegis IP</small>)]
        end
        end
        C[(Origin server)]


        A --ingress--> X
        Y --egress--> C
```

* Another data center in a different location has access to an applicable Aegis IP. The closest location is selected and connection is forwarded to that location.


```mermaid
flowchart LR
        accTitle: Cloudflare Aegis and connection forwarding
        accDescr: Diagram showing IPv4 connection forwarding for Cloudflare Aegis - Different location.
        A[Client]
        subgraph Location 1
          subgraph Data center A
          X[(Cache service)] --> B[(Egress router <br/> <small>*no Aegis IP</small>)]
          end
        end
        subgraph Location 2
          subgraph Data center C
            B --> Y[(Egress server <br/> <small>*has Aegis IP</small>)]
          end
        end
        C[(Origin server)]


        A --ingress--> X
        Y --egress--> C
```