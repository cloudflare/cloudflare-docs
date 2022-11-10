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

In order to use DNSSEC for a subdomain setup, DNSSEC must be enabled on the parent zone. 

Ideally, you should also wait 12 to 24 hours after enabling DNSSEC on the parent zone to ensure DNS resolvers provide the same DNS query responses.

## Setup

1. [Create](/dns/zone-setups/subdomain-setup/setup/) the child subdomain.
2. Make sure the child zone is [active](/dns/zone-setups/reference/domain-status/) on Cloudflare and that DNS resolution is working properly for your child subdomain.
3. [Enable DNSSEC](/dns/additional-options/dnssec/) for the child subdomain and save the information provided within the `DS` Record output.
4. In the **DNS** settings of the parent domain, [add the `DS` Record](/dns/manage-dns-records/how-to/create-dns-records/) from the previous step.

    ![Screenshot showing how to add a DS record within Cloudflare](/dns/static/ds-record-example.png)

5. Add an `A` record to the child subdomain to validate DNS resolution.
6. Wait two to six hours. Then, [test the `A` record](https://support.cloudflare.com/hc/en-us/articles/360021111972#TroubleshootingDNSSEC-DNSSECinPracticewithDig) added in the previous step using multiple DNS resolvers with DNSSEC validation (`1.1.1.1`, `8.8.8.8`, and `9.9.9.9`). For example, if the A record is for `test.child.example.com`: `dig test.child.example.com +dnssec @1.1.1.1`.