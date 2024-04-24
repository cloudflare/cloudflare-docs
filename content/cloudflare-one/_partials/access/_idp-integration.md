---
_build:
  publishResources: false
  render: never
  list: never
---

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

2. In the **Login methods** card, select **Add new**.

3. Select the identity provider you want to add.

   If you do not see your identity provider listed, these providers can typically still be enabled. If they support OIDC or OAuth, select the generic OIDC option. If they support SAML, select the generic SAML option. Cloudflare supports all SAML and OIDC providers and can integrate with the majority of OAuth providers. If your provider supports both SAML and OIDC, we recommend OIDC for ease of configuration.

4. Fill in the necessary fields to set up your identity provider.

   Each identity provider will have different required fields for you to fill in. Step-by-step instructions are shown in the dashboard side panel.

5. Once you have filled in the necessary fields, select **Save**.
