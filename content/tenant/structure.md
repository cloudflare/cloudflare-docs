---
title: Tenant structure
pcx_content_type: concept
weight: 1
---

# Tenant structure

Cloudflare helps partners manage their and their customers' accounts through a Tenant structure.

![Partner accounts contain a tenant, which is a container for customer accounts and zones. For more details, keep reading.](/tenant/static/tenant-diagram.png)

## Tenants and Tenant admins

{{<render file="_tenant-definition.md">}}
\
{{<render file="_tenant-admin-definition.md">}}

This setup gives your account streamlined administrative access to all customer accounts, zones, and configurations while still keeping your customers' data and settings separate from each other.

## Users, accounts, and resources



{{<Aside type="note">}}

Since non-Enterprise accounts can only have one Super administrator, your account will be the only Super administrator allowed on their account.

For more details, refer to [Super administrators](/fundamentals/account-and-billing/account-setup/manage-account-members/#change-super-administrator).

{{</Aside>}}