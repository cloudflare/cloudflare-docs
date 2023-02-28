---
pcx_content_type: faq
title: Policies
weight: 5
meta:
    description: Review frequently asked questions about policies in Cloudflare Zero Trust.
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# Policies

## What is the order of policy enforcement?

Gateway and Access policies generally trigger from top to bottom based on their position in the policy table in the UI. Exceptions include Bypass and Service Auth policies, which Access evaluates first. Similarly, for Gateway HTTP policies, Do Not Inspect and Isolate policies take precedence over all Allow or Block policies. To learn more about order of enforcement, refer to our documentation for [Access policies](/cloudflare-one/policies/access/#order-of-execution) and [Gateway policies](/cloudflare-one/policies/filtering/order-of-enforcement/).

## **How can I bypass the L7 firewall for a website?**

Cloudflare Gateway uses the hostname in the HTTP `CONNECT` header to identify the destination of the request. Administrators who wish to bypass a site must create a [Do Not Inspect](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) policy in order to prevent HTTP inspection from occurring on both encrypted and plaintext traffic.

Bypassing the L7 firewall results in no HTTP traffic inspection, and logging is disabled for that HTTP session.

## Can I secure applications with a second-level subdomain URL?

Yes. Ensure that your SSL certificates cover the first- and second-level subdomain. Most certificates only cover the first-level subdomain and not the second. This is true for most Cloudflare certificates. To cover a second-level subdomain with a CF certificate, create an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/).

Wildcard-based policies in Cloudflare Access only cover the level where they are applied. Add the wildcard policy to the left-most subdomain to be covered.

## How do isolation policies work together with HTTP policies?

Isolation policies, like all HTTP policies, are evaluated in stages. When a user makes a request which evaluates an Isolation policy, the request will be rerouted to an isolated browser and re-evaluated for HTTP policies. This makes it possible for an isolated browser to remotely render a block page, or have malicious content within the isolated browser blocked by HTTP policies.

## Why is API or CLI traffic not isolated?

Isolation policies are applied to requests that include Accept: `text/html*`. This allows Browser Isolation policies to co-exist with API and command line requests.

## Can Access enforce policies on a specific nonstandard port?

No. Cloudflare Access cannot enforce a policy that would contain a port appended to the URL. However, you can use Cloudflare Tunnel to point traffic to non-standard ports. For example, if Jira is available at port `8443` on your origin, you can proxy traffic to that port via Cloudflare Tunnel.

## Why can I still reach domains blocked by a DNS policy?

Here is a list of possible causes:

- **Your policy is still being updated.** After you edit or create a policy, Cloudflare updates the new setting across all of our data centers around the world. It takes about 60 seconds for the change to propagate.

- **Your device is using another DNS resolver.** If you have other DNS resolvers in your DNS settings, your device could be using IP addresses for resolvers that are not part of Gateway. As a result, the domain you are trying to block is still accessible from your device. Make sure to remove all other IP addresses from your DNS settings and only include Gateway's DNS resolver IP addresses.

- **Your policy is not assigned to a DNS location.** If your policy is not assigned to a DNS location and you send a DNS query from that location, Gateway will not apply that policy. Assign a policy to a DNS location to make sure the desired policy is applied when you send a DNS query from that location.

- **Your DoH endpoint is not a Gateway DNS location**. Browsers can be configured to use any DoH endpoint. If you chose to configure DoH directly in your browser, make sure that the DoH endpoint is a Gateway DNS location.
