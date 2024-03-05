---
pcx_content_type: concept
title: Update nameservers
weight: 2
---

# Update your nameservers

To use Cloudflare DNS as an authoritative DNS provider - be it in a primary (full) setup or secondary setup -, your domain nameservers must point to nameservers that you get from your Cloudflare account.

## Where and how

Although Cloudflare will provide you the nameserver names or allow you to create your own custom nameservers, the final step to make Cloudflare an authoritative DNS provider for your domain may have to be done outside of Cloudflare.

Unless you are using Cloudflare Registrar, consider which of the following sections correspond to your use case:

### Your domain uses a different registrar

If you have not acquired your domain from Cloudflare Registrar - and it has not been delegated to another zone -, you need to update your nameservers on your registrar.

{{<render file="_ns-update-providers.md">}}

### Your domain is delegated to another zone

If you are onboarding `shop.example.com` as a child domain, instead of having a [DNS record](/dns/manage-dns-records/how-to/create-subdomain/) to configure `shop` as a subdomain of `example.com`, it is expected that this child domain has been delegated to the parent domain.

Delegation means that `shop.example.com` has specific `NS` records set up for it within the DNS records management of the parent zone (`example.com`).

If that is the case, when setting up your zone in Cloudflare or opting for a different set of nameservers, you have to update the `NS` records in the parent domain, and not at the registrar.

### Reseller


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