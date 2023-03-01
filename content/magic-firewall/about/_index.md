---
title: About
pcx_content_type: navigation
weight: 3
layout: single
---

# About

Review the content below to learn more about concepts related to Magic Firewall.

{{<Aside type="warning" header="Important">}}

When you or your end users are using other Cloudflare services (for example, CDN and Spectrum) that proxy traffic, be aware of the following:

*   Firewall rules that block traffic based on source IP address may not work as intended because rules are evaluated after Cloudflare terminates the incoming TCP connections.
*   You must allow [Cloudflare IP addresses](https://www.cloudflare.com/ips/).
*   When using Magic Firewall, fragmented packets are reassembled into complete packets before they are inspected. As a result, you cannot create firewall rules for fragments.

{{</Aside>}}

{{<directory-listing>}}
