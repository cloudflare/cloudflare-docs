---
pcx_content_type: how-to
title: PingOne® (SAML)
weight: 23
---

# PingOne®

The PingOne® cloud platform from PingIdentity provides SSO identity management. Cloudflare Access supports PingOne as a SAML identity provider.

## Set up PingOne as a SAML provider

1. In your PingIdentity environment, go to **Connections** > **Applications**.
2. Select **Add Application**.
3. Enter an **Application Name**.
4. Select **SAML Application**.
5. Select **Configure**.
6. To fill in your Cloudflare Access metadata:

   1. Select **Import from URL**.
   2. Set the **Import URL** to:

   ```txt
   https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata
   ```

   where `<your-team-name>` is your Cloudflare Zero Trust {{<glossary-tooltip term_id="team domain">}}team name{{</glossary-tooltip>}}.

   3. Select **Import**.
   4. **Save** the configuration.

7. In the **Configuration** tab, select **Download metadata** and save the XML metadata file. This file will be used in a later step to add PingOne to Zero Trust.
8. In the **Attribute Mappings** tab, add the following required attributes (case sensitive) and select **Save**.

   | Application attribute | Outgoing value |
   | --------------------- | -------------- |
   | `email`               | Email Address  |
   | `givenName`           | Given Name     |
   | `surName`             | Family Name    |

   These [SAML attributes](/cloudflare-one/identity/idp-integration/generic-saml/#saml-attributes) tell Cloudflare Access who the user is.

9. Set the application to **Active**.
10. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Authentication**.
11. Under **Login methods**, select **Add new**.
12. Select **SAML**.
13. Upload your PingOne XML metadata file from Step 7.
14. Enable [**Sign SAML authentication request**](/cloudflare-one/identity/idp-integration/generic-saml/#sign-saml-authentication-request).
15. Select **Save**.

You can now [test your connection](/cloudflare-one/identity/idp-integration/#test-idps-in-zero-trust) and create [Access policies](/cloudflare-one/policies/access/) based on the configured login method and SAML attributes.
