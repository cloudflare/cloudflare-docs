---
pcx_content_type: concept
title: Order of enforcement
weight: 11
---

# Order of enforcement

With Cloudflare Gateway, you can [enable and configure](/cloudflare-one/policies/gateway/initial-setup/) any combination of DNS, network, and HTTP policies.

```mermaid
flowchart TB
    %% Accessibility
    accTitle: Gateway order of enforcement
    accDescr: Flowchart describing the order of enforcement for Gateway policies.

    %% In with user traffic
    start(["Traffic"])-->dns0[/"DNS query"/]-->dns1
    start-->http0{{"HTTP(S) request on port 80 or 443?"}}
    http0--Yes-->http1
    http0--No-->network0

    %% DNS policies
    subgraph DNS
    dns1["DNS policies"]
    style DNS text-align:left
    end
    dns1--Resolved by-->dns2["1.1.1.1"]------>internet

    %% Proxied by Gateway
    subgraph Proxy

    %% HTTP policies
    subgraph HTTP
    http1{{"Do Not Inspect policies"}}
    http1--Inspect-->http2["Isolate policies"]
    http2-->http3["Allow, Block, Do Not Scan policies"]
    end

    http1--Do Not Inspect-->network0
    http3-->network0
    network0[/"Network connections"/]-->network1

    %% Network policies
    subgraph Network
    network1["Network policies"]
    end
    end

    %% Egress
    subgraph Egress
    network1-.Enterprise users only.->egress1[Egress policies]
    end

    %% Finish
    network1--Egress with Cloudflare IP-->internet([Internet])
    egress1--Egress with dedicated IP-->internet
```

## Priority between policy builders

Gateway applies your policies in the following order:

1. DNS
2. HTTP
3. Network

DNS policies are standalone. For example, if you block a site with a DNS policy but do not create a corresponding HTTP policy, users can still access the site if they know its IP address.

Next, Gateway evaluates HTTP policies in [a specific order](#http-policies). For example, if you block a specific source IP in an HTTP policy but allow the IP range in a network policy, the IP address will be blocked.

Lastly, if traffic passes your HTTP policies, Gateway checks the traffic against your network policies. For example, even if you create a Do Not Inspect HTTP policy for a site, it can be blocked by a subsequent network policy.

### HTTP/3 traffic

For proxied [HTTP/3 traffic](/cloudflare-one/policies/gateway/http-policies/http3/), Gateway applies your policies in the following order:

1. DNS
2. Network
3. HTTP

## Priority within a policy builder

### DNS policies

Gateway evaluates DNS policies in [order of precedence](#order-of-precedence).

### Network policies

Gateway evaluates network policies in [order of precedence](#order-of-precedence).

### HTTP policies

Gateway applies HTTP policies based on a combination of [action type](/cloudflare-one/policies/gateway/http-policies/#actions) and [order of precedence](#order-of-precedence):

1. All Do Not Inspect policies are evaluated first, in order of precedence.
2. If no policies match, all Isolate policies are evaluated in order of precedence.
3. All Allow, Block and Do Not Scan policies are evaluated in order of precedence.

This order of enforcement allows Gateway to first determine whether decryption should occur. If a site matches a Do Not Inspect policy, it is automatically allowed through Gateway and bypasses all other HTTP policies.

{{<Aside type="note">}}
The only exception is if you are using [Clientless Web Isolation](/cloudflare-one/policies/browser-isolation/setup/clientless-browser-isolation/) — all sites within the clientless remote browser are implicitly isolated even if they match a Do Not Inspect policy.
{{</Aside>}}

Next, Gateway checks decrypted traffic against your Isolate policies. When a user makes a request which triggers an Isolate policy, the request will be rerouted to a [remote browser](/cloudflare-one/policies/browser-isolation/).

Lastly, Gateway evaluates all Allow, Block, and Do Not Scan policies. These policies apply to both isolated and non-isolated traffic. For example, if `example.com` is isolated and `example.com/subpage` is blocked, Gateway will block the subpage inside of the remote browser.

### Order of precedence

{{<render file="gateway/_order-of-precedence.md" withParameters="DNS, network, or HTTP">}}

## Example

Suppose you have a list of policies arranged in the following order of precedence:

- DNS policies:
  {{<render file="gateway/_order-of-precedence-dns.md">}}
- HTTP policies:
  | Precedence | Selector | Operator | Value               | Action         |
  | ---------- | -------- | -------- | ------------------- | -------------- |
  | 1          | Host     | is       | `example.com`       | Block          |
  | 2          | Host     | is       | `test2.example.com` | Do Not Inspect |
- Network policies:
  | Precedence | Selector         | Operator | Value              | Action |
  | ---------- | ---------------- | -------- | ------------------ | ------ |
  | 1          | Destination Port | is       | `80`               | Block  |
  | 2          | Destination port | is       | `443`              | Allow  |
  | 3          | SNI Domain       | is       | `test.example.com` | Block  |

When a user goes to `https://test.example.com`, Gateway performs the following operations:

1. Evaluate DNS request against DNS policies:
   {{<render file="gateway/_order-of-precedence-dns-order.md">}}

2. Evaluate HTTPS request against HTTP policies:

   1. Policy #2 is evaluated first because Do Not Inspect [always takes precedence](#http-policies) over Allow and Block. Since there is no match, move on to check Policy #1.
   2. Policy #1 does not match `test.example.com`. Since there are no matching Block policies, the request passes the HTTP filter and moves on to network policy evaluation.

3. Evaluate HTTPS request against network policies:

   1. Policy #1 does not match because port 80 is used for standard HTTP, not HTTPS.
   2. Policy #2 matches, so the request is allowed and proxied to the upstream server.
   3. Policy #3 is not evaluated because there has already been an explicit match.

The user is therefore able to connect to `https://test.example.com`.
