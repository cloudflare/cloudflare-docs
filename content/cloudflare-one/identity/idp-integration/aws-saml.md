---
pcx_content_type: how-to
title: AWS (SAML)
weight: 4
---

# AWS (SAML)

AWS IAM Identity Center integrates with Cloudflare Zero Trust as a SAML identity provider. This allows your users to authenticate to Zero Trust using their AWS credentials.

## Prerequisites

- Admin access to an IAM Identity Center [organization instance](https://docs.aws.amazon.com/singlesignon/latest/userguide/identity-center-instances.html)

## Set up AWS as a SAML provider

To set up [SAML with AWS](https://docs.aws.amazon.com/singlesignon/latest/userguide/customermanagedapps-saml2-setup.html#customermanagedapps-set-up-your-own-app-saml2) as your identity provider:

1. Open the [IAM Identity Center console](https://console.aws.amazon.com/singlesignon) and go to **Applications**.

2. Select the **Customer managed** tab.

3. Select **Add application**.

4. Under **Setup preferences**, select **I have an application I want to set up**.

5. For **Application type**, select **SAML 2.0**.

6. Select **Next**.

7. Enter a **Display name** for the application (for example, `Cloudflare Access`).

8. Download the **IAM Identity Center SAML metadata file**. You will need this file when configuring an identity provider in Cloudflare Zero Trust.

9. Under **Application metadata**, select **Manually type your metadata values**.

10. In **Application ACS URL** and **Application SAML audience**, enter the following URL:

   ```txt
   https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
   ```

    You can find your team name in Zero Trust under **Settings** > **Custom Pages**.

11. Select **Submit** to create the application.

12. In the application details, go to **Actions** > **Edit attribute mappings**.

13. Add the email attribute to your SAML response. We also recommend adding the user name attribute, but it is not strictly required.

| User attribute | String value |
| -------------- | ------------ |
| `email` | `${user:email}` |
| `name` | `${user:name}` |

![Configuring attribute statements in Okta](/images/cloudflare-one/identity/okta-saml/okta-saml-2.png)

10. Under **Assign users and groups**, add individuals and/or groups that should be allowed to login to Zero Trust.

13. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

14. Under **Login Methods**, select **Add new**.

15. Select **SAML**.

15. Upload the IAM SAML metadata file that you downloaded in Step 8.

16. (Recommended) Enable [**Sign SAML authentication request**](/cloudflare-one/identity/idp-integration/generic-saml/#sign-saml-authentication-request).

17. Select **Save**.

17. (Recommended) Under **SAML attributes**, add the `email` and `groups` attributes. The `groups` attribute is required if you want to create policies based on [Okta groups](/cloudflare-one/policies/gateway/identity-selectors/#okta-saml).

![Adding optional SAML attributes in Zero Trust](/images/cloudflare-one/identity/okta-saml/okta-saml-6.png)

18. Select **Save**.

To test that your connection is working, go to **Settings** > **Authentication** > **Login methods** and select **Test** next to AWS. A success response should return the configured SAML attributes.

## Example API configuration

```json

```
