---
title: Test a policy
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

It is common for a misconfigured Gateway policy to accidentally block traffic to benign sites. To ensure a smooth deployment, we recommend testing a simple policy before deploying DNS filtering to your organization.

## Test a policy in the browser

1. Go to **Gateway** > **Firewall policies**.
2. Disable all existing DNS policies.
3. Re-enable or create a policy to block all security categories:
    {{<render file="gateway/_block-security-categories.md" productFolder="cloudflare-one">}}
4. Ensure that your browser is not configured to use an alternate DNS resolver. For example, Chrome has a **Use secure DNS** setting that will cause the browser to send requests to 1.1.1.1 and bypass your DNS policies.
5. In the browser, go to `malware.testcategory.com`. You should see a generic Gateway block page.

{{<Aside type="note">}}
[Custom block pages](/cloudflare-one/policies/gateway/configuring-block-page/) require you to install a root certificate on the device.
{{</Aside>}}

6. In **Logs** > **Gateway** > **DNS**, verify that you see the blocked domain.
7. Slowly re-enable or add other policies to your configuration.
8. When testing against frequently-visited sites, you may need to [clear the DNS cache](/cloudflare-one/policies/gateway/dns-policies/test-dns-filtering/#clear-dns-cache) in your browser or OS. Otherwise, the DNS lookup will return the locally-cached IP address and bypass your DNS policies.

You have now validated DNS filtering on a test device.
