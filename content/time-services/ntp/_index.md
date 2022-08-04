---
pcx_content_type: concept
title: Network Time Protocol
weight: 2
---

# Network Time Protocol

{{<render file="_ntp-definition.md">}}

## Background

NTP works by having a client send a query packet out to an NTP server that then responds with its clock time. The client then computes an estimate of the difference between its clock and the remote clock and attempts to compensate for any network delay. The NTP client then queries multiple servers and implements algorithms to select the best estimate.

Cloudflare does not implement leap smearing: NTP includes a Leap Indicator field [spec](https://tools.ietf.org/html/rfc5905#section-7.3) and the kernel will apply the leap second correction at the appropriate time. This is the behavior servers in `pool.ntp.org` share. Using servers that smear time along with servers that do not may lead to unpredictable and anomalous results.

## Next steps

For more background information about NTP, refer to the [introductory blog](https://blog.cloudflare.com/secure-time/).

To enable NTP on your device, refer to our [Usage guide](/time-services/ntp/usage/).
