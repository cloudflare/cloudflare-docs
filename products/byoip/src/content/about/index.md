---
title: Getting Started
weight: 1
---

## Bringing Your Own IPs to Cloudflare

BYOIP is compatible with Magic Transit, Spectrum, and CDN services.

In order to bring your own IPs (BYOIP) with Cloudflare you’ll need to go through an onboarding process. Work with your account team to understand everything we will need to ensure a smooth transition.

At a high level in order for a prefix to be onboarded to Cloudflare there will be a service specific configuration required, as well as some requirements that are common to all BYOIP customers, regardless of service type. This documentation will cover the requirements common to all products that are compatible with BYOIP (i.e. Magic Transit, CDN, and Spectrum).

There are two major prerequisites before Cloudflare can begin the work of onboarding your IP space.

First, all customers must ensure their [Internet Route Registry (IRR)](/byoip/irr) records are up to date with the correct prefix/ASN information.

Secondly, Cloudflare must receive a [Letter of Authorization](/byoip/loa) to announce your prefixes, which we will share with our transit partners as evidence we are allowed to announce the route.

Optionally, if you use the RPKI protocol to sign your routes, Cloudflare can support you there as well. Just let your account team know if you're interested in using RPKI!

Please see the subsequent sections to learn more.

Once onboarded, BGP announcements for customer prefixes can be controlled with the [Dynamic Advertisement API](/byoip/api). This API has other useful features and can also be used via the Cloudflare dashboard.
