---
title: Reference
pcx_content_type: reference
layout: single
meta:
  title: Failures
---

# Failures

If a user is able to connect to Cloudflare and the site they connect to has NEL enabled, Cloudflare passes back two headers to the browser indicating that they should report any network failures to an endpoint specified in the headers. The browser will operate as usual, and if something happens that prevents the browser from connecting to the site, the browser will log the failure as a report and send it to the endpoint.

Network Error Logging failures can occur for different reasons which are outlined below.

## Internet Service Provider (ISP) outage

An ISP outage appears to NEL users as failures from one particular last-mile network. By examining NEL data to look at the client autonomous system number (ASN) view, you can see which networks are causing the most impact.

For customers, this scenario appears as an influx of `tcp.timed_out errors`, as well as `tcp.failed`, `h2.protocol_error` and `h3.protocol_error`.

In the event of a last-mile outage, the best course of action is to contact the provider to investigate.

## Transit Flap

Transit flaps look like momentary outages caused by transits re-establishing BGP sessions.

To customers, this will appear as `tcp.timed_out` reports from a variety of ASNs over a short period of time. This could happen for several reasons:

- Maintenance in the transit network necessitated a reset of the session.
- Maintenance or reboots in Cloudflare necessitated a reset of the BGP session.
- Packet loss in the network caused the session to flap.

Heavy packet loss in the network will likely result in a series of flaps over time. Maintenance is typically one impact period that lasts no more than two minutes.

## Infrastructure outage

Infrastructure outages occur at shared peering points, such as Internet exchanges.

These outages appear to customers as an increase in `tcp.timed_out`, `tcp.failed`, and `tcp.aborted reports`. These failures will likely appear across multiple networks for an extended period of time.

Depending on the severity of the report volume, Cloudflare may declare an incident to track remediation. Alternatively, Cloudflare may deactivate peering from these shared points until the issue is resolved.

## Cloudflare outage

Cloudflare outages consist of issues within Cloudflare’s data-center fabric.

These outages appear to customers as an increase in `tcp.timed_out`, `tcp.failed`, and `tcp.aborted` reports and will likely appear across multiple networks for a short period of time.

By pivoting by data center, customers can track the impact across Cloudflare points of presence. Cloudflare-based incidents will always be tracked through a status page, which will indicate whether or not there are issues within the impacted region.

## Provider sending traffic through scrubbing center/blocking traffic

This type of outage manifests as TLS errors, such as `tls.cert.authority_invalid`, `tls.cert.name_invalid,` or others and may also present with `tcp.aborted errors`.

Customers may uncover this behavior by looking at which last-mile ASNs are displaying increased failures, as it will typically be only one.

Customers can seek remediation by contacting the provider that they believe is scrubbing their traffic.

## Certificate issues

Certificate issues are also detectable through NEL. The `TLS.version`, `cipher_mismatch`, or other errors may present across multiple ISPs in multiple Cloudflare locations.

If this is detected in NEL, the issue can be remediated by deploying new certificates or using [Cloudflare’s SSL management suite](/ssl/edge-certificates/advanced-certificate-manager/) to automatically deploy new certificates.
