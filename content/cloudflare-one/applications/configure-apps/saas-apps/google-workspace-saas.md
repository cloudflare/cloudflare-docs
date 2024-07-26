---
pcx_content_type: integration-guide
title: Google Workspace
weight: 10
---

# Connect to Google Workspace through Access

This guide covers how to configure [Google Workspace](https://support.google.com/a/topic/7579248?hl=en&ref_topic=7556686&sjid=14539485562330725560-NA) as a SAML application in Cloudflare Zero Trust.

{{<Aside type="note">}}

The integration of Access as a single sign-on provider for your Google Workspace account does not work for Google super admins. It will work for other users.

{{</Aside>}}

## Prerequistes

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Google Workspace account

## 1. Create an application in Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Access** > **Applications**.

2. Select **SaaS application**.

3. Fill in the following information:
   - **Application**: _Google_.
   - **Entity ID**: `google.com`
   - **Assertion Consumer Service URL**: `https://www.google.com/a/<your_domain.com>/acs`, where `<your_domain.com>` is your Google Workspace domain.
   - **Name ID Format**: _Email_.

{{<Aside type="warning">}}
When you put your Google Workspace behind Access, users will not be able to log in using [Google](/cloudflare-one/identity/idp-integration/google/) or [Google Workspace](/cloudflare-one/identity/idp-integration/gsuite/) as an identity provider.
{{</Aside>}}

4. On the next page, [create an Access policy](/cloudflare-one/policies/access/) for your application. For example, you could allow users with an `@your_domain.com` email address.

5. On the next page, you will see your **SSO endpoint**, **Access Entity ID or Issuer**, and **Public key**. These values will be used to configure Google Workspace.

## 2. Create a certificate from your public key

1. Copy and then paste your **Public key** into a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`. For example,

   ```txt
   -----BEGIN CERTIFICATE-----
   <PUBLIC_KEY>
   -----END CERTIFICATE-----
   ```

3. Set the file extension as `.crt` and save.

## 3. Create an SSO provider in Google Workspace

1. Log in to your [Google Admin console](https://admin.google.com/).
2. Go to **Security** > **Authentication** > **SSO with third party IdP**.
3. Select **Third-party SSO profile for your organization**.
4. Enable **Set up SSO with third-party identity provider**.
5. Fill in the following information:
   - **Sign-in page URL**: Copy and then paste your **SSO endpoint** from Zero Trust.
   - **Sign-out page URL**: `https://<team-name>.cloudflareaccess.com/cdn-cgi/access/logout`, where `<team-name>` is your Zero Trust {{<glossary-tooltip term_id="team name">}}team name{{</glossary-tooltip>}}.
   - **Verification certificate**: Upload the certificate file containing your public key.
6. (Optional) Enable **Use a domain specific issuer**. If you select this option, Google will send an issuer specific to your Google Workspace domain (`google.com/a/<your_domain.com>` instead of the standard `google.com`).

## 4. Test the integration

1. In your [Google Admin console](https://admin.google.com/), go to **Apps** > **Google Workspace** > **Gmail** > **Setup**.
2. Copy your Gmail **Web address**.
3. Open an incognito browser window and go to your Gmail web address (for example, `https://mail.google.com/a/<your_domain.com>`).

An Access login screen should appear.

## Troubleshooting

`Error: “G Suite - This account cannot be accessed because the login credentials could not be verified.”`

If you see this error, it is likely that the public key and private key do not match. Confirm that your certificate file includes the correct public key.
