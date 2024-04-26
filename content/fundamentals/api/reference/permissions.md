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

## User permissions

The applicable scope of user permissions is `com.cloudflare.api.user`.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
{{<render file="_user-permissions-table.md" withParameters="Edit" >}}
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
{{<render file="_user-permissions-table.md" withParameters="Write">}}
 
{{</tab>}}
{{</tabs>}}

## Account permissions

The applicable scope of account permissions is `com.cloudflare.api.account`.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
{{<render file="_account-permissions-table.md" withParameters="Edit;;Cloudflare;;Cloudflare">}}
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
{{<render file="_account-permissions-table.md" withParameters="Write;;Argo;;">}}
 
{{</tab>}}
{{</tabs>}}

## Zone permissions

The applicable scope of zone permissions is `com.cloudflare.api.account.zone`.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
{{<render file="_zone-permissions-table.md" withParameters="Edit">}}
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
{{<render file="_zone-permissions-table.md" withParameters="Write">}}
 
{{</tab>}}
{{</tabs>}}