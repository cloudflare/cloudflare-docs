---
pcx_content_type: how-to
title: Google Cloud
weight: 8
---

# Connect to Google Cloud through Access

This guide covers how to configure [Google Cloud](https://support.google.com/cloudidentity/topic/7558767) as a SAML application in Cloudflare Zero Trust.

{{<Aside type="warning">}}
When configuring Google Cloud with Access, the following limitations apply:

- Users will not be able to log in using [Google](/cloudflare-one/identity/idp-integration/google/) or [Google Workspace](/cloudflare-one/identity/idp-integration/gsuite/) as an identity provider after Google Cloud is configured with Access.

- The integration of Access as a single sign-on provider for your Google Cloud account does not work for Google super admins. It will work for other users.
{{</Aside>}}

## Prerequistes

- An [identity provider](/cloudflare-one/identity/idp-integration/index) configured in Cloudflare Zero Trust
- Admin access to a Google Workspace account
- [Cloud Identity Free or Premium](https://support.google.com/cloudidentity/answer/7389973) set up in your organization's Google Cloud account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, select _Google Cloud_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `google.com`
    - **Assertion Consumer Service URL**: `https://www.google.com/a/<your_domain.com>/acs`
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint**, **Access Entity ID or Issuer**, and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Create a x.509 certificate

1. Paste the Public key from application configuration in Cloudflare Zero Trust into a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
3. Set the file extension as `.crt` and save.

## 3. Create an SSO provider in Google Cloud

1. In your [Google Admin console](https://admin.google.com/), go to **Security** > **Authentication** > **SSO with third party IdP**.
3. Select **Third-party SSO profile for your organization** > **Add SSO Profile**.
4. Turn on **Set up SSO with third-party identity provider**.
5. Fill in the following information:
   - **Sign-in page URL**: SSO endpoint from application configuration in Cloudflare Zero Trust.
   - **Sign-out page URL**: `https://<team-name>.cloudflareaccess.com/cdn-cgi/access/logout`, where `<team-name>` is your Zero Trust {{<glossary-tooltip term_id="team name">}}team name{{</glossary-tooltip>}}.
   - **Verification certificate**: Upload the `.crt` certificate file from step [2. Create a x.509 certificate](#2-create-a-x509-certificate).
6. (Optional) Turn on **Use a domain specific issuer**. If you select this option, Google will send an issuer specific to your Google Cloud domain (`google.com/a/<your_domain.com>` instead of the standard `google.com`).

## 4. Test the integration

Open an incognito browser window and go to your Google Cloud URL (`https://console.cloud.google.com/a/<your_domain.com>`). Sign in using credentials that do not belong to a super admin account.

## Troubleshooting

`Error: “G Suite - This account cannot be accessed because the login credentials could not be verified.”`

If you see this error, it is likely that the public key and private key do not match. Confirm that your certificate file includes the correct public key.
