---
pcx_content_type: reference
title: Changes to HTTP DCV
weight: 3
---

# Changes to HTTP DCV

After October 21, 2021, you will no longer be able to issue new wildcard certificates or validate existing certificates up for renewal using HTTP Domain Control Validation (DCV).

If you are affected by this change, you should have also received an email from Cloudflare.

## What is affected?

### Advanced certificates

This change affects customers using [Advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/) for wildcard certificates or certificates with multiple SANs.

If your application uses a full setup or already uses another method of DCV, you do not need to make any changes. Cloudflare will complete TXT DCV on your behalf

If your application uses a partial (CNAME) setup, wildcard certificates, and HTTP DCV validation, you will need to [change your DCV method](/ssl/edge-certificates/changing-dcv-method/) to either TXT or Email.

### SSL for SaaS

This change also affects [SSL for SaaS customers](/cloudflare-for-platforms/cloudflare-for-saas/) who use HTTP DCV validation for wildcard certificates.

Update your DCV method to [TXT](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/) and provide the TXT validation tokens to your customers so they can add it to their DNS.

If you do not make a change, Cloudflare will automatically change your DCV method to TXT and send your customer tokens to you 30 days before the certificates expire.

## Why is this change happening?

The Certificate Authority/Browser forum [voted against](https://cabforum.org/2021/06/03/ballot-sc45-wildcard-domain-validation/) using HTTP-based validation to prove ownership before issuing wildcard certificates. As a result of that decision, [DigiCert and other CAs](https://knowledge.digicert.com/alerts/domain-authentication-changes-in-2021.html) will be implementing the change on November 15, 2021.
