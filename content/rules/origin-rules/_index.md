---
pcx_content_type: concept
title: Origin Rules (beta)
weight: 6
layout: single
---

# Origin Rules (beta)

Origin Rules allow you to customize where the incoming traffic will go and with which parameters. Currently you can perform the following overrides:

* [Host header override](/rules/origin-rules/features/#host-header-override): Overrides the `Host` header of incoming requests.
* [Resolve override](/rules/origin-rules/features/#resolve-override): Overrides the resolved hostname of incoming requests.
* [Destination port override](/rules/origin-rules/features/#destination-port-override): Overrides the resolved destination port of incoming requests.
* [SNI override](/rules/origin-rules/features/#sni-override): Overrides the Server Name Indication (SNI) value of incoming requests.

The Origin Rule expression will determine when these overrides are applied.

{{<Aside type="warning">}}
Currently you can only create Origin Rules [using the API](/rules/origin-rules/create-api/).
{{</Aside>}}

## Availability

{{<table-wrap>}}
|                           | Free | Pro | Business | Enterprise |
|---------------------------|:----:|:---:|:--------:|:----------:|
| Number of Origin Rules    |  10  | 20  |    50    |    100     |
| Host header override      |  —   |  —  |    —     |    Yes     |
| Resolve override          |  —   |  —  |    —     |    Yes     |
| SNI override              |  —   |  —  |    —     |    Yes     |
| Destination port override | Yes  | Yes |   Yes    |    Yes     |

{{</table-wrap>}}

## Important remarks

If you override the hostname with an Origin Rule (via Host header override or resolve override) and add a header override to your load balancer configuration, the Origin Rule will take precedence over the load balancer configuration.

Like [Page Rules](https://support.cloudflare.com/hc/articles/218411427), an Origin Rule performing a Host header override will update the SNI value of the original request to the same value of the Host header. To set an SNI value different from the Host header override, add an SNI override in the same Origin Rule or create a separate Origin Rule for this purpose.