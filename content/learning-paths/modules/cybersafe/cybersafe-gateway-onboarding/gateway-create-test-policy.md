---
title: Create a test policy
pcx_content_type: learning-unit
weight: 5
layout: learning-unit
---

To ensure a smooth deployment, we recommend testing a simple policy before deploying DNS filtering to your organization.

## Test a policy in the browser

1. Go to **Gateway** > **Firewall policies**.
2. Create a policy to block all security categories:
    {{<render file="gateway/_block-security-categories.md" productFolder="cloudflare-one">}}
3. In the browser, go to `malware.testcategory.com`. You should see a generic Gateway block page.
4. In **Logs** > **Gateway** > **DNS**, verify that you see the blocked domain.

{{<Aside>}}
When testing against frequently-visited sites, you may need to [clear the DNS cache](/cloudflare-one/policies/gateway/dns-policies/test-dns-filtering/#clear-dns-cache) in your browser or OS. Otherwise, the DNS lookup will return the locally-cached IP address and bypass your DNS policies.
{{</Aside>}}

You have now validated DNS filtering!
