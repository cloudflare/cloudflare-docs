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

When Gateway secures outbound traffic, by default that traffic is assigned a public (source) IP that is shared across all Cloudflare WARP users. Enterprise customers can purchase dedicated egress IPs for their account and configure how traffic is egressed. These unique, static source IPs allow you to authenticate your organization with third-party services that rely on IP-based allowlists.
