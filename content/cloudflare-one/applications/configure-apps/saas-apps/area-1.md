---
pcx_content_type: how-to
title: Area 1
weight: 2
---

# Integrate Cloudflare Area 1 with Access

[Cloudflare Area 1](https://www.cloudflare.com/products/zero-trust/email-security/) is an email security platform that protects your organization's inbox from phishing, spam, and other malicious messages. You can set up Cloudflare Access as a single sign-on provider for your Cloudflare Area 1 portal.

## Prerequisites

- Admin access to your Area 1 account
- Your user's email in Area 1 matches their email in Zero Trust.

## 1. Add Area 1 to the Zero Trust dashboard

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Access** > **Applications**.

2. Select **Add an application**.

3. Select **SaaS**.

4. In the **Application** field, enter `Area 1` and select **Area 1**. (Area 1 is not currently listed in the default drop-down menu.)

5. Enter the following values for your application configuration:
    - **Entity ID**: `https://horizon.area1security.com`
    -  **Assertion Consumer Service URL**: `https://horizon.area1security.com/api/users/saml`
    - **Name ID Format**: _Email_

6. (Optional) In **Application Appearance**, customize your [App Launcher](/cloudflare-one/applications/app-launcher/) visibility and logo.

7. Choose the **Identity providers** you want to enable for your application.

8. Turn on **Instant Auth** if you are selecting only one login method for your application, and would like your end users to skip the identity provider selection step.

9. Select **Next**.

## 2. Add an Access policy

1. To control who can access your application, [create an Access policy](/cloudflare-one/policies/access/).

2. Select **Next**.

## 2. Configure SSO for Area 1

Finally, you will need to configure Area 1 to allow users to log in through Cloudflare Access.

1. In your [Area 1 portal](https://horizon.area1security.com/), go to **Settings** > **SSO**.

2. Turn on **Single Sign On**.

3. (Optional) To require users to sign in through Access, set **SSO Enforcement** to _All_.

4. In **SAML SSO Domain**, enter `<your-team-name>.cloudflareaccess.com`.

5. Get your Metadata XML file:

    1. In the Zero Trust dashboard, copy the **SSO Endpoint** for your application. The URL is of the form: `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/saml/<app-id>`.

    2. In a new browser tab, paste the **SSO Endpoint** and append `/saml-metadata` to the end of the URL. For example,
    `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/saml/<app-id>/saml-metadata`.

    3. Copy the resulting metadata.

6. Return to the Area 1 portal and paste the metadata into **Metadata XML**.

    ![Configure SSO in the Area 1 portal](/cloudflare-one/static/documentation/applications/area1-sso-config.png)

7. Select **Update Settings**.

8. In the Zero Trust dashboard, select **Done**.

Your application will appear on the **Applications** page. If you set **SSO Enforcement** to _All_, you can test the integration by logging back in to the [Area 1 portal](https://horizon.area1security.com/).
