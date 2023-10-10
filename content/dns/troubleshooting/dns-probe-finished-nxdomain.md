---
title: DNS_PROBE_FINISHED_NXDOMAIN
pcx_content_type: troubleshooting
weight: 2
meta:
  title: Fix DNS_PROBE_FINISHED_NXDOMAIN
---

# DNS_PROBE_FINISHED_NXDOMAIN

{{<render file="_dns-errors-ts-intro.md" withParameters="DNS_PROBE_FINISHED_NXDOMAIN">}}

## Background

`DNS_PROBE_FINISHED` means that the DNS request for a resource timed out and `NXDOMAIN` stands for non-existent domain. Together, these messages mean that the DNS query for a specific resource could not locate an associated domain.

Though visitors sometimes encounter this error — or similarly worded messages from Safari, Edge, or Firefox — because of network or local DNS issues, it might point to an issue with your DNS records in Cloudflare.

## Potential solutions

{{<render file="_dns-errors-ts-action.md" withParameters="DNS_PROBE_FINISHED_NXDOMAIN">}}

{{<Aside type="note">}}

For additional troubleshooting help, refer to our [Community troubleshooting guide](https://community.cloudflare.com/t/community-tip-fixing-the-dns-probe-finished-nxdomain-error/42818).

{{</Aside>}}