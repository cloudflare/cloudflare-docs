---
pcx_content_type: how-to
title: Hubspot
weight: 12
---

# Connect to Hubspot through Access

This guide covers how to configure [Hubspot](https://knowledge.hubspot.com/account-security/set-up-single-sign-on-sso) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Hubspot Enterprise plan account

## 1. Configure Hubspot

1.  Go to **Settings** > **Account**, then go to **Defaults** > **Security**.
1.  Select _Single Sign-on_.
1.  Copy the values for _Audience URI_ and _Sign on URL_.

## 2. Configure Cloudflare Access

1.  In Zero Trust, go to **Access** > **Applications** and create a SaaS application.

1.  Set the **Application type** to _Hubspot_.

1.  Use the following Hubspot field mappings:

    | Hubspot values | Cloudflare values              |
    | -------------- | ------------------------------ |
    | Audience URI   | EntityID                       |
    | Sign On URL    | Assertion Consumer Service URL |

1.  Set **NameID** to _Email_.

1.  Add any desired [Access policies](/cloudflare-one/policies/access/) to your application.

1.  Copy SSO endpoint and Access Entity ID.

## 3. Create the certificate

1.  Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
1.  Paste the certificate contents into the Certificate field.

## 4. Finalize Hubspot configuration

1.  Use the following field mappings:

    | Cloudflare value | Hubspot value                        |
    | ---------------- | ------------------------------------ |
    | SSO endpoint     | Identity Provider Single Sign-on URL |
    | Entity ID        | Identity Provider Identifier         |
    | Public key       | Certificate                          |

1.  Select **Verify** to validate the integration.

Your configuration is now complete. Hubspot SSO can be switched on for specific users or the entire account.
