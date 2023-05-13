---
title: Create your first policy
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

DNS policies determine how Gateway should handle a DNS request. When a user sends a DNS request, Gateway matches the request against your filters and either allows the query to resolve, blocks the query, or responds to the query with a different IP. 

You can filter DNS traffic based on query or response parameters (such as domain, source IP, or geolocation). You can also filter by user identity if you [connect your devices to Gateway with the Cloudflare One Agent](/learning-paths/modules/security/dns-filtering-connect-devices/). To learn more, refer to [DNS policies](/cloudflare-one/policies/filtering/dns-policies/).

To create a new DNS policy:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Firewall Policies**.
2. In the **DNS** tab, select **Add a policy**.
3. We recommend adding the following policy:

    {{<render file="gateway/_policies-recommended.md" productFolder="cloudflare-one">}}

4. Select **Save policy**.

The policy will apply to all devices that you connect to Gateway.
