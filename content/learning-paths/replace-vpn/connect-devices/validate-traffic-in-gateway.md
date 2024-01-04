---
title: Verify device connectivity
pcx_content_type: overview
weight: 3
layout: learning-unit
---

To validate that Cloudflare is receiving traffic from a user device:

{{<render file="gateway/_verify-connectivity.md" withParameters="DNS" productFolder="cloudflare-one">}}

## Best practices

Replacing a VPN with a Zero Trust Network Access solution usually happens in two phases: the first phase is establishing connectivity, and the second phase is defining building policies for distinct applications. We recommend verifying that all connectivity is working as expected before moving on to build complex security policies. This will reduce the amount of troubleshooting and challenges that arise from managing complex systems.
