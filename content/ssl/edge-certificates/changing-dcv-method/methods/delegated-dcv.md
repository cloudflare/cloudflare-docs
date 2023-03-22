---
title: Delegated (recommended)
pcx_content_type: how-to
weight: 1
meta:
  title: Delegated DCV — Domain Control Validation — SSL/TLS
---

# Delegated DCV

Delegated DCV allows zones with [partial DNS setups](/dns/zone-setups/partial-setup/) - meaning authoritative DNS is not provided by Cloudflare - to delegate the DCV process to Cloudflare.

DCV Delegation requires customers to place a one-time record that allows Cloudflare to auto-renew all future certificate orders, so that there’s no manual intervention from the customer at the time of the renewal.

## When to use

You should use Delegated DCV when all of the following conditions are true:

- Your zone is using a [partial DNS setup](/dns/zone-setups/partial-setup/).
- Cloudflare is not already [performing DCV automatically](/ssl/edge-certificates/changing-dcv-method/).
- Your zone is using an [Advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/).
- Your zone is not using multiple CDN providers.

## Setup

To set up Delegated DCV:

1. Order an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) for your zone. You can choose any **Certificate validation method**.
2. On **SSL/TLS** > **Edge Certificates**, go to **DCV Delegation for Partial Zones**.
3. Copy the hostname value.
4. At your authoritative DNS provider, create a `CNAME` record:
    ```txt
    _acme-challenge.<COPIED_HOSTNAME> CNAME <COPIED_HOSTNAME>.
    ```

Once this is complete, Cloudflare will add TXT DCV tokens for every hostname on the Advanced certificate, as long as the zone is [active](/dns/zone-setups/reference/domain-status/) on Cloudflare.

Because DCV happens regularly, do not remove this `CNAME` record at your authoritative DNS provider. Otherwise, Cloudflare will not be able to perform DCV on your behalf and your certificate will not be issued.

## Moved domains

 If you [move your zone to another account](/fundamentals/get-started/basic-tasks/manage-domains/move-domain/), you will need to update the `CNAME` record at your authoritative DNS provider with a new hostname value.