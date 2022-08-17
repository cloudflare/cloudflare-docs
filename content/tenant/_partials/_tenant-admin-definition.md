---
_build:
  publishResources: false
  render: never
  list: never
---

Once you sign a partner agreement with Cloudflare, we create a special Tenant account and then add your user to that account as a **Tenant admin**. Cloudflare can add multiple users as Tenant admins upon request.

Tenant admins then become the default **Super administrator(s)**[^1] for all accounts and zones contained within the Tenant. 

This means that each Tenant admin's user API key can be used to provision accounts based on the catalog specified in your partner agreement.

[^1]: Users who can edit any Cloudflare setting, make purchases, update billing, and manage memberships.