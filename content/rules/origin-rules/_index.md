---
pcx_content_type: concept
title: Origin Rules
weight: 6
meta:
  title: Origin Rules
---

# Origin Rules

Origin Rules allow you to customize where the incoming traffic will go and with which parameters. Currently you can perform the following overrides:

* [Host header](/rules/origin-rules/features/#host-header): Overrides the `Host` header of incoming requests.
* [Server Name Indication (SNI)](/rules/origin-rules/features/#server-name-indication-sni): Overrides the Server Name Indication (SNI) value of incoming requests.
* [DNS record](/rules/origin-rules/features/#dns-record): Overrides the resolved hostname of incoming requests.
* [Destination port](/rules/origin-rules/features/#destination-port): Overrides the resolved destination port of incoming requests.

The origin rule expression will determine when these overrides will be applied.

{{<render file="_snippets-alternative.md" withParameters="and customized modifications">}}<br />

{{<render file="_rules-requirements.md" withParameters="Origin Rules require">}}

## Availability

{{<feature-table id="rules.origin_rules">}}

## Execution order

{{<render file="_product-execution-order.md">}}

## Important remarks

If you override the hostname with an origin rule (via `Host` header override or DNS record override) and add a header override to your load balancer configuration, the origin rule will take precedence over the load balancer configuration.

Like [Page Rules](/rules/page-rules/), an origin rule performing a `Host` header override will update the SNI value of the original request to the same value of the `Host` header. To set an SNI value different from the `Host` header override, add an SNI override in the same origin rule or create a separate origin rule for this purpose.

{{<render file="_troubleshoot-rules-with-trace.md" withParameters="origin rules">}}