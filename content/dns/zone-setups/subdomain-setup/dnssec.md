---
pcx_content_type: how-to
title: Enable DNSSEC
weight: 4
meta: 
    title: Enable DNSSEC - Subdomain setup
---

# Enable DNSSEC for a Subdomain setup

As opposed to the [normal process](/dns/additional-options/dnssec/) for enabling DNSSEC, DNSSEC with a subdomain setup requires a few additional steps.

## Requirements

In order to use DNSSEC for a subdomain setup, both the parent and child domain must use Cloudflare for authoritative DNS (meaning they use [Cloudflare nameservers](/dns/zone-setups/full-setup/setup/)).

Additionally, if you just registered your domain or enabled DNSSEC on the parent domain, wait 12 to 24 hours before proceeding to ensure DNS resolvers provide the same DNS query responses.

## Setup

1. [Create](/dns/zone-setups/subdomain-setup/setup/) the child subdomain.
2. Make sure DNS resolution is working properly for your child subdomain.
3. [Enable DNSSEC](/dns/additional-options/dnssec/) for the child subdomain and save the information provided within the `DS` Record output.
4. With the **DNS** settings of the parent domain, add the `DS` Record from the previous step.
5. Add an `A` record to the child subdomain to validate DNS resolution.
6. Wait two to six hours. Then, [test the `A` record](https://support.cloudflare.com/hc/en-us/articles/360021111972#TroubleshootingDNSSEC-DNSSECinPracticewithDig) added in the previous step using multiple DNS resolvers with DNSSEC validation (`1.1.1.1`, `8.8.8.8`, and `9.9.9.9`). For example, if the A record is for `test.child.example.com`: `dig test.child.example.com +dnssec @1.1.1.1`.