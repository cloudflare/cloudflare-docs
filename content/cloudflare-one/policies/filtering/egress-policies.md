---
pcx-content-type: configuration
title: Dedicated egress IPs
layout: single
weight: 12
---

# Dedicated egress IPs

<details>
<summary>Feature availability</summary>
<div>

Dedicated egress IPs are only available on Enterprise plans.

</div>
</details>

When your users connect to the Internet through Cloudflare Gateway, by default their traffic is assigned a source IP address that is shared across all Cloudflare WARP users. To ensure that egress traffic from your organization is assigned a unique, static IP, You can purchase dedicated egress IPs for an Enterprise account. These source IPs are dedicated to your account and can be used within allowlists on upstream services.
