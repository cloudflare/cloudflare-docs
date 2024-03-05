---
pcx_content_type: concept
title: Update nameservers
weight: 2
---

# Update your nameservers

To use Cloudflare DNS as an authoritative DNS provider - be it in a primary (full) setup or secondary setup -, your domain nameservers must point to nameservers that you get from your Cloudflare account.

## Specific processes

Although Cloudflare will provide you the nameservers or allow you to create your own custom nameservers, the final step to make Cloudflare an authoritative DNS provider for your domain may have to be done outside of Cloudflare.

Unless you are using Cloudflare Registrar, consider which of the following sections correspond to your use case.

### Your domain uses a different registrar

If you have acquired your domain from a registrar other than Cloudflare Registrar - and it has not been [delegated to another zone](#your-domain-is-delegated-to-another-zone) -, you need to update your nameservers at your registrar.

{{<render file="_ns-update-providers.md">}}

If you do not know who your registrar is, you can use a Whois search such as [ICANN Lookup](https://lookup.icann.org/). If the registrar indicated on your Whois search is not a service that you have interacted directly with, you may [have acquired your domain from a reseller](#you-have-acquired-your-domain-from-a-reseller).

### You have acquired your domain from a reseller

Some services, such as website builders, are not registrars but act as a [reseller](https://www.icann.org/resources/pages/reseller-2013-05-03-en), allowing you to buy domains directly from them. In that case, you may have to update your nameservers directly in the reseller platform.

### Your domain is delegated to another zone

If you are onboarding `shop.example.com` as a child domain, instead of having a [DNS record](/dns/manage-dns-records/how-to/create-subdomain/) to configure `shop` as a subdomain of `example.com`, it is expected that this child domain has been delegated to the parent domain.

Delegation means that `shop.example.com` has specific `NS` records set up for it within the DNS records management of the parent zone (`example.com`).

If that is the case, when setting up your zone in Cloudflare or opting for a different set of nameservers, you have to update the `NS` records in the parent domain, and not at the registrar.


<!--- suggested outline from Content Strategy previous work

1. Where to change your nameservers
  registrar vs reseller
  registrar of this domain or parent domain
2. What to change based on your DNS setup
  full setup
  secondary
  multi-provider
  hidden primary
  other setups?
3. How to change your nameservers
  the existing per-provider instructions on Full setup docs

--->