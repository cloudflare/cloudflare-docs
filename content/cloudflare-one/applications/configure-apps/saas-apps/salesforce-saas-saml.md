---
pcx_content_type: how-to
title: Salesforce (SAML)
weight: 16
---

# Connect to Salesforce through Access (SAML)

This guide covers how to configure [Salesforce](https://help.salesforce.com/s/articleView?id=sf.sso_saml.htm&type=5) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Salesforce account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **SaaS**.
3. For **Application**, select _Salesforce_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `https://<your-domain>.my.salesforce.com`
    - **Assertion Consumer Service URL**: `https://<your-domain>.my.salesforce.com`
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Create a certificate file

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
3. Set the file extension as `.crt` and save.

## 3. Add a SAML SSO provider to Salesforce

1. In Salesforce, go to **Setup**.
2. In the **Quick Find** box, enter `single sign-on` and select **Single Sign-On Settings**.
3. In **SAML Single Sign-On Settings**, select **New**.
4. Fill in the following fields:
    - **Name:** Name of the SSO provider (for example, `Cloudflare Access`). Users will select this name when signing in to Salesforce.
    - **API name:** (this will pre-populate)
    - **Issuer:** `https://<your-team-name>.cloudflareaccess.com`, where `<your-team-name>` is your {{<glossary-tooltip term_id="team name">}}team name{{</glossary-tooltip>}}.
    - **Identity Provider Certificate**: Upload the `.crt` certificate file from [2. Create a certificate file](#2-create-a-certificate-file).
    - **Entity ID**: `https://<your-domain>.my.salesforce.com`
    - **SAML Identity type:** If the user's Salesforce username is their email address, select _Assertion contains the User's Salesforce username_. Otherwise, select _Assertion contains the Federation ID from the User object_ and make sure the user's Federation ID matches their email address.
{{<details header="Configure Federation IDs" open="true">}}
1. In the **Quick Find** box, enter `users` and select **Users**.
2. Select the user.
3. Verify that the user's **Federation ID** matches the email address used to authenticate to Cloudflare Access.
{{</details>}}
    - **Identity Provider Login URL**: SSO endpoint provided in Cloudflare Zero Trust for this application.
5. Select **Save**.

## 4. Enable Single Sign-On in Salesforce

1. {{<render file="access/saas-apps/_salesforce-sso.md">}}
2. Configure Single Sign-On settings:
    1. In the **Quick Find** box, enter `single sign-on` and select **Single Sign-On Settings**.
    2. (Optional) To require users to login with Cloudflare Access, turn on **Disable login with Salesforce credentials**.
    3. Turn on **SAML Enabled**.
    4. Turn on **Make federation ID case-insensitive**.

To test, open an incognito browser window and go to your Salesforce domain (`https://<your-domain>.my.salesforce.com`).
