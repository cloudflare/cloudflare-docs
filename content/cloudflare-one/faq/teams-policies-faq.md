---
pcx-content-type: faq
title: Policies
weight: 5
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# Policies

## What is the order of policy enforcement?

Zero Trust and DNS policies trigger top to bottom, based on their position in the policy table in the UI. The exception is Bypass policies, which Access evaluates first. For Allow and Deny policies, you can modify the order by dragging and dropping individual policies in the UI.

Similarly, the L7 firewall will evaluate Do Not Inspect policies before any subsequent Allow or Block policies, to determine if decryption should occur. This means regardless of precedence in your list of policies, all Do Not Inspect policies will take precedence over Allow or Block policies.

## Can I secure applications with a second-level subdomain URL?

Yes. Ensure that your SSL certificates cover the first- and second-level subdomain. Most certificates only cover the first-level subdomain and not the second. This is true for most Cloudflare certificates. To cover a second-level subdomain with a CF certificate, create an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates).
Wildcard-based policies in Cloudflare Access only cover the level where they are applied. Add the wildcard policy to the left-most subdomain to be covered.

## Can I use regular expressions to build policies?

You can use wildcards when setting up Zero Trust policies. Wildcards are useful when specifying application paths you want to protect. For more information, see our guide for [Using wildcards in subdomains and paths](/cloudflare-one/policies/zero-trust/app-paths/#using-wildcards-in-subdomains-and-paths).

Gateway uses Rust to evaluate regular expressions. The Rust implementation is slightly different than regex libraries used elsewhere. For example, if you want to match multiple domains, you could use the pipe symbol (`|`) as an OR operator. In Gateway, you do not need to use an escape character (`\`) before the pipe symbol. Let's say you want to block requests to two hosts if either appears in a request header. A regex for such a rule would look like this:

| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | Matches regex | {{<code>}}.\*whispersystems.org | .\*signal.org{{</code>}} | Block |

To evaluate if your regex matches, you can use [Rustexp](https://rustexp.lpil.uk/).

## How do isolation policies work together with HTTP policies?

Isolation policies, like all HTTP policies, are evaluated in stages. When a user makes a request which evaluates an Isolation policy, the request will be rerouted to an isolated browser and re-evaluated for HTTP policies. This makes it possible for an isolated browser to remotely render a block page, or have malicious content within the isolated browser blocked by HTTP policies.

## Why is API or CLI traffic not isolated?

Isolation policies are applied to requests that include Accept: `text/html*`. This allows Browser Isolation policies to co-exist with API and command line requests.

## Can Access enforce policies on a specific nonstandard port?

No. Cloudflare Access cannot enforce a policy that would contain a port appended to the URL. However, you can use Cloudflare Tunnel to point traffic to non-standard ports. For example, if Jira is available at port `8443` on your origin, you can proxy traffic to that port via Cloudflare Tunnel.

## Why can I still reach domains blocked by a DNS policy?

Here is a list of possible causes:

*   **Your policy is still being updated.** After you edit or create a policy, Cloudflare updates the new setting across all of our data centers around the world. It takes about 60 seconds for the change to propagate.

*   **Your device is using another DNS resolver.** If you have other DNS resolvers in your DNS settings, your device could be using IP addresses for resolvers that are not part of Gateway. As a result, the domain you are trying to block is still accessible from your device. Make sure to remove all other IP addresses from your DNS settings and only include Gateway's DNS resolver IP addresses.

*   **Your policy is not assigned to a location.** If your policy is not assigned to a location and you send a DNS query from that location, Gateway will not apply that policy. Assign a policy to a location to make sure the desired policy is applied when you send a DNS query from that location.

*   **Your DoH endpoint is not a Gateway location**. Browsers can be configured to use any DoH endpoint. If you chose to configure DoH directly in your browser, make sure that the DoH  endpoint is a Gateway location.
