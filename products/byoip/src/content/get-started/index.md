---
order: 1
pcx-content-type: how-to
---

# Get started with Cloudflare BYOIP

To bring your own IPs, you must go through an onboarding process. Work with your account team to understand everything you need to ensure a smooth transition.

At a high level, Cloudflare requires a service-specific configuration for your prefixes, as well as some requirements that are common to all BYOIP customers, regardless of service type. This documentation covers the requirements common to all products that are compatible with BYOIP (i.e. Magic Transit, CDN, and Spectrum).

There are two major prerequisites before Cloudflare can begin the work of onboarding your IP space.

First, all customers must ensure their [Internet Routing Registry (IRR)](/irr-records) records are up to date with the correct prefix/ASN information.

Secondly, Cloudflare must receive a [Letter of Authorization](/loa) to announce your prefixes, which we will share with our transit partners as evidence that we are allowed to announce the route.

Optionally, if you use the RPKI protocol to sign your routes, Cloudflare can support you there as well. Just let your account team know if you’re interested in using RPKI.

See the subsequent sections to learn more.

Once onboarded, [Border Gateway Protocol (BGP)](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/) announcements for customer prefixes can be controlled with the [Dynamic Advertisement API](/dynamic-advertisement). This API has other useful features and can also be used via the Cloudflare dashboard.