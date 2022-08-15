---
title: Tenant structure
pcx_content_type: concept
weight: 1
---

# Tenant structure

Cloudflare helps partners manage their and their customers' accounts through a Tenant structure.

Once you sign a partner agreement with Cloudflare, we create a special Tenant account and then add your user to that account as a **Tenant admin**. Cloudflare can add multiple users as Tenant admins upon request.

Tenant admins then become the default **Super administrator(s)** for all accounts and zones contained within the Tenant. This means that each admin's user API key can be used to provision accounts based on the catalog specified in your partner agreement.

![Partner accounts contain a tenant, which is a container for customer accounts and zones. For more details, keep reading.](/tenant/static/tenant-diagram.png)

This setup gives your account streamlined administrative access to all customer accounts, zones, and configurations while still keeping your customers' data and settings separate from each other.

{{<Aside type="note">}}

Since non-Enterprise accounts can only have one Super administrator, your account will be the only Super administrator allowed on their account.

For more details, refer to [Super administrators](/fundamentals/account-and-billing/account-setup/manage-account-members/#change-super-administrator).

{{</Aside>}}