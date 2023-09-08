---
pcx_content_type: how-to
title: AWS
---

# Configure AWS SSO with Access for SaaS

This guide covers how to configure AWS SSO with Access for SaaS. Cloudflare Access for SaaS allows you to layer additional network and device posture policies on top of existing identity authentication from your identity provider. In this example, we are using Okta as an identity provider, but any supported identity provider can be leveraged.

## Prerequisites

- A Zero Trust account
- An integrated IdP
- Admin access to an AWS account

## 1. Configure AWS

1.  In the AWS admin panel, search for `SSO`.

1.  Add **AWS Single Sign** on to your AWS account.

1.  Select **Choose an identity source**.

1.  Change the identity source to **External Identity provider**.

1.  Select **Show individual metadata values**. These will be the fields that are added to the Cloudflare Access for SaaS app.

1.  Copy the **AWS SSO ACS URL**.

## 2. Configure Cloudflare

1.  In a separate tab or window, open [Zero Trust](https://one.dash.cloudflare.com) and go to **Access** > **Applications**.

1.  Select **SaaS** as the application type to begin creating a SaaS application.

1.  Copy the following fields from your AWS account and input them in the Zero Trust application configuration:

    | AWS value              | Cloudflare value                   |
    | ---------------------- | ---------------------------------- |
    | **AWS SSO ACS URL**    | **Assertion Consumer Service URL** |
    | **AWS SSO Issuer URL** | **Entity ID**                      |

    The **Name ID Format** must be set to: Email.

1.  (Optional) Additional Attribute Statements can be passed from your IdP to AWS SSO. More information about AWS Attribute mapping can be found at [Attribute mappings - AWS Single Sign-On](https://docs.aws.amazon.com/singlesignon/latest/userguide/attributemappingsconcept.html#supportedidpattributes).

1.  Copy the Cloudflare IdP metadata values and save them for the Final AWS configuration.

1.  Select **Next**.

1.  Now create an [Access policy](/cloudflare-one/policies/access/) to determine who has access to your application.

1.  Save your policy and return to the AWS SSO dashboard.

## 3. Complete the AWS configuration

1.  Paste the Cloudflare IdP metadata into your AWS account with these mappings:

    | Cloudflare value     | AWS value           |
    | -------------------- | ------------------- |
    | **SSO Endpoint**     | **IdP Sign-in URL** |
    | **Access Entity ID** | **IdP Issuer URL**  |
    | **Public Key**       | **IdP Certificate** |

    {{<Aside type="note">}}

    The Public key must be transformed into a fingerprint. To do that:

1.  Copy the Public Key Value.
1.  Paste the Public Key into VIM or another code editor.
1.  Wrap the value in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
1.  Set the file extension to `.crt` and save.

    {{</Aside>}}

1.  Select **Next: Review**.

1.  Set Provisioning to _Manual_.

    {{<Aside type="warning" header="Important">}}Access for SaaS does not currently support System for Cross-domain Identity Management (SCIM). Make sure that:

1.  Users are created in both your identity provider and AWS.
1.  Users have matching usernames in your identity provider and AWS.
1.  Usernames are email addresses. This is the only format AWS supports with third-party SSO providers.
    {{</Aside>}}

## Test your connection

User should now be able to successfully log in. To test your connection, open the user portal URL.
