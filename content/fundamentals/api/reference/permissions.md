---
title: API token permissions
pcx_content_type: reference
weight: 3
---

# API token permissions

Permissions are segmented into three categories based on resource:

- Zone permissions
- Account permissions
- User permissions

Each category contains permission groups related to those resources. DNS permissions belong to the Zone category, while Billing permissions belong to the Account category. Below is a list of the available token permissions.

To obtain an updated list of token permissions, including the permission ID and the scope of each permission, use the [List permission groups](/api/operations/permission-groups-list-permission-groups) endpoint.

## Cloudflare dashboard

### User permissions

{{<render file="_user-permissions-table.md" withParameters="Edit">}}

### Account permissions

{{<render file="_account-permissions-table.md" withParameters="Edit">}}

### Zone permissions

{{<render file="_zone-permissions-table.md" withParameters="Edit">}}

---

## Terraform

### User permissions

{{<render file="_user-permissions-table.md" withParameters="Write">}}

### Account permissions

{{<render file="_account-permissions-table.md" withParameters="Write">}}

### Zone permissions

{{<render file="_zone-permissions-table.md" withParameters="Write">}}