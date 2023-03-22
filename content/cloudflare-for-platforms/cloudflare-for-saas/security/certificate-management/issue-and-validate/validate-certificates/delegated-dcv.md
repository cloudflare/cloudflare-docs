---
title: Delegated (recommended)
pcx_content_type: how-to
weight: 1
meta:
  title: Delegated domain control validation (DCV)
---

# Delegated DCV

Delegated DCV allows SaaS providers to delegate the DCV process to Cloudflare.

DCV Delegation requires you to place a one-time record that allows Cloudflare to auto-renew all future certificate orders, so that there’s no manual intervention from you or your customers at the time of the renewal.

## When to use

Specific (non-wildcard) custom hostnames can use [HTTP based DCV](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/) for certificate renewals, as long as that hostname is pointing to the SaaS provider and the traffic is proxying through the Cloudflare network.

Wildcard custom hostnames require TXT based validation. As the SaaS provider, you have two options for wildcard custom hostname certificate renewals: 
- DCV Delegation (recommended) 
- [Manual](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/)

## Setup

To set up Delegated DCV:

1. Order a [custom certificate](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/issue-certificates/) for your zone. You can choose any **Certificate validation method**.
2. On **SSL/TLS** > **Custom Hostnames**, go to **DCV Delegation for Custom Hostnames**.
3. Copy the hostname value.
4. At your authoritative DNS provider, create a `CNAME` record:
    ```txt
    _acme-challenge.example.com CNAME example.com.<COPIED_HOSTNAME>.
    ```
5. Once this is complete, Cloudflare will place two TXT DCV records - one for `example.com` and one for `*.example.com` - at the `example.com.<COPIED_HOSTNAME>` hostname.
6. When your customer's certificates are up for renewal, manually fetch the DCV tokens and share them with your customers.

One SaaS zone will have the same UUID value for all custom hostnames. 

The CNAME record will need to stay in place in order to allow Cloudflare to continue placing the records for the renewals. 

## Moved domains

 If you [move your SaaS zone to another account](/fundamentals/get-started/basic-tasks/manage-domains/move-domain/), you will need to update the `CNAME` record with a new hostname value.