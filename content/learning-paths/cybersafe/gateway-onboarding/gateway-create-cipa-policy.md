---
title: Create CIPA policy
pcx_content_type: learning-unit
weight: 6
layout: learning-unit
---

## Create CIPA policy

1. Go to **Gateway** > **Firewall Policies**.
2. Create a policy to block using the CIPA filter:
    {{<render file="gateway/policies/_block-cipa.md" productFolder="cloudflare-one">}}
3. In **Logs** > **Gateway** > **DNS**, verify that you see the blocked domain.

Your environment is now protected against all of the subcategories listed in [Configuration](/fundamentals/reference/policies-compliances/cybersafe/#configuration).
