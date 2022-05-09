---
pcx-content-type: how-to
title: PingOne®
weight: 7
---

# PingOne®

The PingOne® cloud platform from PingIdentity provides SSO identity management. Cloudflare Access supports PingOne as a SAML identity provider.

## Set up PingOne as an identity provider

1. In your PingIdentity environment, navigate to **Connections** > **Applications**.
2. Click **Add Application**.  
3. Enter an **Application Name**.
4. Select **SAML Application**.
5. Click **Configure**. 
6. To fill in your Cloudflare Access metadata:
    1. Select **Import from URL**.
    2. Set the **Import URL** to:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    where `<your-team-name>` is your Cloudflare Zero Trust [team name](/cloudflare-one/glossary/#team-domain).  

    3. Click **Import**.
    4. **Save** the configuration.

7. In the **Configuration** tab, click **Download metadata** and save the XML metadata file. This file will be used in a later step to add PingOne to the Zero Trust Dashboard.
8. In the **Attribute Mappings** tab, add the following required attributes (case sensitive) and click **Save**.

{{<table-wrap>}}
 
Application attribute | Outgoing value
----------------------|-------------------------
`email` | Email Address
`givenName` | Given Name
`surName`  | Family Name
 
{{</table-wrap>}}

These [SAML attributes](/cloudflare-one/identity/idp-integration/generic-saml/#saml-attributes) tell Cloudflare Access who the user is.

9. Enable the application.
10. On the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/), navigate to **Settings** > **Authentication**.
11. Under **Login methods**, click **Add new**.
12. Select SAML.
13. Upload your PingOne XML metadata file from Step #7.
14. (Recommended)  Enable [**Sign SAML authentication request**](/cloudflare-one/identity/idp-integration/generic-saml/#sign-saml-authentication-request).
15. Click **Save**.

You can now [test your connection](/cloudflare-one/identity/idp-integration/#test-idps-on-the-zero-trust-dashboard) and create [Access policies](/cloudflare-one/policies/access/) based on the configured login method and SAML attributes.
