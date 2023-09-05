---
title: Get started
pcx_content_type: get-started
weight: 2
---

# Get started

To bring your own IPs, you must go through the onboarding process. Work with your account team to understand everything you need to ensure a smooth transition.

## Overview

Cloudflare requires a service-specific configuration for your prefixes, as well as some requirements common to all BYOIP customers regardless of service type. These requirements are common to all products compatible with BYOIP, such as Magic Transit, CDN, and Spectrum.

## Prerequisites

There are two major prerequisites before Cloudflare can begin onboarding your IP space.

1.  You must verify your [Internet Routing Registry (IRR)](/byoip/about/irr/) records are up to date with the correct prefix/ASN information.

2.  Cloudflare must receive a [Letter of Authorization](/byoip/about/loa/) to announce your prefixes, which we will share with our transit partners as evidence that we are allowed to announce the route.

Optionally, if you use the RPKI protocol to sign your routes, Cloudflare can help with this as well. Just let your account team know if you’re interested in using RPKI.

After onboarding, [Border Gateway Protocol (BGP)](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) announcements for customer prefixes can be controlled with the [Dynamic Advertisement](/byoip/about/dynamic-advertisement/) API or via the Cloudflare dashboard.

## Cloudflare IPs

If you are unable to bring your own IP to Cloudflare, you can use an IP address issued by Cloudflare. 

Using a Cloudflare IP may be a good option if you:

- Have one or a few IPs allocated from home or business class ISPs.
- Are an online streamer who could be the target of a DoS attack if your IP is leaked.
- Are a business owner with a small number of locations with broadband Internet connections.
- Do not own an IP space with a /24 prefix length.
- Maintain a large number of locations with a combination of connectivity methods.
- Own an IP space with a /24 prefix length but do not advertise prefixes from every location.

To protect your network using a Cloudflare IP address, contact your account manager. 

{{<Aside type="note">}}

When you use a Cloudflare-managed IP space, you can skip the steps for providing an LOA and advertising your prefixes that are associated with bringing your own IP.

{{</Aside>}}
