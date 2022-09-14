---
pcx_content_type: concept
title: Origin Rules (beta)
weight: 6
layout: single
---

# Origin Rules (beta)

Origin Rules allow you to customize where the incoming traffic will go and with which parameters. Currently you can perform the following overrides:

* [Host header](/rules/origin-rules/features/#host-header): Overrides the `Host` header of incoming requests.
* [Server Name Indication (SNI)](/rules/origin-rules/features/#server-name-indication-sni): Overrides the Server Name Indication (SNI) value of incoming requests.
* [DNS record](/rules/origin-rules/features/#dns-record): Overrides the resolved hostname of incoming requests.
* [Destination port](/rules/origin-rules/features/#destination-port): Overrides the resolved destination port of incoming requests.

The Origin Rule expression will determine when these overrides will be applied.

## Availability

{{<table-wrap>}}
|                           | Free | Pro | Business | Enterprise |
|---------------------------|:----:|:---:|:--------:|:----------:|
| Number of Origin Rules    |  10  | 20  |    50    |    100     |
| Override Host header      |  —   |  —  |    —     |    Yes     |
| Override DNS record       |  —   |  —  |    —     |    Yes     |
| Override SNI              |  —   |  —  |    —     |    Yes     |
| Override destination port | Yes  | Yes |   Yes    |    Yes     |

{{</table-wrap>}}

## Important remarks

If you override the hostname with an Origin Rule (via Host header override or DNS record override) and add a header override to your load balancer configuration, the Origin Rule will take precedence over the load balancer configuration.

Unlike [Page Rules](https://support.cloudflare.com/hc/articles/218411427), an Origin Rule performing a Host header override will not automatically update the SNI value of the original request. To also change the SNI value, add an SNI override in the same Origin Rule or create a separate Origin Rule for this purpose.