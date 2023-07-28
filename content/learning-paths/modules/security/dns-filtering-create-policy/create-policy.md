---
title: Create your first policy
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

DNS policies determine how Gateway should handle a DNS request. When a user sends a DNS request, Gateway matches the request against your filters and either allows the query to resolve, blocks the query, or responds to the query with a different IP.

You can filter DNS traffic based on query or response parameters (such as domain, source IP, or geolocation). You can also filter by user identity if you [connect your devices to Gateway with the Cloudflare One Agent](/learning-paths/modules/security/dns-filtering-connect-devices/). To learn more, refer to [DNS policies](/cloudflare-one/policies/gateway/dns-policies/).

To create a new DNS policy:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Firewall Policies**.
2. In the **DNS** tab, select **Add a policy**.
3. Name the policy.
4. Under **Traffic**, build a logical expression that defines the traffic you want to allow or block.
5. Choose an **Action** to take when traffic matches the logical expression. For example, we recommend adding a policy to block all [security categories](/cloudflare-one/policies/gateway/domain-categories/#security-categories):

   {{<render file="gateway/_block-security-categories.md" productFolder="cloudflare-one">}}

6. Select **Create policy**.

The policy will apply to all devices that you connect to Gateway.
