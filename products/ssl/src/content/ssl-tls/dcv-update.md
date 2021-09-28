---
order: 10
pcx-content-type: reference
---

# Changes to HTTP DCV

After November 15, 2021, you will no longer be able to use HTTP Domain Control Validation (DCV) to validate wildcard certificates up for renewal.

After October 21, 2021, you will also no longer be able to issue new wildcard certificates using HTTP DCV.

## Who is affected?

Affected customers are those using [Advanced certificates](/edge-certificates/advanced-certificate-manager) or [SSL for SaaS](/ssl-for-saas) who meet all of the following criteria:

- Use HTTP DCV validation
- Have wildcard certificates or certificates with multiple SANs
- Have a CNAME (partial) setup

If you are affected by this change, you should have also received an email from Cloudflare.

## What do I need to do?

If your application is using a full setup or already use another method of DCV, you do not need to make any changes.

If you do meet the [criteria](#who-is-affected), change your DCV method to [TXT](/ssl-for-saas/common-tasks/certificate-validation-methods#txt-record) or [Email](/ssl-for-saas/common-tasks/certificate-validation-methods#email).

## Why is this change happening?

The Certificate Authority/Browser forum [voted to](https://cabforum.org/2021/06/03/ballot-sc45-wildcard-domain-validation/) not allow HTTP-based validation to prove ownership related issue wildcard certificates. As a result of that decision, [Digicert](https://knowledge.digicert.com/alerts/domain-authentication-changes-in-2021.html) will be implementing the change on November 15th.