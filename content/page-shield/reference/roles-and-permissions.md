---
title: Roles and permissions
pcx_content_type: reference
weight: 5
meta:
  description: User roles and API token permissions required to access and configure Page Shield.
---

# Roles and permissions

Cloudflare users with the following [roles](/fundamentals/setup/manage-members/roles/) have access to Page Shield in the Cloudflare dashboard:

* Administrator
* Super Administrator - All Privileges
* Page Shield
* Page Shield Read _(read-only access)_
* Domain Page Shield
* Domain Page Shield Read _(read-only access)_

## API token permissions

To interact with the [Page Shield API](/page-shield/reference/page-shield-api/) you need an API token with one of the following [permissions](/fundamentals/api/reference/permissions/):

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

* Page Shield > Edit
* Page Shield > Read _(read-only access)_

{{</tab>}}
{{<tab label="api" no-code="true">}}

* Page Shield Write
* Page Shield Read _(read-only access)_

{{</tab>}}
{{</tabs>}}