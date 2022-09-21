---
pcx_content_type: concept
title: Order of enforcement
weight: 7
---

# Order of enforcement

With Cloudflare Gateway, you can [enable and configure](/cloudflare-one/policies/filtering/initial-setup/) any combination of DNS, network, and HTTP policies.

## Priority between policy builders

Gateway applies your policies in the following order:

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

1. All [Do Not Inspect](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) policies are evaluated first, in order of precedence.
2. If no policies match, all Isolate policies are evaluated in order of precedence.
3. All Allow, Block and Do Not Scan policies are evaluated in order of precedence.

This order of enforcement allows Gateway to first determine whether decryption should occur. If a site matches a Do Not Inspect policy, it is automatically allowed through Gateway and bypasses all other HTTP policies.

Next, Gateway checks decrypted traffic against your Isolate policies. When a user makes a request which triggers an Isolate policy, the request will be rerouted to a [remote browser](/cloudflare-one/policies/browser-isolation/).

Lastly, Gateway evaluates all Allow, Block, and Do Not Scan policies. These policies apply to both isolated and non-isolated traffic. For example, if `example.com` is isolated and `example.com/subpage` is blocked, the subpage will get blocked by Gateway inside of the remote browser.

### Order of precedence

Order of precedence refers to the priority of individual policies within the DNS, network, or HTTP policy builder (lowest value first, or from top to bottom as shown in the UI).  You can modify the order of precedence by dragging and dropping individual policies in the UI.

In Gateway, the order of precedence follows the first match principle — once a site matches an Allow or Block policy, evaluation stops and no subsequent policies can override the decision. Therefore, we recommend putting the most specific policies and exceptions at the top of the list and the most general policies at the bottom.

## Example

Suppose you have a list of policies arranged in the following order of precedence:

- DNS policies:
    | Precedence | Selector       | Operator | Value           | Action         |
    | ------     | ---------------| ---------| ----------------| -------------- |
    | 1          | Host           | is       | `example.com`   | Block        |
    | 2          | Host           | is       | `test.example.com` | Allow |
    | 3          | Domain         | matches regex | `.\`       | Block |
- HTTP policies:
    | Precedence | Selector       | Operator | Value           | Action         |
    | ------     | ---------------| ---------| ----------------| -------------- |
    | 1          | Host           | is       | `example.com`   | Block        |
    | 2          | Host           | is       | `test2.example.com` | Do Not Inspect |
- Network policies:
    | Precedence | Selector       | Operator | Value           | Action         |
    | ------     | ---------------| ---------| ----------------| -------------- |
    | 1          | Destination Port    | is       | `80`       | Block        |
    | 2          | Destination port    | is       | `443`     | Allow |
    | 3          | SNI Domain          | is       | `test.example.com` | Block |

When a user navigates to `https://test.example.com`, Gateway performs the following operations:

1. Evaluate DNS request against DNS policies:
    1. Policy #1 does not match `test.example.com`, so we move on to check Policy #2.
    2. Policy #2 matches, so DNS resolution is Allowed.
    3. Policy #3 is not evaluated because there has already been an explicit match.
2. Evaluate HTTPS request against HTTP policies:
    1. Policy #2 is evaluated first because Do Not Inspect [always take precedence](#http-policies) over Allow or Block. Since there is no match, we move on to check Policy #1.
    2. Policy #1 does not match `test.example.com`. Since there are no matching Block policies, the request passes the HTTP filter and moves on to network policy evaluation.
3. Evaluate HTTPS request against network policies:
    1. Policy #1 does not match because port 80 is used for standard HTTP, not HTTPS.
    2. Policy #2 matches, so the request is Allowed and proxied to the upstream server.
    3. Policy #3 is not evaluated because there has already been an explicit match.

The user is therefore able to connect to `https://test.example.com`.
