---
pcx_content_type: navigation
title: API and Terraform
weight: 8
---

# API and Terraform

This section covers a few common use cases with the API and Terraform to manage Cloudflare Access. For specific API documentation, please see [api.cloudflare.com](https://api.cloudflare.com/).

{{<directory-listing>}}

## Set dashboard to read-only

Super Administrators can lock all settings as read-only in the Zero Trust dashboard. Read-only mode ensures that all updates for the account are made through the API or Terraform.

To enable read-only mode:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), go to **Settings** > **General**.
2. Enable **API/Terraform read-only mode**.

All users, regardless of [user permissions](/cloudflare-one/cloudflare-teams-roles-permissions/), will be prevented from making configuration changes through the UI.
