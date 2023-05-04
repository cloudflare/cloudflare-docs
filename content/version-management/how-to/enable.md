---
title: Enable
pcx_content_type: how-to
weight: 1
meta:
    title: Enable version management
---

# Enable Version Management

{{<render file="_enable-versioning.md">}}

{{<render file="_enable-default-creation.md">}}

## Disable Version Management

If your zone is under attack or you need to make a change quickly, you can disable the version management process:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Environments**.
5. On your production environment, select **Edit**.
6. For **Read-only Environment**, make sure the checkbox is unchecked.
7. Select **Save**.

Then, you can directly [edit the version](/version-management/how-to/versions/#editable-versions) associated with your production environment.