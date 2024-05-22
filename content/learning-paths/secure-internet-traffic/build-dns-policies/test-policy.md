---
title: Test a policy
pcx_content_type: learning-unit
weight: 5
layout: learning-unit
---

It is common for a misconfigured Gateway policy to accidentally block traffic to benign sites. To ensure a smooth deployment, we recommend testing a simple policy before deploying DNS filtering to your organization.

## Test a policy in the browser

1. Go to **Gateway** > **Firewall Policies**.
2. Turn off all existing DNS policies.
3. Turn on any existing security policies or create a policy to block all security categories:
    {{<render file="gateway/policies/_block-security-categories.md" productFolder="cloudflare-one">}}
4. Ensure that your browser is not configured to use an alternate DNS resolver. For example, Chrome has a **Use secure DNS** setting that will cause the browser to send requests to 1.1.1.1 and bypass your DNS policies.
5. In the browser, go to `malware.testcategory.com`. Your browser will display:
   - The Gateway block page, if your device is connected via the WARP client in Gateway with WARP mode.
   - A generic error page, if your device is connected via another method, such as Gateway with DoH mode.

{{<Aside type="note">}}

[Custom block pages](/cloudflare-one/policies/gateway/configuring-block-page/) require you to install a root certificate on the device.

{{</Aside>}}

6. In **Logs** > **Gateway** > **DNS**, verify that you see the blocked domain.
7. Slowly turn on or add other policies to your configuration.
8. When testing against frequently-visited sites, you may need to [clear the DNS cache](/cloudflare-one/policies/gateway/dns-policies/test-dns-filtering/#clear-dns-cache) in your browser or OS. Otherwise, the DNS lookup will return the locally-cached IP address and bypass your DNS policies.

You have now validated DNS filtering on a test device.
