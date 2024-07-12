---
pcx_content_type: how-to
title: Workday
weight: 19
---

# Connect to Workday through Access

This guide covers how to configure [Workday](https://doc.workday.com/admin-guide/en-us/authentication-and-security/authentication/saml/dan1370796470811.html?toc=1.5.1) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- A [SAML identity provider](/cloudflare-one/identity/idp-integration/generic-saml/) configured in Cloudflare Zero Trust
- Admin access to a Workday account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, enter `Workday` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `http://www.workday.com`
    - **Assertion Consumer Service URL**: `https://<your-environment>.myworkday.com/<your-tenant>/login-saml.flex` for a production account or `https://<your-environment>-impl.myworkday.com/<your-tenant>/login-saml.flex` for a preview sandbox account
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint**, **Access Entity ID or Issuer**, and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Download the metadata file

1. Paste the SAML Metadata endpoint from application configuration in Cloudflare Zero Trust in a web browser.
2. Follow your browser-specific steps to download the URL's contents as an `.xml` file.

## 3. Add a SAML SSO provider to Workday

1. In Workday, go to **Account Administration** > **Actions** > **Edit Tenant Setup - Security**.
2. Under **SAML Setup**, turn on **Enable SAML Authentication**.
3. In the **SAML Identity Providers** table, select **+**.
4. Fill in the following fields:
    - **Identity Provider Name**: Your desired name for the identity provider (for example, `Cloudflare Access`)
    - **Issuer**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust
    - **IdP SSO Service URL**: SSO endpoint from application configuration in Cloudflare Zero Trust
5. Under **x509 Certificate**, select the menu icon > **Create x509 Public Key**.
6. Under **Name**, enter a unique name (for example, `access`).
7. Under **Certificate**, paste the Public key from application configuration in Cloudflare Zero Trust.
8. Select **OK**.
9. If you want to enable SP-initiated login (login initiated by going to your Workday URL), fill in the following fields:
    - **SP Initiated**: Turn on.
    - **Service Provider ID**: `http://www.workday.com`
    - **Sign SP-initiated request**: Turn off.
10. Under **Single Sign-On**, add one or both of the following entries to the **Redirection URLs** grid. For each entry, if your user groups will use the same authentication option to sign in, select **Single URL**. If they will use different authentication options, select **Authentication selector**.
    - IdP-initiated SSO: Under **Login Redirect URL**, enter `<your-team-name>.cloudflareaccess.com`.
    - SP-initiated SSO: Under **Login Redirect URL**, enter `https://<your-environment>/<your-tenant/login-saml2.htmld`.

## 4. Test the integration

{{<Aside type="note">}}

If you encounter a situation where one or more users get locked out of Workday, the user can use this backup URL provided by Workday to sign in with their username and password: `https://<your-workday-url>/login.flex?redirect=n`.

{{</Aside>}}

1. In Workday, create an [authentication rule](https://doc.workday.com/admin-guide/en-us/authentication-and-security/authentication/authentication-policies/dan1370796466772.html).
2. Under **Authentication Conditions**, add conditions that will apply only to your test user.
3. Under **Allowed Authentication Types**, select **Specific**, then **SAML**.
4. Select **Done**.
5. Complete the following step:
    - **If you have enabled SP-initiated login**: Open an incognito browser window, go to your Workday URL, and enter your test user's email. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
    - **If you have not enabled SP-initiated login**: Go to your App Launcher at `https://<cloudflare-team-name>.cloudflareaccess.com`. Select the **Workday** tile. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
6. Once login is successful, you can configure your security settings further, such as adding [user groups](https://doc.workday.com/admin-guide/en-us/authentication-and-security/configurable-security/security-groups/user-based-security-groups/dan1370796695367.html?toc=2.2.12.0) or [authentication rules](https://doc.workday.com/admin-guide/en-us/authentication-and-security/authentication/authentication-policies/dan1370796466772.html) to configure different login rules for different groups of users.
