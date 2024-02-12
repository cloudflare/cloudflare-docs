---
pcx_content_type: how-to
title: Connect your domain
meta:
    title: Connect your domain
---

# Connect your domain

This guide reviews the concepts behind connecting your domain using Cloudflare as an Authoritative DNS provider. 

## Get started

To get started with Cloudflare as a [reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/), you must first create an account and connect your domain. 

At a minimum, the following are necessary steps to get started: 

- Select a plan type, free or paid. This determines which Cloudflare services are applicable to your [proxied](#proxy-eligibility) traffic once your domain is active.

- Set up [DNS](/dns/). This process varies depending on the [DNS setup](/dns/zone-setups) you choose.

- Activate your domain to start proxying HTTP/S traffic.
   - [Full setup](/dns/zone-setups/full-setup/setup/) (All plans)
   - [Secondary DNS setup](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) (Enterprise only)
   - [Partial (CNAME) setup](/dns/zone-setups/partial-setup/setup/) (Business and Enterprise only)

After creating your account, select **Add site** and follow the [step-by-step tutorial](/fundamentals/setup/account-setup/add-site/) to:

For a domain purchased through [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/), we take care of the connection process on your behalf.

{{<Aside type="note">}}
Your domain is always in your control - completing these steps does not mean you are relinquishing ownership. After connecting your domain, you may [transfer registration](/registrar/get-started/transfer-domain-to-cloudflare/) to be managed at Cloudflare, but you always still remain the owner.
{{</Aside>}}


## Domain configurations

When you connect your domain to Cloudflare, it is assigned a set of default configurations for our [application services](/products/?product-group=Application+performance%2CApplication+security%2CCloudflare+essentials), based on the domain [plan](https://www.cloudflare.com/plans/). These services determine how Cloudflare treats traffic for your domain.

Your configurations only affect live traffic: when your domain's status is active and your traffic is [proxied](#proxy-eligibility), by enabling the proxy status on the DNS records for the hostnames you want to proxy through Cloudflare's network. 

Some services can be set at the account-level (if available in your plan), which affect all domains under your account, such as the [Web Application Firewall (WAF)](/waf/). 

Use the Cloudflare dashboard or [API](/api/) to modify, test, or [version](/version-management/) your configuration.

{{<Aside>}}
Account-level configurations are processed before domain-level services. Refer to [Traffic sequence](https://blog.cloudflare.com/traffic-sequence-which-product-runs-first) to learn more. 
{{</Aside>}}

## Activating your domain

In a full setup, your domain will be pending until you update the its nameservers to the assigned Cloudflare nameservers. This step is essential for two reasons. First, to inform DNS resolvers where they can get a response for DNS queries to your domain so that all traffic will route through Cloudflare and second, to verify that you own the domain since only an owner or administrator of a domain has access to its Registrar, where nameserver changes are made.

{{<Aside>}}
Note: The activation process involves different steps if you are using a [secondary DNS](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) or [partial (CNAME) setup](/dns/zone-setups/partial-setup/).
{{</Aside>}}

Registrars take up to 24 hours to process nameserver changes (quicker in most cases). You will receive an email when your domain becomes active. While your domain is pending, the proxy function is not yet activated but Cloudflare will respond to any DNS query on your assigned nameservers.


## Avoiding downtime

In a full setup, it is essential that your domains DNS table has all of your DNS records configured properly before activating your domain. In addition, you may need to:

- [Disable](/dns/dnssec/) or [migrate](/dns/dnssec/dnssec-active-migration/) DNSSEC. DNSSEC is a security extension that ensures all DNS answers can be trusted. If nameservers are changed before disabling DNSSEC, their cryptographic signatures will no longer match and DNS resolution will fail. After your domain is successfully activated, you should enable DNSSEC again. 
- [Accept Cloudflare traffic](/fundamentals/setup/allow-cloudflare-ip-addresses/). If you are proxying traffic to your origin, you need to ensure that your origin will accept connections from Cloudflare. One way to do this is to allow traffic originating from Cloudflare IPs. You can harden the connection between Cloudflare and your origin by using Authenticated Origin Pulls ([mTLS](/ssl/origin-configuration/authenticated-origin-pull/)). An alternative approach to proxy traffic to your origin is to [configure a Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/).
- [Configure SSL/TLS](/ssl/edge-certificates/). The first thing Cloudflare does when it receives a `HTTP/S` request is decryption.

## Related resources

- [SSL mode to the origin](/ssl/origin-configuration/ssl-modes/)
- [Default cache behavior](/cache/concepts/default-cache-behavior/)
- [Argo Smart Routing](/argo-smart-routing/)
- [Workers](/workers/get-started/guide/) 

