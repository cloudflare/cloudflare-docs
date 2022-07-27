---
title: Enable DNSSEC
pcx-content-type: tutorial
meta:
  title: Domain Name System Security Extensions (DNSSEC)
---

# Domain Name System Security Extensions (DNSSEC)

The domain name system (DNS) translates domain names into numeric Internet addresses. However, DNS is a fundamentally insecure protocol. It does not guarantee where DNS records come from and accepts any requests given to it.

DNSSEC creates a secure layer to the domain name system by adding cryptographic signatures to DNS records. By doing so, your request can check the signature to verify that the record you need comes from the authoritative name server and was not altered along the way. [Read more about how DNSSEC works on cloudflare.com](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/).

## Enable DNSSEC

Cloudflare Registrar offers one-click DNSSEC activation for free to all customers. You will not need to set the DS record details manually. However, your domain must be using Cloudflare as the [authoritative DNS provider](/dns/zone-setups/full-setup/).

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select **Registrar**.
2. Select **Manage** on the domain you want to activate DNSSEC.
3. Select **Configuration**.
4. **Enable** DNSSEC.

If your domain is not on Cloudflare Registrar, you can enable DNSSEC in [**DNS**](/dns/additional-options/dnssec/) on the Cloudflare dashboard.

Cloudflare publishes DS details in the form of [CDS and CDNSKEY records](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) for a domain delegated to Cloudflare. Cloudflare Registrar scans those records at regular intervals, and gathers those details and sends them to your domain’s registry.

This process can take one to two days after you first enable DNSSEC.

## Confirming DNSSEC

When DNSSEC has been successfully applied to your domain, Cloudflare shows you a confirmed status. Navigate to [**DNS**](https://dash.cloudflare.com/login?to=/:account/:zone/dns) in the Cloudflare dashboard, and scroll down to DNSSEC. You can also confirm this by reviewing the WHOIS information for your domain. Domains with DNSSEC will read `signedDelegation` in the DNSSEC field.
