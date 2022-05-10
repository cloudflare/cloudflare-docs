---
updated: 2021-08-03
category: 🔐 Zero Trust
difficulty: Intermediate
pcx-content-type: tutorial
title: Configure AWS SSO with Access for SaaS
---

# Configure AWS SSO with Access for SaaS

In this tutorial we will configure AWS SSO with Access for SaaS. Cloudflare Access for SaaS allows you to layer additional network and device posture policies on top of existing identity authentication from your identity provider. In this example, we are using Okta as an identity provider, but any supported identity provider can be leveraged.

{{<Aside>}}

For this tutorial, you will need:

- A Zero Trust account
- An integrated IdP
- Admin access to an AWS account

{{</Aside>}}

**⏲️ Time to complete:**

20 minutes

## Configure AWS

1.  In the AWS admin panel, search for `SSO`.

    ![AWS SSO](/cloudflare-one/static/zero-trust-security/aws-sso-saas/aws-sso-search.png)

1.  Add **AWS Single Sign** on to your AWS account.

1.  Click **Choose an identity source**.

1.  Change the identity source to **External Identity provider**.

1.  Click **Show individual metadata values**. These will be the fields that are added to the Cloudflare Access for SaaS app.

    ![AWS metadata](/cloudflare-one/static/zero-trust-security/aws-sso-saas/aws-metadata.png)

1.  Copy the **AWS SSO ACS URL**.

## Configure Cloudflare

1.  In a separate tab or window, open the [Zero Trust Dashboard](https://dash.teams.cloudflare.com) and navigate to **Access** > **Applications**.

1.  Select _SaaS_ as the application type to begin creating a SaaS application.

1.  Copy the following fields from your AWS account and input them in the Zero Trust application configuration:

    | AWS value              | Cloudflare value                   |
    | ---------------------- | ---------------------------------- |
    | **AWS SSO ACS URL**    | **Assertion Consumer Service URL** |
    | **AWS SSO Issuer URL** | **Entity ID**                      |

    The **Name ID Format** must be set to: Email.

    ![AWS application](/cloudflare-one/static/zero-trust-security/aws-sso-saas/aws-application.png)

1.  (Optional) Additional Attribute Statements can be passed from your IdP to AWS SSO. More information about AWS Attribute mapping can be found at [Attribute mappings - AWS Single Sign-On](https://docs.aws.amazon.com/singlesignon/latest/userguide/attributemappingsconcept.html#supportedidpattributes).

1.  Copy the Cloudflare IdP metadata values and save them for the Final AWS configuration:

    ![AWS Cloudflare metadata](/cloudflare-one/static/zero-trust-security/aws-sso-saas/aws-cloudflare-metadata.png)

1.  Click **Next**.

1.  Now create an [Access policy](/cloudflare-one/policies/access/) to determine who has access to your application.

1.  Save your policy and return to the AWS SSO dashboard.

## Complete the AWS configuration

1.  Paste the Cloudflare IdP metadata into your AWS account with these mappings:

        | Cloudflare value | AWS value |
        | ----- | ---- |
        | **SSO Endpoint** | **IdP Sign-in URL** |
        | **Access Entity ID** | **IdP Issuer URL** |
        | **Public Key** | **IdP Certificate** |

         {{<Aside type="note">}}

    The Public key must be transformed into a fingerprint. To do that:

1.  Copy the Public Key Value.
1.  Paste the Public Key into VIM or another code editor.
1.  Wrap the value in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
1.  Set the file extension to `.crt` and save.
    {{</Aside>}}

1.  Click **Next: Review**.

1.  Set Provisioning to _Manual_.

        ![AWS settings](/cloudflare-one/static/zero-trust-security/aws-sso-saas/aws-settings.png)

         {{<Aside type="Warning" header="Important">}}

    Access for SaaS does not currently support System for Cross-domain Identity Management (SCIM). Please make sure that:

1.  Users are created in both your identity provider and AWS
1.  Users have matching usernames in your identity provider and AWS.
1.  Usernames are email addresses. This is the only format AWS supports with third-party SSO providers.
    {{</Aside>}}

## Test your connection

User should now be able to successfully log in. To test your connection, open the user portal URL.

![AWS portal](/cloudflare-one/static/zero-trust-security/aws-sso-saas/aws-portal.png)
