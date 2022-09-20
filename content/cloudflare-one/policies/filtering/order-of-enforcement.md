---
pcx_content_type: concept
title: Order of enforcement
weight: 7
---

# Order of enforcement

With Cloudflare Gateway, you can [enable and configure](/cloudflare-one/policies/filtering/initial-setup/) any combination of DNS, network, and HTTP policies. Gateway applies your policies in the following order:

1. DNS
2. HTTP
3. Network

DNS policies are standalone. For example, if you block a site with a DNS policy but do not create a corresponding HTTP policy, users can still access the site if they know its IP address.

Next, Gateway evaluates HTTP policies in [this order](#http-policies). For example, if you block a specific source IP in an HTTP policy but allow the IP range in a network policy, the IP address will be blocked.

Lastly, if traffic passes your HTTP policies, Gateway checks the traffic against your network policies. For example, even if you create a Do Not Inspect HTTP policy for a site, it can be blocked by a subsequent network policy.

## Priority within a policy builder

### DNS policies

Gateway evaluates DNS policies in [order of precedence](#order-of-precedence).

### Network policies

Gateway evaluates network policies in [order of precedence](#order-of-precedence).

### HTTP policies

Gateway applies HTTP policies based on a combination of [action type](/cloudflare-one/policies/filtering/http-policies/#actions) and [order of precedence](#order-of-precedence):

1. All Do Not Inspect policies are evaluated first, in order of precedence.
2. If no policies match, all Isolate policies are evaluated in order of precedence.
3. All Allow, Block and Do Not Scan policies are evaluated in order of precedence.

This order of enforcement allows Gateway to first determine whether decryption should occur. If a site matches a Do Not Inspect policy, it is automatically allowed through Gateway and bypasses all other HTTP policies.

Next, Gateway checks decrypted traffic against your Isolate policies. When a user makes a request which triggers an Isolate policy, the request will be rerouted to a [remote browser](/cloudflare-one/policies/browser-isolation/).

Lastly, Gateway evaluates all Allow, Block, and Do Not Scan policies. These policies apply to both isolated and non-isolated traffic.

### Order of precedence

Order of precedence refers to the priority of individual policies within the DNS, network, or HTTP policy builder (lowest value first, or from top to bottom as shown in the UI).  You can modify the order of precedence by dragging and dropping individual policies in the UI.

The order of precedence works like a series of filters: if a site passes Policy #1, it can still be blocked by Policy #2. Once a site is blocked, it cannot be allowed through by any subsequent policies.