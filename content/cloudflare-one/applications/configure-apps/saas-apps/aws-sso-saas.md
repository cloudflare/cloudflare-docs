---
pcx_content_type: integration-guide
title: AWS
updated: 2024-04-22
weight: 6
---

# Connect to AWS through Access

This guide covers how to configure [AWS](https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-idp.html) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to an AWS account

## 1. Get AWS URLs

1. In the AWS admin panel, search for `IAM Identity Center`.
2. Go to **IAM Identity Center** > **Settings**.
3. In the **Identity source** tab, select the **Actions** dropdown and select _Change identity source_.
4. Change the identity source to **External identity provider**.
5. Copy the values shown in **Service provider metadata**. You will need these values when configuring the SaaS application in Zero Trust.

Next, we will obtain **Identity provider metadata** from Zero Trust.

## 2. Add a SaaS application to Cloudflare Zero Trust

1. In a separate tab or window, open [Zero Trust](https://one.dash.cloudflare.com) and go to **Access** > **Applications**.
2. Select **SaaS**.
3. For **Application**, select _Amazon AWS_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: IAM Identity Center issuer URL
    - **Assertion Consumer Service URL**: IAM Identity Center Assertion Consumer Service (ACS) URL
    - **Name ID format**: _Email_
7. (Optional) Additional SAML attribute statements can be passed from your IdP to AWS SSO. To learn more about AWS Attribute mapping, refer to [Attribute mappings - AWS Single Sign-On](https://docs.aws.amazon.com/singlesignon/latest/userguide/attributemappingsconcept.html#supportedidpattributes).
8. AWS supports uploading a metadata XML file. To download your SAML metadata from Access:
    1. Copy the **SAML Metadata endpoint**.
    2. In a separate browser window, go to the SAML Metadata endpoint (`https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/saml/xxx/saml-metadata`).
    3. Save the page as `access_saml_metadata.xml`.
9. Save your SaaS application configuration.
10. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
11. Select **Done**.

## 3. Complete AWS configuration

1. Return to the **IAM Identity Center** > **Settings** > **Change identity source** tab.

2. Under **IdP SAML metadata**, upload your `access_saml_metadata.xml` file.

3. Select **Next** to review settings, type **ACCEPT** and select **Change identity source** to confirm changes.

4. Confirm that **Provisioning** is set to _Manual_.

{{<Aside type="warning" header="Important">}}
Access for SaaS does not currently support [SCIM provisioning](/cloudflare-one/identity/users/scim/). Make sure that:

1. Users are created in both your identity provider and AWS.
2. Users have matching usernames in your identity provider and AWS.
3. Usernames are email addresses. This is the only format AWS supports with third-party SSO providers.
{{</Aside>}}

## 4. Test the integration

To test the connection, go to your **AWS access portal URL**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

