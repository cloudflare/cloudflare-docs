---
title: About
pcx_content_type: navigation
weight: 3
---

# About

Review the content below to learn more about concepts related to Magic Firewall.

{{<Aside type="warning" header="Important">}}

When using Magic Firewall alongside other Cloudflare services that proxy traffic (for example, CDN and Spectrum), be aware of the following:

*   Firewall rules that block traffic based on source IP address may not work as intended because rules are evaluated after Cloudflare terminates the incoming TCP connections.
*   You must allow [Cloudflare IP addresses](https://www.cloudflare.com/ips/).
*   When using Magic Firewall, fragmented {{<glossary-tooltip term_id="data packet">}}packets{{</glossary-tooltip>}} are reassembled into complete packets before they are inspected. As a result, you cannot create firewall rules for fragments.

{{</Aside>}}

{{<directory-listing>}}
