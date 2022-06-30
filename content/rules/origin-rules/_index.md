---
pcx-content-type: concept
title: Origin Rules (beta)
weight: 6
layout: single
---

# Origin Rules (beta)

Origin Rules allow you to customize where the incoming traffic will go and with which parameters. Currently you can perform the following overrides:

* [Host Header Override](/rules/origin-rules/features/#host-header-override): Overrides the `Host` header of incoming requests.
* [Resolve Override](/rules/origin-rules/features/#resolve-override): Overrides the resolved hostname of incoming requests.
* [Destination Port Override](/rules/origin-rules/features/#destination-port-override): Overrides the resolved destination port of incoming requests.

The Origin Rule expression will determine when these overrides are applied.

{{<Aside type="warning">}}
Currently you can only create Origin Rules [using the API](/rules/origin-rules/create-api/).
{{</Aside>}}

## Availability

{{<table-wrap>}}
|                           | Free | Pro | Business | Enterprise |
|---------------------------|:----:|:---:|:--------:|:----------:|
| Number of Origin Rules    |  10  | 20  |    50    |    100     |
| Host Header Override      |  —   |  —  |    —     |    Yes     |
| Resolve Override          |  —   |  —  |    —     |    Yes     |
| Destination Port Override | Yes  | Yes |   Yes    |    Yes     |

{{</table-wrap>}}
