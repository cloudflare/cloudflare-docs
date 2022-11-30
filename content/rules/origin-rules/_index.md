---
pcx_content_type: concept
title: Origin Rules
weight: 6
layout: single
meta:
  title: Origin Rules (beta)
---

{{<beta>}} Origin Rules {{</beta>}}

Origin Rules allow you to customize where the incoming traffic will go and with which parameters. Currently you can perform the following overrides:

* [Host header](/rules/origin-rules/features/#host-header): Overrides the `Host` header of incoming requests.
* [Server Name Indication (SNI)](/rules/origin-rules/features/#server-name-indication-sni): Overrides the Server Name Indication (SNI) value of incoming requests.
* [DNS record](/rules/origin-rules/features/#dns-record): Overrides the resolved hostname of incoming requests.
* [Destination port](/rules/origin-rules/features/#destination-port): Overrides the resolved destination port of incoming requests.

The Origin Rule expression will determine when these overrides will be applied.

## Availability

{{<feature-table id="rules.origin_rules">}}

## Execution order

{{<render file="_product_execution_order.md">}}

## Important remarks

If you override the hostname with an Origin Rule (via Host header override or DNS record override) and add a header override to your load balancer configuration, the Origin Rule will take precedence over the load balancer configuration.

Like [Page Rules](https://support.cloudflare.com/hc/articles/218411427), an Origin Rule performing a Host header override will update the SNI value of the original request to the same value of the Host header. To set an SNI value different from the Host header override, add an SNI override in the same Origin Rule or create a separate Origin Rule for this purpose.