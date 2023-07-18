---
pcx_content_type: how-to
title: Salesforce
---

# Configure Salesforce with Access for SaaS

This guide covers how to:

- Configure Salesforce as a SaaS application in Cloudflare Zero Trust
- Force logins to Salesforce through Cloudflare's Zero Trust rules

## Prerequisites

- Admin access to a Salesforce account

## 1. Set up Salesforce as a SaaS application in Cloudflare Zero Trust

1.  In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
1.  Select the SaaS application type.
1.  From the **Application** drop-down menu, select _Salesforce_.
1.  Fill the remaining fields as follows:
    - **Entity ID**: https://\[YOUR_SFDC_DOMAIN].my.salesforce.com
    - **Assertion consumer service URL**: https://\[YOUR_SFDC_DOMAIN].my.salesforce.com
    - **Name ID format**: Email
1.  Click **Next**.
1.  Set the desired policy configuration for user access.
1.  Click Add application.
1.  Next, take note of the **SSO endpoint**, the **Access Entity ID or Issuer**, and the **Public Key**.

## 2. Create a certificate file

1.  Paste the **Public key** in VIM or another code editor.
1.  Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
1.  Set the file extension as `.crt` and save.

## 3. Enable Single Sign-On in Salesforce

1.  In Salesforce, ensure your users have **Federation IDs**.

    {{<Aside type="note">}}The Federation ID is found under **Manage Users** > **Users** in Setup. The Federation ID should match the email address of the user authenticating via Access.{{</Aside>}}

1.  Go to **Security Controls** > **Single Sign-On Settings**.
1.  Set the following global settings:
    - **SAML Enabled:** true
    - **Make federation ID case-insensitive:** true

## 4. Create a new SAML Single-Sign On configuration

1.  Create a new SAML Single-Sign On configuration:
    - **Name:** (this is what you want your users to see on sign in)
    - **API name:** (this will pre-populate)
    - **Issuer:** `https://<your-team-name>.cloudflareaccess.com`, where your-team-name is your [team name](/cloudflare-one/glossary/#team-name).
    - **Identity Provider Certificate**: upload the `.crt` certificate file you’ve created in the previous step.
    - **EntityID**: `https://[YOUR_SFDC_DOMAIN].my.salesforce.com`
    - **SAML Identity type:** If the user's Salesforce username is their email address, select _Assertion contains the User's Salesforce username_. Otherwise, select _Assertion contains the Federation ID from the User object_ and make sure the user's Federation ID matches their email address.
    - **Identity Provider Login URL**: This is the SSO endpoint provided in Zero Trust for that application.
1.  Click **Save**.
1.  From the navigation panel on the left, click **Domain Management** > **My Domain** and select your domain.
1.  At the bottom, find **Authentication Configuration**. Click **Edit** and select your Authentication Service you created.
1.  (Optional) To force all users to sign in through Cloudflare Access:
    1.  Click **Security Controls** > **Single Sign-On Settings** > **Edit**.
    1.  Click `Disable login with Salesforce credentials`.
