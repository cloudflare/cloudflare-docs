---
updated: 2021-09-27
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Protecting DocuSign with Access for SaaS
---

# Protecting DocuSign with Access for SaaS

This guide covers how to protect your DocuSign account with Access for SaaS.

## Pre-Requisites:

- Access for SaaS requires that you have Single Sign-On available in your DocuSign plan.
- A domain you own.
- See DocuSign’s [checklist](https://support.docusign.com/en/guides/org-admin-guide-single-sign-on-overview) for additional requirements.
- A [SAML IdP](/cloudflare-one/identity/idp-integration/generic-saml/) configured with SAML Attributes configured.

**⏲️ Time to complete:** 10 minutes

## Create the Access for SaaS application

1.  On the Zero Trust Dashboard, go to **Access** > **Applications**.

1.  Select **Add an Application**.

1.  Select **SaaS**.

1.  Use the following configuration:

    - Set the **Application** to _DocuSign_.
    - Put placeholder values in **EntityID** and **Assertion Consumer Service URL** (e.g. `https://example.com`). We’ll come back and update these.
    - Set **Name ID Format** to: _Unique ID_.

1.  DocuSign requires SAML attributes to do Just In Time user provisioning.

    - Ensure you are collecting SAML attributes from your IdP:

    ![DocuSign SAML Attributes](/cloudflare-one/static/zero-trust-security/docusign/saml-attributes.png)

1.  These IdP SAML values can then be mapped to the following DocuSign SAML attributes:

    - Email
    - Surname
    - Givenname

1.  Set an Access policy (for example, create a policy based on _Emails ending in @example.com_).

1.  Copy and save SSO Endpoint, Entity ID and Public Key.

         {{<Aside type="note">}}

    The Public key must be transformed into a fingerprint. To do that:

1.  Copy the Public Key Value.
1.  Paste the Public Key into VIM or another code editor.
1.  Wrap the value in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
1.  Set the file extension to `.crt` and save.
    {{</Aside>}}

## Configure your DocuSign SSO instance

1.  Ensure you have a domain claimed in Zendesk.

1.  From the DocuSign Admin dashboard, click **Identity Providers**.

1.  On the Identity Providers page, click **ADD IDENTITY PROVIDER**. Use the following mappings from the saved Access Application values:

    - **Name**: Pick your desired name.
    - **Identity Provider Issuer**: Entity ID.
    - **Identity Provider Login URL**: Assertion Consumer Service URL.

1.  Save the Identity Provider.

1.  Upload your certificate to the _DocuSign Identity Provider_ menu.

1.  Configure your SAML Attribute mappings. The Attribute Names should match the values in **IdP Value** in your Access application.

    ![DocuSign Custom Attributes mapping](/cloudflare-one/static/zero-trust-security/docusign/custom-attribute-mapping.png)

1.  Go back to the Identity Provider's screen and select **Actions** > **Endpoints**. Copy and save the following:
    - Service Provider Issuer URL.
    - Service Provider Assertion Consumer Service URL.

![DocuSign SAML 2.0 Endpoints](/cloudflare-one/static/zero-trust-security/docusign/saml-endpoints.png)

## Finalize your Cloudflare configuration

1.  Go back to your DocuSign application under **Access** > **Applications**.
1.  Click **Edit**.
1.  Use the following mappings:
    - EntityID->Service Provider Issuer URL.
    - Assertion Consumer Service URL -> Service Provider Assertion Consumer Service URL.
1.  Save the application.

When ready, enable the SSO for your DocuSign account and you will be able to login to DocuSign via Cloudflare SSO and your Identity Provider.
