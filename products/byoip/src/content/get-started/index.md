---
order: 2
title: Get started
pcx-content-type: get-started
---

# Get started

To bring your own IPs, you must go through the onboarding process. Work with your account team to understand everything you need to ensure a smooth transition.

##  Overview

Cloudflare requires a service-specific configuration for your prefixes, as well as some requirements common to all BYOIP customers regardless of service type. These requirements are common to all products compatible with BYOIP, such as Magic Transit, CDN, and Spectrum.

## Prerequisites

There are two major prerequisites before Cloudflare can begin onboarding your IP space.

1. You must verify your [Internet Routing Registry (IRR)](/about/irr) records are up to date with the correct prefix/ASN information.

2. Cloudflare must receive a [Letter of Authorization](/about/loa) to announce your prefixes, which we will share with our transit partners as evidence that we are allowed to announce the route.

Optionally, if you use the RPKI protocol to sign your routes, Cloudflare can help with this as well. Just let your account team know if you’re interested in using RPKI.

After onboarding, [Border Gateway Protocol (BGP)](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) announcements for customer prefixes can be controlled with the [Dynamic Advertisement](/about/dynamic-advertisement) API or via the Cloudflare dashboard.