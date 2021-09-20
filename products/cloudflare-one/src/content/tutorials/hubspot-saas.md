---
updated: 2021-09-20
category: 🔐 Zero Trust
pcx-content-type: tutorial
---

# Configure a Hubspot account for Access for SaaS

This tutorial covers how to set up Cloudflare as the SSO provider for Hubspot. Before you start, please note that Hubspot SSO typically requires an Enterprise license.

**⏲️ Time to complete:** 15 minutes

## Configure Hubspot

1. Go to **Settings** > **Account**, and from there, navigate to **Defaults** > **Security**.
1. Select *Single Sign-on*.
1. Copy the values for *Audience URI* and *Sign on URL*. 

## Configure Cloudflare Access

1. On the Teams Dashboard, navigate to **Access** > **Applications** and create a SaaS application.
1. Set the **Application type** to *Hubspot*.

    ![Add fields to Teams application](../static/zero-trust-security/hubspot-saas/hubspot-saas-ui.png)

1. Use the following Hubspot field mappings:

    | Hubspot values | Cloudflare values |
    | ---- | ---- |
    | Audience URI | EntityID |
    | Sign On URL | Assertion Consumer Service URL |

1. Next, set **NameID** to *Email*.
1. Add any desired [Zero Trust policies](/policies/zero-trust) to your application.
1. Copy SSO endpoint and Access Entity ID.

## Create the certificate

1. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
1. Paste the certificate contents into the Certificate field.

## Finalize Hubspot configuration

1. Use the following field mappings:

    | Cloudflare value | Hubspot value |
    | --- | --- |
    | SSO endpoint | Identity Provider Single Sign-on URL |
    | Entity ID | Identity Provider Identifier |
    | Public key | Certificate |

    ![Add fields to Teams application](../static/zero-trust-security/hubspot-saas/hubspot-certificate.png)

1. Select **Verify** to validate the integration.

Your configuration is now complete. Hubspot SSO can be switched on for specific users or the entire account.
