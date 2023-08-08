---
pcx_content_type: how-to
title: Okta (SAML)
weight: 13
---

# Okta (SAML)

Cloudflare Zero Trust can integrate SAML with Okta as an identity provider.

## Set up Okta as a SAML provider

To set up SAML with Okta as your identity provider:

1. On your Okta admin dashboard, go to **Applications** > **Applications**.

2. Select **Create App Integration**.

3. In the pop-up dialog, select **SAML 2.0** and then elect **Next**.

4. Enter an app name and select **Next**.

   ![Entering your Zero Trust callback URL into Okta](/images/cloudflare-one/identity/okta-saml/okta-saml-1.png)

5. In the **Single sign on URL** and the **Audience URI (SP Entity ID)** fields, enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

   ```txt
   https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
   ```

6. In the **Attribute Statements** section, enter the following information:

   - **Name**: Enter `email`.
   - **Value**: Enter `user.email`.

7. (Optional) If you are using Okta groups, create a **Group Attribute Statement** with the following information:
   - **Name**: Enter `groups`.
   - **Filter**: Select _Matches regex_ and enter `.*`.

![Configuring attribute statements in Okta](/images/cloudflare-one/identity/okta-saml/okta-saml-2.png)

8. Select **Next**.

9. Select **I’m an Okta customer adding an internal app** and check **This is an internal app that we have created**.

![Configuring feedback options in Okta](/images/cloudflare-one/identity/okta-saml/okta-saml-3.png)

9. Select **Finish**.

10. In the **Assignments** tab, select **Assign** and assign individuals or groups you want to grant access to.

11. Select **Done**. The assigned individuals and groups will display in the **Assignments** tab.

![Assigning individuals and groups to Okta application](/images/cloudflare-one/identity/okta-saml/okta-saml-4.png)

12. To retrieve the SAML provider information, go to the **Sign On** tab and select **View Setup Instructions**. A new page will open showing the **Identity Provider Single Sign-on URL**, **Identity Provider Issuer**, and **X.509 Certificate**. Save this information for configuring your Zero Trust settings.

![Retrieving SAML provider information in Okta](/images/cloudflare-one/identity/okta-saml/okta-saml-5.png)

13. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

14. Select **Add new** under **Login Methods**, and select _SAML_.

15. Fill in the following information:

    - **Name**: Name your identity provider.
    - **Single Sign On URL**: Enter the Identity Provider Single-Sign-On URL from Okta.
    - **Issuer ID**: Enter the Identity Provider Issuer from Okta, for example `http://www.okta.com/<your-okta-entity-id>`.
    - **Signing Certificate**: Copy-paste the X.509 Certificate from Okta.

16. (Recommended) Enable **Sign SAML authentication request**.

17. (Recommended) Under **SAML attributes**, add the `email` and `groups` attributes. The `groups` attribute is required if you want to create policies based on [Okta groups](/cloudflare-one/policies/gateway/identity-selectors/#okta-saml).

![Adding optional SAML attributes in Zero Trust](/images/cloudflare-one/identity/okta-saml/okta-saml-6.png)

18. Select **Save**.

To test that your connection is working, go to **Settings** > **Authentication** > **Login methods** and select **Test** next to Okta. A success response should return the configured SAML attributes.

{{<Aside type="warning">}}

SAML attributes are only refreshed during authentications with the Okta identity provider. This means the Okta group membership is not updated unless a user logs in and out of the WARP client, or logs in to an Access application.

{{</Aside>}}

## Example API configuration

```json
{
    "config": {
        "issuer_url": "http://www.okta.com/exkbhqj29iGxT7GwT0h7",
        "sso_target_url": "https://dev-abc123.oktapreview.com/app/myapp/exkbhqj29iGxT7GwT0h7/sso/saml",
        "attributes": [
            "email",
            "group",
            "email_attribute_name": "",
            "sign_request": false,
            "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"
        ]
    },
    "type": "saml",
    "name": "okta saml example"
}
```
