---
pcx_content_type: how-to
title: Connect your domain
meta:
    title: Connect your domain
---

# Connect your domain

Many of our layer 7 services depend on your domain using Cloudflare as a [reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) for its `HTTP/S` traffic.

To get started with Cloudflare as a reverse proxy, you must first create an account and [connect your domain](/fundamentals/setup/manage-domains/connect-your-domain/). After creating your account, select `Add site` and follow the [step-by-step tutorial](/fundamentals/setup/manage-domains/add-site/) to configure your [DNS records](/dns/manage-dns-records/), which informs Cloudflare where to forward requests.

Your domain is always in your control - connecting your domain to Cloudflare does not mean that you are relinquishing ownership. If you decide to [transfer your domain registration](/registrar/get-started/transfer-domain-to-cloudflare/) to be managed at Cloudflare, you will still retain full ownership.

{{<Aside type="note">}}
For a domain purchased through [Cloudflare Registrar](/registrar/), we take care of the connection process on your behalf.
{{</Aside>}}


## Domain configurations

When you connect your domain to Cloudflare, a set of default configurations is generated for our [application services](/products/?product-group=Application+performance%2CApplication+security%2CCloudflare+essentials), based on the domain [plan](https://www.cloudflare.com/plans/). These services determine how Cloudflare treats traffic for your domain.

Your configurations will only affect live traffic (i.e., when your domain's status is [**active**](/fundamentals/setup/manage-domains/connect-your-domain/#activating-your-domain) and its traffic is [**proxied**](#proxy-eligibility)). Notably, your configurations can be altered prior to activating or enabling the proxy status on the DNS records for the hostnames you want to proxy.

Use the Cloudflare dashboard or [API](/api/) to modify, test, or [version](/version-management/) your configuration.

{{<Aside header="Account-level configurations">}}
Some configurations can be set at the account-level (if available in your plan), which can be applied to all domains under your account. 

Account-level configurations are applied to incoming traffic before your domain-level configurations. Refer to [traffic sequence](https://blog.cloudflare.com/traffic-sequence-which-product-runs-first) to learn more. 
{{</Aside>}}

## Activating your domain

In a [full setup](/dns/zone-setups/full-setup/), your domain will be pending until you update its nameservers at your domain registrar with the assigned Cloudflare nameservers. This step is essential for two reasons:
1. First, to inform DNS resolvers that your traffic should route through Cloudflare
2. And second, to verify that you are the domain's owner. Only the owner or administrator of a domain can access  its registrar and change its nameservers.

{{<Aside>}}

Note: The activation process involves different steps if you are using a [secondary DNS](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) or [partial (CNAME) setup](/dns/zone-setups/partial-setup/).

{{</Aside>}}

Registrars take up to 24 hours to process nameserver changes (quicker in most cases). You will receive an email when your domain becomes active. While your domain is pending, your `HTTP/S` traffic is not proxying through Cloudflare, but Cloudflare will respond to DNS queries on your assigned nameservers.

By activating your domain on a full setup, your traffic will immediately start using [Cloudflare's DNS services](/fundamentals/concepts/how-cloudflare-works/#how-cloudflare-handles-dns-queries), so it's important to review how to [avoid downtime](/fundamentals/setup/manage-domains/connect-your-domain/#avoiding-downtime) and what [proxying traffic](/fundamentals/concepts/how-cloudflare-works/#proxying-traffic) means. 

## Avoiding downtime

In a full setup, it is essential that your domains DNS table has all your DNS records configured properly *before* activating your domain. In addition, you may need to:

- [Disable DNSSEC](/dns/dnssec/). DNSSEC is a security extension that ensures all DNS answers can be trusted. If nameservers are changed before disabling DNSSEC, their cryptographic signatures will no longer match and DNS resolution will fail. After your domain is successfully activated, you should enable DNSSEC again. 
- [Accept Cloudflare traffic](/fundamentals/concepts/cloudflare-ip-addresses/). If you are proxying traffic to your origin, you need to ensure that your origin will accept connections from Cloudflare. One way to do this is to allow traffic originating from Cloudflare IPs. You can harden the connection between Cloudflare and your origin by using Authenticated Origin Pulls ([mTLS](/ssl/origin-configuration/authenticated-origin-pull/)). An alternative approach to proxy traffic to your origin is to [configure a Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/).
- [Configure SSL/TLS](/ssl/edge-certificates/). The first thing Cloudflare does when it receives a `HTTP/S` request is decryption.
